# Passaporte articulado: encaixe, couro e luz

Caso aprovado em 27/10/2026, incorporado à Forma 1.17.0. Consulte para corrigir capa que parece uma tira, canto que desce, folhas que se separam durante o gesto ou couro sem leitura de volume. O método geral continua em [fidelidade 3D](3d-reference-fidelity.md); este caso acrescenta o diagnóstico de um objeto articulado existente.

## O que foi aprovado e o que está disponível

O usuário aprovou o Neuron v03.17.1 após correções sucessivas de geometria, textura e iluminação, e pediu incorporar o conhecimento à skill. O mecanismo é **CSS 3D/DOM articulado**, com superfícies de espessura, capas, miolo e folha segmentada durante a virada. Não é o BookObject/Three distribuído, não usa shader PBR e não simula fisicamente couro ou papel.

Esta referência e o [manifesto](../assets/audits/passport-polish-2026-10-27/manifest.json) distribuem conhecimento, parâmetros contextualizados e hashes. **Não distribuem um componente PassportObject**, o aplicativo, perfis de usuário, fotografias de documentos ou capas nacionais. Para executar o passaporte original, é necessário seu projeto; para aplicar as lições, esta síntese é autossuficiente. O [BookObject](reusable-objects.md) continua com seu próprio contrato e código inalterados.

## Sintoma → causa → correção → prova

| Sintoma observado | Causa identificada no projeto | Correção e verificação discriminante |
|---|---|---|
| “Uma tira colada sobre as folhas” | Uma tampa preenchia o contorno da dobra por uma corda; a parede de raiz fechava a capa como placa independente | Representar pele externa, forro e espessura entre os dois contornos. Evitar preencher o espaço do miolo. Conferir seção oblíqua e identidade da superfície visível, não só frente |
| Quina/fresta no encontro das peças | Faces usavam dimensões CSS fracionárias; aros usavam `clientWidth/clientHeight` arredondados | Usar a mesma medida local para faces e aros, obtida no resize. Testar endpoints e folgas em dimensões fracionárias; não ler layout por frame |
| Ponta da contracapa descia enquanto a frente parecia correta | Terminal interpolava uma raiz reta e outra arredondada | Alinhar os contratos de raiz de frente, verso, forro, aro e papel. Neste caso, ambas as raízes ficaram retas e o terminal preservou X/Z até o plano de corte; cantos livres conservaram arredondamento |
| Capa/folha se afastava da encadernação no arrasto | Gesto/projeção e superfícies de ligação não compartilhavam a trajetória desenhada | Manter a costura da folha no miolo e ligar o painel móvel por sulco flexível. Fazer capa, dobra e juntas usarem os mesmos pivôs; arrasto segue a projeção da ponta real. Testar ida, retorno, interrupção e abertura parcial |
| Textura repetida em faixas estreitas | Cada face recomeçava em U=0; terminais externos não tinham grão | Acumular U pelo comprimento efetivo, sem contar a sobreposição usada contra emendas. Pintar couro continuamente até o corte quando as superfícies forem geometricamente equivalentes. Testar registro em estados fechado, intermediário e cancelado |
| Depois de suavizar, couro parecia fita fina sem corpo | Relevo/opacidade reduzidos e pigmento quase constante escondiam a curvatura já correta | Reforçar moderadamente o grão e calcular luz nos vértices do arco, compartilhando as cores entre faces. Comparar rotação com geometria congelada; não engrossar automaticamente o objeto |
| Arrasto travava | Máscaras em centenas de triângulos e atualizações de superfícies sem mudança aumentavam o trabalho | Pintura triangular equivalente sem as máscaras, cache de geometria/folha e invalidação por propriedade. Medir separadamente nós, geometria, material, layout, RAF e pintura real do navegador |

O usuário chamou regiões diferentes de “lombada”. Identificar primeiro a superfície por vista anotada ou isolamento temporário: faixa curva, corte do miolo, aro, raiz da capa e canto livre têm causas distintas. Projeções quase colineares podem enganar. Não transformar o termo usado pelo usuário numa escolha prematura de qual peça editar.

