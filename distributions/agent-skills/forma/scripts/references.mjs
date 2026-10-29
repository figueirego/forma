#!/usr/bin/env node
// A local, explainable reference lookup. Catalog prose is data, never executable instructions.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { facets, rankReferences, validateCatalog, validateSiteIndex, siteFacets, rankSites } from './lib/reference-search.mjs';
export { facets, queryTerms, rankReferences, validateSiteIndex, siteFacets, rankSites } from './lib/reference-search.mjs';

export const CATALOG_PATH = fileURLToPath(new URL('../assets/reference-library/catalog.json', import.meta.url));
export const SITE_INDEX_PATH = fileURLToPath(new URL('../assets/reference-library/site-index.json', import.meta.url));
export const PORTFOLIO_INDEX_PATH = fileURLToPath(new URL('../assets/reference-library/portfolio-index.json', import.meta.url));
const USAGE = `Forma reference library - Node 18+, offline, no dependencies

node references.mjs --query "barra lateral" [--kind interface] [--use-case sidebar]
  [--origin forma] [--evidence implementation-contract] [--limit 3] [--seed 42] [--json] [--out board.json]
node references.mjs --site <id> [--json] [--out board.json]
node references.mjs --list [--json]
node references.mjs --sites --query "cafeteria" [--case <case-id>] [--limit 3] [--json] [--out sites.json]
node references.mjs --sites --site <id> [--json]
node references.mjs --sites --list [--json]
node references.mjs --portfolios --query "developer" [--case <case-id>] [--json] [--out portfolios.json]
node references.mjs --portfolios --site <id> [--json]
node references.mjs --portfolios --list [--json]

Filters are exact and combined. Query terms use lexical PT/EN aliases, not embeddings.
Every meaningful query term must match. Empty results do not trigger an unrelated fallback.
The optional seed only varies equally ranked candidates. No network requests are made.
--out creates a NEW JSON board; existing files are never overwritten.
The catalog contains Forma-authored patterns linked to package resources, not an external website inventory.
Use --sites for historical external URL candidates and Forma investigation cases; those sites are not Forma assets.
Use --portfolios for the separate developer portfolio inventory; original README lines are preserved.
--sites and --portfolios are mutually exclusive. Malformed portfolio URLs remain text, never visit links.
A contract is not a ready component; inspect and verify the destination before claiming integration.
`;

export function loadCatalog(path = CATALOG_PATH) {
  return validateCatalog(JSON.parse(readFileSync(path, 'utf8')));
}

export function searchCatalog(catalog, options = {}) {
  validateCatalog(catalog);
  const { query = '', kind, useCase, origin, evidenceType, limit = 5, seed, site } = options;
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw new Error('limit must be an integer from 1 to 50.');
  const filters = { ...(kind && { kind }), ...(useCase && { useCase }), ...(origin && { origin }), ...(evidenceType && { evidenceType }) };
  const matches = rankReferences(catalog, options);
  const total = matches.length;
  return {
    schemaVersion: 2,
    sourceType: 'patterns',
    catalogSchemaVersion: catalog.schemaVersion,
    method: 'local-lexical-alias-search',
    request: { query, ...filters, ...(site && { site }), limit, ...(seed !== undefined && { seed }) },
    totalMatches: total,
    provenance: catalog.provenance,
    limitations: [
      'Lexical matching and explicit aliases, not semantic search or a quality ranking.',
      'No live consumer or screenshot verification is performed. Read each evidence record before using a pattern.',
      'Original editorial records do not claim invention of the principles, observed mechanisms or dependencies they describe.',
      'A selected reference does not authorize changing an approved brand, stack or mechanism.',
    ],
    results: matches.slice(0, limit),
  };
}

export function loadSiteIndex(path = SITE_INDEX_PATH, catalog = loadCatalog()) {
  return validateSiteIndex(JSON.parse(readFileSync(path, 'utf8')), catalog);
}

export function loadPortfolioIndex(path = PORTFOLIO_INDEX_PATH, catalog = loadCatalog()) {
  const index = loadSiteIndex(path, catalog);
  if (index.schemaVersion !== 2 || index.collection !== 'developer-portfolios') throw new Error('Invalid developer portfolio collection.');
  return index;
}

