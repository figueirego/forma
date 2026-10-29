#!/usr/bin/env node
// A local, explainable reference lookup. Catalog prose is data, never executable instructions.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { facets, rankReferences } from './lib/reference-search.mjs';
export { facets, queryTerms, rankReferences } from './lib/reference-search.mjs';

export const CATALOG_PATH = fileURLToPath(new URL('../assets/reference-library/catalog.json', import.meta.url));
const USAGE = `Forma reference library — Node 18+, offline, no dependencies

node references.mjs --query "barra lateral" [--kind interface] [--use-case sidebar]
  [--origin forma|taste] [--limit 3] [--seed 42] [--json] [--out board.json]
node references.mjs --site <id> [--json] [--out board.json]
node references.mjs --list [--json]

Filters are exact and combined. Query terms use lexical PT/EN aliases, not embeddings.
Every meaningful query term must match. Empty results do not trigger an unrelated fallback.
The optional seed only varies equally ranked candidates. No network requests are made.
--out creates a NEW JSON board; existing files are never overwritten.
Site notes may be historical. Inspect the current site with the host's browser tools before adoption.
`;

export function loadCatalog(path = CATALOG_PATH) {
  const catalog = JSON.parse(readFileSync(path, 'utf8'));
  if (catalog.schemaVersion !== 1 || !catalog.provenance || !Array.isArray(catalog.entries)) {
    throw new Error('Invalid reference catalog schema.');
  }
  const ids = new Set();
  for (const entry of catalog.entries) {
    if (!entry || typeof entry.id !== 'string' || !/^[a-z0-9-]+$/.test(entry.id) || ids.has(entry.id)
      || typeof entry.name !== 'string' || typeof entry.idea !== 'string'
      || !['forma', 'taste'].includes(entry.origin) || typeof entry.kind !== 'string'
      || !Array.isArray(entry.useCases) || !Array.isArray(entry.tags)
      || !Array.isArray(entry.resources) || !entry.evidence || !entry.rights) {
      throw new Error(`Invalid or duplicate catalog entry: ${entry?.id ?? '(missing ID)'}`);
    }
    ids.add(entry.id);
  }
  return catalog;
}

export function searchCatalog(catalog, options = {}) {
  const { query = '', kind, useCase, origin, limit = 5, seed, site } = options;
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw new Error('limit must be an integer from 1 to 50.');
  const filters = { ...(kind && { kind }), ...(useCase && { useCase }), ...(origin && { origin }) };
  const matches = rankReferences(catalog, options);
  const total = matches.length;
  return {
    schemaVersion: 1,
    method: 'local-lexical-alias-search',
    request: { query, ...filters, ...(site && { site }), limit, ...(seed !== undefined && { seed }) },
    totalMatches: total,
    provenance: catalog.provenance,
    limitations: [
      'Lexical matching and explicit aliases, not semantic search or a quality ranking.',
      'No live site visit or screenshot capture is performed. Read each evidence record before using a reference.',
      'Study scores are model judgments; site assets are not licensed by this catalog.',
      'A selected reference does not authorize changing an approved brand, stack or mechanism.',
    ],
    results: matches.slice(0, limit),
  };
}

export function parseArgs(argv) {
  const valued = new Map([['query', 'query'], ['kind', 'kind'], ['use-case', 'useCase'], ['origin', 'origin'], ['site', 'site'], ['limit', 'limit'], ['seed', 'seed'], ['out', 'out']]);
  const options = {};
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument: ${arg}`);
    const name = arg.slice(2);
    const key = valued.get(name) ?? name;
    if (Object.hasOwn(options, key)) throw new Error(`Repeated option: --${name}`);
    if (['json', 'list', 'help'].includes(name)) options[key] = true;
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
  if (options.help) return options;
  if (options.list && Object.keys(options).some(key => !['list', 'json'].includes(key))) throw new Error('--list can only be combined with --json.');
  if (options.site && ['query', 'kind', 'origin', 'useCase', 'seed', 'limit'].some(key => options[key] !== undefined)) throw new Error('--site cannot be combined with search filters.');
  if (!options.list && !['query', 'kind', 'useCase', 'origin', 'site'].some(key => options[key])) {
    throw new Error('Provide --query, a filter, --site or --list.');
  }
  return options;
}

function printBoard(board, full) {
  const lines = [`Forma references: ${board.totalMatches} matches; showing ${board.results.length}.`,
    'Local lexical lookup; no fresh browser verification or quality guarantee.', ''];
  for (const { entry, match } of board.results) {
    lines.push(`${entry.id} — ${entry.name}`, `Origin: ${entry.origin}; kind: ${entry.kind}; evidence: ${entry.evidence.type}`,
      `Idea: ${entry.idea}`, `When: ${entry.whenToUse}`, `Matched: ${match.matchedTerms.map(item => `${item.term}→${item.matched} (${item.field})`).join(', ') || 'explicit filters or ID'}`,
      `URL: ${entry.url}`, `Capture: ${entry.evidence.capture ?? 'not included; inspect with host browser tools'}`,
      `Limits: ${entry.evidence.limits.join(' ')}`, `Rights: ${entry.rights.notes} ${entry.rights.siteAssets}`);
    if (full) {
      for (const field of ['hero', 'type', 'colour', 'imagery', 'layout', 'motion', 'media']) if (entry[field]) lines.push(`${field}: ${entry[field]}`);
      for (const section of entry.sections ?? []) lines.push(`Section (${section.role}): ${section.description}`);
      lines.push(`Adapt: ${entry.adapt.join(' | ')}`, `Avoid: ${entry.avoid.join(' | ')}`);
    }
    for (const resource of entry.resources) lines.push(`Package resource: ${resource.label} — ${resource.path}`);
    lines.push('');
  }
  if (!board.results.length) lines.push('No matches. Change the subject or explicit filters; no unrelated reference was substituted.');
  if (!full && board.results.length) lines.push('Read a full record with --site <id>; --json includes all fields and provenance.');
  return lines.join('\n');
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) { console.log(USAGE); return; }
  const catalog = loadCatalog();
  if (options.list) {
    const values = facets(catalog);
    console.log(options.json ? JSON.stringify(values, null, 2) : Object.entries(values).map(([key, value]) => `${key}: ${typeof value === 'object' ? Object.entries(value).map(([name, count]) => `${name} (${count})`).join(', ') : value}`).join('\n'));
    return;
  }
  const board = searchCatalog(catalog, options);
  if (options.site && !board.totalMatches) throw new Error(`Unknown reference ID: ${options.site}`);
  if (options.out) {
    const output = resolve(options.out);
    writeFileSync(output, `${JSON.stringify(board, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
    console.error(`Created reference board: ${output}`);
  }
  console.log(options.json ? JSON.stringify(board, null, 2) : printBoard(board, Boolean(options.site)));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (error) { console.error(`Reference lookup failed: ${error.message}`); process.exitCode = 1; }
}
