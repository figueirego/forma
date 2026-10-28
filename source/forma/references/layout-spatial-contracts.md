# Layout: centralização, espaçamento e organização

Leia ao criar ou corrigir composição, alinhamento, padding, margin, agrupamento ou responsividade. Leis de percepção explicam relações; não determinam um número mágico de pixels. Esta referência traduz essas relações em decisões implementáveis e verificáveis.

## 1. Definir a estrutura antes dos valores

Faça um mapa curto: **área de navegação → área disponível → conteúdo → grupos → controles**. Nomeie a tarefa principal, a ordem de leitura e a ação que pertence a cada grupo. Não comece distribuindo cards ou adicionando margens até a tela parecer preenchida.

Para cada região afetada, registre apenas o necessário:

| Contrato | Pergunta concreta |
|---|---|
| Referência | O elemento se alinha ao viewport, painel disponível, coluna de conteúdo ou conteúdo interno de um card? |
| Eixos | Está centralizado horizontalmente, verticalmente, em ambos, ou alinhado ao início/baseline? |
| Largura | Preenche o espaço de trabalho, tem limite de leitura ou dimensão intrínseca? Qual coluna pode encolher? |
| Insets | Quem determina a distância da borda até o conteúdo? Header, body e footer compartilham quais guias? |
| Relações | Quais elementos pertencem ao mesmo grupo? Que distância separa grupos de tarefas diferentes? |
| Adaptação | Em qual pressão de conteúdo deve quebrar, empilhar, rolar ou truncar? O conteúdo ocultado continua acessível? |
| Evidência | Quais caixas, estilos, capturas e estados confirmam o contrato? Qual tolerância do projeto? |

Exemplo: configurações centralizadas no viewport; conteúdo alinhado ao início; body/footer com mesmo inset horizontal; cada preferência agrupa título+ajuda; controle em coluna estável; corpo rola e rodapé continua alcançável. O editor de cor ancorado à área de trabalho tem **outro** contrato: não herda a centralização do dialog.

## 2. Centralizar o objeto certo no lugar certo

- `text-align:center` centraliza conteúdo inline; não centraliza o bloco. `margin-inline:auto` distribui espaço livre ao redor de um bloco de largura limitada; não escolhe a largura.
- Flex alinha pelo eixo principal e transversal definidos por `flex-direction`. Grid permite controlar trilhas e alinhamento dentro delas. Identifique o eixo antes de escolher `justify-*` ou `align-*`.
- Sidebar e inspector reduzem a área disponível. Um empty state do painel deve se referir a esse painel; centralizá-lo no viewport pode colocá-lo sob a navegação.
- Header com botão de voltar à esquerda e ações à direita: `space-between` não garante título no centro. Escolha explicitamente centro geométrico ou alinhamento ao conteúdo. Para centro geométrico, trilhas laterais equivalentes funcionam enquanto houver espaço; no estreito, adapte o título/ações sem sobreposição.
- Conteúdo operacional e texto longo geralmente precisam de uma borda inicial estável. Centralizar o contêiner não obriga centralizar parágrafos, labels ou valores.
- Um estado vazio pode usar a altura disponível. Uma página com conteúdo crescente não deve ter altura fixa só para ficar centralizada. Dialog baixo, teclado virtual e zoom precisam manter topo, fim e ações alcançáveis.

Para caixas no mesmo sistema de coordenadas, centro horizontal é `x + width/2`; compare com o centro do **contêiner declarado**. Geometria correta não prova equilíbrio óptico. Antes de compensar 1–2px, confira line-height, ascenders/descenders, whitespace do SVG/viewBox e margens internas do asset. Se necessária, registre compensação pequena no componente, preservando o alvo interativo; não remende o layout inteiro com `translateX`, espaços de texto ou margens negativas.

## 3. Um responsável por cada distância

| Recurso | Responsabilidade | Falha a procurar |
|---|---|---|
| `padding` / inset | Conteúdo até a borda do próprio container | Header/body/footer com insets diferentes sem intenção; padding duplicado por wrappers |
| `gap` / spacing de stack | Distância repetida entre irmãos gerenciada pelo pai | `gap` mais margem de cada filho somando duas vezes |
| `margin` | Relação externa entre blocos independentes ou exceção deliberada | Colapso de margens, primeiro/último filho criando folga invisível |
| `line-height` | Espaço entre linhas dentro do texto | Usá-lo para centralizar uma linha que depois quebra ou aumenta |
| `min-height` / hit area | Limite funcional e área de interação | Confundir tamanho do desenho com tamanho clicável ou fixar altura que corta conteúdo |

