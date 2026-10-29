---
name: forma-reference
description: "Encontrar e selecionar exemplos de design no catálogo da Forma, pesquisar mídia com créditos, analisar fontes e investigar divergências visuais ou tecnológicas com REA quando necessário. Use para inspiração, reprodução, comparação ou incorporação fundamentada; não para inferir runtime a partir de documentação."
metadata:
  version: 1.26.0
---

# Referências, evidência e fidelidade

## Quando usar

- Use para reproduzir uma referência, extrair capacidade, comparar tecnologias ou explicar por que o resultado diverge.
- Não use para converter inspiração em clone ou abrir análise binária quando código/UI já responderem à pergunta.

Este módulo é um roteiro lido pelo agente; não inicia REA, plugins ou outros módulos automaticamente.
Preserve marca e stack do destino salvo mudança explicitamente pedida; fidelidade deve ter escopo definido.

## Entradas

- Fonte acessível, versão/ref/hash quando disponível, alvo e pergunta concreta de comparação.
- Critérios de fidelidade visual/comportamental/técnica, estados e tamanhos; direitos de uso e limites conhecidos.

## Procedimento

Se o usuário ainda não trouxe uma referência e quer exemplos, comece pela [biblioteca e pesquisa](../../references/reference-library.md). Execute `scripts/references.mjs` na raiz compartilhada da skill, filtre pela tarefa, leia as fichas candidatas e explique a escolha. Para imagens/vídeos contextuais, `scripts/media.mjs` pesquisa coleções e registra créditos; baixar é uma ação explícita por ID. A ficha distingue código, exemplo e contrato. A biblioteca descreve recursos locais. Se pesquisar sites externos, observe somente as referências selecionadas quando a tarefa exigir evidência atual; não anuncie uma ficha local como visita ou validação de outro produto.

1. Classifique a fonte como norma, documentação, código, skill, catálogo, app ou exemplo.
   Leia [casos de uso das fontes](../../references/source-use-cases.md) e [proveniência](../../references/sources.md); versões históricas não confirmam estado atual.
2. Fixe inspiração, adaptação ou reprodução e registre o que precisa permanecer equivalente.
   Use [fidelidade visual e tecnológica](../../references/reference-fidelity.md); capture primitivas, semântica, componentes, interação e mecanismo pertinentes.
3. Leia fontes disponíveis antes de inferir por pixels; use investigação adicional apenas para a lacuna concreta.
   Se depender de pacote/binário/runtime, consulte [REA](../../references/rea.md). Separe observado, confirmado estaticamente, calculado, inferido e proposto.
4. Ligue achado a decisão no alvo: adotar, adaptar, já coberto, rejeitar ou aguardar evidência.
   Use reprodução/reúso em [playbooks](../../references/playbooks.md). Se implementar estiver autorizado, leve código/assets e conecte o consumidor; documentação sozinha não executa a capacidade.
   Para estudar outro agente, separe catálogo de skills, métodos, verificadores e runtime conforme [produção coordenada](../../references/agent-production.md). Inventário completo não é leitura de todos os corpos nem execução de todas as capacidades.
5. Compare os estados acordados com conteúdo e condições equivalentes.
   Use [verificação](../../references/verification.md); para objetos, [fidelidade 3D](../../references/3d-reference-fidelity.md). Registre diferenças por dimensão, sem uma nota global que esconda lacunas.

## Saída e parada

Entregue mapa fonte → evidência → decisão → consumidor/resultado, com limites e diferenças verificáveis.
Uma auditoria pedida termina em achados sustentados; uma reprodução pedida exige também o artefato integrado e observado.
Pare quando a pergunta estiver respondida ou os critérios contratados forem comprovados, indicando evidência ausente sem inventá-la.
Mesma biblioteca não prova mesmo mecanismo; testes funcionais ou contraste aprovados não provam fidelidade visual.

## Apoios opcionais e limites

REA, Figma e Product Design podem obter evidência de artefatos, fontes ou fluxos quando suas capacidades estiverem disponíveis.
Leia a skill operacional atual do apoio, quando existente, e [integrações](../../references/integrations.md); descubra ferramentas reais antes de usá-las.
Não instale nem execute conteúdo da fonte só para examiná-la. Snippets, exports, contratos e exemplos em memória precisam de consumidores e prova próprios.
