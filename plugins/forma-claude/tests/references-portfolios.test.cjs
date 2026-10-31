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
const cli = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', timeout: 15000, cwd: os.tmpdir() });
let api, catalog, index, sites;
before(async () => {
  api = await import(pathToFileURL(script));
  catalog = api.loadCatalog(); index = api.loadPortfolioIndex(undefined, catalog); sites = api.loadSiteIndex(undefined, catalog);
});

test('portfolio collection preserves every source row, including the quarantined URL', () => {
  assert.equal(index.schemaVersion, 2);
  assert.equal(index.collection, 'developer-portfolios');
  assert.equal(index.entries.length, 2079);
  assert.equal(new Set(index.entries.map(entry => entry.id)).size, 2079);
  assert.equal(new Set(index.entries.map(entry => entry.source.line)).size, 2079);
  assert.ok(index.provenance.inventory.url.endsWith(`/blob/${index.provenance.inventory.revision}/README.md`));
  assert.ok(fs.existsSync(path.join(root, index.provenance.inventory.noticePath)));
  for (const entry of index.entries) {
    assert.equal(entry.evidence.liveVerified, false);
    assert.equal(entry.evidence.capture, null);
    if (!entry.source.issue) assert.equal(entry.url, entry.source.originalUrl);
  }
  const quarantined = index.entries.filter(entry => entry.source.issue);
  assert.equal(quarantined.length, 1);
  assert.equal(quarantined[0].url, null);
  assert.equal(quarantined[0].source.issue, 'malformed-url');
  assert.ok(quarantined[0].source.originalUrl.endsWith('"'));
  assert.equal(sites.schemaVersion, 1);
  assert.equal(sites.entries.length, 202);
  assert.equal(sites.entries.some(entry => entry.source !== undefined), false);
});

test('CLI keeps portfolios, sites and patterns as explicit independent collections', () => {
  for (const [args, total] of [[['--portfolios'], 2079], [['--sites'], 202], [[], 22]]) {
    const result = cli(...args, '--list', '--json');
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).total, total);
  }
  const result = cli('--portfolios', '--case', index.cases[0].id, '--limit', '1', '--json');
  assert.equal(result.status, 0, result.stderr);
  const board = JSON.parse(result.stdout);
  assert.equal(board.schemaVersion, 2);
  assert.equal(board.catalogSchemaVersion, 2);
  assert.equal(board.patternCatalogSchemaVersion, 2);
  assert.equal(board.sourceType, 'portfolios');
  assert.equal(board.totalMatches, 2079);
  assert.equal(board.results.length, 1);
  assert.deepEqual(board.results[0].cases.map(item => item.id), [index.cases[0].id]);
  for (const args of [
    ['--sites', '--portfolios', '--list'], ['--sites', '--portfolios', '--help'], ['--portfolios'],
    ['--portfolios', '--kind', 'interface'], ['--portfolios', '--origin', 'forma'],
    ['--portfolios', '--case', 'unknown'], ['--portfolios', '--site', sites.entries[0].id],
    ['--portfolios', '--query', 'a'.repeat(501)], ['--portfolios', '--query', 'portfolio', '--limit', '51'],
  ]) assert.notEqual(cli(...args).status, 0, JSON.stringify(args));
});

test('accented name lookup and source details survive CLI serialization without URL normalization', () => {
  const name = 'Ana S\u00e1 Oliveira';
  const entry = index.entries.find(item => item.name === name);
  assert.ok(entry);
  for (const query of [name, 'ana sa oliveira']) {
    const result = cli('--portfolios', '--query', query, '--json');
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout).results.map(item => item.entry.id), [entry.id]);
  }
  const quarantined = index.entries.find(item => item.source.issue);
  const result = cli('--portfolios', '--site', quarantined.id, '--json');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).results[0].entry, quarantined);
  const text = cli('--portfolios', '--site', quarantined.id);
  assert.equal(text.status, 0, text.stderr);
  assert.match(text.stdout, /URL: quarantined; not a visit link/);
  assert.ok(text.stdout.includes(`${index.provenance.inventory.url}#L${quarantined.source.line}`));
  assert.ok(text.stdout.includes(JSON.stringify(quarantined.source.originalUrl)));
});

