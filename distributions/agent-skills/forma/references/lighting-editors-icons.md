# Editores de iluminação e iconografia verificável

Esta referência reúne o contrato completo de um editor auditado e princípios transferíveis. Medidas, fórmulas e limites abaixo pertencem àquela implementação; preserve-os quando o pedido for reutilizar esse mecanismo ou reproduzir sua composição. Em outros pedidos, selecione os recursos contratados e justifique adaptações de plataforma/domínio, sem impor o editor inteiro a um simples seletor de tema. “Disciplina” é um exemplo de contexto do Pauta: no destino, use a entidade real que determina a cor.

## Perfil compacto aprovado: reprodução fiel

Quando o pedido for **igual ao editor aprovado**, use o [perfil portátil `compact-appearance-v1`](../assets/reference-profiles/compact-appearance-v1.json). Ele reúne tokens, dimensões, defaults e a transição do botão +; não exige acesso ao projeto de autoria e não é um componente executável. A fonte efetivamente escolhida pelo usuário, sua cascata final e seu estado renderizado prevalecem sobre descrições mais antigas do mecanismo. Preservar a marca do destino não justifica recolorir um controle cuja reprodução exata foi pedida.

| Condição medida | Painel | Stage | Controles |
|---|---|---|---|
| Desktop fino, viewport1440×900/DPR1 |268×374, padding6, radius16, sem borda externa|256×206, radius10|Modo30×28; reset22; menos/mais26×22; onda92×30; dial36; salvar32 de altura|
| Toque ou viewport≤680 |width360 limitado a `100vw - 24px`; em375×900/DPR1:351×442|339×206 nesse viewport; altura permanece206|Alvos44; onda92×44; dial44; salvar44; bolinha de cor20 dentro do alvo44|

As alturas totais acima são caixas observadas no estado normal, não `height` fixo a impor quando há erro ou viewport baixo. `surface=mobile` numa URL não muda o viewport nem simula ponteiro coarse. Fixe essas condições no teste. O painel ancora no workspace: `left=clamp(workspace.left+16,12,viewport.width-panel.width-12)`, `bottom=navInferiorVisível+16`; role não modal, sem scrim. Modos/reset/menos-mais conservam as âncoras da tabela abaixo durante todos os gestos.

Neste perfil, o botão Salvar é azul `#3b6fe0` claro/`#3d6fe6` escuro, texto branco; não herda automaticamente o accent da marca. Anel externo usa track`#ffffff57`, arco`#ffffffeb` e grip branco em ambos os modos. Paleta desktop pinta16px com gap6; no toque pinta20px com alvo44/gap4. Labels de intensidade/grão e status rotineiro podem ficar apenas acessíveis, sem acrescentar linhas visuais; “Mais configurações” permanece uma ação real no rodapé. Mensagem de falha não pode ser ocultada. Confira estilos computados depois das regras globais de botão, não só a classe adicionada. Tipografia do perfil: `font-optical-sizing:none` e suavização`auto`; botões usam `letter-spacing:normal`, sem herdar o tracking−.02em da base; Salvar usa line-height1.4. Fonte, ícone SVG e baseline devem ser comparados no tamanho real.

O noturno exige superfícies neutras além do wash: base`#0e0e10`, surface`#131315`, raised`#19191c`, field`#18181b`, texto branco.93 e borda branca.10. A base do gradiente é `#141417 → #08080a`; sidebar transparente revela o wash, workspace permanece opaco. Um canvas preto com cards azul-petróleo não reproduz esse conjunto. No claro, use os valores correspondentes no JSON. Brand inks de conteúdo/material 3D, dados e rotas não precisam ser alterados para aplicar essas superfícies.

Capture a referência e o consumidor na mesma escala, fonte carregada, modo, intensidade, grão, coordenadas, seleção e contexto/hold. Compare editor manual com editor manual; o fundo de página pode resolver contexto e ter outro hue. O JSON fornece critérios e números, não uma declaração de que qualquer integração já passou.