Reutilize a escala existente. Se não houver, escolha uma escala inicial e papéis como `label-control`, `field-help`, `field-field`, `group-group`, `panel-inset` e `page-gutter`. O mesmo valor pode servir a papéis diferentes, mas o nome deve explicar a relação. Não gere um token para cada número isolado.

**Proximidade é relativa:** label, campo e erro devem parecer um grupo; o próximo campo/grupo não deve estar visualmente mais próximo do erro anterior. Distâncias intragrupo menores que intergrupo são uma boa hipótese, não uma razão fixa obrigatória. Bordas, tipografia, alinhamento e contexto também alteram a percepção. Teste a relação no conteúdo renderizado, incluindo mensagens multilinha.

## 4. Organização orientada à tarefa e leis de UX

| Princípio | Decisão espacial | Verificação prática |
|---|---|---|
| Proximidade | Manter ação/ajuda/metadados junto do objeto correto; separar mudança de assunto | Identificar a qual campo pertence um erro sem ler toda a tela |
| Região comum | Um limite ou fundo pode reunir controles relacionados | A borda contém uma unidade de tarefa real; evitar card dentro de card sem significado |
| Semelhança | Mesmos papéis conservam tipografia, insets e comportamento | Um novo item de navegação não herda aparência de CTA por seletor genérico |
| Conexão uniforme | Linhas/conectores expressam relações reais | Grafo não inventa ligações só para parecer conectado; dividers não duplicam fronteiras |
| Prägnanz | Reduzir tratamentos e eixos concorrentes | Títulos, linhas, controles e ações seguem poucas guias reconhecíveis |
| Chunking / carga cognitiva | Agrupar por decisão e sequência de trabalho | Título do grupo explica o conteúdo; não repartir por contagem arbitrária |
| Atenção seletiva / Von Restorff | Diferenciar prioridade com parcimônia | O item selecionado e a ação principal são distintos, sem transformar cada bloco em destaque |

Hick e Miller não fixam máximo de 5 ou 7 opções. Fitts não especifica padding universal. Nenhuma dessas leis exige centralizar tudo, usar cards, animar todos os controles ou preencher cada área vazia. Uma checklist de código não comprova usabilidade nem fidelidade visual.

## 5. Receita mínima adaptável à stack existente

Exemplo web, com valores **ilustrativos**, não tokens obrigatórios nem uma nova biblioteca:

```css
.settings-host {
  container: settings / inline-size;
  min-inline-size: 0;
}
.settings-panel {
  --panel-inset: clamp(1rem, 3vw, 1.75rem);
  --group-gap: 1.5rem;
  box-sizing: border-box;
  inline-size: min(100%, 60rem);
  margin-inline: auto;
}
.settings-header, .settings-body, .settings-footer {
  padding-inline: var(--panel-inset);
}
.settings-body { display: grid; gap: var(--group-gap); }
.field { display: grid; gap: .5rem; min-inline-size: 0; }
.field > :is(label, p) { margin: 0; }
.field-help { font-size: .875rem; line-height: 1.5; }
.settings-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: .5rem;
  align-items: start;
}
.settings-row > * { min-inline-size: 0; }
.settings-row input, .settings-row select {
  box-sizing: border-box;
  inline-size: 100%;
}
/* Medir o host do painel, inclusive em split de uma janela ampla. */
@container settings (min-width: 42rem) {
  .settings-row {
    grid-template-columns: minmax(0, 1fr) minmax(12rem, 18rem);
    gap: 1.5rem;
  }
}
```

O `.settings-host` envolve o painel; a query consulta o ancestral, não o próprio elemento. Os 42rem são uma hipótese a ajustar ao conteúdo, não breakpoint universal. A base empilhada continua utilizável sem suporte a container queries. Use adaptação equivalente na stack existente; não medir apenas a janela quando o componente pode ocupar uma região menor.

No código existente, edite os seletores responsáveis em vez de acumular overrides contraditórios. Em Figma, aplique relações equivalentes com Auto Layout, Fill/Hug e min/max. Em SwiftUI/Compose/Flutter, use stacks/constraints/alignment guides do projeto e medidas nativas; não traduza px para pt/dp sem contexto.

## 6. Diagnóstico em ordem

