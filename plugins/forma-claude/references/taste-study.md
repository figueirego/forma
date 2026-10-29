# Taste: mapa de princípios, mecanismos e limites

Leia para manter esta integração, escolher apoio externo ou rastrear uma regra. Para executar design, use as referências canônicas indicadas abaixo; não carregue toda a auditoria por padrão.

## Identidade e método

- Fonte: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), plugin **2.1.5**, snapshot [12af471f627f866411b4bd785b19646d3672784c](https://github.com/Leonxlnx/taste-skill/tree/12af471f627f866411b4bd785b19646d3672784c), consultado em 2026-10-28.
- Skill publicada no snapshot: `design-taste-frontend`, em `skills/taste-skill/SKILL.md`. Não confundir com versões antigas de mesmo nome instaladas localmente; os conjuntos clássicos migraram para outros repositórios, não auditados nesta rodada.
- Método: ECC `research-ops` para fonte/limites, `design-system` para sobreposição e `skill-stocktake` para utilidade/escopo; REA v49 orienta análise normal de fonte para repositório completo. Não foi necessário executar motor de binários ou instrumentar um app.
- Cobertura: entrada, referências de design, inventário das bibliotecas, implementação dos scripts/helpers/assets e configuração de testes/distribuição. Mapeamento por família e mecanismo; não é inspeção visual dos sites catalogados nem reprodução integral dos experimentos do autor.
- Licença de código/documentação: MIT, Copyright (c) 2026 Leonxlnx. A Forma incorpora uma síntese contextualizada, não o runtime, os catálogos completos, fotografias, marcas ou screenshots. Aviso preservado em [atribuições](../THIRD_PARTY_NOTICES.md).

## Fonte → decisão → uso na Forma

Os caminhos da coluna Fonte são relativos ao snapshot acima. “Aplicado” descreve instrução incorporada; não significa que a capacidade foi executada em todo produto.

| Fonte | Conhecimento ou mecanismo | Decisão e destino |
|---|---|---|
| `skills/taste-skill/SKILL.md`, §§ Page or app / The run | Página editorial, tela operacional e fragmento de app têm rotas próprias | **Aplicado:** [Marca](../skills/forma-brand/SKILL.md) e [Interface](../skills/forma-interface/SKILL.md); direção compartilhada sem aplicar hero a formulário |
| Entrada, passos 1–4; `references/copy.md` | Inventário específico, argumento por prova, conceito e teste de substituição por concorrente | **Adaptado:** [direções](design-directions.md#direção-que-nasce-do-projeto), [marketing](brand-marketing.md#argumento-conteúdo-e-interface-demonstrada), [ficha](templates.md#ficha-de-direção-e-conteúdo); quantidade proporcional, fatos separados de propostas |
| `references/type.md`, `library/type.json` | Papéis tipográficos, pares, medidas, fonte carregada, quebra e idioma | **Já coberto/conectado:** [sistema visual](visual-system.md), [contratos espaciais](layout-spatial-contracts.md); duas linhas é preferência, não limite normativo |
| `references/colour.md`, `library/palettes.json` | Ground/ink/accent, proporção de campos e contraste | **Já coberto:** [cor](color-refinement.md); preservar semântica, ambiente, objeto e temas aprovados; sem banir famílias cromáticas |
| `references/layout.md`, `library/heroes.json`, `library/sections.json` | Quadro, margens, ritmo, completude e adaptação da composição | **Adaptado:** [direções](design-directions.md) e [crítica renderizada](rendered-validation.md#crítica-de-composição-e-substância); repetir layouts pode ser correto, vazio pode ser intencional |
| `references/imagery.md`, `library/photos.json`, `scripts/assets.mjs` | Selecionar, pesquisar, recortar, creditar e distinguir conteúdo real de contextual | **Adaptado:** [assets e argumento](brand-marketing.md); nenhuma quota, geração ou aquisição automática; direitos por asset |
| `references/app-screens.md`, `library/app.json`, `assets/app.css` | Inventariar trabalho/dados, pergunta principal, produto/escopo, shell, tabelas, estados e mobile | **Adaptado:** [Interface](../skills/forma-interface/SKILL.md), [dados](data-dashboards.md), [base limpa](clean-shell.md); sem impor tokens de outro produto |
| `assets/charts.js` | Gráficos SVG, séries, nulidade, unidades, legendas e marcas consistentes | **Adaptado como contrato:** [dados](data-dashboards.md); fonte única, política de arredondamento do domínio, significado do delta; biblioteca não embutida |
| `references/motion.md`, `library/motions.json` | Movimento com assinatura, feedback, continuidade e alternativa reduzida | **Já coberto:** [motion](motion.md); sem mínimo obrigatório de elementos animados |
| `references/scenes.md`, `assets/scenes/stage.*`, `scripts/scenes.mjs` | Cenas por progresso, fallback, inspeção ao longo da rolagem | **Adaptado:** [motion](motion.md#cenas-vinculadas-à-rolagem); não importar dependências, catálogo prometido ou uma cena não presente no snapshot |
| `references/critique.md`, `references/tells.md` | Olhar composição, substância e identidade; priorizar correções | **Adaptado:** [crítica renderizada](rendered-validation.md#crítica-de-composição-e-substância); maior impacto primeiro, sem certificado por nota estética |
| `scripts/draw.mjs`, `scripts/lib/app-draw.mjs` e `library/directions.json` | Direções com seed, restrições de assets, histórico e reapresentação da escolha | **Opcional externo:** explorar só se direção estiver aberta; registrar escolha e motivo. Forma não inclui nem executa sorteador |
| `scripts/lint.mjs`, `scripts/inspect.mjs`, `scripts/lib/probe.mjs`, `scripts/lib/rules.mjs` | Lint de fonte, observações de DOM/CSS e capturas por viewport/scroll | **Adaptado como método:** [validação renderizada](rendered-validation.md); separar heurística de defeito e confirmar a versão final servida |
| `scripts/lib/cdp.mjs`, `scripts/lib/inspection-files.mjs` | Browser isolado, perfil temporário, nomes de arquivos sem colisão | **Não portado:** usar ferramentas suportadas pelo host; não criar segundo driver sem necessidade |
| `references/research.md`, `library/sites.json`, `evals/evals.json` | Estudo editorial e comparação com baseline por julgadores | **Mapeado, sem herdar resultados:** cenários [R32–R39](../evals/routing-scenarios.md) e protocolo existente; notas de modelo não são teste de usuário |
| `assets/base.css`, `assets/base.js` | Reset/tokens/motion helpers de partida | **Não copiados:** Forma já possui base e contratos; preservar estilos/stack do consumidor |
| `README.md`, `install.sh`, manifestos, `.github/workflows/*`, `tests/*`, `examples/v2/*` | Instalação, pacotes, validações e exemplos com créditos | **Mapeado:** [operação](plugin-operation.md) já separa descoberta, pacote, agente e consumidor; instalador e exemplos externos não executados/importados |

## O que o código comprova e o que não comprova

O inventário do snapshot contém 20 direções, 56 paletas, 44 entradas de tipo, 58 heroes, 185 composições de seção, 18 movimentos e 202 registros de sites. `app.json` inclui 7 estilos, 5 shells e 25 padrões. Esses totais descrevem arquivos, não opções integradas à Forma nem garantia de qualidade.

O README descreve estudo de 247 sites; não confundir essa amostra alegada com os 202 registros da biblioteca distribuída. A pesquisa explicita seleção por galerias, avaliações de modelos e limitações de screenshots/WebGL. O estudo de apps declara 23 telas desktop de 17 produtos, sem telas mobile/loading/erro e com cobertura limitada de settings; screenshots privados não permitem reproduzi-lo integralmente no clone. Regras extrapoladas são heurísticas da fonte.

O `draw` filtra opções e usa seed/histórico; não verifica a adequação final ao cliente. `lint` usa padrões textuais; não interpreta todo o CSS nem decide qualidade. O inspector usa Node 22+ e navegador Chromium via CDP, inspeciona 1440/768/390 e produz medições/capturas; essas larguras são perfil da fonte, não todos os dispositivos suportados pelo produto. Não integra uma auditoria completa de teclado, leitor de tela, contraste composto ou movimento reduzido em todas as rotas.

As regras incluem bans de gradiente/sombra/mono/roxo e cotas de imagens/movimento. O próprio capítulo de apps relata uso frequente de violeta na amostra e identifica o ban como preferência. A Forma não herda esses gates: [conflitos](conflicts.md) preserva marca, acesso, conteúdo e mecanismos aprovados. O inspector documenta reprovação abaixo de 2.6:1, diferente dos objetivos 4.5:1/3:1 de sua prosa, e não calcula contraste sobre fotos. Esse limiar não substitui a validação normativa apropriada sobre os fundos reais.

A documentação de cenas declara estudo de 261 cenas/30 tipos, mas informa que `library/scenes.json` ainda não foi distribuído; o arquivo está ausente neste snapshot. Esses números não são componentes disponíveis. Há também divergência entre exigir entradas em todas as seções na entrada e recomendar apenas duas ou três em `references/motion.md`: a Forma preserva escolha pela tarefa.

O stage usa GSAP/ScrollTrigger, com SplitText e Lenis opcionais. `charts.js` desenha SVG sem dependências, mas os tooltips e a operação precisam de validação de acesso própria; role de imagem não comprova alternativa suficiente. Não existe justificativa para instalar essas bibliotecas apenas por citar este estudo.

`assets.mjs` consulta coleções abertas e registra créditos. Licença retornada não verifica automaticamente todos os direitos do asset. O download de vídeo limita bytes durante streaming; o de imagem usa `arrayBuffer()` sem o mesmo limite. Se esse mecanismo vier a ser portado, definir timeout, cancelamento e tamanho máximo também para imagens; não adotar downloads ilimitados.

## Verificação desta pesquisa

No snapshot e com Node 24.12.0: seis testes de limpeza/ownership de perfis e nomes de screenshots passaram; checagem de encoding passou; treze arquivos JS/MJS passaram em `node --check`. O teste de frontmatter ficou **não executado por completo** por ausência de `yaml@2.6.1`; essa dependência não foi instalada. Não foram executados navegador, pesquisa/download de mídia, cenas, instalação ou os dez casos de agente presentes em `evals/evals.json`.

A CI da fonte exercita metadados, encoding, sintaxe e aqueles seis testes; não executa os dez evals de design. Testes da distribuição Forma e avaliações de decisão da versão resultante têm recibos próprios. Nenhuma contagem acima comprova que uma nova interface ficará correta sem execução e inspeção no consumidor.
