# Sistema visual, tipografia e espaçamento

## Extrair antes de substituir

Inspecione tokens, estilos computados, componentes e assets. Identifique fonte de verdade e divergências. Preserve decisões consistentes; diferencie bug pontual de dívida estrutural. Não introduza segundo sistema de tokens sem mapear o primeiro.

## Direção visual

Escolha uma ideia composicional coerente com público e conteúdo: editorial, instrumental, lúdica, industrial, institucional ou outra fundamentada. Especifique hierarquia, ritmo, materialidade e tratamento de imagem; não use adjetivos como substituto de decisões.

Uma direção distinta pode resultar de proporções, tipografia, recorte, densidade, cor ou movimento. Não precisa tornar navegação desconhecida. Gradientes, simetria, cards, serifas, preto e Inter são escolhas válidas quando fazem trabalho real.

Quando a direção ainda estiver aberta, use [comparação de direções](design-directions.md). Fixe conteúdo, estado e dimensões antes de variar estrutura; catalogar estilos não substitui decidir quais relações ajudam a tarefa.

## Tokens

Separe primitivos, semânticos e componentes. Exemplo conceitual:

```text
primitive.space.2 = 8
semantic.space.controlGap -> primitive.space.2
semantic.color.textPrimary -> tema.textoPrincipal
component.button.primary.background -> semantic.color.actionPrimary
```

Defina unidade, escala, alias, tema e origem. Não misture px, dp e pt sem adaptação. Inclua cor, tipografia, espaço, raio, borda, elevação, camadas e movimento apenas conforme necessário. Tema escuro é um mapeamento semântico, não inversão automática.

## Espaçamento e composição

Para implementar ou corrigir layout, use o procedimento de [contratos espaciais](layout-spatial-contracts.md): container/eixos → agrupamento → largura/insets → responsável por cada distância → adaptação → medição renderizada. Esta seção resume decisões; não substitui essa execução.

Na ausência de escala existente, experimente 4, 8, 12, 16, 24, 32, 48 e 64 como ponto de partida, não obrigação. Relações intragrupo devem ser visualmente menores que separações entre grupos. Espaço deve indicar associação, prioridade e ritmo.

- Alinhe texto pela linha de base e elementos pela sua função; centro geométrico pode precisar de compensação óptica.
- Defina largura de leitura e de trabalho separadamente. Texto longo costuma funcionar em cerca de 45–75 caracteres por linha, ajustado à escrita e ao tipo de conteúdo.
- Use grid para relações bidimensionais, flex/layout nativo para fluxo unidimensional. Não transforme posicionamento absoluto de mockup em arquitetura responsiva.
- Teste o menor conteúdo e o maior: título longo, zero, valores negativos, números grandes, tradução, nomes sem espaço, lista vazia e centenas de itens.
- Escolha quebras pela pressão do conteúdo. Não use apenas nomes comerciais de dispositivos como evidência de responsividade.
- Registre regra de densidade confortável/compacta quando útil. Compactar não remove legibilidade ou área de interação.

## Tipografia

Defina papéis: display, título, corpo, rótulo, auxiliar e número. Comece com uma família suficiente; adicione outra quando trouxer contraste funcional. Verifique pesos reais, licença de uso/redistribuição, caracteres do idioma, símbolos, números e fallback.

Teste com conteúdo real: acentos, descendentes, itálico, caixa alta, números tabulares e moedas. Ajuste entrelinha pela fonte e tamanho; não há um valor único que evite todo clipping. Evite texto essencial minúsculo para acomodar layout. Em web, prefira unidades relativas e preserve zoom; em nativo, escalas tipográficas do sistema.

Font Pairing pode ajudar a comparar alternativas, mas um trio não exige três famílias em produção. Compare mesma frase, mesma largura e vários tamanhos. Fontes comerciais sugeridas não implicam licença disponível.

## Cor, forma e materialidade

Para escolher ou refinar uma paleta, use [cor: da teoria à decisão](color-refinement.md). Separe problema de legibilidade, significado, hierarquia percebida e fidelidade antes de mudar valores. Uma combinação pode passar contraste e ainda distribuir mal a atenção; uma paleta harmoniosa pode falhar no texto. O roteiro conecta papel/contexto, variável candidata, alteração e comparação, sem impor uma nova linguagem ao projeto.

Mapeie superfícies, texto, ação, seleção, foco, borda e estados. Cores de marca não substituem semântica de erro ou gráficos. Use também texto/ícone/padrão para diferenciar estados. Meça contraste no fundo composto real, inclusive fotos, blur e hover.

Para mapas e indicadores, leia [dashboards de dados](data-dashboards.md) para distinguir categoria, magnitude, divergência, progresso e seleção. Alterar o tema não altera o significado da série; alterar a métrica exige legenda/unidade coerentes.

Defina papéis de raio e elevação, não um raio obrigatório para tudo. Containers agrupam; sombras mostram sobreposição ou hierarquia. Transparência tem fallback sólido e deve continuar legível sem blur. Mantenha consistência de ícones, peso óptico e alinhamento; aproveite a biblioteca já instalada.

## Componentes e governança

Cada componente deve ter anatomia, propósito, variantes, estados, conteúdo, comportamento, acessibilidade e limites. Documente diferenças entre plataformas por intenção. Reutilize antes de generalizar; extraia abstração quando houver variação recorrente real.

Para mudanças no sistema, identifique consumidores, migração, compatibilidade e owner. No Figma, prefira variables, auto layout e instâncias; no código, tokens e componentes existentes. Não declare sincronização Figma/código sem conferir ambos.

Para exemplo preenchido de direção, espaçamento, CSS e migração, leia [tokens e handoff](tokens-handoff.md). Para anatomia e estados, leia [padrões](component-patterns.md). Uma escala numérica sozinha não produz hierarquia.
