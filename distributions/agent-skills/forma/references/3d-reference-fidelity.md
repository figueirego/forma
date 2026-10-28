# Fidelidade de objetos 3D: do pacote ao pixel

Use quando a mesma biblioteca, as mesmas cores ou uma proporção parecida ainda produzem um objeto diferente. Este protocolo complementa [objetos reutilizáveis](reusable-objects.md) e [fidelidade de referência](reference-fidelity.md). Os números da referência desktop abaixo pertencem ao artefato 0.19.0 auditado em 26/10/2026; não são defaults universais. O [caso de polimento do livro](book-polish-case-study.md) resume diagnóstico, correções, testes e limites, com rastreabilidade das capturas no histórico externo do resultado aprovado pelo usuário; reutilize o método, não os parâmetros como receita para qualquer objeto.

## 1. Fixar identidade antes de procurar outra tecnologia

Identifique separadamente instalador → aplicativo/payload → ASAR → módulo → asset → runtime. Preserve originais, tamanho, SHA-256, seleção analisada e base dos offsets. Versão igual não prova bytes iguais; bytes diferentes não provam algoritmos diferentes.

No artefato desktop fornecido, o ASAR do DMG é byte a byte igual ao instalado no Mac. Os módulos Windows `LibraryBook`, `clothweave`, `bookforge` e o CSS têm o mesmo texto após normalizar somente referências de assets com hash e escapes CR antes de LF nas strings GLSL. As 33 WOFF2 de renderer comparadas são iguais. O renderer principal completo não recebeu prova de equivalência semântica. Hashes, regras e limites estão no [perfil factual](../assets/reference-profiles/desktop-material-reference-v1.json).

Tecnologia identificada: Electron 42.11.12, Three 0.186.0, malha embutida com UV/normais, `ShaderMaterial` Phong customizado, texturas procedurais/atlas, cena WebGL e cópia para Canvas2D. DLLs ANGLE/Direct3D/Vulkan no Windows são componentes empacotados; não demonstram qual backend foi utilizado. Extração estática não valida instalação, driver, FPS ou renderização no Windows.

## 2. Contrato mínimo de cada parâmetro

Rastreie **declarado/configurado → consumido → usado no shader/layout → observado em runtime**. Um uniform presente ou um `Texture.repeat` configurado não prova seu efeito. Para cada campo, registre:

| Campo | Exemplo de especificação útil |
|---|---|
| Origem e certeza | Módulo + hash + byte UTF-8 base zero; confirmado estático, inferido, observado ou proposto |
| Consumidor | Expressão que lê o valor e branch que a utiliza |
| Domínio/unidade | UV local ou atlas, centímetros ou malha normalizada, CSS px ou pixels do buffer |
| Região/canal | Frente, lombada, verso, papel; difuso, height, normal, máscara ou reflexão |
| Transformação | Matriz UV, escala, espaço de cor, composição e ordem das operações |
| Estado | Repouso, hover, arraste, saída; calibração fixa ou recalculada |
| Verificação | Medida, fixture, tolerância acordada e evidência; pendente se não executada |

Exemplo: “bump .006” está incompleto. É preciso declarar qual mapa, unidade física da malha, UV efetivamente amostrado, combinação com o relevo customizado e perturbação de normal. Na referência desktop auditada, base/custom são combinados por overlay antes de uma única perturbação; duas perturbações sucessivas produzem outro resultado.

## 3. Trama e registro por face

**Confirmado no código:** textura base 256×256, 32 ciclos por eixo, pesos .58/.42; difuso com ruído interpolado em grade 4×4 e amplitude .055. `repeat` recebe aproximadamente 4.338446×3.298071, mas o shader auditado passa e amostra UV bruto, sem a matriz correspondente.

**Inferência estática, ainda sem captura do shader executado:**

| Face | Extensão UV | Ciclos inferidos na região |
|---|---|---|
| Frente | .4346×.7545 | 13.9072×24.1440 |
| Verso | .4346×.7544 | 13.9072×24.1408 |
| Lombada | .0834×.7364 | 2.6688×23.5648 |

Amostre uma linha de 512 pontos em cada região, fora do padrão/foil, e registre orientação/período. Confirme o caminho em runtime ou mantenha a classificação de inferência. Uma tolerância inicial de ±1 ciclo pode acomodar extremidades parciais, mas precisa ser aceita no projeto. Reutilizar 60 ciclos completos em todas as faces torna a lombada muito mais densa que a capa. Aumentar bump não resolve frequência ou registro.

