# Forma — identidade e apresentação

**Da intenção ao acabamento.**

Identidade visual local do plugin Forma: marca modular, paleta funcional e apresentação editorial responsiva em português. Abra [identidade.html](identidade.html) em um navegador. Não há fontes remotas, dependências de CDN, analytics, servidor ou JavaScript de aplicação.

## Arquivos

| Arquivo | Uso |
|---|---|
| `icon.svg` / `icon-dark.svg` | Símbolo vetorial azul / claro, fundo transparente, canvas 120 × 120 |
| `wordmark.svg` / `wordmark-dark.svg` | Assinatura com símbolo e nome editável, canvas 440 × 128 |
| `logo.png` | Símbolo azul exportado a 512 × 512 com transparência |
| `hero.png` | Imagem de apresentação 1536 × 1024, fornecida pela coordenação e copiada sem alteração |
| `tokens.json` / `tokens.css` | Cores, papéis claro/escuro, tipografia, espaços e geometria |
| `identidade.html` / `identity.css` | Página local com apresentação, onze especialistas e guia de marca |
| `preview-desktop-top.png` | Prévia de abertura em viewport 1440 × 900 |
| `preview-mobile-top.png` | Prévia de abertura em viewport 390 × 844 |
| `preview-symbols.png` / `preview-usage.png` | Evidência das variantes e da área de proteção, fora da seleção de marketplace |
| `provenance.json` | Ferramenta, prompt exato, origem e limites do hero |
| `verify.cjs` / `qa.json` | Verificação local reproduzível e resultados medidos |

Para a apresentação do marketplace, usar as duas prévias de abertura. Capturas longas não são necessárias.

## Geometria e proteção

O símbolo é construído em módulo `u = 6`, no canvas `120 × 120`:

- Haste: `x12 y12 w24 h96`.
- Barra superior: `x42 y12 w66 h24`.
- Barra central: `x42 y48 w48 h24`.
- Intervalo horizontal entre haste e barras: `1u = 6`.
- Área visível total: `96 × 96`.
- Área de proteção externa: pelo menos `4u = 24` ao redor dos limites visíveis, equivalente à largura da haste.

O padding de 12 unidades dentro do SVG **não contém sozinho a área de proteção completa**. Complete o espaço no consumidor. O diagrama da página mostra uma área visível de 160 px em uma caixa de 240 px: 40 px livres em cada lado, equivalentes aos 4u dessa escala.

Mínimo recomendado para o canvas do símbolo: **24 px**. Há amostras reais a 24 e 32 px na página. Preserve proporção, três peças e intervalos; não gire, estique ou acrescente contornos. Para assinatura pequena, confira a leitura no tamanho de destino. Uma nova aplicação exige seu próprio aceite.

## Paleta e tipografia

| Papel | Claro | Escuro |
|---|---|---|
| Superfície | Papel `#F5F4F0` | Tinta `#172238` |
| Texto principal | Tinta `#172238` | Papel `#F5F4F0` |
| Texto de apoio | `#596274` | `#B9C1D1` |
| Acento de texto | Azul Forma `#315BE8` | `#A8BCFF` |
| Marca | Azul Forma | Papel |

O acento claro do modo escuro serve à leitura; não substitui o azul original nos arquivos de marca. Cores de marca não são automaticamente cores de erro, sucesso ou gráficos.

O wordmark usa Arial/Helvetica/sans-serif e permanece como elemento `<text>` editável. Os títulos editoriais usam Georgia/Times New Roman; o corpo usa a fonte do sistema. Nenhum arquivo de fonte é distribuído. Métricas podem variar entre sistemas; confira a exportação se trocar fonte. Para uma assinatura com contornos idênticos em qualquer editor, seria necessária uma exportação adicional em curvas; ela não foi prometida neste pacote.

`tokens.json` é um formato local simples com aliases documentais, não uma declaração de conformidade com DTCG. O CSS contém os valores resolvidos consumidos pela página.

## Conteúdo e escopo

A família apresentada contém exatamente onze especialistas: foundations, interface, product, objects-3d, graphs-data, motion, platforms, brand, reference, validation e handoff. A apresentação descreve responsabilidades; não afirma que todos executam em cada tarefa ou que ferramentas externas estejam conectadas.

**A identidade pertence ao plugin Forma. Ela nunca deve ser imposta aos projetos consumidores.** Os projetos preservam sua própria marca, tipografia, tecnologia, dados e decisões aprovadas.

