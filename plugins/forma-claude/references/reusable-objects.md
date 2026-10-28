# Objetos reutilizáveis: da referência ao componente

Use quando o pedido exigir a técnica adaptável, não só a aparência de um caderno, livro, cartão ou embalagem. Declare o limite: um motor de livro fechado atende caderno, álbum e relatório; não vira editor de páginas, qualquer malha 3D ou app nativo automaticamente.

Quando o pedido exigir reutilizar o mecanismo já aprovado e o objeto couber nesse contrato, integrar o BookObject distribuído. Adaptar conteúdo, proporções e identidade pela API, preservando malha, UV, normais, materiais e ciclo de vida aprovados; não reescrevê-los por aproximação especulativa. Conservar a marca e a stack do consumidor. Um pedido genérico de “perfil” não determina um livro ou passaporte. CSS 2.5D é válido para uma composição independente adequada ao pedido ou um fallback solicitado/aceito, mas uma capa inclinada em CSS não atende por si só ao reúso explícito do mecanismo 3D.

## Extração por responsabilidades

1. Identificar mecanismo comprovado: CSS, Canvas, malha, shader, textura, câmera e eventos. Separar evidência da referência e implementação original.
2. Separar conteúdo (`title`, subtítulo, marca), geometria (largura/altura/espessura), material (cores/padrão/asset), comportamento (pose/gestos) e integração (persistência/ações).
3. Manter o contrato pequeno: `create → update/setPose/reset/dispose`. Separar alteração de conteúdo/material da inspeção de pose. Injetar loader/dependência já usada pelo projeto. Não embutir armazenamento, dados de pessoa, marca ou CSS global do produto original.
4. Dar exemplos com proporções diferentes e validar nome extremo, fonte carregada, resize e desmontagem. Trocar apenas a cor de uma cópia fixa não demonstra reúso.

Ao incorporar um refinamento aprovado, conservar junto ao componente a cadeia **sintoma → causa medida → patch → regressão → comparação renderizada**. O [caso do livro Pauta](book-polish-case-study.md) mostra como transformar um ajuste visual em conhecimento reutilizável. Normal, UV, mistura e ciclo de vida são mecanismos transferíveis; raio, paleta, pose e número de subdivisões daquele livro precisam de nova justificativa em outro objeto.

## Gate obrigatório de fidelidade à referência

Quando o pedido for “igual à referência” ou equivalente, um livro genérico funcional não atende ao aceite. Antes de implementar, fixe a referência, sua identidade/versão e os estados relevantes. Registre cada afirmação como **observada em runtime**, **confirmada estaticamente**, **inferida** ou **proposta de adaptação**. Hashes e callsites confirmam o artefato analisado, não a aparência da sessão aberta. Um shader encontrado no bundle não prova que foi executado na tela comparada.

Monte a matriz abaixo e estabeleça tolerâncias por dimensão **antes** de julgar o resultado. Use medidas coerentes com a evidência: proporção/ângulo ou pixels CSS para forma e enquadramento; valores e papéis de cor quando extraídos; duração/curva e trajetória para movimento. Informe viewport, DPR, tema, dados e instante da captura. Tolerância escolhida é uma decisão do projeto, não uma norma universal; não a alargue depois para aprovar a implementação. Dimensão sem evidência suficiente permanece não verificada.

| Dimensão independente | Comparar e registrar |
|---|---|
| Geometria | Silhueta, proporção, espessura, lombada, capas, páginas, cantos e relevos; não apenas uma caixa com textura |
| Projeção e composição | Tipo de câmera, perspectiva, enquadramento, pose inicial, ocupação do host e relação com título/ações |
| Paleta | Cor base, tinta, páginas, contraste e diferença entre tema/accent e cor do objeto; comparar estados equivalentes |
| Shader e material | Origem de cor/relevo/reflexo, escala e direção da trama, iluminação, roughness e máscaras; separar resposta angular de brilho pintado |
| Gestos | Alvo e eixos, amplitude, ganho, captura/cancelamento, hover versus drag e resultado após soltar/sair |
| Transições | Gatilho, trajetória, velocidade, amortecimento, repouso e interrupção; mesma pose final não prova mesmo movimento |
| Adaptação | Estante/detalhe, desktop/mobile, nome longo, touch, reduced-motion e fallback; identificar toda diferença intencional |

