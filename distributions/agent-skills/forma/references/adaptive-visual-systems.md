# Sistemas visuais adaptáveis, perfil e mapas espaciais

Use em personalização, produtos de acervo, interfaces expressivas, perfis e vistas de dados espaciais. Síntese independente informada pela auditoria da referência desktop, artefato 0.19.0 (2026-10-25); os princípios são transferíveis, valores particulares não são padrões universais. Leia também visual-system, motion, contracts-trust, rea e rendered-validation conforme a tarefa.

## 1. Contrato de tema antes da paleta

Quando a dificuldade for equilíbrio cromático, escala tonal ou aparência da cor, siga o [diagnóstico cromático](color-refinement.md); esta seção define escopo e precedência de estado. Avalie o modo resolvido e os pares/consumidores que realmente mudam, sem confundir um seletor de tema com prova de que todas as camadas foram atualizadas.

Modele separadamente: preferência (system/light/dark), modo resolvido, accent, ambiente, cor de contexto, contraste, transparência, movimento e densidade. Declare o dono de cada valor: SO, app, conta, biblioteca, documento ou sessão. Não misture preferência persistente e estado derivado.

Entregue uma tabela de precedência. Exemplo a adaptar: preferência explícita vence SO; contraste elevado vence decoração; cor da coleção altera apenas ambiente quando “manter tema” estiver desligado; accent de ação continua semântico. Observe o tema antes do primeiro frame e após troca de contexto para evitar flashes e vazamento de preferência.

Tokens mínimos: surface/base/raised/overlay, text/primary/secondary/disabled, border/default/strong, accent/fill/on-fill/text, focus/ring, status/success/warning/error, selection/bg/text. Estados selected, hover, pressed, disabled e focus são independentes. Cor de categoria não substitui cor de estado.

O hex no CSS não prova cor final: registre modo, preferência, override JS e estilo computado. Para alpha/blur/gradiente/imagem, avalie composição real nos extremos; não calcule contraste de texto sem considerar fundo. Dark requer novas luminâncias, bordas e sombras, não inversão automática.

Na referência desktop auditada, accent de ações, wash ambiente, paleta do material do perfil e cor de tecido dos livros são sistemas separados. Não aplicar o mesmo hex aos quatro. Canvas precisa repintar ao mudar tokens; shader precisa atualizar uniforms/texturas; CSS só altera automaticamente a camada DOM. O editor de wash usa valores manuais no stage, enquanto a superfície principal pode resolver contexto. Precedência por superfície é parte do contrato de cor.

## 2. Materialidade com função

Especifique quais superfícies são opacas, translúcidas e decorativas. Conteúdo essencial deve continuar legível sem blur, shader ou imagem. Uma receita inicial é fundo neutro com poucos campos de baixa saturação nas margens, painel de trabalho mais sólido e sombra por papel de elevação. É uma hipótese estética a testar, não obrigação.

Documente cor, posição, extensão, intensidade e limite de cada campo. Dê controles simples e redefinir; exponha ruído e posição apenas se ajudarem. Limite intensidade para não destruir hierarquia. Inclua fallback sólido, modo econômico e preferências de transparência/contraste. Meça custo em dispositivos alvo antes de impor animação contínua.

Separe densidade de chrome, lista, inspector e área de leitura. Não diminua hit area só para tornar ícone menor. Traduza sidebar/inspector desktop em navegação e tela/sheet mobile, preservando tarefa e contexto.

## 3. Preview, salvar e desfazer

Escolha e comunique um contrato: (a) rascunho com commit explícito ou (b) aplicação imediata com desfazer. Não misture “Save” com persistência oculta não confirmada.

Para rascunho: snapshot confirmado → preview local → validação → await commit → sucesso. Na falha, preservar draft e permitir retry. Escape/clique fora/fechamento precisam política única. Para aplicação imediata, cada mudança deve indicar pendência/erro e desfazer deve restaurar o estado correto.

Inventariar por seção, não assumir uma transação para toda janela. Na referência desktop auditada, Profile/Appearance usam draft; Libraries renomeia/restiliza imediatamente; o editor compacto de iluminação persiste com debounce250ms e descartar grava reversão. O Pauta pode manter Save explícito, mas deve declarar adaptação. Overlay também varia: Settings é modal; iluminação é painel não modal no canto16px/16px, largura268px. Não transferir focus trap/inert de um para o outro.

Debounce limita frequência; não garante ordem de gravação. Use revisão/fila por entidade, descarte resposta obsoleta e defina flush/cancel ao desmontar. Não fechar editor após flush falho. Undo não pode consumir entrada antes de sucesso sem reposição ou tratamento de resultado parcial.

