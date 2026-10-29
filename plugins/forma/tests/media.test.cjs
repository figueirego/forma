const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { Readable } = require('node:stream');
const { spawnSync } = require('node:child_process');
const media = import('../scripts/media.mjs');
const network = import('../scripts/lib/media-network.mjs');
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), Buffer.alloc(24)]);
const item = { id: 'commons:1', provider: 'commons', type: 'image', title: 'Title', author: 'Creator', license: { code: 'by', url: 'https://creativecommons.org/licenses/by/4.0/', version: '4.0' }, pageUrl: 'https://commons.wikimedia.org/wiki/File:Example.png', mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Example.png' };
const manifest = () => ({ schema: 'forma-media-search/v1', type: 'image', retrievedAt: '2026-10-28T00:00:00Z', items: [structuredClone(item)] });
const temp = t => { const dir = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'forma-media-test-')); t.after(() => fs.rmSync(dir, { recursive: true, force: true })); return dir; };
const ov = (id, license = 'by') => ({ id, title: 'Picture', creator: 'Photographer', license, license_version: '4.0', license_url: `https://creativecommons.org/licenses/${license}/4.0/`, foreign_landing_url: 'https://www.flickr.com/photos/example/1', url: `https://live.staticflickr.com/example-${id}.jpg`, width: 1200, height: 800 });

