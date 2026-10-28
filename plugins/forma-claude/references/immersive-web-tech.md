# Web imersiva: efeitos portáteis, variantes e custo

Use esta referência para campanhas, produto configurável, objeto editorial e cenas decorativas.
Não a use como justificativa para adicionar WebGL a configurações, tabelas ou formulários.
Priorize o mecanismo mínimo que entrega o comportamento necessário.

Para personagens com expressão, volume, apoio físico e variantes de acabamento, leia [refinamento de mascotes](mascot-refinement.md). Uma malha procedural pode sustentar esse tipo de objeto; não pressupor GLB, rig, pós-processamento ou shader customizado só porque o objeto é tridimensional.

## Escolha antes de implementar

| Necessidade real | Começar com | Escalonar somente quando |
|---|---|---|
| Caderno, capa, cartão, painel em perspectiva | HTML + CSS transform + SVG | Oclusão, geometria ou luz não puderem ser representadas suficientemente |
| Retrato/produto frontal com profundidade aparente | Imagem/poster; 2.5D opcional por depth/alpha/normal | A vista precisar de volumes e ângulos que não existem na imagem |
| GLB com orbit e troca de material | `<model-viewer>` | A cena exigir shaders, render passes ou composição que o componente não ofereça |
| Retrato 2.5D + objeto 3D + revelação interativa | Three.js direto | A combinação justificar o custo de código, assets e manutenção |
| Trajetória/mapa simples e interativo | SVG + DOM | Densidade medida justificar Canvas/WebGL; manter alternativa textual |
| Fundo decorativo/isolinha/partícula | CSS/SVG estático | Movimento acrescentar valor; permitir desligar e parar trabalho fora da tela |

Não confundir 2.5D, malha 3D, vídeo e imagem pré-renderizada. Declare qual mecanismo foi demonstrado.
Uma dependência de uma biblioteca não prova que a aplicação foi escrita diretamente com essa tecnologia.

## Caso Kimi: editorial com cena híbrida

