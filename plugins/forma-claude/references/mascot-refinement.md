# Refinamento de mascotes: identidade, presença e comportamento

Use para refinar um personagem 2D, 2.5D ou 3D existente, ou traduzir uma identidade autorizada entre meios.
O objetivo é preservar reconhecimento e melhorar apresentação, resposta e integração.
Não imponha voxel, acabamento fosco, rig, GLB, WebGL ou uma biblioteca específica.
Escolha o mecanismo mínimo conforme [web imersiva](immersive-web-tech.md); um SVG estático pode ser a solução completa.

## 1. Fixar identidade e evidência

Antes de alterar, registre a referência autorizada, versão, estados, viewport, DPR e comportamento desejado.
Separe o que foi observado, confirmado no código, calculado, inferido e proposto.
Descreva os invariantes: silhueta, proporções, espaços negativos, rosto, paleta e sinais que tornam o personagem reconhecível.
Identifique também o que pode variar: expressão, pose, acabamento, iluminação, cenário e movimento.
Uma imagem frontal não especifica automaticamente costas, laterais, profundidade ou articulações.
Trate essas regiões como decisões de projeto quando a fonte não as mostrar; não declare fidelidade desconhecida.

| Camada | Pergunta antes de refinar |
|---|---|
| Identidade | O personagem continua reconhecível pequeno, em silhueta e sem animação? |
| Forma | Vazios, espessuras e articulações existem no meio escolhido? |
| Apresentação | Câmera, luz, fundo e sombra deixam a forma legível? |
| Comportamento | A reação informa a ação e mantém controle sobre interrupções? |
| Integração | O mesmo estado continua verdadeiro no poster, no texto e nos controles? |

## 2. Silhueta, espaço negativo e espessura

Compare contorno, landmarks e vazios em poses relevantes antes de adicionar textura ou efeitos.
Em 2D, examine paths, máscaras e alpha; em 3D, examine superfícies e oclusão ao girar.
Uma região pintada da cor do fundo não equivale a uma abertura: teste outro fundo e uma vista oblíqua.
Uma abertura real pode desaparecer por projeção ou oclusão natural em perfil. Defina em quais poses a linha de visão deveria atravessá-la; não deforme a identidade para manter o vazio visível em todos os ângulos.
Defina a espessura por região e sua posição relativa; engrossar tudo uniformemente pode apagar o caráter da referência.
Espessura é uma dimensão; topologia determina conexões, aberturas e continuidade. Corrija cada uma separadamente.
Remova faces internas coincidentes quando não servirem ao efeito; preserve superfícies internas que possam aparecer.
Verifique normais, costuras, bordas expostas e z-fighting; `DoubleSide` não reconstrói um volume ausente.
Não imponha malha fechada a ilustrações em planos: valide a geometria segundo os ângulos que o produto permite.
Para cortes, união de malhas, UV e tolerâncias geométricas, siga [fidelidade 3D](3d-reference-fidelity.md).

## 3. Apoio, sombra e pivô

Defina se o personagem repousa, flutua, está suspenso ou ocupa um plano gráfico; a sombra deve apoiar essa decisão.
Escolha separadamente objetos que projetam sombra, recebem sombra e permanecem independentes do cenário.
Um receptor transparente pode integrar sombra ao fundo; uma sombra desenhada pode bastar em 2D.
Localize o pivô pela ação: apoio dos pés, articulação, centro de rotação ou ponto de suspensão.
Pivô nos pés não prova ausência de interpenetração: inclinação, salto e deformação alteram o contato.
Teste o intervalo permitido de poses e o retorno ao repouso; procure afundamento, deslizamento e saltos de posição.
Separe base fixa e personagem móvel quando esse for o contrato visual.
Calibre suavidade, bias, alcance e resolução da sombra na escala real; não importe valores de outro objeto.

## 4. Material, iluminação e saída de cor

