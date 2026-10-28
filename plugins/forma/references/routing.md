# Roteamento e coordenação

A entrada `forma` escolhe e lê uma especialista interna, que seleciona referências canônicas e executa sua parte. Este documento organiza decisões; não é um runtime de plugins. Os caminhos da tabela principal são relativos à pasta que contém o `SKILL.md` da coordenadora, nunca ao diretório corrente do projeto.

## Seleção por intenção

1. Preserve o pedido: explicar, planejar, auditar ou modificar. Identifique o alvo concreto, o estado atual, a plataforma, as restrições e o aceite. Uma biblioteca de documentos, uma biblioteca Figma e uma dependência de código são alvos diferentes.
2. Escolha a especialista que resolve a questão predominante. Leia seu `SKILL.md` pelo mecanismo de acesso disponível. Não considere uma skill executada porque seu nome aparece na resposta.
3. Dentro dela, abra apenas as referências correspondentes ao caso. Um problema de espaçamento não exige teoria de cor completa; uma capa aprovada não exige refazer pesquisa de produto.
4. Se surgir uma segunda questão independente, acrescente a especialista adequada e forneça o contexto já resolvido. Não reinicie brief, stack, identidade ou tokens a cada troca. Para um pedido amplo, pode haver várias especialistas; para um ajuste local, normalmente basta uma.
5. Use apoio externo quando solicitado pelo usuário ou quando ele resolver uma lacuna concreta. Confira catálogo/arquivo/capacidade atuais e leia as instruções operacionais. A ausência de uma ferramenta não autoriza afirmar seu uso, substituir silenciosamente o mecanismo solicitado ou interromper trabalho independente.
6. Execute o que foi autorizado, verifique no alvo e entregue. Pare quando o aceite definido estiver satisfeito; diante de lacuna relevante, investigue ou indique o bloqueio específico. Selecionar o módulo não encerra um pedido de implementação.

## Rotas proporcionais

