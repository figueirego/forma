---
name: forma
description: "Coordenar especialistas de design para criar, refinar, adaptar ou auditar interfaces, sistemas visuais e materiais de marca. Seleciona por caso a skill interna de interface, cores/layout, produto, 3D, grafos, movimento, plataforma, marca, referência, handoff ou validação. Use também para reaplicar componentes aprovados em outro projeto; não para backend isolado."
metadata:
  version: 1.27.1
---

# Forma

No plugin, as especialistas estão nas pastas irmãs. Os links abaixo já apontam para a cópia deste pacote; não procure outra instalação global da Forma.

Uma entrada para o sistema: entenda o pedido, selecione a especialidade, leia suas instruções e referências pertinentes, execute o trabalho autorizado e verifique o resultado. Responda no idioma do usuário; preserve marca, stack, dados, componentes e decisões aprovadas. Não prometa perfeição nem cobertura universal.

Para instalar, atualizar, conferir a distribuição ou distinguir a skill avulsa do plugin, consulte [operação do plugin](../../references/plugin-operation.md). A identidade visual da Forma pertence à ferramenta; nunca substitui a marca do projeto atendido.

Para transformar referências em repertório técnico reutilizável, encaminhe ao módulo `reference` e ao [protocolo de experiências](../../references/experience-library.md): fonte → evidência → mecanismo → adaptação → teste, preservando licença e limites.

