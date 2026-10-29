# Movimento e feedback

Antes de animar, responda: o que muda, por quê, quem precisa perceber, com que frequência, e o que acontece sem movimento? Os eixos de contenção, polimento e expressão de Design Motion Principles são lentes contextuais, não endosso de autores nem receita única.

## Escolha

| Situação | Direção |
|---|---|
| Entrada de texto, teclado, ações centenas de vezes/dia | Resposta imediata; evitar deslocamento e atraso |
| Mudança de estado ou abertura de painel | Continuidade curta, foco correto, sem bloquear ação |
| Primeiro uso ou campanha expressiva | Narrativa possível, preservando controle e leitura |
| Operação longa | Progresso verdadeiro, cancelamento e recuperação |
| Conteúdo informativo estático | Nenhuma animação se não melhora compreensão |

Como ponto de partida, feedback visual pode ser instantâneo, transições pequenas podem ficar em 100–250 ms e deslocamentos maiores em 200–400 ms. Ajuste à distância e plataforma; não apresente estes intervalos como norma universal. Não insira espera artificial para “mostrar” sucesso.

## Especificação

Para cada movimento importante: gatilho, estado inicial/final, propriedade, duração ou parâmetros de spring, easing, interrupção, reversão, repetição e alternativa reduzida. Gestos devem acompanhar o dedo e permitir cancelamento. Entradas rápidas não podem formar filas de animação nem disparar ação duplicada.

Redução de movimento vale independentemente da intensidade escolhida. Troque parallax, zoom amplo e rotação por transição discreta ou mudança instantânea, mantendo informação. Não dependa de animationend para concluir uma regra de negócio. Não aplique globalmente durações quase zero sem verificar conteúdo inicialmente oculto.

## Engenharia

Prefira transform e opacity quando expressarem o efeito; anime geometria apenas com motivo e medição. Não use transition: all. Não proíba APIs por nome: listeners passivos bem controlados podem ser adequados; re-renderizar toda a árvore por pixel de scroll geralmente não é.

Escolha CSS, API nativa ou biblioteca já usada. Evite duas engines controlando a mesma propriedade. Em React, mantenha valores contínuos fora de state quando necessário e limpe observers, listeners e timelines. Use will-change pontualmente; blur e camadas gigantes podem custar memória/GPU.

Valide interrupção, navegação durante animação, resizing, aba em background, hardware modesto, reduced motion e conteúdo alcançável antes de JS. Movimento não substitui estado acessível, boa latência ou feedback textual.

## Materiais e objetos interativos

Renderização estática e movimento reduzido são escolhas independentes. A preferência **estática** deve manter a representação CSS/Canvas2D sem importar a engine ou adquirir contexto WebGL. Movimento **reduzido** pode manter um material renderizado uma vez, mas deve remover inclinação decorativa, parallax e interpolação. Combine a preferência do SO com a do app: se qualquer uma pedir redução, reduza. Observe ambas ao vivo e neutralize a pose de hover já ativa quando a política mudar.

Inclinação por hover exige ponteiro fino com hover disponível; ignore eventos touch nesse comportamento. Arrastar um objeto deliberadamente é outro contrato: precisa de alvo, cancelamento e alternativa por controles. Preserve o scroll vertical mobile e trate `pointercancel`; não transforme qualquer toque na página em gesto 3D.

Use RAF sob demanda: iniciar ao mudar o alvo, continuar enquanto a pose converge e parar em repouso. Cancele o frame pendente quando a aba ou o objeto ficarem invisíveis, adie reconstruções caras e redesenhe o estado mais recente ao retornar. Não acrescente “respiração” contínua para demonstrar que o material funciona. Se JS controla `transform` a cada frame, não aplique também uma transição CSS nessa propriedade.

Teste a sequência **interagir → reduzir movimento → ocultar → alterar dados → mostrar → estático → interativo → desmontar**, incluindo mudança do SO e descarte antes de um import terminar. Estados DOM como `moving`, `idle`, `paused` e `static` ajudam a observar o contrato, mas não demonstram FPS, custo de GPU ou qualidade visual. Verifique a imagem no navegador e a ausência de trabalho pendente separadamente.

## Filmes e sequências renderizadas

Use para vídeo, teaser, deck animado ou narrativa temporal entregue como arquivo. Não impor este fluxo a um hover, gesto ou ajuste de interface. Escolha ferramenta pela capacidade disponível e pelo formato contratado; uma referência feita com HyperFrames não obriga migrar Remotion, CSS, SVG ou a engine existente.