## Geometria aprovada é um contrato local

No resultado final: capa de 0,45 px CSS, envelope fechado de 4,74 px, papel recuado 1,5 px, raiz reta, cantos livres de 13 px, arco em 12 faixas e 624 triângulos nos terminais. São unidades/modelo deste protótipo, não medidas reais de passaporte nem defaults para outro livro.

Invariantes úteis: encontro das fronteiras, espessura correspondente, nenhuma capa atravessando o papel e a mesma seção no terminal reto. A regra “raio zero” vale para esta raiz aprovada; não exige cantos retos em todos os objetos. Depois do aceite geométrico, as revisões v03.16/v03.17 preservaram constantes, posições e funções de gesto.

A pintura externa contínua funciona aqui porque todas as linhas do terminal mantêm exatamente o mesmo X/Z das faces centrais. Estender as 12 faces até os planos de corte e deixar os triângulos externos sem pintura é equivalente **nesta geometria**. Se o terminal tiver curvatura longitudinal real, essa substituição deixa de ser válida: mapear a textura na superfície curva. Núcleo claro e forro continuam materiais separados.

## Volume percebido sem uma nova camada

Na v03.16, a textura da borda tinha relevo SVG 0,85, opacidade 0,22 e pigmento entre 96–100%; o usuário percebeu falta de corpo. A v03.17 usa `feTurbulence` periódico, frequência 0,28/0,32, três oitavas, seed 8, `surfaceScale=1.65` e opacidade 0,38. O grão é uma imagem SVG compartilhada, combinada por soft-light; não um filtro vivo aplicado a cada elemento. A escala de 122 px e esses valores precisam ser recalibrados conforme tamanho projetado, material e renderer.

Para este arco, no vértice j: `theta = PI*(1-abertura)*j/N`, normal local `(-sin(theta), 0, -cos(theta))`. Transformar a normal pela mesma orientação do objeto; no CSS usado, a aplicação é roll → yaw → pitch. Uma luz fixa calcula sombra ampla e reflexo largo, de baixa intensidade. Gerar N+1 cores e usar o mesmo valor no fim de uma face/início da seguinte evita bandas de pigmento. A fórmula e os coeficientes do manifesto são uma aproximação visual deste consumidor, não equivalência ao shader de outro produto.

Atualizar somente quando abertura/orientação mudar, diretamente nas 12 faces. Cachear a pintura final para evitar escritas idênticas. Não propagar variáveis de material por um ancestral com centenas de descendentes. Translação e repouso não exigem recalcular a luz direcional; posição de luz pontual teria outro contrato.

## Verificação e custo registrados

- **Geometria e gesto:** regressões de seção uniforme, contornos, espessura, ligação durante abertura, cancelamento e remoção de trabalho pendente. Não são prova de simulação física.
- **Material:** teste de continuidade entre faces e resposta ao giro, sem alterar transform/width/U. No baseline a resposta de luz ao giro era ausente; após a correção, está presente. A suíte do Neuron registrou 89 testes aprovados.
- **Renderização final:** frente, verso, lombada fechada, capa mantida em 50% e giro por teclado, em navegador local. O laboratório usa gesto sintético e dados demonstrativos; isso não equivale a toque físico. Perfil principal carregou CSS e módulos 3.17.1 sem erros observados.
- **Replay Node, 59 frames:** girar passou de 354 para 617 escritas de estilo (263 de material), sem novas escritas de geometria/layout/nós; abertura acrescentou 304 escritas de material. Mover e virar folha mantiveram o custo anterior; RAF ficou vazio após repouso. Custo de pintura não pode ser removido da contagem total só por não ser geometria.
- **Limites:** nenhum benchmark GPU/FPS da revisão final, nenhuma matriz universal de países/temas/dispositivos, nenhum ensaio físico mobile nesta revisão. Tempos de máscaras de uma geometria intermediária não são desempenho da geometria final.

