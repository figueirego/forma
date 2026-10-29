"""Inventory every package file and catch editorial regressions.

ASCII is an encoding convention, not a grammar test. Source identities and
Unicode test cases remain intact; reviewers must still assess English meaning.
Generated files are checked by build.py against their canonical inputs.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
GENERATED = ('plugins/', 'distributions/', '.agents/plugins/', '.claude-plugin/')
IGNORED = {'.git', 'node_modules', '__pycache__', '.pytest_cache'}
BINARY = {'.png', '.ttf', '.woff2'}
TEXT = {'.md', '.py', '.js', '.mjs', '.cjs', '.json', '.html', '.css', '.svg', '.yaml', '.yml', '.txt'}
# These approved product files retain their source locale and exact bytes.
PRESERVED_NEURON = {'data.js': '253f00f75e5776f478e837f04fdf8d8bfac01ee5b97a602855f6c22ff38a55a9', 'lighting.js': '99c99b2cf8321c438b14b865dbda5518043c2e43f1ee3abac932963e8f311c3d', 'passport-catalog.js': '962433bcb68dbbfce3fdd866f29b0f7254d3b178eb011a853b54f2959460046b', 'passport-motion.js': '31811adc31352fff917b6248057afa5e9babaf3a1c749c24f1db71b230d85f66', 'passport.css': 'e1620d3b9264126e08da770596765d857d30ce4be2c254b33ae65bf555551d5b', 'passport.js': '1b71496fdce731ee91d2c172bcf4b627747053cae41ba4062cb1c098f7ef44f1', 'profile.css': '025a1ea838fa2a58dd6fe5881d30e3ee3cd8f3cebae700136adcc436be90d2df', 'styles.css': '1bd640092f070282951ab6319da90ff2ad6da6dc852c55cb130e1b70c3067f05', 'icons.js': 'ef4717abcaab0a050fe0b4578abcfeb8fdca1fc3ffca58a4e55e027781a9e73f'}
SOURCE_FIELDS = {
    'source/forma/assets/reference-library/site-index.json': {'name'},
    'source/forma/assets/reference-library/portfolio-index.json': {'name'},
    'source/forma/assets/reference-library/portfolio-import.json': {'name'},
    'source/forma/assets/reference-profiles/seuimposto-2026-10-25.json': {'observed_title'},
}
PORTUGUESE_COPY = re.compile(
    r'\b(?:voce|obrigatorio|configuracoes|carregando|nenhum resultado|'
    r'padroes visuais|referencias canonicas|nao deve|nao altere|nao usar)\b', re.I)


def strings(value, preserved=(), key=''):
    if isinstance(value, str) and key not in preserved:
        yield value
    elif isinstance(value, dict):
        for child_key, child in value.items():
            yield child_key
            yield from strings(child, preserved, child_key)
    elif isinstance(value, list):
        for child in value:
            yield from strings(child, preserved, key)


def inspect_text(relative, text):
    """Validate authored copy without rewriting source identities or fixtures."""
    errors = []
    if text.startswith('\ufeff') or '\ufffd' in text:
        errors.append('Unexpected BOM or replacement character')
    if any(ord(c) < 32 and c not in '\n\r\t' for c in text):
        errors.append('Unexpected control character')
    prefix = 'source/forma/assets/neuron-passport/'
    name = relative[len(prefix):] if relative.startswith(prefix) else None
    if name in PRESERVED_NEURON:
        if hashlib.sha256(text.encode('utf-8')).hexdigest() != PRESERVED_NEURON[name]:
            errors.append('Preserved Neuron source changed; review its provenance before updating the receipt')
        return 'preserved-neuron-source-locale', errors
    if relative.endswith('.json'):
        text = '\n'.join(strings(json.loads(text), SOURCE_FIELDS.get(relative, ())))
        category = 'english-with-preserved-source-fields' if relative in SOURCE_FIELDS else 'english-authored-text'
    else:
        category = 'english-authored-text'
    if relative in {'LICENSE', 'source/forma/LICENSE'}:
        text = text.replace('Matheus Figueir\u00eado', '[original copyright holder]')
        category = 'preserved-license'
    if relative in {'source/forma/references/source-use-cases.md', 'source/forma/references/sources.md',
                    'source/forma/references/data-dashboards.md'}:
        text = text.replace('"Apura\u00e7\u00e3o 2026"', '"[original observed title]"')
    if not text.isascii():
        errors.append('Non-ASCII authored text: ' + ', '.join(sorted(set(c for c in text if ord(c) > 127))))
    # These declarations are functional multilingual inputs, not interface copy.
    copy = text
    if relative == 'source/forma/scripts/lib/reference-search.mjs':
        copy = re.sub(r'const STOP = .*?;\n', '', copy)
        copy = re.sub(r'const ALIASES = \{.*?\n\};', '', copy, flags=re.S)
        category = 'english-with-search-aliases'
    if relative == 'tools/check_editorial.py':
        copy = re.sub(r'PORTUGUESE_COPY = re\.compile\(.*?re\.I\)', '', copy, flags=re.S)
    if relative == 'source/forma/tests/reference-copy.test.cjs':
        # Inspect test comments and messages, but preserve its untranslated-copy detector.
        copy = re.sub(r'(?m)^      /.*?/iu,\s*$', '', copy)
    match = PORTUGUESE_COPY.search(copy)
    if match:
        errors.append('Portuguese copy requires review: ' + match.group())
    if relative.endswith('.html') and relative != 'source/forma/assets/neuron-passport/frame.html' and not re.search(r'<html\b[^>]*\blang=[\'"]en(?:-[A-Za-z]+)?[\'"]', text, re.I):
        errors.append('HTML document must declare an English language')
    return category, errors


def audit(root=ROOT):
    root = Path(root)
    records, errors = [], []
    for path in sorted(root.rglob('*')):
        relative = path.relative_to(root).as_posix()
        if any(part in IGNORED for part in path.relative_to(root).parts) or path.name == '.DS_Store':
            continue
        if not path.is_file():
            continue
        if relative.startswith(GENERATED):
            category, findings = 'generated-from-reviewed-source', []
        elif path.suffix in BINARY:
            category, findings = 'binary-asset-review', []
        elif path.suffix in TEXT or path.name in {'LICENSE', 'CODEOWNERS', '.gitignore'}:
            try:
                category, findings = inspect_text(relative, path.read_text(encoding='utf-8'))
            except (UnicodeError, json.JSONDecodeError) as exc:
                category, findings = 'invalid-text', [str(exc)]
        else:
            category, findings = 'unclassified', ['File type requires an editorial review rule']
        records.append({'path': relative, 'category': category})
        errors.extend({'path': relative, 'message': finding} for finding in findings)
    counts = {}
    for record in records:
        counts[record['category']] = counts.get(record['category'], 0) + 1
    return {'files': records, 'counts': counts, 'errors': errors,
            'limits': 'Encoding and regression checks do not prove grammatical perfection. Binary assets need visual review; generated files need build --check.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--json', action='store_true')
    args = parser.parse_args()
    report = audit()
    if args.json:
        print(json.dumps(report, ensure_ascii=True, indent=2))
    else:
        print('Editorial inventory: ' + json.dumps(report['counts'], sort_keys=True))
        for error in report['errors']:
            print(f"{error['path']}: {error['message']}")
        print(report['limits'])
    return bool(report['errors'])


if __name__ == '__main__':
    raise SystemExit(main())