**Gerador e consumidor são contratos diferentes.** Na tensão do tecido auditado, o campo periódico é gerado em 96×96, mas a expressão consumida amostra `s(0,f)`: X fixo, somente Y varia. O resultado efetivo é uma tensão 1D suave. Trocar isso por ruído independente em X/Y muda o material, mesmo mantendo resolução, seed e amplitude. Já o grão de pigmento usa campo periódico 4×4 bidimensional. Verifique amostras determinísticas, continuidade e coordenadas realmente lidas; não conclua dimensionalidade pelo tamanho do gerador.

### Bordas e cortes: UV precisa representar a superfície

Uma textura lisa pode virar estrias quando o UV perde uma dimensão. No Pauta, a projeção `(x/W+.5, y/H+.5)` servia para a frente, mas era reutilizada nos cortes de páginas: topo/base variam em X/Z e têm Y constante; a lateral varia em Y/Z. A espessura Z não alterava UV, produzindo mapeamento de posto 1 e repetição de uma única linha de trama. Blur, menos bump ou outra cor apenas esconderiam a causa.

Para uma superfície texturizada bidimensional, inspecione a área UV de cada triângulo não degenerado e a variação ao atravessar a espessura. Use ilhas coerentes por face: largura/espessura no topo/base, altura/espessura no corte lateral. Separe vértices nas costuras quando necessário, sem fazer um triângulo atravessar duas ilhas; preserve posições e normais quando a correção for só de unwrap. Verifique o UV **efetivo após** a transformação de região no shader: armazenar UV local com transformação ou UV de atlas com identidade são alternativas, não etapas cumulativas. Compare frequência nas duas direções e confirme visualmente as vistas rasantes. No caso aprovado, esse ajuste eliminou áreas UV nulas e estrias fortes sem alterar a geometria do papel.

## 4. Profundidade, normais e padrões

Malha válida e silhueta plausível não garantem a luz do canal da lombada, ombro ou cantos. A referência fornece suas próprias normais. Na região frontal auditada, que inclui transições, 85 de 396 vértices têm `abs(normal.y)>.001`. A contagem não é uma meta: a propriedade relevante é a continuidade da orientação na superfície.

Compare cortes horizontais e verticais em regiões planas, canais e extremos; 2%, 5%, 50%, 95% e 98% são uma amostragem inicial, a adaptar ao objeto. Registre silhueta, posição/profundidade do canal, ângulo das normais, continuidade capa/bevel e contato com páginas/lombada. A faixa de brilho descreve a orientação da superfície: um canal com altura próxima e normais diferentes produz outro highlight. Antes de alterar intensidade de luz, compare curvatura e normais com iluminação fixa.

A curvatura em Y deve existir **onde o perfil a exige**, não no campo impresso inteiro. A correção aprovada removeu a deformação ampla da capa e manteve o plano até a transição localizada do aro. Densificou a amostragem no canal e substituiu o chanfro linear por arredondamento segmentado; não aumentou uniformemente toda a malha. Vértices duplicados sem regra de normais podem criar uma costura luminosa. Contar normais não nulas não substitui conferir sua localização, direção e continuidade.

### Derivadas da normal: verificar a equação consumida

O shader customizado do livro da referência desktop usa derivadas espaciais **cruas** para os vetores tangentes (byte 756887 do `bookforge` Mac). O mesmo bundle também contém o helper stock do Three com derivadas **normalizadas** (byte 171104). A primeira ocorrência de um nome de função não identifica o caminho usado pelo componente.

No helper normalizado, passar apenas `deltaHeight * bumpScale` perde o comprimento físico por pixel. Para conservar o resultado do helper cru, dividir cada delta pelo comprimento da derivada espacial correspondente antes da perturbação, ou usar uma implementação original matematicamente equivalente. Testar tangentes ortogonais/oblíquas, escala de objeto e resolução; explicitar a política numérica em derivadas degeneradas. A amplitude `.07 * W/15.8778` sozinha não prova equivalência.

Fixture ideal: largura física Pauta 1.84, frente projetada 248px, uma transição completa por pixel, trama desligada. Height 128→95 corresponde a 8,053° com a fórmula física, mas apenas 0,06015° no helper normalizado sem compensação; 128→54 dá 17,604° versus 0,13488°. São cálculos ideais, dependentes de amostragem, não medições universais de screenshot. A checagem algébrica executada em 1000 casos de tangentes/escala encontrou erro angular máximo 3,2e-15° entre as duas fórmulas compensadas fora do clamp. Não prova compilação GPU ou aparência. Um limite inicial proposto de 1e-4° permite regressão numérica sem exigir identidade de bytes.

### Fechamento: superfície visível e fronteiras compartilhadas