Execute a comparação em **repouso, hover, arrastar, soltar e sair com o ponteiro**, tanto na **estante** quanto no **detalhe** quando esses comportamentos existirem. “Não existe na referência” exige evidência, não um N/A automático. No mobile, registrar o gesto equivalente ou a adaptação que preserva a tarefa. Captura estática valida apenas o instante; gesto/transição requer sequência ou observação direta. Conservar referência e implementação lado a lado com os mesmos dados, dimensões e estado, sem substituir o resultado pela captura da referência.

O aceite exige resultado separado por dimensão e estado: aprovado dentro da tolerância, divergente, adaptação explicitada ou não verificado. Nenhuma média pode esconder divergência material. Presença de Three/WebGL, testes de descarte, acessibilidade ou fallback correto não aprovam fidelidade visual e comportamental. Se o usuário rejeitar uma diferença como “livro genérico”, reabra a matriz e investigue a dimensão divergente; não acrescente efeitos arbitrários nem transforme a implementação rejeitada em padrão da skill.

## Caso auditado: livro da referência desktop

O [perfil factual](../assets/reference-profiles/desktop-material-reference-v1.json) registra o artefato instalado, hashes e parâmetros. A inspeção distinguiu malha própria, UV em atlas, normais, dois mapas difusos, dois mapas de relevo e máscara de foil em ShaderMaterial com iluminação Phong. Isso não equivale a escolher MeshPhongMaterial e aplicar os mesmos números de luz.

Três erros concretos devem reprovar a reprodução:

1. **Cor correta com pipeline diferente.** Textura sRGB, textura sem conversão, saída linear, intensidade das luzes e compensação de exposição alteram a cor final. Compare essa cadeia antes de alterar o hex para esconder o erro.
2. **Folhas e relevo inventados.** Uma textura de listras adicionada a um bloco de páginas muda a referência, assim como usar linhas Bézier no padrão de hastes ou preto pintado no lugar de rebaixo. Inspecione material, topologia e mapa separadamente.
3. **Envelope no container errado.** O livro auditado expande o canvas e usa bleed negativo em torno do tamanho nominal. Encaixar todo o giro dentro do mesmo slot encolhe o objeto. Meça slot, canvas e silhueta renderizada separadamente. No mobile, reserve espaço para o envelope ou adapte a escala; não esconda cortes com overflow indiscriminado.

A transição estante/detalhe inclui posição, escala, pose e cor do tecido na referência. FLIP apenas de posição/escala é uma implementação parcial e precisa ser identificada assim. A comparação de movimento deve conter ida, volta, interrupção, arrastar/soltar/sair e modo reduzido, além da imagem em repouso.

Frente, lombada e verso também são contratos separados. A frente auditada usa título em até três linhas, metadado à direita acima do divisor e marca no alto; a lombada tem título, contador real preenchido até cinco dígitos e marca inferior; o verso contém somente a marca central. A largura da fonte é relativa à região UV frontal, não ao atlas inteiro. O [perfil factual](../assets/reference-profiles/desktop-material-reference-v1.json) conserva proporções, rasterização e âncoras de código. Esperar a fonte ou invalidar a textura após seu carregamento é necessário: redesenhar uma textura antiga não atualiza métricas. Comparar texto com o mesmo nome, contagem e tamanho projetado antes de aumentar resolução ou relevo.

Rastreie **configurado → consumido → renderizado**. No artefato auditado, a textura base recebe `repeat`, mas o shader customizado amostra UV bruto sem a transformação correspondente. Os valores configurados não comprovam frequência efetiva da trama. Registre UV local versus atlas, unidade e região por face; reutilizar o mapa inteiro da frente em uma lombada estreita muda sua densidade. A inferência estática da amostragem precisa permanecer distinta da captura do shader/textura realmente executados.

## Caso de conhecimento: passaporte articulado