Especifique pigmento, resposta de superfície, luz principal/preenchimento, fundo e conversões de cor juntos.
O mesmo HEX sob outra luz, exposição, tone mapping ou composição alpha não produz necessariamente o mesmo pixel.
Registre espaços de cor das entradas e saída, renderer, tone mapping e filtros/composição posteriores.
Em 2D, registre também perfil/exportação, alpha e efeitos CSS que alterem a apresentação.
Comece com uma luz ou composição simples que revele a forma; acrescente mecanismos só por necessidade visual.
Use metal, translucidez, brilho, rugosidade ou textura quando pertencerem à identidade, sem uma preferência universal.
Compare frente, perfil e costas nos fundos e variantes previstos; não compense toda falha de contraste com luz mais forte.
Escolha uma política explícita para tema: mudar cenário, acabamento, iluminação ou uma combinação controlada.
Se houver shader próprio, confirme qual material o consome; um shader presente no projeto não descreve todos os objetos.
Os detalhes de amostragem, normais e pipeline pertencem a [fidelidade 3D](3d-reference-fidelity.md).

## 5. Rosto e expressão sem complexidade obrigatória

Defina uma pequena linguagem de expressões coerente com os traços existentes.
Paths, sprites, planos, troca de textura, blend shapes ou rig são alternativas; use a menor que cubra as poses.
Mantenha olhos e boca alinhados à superfície e à perspectiva; confira oclusão e distância em vistas oblíquas.
Quando usar placas sobre a malha, evite tanto superfícies coincidentes quanto aparência de peças flutuantes.
Modele expressão, duração e retorno como estado; múltiplos cliques não devem criar timers que restaurem expressões antigas.
Variação aleatória pode enriquecer a reação, mas fixtures devem usar sequência ou seed reproduzível.
Não dependa de expressão facial para transmitir informação necessária: preserve texto e estado acessível equivalentes.

## 6. Composição e enquadramento responsivo

Enquadre personagem, acessórios, base, sombra e área reservada aos controles como uma composição.
Defina limites de yaw/pitch/zoom ou trajetórias permitidas; valide todo esse envelope, não só a pose inicial.
Inclua salto, vapor, orelhas, mãos e outras extensões nos limites animados quando existirem.
Projete limites no espaço da câmera para decidir escala e margens; não use apenas o tamanho bruto da malha.
Compare perspectiva e ortográfica segundo o propósito, sem transformar uma delas em padrão.
Em resize, preserve pose e estado sem recortar a figura nem provocar saltos desnecessários de escala.
Teste viewport estreita e baixa, breakpoint −1/0/+1, zoom e mudanças de orientação relevantes.
`overflow:hidden` pode fazer parte da composição, mas não comprova enquadramento correto.
Mantenha texto e ações legíveis e alcançáveis antes do carregamento e durante a exploração do mascote.

## 7. Estados, tempo e interrupção

Descreva repouso, hover, reação, arraste, retorno, troca de variante, pausa e erro conforme o recurso precisar.
Para cada transição, especifique prioridade, cancelamento, reversão e estado final; evite filas de efeitos atrasados.
Uma troca pode ocorrer num instante expressivo da animação, mas seu sucesso não deve depender de a animação terminar.
Mantenha uma única autoridade para cada propriedade; mouse, timeline e loop não devem disputar a mesma rotação.
Use tempo decorrido para duração, suavização e inércia; não misture radianos por evento, por frame e por segundo.
Estime velocidade angular em rad/s a partir de deslocamento e tempo válidos; integre o ângulo com `delta` em segundos.
Para amortecimento exponencial, use `omega *= exp(-lambda * delta)`, com `lambda` em s⁻¹.
Para independência numérica entre frames, o deslocamento integrado é `omegaAnterior * (1-exp(-lambda*delta))/lambda`.
Quando `lambda=0`, use `omegaAnterior*delta`; trate timestamps repetidos e pausas sem produzir velocidades infinitas.
Ao retornar de pausa, reinicie a referência temporal ou aplique a política de retomada; não acumule um salto invisível.
Compare a mesma trajetória temporal em diferentes cadências de frames e eventos, com tolerância definida previamente.
Gatilhos, easing, frequência de repetição e alternativas discretas seguem [movimento e feedback](motion.md).

## 8. Ponteiros e preferência de movimento

