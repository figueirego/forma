// Bounded HTTPS requests. DNS is checked and pinned for each redirect to prevent rebinding.
import https from 'node:https';
import { lookup } from 'node:dns/promises';
import { BlockList, isIP } from 'node:net';

export const API_HOSTS = new Set(['api.openverse.org', 'commons.wikimedia.org', 'api.artic.edu', 'collectionapi.metmuseum.org']);
const MEDIA_HOSTS = {
  commons: ['upload.wikimedia.org'],
  aic: ['www.artic.edu'],
  met: ['images.metmuseum.org'],
  openverse: ['upload.wikimedia.org', 'live.staticflickr.com', 'images.metmuseum.org', 'www.artic.edu', 'images.unsplash.com'],
};
const blocked = new BlockList();
for (const [network, prefix] of [['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 3]]) blocked.addSubnet(network, prefix, 'ipv4');
blocked.addSubnet('2001:db8::', 32, 'ipv6');
const global6 = new BlockList();
global6.addSubnet('2000::', 3, 'ipv6');

export function publicAddress(address) {
  const family = isIP(address);
  return family === 4 ? !blocked.check(address, 'ipv4') : family === 6 && global6.check(address, 'ipv6') && !blocked.check(address, 'ipv6');
}
export function allowedUrl(value, provider = 'api') {
  let url;
  try { url = new URL(value); } catch { throw new Error('Invalid HTTPS URL'); }
  const host = url.hostname.toLowerCase();
  const accepted = provider === 'api' ? API_HOSTS.has(host) :
    (MEDIA_HOSTS[provider] || []).includes(host) || (provider === 'openverse' && /^farm[0-9]+\.staticflickr\.com$/.test(host));
  if (url.protocol !== 'https:' || (url.port && url.port !== '443') || url.username || url.password || !accepted) throw new Error(`Unapproved ${provider} HTTPS host`);
  return url;
}
function abortable(promise, signal) {
  if (signal.aborted) return Promise.reject(signal.reason);
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason);
    signal.addEventListener('abort', abort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener('abort', abort));
  });
}
export async function resolvePublic(host, signal, resolver = lookup) {
  const addresses = await abortable(resolver(host, { all: true, verbatim: true }), signal);
  if (!addresses.length || addresses.some(item => !publicAddress(item.address))) throw new Error('Blocked non-public DNS address');
  return addresses;
}
export function readBounded(stream, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = []; let size = 0;
    stream.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) { stream.destroy(new Error('Response exceeds byte limit')); return; }
      chunks.push(chunk);
    });
    stream.on('end', () => resolve(Buffer.concat(chunks, size)));
    stream.on('error', reject);
    stream.on('aborted', () => reject(new Error('Response interrupted')));
  });
}
export async function requestBytes(value, { provider = 'api', maxBytes = 2 * 1024 * 1024, timeoutMs = 20000 } = {}) {
  const signal = AbortSignal.timeout(timeoutMs);
  let url = allowedUrl(value, provider);
  for (let hop = 0; hop <= 3; hop++) {
    const addresses = await resolvePublic(url.hostname, signal);
    const response = await new Promise((resolve, reject) => {
      const req = https.get(url, {
        signal, agent: false,
        lookup: (_host, options, callback) => options?.all ? callback(null, addresses) : callback(null, addresses[0].address, addresses[0].family),
        headers: { 'User-Agent': 'Forma-media/1.0 (+https://github.com/figueirego/forma)', 'AIC-User-Agent': 'Forma-media/1.0', Accept: provider === 'api' ? 'application/json' : 'image/*, video/*', 'Accept-Encoding': 'identity' },
      }, resolve);
      req.on('error', reject);
    });
    const status = response.statusCode || 0;
    if ([301, 302, 303, 307, 308].includes(status)) {
      response.destroy();
      if (hop === 3 || !response.headers.location) throw new Error('Redirect limit or missing location');
      url = allowedUrl(new URL(response.headers.location, url).href, provider);
      continue;
    }
    if (status !== 200) { response.destroy(); throw new Error(`HTTP ${status}${status === 429 ? ': provider rate limit' : ''}`); }
    if (Number(response.headers['content-length']) > maxBytes) { response.destroy(); throw new Error('Response exceeds byte limit'); }
    if (response.headers['content-encoding'] && response.headers['content-encoding'] !== 'identity') { response.destroy(); throw new Error('Compressed response not accepted'); }
    const bytes = await readBounded(response, maxBytes);
    return { bytes, mime: String(response.headers['content-type'] || '').split(';')[0].toLowerCase(), url: url.href };
  }
  throw new Error('Redirect limit');
}
export async function requestJson(url, { timeoutMs = 20000 } = {}) {
  const result = await requestBytes(url, { timeoutMs });
  if (result.mime !== 'application/json' && !result.mime.endsWith('+json')) throw new Error('Provider did not return JSON');
  try { return JSON.parse(result.bytes.toString('utf8')); } catch { throw new Error('Malformed provider JSON'); }
}
