# Acessibilidade e inclusão

Use WCAG 2.2 AA como referência para web quando aplicável; requisitos legais/contratuais dependem do produto e jurisdição. Para nativo, acrescente a documentação da plataforma e testes com suas tecnologias assistivas. Não declare conformidade total com base em screenshot, Lighthouse ou contraste isolado.

## Medidas e seus significados

- Texto comum: contraste mínimo 4,5:1; texto grande: 3:1. “Grande” é pelo menos 18 pt (24 CSS px) regular ou 14 pt (aprox. 18,67 CSS px) em negrito. Não confundir 18 px com 18 pt.
- Componentes/informação gráfica necessários à compreensão: verificar contraste não textual e estados relevantes; não depender de borda invisível para reconhecer controles.
- WCAG 2.2 AA, SC 2.5.8: alvo de ponteiro de pelo menos 24 × 24 CSS px ou exceção aplicável, inclusive regra de espaçamento. 44 × 44 CSS px é um alvo ampliado útil, não o mínimo universal AA.
- iOS/iPadOS: a HIG consultada distingue controle padrão de 44 × 44 pt de mínimo de 28 × 28 pt; use o padrão confortável como ponto de partida e avalie espaçamento/contexto. Não apresente 44 pt como mínimo normativo universal. Android/Material: alvo de toque de 48 × 48 dp. São unidades e ecossistemas diferentes.

Confirme requisitos exatos na fonte oficial ao auditar. Consulte [fontes](sources.md); não reduza controles destrutivos abaixo de alvos utilizáveis.

## Verificações funcionais

1. Percorrer o fluxo somente com teclado: ordem lógica, foco visível, sem trap indevido e sem foco oculto por overlays. Na WCAG 2.2, o critério [2.4.11, AA](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum) avalia se o **componente que recebe foco** não fica totalmente escondido por conteúdo criado pelo autor; aplicar também suas notas sobre conteúdo reposicionável ou aberto pelo usuário. O [2.4.12, AAA](https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced) exige que nenhuma parte do componente seja escondida. Não confundir componente com pixels do anel; visibilidade e aparência do indicador têm critérios próprios.
2. Testar nome, função, valor e estado com leitor de tela; preferir semântica nativa. Use anúncios para mudanças relevantes sem reler a página inteira.
3. Verificar zoom de texto e reflow, inclusive em 320 CSS px de largura equivalente quando pertinente. Tabelas e conteúdos bidimensionais têm condições próprias; não esconda informação para “passar”.
4. Testar texto ampliado/Dynamic Type/font scale, alto contraste, temas suportados, redução de movimento e transparência quando disponíveis.
5. Alternativas a arrastar, gestos multiponto, hover e ações dependentes de precisão. Garanta operação por voz/switch quando fizer parte do alvo.
6. Mídia com legendas, transcrição e audiodescrição conforme conteúdo e requisitos. Confira [fala e leitura temporal](motion.md#legendas-e-fala); efeito tipográfico não substitui legenda completa. Não autoplay de áudio como surpresa; permita pausar movimento relevante.
7. Autenticação sem barreiras desnecessárias de memória: permitir colagem/gerenciadores de senha e alternativas apropriadas a desafios cognitivos.
8. Mensagens de erro associadas, correção clara, informação não transmitida somente por cor, posição, som ou animação.

## Evidência

Registre dispositivo/navegador, tecnologia assistiva, estado, critério, passos e resultado. Ferramentas automáticas encontram parte dos problemas; testes manuais e usuários reais cobrem outras dimensões. Não classifique estilo preferido como falha de acessibilidade.