Meça primeira interseção externa, não somente extremos de vértices. O papel auditado tem corte externo fonte `z=-7.5973`, capa externa `z=-7.9181`: recuo `.0202043104W`. O valor antes usado `z=-7.3398` era interior e superestimava o recuo. Head/tail em `|y|=10.1677` dão inset `.0195115192W`. As seções amostradas não sustentam concavidade no centro do corte.

O pé da lombada tem ponte: inset desde a borda da capa ≈`.014681W` na esquerda nominal, `.000932W` em 1,2%W e `.019512W` em 2,5%W. É medição de seção inferior, não regra de simetria universal. Uma ponte original pode usar esses limites; o raio de chanfro deve ser identificado como proposto quando não foi medido.

Testar cada mesh fechado **e** a união visível entre meshes. As fronteiras da tampa e do bevel precisam compartilhar a mesma discretização antes da deformação: muitos vértices na tampa e um segmento reto longo no bevel abrem uma fresta no canal curvo. Soldar só as normais ou usar DoubleSide não reconstrói o volume. Separar três verificações: fechamento/orientação das arestas e triângulos não degenerados; primeiro contato externo e sobreposição entre peças; direção/continuidade das normais. Uma malha fechada pode continuar com perfil ou reflexo incorretos.

Verificar raios oblíquos de frente/verso, alto/baixo, concentrados na junção suspeita. Historicamente, 400 raios verticais inferiores passaram no Pauta, mas um raio oblíquo revelou um filete branco. O reparo manteve a discretização compartilhada; o polimento posterior trocou o leque central da ponte por faixas que acompanham a parede lateral. Passaram 841 raios na região antiga e o fechamento das quatro malhas. Lados, verso e cortes receberam evidência visual própria no [caso aprovado](book-polish-case-study.md). Quantidade de raios sozinha não prova cobertura de todas as direções ou proporções.

Para cada um dos seis padrões, separe forma, espaçamento, máscara, sinal do relevo, borda e escala física. Capture difuso e height isolados, depois luz rasante em frente/lateral/verso. Linha escura pintada e cavidade não são equivalentes. Defina tolerâncias sobre perfis e sombras; igualdade de quantidade de vértices não é critério. Reconstitua geometria original a partir de perfis mensuráveis, sem incorporar arrays proprietários.

### Objetos articulados: localizar a superfície e preservar o encaixe

Quando “a lombada” parecer uma tira ou a capa engolir as folhas, identifique primeiro a peça visível: corte do miolo, pele externa da dobra, forro, aro e canto livre podem se sobrepor na projeção. Uma vista anotada ou isolamento temporário por cor reduz a ambiguidade. Verifique frente e verso; corrigir uma única vista não estabelece que a fronteira compartilhada esteja certa.

Capa envolvente é uma casca: exterior e interior unidos pela espessura, não um preenchimento da corda externa sobre o miolo. Faces, aros e terminais devem compartilhar contornos, espaço local e precisão. Dimensões locais fracionárias não são intercambiáveis com medidas inteiras nem com uma caixa já projetada por transform. Em objetos articulados, confira também a ligação e a tangente durante o movimento, não apenas em repouso.

Com geometria aprovada, sensação de pouca espessura pode vir de grão fraco ou luz uniforme. Separe amplitude/escala do grão da resposta angular. Em uma superfície segmentada, registre U por comprimento e calcule luz nos vértices compartilhados; reiniciar a textura ou dar uma cor constante diferente a cada faixa cria costuras. Uma extensão plana de textura só substitui terminais quando a superfície ocupada for equivalente. Raio zero, dimensões e luz do [caso do passaporte](passport-polish-case-study.md) são parâmetros locais, não defaults para outro objeto.

Meça transformação rígida, deformação e pintura separadamente, mantendo todas as escritas na conta total. Atualize consumidores diretos somente quando seus dados mudarem; confirme ausência de trabalho em repouso. Uma máscara custosa em centenas de superfícies não justifica proibir máscaras em qualquer UI. Replay Node e intervalos RAF não medem GPU/FPS; confirme separadamente a percepção no renderer.

## 5. Metal, papel e cor têm caminhos próprios

**Composição:** registre qual operando escolhe o ramo de cada mistura. Overlay não é comutativo: `overlay(grão, pigmento)` pode dar outro resultado que `overlay(pigmento, grão)`. No material auditado, o grão decide multiply/screen; trocar os operandos altera a distribuição de luz sem mudar o hex. Teste a expressão instalada no shader com canais escuros/claros e amostras intermediárias antes de compensar exposição.

