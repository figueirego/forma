"""Build a factual portfolio index from explicit, local upstream snapshots.

No network, upstream execution, copied descriptions, or destination-site validation.
The README is authoritative for the current listing; feed discrepancies stay in the receipt.
"""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import subprocess


REPOSITORY = 'https://github.com/emmabostian/developer-portfolios'
LINK = re.compile(r'^-\s+\[([^\]]+)\]\s*\(')


def parse_readme(content):
    rows = []
    in_section = False
    for number, line in enumerate(content.splitlines(), 1):
        if line.startswith('## '):
            in_section = bool(re.fullmatch(r'## [A-Z]\s*', line))
        if not in_section or not line.lstrip().startswith('- '):
            continue
        listing = line.strip()
        match = LINK.match(listing)
        if not match:
            raise ValueError(f'Unparsed listing at README line {number}; review before importing.')
        # A URL can contain balanced parentheses; stopping at the first ')' loses data.
        depth, end = 1, match.end()
        while end < len(listing) and depth:
            if listing[end] == '(':
                depth += 1
            elif listing[end] == ')':
                depth -= 1
            end += 1
        if depth:
            raise ValueError(f'Unclosed URL at README line {number}; review before importing.')
        name = match.group(1).strip()
        url = listing[match.end():end - 1].strip()
        if not name or not url:
            raise ValueError(f'Empty name or URL at README line {number}.')
        rows.append({'name': name, 'url': url, 'line': number})
    if not rows:
        raise ValueError('No portfolios found in the alphabetic README sections.')
    return rows


def validate_urls(values):
    # Use the browser/CLI's WHATWG parser rather than a second, subtly different
    # Python URL policy. One local Node process validates the whole import batch.
    module = Path(__file__).resolve().parents[1] / 'source/forma/scripts/lib/reference-search.mjs'
    script = """import { readFileSync } from 'node:fs';
const { isSafePortfolioURL } = await import(process.argv[1]);
const values = JSON.parse(readFileSync(0, 'utf8'));
process.stdout.write(JSON.stringify(values.map(isSafePortfolioURL)));
"""
    result = subprocess.run(['node', '--input-type=module', '-e', script, module.as_uri()],
                            input=json.dumps(values), text=True, capture_output=True,
                            check=True, timeout=30)
    flags = json.loads(result.stdout)
    if not isinstance(flags, list) or len(flags) != len(values) or any(type(flag) is not bool for flag in flags):
        raise ValueError('The shared URL validator returned an invalid result.')
    return flags


def cases():
    return [
        {
            'id': 'portfolio-introduction',
            'name': 'Developer portfolio: identity and contact',
            'whenToUse': 'Investigate how a developer presents their work, intended audience and contact options. Inclusion in this listing does not verify a profession, technology stack or level of design quality.',
            'questions': ['Can a visitor understand the intended work and audience from real content?', 'Which contact and profile links are available and still work?'],
            'adapt': ["Write an introduction using the project owner's actual experience and goals.", "Use the project's brand, typography and contact information; do not copy another person's identity or claims."],
            'verify': ['Check heading hierarchy, text contrast, focus, long names and narrow-screen wrapping.', 'Verify contact links and distinguish a working form from an email link or a demonstration.'],
            'patternIds': ['forma-typography', 'forma-color-system', 'forma-recoverable-forms'],
        },
        {
            'id': 'portfolio-project-stories',
            'name': 'Developer portfolio: project evidence and case studies',
            'whenToUse': 'Investigate how projects explain the problem, contribution and result. The index does not verify the claims made by each portfolio.',
            'questions': ['Does a project distinguish individual contributions, team contributions and proposals?', 'Are demos, repositories, images and measured results identified as different kinds of evidence?'],
            'adapt': ["Build case studies from the owner's verifiable work, clearly describing the problem, role, decisions and result.", 'Choose media with known provenance and a readable text alternative; inspect any source-code license separately.'],
            'verify': ['Test project detail views and return navigation with real content, broken media and long titles.', 'Check that screenshots, links and results support the stated contribution without invented metrics.'],
            'patternIds': ['forma-adaptive-list-detail', 'forma-reference-media', 'forma-rendered-review'],
        },
        {
            'id': 'portfolio-navigation',
            'name': 'Developer portfolio: browsing and responsive navigation',
            'whenToUse': 'Investigate project selection, reading order, navigation and responsive behavior. Motion or 3D must be observed before assigning those characteristics to a site.',
            'questions': ['Can visitors find and compare projects without opening every item?', 'What happens to focus, scroll position and selection when opening a project and returning?'],
            'adapt': ['Organize real projects using stable IDs and a coherent content hierarchy.', 'Choose the layout and interactions to support the task in the target project; keep animations optional and essential content accessible.'],
            'verify': ['Test keyboard and touch input, back navigation, narrow viewports and reduced motion on the selected reference and the resulting implementation.', 'Check empty lists, unavailable links, missing thumbnails and preserved reading context.'],
            'patternIds': ['forma-adaptive-list-detail', 'forma-spatial-layout', 'forma-search-discovery'],
        },
    ]


