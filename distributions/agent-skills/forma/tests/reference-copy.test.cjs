const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, 'assets', name), 'utf8');
const json = name => JSON.parse(read(`reference-library/${name}.json`));
const patterns = json('catalog'), sites = json('site-index'), portfolios = json('portfolio-index');
const receipt = json('portfolio-import');
const identityDigest = rows => createHash('sha256').update(JSON.stringify(
  [...rows].sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0),
)).digest('hex');

function visitStrings(value, location, check) {
  if (typeof value === 'string') check(value, location);
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) visitStrings(item, `${location}.${key}`, check);
  }
}

function plainASCII(value, location) {
  assert.doesNotMatch(value, /[^\x20-\x7e]/, `${location}: authored catalog text must use printable ASCII`);
}

// This is an encoding and language-contract regression, not a grammar checker.
// Editorial English still requires reading the copy in its interface context.
test('all authored reference records use plain ASCII, without rewriting external names', () => {
  assert.equal(patterns.entries.length, 22);
  assert.equal(sites.cases.length, 16);
  assert.equal(portfolios.cases.length, 3);
  visitStrings(patterns, 'patterns', plainASCII);
  for (const [name, index] of [['sites', sites], ['portfolios', portfolios]]) {
    visitStrings(index.provenance, `${name}.provenance`, plainASCII);
    visitStrings(index.cases, `${name}.cases`, plainASCII);
  }
  plainASCII(receipt.policy, 'portfolio-import.policy');
});

test('editorial changes preserve all external identities, URLs and portfolio source lines', () => {
  // Baseline: Forma commit 31d2ca00a78d530402936ec5bb1f390d0c27103f.
  // Deliberate source updates must review provenance and these identity hashes together.
  // Only ID-sorted data tuples are pinned; source ordering, descriptions and guides remain editable.
  assert.equal(sites.entries.length, 202);
  assert.equal(identityDigest(sites.entries.map(entry => [entry.id, entry.name, entry.url])),
    '6a778ba5d02b1a5625c1991cd91f603e8c3ef3aac14838501f70c3408286a27a');
  assert.equal(portfolios.entries.length, 2079);
  assert.equal(identityDigest(portfolios.entries.map(entry => [entry.id, entry.name, entry.url,
    entry.source.line, entry.source.originalUrl, entry.source.issue])),
  '7f58428cf28a1de05c52db8fa061ef3c32130bed32fd16414d5c0d2e7d22773c');
});

test('technical keys and reference identifiers stay ASCII across all three catalogs', () => {
  const keys = (value, location) => {
    if (!value || typeof value !== 'object') return;
    for (const [key, item] of Object.entries(value)) {
      plainASCII(key, `${location} key`);
      keys(item, `${location}.${key}`);
    }
  };
  for (const [name, index] of [['patterns', patterns], ['sites', sites], ['portfolios', portfolios]]) {
    keys(index, name);
    for (const entry of [...index.entries, ...(index.cases ?? [])]) {
      assert.match(entry.id, /^[a-z0-9-]+$/, `${name}: ${entry.id}`);
      visitStrings(entry.caseIds ?? [], `${entry.id}.caseIds`, plainASCII);
      visitStrings(entry.patternIds ?? [], `${entry.id}.patternIds`, plainASCII);
    }
  }
});

test('reference browser declares English and UTF-8 without known Portuguese UI remnants', () => {
  const html = read('reference-browser.html'), script = read('reference-browser.js');
  assert.match(html, /<html\s+lang="en"\s*>/);
  // UTF-8 remains necessary to display source names faithfully even with ASCII interface copy.
  assert.match(html, /<meta\s+charset="utf-8"\s*>/i);
  for (const [name, source] of [['html', html], ['script', script]]) {
    assert.doesNotMatch(source,
      /\b(?:padr(?:\u00f5|o)es|portf\u00f3lios|carregando|nenhum|fechar|perfil|invalida|inv\u00e1lida)\b|mostrar mais|visitar o site|filtrar refer|candidato hist|n[a\u00e3]o verificado|indispon[i\u00ed]vel/iu,
      `${name}: a known untranslated interface label returned`);
  }
});