Ao mudar biblioteca/tenant/projeto: guardar ou descartar draft conscientemente, encerrar overlays, invalidar caches dependentes, manter identidade de contexto em jobs e rejeitar respostas antigas. Alterar membership exige invalidar busca/cache relevante. Local salvo e sincronizado remotamente são estados distintos.

## 4. Perfil expressivo utilizável

Defina finalidade: identificação, autoria, reputação ou compartilhamento. Dados necessários permanecem texto semântico em DOM/native; canvas é decoração. Não invente números de membro, selos ou credenciais para transmitir autoridade.

Um cartão pode ter base, material, brilho, borda e conteúdo, com identidade cromática determinística. Limite inclinação, preserve contraste no brilho máximo e evite deslocar ações com o ponteiro. Sem pointer fino, movimento reduzido, economia ou WebGL indisponível: versão estática equivalente. Pare RAF/timelines/shader fora de vista e ao desmontar; CSS de duração curta não cancela trabalho JS.

Contrato recuperado na referência desktop auditada: DOM semântico sobre fundo WebGL2 próprio, e não Three. Cartão320×440, conteúdo inset24, perspectiva1000, camadas deep→canvas→tint→texto/emboss→bevel. Nome28/32px e papel12/14px; metadados mono.120paletas determinísticas (12famílias×10variantes), com shade/base/accent/glow e seed. Shuffle avança37módulo120. Tilt máximo7° por eixo; molas90/17/1, holo190/31/1, retorno após80ms. São medidas de referência, não defaults universais.

Na referência, perfil é global no aplicativo; bibliotecas não possuem pessoas diferentes. Nome/papel/variante são campos dessa referência, não campos obrigatórios no destino. Número pode vir de licença e não deve ser inventado. Salvar perfil local e sincronizar remotamente têm confirmações distintas. Mapear este dono antes de ligar o objeto ao armazenamento.

Se o destino já aprovou um passaporte ou outro objeto de identidade, reutilize-o no perfil; o cartão material é uma alternativa, não substituição automática. Selecione os campos pelo domínio (por exemplo, foto/nome globais e objetivo por idioma), com uma prévia ligada ao mesmo draft do formulário. Tirar um campo sem propósito da tela não autoriza excluir seu valor legado. Um objeto visual de país/categoria não certifica cidadania, licença ou competência.

Testar nome vazio/longo, CJK/RTL, imagem ausente, papel longo, escala de texto e tema. Exportar distingue cancelamento, falha e arquivo concluído. Reutilizar mesmo componente, fixar fontes/pose/enquadramento, esperar prontidão e validar dimensões: a referência desktop usa480×640CSSpx @3x para1440×1920PNG, independente do zoom da janela. Web/mobile precisam download/clipboard compatível com a plataforma, sem fingir bridge Electron. Não confundir personalização pública com dados privados da conta.

Falha observada estaticamente a não herdar: shader do perfil recebe tempo0 em reduced-motion, mas RAF continua renderizando. Parar só o relógio ou a transformação CSS não elimina trabalho GPU. Aceite exige mudança de preferência durante a sessão, pausa ao ocultar, retorno previsível e liberação de recursos/context loss. Uma captura estática não prova esses requisitos.

## 5. Grafo, mapa espacial e canvas

Primeiro identifique o modelo: grafo de relações tem nós/arestas com significado; mapa de coleções pode ter apenas agrupamentos. Não invente relações para decorar. Explique o que proximidade, tamanho, cor e conexão representam.

Para identidade, resolução de links, aliases, backlinks, travessia local/global e atualização do índice, leia [grafos e conhecimento](knowledge-graphs.md). Esses contratos antecedem câmera e pintura. O mapa de memberships da referência desktop auditada, o grafo derivado do Obsidian e um Canvas autoral não são capacidades intercambiáveis.

Para território e indicadores, use [dashboards temporais e geográficos](data-dashboards.md): área geográfica, população e magnitude são medidas diferentes. Escala, legenda, cobertura e referência temporal precisam acompanhar cada modo; profundidade desenhada em Canvas não implica uso de WebGL ou motor 3D.

Separe coordenadas do conteúdo e câmera. Zoom ancorado deve preservar o ponto de interesse; fit/recentralizar deve estar visível. Declare limites, margens, comportamento no resize e recuperação de seleção fora da vista. Distinga mover posição de reclassificar item. Prévia de destino, cancelamento e undo precisam cobrir efeitos reais, inclusive tags automáticas.

Ofereça lista/árvore semântica equivalente, busca, seleção por teclado e comando “mover para”. Descrição aria-label do canvas não substitui acesso aos objetos. Preservar foco com virtualização; limitar anúncios de contagem; selecionar todos deve explicitar se inclui itens não renderizados.

Para grandes acervos: medir tempo até interação, latência de busca/drag, frames e memória; usar culling, cache com invalidação, workers quando justificados e descarte de bitmaps. Renderizar por dirty state quando possível. Não prometer 60fps pela presença de RAF/worker. Mobile precisa validar pinch/pan/scroll e alternativa sem gesto complexo.

