# Heurísticas de UX aplicadas

Inspirado na organização de Laws of UX e no aprendizado por prática de UXplained. Use apenas as heurísticas que explicam um problema observado. Elas não são provas universais, limites numéricos obrigatórios nem motivo para manipular usuários.

| Família | Princípios | Aplicação e limite |
|---|---|---|
| Percepção | Proximidade, semelhança, região comum, conexão uniforme, Prägnanz | Relacionar elementos pelo agrupamento; não encaixotar toda tela |
| Aquisição e escolha | Fitts, Hick, sobrecarga de escolha | Aumentar alvos e organizar opções; não esconder funções importantes só para reduzir contagem |
| Memória | Chunking, memória de trabalho, Miller, posição serial | Manter contexto e agrupar; 7±2 não é regra de menu |
| Familiaridade | Jakob, modelos mentais, paradoxo do usuário ativo | Convenções úteis e aprendizado durante uso; não copiar produto cegamente |
| Foco e complexidade | Carga cognitiva, atenção seletiva, Tesler, Occam | Simplificar trabalho e expor complexidade necessária no momento certo |
| Feedback | Doherty, flow, goal-gradient | Resposta rápida e progresso verdadeiro; animação não torna rede mais rápida |
| Lembrança | Peak-end, Zeigarnik, Von Restorff | Encerrar com clareza e destacar pendências; evitar culpa, ansiedade e distração |
| Julgamento | Efeito estética-usabilidade, viés cognitivo | Aparência afeta percepção, mas não corrige funcionalidade; usar persuasão honesta |
| Robustez e prioridade | Postel, Pareto, Parkinson | Aceitar formatos seguros e priorizar tarefas reais; não relaxar validação ou inventar percentuais |

## Procedimento

Para centralização, alinhamento e organização, consulte o [mapeamento de leis para relações espaciais](layout-spatial-contracts.md#4-organização-orientada-à-tarefa-e-leis-de-ux). Distinga o princípio da receita numérica sugerida por uma fonte: nomes de leis não justificam limites arbitrários de opções, padding fixo ou nota universal.

1. Descreva o problema em termos de tarefa: “o usuário associa o erro ao campo errado”.
2. Identifique evidência: distância, estrutura, comportamento ou observação de teste.
3. Escolha princípio explicativo: proximidade e feedback.
4. Proponha mudança pequena: aproximar erro e associá-lo semanticamente ao campo.
5. Verifique sucesso: compreensão, leitura por tecnologia assistiva, correção do dado.

Em código, forneça correção na stack real. Em Figma, descreva relações/layout/estados. Em pesquisa, formule hipótese testável. Não force JSX em uma auditoria de app nativo ou artefato físico.

## Prática deliberada

Para aprender, escolha um fluxo curto, capture baseline, altere uma relação importante e compare. Explique o efeito esperado e o observado. O formato de desafio de UXplained inspira esse método; regras de submissão de cada issue pertencem àquela atividade e não são incorporadas à skill geral.