test('portfolio lookup uses the same deterministic browser-safe matcher as existing sites', () => {
  const source = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8').replace(/^export /gm, '');
  for (const options of [{ query: 'ana sa oliveira' }, { query: 'xyzunmatchable' }, { caseId: index.cases[1].id }]) {
    const browser = JSON.parse(vm.runInNewContext(`${source}\nJSON.stringify(rankSites(validateSiteIndex(index, catalog), catalog, options));`, { URL, index, catalog, options }, { timeout: 5000 }));
    const board = api.searchSites(index, catalog, { ...options, limit: 50 });
    assert.equal(board.totalMatches, browser.length);
    assert.deepEqual(board.results, browser.slice(0, 50));
  }
});

test('shared portfolio guide terms never become identity matches or technology evidence', () => {
  for (const query of ['motion', '3d', 'typography']) {
    const board = api.searchSites(index, catalog, { query, limit: 50 });
    assert.ok(board.totalMatches < index.entries.length, query);
    assert.equal(board.searchScope, 'identity-only');
    assert.ok(board.results.every(result => result.match.matchedTerms.every(term => ['name', 'url'].includes(term.field))));
    assert.ok(board.suggestedCases.length > 0, query);
    assert.ok(board.suggestedCases.every(item => item.candidateCount === 2079));
  }
  const board = api.searchSites(index, catalog, { query: 'react' });
  assert.ok(board.results.length > 0);
  assert.ok(board.results.every(result => result.match.matchedTerms.every(term => term.field === 'url')));
  assert.ok(board.results.every(result => result.entry.evidence.liveVerified === false));
  assert.ok(board.limitations.some(item => item.includes('does not verify technology')));
});

test('generated portfolio ID prefixes never expand name and URL search while exact ID lookup remains available', () => {
  const containsPortfolio = value => (String(value).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).includes('portfolio');
  const expected = index.entries.filter(entry => containsPortfolio(entry.name) || containsPortfolio(entry.url ?? entry.source.originalUrl));
  assert.ok(expected.length > 0 && expected.length < index.entries.length);
  const board = api.searchSites(index, catalog, { query: 'portfolio', limit: 50 });
  assert.equal(board.totalMatches, expected.length);
  assert.ok(board.results.every(result => expected.some(entry => entry.id === result.entry.id)));
  const candidate = index.entries.find(entry => !expected.includes(entry));
  assert.deepEqual(api.searchSites(index, catalog, { query: candidate.id }).results, []);
  const detail = cli('--portfolios', '--site', candidate.id, '--json');
  assert.equal(detail.status, 0, detail.stderr);
  assert.deepEqual(JSON.parse(detail.stdout).results.map(result => result.entry.id), [candidate.id]);
});

test('portfolio guide suggestions preserve aliases, all-term matching and browser/CLI parity', () => {
  const source = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8').replace(/^export /gm, '');
  for (const options of [{ query: 'movimento' }, { query: '3d' }, { query: '3d xyzunmatchable' }, { query: 'motion', caseId: index.cases[0].id }, {}]) {
    const browser = JSON.parse(vm.runInNewContext(`${source}\nJSON.stringify(suggestSiteCases(index, options));`, { URL, index, options }, { timeout: 5000 }));
    const board = api.searchSites(index, catalog, options);
    assert.deepEqual(board.suggestedCases, browser);
    if (options.query) {
      const result = cli('--portfolios', '--query', options.query, ...(options.caseId ? ['--case', options.caseId] : []), '--json');
      assert.equal(result.status, 0, result.stderr);
      assert.deepEqual(JSON.parse(result.stdout).suggestedCases, browser);
    }
  }
  assert.deepEqual(api.suggestSiteCases(index), []);
  assert.deepEqual(api.suggestSiteCases(index, { query: 'motion xyzunmatchable' }), []);
  assert.equal(api.rankSites(index, catalog, { query: 'movimento' }).length, 0);
  assert.equal(api.rankSites(index, catalog, { query: 'moti' }).length, 0);
  assert.throws(() => api.suggestSiteCases(index, { query: 'motion', caseId: 'unknown' }), /Unknown case/);
  const result = cli('--portfolios', '--query', 'motion');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Suggested investigation guides/);
  assert.match(result.stdout, /2079 unverified candidates/);
  assert.match(result.stdout, /--portfolios --case portfolio-navigation/);
});

