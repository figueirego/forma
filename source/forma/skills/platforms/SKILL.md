---
name: forma-platforms
description: "Adaptar experiência à web, mobile, desktop, distribuição e superfícies especializadas, respeitando entrada, navegação e runtime reais. Use para diferenças de plataforma e instaladores; não para escolher framework apenas por aparência ou extensão de arquivo."
metadata:
  version: 1.17.1
---

# Plataformas e distribuição

## Quando usar

- Use para responsividade web, iOS/Android, janelas desktop, instalação/atualização ou superfície especializada.
- Não use para migrar stack sem necessidade ou afirmar comportamento nativo a partir de mockup no navegador.

Este módulo exige leitura explícita; não instala, distribui ou chama outros módulos automaticamente.
Preserve marca, stack e contratos existentes. Identifique o runtime antes de indicar implementação.

## Entradas

- Plataforma, SO/versão e dispositivos alvo; tarefa, modos de entrada, distribuição e restrições conhecidas.
- Manifests/código, navegação atual, suporte prometido e ambientes realmente disponíveis para teste.

## Procedimento

1. Detecte tecnologia e separe aplicação, empacotamento e distribuição.
   Leia [adaptação por plataforma](../../references/platform-adapters.md); EXE/DMG não definem framework ou linguagem visual.
2. Para navegador, leia [web](../../references/web.md); para telefone/tablet/dobrável, [mobile](../../references/mobile.md).
   Adapte navegação, insets, texto, teclado, gesto e área disponível; não imponha controles web à experiência nativa.
3. Para desktop/instalador, leia [desktop e distribuição](../../references/desktop-distribution.md).
   Para TV, wearable, kiosk, voz ou experiências espaciais, leia [superfícies especializadas](../../references/specialized-surfaces.md) e verifique documentação atual pertinente.
4. Implemente a menor adaptação no alvo autorizado, preservando dados e continuidade de tarefa.
   Use os [playbooks](../../references/playbooks.md) pertinentes. Modele interrupção/recuperação de instalação ou atualização quando isso fizer parte do pedido.
5. Execute o fluxo no runtime e nos modos de entrada disponíveis; verifique tamanhos, escala e estados afetados.
   Use [acessibilidade](../../references/accessibility.md) e [verificação](../../references/verification.md); mantenha matriz explícita de ambientes testados e não testados.

## Saída e parada

Entregue adaptação funcional ou especificação pedida, decisões por plataforma e evidência do ambiente usado.
Para distribuição, distinga pacote gerado, assinado, instalado, atualizado e publicado: cada etapa requer prova própria.
Pare quando a tarefa e recuperação pertinentes funcionarem no escopo de suporte contratado.
Sem SO/dispositivo alvo, entregue o trabalho possível e declare runtime não testado; simulação visual não encerra esse requisito.

## Apoios opcionais e limites

`ecc:react-native-patterns`, `ecc:compose-multiplatform-patterns`, `ecc:liquid-glass-design` e `accessibility` podem apoiar a stack/superfície correspondente.
Leia apenas o `SKILL.md` atual do apoio disponível e pertinente, conforme [integrações](../../references/integrations.md); não infira ferramentas a partir do nome.
Não instale frameworks nem publique pacotes pelo roteamento deste módulo. Critérios de design não substituem certificação especializada.
