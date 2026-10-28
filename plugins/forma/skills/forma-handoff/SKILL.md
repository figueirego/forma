---
name: forma-handoff
description: "Preparar e verificar entrega entre design e implementação: Figma, artefatos editáveis, tokens, componentes, exportação e integração no consumidor. Use para materializar o formato de entrega; não para substituir funcionalidade pedida por documentação ou screenshot."
metadata:
  version: 1.21.0
---

# Artefatos, tokens e handoff

## Quando usar

- Use para Figma, código a partir de design, artefato editável, exportação, tokens ou transferência de recurso para outro projeto.
- Não use para publicar biblioteca sem autorização ou apresentar um screenshot completo como interface implementada.

Este módulo instrui o agente após leitura; não conecta serviços, faz exportações nem chama outros módulos automaticamente.
Preserve marca, stack, IDs e fonte de verdade existentes; entregue no formato útil ao destino.

## Entradas

- Artefato/fonte, destino, formato solicitado, escopo de edição e requisitos de conteúdo/estado.
- Componentes/tokens existentes, assets/licenças, acesso às ferramentas e critérios verificáveis de aceite.

## Procedimento

1. Fixe fonte de verdade, rota de produção e natureza da entrega: especificação, editável, código ou arquivo final.
   Leia [artefatos e edição](../../references/artifact-workflows.md); inventarie IDs e dependências reais para evitar duplicação e links inventados.
2. Para Figma ou outro serviço, leia [integrações](../../references/integrations.md) e a skill operacional atual antes de usar ferramentas.
   Inspecione contexto, render, componentes e bindings existentes. Código gerado é referência até estar adaptado, integrado e verificado.
3. Para tokens/componentes, leia [tokens e handoff](../../references/tokens-handoff.md).
   Mapeie papéis, aliases, modos, consumidores e exceções; JSON de exemplo tem formato próprio e não implica conformidade com outro pipeline.
4. Ao transferir capacidade, siga reúso nos [playbooks](../../references/playbooks.md).
   Conecte implementação, eventos, estado, assets e ciclo de vida ao consumidor. BookObject/helper são código; base limpa tem demo; editor/perfil são contratos a implementar.
5. Abra o editável/exportado ou execute o consumidor no destino e confira o resultado final.
   Use [validação renderizada](../../references/rendered-validation.md) e [verificação](../../references/verification.md); valide fontes, assets, tamanhos, links e estados conforme o formato.
   Para entregas múltiplas, confira cada saída e sua revisão no contrato existente. Para vídeo, confira também [duração, frames e áudio](../../references/motion.md#filmes-e-sequências-renderizadas); preview, arquivo renderizado e entrega confirmada são etapas distintas.
   Para recortes, confira [alpha e composição](../../references/artifact-workflows.md#transparência-e-composição) no arquivo final; formato PNG ou preview quadriculado não comprova transparência.

## Saída e parada

Entregue arquivos/links reais, formato, localização, consumidor e instruções mínimas necessárias para uso.
Identifique o que está editável, exportado, integrado, persistido ou apenas especificado, com evidência correspondente.
Pare quando o destinatário puder usar o artefato no formato contratado e o resultado tiver sido aberto/exercitado.
Se faltar integração, runtime ou ferramenta de exportação, declare o limite; não encerre implementação pedida com documentação isolada.

## Apoios opcionais e limites

Figma, Open Design, Superdesign e `ecc:design-system` podem apoiar a rota escolhida; use um serviço principal por artefato quando suficiente.
Se disponíveis, leia seu `SKILL.md` atual e descubra ferramentas reais. Disponibilidade de plugin, conexão e capacidade de edição são verificações distintas.
Não instale serviços, regenere artefatos pagos ou publique por padrão. Contratos e demos em memória não comprovam persistência ou exportação no consumidor.
