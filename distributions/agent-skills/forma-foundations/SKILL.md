---
name: forma-foundations
description: "Definir ou refinar hierarquia, tipografia, cor, layout, espaçamento e tokens de um sistema visual. Use para inconsistências de composição ou fundações; não para redesenhar fluxos de produto ou reproduzir um mecanismo 3D."
metadata:
  version: 1.26.1
---

# Fundações visuais

## Quando usar

- Use para paleta, contraste cromático, tipografia, ritmo, alinhamento, densidade e tokens.
- Não use para decidir pesquisa de produto, integrar objetos 3D ou tratar uma falha de persistência como styling.

Este módulo orienta o agente após leitura explícita; não executa ferramentas nem chama outros módulos.
Preserve marca, stack e decisões aprovadas. Uma correção local não autoriza uma nova identidade.

## Entradas

- Superfície e problema observável, ou direção nova autorizada; conteúdo e tamanhos representativos.
- Tokens, estilos, componentes, assets e referência existentes; estados e consumidores afetados.

## Procedimento

1. Inspecione o alvo e fixe baseline, fonte de verdade e critério observável.
   Use o trecho de [playbooks](../forma/references/playbooks.md) se precisar estruturar trabalho amplo; leia [sistema visual](../forma/references/visual-system.md) ao consolidar valores/tokens. Um gap local pode ir direto ao contrato espacial.
2. Se o problema for composição, declare container, eixos, insets, grupos e regra de adaptação.
   Leia [contratos espaciais](../forma/references/layout-spatial-contracts.md); meça cascata e conteúdo antes de alterar a escala global.
3. Se envolver cor, separe ação, texto, superfície, ambiente e estados.
   Consulte [refinamento cromático](../forma/references/color-refinement.md); avalie modos, alpha e fundos reais. Para direção aberta, use [direções](../forma/references/design-directions.md).
4. Aplique a menor mudança no consumidor real e examine os demais usos do token alterado.
   Para migração ou aliases, leia [tokens e handoff](../forma/references/tokens-handoff.md); adapte exemplos ao pipeline existente, sem impor outro formato.
5. Compare conteúdo e estados equivalentes em tamanhos pertinentes.
   Use os trechos pertinentes de [verificação](../forma/references/verification.md) e [validação renderizada](../forma/references/rendered-validation.md), sem carregar toda a matriz para um ajuste local; contraste isolado não confirma composição ou fidelidade.

## Saída e parada

Entregue a alteração solicitada, papéis/tokens afetados, decisão material e evidência do consumidor.
Se a tarefa for especificação, entregue regras implementáveis com exemplos e valores identificados como medidos ou propostos.
Pare quando os aceites de hierarquia, alinhamento, leitura e adaptação forem atendidos sem regressão relevante.
Se faltar acesso ao render ou uma escolha de identidade, registre a lacuna e o que continua sem validação.

## Apoios opcionais e limites

`ecc:design-system`, Impeccable e Font Pairing podem resolver dúvidas específicas de consistência, composição ou fontes.
Se disponíveis e pertinentes, leia o `SKILL.md` atual antes de usá-los, conforme [integrações](../forma/references/integrations.md). Um nome não garante ferramenta ou conexão.
Não instale apoios por padrão. Snippets e JSONs de exemplo não são um design system já integrado; confirme uso e efeito no destino.