test('portfolio relevance ties use readable alphabetical names while seed and legacy site order remain stable', () => {
  const expected = [...index.entries].sort((a, b) => a.name.localeCompare(b.name, 'en') || a.id.localeCompare(b.id, 'en')).map(entry => entry.id);
  const ranked = options => api.rankSites(index, catalog, options).map(result => result.entry.id);
  assert.deepEqual(ranked({}), expected);
  assert.deepEqual(ranked({ caseId: index.cases[0].id }), expected);
  assert.deepEqual(ranked({ seed: 42 }), ranked({ seed: 42 }));
  assert.notDeepEqual(ranked({ seed: 42 }), expected);
  assert.deepEqual(api.rankSites(sites, catalog).map(result => result.entry.id), [...sites.entries].map(entry => entry.id).sort((a, b) => a.localeCompare(b, 'en')));
  const result = cli('--portfolios', '--case', index.cases[0].id, '--limit', '5', '--json');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).results.map(item => item.entry.id), expected.slice(0, 5));
});

test('v2 validates pinned provenance and source data without weakening v1', () => {
  const entry = index.entries.find(item => !item.source.issue), invalid = index.entries.find(item => item.source.issue);
  const version = changes => ({ ...index, ...changes });
  for (const bad of [
    version({ schemaVersion: 3 }), version({ collection: 'other' }),
    version({ provenance: { ...index.provenance, inventory: { ...index.provenance.inventory, url: 'https://github.com/owner/repo/blob/main/README.md' } } }),
    version({ entries: [{ ...entry, source: undefined }] }),
    version({ entries: [{ ...entry, source: { ...entry.source, line: 0 } }] }),
    version({ entries: [{ ...entry, source: { ...entry.source, originalUrl: `${entry.url}/changed` } }] }),
    version({ entries: [{ ...entry, source: { ...entry.source, issue: 'other' } }] }),
    version({ entries: [{ ...entry, url: null, source: { ...entry.source, issue: 'malformed-url' } }] }),
    version({ entries: [{ ...entry, url: 'javascript:alert(1)', source: { ...entry.source, originalUrl: 'javascript:alert(1)' } }] }),
    version({ entries: [{ ...invalid, url: invalid.source.originalUrl }] }),
    version({ entries: [{ ...invalid, source: { ...invalid.source, issue: null } }] }),
    version({ entries: [{ ...entry, evidence: { ...entry.evidence, liveVerified: true } }] }),
    { ...sites, entries: [{ ...sites.entries[0], source: entry.source }] },
    { ...sites, entries: [{ ...sites.entries[0], url: null }] },
  ]) assert.throws(() => api.validateSiteIndex(bad, catalog), /Invalid/);
  assert.throws(() => api.loadPortfolioIndex(api.SITE_INDEX_PATH, catalog), /Invalid developer portfolio/);
});

test('portfolio URL quarantine agrees with the importer for DEL and Unicode whitespace', () => {
  const entry = index.entries.find(item => !item.source.issue);
  for (const character of ['\u007f', '\u00a0', '\u2003']) {
    const originalUrl = `https://example.com/a${character}b`;
    const quarantined = { ...entry, url: null, source: { ...entry.source, originalUrl, issue: 'malformed-url' } };
    assert.doesNotThrow(() => api.validateSiteIndex({ ...index, entries: [quarantined] }, catalog));
    assert.throws(() => api.validateSiteIndex({ ...index, entries: [{ ...quarantined, url: originalUrl, source: { ...quarantined.source, issue: null } }] }, catalog), /Invalid portfolio source/);
    assert.equal(quarantined.source.originalUrl, originalUrl);
  }
});