Rastreie um `pointerId` ativo; um segundo toque não pode substituir silenciosamente o gesto em andamento.
Registre deslocamento horizontal e vertical desde a origem, além de tempo e caminho quando necessários.
Diferencie clique, arraste e scroll por uma regra explícita; medir só distância horizontal pode transformar scroll em clique.
Use captura quando apropriada; trate `pointerup`, `pointercancel`, perda de captura e desmontagem.
Cancelamento limpa velocidade, captura, cursor e estado sem disparar a reação de clique.
Hover decorativo exige ponteiro adequado; toque direto não deve herdar parallax do mouse.
Preserve scroll vertical quando a página o exigir e ofereça controles acessíveis para as ações relevantes.
Observe ao vivo a preferência do SO e a opção do app; não leia reduced-motion apenas na montagem.
Ao reduzir movimento, encerre hover, bob, giro decorativo e inércia já ativa; finalize a variante num estado coerente.
O arraste deliberado pode permanecer direto e sem impulso posterior, se esse for o contrato acessível do produto.
Teste mudar a preferência durante arraste, desaceleração e troca; siga a sequência de lifecycle em [motion.md](motion.md).

## 9. Poster, variante e lifecycle

Separe variante solicitada de variante efetivamente apresentada; cada variante disponível precisa de representação válida.
No caminho estático, use poster/SVG correspondente ou mantenha a última variante disponível com feedback claro.
Material, poster, fundo, rótulo e `aria-pressed` devem confirmar juntos o mesmo estado, inclusive sem WebGL.
Não troque apenas o nome do acabamento enquanto a imagem continua mostrando outro.
Preserve o poster até um primeiro frame útil renderizado com tamanho válido e estado aplicado; montar canvas não basta.
Renderizar sem erro é um marco técnico; a inspeção visual continua necessária para provar conteúdo e enquadramento.
Trate falha de import, asset e criação/perda de contexto; restaure uma alternativa coerente e permita recuperação quando útil.
Ignore resultados assíncronos obsoletos após outra seleção ou desmontagem; não deixe imports tardios recriarem cenas removidas.
Pare trabalho fora da viewport e com aba oculta; ao voltar, apresente o estado mais recente sem reproduzir toda a fila.
Se o componente for reutilizado ou remontado, defina descarte de RAF, listeners, observers, timers e recursos gráficos.
Respeite ownership de recursos compartilhados; não destrua um asset que outra cena usa.
Não acrescente uma camada de lifecycle complexa a uma ilustração estática: aplique só os contratos necessários.
Estratégias de carregamento, budgets e degradação estão em [web imersiva](immersive-web-tech.md).

## 10. Verificar e medir o resultado

Fixe conteúdo, seed, estado, câmera, fundo, viewport e DPR antes de comparar capturas.
Defina critérios de aceitação antes de ajustar: landmarks, área dos vazios, margens, contato e trajetória temporal.
Normalize medidas pela dimensão do personagem ou pelo tamanho projetado quando isso permitir comparar telas.
Separe resultado visual, funcional e tecnológico; build, contrato estático e screenshot isolada não substituem os demais.

| Grupo | Casos mínimos conforme a capacidade implementada |
|---|---|
| Forma/composição | Frontal, oblíqua, perfil/costas permitidos; menor viewport; extremos do movimento |
| Cor/estado | Cada tema × variante; troca rápida/interrompida; nome e estado acessível conferidos |
| Entrada/tempo | Clique, dx/dy, scroll, segundo ponteiro, cancelamento; cadências temporais comparáveis |
| Preferências | Reduced-motion ao vivo; inércia interrompida; teclado; alternativa estática |
| Resiliência | Sem WebGL, erro de import/asset, perda de contexto, retorno à aba e remontagem quando aplicável |
| Custo | Rede inicial/lazy, tempo até imagem útil, frame time, loops ativos e recursos retidos |

Registre CSS px, drawing buffer e DPR separadamente. Meça custo no ambiente-alvo antes de alegar fluidez ou economia.
Viewport mobile em navegador desktop é evidência de layout, não teste em aparelho físico.
Publique estado executado, resultado e limites; não amplie uma aprovação frontal para todos os ângulos ou dispositivos.

## Aplicação em referências autorizadas

Este protocolo generaliza uma auditoria de uma referência privada. O perfil factual, a identidade e as evidências privadas não são distribuídos. A edição comunitária conserva apenas o método original e transferível acima.

Ao aplicar o protocolo, produza geometria, marca e assets próprios ou com licença compatível. Silhueta, vazio real, espessuras distintas, apoio e estados coordenados precisam ser verificados na nova implementação; uma tecnologia observada não garante a qualidade do resultado.
