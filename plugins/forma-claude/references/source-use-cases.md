# Fontes: casos de uso e critérios de incorporação

Use para escolher repertório, revisar uma skill ou combinar várias referências. Esta tabela organiza os materiais examinados desde 25/10/2026, com revisões identificadas abaixo; não é um ranking de qualidade nem instrução para instalar todos. Leia só o método pertinente à tarefa e confira a versão atual antes de executar uma integração.

A biblioteca operacional usa fichas da Forma. Fontes históricas são evidência de pesquisa, não módulos obrigatórios nem conteúdo rebatizado. Para novas contribuições, siga [autoria e incorporação](authorship.md).

## Como incorporar uma fonte

1. Identifique **tipo e autoridade**: padrão normativo, documentação oficial, código, skill, catálogo comunitário ou exemplo de estilo.
2. Registre versão/commit/hash, arquivos consultados, licença e limitações. Diferencie documentado, demonstrado estaticamente, observado em execução e inferido.
3. Extraia um **caso de uso**, o princípio que o resolve e a condição em que deixa de servir. Não importe um framework, pacote ou aprovação extra apenas porque a fonte os usa.
4. Classifique: **adotar**, **adaptar**, **já coberto**, **rejeitar** ou **pendente de evidência**. Relacione cada adição à referência existente e a um teste observável.
5. Verifique conflitos e duplicações. Várias listas repetindo a mesma origem não são evidências independentes. Conserve a fonte original e a adaptação separadas.

Ficha mínima: `fonte + identidade → capacidade/caso → evidência → princípio → limites/licença → destino na skill → verificação`.

## Repositórios examinados

