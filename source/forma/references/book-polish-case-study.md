# Livro aprovado: do sintoma à correção verificável

Caso de aplicação de 26/10/2026, incorporado na versão 1.13.1 e distribuído como síntese neutra na 1.13.2. Use quando um objeto funciona, mas o acabamento ainda não acompanha a referência, ou quando precisar transformar uma correção aprovada em componente reutilizável. O protocolo geral está em [fidelidade 3D](3d-reference-fidelity.md); API e integração em [objetos reutilizáveis](reusable-objects.md).

## Resultado e identidade

O usuário aprovou o resultado visual corrigido com “ficou perfeito!!”. O [BookObject distribuído](../assets/book-object.js) tem os mesmos bytes do componente aprovado no Pauta: SHA-256 `17bf1f572d0eaabc8486866fcf4b8b0cb9524bf191151d20580cb881b54e7cd4`. A aprovação é daquele resultado apresentado, não certificação universal de todos os materiais, dispositivos ou poses.

O [manifesto de evidências](../assets/audits/book-polish-2026-10-26/manifest.json) preserva hashes, escopos, limites e o identificador neutro do caso. O [perfil material de referência](../assets/reference-profiles/desktop-material-reference-v1.json) conserva as medidas e os mecanismos observados. As capturas comparativas e os relatórios originais, com atribuição à fonte, ficam no histórico externo de autoria. Não são necessários para executar o componente, mas esta síntese não substitui a inspeção dessas evidências quando uma afirmação histórica precisar ser revalidada.

## O que o refinamento ensinou

| Sintoma | Causa demonstrada | Correção adotada | Regressão útil |
|---|---|---|---|
| Faixa de brilho da lombada parecia rígida | Curvatura e normais do canal divergiam, mesmo com material semelhante | Mais amostras na transição; curvatura localizada; campo impresso preservado plano | Comparar normais/contorno e imagem sob luz fixada; não aumentar brilho como compensação |
| Aro e encontro da capa tinham degrau/fresta | Arredondamento linear e bordas de superfícies diferentes não coincidiam | Arco segmentado e ponte compartilhando a fronteira da parede | Fechamento, orientação, contato e raios oblíquos; malha fechada sozinha não prova contato entre peças |
| Mistura de trama, grão e brilho parecia outra | Overlay escolhia o ramo pelo operando errado; campo procedural era consumido de modo diferente | Respeitar ordem dos operandos e trajetória de amostragem do consumidor | Valores assimétricos distinguem as duas ordens; textura 2D não prova variação nas duas coordenadas |
| Metal apresentava trajetória/halo incorretos | Transformação vertical do campo e fundo não nulo na máscara | Corrigir V em relação ao `flipY`; fundo zero e cobertura antialias contínua | Verificar trajetória, máscara 0/1 e cobertura intermediária, sem converter a máscara em teste binário |
| Páginas tinham estrias fortes após corrigir o material | UV projetado em x/y também nas faces x/z e y/z; a espessura não variava a amostra | Ilhas por face, variando os dois eixos tangentes; duplicar somente costuras | Área UV não nula, frequência por face e posições/normais preservadas; não borrar a textura |
| Um closeup parecia bom, outros ângulos revelavam problemas | Aprovação feita com pouca cobertura e condições diferentes | Matriz de poses fixa, revisão por dimensão, mesma calibração e captura da pose efetiva | Registrar falhas remanescentes e testar consumidores reais, não só a bancada isolada |

Os números deste livro são um perfil de implementação, não receita para qualquer objeto. Por exemplo, 49 amostras no canal, quatro segmentos no aro, raio de canto 0,032W, campo 96×96 e a matriz de 32 poses atendem esta comparação. Em um mascote ou outro produto, escolha geometria, amostragem e orçamento a partir da sua referência e das vistas críticas.

## Sequência que deve ser reutilizada

1. **Fixar o alvo:** versão, conteúdo, cor, material, pose, luz, tamanho nominal, viewport real, DPR e resolução dos atlas/buffers. Confirmar também o código servido e o hash da revisão.
2. **Separar os mecanismos:** silhueta, normais, contato, UV, cor difusa, relevo, máscara/reflexo, tipografia e apresentação. Seguir configuração → consumidor → saída; um nome de biblioteca ou opção não demonstra comportamento.
3. **Reproduzir o defeito:** selecionar a vista que o expõe e fazer uma medição ou amostra discriminante. Não acumular alterações especulativas de luz, rugosidade e cor.
4. **Corrigir a menor causa:** preservar API, identidade, fallback, ciclo de vida e componentes já aprovados. Quando a geometria está correta e apenas UV falha, conservar posições e normais.
5. **Provar o mecanismo e olhar o resultado:** regressão matemática/estrutural mais comparação renderizada nas poses afetadas; em seguida percorrer os demais lados e consumidores relevantes.
6. **Distribuir o que foi aprovado:** asset, contrato, testes, evidências e limitações devem apontar à mesma revisão. Verificar cópia instalada e pacote extraído; não manter um exemplo antigo na skill.

