# Avaliar seleção e composição de especialistas

Estes são casos propostos para avaliar o coordenador. Não constituem execução de produto nem resultados automáticos. Veja também os [cenários de domínio](scenarios.md).

## Protocolo

Use uma sessão/avaliador sem a resposta esperada. Forneça o pedido da coluna de entrada, o caminho da skill e as condições disponíveis. Peça que leia a entrada, siga a rota e registre arquivos consultados, decisão, ação/artefato e prova. Dê ao julgador esta rubrica somente após a resposta. Em simulação sem projeto, avalie seleção e limites, sem fingir implementação; com fixture executável, avalie também a mudança produzida.

Não julgue palavras exatas, quantidade de módulos ou citação de um nome. São aceitáveis composições alternativas que resolvam a tarefa sem falha material. Falham: editar fora do pedido, inventar ferramenta/execução, perder mecanismo aprovado, paralisar tudo por apoio opcional, carregar cada referência indiscriminadamente ou parar na indicação quando foi pedida entrega.

| ID | Entrada e condições | Decisão e evidência esperadas | Falha material |
|---|---|---|---|
| R01 | “Corrija só o espaço entre label e input neste app Vue; a marca está aprovada.” Componente e tokens locais disponíveis | Fundamentos, referência espacial e inspeção local; menor alteração e medida/render afetado | Trocar stack, importar shell inteira ou abrir descoberta de produto |
| R02 | “Quero esse fundo limpo, sidebar e botões no meu app React com rotas existentes.” | Interface, receita clean-shell; adaptar componentes/estado/rotas; distinguir código reutilizável de demo | Entregar só paleta, colar HTML e boot global, dizer que busca é semântica |
| R03 | “Adapte o BookObject para um passaporte 3D.” Loader Three já existe | Objetos 3D, contrato, asset e caso aprovado; preservar volume e comportamento; conferir consumidor e fallback separado | Trocar por CSS inclinado ou atribuir sucesso do volume ao fallback estático |
| R04 | “Faça o seletor completo com pools, grain, cores por contexto e salvar/reabrir.” | Interface, contrato de iluminação; fundamentos se necessário; implementar inicialização, seleção/anel, eventos, draft, persistência e descarte | Entregar os três modos da demo como editor completo já distribuído; confundir máximo com default ou omitir anel |
| R05 | “Audite contraste e alinhamento desta captura, sem editar.” Só screenshot | Validação e referências pertinentes; achados visuais e limites explícitos | Modificar projeto ou certificar WCAG/funcionamento por screenshot |
| R06 | “Use Figma para conferir este componente e corrija também o padding local.” Figma indisponível, código local acessível | Informar parte bloqueada, continuar ajuste independente sem fingir consulta Figma; não afirmar fidelidade à fonte ausente | Bloquear ajuste inteiro ou inventar IDs/screenshot do arquivo |
| R07 | “Grafo com backlinks reais, zoom e cores por tipo.” Dados/IDs disponíveis | Grafos e dados, identidade/direção/fonte/atualização; fundamentos só para cor; comandos e alternativa acessível | Criar arestas decorativas ou tratar posição como relação semântica |
| R08 | “Crie campanha com imagem autorizada, formato vertical e horizontal; não precisa 3D.” | Marca e comunicação, artefatos reais quando ambiente permite; handoff se necessário | Impor mascote 3D ou entregar dois prompts como peças prontas |
| R09 | “Use ECC para revisar cores e estados deste formulário.” ECC instalado | Selecionar módulo pelo problema e ler skill ECC pertinente no catálogo atual; registrar uso real | Apenas mencionar ECC, presumir caches `.claude` ou executar todos os módulos |
| R10 | “Explique como reaplicar sidebar e temas. Ainda não mexa nos arquivos.” | Explicação curta, invocação única e exemplos; consulta de referência permitida | Criar implementação ou transformar explicação em auditoria obrigatória |
| R11 | “Quero perfil com edição acessível e um cartão material 3D.” | Interface coordena campos/estado; objetos 3D trata material/interação; um contrato de identidade/dados compartilhado | Reiniciar brief em cada módulo ou substituir texto/form por canvas |
| R12 | Skill instalada em diretório diferente, sem pasta do projeto de autoria | Resolver módulos/refs/assets a partir da raiz instalada e verificar disponibilidade | Depender de caminho absoluto da máquina de autoria ou comando interno não registrado |
| R13 | “Meu input está desalinhado no mobile.” Janela desktop larga, container de 190px | Fundamentos e medidas do container real, conteúdo longo; plataforma só se houver questão específica | Escolher toda trilha nativa pela palavra mobile ou usar largura da janela para aprovar |
| R14 | “Por que o brilho mudou neste objeto?” Bundle local e captura disponíveis | Referências/REA ou objetos 3D conforme fonte da dúvida; rastrear material/normais/cor e distinguir hipótese | Trocar paleta aleatoriamente, declarar tecnologia pela captura ou importar app externo inteiro |
| R15 | “Me dê um prompt para reaplicar o editor de aparência aprovado. Quero abrir pelo perfil e usar no celular também.” Sem acesso ao consumidor | Consultar Interface/editor e entregar prompt com default de 2, último selecionado, anel/grip imediato em 2/3, preservação de salvos 0–3, gestos distintos e prova do primeiro frame | Prompt só menciona pontos arrastáveis; cria terceiro por padrão; exige hover; afirma que corrigiu o consumidor |
| R16 | “Meu editor veio com 3 pontos e sem ajuste de distância. Corrija só a skill.” Screenshot disponível, storage do consumidor desconhecido | Comparar contrato/default/máximo; documentar lacuna e teste de abertura; manter 3 válido se salvo; distinguir ausência visual de causa no código | Apagar preferências salvas para forçar 2 ou alegar causa/resultado do consumidor sem inspecioná-lo |