O [caso do passaporte](passport-polish-case-study.md) cobre casca envolvente, terminais retos, encadernação durante o gesto, textura contínua e luz que revela a curvatura. É uma implementação CSS 3D/DOM do produto de origem, distinta do BookObject. A skill inclui o aprendizado e o manifesto, sem exportar um `PassportObject` ou fornecer o aplicativo. Preserve o motor adequado já aprovado no consumidor; não atribua a este caso shader, física ou API que ele não tem.

## Implementação disponível: BookObject

“BookObject aprovado” identifica a revisão do componente original aceita no Pauta e registrada no caso de refinamento abaixo. Não significa aprovação do aplicativo de referência nem certificação de equivalência entre os dois motores.

Para detalhes de lombada, profundidade, papel, foil ou nitidez ainda divergentes, aplicar [fidelidade 3D do pacote ao pixel](3d-reference-fidelity.md). A auditoria 1.11.1 registrou um baseline de seis diferenças: UV/trama, função óptica, papel, height/layout da lombada, resolução Retina e continuidade de normais. O [ciclo de polimento aprovado](book-polish-case-study.md) corrigiu depois o canal/aro, a mistura e o foil, além do UV degenerado nos cortes do papel. A síntese distribuída registra revisão, testes e diferenças restantes; as capturas pareadas ficam no arquivo externo de autoria e podem não acompanhar a skill. A aprovação do usuário vale para esse resultado observado; os contratos abaixo permitem reúso e não certificam igualdade de pixels ou todas as adaptações.

[Motor original](../assets/book-object.js), extraído do Pauta e testado com Three.js 0.186.0. É um exemplo de componente reutilizável; não é o livro da referência desktop nem comprova equivalência com ele. Não contém código, texturas ou marca dessa referência. Canvas2D estático funciona sem dependências; volume usa Three fornecido pelo consumidor. Manter a licença MIT do Three ao redistribuir sua dependência. Para um pedido de fidelidade, aplicar o gate acima antes de considerar este exemplo adequado.

### Exemplo mínimo: capa estática

Sem `loadThree`, o resultado é Canvas2D. `interactive:true` sozinho não cria volume nem habilita giro. Copie o asset para o caminho servido pelo projeto; este exemplo não precisa de Three nem de botão de reposição.

```html
<script src="book-object.js"></script>
<h2>Caderno de campo</h2>
<div id="cover-static" style="width:100%;height:360px" aria-hidden="true"></div>
<script>
const staticBook = BookObject.create(document.querySelector('#cover-static'), {
  title: 'Caderno de campo', brand: 'ESTÚDIO', color: '#315463'
}, {interactive: false});
// Ao desmontar: staticBook.dispose().
</script>
```

### Integração de volume: loader ativo

O caminho do import abaixo deve resolver o módulo ES de Three **já disponível no consumidor**, com seus arquivos associados. Ajuste-o ao loader/bundler existente; não instale nem carregue uma segunda engine automaticamente. O asset expõe a API global `BookObject`, não um export ES nomeado.

```html
<script src="book-object.js"></script>
<h2 id="title">Caderno de campo</h2>
<div id="cover" style="width:100%;height:360px" aria-hidden="true"></div>
<button id="reset">Repor posição</button>
<script type="module">
const book = globalThis.BookObject.create(document.querySelector('#cover'), {
  title: 'Caderno de campo', subtitle: '12 observações', brand: 'ESTÚDIO',
  brandMark: 'monogram', spineLabel: '00012',
  color: '#315463', inkColor: '#fbfbfc', pagesColor: '#f6f1e5',
  pattern: 'grid', material: 'cloth', finish: 'foil',
  width: 1.84, height: 2.53, depth: .36,
  pose: {pitch: 9, yaw: -18, roll: -2}
}, {
  interactive: true,
  loadThree: () => import('./vendor/three/three.module.js')
});
document.querySelector('#reset').onclick = () => book.reset();
// book.update({title: 'Pesquisa em campo', depth: .2});
// Inspecionar o verso, conservando a calibração de luz da pose inicial:
// book.setPose({yaw: 180}, {preserveLighting: true});
// Atualize também o título DOM. Ao desmontar: book.dispose().
</script>
```

