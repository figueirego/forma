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
let api, observed, catalog, sources;
before(async () => {
  api = await import(pathToFileURL(script));
  observed = api.loadObservedExperiences();
  catalog = api.loadCatalog();
  sources = Object.fromEntries(api.observedEvidencePaths(observed).map(name => [name, fs.readFileSync(path.join(root, name), 'utf8')]));
});
const cli = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', timeout: 10000, cwd: os.tmpdir() });
const ids = result => result.results.map(item => item.entry.id);
const clone = value => JSON.parse(JSON.stringify(value));

test('six bounded sources retain inventory identities without promoting the inventories', () => {
  const siteIndex = api.loadSiteIndex(undefined, catalog), portfolios = api.loadPortfolioIndex(undefined, catalog);
  assert.equal(observed.entries.length, 6);
  assert.equal(api.observedFacets(observed).observedClaims, 10);
  for (const entry of observed.entries) {
    const source = (entry.sourceIdentity.collection === 'sites' ? siteIndex : portfolios).entries.find(item => item.id === entry.sourceIdentity.id);
    assert.ok(source, entry.id);
    assert.equal(source.name, entry.name);
    assert.equal(source.evidence.status, 'historical-candidate');
    assert.equal(source.evidence.liveVerified, false);
    assert.equal(source.url, entry.requestedUrl);
  }
  assert.equal(siteIndex.entries.length, 202);
  assert.equal(portfolios.entries.length, 2079);
});

test('concrete feature queries return the specific observed claim supporting every term', () => {
  for (const [query, expectedEntry, expectedClaim] of [
    ['sticky navigation', 'observed-brittany-chiang', 'brittany-sticky-navigation'],
    ['section anchor', 'observed-brittany-chiang', 'brittany-section-anchors'],
    ['dark typography', 'observed-brittany-chiang', 'brittany-dark-typography'],
    ['expand biography', 'observed-lee-robinson', 'lee-progressive-biography'],
    ['mobile reading', 'observed-lee-robinson', 'lee-narrow-reading'],
    ['keyboard preview', 'observed-dialkit', 'dialkit-weight-preview'],
    ['weight specimen', 'observed-neue-montreal', 'neue-montreal-weight-specimen'],
    ['canvas text', 'observed-thoughtbot-report', 'thoughtbot-text-data'],
    ['keyboard project', 'observed-francisco-salido', 'paco-project-selection'],
  ]) {
    const result = api.searchObservedExperiences(observed, { query });
    assert.deepEqual(ids(result), [expectedEntry], query);
    assert.deepEqual(result.results[0].matchedClaims.map(item => item.claim.id), [expectedClaim], query);
    assert.ok(result.results[0].matchedClaims.every(item => item.claim.status === 'observed'));
  }
});

test('unknown, caveat-only, framework and cross-claim terms have no fallback', () => {
  for (const query of ['xyzunknown', 'sticky xyzunknown', 'WebGL', 'Framer', 'React', 'screen reader', 'reduced motion', 'performance', 'sidebar', 'dark sticky', 'Brittany biography']) {
    const board = api.searchObservedExperiences(observed, { query });
    assert.equal(board.totalMatches, 0, query);
    assert.deepEqual(board.results, [], query);
    assert.equal(Object.hasOwn(board, 'suggestedCases'), false);
  }
  assert.throws(() => api.searchObservedExperiences(observed, { query: 'a design website' }), /specific feature/);
});

test('inferred and unverified feature labels do not enter results or facets', () => {
  const fixture = clone(observed);
  for (const [status, evidenceType] of [['inferred', 'inference'], ['unverified', 'not-tested']]) {
    fixture.entries[0].claims.push({ ...clone(fixture.entries[0].claims[0]), id: `excluded-${status}`, status,
      features: ['neural projection'], useCases: ['neural-projection'], evidence: { ...fixture.entries[0].claims[0].evidence, type: evidenceType } });
  }
  api.validateObservedExperiences(fixture);
  assert.deepEqual(ids(api.searchObservedExperiences(fixture, { query: 'neural projection' })), []);
  assert.equal(Object.hasOwn(api.observedFacets(fixture).useCases, 'neural-projection'), false);
  assert.throws(() => api.searchObservedExperiences(fixture, { useCase: 'neural-projection' }), /Unknown observed use-case/);
});