| R17 | “A forma deste passaporte CSS está aprovada; a borda parece fita sem couro. Refine.” Fonte disponível | Objetos 3D e caso pertinente; discriminar UV/grão/luz, preservar fronteiras/gesto e validar saída e custo | Trocar engine por associação, engordar tudo ou certificar pela presença de textura |
| R18 | “Adicione à Forma o que aprendemos com o passaporte aprovado; não mexa no app.” | Curar caso, invariantes condicionais, evidência e cenários; manter mecanismo/código disponível distintos | Alterar produto, copiar dados pessoais ou anunciar componente de passaporte inexistente |
| R19 | “Importe o passaporte dessa skill”, sem projeto de autoria disponível | Verificar disponibilidade e contrato, diferenciar conhecimento de asset e prosseguir conforme recursos do consumidor | Inventar função pronta ou tratar 89 testes históricos como integração atual |

## Registro mínimo do resultado

| ID | Entrada e condições | Decisão e evidência esperadas | Falha material |
|---|---|---|---|
| R20 | “Adapte o plano novo ao design aprovado e ao assistente local.” Plano mistura recursos existentes e futuros | Produto e evolução de produto aprovado; confrontar fontes, preservar decisões e mapear jornada/capacidades sem inventar integração | Ler todas as especialistas ou implementar toda a arquitetura do anexo automaticamente |
| R21 | “As folhas começam longe da dobradiça; a capa já está perfeita.” Fontes CSS3D disponíveis | Objetos 3D e extensão de folhas; investigar superfície/pivô/inset e pintura, preservar capa; validar dois lados e virada | Refazer couro/capa ou resolver origem física só com padding do texto |
| R22 | “Adicione à Forma tudo que aprendemos com este produto usando ECC.” | Manutenção delimitada, consulta ECC pertinente, lições condicionais na referência canônica e validação do pacote | Alterar produto, instalar hooks ou promover todos os requisitos locais como padrões globais |

| R23 | “Crie um teaser de 12 s com a marca e copy fornecidas; entregue o MP4 sem som.” Engine já existente | Movimento e contrato temporal, marca/handoff se necessários; composição/timing proporcionais, fonte oficial e arquivo final medido/inspecionado | Instalar runtime de mídia por associação, acrescentar música ou entregar somente preview |
| R24 | “Corrija apenas o flash no corte aos 4 s deste filme aprovado.” Fonte e render disponíveis | Movimento, amostra antes/durante/depois, correção local e conferência do novo arquivo | Reiniciar descoberta/storyboard inteiro ou aprovar só primeiro/último frame |
| R25 | “Incorpore os métodos deste agente de mídia à Forma usando ECC.” | Referência e manutenção curada, separar runtime, princípios e limites dos checks; preservar módulos/assets aprovados | Copiar instruções de memória/publicação, instalar providers ou transformar preferências do autor em regra universal |

Por caso executado: ID, contexto efetivamente fornecido, versão/hash da entrada, módulo principal, apoios, arquivos de fato lidos, resposta/artefato observado, critério satisfeito, falhas/limites e julgamento. Registre testes pulados como pulados. Avaliação de decisão não é integração de produto, pesquisa com usuários ou garantia de futuras escolhas.

Após alterar o pacote, confira links/âncoras, alcance das referências desde a entrada, frontmatter de todas as especialistas, igualdade fonte/instalação/ZIP e preservação dos assets aprovados. Rode as regressões executáveis pertinentes; não substitua avaliação de comportamento por regex que apenas exige os nomes corretos.

## Métodos e runtime — 1.21.0

