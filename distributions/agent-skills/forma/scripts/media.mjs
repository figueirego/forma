#!/usr/bin/env node
// Original Forma media adapter. Metadata is evidence from providers, not a rights guarantee.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { allowedUrl, requestBytes, requestJson } from './lib/media-network.mjs';

const SCHEMA = 'forma-media-search/v1';
export const RIGHTS_NOTE = 'Provider-reported licence: verify the source, attribution, share-alike and any personality, trademark or territorial restrictions before publishing. Contextual media must not be presented as the client’s own product, team or work.';
const SOURCES = ['openverse', 'commons', 'aic', 'met'];
const clean = value => String(value ?? '').replace(/<[^>]*>/g, ' ').replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim().slice(0, 2000);
const positive = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : null;
function httpUrl(value) { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password ? u.href : null; } catch { return null; } }
export function licence(code, url, version = '') {
  const normalized = clean(code).toLowerCase().replace(/^cc[- ]/, '').replace(/ /g, '-');
  const versions = ['1.0', '2.0', '2.5', '3.0', '4.0'];
  const attribution = normalized.match(/^(by|by-sa)(?:-(\d\.\d))?$/);
  const zero = normalized.match(/^(?:cc0|zero)(?:-(1\.0))?$/);
  const publicDomain = ['pd', 'pdm', 'public-domain', 'pd-old', 'pd-old-70', 'pd-old-100', 'pd-old-100-expired', 'pd-us', 'pd-us-expired', 'pd-usgov'].includes(normalized);
  // Every supplied claim must agree. Never let a permissive URL override NC/ND or an unknown suffix.
  const name = attribution?.[1] || (zero ? 'cc0' : publicDomain ? 'pd' : null);
  if (!name) return null;
  const explicitVersion = String(version || '');
  const codeVersion = attribution?.[2] || zero?.[1] || '';
  let urlVersion = '';
  if (url !== undefined && url !== null && url !== '') {
    const link = httpUrl(url);
    if (!link) return null;
    const parsed = new URL(link);
    if (parsed.hostname !== 'creativecommons.org' || parsed.port || parsed.search || parsed.hash) return null;
    const attributionUrl = parsed.pathname.match(/^\/licenses\/(by|by-sa)\/(\d\.\d)(?:\/(?:deed\.[a-z_-]+|legalcode)?)?$/i);
    const publicDomainUrl = parsed.pathname.match(/^\/publicdomain\/(zero|mark)\/(1\.0)(?:\/(?:deed\.[a-z_-]+|legalcode)?)?$/i);
    const urlName = attributionUrl?.[1] || (publicDomainUrl?.[1] === 'zero' ? 'cc0' : publicDomainUrl ? 'pd' : null);
    if (!urlName || urlName !== name) return null;
    urlVersion = attributionUrl?.[2] || publicDomainUrl?.[2] || '';
  }
  const suppliedVersions = [explicitVersion, codeVersion, urlVersion].filter(Boolean);
  if (new Set(suppliedVersions).size > 1) return null;
  const v = suppliedVersions[0] || (name === 'cc0' || name === 'pd' ? '1.0' : '');
  if (name === 'cc0' || name === 'pd' ? v !== '1.0' : !versions.includes(v)) return null;
  const canonical = name === 'cc0' ? 'https://creativecommons.org/publicdomain/zero/1.0/' : name === 'pd' ? 'https://creativecommons.org/publicdomain/mark/1.0/' : `https://creativecommons.org/licenses/${name}/${v}/`;
  return { code: name, url: canonical, attributionRequired: name === 'by' || name === 'by-sa', shareAlike: name === 'by-sa', version: v };
}

function record(provider, rawId, fields) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(String(rawId)) || !fields.license || !httpUrl(fields.pageUrl) || !httpUrl(fields.mediaUrl)) return null;
  const item = { id: `${provider}:${rawId}`, provider, type: 'image', title: clean(fields.title) || 'Untitled', author: clean(fields.author) || 'Unknown', ...fields };
  item.title = clean(item.title); item.author = clean(item.author);
  item.pageUrl = httpUrl(item.pageUrl); item.mediaUrl = httpUrl(item.mediaUrl);
  item.width = positive(item.width); item.height = positive(item.height);
  try { allowedUrl(item.mediaUrl, provider); item.downloadable = true; } catch { item.downloadable = false; }
  item.notes = [RIGHTS_NOTE, ...(fields.notes || []).map(clean)];
  if (!item.downloadable) item.notes.push('Automatic download host is not supported; inspect the source in a browser.');
  return item;
}
function requireArray(value, label) { if (!Array.isArray(value)) throw new Error(`Unexpected ${label} response`); return value; }
function api(base, params) { return `${base}?${new URLSearchParams(params)}`; }

