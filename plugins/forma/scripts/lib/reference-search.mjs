// Shared lexical matching for the CLI and reference browser; no host or network dependencies.
const normalize = value => String(value).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
const words = value => normalize(value).match(/[\p{L}\p{N}]+/gu) ?? [];
const STOP = new Set('a as o os um uma uns umas de da das do dos e em no na nos nas com para por que eu quero quero the a an of and in with for to website websites site sites pagina paginas design'.split(' '));
// Deliberately small vocabulary: aliases expand the literal query, never infer user intent.
const ALIASES = {
  sidebar: ['sidebar', 'navigation'], lateral: ['sidebar'], navegacao: ['navigation', 'sidebar'],
  botoes: ['buttons', 'button'], botao: ['button', 'buttons'], campos: ['inputs', 'forms'], campo: ['input', 'inputs'],
  perfil: ['profile', 'identity'], configuracoes: ['settings', 'preferences'], configuracao: ['settings'],
  temas: ['theme', 'themes'], tema: ['theme', 'themes'], noturno: ['dark'], escuro: ['dark'], claro: ['light'],
  cores: ['color', 'colour', 'palette'], cor: ['color', 'colour'], paleta: ['palette', 'colour'],
  luz: ['lighting', 'light'], luzes: ['lighting', 'pools'], iluminacao: ['lighting', 'pools'], granulado: ['grain'],
  livro: ['book'], livros: ['book', 'books'], capa: ['cover'], lombada: ['spine'], folhas: ['pages'], biblioteca: ['library'],
  grafo: ['graph'], grafos: ['graph', 'graphs'], mapa: ['map'], mapas: ['map', 'maps'], dados: ['data'],
  movimento: ['motion', 'animation'], animacao: ['animation', 'motion'], animacoes: ['animation', 'motion'], rolagem: ['scroll'],
  celular: ['mobile', 'phone'], movel: ['mobile'], limpo: ['clean', 'quiet'], limpa: ['clean', 'quiet'],
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
    for (const value of new Set(Array.isArray(entry[key]) ? entry[key] : [entry[key]])) {
      map.set(value, (map.get(value) ?? 0) + 1);
    }
    return map;
  }, new Map())].sort(([a], [b]) => a.localeCompare(b, 'en')));
  return { total: catalog.entries.length, origins: counts('origin'), kinds: counts('kind'), useCases: counts('useCases') };
}

function tieValue(id, seed) {
  let hash = 2166136261;
  for (const char of `${seed}:${id}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function searchFields(entry) {
  return [
    ['name', new Set(words(`${entry.id} ${entry.name}`)), 4],
    ['classification', new Set(words([entry.kind, ...entry.useCases, ...entry.tags].join(' '))), 3],
    ['concept', new Set(words(`${entry.idea} ${entry.whenToUse ?? ''}`)), 2],
    ['study-notes', new Set(words([entry.hero, entry.type, entry.colour, entry.imagery, entry.layout, entry.motion,
      ...(entry.sections ?? []).map(section => section.description), ...(entry.adapt ?? [])].filter(Boolean).join(' '))), 1],
  ];
}

export function rankReferences(catalog, options = {}) {
  const { query = '', kind, useCase, origin, seed, site } = options;
  const available = facets(catalog);
  for (const [name, value, choices] of [['kind', kind, available.kinds], ['use-case', useCase, available.useCases], ['origin', origin, available.origins]]) {
    if (value !== undefined && !Object.hasOwn(choices, value)) throw new Error(`Unknown ${name} "${value}". Use --list for valid filters.`);
  }
  const terms = queryTerms(query);
  if (query.trim() && !terms.length) throw new Error('The query needs a specific subject or component, not only generic words.');
  const filters = { ...(kind && { kind }), ...(useCase && { useCase }), ...(origin && { origin }) };
  const matches = [];
  for (const entry of catalog.entries) {
    if ((site && entry.id !== site) || (kind && entry.kind !== kind) || (origin && entry.origin !== origin)
      || (useCase && !entry.useCases.includes(useCase))) continue;
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
    matches.push({ entry, match: { lexicalScore: matchedTerms.reduce((total, item) => total + item.weight, 0), matchedTerms, filters } });
  }
  matches.sort((a, b) => b.match.lexicalScore - a.match.lexicalScore
    || (seed === undefined ? 0 : tieValue(a.entry.id, seed) - tieValue(b.entry.id, seed))
    || a.entry.id.localeCompare(b.entry.id, 'en'));
  return matches;
}