| Pedido | Principal | Apoio condicionado e aceite |
|---|---|---|
| Corrigir gap, padding ou alinhamento em componente existente | Fundamentos | Inspecionar estilos/caixas e alterar localmente; interface só se houver problema de composição/estado além da geometria |
| Reaplicar fundo limpo, sidebar, botões e campos | Interface | Fundamentos se tokens/relações precisarem adaptação; ligar componentes e rotas reais, sem impor 3D ou editor de pools |
| Editor de tema com pools, grain, contexto e salvar/reabrir | Interface | Fundamentos para cadeia de cor; movimento apenas para gesto/transição; testar draft, persistência e descarte. O contrato exige implementação, a demo de temas não basta |
| Adaptar livro aprovado para passaporte 3D | Objetos 3D | Ler contrato e asset disponível; adaptar dados/materiais mantendo mecanismo, loader e ciclo de vida. Referência/REA só se houver desconhecido a investigar; testar volume carregado e fallback separadamente |
| Perfil com campos, privacidade e cartão 3D | Interface | Objetos 3D resolve volume explicitamente pedido; produto apenas se o fluxo/regra estiver indefinido; cartão não substitui formulário nem identidade semântica |
| Grafo com backlinks, cores e zoom | Grafos e dados | Fundamentos para codificação visual; movimento para gesto com problema concreto. Arestas precisam de origem e identidade; lista equivalente e comandos acessíveis |
| Produto novo com jornada ainda indefinida | Produto | Depois interface; fundamentos para sistema visual; plataforma quando houver comportamento específico. Resolver tarefa antes de detalhar telas |
| Sidebar web que precisa funcionar em touch | Interface | Plataformas se houver decisões de gesto, navegação ou comportamento nativo. Não abrir toda pesquisa multiplataforma só pela palavra mobile |
| Auditar sem editar | Validação | Consultar domínio correspondente para interpretar evidências; entregar achados e menor correção proposta, sem editar o alvo |
| Descobrir tecnologia ou explicar divergência de referência | Referências e REA | Especialista de domínio conforme causa. Registrar fonte/versão e observado versus inferido; captura não prova biblioteca ou shader |
| Figma para código ou biblioteca de componentes | Handoff e artefatos | Interface/fundamentos conforme integração; ferramenta/skill Figma do caso, IDs e render reais. Se conexão faltar, delimitar o que pode avançar localmente |
| Campanha, identidade ou landing de marketing | Marca e comunicação | Handoff para formato/edição; movimento ou 3D somente quando pedido ou justificado pela mensagem; um provedor adequado ao artefato |
| Filme, teaser ou deck animado entregue como arquivo | Movimento | [Produção temporal](motion.md#filmes-e-sequências-renderizadas); marca para mensagem/identidade e handoff quando exportação exigir apoio. Distinguir render por seek de interação de interface; correção local não reinicia storyboard aprovado |
| Estudar um agente de design ou integrar seus métodos | Referências | Mapear fonte, métodos, verificadores e runtime; [produção coordenada](agent-production.md). Uma integração executável é outro escopo, com capacidade e testes próprios |
| “Como eu uso esse sistema?” | Nenhuma execução de produto | Explicar com exemplo concreto e invocação única; pode consultar referências, não criar ou editar um app por inferência |

Os nomes acima correspondem à tabela da coordenadora. Os identificadores são `forma-foundations`, `forma-interface`, `forma-product`, `forma-objects-3d`, `forma-graphs-data`, `forma-motion`, `forma-platforms`, `forma-brand`, `forma-reference`, `forma-validation` e `forma-handoff`. Use a especialista diretamente quando anunciada no catálogo; `$forma:forma` é a entrada coordenadora e também funciona quando o host não oferece descoberta dos módulos aninhados. Dentro do pacote, as referências dos módulos usam `../../references/`. Não acrescente caminhos absolutos de plugin versionado ao contrato portátil.

## Um contrato compartilhado

Para uma troca de especialista ou delegação útil, transmita somente:

- objetivo e tipo de intervenção autorizado;
- alvo, stack, plataforma e fonte/revisão observada;
- decisões aprovadas, mecanismo a preservar e limites;
- pergunta que falta resolver e arquivos sob responsabilidade, quando houver edição;
- saída esperada, critério de aceite e prova disponível ou pendente.

A coordenadora integra as respostas. Especialistas não recarregam a coordenadora nem chamam umas às outras em ciclo. Elas podem apontar uma lacuna; a coordenadora decide se precisa de outro módulo. Reutilize evidência já válida e revalide o que mudou. Se dois módulos discordarem, aplique [precedência](conflicts.md) e evidência do alvo, sem somar regras incompatíveis.

Antes de declarar conclusão, recolha e confira cada subtarefa necessária contra o aceite e a revisão vigente. Um despacho aceito ou processo em execução não é resultado integrado. Se uma subtarefa falhar, recupere o trabalho possível ou registre a lacuna; não esconda a pendência numa conclusão global. Cancele trabalho que perdeu utilidade somente pelo mecanismo realmente disponível e não confunda pedido de cancelamento com término confirmado.

## Apoio externo e custo

Consulte [integrações](integrations.md) pela pergunta, não pelo prestígio da ferramenta. Exemplo: inconsistência entre tokens e componentes → ECC `design-system`; bug reproduzível no navegador → ECC `browser-qa`; gesto interrompido → skill de movimento; implementação baseada em arquivo Figma → skill Figma adequada.

Se o usuário nomear ECC ou outra skill, inclua esse apoio no trabalho, leia a fonte operacional pertinente e siga suas fronteiras. Não transforme a preferência por poucas skills em motivo para ignorar uma instrução explícita. Se indisponível, informe a limitação e avance apenas no que for independente; uma substituição que altere requisito central exige esclarecer a decisão.

Leitura local, subagente, ferramenta conectada e geração paga são ações distintas. Não instala nem gasta por padrão. Não copie os resolvers de caches de outro plugin: a instalação atual e o catálogo da sessão prevalecem. Carregue referências progressivamente e registre brevemente o que realmente foi consultado ou executado.

## Validação da própria coordenação

Use os [cenários de roteamento](../evals/routing-scenarios.md) quando alterar o coordenador ou os módulos. Primeiro forneça ao avaliador apenas o pedido e a entrada da skill; depois julgue as decisões observadas. Links válidos provam navegabilidade, não seleção correta, execução de UI ou qualidade visual.
