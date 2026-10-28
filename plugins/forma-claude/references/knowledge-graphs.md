# Grafos, ligações e conhecimento

Use para redes de notas/documentos, backlinks, relações tipadas e navegação espacial. Primeiro prove o significado das relações; depois escolha a composição e a tecnologia. Leia [sistemas adaptáveis](adaptive-visual-systems.md) para renderers/materialidade, [busca](search-discovery.md) para consultas e [contratos espaciais](layout-spatial-contracts.md) para organizar os controles.

## 1. Começar com entrada e resultado concretos

**Exemplo:** A contém duas referências para B; B contém uma referência para C. Abrir as entradas de B deve permitir identificar A e suas duas passagens. Uma vista pode agregar A→B em uma linha, mas não pode perder a procedência nem confundir quantidade de ocorrências com quantidade de documentos.

```text
conteúdo + contexto
  → parse de ocorrências
  → resolução de destinos
  → índice direto/reverso por revisão
  → backlinks + projeção local/global filtrada
  → simulação/posições
  → câmera + renderização + hit-testing
  → abrir a fonte ou executar um comando explícito
```

Uma mudança de câmera não altera links. Uma alteração de link precisa atualizar o índice, as entradas/saídas e as vistas afetadas. Um renderer bonito não corrige resolução errada.

## 2. Nomear o modelo certo

| Superfície | O que representa | Não confundir com |
|---|---|---|
| Grafo de documentos | Referências entre entidades/documentos | Compreensão do significado do texto |
| Grafo de conhecimento tipado | Entidades e predicados com semântica, procedência e regras declaradas | Qualquer rede com nós e linhas |
| Canvas autoral | Cartões, posições, grupos e conexões desenhadas pelo usuário | Índice automático de links entre arquivos |
| Mapa de acervo | Agrupamentos/memberships e navegação espacial | Arestas semânticas inventadas |
| Rede de similaridade | Relações inferidas por modelo/métrica, com versão e limiar | Referências explicitamente escritas ou fatos confirmados |

A mesma aplicação pode combinar modelos, desde que tipos, ações e fontes permaneçam distinguíveis. Dois cartões do mesmo arquivo podem ter IDs de composição diferentes. Remover cartão, remover link e apagar arquivo são comandos distintos.