test('exact use-case and identity constraints combine with claim query', () => {
  assert.deepEqual(ids(api.searchObservedExperiences(observed, { useCase: 'compact-expandable-biography', query: 'Long' })), []);
  assert.deepEqual(ids(api.searchObservedExperiences(observed, { useCase: 'compact-expandable-biography', query: 'Lee biography' })), ['observed-lee-robinson']);
  assert.deepEqual(ids(api.searchObservedExperiences(observed, { query: 'brittanychiang com typography' })), ['observed-brittany-chiang']);
  assert.throws(() => api.searchObservedExperiences(observed, { useCase: 'unknown' }), /Unknown observed use-case/);
  assert.equal(api.searchObservedExperiences(observed, { site: 'observed-lee-robinson' }).results[0].matchedClaims.length, 3);
});

test('CLI and browser-shared search produce equal claim-level results', () => {
  const source = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8').replace(/^export /gm, '')
    + '\nJSON.stringify(rankObservedExperiences(validateObservedEvidence(index, sources), options));';
  for (const options of [{ query: 'biography' }, { query: 'WebGL' }, { query: 'mobile' }, { useCase: 'control-preview-consistency' }]) {
    const inBrowserContext = JSON.parse(vm.runInNewContext(source, { URL, index: observed, sources, options }, { timeout: 5000 }));
    const command = cli('--observed', ...(options.query ? ['--query', options.query] : ['--use-case', options.useCase]), '--json');
    assert.equal(command.status, 0, command.stderr);
    const board = JSON.parse(command.stdout);
    assert.equal(board.sourceType, 'observed');
    assert.equal(board.searchScope, 'observed-features');
    assert.deepEqual(board.results, inBrowserContext);
  }
});

test('loaders verify exact source sections, assertions and receipt metadata', () => {
  assert.equal(api.validateObservedEvidence(observed, sources), observed);
  const missing = clone(observed); missing.entries[0].claims[0].evidence.assertion = missing.entries[0].claims[0].statement = 'This behavior was never recorded.';
  assert.throws(() => api.validateObservedEvidence(missing, sources), /Unsupported observed evidence assertion/);
  const wrongSection = clone(observed); wrongSection.entries[0].claims[0].evidence.source = 'references/site-experiences.md#progressive-portfolio-biography';
  assert.throws(() => api.validateObservedEvidence(wrongSection, sources), /Unsupported observed evidence assertion/);
  const absentAnchor = clone(observed); absentAnchor.entries[0].claims[0].evidence.source = 'references/site-experiences.md#missing';
  assert.throws(() => api.validateObservedEvidence(absentAnchor, sources), /Missing observed evidence anchor/);
  assert.throws(() => api.validateObservedEvidence(observed, {}), /Missing observed evidence source/);
  const receipt = clone(observed); receipt.provenance.receipts[0].sha256 = '0'.repeat(64);
  assert.throws(() => api.validateObservedEvidence(receipt, sources), /Unsupported observed receipt assertion/);
  const wrongDate = clone(observed); wrongDate.entries.find(entry => entry.id === 'observed-dialkit').claims[0].date = '2026-10-28';
  assert.throws(() => api.validateObservedEvidence(wrongDate, sources), /Unsupported observed evidence assertion/);
});

test('observation dates bind to unique study metadata, not dates elsewhere in the document', () => {
  const fixture = clone(observed);
  fixture.entries.find(entry => entry.id === 'observed-dialkit').claims[0].date = '2025-01-01';
  const unrelated = { ...sources, 'references/site-experiences.md': sources['references/site-experiences.md']
    + '\n## Unrelated study\n\n**Observation date:** 2025-01-01.\n' };
  assert.throws(() => api.validateObservedEvidence(fixture, unrelated), /Unsupported observed evidence assertion: dialkit-weight-preview/);
  const absentMetadata = { ...sources, 'references/site-experiences.md': sources['references/site-experiences.md']
    .replace('**Observation date:** 2026-10-29.', '') };
  assert.throws(() => api.validateObservedEvidence(observed, absentMetadata), /Unsupported observed evidence assertion: dialkit-weight-preview/);
  const ambiguous = { ...sources, 'references/site-experiences.md': sources['references/site-experiences.md']
    .replace('**Observation date:** 2026-10-29.', '**Observation date:** 2026-10-29.\n\n**Observation date:** 2025-01-01.') };
  assert.throws(() => api.validateObservedEvidence(observed, ambiguous), /Unsupported observed evidence assertion: dialkit-weight-preview/);
});