| Fonte / natureza | Casos de uso separados | Incorporar / destino | Limites e o que não importar |
|---|---|---|---|
| **Colorful** — catálogo comunitário de cores | Explorar harmonias; extrair candidatos de imagem; interpolar gradientes; escolher escalas de dados; organizar primitivas de UI | Diagnóstico por papel/contexto e verificação em [cor aplicada](color-refinement.md); conexão com temas, tokens, dados e materiais | Não é aplicativo nem motor. 104 entradas inventariadas; amostra primária examinada, sem executar os 104 destinos. Catálogo não garante manutenção, licença externa, acessibilidade ou psicologia universal |
| **Huashu Design** — skill e pipeline HTML | Explorar direções; produzir páginas/protótipos; slides, infográficos e outros exports | Comparação com conteúdo e formato fixos em [direções](design-directions.md); contrato de conversão em [artefatos](artifact-workflows.md) | Fluxo 6→3, catálogo de estilos e HTML-first são escolhas da fonte. Exportadores distintos podem rasterizar ou falhar parcialmente; não garantir edição integral |
| **HTML Anything** — editor/agente e exportadores | Editar documento HTML; adaptar conteúdo por superfície; exportar imagem/deck/Markdown; prévia de material gerado | Separar formato autoral, preview e entrega; conversão por subconjunto e isolamento em [artefatos](artifact-workflows.md) | O caminho PPTX inspecionado coloca PNG por slide; não equivale a objetos editáveis. Quantidade de skills/superfícies não comprova cada fluxo |
| **Open CoDesign** — aplicativo e runtime | Gerar/refinar artefato; selecionar região; sincronizar arquivo e preview; acompanhar job | Alvo + revisão/hash, contexto de execução e diferença salvo/preview em [artefatos](artifact-workflows.md) e [contratos](contracts-trust.md) | Não importar credenciais nem instalar runtime por consequência de design. Mecanismo estático não prova execução, segurança integral ou export correto |
| **Kun** — workspace de agentes | Layout/edição em canvas; seleção e undo; replay e continuidade do trabalho | Identidade, revisão e transação por intenção em [artefatos](artifact-workflows.md); overflow em [layout](layout-spatial-contracts.md) | Snapshot sob PolyForm Noncommercial 1.0.0 com condições adicionais de uso comercial. Síntese conceitual original; não transplantar código. Replay registrado não é certificação de determinismo global |
| **Oil UI** — skill de exploração | Comparar alternativas lado a lado; escolher direção; refinar por screenshots; montar preview | Seleção separada da aplicação e inspeção na viewport real em [direções](design-directions.md) | Comparação múltipla é condicional. Utilitário que resolve assets não vira sandbox de arquivos por isso; inspeção de paths continua necessária |
| **DeepSeek Design** — integração, contratos e recursos de Studio | Documento editável; seleção de objetos; preservar edição manual; templates e exportação | Escopo da mudança, schema/validação e editabilidade por camada em [artefatos](artifact-workflows.md) | Licença própria restritiva; verificar componentes separadamente. A pasta `source/` é adaptador, não prova de toda a implementação do Studio; tipo `native-editable` não valida exportador |
| **Awesome Claude Design** — catálogo, prompts e receitas | Buscar famílias visuais; remix por papéis; extrair DESIGN.md; preparar auditorias e efeitos | Autoridade/freshness da referência; arbitragem de remix em [direções](design-directions.md) e [conflitos](conflicts.md) | Não é motor de design nem tokens oficiais das marcas. Exemplos têm contradições; métricas/custos/performance declarados exigem verificação própria |
| **Design Agent (organização langchain-ai)** — agente de produção de mídia, skills e verificadores | Peças, diagramas, slides, filmes, legendas e loops; identidade consistente, restyle fiel, revisão e operação de agente | [Marca](brand-marketing.md), [artefatos/alpha](artifact-workflows.md), [dados/topologia](data-dashboards.md), [movimento/legendas/GIF](motion.md), [players](specialized-surfaces.md#decks-e-players-interativos), [verificação](verification.md#cobertura-de-verificadores-e-recibos) e [produção coordenada](agent-production.md) | Catálogo de 36 skills de produção +15 de manutenção mapeado; runtime lido por famílias, sem execução. Métodos não instalam LangChain/Deep Agents, HyperFrames, providers ou canais. Preferências e gates têm limites; [proveniência](sources.md#estudo-integral-do-catálogo-e-fronteiras-de-runtime--1210) |

Snapshots auditados (licença do repositório não abrange automaticamente assets/fontes de terceiros):


- [Colorful — 3af5997a](https://github.com/Siddharth11/Colorful/tree/3af5997a081170eae9f745c2203a41f9fef316d1): 16 bibliotecas, 38 aplicações web, 23 paletas e 27 artigos; síntese original, sem redistribuir imagens ou ferramentas.
- [Design Agent — 9fd563be](https://github.com/langchain-ai/design-agent/tree/9fd563be8be0f3a2c956599f8ed4672ae0d1f281): core Apache-2.0; componentes, fontes e ferramentas têm termos próprios conforme NOTICE. Apenas síntese original incorporada.
- [Huashu — 4fc7bfdb](https://github.com/alchaincyf/huashu-design/tree/4fc7bfdbd5ec3fa2d43ce7a6433de60976a5e4b1).
- [HTML Anything — 975fb3bc](https://github.com/nexu-io/html-anything/tree/975fb3bcb98f1777781fb4c738902d36e32c8c46).
- [Open CoDesign — 4cf33932](https://github.com/OpenCoworkAI/open-codesign/tree/4cf33932edc5f687e3cf7190261ebbb02c898d08).
- [Kun — a9060246](https://github.com/KunAgent/Kun/tree/a9060246cdadb5387787386fe0c5ad46a4a537b2).
- [Oil UI — ff3ed0a8](https://github.com/oil-oil/oil-ui/tree/ff3ed0a88972747840ece9d4cd664807d6f5d501).
- [DeepSeek Design — 62ee529e](https://github.com/Devin-AXIS/deepseek-design/tree/62ee529e84423ba63e823b23860293a43b6eb03b).
- [Awesome Claude Design — 7f60ee56](https://github.com/rohitg00/awesome-claude-design/tree/7f60ee56b9340f8c2671a08c2d8aab4037546a64).

## Sites observados

| Fonte / recorte | Casos transferíveis | Adaptação e limites |
|---|---|---|
| [Seu Imposto](https://seuimposto.com/) — interface “Apuração 2026”, 25/10/2026 | Resumo estável, exploração geográfica, detalhe com trilha, busca tipada, modos de métrica, histórico versus ao vivo e reorganização móvel | [Dashboards temporais e geográficos](data-dashboards.md). Adotar contratos; adaptar cores/fontes/densidade ao produto. Não importar resultados, marca, anúncios, imagens ou código. Dados e projeções exibidos não foram autenticados; ler [fontes](sources.md) para hashes e limites da análise |
| [Kimi](https://kimi-landing-page-two.vercel.app/), 26/10/2026 | Retrato 2.5D + GLB, narrativa editorial, contornos Canvas, tokens e cenas por qualidade | [Web imersiva](immersive-web-tech.md). Adaptar o mecanismo, não a marca; evitar escala global descontínua, freeze que mantém custo e reduced-motion parcial |
| [Soda](https://soda-landingpage.vercel.app/), 26/10/2026 | Produto GLB, material por variante, tokens de contexto e transição coordenada | [Web imersiva](immersive-web-tech.md). Adaptar variantes com commit/erro; não herdar navegação placeholder, decoração criada mesmo oculta ou dependências sem necessidade |
| Referência desktop auditada → componente original Pauta | Cadernos, álbuns e relatórios com geometria/material configuráveis | [Objetos reutilizáveis](reusable-objects.md). Motor original Canvas/Three injetável; técnica transferível sem distribuir tecidos/shaders da referência |

## Skills e plugins: escolher pelo trabalho

| Fonte | Usar quando | Regra transferível / limite |
|---|---|---|
| Impeccable | Refinar, auditar, extrair ou adaptar UI existente | Preservar vs redesenhar, contexto e revisão renderizada; absolutos estéticos não são normas |
| Design Motion Principles | Criar/auditar movimento | Propósito, frequência, interrupção, continuidade e alternativa reduzida; não garantir GPU por propriedade CSS |
| API Design | Converter contratos técnicos em estados de experiência | Validação, conflito, paginação, autorização, retry e 202 pendente; preservar convenções do backend |
| UI/UX Pro Max | Lookup pontual por domínio/stack | Query curta, pertinência e fonte verificadas; ranking de resultado não determina nível WCAG |
| ECC Research Ops + Design System | Investigar evidências e auditar consistência | Fato/inferência/recomendação separados; critério/achado por dimensão, sem score certificador |
| Figma | Fonte de design, tokens, componentes, reconciliação e handoff | Autoridade, IDs, bindings e variantes conferidos; [integração](integrations.md) depende do arquivo e contrato real |
| Open Design | Gerar/refinar artefato no runtime conectado | Modo, projeto, pedido e execução estáveis; polling não gera de novo; geração paga/autenticação seguem contrato |
| REA | Rastrear referência existente | Fonte completa via inspeção direta; binário/runtime quando a pergunta exigir; evidência parcial permanece parcial |

## Encaminhamento rápido

- **“Arrume a centralização”** → componente/tokens atuais + contratos espaciais. Não sortear estilos nem pedir geração externa.
- **“Ainda não escolhi a identidade”** → direções comparáveis; Huashu/Oil/catálogos como repertório, com decisão contextual.
- **“Quero igual a esta referência”** → captura + fonte/versão + gates de fidelidade; catálogo inspirado não substitui a referência.
- **“Quero adaptar essa tecnologia a outros projetos”** → mecanismo, dados, material, geometria, API e lifecycle; entregar exemplo reutilizável e custo por camada. Aparência fixa não é componente portátil.
- **“Quero um deck editável”** → artefatos/exportação + marca; escolher pipeline pela editabilidade verificada.
- **“Edite só este objeto”** → alvo/revisão + patch local + undo; preservar o restante e resolver resultado obsoleto.
- **“Sincronize Figma e código”** → autoridade e inventário de bindings; reconciliação localizada, sem duplicar biblioteca.
- **“Revise tudo”** → matriz de áreas e evidências; marcar não testado onde faltar runtime. Não transformar leitura integral em certificação universal.

Os critérios novos são uma síntese original. Não distribuir os repositórios, textos extensos, templates, fontes ou assets junto desta skill. Consulte [proveniência](sources.md) e os contratos atuais das integrações quando realmente usadas.
