import { rankReferences, validateCatalog, validateSiteIndex, rankSites, suggestSiteCases } from '../scripts/lib/reference-search.mjs?v=1.28.1';
const el = id => document.getElementById(id);
const root = new URL('../', import.meta.url);
const pageSize = 12;
const evidenceLabels = {
  'executable-demo': 'Runnable demo',
  'reusable-component': 'Reusable component',
  'implementation-contract': 'Implementation requirements',
  'guidance-with-helper': 'Guide with a helper tool',
};
let entries = [], visible = [], count = pageSize, catalog = null;
const externalIndices = { sites: null, portfolios: null }, externalErrors = {};
const isExternal = () => el('collection').value !== 'patterns';
const isPortfolios = () => el('collection').value === 'portfolios';
const currentIndex = () => externalIndices[el('collection').value];
const casesFor = entry => currentIndex().cases.filter(item => entry.caseIds.includes(item.id) && (!el('case').value || item.id === el('case').value));

function text(tag, value, className) {
  const node = document.createElement(tag);
  node.textContent = value;
  if (className) node.className = className;
  return node;
}
function section(parent, label, value) {
  if (!value || (Array.isArray(value) && !value.length)) return;
  parent.append(text('h3', label));
  if (Array.isArray(value)) {
    const list = document.createElement('ul');
    for (const item of value) list.append(text('li', typeof item === 'object' ? item.description ?? JSON.stringify(item) : item));
    parent.append(list);
  } else parent.append(text('p', typeof value === 'object' ? JSON.stringify(value) : value));
}
function link(parent, label, value, local = false) {
  try {
    if (local && (!/^(assets|references)\//.test(value) || value.split('/').includes('..'))) return;
    const url = new URL(value, local ? root : undefined);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return;
    const anchor = text('a', label);
    anchor.href = url.href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    parent.append(anchor, document.createElement('br'));
  } catch { /* A malformed catalog URL is data, never executable content. */ }
}
function detail(entry) {
  if (isExternal()) { siteDetail(entry); return; }
  el('detail-origin').textContent = `Forma / ${evidenceLabels[entry.evidence.type]}`;
  const content = el('detail-content');
  content.replaceChildren(text('h2', entry.name));
  content.firstChild.id = 'detail-title';
  section(content, 'Core idea', entry.idea);
  section(content, 'When to use it', entry.whenToUse);
  section(content, 'Structure', entry.structure);
  section(content, 'How to adapt it', entry.adapt);
  section(content, 'What to avoid', entry.avoid);
  section(content, 'What to verify', entry.verify);
  section(content, 'Evidence and limitations', [evidenceLabels[entry.evidence.type], ...(entry.evidence.limits ?? [])].filter(Boolean));
  content.append(text('p', 'This record includes no live screenshot. Inspect the resource and test the target project before claiming visual or behavioral fidelity.', 'warning'));
  section(content, 'Rights and attribution', Object.values(entry.rights ?? {}));
  content.append(text('h3', 'Package resources'));
  for (const resource of entry.resources ?? []) link(content, resource.label, resource.path, true);
  el('detail').showModal();
}
function siteDetail(entry) {
  el('detail-origin').textContent = `${isPortfolios() ? 'Developer portfolio' : 'External website'} / Research candidate`;
  const content = el('detail-content');
  content.replaceChildren(text('h2', entry.name));
  content.firstChild.id = 'detail-title';
  if (entry.url) link(content, 'Visit the original website', entry.url);
  if (entry.source) {
    section(content, 'Original source URL (text)', entry.source.originalUrl);
    link(content, `README source / Line ${entry.source.line}`, `${currentIndex().provenance.inventory.url}#L${entry.source.line}`);
    if (entry.source.issue) content.append(text('p', 'The source URL is invalid. The record is preserved without a visit link; no correction was guessed.', 'warning'));
  }
  content.append(text('p', 'This lookup does not visit the site or include a screenshot. The guides below suggest what to investigate; they do not verify this site. Identity, code and assets belong to their respective authors.', 'warning'));
  link(content, 'Forma studies and research notes', 'references/site-experiences.md', true);
  const selectedCases = casesFor(entry);
  for (const item of selectedCases) {
    section(content, `Forma research guide: ${item.name}`, item.whenToUse);
    section(content, 'Questions to investigate', item.questions);
    section(content, 'Possible adaptations', item.adapt);
    section(content, 'What to verify', item.verify);
  }
  const patternIds = new Set(selectedCases.flatMap(item => item.patternIds));
  content.append(text('h3', 'Related Forma patterns'));
  for (const pattern of entries.filter(item => patternIds.has(item.id))) {
    section(content, pattern.name, evidenceLabels[pattern.evidence.type]);
    for (const resource of pattern.resources) link(content, resource.label, resource.path, true);
  }
  el('detail').showModal();
}
function updateSource() {
  const sites = isExternal();
  // Cases belong to one inventory; never carry a stale filter into another collection.
  const allCases = text('option', 'All'); allCases.value = '';
  el('case').replaceChildren(allCases);
  for (const item of currentIndex()?.cases ?? []) {
    const option = text('option', item.name); option.value = item.id; el('case').append(option);
  }
  el('evidence-field').hidden = sites;
  el('kind-field').hidden = sites;
  el('case-field').hidden = !sites;
  el('filters').classList.toggle('site-filters', sites);
  el('source-note').textContent = sites ? `${isPortfolios() ? 'External portfolios with source lines' : 'External website inventory'} / Forma research guides` : 'Written by Forma / Local search';
  el('query-label').textContent = sites ? 'Find a name or website address' : 'What do you want to create?';
  el('query-help').textContent = sites ? 'Topics such as motion suggest research guides separately; they do not identify verified features.' : 'Find a local pattern for your design task.';
  el('query').placeholder = sites ? 'Name or URL; topics suggest guides...' : 'Sidebar, typography, profile...';
  el('more').textContent = isPortfolios() ? 'Show more portfolios' : sites ? 'Show more websites' : 'Show more patterns';
  el('empty').textContent = sites ? 'No names or website addresses match. Try a name or URL, or explicitly browse candidates from a research guide.' : 'No patterns match these filters. Try another term or a broader context.';
  filter();
}
function render() {
  const cards = el('cards');
  const fragment = document.createDocumentFragment();
  for (const entry of visible.slice(0, count)) {
    const card = document.createElement('article'); card.className = 'card';
    const meta = document.createElement('div'); meta.className = 'card-meta';
    meta.append(text('span', isPortfolios() ? 'PORTFOLIO' : isExternal() ? 'EXTERNAL WEBSITE' : 'FORMA', 'tag'), text('span', isExternal() ? (entry.source?.issue ? 'Invalid URL / Record preserved' : 'Not verified live') : evidenceLabels[entry.evidence.type]));
    const paragraph = isExternal() ? `Research guides: ${casesFor(entry).map(item => item.name).join(' / ')}` : String(entry.idea ?? entry.whenToUse ?? '');
    const button = text('button', isExternal() ? 'View research guides' : 'View pattern'); button.type = 'button';
    button.setAttribute('aria-label', `View reference: ${entry.name}`);
    button.addEventListener('click', () => detail(entry));
    card.append(meta, text('h2', entry.name), text('p', paragraph.length > 230 ? `${paragraph.slice(0, 227)}...` : paragraph), button);
    fragment.append(card);
  }
  cards.replaceChildren(fragment);
  const shown = Math.min(count, visible.length);
  const noun = isPortfolios() ? (visible.length === 1 ? 'portfolio' : 'portfolios') : isExternal() ? (visible.length === 1 ? 'website' : 'websites') : (visible.length === 1 ? 'pattern' : 'patterns');
  el('status').textContent = `${visible.length} ${noun} / ${shown} shown`;
  el('empty').hidden = visible.length !== 0;
  el('more').hidden = count >= visible.length;
}
function renderGuideSuggestions(suggestions) {
  const cards = el('guide-cards');
  cards.replaceChildren();
  el('guide-suggestions').hidden = suggestions.length === 0;
  for (const { case: guide, candidateCount } of suggestions) {
    const card = document.createElement('article');
    card.className = 'guide-card';
    card.append(text('h3', guide.name), text('p', guide.whenToUse));
    card.append(text('p', `${candidateCount} assigned candidates / Not verified for this topic`, 'candidate-count'));
    const button = text('button', `Browse candidates for: ${guide.name}`);
    button.type = 'button';
    button.addEventListener('click', () => {
      // Browsing a guide is explicit; a topic must never silently match every assigned site.
      el('query').value = '';
      el('case').value = guide.id;
      filter();
      el('case').focus();
    });
    card.append(button);
    cards.append(card);
  }
}
function filter() {
  renderGuideSuggestions([]);
  el('scope-note').hidden = true;
  el('scope-note').textContent = '';
  try {
    const siteIndex = currentIndex();
    if (isExternal() && !siteIndex) throw new Error(externalErrors[el('collection').value] || 'The index has not loaded yet.');
    visible = isExternal() ? rankSites(siteIndex, catalog, {
      query: el('query').value, ...(el('case').value && { caseId: el('case').value }),
    }).map(result => result.entry) : rankReferences({ entries }, {
      query: el('query').value,
      ...(el('evidence').value && { evidenceType: el('evidence').value }),
      ...(el('kind').value && { kind: el('kind').value }),
    }).map(result => result.entry);
    if (isExternal()) {
      renderGuideSuggestions(suggestSiteCases(siteIndex, {
        query: el('query').value, ...(el('case').value && { caseId: el('case').value }),
      }));
      el('scope-note').hidden = false;
      el('scope-note').textContent = el('case').value
        ? 'Browsing an assigned research pool. Guide assignments are not confirmed features; inspect individual sites before using them as evidence.'
        : 'Results match names and website addresses only. A technology word in an address does not verify the technology used by that site.';
    }
  } catch (error) {
    visible = [];
    count = pageSize;
    render();
    el('status').textContent = `Search unavailable: ${error.message}`;
    return;
  }
  count = pageSize;
  render();
}
el('filters').addEventListener('submit', event => event.preventDefault());
el('query').addEventListener('input', filter);
el('collection').addEventListener('change', updateSource);
for (const id of ['evidence', 'kind', 'case']) el(id).addEventListener('change', filter);
el('more').addEventListener('click', () => {
  const previousCount = count;
  count += pageSize;
  render();
  // Keep keyboard users at the first newly revealed result, not at the end of the page.
  el('cards').children[previousCount]?.querySelector('button')?.focus();
});
el('close-detail').addEventListener('click', () => el('detail').close());
async function readJSON(name) {
  const response = await fetch(new URL(`reference-library/${name}`, import.meta.url));
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
try {
  const [patternResult, siteResult, portfolioResult] = await Promise.allSettled([readJSON('catalog.json'), readJSON('site-index.json'), readJSON('portfolio-index.json')]);
  if (patternResult.status !== 'fulfilled') throw patternResult.reason;
  catalog = validateCatalog(patternResult.value);
  entries = [...catalog.entries].sort((a, b) => a.name.localeCompare(b.name));
  if (siteResult.status === 'fulfilled') {
    try { externalIndices.sites = validateSiteIndex(siteResult.value, catalog); }
    catch (error) { externalErrors.sites = `Invalid website index: ${error.message}`; }
  } else externalErrors.sites = `Website index unavailable: ${siteResult.reason.message}`;
  if (portfolioResult.status === 'fulfilled') {
    try {
      const index = validateSiteIndex(portfolioResult.value, catalog);
      if (index.schemaVersion !== 2 || index.collection !== 'developer-portfolios') throw new Error('Incorrect portfolio collection.');
      externalIndices.portfolios = index;
    } catch (error) { externalErrors.portfolios = `Invalid portfolio index: ${error.message}`; }
  } else externalErrors.portfolios = `Portfolio index unavailable: ${portfolioResult.reason.message}`;
  for (const evidence of [...new Set(entries.map(entry => entry.evidence.type))].sort()) {
    const option = text('option', evidenceLabels[evidence]); option.value = evidence; el('evidence').append(option);
  }
  for (const kind of [...new Set(entries.map(entry => entry.kind))].sort()) {
    const label = kind === '3d' ? '3D' : kind.charAt(0).toUpperCase() + kind.slice(1).replaceAll('-', ' ');
    const option = text('option', label); option.value = kind; el('kind').append(option);
  }
  updateSource();
} catch (error) {
  el('status').textContent = 'Library unavailable';
  el('error').hidden = false;
  el('error').textContent = `The library could not be loaded. Serve the complete skill directory through a local HTTP server. Details: ${error.message}`;
}
