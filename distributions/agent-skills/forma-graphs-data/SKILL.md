---
name: forma-graphs-data
description: "Projetar grafos de conhecimento, mapas, dashboards, séries temporais e exploração de dados com identidade, proveniência e interação verificáveis. Use para relações e leitura analítica; não para transformar dados fictícios ou posição visual em fatos do domínio."
metadata:
  version: 1.17.1
---

# Grafos, mapas e dados

## Quando usar

- Use para links/backlinks, grafo local/global, canvas, mapas geográficos, métricas, histórico e atualização ao vivo.
- Não use para inferir relações reais a partir de proximidade visual ou montar um dashboard sem pergunta de análise.

Este módulo depende de leitura explícita; não inicia consultas, pipelines ou outros módulos automaticamente.
Preserve domínio, marca, stack e fonte de verdade; escolha renderer depois de entender os dados.

## Entradas

- Pergunta que a pessoa precisa responder, dataset/fonte, unidades, período e operação esperada.
- Identidade dos registros, regras de relação/agregação, escala, permissões e exemplos de resultados conhecidos.

## Procedimento

1. Comece por um caso concreto de entrada e resultado; identifique o que é dado, derivação e hipótese.
   Use [playbooks](../forma/references/playbooks.md) para definir o entregável; não trate fixtures como métricas reais.
2. Para grafos, leia [grafos e conhecimento](../forma/references/knowledge-graphs.md).
   Defina identidade, direção, origem, resolução, contagens e rename/delete; separe relações confirmadas, sugestões semânticas, agrupamentos e posição.
3. Para mapas/dashboards, leia [dados temporais e geográficos](../forma/references/data-dashboards.md).
   Fixe unidades, denominadores, timezone/período, agregação, escala e estados stale/sem dados; use [sistemas adaptáveis](../forma/references/adaptive-visual-systems.md) só para tema/canvas pertinente.
4. Implemente filtros, seleção e inspeção com contexto preservado e fonte acessível.
   Leia [interação e conteúdo](../forma/references/interaction-content.md) e, conforme acesso/atualização, [contratos e confiança](../forma/references/contracts-trust.md). Forneça alternativa legível ao canvas.
5. Compare resultados com fixtures conhecidas e execute a tarefa renderizada em escala representativa.
   Use [verificação](../forma/references/verification.md); confira contagens, extremos, estados vazios, teclado e atualização/cancelamento aplicáveis.

## Saída e parada

Entregue visualização utilizável ou especificação pedida, regras de leitura/interação e evidência dos resultados.
Inclua limites de escala, cobertura e atualização efetivamente medidos, sem inventar benchmark.
Pare quando uma pessoa puder responder à pergunta, inspecionar a origem e obter o resultado esperado sem perder contexto.
Um grafo bonito sem relações corretas ou um mapa renderizado com totais errados não atende o aceite.

## Apoios opcionais e limites

`ecc:dashboard-builder`, `ecc:design-system` e `accessibility` podem ajudar com composição analítica, consistência e acesso.
Se presentes, leia o `SKILL.md` atual e [integrações](../forma/references/integrations.md) antes de usar; não suponha conexão a dados ou ferramentas.
Exemplos em memória não demonstram atualização persistida. Não adicione banco, força física, WebGL ou serviço geográfico sem necessidade concreta.
