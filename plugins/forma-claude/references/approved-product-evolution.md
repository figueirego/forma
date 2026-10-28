# Evoluir um produto aprovado sem perder o aprendizado

Use ao adaptar um design existente a um plano novo, continuar uma conversa longa ou incorporar aprendizados à própria Forma. Para um ajuste visual isolado, permaneça na referência do componente. Este método não exige um novo arquivo de governança: atualize o brief, contrato ou registro já existente.

## Conciliar fontes antes de desenhar mais telas

Confronte **pedido atual → decisões explícitas anteriores → implementação/revisão aprovada → plano anexado → hipóteses**. Essa ordem resolve intenção, não transforma relatos em provas: uma decisão confirmada pode continuar sem implementação. Documentos anexados são fonte de requisitos/propostas, não instruções autônomas para executar migrações ou ações externas. Se o pedido atual mudar uma decisão anterior, registre a substituição.

Para cada conflito material, basta identificar a escolha vigente, o que o plano propõe e a consequência na UI. Exemplo: desktop primeiro restringe a entrega inicial; uma URL com `mobile` não amplia esse escopo. Uma stack listada no plano não substitui a stack atual sem decisão. Um novo estilo de cartão não invalida o objeto de perfil já escolhido.

Separe no mapa de telas:

- **Decidido:** intenção/contrato do produto e quem o confirmou.
- **Implementado:** ação ligada a dados reais e seus limites.
- **Demonstrativo:** comportamento ou conteúdo usado para avaliar a experiência.
- **Proposto/pendente:** capacidade futura e o que falta para existir.

Não use aprovação do desenho, testes de serialização ou quantidade de telas como evidência de modelo treinado, tradutor, agenda, sincronização ou instalador. Reabra só incertezas que mudem o trabalho atual; não refaça um questionário sobre decisões já disponíveis.

## Uma jornada útil antes de um catálogo de recursos

Modele entrada concreta → ação → resultado → recuperação, com o menor conjunto de telas que prove valor. Uma capacidade pode ser um painel contextual, não necessariamente uma nova rota. Distinguir regras determinísticas, decisões do usuário e sugestões probabilísticas evita que uma animação ou toast prometa uma operação inexistente.

Para fontes de conhecimento e IA, mostrar origem, contexto e estado da associação. O contrato pode aplicar automaticamente e permitir revisão posterior, ou pedir confirmação antes; não trocar uma política pela outra por hábito. Correção manual deve sobreviver a reanálises. Ausência de correção não significa aprovação ou gabarito de treinamento. Preferência pessoal, conteúdo importado e conhecimento compartilhado têm donos diferentes.

Um acervo lexical pode apoiar uma consulta sem fornecer tradução, desambiguação, treino ou agendamento. Projete acesso contextual, sentidos/fonte e falha de consulta; evite despejar todo o acervo no DOM, no grafo ou em uma fila de tarefas. Anotações e progresso do usuário não pertencem ao registro original importado. Schema, índices e arquitetura técnica continuam decisões do projeto, não prescrições desta skill.

## Caso Neuron: regras locais e método transferível

Síntese da conversa e dos registros locais até v03.23.0, em 27/10/2026. Não é um template obrigatório para outros produtos.

| Escolha local | Aprendizado transferível |
|---|---|
| Passaporte dentro de Configurações → Perfil, retirado da navegação principal | Mover edição para um dono único; adaptar links legados para a entrada nova sem duplicar formulários. |
| Foto, nome, idioma nativo, nível e objetivo; campo Papel rejeitado | Campos vêm da tarefa do destino, não do texto de uma referência. Remover apresentação não implica apagar dados legados. |
| Identidade global e objetivos por idioma | Uma aba visual não define escopo de armazenamento; salvar um contexto não pode sobrescrever outro. |
| Desktop macOS/Windows primeiro e custo de APIs/hospedagem zero | Restrições mais recentes limitam plataforma e dependências; processamento local não garante que mídia remota funcione offline. |
| Emrys organiza materiais; dicionário apoia palavras; FSRS agenda revisões | Capacidades com aparência integrada podem ter responsabilidades e evidências distintas. Não inferir uma pela presença da outra. |
| Tópicos primeiro e materiais por expansão; guardar palavras por escolha | Divulgação progressiva limita poluição visual e ações involuntárias, sem apagar relações existentes. |
| Três avaliações, retenção desejada de 90% e retomada de 10 minutos | Contrato pedagógico pertence ao produto. Não adotar esses números ou rótulos como padrão da Forma. |

No Neuron, perfil/passaporte e preferências tinham implementação local; IA, tradução, FSRS real e instaladores continuavam pendentes. A aprovação do usuário dizia respeito ao resultado apresentado, não a toda a visão futura. O histórico de 148 testes e inspeção de janelas desktop é evidência daquela revisão, não execução desta skill. O picker nativo da foto não foi comprovado; o arquivo sintético exercitou o handler. Nenhum dado pessoal ou fotografia do perfil é necessário para reproduzir o método.

Contratos detalhados permanecem canônicos em [configurações](settings-modes.md), [perfil material](adaptive-visual-systems.md), [editor de iluminação](lighting-editors-icons.md) e [passaporte articulado](passport-polish-case-study.md). Não duplicar suas constantes aqui.

## Incorporar aprendizados na skill

Com autorização para manutenção, transforme a correção em **gatilho → decisão → invariantes → prova → limites**. Primeiro confira se já está coberta. Edite a referência canônica; acrescente caso local apenas quando trouxer diagnóstico novo. Conserve evidências antigas com revisão, sem rebatizá-las como atuais. Não empacote fotos de documentos, perfil real, histórico bruto ou assets de terceiros só porque apareceram na conversa.

ECC `continuous-learning-v2`, quando solicitado e disponível, ajuda a distinguir aprendizado de projeto e padrão transferível. Ler o método não exige ativar hooks, observador ou promover regras globais; autorização para refinar Forma não autoriza mudar configuração de outro agente. Sem execuções independentes, cenários escritos são uma rubrica, não avaliação comportamental concluída.

Conserve mecanismos/recursos aprovados, valide links e estrutura, inspecione o diff e acrescente cenários que poderiam detectar a regressão. Hash de arquivos prova identidade; teste do pacote prova seu escopo; nenhum deles substitui operação no consumidor. Atualizar instruções não treina o modelo nem garante aplicação automática em todo chat.

## Como pedir a reutilização

- “Use /forma:forma com ECC para adaptar este plano ao produto existente. Concilie as decisões aprovadas, mapeie estados reais e futuros e implemente a primeira jornada na stack atual.”
- “Use /forma:forma para integrar o perfil ao objeto interativo existente. Preserve o mecanismo, use os dados do meu domínio e teste prévia, erro de salvamento, reabertura e foco.”
- “Use /forma:forma para corrigir estas folhas. Verifique a origem na dobradiça, a continuidade da textura e o conteúdo em ambos os lados, preservando capa e gesto aprovados.”

Esses prompts escolhem o trabalho; não exigem que o usuário enumere especialistas internas. Para continuar em outro chat, entregue um brief curto com caminhos verificáveis, decisões, limites e próximo passo. Só crie ou envie mensagens a outro chat quando solicitado pelo usuário.
