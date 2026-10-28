# Web e interfaces de navegador

Detecte framework, renderização, router, componentes e CSS existentes. Sem código, escolha stack só quando necessária à entrega. Não force React/Next/Tailwind para uma página estática ou migre versões como efeito colateral de design.

## Comportamento web

- HTML semântico, links reais, botões corretos, landmarks e títulos coerentes. Preserve histórico, deep links, abertura em nova aba e compartilhamento.
- Layout intrínseco antes de breakpoints. Teste largura estreita, intermediária e ampla, além de zoom, orientação, conteúdo extenso e teclado virtual.
- Decida entre svh, dvh e altura pelo conteúdo conforme estabilidade desejada; 100dvh não resolve todo problema de viewport. Não recorte conteúdo com altura fixa.
- Use enhancement progressivo onde viável. Conteúdo essencial não deve permanecer invisível se uma animação ou JS falhar.
- Assets responsivos com dimensões reservadas; carregue cedo a mídia crítica e adie a secundária. Não faça lazy load cego do elemento LCP.
- Tipos web devem ter fallback compatível, licença e estratégia de carregamento. Auto-hospedagem versus provedor depende de privacidade, cache e projeto, não de uma proibição universal.
- Isole código que necessita cliente sem transformar toda a aplicação em client-only por conveniência.

## Desempenho e SEO

Defina orçamento proporcional: payload, JS, fontes, imagens, requests e tempo de interação no dispositivo alvo. CWV são métricas de experiência; verifique valores e metodologia atuais na documentação oficial antes de usar como gate contratual. Distingua laboratório de dados de campo e percentis.

Em sites indexáveis, preserve URLs, redirects, títulos, canonical, metadados, structured data factual, sitemap e eventos necessários. Audite links e metadados após redesign. Uma boa captura não prova indexação nem ranking.

Teste teclado, leitor de tela, formulário real ou simulação declarada, back/forward, erro de rede, links e menus. Não alegue backend funcionando porque o protótipo mostra um toast de sucesso.

Para layouts adaptativos de produto, use a receita lista/detalhe em [mobile](mobile.md) também no navegador: breakpoint vem do conteúdo e estado persiste no resize. Para código e revisão prática de controles, use [padrões](component-patterns.md).
