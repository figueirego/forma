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
            root = 'a pasta `forma/` instalada junto às especialistas' if portable else 'a raiz deste plugin, que contém `.claude-plugin/`'
            text = re.sub(r'^Neste plugin, `<forma-root>`[^\n]*',
                          f'Nesta distribuição, `<forma-root>` é {root}; contém `references/`, `assets/`, `scripts/` e `tests/`. Resolva-a a partir deste arquivo.',
                          text, flags=re.M)
            if portable and path == Path('skills/forma/SKILL.md'):
                text = text.replace('No plugin, as especialistas estão nas pastas irmãs.',
                                    'Neste pacote de Agent Skills, as especialistas estão nas pastas irmãs.')
                text = text.replace('# Forma\n', '# Forma\n\nA notação `$forma` identifica a skill; use a invocação realmente disponível no host (por exemplo `/forma`), ou peça em linguagem natural para usar Forma. Os recursos compartilhados ficam nesta pasta; mantenha as 12 pastas juntas no mesmo diretório de skills.\n', 1)
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
        'description': 'Design com uma coordenadora e 11 especialistas, da intenção ao acabamento.',
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
    files[Path('README.md')] = f'''# Forma {version} para Claude Code

Uma coordenadora e 11 especialistas. Use `/forma:forma` ou `/forma:forma-interface`.
O marketplace comunitário está na raiz do repositório: `claude plugin marketplace add figueirego/forma`, depois `claude plugin install forma@forma-community`.
Para experimentar este checkout: `claude --plugin-dir ./plugins/forma-claude` a partir da raiz do repositório.

[Coordenadora](skills/forma/SKILL.md), [catálogo](catalog.json) e [operação](references/plugin-operation.md).
Os arquivos de apresentação `agents/openai.yaml` são preservados para procedência; Claude Code não depende deles.
Não instala ECC, REA, ferramentas de navegador, modelos, serviços ou hooks. Confira recursos e permissões do seu host.
O editor de aparência é um contrato de implementação, não um componente automaticamente instalado em produtos.

Gerado por `npm run build` a partir de `source/forma/`. Não editar esta cópia.
[MIT](LICENSE) e [avisos de terceiros](THIRD_PARTY_NOTICES.md).
'''.encode()
    write_files(destination / 'plugins/forma-claude', files)
    marketplace = {'name': 'forma-community', 'owner': {'name': 'Forma'},
                   'description': 'Forma: sistema comunitário de design, da intenção ao acabamento.',
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