1. **Reproduzir:** viewport em CSS px, zoom, tema, sidebar, estado e conteúdo real. Preserve captura inicial.
2. **Inspecionar o pai:** display, trilhas, eixo, largura disponível, min/max, padding, scroll, transform e posicionamento. Em flex/grid, `min-width:auto` pode impedir encolhimento; investigar `min-width:0` e `minmax(0,1fr)` antes de esconder overflow.
3. **Inspecionar os filhos:** margins padrão de heading/paragraph, line-height, box-sizing, bordas, intrinsic size, imagens e ordem DOM. Estilos computados mostram quem venceu a cascata.
4. **Medir a relação:** bordas compartilhadas, espaço entre caixas, insets e centro. Bordas e scrollbar entram na medição; declare border-box ou content-box. Valores de `getBoundingClientRect()` incluem transforms.
5. **Corrigir a origem:** regra do layout/ancestral ou seletor responsável. Não usar `overflow:hidden`, fonte menor ou posição absoluta para esconder um defeito de estrutura.
6. **Confirmar:** mesma captura + estado estreito + conteúdo extremo. Compare tanto a medida quanto leitura visual e acesso às ações. Corrigir apenas eixos/estados afetados e caminhos dependentes.

Não concentre todos os títulos na mesma coordenada se pertencem a regiões distintas. Não force altura idêntica de cards com conteúdos diferentes sem benefício para a comparação. Documente exceções intencionais; não transforme assimetria deliberada em bug.

## 7. Critérios de aceite

- Eixo e container de referência explícitos; alinhamentos previstos coincidem dentro da tolerância do projeto.
- Insets compartilhados usam a mesma fonte de valor. Uma diferença deliberada tem função reconhecível.
- Nenhum espaçamento deriva acidentalmente de `gap` + margin + wrapper; distância entre grupos é perceptível.
- Campo, ajuda e erro mantêm associação. Linhas multilinha conservam controle e ação visíveis.
- Texto longo, tradução, lista vazia, ação ausente, sidebar aberta/fechada e texto ampliado não causam clipping, sobreposição ou ordem de leitura incoerente.
- Largura estreita segue regra declarada de wrap/stack/scroll; rolagem bidimensional de tabela/mapa é uma exceção intencional, não overflow silencioso da página.
- Elemento fixo/sticky não esconde a última ação. Altura pequena e teclado virtual têm caminho de recuperação.
- Estado de seleção, erro e carregamento não desloca a estrutura sem motivo.

Registre por achado: **alvo → medida/observação → princípio pertinente → alteração → confirmação → limites**. Não atribua aprovação automática por contar leis aplicadas.

## 8. Verificação geométrica reutilizável

`python3 <skill-dir>/scripts/check_layout.py <layout.json>` verifica contratos explícitos sobre caixas coletadas da interface. Use o formato de [layout.example.json](../assets/layout.example.json), marcado como sintético. Ele não abre navegador, não inspeciona pixels e não escolhe quais elementos devem se alinhar.

As coordenadas devem compartilhar o mesmo espaço em CSS px. `viewport` é uma referência reservada para `(0,0,width,height)`. Tipos de check: `align`, `center`, `inset`, `gap`, `containment` e `no-horizontal-overflow`. Cada check declara os elementos e, quando aplicável, valor esperado e tolerância; não derive o esperado da própria medida para fabricar aprovação.

Colete somente os nós relevantes por ferramentas de browser autorizadas (`getBoundingClientRect`, estilos computados e dimensões de scroll). Para `no-horizontal-overflow`, forneça `scrollWidth` e `clientWidth`; para centralização, compare com o painel pretendido. A tolerância padrão de 1 CSS px é técnica e ajustável, não uma lei de UX. Compensações ópticas e scroll intencional precisam de critérios próprios.

Confirme que os nós medidos estão renderizados no estado desejado; caixas de elementos ocultos não comprovam alinhamento visível. Confira também a identidade do CSS carregado: editar o arquivo local sem invalidar uma cópia antiga do navegador não prova que a correção chegou à interface.

Exit 0: contratos declarados satisfeitos; 1: divergência; 2: entrada inválida. Relate o número e escopo dos contratos, nunca “design aprovado” só pelo script. Complete com inspeção visual, teclado e estados extremos. Não use retângulos inventados como evidência de produto.

## Fontes e adaptação

Base consultada: [Laws of UX Skills](https://github.com/keysjoao/laws-of-ux-skills/tree/66f5e5602c8444b123e8b0d287ef9947ef295edc), de keysjoao, especialmente a referência de percepção e o mapeamento por componente; princípios compilados a partir de [Laws of UX, Jon Yablonski](https://lawsofux.com/). As regras de layout e exemplos acima são uma adaptação prática própria. Números de menus, timings, tamanhos e notas automáticas da fonte não foram tratados como requisitos universais.