test('exported URL predicate is the shared pure contract for importer and portfolio validation', async () => {
  const { isSafePortfolioURL } = await import(pathToFileURL(path.join(root, 'scripts/lib/reference-search.mjs')));
  for (const value of ['https://example.com/path%20name', 'http://example.com/', 'https://example.com/fn(a)']) assert.equal(isSafePortfolioURL(value), true, value);
  for (const value of [null, '', 'javascript:alert(1)', 'https://user:secret@example.com/', 'https://example.com/"',
    'https://example.com/a\u007fb', 'https://example.com/a\u00a0b', 'https://exa%mple.org/', 'https://999.999.999.999/']) {
    assert.equal(isSafePortfolioURL(value), false, String(value));
  }
  for (const entry of index.entries) assert.equal(isSafePortfolioURL(entry.source.originalUrl), entry.source.issue === null, entry.id);
});

test('portfolio boards are exclusive writes from any working directory', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'forma-portfolio-board-'));
  try {
    const output = path.join(temporary, 'board.json');
    const args = ['--portfolios', '--site', index.entries[0].id, '--json', '--out', output];
    const result = cli(...args);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(fs.readFileSync(output)), JSON.parse(result.stdout));
    const saved = fs.readFileSync(output, 'utf8');
    assert.notEqual(cli(...args).status, 0);
    assert.equal(fs.readFileSync(output, 'utf8'), saved);
    const alias = path.join(temporary, 'link.json'); fs.symlinkSync(output, alias);
    assert.notEqual(cli('--portfolios', '--site', index.entries[0].id, '--out', alias).status, 0);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});

// Execute the browser module with a small DOM boundary: verifies collection transitions and
// generated links without making a network request or pretending to prove visual layout.
async function browserHarness({ missingPortfolio = false, missingObserved = false, missingObservedEvidence = false } = {}) {
  const nodes = new Map();
  let document;
  class Node {
    constructor(tag = 'div') { this.tag = tag; this.children = []; this.listeners = {}; this.classList = { toggle() {} }; this._text = ''; }
    set textContent(value) { this._text = String(value); this.children = []; }
    get textContent() { return this._text + this.children.map(child => typeof child === 'string' ? child : child.textContent).join(''); }
    get firstChild() { return this.children[0]; }
    get value() { return this._value ?? (this.tag === 'select' ? this.firstChild?.value ?? '' : ''); }
    set value(value) { this._value = value; }
    append(...items) { for (const item of items) this.children.push(...(item?.tag === '#fragment' ? item.children : [item])); }
    replaceChildren(...items) { this.children = []; this._text = ''; if (this.tag === 'select') delete this._value; this.append(...items); }
    addEventListener(type, listener) { this.listeners[type] = listener; }
    setAttribute(name, value) { this[name] = value; }
    querySelector(tag) { return this.children.find(child => child.tag === tag) ?? this.children.map(child => child.querySelector?.(tag)).find(Boolean); }
    focus() { document.activeElement = this; }
    showModal() { this.open = true; }
    close() { this.open = false; }
  }
  const ids = ['collection', 'query', 'query-label', 'query-help', 'case', 'evidence', 'kind', 'use-case', 'filters', 'cards', 'status', 'empty', 'more', 'error', 'source-note', 'scope-note', 'guide-suggestions', 'guide-cards', 'case-field', 'use-case-field', 'kind-field', 'evidence-field', 'detail', 'detail-origin', 'detail-content', 'close-detail'];
  for (const id of ids) nodes.set(id, new Node(['collection', 'case', 'evidence', 'kind', 'use-case'].includes(id) ? 'select' : 'div'));
  for (const id of ['case', 'evidence', 'kind', 'use-case']) { const option = new Node('option'); option.value = ''; nodes.get(id).append(option); }
  nodes.get('collection').value = 'patterns';
  document = { getElementById: id => nodes.get(id), createElement: tag => new Node(tag), createDocumentFragment: () => new Node('#fragment') };
  const source = fs.readFileSync(path.join(root, 'assets/reference-browser.js'), 'utf8')
    .replace(/^import .*;\n/, '').replaceAll('import.meta.url', JSON.stringify('http://localhost/assets/reference-browser.js'));
  const fetch = async url => {
    const name = String(url).split('/').pop();
    if (name === 'portfolio-index.json' && missingPortfolio) return { ok: false, status: 404 };
    if (name === 'observed-experiences.json' && missingObserved) return { ok: false, status: 404 };
    if (name === 'site-experiences.md') return missingObservedEvidence ? { ok: false, status: 404 }
      : { ok: true, text: async () => fs.readFileSync(path.join(root, 'references/site-experiences.md'), 'utf8') };
    return { ok: true, json: async () => ({ 'catalog.json': catalog, 'site-index.json': sites, 'portfolio-index.json': index,
      'observed-experiences.json': api.loadObservedExperiences() })[name] };
  };
  await vm.runInNewContext(`(async () => {${source}})()`, { document, URL, fetch,
    rankReferences: api.rankReferences, validateCatalog: value => value, validateSiteIndex: api.validateSiteIndex,
    rankSites: api.rankSites, suggestSiteCases: api.suggestSiteCases,
    validateObservedExperiences: api.validateObservedExperiences, observedFacets: api.observedFacets,
    rankObservedExperiences: api.rankObservedExperiences, observedEvidencePaths: api.observedEvidencePaths,
    validateObservedEvidence: api.validateObservedEvidence });
  return { nodes, document, change(id, value) { nodes.get(id).value = value; nodes.get(id).listeners[id === 'query' ? 'input' : 'change'](); } };
}
const descend = node => [node, ...node.children.flatMap(child => typeof child === 'string' ? [] : descend(child))];

