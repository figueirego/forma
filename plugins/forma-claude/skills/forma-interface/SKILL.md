---
name: forma-interface
description: "Construir ou refinar interfaces operacionais, base limpa, formulários, navegação, busca, configurações, editor de aparência e perfil material. Use para componentes e estados utilizáveis; não para pesquisa ampla, campanhas ou implementação de geometria 3D."
metadata:
  version: 1.24.0
---

# Interface e estados

## Quando usar

- Use para sidebar, fundo/painel/controles, forms, busca, preferências, perfil e seus estados.
- Não use para transformar uma melhoria de UI em redesign completo ou apresentar um mockup como integração de dados.

Este módulo exige leitura pelo agente; não aciona ferramentas nem outros módulos automaticamente.
Preserve marca, stack, domínio, componentes e contratos existentes.

Uma tela operacional organiza trabalho: objetos, recorte, dados e próxima ação. Uma página que comunica oferta segue [Marca](../forma-brand/SKILL.md). Se a página contém fragmentos do app, trate seu interior como interface: reutilize o sistema existente, dados coerentes e estados reais ou demonstrações identificadas. A composição promocional ao redor não justifica alterar tabelas, unidades, precisão ou fluxos do produto.

## Entradas

- Tarefa concreta, rota/componente, ação esperada, dados reais ou fixtures identificadas e acesso ao consumidor.
- Estados atuais, contratos de API/armazenamento, limites de permissão e referência aprovada quando houver.

## Procedimento

1. Percorra entrada, ação, sucesso e recuperação; identifique os donos de estado e persistência.
   Leia [interação e conteúdo](../../references/interaction-content.md) e, quando houver dados/permissões, [contratos e confiança](../../references/contracts-trust.md). Identifique objetos, unidades, frequência de uso e a decisão que a tela apoia. Valores repetidos usam a mesma fonte e recorte; totais e deltas respeitam o cálculo e arredondamento do domínio, sem ajustes para favorecer a imagem. Se a direção estiver aberta, use [direções e comparação](../../references/design-directions.md); não importe uma receita de hero para um dashboard aprovado.
2. Para o conjunto fundo/sidebar/painel/controles, leia [base limpa](../../references/clean-shell.md).
   Inspecione os assets indicados e adapte consumidores/eventos à stack. Para campos, navegação e tabelas, use [padrões de componentes](../../references/component-patterns.md).
3. Leia apenas os contratos do recurso pedido: [busca](../../references/search-discovery.md), [configurações](../../references/settings-modes.md), [editor de aparência](../../references/lighting-editors-icons.md) ou [perfil material](../../references/adaptive-visual-systems.md).
   Especifique semântica da consulta, preview/commit/cancel/reset, camadas e exportação somente quando fizerem parte do escopo.
   Para o editor completo, leia também [primeiro uso e controle selecionado](../../references/lighting-editors-icons.md#primeiro-uso-reabertura-e-controle-selecionado): default, limite máximo, estado salvo e visibilidade inicial do anel são contratos distintos. Inclua-os também em prompts de transferência; “pontos arrastáveis” sozinho não especifica esse mecanismo.
   Fixe as âncoras relativas ao stage: modos no topo central, reset no topo direito, menos/mais no inferior direito; não as reposicione conforme o pool. Separe a cor vívida de handles/swatches do chroma do wash e a intensidade padrão42% de um valor salvo5%. Para reprodução do editor aprovado, leia o [perfil compacto portátil](../../assets/reference-profiles/compact-appearance-v1.json): ele já define desktop e toque, superfícies noturnas e transição de2 para3 luzes. Não invente novos breakpoints/tamanhos nem herde um botão de outra cor. Fora desse pedido, declare adaptações de plataforma.
4. Implemente a fatia que prova o recurso e conecte handlers, dados e armazenamento ao dono correto.
   Perfil usa os campos do domínio e o objeto aprovado no destino; não imponha cartão/papel da referência a um passaporte existente. Confira escopo global/contextual, enquadramento do objeto aberto e atualização dos consumidores sem destruir a sessão ou o retorno de foco.
   Siga reúso em outro projeto nos [playbooks](../../references/playbooks.md). Contratos de editor/perfil exigem código; a demo da base limpa não fornece backend.
   Em reprodução fiel, congele os critérios da fonte aprovada antes de editar o consumidor. Use [contratos de fidelidade](../../references/fidelity-contracts.md) para comparar medições; para o perfil compacto existe uma amostra portátil de layout, cores e trajetórias. Ela não substitui save/reload, cache, acesso ou inspeção das capturas.
5. Exercite teclado, foco, erros, extremos e reabertura quando houver promessa de persistência.
   Use [validação renderizada](../../references/rendered-validation.md) e [verificação](../../references/verification.md); valide cada capacidade de busca contratada com resultados esperados.
   Diferencie código local, resposta servida, contexto isolado de teste e aba já aberta. Compare a identidade individual do CSS e JS afetados com o artefato testado; um `data-revision` igual não resolve cache antigo. Se houver rascunho, preserve-o e deixe salvar/descartar sob decisão do usuário antes de recarregar. Exercite o gesto em passos pequenos também: atualizar um acumulador com o rótulo arredondado pode ocultar movimento contínuo.
   No editor, compare a referência e o destino na mesma escala, fonte, modo e configuração. Meça caixas e cores computadas após toda a cascata; examine também fundo da página, sidebar e workspace. Ao clicar em +, confira posição, perfil de gradiente, hue, ordem, seleção e anel do terceiro pool, não apenas contagem3. Meça posições relativas antes/depois de seleção, movimento, terceiro pool, claro/escuro e reabertura. Compare todos os pools antes/durante/depois de arrasto comum, Alt e anel; cor/modo não podem mover posições. No perfil fiel, pontos externos mantêm coordenadas visuais reais e ficam recortados, sem proxies na borda. Teste foco sem scroll que desloque controles; botões existentes e testes do modelo não provam composição nem acesso.

## Saída e parada

Entregue interface funcional ou especificação explicitamente pedida, estados e resultado observável da tarefa.
Identifique dados simulados, alterações só em memória e integrações ainda ausentes.
Pare quando a operação discriminante funcionar no consumidor e os estados afetados não tiverem regressões relevantes.
Um toast não comprova salvamento; trocar cores não comprova reúso da composição; foco no input não comprova paleta de comandos.

## Apoios opcionais e limites

`ecc:click-path-audit`, `ecc:design-system`, Impeccable e `accessibility` podem apoiar diagnóstico de handlers, consistência e acesso.
Leia o `SKILL.md` atual de cada apoio disponível antes de usar, conforme [integrações](../../references/integrations.md); não suponha ferramentas pelo nome.
Não substitua volume/interação solicitados por uma imagem ou plano apenas inclinado. CSS 3D articulado já aprovado continua sendo um mecanismo válido; não o troque por WebGL por associação. Mantenha o limite de implementação de cada recurso visível na entrega.
