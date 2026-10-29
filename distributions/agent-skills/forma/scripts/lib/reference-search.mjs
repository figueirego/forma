// Shared lexical matching for the CLI and reference browser; no host or network dependencies.
const normalize = value => String(value).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
const words = value => normalize(value).match(/[\p{L}\p{N}]+/gu) ?? [];
const STOP = new Set('a as o os um uma uns umas de da das do dos e em no na nos nas com para por que eu quero quero the a an of and in with for to website websites site sites pagina paginas design'.split(' '));
// Deliberately small vocabulary: aliases expand the literal query, never infer user intent.
const ALIASES = {
  sidebar: ['sidebar', 'navigation'], lateral: ['sidebar'], navegacao: ['navigation', 'sidebar'],
  botoes: ['buttons', 'button'], botao: ['button', 'buttons'], campos: ['inputs', 'forms'], campo: ['input', 'inputs'],
  perfil: ['profile'], identidade: ['identity'], configuracoes: ['settings', 'preferences'], configuracao: ['settings'],
  temas: ['theme', 'themes'], tema: ['theme', 'themes'], noturno: ['dark'], escuro: ['dark'], claro: ['light'],
  cores: ['color', 'colour', 'palette'], cor: ['color', 'colour'], paleta: ['palette', 'colour'],
  luz: ['lighting', 'light'], luzes: ['lighting', 'pools'], iluminacao: ['lighting', 'pools'], granulado: ['grain'],
  livro: ['book'], livros: ['book', 'books'], capa: ['cover'], lombada: ['spine'], folhas: ['pages'], biblioteca: ['library'],
  grafo: ['graph'], grafos: ['graph', 'graphs'], mapa: ['map'], mapas: ['map', 'maps'], dados: ['data'],
  movimento: ['motion', 'animation'], animacao: ['animation', 'motion'], animacoes: ['animation', 'motion'], rolagem: ['scroll'],
  celular: ['mobile', 'phone'], movel: ['mobile'], limpo: ['clean', 'quiet'], limpa: ['clean', 'quiet'],
  espacamento: ['spacing', 'gap', 'insets'], espacamentos: ['spacing', 'gap', 'insets'], alinhamento: ['alignment'], centralizacao: ['centering'],
  formulario: ['forms', 'form'], formularios: ['forms', 'form'], erro: ['error', 'errors'], salvar: ['save'],
  busca: ['search'], buscar: ['search'], filtro: ['filter', 'filters'], filtros: ['filters'], historico: ['history'],
  exportacao: ['export'], exportar: ['export'], acessibilidade: ['accessibility'], mascote: ['mascot'],
  restaurante: ['restaurant'], cafeteria: ['coffee', 'cafe', 'restaurant'], cafe: ['coffee', 'cafe'],
  tipografia: ['type', 'typography', 'typographic'], fonte: ['font', 'typeface'], fontes: ['fonts', 'typefaces'],
  fotografia: ['photography', 'photo'], fotos: ['photos', 'photography'],
  financeiro: ['finance', 'financial'], saude: ['health'], imovel: ['estate', 'property'], imobiliaria: ['estate', 'property'],
  agencia: ['agency'], arquitetura: ['architecture'], moda: ['fashion'], musica: ['music'], evento: ['event'],
};

export function queryTerms(query = '') {
  const text = normalize(query).replace(/barra lateral/g, 'sidebar').replace(/interface limpa/g, 'clean interface');
  return [...new Set(words(text).filter(word => !STOP.has(word)))].map(term => ({
    term, alternatives: [...new Set([term, ...(ALIASES[term] ?? [])])],
  }));
}

export function facets(catalog) {
  const counts = key => Object.fromEntries([...catalog.entries.reduce((map, entry) => {
    const field = key === 'evidenceType' ? entry.evidence.type : entry[key];
    for (const value of new Set(Array.isArray(field) ? field : [field])) {
      map.set(value, (map.get(value) ?? 0) + 1);
    }
    return map;
  }, new Map())].sort(([a], [b]) => a.localeCompare(b, 'en')));
  return { total: catalog.entries.length, origins: counts('origin'), kinds: counts('kind'), useCases: counts('useCases'), evidenceTypes: counts('evidenceType') };
}