A coordenação também cobre sites: encontrar referências, investigar suas técnicas e criar ou refinar o site de destino. Em pesquisa com várias fontes, `reference` reúne a evidência; a coordenadora escolhe uma direção coerente e encaminha decisões às especialistas pertinentes. Siga [coordenação de sites](../../references/experience-library.md#coordenar-sites-de-referência-e-o-site-de-destino). Não encerre um pedido de criação numa lista de links.

## Como coordenar

1. **Identifique a tarefa real:** planejar, criar, refinar, redesenhar, reproduzir, auditar ou extrair sistema; indique o alvo e a plataforma. Inspecione o projeto/fonte disponível antes de decisões substanciais. Pedido de explicação continua explicação; auditoria não autoriza edição. Esclareça só uma ambiguidade que mude materialmente o resultado.
2. **Selecione a skill interna principal na tabela abaixo e leia o respectivo `SKILL.md`.** Comece pela tarefa predominante, não por cada palavra citada. Leia as referências que a especialista selecionar; o link sozinho não é consulta. Num ajuste pequeno, uma especialista e a referência do defeito podem bastar.
3. **Acrescente apoio apenas para uma necessidade distinta.** Exemplo: interface integra o editor; foundations resolve sua cor; objects-3d trata o volume explicitamente pedido. Para composição, precedência, tarefas ambíguas e fallback, use [roteamento e coordenação](../../references/routing.md). Evite abrir toda a biblioteca ou encadear especialistas sem nova pergunta.
4. **Execute, não pare na indicação.** Se o usuário pediu implementação, a seleção da especialista é uma etapa interna. Se pediu apenas qual usar, entregue a recomendação. Para trabalho amplo siga o [processo compartilhado](../../references/workflow.md) e o [playbook pertinente](../../references/playbooks.md); para ajuste local, mantenha escopo local.
5. **Feche o ciclo no alvo:** verifique os arquivos efetivamente carregados, as interações afetadas e o aceite. Um marcador de revisão repetido não comprova CSS/JS atuais; confira a identidade dos recursos afetados e preserve alterações não salvas antes de qualquer reload. A especialista de validação ajuda em auditorias amplas; todo trabalho exige verificação proporcional mesmo sem carregar outra skill. Informe mudança, evidência e limitações reais.

Diga brevemente qual especialidade e por quê: “Vou usar interface para a sidebar e foundations para alinhar os insets”. Não transforme isso em um questionário nem exija que o usuário conheça nomes de módulos. A coordenadora conserva o contexto e resolve conflitos; especialistas não chamam a coordenadora recursivamente. Ler uma skill não cria automaticamente um subagente ou executa um plugin.

Leia a especialista escolhida por inteiro; nas referências canônicas, localize a seção pertinente e leia contexto suficiente para aplicar o contrato corretamente. Não siga seus links recursivamente por padrão. Para um gap local, isso pode limitar a leitura à relação espacial e ao trecho de verificação afetado; para um editor completo, inclua os contratos de estado e persistência. Instruções operacionais de uma skill externa explicitamente acionada continuam obrigatórias.

## Skills internas por caso

| Caso predominante | Skill a ler | Resultado esperado |
|---|---|---|
| Cores, contraste, espaçamento, centralização, grid, tipografia ou tokens | [Forma Foundations](../forma-foundations/SKILL.md) | Relações visuais e valores ligados aos consumidores reais |
| Fundo limpo, sidebar, botões, inputs, busca, temas, configurações e perfil | [Forma Interface](../forma-interface/SKILL.md) | Composição e controles funcionais na stack existente |
| Brief, pesquisa, jornada, onboarding, fluxo ou direção de produto | [Forma Product](../forma-product/SKILL.md) | Tarefa, sequência de estados e decisões de produto |
| Livro, capa, passaporte, mascote, volume, materiais, brilho ou relevo | [Forma Objects 3D](../forma-objects-3d/SKILL.md) | Mecanismo solicitado, material e interação verificáveis |
| Grafos, backlinks, Canvas, mapas, dashboards ou dados temporais | [Forma Graphs & Data](../forma-graphs-data/SKILL.md) | Relações e visualizações com fonte, significado e controles |
| Gesto, transição, animação, vídeo, filme ou redução de movimento | [Forma Motion](../forma-motion/SKILL.md) | Movimento interativo ou sequência renderizada com continuidade e aceite próprios |
| Comportamento específico web, mobile, desktop, instalador ou dispositivo | [Forma Platforms](../forma-platforms/SKILL.md) | Adaptação de tarefa e operação ao ambiente alvo |
| Identidade, campanha, landing de marketing, peça, apresentação ou impressão | [Forma Brand](../forma-brand/SKILL.md) | Mensagem, composição e entregáveis dos canais pedidos |
| Encontrar exemplos, selecionar referências, engenharia reversa, tecnologias ou divergência de fidelidade | [Forma Reference](../forma-reference/SKILL.md) | Consulta contextual, evidência separada de hipótese e especificação transferível |
| Auditoria de qualidade, acessibilidade, regressão ou aceite renderizado | [Forma Validation](../forma-validation/SKILL.md) | Achados/provas delimitados e correções quando autorizadas |
| Figma, artefato editável, exportação, biblioteca, design-to-code ou entrega técnica | [Forma Handoff](../forma-handoff/SKILL.md) | Fonte, componentes e saída entregues e verificados |

Os identificadores seguem `forma-<especialidade>`, por exemplo `/forma:forma-motion`, `/forma:forma-interface` e `/forma:forma-objects-3d`. Quando o catálogo do ambiente os oferecer, podem ser chamados diretamente. A entrada `/forma:forma` continua escolhendo e lendo os módulos pelos caminhos acima, sem depender dessa descoberta em todos os hosts. Não invente um comando de ferramenta `invoke_skill`: use o mecanismo de leitura/invocação realmente oferecido no ambiente.

## Integrações externas sob demanda

ECC, REA, Impeccable, Figma, ferramentas gráficas e outras skills são apoios opcionais. Identifique a lacuna, confira a capacidade disponível na sessão e leia a skill operacional atual antes de usá-la. Consulte [integrações](../../references/integrations.md) para escolher o apoio e suas fronteiras. Nomes no catálogo não comprovam instalação, conexão ou execução; registre ausência e continue trabalho independente sem fingir que chamou o serviço.

Não instale plugins nem inicie geração paga para completar um checklist. O sistema funciona com referências e ferramentas locais. Ao delegar trabalho disponível e útil, atribua pergunta/arquivos/aceite e evite edições concorrentes; delegação não é requisito para toda tarefa.

Incorporar métodos de um agente não instala seu runtime. Para agentes de produção, jobs, retomada ou uma integração LangChain/Deep Agents explicitamente pedida, leia [produção coordenada](../../references/agent-production.md). Confira capacidades, revisão e cobertura dos resultados; um fluxo descrito não comprova execução. Ajustes locais de UI continuam na especialista pertinente.

## Preservar mecanismos aprovados

Quando precisar de exemplos, use a [biblioteca pesquisável](../../references/reference-library.md): fichas autorais sobre recursos e padrões da Forma, índice de sites associados a casos de investigação próprios, seleção por contexto, consulta visual e pesquisa opcional de mídia com créditos. Leia somente as candidatas relevantes; uma ficha de padrão não comprova sua execução no consumidor. Uma correção local não exige pesquisa de inspiração. A biblioteca não substitui o mecanismo aprovado do consumidor.

Distinguir **aplicar princípios** de **reutilizar um mecanismo** é obrigatório para pedidos de transferência. Adaptar marca/conteúdo não autoriza trocar um volume por CSS inclinado ou um editor manipulável por três cores fixas. Se o pedido for **igual à implementação aprovada**, preserve também sua composição, paleta e comportamento responsivo: a instrução explícita prevalece sobre a adaptação genérica à marca. Use a cascata final e o estado renderizado daquela revisão, não apenas uma especificação anterior. Dados, rotas e conteúdo do destino continuam preservados. Siga [reúso no consumidor](../../references/playbooks.md#h-reutilizar-capacidades-em-outro-projeto): contrato → implementação disponível → consumidor → operação discriminante observada.

Para reprodução aprovada, fixe critérios antes de alterar o destino e use [contratos de fidelidade](../../references/fidelity-contracts.md). O verificador portátil compara medições com a referência congelada; divergência, dado ausente ou revisão não confirmada impedem anunciar fidelidade concluída. Não gere o esperado a partir do próprio destino nem aumente tolerâncias para fazer o teste passar.

| Recurso | Situação do pacote | Rota |
|---|---|---|
| Base de interface limpa | CSS encapsulado + exemplo HTML/JS com dados em memória | Interface → [receita](../../references/clean-shell.md) |
| BookObject e helper de cores | Código original reutilizável; volume exige loader Three válido, modo estático é separado | Objetos 3D → [contrato](../../references/reusable-objects.md) e [caso aprovado](../../references/book-polish-case-study.md) |
| Passaporte articulado: encaixe, couro e luz | Estudo de caso aprovado e manifesto; não inclui componente de passaporte | Objetos 3D → [caso e limites](../../references/passport-polish-case-study.md) |
| Editor completo de aparência/iluminação e perfil material | Contratos e [perfil portátil](../../assets/reference-profiles/compact-appearance-v1.json) para implementar na stack; não inclui componente executável de editor | Interface → [editor](../../references/lighting-editors-icons.md) e [perfil](../../references/adaptive-visual-systems.md) |
| Verificadores de contraste, layout e evidência | Scripts locais com escopo delimitado | Validação → [recursos executáveis](../../references/resources.md) |

Não dependa da pasta do projeto de autoria nem de arquivos presumidos de outro chat. Confira o recurso da versão instalada. Testes do pacote não comprovam integração no consumidor. Preserve os hashes e os limites da auditoria ao transferir um resultado aprovado.

## Critérios compartilhados

Correção, segurança, acesso e dados vêm antes do acabamento. Preserve o sistema e a identidade existentes; não imponha estilos, 3D, ferramentas ou frameworks por associação. Normas, heurísticas e preferências são categorias diferentes; resolva conflitos em [precedência](../../references/conflicts.md).

Teste tarefa, foco, conteúdo extremo e estados afetados. Static/bundle, UI observada, aparelho físico, arquivo exportado e publicação são evidências distintas. Referência não concede autoria, licença de assets ou autorização para publicar. [Verificação](../../references/verification.md) e [ciclo renderizado](../../references/rendered-validation.md) definem como fechar o aceite; os [modelos](../../references/templates.md) são opcionais, não burocracia para ajustes pequenos.

## Exemplos simples de uso

- “Use /forma:forma para aplicar a base de interface limpa no meu app preservando marca, stack e rotas.”
- “Use /forma:forma para corrigir o alinhamento e as cores desse formulário.”
- “Use /forma:forma para adaptar o BookObject aprovado a um passaporte 3D com materiais e interação.”
- “Use /forma:forma para implementar o editor completo de iluminação com pools, salvar/reabrir e cores por contexto.”
- “Use /forma:forma para auditar este fluxo; por enquanto, não edite.”
- “Use /forma:forma para criar uma campanha e entregar os arquivos editáveis.”
- “Use /forma:forma-motion para refinar as animações desta interface.”
- “Use /forma:forma-interface para aplicar sidebar, fundo limpo e controles no meu app.”

## Manutenção

Para conteúdo novo, siga [autoria e incorporação](../../references/authorship.md): escreva a solução para um problema real, ligue-a ao recurso e verifique; renomear conteúdo externo não o torna autoral. Ao substituir conteúdo importado, preserve as capacidades aprendidas e confira seu destino nos contratos próprios, inclusive coordenação, pesquisa, direção e refinamento. Referências, normas, dependências e mídia preservam suas origens.

Ao melhorar esta skill, mantenha a entrada pequena, cada especialista com responsabilidade distinta e a teoria em sua referência canônica. Preserve links, recursos aprovados e histórico em [fontes](../../references/sources.md). Valide estrutura e [cenários de decisão](../../evals/scenarios.md), incluindo [roteamento](../../evals/routing-scenarios.md). Leitura, avaliação documental e execução de produto não são provas intercambiáveis.

Para incorporar aprendizados de uma conversa ou conciliar um plano novo com design aprovado, use [evolução de produto aprovado](../../references/approved-product-evolution.md): separar decisão local, mecanismo transferível e evidência. Não copiar a conversa inteira, dados pessoais ou requisitos de um produto como defaults para todos.