O hero é uma imagem gerada por IA. A aparência de objeto material não é um modelo 3D, mecanismo interativo, prova de fabricabilidade ou especificação dimensional. A fonte canônica do símbolo é o SVG, não a perspectiva ou os chanfros do hero. O arquivo original foi copiado sem modificar pixels; o CSS adapta o enquadramento à largura.

Não houve pesquisa de marca registrada nem certificação jurídica de exclusividade. Os vetores foram construídos para esta entrega; não foram importados logos ou fontes de terceiros.

## Proveniência da imagem

Ferramenta informada pela coordenação: `image_gen__imagegen`. Parâmetro: `transparent_background: false`. Dimensão recebida: 1536 × 1024. Prompt executado, fornecido pela coordenação e preservado também em `provenance.json`:

> Create an original premium brand hero illustration for FORMA, a modular design assistant plugin. Landscape 3:2 composition, absolutely no text or lettering. Warm white studio background #F5F4F0, lots of negative space at left for future editorial typography. At right, a single sculptural uppercase F made from three precisely aligned geometric slabs: one vertical stem, a long horizontal top bar, and a shorter middle bar with clean rectangular negative space. Front surfaces deep cobalt #315BE8, beveled side surfaces dark ink #172238. This is a physical satin ceramic/aluminum object, NOT inflated bubble typography. Very restrained fine microtexture, softly rounded tiny chamfers, coherent realistic softbox reflections and ambient contact shadows, crisp edges, subtle paper-like warm-white pedestal. A single small flat blue color-sample tile near its base may reinforce a system of modular pieces. Camera front three-quarter, slight elevation, orthographic product photography. Elegant, precise, quiet and clean. No glow, no purple gradients, no glass, no extra symbols, no UI or logos of other companies. Original new mark, not based on any existing brand. High craftsmanship, professional design system editorial visual.

O SHA-256 do arquivo copiado e do original foi comparado na autoria. O hash esperado está em `provenance.json` e é conferido por `verify.cjs` sem depender do original externo. Para repetir também essa comparação, informe opcionalmente `FORMA_HERO_SOURCE`. Identidade dos bytes não prova a origem conceitual de cada forma.

## Verificação reproduzível

Foi usado o Playwright já fornecido pelo ambiente, sem instalar pacotes, com Google Chrome headless em contexto novo. Com os caminhos deste ambiente:

```sh
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
node work/forma-brand/verify.cjs
```

O script usa `require('playwright')` e `require('sharp')` existentes. `sharp` apenas lê metadados/alpha do PNG exportado; a rasterização é screenshot do SVG no navegador. Sem `CHROME_BIN`, usa o Chromium gerenciado pelo Playwright; com essa variável, usa o executável informado. O comando acima é apenas o exemplo do ambiente de autoria. Em outro ambiente com os pacotes e navegador já disponíveis, execute `node verify.cjs` dentro desta pasta. Ele abre `identidade.html` por `file://`, mede os layouts, exporta o logo e atualiza prévias/`qa.json` dentro desta pasta.

Checagens: overflow horizontal em 320, 360, 390, 768, 1024 e 1440 px; imagens carregadas; onze IDs na ordem prevista; amostras 24/32; arquivos/âncoras; skip link por teclado; navegação; geometria dos três retângulos; texto SVG editável; wordmark dentro do canvas; contraste dos pares opacos declarados; ausência de requisições externas e erros de navegador; PNG 512 com alpha; hash do hero.

Os resultados efetivamente executados estão em `qa.json`. Não são prova de aparelho físico, impressão, leitor de tela, acessibilidade integral, direitos de marca ou integração instalada no plugin. As capturas foram inspecionadas visualmente; a área fotográfica tem fundo variável e não recebe uma alegação universal de contraste por esses cálculos.

## Decisões de composição

Grid editorial e linhas de separação organizam o conteúdo sem aparência de dashboard. O índice de especialidades passa de duas colunas para uma conforme o espaço. No mobile, o texto precede a imagem, evitando sobrepor a mensagem ao símbolo. O movimento limita-se à navegação por âncora, desativado com `prefers-reduced-motion`.

Esta entrega ficou restrita a `work/forma-brand/`. Não modifica, instala, publica ou ativa Forma, plugins, provedores ou serviços.

