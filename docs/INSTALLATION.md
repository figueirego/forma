# Instalar Forma no seu assistente

A mesma fonte gera três formatos: plugin Codex, plugin Claude Code e Agent Skills. Escolha **um formato por host** para evitar entradas duplicadas. Este pacote fornece instruções, referências e recursos locais; não inclui um modelo, editor visual independente, assinatura ou conexão automática com ferramentas externas.

## Baixar

Clone `https://github.com/figueirego/forma.git` ou use **Code → Download ZIP** no repositório e extraia tudo. Os diretórios `plugins/` e `distributions/` já estão gerados. Node e dependências de desenvolvimento só são necessários para regenerar ou executar os testes do repositório. O instalador opcional usa Python 3.12+ e somente a biblioteca padrão.

## Codex

Na raiz do clone, com uma versão que tenha `codex plugin`:

```sh
codex plugin marketplace add .
codex plugin add forma@forma-community
codex plugin list --marketplace forma-community --json
```

Em sessão nova ou após o reload suportado, use `$forma:forma`. Preserve o clone: ele é a origem local do marketplace. Confira no retorno do gerenciador a versão e origem escolhidas. `forma-local`, uma skill avulsa e `forma-community` são instalações independentes.

Atualização: atualize o clone, consulte `codex plugin marketplace upgrade --help` e atualize o snapshot de `forma-community` com a sintaxe da sua versão. Depois confira o catálogo e a instalação novamente; não presuma que uma conversa aberta já usa os arquivos novos. Remoção: `codex plugin remove forma@forma-community`; o catálogo pode ser retirado com `codex plugin marketplace remove forma-community`.

## Claude Code

```sh
claude plugin marketplace add figueirego/forma
claude plugin install forma@forma-community
claude plugin list
```

Em sessão nova, invoque `/forma:forma` seguido do pedido. A especialista de interface, por exemplo, usa `/forma:forma-interface`. Para testar uma branch/clone, sem registrar o marketplace, execute `claude --plugin-dir ./plugins/forma-claude` na raiz desse clone.

Validação de manifestos, sem chamar modelo:

```sh
claude plugin validate ./plugins/forma-claude
claude plugin validate .
```

Atualize o catálogo e o plugin com `claude plugin marketplace update forma-community` e `claude plugin update forma@forma-community`, depois inicie nova sessão. Remova somente esta instalação com `claude plugin uninstall forma@forma-community`.

