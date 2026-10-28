# Forma

**Da intenção ao acabamento.**

![Identidade visual da Forma](source/forma/assets/plugin-brand/hero.png)

Sistema de design para assistentes de código: uma coordenadora e 11 especialistas para interfaces, cores, layout, produto, marca, movimento, objetos 3D, grafos, plataformas, referências e validação. Disponível como plugin para **Codex e Claude Code** e como **Agent Skills** para outros ambientes compatíveis.

Você descreve o que precisa; a Forma seleciona as instruções e referências pertinentes, ajuda a implementar no seu projeto e orienta a verificação do resultado. Preserva sua marca e sua stack. Não é um editor visual independente e não garante resultados perfeitos.

## Instalar

Escolha o formato do seu assistente. Não é necessário instalar todas as distribuições.

| Ambiente | Formato | Como começar |
|---|---|---|
| Codex | Plugin nativo | Comandos abaixo; invocação `$forma:forma` |
| Claude Code | Plugin nativo | Comandos abaixo; invocação `/forma:forma` |
| Cursor, Copilot, OpenCode e Gemini CLI | Agent Skills | Copiar/instalar as 12 pastas em `.agents/skills/`; [guia e limites](docs/INSTALLATION.md) |

Também é possível baixar o repositório por **Code → Download ZIP** no GitHub e extrair a pasta inteira. Os pacotes já estão gerados; não é necessário compilar para usá-los.

### Codex

Com uma versão do Codex que ofereça `codex plugin`:

```sh
git clone https://github.com/figueirego/forma.git
cd forma
codex plugin marketplace add .
codex plugin add forma@forma-community
codex plugin list --marketplace forma-community --json
```

Mantenha o clone disponível para as atualizações do catálogo. Depois, abra uma nova conversa ou atualize o catálogo no app e selecione **Forma**. As distribuições `forma-local` e a skill avulsa são independentes; confira a origem escolhida para evitar ambiguidade. Não edite o cache instalado.

Não são necessários Node, Python ou chaves de API para registrar este pacote pronto. O Codex e integrações opcionais têm seus próprios requisitos e condições. Para invocá-lo:

```text
Use $forma:forma para refinar as configurações deste projeto: perfil,
temas, cores e espaçamentos. Preserve a identidade existente e teste
as interações afetadas no desktop e na largura mobile.
```

### Claude Code

```sh
claude plugin marketplace add figueirego/forma
claude plugin install forma@forma-community
claude plugin list
```

Em uma nova sessão, use `/forma:forma` seguido do pedido. Para testar um clone antes de instalar, execute `claude --plugin-dir ./plugins/forma-claude` na raiz deste repositório. Isso se refere ao **Claude Code**, não a qualquer superfície de chat Claude.

### Cursor, Copilot, OpenCode e Gemini CLI

Depois de clonar ou extrair o ZIP, simule a instalação no seu projeto:

```sh
python3 tools/install_skills.py --destination /caminho/do/projeto/.agents/skills
python3 tools/install_skills.py --destination /caminho/do/projeto/.agents/skills --apply
```

O primeiro comando não grava; o segundo copia apenas skills novas e preserva outras skills. Uma Forma existente com conteúdo diferente causa recusa, sem sobrescrita. No Windows, use `py -3` no lugar de `python3` e o caminho local entre aspas.

Sem Python, copie **todas as pastas** de `distributions/agent-skills/` para a pasta de skills reconhecida pelo seu assistente. A coordenadora e as especialistas compartilham recursos; não copie só o `SKILL.md`.

Depois do reload suportado pelo host, peça: “Use Forma para refinar esta interface, preservando minha marca e stack”. Veja [instalação, atualização, remoção e evidências por ambiente](docs/INSTALLATION.md). Compatibilidade de formato não garante que todo host tenha navegador, Figma, REA ou as mesmas permissões.

## Contribuir por pull request

Faça um fork, crie uma branch e abra um PR. Você não precisa de acesso de escrita. Melhorias de documentação, bugs reproduzíveis, exemplos, acessibilidade e testes são bem-vindos.

Leia [CONTRIBUTING.md](CONTRIBUTING.md). Edite `source/forma/`, regenere a distribuição e verifique:

```sh
npm ci --ignore-scripts
python3 tools/build.py
npm run check
```

O desenvolvimento usa Python 3.12+ e Node 24+. Plugins, catálogos e Agent Skills são gerados e versionados para permitir instalação direta; a CI verifica sua correspondência com a fonte. Não mantenha implementações manuais paralelas.

Mudanças entram por PR, com validação e revisão do mantenedor. As regras remotas, a exceção de revisão do único mantenedor e seus limites estão em [governança](docs/GOVERNANCE.md). Um arquivo de política não substitui a proteção configurada no GitHub.

## O que está incluído

- [Coordenadora e roteamento](source/forma/SKILL.md).
- [Componentes e recursos reutilizáveis](source/forma/references/resources.md).
- [Cenários de avaliação](source/forma/evals/routing-scenarios.md).
- [Identidade visual](source/forma/assets/plugin-brand/README.md).
- [Histórico desta distribuição](CHANGELOG.md).

Os testes automatizados verificam seus respectivos contratos. Geometria em Node não comprova renderização, e viewport mobile não equivale a aparelho físico. O editor de aparência possui especificações; isso não significa que todos os componentes estejam prontos para importar. Veja [operação e limites](source/forma/references/plugin-operation.md).

## Licença

[MIT](LICENSE), como o ECC, que informou parte do método de organização. A Forma é independente e não instala o ECC ou LangChain. [Procedência e avisos de terceiros](source/forma/THIRD_PARTY_NOTICES.md). Referências externas mantêm seus próprios direitos e licenças.