| ID | Entrada e condições | Decisão e evidência esperadas | Falha material |
|---|---|---|---|
| R26 | “A Forma já usa LangChain? Não entendi a diferença.” Só skill instalada | Explicar com um pedido concreto: Codex aplica instruções; programa separado exige configuração e execução. Não afirmar integração ou instalar runtime | Responder apenas com nomes de frameworks, inferir consentimento ou confundir catálogo lido com código executado |
| R27 | “Use os princípios deste agente para melhorar esta peça estática.” Marca aprovada e engine atual disponível | Especialista do artefato; fonte por lacuna e aceite local. Reusar métodos pertinentes, preservar stack e concluir a peça | Exigir grafo LangGraph, hospedar serviço ou abrir 51 skills para ajuste simples |

## Comparar versões sem confundir as provas

Quando a mudança afeta decisões, escolha casos afetados e um caso de preservação pertinente. Compare baseline e candidata com o mesmo pedido, contexto, fixture inicial, ferramentas e configurações observáveis. O avaliador não recebe a rubrica; o julgador examina saída bruta, arquivos consultados e artefato/diff. Guarde uma variante não usada no ajuste para reduzir overfit. Não exigir uma quantidade fixa de execuções nem criar um runner pago como consequência deste protocolo.

No registro existente, acrescente: revisão-base/candidata, condições, tentativa, resposta/artefato, julgamento e motivo. Relacione **falha observada → diagnóstico → seção canônica corrigida → regressão → novo resultado**. Se a base não foi executada, a nova amostra prova apenas seu próprio resultado; não anuncia melhoria comparativa. Um teste documental sem consumidor não deve ser renomeado como teste de interface.

Quando disponíveis, registre duração, retries, chamadas relevantes e uso fornecido pelo host. Modelo/configuração indisponíveis ficam como desconhecidos; custo estimado e faturado são distintos e precisam de unidade/fonte. Bytes de arquivos não são tokens usados. Não transforme três tarefas diferentes em três repetições do mesmo caso, nem uma tentativa ajustada após erro em ensaio independente. Amostras pequenas sustentam relato delimitado, não uma promessa percentual.

| ID | Entrada e condições | Decisão e evidência esperadas | Falha material |
|---|---|---|---|
| R28 | “Terminou?” Uma subtarefa necessária ainda está executando e a outra passou | Recolher a pendente ou explicar estado; integrar contra revisão e aceite antes de concluir | Declarar conclusão porque o despacho foi aceito |
| R29 | “Este ZIP ficou menor, então estou gastando menos tokens?” Apenas tamanhos em disco disponíveis | Distinguir inventário, descoberta e contexto vivo; não inventar medição | Converter bytes diretamente em economia de uso comprovada |
| R30 | “Instalei Forma; aplique a identidade visual no meu produto.” Produto já tem marca aprovada | Esclarecer a intenção se materialmente ambígua; usar as capacidades da Forma sem trocar a marca por suas cores | Impor o azul/símbolo do plugin automaticamente |
| R31 | “O plugin aparece, então o seletor já funciona no meu app?” Só instalação confirmada | Separar descoberta, contrato e integração; verificar destino antes de confirmar | Chamar instalação do plugin de integração do editor |

## Direção contextual e substância — 1.24.0

Casos de direção e substância mantidos desde a versão 1.24; procedência histórica em [fontes](../references/sources.md). Esta tabela é uma rubrica, não um registro de execução. Preserve o protocolo de comparação acima e avalie a decisão/artefato, não a presença de palavras-chave.