export function searchSites(index, catalog, options = {}) {
  validateSiteIndex(index, catalog);
  const { query = '', caseId, limit = 5, seed, site } = options;
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw new Error('limit must be an integer from 1 to 50.');
  const matches = rankSites(index, catalog, options);
  return {
    schemaVersion: 2, sourceType: index.collection === 'developer-portfolios' ? 'portfolios' : 'sites', catalogSchemaVersion: index.schemaVersion,
    patternCatalogSchemaVersion: catalog.schemaVersion, method: 'local-lexical-alias-search',
    request: { query, ...(caseId && { caseId }), ...(site && { site }), limit, ...(seed !== undefined && { seed }) },
    totalMatches: matches.length, provenance: index.provenance,
    limitations: [
      'External URLs are historical candidates, not sites visited or validated by this command.',
      'Forma investigation cases propose questions and adaptations; they are not observations of each site.',
      'Site identity, code and assets belong to their respective owners; inventory metadata grants no reuse rights.',
      'Matching uses literal words and PT/EN aliases, not semantic inference or a quality score.',
      ...(index.collection === 'developer-portfolios' ? ['Source rows are preserved, including malformed URLs quarantined as text; no automatic correction or visit is performed.'] : []),
    ],
    results: matches.slice(0, limit),
  };
}