`create` retorna a instância imediatamente com a capa de fallback; a API atual não oferece uma promise `ready`. O loader e a primeira renderização são assíncronos e aguardam host na viewport, aba visível e ausência de `data-materials="static"` no elemento raiz. Para verificar volume, dê dimensões reais ao host, torne-o visível e aguarde `book.renderMode === 'webgl'` com limite de tempo no teste; não faça essa asserção logo após `create`. Confirme também o canvas visível e o volume renderizado no navegador. Loader resolvido ou estado `webgl` isolado não certificam fidelidade.

Com reduced-motion do SO ou `data-motion="reduced"`, o volume pode renderizar, mas os gestos e a interpolação ficam desativados; não force movimento para passar o teste. Verifique giro/reposição sob a política normal e a pose estática sob a política reduzida. `canvas`, `canvas-unavailable` e `canvas-context-lost` são estados de fallback, nunca aprovação da entrega 3D; registre a causa ou o limite encontrado. Preserve esse fallback para falhas e preferência estática, sem substituir silenciosamente o mecanismo solicitado.

| Contrato | Limites |
|---|---|
| `create(host, config, {loadThree?, interactive?, renderScale?, resolution?})` | Host com dimensões; retorna instância síncrona, sem promise `ready`. `loadThree` fornece o namespace Three, diretamente ou por promise. Sem loader: capa Canvas2D, sem import automático. `renderScale` 1–2, padrão 2; `resolution:'reference'` padrão multiplica DPR limitado a .25–2, `'economy'` usa somente renderScale; buffer ≤ 2048px por lado |
| `update(patch)` | Atualização parcial de conteúdo/material refaz textura/volume. Se contiver apenas `pose`, usa a atualização de pose sem reconstruir mapas ou malha |
| `setPose(patch, {preserveLighting?})` | Atualiza a pose configurada sem recriar mapas/malha; encerra o gesto. Por padrão recalibra a iluminação para a nova pose; `preserveLighting:true` mantém a calibração anterior durante inspeção |
| `reset()` / `dispose()` | Repor a pose configurada atual / desmontar de forma idempotente. Loader tardio não cria cena; descarte no mesmo tick nem inicia o loader |
| `config` / `renderMode` | Cópia normalizada / estado `canvas`, `webgl`, `canvas-unavailable`, `canvas-context-lost`, `disposed` |
| `normalize(patch, base?)` | Validação sem DOM; cor somente `#RRGGBB`, enumerações e valores finitos |
| Geometria | Largura 0.6–4, altura 0.6–5, espessura 0.08–0.9, unidades relativas; câmera recalcula enquadramento |
| Texto e marca | Título até 240, subtítulo 120, marca 40 e `spineLabel` 12 caracteres. `brandMark:'text'` desenha a marca textual; `'monogram'` usa seu primeiro code point. Não recebe logo/URL arbitrários |
| Padrão | `panels`, `grid`, `rules`, `dots`, `stems`, `checks` |
| Material/acabamento | `material:'cloth'|'paper'|'leather'`; `finish:'foil'|'ink'`. Defaults `cloth` e `foil`; foil restrito à marca, sem metalizar título ou capa inteira |
| Cores | `color`, `inkColor`, `pagesColor` em hex; defaults `#3d4934`, `#fbfbfc`, `#f6f1e5`. `palette:null` ou `{deep,lit,edge}` em hex; `null` remove a paleta anterior |
| Pose | Graus; pitch ±60, yaw ±180, roll ±18. Mapeamento interno `(-pitch,yaw,-roll)`, ordem Euler `ZXY`; soltar mantém giro transitório, sair retorna à pose configurada |

Valores fora de faixa são limitados; inválidos conservam o anterior. A capa abrevia títulos em até três linhas, portanto título integral e ações permanecem no DOM. Contraste entre cores livres é responsabilidade da interface consumidora. URL/SVG/estilo arbitrário não são entradas de cor.