async function openverse(query, options, getJson) {
  const items = []; const seen = new Set();
  for (let page = 1; page <= options.pages && items.length < options.limit; page++) {
    const data = await getJson(api('https://api.openverse.org/v1/images/', { q: query, license: 'cc0,pdm,by,by-sa', page_size: '20', page: String(page) }));
    for (const row of requireArray(data.results, 'Openverse')) {
      const item = record('openverse', row.id, { title: row.title, author: row.creator, license: licence(row.license, row.license_url, row.license_version), pageUrl: row.foreign_landing_url, mediaUrl: row.url, width: row.width, height: row.height });
      if (item && !seen.has(item.id)) { seen.add(item.id); items.push(item); }
    }
    if (!data.next) break; // Build subsequent URLs ourselves; never follow API-supplied next URLs.
  }
  return { items: items.slice(0, options.limit), warnings: [] };
}
async function commons(query, options, getJson) {
  const items = []; const seen = new Set(); let offset = 0;
  for (let page = 0; page < options.pages && items.length < options.limit; page++) {
    const params = { action: 'query', format: 'json', formatversion: '2', generator: 'search', gsrnamespace: '6', gsrsearch: `${query} filetype:${options.type === 'video' ? 'video' : 'bitmap'}`, gsrlimit: '20', gsroffset: String(offset), prop: options.type === 'video' ? 'imageinfo|videoinfo' : 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1600', iiextmetadatalanguage: 'en', viprop: 'derivatives' };
    const data = await getJson(api('https://commons.wikimedia.org/w/api.php', params));
    if (data.error) throw new Error(clean(data.error.info) || 'Commons API error');
    const rows = data.query ? requireArray(data.query.pages, 'Commons') : [];
    for (const row of rows.sort((a, b) => (a.index || 0) - (b.index || 0))) {
      const info = row.imageinfo?.[0]; if (!info) continue;
      const meta = key => clean(info.extmetadata?.[key]?.value);
      let mediaUrl = info.thumburl || info.url; let mime = info.thumbmime || info.mime;
      let width = info.thumbwidth || info.width; let height = info.thumbheight || info.height;
      if (options.type === 'video') {
        const playable = (row.videoinfo?.[0]?.derivatives || []).filter(x => ['video/webm', 'video/mp4'].includes(String(x.type).split(';')[0]));
        const fit = playable.filter(x => positive(x.height) && x.height <= 720).sort((a, b) => b.height - a.height);
        const selected = fit[0] || playable.sort((a, b) => (a.height || Infinity) - (b.height || Infinity))[0];
        if (!selected) continue;
        mediaUrl = selected.src; mime = String(selected.type).split(';')[0]; width = selected.width; height = selected.height;
      } else if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mime)) continue;
      const item = record('commons', row.pageid, { title: meta('ObjectName') || row.title, author: meta('Artist'), type: options.type, mime, license: licence(meta('License') || meta('LicenseShortName'), meta('LicenseUrl')), pageUrl: info.descriptionurl, mediaUrl, width, height, notes: [meta('Restrictions')].filter(Boolean) });
      if (item && !seen.has(item.id)) { seen.add(item.id); items.push(item); }
    }
    if (!Number.isInteger(data.continue?.gsroffset) || data.continue.gsroffset <= offset) break;
    offset = data.continue.gsroffset;
  }
  return { items: items.slice(0, options.limit), warnings: [] };
}
async function aic(query, options, getJson) {
  const items = [];
  for (let page = 1; page <= options.pages && items.length < options.limit; page++) {
    const data = await getJson(api('https://api.artic.edu/api/v1/artworks/search', { q: query, 'query[term][is_public_domain]': 'true', fields: 'id,title,artist_title,image_id,is_public_domain,thumbnail', limit: '20', page: String(page) }));
    for (const row of requireArray(data.data, 'AIC')) {
      if (row.is_public_domain !== true || !/^[a-zA-Z0-9_-]+$/.test(row.image_id || '')) continue;
      const item = record('aic', row.id, { title: row.title, author: row.artist_title, license: licence('cc0'), pageUrl: `https://www.artic.edu/artworks/${row.id}`, mediaUrl: `https://www.artic.edu/iiif/2/${row.image_id}/full/1686,/0/default.jpg`, width: row.thumbnail?.width, height: row.thumbnail?.height });
      if (item) items.push(item);
    }
    if (!(data.pagination?.total_pages > page)) break;
  }
  return { items: items.slice(0, options.limit), warnings: [] };
}
async function met(query, options, getJson) {
  const items = []; const warnings = []; let detailSuccess = 0; let attempts = 0;
  for (let page = 0; page < options.pages && items.length < options.limit; page++) {
    const data = await getJson(api('https://collectionapi.metmuseum.org/public/collection/v1.1/search', { q: query, hasImages: 'true', limit: '20', offset: String(page * 20) }));
    const ids = data.objectIDs === null ? [] : requireArray(data.objectIDs, 'Met');
    for (const id of ids.slice(0, 20)) {
      if (!Number.isSafeInteger(id) || id < 1) continue;
      attempts++;
      try {
        const row = await getJson(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`); detailSuccess++;
        if (row.isPublicDomain !== true) continue;
        const item = record('met', row.objectID, { title: row.title, author: row.artistDisplayName, license: licence('cc0'), pageUrl: row.objectURL, mediaUrl: row.primaryImageSmall || row.primaryImage });
        if (item) items.push(item);
      } catch (error) { warnings.push(`Object ${id}: ${clean(error.message)}`); }
      if (items.length >= options.limit) break;
    }
    if (ids.length < 20 || !data.total || data.total <= (page + 1) * 20) break;
  }
  if (attempts && !detailSuccess && warnings.length) throw new Error('All Met object requests failed');
  return { items, warnings };
}
const adapters = { openverse, commons, aic, met };
export async function searchMedia(query, { sources = ['openverse', 'commons', 'aic', 'met'], type = 'image', limit = 5, pages = 2 } = {}, { getJson = requestJson, now = () => new Date().toISOString() } = {}) {
  if (typeof query !== 'string' || !query.trim() || query.length > 300) throw new Error('Query must contain 1–300 characters');
  if (!['image', 'video'].includes(type) || !Number.isInteger(limit) || limit < 1 || limit > 20 || !Number.isInteger(pages) || pages < 1 || pages > 3) throw new Error('Invalid type, limit (1–20), or pages (1–3)');
  if (!Array.isArray(sources) || !sources.length || sources.some(x => !SOURCES.includes(x) || (type === 'video' && x !== 'commons'))) throw new Error('Unsupported source for media type; video supports Commons');
  const providers = await Promise.all([...new Set(sources)].map(async provider => {
    const deadline = Date.now() + 60000;
    const boundedJson = url => {
      const remaining = deadline - Date.now();
      if (remaining <= 0) throw new Error('Provider search exceeded the 60-second budget');
      return getJson(url, { timeoutMs: Math.min(20000, remaining) });
    };
    try { const result = await adapters[provider](query.trim(), { type, limit, pages }, boundedJson); return { provider, status: result.warnings.length ? 'partial' : 'ok', ...result }; }
    catch (error) { return { provider, status: 'error', items: [], warnings: [], error: clean(error.message) }; }
  }));
  const failed = providers.filter(x => x.status === 'error').length;
  const unique = new Map(providers.flatMap(x => x.items).map(item => [item.id, item]));
  const items = [...unique.values()];
  const status = failed === providers.length ? 'error' : providers.some(x => x.status !== 'ok') ? 'partial' : items.length ? 'ok' : 'empty';
  return { schema: SCHEMA, query: query.trim(), type, retrievedAt: now(), status, rightsNote: RIGHTS_NOTE, providers: providers.map(({ items: _, ...rest }) => rest), items };
}

export function sniffMedia(bytes, mime, expectedType) {
  if (!Buffer.isBuffer(bytes) || bytes.length < 12) throw new Error('Truncated or unrecognized media');
  const has = (offset, text) => bytes.subarray(offset, offset + text.length).toString('ascii') === text;
  const signatures = {
    'image/jpeg': bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    'image/png': bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    'image/gif': has(0, 'GIF87a') || has(0, 'GIF89a'),
    'image/webp': has(0, 'RIFF') && has(8, 'WEBP'),
    'video/webm': bytes.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])) && bytes.subarray(0, 4096).includes(Buffer.from('webm')),
    'video/mp4': has(4, 'ftyp') && /^(isom|iso[2-9]|mp4[12]|avc1|dash|M4V )$/.test(bytes.subarray(8, 12).toString('ascii')),
  };
  if (!mime.startsWith(`${expectedType}/`) || !signatures[mime]) throw new Error('Unsupported MIME or media signature mismatch');
  return { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp', 'video/webm': 'webm', 'video/mp4': 'mp4' }[mime];
}
function checkParents(destination) {
  let current = path.resolve(destination);
  while (true) {
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error('Symlink output path is not supported');
    const parent = path.dirname(current); if (parent === current) break; current = parent;
  }
}
export function writeExclusive(file, value) {
  checkParents(file);
  const data = typeof value === 'string' || Buffer.isBuffer(value) ? value : `${JSON.stringify(value, null, 2)}\n`;
  const fd = fs.openSync(file, 'wx', 0o600);
  try { fs.writeFileSync(fd, data); } catch (error) { fs.closeSync(fd); fs.unlinkSync(file); throw error; }
  fs.closeSync(fd);
}
export function readManifest(filename) {
  const stats = fs.statSync(filename);
  if (!stats.isFile() || stats.size > 2 * 1024 * 1024) throw new Error('Manifest must be a JSON file below 2 MiB');
  const manifest = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (manifest.schema !== SCHEMA || !Array.isArray(manifest.items) || manifest.items.length > 80 || !['image', 'video'].includes(manifest.type) || !Number.isFinite(Date.parse(manifest.retrievedAt))) throw new Error('Invalid Forma media manifest');
  if (new Set(manifest.items.map(x => x.id)).size !== manifest.items.length) throw new Error('Duplicate IDs in manifest');
  return manifest;
}
export async function downloadMedia(manifest, id, directory, { getBytes = requestBytes, writer = writeExclusive, now = () => new Date().toISOString() } = {}) {
  if (manifest.schema !== SCHEMA || !Array.isArray(manifest.items)) throw new Error('Invalid Forma media manifest');
  const item = manifest.items.find(x => x.id === id);
  if (!item || !SOURCES.includes(item.provider) || !new RegExp(`^${item.provider}:[a-zA-Z0-9_-]{1,100}$`).test(id)) throw new Error('Select a valid ID from the search manifest');
  const verifiedLicense = licence(item.license?.code, item.license?.url, item.license?.version);
  if (!verifiedLicense || !httpUrl(item.pageUrl) || !['image', 'video'].includes(item.type)) throw new Error('Manifest item lacks supported rights or source information');
  allowedUrl(item.mediaUrl, item.provider);
  const dir = path.resolve(directory); checkParents(dir);
  fs.mkdirSync(dir, { recursive: true });
  // Files are never named using a remote title or path.
  const stem = id.replace(':', '-') + '-' + createHash('sha256').update(item.mediaUrl).digest('hex').slice(0, 10);
  const creditFile = path.join(dir, `${stem}.credit.json`);
  if (fs.existsSync(creditFile)) throw new Error('Credit already exists; choose another directory');
  const maxBytes = (item.type === 'video' ? 25 : 12) * 1024 * 1024;
  const response = await getBytes(item.mediaUrl, { provider: item.provider, maxBytes, timeoutMs: 30000 });
  if (response.bytes.length > maxBytes) throw new Error('Response exceeds byte limit');
  const extension = sniffMedia(response.bytes, response.mime, item.type);
  const mediaFile = path.join(dir, `${stem}.${extension}`);
  const receipt = { schema: 'forma-media-credit/v1', id, file: path.basename(mediaFile), provider: item.provider, type: item.type, title: clean(item.title), author: clean(item.author), pageUrl: item.pageUrl, mediaUrl: item.mediaUrl, downloadedUrl: response.url || item.mediaUrl, license: verifiedLicense, retrievedAt: manifest.retrievedAt, downloadedAt: now(), bytes: response.bytes.length, sha256: createHash('sha256').update(response.bytes).digest('hex'), rightsNote: RIGHTS_NOTE, modifications: 'Original downloaded bytes; record any later modification with its applicable licence obligations.' };
  let createdMedia = false;
  try { writer(mediaFile, response.bytes); createdMedia = true; writer(creditFile, receipt); }
  catch (error) { if (createdMedia) fs.unlinkSync(mediaFile); throw error; }
  return { mediaFile, creditFile, receipt };
}
export function readCredits(directory) {
  const dir = path.resolve(directory); checkParents(dir);
  return fs.readdirSync(dir).filter(file => file.endsWith('.credit.json')).sort().map(file => {
    const full = path.join(dir, file); const stat = fs.lstatSync(full);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 32768) throw new Error('Invalid credit file');
    const data = JSON.parse(fs.readFileSync(full, 'utf8'));
    if (data.schema !== 'forma-media-credit/v1' || typeof data.file !== 'string' || path.basename(data.file) !== data.file || !data.file || !/^[a-f0-9]{64}$/.test(data.sha256 || '')) throw new Error('Malformed credit record');
    return data;
  });
}
export const USAGE = `Forma media — Node 18+, no dependencies or API keys
  node media.mjs "query" [--source all|openverse|commons|aic|met] [--type image|video]
      [--limit 5] [--pages 2] [--json] [--out results.json]
  node media.mjs --get <id> --from results.json --to assets [--json]
  node media.mjs --credits --to assets [--json]
Image search supports four providers; video supports Commons only. Limit is per provider.
Search and downloading are separate. Output files never overwrite. Image cap 12 MiB; video cap 25 MiB.
--out saves metadata, not media. Network failures are reported separately from zero results.
Licences are provider-reported. Inspect source, rights and credit obligations before publication.`;
export function parseArgs(argv) {
  const options = {}; const words = []; const flags = new Set(['json', 'credits', 'help']);
  const valued = new Set(['source', 'type', 'limit', 'pages', 'out', 'get', 'from', 'to']);
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) { words.push(token); continue; }
    const key = token.slice(2);
    if (Object.hasOwn(options, key)) throw new Error(`Repeated --${key}`);
    if (flags.has(key)) options[key] = true;
    else if (valued.has(key) && argv[i + 1] && !argv[i + 1].startsWith('--')) options[key] = argv[++i];
    else throw new Error(`Invalid or incomplete option: ${token}`);
  }
  options.query = words.join(' ');
  if (options.help) return options;
  if (options.get) {
    if (!options.from || !options.to || options.query || options.credits || Object.keys(options).some(k => !['get', 'from', 'to', 'json', 'query'].includes(k))) throw new Error('--get requires --from and --to, without search options');
  } else if (options.credits) {
    if (!options.to || options.query || Object.keys(options).some(k => !['credits', 'to', 'json', 'query'].includes(k))) throw new Error('--credits requires --to, without search options');
  } else {
    if (!options.query || options.from || options.to) throw new Error('Provide a query, or use --get/--credits');
    options.type ??= 'image';
    options.sources = (options.source && options.source !== 'all' ? options.source.split(',') : options.type === 'video' ? ['commons'] : SOURCES);
    for (const [key, fallback] of [['limit', 5], ['pages', 2]]) options[key] = options[key] === undefined ? fallback : Number(options[key]);
  }
  return options;
}
export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) { console.log(USAGE); return 0; }
  let result;
  if (options.get) result = await downloadMedia(readManifest(options.from), options.get, options.to);
  else if (options.credits) result = readCredits(options.to);
  else { result = await searchMedia(options.query, options); if (options.out) writeExclusive(options.out, result); }
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else if (options.credits) for (const item of result) console.log(`${clean(item.title)} — ${clean(item.author)}; ${clean(item.license?.code)} ${clean(item.license?.version)}; ${clean(item.pageUrl)}; ${clean(item.license?.url)}; file: ${clean(item.file)}`);
  else if (options.get) console.log(`Downloaded ${result.mediaFile}\nCredit: ${result.creditFile}\n${RIGHTS_NOTE}`);
  else { console.log(`Search: ${result.status} (${result.items.length} results)\n${RIGHTS_NOTE}`); for (const provider of result.providers) console.log(`${provider.provider}: ${provider.status}${provider.error ? ` — ${provider.error}` : ''}${provider.warnings.length ? ` — ${provider.warnings.join('; ')}` : ''}`); for (const item of result.items) console.log(`\n${item.id} — ${item.title}\n${item.author} · ${item.license.code}\nSource: ${item.pageUrl}\nDownload supported: ${item.downloadable}`); }
  return result.status === 'error' ? 1 : 0;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(code => { process.exitCode = code; }).catch(error => { console.error(`Media error: ${error.message}`); process.exitCode = 1; });
}
