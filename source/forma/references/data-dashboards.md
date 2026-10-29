# Dashboards temporais e geográficos

Use em acompanhamento operacional, mapas de indicadores, observatórios e séries temporais. Um mapa geográfico, um grafo de relações e um Canvas autoral respondem a perguntas diferentes. Reutilize [busca](search-discovery.md), [contratos](contracts-trust.md), [acessibilidade](accessibility.md) e [layout](layout-spatial-contracts.md); não imponha mapas a uma tarefa que uma lista resolve melhor.

## Dados e topologia em peças exportadas

Para gráfico estático, slide ou figura de relatório, mantenha os dados recebidos separados das transformações declaradas e da apresentação. Registre unidade, precisão e regras pertinentes de filtro, agregação, ordenação, normalização e variação percentual. Confira valores derivados contra a fonte; não reescreva números para ajustar composição. Um hash identifica o snapshot, mas não comprova sua veracidade nem que a fórmula foi aplicada. Valores estimados de uma imagem precisam dessa identificação na entrega.

Ao restilizar um diagrama, compare IDs/rótulos dos nós, origem/destino, direção, tipo, rótulo e cardinalidade das arestas, além dos grupos. Layout pode mudar sem mudar significado; conte e confira relações no SVG/documento exportado e examine onde as setas terminam. Um check de presença textual não comprova topologia. Esses contratos não exigem D2, ECharts ou uma engine nova; use a stack adequada ao projeto e o [contrato de exportação](artifact-workflows.md).

## Contrato do recorte antes do gráfico

Registre apenas os campos aplicáveis: `entidade/território + métrica + universo + período/snapshot + granularidade + filtros + comparação + modo temporal`. Cada painel deve declarar o próprio escopo quando divergir do recorte principal; um total nacional fixo não pode parecer o total da cidade selecionada.

O mesmo vale para produtos sem geografia: “concluídas em toda a biblioteca” e “tarefas encontradas nesta disciplina” podem coexistir, desde que os rótulos diferenciem os conjuntos. Não mude o denominador só para acompanhar visualmente a lista, nem mantenha um total global sob um rótulo que sugere filtro. Ao reorganizar para uma área estreita, compacte ou reposicione o resumo necessário; ocultá-lo sem acesso equivalente remove informação da tarefa.

| Campo | Decisão verificável |
|---|---|
| Métrica | Numerador, denominador, unidade, agregação e arredondamento; contagem, taxa, proporção e delta não são intercambiáveis |
| Cobertura | Observações recebidas versus universo elegível; ausente, zero, parcial e fora do recorte têm estados distintos |
| Tempo | Instante do dado, recebimento e atualização da tela; fuso e cadência esperada quando relevantes |
| Comparação | Declarar a dimensão comparada; compatibilizar definição, unidade, janelas e cobertura. Coorte fixa e universo variável são contratos diferentes; explicar alterações de elegibilidade ou limites territoriais |
| Identidade | IDs estáveis e versão dos limites territoriais; nomes iguais não são chaves de join |
| Origem | Fonte, atualização e método; captura de uma página não autentica os dados que ela afirma exibir |
| Estimativa | Rótulo, horizonte, instante de referência, método e incerteza pertinentes, separados de observação e conclusão confirmada |

Exemplo **sintético**: na mesma janela, região A tem 40 pessoas elegíveis atendidas, contadas uma única vez, entre 100 elegíveis; B tem 60 entre 200. B tem mais pessoas atendidas, mas proporção menor: 30% versus 40%. Para regiões com universos disjuntos e a mesma definição, o total é 100/300, não a média simples das duas porcentagens. Não somar pessoas de períodos sobrepostos como se fossem distintas.

Se uma proporção passar de 40% a 30% em períodos comparáveis, são −10 pontos percentuais e −25% de variação relativa. Já eventos de atendimento por pessoas elegíveis formam uma razão: uma pessoa pode ter vários eventos, portanto não são automaticamente porcentagem de pessoas atendidas. Denominador zero ou desconhecido não produz 0% por conveniência.

## Composição e linguagem visual

Antes de escolher um estilo, formule **pergunta da tela → observação sustentada pelos dados → ação disponível**. Mostre produto e recorte; não substitua orientação por uma saudação genérica nem force um insight quando os dados não o sustentam. A área inicial deve priorizar a tarefa frequente, sem comprimir toda a aplicação acima da dobra. Densidade depende da tarefa, frequência de uso e dimensões reais.

Valores repetidos em KPI, gráfico, tabela, tooltip e fragmento promocional devem derivar da mesma fonte e das mesmas transformações declaradas. Preserve a política de precisão do domínio: não altere cálculos financeiros para fazer a soma visual dos valores arredondados coincidir. Quando necessário, explique diferenças de arredondamento. Um aumento não é automaticamente bom: a cor de uma variação representa significado (por exemplo, latência maior pode ser pior), com sinal/texto redundante; categoria e identidade não viram semântica de sucesso.

