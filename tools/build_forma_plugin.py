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
                note = '\nNeste plugin, `<forma-root>` é a pasta que contém `.codex-plugin/`, `references/`, `assets/`, `scripts/` e `tests/`; não é a pasta de uma especialista. Resolva-a a partir deste arquivo.\n'
                text = re.sub(r'(^# .+\n)', lambda m: m.group(0) + note, text, count=1, flags=re.M)
            if name == Path('SKILL.md'):
                text = text.replace('# Forma\n', '# Forma\n\nNo plugin, as especialistas estão nas pastas irmãs. Os links abaixo já apontam para a cópia deste pacote; não procure outra instalação global da Forma.\n', 1)
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
        'description': f'Sistema de design com {skill_count} skills para interface, cores, produto, 3D, movimento, grafos e validação.',
        'keywords': ['design', 'ui', 'ux', 'cores', '3d', 'motion', 'acessibilidade'],
        'skills': './skills/',
        'interface': {
            'displayName': 'Forma', 'shortDescription': 'Design conectado, da intenção ao acabamento',
            'longDescription': f'Forma coordena {specialist_count} especialistas de design, com referências compartilhadas, recursos reutilizáveis e verificadores locais. Preserva a marca e a stack do projeto e confere os resultados no consumidor.',
            'developerName': 'Forma', 'category': 'Design',
            'capabilities': ['Read', 'Write', 'Interactive'], 'brandColor': '#315BE8',
            'composerIcon': './assets/plugin-brand/icon.svg',
            'logo': './assets/plugin-brand/logo.png',
            'screenshots': ['./assets/plugin-brand/preview-desktop-top.png', './assets/plugin-brand/preview-mobile-top.png'],
            'defaultPrompt': ['Use $forma:forma para criar uma interface no meu projeto.', 'Use $forma:forma para refinar cores, espaços e movimento.', 'Use $forma:forma para auditar e corrigir este design.']
        }
    }
    for asset in [manifest['interface']['composerIcon'], manifest['interface']['logo'], *manifest['interface']['screenshots']]:
        if Path(asset) not in generated:
            raise ValueError(f'Missing identity asset: {asset}')
    generated[Path('catalog.json')] = (json.dumps({'version': version, 'skills': catalog}, ensure_ascii=False, indent=2) + '\n').encode()
    generated[Path('.codex-plugin/plugin.json')] = (json.dumps(manifest, ensure_ascii=False, indent=2) + '\n').encode()
    generated[Path('provenance.json')] = (json.dumps({'version': version, 'source': 'canonical Forma skill', 'transformations': ['Flatten skill directories', 'Rebase local Markdown links', 'Clarify shared resource root', 'Namespace skill invocations in Markdown and composer metadata'], 'files': provenance}, ensure_ascii=False, indent=2) + '\n').encode()
    generated[Path('README.md')] = f'''# Forma {version}

Plugin comunitário de design para Codex, distribuído sob a licença MIT: uma coordenadora e {specialist_count} especialistas. Não exige servidor, chave de API, hooks ou autenticação própria. O uso do Codex continua sujeito ao plano do usuário. Integrações externas são opcionais e só podem ser usadas quando disponíveis e autorizadas.

Selecione **Forma** no catálogo de plugins ou invoque `$forma:forma`. Exemplo: “Use Forma para refinar a sidebar, os botões e as cores deste projeto, preservando sua identidade.” Para uma tarefa específica, selecione Forma Interface, Forma Motion ou outra especialista.

A coordenadora está em [skills/forma/SKILL.md](skills/forma/SKILL.md). A raiz compartilhada contém `references/`, `assets/`, `scripts/`, `tests/` e `evals/`. Caminhos `<forma-root>` nos exemplos apontam para essa raiz, inclusive quando a skill estiver no cache instalado.

O pacote preserva os recursos executáveis da Forma {version}; `provenance.json` registra os arquivos originais e empacotados. O editor completo de aparência tem contratos, não um componente pronto. O BookObject tem implementação reutilizável e dependências documentadas. Este plugin não instala ECC, REA, Figma ou o runtime do Design Agent.

Geração: editar `source/forma/` no [repositório público](https://github.com/figueirego/forma), executar `npm run build` e depois `npm run check`. Esta pasta é gerada; não editar uma segunda cópia dos princípios aqui. Instalação por marketplace copia um snapshot; mudanças posteriores na fonte exigem empacotar e atualizar o plugin. A skill avulsa é uma distribuição independente.

Verificações locais: `python3 scripts/check_package.py --root .` e `python3 -m unittest discover -s tests -p 'test_*.py' -v` na raiz do plugin. O [catálogo](catalog.json) é derivado da fonte; o verificador confere os arquivos reais. Aprovação desses utilitários não comprova design ou integração de um produto. Veja [operação e limites](references/plugin-operation.md).

Identidade visual: [apresentação](assets/plugin-brand/identidade.html), [guia](assets/plugin-brand/README.md) e arquivos SVG/PNG. A marca da Forma pertence ao plugin, não é um tema obrigatório para os seus projetos. O hero é uma imagem gerada, não um componente 3D interativo.
'''.encode()

    # Refuse to silently remove unrelated files in an existing package.
    existing = {p.relative_to(plugin) for p in plugin.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.name != '.DS_Store'} if plugin.exists() else set()
    if existing - generated.keys():
        raise ValueError(f'Unexpected package files: {sorted(map(str, existing - generated.keys()))}')
    for path, data in generated.items():
        output = plugin / path
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(data)
    marketplace = {'name': 'forma-community', 'interface': {'displayName': 'Forma — comunidade'}, 'plugins': [{'name': 'forma', 'version': version, 'source': {'source': 'local', 'path': './plugins/forma'}, 'policy': {'installation': 'AVAILABLE', 'authentication': 'ON_INSTALL'}, 'category': 'Design'}]}
    catalog = destination / '.agents/plugins/marketplace.json'
    catalog.parent.mkdir(parents=True, exist_ok=True)
    catalog.write_text(json.dumps(marketplace, ensure_ascii=False, indent=2) + '\n')
    (destination / 'README.md').write_text(f'''# Forma — plugin comunitário {version}

O pacote contém o catálogo `forma-community` e o plugin em `plugins/forma`, distribuídos sob a licença MIT. Extraia a pasta inteira para um local permanente e use essa pasta como marketplace.

No terminal, dentro desta pasta:

```sh
codex plugin marketplace add .
codex plugin add forma@forma-community
codex plugin list --marketplace forma-community --json
```

Depois, abra uma nova conversa ou atualize o catálogo no Codex e selecione Forma. A instalação só fornece instruções, referências e recursos locais; não inicia serviços ou chamadas a modelos externos.

Se houver uma Forma avulsa em `~/.codex/skills/forma`, ela continua existindo. Para conferir o plugin, use a entrada com namespace do plugin e verifique seu caminho no cache. Não edite o cache; atualize a fonte do pacote e instale a versão nova pelo marketplace. O caminho deste marketplace deve continuar disponível para atualizações; o conteúdo instalado tem sua própria cópia.

Para remover somente o plugin: `codex plugin remove forma@forma-community`. Para remover este catálogo: `codex plugin marketplace remove forma-community`. A Forma avulsa não é apagada por esses comandos.

Detalhes: [plugin](plugins/forma/README.md). Fonte e contribuições: [figueirego/forma](https://github.com/figueirego/forma).
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