test('schema rejects unsafe URLs, duplicate IDs, invalid dates and unsupported evidence assertions', () => {
  const mutations = [
    value => value.entries.push(clone(value.entries[0])),
    value => value.entries[0].url = 'javascript:alert(1)',
    value => value.entries[0].requestedUrl = 'https://user:secret@example.test/',
    value => value.entries[0].url = 'https://example.test/\nspoof',
    value => value.entries[0].claims[0].sourceUrl = 'https://unrelated.test/',
    value => value.entries[0].claims[0].date = '2026-02-30',
    value => value.entries[0].claims[0].date = '2026-13-01',
    value => value.entries[0].claims[0].date = 'yesterday',
    value => value.entries[0].claims[0].conditions = '',
    value => value.entries[0].claims[0].features = [],
    value => value.entries[0].claims[0].caveats = [],
    value => value.entries[0].claims[0].evidence.source = 'references/../secrets.txt',
    value => value.entries[0].claims[0].evidence.source = 'https://evil.test/source.md',
    value => value.entries[0].claims[0].evidence.assertion = '',
    value => value.entries[0].claims[0].statement = 'A different claim without a supporting assertion.',
    value => value.entries[0].claims[0].evidence.type = 'inference',
    value => value.entries[0].claims[0].evidence.receiptId = 'missing',
    value => value.entries[0].claims[1].id = value.entries[0].claims[0].id,
    value => value.entries[0].claims[0].date = '2026-10-28',
    value => value.entries[0].liveVerified = true,
    value => value.provenance.receipts[0].distributed = true,
  ];
  for (const mutate of mutations) {
    const invalid = clone(observed); mutate(invalid);
    assert.throws(() => api.validateObservedExperiences(invalid), /Invalid/, mutate.toString());
  }
});

test('observed selector and filters do not reinterpret existing modes', () => {
  for (const args of [['--observed'], ['--observed', '--sites', '--list'], ['--observed', '--portfolios', '--list'],
    ['--observed', '--kind', 'interface'], ['--observed', '--evidence', 'observed-dom'], ['--observed', '--origin', 'forma'],
    ['--observed', '--case', 'typographic-interface'], ['--observed', '--site', 'missing'],
    ['--observed', '--list', '--query', 'typography'], ['--observed', '--query', 'x', '--limit', '0']]) {
    const result = cli(...args);
    assert.notEqual(result.status, 0, JSON.stringify(args));
  }
  const listed = cli('--observed', '--list', '--json');
  assert.equal(listed.status, 0, listed.stderr);
  assert.deepEqual(JSON.parse(listed.stdout), api.observedFacets(observed));
  const plain = cli('--observed', '--query', 'sticky navigation');
  assert.equal(plain.status, 0, plain.stderr);
  assert.match(plain.stdout, /Conditions:.*1280x800/);
  assert.match(plain.stdout, /Evidence source:/);
  assert.doesNotMatch(plain.stdout, /undefined/);
  assert.match(cli('--observed', '--query', 'WebGL').stdout, /No observed claims match/);
  assert.equal(JSON.parse(cli('--sites', '--query', 'typography', '--json').stdout).searchScope, 'identity-only');
  assert.equal(JSON.parse(cli('--portfolios', '--query', 'Brittany', '--json').stdout).sourceType, 'portfolios');
  assert.equal(JSON.parse(cli('--query', 'profile', '--json').stdout).sourceType, 'patterns');
});

test('observed boards preserve explicit output creation and refuse overwrite', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-observed-'));
  const output = path.join(directory, 'board.json');
  try {
    const args = ['--observed', '--query', 'biography', '--json', '--out', output];
    const first = cli(...args);
    assert.equal(first.status, 0, first.stderr);
    const saved = fs.readFileSync(output, 'utf8');
    assert.deepEqual(JSON.parse(saved), JSON.parse(first.stdout));
    assert.notEqual(cli(...args).status, 0);
    assert.equal(fs.readFileSync(output, 'utf8'), saved);
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});

test('authored observed copy is ASCII and browser exposes a distinct evidence-aware collection', () => {
  const check = (value, key = '') => {
    if (typeof value === 'string' && !['name', 'url', 'requestedUrl', 'sourceUrl'].includes(key)) assert.doesNotMatch(value, /[^\x20-\x7e]/, key);
    else if (value && typeof value === 'object') for (const [child, item] of Object.entries(value)) check(item, child);
  };
  check(observed);
  const html = fs.readFileSync(path.join(root, 'assets/reference-browser.html'), 'utf8');
  const browser = fs.readFileSync(path.join(root, 'assets/reference-browser.js'), 'utf8');
  assert.match(html, /value="observed">Observed experiences/);
  assert.match(browser, /validateObservedEvidence\(index, Object\.fromEntries\(sources\)\)/);
  assert.match(browser, /rankObservedExperiences\(siteIndex/);
  assert.match(browser, /Literal feature words must match the same observed claim/);
});
