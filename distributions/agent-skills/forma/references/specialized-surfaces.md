# Superfícies especializadas

Carregar só para estas superfícies. Critérios de design não substituem guidelines atuais do fabricante ou validação especializada.

| Superfície | Pergunta | Critérios |
|---|---|---|
| Wearable | O que cabe num olhar? | Sessão curta, tipo nativo, alcance, energia, alternativa a haptic e continuidade com telefone |
| TV | Como mover foco e voltar? | Foco visível, ordem espacial, leitura à distância, controle remoto, nenhum hover |
| Kiosk | O que fica após sair? | Alcance físico, toque, privacidade, limpeza de sessão, timeout com aviso e assistência |
| Industrial/automotivo | Qual consequência do erro? | Contexto, distração e revisão especializada; UI não é certificação de segurança |
| AR/VR | Qual tarefa ganha por ser espacial? | Distância/escala, conforto, postura, seleção, movimento reduzido, entrada alternativa e saída |
| Voz | O que requer confirmação? | Turnos curtos, interrupção, reparo, privacidade e fallback textual |
| Vídeo/mídia | Consumir, editar ou apresentar? | Transporte acessível, captions/transcrição, volume, scrub, buffering e direitos |
| Mapas/canvas | A precisão espacial é essencial? | Zoom/pan, desfazer, seleção, unidade, teclado e alternativa de dados |

Declare distância de uso, entrada, duração, ambiente e risco; modele foco/seleção e saída antes de efeitos. Teste no equipamento ou marque simulação. Desktop reduzido não valida wearable/TV/VR.

## Decks e players interativos

Derive playhead, estado e controles do relógio/eventos da mídia real; o botão mostrar “pausado” não prova que um vídeo ou iframe parou. Defina pausa ou continuidade ao sair de cena, descarte de listeners e retorno de ramificações sem áudio duplicado. Mute global deve alcançar as mídias abrangidas pelo contrato, respeitando o suporte de cada player.

Teste play/pause, seek, buffering/falha, próxima cena, retorno e teardown no navegador entregue. Quando houver janelas de apresentador/audiência, verifique ambas: um gesto em uma não comprova autoplay audível na outra. Use controle manual acessível quando a plataforma exigir interação, sem contornar a política. Um deck com ramificações navegáveis não prova que a exportação linear conserva todas as rotas ou mídias; explicite o percurso exportado e valide o arquivo conforme [artefatos](artifact-workflows.md).

## Produto físico e serviço

Para objeto, defina tarefa, dimensões de uso, materiais candidatos, fabricação e manutenção. Protótipo de baixa fidelidade testa pega, alcance, leitura e montagem antes de render final. Confirme tolerâncias com fornecedor/especialista; não invente resistência, certificação ou sustentabilidade.

Para serviço, acompanhe app, embalagem, atendimento e devolução. Marque responsável, entrega ao usuário e recuperação quando um canal falha. Não prometa prazo ou garantia sem capacidade operacional.
