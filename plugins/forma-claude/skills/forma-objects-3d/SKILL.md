---
name: forma-objects-3d
description: "Integrar ou refinar objetos materiais reutilizáveis, BookObject, livros, capas e mascotes 2D/3D, incluindo geometria, materiais, gestos e lifecycle. Use para mecanismo e fidelidade do objeto; não para adicionar 3D decorativo a toda interface."
metadata:
  version: 1.19.0
---

# Objetos, material e 3D

## Quando usar

- Use para reutilizar BookObject, corrigir material/volume, preservar um mascote ou adaptar cena/objeto autorizado.
- Não use para pressupor WebGL diante de qualquer cartão, perfil, mascote ou imagem de campanha.

Este módulo orienta execução após leitura; não inicia renderer, geração ou outros módulos sozinho.
Preserve marca e stack. Quando o pedido incluir 3D real, CSS inclinado não satisfaz esse aceite.

## Entradas

- Objeto e consumidor de destino, mecanismo solicitado, referência/versão, estados e vistas relevantes.
- Código/assets disponíveis, loader/dependências, identidade autorizada, limites de execução e fallback.

## Procedimento

1. Fixe conteúdo, geometria, materiais, comportamento e integração; separe evidência estática e runtime.
   Leia [objetos reutilizáveis](../../references/reusable-objects.md) e reúso nos [playbooks](../../references/playbooks.md); confirme se o objeto cabe no contrato do BookObject.
2. Para BookObject aprovado, inspecione o asset distribuído e seu consumidor; adapte parâmetros sem reescrever malha/material por palpite.
   Leia [caso de refinamento](../../references/book-polish-case-study.md). Para capa/folhas articuladas já existentes, borda em tira ou couro sem corpo, consulte o [caso do passaporte](../../references/passport-polish-case-study.md): diagnostique superfície, encaixe, UV e luz antes de mudar espessura. É conhecimento de um consumidor CSS 3D, não um novo asset BookObject. Para mascotes, use [refinamento de mascotes](../../references/mascot-refinement.md) e preserve silhueta, vazios e expressão.
3. Se houver divergência, rastreie configuração até geometria, UV, normais, shader, fonte, buffer e saída.
   Use [fidelidade do pacote ao pixel](../../references/3d-reference-fidelity.md); para escolher mecanismo/custo de cena, [web imersiva](../../references/immersive-web-tech.md).
   Para páginas articuladas, consulte também a seção de folhas/divisória do caso do passaporte: distinguir início do papel, inset do conteúdo e pivô do gesto; conferir ligação dos dois lados e sobreposição que pode atravessar a capa ao fechar.
4. Integre código e assets ao projeto de destino, com loader válido, eventos, resize, descarte e erro/fallback.
   Conecte estado e persistência solicitados. Snippet, contrato ou arquivo copiado sem consumidor não é mecanismo disponível em execução.
5. Observe o caminho principal e teste vistas/gestos pertinentes, materiais, conteúdo extremo e desmontagem.
   Use [validação renderizada](../../references/rendered-validation.md) e [verificação](../../references/verification.md); valide fallback e redução de movimento separadamente.

## Saída e parada

Entregue o objeto integrado ou especificação pedida, API efetivamente usada e evidência do renderer no destino.
Registre o que foi integrado, adaptado, substituído ou não testado; comparação de bibliotecas não prova equivalência visual.
Pare quando o consumidor exercitar o mecanismo solicitado e vistas, gestos e material atenderem ao aceite fixado.
Se apenas fallback funcionar, não conclua que o volume/renderer principal foi validado. Declare a dependência concreta restante.

## Apoios opcionais e limites

REA pode esclarecer mecanismo desconhecido; `design-motion-principles` pode apoiar gestos; `ecc:blender-motion-state-inspection` só cabe quando houver contexto Blender.
Confira disponibilidade e leia o `SKILL.md` operacional atual, quando existir, conforme [integrações](../../references/integrations.md); não suponha ferramentas pelo nome.
Não instale engines ou troque stack por associação visual. Materialidade, geração de imagem e geometria executável são entregáveis distintos.