Caso da referência desktop auditada: Canvas2D offscreen com worker de miniaturas, composição final por lente WebGL1 opcional e fallback Canvas2D sem lente e payload agregado `{collections,items,links,unfiled}`. Links são memberships coleção/item; a tela agrupa previews, não inventa linhas semânticas. Altura de tile40, gaps18, aspecto limitado.45..2.4. Camera zoom.02..10, botões×/÷1.5, fit até1.5. Ao mudar escala por fator `r`, `x'=anchorX-(anchorX-x)*r`, idemY, preserva ponto sob ponteiro. Threshold de drag3px separa clique e arrasto; fundo/Space/botão do meio fazem pan; modificadores suportam seleção de área.

Persistir membership não comprova persistência de câmera/posições. Arrastar entre coleções grava add/remove e pode adicionar tags automáticas que sobrevivem à remoção da associação. Rollback/undo devem cobrir esses efeitos ou declarar limitação. Tema é resolvido de tokens computados para cores de canvas e exige invalidação. Cleanup termina worker, cancela animação/timers, remove listeners/observers e fecha bitmaps. Testar falha do worker, erro de gravação, duplicação de item entre grupos e dados grandes, além de teclado/lista equivalente.

## 6. Objetos 3D ligados ao produto

Para transformar a técnica em algo copiável/adaptável, use o contrato e o asset original de [objetos reutilizáveis](reusable-objects.md). Para produto GLB, retrato com profundidade e troca de materiais, use [web imersiva](immersive-web-tech.md). A decisão depende da tarefa e do orçamento; uma biblioteca operacional não precisa herdar uma cena de campanha.

Antes da cena, identifique o objeto persistido: biblioteca, coleção ou produto real. Cor, nome, padrão e metadados devem atualizar a entidade e sua representação. Pose de apresentação é outro estado; não salvá-la como identidade sem motivo. Uma capa inclinada em CSS pode ser fallback, mas não prova equivalência de mesh, material ou iluminação.

Na referência desktop auditada, livros usam Three revision186, mesh com position/normal/UV/index e shader de tecido/foil/bump. Não é o renderer do perfil nem um OrbitControls demonstrado. Renderer tem alpha, antialias e resolução intermediária2×; componente limita DPR a2 e copia para canvas de saída. Cor perceptual combina hue da entidade com variação determinística por ID, produzindo deep/cloth/lit/edge. Mapas diffuse/bump/foil têm vida útil e cache próprios.

Documente iluminação/material/câmera, não somente screenshot: referência ambient.54, key.9 na posição(7,0,4.5), back1, spot.05, exposure.7; shininess8, reflectiveness.04, bumpBase.006, bumpCustom.07, foilOpacity.6. Pose detalhada20.05°/28.65°/−8.59°; amplitudes hover11°/7°. Drag horizontal acrescenta.42°/px, vertical é limitado; suavização `alpha=1-exp(-min(64,dt)/120)` termina em repouso. Os números servem à comparação deste build, não ao tuning indiscriminado de qualquer modelo.

Checklist de entrega:

- Nome acessível em DOM, foco visível e ativação de objeto por teclado; canvas decorativo não apaga conteúdo semântico.
- Mouse/touch têm captura/cancelamento/limites; controles alternativos realizam a mesma tarefa. Sem hover, não esconder ação essencial.
- Reduced-motion congela hover/drag/sway decorativos e reage a alteração durante sessão. Pose estática continua legível.
- GPU indisponível ou perdida mostra capa estática e texto com as mesmas ações. Falha de lazy import não pode deixar região vazia silenciosa.
- Culling/idle/visibilidade e dispose de textura/geometria/material são explícitos. Um renderer compartilhado precisa dono e política de encerramento.
- Nome/cor/padrão salvos sobrevivem reload; erro preserva dados confirmados. Remover registro e remover arquivos são ações distintas.
- Mesh, shader, textura e marca têm procedência/licença verificada; observação do artefato não autoriza redistribuição automática de conteúdo proprietário.

## 7. Matriz de aceite prática