Derive marcas e legendas do mesmo mapeamento de série/estado. Se afastamento usa hachura, a legenda deve mostrar a hachura, não apenas uma cor aproximada. Legendas distinguem os tipos apresentados e deixam explícitas omissões quando pertinente. Em tabela, alinhe números para comparação, conserve unidades e precisão; em largura estreita, ofereça acesso aos campos necessários em vez de ocultá-los apenas para caber. Zebra, bordas, cards e cores são escolhas do contexto: preserve as convenções aprovadas e teste a comparação entre linhas e séries.

Organize por tarefa: recorte e atualidade → resumo → exploração → detalhe. Em monitor amplo, um mapa central pode conviver com resumo estável e painel contextual; cada área precisa de largura, insets, rolagem e prioridade definidos. Calcule o centro útil após os painéis, sem centralizar todo o texto. Compare conteúdo mínimo, nomes longos e detalhe aberto.

Uma família para UI e outra para manchetes pode distinguir operação de interpretação. Essa escolha é opcional: verifique pesos, números tabulares, carregamento, licença e legibilidade efetiva. Densidade vem de alinhamento, agrupamento e redução de repetição; encolher toda a interface não substitui reflow.

Separe papéis de cor:

- **Identidade categórica:** entidade/série reconhecível entre mapa, lista e gráfico; nome, símbolo ou rótulo também a identifica.
- **Magnitude sequencial:** maior/menor valor com escala ordenada e legenda. Não usar a cor de uma categoria para significar progresso sem explicar a mudança de leitura.
- **Divergência:** somente com centro significativo, como diferença em relação a uma base declarada.
- **Estado operacional:** atualização, alerta, erro, foco e seleção independentes das cores dos dados.
- **Superfície:** neutros, bordas e elevação mudam entre temas; valores e significado dos dados permanecem.

Se o objeto também tiver uma cor livre escolhida pela pessoa, nomeie esse papel separadamente da categoria e do accent da interface. Trocar a cor de uma tarefa não deve parecer trocar sua disciplina; trocar o accent não deve recodificar categorias. Uma faixa decorativa e um rótulo textual podem coexistir, sem exigir que todas as superfícies usem preenchimentos coloridos.

Ao mudar métrica/filtro, atualize legenda, unidade, tooltips, nomes acessíveis e estado selecionado juntos. Se os limites da escala mudam, torne isso perceptível; a mesma cor não pode sugerir silenciosamente o mesmo valor. Meça contraste composto e leitura das séries nos temas suportados.

Para escolher e avaliar a escala, use [refinamento cromático](color-refinement.md). Uma paleta categórica não vira escala quantitativa pela ordem dos hex; classes e domínio dependem dos dados. Não estenda uma paleta pequena a muitas categorias sem conferir distinção no tamanho real, rótulos e estados. Proximidade perceptual, ordenação tonal e contraste textual respondem a perguntas diferentes.

## Mapas e codificação quantitativa

Uma região grande ocupa mais área sem necessariamente ter mais pessoas ou ocorrências. Justifique preenchimento territorial, círculos proporcionais, picos ou tabela pela pergunta. Taxas e contagens exigem interpretações diferentes; explicite a transformação entre valor e área/altura, inclusive raiz, log ou clamp quando houver.

Legenda informa o que varia, unidade, limites das faixas e ausência de dados. Não confundir zero com dado faltante. Limites aproximados devem ser identificados como aproximação; não atribuir precisão cadastral a uma área estimada.

Disponibilize busca/lista para territórios pequenos e alternativa textual para o valor exato. Label externo com linha de ligação pode evitar sobreposição, mas precisa conservar associação inequívoca. Hit-testing, seleção e zoom devem acompanhar a geometria realmente desenhada. Efeito de profundidade não comprova motor 3D; escolha SVG, Canvas ou WebGL pela necessidade, medindo desempenho e acesso.

Em mapas de objetos, agrupamento visual não implica aresta semântica. Declare o significado de grupo, faixa, tamanho e posição. Reserve uma região real para filtros, legenda e controles; calcule fit/zoom pela área restante do canvas, não pelo dialog inteiro. Se a pintura abrevia títulos, uma Lista equivalente deve oferecer texto completo e as mesmas ações. Abrir um objeto por essa lista leva foco ao detalhe; fechar sem navegar devolve foco ao disparador.

## Ao vivo, histórico e falha

Defina separadamente o **modo de leitura** (mais recente, snapshot histórico ou reprodução) e a **saúde/atualidade** (conectado, reconectando, atrasado, sem dados, encerrado). Relógio que avança não prova chegada de novos dados. Mostre a última informação relevante e o estado real; não invente uma cadência universal para declarar atraso.

Ao entrar no histórico, fixe o snapshot ou conjunto compatível; refresh não pode puxar a pessoa silenciosamente para o presente. Linha do tempo precisa de nome, valor temporal legível, fuso pertinente, operação por teclado e retorno explícito ao mais recente. Não fabricar snapshots intermediários para preencher lacunas. Tween de pixels é transição visual, não registro de dados.