1. **Fixe a entrega.** Mensagem, conteúdo literal, proporções, duração/FPS, som ou silêncio, legendas e editabilidade vêm do pedido e do canal. Não acrescentar música, locução ou formatos por default. Identidade do projeto e [contrato editorial](artifact-workflows.md#contrato-editorial-em-restyles) continuam válidos.
2. **Planeje mudanças observáveis.** Para cada trecho, registre conteúdo/pose, o que muda, intervalo de leitura e passagem ao trecho seguinte. Em um filme novo complexo, storyboard e animatic reduzem retrabalho: primeiro composição, depois timing, depois produção. Reuse composição, assets e poses aprovados no render final, evitando uma segunda implementação que só parece equivalente. Uma correção em filme aprovado preserva as demais cenas. Respeite a autorização já dada para produzir; a etapa não cria outra aprovação obrigatória nem presume aprovação por silêncio.
3. **Use uma referência temporal única.** Derive limites de cena, entradas, pausas, voz e cues sonoros da mesma timeline ou mapa de tempo. Texto só pode ser lido depois de entrar; o intervalo útil não inclui todo o fade. Estado ao buscar um instante deve derivar do tempo, sem depender da sequência de callbacks já percorrida. Verifique seek/scrub fora de ordem quando oferecido. Não fixe BPM, easing, loudness ou intervalo de leitura universais.
4. **Divida produção quando ajudar.** Cada cena delegada recebe revisão, contrato de entrada/saída, enquadramento, ativos e dono dos arquivos. Integre apenas o resultado da revisão esperada. Retome etapas comprovadas; se o render ou upload terminou com resultado desconhecido, consulte-o antes de repetir o efeito. Reaproveitar saída antiga exige confirmar que seus insumos não mudaram. Isso é disciplina de execução, não promessa de um scheduler instalado.
5. **Revise transições e arquivo final.** Amostre abertura, encerramento e antes/durante/depois das passagens importantes; frames distantes podem esconder um flash ou corte abrupto. Em estudo de referência, anote timestamp/frame e FPS ou timebase, distinguindo medição de interpretação. Use contato de frames para localizar problemas, depois reproduza o trecho; uma folha de frames não comprova áudio nem todos os frames.

No arquivo exportado, confira dimensão/proporção, duração e tolerância contratada, frame rate/timebase, primeiros/últimos frames, texto/assets e faixa de áudio ou silêncio. Em mídia de frame rate variável, não use uma tolerância de “um frame” sem definir a base de tempo. Tela preta pode ser intenção; só reprove se contrariar a sequência. Ouça sincronização, cortes e inteligibilidade quando houver som. Projeto salvo, preview e MP4 final são evidências distintas.

Um gate indisponível fica não verificado; um processo com exit0 ainda pode gerar arquivo incompleto. Mostre separadamente o que foi medido, inspecionado e entregue. Não chamar `upload_files`, `look`, `start_task` ou comandos de outra plataforma se não existirem no ambiente. Não iniciar hospedagem, geração paga, publicação ou memória automática como consequência de produzir uma mídia.

### Legendas e fala

Quando houver legendas, confronte a transcrição com o áudio real, incluindo silêncio, negação, nomes e trechos incertos. ASR pode inventar fala em silêncio; não complete por plausibilidade. Detecte texto já gravado no vídeo antes de acrescentar outra camada. Preserve o conteúdo pedido e distinga transcrição literal de adaptação editorial autorizada. Sem acesso ao áudio, a fidelidade à fala permanece não verificada.

Confira ordem, sincronização, duração útil de leitura, quebras e legibilidade ao longo de cortes, movimento e mudanças de fundo. Destaques decorativos atrás de uma pessoa não substituem uma legenda completa e legível quando esta for exigida. Preserve o vídeo original quando a tarefa for apenas legendar; estilo, posição, língua e tolerâncias vêm do contrato. Valide a trilha/arquivo final, não só o JSON de cues ou um frame estático. Não adicionar locução, transcrição paga ou download de modelos automaticamente.

### GIF e loops

Inspecione o arquivo codificado: dimensões, delays dos frames, duração, repetição e transição do último para o primeiro. PNGs intermediários corretos não comprovam ritmo nem emenda do GIF. Confira também entrada, desenvolvimento e repouso para evitar recorte que só funciona no frame final. Reenquadrar não autoriza esticar texto ou alterar o conteúdo fora do pedido.

Se o canal mostrar apenas o primeiro frame quando não anima, este precisa comunicar a informação contratada. Limitações de paleta, transparência ou compressão devem ser avaliadas no formato de entrega; não trocar silenciosamente GIF por vídeo ou impor uma taxa de frames universal. Ajustar timing exige verificar o resultado e a continuidade, não apenas o parâmetro do encoder.


## Cenas vinculadas à rolagem

Quando o escopo incluir uma cena por scroll, defina a informação que ela comunica, região de início/fim, estado inicial/final e relação entre progresso e pose. Use a infraestrutura existente; GSAP, Lenis e um catálogo externo são opções, não requisitos. O catálogo ou demo citado precisa existir na versão disponível antes de planejar sua reutilização.

Inspecione antes/durante/depois da fixação, pontos intermediários e percurso reverso. Uma folha de frames ajuda a localizar cortes e sobreposição, mas não prova continuidade entre amostras: percorra a cena de verdade. Confirme resize, retorno à rota e desmontagem de listeners/observers/timelines quando aplicáveis; reposicionar a página não deve deixar conteúdo preso ou invisível.

Em largura estreita, toque ou movimento reduzido, priorize o acesso ao conteúdo e à ação. Escolha sequência estática ou transição simples quando a viagem espacial não ajudar; sem JavaScript, mantenha conteúdo essencial legível quando esse fallback fizer parte da entrega. Não use autoplay, pins longos ou um número mínimo de elementos animados para provar acabamento. Use orçamento de peso, duração e custo de render adequado ao alvo e meça onde houver risco. Esta adaptação do [estudo Taste](taste-study.md) preserva as regras de acesso e continuidade deste documento.