**Foil da referência:** máscara somente na marca; campo 2D com seis stops dourados e iluminação radial. Seno/cosseno usam normal perturbada e posição de vista não normalizada, detalhe 2.2 e tamanho UV (.14,−.19). Mistura .6; especular base .04 + cobertura×1.72. Copiar números para uma rampa de duas cores ou normalizar a posição de vista altera o percurso do brilho. Escalar a malha exige compensar coordenadas em unidades físicas.

Em uma máscara linear de cobertura, região sem metal deve ser zero verdadeiro e antialias deve preservar valores entre 0 e 1. Distinga cobertura, valor codificado e resultado do consumidor: `10/255≈0,0392` é zerado por `step(.1,mask)`, portanto fundo não nulo sozinho não prova halo nesse caminho; o mesmo threshold destrói coberturas intermediárias. Remover o threshold exige também corrigir o fundo ou decodificar um offset comprovado. Especular base e contribuição mascarada são termos separados.

Ao extrair um campo de reflexão do atlas, derive escala e orientação a partir do recorte e do `flipY` real das texturas. Na correção Pauta, ambos os `CanvasTexture` usam `flipY=true`: o V separado passou a `1−(.19/.197)×(.5+.5×cos)`, evitando uma inversão dupla. Essa fórmula pertence àquele recorte; para outro atlas, teste os cantos de origem/destino e derive sua transformação. Contar inversões no código sem compor upload, recorte e amostragem não determina a orientação final.

Compare poses `yaw=-60,-30,0,30,60`, `pitch=0,28.65`, com luz e calibração constantes. Registre cor média, centroide do highlight e ordem dos máximos da mesma máscara. A forma de uma marca própria é adaptação de identidade; avalie a função óptica com uma máscara de teste autorizada. Não invente uma tolerância de pixels após olhar o resultado.

**Papel da referência:** pigmento #f6f1e5 em região lisa do atlas, no mesmo material do restante da malha. Base difusa/bump, shininess 8 e refletividade .04 continuam ativos onde custom bump é neutro e foil é zero. Isso não pede listras de folhas. Compare corte frontal/superior/inferior em yaw 0/45/90; papel sem grão, shininess 1 e especular zero constitui outro material. Se as estrias persistirem após corrigir o grão, verifique a dimensionalidade UV das bordas descrita acima, mantendo material/luz constantes para isolar a causa.

**Cor:** registre pigmento, espaço das texturas, conversões e saída. A referência usa mapas `NoColorSpace`, saída linear sRGB e compensação de luz baseada na normal frontal de repouso, limitada a .62–1.5. “Exposição .7” aqui não é `toneMappingExposure`. Ao girar para inspeção, manter a calibração inicial evita reiluminar cada face e perder a diferença entre frente e verso. Nome do hex sozinho não determina a aparência.

## 6. Tipografia de capa e lombada

Confirme o arquivo de fonte selecionado por `@font-face`, eixos, peso, estado de carregamento e métricas antes de rasterizar. O renderer usa Inter Variable, variante `inter-latin-opsz-normal` de 72920 bytes; o `inter-latin-wght-normal` de 48256 bytes presente na extensão é outro asset. “Inter” não identifica a variante. O perfil registra o hash da variante do renderer.

Frente: título .078 da largura frontal, Inter 500, até três linhas; metadado .34 do tamanho do título; inset .105 da largura. Lombada e verso têm composição própria. Na lombada auditada:

- Título/contador aparecem somente no difuso; não criam relevo customizado. A marca inferior tem máscara/relevo/foil.
- Centralização usa `actualBoundingBoxAscent/Descent`, compensação UV e rotação.
- Início do título ≈5.2241% da altura do strip; fonte ≈3.2444% dessa altura.
- Medir e reservar contador + marca antes de aplicar reticências. Não comprimir glifos com `fillText(..., maxWidth)` como substituto de layout.

Fixture: `Teste / 01288`, depois nome longo com contador de 5 e 8 dígitos. Compare atlas plano e objeto inclinado. No canal custom height da lombada, texto deve permanecer neutro #808080 fora da marca se esse for o mecanismo escolhido; trama base é outro canal. Baseline/centragem podem usar tolerância inicial proposta de ±1 pixel de textura, explicitamente distinta de CSS px.

## 7. Resolução em três etapas

Registre separadamente **atlas → buffer da cena → saída final**. “2×” sem denominador é ambíguo.