def build(readme, feed, revision):
    if not re.fullmatch(r'[0-9a-f]{40}', revision):
        raise ValueError('Use the full lowercase 40-character source commit.')
    rows = parse_readme(readme)
    if not isinstance(feed, list) or any(not isinstance(row, dict) or not all(
            isinstance(row.get(key), str) and row[key].strip() for key in ('name', 'url')) for row in feed):
        raise ValueError('Feed must be a list of nonempty name/URL records.')
    pairs = [(row['name'], row['url']) for row in rows]
    duplicates = [pair for pair, count in Counter(pairs).items() if count > 1]
    if duplicates:
        raise ValueError('Repeated name/URL pairs require an explicit duplicate policy; no entries were silently dropped.')
    feed_pairs = {(row['name'].strip(), row['url'].strip()) for row in feed}
    readme_pairs = set(pairs)
    case_list = cases()
    entries = []
    for row, valid in zip(rows, validate_urls([row['url'] for row in rows]), strict=True):
        digest = hashlib.sha256(json.dumps([row['name'], row['url']], ensure_ascii=False).encode()).hexdigest()[:20]
        entries.append({
            'id': f'portfolio-{digest}', 'name': row['name'], 'url': row['url'] if valid else None,
            'caseIds': [case['id'] for case in case_list],
            'evidence': {'status': 'historical-candidate', 'liveVerified': False, 'capture': None},
            'source': {'line': row['line'], 'originalUrl': row['url'], 'issue': None if valid else 'malformed-url'},
        })
    if len({entry['id'] for entry in entries}) != len(entries):
        raise ValueError('ID collision; no output was generated.')
    index = {
        'schemaVersion': 2, 'collection': 'developer-portfolios',
        'provenance': {
            'inventory': {
                'url': f'{REPOSITORY}/blob/{revision}/README.md', 'revision': revision,
                'license': 'No explicit repository license was found in the inspected snapshot. This index contains only factual names and URLs; it does not include portfolio code, descriptions or images, or grant rights to those materials.',
                'noticePath': 'THIRD_PARTY_NOTICES.md',
                'retainedFields': ['name', 'url', 'README line'],
            },
            'mapping': {
                'author': 'Forma',
                'method': 'All listings in the pinned README are indexed without merging records by name. Three Forma-authored investigation guides provide questions for the collection, not findings about individual sites. Original URLs and source lines are retained; malformed URLs are quarantined instead of repaired. The feed is compared with the README to identify differences and is not authoritative.',
                'limits': [
                    'No portfolio website was visited, captured, tested or rated during this import. Availability, design, technology and ownership are unverified.',
                    'All cases contain investigation prompts shared by the collection, not extracted website features, professional classifications or quality endorsements.',
                    'The source declares no explicit license in this snapshot. This factual index does not authorize reuse of portfolio code, identities, text, fonts or images.',
                    'A malformed original URL remains visible as data with no active destination link. Historical feed-only URLs are recorded in portfolio-import.json, not silently substituted.',
                    'There is no automatic refresh or crawler. Inspect a selected site before using it as current design evidence.',
                ],
            },
        },
        'cases': case_list, 'entries': entries,
    }
    receipt = {
        'schemaVersion': 1, 'repository': REPOSITORY, 'revision': revision,
        'canonicalSource': 'README.md',
        'counts': {'readmeEntries': len(rows), 'feedEntries': len(feed), 'indexedEntries': len(entries),
                   'intersection': len(readme_pairs & feed_pairs), 'union': len(readme_pairs | feed_pairs),
                   'quarantinedUrls': sum(entry['url'] is None for entry in entries)},
        'readmeNotInFeed': [row for row in rows if (row['name'], row['url']) not in feed_pairs],
        'feedNotInReadme': [{'name': name, 'url': url} for name, url in sorted(feed_pairs - readme_pairs)],
        'repeatedNames': [{'name': name, 'occurrences': count} for name, count in sorted(Counter(row['name'] for row in rows).items()) if count > 1],
        'quarantined': [{'id': entry['id'], 'name': entry['name'], **entry['source']} for entry in entries if entry['url'] is None],
        'policy': 'Every listing in the pinned README is included. Feed-only destinations are historical discrepancies, not additional current portfolios. Names do not uniquely identify people. Raw URLs are never silently repaired. Descriptions and taglines are not imported.',
    }
    return index, receipt


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--readme', type=Path, required=True)
    parser.add_argument('--feed', type=Path, required=True)
    parser.add_argument('--revision', required=True)
    parser.add_argument('--out', type=Path, required=True, help='New directory; existing destinations are refused')
    args = parser.parse_args()
    raw_readme, raw_feed = args.readme.read_bytes(), args.feed.read_bytes()
    index, receipt = build(raw_readme.decode('utf-8'), json.loads(raw_feed), args.revision)
    receipt['sha256'] = {'README.md': hashlib.sha256(raw_readme).hexdigest(), 'feed.json': hashlib.sha256(raw_feed).hexdigest()}
    args.out.mkdir(parents=True, exist_ok=False)
    for name, data in [('portfolio-index.json', index), ('portfolio-import.json', receipt)]:
        (args.out / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(receipt['counts']))


if __name__ == '__main__':
    main()