No Obsidian documentado, Graph deriva de links internos; Canvas permite composição autoral. Cartão de texto do Canvas não entra em backlinks até ser convertido em arquivo. O formato JSON Canvas define nós/arestas e posições próprias; sua conexão não deve ser promovida automaticamente a link Markdown. [Graph](https://obsidian.md/help/plugins/graph), [Canvas](https://obsidian.md/help/plugins/canvas), [JSON Canvas 1.0](https://jsoncanvas.org/spec/1.0/).

## 3. Identidade, resolução e proveniência

Declare as distinções abaixo sem impor um novo banco ou framework:

| Dado | Contrato mínimo |
|---|---|
| Entidade | ID/contexto, tipo, locator, rótulo, aliases e revisão relevante |
| Ocorrência | Origem, alvo bruto, texto exibido, fragmento, trecho/localização e revisão da fonte |
| Resolução | Destino confirmado ou estado ausente/ambíguo/inacessível/inválido; regra e escopo utilizados |
| Relação projetada | Origem→destino, tipo, ocorrências de suporte e significado do peso, se houver |
| Estado visual | Seleção, hover, câmera, posições, pins, filtros e parâmetros; separado do conteúdo |

- Não use título como identidade global. Homônimos exigem caminho/contexto ou desambiguação. Se a identidade for o caminho, modele sua migração ao renomear/mover.
- Alias da entidade, rótulo de um link e nome do arquivo não são equivalentes. Mudar o texto apresentado não deve trocar o destino.
- Defina caminhos relativos/raiz do acervo, extensão, URL encoding, fragmentos e normalização Unicode/caixa conforme o ambiente. Não introduza normalização destrutiva por conveniência.
- Separe resolução do arquivo de resolução de heading/bloco. Arquivo encontrado com âncora ausente não é o mesmo resultado de navegação completa.
- Destino inexistente pode ser representado sem criar arquivo silenciosamente. Informe quando uma ação realmente criará o conteúdo.
- Resolver link já escrito deve ser determinístico pelo contrato. Ranking textual/semântico ajuda a encontrar candidatos, mas não decide silenciosamente um novo alvo.
- Preserve procedência de referência explícita, embed, tag, propriedade, membership e sugestão inferida. Similaridade precisa identificar modelo/versão/limiar e estado de aceitação quando pertinente.

No Obsidian documentado, `[[Destino|Rótulo]]` separa apresentação/destino; aliases ficam na propriedade `aliases`. Autocomplete pode inserir destino canônico com alias como rótulo. Markdown, wikilinks e subdestinos têm regras próprias. Esses contratos orientam testes, não autorizam presumir política para colisões não documentadas. [Links](https://obsidian.md/help/links), [Aliases](https://obsidian.md/help/aliases).

## 4. Entradas, saídas e contagens

Backlink é a consulta inversa de uma referência; não crie uma segunda aresta persistida só para desenhar a entrada. Defina se a vista conta documentos de origem, pares de entidades ou ocorrências. Uma nota que cita outra três vezes pode aparecer uma vez na lista com três passagens.

Direção, reciprocidade, autorreferência e multiplicidade precisam de política explícita. Setas podem ser opcionais na pintura; origem e destino continuam consultáveis na alternativa semântica. Espessura, tamanho e distância precisam de legenda quando codificarem dados.

Diferencie **referência vinculada**, **menção textual não vinculada** e **sugestão inferida**. Converter uma menção em link altera conteúdo e exige comando explícito, feedback do resultado, erro recuperável e undo quando prometido; isso não implica diálogo adicional para uma ação já solicitada. Uma sugestão não aumenta silenciosamente o número de relações confirmadas.

Listas de relações devem oferecer origem/destino, contexto suficiente e ação de abrir a passagem. Se o painel acompanhar a nota ativa, mudanças de seleção atualizam contexto; painel fixado a uma nota é outro estado e deve ser indicado. [Backlinks](https://obsidian.md/help/plugins/backlinks), [Outgoing links](https://obsidian.md/help/plugins/outgoing-links).

Código literal, embeds, propriedades tipadas e tags exigem parsing compatível com a sintaxe do produto. Uma regex de nomes em todo o arquivo não equivale a índice de referências. Remover uma incorporação não implica apagar o anexo.

## 5. Fonte de verdade e atualização incremental

Declare o que é fonte, índice derivado e preferência. Se arquivos são a fonte, um cache reconstruível não é backup. Reindexação parcial e falta de relações são estados diferentes.

Eventos relevantes incluem edição, conclusão de resolução, criação/exclusão/restauração, rename/move, mudança de alias e alteração externa. Atualize as ocorrências da origem modificada, os destinos afetados e seu índice reverso; mudanças de resolução podem exigir reavaliar outras origens. Rebuild completo deve existir quando necessário, sem ser a única resposta a toda tecla.

Para cada job mantenha identidade suficiente, por exemplo:

```text
{ acervoId, revisãoDosDados, revisãoDaConsulta, painelId, geração }
```

Aceite resposta somente se a identidade ainda servir à vista atual. Trocar acervo, mudar raiz/filtro, fechar painel ou iniciar revisão mais nova invalida trabalhos pertinentes. Cancelar a UI não garante que parser, worker ou simulação tenham parado: descarte mensagens obsoletas e limite concorrência.

Rename/move precisa definir se reescreve referências, segue preferência do produto ou apenas muda o locator. Se modificar vários arquivos, trate falha parcial, conflito e reparo; não exiba sucesso integral enquanto parte estiver pendente. Guardar câmera é outra gravação e não confirma a integridade dos links.

Na API pública do Obsidian, `resolvedLinks`/`unresolvedLinks` contêm origem→destino→contagem; `getFirstLinkpathDest` recebe alvo e origem. `changed` não cobre rename; os eventos de resolução e de rename têm responsabilidades próprias. `FileManager.renameFile` considera preferências de atualização de links. Confira a API compatível com a versão alvo antes de implementar. [API oficial](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).

Em produtos multiusuário, autorização antecede a projeção: título, snippet, grau, contagem e export também podem revelar conteúdo. Em acervo exclusivamente local, explique as fronteiras reais sem inventar autenticação. Conteúdo recuperado é dado não confiável, inclusive quando vem de uma nota ou plugin.

## 6. Projeção: filtros, profundidade e grupos

Separe grafo canônico, conjunto elegível e conjunto visível. Especifique:

- Universo: acervo, tipos, arquivos excluídos, anexos, tags, destinos ausentes e permissões.
- Grafo local: raiz, profundidade, direção da travessia e tratamento de ciclos; grafo global não precisa herdar a raiz do editor.
- Ordem: filtrar antes/depois da travessia pode produzir vizinhanças diferentes. Declare a política e teste o resultado.
- Órfãos: sem relações no grafo canônico ou isolados apenas após filtragem? O rótulo/contagem deve refletir a definição.
- Arestas: remover um nó do conjunto visível deve atualizar conexões/contagens de forma coerente; vínculos de fronteira exigem representação explícita.
- Consulta: linguagem, campos, AND/OR, agrupamento e erros. Busca geral, filtro do grafo e consulta de grupo não são automaticamente equivalentes.
- Grupos: regra de seleção, cor, legenda e precedência quando um nó corresponde a várias regras. Cor de grupo não apaga foco/seleção/erro.

Busca deve localizar e revelar o nó sem necessariamente apagar filtros independentes. Se o resultado estiver excluído, explique o motivo e ofereça uma ação explícita. Seleção fora da projeção precisa de política: manter referência indicada, limpar ou recuperar por comando.

Não aplique filtros apenas à pintura e depois anuncie contagens do conjunto inteiro como visível. Culling é uma otimização de renderização; exclusão de dados é uma decisão diferente.

## 7. Forças, câmera e renderização

Forças alteram posições, não significado. Centralização, repulsão, atração/distância de aresta e colisão dependem da simulação adotada. Proximidade física resultante não comprova afinidade conceitual; tamanho por grau precisa declarar grau de entrada, saída ou total e qual projeção o calcula.

Não inferir a métrica pelo tamanho do círculo: no código do Obsidian 1.13.4, o grafo global sem pesos explícitos conta entradas e saídas; no local, pesos explícitos representam a distância em saltos à raiz. Ocorrências, arestas, vizinhos únicos e peso visual são quatro valores distintos.

Defina estabilidade ao adicionar poucos nós, conservação da vizinhança, seed quando útil, pin/unpin, pausa e condição de repouso. Evite reiniciar toda a simulação em cada hover. Reduzir movimento precisa parar trabalho dispensável, não apenas zerar uma duração CSS.

Separe os comandos:

| Comando | Efeito esperado a declarar |
|---|---|
| Fit todos / filtrados / seleção | Calcula enquadramento do conjunto nomeado na área útil |
| Recentralizar câmera | Reposiciona a vista; não altera links nem necessariamente os filtros |
| Reset de forças | Restaura parâmetros físicos; não confundir com reset do acervo |
| Fixar posição | Mantém posição conforme contrato de sessão/persistência |
| Abrir nó / centralizar grafo local | Navegação e mudança de raiz; são ações distinguíveis |

Zoom ancorado preserva o ponto sob cursor/toque; câmera e mundo usam conversões compartilhadas por pintura e picking. Considere DPR, resize, pane/sidebar, limites e seleção fora da vista. Lente/distorção exige transformação correspondente no hit-testing.

A área útil exclui painéis que realmente ocupam espaço. Um drawer sobreposto pode cobrir o grafo: fit deve declarar se desconta essa região. Recuperação por Fit precisa permanecer acessível em escala extrema.

Defaults são decisões por produto/corpus/dispositivo, não números universais. Declare valor inicial, faixa, passo, unidade, reset e escopo de cada controle. Audite default de código separadamente do valor salvo atualmente.

## 8. Drawer de controles e organização do conteúdo

Agrupe decisões com tarefas diferentes; uma estrutura possível é **Filtros → Grupos → Exibição → Forças**, com status de dados/indexação quando necessário. É uma referência funcional, não uma ordem obrigatória.

| Grupo | Conteúdo | Fronteira importante |
|---|---|---|
| Filtros | Busca, tipos, exclusões, órfãos, profundidade local | Altera projeção, preservando fonte |
| Grupos | Consulta, cor, prioridade e legenda | Codifica categoria; não reescreve links |
| Exibição | Nomes, setas, tamanho e espessura | Altera legibilidade/representação |
| Forças | Parâmetros, pausa, pinning e reset específico | Altera layout físico |

Header identifica superfície/contexto; body contém grupos e rola; ações persistentes permanecem alcançáveis. Header/body/footer compartilham insets quando pertencem ao mesmo eixo. Label, valor, ajuda e controle formam uma unidade. No estreito, empilhe antes de comprimir o campo ou esconder texto essencial.

O breakpoint pertence também ao painel, não apenas ao viewport. Na inspeção do Obsidian 1.13.4, um split estreito cortou a lateral dos controles; ampliar a área restaurou a leitura. Não reproduza esse defeito: limite a largura ao container, redistribua label/controle e permita scroll com fechamento/reset acessíveis. Teste duas sidebars abertas e vários splits, mesmo em um monitor grande.

Use disclosure para complexidade ocasional, mantendo resumo de filtros ativos e controles de recuperação visíveis. Não imponha “máximo 7 opções”. Se controles aplicam imediatamente, indicar esse contrato e tratar erro; não adicionar Save decorativo. Um reset de grupo deve nomear seu alcance.

**Proximidade/região comum** ajudam a associar controles; **semelhança** mantém ações equivalentes coerentes; **conexão uniforme** exige arestas significativas; **atenção seletiva** destaca seleção sem transformar todos os nós em destaque. Fitts orienta alvo operável, não padding mágico; Hick orienta organização/escolha, não redução arbitrária de funções. Verifique a tarefa, não a quantidade de leis citadas.

## 9. Acessibilidade e mobile

Um `aria-label` no canvas não torna entidades e relações acessíveis. Ofereça lista/árvore/tabela equivalente com busca, nó ativo, entradas/saídas, contagem e ações de abrir origem/destino. Preserve foco por identidade com virtualização; retornar do documento recupera contexto útil.

Teclado deve alcançar nós e comandos sem depender da posição em pixels. Não capturar teclas de edição quando o foco está no input. Seleção, direção e categoria precisam de sinais além da cor. Nomes ocultos em zoom distante continuam acessíveis por busca/lista/detalhe.

Para leitura assistiva, anuncie atualização relevante e conclusão de operação, não cada frame. Conteúdo em movimento permite pausa; política de reduced-motion reage durante a sessão. Falha de GPU mantém alternativa funcional.

No touch, estabeleça pan/pinch/seleção e sua disputa com scroll da página/sheet. Hit area é independente do tamanho desenhado do nó; hover nunca é o único caminho para detalhes. Mover posição e criar/alterar relação não devem compartilhar gesto ambíguo sem feedback e cancelamento.

Valide teclado virtual, safe areas, orientação, janela pequena e back do sistema. Inspector pode virar sheet/tela, mantendo seleção e retorno. Mobile não é apenas diminuir o canvas desktop; export/clipboard e plugins podem ter capacidades diferentes.

## 10. Estados, persistência e performance

| Estado | Informação/recuperação |
|---|---|
| Carregando/indexando/resolvendo | Progresso pertinente, contexto e cancelamento quando disponível; não declarar vazio definitivo |
| Vazio real | Distinguir acervo vazio, nó sem relações e filtro sem resultados |
| Parcial | Explicitar fonte/limite/índice incompleto e permitir completar/repetir |
| Destino ausente/ambíguo | Preservar referência e permitir resolver, criar ou corrigir conforme ação escolhida |
| Erro/conflito | Manter conteúdo confirmado e draft; retry/rebuild/reparo com efeito explícito |
| Renderer indisponível | Lista operável; não esconder dados porque canvas falhou |

Defina dono/duração de filtros, grupos, câmera, parâmetros físicos, pins, posições e raiz local: painel, sessão, acervo, dispositivo ou conta. Reabrir, trocar contexto e importar requerem testes separados. Arquivo salvo, índice atualizado, sync e backup restaurado são confirmações distintas.

Meça parse/indexação, abertura fria/quente, primeira interação, filtro, simulação, pintura, picking e memória separadamente. Registre hardware, viewport/DPR, nós **e arestas**, distribuição e budgets próprios. Compare esparso, hub, desconectado e denso; uma contagem isolada de nós não caracteriza carga.

Escolha culling, LOD, índice espacial, cache, worker e GPU a partir de evidência. Worker não elimina custos de serialização; GPU não elimina parsing ou simulação na CPU. Não prometa60 fps só por usar RAF. Amostragem/truncamento precisa de indicação de incompletude.

Liberar timers, listeners, observers, jobs, workers, texturas/buffers e bitmaps ao fechar/trocar contexto. Pausar fora de vista quando adequado; verificar reabertura repetida. Parada do cliente e parada do cálculo são eventos diferentes.

## 11. Fixtures e assertions antes de aprovar

São ensaios propostos, não resultados executados. Usar corpus sintético isolado e apenas sintaxes/capacidades do alvo. Registrar versão, plataforma, preferências e core/plugins.

**Fixture base:** A referencia B duas vezes; B referencia C; D é isolada; A referencia X inexistente. Acrescentar E homônima de A em outra pasta, alias alternativo, referência a heading/bloco e texto literal sem link.

Para uma política que agrega por par dirigido e exclui destinos inexistentes, declarar antes do teste:

```text
arestas resolvidas = {(A,B), (B,C)}
ocorrências(A,B) = 2
backlinks(B) = {A}, com duas passagens
local(A, saída, profundidade=1) = {A,B}
local(A, saída, profundidade=2) = {A,B,C}
```

Se outra política for adotada, adaptar as expectativas explicitamente. Não mudar o resultado esperado depois da execução só para fazer o teste passar.

| Ensaio | Assertion / evidência exigida |
|---|---|
| Adicionar B→A e A→A | Reciprocidade/autorreferência seguem política e contagens corretas |
| Mudar só rótulo; depois alias | Rótulo não troca destino; alias invalida resolução pertinente |
| Dois homônimos | Destino contextual inequívoco ou desambiguação; nenhum chute por ranking |
| Criar/remover X | Estado não resolvido converge sem arquivo/aresta fantasma |
| Heading/bloco removido | Arquivo resolvido e subdestino inválido não se confundem |
| Texto comum/código literal | Menção/sugestão permanece separada de relação confirmada |
| Rename/move com falha parcial | Conferir fontes, índice direto/reverso, mensagem e reparo, conforme preferência |
| Edição externa após cache aquecido | Relações antigas desaparecem da revisão final |
| Filtro + profundidade + órfãos | Conjunto e contagens correspondem à projeção declarada |
| Cores de grupos sobrepostos | Precedência/legenda explícita; seleção continua distinguível |
| Forças/zoom/picking/resize | Nenhuma mudança de links; mesmo alvo nas coordenadas transformadas |
| A→B→trocar acervo com worker lento | Geração antiga não substitui dados/progresso no contexto novo |
| Reabrir e restaurar estado | Cada propriedade persiste somente pelo contrato, com IDs corretos |
| Teclado/leitor/touch | Abrir fonte, consultar direção, filtrar e recuperar vista sem gesto exclusivo |
| Corpus grande/falha GPU/worker | Budgets medidos, completude comunicada e alternativa funcional |

A aprovação exige artefato e observação para o caso executado. Teste de parser não comprova navegação; screenshot não comprova persistência; mocks de worker não comprovam latência ou qualidade de inferência.

## 12. Tecnologia: decisão e evidência

| Responsabilidade | Alternativas/decisão a avaliar | Evidência necessária |
|---|---|---|
| Parse/resolução | Parser da linguagem + política de caminhos/aliases | Ocorrências e destinos corretos no corpus; não apenas nome da dependência |
| Índice direto/reverso | Estruturas/cache existentes, incremental ou rebuild | Revisões, rename/delete e consistência entre entradas/saídas |
| Projeção | Travessia/filtros no contexto correto | Conjuntos esperados local/global; limites e permissões |
| Simulação | Forças próprias/biblioteca, JS/WASM, main thread/worker | Callsite, execução ativa, pausa, custo e fallback |
| Render/picking | DOM/SVG/Canvas/WebGL conforme escala e tarefa | Camada usada, transformação, hit-test e alternativa acessível |
| Persistência | Arquivos/store de dados e estado de vista separados | Escrita, leitura, falha, migração e round-trip |

**Referência delimitada — Obsidian 1.13.4:** a auditoria estática desta revisão identificou `PIXI.Application` em `app.js` e `pixi.js-legacy 7.2.4`. Em `sim.js`, o caminho prioriza WASM embutido, com fallback D3 explícito. Isso demonstra mecanismos presentes nesse build; não prova qual caminho foi exercido em cada sessão, qual renderer/GPU estava ativo ou desempenho em outro dispositivo. Não generalizar “grafo=D3” quando D3 é fallback, nem inferir Three/3D pela aparência.

No mesmo artefato, o editor Markdown instancia CodeMirror 6; o recurso Canvas monta DOM e SVG com transformações CSS; controles do grafo usam o resolver Lucide, com aliases próprios. O catálogo de SVG não determina sozinho tamanho/espessura finais: tokens CSS participam do resultado. Renderers de grafo leem cores computadas do tema e precisam atualizá-las ao mudar CSS. Não atribuir a mesma biblioteca a todas as superfícies do aplicativo.

Os recursos de Graph documentados incluem filtros/grupos/exibição/forças e profundidade local. Help/API atuais são mutáveis e podem descrever versões diferentes do runtime inspecionado; changelogs posteriores não identificam retroativamente a tecnologia instalada. Separar **documentado**, **estático**, **observado em execução**, **inferido** e **pendente**. [Graph](https://obsidian.md/help/plugins/graph), [armazenamento](https://obsidian.md/help/data-storage), [API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).

A stack da referência é evidência, não obrigação para outro produto. Reutilize a arquitetura existente e implemente o contrato necessário. Não copiar código vendor/proprietário, plugins ou assets da instalação como atalho de fidelidade. Para cada alegação tecnológica, guardar versão/hash, arquivo/callsite, responsabilidade e limite de cobertura no relatório da auditoria.

### Observações executadas na revisão 1.8

Vault sintético, macOS, Obsidian 1.13.4, tema escuro padrão; os resultados abaixo não são aprovação universal dos cenários da seção11.

| Ensaio | Resultado observado e consequência |
|---|---|
| A cita B duas vezes, outra nota cita B uma vez | Painel apresentou3 ocorrências em2 arquivos; não confundir contagem com número de origens |
| Menções do nome e alias sem markup | Apareceram como2 menções não vinculadas; não viraram relações confirmadas |
| `tag:#ux` com tags/anexos habilitados | Filtrou as notas correspondentes e manteve tags/anexo relacionados, inclusive outra tag; registrar expansão por tipo após o filtro |
| Grafo local com profundidade1→2 | Passou de4 a7 nós na fixture; seleção de profundidade altera travessia, não o conteúdo |
| Renomear destino e escolher atualizar uma vez | Atualizou3 links em2 arquivos; rótulo de alias permaneceu; arquivos e3 backlinks conferidos após a ação |
| Canvas com nota e cartão livre conectados | Composição mostrou a conexão autoral; grafo local do arquivo Canvas permaneceu um nó, sem transformar os cartões em relações Markdown |

Os nomes/defaults correspondem ao build auditado. Backend gráfico efetivo, caminho WASM ativo, leitor de tela, touch, corpus grande e recuperação de falhas não foram validados nesta passagem. Veja [proveniência](sources.md).

**Pergunta final de aceite:** por que estas entidades estão ligadas, em qual direção, qual passagem ou dado sustenta a relação, o que muda ao renomear uma delas e como acessar tudo isso fora do canvas? Se a resposta depende apenas de cor, força ou screenshot, o trabalho ainda está incompleto.