Se uma camada só existe para agora, o detalhe histórico deve comunicar essa indisponibilidade ou apresentar a camada atual com rótulo temporal próprio. Não reutilizar valor atual como passado. Para horário inexistente, preservar a seleção anterior ou oferecer recuperação claramente identificada; o aviso e o estado final precisam concordar.

Mapa, totais, ranking e detalhe usam revisão/recorte compatíveis. Quando um deles falhar, mantenha dados úteis com defasagem explícita, sem apresentar totais incompatíveis como simultâneos. Cancelamento e chave de solicitação devem impedir resposta tardia de A substituindo recorte B. Siga a arquitetura existente; não acrescentar armazenamento complexo apenas para cumprir este contrato.

## Exploração, foco e URL

Busca tipada desambigua resultado por tipo e contexto, por exemplo “município · estado” ou “equipamento · unidade”. Ao abrir, sincronize seleção, mapa, detalhe e trilha; mova foco para um destino útil. Escape e voltar recuperam posição/contexto pertinentes. Teste atalhos também dentro de campos editáveis para evitar conflito.

Reclassificar o último objeto de um filtro pode tornar o recorte vazio. Preserve o filtro e comunique a ausência com uma saída explícita; não amplie para “todos” silenciosamente nem apresente vazio filtrado como trabalho concluído. Se o controle focado desaparecer, escolha destino útil por identidade, como o seletor de recorte. Atualizar dados na mesma biblioteca pode preservar seleção/filtros; mudar de biblioteca tem outro contrato. Callbacks genéricos não devem aplicar o reset da troca de contexto a toda atualização.

Navegação principal, segmentado e filtro específico devem refletir o mesmo recorte final, qualquer que tenha sido o disparador. Sincronize aparência e estado acessível a partir desse estado; clicar em “Concluídas” não pode deixar “Hoje” anunciado como a vista atual. Use `aria-current`, `aria-selected` ou `aria-pressed` conforme a semântica do controle, não como atributos intercambiáveis.

Use identificadores estáveis na URL para o recorte que precisa ser compartilhado/restaurado. Declare quais campos entram: território, métrica, filtros, comparação e, quando prometido, instante. Link do último estado e link de snapshot têm contratos diferentes. Recarregar, abrir em outra sessão, voltar/avançar e parâmetro inválido precisam de recuperação. Câmera, hover e aba transitória não precisam entrar sempre; não prometa reprodução exata quando forem omitidos.

## Adaptar a largura e a frequência

Em espaço estreito, distribuir Mapa/Explorar/Resultados em seções pode preservar o trabalho melhor que comprimir três colunas. Defina qual resumo persiste e a ordem de leitura; mantenha conteúdo, seleção e filtros alcançáveis. Se um modo de visualização não for suportado, comunique a alternativa e preserve a intenção quando possível. Ocultar uma função não prova equivalência entre plataformas.

Teste altura disponível, teclado virtual, orientação, texto ampliado e áreas seguras. Timeline, tabbar, legenda, anúncio e chat não podem cobrir os alvos ou aprisionar a rolagem. Busca/lista também precisa funcionar sem pan, hover ou gesto de precisão.

Atualizações não devem reordenar a linha sob o ponteiro nem roubar foco. Use anúncio acessível resumido, frequência útil e pausa quando necessária. Animação deve ser interrompível e respeitar redução de movimento; invalidar apenas camadas que mudaram é uma hipótese de otimização a medir. Registre a procedência e o contexto do chat; sua presença não prova acesso ao snapshot nem capacidade de explicar os dados. Trate conteúdo externo conforme [contratos e confiança](contracts-trust.md).

## Ensaio mínimo contextual

1. Conferir uma métrica manualmente, incluindo zero, ausência, cobertura parcial e arredondamento.
2. Alternar métrica e tema: série, legenda, unidade, foco e ausência continuam compreensíveis.
3. Abrir detalhe por busca e voltar; verificar URL, foco e respostas fora de ordem.
4. Ir ao histórico durante refresh; testar snapshot disponível, lacuna e camada sem histórico; voltar ao mais recente.
5. Comparar períodos com coorte/limites diferentes; não exibir delta enganoso.
6. Abrir o link diretamente/recarregar; verificar apenas o estado que o contrato promete restaurar.
7. Percorrer por teclado e em largura/altura pequenas; confirmar alternativa ao mapa e acesso ao conteúdo.

Base observacional: [Seu Imposto](https://seuimposto.com/), interface “Apuração 2026” inspecionada em 25/10/2026. O [perfil factual](../assets/reference-profiles/seuimposto-2026-10-25.json) guarda tokens claro/escuro, fontes declaradas, dimensões e hashes; não é preset obrigatório. Síntese original adaptável, não cópia do site nem validação de seus resultados. Identidade tecnológica, observações e limites em [fontes](sources.md); os critérios acima incluem recomendações que vão além dos fluxos testados.