`spineLabel` é conteúdo explícito, não uma contagem derivada pelo motor. O consumidor calcula o total correto, formata-o e mantém a informação completa acessível; `String(total).padStart(5,'0')` preserva números maiores que cinco dígitos, mas o campo do componente tem limite de 12 caracteres. Não confundir total da biblioteca, total filtrado e ID. Uma marca própria, mesmo com posicionamento semelhante, é uma adaptação de identidade.

`setPose` altera a pose de repouso: após `setPose({yaw:180})`, `reset()` volta a 180°. Para restaurar o enquadramento inicial, o consumidor guarda esse preset e chama `setPose` novamente. Ao inspecionar frente/lateral/verso, preserve a calibração de luz: recalibrá-la a cada orientação altera o material aparente e prejudica a comparação angular. Consumidores anteriores que passavam sinais Euler diretamente precisam revisar `pitch`/`roll`, não inverter coordenadas silenciosamente.

## Cor automática portátil

O helper original `PautaLibraryColors`, distribuído em `assets/library-colors.js`, é independente do BookObject e do DOM. `resolve({id,color,dark})` retorna `{base,deep,lit,edge}` em hex; `auto({id,dark})` ignora cor explícita, e `palette` contém 20 cores nomeadas. Passe `base` a `BookObject.color` e as demais variações a `BookObject.palette`. Ele aceita `#RGB`/`#RRGGBB` explícitos, inclusive legados fora da paleta, e os normaliza; ausência, `null` ou valor inválido usa cor automática. Não é parser CSS geral.

Persistir `color:null` conserva a intenção automática. Resolver novamente quando o tema mudar e aplicar o mesmo resultado em estante, detalhe e indicador de biblioteca; não gravar o hex calculado como escolha manual. A opção `dark` modifica apenas a ramificação automática. O helper usa FNV-1a sobre ID, matiz estável por ID e variações OKLCH convertidas/limitadas a sRGB. O alocador frontend `Sv` da referência desktop auditada recebe a lista inteira e resolve colisões de matiz; nosso helper permite matizes repetidos para que reordenar/adicionar bibliotecas não altere a existente. A referência também preserva como explícita no material apenas a paleta reconhecida e mantém CSS OKLCH. Essas adaptações impedem prometer coincidência cromática exata com qualquer lista da referência desktop auditada.

## Mapas e resposta do material

Cor impressa, relevo e reflexão têm responsabilidades diferentes. Escolha canais segundo o modelo de iluminação: PBR pode usar metalness/roughness; Phong usa resposta especular e shininess. Gere mapas separados quando houver funções distintas: texto no mapa de cor não deve automaticamente virar relevo, e uma capa com detalhe metalizado não deve receber esse acabamento por inteiro. Height/bump ou normal descreve a superfície; a máscara limita o reflexo ao acabamento. Um gradiente pintado no fallback comunica acabamento, mas não comprova reflexão física.

No BookObject, tecido, papel e couro variam microestrutura e relevo. A versão aplicada ao Pauta usa `MeshPhongMaterial` estendido por `onBeforeCompile`: pigmento, bump customizado, trama e máscara especular têm funções separadas; o foil acrescenta resposta angular dourada procedural somente na marca. Isso é uma implementação original com Phong, não um material PBR controlado por metalness/roughness nem o `ShaderMaterial` completo da referência desktop auditada. Nomes internos históricos de canais não estabelecem a equação usada pelo renderer. O fallback pinta o acabamento, sem resposta óptica física.

A malha procedural e seus UV/normais são próprios; frente, verso e lombada têm mapas separados, e o bloco de páginas usa pigmento liso com grão/bump base e resposta Phong. A implementação atual conserva 15 texturas por cena: 9 mapas específicos de frente/verso/lombada, 3 tiles compartilhados de trama/grão/reflexão, 2 mapas neutros de apoio e 1 de papel. A contagem deve ser conferida após mudanças, sem ser tratada como orçamento universal. Não foram distribuídos a malha embutida, o atlas de reflexão, as texturas ou o shader proprietário da referência. Igualar algumas proporções e coeficientes não elimina diferenças de silhueta, mapeamento, combinação de bump, luz e antialiasing. A fidelidade desses aspectos continua sujeita à matriz, sem alegação de “100% igual”.