test('browser switches case collections, preserves focus and never links the quarantined raw URL', async () => {
  const page = await browserHarness();
  page.nodes.get('collection').focus();
  page.change('collection', 'sites');
  page.change('case', sites.cases[0].id);
  page.change('collection', 'portfolios');
  assert.equal(page.nodes.get('case').value, '');
  assert.deepEqual(page.nodes.get('case').children.slice(1).map(item => item.value), index.cases.map(item => item.id));
  assert.equal(page.document.activeElement, page.nodes.get('collection'));
  assert.match(page.nodes.get('status').textContent, /^2079 portfolios/);
  const invalid = index.entries.find(entry => entry.source.issue);
  page.change('query', invalid.name);
  page.nodes.get('cards').firstChild.querySelector('button').listeners.click();
  const detail = page.nodes.get('detail-content'), links = descend(detail).filter(node => node.tag === 'a');
  assert.ok(detail.textContent.includes(invalid.source.originalUrl));
  assert.ok(detail.textContent.includes('The source URL is invalid'));
  assert.equal(links.some(node => node.href === invalid.source.originalUrl || node.textContent.includes('Visit the original website')), false);
  assert.ok(links.some(node => node.href === `${index.provenance.inventory.url}#L${invalid.source.line}`));
  page.change('query', ''); page.change('collection', 'sites');
  assert.equal(page.nodes.get('case').value, '');
  assert.equal(page.nodes.get('case').children.length, sites.cases.length + 1);
  assert.match(page.nodes.get('status').textContent, /^202 websites/);
});

test('a missing portfolio inventory does not disable sites or patterns', async () => {
  const page = await browserHarness({ missingPortfolio: true });
  assert.match(page.nodes.get('status').textContent, /^22 patterns/);
  page.change('collection', 'portfolios');
  assert.match(page.nodes.get('status').textContent, /Portfolio index unavailable/);
  page.change('collection', 'sites'); assert.match(page.nodes.get('status').textContent, /^202 websites/);
  page.change('collection', 'patterns'); assert.match(page.nodes.get('status').textContent, /^22 patterns/);
});

