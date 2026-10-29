"""Package the canonical Forma source as the public community Codex plugin."""
import argparse
import hashlib
import json
from pathlib import Path
import posixpath
import re
from urllib.parse import unquote, urlsplit
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


def digest(data):
    return hashlib.sha256(data).hexdigest()


def mapped_path(relative):
    parts = relative.parts
    if parts[0] == 'SKILL.md' or parts[0] == 'agents':
        return Path('skills/forma') / relative
    if parts[0] == 'skills':
        return Path('skills') / ('forma-' + parts[1]) / Path(*parts[2:])
    return relative


def relative_link(target, parent):
    """URLs and manifest paths remain POSIX even when authored on Windows."""
    return posixpath.relpath(target.as_posix(), parent.as_posix())


def build(source, destination):
    source = source.resolve()
    destination = destination.resolve()
    plugin = destination / 'plugins/forma'
    originals = {}
    for path in sorted(source.rglob('*')):
        if path.is_symlink():
            raise ValueError(f'Symlink not supported in canonical source: {path}')
        if path.is_file() and '__pycache__' not in path.parts and path.suffix != '.pyc' and path.name != '.DS_Store':
            originals[path.relative_to(source)] = path.read_bytes()
    version = re.search(r'^  version: (\d+\.\d+\.\d+)$', originals[Path('SKILL.md')].decode(), re.M).group(1)
    mapping = {name: mapped_path(name) for name in originals}
    assert len(set(mapping.values())) == len(mapping), 'Duplicate destination paths'
    catalog = []
    for name, content in originals.items():
        if name.name == 'SKILL.md':
            skill_name = re.search(r'^name: ([a-z0-9-]+)$', content.decode(), re.M).group(1)
            catalog.append({'name': skill_name, 'path': mapping[name].as_posix(), 'invocation': '$forma:' + skill_name})
    if len({item['name'] for item in catalog}) != len(catalog):
        raise ValueError('Duplicate skill names')
    skill_count = len(catalog)
    specialist_count = skill_count - 1
    generated = {}
    provenance = []
    for name, content in originals.items():
        target = mapping[name]
        if name.suffix == '.md':
            def replace_link(match):
                raw = match.group(1)
                parsed = urlsplit(raw)
                if parsed.scheme or parsed.netloc:
                    return match.group(0)
                resolved = ((source / name).parent / unquote(parsed.path)).resolve() if parsed.path else source / name
                original_target = resolved.relative_to(source)
                if original_target not in mapping:
                    raise ValueError(f'Unresolved source link: {name}: {raw}')
                new_target = relative_link(mapping[original_target], target.parent) if parsed.path else ''
                if parsed.query:
                    new_target += '?' + parsed.query
                if parsed.fragment:
                    new_target += '#' + parsed.fragment
                return match.group(0).replace('(' + raw + ')', '(' + new_target + ')')
            text = re.sub(r'\[[^\]\n]*\]\(([^)\n]+)\)', replace_link, content.decode())
            if '<skill-dir>' in text:
                text = text.replace('<skill-dir>', '<forma-root>')
                note = '\nIn this plugin, `<forma-root>` is the directory containing `.codex-plugin/`, `references/`, `assets/`, `scripts/` and `tests/`; it is not a specialist directory. Resolve it relative to this file.\n'
                text = re.sub(r'(^# .+\n)', lambda m: m.group(0) + note, text, count=1, flags=re.M)
            if name == Path('SKILL.md'):
                text = text.replace('# Forma\n', '# Forma\n\nIn this plugin, specialists are in sibling directories. The links below already point to this package; do not look for another global Forma installation.\n', 1)
            text = re.sub(r'\$(forma(?:-[a-z0-9]+)*)\b', r'$forma:\1', text)
            content = text.encode()
        elif name.name == 'openai.yaml' and name.parent.name == 'agents':
            # Native plugin discovery prefixes skill names; composer prompts must agree.
            content = re.sub(r'\$(forma(?:-[a-z0-9]+)*)\b', r'$forma:\1', content.decode()).encode()
        generated[target] = content
        provenance.append({'source': name.as_posix(), 'packaged': target.as_posix(), 'source_sha256': digest(originals[name]), 'packaged_sha256': digest(content)})

    manifest = {
        'name': 'forma', 'version': version,
        'license': 'MIT',
        'homepage': 'https://github.com/figueirego/forma',
        'description': f'A design system with {skill_count} skills for interfaces, color, product, 3D, motion, graphs and validation.',
        'keywords': ['design', 'ui', 'ux', 'color', '3d', 'motion', 'accessibility'],
        'skills': './skills/',
        'interface': {
            'displayName': 'Forma', 'shortDescription': 'Connected design, from intent to refinement',
            'longDescription': f'Forma coordinates {specialist_count} design specialists with shared references, reusable resources and local validators. It preserves the project brand and stack and verifies results in the consuming project.',
            'developerName': 'Forma', 'category': 'Design',
            'capabilities': ['Read', 'Write', 'Interactive'], 'brandColor': '#315BE8',
            'composerIcon': './assets/plugin-brand/icon.svg',
            'logo': './assets/plugin-brand/logo.png',
            'screenshots': ['./assets/plugin-brand/preview-desktop-top.png', './assets/plugin-brand/preview-mobile-top.png'],
            'defaultPrompt': ['Use $forma:forma to create an interface in my project.', 'Use $forma:forma to refine color, spacing and motion.', 'Use $forma:forma to audit and fix this design.']
        }
    }
    for asset in [manifest['interface']['composerIcon'], manifest['interface']['logo'], *manifest['interface']['screenshots']]:
        if Path(asset) not in generated:
            raise ValueError(f'Missing identity asset: {asset}')
    generated[Path('catalog.json')] = (json.dumps({'version': version, 'skills': catalog}, ensure_ascii=False, indent=2) + '\n').encode()
    generated[Path('.codex-plugin/plugin.json')] = (json.dumps(manifest, ensure_ascii=False, indent=2) + '\n').encode()
    generated[Path('provenance.json')] = (json.dumps({'version': version, 'source': 'canonical Forma skill', 'transformations': ['Flatten skill directories', 'Rebase local Markdown links', 'Clarify shared resource root', 'Namespace skill invocations in Markdown and composer metadata'], 'files': provenance}, ensure_ascii=False, indent=2) + '\n').encode()
    generated[Path('README.md')] = f'''# Forma {version}

A community design plugin for Codex, distributed under the MIT license: one coordinator and {specialist_count} specialists. It requires no server, API key, hooks or separate authentication. Codex usage remains subject to the user's plan. External integrations are optional and may only be used when available and authorized.

Select **Forma** in the plugin catalog or invoke `$forma:forma`. Example: "Use Forma to refine this project's sidebar, buttons and colors while preserving its identity." For a focused task, select Forma Interface, Forma Motion or another specialist.

The coordinator is at [skills/forma/SKILL.md](skills/forma/SKILL.md). The shared root contains `references/`, `assets/`, `scripts/`, `tests/` and `evals/`. Example paths using `<forma-root>` point to this root, including when the skill is in the installed cache.

This package preserves Forma {version}'s executable resources; `provenance.json` records source and packaged files. BookObject, AppearanceEditor and the extracted NeuronPassport have reusable implementations and documented adapters or dependencies. The legacy Three passport is separate from the approved CSS mechanism. Consumer integration still needs its own validation. This plugin does not install ECC, REA, Figma or the Design Agent runtime.

Build: edit `source/forma/` in the [public repository](https://github.com/figueirego/forma), run `npm run build`, then `npm run check`. This directory is generated; do not edit a second copy of the principles here. Marketplace installation copies a snapshot; later source changes require rebuilding and updating the plugin. The standalone skill is a separate distribution.

Local checks: `python3 scripts/check_package.py --root .` and `python3 -m unittest discover -s tests -p 'test_*.py' -v` from the plugin root. The [catalog](catalog.json) is derived from source; the validator checks actual files. Passing these utilities does not prove product design or integration. See [operation and limits](references/plugin-operation.md).

Visual identity: [presentation](assets/plugin-brand/identidade.html), [guide](assets/plugin-brand/README.md) and SVG/PNG assets. Forma's brand belongs to the plugin; it is not a required theme for your projects. The hero is a generated image, not an interactive 3D component.
'''.encode()

    # Refuse to silently remove unrelated files in an existing package.
    existing = {p.relative_to(plugin) for p in plugin.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.name != '.DS_Store'} if plugin.exists() else set()
    if existing - generated.keys():
        raise ValueError(f'Unexpected package files: {sorted(map(str, existing - generated.keys()))}')
    for path, data in generated.items():
        output = plugin / path
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(data)
    marketplace = {'name': 'forma-community', 'interface': {'displayName': 'Forma community'}, 'plugins': [{'name': 'forma', 'version': version, 'source': {'source': 'local', 'path': './plugins/forma'}, 'policy': {'installation': 'AVAILABLE', 'authentication': 'ON_INSTALL'}, 'category': 'Design'}]}
    catalog = destination / '.agents/plugins/marketplace.json'
    catalog.parent.mkdir(parents=True, exist_ok=True)
    catalog.write_text(json.dumps(marketplace, ensure_ascii=False, indent=2) + '\n')
    (destination / 'README.md').write_text(f'''# Forma community plugin {version}

This package contains the `forma-community` catalog and the plugin at `plugins/forma`, distributed under the MIT license. Extract the entire directory to a permanent location and use it as a marketplace.

In a terminal, from this directory:

```sh
codex plugin marketplace add .
codex plugin add forma@forma-community
codex plugin list --marketplace forma-community --json
```

Then open a new conversation or refresh the catalog in Codex and select Forma. Installation provides only instructions, references and local resources; it does not start services or call external models.

If a standalone Forma exists at `~/.codex/skills/forma`, it remains installed. To verify the plugin, use its namespaced entry and inspect its cache path. Do not edit the cache; update the package source and install the new version through the marketplace. The marketplace path must remain available for updates; the installed content has its own copy.

To remove only the plugin: `codex plugin remove forma@forma-community`. To remove this catalog: `codex plugin marketplace remove forma-community`. These commands do not delete the standalone Forma skill.

Details: [plugin](plugins/forma/README.md). Source and contributions: [figueirego/forma](https://github.com/figueirego/forma).
''')
    archive = destination.with_suffix('.zip')
    with ZipFile(archive, 'w', ZIP_DEFLATED) as zipped:
        for path in sorted(destination.rglob('*')):
            if path.is_file() and '__pycache__' not in path.parts and path.name != '.DS_Store':
                info = ZipInfo((Path(destination.name) / path.relative_to(destination)).as_posix(), (2026, 1, 1, 0, 0, 0))
                info.compress_type = ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                zipped.writestr(info, path.read_bytes())
    print(json.dumps({'version': version, 'skills': skill_count, 'source_files': len(originals), 'plugin_files': len(generated), 'zip_sha256': digest(archive.read_bytes())}, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--destination', type=Path, required=True)
    args = parser.parse_args()
    build(args.source, args.destination)