| Sistema | Ensaio | Resultado exigido |
|---|---|---|
| Tema | claro/escuro/sistema; alterar SO | Modo coerente, sem flash e preferência preservada |
| Personalização | accent extremo + fundo extremo + high contrast | Texto/foco/seleção distinguíveis; decoração não vence estado |
| Persistência | alterar→descartar→reabrir; salvar→reiniciar; storage falha | Contrato cumprido; nenhum falso Saved |
| Contexto | trocar coleção/biblioteca com draft e job | Nenhum dado no contexto errado; usuário entende destino |
| Motion | reduced inicial e alterado em sessão | Efeito dispensável para e trabalho gráfico é interrompido |
| Perfil | texto extremo, sem GPU, export cancel/erro/sucesso | Conteúdo e ações continuam disponíveis |
| Export | zoom diferente, fontes lentas, resolução/DPR, arquivo aberto | Mesmo conteúdo, enquadramento e dimensão contratados |
| Mapa | 0/1/muitos grupos, zoom limites, resize, fit | Orientação recuperável e objetos alcançáveis |
| Organização | drag cancelado, destino inválido, undo falho | Sem alteração silenciosa; retry da operação correta |
| Busca | resposta fora de ordem; membership após cache aquecido | Resultado respeita consulta e escopo atuais |
| 3D | pose extrema, DPR, GPU off/context lost, entrada/saída20vezes | Sem clipping/perda de ações/crescimento indefinido de recursos |
| Estado de biblioteca | restyle imediato, rename falho, trocar contexto | Persistência por ação explícita; nenhum rollback visual fictício |
| Portabilidade | teclado, touch, texto ampliado, viewport estreita | Mesma tarefa realizável sem depender de hover/gesto |

Use combinações em pares mais extremos críticos para reduzir explosão de testes; isso não prova todas as combinações. Registre “observado”, “estático”, “testado” e “pendente” separadamente. Uma referência visual excelente pode conter defeitos funcionais: transfira princípios, não os defeitos.

Paridade tem três eixos: aparência, interação e dados/persistência. Inventariar cada capacidade antes de anunciar conclusão. No snapshot do Pauta auditado em25/10/2026, existiam tarefas/preferências/iluminação; perfil editável, mapa espacial e livros3D não estavam implementados. Este documento define requisitos práticos, não afirma que esses recursos já existem no Pauta ou que o produto inteiro é equivalente à referência desktop auditada. Alterações posteriores exigem nova evidência do código e runtime.

Para inventariar cada opção e distinguir modos, defaults, donos e contratos de persistência, use [Modos e configurações](settings-modes.md).

A lente do grafo usa distorção radial `p*(1+.07*r²)` e conversões correspondentes para hit-testing, incluindo inversão iterativa. Nunca distorcer apenas a pintura e manter clique/drag em coordenadas não transformadas. Validar o objeto sob o cursor nos cantos, no centro e nos extremos de zoom. Presença de WebGL não transforma a vista em um grafo 3D.

## 8. Integrar busca, perfil, mapa e biblioteca

A implementação posterior do Pauta acrescentou módulos de busca local, workspace, perfil material, livros e mapa. A presença desses módulos atualiza o inventário estático; não encerra a comparação visual/interativa com a referência desktop auditada. Manter o registro anterior datado como histórico, e exigir nova evidência de runtime para cada capacidade.

| Dado | Representação | Contrato a preservar |
|---|---|---|
| Biblioteca ativa | Nome/capa, lista, mapa e histórico | Mesmo ID/contexto; troca invalida busca e jobs antigos |
| Perfil confirmado versus draft | Nome/papel/cartão, sidebar e PNG | Preview não confirma Save; export declara se usa draft ou salvo |
| Cor da biblioteca | Tecido/capa | Identidade local, independente de accent e filtro de busca |
| Cor da tarefa ou paleta da imagem | Chip de busca e resultado | Procedência explícita; não alterar iluminação ao filtrar |
| Preferências de acessibilidade | CSS, shader, 3D, mapa | Um contrato de contraste/movimento, aplicado em todos os renderers |
| Item no mapa | Thumbnail, posição, seleção e ação | Mesmo conteúdo real da lista; sem relações inventadas |

Não confundir tecnologias: um encoder de texto local fornece busca semântica textual; um matcher de paleta fornece busca cromática; um shader fornece material; um mapa com lente fornece navegação espacial. Nenhum desses mecanismos, isoladamente, prova visão multimodal, grafo de conhecimento ou cena 3D navegável.

Renderers, listeners e trabalhos assíncronos precisam de ciclo de vida. Em reabertura/rerender, remover listeners globais e cancelar RAF/jobs antigos; preferir eventos de pointer capture com `pointercancel`/`lostpointercapture` quando o gesto pertence ao componente. Testar abrir/fechar repetidamente e trocar contexto com upload, inferência e animação ativos. Exportar PNG é outro caminho de renderização: comparar conteúdo, dimensões, fontes, textura e transparência no arquivo aberto, não somente na prévia.

Para distribuição web/mobile/desktop, registrar capacidades reais do ambiente. Clipboard de imagem, EyeDropper, GPU, armazenamento e downloads têm disponibilidade e falhas próprias; manter alternativa operável. Interface com moldura desktop não prova pacote nativo, integração de arquivos, atualização ou sincronização. Use [busca](search-discovery.md) e [configurações](settings-modes.md) para contratos de dados e recuperação.
