---
name: forma-product
description: "Investigar tarefas de usuários, formular hipóteses, organizar informação e projetar fluxos de produto com pesquisa proporcional. Use quando a dúvida for sobre necessidade, sequência ou entendimento; não para ajustes cromáticos isolados ou fabricar evidência de usuários."
metadata:
  version: 1.19.0
---

# Produto, pesquisa e fluxos

## Quando usar

- Use para brief, jornada, arquitetura da informação, onboarding, hipóteses e teste de tarefa.
- Não use para abrir descoberta completa diante de um padding incorreto ou de uma direção já decidida.

Este módulo é instrução lida pelo agente; não agenda pesquisa, envia convites nem chama outros módulos.
Preserve contexto, marca, stack e compromissos existentes; separe descoberta de implementação autorizada.

## Entradas

- Público/contexto conhecido, tarefa principal, problema, canal, restrições e decisão que precisa de evidência.
- Fluxo atual, dados/contratos acessíveis e fontes de observações; hipóteses devem estar identificadas.

## Procedimento

1. Formule uma entrada e um resultado concretos, com condição observável de sucesso.
   Leia [produto e pesquisa](../forma/references/product-research.md); diferencie operador, comprador e pessoa afetada quando isso mudar a decisão.
   Se houver histórico aprovado e plano novo, leia [evolução de produto aprovado](../forma/references/approved-product-evolution.md). Concilie as fontes antes de mudar jornada, plataforma ou stack; aprovação visual não comprova capacidades de backend.
2. Escolha o menor método capaz de esclarecer a dúvida.
   Para teste, leia [pesquisa prática](../forma/references/research-protocol.md); para diagnóstico fundamentado, [heurísticas](../forma/references/ux-heuristics.md). Heurísticas não são resultados de pesquisa.
3. Modele fluxo principal, decisões, espera, erros, cancelamento e retorno.
   Use [interação e conteúdo](../forma/references/interaction-content.md) e, se houver permissões/offline/IA, [contratos e confiança](../forma/references/contracts-trust.md).
4. Produza o artefato autorizado que permita avaliar a hipótese: sequência, protótipo ou fatia implementada.
   Adapte o playbook de nova tela ou redesign em [playbooks](../forma/references/playbooks.md); use [modelos](../forma/references/templates.md) só quando reduzirem ambiguidade.
5. Compare com a tarefa e o contexto fixados; registre assistência, erro e recuperação quando executar teste.
   Consulte [verificação](../forma/references/verification.md). Se não houver participantes, declare avaliação interna; não a apresente como validação com usuários.

## Saída e parada

Entregue decisão, fluxo e estados, evidência disponível e próximo teste apenas para a incerteza restante.
Se foi pedida implementação, entregue o fluxo no produto e confirme o resultado; um mapa de jornada não conclui esse pedido.
Pare quando a decisão puder ser sustentada pelos dados disponíveis e o entregável autorizado estiver concluído.
Se o sucesso depender de pesquisa ainda não realizada, marque a hipótese como pendente e evite inventar personas, entrevistas ou métricas.

## Apoios opcionais e limites

Product Design, `ecc:product-lens` e `ecc:click-path-audit` podem apoiar pesquisa, diagnóstico e análise de fluxo.
Quando disponíveis e pertinentes, leia o `SKILL.md` atual e [integrações](../forma/references/integrations.md) antes do uso. Disponibilidade não autoriza contato externo.
Não instale métodos ou serviços por conveniência; use dados fictícios quando suficientes e não envie dados pessoais sem necessidade/autorização.
