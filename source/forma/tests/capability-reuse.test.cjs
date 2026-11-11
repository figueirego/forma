const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
let api, catalog;
before(async () => {
  api = await import(pathToFileURL(path.join(root, 'scripts/references.mjs')));
  catalog = api.loadCatalog();
});

// Independent user-intent fixtures, not names copied dynamically from the catalog.
const cases = [
  ['forma-clean-shell', 'desktop material', 'barra lateral', 'icones operacionais'],
  ['forma-material-profile', 'editable identity', 'perfil'],
  ['forma-settings', 'preferences', 'configura\u00e7\u00f5es'],
  ['forma-lighting-editor', 'contextual lighting', 'aparencia'],
  ['forma-book-object', 'book preset', 'lombada'],
  ['forma-passport-object', 'legacy Three passport'],
  ['forma-knowledge-graph', 'backlinks', 'grafos'],
  ['forma-color-system', 'semantic tokens', 'cores'],
  ['forma-purposeful-motion', 'interruption', 'movimento'],
  ['forma-spatial-layout', 'alignment', 'espacamento'],
  ['forma-typography', 'typography', 'tipografia'],
  ['forma-recoverable-forms', 'forms draft', 'formularios'],
  ['forma-search-discovery', 'search scope', 'busca'],
  ['forma-data-dashboard', 'geographic dashboard', 'live historical', 'painel geografico', 'painel historico'],
  ['forma-adaptive-list-detail', 'list detail', 'movel navegacao'],
  ['forma-brand-argument', 'marketing', 'landing produto'],
  ['forma-mascot-refinement', 'character identity', 'mascote'],
  ['forma-artifact-export', 'editable export', 'exportacao'],
  ['forma-fidelity-audit', 'independent measurements'],
  ['forma-rendered-review', 'served result'],
  ['forma-reference-media', 'photography credits', 'fotografia'],
  ['forma-soft-glass', 'soft glass landing', 'accordion'],
  ['forma-halftone-entry', 'halftone texture', 'reticula'],
  ['forma-fixed-workspace', 'fixed window', 'content scroll', 'role team context', 'janela compacta', 'janela fixa'],
  ['forma-calm-glass', 'glass navigation', 'navegacao vidro'],
  ['forma-split-product-landing', 'split product landing', 'landing produto'],
  ['forma-ink-theme', 'central liquid reveal', 'gota de tinta', 'tinta tema'],
  ['forma-articulated-passport', 'articulated CSS passport', 'passaporte articulado'],
  ['forma-clear-pdf-guide', 'pdf cards', 'guia pdf'],
  ['forma-product-variants', 'configurable product', 'product variants', 'produto variantes'],
  ['forma-hybrid-editorial-scene', 'hybrid scene', 'cena hibrida'],
];

for (const [id, ...queries] of cases) {
  test(`${id} is found by capability without its source identity`, () => {
    const stripIdentity = value => typeof value === 'string'
      ? value.replace(/\b(HelloUra|Neuron|Pauta|Camalingo|Soda|Kimi|SeuImposto)\b/gi, 'source-provenance')
      : Array.isArray(value) ? value.map(stripIdentity) : value;
    const neutral = structuredClone(catalog);
    for (const entry of neutral.entries) {
      for (const field of ['name', 'kind', 'useCases', 'tags', 'idea', 'whenToUse', 'structure', 'adapt', 'verify']) {
        entry[field] = stripIdentity(entry[field]);
      }
    }
    for (const query of queries) {
      const ids = api.searchCatalog(neutral, { query, limit: 50 }).results.map(({ entry }) => entry.id);
      assert.ok(ids.includes(id), `${query}: ${ids.join(', ')}`);
    }
  });
}

test('every saved card and profile has a reusable route with no local source dependency', () => {
  assert.deepEqual(cases.map(([id]) => id).sort(), catalog.entries.map(entry => entry.id).sort(),
    'A new pattern needs an independent generic retrieval fixture.');
  const resources = new Set(catalog.entries.flatMap(entry => entry.resources.map(resource => resource.path)));
  for (const entry of catalog.entries) {
    assert.ok(entry.resources.some(resource => resource.path === 'references/capability-reuse.md'), entry.id);
    assert.ok(entry.adapt.length && entry.avoid.length && entry.verify.length, entry.id);
    for (const resource of entry.resources) assert.ok(fs.statSync(path.join(root, resource.path)).isFile());
  }
  for (const name of fs.readdirSync(path.join(root, 'assets/reference-profiles')).filter(name => name.endsWith('.json'))) {
    assert.ok(resources.has(`assets/reference-profiles/${name}`), `Unreachable profile: ${name}`);
  }
  assert.doesNotMatch(JSON.stringify(catalog), /\/Users\/|\/home\/|file:\/\//);
});

test('generic lookup distinguishes available mechanisms from contracts and legacy renderers', () => {
  const first = query => api.searchCatalog(catalog, { query, limit: 1 }).results[0]?.entry;
  assert.equal(first('janela fixa').id, 'forma-fixed-workspace');
  assert.equal(first('glass navigation').id, 'forma-calm-glass');
  assert.equal(first('passaporte articulado').id, 'forma-articulated-passport');
  assert.equal(first('legacy Three passport').id, 'forma-passport-object');
  assert.equal(first('gota de tinta').evidence.type, 'reusable-component');
  for (const query of ['product variants', 'hybrid scene', 'split product landing', 'fixed window']) {
    assert.equal(first(query).evidence.type, 'implementation-contract', query);
  }
  for (const query of ['product variants', 'hybrid scene']) {
    assert.equal(first(query).evidence.liveVerified, false);
    assert.equal(first(query).evidence.capture, null);
  }
});

test('CLI and browser matcher agree for generic PT/EN requests without fallback', async () => {
  const shared = fs.readFileSync(path.join(root, 'scripts/lib/reference-search.mjs'), 'utf8')
    .replace(/^export /gm, '') + '\nrankReferences(catalog, { query }).map(({entry}) => entry.id);';
  for (const query of ['janela fixa', 'navegacao vidro', 'gota de tinta', 'passaporte articulado', 'guia pdf', 'produto variantes', 'cena hibrida']) {
    const expected = api.searchCatalog(catalog, { query, limit: 50 }).results.map(({ entry }) => entry.id);
    assert.deepEqual(Array.from(vm.runInNewContext(shared, { catalog, query }, { timeout: 5000 })), expected);
  }
  for (const query of ['glass xyzunsupported', 'product variants telepathy', 'hybrid scene encryption', 'janela fixa blockchain']) {
    assert.equal(api.searchCatalog(catalog, { query }).totalMatches, 0, query);
  }
});

test('coordinator and direct specialists expose the same identity-preserving reuse contract', () => {
  assert.match(fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8'), /references\/capability-reuse\.md/);
  for (const name of fs.readdirSync(path.join(root, 'skills'))) {
    const skill = path.join(root, 'skills', name, 'SKILL.md');
    if (fs.existsSync(skill)) assert.match(fs.readFileSync(skill, 'utf8'), /\.\.\/\.\.\/references\/capability-reuse\.md/, name);
  }
});