test('browser separates guide suggestions from identity results and makes candidate browsing explicit', async () => {
  const page = await browserHarness();
  page.change('collection', 'portfolios');
  page.change('query', 'motion');
  assert.equal(page.nodes.get('cards').children.length, 0);
  const guides = page.nodes.get('guide-cards');
  assert.ok(guides.children.length > 0);
  const browse = descend(guides).find(node => node.tag === 'button' && node.textContent.startsWith('Browse candidates for: '));
  assert.ok(browse);
  const guide = api.suggestSiteCases(index, { query: 'motion' })[0].case;
  assert.equal(browse.textContent, `Browse candidates for: ${guide.name}`);
  browse.listeners.click();
  assert.equal(page.nodes.get('query').value, '');
  assert.equal(page.nodes.get('case').value, guide.id);
  assert.equal(page.document.activeElement, page.nodes.get('case'));
  assert.match(page.nodes.get('status').textContent, /^2079 portfolios/);
  assert.match(page.nodes.get('scope-note').textContent, /not confirmed features/i);
  assert.equal(guides.children.length, 0);
  page.change('query', 'motion');
  assert.ok(guides.children.length > 0);
  page.change('query', 'xyzunmatchable');
  assert.equal(guides.children.length, 0);
  page.change('query', 'motion');
  page.change('query', '!!!');
  assert.equal(guides.children.length, 0);
  assert.equal(page.nodes.get('cards').children.length, 0);
  page.change('query', 'motion');
  page.change('collection', 'patterns');
  assert.equal(guides.children.length, 0);
});

test('browser observed collection filters supporting claims and displays conditions without guide fallback', async () => {
  const page = await browserHarness();
  page.change('collection', 'observed');
  assert.match(page.nodes.get('status').textContent, /^6 observed experiences/);
  assert.equal(page.nodes.get('case-field').hidden, true);
  assert.equal(page.nodes.get('use-case-field').hidden, false);
  page.change('query', 'sticky navigation');
  assert.equal(page.nodes.get('cards').children.length, 1);
  page.nodes.get('cards').firstChild.querySelector('button').listeners.click();
  const detail = page.nodes.get('detail-content');
  assert.match(detail.textContent, /brittany-sticky-navigation \/ 2026-10-29 \/ observed/);
  assert.match(detail.textContent, /1280x800/);
  assert.match(detail.textContent, /Unverified/);
  assert.ok(descend(detail).some(node => node.tag === 'a' && node.href.endsWith('site-experiences.md#responsive-portfolio-navigation')));
  page.change('query', 'screen reader');
  assert.equal(page.nodes.get('cards').children.length, 0);
  assert.equal(page.nodes.get('guide-cards').children.length, 0);
  assert.match(page.nodes.get('empty').textContent, /No observed claims match/);
  page.change('query', ''); page.change('use-case', 'compact-expandable-biography');
  assert.equal(page.nodes.get('cards').children.length, 1);
  assert.match(page.nodes.get('cards').textContent, /Lee Robinson/);
  page.change('collection', 'sites');
  assert.equal(page.nodes.get('use-case-field').hidden, true);
  page.change('collection', 'observed');
  assert.equal(page.nodes.get('use-case').value, '');
  assert.match(page.nodes.get('status').textContent, /^6 observed experiences/);
});

test('missing observed data or evidence keeps existing browser collections available', async () => {
  for (const failure of [{ missingObserved: true }, { missingObservedEvidence: true }]) {
    const page = await browserHarness(failure);
    assert.match(page.nodes.get('status').textContent, /^22 patterns/);
    page.change('collection', 'observed');
    assert.match(page.nodes.get('status').textContent, /Search unavailable:/);
    assert.equal(page.nodes.get('cards').children.length, 0);
    page.change('collection', 'sites'); assert.match(page.nodes.get('status').textContent, /^202 websites/);
    page.change('collection', 'portfolios'); assert.match(page.nodes.get('status').textContent, /^2079 portfolios/);
    page.change('collection', 'patterns'); assert.match(page.nodes.get('status').textContent, /^22 patterns/);
  }
});

test('browser card action names retain the visible label and identify their source in every collection', async () => {
  const page = await browserHarness();
  for (const collection of ['patterns', 'sites', 'portfolios', 'observed']) {
    page.change('collection', collection);
    const cards = page.nodes.get('cards').children;
    assert.ok(cards.length > 0, collection);
    for (const card of cards) {
      const button = card.querySelector('button');
      const sourceName = card.querySelector('h2').textContent;
      assert.ok(button['aria-label'].includes(button.textContent), `${collection}: visible action missing from accessible name`);
      assert.ok(button['aria-label'].includes(sourceName), `${collection}: source missing from accessible name`);
    }
  }
});
