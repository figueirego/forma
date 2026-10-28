---
name: forma-validation
description: "Validar tarefa, acessibilidade, render, estados e fidelidade com evidência proporcional e achados reproduzíveis. Use para QA e confirmação após mudanças; não para certificar áreas não acessadas ou considerar build/testes isolados como prova visual."
metadata:
  version: 1.22.0
---

# Validação e qualidade

## Quando usar

- Use para auditoria, aceite, regressão, acessibilidade, comparação renderizada e confirmação de recursos integrados.
- Não use para inventar notas, declarar conformidade completa por automação ou ampliar uma auditoria para edição não autorizada.

Este módulo requer leitura pelo agente; não dispara testes, correções nem outros módulos sozinho.
Preserve escopo, marca e stack. Distinga verificado, inferido, não testado e não aplicável com motivo.

## Entradas

- Artefato/rota, revisão realmente carregada, tarefa, critérios de aceite e estados/dispositivos suportados.
- Baseline quando houver comparação, dados/fixtures e ferramentas/ambientes efetivamente disponíveis.

## Procedimento

1. Monte uma matriz proporcional ao risco e ao pedido antes de julgar.
   Leia [verificação](../../references/verification.md); selecione dimensões e prova mínima, sem exigir todas para uma correção pequena.
   Ao consumir gates de agentes/renderers, confira [cobertura e recibos](../../references/verification.md#cobertura-de-verificadores-e-recibos): pass sem medição, zero itens julgados ou revisão antiga não aprovam a entrega atual.
2. Confirme identidade da execução e percorra a tarefa por entrada, ação, sucesso e recuperação.
   Use [validação renderizada](../../references/rendered-validation.md); confira persistência após reabrir se prometida e diferencie protótipo em memória de operação real.
3. Para acesso, leia [acessibilidade](../../references/accessibility.md) e exercite teclado, foco, semântica, zoom e alternativas pertinentes.
   Se houver layout/cor afetados, use [contratos espaciais](../../references/layout-spatial-contracts.md) e [refinamento cromático](../../references/color-refinement.md).
4. Para referência ou reúso, teste a operação que distingue o mecanismo pedido da aproximação.
   Consulte reúso nos [playbooks](../../references/playbooks.md) e [fidelidade](../../references/reference-fidelity.md); observe caminho principal, fallback e estados relevantes separadamente.
   Quando houver valores de referência congelados, execute o [verificador de fidelidade](../../references/fidelity-contracts.md) sobre medições do consumidor. Campo ausente, NaN, ponto omitido ou revisão diferente não viram aprovação por média. Uma fixture numérica aprovada não comprova que o navegador carregou a revisão nem que o contrato cobre tudo; confirme essas evidências separadamente.
5. Registre falhas com reprodução, efeito, severidade e correção mínima; corrija somente dentro da autorização existente.
   Reconfirme estados afetados e caminhos críticos, preservando capturas antes/depois. Testes adicionais precisam responder a uma preocupação restante.
6. Ao alterar a própria Forma, use [operação do plugin](../../references/plugin-operation.md) e o [protocolo de avaliação](../../evals/routing-scenarios.md#comparar-versões-sem-confundir-as-provas).
   Integridade do pacote, descoberta no host, decisão do agente e operação no consumidor têm aceites separados.

## Saída e parada

Entregue resultado por critério, evidência/ambiente, achados acionáveis e limites de cobertura.
Scripts auxiliares verificam seus contratos de entrada; sua aprovação não substitui observação no produto.
Pare quando os critérios pertinentes tiverem prova e não houver bloqueio relevante, ou conclua a auditoria com falhas claramente abertas.
Sem acesso ao runtime, declare o que a análise estática confirma e o que permanece sem teste; não trate limitação como aprovação.

## Apoios opcionais e limites

`accessibility`, `ecc:browser-qa`, `e2e-testing` e `ecc:click-path-audit` podem apoiar uma lacuna concreta.
Leia o `SKILL.md` atual do apoio disponível e [integrações](../../references/integrations.md) antes de usar; nome de skill não comprova runner conectado.
Não crie suítes que apenas espelham a implementação. Evidência de teste, inspeção visual e validação da tarefa respondem a perguntas diferentes.
