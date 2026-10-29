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
let api, catalog, index;
before(async () => {
  api = await import(pathToFileURL(script));
  catalog = api.loadCatalog();
  index = api.loadSiteIndex(undefined, catalog);
});
const cli = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', timeout: 10000, cwd: os.tmpdir() });
const ids = board => board.results.map(result => result.entry.id);

test('202 external factual candidates remain separate from authored patterns and case prose', () => {
  assert.equal(index.entries.length, 202);
  assert.equal(new Set(index.entries.map(entry => entry.id)).size, 202);
  assert.equal(new Set(index.entries.map(entry => entry.url)).size, 202);
  assert.match(index.provenance.inventory.revision, /^[a-f0-9]{40}$/);
  assert.ok(index.provenance.mapping.author.includes('Forma'));
  assert.ok(fs.existsSync(path.join(root, index.provenance.inventory.noticePath)));
  const cases = new Map(index.cases.map(item => [item.id, item]));
  const patterns = new Set(catalog.entries.map(entry => entry.id));
  for (const entry of index.entries) {
    assert.deepEqual(Object.keys(entry).sort(), ['caseIds', 'evidence', 'id', 'name', 'url']);
    assert.equal(entry.evidence.status, 'historical-candidate');
    assert.equal(entry.evidence.liveVerified, false);
    assert.equal(entry.evidence.capture, null);
    assert.ok(entry.caseIds.length > 0);
    for (const id of entry.caseIds) assert.ok(cases.has(id), id);
  }
  for (const item of cases.values()) {
    assert.ok(item.questions.length > 0 && item.adapt.length > 0 && item.verify.length > 0);
    for (const id of item.patternIds) assert.ok(patterns.has(id), id);
  }
  assert.equal(catalog.entries.some(entry => Object.hasOwn(entry, 'url')), false);
});

test('site facets and exact case filter report the actual assignments', () => {
  const result = cli('--sites', '--list', '--json');
  assert.equal(result.status, 0, result.stderr);
  const facets = JSON.parse(result.stdout);
  assert.equal(facets.total, 202);
  for (const item of index.cases) {
    const expected = index.entries.filter(entry => entry.caseIds.includes(item.id));
    assert.equal(facets.cases[item.id], expected.length);
    const board = api.searchSites(index, catalog, { caseId: item.id, limit: 50 });
    assert.equal(board.totalMatches, expected.length);
    assert.ok(board.results.every(result => result.cases.length === 1 && result.cases[0].id === item.id));
    assert.ok(board.results.every(result => result.patterns.every(pattern => item.patternIds.includes(pattern.id))));
  }
});