Na referência desktop auditada, `LibraryBook` passa `min(DPR,2)` e o motor aplica supersampling adicional 2 antes da cópia. Em DPR2, o buffer WebGL chega a 4 pixels por CSS px em cada eixo e o Canvas2D de saída a 2. O BookObject revisado usa `resolution:'reference'` por padrão: multiplicador `renderScale * clamp(DPR,.25,2)`, com `renderScale` 1–2 (padrão 2) e limite 2048 por eixo. `resolution:'economy'` usa somente `renderScale`. O detalhe entrega WebGL diretamente, sem a cópia/downsample Canvas2D da referência: é uma adaptação de apresentação e orçamento, não igualdade do pipeline. A revisão anterior usava 2 por CSS px independentemente do DPR; essa diferença é baseline histórico, não descrição do candidato atual.

Meça rect CSS, tamanho do canvas, drawingBuffer, DPR, resolução do atlas e escala após limites em DPR1 e DPR2. Compare fontes inclinadas, diagonais e padrões no mesmo tamanho projetado. Subir 2×→4× quadruplica a quantidade de pixels do buffer; avalie custo antes de adotá-lo. Não prometa FPS, memória exata ou resolução de todos os defeitos só por aumentar o buffer.

## 8. Gesto e transição fazem parte do objeto

O perfil registra hover 11°/7°, arraste .42° por px, suavização 120ms, dt limitado a 64ms e poses. Esses valores precisam das mesmas convenções de eixo/Euler, origem do gesto, viewport, estado de captura e tratamento de release/leave. Compare trajetórias com coordenadas/tempos iguais; uma screenshot não demonstra movimento.

A referência desktop interpola posição/escala, pose 3D e cor do tecido durante 460ms. FLIP 2D isolado não reproduz essa transição. Verifique interrupção, scroll/resize, troca de cor em movimento, toque, teclado e reduced-motion. No mobile, separar rolagem de arraste e fornecer controles de pose; declarar adaptação quando o gesto mudar.

## 9. Ordem de implementação e aceite

1. Fixar build/hash, fonte carregada, conteúdo, paleta, pose, luz de repouso e DPR; desabilitar variação aleatória nas fixtures. Guardar baseline antes de editar.
2. Para cada discrepância, registrar sintoma → mecanismo suspeito → medida que o distingue → menor patch. Corrigir silhueta/canal/normais antes de compensar luz; verificar UV e escala física antes de trocar textura ou bump.
3. Criar regressão que falhe no defeito e passe no patch. Separar álgebra/material, geometria real sem GPU, ciclo de vida e imagem renderizada; uma classe não substitui outra. Alterações de UV devem preservar posição/normal, e de material devem preservar os canais não envolvidos. Para proteger um arco, medir posições do perfil: um chanfro linear também pode ter normais suavizadas intermediárias. Confirmar que reverter somente o mecanismo corrigido faz a regressão falhar.
4. Comparar novamente em poses estabilizadas e condições iguais; aguardar o estado final, não um timeout arbitrário durante interpolação. Inspecionar todas as faces relevantes, cortes e junções, acrescentando vistas rasantes onde apareceram defeitos. A matriz de 32 poses do caso Pauta é exemplo de cobertura por amostragem, não número universal nem prova de infinitos ângulos.
5. Medir viewport CSS, rect do host, DPR e buffers **observados**. Se um override não se aplicar, ajustar o harness ou declarar o limite; um iframe com viewport CSS medido pode validar responsividade, mas não toque, hardware mobile ou aplicativo nativo. Corrigir erros do harness sem atribuí-los ao produto.
6. Conferir resolução/custo e preservar gesto, fallback, reduced-motion e descarte. Depois do último patch, vincular código, testes e capturas por hash; se diferirem só em comentário, registrar e verificar essa diferença. Revalidar as dimensões afetadas em vez de reutilizar aprovação de uma versão anterior.

Para cada dimensão, publicar referência, implementação, medida, tolerância acordada, resultado e pendência. Não alargar a tolerância para aprovar um patch que falhou; revisar a causa e corrigir. Manter diferenças intencionais de marca e adaptação explícitas. Aprovação estética do usuário é aceite daquele resultado, não identidade de pixels, prova de todas as variantes ou benchmark de desempenho.

### Evidência do ciclo aprovado

O [caso de polimento](book-polish-case-study.md) reúne o baseline `0d34c0b4726e`, a revisão final `17bf1f572d0e`, 32 poses, testes e revisão independente. A versão final passou 176 testes Pauta e inspeção responsiva em viewports CSS observados de 390×844 e 1280×900. Aberturas e estrias fortes não reapareceram nas poses registradas; persistem pequenas diferenças de aro, junção papel/lombada e marca. O aumento de 25.132 para 33.436 triângulos foi contabilizado, sem benchmark GPU. Esses números documentam aquele ciclo; novas adaptações devem gerar evidência própria.
