const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const root = path.resolve(__dirname, '..');
const script = path.join(root, 'scripts/references.mjs');
let api, catalog;
before(async () => {
  api = await import(pathToFileURL(script));
  catalog = api.loadCatalog();
});
const cli = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', timeout: 10000 });
const ids = board => board.results.map(result => result.entry.id);
const canonical = value => Array.isArray(value) ? value.map(canonical)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;

test('all 202 Taste source records are retained intact with pinned provenance', () => {
  const source = catalog.provenance.taste;
  const entries = catalog.entries.filter(entry => entry.origin === 'taste');
  assert.equal(source.revision, '12af471f627f866411b4bd785b19646d3672784c');
  assert.equal(source.version, '2.1.5');
  assert.equal(entries.length, 202);
  assert.equal(new Set(entries.map(entry => entry.id)).size, 202);
  assert.equal(new Set(entries.map(entry => entry.url)).size, 202);
  const retained = entries.map(entry => Object.fromEntries(source.retainedFields.filter(key => Object.hasOwn(entry, key)).map(key => [key, entry[key]])));
  const digest = crypto.createHash('sha256').update(JSON.stringify(canonical(retained))).digest('hex');
  assert.equal(digest, source.recordsSha256);
  assert.match(source.sourceSha256, /^[0-9a-f]{64}$/);
  assert.match(source.scoreMeaning, /model.*not official/i);
});

test('Forma entries point to real package resources and distinguish demos from contracts', () => {
  const entries = catalog.entries.filter(entry => entry.origin === 'forma');
  assert.equal(entries.length, 8);
  for (const entry of entries) {
    assert.equal(entry.score, null);
    assert.ok(entry.resources.length > 0);
    for (const resource of entry.resources) {
      const target = path.resolve(root, resource.path);
      assert.ok(target.startsWith(root + path.sep));
      assert.equal(fs.statSync(target).isFile(), true, target);
    }
  }
  assert.equal(entries.find(entry => entry.id === 'forma-lighting-editor').evidence.type, 'implementation-contract');
  assert.equal(entries.find(entry => entry.id === 'forma-book-object').evidence.type, 'reusable-component');
  assert.equal(entries.find(entry => entry.id === 'forma-clean-shell').evidence.type, 'executable-demo');
});

test('every reference discloses rights and absence of fresh captures', () => {
  for (const entry of catalog.entries) {
    assert.ok(entry.whenToUse);
    assert.ok(entry.adapt.length > 0);
    assert.ok(entry.avoid.length > 0);
    assert.equal(entry.evidence.liveVerified, false);
    assert.equal(entry.evidence.capture, null);
    assert.ok(entry.evidence.limits.length > 0);
    assert.ok(entry.rights.notes);
    assert.ok(entry.rights.siteAssets);
    assert.ok(['http:', 'https:'].includes(new URL(entry.url).protocol));
  }
});

test('Portuguese aliases retrieve the intended component and explain the literal match', () => {
  const board = api.searchCatalog(catalog, { query: 'barra lateral', origin: 'forma', kind: 'interface' });
  assert.deepEqual(ids(board), ['forma-clean-shell']);
  assert.equal(board.results[0].match.matchedTerms[0].term, 'sidebar');
  assert.deepEqual(board.results[0].match.filters, { kind: 'interface', origin: 'forma' });
  const accented = api.searchCatalog(catalog, { query: 'iluminação', origin: 'forma' });
  assert.equal(ids(accented)[0], 'forma-lighting-editor');
  const books = api.searchCatalog(catalog, { query: 'lombada', origin: 'forma' });
  assert.deepEqual(ids(books), ['forma-book-object']);
});

test('browser-safe shared matcher gives the same Portuguese results and order as the CLI', () => {
  const moduleSource = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8');
  // Execute without Node or DOM globals: the browser imports the same pure module.
  const browserSource = moduleSource.replace(/^export /gm, '')
    + '\nJSON.stringify(rankReferences(catalog, {query}).map(result => ({id: result.entry.id, match: result.match})));';
  for (const query of ['cafeteria', 'lombada', 'fotografia']) {
    const browserResults = JSON.parse(vm.runInNewContext(browserSource, { catalog, query }, { timeout: 5000 }));
    const result = cli('--query', query, '--limit', '50', '--json');
    assert.equal(result.status, 0, result.stderr);
    const board = JSON.parse(result.stdout);
    assert.ok(board.totalMatches > 0, query);
    assert.equal(browserResults.length, board.totalMatches, query);
    assert.deepEqual(browserResults.slice(0, 50), board.results.map(({ entry, match }) => ({ id: entry.id, match })), query);
  }
});

