"""Derive Claude Code and flat Agent Skills packages from the canonical build."""
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

from build_forma_plugin import relative_link


def json_bytes(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()


def portable_path(path):
    return Path(*path.parts[1:]) if path.parts[0] == 'skills' else Path('forma') / path


def adapt(codex, portable=False):
    """Rebase only instructions; executable assets remain byte-identical."""
    provenance = json.loads((codex / 'provenance.json').read_text())
    originals = {Path(entry['packaged']): (entry, (codex / entry['packaged']).read_bytes())
                 for entry in provenance['files']}
    mapping = {path: portable_path(path) if portable else path for path in originals}
    if len(set(mapping.values())) != len(mapping):
        raise ValueError('Duplicate destination paths')
    files, entries = {}, []
    for path, (entry, data) in originals.items():
        target = mapping[path]
        if path.suffix == '.md':
            def link(match):
                raw = match.group(1)
                parsed = urlsplit(raw)
                if parsed.scheme or parsed.netloc:
                    return match.group(0)
                resolved = ((codex / path).parent / unquote(parsed.path)).resolve() if parsed.path else codex / path
                original = resolved.relative_to(codex)
                if original not in mapping:
                    raise ValueError(f'Unresolved packaged link: {path}: {raw}')
                replacement = relative_link(mapping[original], target.parent) if parsed.path else ''
                if parsed.query:
                    replacement += '?' + parsed.query
                if parsed.fragment:
                    replacement += '#' + parsed.fragment
                return match.group(0).replace('(' + raw + ')', '(' + replacement + ')')
            text = re.sub(r'\[[^\]\n]*\]\(([^)\n]+)\)', link, data.decode())
            root = 'the `forma/` directory installed beside the specialists' if portable else 'this plugin root, containing `.claude-plugin/`'
            text = re.sub(r'^In this plugin, `<forma-root>`[^\n]*',
                          f'In this distribution, `<forma-root>` is {root}; it contains `references/`, `assets/`, `scripts/` and `tests/`. Resolve it relative to this file.',
                          text, flags=re.M)
            if portable and path == Path('skills/forma/SKILL.md'):
                text = text.replace('In this plugin, specialists are in sibling directories.',
                                    'In this Agent Skills package, specialists are in sibling directories.')
                text = text.replace('# Forma\n', '# Forma\n\nThe `$forma` notation identifies the skill; use the invocation supported by your host (for example `/forma`), or ask to use Forma in natural language. Shared resources are in this directory; keep all 12 directories together in the same skills directory.\n', 1)
            data = text.encode()
        if path.suffix == '.md' or (path.name == 'openai.yaml' and path.parent.name == 'agents'):
            replacement = r'$\1' if portable else r'/forma:\1'
            data = re.sub(r'\$forma:(forma(?:-[a-z0-9]+)*)\b', replacement, data.decode()).encode()
        files[target] = data
        entries.append({**entry, 'packaged': target.as_posix(), 'packaged_sha256': hashlib.sha256(data).hexdigest()})
    return files, entries, provenance['version']


def build_other_hosts(destination):
    destination = destination.resolve()
    codex = destination / 'plugins/forma'
    files, entries, version = adapt(codex)
    manifest = {
        'name': 'forma', 'version': version,
        'description': 'Design with one coordinator and 11 specialists, from intent to refinement.',
        'author': {'name': 'Forma'}, 'license': 'MIT',
        'homepage': 'https://github.com/figueirego/forma',
        'repository': 'https://github.com/figueirego/forma',
        'skills': './skills/',
    }
    files[Path('.claude-plugin/plugin.json')] = json_bytes(manifest)
    catalog = json.loads((codex / 'catalog.json').read_text())
    for skill in catalog['skills']:
        skill['invocation'] = '/forma:' + skill['name']
    files[Path('catalog.json')] = json_bytes(catalog)
    files[Path('provenance.json')] = json_bytes({'version': version, 'source': 'canonical Forma skill',
        'transformations': ['Flatten skill directories', 'Rebase local Markdown links', 'Use Claude Code skill invocations'], 'files': entries})
    files[Path('README.md')] = f'''# Forma {version} for Claude Code

One coordinator and 11 specialists. Use `/forma:forma` or `/forma:forma-interface`.
The community marketplace is at the repository root: `claude plugin marketplace add figueirego/forma`, then `claude plugin install forma@forma-community`.
To try this checkout: `claude --plugin-dir ./plugins/forma-claude` from the repository root.

[Coordinator](skills/forma/SKILL.md), [catalog](catalog.json) and [operation](references/plugin-operation.md).
The `agents/openai.yaml` presentation files are preserved for provenance; Claude Code does not depend on them.
This package does not install browser tools, models, services or hooks. Design methods and routing remain in Forma. Check your host's capabilities and permissions.
AppearanceEditor is a reusable module with integration contracts; it is not automatically installed in products.

Generated by `npm run build` from `source/forma/`. Do not edit this copy.
[MIT](LICENSE).
'''.encode()
    write_files(destination / 'plugins/forma-claude', files)
    marketplace = {'name': 'forma-community', 'owner': {'name': 'Forma'},
                   'description': 'Forma: a community design system, from intent to refinement.',
                   'plugins': [{'name': 'forma', 'source': './plugins/forma-claude', 'version': version,
                                'description': manifest['description']}]}
    write_files(destination, {Path('.claude-plugin/marketplace.json'): json_bytes(marketplace)})
    portable, _, _ = adapt(codex, portable=True)
    write_files(destination / 'distributions/agent-skills', portable)


def write_files(root, files):
    for relative, data in files.items():
        target = root / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