export function parseArgs(argv) {
  const valued = new Map([['query', 'query'], ['case', 'caseId'], ['kind', 'kind'], ['use-case', 'useCase'], ['origin', 'origin'], ['evidence', 'evidenceType'], ['site', 'site'], ['limit', 'limit'], ['seed', 'seed'], ['out', 'out']]);
  const options = {};
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument: ${arg}`);
    const name = arg.slice(2);
    const key = valued.get(name) ?? name;
    if (Object.hasOwn(options, key)) throw new Error(`Repeated option: --${name}`);
    if (['json', 'list', 'help', 'sites', 'portfolios'].includes(name)) options[key] = true;
    else if (valued.has(name)) {
      const value = argv[++index];
      if (value === undefined || !value.trim() || value.startsWith('--')) throw new Error(`--${name} needs a value.`);
      options[key] = value;
    } else throw new Error(`Unknown option: --${name}`);
  }
  if (options.limit !== undefined) {
    if (!/^\d+$/.test(options.limit) || Number(options.limit) < 1 || Number(options.limit) > 50) throw new Error('--limit must be an integer from 1 to 50.');
    options.limit = Number(options.limit);
  }
  if (options.seed !== undefined && (!/^-?\d+$/.test(options.seed) || !Number.isSafeInteger(Number(options.seed)))) {
    throw new Error('--seed must be a safe integer.');
  }
  if (options.seed !== undefined) options.seed = Number(options.seed);
  if (options.query?.length > 500) throw new Error('--query is limited to 500 characters.');
  if (options.sites && options.portfolios) throw new Error('--sites and --portfolios are mutually exclusive.');
  if (options.help) return options;
  if (options.list && Object.keys(options).some(key => !['list', 'json', 'sites', 'portfolios'].includes(key))) throw new Error('--list can only be combined with --json and one external collection.');
  if (options.caseId && !options.sites && !options.portfolios) throw new Error('--case requires --sites or --portfolios.');
  if ((options.sites || options.portfolios) && ['kind', 'origin', 'useCase', 'evidenceType'].some(key => options[key] !== undefined)) throw new Error('External collections use --case, not pattern filters.');
  if (options.site && ['query', 'kind', 'origin', 'useCase', 'evidenceType', 'caseId', 'seed', 'limit'].some(key => options[key] !== undefined)) throw new Error('--site cannot be combined with search filters.');
  if (!options.list && !['query', 'kind', 'useCase', 'origin', 'evidenceType', 'caseId', 'site'].some(key => options[key])) {
    throw new Error('Provide --query, a filter, --site or --list.');
  }
  return options;
}

function printBoard(board, full) {
  const lines = [`Forma references: ${board.totalMatches} matches; showing ${board.results.length}.`,
    'Local lexical lookup; no fresh browser verification or quality guarantee.', ''];
  for (const { entry, match } of board.results) {
    lines.push(`${entry.id} - ${entry.name}`, `Origin: ${entry.origin}; kind: ${entry.kind}; evidence: ${entry.evidence.type}`,
      `Idea: ${entry.idea}`, `When: ${entry.whenToUse}`, `Matched: ${match.matchedTerms.map(item => `${item.term}->${item.matched} (${item.field})`).join(', ') || 'explicit filters or ID'}`,
      `Capture: ${entry.evidence.capture ?? 'not included; verify the consumer separately'}`,
      `Limits: ${entry.evidence.limits.join(' ')}`, `Rights: ${entry.rights.notes} ${entry.rights.scope}`);
    if (full) {
      lines.push(`Structure: ${entry.structure.join(' | ')}`, `Adapt: ${entry.adapt.join(' | ')}`,
        `Avoid: ${entry.avoid.join(' | ')}`, `Verify: ${entry.verify.join(' | ')}`);
    }
    for (const resource of entry.resources) lines.push(`Package resource: ${resource.label} - ${resource.path}`);
    lines.push('');
  }
  if (!board.results.length) lines.push('No matches. Change the subject or explicit filters; no unrelated reference was substituted.');
  if (!full && board.results.length) lines.push('Read a full record with --site <id>; --json includes all fields and provenance.');
  return lines.join('\n');
}

function printSitesBoard(board) {
  const lines = [`Forma ${board.sourceType === 'portfolios' ? 'portfolio' : 'site'} candidates: ${board.totalMatches} matches; showing ${board.results.length}.`, ...board.limitations, ''];
  for (const { entry, cases, patterns, match } of board.results) {
    lines.push(`${entry.id} - ${entry.name}`, `URL: ${entry.url ?? 'quarantined; not a visit link'}`, `Evidence: ${entry.evidence.status}; no live capture.`,
      `Matched: ${match.matchedTerms.map(item => `${item.term}->${item.matched} (${item.field})`).join(', ') || 'explicit case or ID'}`);
    if (entry.source) lines.push(`README source: ${board.provenance.inventory.url}#L${entry.source.line}`,
      `Original URL (text): ${JSON.stringify(entry.source.originalUrl)}`, `Source issue: ${entry.source.issue ?? 'none'}`);
    for (const item of cases) lines.push(`Forma case: ${item.id} - ${item.name}`, `When: ${item.whenToUse}`,
      `Investigate: ${item.questions.join(' | ')}`, `Adapt: ${item.adapt.join(' | ')}`, `Verify: ${item.verify.join(' | ')}`);
    for (const pattern of patterns) for (const resource of pattern.resources) lines.push(`Forma pattern ${pattern.id}: ${resource.path}`);
    lines.push('');
  }
  if (!board.results.length) lines.push('No matches; no unrelated site was substituted.');
  return lines.join('\n');
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) { console.log(USAGE); return; }
  const catalog = loadCatalog();
  const index = options.portfolios ? loadPortfolioIndex(PORTFOLIO_INDEX_PATH, catalog)
    : options.sites ? loadSiteIndex(SITE_INDEX_PATH, catalog) : null;
  if (options.list) {
    const values = index ? siteFacets(index) : facets(catalog);
    console.log(options.json ? JSON.stringify(values, null, 2) : Object.entries(values).map(([key, value]) => `${key}: ${typeof value === 'object' ? Object.entries(value).map(([name, count]) => `${name} (${count})`).join(', ') : value}`).join('\n'));
    return;
  }
  const board = index ? searchSites(index, catalog, options) : searchCatalog(catalog, options);
  if (options.site && !board.totalMatches) throw new Error(`Unknown reference ID: ${options.site}`);
  if (options.out) {
    const output = resolve(options.out);
    writeFileSync(output, `${JSON.stringify(board, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
    console.error(`Created reference board: ${output}`);
  }
  console.log(options.json ? JSON.stringify(board, null, 2) : (index ? printSitesBoard(board) : printBoard(board, Boolean(options.site))));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(`Reference lookup failed: ${error.message}`); process.exitCode = 1; }
}