O manifesto fixa hashes do código e das evidências externas. Os 89 testes pertencem ao produto aprovado, não à validação estrutural da skill. Uma cópia da skill continua utilizável sem a pasta de autoria, mas não pode afirmar que reexecutou o passaporte sem o consumidor. Em nova integração, produzir evidência nova e colher aceite visual próprio.

## Folhas, divisória e conteúdo — aprendizado posterior até v03.23.0

Esta extensão registra correções posteriores ao manifesto v03.17.1; não altera seus hashes nem transfere seu aceite para novas poses. Fonte: conversa, código e documentação de integração do Neuron. Nenhum componente novo é distribuído aqui.

**A página começa na dobradiça; o texto começa no seu inset.** Não confundir margem editorial com início da superfície física. O papel deve cobrir continuamente costura → trecho curvo → folha, dos dois lados. Uma faixa central plana com sombra não substitui duas superfícies que chegam à mesma encadernação. Defina posição e tangente compartilhadas na junção da curva com a folha; manter raiz presa, altura superior/inferior compatível e volume suave sem mover arbitrariamente o pivô da virada para a margem do conteúdo. Avalie espelhamento geométrico separadamente da assimetria legítima do texto.

No consumidor, curvas de ligação entre costura e folha usam amostragem concentrada nas extremidades para evitar uma quina na transição, sem aumentar indiscriminadamente o número de faces. A textura e a sombra usam coordenadas contínuas pelo comprimento efetivo. Reiniciar o fundo em cada faixa ou incluir a sobreposição antialias no comprimento acumulado causa linhas, estiramento e mudança de tom. O inset do texto não deve criar outra borda, sombra ou textura na folha plana.

**Linha clara é um sintoma, não uma causa única.** Inspecione imagem da capa, contorno CSS, rasterização entre faces, direção da face pintada e forro atravessando a capa. No mecanismo inspecionado, a sobreposição que elimina frestas do papel também pode vazar no fechamento: limitar sua extensão pela distância ao plano interno móvel. Não eliminar a linha da frente criando a mesma linha no verso, nem usar escala/blur para esconder interseção. Conferir frente, verso, vista rasante e etapas de abertura com luz/tema fixos; registrar as poses efetivamente amostradas, sem prometer todos os ângulos contínuos.

**Conteúdo bonito precisa caber na folha útil.** Dimensione gravuras/SVG pelo retângulo da página após insets e faixa de dobra, com viewBox contendo a arte inteira. Recorte só quando intencional e aprovado. Para dados extensos, estabeleça hierarquia: identidade, informação essencial, ação e decoração. Reduza texto secundário ou remova sua apresentação quando autorizado, mantendo dados editáveis; não esprema tudo até ficar ilegível. Arte pode enriquecer áreas livres sem competir com foto/nome e sem representar progresso fictício. Teste nomes/objetivos longos, foto ausente, todas as folhas e estados intermediários da virada; clone usado na animação deve manter o mesmo conteúdo e enquadramento da folha estável.

**Enquadramento e gesto pertencem ao consumidor.** Use dimensões disponíveis do painel e o envelope projetado da abertura, não apenas a largura fechada do livro. Separe orientação/posição de apresentação dos dados persistidos do perfil. Quando gesto direto substituir modos explícitos, arbitre canto de página, superfície e controle clicável; mantenha alternativa por setas/teclado e redução de movimento. Cancelar, redimensionar ou trocar dados durante o movimento não pode soltar a raiz ou deixar cópias antigas da folha.

Verificação transferível: fronteiras/tangentes e não interseção em testes geométricos; continuidade de pintura em poses fixas; gesto com ida/volta/interrupção; resize com ambas as folhas abertas; conteúdo extremo em todos os spreads; inspeção do arquivo servido. Os registros v03.23.0 relatam 148 testes do produto e janelas desktop de 800×600 a 1440×900. São evidências históricas dessa revisão, não execução atual da skill, garantia de FPS ou validação de instalador nativo.