O relevo exige unidade física e equação de normal compatíveis: o shader customizado da referência usa derivadas cruas, enquanto o helper público Three normaliza os vetores. A extensão atual compensa o delta de height pelo comprimento da derivada espacial; testes de fórmula e debug de normal devem preceder aumentar preto ou bump. A faixa de brilho da encadernação depende também da curvatura geométrica: amostragem concentrada no canal, aro arredondado e campo impresso plano produzem respostas diferentes de uma capa inteira curvada ou de mais luz global.

Tampa e bevel precisam compartilhar fronteiras antes da deformação. Verifique fechamento/orientação, primeiro contato entre peças e normais separadamente: uma malha fechada pode ter ponte com perfil incorreto; raios em uma direção não certificam toda união visível. O recuo de papel medido na primeira superfície externa é `.020204W`, não o antigo `.0364W`; o microchanfro procedural continua uma adaptação. No papel, as ilhas UV dos cortes variam também pela espessura. Usar X/Y para todas as faces colapsa o corte superior/inferior e lateral em uma linha de textura, criando estrias artificiais. A correção duplica apenas costuras e preserva posições/normais; não pede desenhar mais folhas.

Nos materiais, preservar a ordem do overlay, a cobertura antialiased da máscara e a transformação do foil considerando recorte/`flipY`. Um campo gerador 96×96 não implica consumo 2D: a tensão do tecido deste caso lê X fixo e varia Y. Esses contratos estão detalhados no [protocolo 3D](3d-reference-fidelity.md), com diagnóstico antes de qualquer compensação por cor, blur ou intensidade de bump.

Atualizações de pose/câmera devem reutilizar geometria e mapas; recriar texturas a cada movimento mistura responsabilidades e eleva o custo sem alterar o conteúdo.

| Adaptação | Alterar | Preservar |
|---|---|---|
| Caderno | Padrão, título e espessura | Dados editáveis, fallback, foco e descarte |
| Álbum | Proporção horizontal, cor, metadados | Fit pela geometria/host e texto integral fora da textura |
| Relatório | Menor espessura, linhas, marca | Ordem de leitura e ações independentes da cena |
| Embalagem não retangular | Substituir geometria/usar GLB licenciado | Política de qualidade, variantes e estados; exige outra implementação |

## Custo e ciclo de vida

Estantes usam Canvas2D; apenas detalhe selecionado cria WebGL. Um contexto por item não escala a centenas de objetos. Importar Three e iniciar renderização são decisões diferentes. Este asset não roda animação contínua em repouso, usa `renderScale` 1–2 com DPR no modo `resolution:'reference'` e sem DPR no modo `'economy'`, buffer limitado a 2048px por lado e ResizeObserver; isso não estabelece um orçamento universal nem FPS medido.

O fallback da estante sugere espessura com Canvas2.5D; não reproduz a projeção física de uma cena 3D. A referência desktop auditada usa renderer compartilhado e snapshots Canvas2D, enquanto o detalhe Pauta usa contexto próprio. Comparar aquisição, memória, suavização e custo por separação de responsabilidades. Teste mobile aqui significa navegador responsivo, salvo evidência explícita de dispositivo físico ou app nativo. Nenhuma dessas alternativas implementa abrir o livro, virar folhas ou editar páginas.

Reduced-motion do SO ou `document.documentElement.dataset.motion='reduced'` desliga gestos/interpolação. `pan-y` conserva scroll mobile. Falha de loader/render/contexto mantém a capa; não promete restaurar WebGL automaticamente. Ao desmontar, liberar observadores, eventos, RAF, texturas, geometrias, materiais e contexto; verificar import que termina antes/depois do descarte.

