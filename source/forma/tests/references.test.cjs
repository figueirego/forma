const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
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
const cli = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', timeout: 10000, cwd: os.tmpdir() });
const ids = board => board.results.map(result => result.entry.id);

// This validates the published contract, not whether prose is legally original or design is visually successful.
test('catalog records are Forma-authored package patterns with explicit authorship limits', () => {
  assert.equal(catalog.schemaVersion, 2);
  assert.deepEqual(Object.keys(catalog.provenance), ['forma']);
  assert.match(catalog.provenance.forma.method, /Original editorial/);
  assert.match(catalog.provenance.forma.scope, /not a catalog of external websites/);
  assert.ok(catalog.provenance.forma.limits.some(value => /does not imply invention/.test(value)));
  assert.equal(new Set(catalog.entries.map(entry => entry.id)).size, catalog.entries.length);
  for (const entry of catalog.entries) {
    assert.match(entry.id, /^forma-/);
    assert.equal(entry.origin, 'forma');
    for (const importedField of ['score', 'steal', 'hero', 'imagery', 'source', 'url']) assert.equal(Object.hasOwn(entry, importedField), false);
    assert.ok(entry.structure.length > 0);
    assert.ok(entry.verify.length > 0);
  }
});

test('every pattern points to real package resources and preserves established IDs', () => {
  for (const entry of catalog.entries) {
    assert.ok(entry.resources.length > 0);
    for (const resource of entry.resources) {
      const target = path.resolve(root, resource.path);
      assert.ok(target.startsWith(root + path.sep));
      assert.equal(fs.statSync(target).isFile(), true, target);
    }
  }
  for (const id of ['clean-shell', 'material-profile', 'settings', 'lighting-editor', 'book-object', 'knowledge-graph', 'color-system', 'purposeful-motion']) {
    assert.ok(catalog.entries.some(entry => entry.id === `forma-${id}`), id);
  }
  assert.equal(catalog.entries.find(entry => entry.id === 'forma-lighting-editor').evidence.type, 'reusable-component');
  assert.equal(catalog.entries.find(entry => entry.id === 'forma-book-object').evidence.type, 'reusable-component');
  assert.equal(catalog.entries.find(entry => entry.id === 'forma-clean-shell').evidence.type, 'executable-demo');
});

test('every pattern discloses rights and absence of fresh captures', () => {
  for (const entry of catalog.entries) {
    assert.ok(entry.whenToUse);
    assert.ok(entry.adapt.length > 0);
    assert.ok(entry.avoid.length > 0);
    assert.equal(entry.evidence.liveVerified, false);
    assert.equal(entry.evidence.capture, null);
    assert.ok(entry.evidence.limits.length > 0);
    assert.ok(entry.rights.notes);
    assert.match(entry.rights.scope, /provenance/);
  }
});