Para outro processo de refinamento, transferir essa cadeia de decisão e evidências. Não transferir automaticamente as dimensões do livro, sua paleta, marca, shader ou quantidade de capturas.

## Auditoria preservada fora do pacote

O histórico original conserva diagnóstico, comparações de geometria e materiais, revisões planas e inclinadas, correções, capturas das 32 poses antes/depois, manifesto de isolamento do renderer e registros de testes. A localização no projeto de autoria e o hash do manifesto original constam no manifesto distribuído. Esse diretório externo não é uma dependência de instalação e pode não acompanhar uma cópia da skill.

A distribuição mantém o componente próprio, os testes, o perfil numérico e os aprendizados. Não inclui capturas com identidade de outro produto, bundles, malha, shader, fontes ou símbolos proprietários. O identificador neutro nomeia uma observação documentada; não atribui a criação da referência ao autor da skill. Se o histórico externo não estiver disponível, declare esse limite e produza evidência nova para validar adaptações.

Os 176 testes do produto registrados no histórico pertencem à auditoria visual anterior; não foram reexecutados nesta atualização de nomenclatura. As regressões portáveis abaixo verificam o código efetivamente distribuído.

## O que foi demonstrado e o que permanece limitado

- Erro angular de normal nas três amostras do canal: 6,88/9,09/6,93° → 0,22/1,35/0,50°. Não é erro global de toda a malha.
- Fechamento das quatro peças, contato amostrado e 841 raios oblíquos na antiga fresta; nenhuma abertura visível nas 32 poses revisadas. Páginas ganharam 492 vértices de costura UV, preservando os 11.536 triângulos. Modelo completo: 25.132 → 33.436 triângulos; não houve benchmark GPU.
- Poses: oito yaws × quatro pitches, com luz fixa e conteúdo/cor equivalentes. As 32 capturas usam revisão `9a0553fc…`; a revisão final `17bf1f57…` muda apenas um comentário de procedência. Repouso final e responsivo foram capturados com a revisão final.
- Referência executada: renderer isolado da referência desktop, build 0.19.0. Não foram 32 capturas do aplicativo nativo. Viewport da comparação: 828×1143; testes responsivos em iframe com 390×844 e 1280×900 reais. Override solicitado que não se aplicou foi descartado como prova de responsividade.
- Foram exercitados páginas, verso, reposição, redução de movimento e estático/WebGL; também grade/couro/tinta no desktop. Isso não prova todas as combinações de cor/material, touch físico, Windows ou desempenho.
- Diferenças ainda observáveis: aro superior um pouco mais escuro/espesso a −60°, concavidade ligeiramente maior na junção papel/lombada e marca própria diferente. A aprovação do usuário não elimina esses registros nem estabelece porcentagem de fidelidade.

## Repetir a regressão do pacote

Use os testes de [BookObject](../tests/book-object.test.cjs), [geometria](../tests/book-geometry.test.cjs), [material](../tests/book-material-fidelity.test.cjs) e [cores](../tests/library-colors.test.cjs). Todos resolvem o asset dentro da própria skill. Para executar também as verificações geométricas reais, aponte `BOOK_THREE_MODULE` ao módulo ES de Three já disponível no projeto; não instale uma dependência só porque esta referência a menciona.

```bash
BOOK_THREE_MODULE=/caminho/absoluto/three.module.js node --test /caminho/da/skill/tests/*.test.cjs
```

Sem essa variável, os testes geométricos dependentes de Three são explicitamente ignorados. Registre essa limitação; teste pulado não é teste aprovado. A versão 1.13.1 foi verificada com Three r186: 50 testes JS passaram; sem o módulo, 43 passaram e sete foram ignorados. Isso verifica os contratos da implementação distribuída, não substitui a matriz visual em um novo consumidor.

Na revisão do pacote, uma mutação que restaurava apenas o chanfro linear ainda passava no teste que contava normais intermediárias. A regressão foi reforçada com seis interseções nas seções do aro superior/inferior: agora mede a forma curva e reprova essa reversão. Isso reforça a regra de verificar se o teste realmente distingue o defeito, sem alterar o asset visual aprovado.