Uma preferência estática precisa impedir aquisição, não apenas esconder o canvas: nenhum import de engine nem contexto WebGL no início estático. Ao alternar de interativo para estático, liberar os recursos e conservar a representação de fallback e os dados DOM. Um módulo já carregado pode ser reutilizado no retorno, mas o renderer precisa ser recriado sob demanda. Depois de `WEBGL_lose_context`/`forceContextLoss`, não tentar reinicializar no mesmo canvas perdido; criar um novo canvas/contexto. Perda inesperada deve conservar o fallback e evitar tentativas contínuas em cada atualização.

Visibilidade é parte do ciclo de vida: aba oculta ou objeto fora da viewport suspende RAF e adia criação/reconstrução pesada. Retomar com os dados mais recentes, sem reproduzir uma fila de estados antigos. Limitar DPR pelo tamanho real do host e separar atualização de pose da atualização de material. Veja [movimento](motion.md) para política conjunta SO/app e distinção entre hover fino e gesto touch intencional.

Separar custos de rede, memória de textura e manutenção. Dimensão de imagem comprimida não é tamanho decodificado na GPU. Dependência injetada evita duplicar motores já existentes; cache compartilhado precisa de ownership explícito. Para 2.5D/GLB e variantes de produto, leia [web imersiva](immersive-web-tech.md).

## Perfil e exportação de texto

Nome armazenado, nome exibido e exportação são contratos distintos. Preview pode usar clamp/reticências explicitamente, com texto completo acessível. Export deve medir a fonte real (`measureText` ou equivalente), quebrar palavras/tokens longos, reservar blocos de nome/papel/metadados e falhar claramente se não couber. Não truncar o dado silenciosamente. Validar o PNG aberto, não apenas o tamanho do Blob. Inclua nome longo sem espaços, acentos e CJK conforme o público suportado.

## Verificação

Execute a partir da pasta da skill:

```bash
node --test tests/book-object.test.cjs tests/book-geometry.test.cjs tests/book-material-fidelity.test.cjs
```

`book-object` verifica normalização, enquadramento, linhas longas, fallback, import tardio, erro de render/contexto e descarte. `book-material-fidelity` verifica a mistura realmente instalada no shader, campos determinísticos, cobertura antialiased, orientação do foil e preservação dos materiais não envolvidos. `book-geometry` verifica fechamento/orientação, normais do canal/plano/aro, contatos das pontes, o furo oblíquo anterior e UV bidimensional nos cortes do papel. Fórmula e geometria sem GPU não comprovam shader executado nem aparência no navegador.

Teste presets, resize desktop/mobile, interação, reset e modo estático; declare separadamente o que foi visto. Use screenshot da implementação final, nunca screenshot da referência como prova da sua entrega. Registre a viewport **observada**, não somente a largura pedida à ferramenta; aguarde a pose final e mantenha luz/calibração constantes na comparação angular. Dimensione a matriz de ângulos pelo risco do objeto — as 32 poses do caso auditado são uma amostra, não um requisito universal.

Inclua regressões de aquisição zero em modo estático, alternância estático/interativo com canvas novo, pausa por visibilidade, alteração de política durante um gesto e descarte idempotente. Contar contextos/imports/frames pendentes verifica o ciclo de vida; comparar brilho, relevo, cores, legibilidade e exportação exige inspeção visual separada. Não registrar essa inspeção como concluída apenas porque os testes do renderer passaram.

Para executar também a geometria com Three real, forneça um módulo ES Three 0.186 compatível que já exista no projeto:

```bash
BOOK_THREE_MODULE=/caminho/absoluto/three.module.js node --test tests/book-object.test.cjs tests/book-geometry.test.cjs tests/book-material-fidelity.test.cjs
```

Sem `BOOK_THREE_MODULE`, os casos que exigem Three real em `book-object` e `book-geometry` são explicitamente pulados; os demais não exigem dependência. Não converter esses skips em aprovação de geometria. A variável injeta a dependência do consumidor; não instalar outro motor só para executar o exemplo. Os resultados históricos descritos no [caso aprovado](book-polish-case-study.md) pertencem ao hash ali identificado; as capturas originais ficam no arquivo externo de autoria. Após adaptar o componente, execute novamente os testes pertinentes e a comparação visual; guarde diferenças restantes e custo medido sem inferir FPS a partir da contagem de triângulos.