test('site detail board distinguishes factual origin, proposed cases and linked pattern availability', () => {
  const candidate = index.entries[0];
  const result = cli('--sites', '--site', candidate.id, '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.equal(board.schemaVersion, 2);
  assert.equal(board.sourceType, 'sites');
  assert.equal(board.catalogSchemaVersion, 1);
  assert.equal(board.patternCatalogSchemaVersion, 2);
  assert.equal(board.searchScope, 'identity-only');
  assert.deepEqual(board.suggestedCases, []);
  assert.deepEqual(ids(board), [candidate.id]);
  assert.equal(board.results[0].entry.url, candidate.url);
  assert.ok(board.results[0].cases.length > 0);
  assert.ok(board.results[0].patterns.length > 0);
  assert.ok(board.limitations.some(item => item.includes('not observations of each site')));
  const text = cli('--sites', '--site', candidate.id);
  assert.equal(text.status, 0, text.stderr);
  assert.match(text.stdout, /Investigate:/);
  assert.match(text.stdout, /Forma pattern/);
  assert.doesNotMatch(text.stdout, /undefined/);
});

test('site identity results and separate guide suggestions agree across browser and CLI', () => {
  const moduleSource = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8');
  const browserSource = moduleSource.replace(/^export /gm, '')
    + '\nJSON.stringify({ results: rankSites(validateSiteIndex(index, catalog), catalog, options), suggestedCases: suggestSiteCases(index, options) });';
  for (const options of [{ query: 'cafeteria' }, { query: 'typography' }, { caseId: index.cases[0].id }, { query: 'xyzunmatchable' }]) {
    const browserResults = JSON.parse(vm.runInNewContext(browserSource, { URL, index, catalog, options }, { timeout: 5000 }));
    const result = cli('--sites', ...(options.query ? ['--query', options.query] : ['--case', options.caseId]), '--limit', '50', '--json');
    assert.equal(result.status, 0, result.stderr);
    const board = JSON.parse(result.stdout);
    assert.equal(board.totalMatches, browserResults.results.length);
    assert.deepEqual(board.results, browserResults.results.slice(0, 50));
    assert.deepEqual(board.suggestedCases, browserResults.suggestedCases);
  }
  const source = fs.readFileSync(path.join(root, 'assets/reference-browser.js'), 'utf8');
  assert.match(source, /rankSites\(siteIndex, catalog/);
  assert.match(source, /validateSiteIndex\(siteResult\.value, catalog\)/);
});

test('guide suggestions do not promote assigned sites into identity matches', () => {
  for (const [query, expectedCase] of [
    ['cafeteria', 'venue-booking'], ['typography', 'typographic-interface'],
    ['lombada', 'object-inspection'], ['theme', 'appearance-controls'], ['mascot', 'character-feedback'],
  ]) {
    const board = api.searchSites(index, catalog, { query, limit: 50 });
    const assigned = index.entries.filter(entry => entry.caseIds.includes(expectedCase));
    assert.ok(assigned.length > 0, expectedCase);
    const suggestion = board.suggestedCases.find(item => item.case.id === expectedCase);
    assert.ok(suggestion, query);
    assert.equal(suggestion.candidateCount, assigned.length);
    assert.ok(suggestion.match.matchedTerms.length > 0, query);
    assert.ok(board.results.every(result => result.match.matchedTerms.every(term => ['name', 'url'].includes(term.field))));
  }
  assert.equal(api.searchSites(index, catalog, { query: 'xyzunmatchable' }).totalMatches, 0);
  assert.equal(api.searchSites(index, catalog, { query: 'typography xyzunmatchable' }).totalMatches, 0);
  assert.throws(() => api.searchSites(index, catalog, { caseId: 'not-a-case' }), /Unknown case/);
  assert.deepEqual(api.searchSites(index, catalog, { query: 'quero um site' }).suggestedCases, []);
  assert.deepEqual(api.suggestSiteCases(index, { query: 'typography xyzunmatchable' }), []);
  assert.throws(() => api.searchSites(index, catalog, { query: '!!!' }), /literal name/);
  const before = api.searchSites(index, catalog, { caseId: index.cases[0].id, seed: 42 });
  assert.deepEqual(api.searchSites(index, catalog, { caseId: index.cases[0].id, seed: 42 }), before);
});

test('identity searches normalize accents but never translate names or match question-only text', () => {
  const guide = index.cases[0];
  const fixture = { ...index, entries: [
    { ...index.entries[0], id: 'site-cafe-example', name: 'Caf\u00e9 Example', url: 'https://example.test/cafe', caseIds: [guide.id] },
    { ...index.entries[1], id: 'site-coffee-example', name: 'Coffee Example', url: 'https://coffee.test/', caseIds: [guide.id] },
  ], cases: index.cases.map(item => item.id === guide.id ? { ...item, questions: [...item.questions, 'onlyguidequestion'] } : item) };
  for (const query of ['cafe', 'caf\u00e9']) assert.deepEqual(ids(api.searchSites(fixture, catalog, { query })), ['site-cafe-example']);
  assert.deepEqual(ids(api.searchSites(fixture, catalog, { query: 'coffee' })), ['site-coffee-example']);
  for (const query of ['cafeteria', 'onlyguidequestion', 'caf', 'cafe unknown']) {
    assert.deepEqual(api.searchSites(fixture, catalog, { query }).results, []);
  }
  assert.equal(api.suggestSiteCases(fixture, { query: 'onlyguidequestion' })[0].candidateCount, 2);
  assert.equal(api.searchSites(fixture, catalog, { caseId: guide.id }).totalMatches, 2);
});

test('sites mode cannot silently reinterpret pattern filters or change the default pattern mode', () => {
  const normal = cli('--query', 'perfil', '--limit', '1', '--json');
  assert.equal(normal.status, 0, normal.stderr);
  const board = JSON.parse(normal.stdout);
  assert.equal(board.sourceType, 'patterns');
  assert.deepEqual(ids(board), ['forma-material-profile']);
  for (const args of [['--case', index.cases[0].id], ['--sites'], ['--sites', '--kind', 'interface'],
    ['--sites', '--origin', 'forma'], ['--sites', '--evidence', 'implementation-contract'],
    ['--sites', '--use-case', 'sidebar'], ['--sites', '--site', index.entries[0].id, '--case', index.cases[0].id],
    ['--sites', '--site', 'missing'], ['--sites', '--query', 'a'.repeat(501)], ['--sites', '--list', '--limit', '5']]) {
    const result = cli(...args);
    assert.notEqual(result.status, 0, JSON.stringify(args));
    assert.match(result.stderr, /Reference lookup failed/);
  }
});

test('form queries suggest enquiry, booking and registration guides rather than extended reading', () => {
  const formCases = new Set(['service-enquiry', 'venue-booking', 'event-registration']);
  let firstIds;
  for (const query of ['formulario', 'forms', 'form']) {
    const board = api.searchSites(index, catalog, { query, limit: 50 });
    assert.deepEqual(new Set(board.suggestedCases.map(item => item.case.id)), formCases);
    assert.deepEqual(api.searchSites(index, catalog, { query, caseId: 'editorial-reading' }).suggestedCases, []);
    const result = cli('--sites', '--query', query, '--limit', '5', '--json');
    assert.equal(result.status, 0, result.stderr);
    const cliIds = JSON.parse(result.stdout).suggestedCases.map(item => item.case.id);
    assert.deepEqual(cliIds, board.suggestedCases.map(item => item.case.id));
    if (firstIds) assert.deepEqual(cliIds, firstIds);
    firstIds = cliIds;
  }
  assert.equal(api.suggestSiteCases(index, { query: 'reading', caseId: 'editorial-reading' })[0].case.id, 'editorial-reading');
});

test('US and British inquiry spellings suggest the same service and booking guides', () => {
  const inquiryCases = new Set(['service-enquiry', 'venue-booking']);
  for (const query of ['inquiry', 'enquiry']) {
    const results = api.suggestSiteCases(index, { query });
    assert.deepEqual(new Set(results.map(result => result.case.id)), inquiryCases);
    assert.deepEqual(api.searchSites(index, catalog, { query, caseId: 'editorial-reading' }).suggestedCases, []);
    const result = cli('--sites', '--query', query, '--limit', '5', '--json');
    assert.equal(result.status, 0, result.stderr);
    const board = JSON.parse(result.stdout);
    assert.deepEqual(board.suggestedCases, results);
  }
});

test('site boards never overwrite existing pattern, legacy or symlink outputs', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-site-board-'));
  try {
    const output = path.join(temporary, 'new.json');
    const command = ['--sites', '--site', index.entries[0].id, '--json', '--out', output];
    const fresh = cli(...command);
    assert.equal(fresh.status, 0, fresh.stderr);
    assert.deepEqual(JSON.parse(fs.readFileSync(output, 'utf8')), JSON.parse(fresh.stdout));
    for (const content of [fresh.stdout, JSON.stringify({ schemaVersion: 1, results: [] }), JSON.stringify(api.searchCatalog(catalog, { query: 'profile' }))]) {
      fs.writeFileSync(output, content);
      assert.notEqual(cli(...command).status, 0);
      assert.equal(fs.readFileSync(output, 'utf8'), content);
    }
    const alias = path.join(temporary, 'alias.json');
    fs.symlinkSync(output, alias);
    assert.notEqual(cli('--sites', '--site', index.entries[0].id, '--out', alias).status, 0);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});

test('site validator rejects unsafe URLs, copied description fields, dangling cases and unknown patterns', () => {
  const entry = index.entries[0], item = index.cases[0];
  for (const invalid of [
    { ...index, entries: [entry, entry] },
    { ...index, entries: [{ ...entry, url: 'javascript:alert(1)' }] },
    { ...index, entries: [{ ...entry, url: 'https://user:secret@example.com/' }] },
    { ...index, entries: [{ ...entry, url: 'https://example.com/\nmisleading' }] },
    { ...index, entries: [{ ...entry, caseIds: ['missing'] }] },
    { ...index, entries: [{ ...entry, score: 9.9 }] },
    { ...index, entries: [{ ...entry, idea: 'An upstream description' }] },
    { ...index, entries: [{ ...entry, evidence: { ...entry.evidence, liveVerified: true } }] },
    { ...index, cases: [{ ...item, patternIds: ['missing-pattern'] }] },
  ]) assert.throws(() => api.validateSiteIndex(invalid, catalog), /Invalid/);
});