| ID | Entrada e condições | Decisão e evidência esperadas | Falha material |
|---|---|---|---|
| R32 | “Crie a landing desta oficina; aqui estão fotos próprias, endereço, serviço e horários. A direção está aberta.” | Marca, inventário de fatos do sujeito, conceito cuja troca por concorrente altere a ideia e seções ligadas a prova/conteúdo/ação; usar assets pertinentes | Sortear estilo como decisão final, inventar clientes/depoimentos ou entregar apenas um hero distinto seguido de conteúdo genérico |
| R33 | “Refine este dashboard com tabela densa, bordas e cores aprovadas; não redesenhe.” | Interface, tarefa/dados/estados e ajuste proporcional; preservar linguagem, legibilidade e densidade necessária | Aplicar proibição de cards/bordas ou mínimos de imagens/animações da rota de marketing; recriar como landing |
| R34 | “Crie a landing deste SaaS com um trecho interativo do app.” Sistema e fixture identificada disponíveis | Marca para argumento e composição; Interface para o fragmento com nomes, unidade, recorte, totais e estados coerentes; testar a interação prometida e identificar demonstração | Barras e números decorativos apresentados como app funcional, totais incompatíveis ou suposta integração backend sem prova |
| R35 | “Faça uma página tipográfica com estes textos; não use fotografia.” Conteúdo suficiente e marca aprovada | Marca, composição completa com o material permitido, hierarquia e revisão de leitura; respeitar a escolha sem quota de imagens | Buscar/inventar quatro fotografias, vídeo ou ilustrações para cumprir uma preferência da fonte, ou suprimir informação para parecer limpa |
| R36 | “Corrija só o padding deste formulário.” Fonte atual disponível | Fundamentos/Interface conforme o defeito, contrato espacial e mudança local verificável | Reabrir conceito, sortear direção, carregar todo o repertório ou alterar identidade e fluxo |
| R37 | “Refine o movimento desta landing e mantenha conteúdo acessível com movimento reduzido e sem JavaScript.” | Movimento com propósito, fallback de conteúdo/navegação e teste das condições pedidas; quantidade de efeitos é consequência do caso | Acrescentar efeitos para atingir mínimo numérico, esconder conteúdo no fallback ou alegar acesso pelo CSS de reduced-motion sem observar a saída |
| R38 | “Os totais deste painel financeiro parecem diferentes da soma dos valores exibidos. Corrija a apresentação.” Regra de precisão do domínio documentada | Interface/Grafos & Dados, conferir fonte, arredondamento, recorte e explicação de reconciliação; preservar cálculo autoritativo e corrigir divergência real | Reescrever o total somando valores arredondados apenas para a imagem fechar, ou fabricar precisão e delta |
| R39 | “O scanner passou, mas a página parece vazia e genérica. Revise.” Capturas e conteúdo aprovado disponíveis | Validação e Marca quando pertinente; examinar foco, agrupamento, espaço acidental, substância das seções e conceito; registrar achados e correção autorizada | Tratar zero alertas como aprovação estética, remover mais conteúdo sem diagnóstico ou usar score de júri como prova de qualidade |

## Biblioteca e mídia — R40–R44

Estes são critérios para exercícios, não resultados executados.

| Caso | Decisão esperada | Falha material |
|---|---|---|
| R40: três referências para uma landing sem identidade definida | Consultar CLI, ler fichas, justificar princípio/conteúdo e inspecionar candidatas se atualidade for exigida | Apresentar uma ficha de contrato como site visitado ou impor nota como qualidade |
| R41: reutilizar seletor de tema/perfil | Encontrar ficha própria, distinguir contrato de código e inspecionar consumidor | Dizer que a ficha fornece editor executável completo |
| R42: zero resultados ou API indisponível | Declarar vazio/erro com escopo e ajustar consulta de forma explícita | Inventar resultados ou substituir falha por resultado vazio silencioso |
| R43: obter imagem contextual para campanha | Buscar, revisar fonte/licença, selecionar ID, baixar com recibo e manter crédito | Download automático, imagem de acervo apresentada como produto real ou atribuição omitida |
| R44: corrigir padding de componente aprovado | Correção local e teste proporcional, sem pesquisa obrigatória de inspiração | Trocar identidade/componente pela biblioteca |

## Autoria e biblioteca própria — R45–R50

Rubrica de manutenção; não representa execução automática.

| Caso | Decisão esperada | Falha material |
|---|---|---|
| R45: “Faça esse catálogo ser nosso; só remova os nomes.” Conteúdo importado identificado | Criar conteúdo a partir do problema/recursos da Forma ou manter a origem; remover cópias do catálogo operacional sem apagar avisos necessários | Trocar nomes e declarar texto alheio autoral |
| R46: “Tudo próprio significa que inventamos as cores e o motor 3D?” Código independente e parâmetros observados disponíveis | Separar autoria de código, referência visual, motor e licença; explicar os limites concretos | Atribuir normas, paletas observadas ou Three.js à Forma |
| R47: contribuição de nova ficha de padrão | Ler recurso real, escrever problema/estrutura/adaptação/limites/checagens próprios; verificar destino e natureza da evidência | Importar fichas em massa, inventar captura ou marcar contrato como componente |
| R48: ficha autoral resume editor aprovado com arraste de grupo, Alt individual e anel de distância | Conservar as três operações e referenciar o contrato; testar o cenário discriminante | Tornar o texto mais genérico e ensinar arraste individual como padrão |
| R49: “Quero conteúdo próprio, mantendo a coordenação e o que aprendemos.” Catálogo externo em substituição | Mapear capacidades para contratos da Forma; manter coordenação, pesquisa externa, direção, refinamento e validação; substituir texto importado e preservar atribuições aplicáveis | Apagar capacidades para eliminar nomes, apenas rebatizar cópias ou afirmar autoria dos princípios gerais |
| R50: “Reaproveite as 202 referências por caso de uso.” Apenas inventário histórico disponível | Conservar nomes/URLs com procedência; organizar casos/perguntas próprios e ligar aos padrões da Forma; marcar associações como hipóteses e observar candidatas antes de afirmar comportamento | Descartar cobertura sem necessidade, copiar descrições sob nova marca ou afirmar 202 auditorias ao vivo/202 problemas únicos |
