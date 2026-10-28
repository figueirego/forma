# Operar e verificar a distribuição Forma

Neste plugin, `<forma-root>` é a pasta que contém `.codex-plugin/`, `references/`, `assets/`, `scripts/` e `tests/`; não é a pasta de uma especialista. Resolva-a a partir deste arquivo.

Leia ao instalar, atualizar, diagnosticar descoberta ou manter a própria Forma. Para criar uma interface, use a especialista pertinente; instalar novamente a ferramenta não corrige o produto.

## Uma fonte, duas distribuições

A fonte canônica organiza uma coordenadora e especialistas aninhadas. O plugin gera skills irmãs descobertas pelo Codex, com referências e assets compartilhados. A skill avulsa e o plugin podem coexistir, mas são cópias distintas: confira o caminho efetivamente carregado. Edite a fonte de autoria, gere o pacote e atualize a instalação; editar o cache perde a mudança na próxima atualização.

Na distribuição avulsa, selecione a skill de nome `forma`. No plugin, o host acrescenta seu namespace à entrada e às especialistas. Use o nome anunciado pelo catálogo atual; não invente uma ferramenta `invoke_skill`. O gerador adapta links e prompts à distribuição. Metadados de agentes são apresentação e instrução, não processos em execução.

O pacote inclui contratos, helpers, exemplos e os componentes declarados em [recursos](resources.md). O editor completo de aparência continua sendo um contrato de implementação; o plugin não o injeta automaticamente em qualquer framework. Plugins externos, chaves, serviços, modelos e conexões não são instalados como dependência implícita.

## Verificação repetível

Resolva a raiz que contém `references/`, `assets/`, `scripts/` e `tests/`. No plugin ela também contém `.codex-plugin/`; não use a pasta de uma especialista como raiz.

```sh
python3 <forma-root>/scripts/check_package.py --root <forma-root>
python3 -m unittest discover -s <forma-root>/tests -p 'test_*.py' -v
```

O verificador é local e somente leitura. Deriva o catálogo dos arquivos, confere links/âncoras Markdown, nomes, campos escalares de metadados e, quando existe manifesto, paths e prompts do plugin. Não é um parser completo de YAML, scanner de segurança ou avaliador de significado. A validação de frontmatter do host continua sendo uma etapa separada.

Na autoria/atualização, acrescente apenas as comparações disponíveis:

```sh
python3 <forma-root>/scripts/check_package.py --root <plugin-root> --source <canonical-root> --installed <installed-root> --archive <plugin.zip>
```

`--source` confere hashes e cobertura da proveniência; `--installed` confere a cópia; `--archive` confere o conteúdo distribuído. Uma comparação omitida não foi executada. O ZIP do marketplace pode incluir a raiz do catálogo ao redor do plugin; preserve essa estrutura ao distribuir. Nenhum desses checks executa hooks, inicia um servidor ou chama um modelo.

## Instalação e descoberta

Use o gerenciador disponível no host e verifique seu help/retorno. No Codex CLI auditado, a sequência é `codex plugin marketplace add <marketplace-root>`, `codex plugin add forma@forma-community` e `codex plugin list --marketplace forma-community --json`. O nome `forma-community` pertence ao catálogo comunitário distribuído; outro catálogo pode anunciar outra identidade. Não copie caminhos privados de outra máquina.

Depois da atualização, confira a descoberta em sessão nova ou reload suportado: entrada, especialistas, namespace, prompts e caminho do cache. Manifesto válido ou instalação habilitada não demonstra que uma conversa antiga recarregou a versão. Não apague a skill avulsa automaticamente; para evitar ambiguidade, selecione a entrada do plugin e confirme a origem.

## Quatro provas separadas

| Camada | Evidência | Limite |
|---|---|---|
| Pacote | Checagens, hashes, frontmatter e arquivos | Não executa a decisão do agente |
| Host | Descoberta atual, nome, origem e estado habilitado | Não demonstra resultado de design |
| Agente | Caso em sessão isolada lendo a instalação, artefato/diff e decisão observados | Uma amostra não mede confiabilidade universal |
| Consumidor | Componente/rota real, estados, interações e render pertinentes | Uma fixture não aprova todos os projetos |

Para uma mudança de roteamento, siga a [comparação de versões](../evals/routing-scenarios.md#comparar-versões-sem-confundir-as-provas). Registre falhas, checks não aplicáveis e caminhos não testados. Não some essas camadas num selo “100%”.

## Identidade do plugin

Os arquivos em `assets/plugin-brand/` identificam a Forma no catálogo e na sua apresentação. Símbolo, cor de marca, tipografia e hero não são defaults para apps criados com a ferramenta. Preserve a identidade aprovada de cada consumidor. O hero é uma imagem de marca gerada; não é componente WebGL, nem prova de modelagem ou movimento interativo.