[Fonte](https://kimi-landing-page-two.vercel.app/), capturada em 26/10/2026.
[Perfil com hashes e limites](../assets/reference-profiles/kimi-2026-10-26.json).
Confirmados: Lenis 1.3.26, Three.js r185, GLTFLoader/DRACOLoader, HDR/PMREM, Canvas 2D e SVG.
Vite é inferido pelo bootstrap; versão do build e processo de autoria são desconhecidos.
Retrato usa mapas diffuse/depth/alpha/normal em um plano; capacete é um GLB separado.
O código combina leve deslocamento de UV, relighting, pivot amortecido e máscara de revelação.
Contornos e trilha de circuito usam Canvas 2D, sem exigir malha 3D.

Receita original, não transcrição do bundle:

```text
mostrar(conteúdoHTML, posterLicenciado, controles)
se política.permiteCena e componenteVisível:
  carregarMotorELimites()
  validarMapasEModelo()
  compor(planoComProfundidade, objetoOpcional, luzAmbiente)
  aoPonteiro: atualizarAlvoLimitado()
  quandoSujoEVisível: interpolarAlvo(); renderizar()
aoErroOuWebGLIndisponível: manterPosterEControles()
aoDesmontar: liberarCenaERecursos()
```

Separar texto/CTA da cena decorativa. Deslocamento tem limite para evitar revelar bordas vazias.
Mapas são uma entrada artística: não prometer sua geração automática nem equivalência ao volume real.
O padrão de tokens brutos → semânticos é útil; a paleta gelo/preto/ciano é específica da campanha.
Display condensado, SVG recortado e grande escala não devem migrar automaticamente para UI operacional.

## Caso Soda: produto configurável

[Fonte](https://soda-landingpage.vercel.app/), capturada em 26/10/2026.
[Perfil com hashes e limites](../assets/reference-profiles/soda-2026-10-26.json).
Confirmados: `<model-viewer>`, GSAP 3.15.0, Three.js r183 embutido e dependências Lit.
GLBs declaram glTF-Transform 4.5.1, meshopt, quantização e WebP; isso não identifica o modelador original.
O produto e frutas são GLBs; bolhas são imagens animadas por CSS.
Trocar variante combina textura do material, cores do fundo e decoração.
Variante cromática de produto não é tema claro/escuro do aplicativo.

Receita original com transação e concorrência:

```text
selecionar(variante):
  pedido = próximoId(); estado = carregando(variante)
  tentar:
    recurso = carregarValidarOuObterDoCache(variante.asset)
    se pedido != pedidoAtual: liberarSeNãoCompartilhado(recurso); retornar
    aplicarJuntos(material, tokensContextuais, decoraçãoPermitida)
    confirmarSeleçãoAcessível(variante); anunciarResultado()
  falhou:
    se pedido == pedidoAtual: manterÚltimaVariante(); mostrarRetry()
```

Uma mesma configuração pode descrever capa de caderno, acabamento de móvel ou embalagem.
Campos mínimos: `id`, rótulo, tokens de contexto, asset autorizado e poster.
Manter foco/texto/superfície em tokens globais e validar contraste em todas as variantes.
Não marcar escolha como concluída antes de a troca visual estar pronta; permitir teclado e toque.
Só adotar GSAP quando uma timeline coordenada justificar biblioteca; transições simples cabem em CSS/WAAPI.

## Contrato portátil

Conteúdo, dados de variante, assets e política de qualidade não pertencem ao mesmo estado do renderer.
Para cenas complexas, expor `mount`, `resize`, `setTheme`, `setQuality`, `pause`, `destroy` e eventos de erro/ready.
Adicionar `setPointer`/`setProgress` apenas se usados. Um hover CSS não precisa dessa camada.
Slots/props de conteúdo devem aceitar textos longos, idioma, capa sem imagem e ausência de metadados.
O motor é substituível: poster → CSS/2.5D → GLB. A capacidade do produto permanece em todas as versões.

```text
política = combinar(preferência, orçamento, visibilidade, suporte)
se estático: não importarMotor; não carregarDecoração; mostrarPoster
se reduzido: trocarVariantesSemGiroBlurParallax; renderizarSobDemanda
se completo: limitarDPR; criarApenasAssetsDoPreset; pausarForaDaTela
```

Reavaliar preferência durante a sessão. Testar retorno à aba e à viewport.
`display:none`, congelar transform ou reduzir duração não garantem economia de rede/CPU/GPU.
Liberar RAF, timers, listeners, observers, geometria, materiais, texturas de uniforms, environment e workers.
Não destruir textura compartilhada sem gestão de ownership/cache; testar montagem/desmontagem repetida.

## Budget e custo

O budget vem do público, aparelho e objetivo. Medir antes de alegar performance ou economia.

| Camada | Medir | Não confundir com |
|---|---|---|
| Rede | Transferência comprimida/cacheada, requests, waterfall, peso bruto inventariado | Soma de todos os assets possíveis da página |
| JS | Parse/execução, chunk inicial/lazy, trabalho principal | Tamanho de bundle como prova de fluidez |
| GPU/CPU | Frame time, draw calls, texturas decodificadas, geometrias, DPR, loops ativos | Contagem de elementos DOM ou de triângulos isolada |
| Manutenção | Loader/decoder, contexto perdido, teardown, testes por dispositivo | Um efeito funcionar na primeira visita |
| Financeiro | Hosting, CDN, autoria/licenças, ferramentas e trabalho de manutenção | Domínio Vercel ou ausência de API como custo zero |

Kimi: entrada 56.574 B; chunk 3D 618.987 B; HTML+CSS+JS+duas fontes somam 775.239 B brutos/inventariados.
HDR/GLB/texturas ficaram sem peso verificado. O decoder configurado acrescenta custo condicional.
Soda: model-viewer 1.024.001 B; GSAP 69.641 B; quatro GLBs somam 850.584 B.
Lata: 3.934 triângulos declarados; os 15 elementos model-viewer observados não significam 15 contextos GPU.
Nenhuma dessas capturas mede FPS, LCP, INP, custo financeiro ou uso de memória.

## Falhas a não importar

| Observado no código | Correção exigida na adaptação |
|---|---|
| Kimi: `freeze` ainda carrega assets e chama renderer | Poster com caminho sem motor; render sob demanda |
| Kimi: escala raiz salta em 1279→1280 e 1440→1441 | Tokens `clamp()` contínuos; testar breakpoint −1/0/+1 px |
| Ambos: reduced-motion incompleto | Política única cobrindo CSS, biblioteca, câmera e RAF |
| Soda: decoração oculta continua criada | Decidir orçamento antes da criação e do download |
| Soda: variante falha apenas no console | Commit atômico, rollback, retry e anúncio acessível |
| Soda: navegação `#` e CTAs sem fluxo comprovado | Destino e resultado verificáveis; não chamar demo de checkout |
| Ausência de poster explícito | Imagem alternativa autorizada, texto e CTA sempre úteis |
| Decoder com detalhe `data:` sensível a CSP | Integração suportada na versão adotada; não relaxar CSP por cópia |

## Validação e procedência

QA observado: Kimi 1280×720/390×844; Soda 1440×900/390×844; heros visíveis e menus móveis operantes.
Soda também trocou variante com atualização de material/fundo/`aria-pressed`.
Não houve overflow horizontal nesses estados. Isso não cobre aparelhos físicos ou todas as preferências.
Testar separadamente: zoom 200%, teclado, toque, texto longo, viewport baixa, reduced-motion, save-data,
WebGL indisponível/perdido, falha de textura, troca rápida, resize, aba oculta e remontagem.
Verificar ordem de leitura/CTA no mobile; reservar altura para produto em fluxo, sem encobrir controles.
Registrar paridade visual, tecnológica e funcional em campos separados, com desconhecidos explícitos.

REA parseou entradas e um recorte HeroScene como texto inerte, com grafos semânticos parciais.
Os perfis preservam URLs, hashes, recorte e contagem de unknowns. Bibliotecas grandes não foram totalmente decompostas.
403 de HEAD dos assets Kimi não foi falha de renderização no browser; o sourcemap Soda permaneceu indisponível.
Não distribuir imagens, fontes, modelos, logos ou código original desses sites sem licença apropriada.
Estas receitas são de autoria nova; hashes identificam evidência, não concedem direitos de uso.
Confirmar licença e API da versão escolhida antes de incorporar qualquer dependência ao projeto.
