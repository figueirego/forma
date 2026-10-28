# Playbooks executáveis

Use o menor fluxo que atende ao pedido. Mantenha produto, arquivos e decisões existentes como ponto de partida. Nenhum playbook autoriza publicação, cobrança, instalação ou mensagem externa.

## A. Correção pontual ou refinamento

**Entrada:** componente/rota e comportamento ou aspecto a corrigir.

1. Reproduza no estado reportado; localize estilos, tokens e consumidores. Preserve baseline com revisão, conteúdo, estado e tamanho reais. Para “não ficou bom” sem causa indicada, examine o artefato e identifique o principal problema observável; não exija que o usuário faça o diagnóstico técnico.
2. Defina o que deve melhorar e como conferir: por exemplo, “título e campo compartilham o inset e o nome longo não empurra Salvar”. Separe defeito, divergência da referência e preferência estética. Priorize alcance da tarefa, acesso e dados, depois estrutura, consistência e acabamento; mantenha a reclamação específica do usuário como foco da rodada.
3. Formule uma hipótese de causa e escolha a evidência que a distingue de outras causas. Meça container/cascata antes de trocar tokens; confirme o caminho de renderização antes de ajustar shader. Se faltar capacidade ou repertório pertinente, use [seleção de apoio](integrations.md#escolher-apoio-durante-o-refinamento). Não abra pesquisa externa para um erro já explicado pelo código local.
4. Faça a menor alteração coerente, isolando a hipótese ou um grupo causal de mudanças. Antes de mudar um token global, confira consumidores; para exceção local, mantenha escopo local. Preserve a direção aprovada e os dados do usuário. Mantenha a versão anterior recuperável ao experimentar.
5. Compare no mesmo contexto com o [ciclo renderizado](rendered-validation.md), confirme o estado reportado, os estados afetados, conteúdo extremo e checks pertinentes. Verifique que a revisão modificada foi carregada. Aceite a mudança quando resolver o critério sem regressão relevante; reverta a tentativa que piorou o resultado e retenha a evidência do motivo.

**Quando a tentativa não resolver:** registre o que ela descartou e obtenha evidência nova antes de outra alteração. Reconsidere medição, hipótese ou apoio quando o método atual não distinguir as causas. Repetir valores ou adicionar plugins sem informação nova não é avanço. Se depender de preferência indefinida ou acesso indisponível, faça uma pergunta específica e continue trabalho independente. Encerre quando o aceite estiver satisfeito ou declare a dependência concreta que impede concluir; número de rodadas não é critério de aprovação.

**Condução com o usuário:** explique brevemente “o que observei → causa provável/confirmada → próximo teste”. Pergunte quando uma escolha mudar identidade, escopo ou direção; execute correções reversíveis já autorizadas sem confirmação a cada passo. Aprovação estética vale para o artefato e estado mostrados, não certifica outros dispositivos ou funcionalidades.

**Entrega:** mudança funcional, razão e evidência. Não criar design system novo, moodboard ou campanha para ajustar um campo.

Quando também houver pedido para aperfeiçoar esta skill, registre **sintoma → mecanismo → correção transferível → verificação** e acrescente um cenário pertinente em [avaliações](../evals/scenarios.md). Constantes de cada referência ficam no respectivo perfil. Preserve decisões no registro existente do projeto; atualizar a skill instalada depende desse pedido ou de autorização já presente na sessão.

## B. Nova tela ou fluxo de produto

**Entrada:** tarefa, público, plataforma, dados e limites conhecidos.

1. Desenhe uma sequência curta de estados, incluindo entrada, saída, espera e recuperação. Exemplo: selecionar arquivo → validar → enviar → processar → confirmar; falhas se ligam ao ponto recuperável.
2. Escolha componentes pelo trabalho: comparação tabular, formulário, lista, editor ou visualização. Faça wireframe com conteúdo real antes do acabamento quando houver dúvida estrutural.
3. Especifique o que já existe no backend e o que será demonstração. Defina aceites observáveis: “reabrir preserva filtro”, “erro não apaga preenchimento”.
4. Aplique sistema existente; se não existir, escolha uma direção com tipografia, papéis de cor, densidade e detalhe distintivo.
5. Implemente happy path e falhas pertinentes. Teste tarefa, acesso, tamanho de conteúdo e adaptação.

**Entrega mínima:** fluxo executável ou especificação pedida, estados, decisões materiais e evidências. Um botão que só mostra toast não equivale a salvar.

## C. Redesign de produto existente

1. Capture rotas, conteúdo, conversões, atalhos, marca e restrições de migração. Diferencie preservar identidade de substituir linguagem visual.
2. Escolha um fluxo representativo e identifique sua fricção. Não redesenhe todas as telas antes de validar o padrão principal.
3. Compare proposta com baseline usando a mesma tarefa e conteúdo. Registre comportamento mantido, modificado e a migrar.
4. Propague o sistema aprovado ou claramente autorizado, verificando consumidores e regressões.

**Entrega:** antes/depois com contexto equivalente, migração e pendências. Preservar slug, eventos e dados por padrão; alteração necessária deve ser explicitada.

## D. Extrair ou criar design system

1. Inventarie componentes e valores realmente usados; agrupe por papel e estado, não apenas por hex igual.
2. Classifique valores em conservar, consolidar ou exceção. Mostre conflitos concretos.
3. Defina tokens e contratos dos componentes mais recorrentes. Use [tokens e handoff](tokens-handoff.md).
4. Monte uma amostra com formulário, conteúdo e estado adverso. Só migre outros consumidores depois de verificar os efeitos.

**Entrega:** tokens legíveis por máquina quando úteis, uso na stack real, catálogo curto de componentes/estados e decisões. O preview visual do ECC pode ser um HTML local ou o catálogo já existente; não criar Storybook só para cumprir formato.

## E. App desktop e distribuição

1. Separe UI do app de instalação/atualização. Detecte tecnologia e formatos reais.
2. Projete janela/menus/documentos com [adaptação](platform-adapters.md).
3. Modele estados da distribuição com [desktop](desktop-distribution.md).
4. Teste em ambiente autorizado a versão nova e o caminho vindo da versão suportada anterior.

**Entrega:** UI e/ou especificação solicitada, matriz de SO/arquitetura testada e recuperação de falhas. Sem acesso ao SO alvo, produza implementação e marque runtime não testado.

## F. Campanha e material gráfico

1. Registre oferta, público, argumento comprovável, voz e ação.
2. Monte matriz peça → canal → dimensão → mensagem → asset → destino → critério de exportação.
3. Produza só os canais pedidos, adaptando composição e copy; não multiplicar peças automaticamente.
4. Confira continuidade entre anúncio e destino e revise o arquivo exportado no tamanho de uso.

**Entrega:** peças/editáveis autorizados, mapa de assets e claims, verificação. Planejar calendário não agenda publicação.

## G. Reproduzir ou reconstruir por referência

1. Capture a fonte e identifique o que deve ser fiel: visual, comportamento ou ambos.
2. Se houver fonte Figma/código, use-a antes de inferir por pixels. Para artefatos sem fonte, aplique [REA](rea.md).
3. Registre lacunas: imagens, estados não acessíveis, permissões, dados, gestos e escalas.
4. Construa e compare no mesmo contexto. Não confundir referência de estilo com pedido de clone.

**Entrega:** reconstrução limitada pelo escopo, evidências e diferenças conhecidas; não alegar identidade completa com base em uma captura.

## H. Reutilizar capacidades em outro projeto

**Entrada:** recurso solicitado, projeto de destino e intenção de adaptar princípios ou preservar um mecanismo. Infira essa intenção do pedido e do contexto aprovado; esclareça só uma ambiguidade material. Um pedido simples de claro/escuro não exige editor de luzes, perfil material ou 3D.

1. Confira a versão da skill realmente lida, os arquivos acessíveis e o código servido no destino. Instalação correta não comprova integração. Se houver outra edição ativa nos mesmos arquivos, analise sem sobrescrevê-la e coordene a integração dentro da autorização existente.
2. Para os recursos pedidos, ligue **contrato → implementação disponível → consumidor no destino → evidência de aceite**. Registre essa ligação na documentação/testes existentes; não é obrigatório criar outro manifesto. BookObject e helper de cores são código distribuído. A [base de interface limpa](clean-shell.md) tem CSS e demonstração HTML/JS; adapte à stack e aos dados reais. Editor completo e perfil material são contratos: implemente-os ou extraia componentes próprios autorizados, sem inventar exports ou depender da pasta do projeto de autoria.
3. Separe o que muda (texto, domínio e adaptações autorizadas) do que deve permanecer (composição, estado, gestos e material solicitado). Num pedido explícito de reprodução aprovada, não adapte automaticamente marca, paleta ou proporções; registre a precedência em um [contrato de fidelidade](fidelity-contracts.md), mantendo a referência independente do destino. Se uma restrição exigir substituição, declare a capacidade perdida e o que falta, em vez de tratar a aproximação como conclusão.
4. Faça a integração menor que exercite o recurso real. Importe/copie o asset correto, forneça dependências já disponíveis, conecte eventos e persistência ao dono certo e preserve descarte/erro/fallback. Um fallback que aparece após falha não prova o caminho principal.
5. Teste uma operação que distinga o mecanismo de sua aproximação e examine o resultado renderizado. Exemplos condicionais abaixo; não impor todas as capacidades a todo projeto.

| Recurso contratado | Prova discriminante no destino | Aproximação que não demonstra o pedido |
|---|---|---|
| Base de interface limpa | Fundo/sidebar/painel mantêm hierarquia; navegação e controles conectados, foco e estados coerentes, estreito sem perda de tarefa | Só trocar paleta, importar CSS sem consumidores ou aplicar estilos aos screenshots dentro dos cards |
| Editor visual completo de iluminação | Painel não modal com stage; mover/adicionar/remover pools, distância, onda e grain respondem aos dados; salvar/reabrir preserva estado e zero pools; contexto e hold conforme o escopo | Painel de claro/escuro/acento, três cores fixas ou preview sem manipulação |
| Volume/material do BookObject aprovado | Consumidor usa o asset e loader válidos; modo WebGL observado, vistas/gestos e material conferidos; fallback e redução de movimento testados separadamente | CSS inclinado, arquivo copiado sem uso, `interactive:true` sem loader ou Canvas2D apresentado como volume |
| Perfil material solicitado | Camadas, dados reais, resposta visual, edição/persistência e exportação quando pedida; fallback e ciclo de vida | Cartão decorativo com uma animação arbitrária; número de membro ou capacidade inventados |
| Busca com capacidades especificadas | Exercitar cada capacidade pedida com corpus pequeno e resultado esperado; atalho, superfície e semântica da consulta conferidos | Campo de substring ou atalho de foco apresentado como paleta ou busca semântica |

**Entrega:** diga quais recursos foram integrados, adaptados, substituídos ou ficaram pendentes, com evidência por recurso. Não anunciar “aplicada a skill inteira” por passar testes de utilitários. Se o usuário pediu só melhorar a skill, use o destino como caso de diagnóstico e não altere seu produto.
