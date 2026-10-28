---
name: forma-motion
description: "Criar ou auditar feedback, gestos, animações e filmes com continuidade, acesso e custo de execução. Use para movimento interativo ou sequência renderizada; não para animar toda superfície por padrão."
metadata:
  version: 1.21.0
---

# Movimento e feedback

## Quando usar

- Use para transição, gesto, resposta de controle, narrativa visual ou defeito de continuidade/performance.
- Não use para esconder latência, substituir progresso real ou acrescentar efeitos a um pedido sem necessidade de movimento.

Este módulo orienta o agente que o lê; não executa animações nem chama outros módulos.
Preserve marca, stack, interação e expectativas da plataforma.

## Entradas

- Elemento, ação/evento, estado inicial/final, contexto/frequência e problema ou efeito desejado.
- Runtime, mecanismo existente, dispositivos/alvos e comportamento esperado sem movimento.

## Procedimento

Para filme, teaser ou deck animado, siga [filmes e sequências renderizadas](../forma/references/motion.md#filmes-e-sequências-renderizadas): composição, tempo, áudio quando pedido e arquivo final. Os passos de gesto/interrupção abaixo se aplicam a interfaces interativas; não os confunda com edição de uma timeline. Uma correção localizada em filme aprovado não exige refazer seu storyboard.

Quando pertinentes, use [legendas e fala](../forma/references/motion.md#legendas-e-fala), [GIF e loops](../forma/references/motion.md#gif-e-loops) e [players interativos](../forma/references/specialized-surfaces.md#decks-e-players-interativos). Um formato ou player diferente muda a prova necessária; não impõe outra engine.

1. Declare o que muda, por que precisa ser percebido e como a tarefa funciona sem animação.
   Leia [movimento e feedback](../forma/references/motion.md); use refinamento nos [playbooks](../forma/references/playbooks.md) para defeitos localizados.
2. Mapeie estado, gatilho, continuidade, reversão, interrupção e conclusão observável.
   Para foco e cancelamento, consulte [interação e conteúdo](../forma/references/interaction-content.md); não atribua duração visual a uma operação assíncrona desconhecida.
3. Escolha o mecanismo mínimo compatível com a stack e o efeito autorizado.
   Para cenas/3D, leia [web imersiva](../forma/references/immersive-web-tech.md); para pose/material fiel, [fidelidade 3D](../forma/references/3d-reference-fidelity.md). FLIP de posição não comprova interpolação de material.
4. Implemente no consumidor com estado coerente, limpeza de callbacks e alternativa reduzida/estática.
   Consulte [acessibilidade](../forma/references/accessibility.md). Não deixe conteúdo essencial invisível quando o caminho animado falhar.
5. Execute a sequência normal e interrupções: repetir, reverter, sair, trocar tamanho e desmontar quando aplicável.
   Use [validação renderizada](../forma/references/rendered-validation.md) e [verificação](../forma/references/verification.md); só informe custo/desempenho medido.

## Saída e parada

Para interface, entregue movimento integrado ou especificação pedida, gatilhos/estados e comportamento reduzido. Inclua evidência de continuidade e limites de runtime/dispositivo, sem confundir vídeo de demonstração com interação implementada. O aceite inclui interrupção correta e tarefa disponível.

Para filme, entregue a sequência e o formato contratados, com revisão de conteúdo, timing, transições e arquivo final. Confira áudio/silêncio e variantes solicitadas; não imponha os testes de input de uma interface a um MP4. Pare quando os critérios aplicáveis estiverem verificados. Storyboard, snippet, preview e render final devem ser identificados pelo estágio efetivamente entregue.

## Apoios opcionais e limites

`design-motion-principles`, `ecc:motion-foundations`, `ecc:motion-patterns` e `ecc:motion-advanced` podem responder dúvidas específicas.
Selecione apenas o apoio pertinente e leia seu `SKILL.md` atual, se disponível, conforme [integrações](../forma/references/integrations.md); não há invocação automática.
Não instale uma biblioteca de animação para um efeito que a stack resolve nem substitua um mecanismo 3D explicitamente contratado por transformações CSS.
