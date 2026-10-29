# Autoria e incorporação na Forma

Use ao criar uma ficha, ampliar uma especialista ou trazer aprendizado externo. A Forma mantém suas próprias instruções, implementações e critérios de revisão. Independência de conteúdo não significa ter inventado os princípios de UX, normas, algoritmos, cores observadas ou dependências usadas por um consumidor.

## Do problema ao recurso

1. **Descreva a falha ou tarefa.** Identifique quem precisa fazer o quê, em qual estado e superfície. Exemplo: escolher uma biblioteca sem confundir seleção temporária com biblioteca ativa. Não parta de uma lista de recursos de outro plugin.
2. **Encontre o proprietário na Forma.** Leia a especialista e o contrato existentes; corrija-os antes de criar um documento paralelo. Separe decisão específica do produto e mecanismo reutilizável.
3. **Escreva a solução no contexto da Forma.** Declare anatomia, dados, ações, estados, adaptação e limites. Uma ficha deve ajudar a implementar ou verificar; adjetivos estéticos e uma troca de nomes não bastam. Se houver recurso executável, aponte ao arquivo real; se houver apenas contrato, diga isso. Compare a ficha com as operações discriminantes do contrato: uma redação nova não pode transformar arraste de grupo em arraste individual, mudar a ordem de persistência ou apagar o fallback.
4. **Implemente pela stack do destino.** Preserve o mecanismo aprovado, dados e marca. Reuse código próprio existente. Bibliotecas externas continuam dependências identificadas, não código alegadamente criado pela Forma. Não recrie um motor só para apagar sua procedência.
5. **Defina uma prova que poderia falhar.** Para seleção, abrir → escolher → cancelar/salvar → reabrir; para material, ângulos e luz comparáveis; para layout, conteúdo longo e container estreito. Um link válido prova localização, não funcionamento no consumidor.
6. **Revise o que pode ser publicado.** Verifique autoria, licença, ausência de dados privados, links e comportamento afetado. Registre resultado e limite na revisão. Fonte consultada, dependência, asset autorizado e conteúdo autoral têm papéis diferentes.

## Preservar capacidades ao tornar o conteúdo próprio

Autoria não é redução de capacidade. Uma mudança de procedência preserva a coordenação, os métodos úteis já incorporados e os mecanismos aprovados. A Forma expressa esses aprendizados nos seus contratos e ferramentas, com responsabilidade e verificação próprias; não precisa remover pesquisa externa, padrões conhecidos ou dependências necessárias.

| Capacidade a conservar | Responsável e contrato da Forma | Como conferir a continuidade |
|---|---|---|
| Coordenar especialistas e integrar resultados | Coordenadora → [roteamento](routing.md) e [produção coordenada](agent-production.md) | Selecionar pela tarefa, transmitir decisões já resolvidas e conferir a saída de cada apoio antes de concluir |
| Descobrir referências e mídia | Reference → [biblioteca e pesquisa](reference-library.md) | Consultar padrões locais; pesquisar sites atuais quando pedido; distinguir consulta, visita, captura e mídia licenciada |
| Criar uma direção específica | Brand/Product → [direções](design-directions.md) | Ligar fatos do projeto a conceito e composição, comparar alternativas úteis e preservar decisões aprovadas |
| Organizar cores, tipo e espaço | Foundations → [sistema visual](visual-system.md), [refinamento de cor](color-refinement.md) e [contratos espaciais](layout-spatial-contracts.md) | Conferir valores e relações nos consumidores, estados e larguras afetados |
| Separar marketing, app e demonstração | Brand/Interface → [marca e conteúdo](brand-marketing.md) e [dados](data-dashboards.md) | Manter argumento e evidência na página; tarefa, dados e ações reais no app; identificar limites da demonstração |
| Refinar movimento e materiais | Motion/Objects 3D → [movimento](motion.md) e [objetos](reusable-objects.md) | Exercitar continuidade, interrupção, redução, ângulos e fallback pertinentes; não trocar o mecanismo para parecer original |
| Criticar e corrigir a saída real | Validation → [ciclo renderizado](rendered-validation.md) | Observar composição e substância além do scanner; corrigir e confirmar a revisão carregada e o build afetado |

Ao retirar uma fonte operacional, mapeie **capacidade anterior → contrato próprio → recurso disponível → prova ou limite**. Remover um catálogo importado não deve remover a possibilidade de encontrar sites ou fazer curadoria. Retirar uma chamada a uma skill externa não deve apagar a pergunta que ela ajudava a resolver. Se uma capacidade realmente mudar ou deixar de existir, informe isso como migração, em vez de declarar equivalência.

## Quatro categorias que não devem se misturar

| Categoria | Como representar | O que não afirmar |
|---|---|---|
| Texto, código ou ficha escritos para a Forma | Autor/recurso da Forma, problema, revisão e checagens | Que uma nova redação comprova novidade de toda a ideia |
| Princípio, norma ou medição consultada | Fonte e escopo na proveniência; decisão independente no contrato | Que a Forma inventou a norma, o algoritmo ou a paleta observada |
| Dependência ou fonte tipográfica licenciada | Nome, versão quando relevante, licença e posição na distribuição | Que é código ou desenho tipográfico próprio |
| Mídia pesquisada/gerada | Autor ou mecanismo de geração, direitos e finalidade; recibo quando disponível | Que uma imagem de acervo é foto real do produto/cliente |

## Critério para a biblioteca operacional

Uma ficha entra por curadoria e PR: problema concreto, estrutura explicável, recurso local existente, adaptação ao destino, erro a evitar e checagens. Identificadores próprios são estáveis. Campos de evidência descrevem o que existe agora; não recebem `liveVerified` ou captura fictícia por causa de um teste unitário.

Não importar catálogos de descrições para mudar o nome do autor. Se um recurso externo exigir cópia, a incorporação fica separada e identificada, com licença e decisão explícitas; não entra como ficha autoral. Conhecimento geral pode informar uma implementação independente, preservando atribuições pertinentes e limites de observação.

O catálogo de padrões descreve mecanismos da Forma. O índice externo conserva nomes/URLs como referências, associados a casos e perguntas próprios; sites e seleção histórica mantêm procedência. Essas associações orientam investigação, não comprovam o que está implementado atualmente. A especialista Reference usa as ferramentas do host para observar as candidatas. As notas dessa pesquisa pertencem ao projeto e não são promovidas automaticamente ao catálogo público. Da mesma forma, mídia baixada por `media.mjs` não vira asset autoral da Forma.

## Mudanças de procedência

Quando remover conteúdo importado, retire o conteúdo de fato, revise consultas/testes/documentação e informe a migração. Preserve os avisos que continuarem necessários e a história da revisão. Não reescreva o passado, esconda uma dependência ou troque nomes em uma cópia para declarar independência. Autoria editorial, originalidade visual e execução técnica são verificações distintas.

Consulte [fontes](sources.md), [avisos](../THIRD_PARTY_NOTICES.md), [biblioteca](reference-library.md) e [verificação](verification.md) somente conforme a questão. O objetivo é uma solução mantida e verificável pela Forma, não um certificado de perfeição ou uma obrigação de reinventar infraestrutura.
