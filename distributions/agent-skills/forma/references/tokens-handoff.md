# Tokens, documentação e entrega à implementação

## Extração e migração

1. Liste tema/configuração e componentes representativos. Busque valores com rg; conte uso por contexto, não só ocorrência textual.
2. Relacione valores a papéis: texto primário, borda de input, seleção, espaço entre grupos. Valores iguais podem ter papéis diferentes.
3. Registre origem, consumidores e exceções. Classifique em conservar, consolidar ou substituir.
4. Proponha aliases semânticos, migre um fluxo e verifique antes de propagar ao escopo autorizado.

O [JSON de exemplo](../assets/tokens.example.json) usa formato próprio simples, não alega conformidade com DTCG/Figma. Adapte ao pipeline existente; não o substitua apenas para usar este exemplo.

Para o conjunto fundo/sidebar/painel/controles, a [base de interface limpa](clean-shell.md) oferece consumidores concretos dos tokens. Inspecione também cascata e estados: uma regra de navegação posterior pode trocar altura, seleção e tipografia; extrair somente a primeira declaração ou somente `:root` não reproduz o componente.

Uma paleta extraída de imagem ou gerada por ferramenta ainda precisa ser mapeada a papéis e estados. Use a matriz e o aceite de [refinamento cromático](color-refinement.md) antes de promover candidatos a tokens. Preserve a intenção automática versus a escolha explícita, aliases por modo e a origem dos valores; exportar hex não preserva esses contratos por si só.

## Direção e espaçamento preenchidos

**Superfície:** configurações de um serviço. **Modo:** operar. **Direção:** calma, texto e agrupamento como hierarquia, sem hero. Fonte existente; corpo 1rem/entrelinha 1.5 como início; formulário até 40rem e largura disponível integral no estreito; alinhamento ao início; mensagens semânticas; ação primária no fim.

**Exemplo CSS:** label→campo 8 px; campo→ajuda 4 px; campos relacionados 16 px; grupos 32 px; painel 24 px de padding. A ajuda pertence ao campo, os campos ao grupo e grupos distinguem decisões. Para densidade compacta, experimentar 6/4/12/24/16, preservando interação e leitura. Não importar estes números cegamente para marca existente ou plataforma nativa.

**Aceite:** label em duas linhas não sobrepõe campo; erro cresce no fluxo; tradução longa não é cortada; largura estreita preserva tarefa e margens.

```css
:root {
  --space-field-label: .5rem;
  --space-field-help: .25rem;
  --space-fields: 1rem;
  --space-groups: 2rem;
}
.settings-form { inline-size: 100%; max-inline-size: 40rem; }
.field { display: grid; gap: var(--space-field-label); }
.field-help { margin: 0; }
.field-control-and-help { display: grid; gap: var(--space-field-help); }
.field-group { display: grid; gap: var(--space-fields); }
.field-group + .field-group { margin-block-start: var(--space-groups); }
```

CSS não associa label/input/ajuda: implementar a semântica correspondente. Propriedades lógicas ajudam RTL. Este exemplo explica relações, não é um formulário completo.

## Handoff utilizável

Para componente: anatomia, tokens, variantes, eventos, foco e erro. Para fluxo: estados/transições e dependência de API. Para asset: caminho, dimensão, formato, propósito, origem/licença e variante. Para tela: comportamento estreito/amplo e conteúdo extremo.

O handoff pode caber na descrição da mudança. Não criar arquivos redundantes se código e documentação já explicam a decisão. Com Figma e código, mapear component/variant/prop à implementação e ao token, sem presumir sincronização.

Antes de reconciliar Figma/código, declare a autoridade por escopo e revisão. Registre `papel → token/alias → modo → componente/propriedade → consumidor → evidência`. Um hex igual não prova binding: inspecione IDs, aliases e valores resolvidos nos modos pertinentes. Preserve instâncias e overrides válidos; troca de nome/ID exige conferir consumidores. Se a autoridade não puder ser inferida e a escolha alterar a identidade, obtenha essa decisão antes da mutação dependente.

Entregue editabilidade e perdas por formato conforme [artefatos](artifact-workflows.md). Uma imagem de um componente no Figma ou de um gráfico no PPTX não equivale a componente/gráfico editável.

## Evolução

Classifique mudança como alias sem efeito, visual, comportamental ou quebra de contrato. Identifique consumidores; deprecie com substituto e migração. Não tratar screenshot antigo como referência normativa se produto mudou intencionalmente; registre a versão e o motivo da nova referência.
