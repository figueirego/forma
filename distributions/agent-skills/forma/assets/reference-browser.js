import { rankReferences, validateCatalog } from '../scripts/lib/reference-search.mjs';
const el = id => document.getElementById(id);
const root = new URL('../', import.meta.url);
const pageSize = 12;
const evidenceLabels = {
  'executable-demo': 'Demonstração executável',
  'reusable-component': 'Componente reutilizável',
  'implementation-contract': 'Contrato para implementar',
  'guidance-with-helper': 'Guia com utilitário',
};
let entries = [], visible = [], count = pageSize;

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
    if (!['https:', 'http:'].includes(url.protocol)) return;
    const anchor = text('a', label);
    anchor.href = url.href;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    parent.append(anchor, document.createElement('br'));
  } catch { /* A malformed catalog URL is data, never executable content. */ }
}
function detail(entry) {
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
function render() {
  const cards = el('cards');
  const fragment = document.createDocumentFragment();
  for (const entry of visible.slice(0, count)) {
    const card = document.createElement('article'); card.className = 'card';
    const meta = document.createElement('div'); meta.className = 'card-meta';
    meta.append(text('span', 'FORMA', 'tag'), text('span', evidenceLabels[entry.evidence.type]));
    const paragraph = String(entry.idea ?? entry.whenToUse ?? '');
    const button = text('button', 'Ler ficha →'); button.type = 'button';
    button.setAttribute('aria-label', `Ler ficha: ${entry.name}`);
    button.addEventListener('click', () => detail(entry));
    card.append(meta, text('h2', entry.name), text('p', paragraph.length > 230 ? `${paragraph.slice(0, 227)}…` : paragraph), button);
    fragment.append(card);
  }
  cards.replaceChildren(fragment);
  const shown = Math.min(count, visible.length);
  el('status').textContent = `${visible.length} ${visible.length === 1 ? 'padrão' : 'padrões'} · ${shown} ${shown === 1 ? 'exibido' : 'exibidos'}`;
  el('empty').hidden = visible.length !== 0;
  el('more').hidden = count >= visible.length;
}
function filter() {
  try {
    visible = rankReferences({ entries }, {
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
for (const id of ['evidence', 'kind']) el(id).addEventListener('change', filter);
el('more').addEventListener('click', () => {
  const previousCount = count;
  count += pageSize;
  render();
  // Keep keyboard users at the first newly revealed result, not at the end of the page.
  el('cards').children[previousCount]?.querySelector('button')?.focus();
});
el('close-detail').addEventListener('click', () => el('detail').close());
try {
  const response = await fetch(new URL('reference-library/catalog.json', import.meta.url));
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const catalog = validateCatalog(await response.json());
  entries = [...catalog.entries].sort((a, b) => a.name.localeCompare(b.name));
  for (const evidence of [...new Set(entries.map(entry => entry.evidence.type))].sort()) {
    const option = text('option', evidenceLabels[evidence]); option.value = evidence; el('evidence').append(option);
  }
  for (const kind of [...new Set(entries.map(entry => entry.kind))].sort()) {
    const option = text('option', kind); option.value = kind; el('kind').append(option);
  }
  filter();
} catch (error) {
  el('status').textContent = 'Catálogo indisponível';
  el('error').hidden = false;
  el('error').textContent = `Não foi possível ler o catálogo. Abra esta página por um servidor HTTP local, com a raiz completa da skill. Detalhe: ${error.message}`;
}