Confirme também os recursos carregados no consumidor conforme [identidade da execução](rendered-validation.md#aplicação-da-110-no-pauta--recorte-adaptação-e-identidade-da-execução): marcador de editor igual pode coexistir com CSS/JS antigos na aba. Um contexto limpo que passou não comprova atualização dessa aba. Preserve qualquer prévia não salva antes de reload; cache antigo não autoriza resetar pools nem preferências. Vincule o resultado ao comportamento exercitado, não apenas ao número da versão.

## Composição também é um contrato

Reproduzir um editor exige preservar agrupamento, ordem, escala e tipo de gesto. Equivalência de dados não basta: não transformar um painel compacto de manipulação direta em um formulário de sliders quando a referência exige reprodução. Use imagem e CSS/estrutura da mesma versão para separar superfície principal de controles avançados. Alternativas acessíveis devem complementar o padrão sem substituir arbitrariamente sua composição.

Caso da referência desktop auditada, artefato 0.19: stage pontilhado, modos no topo central, reset no topo direito, menos/mais no canto inferior direito, pools com seleção, anel de distância, faixa horizontal de cores, **onda de intensidade e dial de granulado**, descartar/salvar. A classe minificada `wash-grain` na onda não descreve sua função: o callsite passa `chroma/.09`. O dial recebe `grain`. Associar controle e comportamento exige rastrear valor e callback, não interpretar o desenho ou nome da classe.

O editor é um painel **não modal** no canto inferior esquerdo (`wash-corner`:left16px/bottom16px), com `role=dialog` sem `aria-modal`. Na reprodução deste mecanismo desktop, `wash-panel` tem268px de largura com `border-box`, padding6 e radius16; o stage resultante mede256×206 CSS px e radius10. Uma screenshot com DPR2 pode mostrar aproximadamente o dobro dos pixels físicos. Não concluir largura540px nem ampliar para360px apenas pela imagem: medir CSS, DPR, zoom e qualquer escala de captura. Se houver ampliação deliberada, registrar fator uniforme e o efeito em alvos/viewport. Na reprodução do perfil compacto aprovado acima, a variante de toque já é parte do contrato:360px limitados ao viewport e stage206. Para outros produtos sem esse requisito de reprodução, adaptações podem alterar alvos/dimensões; declare e valide os valores, sem apresentá-los como medidas extraídas. Não introduzir scrim, `showModal`, inert ou focus trap no painel não modal; o Settings completo pode ter outro contrato.

| Controle | Âncora relativa ao stage | Medidas CSS do desktop auditado |
|---|---|---|
| Modos | `top:10px; left:50%; transform:translateX(-50%)` | Cápsula94×30; chips30×28, gap1 e padding1 |
| Reset | `top:10px; right:10px` | Botão22×22 |
| Menos/mais | `bottom:10px; right:10px` | Cápsula58×26; botões26×22, gap2 e padding2 |

**Não reposicionar automaticamente esses controles conforme o pool selecionado ou sua posição.** Selecionar, mover ou adicionar um pool não troca modos para baixo nem menos/mais para cima ou para a esquerda. Esse reposicionamento foi a causa da composição divergente no Neuron. Trate eventual sobreposição e acesso por toque/teclado preservando as âncoras contratadas; adaptação de plataforma exige decisão explícita, não uma mudança implícita durante o gesto.

Claro/escuro não diferem só na cor da página. Grid: pontos1px, tile16px, posição8px, tinta.16 com opacity.55. Cápsula clara usa branco.34, borda interna branca.44, blur12px/saturate1.2; seleção branca.90 com sombra. Cápsula escura usa branco.07/borda.08, seleção branca.16 sem essa sombra. Conferir stage, cápsula, reset, ring, handles e footer na mesma preferência de modo.

Handles e swatches usam cor vívida `oklch(.72 .15 H)`, com `H=normalize(hue+pool.d)`. Não reutilizar neles lightness, chroma ou alpha do gradiente: a intensidade altera o wash, mantendo L.72/C.15 dos controles. Nos defaults, os handles têm H243 e H181; o primeiro pool claro usa L.9/C.0285 e o segundo L.85/C.038. O ponto pintado mede18px, ou28px quando selecionado; a área de toque pode ser maior sem aumentar arbitrariamente essa pintura.

## Estado composto

### Primeiro uso, reabertura e controle selecionado

Para reutilizar **este editor completo**, declare a inicialização antes de implementar os controles. A fonte numérica é `groundWash.schema` no [perfil factual](../assets/reference-profiles/desktop-material-reference-v1.json); `stops` é a lista de pools. **O padrão tem 2 pools; `maxPools: 3` é capacidade, não quantidade inicial.** Não criar três pontos decorativos distribuídos pelo stage. Preferência de modo é independente dessa contagem.

| Entrada | Resultado na abertura |
|---|---|
| Primeiro uso sem configuração ou migração legada sem lista de pools | Clonar os 2 pools do perfil: primeiro `x:-14, y:62, d:62, c:.75`; último `x:-10, y:120, d:0, c:1`. Preservar também largura, altura, fade e parâmetros por modo do perfil. Selecionar o último (`index:1`). |
| Configuração válida já salva com 0, 1, 2 ou 3 pools | Preservar a lista, posições e cores; selecionar o último quando existir. Não completar a lista até três nem repor dois silenciosamente. Lista vazia é intencional. |
| Reset de iluminação solicitado | Restaurar os 2 pools e selecionar o último; preservar `hold` conforme o contrato de reset. Não usar reset como migração implícita. |

Os números `x/y` acima estão no espaço do modelo `−45..145`, não são porcentagens CSS diretas. Use a transformação modelo↔stage descrita abaixo; não limitar os defaults a `0..100` nem tratar valores negativos como dados inválidos. No primeiro uso, os demais valores são `hue:181`, `chroma:.038`, `grain:0`, `hold:false`. A intensidade apresentada é `round(chroma/.09*100)`: `.038` corresponde a **42%, não5%**, e o mínimo é0. Preserve o chroma exato ao apenas exibir/reabrir; o arredondamento do rótulo não deve reescrever o modelo. Uma paleta de três cores pastéis ou grain pré-ativado não é esse padrão; uma adaptação solicitada deve ser declarada.

Ao importar dados brutos da referência, distinguir seu marcador legado `plain:true` para vazio intencional: nesse formato, `stops:[]` sem marcador recebe defaults. O consumidor pode representar vazio explicitamente por `pools:[]`, sem copiar esse marcador, desde que documente a migração e preserve essa intenção ao salvar/reabrir. Uma captura com três pontos ou intensidade5% não prova inicialização errada: confira a origem e a versão do estado. Não resetar preferências válidas para forçar2/42; separar teste de primeiro uso, reabertura e reset solicitado.

**Com 2 ou 3 pools, renderizar imediatamente o anel de distância e seu grip no pool selecionado**, inclusive na primeira abertura e em toque/teclado. Não depender de hover, arrasto prévio, abertura de configurações avançadas ou clique adicional. O contorno branco da bolinha só indica seleção: não substitui o anel externo com arco e alça. Com 0 ou 1 pool, esse anel não aparece porque não há outro ponto a afastar; não inventar um pool para exibi-lo.

São operações diferentes: **arrastar o centro posiciona** o conjunto (Alt move só um); **girar o grip do anel ajusta a distância** entre pools; **menos/mais remove/adiciona** pools, não faz zoom. O dial inferior pontilhado controla grain. Não fundir essas operações num único slider ou trocar seus rótulos. Verifique visibilidade, recorte, contraste, hit target e foco do anel no stage real.

### Edição e persistência

Separar configuração global, pools, preferência de modo, contexto e draft. Clonar profundamente arrays/objetos antes de editar; cópia superficial faz cancelamento vazar alterações. Configuração legada sem pools recebe defaults; lista vazia intencional preserva ausência. Definir limites e comportamento de dados corrompidos sem executar strings vindas do storage.

Último pool como âncora: somar seu offset ao hue global e subtrair dos outros, preservando cores absolutas. Ao remover a âncora, normalizar novamente. Hue0 é válido; não usar `value || default` para números. Add/remove deve tratar0,1,2,3 e máximo3.

Arrasto de conjunto preserva deslocamentos; Alt capturado no início move só um pool. Coordenadas normalizadas0..1 mapeiam para−45..145, arredondadas a uma casa. O centro selecionado segue a posição absoluta do ponteiro limitada ao stage, e o delta move os demais: estes **podem sair da área**. Não limitar o conjunto pelo pool mais extremo. A normalização no Save deve preservar coordenadas finitas válidas produzidas pelo editor, inclusive fora do stage; limite de interação não é limite universal dos dados.

No **perfil fiel**, pinte cada centro com a coordenada real `(modelo+45)/190*100%`, inclusive quando o resultado sai de0..100%. O stage recorta os pontos externos. **Não limite sua posição visual, não crie um representante tracejado e não cole as luzes à borda:** isso mantém dados corretos, mas altera as distâncias aparentes e faz o grupo mover de modo diferente. `overflow:clip` impede o scroll interno provocado pelo foco sem mudar coordenadas. Um mecanismo acessível de recuperação pode existir fora do canvas; qualquer representante dentro do stage é uma alternativa para outro contrato, não reprodução100% deste perfil. A solução de proxies registrada na1.17.1 foi revista por esse motivo.

| Ação | Selecionado | Outros pools | Invariante a medir |
|---|---|---|---|
| Arrastar centro, sem Alt | Segue o ponteiro limitado ao stage | Recebem o mesmo delta; podem sair e ser recortados | Todos os vetores relativos permanecem iguais, dentro da quantização |
| Alt + arrastar centro | Segue o ponteiro; Alt fixado no início | Imóveis | Somente x/y do selecionado mudam |
| Setas no centro |±1 unidade do modelo; Shift±10 | Mesmo delta, exceto com Alt | Não usar .01 normalizado nem limitar ao stage por teclado |
| Girar anel | Âncora permanece imóvel | Escala radial pelo raio absoluto solicitado e ajuste à borda | Raio/vetores de todos conferidos, sem translação da âncora |
| + | Novo pool recebe seleção | Posições anteriores permanecem | Só o novo pool é inserido; ordem/perfil também conferidos |
| Trocar modo ou cor | Coordenadas permanecem | Coordenadas permanecem | Hue/luz não provoca reposicionamento |

Fixture discriminante: defaults → + → arrastar o terceiro selecionado para `(85%,80%)` do stage. Ordem do modelo resultante: `(120.5,165)`, `(116.5,107)` selecionado, `(124.5,223)`. Os outros pontos ficam aproximadamente em `(87.1053%,110.5263%)` e `(89.2105%,141.0526%)` do stage e devem ser recortados. Mostrá-los em torno de84% na borda é divergência, mesmo que o JSON preserve as coordenadas. Capture **todos os pontos antes, durante e depois**, não somente o centro selecionado.

Distância é outra operação: o pedido é um raio absoluto0..150; a âncora selecionada fica fixa e os outros vetores recebem `scale=min(requested/current,fitDaBorda)`. Não aplicar contração incremental especial para pontos externos, pois isso muda a operação aprovada. O anel só existe com pelo menos2 pools; armazena ângulo anterior, acumula deltas desembrulhando±180°, sem alterar valor no pointerdown. Não converter o primeiro clique diretamente em distância absoluta. Alcance0..150; teclado±2, Shift±10. Se o raio atual é menor que.5, distribuir os outros verticalmente: `x=selected.x`, `y=clamp(selected.y-requested*(i+1)/others.length,-45,145)`, com uma casa decimal; não usar leque angular. O anel usa SVG60×60, centro30, raio24, stroke2.5; grip9px. Controles circulares precisam nome, valor, limites, teclado e foco visível; Home/End podem ser melhoria acessível declarada.

O alvo do anel é separado da pintura: wrapper pointer-events:none, botão60×60 com hit region em anel externo r30/furo r17. A sensibilidade é `deltaGraus*150/360`. Há histerese de borda no original: o pedido acumulado cresce mesmo quando geometria já limitou o raio, exigindo voltar esse excesso antes de aparecer movimento. Na implementação aprovada atual, essa histerese já foi corrigida: a cada movimento, clamp do acumulador a0..150; calcular raio aplicado com `Math.hypot` sem arredondar; reconciliar somente se `abs(requested-applied)>.15`. Não substituir o acumulador pelo valor inteiro mostrado no rótulo: movimentos pequenos desaparecem. Essa regra integra o perfil aprovado, embora seja uma melhoria sobre a fonte original auditada. Evitar regras genéricas de botão/handle herdadas pelo hit target invisível.

Adicionar insere antes da última âncora e seleciona o novo índice (`oldLength-1`, ou0 ao sair do vazio). **A terceira luz tem perfil próprio, não uma cópia da primeira.** Direção=`first−second`, ou `(−4,−58)` quando existe só uma; origem=pool com menor y; posição=origem+direção, x/y arredondados a1casa. Escolha o primeiro offset de `[120,−120,62,−62,180]` com diferença absoluta≥24 para cada `pool.d`, fallback120. Perfil novo: `c:.85,w:118,h:58,fade:74,light:{l:.88,a:.8},dark:{l:.45,a:.75}`. Do estado inicial, o + produz ordem de hues `[243,301,181]`, novo ponto `x:−18,y:4,d:120`, índice1 selecionado, anel visível e + desabilitado no máximo3. No stage normalizado, o novo centro é `(27/190,49/190)`. Hue301 não ativa a amostra308 quando a seleção usa diferença<6; não alterar a cor só para acender uma amostra.

Teste a transição completa: screenshot e modelo com2 → + →3 → mudar cor da nova luz → distância → remover → salvar/reabrir. O mero aparecimento de uma terceira bolinha não prova posição, blend, perfil, ordem de camadas, seleção ou anel. Não impor uma distribuição simétrica.  Remover seleciona0 no compacto; abertura/reset selecionam a última âncora. Escolher cor com zero pools recria1 pool. Reset só aparece quando o estado difere do padrão, ignorando hold, e preserva hold. Rail rola96px, desabilita setas nos extremos e aplica fades condicionais22px. Atualizações de DOM não podem apagar foco lógico do pool.

Grain é uma camada do fundo, nunca filtro sobre texto. Zero pools ainda pode ter base/highlight/grain. Hold bloqueia contexto, não desliga o fundo. **Stage mostra configuração manual; fundo da página pode resolver a cor contextual.** Se ambos passarem pelo resolvedor contextual, a amostra escolhida e o handle mudam enquanto o gradiente continua com outra cor. Mostrar fonte do contexto e manter accent independente. No Pauta, cor da coleção vira cor da disciplina da tarefa selecionada: adaptação de domínio, não extração automática de imagens.

Composição superior→inferior: grain quando>.005, highlight do modo, pools na ordem, base do modo. Pool usa9 amostras `t=i/8`, alpha=`modeAlpha*(1-t*t*(3-2*t))`, stop%=`t*min(100,fade*1.25)`, cor OKLCH por modo. Grain é SVG160×160 com fractalNoise, frequência.85,3 oitavas, stitchTiles e saturação0; alpha=`grain*.42` no claro ou `grain*.36` no escuro, arredondado3casas. Duas cores em sRGB ou ruído aplicado à árvore inteira não são equivalentes.

Quantização faz parte da comparação: offset de hue/stop% a1casa, alpha/multiplicador de chroma a3casas. Arredondar o multiplicador antes do produto não equivale a arredondar o chroma final. Fixture claro independente: primeiro pool L.9/C.0285/H243; alphas `[.85,.813,.717,.581,.425,.269,.133,.037,0]`; stops `[0,11.3,22.5,33.8,45,56.3,67.5,78.8,90]`. Use números esperados recuperados do contrato em testes, não snapshot gerado pelo próprio helper.

Onda: viewBox92×30; `y=15+sin(x/92*PI*7.5)*(1.5+v*11)`, `v=chroma/.09`; thumb10px entre5px e width−5px. Pointer clampa `(clientX-left-5)/(width-10)`; teclado±.05 normalizado. Dial: viewBox36×36, centro18, raio15, arco270°, ângulo−135°+grain*270°; track pontilhado1/3, arco ativo após.005, tick raio9→15. Fora do arco mantém extremo conforme lado do valor anterior. Labels anunciam intensidade/granulado0..100, enquanto armazenamento conserva suas unidades reais.

Migração de renderer é distinta de reset. Se preferências antigas usam um renderer sRGB que impede a fidelidade solicitada, altere o renderer com versão e conversão idempotente, preservando IDs, coordenadas, cores/hues, quantidade0..3, intensidade0 e grain. Na conversão percentual deste perfil, `chroma=strength/100*.09`:5 permanece5%, não42%. Grave backup da configuração original antes da primeira gravação migrada; se o backup ou save falhar, não sobrescreva o original. Verifique o navegador que já tem dados, além do primeiro uso isolado. A decisão histórica da1.17.1 de conservar o renderer antigo não é uma regra universal de fidelidade.

Transações: a referência desktop observada estaticamente escreve com debounce e reverte no descarte. O Pauta mantém gravação explícita ao salvar. Não copiar persistência incidental quando o contrato do produto exige outra coisa. Reset só iluminação preserva hold; reset geral tem outro escopo. Falha de save deve ser perceptível também na versão compacta, nunca esconder a mensagem de erro com CSS de simplificação.

## Ícones são assets de interface, não caracteres tipográficos

REA do renderer da referência desktop identificou **dois caminhos**, não uma única família universal:

- `Je` (`R@147501`): SVG inline, viewBox24×24, currentColor, stroke2, linecap/linejoin round, máscara com ID por instância, aria-hidden e focusablefalse.
- `Fs` (`R@280107`): `span.fig` com largura/altura declaradas e asset no `--fig`; CSS pinta `background:currentColor` através de mask/−webkit-mask centralizada/contain/no-repeat. O seletor de modo do editor usa Fs com size14. Assets24×24 combinam stroke2 arredondado e partes preenchidas; convertê-los integralmente em outline muda a silhueta.

Silhuetas verificadas nos três assets: sistema é laptop com tela x4.5..19.5/y4..14.5/r2.5 e base separada preenchida x2.5..21.5/y18..20.75; claro tem disco preenchido r3.6 e8raios r7.5→9.5; escuro tem crescente preenchido, raio externo8.75. Reset possui arco circular e ponta triangular preenchida. Um monitor com haste, sol vazado, lua só contornada ou seta ortogonal são diferenças de desenho, não simples ajuste de tamanho.

Isso comprova técnica/callsite, não biblioteca ou autoria upstream. Identificar origem/licença requer evidência própria. Ausência da string Lucide não prova que nunca existiu no fonte original. Reproduzir geometria convencional com assets próprios é distinto de copiar marca/pacote proprietário.

No produto: definir uma família SVG consistente, dimensões ópticas, stroke, variante fill, alinhamento e estados. Não usar Unicode/emoji como substituto de ícones de monitor, sol, lua, voltar, reset, busca ou navegação. Podem variar por fonte/SO e produzir símbolos incorretos. Atalhos tipográficos como ⌘ continuam texto quando essa é sua função.

SVG decorativo é aria-hidden; botão contém nome acessível e hit area independente do tamanho do desenho. Conferir todos os callsites, incluindo nós criados por JS, modais e navegação mobile. Não inserir SVG não confiável via innerHTML; restringir templates a um registro estático local. Copiar uma marca ou pacote proprietário não é necessário para aplicar convenções geométricas.

## Regressões do contrato completo

Execute para o editor completo contratado; para uma capacidade parcial, selecione os casos afetados e declare o que ficou fora do escopo. Ausência de um recurso não solicitado não é defeito; ausência de um recurso solicitado não pode virar N/A.

- Cancel após mudar propriedade aninhada, remover pool, trocar contexto e editar cor da disciplina.
- Medir caixas renderizadas em relação ao stage antes/depois de selecionar, mover, adicionar terceiro pool, trocar claro/escuro e reabrir. Conferir topo/centro/direita/baixo e insets contratados em CSS px, com tolerância declarada; presença dos botões ou nomes de classes não comprova posição.
- Primeiro uso/migração sem lista: 2 pools nas posições do perfil, último selecionado e anel com grip visível **antes de qualquer gesto**; nunca 3 por confundir limite com default.
- Reabrir estados salvos com 0/1/2/3 pools e intensidade5%: manter dados; anel ausente em 0/1 e presente no selecionado em 2/3. Testar também toque, sem hover; não usar reset implícito para aprovar o padrão.
- Reset explícito volta aos 2 defaults com anel; adicionar terceiro comprova também hue301/posição(−18,4)/perfil próprio/ordem e seleção; remover até1 oculta apenas o anel, mantendo arrasto de posição.
- Salvar/reabrir/recarregar0 e3 pools; migração anterior; NaN/Infinity; hue0; âncora removida.
- Contexto cromático muda iluminação; neutro/ausente usa fallback; hold impede mudança.
- Grain0 e acima do limiar; tema claro/escuro; modo sistema e movimento reduzido.
- Anel sem salto no pointerdown, wrap±180°, pools coincidentes e limites próprios.
- Arrasto grupo/individual e teclado: medir TODOS os pontos antes/durante/depois, com offsets de grupo preservados, outros imóveis sob Alt, passos1/10 no modelo e clipping real; geometria fora do stage sobrevive Save/reload sem clamp visual nem de dados.
- Tab/Shift+Tab e foco programático após produzir/reabrir ponto fora do stage: preservar coordenada real e recorte sem proxy, `scrollLeft/scrollTop:0`, âncoras estáveis e recuperação operável. Fixture `x:1.3` normalizado (equivalente a202 no modelo): style.left continua130% antes/depois de Save/reload, não84% por um inset artificial.
- Onda altera chroma e dial altera grain; stage manual continua coerente com swatch sob contexto ativo.
- Primeiro uso/reset anuncia42% mantendo chroma.038; variar intensidade conserva a cor vívida dos handles/swatches e altera o wash. Zero e salvar/reabrir preservam suas unidades e intenção.
- Adicionar/remover mantém seleção correta; zero→escolher cor recria pool; reset visível apenas quando necessário.
- Teclado em anel/dial/onda, alvos/foco, rail/fades/extremos, painel estreito e ausência de bloqueio modal indevido.
- SVGs realmente renderizados em todas as superfícies; nenhum glifo decorativo restante.
- Mensagens de falha, cancelamento e alterações pendentes continuam acessíveis no painel compacto.

Registre resultado e evidência por versão do produto de destino e contexto exercitado. Testes anteriores de modelo/persistência não comprovam novas correções, todos os navegadores nem paridade integral. Não eternizar número de testes ou screenshot antigo como certificação da skill.

Base verificável: referência desktop auditada, artefato 0.19.0, renderer `index-BmRclq7u.js` SHA256 `038a8f7cbd96a203799799468673ce7bdb1e3f2c6ef32dcae36672876925a184`; CSS `index-BqoLgPgv.css` SHA256 `fce4673ea10a877cc77ee8eefbf91a1ee6e72d2323d8c4f9c59030a9bf01ac5a`. Offsets são caracteres zero-based do texto decodificado. Auditoria estática determina contrato do build; não prova execução visual em todos os estados.

Regressão de precisão do anel: um giro de10° dividido em90 movimentos, com o anel inteiramente dentro do stage, deve responder como o mesmo giro contínuo dentro da quantização do modelo. Na fixture medida,58→62;58→58 denuncia descarte dos deltas subinteiros. Compare também mouse e toque emulado, inversão perto da borda e todos os pools durante o gesto.
