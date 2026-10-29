import { rankReferences, validateCatalog, validateSiteIndex, rankSites } from '../scripts/lib/reference-search.mjs';
const el = id => document.getElementById(id);
const root = new URL('../', import.meta.url);
const pageSize = 12;
const evidenceLabels = {
  'executable-demo': 'Demonstração executável',
  'reusable-component': 'Componente reutilizável',
  'implementation-contract': 'Contrato para implementar',
  'guidance-with-helper': 'Guia com utilitário',
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
  el('detail-origin').textContent = `Forma · ${evidenceLabels[entry.evidence.type]}`;
  const content = el('detail-content');
  content.replaceChildren(text('h2', entry.name));
  content.firstChild.id = 'detail-title';
  section(content, 'Ideia', entry.idea);
  section(content, 'Quando usar', entry.whenToUse);
  section(content, 'Estrutura', entry.structure);
  section(content, 'Como adaptar', entry.adapt);
  section(content, 'O que evitar', entry.avoid);
  section(content, 'Como verificar', entry.verify);
  section(content, 'Evidência e limites', [evidenceLabels[entry.evidence.type], ...(entry.evidence.limits ?? [])].filter(Boolean));
  content.append(text('p', 'A ficha não inclui uma captura ao vivo. Confira o recurso e teste o projeto de destino antes de concluir fidelidade ou comportamento.', 'warning'));
  section(content, 'Direitos', Object.values(entry.rights ?? {}));
  content.append(text('h3', 'Recursos no pacote'));
  for (const resource of entry.resources ?? []) link(content, resource.label, resource.path, true);
  el('detail').showModal();
}
function siteDetail(entry) {
  el('detail-origin').textContent = `${isPortfolios() ? 'Portfólio de desenvolvedor' : 'Site externo'} · candidato histórico`;
  const content = el('detail-content');
  content.replaceChildren(text('h2', entry.name));
  content.firstChild.id = 'detail-title';
  if (entry.url) link(content, 'Visitar o site original ↗', entry.url);
  if (entry.source) {
    section(content, 'URL original na fonte (texto)', entry.source.originalUrl);
    link(content, `Registro no README · linha ${entry.source.line}`, `${currentIndex().provenance.inventory.url}#L${entry.source.line}`);
    if (entry.source.issue) content.append(text('p', 'URL inválida na fonte: registro preservado sem link de visita. Não foi corrigida automaticamente.', 'warning'));
  }
  content.append(text('p', 'Não visitado nesta consulta; sem captura incluída. Os casos abaixo propõem o que investigar, não atestam características deste site. Identidade, código e assets pertencem aos respectivos autores.', 'warning'));
  link(content, 'Estudos e experiências da Forma', 'references/site-experiences.md', true);
  const selectedCases = casesFor(entry);
  for (const item of selectedCases) {
    section(content, `Caso Forma: ${item.name}`, item.whenToUse);
    section(content, 'Perguntas para investigar', item.questions);
    section(content, 'Possíveis adaptações', item.adapt);
    section(content, 'Como verificar', item.verify);
  }
  const patternIds = new Set(selectedCases.flatMap(item => item.patternIds));
  content.append(text('h3', 'Padrões relacionados no pacote'));
  for (const pattern of entries.filter(item => patternIds.has(item.id))) {
    section(content, pattern.name, evidenceLabels[pattern.evidence.type]);
    for (const resource of pattern.resources) link(content, resource.label, resource.path, true);
  }
  el('detail').showModal();
}
function updateSource() {
  const sites = isExternal();
  // Cases belong to one inventory; never carry a stale filter into another collection.
  const allCases = text('option', 'Todos'); allCases.value = '';
  el('case').replaceChildren(allCases);
  for (const item of currentIndex()?.cases ?? []) {
    const option = text('option', item.name); option.value = item.id; el('case').append(option);
  }
  el('evidence-field').hidden = sites;
  el('kind-field').hidden = sites;
  el('case-field').hidden = !sites;
  el('filters').classList.toggle('site-filters', sites);
  el('source-note').textContent = sites ? `${isPortfolios() ? 'Linhas do README · portfólios externos' : 'URLs históricas'} · casos de investigação da Forma` : 'Autoria editorial Forma · seleção local';
  el('query').placeholder = isPortfolios() ? 'Nome, developer, portfolio…' : sites ? 'Cafeteria, typography, editorial…' : 'Sidebar, typography, perfil…';
  el('more').textContent = isPortfolios() ? 'Mostrar mais portfólios' : sites ? 'Mostrar mais sites' : 'Mostrar mais padrões';
  el('empty').textContent = sites ? 'Nenhum site corresponde aos filtros. Tente outro termo ou caso de investigação.' : 'Nenhum padrão corresponde aos filtros. Tente outro termo ou amplie o contexto.';
  filter();
}
function render() {
  const cards = el('cards');
  const fragment = document.createDocumentFragment();
  for (const entry of visible.slice(0, count)) {
    const card = document.createElement('article'); card.className = 'card';
    const meta = document.createElement('div'); meta.className = 'card-meta';
    meta.append(text('span', isPortfolios() ? 'PORTFÓLIO' : isExternal() ? 'SITE EXTERNO' : 'FORMA', 'tag'), text('span', isExternal() ? (entry.source?.issue ? 'URL inválida · registro preservado' : 'Não verificado ao vivo') : evidenceLabels[entry.evidence.type]));
    const paragraph = isExternal() ? `Investigar: ${casesFor(entry).map(item => item.name).join(' · ')}` : String(entry.idea ?? entry.whenToUse ?? '');
    const button = text('button', isExternal() ? 'Ver caso de investigação →' : 'Ler ficha →'); button.type = 'button';
    button.setAttribute('aria-label', `Ler ficha: ${entry.name}`);
    button.addEventListener('click', () => detail(entry));
    card.append(meta, text('h2', entry.name), text('p', paragraph.length > 230 ? `${paragraph.slice(0, 227)}…` : paragraph), button);
    fragment.append(card);
  }
  cards.replaceChildren(fragment);
  const shown = Math.min(count, visible.length);
  const noun = isPortfolios() ? (visible.length === 1 ? 'portfólio' : 'portfólios') : isExternal() ? (visible.length === 1 ? 'site' : 'sites') : (visible.length === 1 ? 'padrão' : 'padrões');
  el('status').textContent = `${visible.length} ${noun} · ${shown} ${shown === 1 ? 'exibido' : 'exibidos'}`;
  el('empty').hidden = visible.length !== 0;
  el('more').hidden = count >= visible.length;
}
function filter() {
  try {
    const siteIndex = currentIndex();
    if (isExternal() && !siteIndex) throw new Error(externalErrors[el('collection').value] || 'Índice ainda não carregado.');
    visible = isExternal() ? rankSites(siteIndex, catalog, {
      query: el('query').value, ...(el('case').value && { caseId: el('case').value }),
    }).map(result => result.entry) : rankReferences({ entries }, {
      query: el('query').value,
      ...(el('evidence').value && { evidenceType: el('evidence').value }),
      ...(el('kind').value && { kind: el('kind').value }),
    }).map(result => result.entry);
  } catch (error) {
    visible = [];
    count = pageSize;
    render();
    el('status').textContent = `Refine a busca: ${error.message}`;
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
    catch (error) { externalErrors.sites = `Índice de sites inválido: ${error.message}`; }
  } else externalErrors.sites = `Índice de sites indisponível: ${siteResult.reason.message}`;
  if (portfolioResult.status === 'fulfilled') {
    try {
      const index = validateSiteIndex(portfolioResult.value, catalog);
      if (index.schemaVersion !== 2 || index.collection !== 'developer-portfolios') throw new Error('Coleção de portfólios incorreta.');
      externalIndices.portfolios = index;
    } catch (error) { externalErrors.portfolios = `Índice de portfólios inválido: ${error.message}`; }
  } else externalErrors.portfolios = `Índice de portfólios indisponível: ${portfolioResult.reason.message}`;
  for (const evidence of [...new Set(entries.map(entry => entry.evidence.type))].sort()) {
    const option = text('option', evidenceLabels[evidence]); option.value = evidence; el('evidence').append(option);
  }
  for (const kind of [...new Set(entries.map(entry => entry.kind))].sort()) {
    const option = text('option', kind); option.value = kind; el('kind').append(option);
  }
  updateSource();
} catch (error) {
  el('status').textContent = 'Catálogo indisponível';
  el('error').hidden = false;
  el('error').textContent = `Não foi possível ler o catálogo. Abra esta página por um servidor HTTP local, com a raiz completa da skill. Detalhe: ${error.message}`;
}