function tieValue(id, seed) {
  let hash = 2166136261;
  for (const char of `${seed}:${id}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

export function validateCatalog(catalog) {
  if (catalog?.schemaVersion !== 2 || !catalog.provenance?.forma || !Array.isArray(catalog.entries)
    || typeof catalog.provenance.forma.method !== 'string' || typeof catalog.provenance.forma.scope !== 'string') {
    throw new Error('Invalid Forma pattern catalog schema. Expected version 2 with Forma authoring metadata.');
  }
  const ids = new Set();
  const allowed = new Set(['id', 'name', 'origin', 'kind', 'useCases', 'tags', 'idea', 'whenToUse', 'structure', 'adapt', 'avoid', 'verify', 'resources', 'evidence', 'rights']);
  const evidenceTypes = ['implementation-contract', 'executable-demo', 'reusable-component', 'guidance-with-helper'];
  const strings = value => Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'string' && item.trim());
  for (const entry of catalog.entries) {
    if (!entry || Object.keys(entry).some(key => !allowed.has(key))
      || typeof entry.id !== 'string' || !/^forma-[a-z0-9-]+$/.test(entry.id) || ids.has(entry.id)
      || entry.origin !== 'forma'
      || !['name', 'kind', 'idea', 'whenToUse'].every(key => typeof entry[key] === 'string' && entry[key].trim())
      || !['useCases', 'tags', 'structure', 'adapt', 'avoid', 'verify'].every(key => strings(entry[key]))
      || !Array.isArray(entry.resources) || !entry.resources.length || entry.resources.some(resource =>
        typeof resource?.label !== 'string' || !resource.label.trim() || typeof resource.path !== 'string'
        || !/^(assets|references)\/[a-zA-Z0-9_./-]+$/.test(resource.path) || resource.path.split('/').includes('..'))
      || !evidenceTypes.includes(entry.evidence?.type) || entry.evidence?.liveVerified !== false
      || entry.evidence?.capture !== null || !strings(entry.evidence?.limits)
      || typeof entry.rights?.notes !== 'string' || typeof entry.rights?.scope !== 'string') {
      throw new Error(`Invalid or duplicate Forma pattern entry: ${entry?.id ?? '(missing ID)'}`);
    }
    ids.add(entry.id);
  }
  return catalog;
}

function searchFields(entry) {
  return [
    ['name', new Set(words(`${entry.id} ${entry.name}`)), 4],
    ['classification', new Set(words([entry.kind, ...entry.useCases, ...entry.tags].join(' '))), 3],
    ['concept', new Set(words(`${entry.idea} ${entry.whenToUse ?? ''}`)), 2],
    ['pattern-notes', new Set(words([...entry.structure, ...entry.adapt, ...entry.verify].join(' '))), 1],
  ];
}

export function rankReferences(catalog, options = {}) {
  const { query = '', kind, useCase, origin, evidenceType, seed, site } = options;
  const available = facets(catalog);
  for (const [name, value, choices] of [['kind', kind, available.kinds], ['use-case', useCase, available.useCases], ['origin', origin, available.origins], ['evidence', evidenceType, available.evidenceTypes]]) {
    if (value !== undefined && !Object.hasOwn(choices, value)) throw new Error(`Unknown ${name} "${value}". Use --list for valid filters.`);
  }
  const terms = queryTerms(query);
  if (query.trim() && !terms.length) throw new Error('The query needs a specific subject or component, not only generic words.');
  const filters = { ...(kind && { kind }), ...(useCase && { useCase }), ...(origin && { origin }), ...(evidenceType && { evidenceType }) };
  const matches = [];
  for (const entry of catalog.entries) {
    if ((site && entry.id !== site) || (kind && entry.kind !== kind) || (origin && entry.origin !== origin)
      || (useCase && !entry.useCases.includes(useCase)) || (evidenceType && entry.evidence.type !== evidenceType)) continue;
    const fields = searchFields(entry);
    const matchedTerms = [];
    for (const { term, alternatives } of terms) {
      let found;
      for (const [field, tokens, weight] of fields) {
        const matched = alternatives.find(token => tokens.has(token));
        if (matched) { found = { term, matched, field, weight }; break; }
      }
      if (found) matchedTerms.push(found);
    }
    if (matchedTerms.length !== terms.length) continue;
    matches.push({ entry, match: {
      lexicalScore: matchedTerms.reduce((total, item) => total + item.weight, 0),
      literalMatches: matchedTerms.filter(item => item.matched === item.term).length,
      matchedTerms, filters,
    } });
  }
  matches.sort((a, b) => b.match.lexicalScore - a.match.lexicalScore
    // An explicit subject wins a tie against a broader alias; field relevance still comes first.
    || b.match.literalMatches - a.match.literalMatches
    || (seed === undefined ? 0 : tieValue(a.entry.id, seed) - tieValue(b.entry.id, seed))
    || a.entry.id.localeCompare(b.entry.id, 'en'));
  return matches;
}