Essas instruções são para **Claude Code**. Não implicam disponibilidade no chat Claude, Cowork ou loja oficial. Fontes: [plugins](https://code.claude.com/docs/en/plugins), [marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) e [manifesto](https://code.claude.com/docs/en/plugins-reference).

## Agent Skills: Cursor, Copilot, OpenCode e Gemini CLI

O pacote `distributions/agent-skills/` tem 12 pastas irmãs, cada uma com seu `SKILL.md`. O nome da pasta coincide com o nome da skill. Os recursos comuns ficam em `forma/`; links das especialistas apontam para essa pasta. Instale todas juntas. Isso evita depender da descoberta recursiva, que varia entre os hosts.

Diretórios aceitos nas documentações consultadas em 28/10/2026:

| Host | Projeto | Usuário | Descoberta/invocação |
|---|---|---|---|
| Cursor | `.agents/skills/` ou `.cursor/skills/` | `~/.agents/skills/` ou `~/.cursor/skills/` | Automática ou `/forma`; recursos do usuário não são necessariamente propagados para cloud/SSH |
| GitHub Copilot | `.agents/skills/` ou `.github/skills/` | `~/.agents/skills/` ou `~/.copilot/skills/` | Por relevância; no VS Code também `/forma`. Escopo pessoal depende da superfície |
| OpenCode | `.agents/skills/` ou `.opencode/skills/` | `~/.agents/skills/` ou `~/.config/opencode/skills/` | Agente usa a ferramenta de skill, sujeita às permissões do host |
| Gemini CLI | `.agents/skills/` ou `.gemini/skills/` | `~/.agents/skills/` ou `~/.gemini/skills/` | `/skills list` e `/skills reload`; ativação pelo agente com consentimento do usuário |

Fontes: [Cursor](https://cursor.com/docs/skills), [Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills), [VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills), [OpenCode](https://opencode.ai/docs/skills/), [Gemini CLI](https://geminicli.com/docs/cli/skills/) e [Agent Skills](https://agentskills.io/specification). Confira a versão instalada: diretórios suportados não significam que todo ambiente remoto recebe seus arquivos pessoais.

### Instalação por projeto

Na raiz do repositório Forma, substitua o caminho pelo seu projeto. A primeira execução apenas mostra o plano:

```sh
python3 tools/install_skills.py --destination /caminho/do/projeto/.agents/skills
python3 tools/install_skills.py --destination /caminho/do/projeto/.agents/skills --apply
```

No PowerShell, por exemplo:

```powershell
py -3 tools/install_skills.py --destination "C:\Projetos\MeuApp\.agents\skills"
py -3 tools/install_skills.py --destination "C:\Projetos\MeuApp\.agents\skills" --apply
```

Para instalação pessoal, indique o diretório de usuário da tabela. Prefira projeto quando quiser que a equipe ou um agente remoto receba os mesmos arquivos; revise antes de versioná-los. Não use simultaneamente dois diretórios com cópias diferentes da Forma.

O instalador não muda configurações do assistente, não usa rede e não sobrescreve arquivos. Pastas idênticas ficam intactas; qualquer conflito interrompe a instalação antes das cópias. Não rode instalações concorrentes e use somente diretórios sob seu controle. Symlinks são recusados. Uma falha de cópia tenta desfazer apenas os itens criados nesta execução; se a limpeza não puder ser concluída, o erro informa isso.

Sem Python, copie as 12 pastas pelo gerenciador de arquivos para o diretório escolhido. Confira se `forma/SKILL.md` e `forma-interface/SKILL.md` ficaram diretamente sob a raiz de skills. Evite uma pasta intermediária como `.agents/skills/agent-skills/`.

### Confirmar e usar

1. Atualize as skills no host ou abra uma sessão nova.
2. Confira que `forma` e as 11 especialistas estão disponíveis na origem escolhida. Não confunda listagem com execução.
3. Peça: “Use Forma para revisar este formulário. Primeiro identifique a origem carregada e a especialista de interface, leia os contratos pertinentes e proponha o ajuste sem editar”.
4. Confira os arquivos realmente lidos. Depois autorize a implementação e teste o resultado no produto.

O `$forma` nos textos portáteis identifica a skill, mas não é um comando universal. No Cursor/VS Code, selecione `/forma` quando disponível; no OpenCode ou Gemini, use linguagem natural e o mecanismo de ativação oferecido pelo host.

### Atualizar e remover

Faça backup das 12 pastas Forma existentes para fora do diretório monitorado. Confira se há mudanças locais antes de movê-las. Instale a nova versão no diretório agora livre; o instalador recusa mesclar versões automaticamente. Mantenha outras skills intactas. Para remover, retire somente `forma/` e as pastas `forma-*` que constam na distribuição instalada, após conferir seus nomes; não use remoção por wildcard se houver skills de terceiros com nomes semelhantes.

## O que foi verificado

- Geração determinística e ausência de divergências entre fonte e distribuições.
- Catálogos, frontmatter, caminhos, links, proveniência dos plugins e igualdade dos recursos executáveis.
- Instalação em diretório temporário independente, com espaços no caminho; simulação, conflito, idempotência e preservação de outras skills.
- Manifestos Claude Code podem ser verificados pelo CLI local com os comandos acima; o resultado observado nesta alteração será registrado no PR.

Esses checks não executam tarefas de design em cada assistente. A descoberta e o comportamento precisam ser confirmados na versão/sessão real do host; Windows e dispositivos físicos não são certificados por um teste local no macOS. Ferramentas indisponíveis devem ser declaradas e substituídas por evidência acessível, nunca simuladas.