test('media licensing filters noncommercial, unknown and unversioned attribution; preserves share-alike', async () => {
  const { licence } = await media;
  for (const code of ['by-nc', 'by-nd', 'by-nc-sa', 'unknown', 'no known copyright restrictions', 'by']) assert.equal(licence(code), null, code);
  assert.equal(licence('cc0').attributionRequired, false);
  assert.equal(licence('cc-by-sa-4.0').shareAlike, true);
  assert.equal(licence('pdm').code, 'pd');
  assert.equal(licence('cc-by-3.0').url, 'https://creativecommons.org/licenses/by/3.0/');
});
test('licence claims fail closed when code, URL or version conflict or contain unsupported tails', async () => {
  const { licence } = await media;
  const by = 'https://creativecommons.org/licenses/by/4.0/';
  const bySa = 'https://creativecommons.org/licenses/by-sa/4.0/';
  for (const args of [
    ['by-nc', by, '4.0'], ['by-nd', by, '4.0'], ['unknown', by, '4.0'],
    ['cc-by-sa-nc-4.0'], ['cc-by-sa-4.0-extra'], ['cc0-nc'], ['pd-nc'],
    ['by-sa', by, '4.0'], ['by', bySa, '4.0'], ['cc0', by, '1.0'],
    ['by-3.0', by, '4.0'], ['by', by, '3.0'], ['by-4.0', undefined, '3.0'],
    ['by', 'https://example.org/licenses/by/4.0/', '4.0'],
    ['by', 'javascript:alert(1)', '4.0'], ['by-9.9'], ['cc0-4.0'],
  ]) assert.equal(licence(...args), null, JSON.stringify(args));
  assert.equal(licence('by-sa', `${bySa}deed.en`, '4.0').code, 'by-sa');
  assert.equal(licence('cc-by-sa-3.0', 'http://creativecommons.org/licenses/by-sa/3.0/', '3.0').url, 'https://creativecommons.org/licenses/by-sa/3.0/');
  assert.equal(licence('pd-old', 'https://creativecommons.org/publicdomain/mark/1.0/').code, 'pd');
});
test('an inconsistent licence is excluded from search and refused before download', async t => {
  const { searchMedia, downloadMedia } = await media;
  const result = await searchMedia('harbor', { sources: ['openverse'] }, { getJson: async () => ({ results: [{ ...ov('nc', 'by-nc'), license_url: 'https://creativecommons.org/licenses/by/4.0/' }] }) });
  assert.equal(result.status, 'empty'); assert.equal(result.items.length, 0);
  const changed = manifest(); changed.items[0].license.code = 'by-nc';
  let fetched = false;
  await assert.rejects(downloadMedia(changed, 'commons:1', temp(t), { getBytes: async () => { fetched = true; return { bytes: png, mime: 'image/png' }; } }), /rights/);
  assert.equal(fetched, false);
});
test('Openverse paginates through its own endpoint, excludes unsafe licences, deduplicates and stops at limit', async () => {
  const { searchMedia } = await media; const urls = [];
  const result = await searchMedia('harbor', { sources: ['openverse'], limit: 2 }, { getJson: async url => {
    urls.push(url);
    return urls.length === 1 ? { next: 'http://127.0.0.1/admin', results: [ov('1'), ov('unsafe', 'by-nc')] } : { next: null, results: [ov('1'), ov('2')] };
  } });
  assert.equal(result.status, 'ok'); assert.deepEqual(result.items.map(x => x.id), ['openverse:1', 'openverse:2']);
  assert.equal(urls.length, 2); assert.ok(urls.every(x => x.startsWith('https://api.openverse.org/')));
  assert.equal(new URL(urls[1]).searchParams.get('page'), '2');
});
test('unsupported Openverse image hosts remain discoverable but are not automatically downloadable', async () => {
  const { searchMedia, downloadMedia } = await media;
  const result = await searchMedia('harbor', { sources: ['openverse'] }, { getJson: async () => ({ results: [{ ...ov('1'), url: 'https://example.com/photo.jpg' }] }) });
  assert.equal(result.items[0].downloadable, false);
  await assert.rejects(downloadMedia(result, 'openverse:1', '/tmp'), /Unapproved/);
});
test('partial provider failure, all failures, and a successful empty search are different states', async () => {
  const { searchMedia } = await media;
  const partial = await searchMedia('cat', { sources: ['aic', 'openverse'] }, { getJson: async url => { if (url.includes('openverse')) throw new Error('HTTP 429'); return { data: [] }; } });
  assert.equal(partial.status, 'partial'); assert.equal(partial.providers[1].error, 'HTTP 429');
  const failed = await searchMedia('cat', { sources: ['aic'] }, { getJson: async () => { throw new Error('timeout'); } });
  assert.equal(failed.status, 'error');
  const empty = await searchMedia('cat', { sources: ['aic'] }, { getJson: async () => ({ data: [] }) });
  assert.equal(empty.status, 'empty');
  const malformed = await searchMedia('cat', { sources: ['aic'] }, { getJson: async () => ({ data: 'wrong' }) });
  assert.equal(malformed.status, 'error');
});
test('AIC accepts only explicit public-domain artwork and uses a fixed IIIF host', async () => {
  const { searchMedia } = await media;
  const result = await searchMedia('cat', { sources: ['aic'] }, { getJson: async () => ({ data: [
    { id: 1, title: 'Cat', image_id: 'a-b-c', is_public_domain: true },
    { id: 2, title: 'Unclear', image_id: 'd-e-f' }, { id: 3, image_id: '../x', is_public_domain: true },
  ], config: { iiif_url: 'http://127.0.0.1/' } }) });
  assert.equal(result.items.length, 1); assert.equal(result.items[0].license.code, 'cc0');
  assert.match(result.items[0].mediaUrl, /^https:\/\/www.artic.edu\/iiif\/2\//);
});
test('Met uses v1.1 paginated search and reports object-request failures without hiding returned items', async () => {
  const { searchMedia } = await media; const seen = [];
  const result = await searchMedia('cat', { sources: ['met'], limit: 2 }, { getJson: async url => {
    seen.push(url); if (url.includes('/search?')) return { objectIDs: [1, 2], total: 2 };
    if (url.endsWith('/1')) throw new Error('HTTP 503');
    return { objectID: 2, title: 'Cat', isPublicDomain: true, objectURL: 'https://www.metmuseum.org/art/collection/search/2', primaryImage: 'https://images.metmuseum.org/cat.jpg' };
  } });
  assert.match(seen[0], /\/v1\.1\/search/); assert.equal(new URL(seen[0]).searchParams.get('offset'), '0');
  assert.equal(result.status, 'partial'); assert.equal(result.items.length, 1); assert.match(result.providers[0].warnings[0], /Object 1/);
});
test('Commons sanitizes markup and selects a playable video rendition at or below 720p', async () => {
  const { searchMedia } = await media;
  const result = await searchMedia('river', { sources: ['commons'], type: 'video' }, { getJson: async () => ({ query: { pages: [{ pageid: 7, title: 'River', imageinfo: [{ url: 'https://upload.wikimedia.org/river.ogv', descriptionurl: 'https://commons.wikimedia.org/wiki/File:River.ogv', width: 1920, height: 1080, extmetadata: { Artist: { value: '<a href="x">Artist</a>\u001b[31m' }, License: { value: 'cc-by-sa-4.0' }, LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0/' } } }], videoinfo: [{ derivatives: [{ src: 'https://upload.wikimedia.org/river-1080.webm', type: 'video/webm', height: 1080 }, { src: 'https://upload.wikimedia.org/river-720.webm', type: 'video/webm', height: 720 }] }] }] } }) });
  assert.equal(result.items.length, 1); assert.match(result.items[0].mediaUrl, /720.webm$/);
  assert.doesNotMatch(result.items[0].author, /<|\u001b/); assert.equal(result.items[0].license.shareAlike, true);
});
test('network policy rejects unsafe schemes, hosts, ports, credentials and redirect destinations', async () => {
  const { allowedUrl } = await network;
  for (const url of ['http://upload.wikimedia.org/x', 'https://127.0.0.1/x', 'https://upload.wikimedia.org.evil.test/x', 'https://user:pass@upload.wikimedia.org/x', 'https://upload.wikimedia.org:444/x', 'file:///tmp/x']) assert.throws(() => allowedUrl(url, 'commons'));
  const destination = new URL('//localhost/admin', 'https://upload.wikimedia.org/x').href;
  assert.throws(() => allowedUrl(destination, 'commons'));
  assert.equal(allowedUrl('https://farm9.staticflickr.com/test.jpg', 'openverse').hostname, 'farm9.staticflickr.com');
});
test('DNS policy rejects local, reserved, mapped and mixed addresses and is cancellable', async () => {
  const { publicAddress, resolvePublic } = await network;
  for (const ip of ['0.0.0.0', '10.0.0.1', '100.64.0.1', '127.0.0.1', '169.254.169.254', '172.16.0.1', '192.168.0.1', '198.19.0.1', '224.0.0.1', '::1', '::ffff:127.0.0.1', 'fc00::1', 'fe80::1', '2001:db8::1']) assert.equal(publicAddress(ip), false, ip);
  assert.equal(publicAddress('1.1.1.1'), true); assert.equal(publicAddress('2606:4700:4700::1111'), true);
  await assert.rejects(resolvePublic('example', new AbortController().signal, async () => [{ address: '1.1.1.1', family: 4 }, { address: '127.0.0.1', family: 4 }]), /Blocked/);
  const controller = new AbortController(); const pending = resolvePublic('example', controller.signal, () => new Promise(() => {})); controller.abort(new Error('timeout'));
  await assert.rejects(pending, /timeout/);
});
test('streaming response bounds stop oversized transfers and preserve a valid bounded body', async () => {
  const { readBounded } = await network;
  await assert.rejects(readBounded(Readable.from([Buffer.alloc(8), Buffer.alloc(8)]), 12), /byte limit/);
  const result = await readBounded(Readable.from([Buffer.from('a'), Buffer.from('bc')]), 3); assert.equal(result.toString(), 'abc');
});
test('media signature validation rejects HTML, SVG and a mismatched declared type', async () => {
  const { sniffMedia } = await media;
  assert.equal(sniffMedia(png, 'image/png', 'image'), 'png');
  assert.throws(() => sniffMedia(Buffer.from('<html>error</html>'), 'image/png', 'image'), /signature/);
  assert.throws(() => sniffMedia(Buffer.from('<svg>dangerous</svg>'), 'image/svg+xml', 'image'), /signature/);
  assert.throws(() => sniffMedia(png, 'image/png', 'video'), /signature/);
});
test('download requires a selected manifest ID and writes original bytes, SHA and licence sidecar', async t => {
  const { downloadMedia, readCredits } = await media; const dir = temp(t); let request;
  const result = await downloadMedia(manifest(), 'commons:1', dir, { getBytes: async (url, options) => { request = options; return { bytes: png, mime: 'image/png', url }; } });
  assert.deepEqual(fs.readFileSync(result.mediaFile), png); assert.equal(request.maxBytes, 12 * 1024 * 1024);
  assert.equal(result.receipt.license.attributionRequired, true); assert.match(result.receipt.sha256, /^[a-f0-9]{64}$/);
  assert.equal(readCredits(dir)[0].file, path.basename(result.mediaFile));
  await assert.rejects(downloadMedia(manifest(), '../wrong', dir), /valid ID/);
  await assert.rejects(downloadMedia(manifest(), 'commons:1', dir), /already exists/);
});
test('a failed credit transaction removes only its newly written media', async t => {
  const { downloadMedia, writeExclusive } = await media; const dir = temp(t); fs.writeFileSync(path.join(dir, 'keep.txt'), 'keep');
  await assert.rejects(downloadMedia(manifest(), 'commons:1', dir, { getBytes: async () => ({ bytes: png, mime: 'image/png' }), writer: (file, data) => { if (file.endsWith('.credit.json')) throw new Error('disk failure'); writeExclusive(file, data); } }), /disk failure/);
  assert.deepEqual(fs.readdirSync(dir), ['keep.txt']);
});
test('existing files and symlink output paths are never overwritten', async t => {
  const { writeExclusive, downloadMedia } = await media; const dir = temp(t); const file = path.join(dir, 'existing.json');
  fs.writeFileSync(file, 'keep'); assert.throws(() => writeExclusive(file, 'replace'), /EEXIST/); assert.equal(fs.readFileSync(file, 'utf8'), 'keep');
  const link = path.join(dir, 'link'); fs.symlinkSync(dir, link, 'dir');
  assert.throws(() => writeExclusive(path.join(link, 'x'), 'bad'), /Symlink/);
  await assert.rejects(downloadMedia(manifest(), 'commons:1', link), /Symlink/);
});
test('forged manifests, unsupported licence, oversized body and invalid CLI combinations fail', async t => {
  const { readManifest, downloadMedia, parseArgs } = await media; const dir = temp(t); const file = path.join(dir, 'bad.json');
  fs.writeFileSync(file, JSON.stringify({ ...manifest(), items: [item, item] })); assert.throws(() => readManifest(file), /Duplicate/);
  const altered = manifest(); altered.items[0].license = { code: 'by-nc', version: '4.0' };
  await assert.rejects(downloadMedia(altered, 'commons:1', dir), /rights/);
  await assert.rejects(downloadMedia(manifest(), 'commons:1', dir, { getBytes: async () => ({ bytes: Buffer.alloc(13 * 1024 * 1024), mime: 'image/png' }) }), /byte limit/);
  for (const args of [['--get', 'commons:1'], ['--credits'], ['cat', '--to', 'assets'], ['--get', 'commons:1', '--from', 'x', '--to', 'y', '--source', 'aic'], ['cat', '--limit'], ['cat', '--json', '--json']]) assert.throws(() => parseArgs(args));
  const cli = spawnSync(process.execPath, [path.resolve(__dirname, '../scripts/media.mjs'), '--get', 'missing'], { encoding: 'utf8' });
  assert.equal(cli.status, 1); assert.match(cli.stderr, /requires/);
});