test('reference browser delegates lexical filtering to the shared module', () => {
  const source = fs.readFileSync(path.join(root, 'assets/reference-browser.js'), 'utf8');
  assert.match(source, /import \{ rankReferences \} from ['"]\.\.\/scripts\/lib\/reference-search\.mjs['"]/);
  assert.match(source, /visible = rankReferences\(\{ entries \}/);
  assert.doesNotMatch(source, /const aliases\s*=/);
});

test('all query terms and exact filters must match without fallback', () => {
  const board = api.searchCatalog(catalog, { query: 'cafeteria', kind: 'restaurant', origin: 'taste', useCase: 'landing-page', limit: 3 });
  assert.ok(board.totalMatches >= 1);
  assert.ok(board.results.every(({ entry }) => entry.kind === 'restaurant' && entry.origin === 'taste'));
  assert.equal(api.searchCatalog(catalog, { query: 'cafeteria xyzunmatchable' }).totalMatches, 0);
  assert.equal(api.searchCatalog(catalog, { kind: '3d', origin: 'taste' }).totalMatches, 0);
  assert.equal(api.searchCatalog(catalog, { query: 'lombada', useCase: 'sidebar' }).totalMatches, 0);
  assert.throws(() => api.searchCatalog(catalog, { origin: 'unknown' }), /Unknown origin/);
  assert.throws(() => api.searchCatalog(catalog, { query: 'quero um site' }), /specific subject/);
});

test('seed varies ties reproducibly while lexical relevance remains primary', () => {
  const options = { origin: 'forma', limit: 8, seed: 42 };
  assert.deepEqual(api.searchCatalog(catalog, options), api.searchCatalog(catalog, options));
  assert.notDeepEqual(ids(api.searchCatalog(catalog, options)), ids(api.searchCatalog(catalog, { ...options, seed: 43 })));
  const ranked = api.searchCatalog(catalog, { query: 'book', seed: 42, limit: 50 });
  for (let index = 1; index < ranked.results.length; index++) {
    assert.ok(ranked.results[index - 1].match.lexicalScore >= ranked.results[index].match.lexicalScore);
  }
});

test('model study scores do not influence retrieval ranking', () => {
  const options = { query: 'typography', limit: 50 };
  const before = ids(api.searchCatalog(catalog, options));
  const changed = structuredClone(catalog);
  for (const entry of changed.entries) entry.score = entry.id.length * -100;
  assert.deepEqual(ids(api.searchCatalog(changed, options)), before);
});

test('JSON detail retains full notes, source, rights and explicit evidence boundaries', () => {
  const result = cli('--site', 'aww-pp-neue-montreal', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.equal(board.results.length, 1);
  assert.equal(board.results[0].entry.url, 'https://neuemontreal.com/');
  assert.ok(board.results[0].entry.sections.length > 0);
  assert.match(board.results[0].entry.type, /PP Neue Montreal/);
  assert.equal(board.method, 'local-lexical-alias-search');
  assert.ok(board.limitations.some(value => value.includes('not semantic')));
});

test('CLI lists usable facets and rejects malformed, conflicting and unknown arguments', () => {
  const listed = cli('--list', '--json');
  assert.equal(listed.status, 0, listed.stderr);
  const values = JSON.parse(listed.stdout);
  assert.equal(values.total, 210);
  assert.deepEqual(values.origins, { forma: 8, taste: 202 });
  assert.ok(values.useCases.sidebar > 0);
  for (const args of [[], ['--query'], ['--query', '--json'], ['--kind', 'nonsense'], ['--origin', 'forma', '--limit', '-1'],
    ['--origin', 'forma', '--limit', '2.5'], ['--origin', 'forma', '--limit', '51'], ['--origin', 'forma', '--seed', 'NaN'],
    ['--origin', 'forma', '--seed', '9007199254740992'], ['--site', 'missing'], ['--site', 'forma-settings', '--query', 'settings'],
    ['--list', '--out', 'unused.json'], ['--query', 'book', '--query', 'other'], ['--made-up'], ['anything'], ['--query', 'a'.repeat(501)]]) {
    const result = cli(...args);
    assert.notEqual(result.status, 0, JSON.stringify(args));
    assert.match(result.stderr, /Reference lookup failed/);
  }
});

test('empty lookup is an explicit successful no-result rather than unrelated recommendations', () => {
  const result = cli('--query', 'xyzunmatchable', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.equal(board.totalMatches, 0);
  assert.deepEqual(board.results, []);
});

test('board output is exclusive and preserves an existing file or symlink', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-reference-test-'));
  try {
    const output = path.join(temporary, 'board.json');
    const args = ['--query', 'lombada', '--origin', 'forma', '--json', '--out', output];
    const first = cli(...args);
    assert.equal(first.status, 0, first.stderr);
    assert.deepEqual(JSON.parse(fs.readFileSync(output, 'utf8')), JSON.parse(first.stdout));
    const saved = fs.readFileSync(output);
    assert.notEqual(cli(...args).status, 0);
    assert.deepEqual(fs.readFileSync(output), saved);
    const link = path.join(temporary, 'link.json');
    fs.symlinkSync(output, link);
    assert.notEqual(cli('--site', 'forma-settings', '--out', link).status, 0);
    assert.deepEqual(fs.readFileSync(output), saved);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});

test('catalog parser fails on duplicate IDs and malformed metadata', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-catalog-test-'));
  try {
    const target = path.join(temporary, 'bad.json');
    for (const invalid of [{ schemaVersion: 2, provenance: {}, entries: [] }, { ...catalog, entries: [catalog.entries[0], catalog.entries[0]] },
      { ...catalog, entries: [{ ...catalog.entries[0], resources: null }] }]) {
      fs.writeFileSync(target, JSON.stringify(invalid));
      assert.throws(() => api.loadCatalog(target), /Invalid/);
    }
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});