test('appearance record preserves the canonical third-pool group-drag fixture, not a local-only gesture', () => {
  const entry = catalog.entries.find(item => item.id === 'forma-lighting-editor');
  const resource = entry.resources.find(item => item.path === 'assets/reference-profiles/compact-appearance-v1.json');
  const profile = JSON.parse(fs.readFileSync(path.join(root, resource.path), 'utf8'));
  const fixture = profile.gestures.thirdDragFixture;
  const check = entry.verify.find(item => item.includes('gestures.thirdDragFixture'));
  assert.ok(check.includes(JSON.stringify(fixture.targetStageNormalized)));
  assert.ok(check.includes(JSON.stringify(fixture.expectedPoolXYModelInArrayOrder)));
  const [first, selected, last] = fixture.expectedPoolXYModelInArrayOrder;
  assert.deepEqual([first[0] - selected[0], first[1] - selected[1]], [4, 58]);
  assert.deepEqual([last[0] - selected[0], last[1] - selected[1]], [8, 116]);
  assert.ok(first[1] > 145 && last[1] > 145, 'The fixture intentionally moves the other pools offstage.');
  assert.match(entry.structure.join(' '), /Dragging a pool's center normally translates every pool/);
  assert.match(entry.structure.join(' '), /holding Alt when pointerdown occurs moves only the selected pool/);
  assert.match(entry.structure.join(' '), /distance ring keeps its selected anchor fixed/);
  assert.match(entry.adapt.join(' '), /clip offstage points/);
});

test('Portuguese aliases retrieve the intended component and explain the literal match', () => {
  const board = api.searchCatalog(catalog, { query: 'barra lateral', origin: 'forma', kind: 'interface' });
  assert.deepEqual(ids(board), ['forma-clean-shell']);
  assert.equal(board.results[0].match.matchedTerms[0].term, 'sidebar');
  assert.deepEqual(board.results[0].match.filters, { kind: 'interface', origin: 'forma' });
  assert.equal(ids(api.searchCatalog(catalog, { query: 'ilumina\u00e7\u00e3o', origin: 'forma' }))[0], 'forma-lighting-editor');
  assert.deepEqual(ids(api.searchCatalog(catalog, { query: 'lombada', origin: 'forma' })), ['forma-book-object']);
  assert.equal(ids(api.searchCatalog(catalog, { query: 'espa\u00e7amento', kind: 'layout' }))[0], 'forma-spatial-layout');
  assert.ok(ids(api.searchCatalog(catalog, { query: 'formul\u00e1rio' })).includes('forma-recoverable-forms'));
});

test('literal subject wins an alias tie without replacing field relevance or related matches', () => {
  const result = cli('--query', 'barra lateral', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.equal(ids(board)[0], 'forma-clean-shell');
  const shell = board.results.find(({ entry }) => entry.id === 'forma-clean-shell');
  const related = board.results.find(({ entry }) => entry.id === 'forma-adaptive-list-detail');
  assert.equal(shell.match.lexicalScore, related.match.lexicalScore);
  assert.ok(shell.match.literalMatches > related.match.literalMatches);
  const navigation = ids(api.searchCatalog(catalog, { query: 'navega\u00e7\u00e3o', limit: 50 }));
  assert.ok(navigation.includes('forma-clean-shell'));
  assert.ok(navigation.includes('forma-adaptive-list-detail'));
  const higherField = structuredClone(catalog);
  higherField.entries = [higherField.entries.find(entry => entry.id === 'forma-clean-shell'),
    higherField.entries.find(entry => entry.id === 'forma-adaptive-list-detail')];
  higherField.entries[1].name = 'Navigation detail';
  assert.equal(ids(api.searchCatalog(higherField, { query: 'sidebar' }))[0], 'forma-adaptive-list-detail');
});

test('profile lookup selects the editable profile instead of unrelated brand identity', () => {
  const result = cli('--query', 'perfil', '--limit', '1', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.deepEqual(ids(board), ['forma-material-profile']);
  assert.equal(board.results[0].match.matchedTerms[0].matched, 'profile');
  const profileResults = ids(api.searchCatalog(catalog, { query: 'perfil', limit: 50 }));
  assert.ok(profileResults.includes('forma-settings'));
  assert.ok(!profileResults.includes('forma-mascot-refinement'));
  const identityResults = ids(api.searchCatalog(catalog, { query: 'identidade', limit: 50 }));
  assert.ok(identityResults.includes('forma-mascot-refinement'));
});

test('browser-safe shared matcher gives the same Portuguese results and order as the CLI', () => {
  const moduleSource = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8');
  const browserSource = moduleSource.replace(/^export /gm, '')
    + '\nJSON.stringify(rankReferences(validateCatalog(catalog), {query}).map(result => ({id: result.entry.id, match: result.match})));';
  for (const query of ['perfil', 'identidade', 'barra lateral', 'lombada', 'fotografia', 'espa\u00e7amento', 'formul\u00e1rio']) {
    const browserResults = JSON.parse(vm.runInNewContext(browserSource, { catalog, query }, { timeout: 5000 }));
    const result = cli('--query', query, '--limit', '50', '--json');
    assert.equal(result.status, 0, result.stderr);
    const board = JSON.parse(result.stdout);
    assert.ok(board.totalMatches > 0, query);
    assert.equal(browserResults.length, board.totalMatches, query);
    assert.deepEqual(browserResults.slice(0, 50), board.results.map(({ entry, match }) => ({ id: entry.id, match })), query);
  }
});

test('browser and CLI use the shared schema and lexical matcher', () => {
  const source = fs.readFileSync(path.join(root, 'assets/reference-browser.js'), 'utf8');
  const sharedImports = source.match(/import \{([^}]+)\} from ['"]\.\.\/scripts\/lib\/reference-search\.mjs(?:\?v=[\d.]+)?['"]/);
  assert.ok(sharedImports, 'Browser must import the shared search module');
  const imported = sharedImports[1].split(',').map(name => name.trim());
  for (const name of ['rankReferences', 'validateCatalog', 'validateSiteIndex', 'rankSites', 'suggestSiteCases']) assert.ok(imported.includes(name), name);
  assert.match(source, /rankReferences\(\{ entries \}/);
  assert.match(source, /validateCatalog\(patternResult\.value\)/);
  assert.doesNotMatch(source, /const aliases\s*=/);
});

test('all query terms and exact filters must match without fallback', () => {
  const board = api.searchCatalog(catalog, { query: 'photography', kind: 'media', origin: 'forma', useCase: 'credits', limit: 3 });
  assert.deepEqual(ids(board), ['forma-reference-media']);
  assert.equal(api.searchCatalog(catalog, { query: 'photography xyzunmatchable' }).totalMatches, 0);
  assert.equal(api.searchCatalog(catalog, { kind: '3d', evidenceType: 'executable-demo' }).totalMatches, 0);
  assert.equal(api.searchCatalog(catalog, { query: 'lombada', useCase: 'sidebar' }).totalMatches, 0);
  assert.throws(() => api.searchCatalog(catalog, { origin: 'external' }), /Unknown origin/);
  assert.throws(() => api.searchCatalog(catalog, { query: 'quero um site' }), /specific subject/);
});

test('availability filter separates supplied code from implementation contracts', () => {
  const result = cli('--evidence', 'reusable-component', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.deepEqual(ids(board).sort(), ['forma-book-object', 'forma-lighting-editor', 'forma-passport-object']);
  assert.equal(board.request.evidenceType, 'reusable-component');
  assert.equal(board.results[0].match.filters.evidenceType, 'reusable-component');
  const contracts = api.searchCatalog(catalog, { evidenceType: 'implementation-contract', limit: 50 });
  assert.ok(!ids(contracts).includes('forma-lighting-editor'));
  assert.ok(ids(contracts).includes('forma-material-profile'));
  assert.ok(!ids(contracts).includes('forma-passport-object'));
  assert.ok(!ids(contracts).includes('forma-clean-shell'));
  assert.throws(() => api.searchCatalog(catalog, { evidenceType: 'finished-product' }), /Unknown evidence/);
});

test('seed varies ties reproducibly while lexical relevance remains primary', () => {
  const options = { origin: 'forma', limit: 8, seed: 42 };
  assert.deepEqual(api.searchCatalog(catalog, options), api.searchCatalog(catalog, options));
  assert.notDeepEqual(ids(api.searchCatalog(catalog, options)), ids(api.searchCatalog(catalog, { ...options, seed: 43 })));
  const ranked = api.searchCatalog(catalog, { query: 'material', seed: 42, limit: 50 });
  for (let index = 1; index < ranked.results.length; index++) {
    assert.ok(ranked.results[index - 1].match.lexicalScore >= ranked.results[index].match.lexicalScore);
  }
});

test('JSON detail supplies structure, adaptation and verification without external-site assumptions', () => {
  const result = cli('--site', 'forma-spatial-layout', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.equal(board.schemaVersion, 2);
  assert.equal(board.catalogSchemaVersion, catalog.schemaVersion);
  assert.equal(board.results.length, 1);
  assert.equal(board.results[0].entry.id, 'forma-spatial-layout');
  assert.ok(board.results[0].entry.structure.length > 0);
  assert.ok(board.results[0].entry.verify.length > 0);
  assert.equal(board.method, 'local-lexical-alias-search');
  assert.ok(board.limitations.some(value => value.includes('not semantic')));
  const text = cli('--site', 'forma-spatial-layout');
  assert.equal(text.status, 0, text.stderr);
  assert.match(text.stdout, /Structure:/);
  assert.match(text.stdout, /Verify:/);
  assert.doesNotMatch(text.stdout, /undefined|URL:/);
});

test('CLI lists facets from the actual catalog without promising an external website inventory', () => {
  const listed = cli('--list', '--json');
  assert.equal(listed.status, 0, listed.stderr);
  const values = JSON.parse(listed.stdout);
  assert.equal(values.total, catalog.entries.length);
  assert.deepEqual(values.origins, { forma: catalog.entries.length });
  assert.ok(values.useCases.sidebar > 0);
  assert.ok(values.evidenceTypes['implementation-contract'] > 0);
  assert.equal(Object.values(values.evidenceTypes).reduce((a, b) => a + b, 0), catalog.entries.length);
  assert.match(cli('--help').stdout, /not an external website inventory/);
});

test('CLI rejects malformed, conflicting and unsupported arguments and references', () => {
  for (const args of [[], ['--query'], ['--query', '--json'], ['--kind', 'nonsense'], ['--origin', 'external'], ['--origin', 'taste'],
    ['--origin', 'forma', '--limit', '-1'], ['--origin', 'forma', '--limit', '2.5'], ['--origin', 'forma', '--limit', '51'],
    ['--origin', 'forma', '--seed', 'NaN'], ['--origin', 'forma', '--seed', '9007199254740992'], ['--site', 'missing'],
    ['--site', 'aww-pp-neue-montreal'], ['--site', 'forma-settings', '--query', 'settings'], ['--site', 'forma-settings', '--evidence', 'implementation-contract'],
    ['--list', '--out', 'unused.json'], ['--query', 'book', '--query', 'other'], ['--made-up'], ['anything'], ['--query', 'a'.repeat(501)]]) {
    const result = cli(...args);
    assert.notEqual(result.status, 0, JSON.stringify(args));
    assert.match(result.stderr, /Reference lookup failed/);
  }
});

test('empty lookup is an explicit successful no-result rather than unrelated recommendations', () => {
  for (const query of ['xyzunmatchable', 'cafeteria']) {
    const result = cli('--query', query, '--json');
    assert.equal(result.status, 0, result.stderr);
    const board = JSON.parse(result.stdout);
    assert.equal(board.totalMatches, 0);
    assert.deepEqual(board.results, []);
  }
});

test('board output is exclusive and preserves an existing file or symlink', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-reference-test-'));
  try {
    const output = path.join(temporary, 'board.json');
    const args = ['--query', 'lombada', '--origin', 'forma', '--json', '--out', output];
    const first = cli(...args);
    assert.equal(first.status, 0, first.stderr);
    assert.deepEqual(JSON.parse(fs.readFileSync(output, 'utf8')), JSON.parse(first.stdout));
    assert.equal(JSON.parse(first.stdout).schemaVersion, 2);
    assert.equal(JSON.parse(first.stdout).catalogSchemaVersion, 2);
    const saved = fs.readFileSync(output);
    assert.notEqual(cli(...args).status, 0);
    assert.deepEqual(fs.readFileSync(output), saved);
    const link = path.join(temporary, 'link.json');
    fs.symlinkSync(output, link);
    assert.notEqual(cli('--site', 'forma-settings', '--out', link).status, 0);
    assert.deepEqual(fs.readFileSync(output), saved);
    const legacy = path.join(temporary, 'legacy-board.json');
    const legacyContent = JSON.stringify({ schemaVersion: 1, results: [{ entry: { id: 'old-reference' } }] });
    fs.writeFileSync(legacy, legacyContent);
    assert.notEqual(cli('--site', 'forma-settings', '--out', legacy).status, 0);
    assert.equal(fs.readFileSync(legacy, 'utf8'), legacyContent);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});

test('catalog validation rejects old imports, duplicate IDs, invalid resources and unsupported evidence claims', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-catalog-test-'));
  try {
    const target = path.join(temporary, 'bad.json');
    const entry = catalog.entries[0];
    assert.throws(() => api.searchCatalog({ ...catalog, schemaVersion: 1 }, { query: 'profile' }), /Expected version 2/);
    const invalidEntries = [
      { ...entry, resources: null }, { ...entry, resources: [{ label: 'escape', path: 'assets/../../secret' }] },
      { ...entry, origin: 'external' }, { ...entry, id: 'external-record' }, { ...entry, score: 9.9 },
      { ...entry, verify: [] }, { ...entry, structure: [null] }, { ...entry, evidence: { ...entry.evidence, liveVerified: true } },
      { ...entry, evidence: { ...entry.evidence, type: 'finished-product' } },
    ];
    const invalidCatalogs = [{ schemaVersion: 1, provenance: {}, entries: [] }, { ...catalog, entries: [entry, entry] },
      ...invalidEntries.map(invalid => ({ ...catalog, entries: [invalid] }))];
    for (const invalid of invalidCatalogs) {
      fs.writeFileSync(target, JSON.stringify(invalid));
      assert.throws(() => api.loadCatalog(target), /Invalid/);
    }
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});


test('component lookup exposes executable assets and keeps the identity-card contract separate', () => {
  for (const [query, id, files] of [
    ['lighting', 'forma-lighting-editor', ['assets/appearance-editor.js', 'assets/appearance-editor.css']],
    ['articulated passport', 'forma-passport-object', ['assets/passport-object.js', 'assets/passport-object.css', 'assets/book-object.js']],
  ]) {
    const result = cli('--query', query, '--evidence', 'reusable-component', '--json');
    assert.equal(result.status, 0, result.stderr);
    const entry = JSON.parse(result.stdout).results.find(result => result.entry.id === id)?.entry;
    assert.ok(entry, id);
    const paths = entry.resources.map(resource => resource.path);
    for (const file of [...files, 'assets/components-lab.html', 'references/reusable-components.md']) assert.ok(paths.includes(file), file);
    assert.equal(entry.evidence.liveVerified, false);
    assert.equal(entry.evidence.capture, null);
  }
  const profile = catalog.entries.find(entry => entry.id === 'forma-material-profile');
  assert.equal(profile.name, 'Editable identity card');
  assert.equal(profile.evidence.type, 'implementation-contract');
  assert.ok(!profile.resources.some(resource => resource.path === 'assets/passport-object.js'));
  assert.equal(api.facets(catalog).evidenceTypes['reusable-component'], 3);
});
