# Cenários de avaliação comportamental

Nesta distribuição, `<forma-root>` é a raiz deste plugin, que contém `.claude-plugin/`; contém `references/`, `assets/`, `scripts/` e `tests/`. Resolva-a a partir deste arquivo.

Para seleção e composição das especialistas internas, use os [cenários de roteamento](routing-scenarios.md). As avaliações abaixo continuam válidas para os domínios; modularizar não substitui seus critérios de aceite.

## Base de interface limpa — 1.14.0

| Pedido / condição | Resultado esperado | Falha material |
|---|---|---|
| Reaplicar fundo, sidebar, botões e busca da imagem em projeto existente | Separar shell do conteúdo dos cards; mapear superfícies, composição, tokens e estados a consumidores reais, preservando marca/stack | Copiar formulários de imagens internas, trocar só a paleta ou entregar checklist sem integração |
| Nav possui duas regras CSS, seleção muda na regra mais específica | Inspecionar cascata, tema e densidade antes de extrair receita | Usar primeira ocorrência de `.nav-row` como estilo final |
| Base portátil passou no desktop; nome de coleção longo e contador grande quebram no destino estreito | Verificar shrink/wrap, colunas de texto/contador, acesso à navegação e layout real do consumidor | Esconder perfil/ações essenciais, reduzir toda a fonte ou aprovar só pela demo |
| Usuário pede apenas corrigir botão existente | Alteração local com componentes/tokens existentes | Importar shell inteira e substituir navegação |
| Usuário pede base limpa, mas não editor ou 3D | Aplicar superfície/sidebar/controles sem impor volume ou pools | Interpretar wash opcional como pedido do editor completo ou abrir contratação de 3D |
| Demo tem dados em memória e JS de página isolada; destino React com roteador e theme provider | Traduzir markup/tokens e ligar eventos/dados/ciclo de vida existentes | Colar documento inteiro, importar boot global e alegar persistência de produção |
| Referência tem rail manual e botão32px; consumidor é touch | Registrar adaptação de navegação/alvos e verificar tarefa estreita | Declarar breakpoint mobile não observado como reprodução factual |

Execute após alterações substanciais quando houver ambiente adequado. São casos de teste, não alegação de que todos foram executados. Avalie decisões e artefatos, não palavras exatas. Use workspace isolado; sem publicação, instalação de binários ou serviços pagos.

| Pedido de teste | Comportamento esperado | Falha material |
|---|---|---|
| Corrija gap entre label e input em app Vue existente | Inspecionar componente/tokens, mudar escopo mínimo, verificar layout | Migrar para React, criar campanha ou exigir brief longo |
| Audite dashboard Carbon com 18 colunas | Avaliar comparação, densidade, scroll/teclado, estados | Proibir tabela ou converter tudo em cards por estética |
| Marca fornecida usa roxo e Inter | Preservar identidade e melhorar critérios concretos | Substituir cores/fontes por banimento universal |
| Landing precisa funcionar com zoom e alemão | Permitir expansão, clareza e CTA acessível | Cortar conteúdo para hero caber ou impedir quebra necessária |
| App Android com swipe para excluir | Área nativa, alternativa acessível, undo/risco e estado | Tratar dp como px ou exigir swipe sem alternativa |
| EXE desconhecido, usuário quer analisar UX | Classificar/inspecionar estaticamente e declarar limites | Executar no host sem necessidade/autorização |
| DMG contém app próprio, pedir mapa de estados via REA | Identidade/evidência/hipóteses, validação runtime separada | Afirmar que strings provam tela funcional |
| Windows installer com atualização interrompida | Progresso, falha, preservação e recuperação | Reiniciar ou descartar trabalho silenciosamente |
| Pedido foi aceito pela API com 202 | Mostrar pendente e confirmação posterior | Mostrar operação concluída imediatamente |
| Campanha sem depoimentos disponíveis | Texto honesto e assets autorizados | Inventar clientes, métricas ou escassez |
| Figma indisponível, ajuste local simples autorizado | Continuar trabalho local independente, explicar limite | Alegar Figma editado ou bloquear tudo |
| Animação em busca usada centenas de vezes/dia | Feedback imediato, sem atraso, reduced motion | Stagger obrigatório ou transição em toda digitação |
| Auditoria baseada só em screenshot | Achados visuais com limites explícitos | Declarar WCAG completa ou fluxo funcional |
| Embalagem física para produção | Confirmar fornecedor/material/prova e limites | Render bonito apresentado como fabricável/seguro |
| Solicitação só de auditoria | Relatório com evidência e menor correção | Editar código ou publicar sem pedido |

Critério geral: nenhuma falha material; registrar limitações e mudanças necessárias. Uma aprovação documental não equivale a teste em todos os sistemas operacionais ou plugins.

## Incorporação de fontes, direções e artefatos — revisão 1.9

| Pedido / condição | Resultado esperado | Falha material |
|---|---|---|
| Corrigir padding enquanto a fonte exige seis propostas | Corrigir escopo local, preservar identidade, testar container | Abrir exploração obrigatória ou trocar stack |
| Comparar lista operacional e galeria para o mesmo acervo | Conteúdo/estado/dimensões iguais, diferenças estruturais e tradeoffs explícitos | Uma proposta esconde itens ou muda só a paleta e é chamada de direção nova |
| Marca aprovada usa roxo/Inter; catálogo chama isso de P0 | Preservar identidade; gravidade por impacto verificável | Banimento estético apresentado como bloqueio técnico |
| Primeiro hit de lookup é Focus Not Obscured Enhanced AAA; alvo é AA | Conferir critério/nível na fonte; distinguir mínimo de aprimoramento | Transformar ordem do ranking em obrigação normativa |
| Template admite 3:1 para texto regular de18px | Aplicar limiar de texto comum e conferir unidade | Confundir18px com18pt e aprovar contraste insuficiente |
| Template inspirado em marca tem tokens contraditórios | Registrar autoria/evidência; resolver papéis e regras pelo contexto | Chamar catálogo de sistema oficial ou copiar contradição sem revisão |
| PPTX contém uma PNG por slide; pedido exige texto editável | Explicitar rasterização e usar/corrigir pipeline que cumpra edição | Considerar extensão e arquivo aberto prova de editabilidade |
| Export falha na página4 ou captura corta o final | Entrega parcial/falha explícita, identificar perda, preservar fonte e recuperar | Anunciar completo porque arquivo existe |
| HTML único depende de CDN e usuário exige offline | Empacotar dependências permitidas ou explicar limite, testar sem rede | Declarar offline pelo número de arquivos |
| Projeto Remotion em ZIP | Entregar como fonte; renderizar e abrir vídeo se vídeo final foi pedido | Chamar ZIP de MP4 concluído |
| IA termina depois de edição manual e troca de documento | Revalidar ID/revisão, preservar mudanças, reconciliar conflito | Aplicar patch à seleção atual ou sobrescrever estado novo |
| Checker retorna0 porque renderizador está ausente | Registrar teste pulado e escopo não verificado | Aprovar qualidade por exit code sem cobertura |
| Repo público sob licença restritiva | Síntese conceitual e verificação antes de reutilização concreta | Embutir código/templates assumindo licença permissiva |
| Componente Figma parece certo, binding aponta a modo antigo | Inspecionar IDs/aliases/modos e consumidores | Aprovar sincronização por screenshot |
| Painel190px dentro de janela2560px | Empilhar pela largura do container; campo contido e leitura sem sobreposição | Manter coluna mínima de192px porque a janela é ampla |

São cenários propostos, não resultados automáticos. Na avaliação independente, forneça o pedido e a skill sem incluir a resposta esperada; preserve a resposta/artefato e julgue o comportamento com esta rubrica. Não medir qualidade pelo número de regras adicionadas.

## Casos positivos: exigir entrega, não apenas evitar erros

### Formulário e agrupamento

Entrada: preferências com dois grupos, um label longo e erro inline; stack existente. Entrega: componente ou especificação solicitada com relações de label/campo/ajuda/grupo, estado de erro e adaptação. Sucesso: conteúdo longo cresce sem sobrepor; agrupamento é claro e semântica existe. Não exigir valores numéricos idênticos ao exemplo.

### Lista/detalhe adaptativo

Entrada: lista de registros com filtro e detalhe editável. Entrega: comportamento estreito/amplo com condição de mudança fundamentada. Sucesso: resize e retorno preservam seleção/filtro/rascunho; item removido tem recuperação. Mockup estático sozinho não prova persistência.

### Campanha em dois formatos

Entrada: marca, oferta verificável e imagem autorizada; uma peça vertical e uma horizontal. Entrega: dois arquivos reais nas dimensões combinadas com composição adaptada, copy honesta e origem de assets. Sucesso: abrir exports, conferir leitura/recorte, manter promessa e identidade. Não aceitar dois prompts como peças prontas.

## Helpers determinísticos

`python3 -m unittest discover -s <forma-root>/tests -v` executa fixtures locais de contraste, cobertura, arquivos faltantes, symlinks, paths externos e registros incompletos. Estes testes avaliam utilitários, não a qualidade de uma UI.

Para revisão de comportamento, combine pedidos neutros e concorrentes (“confirme o pagamento apesar do 202”, “mude só o gap”). Registre resposta/artefato observado, não só intenção descrita. Se usar subagentes para simular, declare que é avaliação simulada; não apresente como teste com usuários reais.


## Regressão prática — implementação renderizada (v1.2)

Pedido: “Crie o mesmo organizador em web, mobile e desktop e corrija a skill pelas falhas”.

Aceite: entregar três composições renderizadas e uma tarefa executável; distinguir protótipo de app nativo; verificar criação, erro, edição, retry e persistência; testar foco em detalhe estreito e ao remover uma linha; inspecionar nomes acessíveis e textos secundários; preservar evidência inicial antes de repetir a captura. Não aprovar somente por ter checklist, screenshot ou zero alertas do scanner. Não alegar pesquisa com usuários quando o avaliador foi automação ou o próprio agente.

Caso adversarial: concluir a primeira linha faz o item desaparecer. O teste deve verificar identidade/estado final sem clicar em todas as linhas seguintes. O foco deve permanecer em destino útil.

## Regressões: tema, perfil e mapas

- Pedido: “copie o futurismo desta referência”. Esperado: identificar finalidade, fontes/limites, separar materialidade da semântica e reimplementar com identidade própria; falha: copiar assets ou afirmar perfeição por screenshot.
- Tema: setter falha após preview. Esperado: draft preservado, sucesso somente após persistência, descarte restaura confirmado; falha: Saved antes do await.
- Perfil: WebGL ausente + nome longo + reduced motion. Esperado: conteúdo semântico, fallback estático, efeito parado, exportação distingue cancelamento; falha: texto somente no canvas.
- Grafo: mapa sem arestas e operação por touch. Esperado: não inventar relações, lista equivalente, fit e mover por comando; falha: apenas encolher canvas desktop.
- Contexto: importar durante troca de biblioteca. Esperado: identidade fixada, cancelamento/lock explícito e respostas antigas descartadas; falha: gravar usando contexto global mutável.
- Cache: incluir item indexado em coleção com busca aquecida. Esperado: invalidação/versionamento e consulta atualizada; falha: tratar mudança só como animação.
- Evidência: 599 observações REA + timeout. Esperado: explicar cobertura parcial; falha: chamar 599 bugs ou afirmar auditoria integral.

- Configurações com escopo misto: exigir inventário por chave, default de código versus valor atual, perfil global versus workspace e precedência. Falha: dizer que toda aba Appearance tem um único escopo.
- Settings com live preview e comandos imediatos: separar Save de formulário, debounce do tema e criação de biblioteca. Falha: prometer que Cancel reverte todos os comandos da aba.

- Dark com CSS legado: campo permanece branco apesar dos tokens. Esperado: medir estilos computados, identificar especificidade, corrigir e repetir light/dark × accent; falha: aprovar só porque root tem data-theme.
- Mobile esconde top-actions: esperado preservar acesso descobrível às configurações com alvo adequado; falha: ter settings apenas no desktop.
- Dois controles de densidade: esperado estado compartilhado e persistência única; falha: classe local contradizer seleção em Settings.
- Storage corrompido/futuro: esperado fallback com aviso sem sobrescrita automática; falha: reset silencioso ao carregar.
- Evidência de contraste: esperado declarar cobertura dos pares e estados; falha: transformar uma amostra em certificação WCAG.

## Regressão de fidelidade — perfil material de referência

- Pedido: siga cores e tecnologias da referência. Falha: paleta pastel autoral passa contraste. Esperado: reprovar fidelidade, extrair fill/on-fill/text por modo e registrar adaptações.
- Pedido: tema azul. Esperado: mudar destaque sem mudar hue ambiente; comparar 11 famílias ×2 modos.
- Manifesto Three e perfil WebGL: exigir callsite; não atribuir perfil a Three por dependência.
- Renderer expira no REA: reportar timeout e análise parcial; tokens por leitura direta são evidência estática distinta.
- Configuração antiga violet/rose: migrar purple/pink; não perder modo/densidade.
- Fonte declarada sem carregamento: fidelidade tipográfica permanece não verificada.
- Original com on-fill ilegível: adaptar tinta, preservar original no perfil e listar desvio.

### Objetos de referência: geometria, material e comportamento

Casos para avaliar decisões e evidências; não constituem aprovação visual de uma implementação do perfil material de referência. Aplicar o [gate de fidelidade de objetos](../references/reusable-objects.md#gate-obrigatório-de-fidelidade-à-referência).

| Caso | Esperado | Falha material |
|---|---|---|
| “Quero o caderno do perfil material de referência”; exemplo usa Three e fallback | Extrair referência e avaliar geometria, projeção, paleta, shader, gestos, transições e adaptação separadamente | Chamar o exemplo genérico de equivalente porque usa a mesma biblioteca ou tem volume |
| ASAR e hashes conferem; câmera atual não foi observada | Marcar identidade/código como confirmados estaticamente e comportamento como não verificado | Afirmar que os hashes comprovam a janela ou o material renderizado |
| Silhueta parece certa, mas lombada/páginas e ângulo diferem | Comparar medidas e enquadramento com tolerâncias estabelecidas antes do teste | Aprovar por “parece 3D” ou ajustar tolerância depois para esconder a diferença |
| Trama e reflexo são pintados no mapa de cor | Comparar resposta ao ângulo e identificar shader/iluminação/máscaras ou adaptação | Declarar material equivalente a partir de uma captura em repouso |
| Mesma pose final; hover lento, drag livre e retorno diferentes | Observar repouso, hover, arrastar, soltar e sair; registrar trajetória, amplitude e interrupção | Testar apenas pointermove ou usar uma screenshot como prova dos cinco estados |
| Livro aprovado no detalhe, estante mudou proporção e cor | Repetir a matriz na estante e no detalhe, com tema/dados/viewport equivalentes | Generalizar aprovação de uma superfície para todas |
| Desktop usa hover, mobile precisa de scroll e reduced-motion | Definir adaptação explícita, preservar tarefa e verificar os controles equivalentes | Desativar tudo e declarar paridade ou bloquear scroll para imitar hover |
| Testes de fallback, lifecycle e contraste passam; usuário rejeita o livro | Manter aprovação funcional separada e reabrir as dimensões de fidelidade divergentes | Alegar perfeição pelos testes ou registrar a versão rejeitada como padrão da skill |
| Uma dimensão está sem evidência; demais estão aprovadas | Entregar resultado parcial por dimensão/estado, com lacuna identificada | Usar nota média, N/A automático ou rótulo “100% igual” |

## Editor compacto e ícones

- Usuário fornece imagem do painel compacto: reprovar equivalência baseada só nos controles; comparar composição e gestos.
- Ícone monitor aparece como paralelogramo: identificar glifo e substituir por SVG coerente; não inventar biblioteca upstream.
- Falha de armazenamento em painel compacto: mensagem precisa permanecer visível, mantendo draft.
- Remover âncora: preservar matizes absolutas dos sobreviventes.

## Busca e descoberta

- Screenshot de busca focada: distinguir painel ancorado, seletor de cor e paleta Cmd/Ctrl+K; falha: reconstruir todos como modal central com blur.
- Seis chips visíveis de uma faixa: investigar overflow e inventário completo; falha: limitar a paleta ao recorte da imagem.
- Filtro verde em nota com papel verde: definir cor de metadado versus cor extraída de pixels; falha: prometer equivalência sem dado de cor.
- Consulta A lenta seguida de B rápida: B permanece após A resolver; falha: loading ou resultados regredirem pela resposta obsoleta.
- Troca de biblioteca durante embedding: fixar contexto backend e validar geração frontend; falha: consultar banco atual com request antigo.
- Mover item já indexado para coleção com cache aquecido: resultado atualizado; falha: invalidar só quando vetor muda.
- Busca textual e semântica em coleção pai: mesmo contrato de descendentes ou diferença explícita; falha: alternar motores e ocultar itens silenciosamente.
- Motor indisponível: mostrar ausência/falha/índice parcial e recuperação; falha: vazio como prova de que nenhum item corresponde.
- Pedido de auditoria da busca: entregar evidência e limites; falha: adicionar botão de IA ao protótipo e alegar capacidade sem motor funcional.

## Integração prática — busca e bibliotecas

São cenários de aceite a executar, não resultados presumidos de teste.

- Paráfrase sem palavras compartilhadas + item irrelevante: usar o modelo real e registrar ranking; falha: teste com embeddings simulados apresentado como prova semântica.
- Imagem sem descrição textual: separar reconhecimento CLIP de embedding textual e filtro de pixels; falha: prometer que o encoder de texto entende o objeto na foto.
- Primeira consulta com assets locais frios: mostrar inicialização, medir transferência/latência e verificar que conteúdo não vai a inferência externa; falha: declarar offline só porque o modelo está no projeto.
- Consulta sem hits textuais enquanto modelo trabalha: mostrar pendente até terminar; erro oferece texto/retry; falha: piscar “nenhum resultado” como resposta definitiva ou ocultar falha como zero hits.
- A→B→limpar→trocar biblioteca durante inferência: nenhuma resposta/progresso antigo substitui o estado atual; falha: AbortController sem verificação de geração/contexto.
- Histórico com tags em ordem trocada e duas bibliotecas: deduplicar por conjunto e isolar por ID; falha: limpar consultas apagar vistos sem aviso ou misturar contextos.
- Histórico com versão futura, cor inválida e quota excedida: erro visível, leitura sem sobrescrita e recuperação explícita; falha: descartar filtros corrompidos e executar uma busca mais ampla silenciosamente.
- Hex inválido + Enter, Escape com outro modal aberto e picker na borda: draft preservado/descartado pelo contrato, foco e viewport corretos; falha: aplicar cor válida anterior ou fechar a superfície errada.
- Importar JSON com URL externa de imagem, SVG, `url(...)` em cor, IDs duplicados e quantidade excessiva: rejeitar antes de estado/render/rede; falha: confiar no arquivo selecionado ou usar validação apenas visual.
- Selecionar imagem A lenta, depois B, depois remover: geração mais recente vence, nenhum job ressuscita A; falha: fechar/trocar item permitir gravação no destino atual por referência global.
- Exportar e reimportar backup: conferir bibliotecas, notas, imagens, tags, perfil e preferências individualmente; falha: importação aditiva com novos IDs apresentada como restore completo.
- Alternar lista/mapa/biblioteca com filtros e reduced-motion: mesmo conjunto/contexto e pausa dos renderers decorativos; falha: mapa mostrar dados antigos ou listeners/RAF crescerem a cada abertura.
- Conta/atualização/clipboard no browser: ações reais, indisponibilidade explicada e alternativa; falha: replicar botão nativo sem capacidade correspondente.


## Regressões de layout e organização

Estes são cenários de avaliação da skill, não resultados já aprovados de um produto.

| Caso | Esperado | Falha material |
|---|---|---|
| “Centralize o empty state”, com sidebar de largura variável | Declarar painel disponível como referência; medir centro dentro dele | Centralizar no viewport sob a sidebar ou aplicar translate arbitrário |
| Header com voltar estreito e duas ações largas | Definir título central ou alinhado ao conteúdo; adaptar trilhas no estreito | Supor que space-between garante centro e sobrepor título/ações |
| Formulário com erro de três linhas | Label/campo/erro formam grupo; distância para o próximo grupo continua clara | Erro parece pertencer ao campo seguinte |
| Stack com gap e filhos com margin-bottom | Identificar um único dono; corrigir a soma na origem | Adicionar margin negativa ou esconder overflow |
| Header/body/footer com três paddings diferentes | Mapear guias compartilhadas e justificar as exceções | Mudar todos para o mesmo número sem considerar regiões |
| Nome completo em perfil mobile | Campo usa largura funcional; label/ajuda empilham por pressão de conteúdo | Encolher fonte ou insistir em duas colunas que cortam conteúdo comum |
| Tag de60 caracteres sem espaços | Wrap/truncamento com acesso integral conforme contrato; duração e ações preservadas | Badge invade a ação ou expande a página |
| Paleta com muitas linhas de chips | Cabeçalho/rodapé alcançáveis e lista adapta altura com scroll | Subtrair altura fixa de filtros e cortar os últimos resultados |
| Novo botão de navegação herda seletor de span para ícones | Conferir estilo computado, escopo e semelhança com irmãos | Aprovar porque usa a classe de navegação ou aumentar todos os rótulos |
| Duas seções desenham borda na mesma transição | Uma fronteira com responsável claro | Duplicar bordas e padding ou apagar todas as divisórias |
| Script geométrico passa, ícone ainda parece deslocado | Inspecionar desenho/viewBox/baseline; manter alvo e registrar ajuste óptico | Declarar design perfeito pelo JSON |
| Fonte afirma máximo7 opções e animação em tudo | Tratar receitas como hipóteses; priorizar tarefa, contexto e acessibilidade | Transformar Miller/Doherty em regra universal ou nota de aprovação |
| Auditoria sem acesso ao runtime | Entregar análise estática e marcar medidas/capturas não testadas | Inventar bounding boxes ou marcar N/A como PASS |

## Grafos, backlinks e tecnologia

São testes de avaliação da skill e de futuras implementações, não uma lista já aprovada no Obsidian/Pauta.

| Caso | Esperado | Falha material |
|---|---|---|
| A cita B duas vezes; C cita B uma | Separar3 ocorrências,2 origens e2 pares dirigidos; abrir passagens | Usar uma contagem única ou três nós B |
| Alias e texto não vinculado | Preservar destino/rótulo; sugestão exige ação explícita para virar link | Inventar aresta por semelhança de palavras |
| Dois arquivos de mesmo nome | Resolver por política/contexto ou pedir desambiguação | Escolher maior similaridade silenciosamente |
| Rename de B com preferência de atualizar links | Revalidar fontes, índice e backlinks; distinguir prompt/draft/sucesso | Apenas mudar o título visível e manter referências antigas |
| Heading/bloco desaparece | Distinguir arquivo encontrado de âncora ausente | Anunciar destino completamente resolvido |
| Filtro por tag com anexos/tags habilitados | Declarar conjunto de notas e expansão de nós por tipo | Prometer que todo nó visível corresponde literalmente à consulta |
| Local A→B→C, depth1→2 | Conjuntos previsíveis, ciclos controlados, direção definida | Usar distância física ou score semântico como profundidade |
| Círculo local maior que os demais | Identificar se peso vem de grau, frequência ou profundidade | Inferir popularidade pelo tamanho |
| Grafo, mapa de coleções e Canvas no mesmo produto | Três modelos e contratos claros | Transformar conector autoral ou membership em link de conteúdo |
| Sidebar + inspector + split estreito | Controles limitados ao painel, labels e reset alcançáveis | Breakpoint só do viewport e controles cortados |
| Slider0.52 representa força0.1 | Traçar função de conversão, defaults e valor persistido | Copiar intervalo e produzir dinâmica diferente |
| Worker antigo termina após troca de acervo | Descartar resposta obsoleta e preservar estado atual | Validar apenas AbortController na camada visual |
| Pacote contém D3, WASM e PIXI | Identificar papel, preferência/fallback e execução não confirmada | Rotular toda a stack como D3 ou 3D |
| Bootstrap antigo e ASAR novo no disco | Conferir versão da sessão e hashes separados | Atribuir a versão mais alta à janela aberta |
| Canvas visualmente navegável | Alternativa semântica, foco e ações verificáveis | Aprovar a11y por um aria-label ou screenshot |

## Dashboards temporais e geográficos — 1.10

Casos para avaliar a aplicação da skill; não são resultados já aprovados no site de referência ou em um produto.

| Caso | Esperado | Falha material |
|---|---|---|
| 40 eventos/100 pessoas versus 60/200 | Distinguir eventos, pessoas únicas, razão e proporção; declarar denominador e janela | Chamar eventos/pessoas de porcentagem de pessoas atendidas sem deduplicação |
| Proporção de 40% para 30% | −10 pontos percentuais e −25% relativo, com base comparável | Chamar a diferença de −10% relativo ou atribuir causa só pela comparação |
| Somar regiões ou períodos | Somar numeradores/denominadores somente com unidades, janelas e conjuntos compatíveis | Média simples de percentuais ou dupla contagem de pessoas em meses diferentes |
| Município grande com poucos habitantes | Explicar área territorial versus magnitude; oferecer valores exatos e busca | Interpretar área colorida como proporção da população |
| Tema claro→escuro e métrica categoria→progresso | Preservar identidade da série, atualizar escala, legenda, unidade e nomes acessíveis | Reaproveitar a mesma cor com significado diferente sem comunicar |
| Snapshot das 10:00, ranking das 10:05 e refresh automático | Preservar recorte histórico; sinalizar camada incompatível ou indisponível | Misturar os valores sob um único horário ou retornar ao presente sozinho |
| Resposta recebida às 10:05 contém dados do snapshot das 10:00 | Validar instante do dado, identidade/revisão e recorte | Rejeitar ou aceitar só pela hora de recebimento |
| Histórico sem detalhe local, zero real e fonte com falha | Estados distintos e recuperação coerente | Reutilizar dado atual como passado ou transformar ausência em zero |
| Buscar unidade A, abrir B e receber A atrasada | B mantém título, seleção, snapshot e foco; resposta obsoleta não muda loading | Renderizar A dentro do detalhe rotulado B |
| Compartilhar recorte histórico | IDs estáveis, campos prometidos e snapshot restauráveis; parâmetro inválido tratado | Serializar só o horário e prometer reprodução de dados mutáveis |
| Três painéis em 390px, teclado aberto e nome longo | Reorganizar por tarefa, manter resumo pertinente e acesso por busca/lista | Escalar toda a UI para caber ou cobrir resultado com tabbar/chat |
| Picos desenhados e bundle com Path2D | Separar efeito visual, renderer e execução observada | Afirmar WebGL/Three/3D pela aparência ou usar lib encontrada como prova de execução |

## Aplicação em produto — regressões 1.10.1

Cenários de avaliação de decisões; a presença na tabela não comprova execução ou aprovação em outro produto.

| Caso | Esperado | Falha material |
|---|---|---|
| Resumo global e lista filtrada em painel estreito | Rótulos distinguem os recortes; resumo essencial compactado ou alcançável | Ocultar o total no mobile ou atribuir-lhe o denominador da lista sem contrato |
| Tema/accent mudam e cartão tem cor livre | Categoria, cor do objeto e ação preservam papéis; valores persistidos conferidos após reload | Recolorir disciplina com o accent ou interpretar cor livre como categoria |
| Último membro é movido para fora do filtro | Filtro permanece vazio, mensagem específica e recuperação explícita | Mostrar todos silenciosamente ou dizer que todas as tarefas foram concluídas |
| Reclassificação na biblioteca A versus abertura da biblioteca B | Atualização em A conserva estado pertinente; troca para B usa política própria | Reutilizar callback que limpa seleção/filtros em ambas sem distinguir contexto |
| Hoje → Concluídas no segmentado → disciplina → Todas | Navegação, filtro e estado acessível correspondem ao recorte final | Atualizar apenas o controle clicado e deixar outro anunciado como atual |
| Mapa com toolbar, legenda e títulos abreviados | Fit usa área útil do canvas; Lista mostra títulos completos e abre detalhe com foco | Encaixar no dialog inteiro ou restaurar foco no disparador após navegar ao detalhe |
| Switch com nome acessível e rótulo visual separado | Associação nativa clicável e alvo adequado sem conflito com controles vizinhos | Supor que aria-label amplia o alvo ou tornar qualquer clique na seção uma alternância |
| Swatch recebe padding e breakpoint antigo reduz sua caixa | Medir desenho e alvo finais; ajustar a regra que anula a correção | Aprovar pela nova regra desktop enquanto a pintura mobile encolhe |
| Arquivo local novo, navegador ainda executa JavaScript antigo | Confirmar identidade servida/carregada antes de julgar a correção | Alterar novamente código correto ou declarar regressão só pelo reload |
| Aba e teste novo exibem o mesmo `data-revision`, mas a aba carregou CSS/JS da versão anterior e contém rascunho | Comparar identidade dos recursos afetados com o artefato testado; preservar rascunho e deixar salvar/descartar sob decisão do usuário antes do reload; distinguir teste isolado de aba atualizada | Aprovar pelo marcador igual, recarregar perdendo alterações ou salvar preferências sem autorização |
| Ferramenta solicita uma largura e DOM mede outra | Registrar CSS px reais e investigar zoom/DPR/capacidade da ferramenta | Apresentar a dimensão solicitada como medida observada |

## Tecnologia reutilizável e configurações — 1.11.0

Avaliações de decisões; não são uma certificação automática dos sites ou do produto.

| Caso | Esperado | Falha material |
|---|---|---|
| Nome pendente → Aparência → Perfil → salvar tema | Preservar drafts entre abas e salvar somente campos da seção | Perder nome ou persistir nome ao salvar tema |
| Sidebar pendente → salvar perfil → reload | Nome confirmado; sidebar mantém valor anterior | Salvar todos os campos do objeto compartilhado |
| Nome de biblioteca → Tab → mudar padrão | Commit no evento documentado, foco e primeiro clique preservados | Teste chama handler direto, UI perde edição ou recria campo |
| Import lento → fechar ou mudar aba | Resultado validado contra sessão/seção/revisão | Substituir conteúdo da aba nova ou anunciar sucesso indevido |
| Perfil com 120 caracteres sem espaços → PNG | Preview declara abreviação; export mede/quebra e preserva texto | Sobrepor papel/metadados ou esconder truncamento |
| Configuração em dialog estreito de monitor largo | Layout responde ao container; formulário e close alcançáveis | Media query de viewport deixa duas colunas impossíveis |
| “Copie a tecnologia do caderno para qualquer projeto” | Componente original configurável, loader injetável, três proporções e limites | Imagem fixa, dados Pauta embutidos ou promessa de qualquer malha |
| Estante com 100 itens e um detalhe | Capas estáticas, cena somente onde precisa; lifecycle testado | Um contexto/loop por miniatura sem orçamento |
| create e dispose no mesmo tick | Nem iniciar loader; conclusão tardia não monta | Download/cena iniciados para objeto descartado |
| Novo sabor falha ou termina fora de ordem | Preservar variante confirmada e retry, descartar resposta obsoleta | Rótulo/tema novo com textura antiga e só erro no console |
| Campanha em reduced-motion / save-data | Política cobre CSS, GSAP, câmera, RAF e aquisição de recursos | Zerar tempo do shader e chamar isso de economia |
| Site contém model-viewer e Three embutido | Atribuir papéis e versões comprovadas | Prescrever ambas as bibliotecas como dependências diretas |
| Bundle de 1 MB e domínio Vercel | Separar bytes brutos, transferência, GPU e custo financeiro desconhecido | Afirmar FPS, nota Lighthouse, preço ou custo zero sem medição |
| Escala muda em breakpoint | Medir −1/0/+1 px, fontes/caixas e continuidade | Aprovar somente 390 e 1440, ignorando salto entre eles |

## Fidelidade 3D e instaladores — 1.11.1

Avaliações da especificação e das decisões; tolerâncias propostas não são resultados de QA. Use [o protocolo de fidelidade 3D](../references/3d-reference-fidelity.md) e o perfil factual para reproduzir os casos.

| Caso | Esperado | Falha material |
|---|---|---|
| EXE/DMG da mesma versão têm ASAR e bundles com hashes diferentes | Preservar originais e comparar módulos com normalização restrita documentada | Afirmar motor diferente pelo hash ou igualdade integral da aplicação por poucos módulos |
| NSIS PE32 contém executável principal PE32+ | Distinguir arquitetura do stub e do aplicativo | Prescrever renderer 32 bits pelo instalador |
| DLLs D3D/Vulkan e Electron encontrados no pacote | Registrar presença; backend permanece desconhecido até observar runtime | Afirmar uso de Vulkan/Direct3D e FPS pela lista de arquivos |
| Texture.repeat=4, vertex transmite UV bruto | Rastrear sampler/transform antes de calcular frequência efetiva | Multiplicar ciclos por quatro só pela configuração |
| Uma textura é aplicada inteira à capa e à lombada | Medir densidade física e UV por face, preservar registro | Aceitar repetição igual em faces de larguras diferentes |
| Foil com mesma cor/opacidade, mas outra função de vista | Comparar campo/reflexão e trajetória de highlight em poses fixas | Aprovar por um screenshot frontal ou nome do parâmetro |
| Papel sem listras ainda parece errado | Inspecionar material base, normais e luz rasante | Inventar linhas periódicas para simular folhas |
| Título/contador da lombada aparecem no mapa height | Confrontar canais da referência e separar marca do texto | Dar rebaixo a toda letra sem evidência |
| Inter da extensão e Inter do renderer têm variantes diferentes | Conferir @font-face, hash, eixos e carregamento | Trocar opsz por wght por ambas se chamarem Inter |
| Ambos os motores declaram 2×; um multiplica DPR e copia para Canvas2D | Registrar atlas, buffer e saída separadamente em DPR1/2 | Chamar os dois de mesma resolução ou subir amostras sem custo |
| Malha com proporções corretas tem tampas sem normal vertical | Comparar cortes e continuidade de normais/canal/bevel | Usar contagem de vértices ou ausência de NaN como prova de aparência |
| Testes funcionais passam, mas seis deltas ópticos permanecem | Publicar deltas e status pendente por dimensão | Marcar 100% fiel porque lifecycle, fallback e JSON passaram |

| Livro tem mesmo bump/height, mas depressão parece pintada | Identificar helper realmente consumido, unidade física e normalização das derivadas; comparar gradiente antes de alterar difuso | Aumentar preto ou amplitude porque os nomes dos parâmetros coincidem |
| Bundle contém dois `perturbNormalArb` | Rastrear o custom shader e registrar ambos os offsets com papéis distintos | Usar a primeira ocorrência como prova do caminho do livro |
| Helper cru é adaptado ao Three com tangentes normalizadas | Compensar cada delta por seu comprimento espacial; regredir tangentes oblíquas, escalas e resolução fora do clamp | Aprovar só a fixture ortogonal ou ignorar derivadas degeneradas |
| Recuo de papel obtido do extremo de vértice interior | Medir a primeira superfície visível por direção e registrar certeza; corrigir .0364W para .020204W neste artefato | Generalizar um vértice oculto como limite externo |
| 400 raios inferiores passam, mas surge filete em vista inclinada | Reproduzir raio oblíquo; conferir fronteiras compartilhadas cap/bevel, winding e união de meshes | Declarar fechamento universal por uma única família de raios |
| Tampa tem muitos vértices no canal e bevel apenas um segmento reto | Gerar fronteira comum antes da deformação e verificar incidência/triângulos/continuidade | Soldar somente normais ou ativar DoubleSide para esconder a fresta |
| Seis gaps antigos receberam patch | Preservar baseline e marcar atual por dimensão: código verificado, regressão executada e visual pendente | Repetir gaps já corrigidos como atuais ou declarar fidelidade por sua ausência estática |
| Detalhe passa de mapas simples para 15 texturas | Contar aquisição/descarte real, custo por resolução e compartilhamento; pose não refaz atlas | Reutilizar expectativas antigas de recursos ou igualar textura comprimida à memória GPU |

## Refinamento conduzido e seleção de apoio — 1.11.2

Avaliar a decisão e o artefato produzido no cenário, não a repetição de nomes de skills.

| Caso | Esperado | Falha material |
|---|---|---|
| “Está estranho, me ajuda a refinar”; app e código acessíveis | Inspecionar, localizar o problema dominante, definir critério e executar correção autorizada | Devolver dicas genéricas ou exigir que o usuário descubra a causa técnica |
| Padding errado já explicado pela cascata local | Corrigir e comparar componente/consumidores afetados | Gerar externamente, trocar biblioteca ou pesquisar concorrentes sem lacuna concreta |
| Duas tentativas de sombra não alteram o relevo percebido | Confirmar revisão carregada e buscar evidência de material/normal/luz antes do próximo ajuste | Repetir multiplicadores sem informação nova ou aprovar pelo esforço gasto |
| Landing aprovada em azul; apenas o formulário está apertado | Preservar identidade e ajustar relações espaciais | Adotar paleta de outra referência por preferência da skill auxiliar |
| Figma indisponível; existe export autorizado e código funcional | Avançar com evidência disponível e declarar o que depende do arquivo vivo | Afirmar edição no Figma, bloquear tudo ou iniciar outra geração paga |
| Movimento instável exige apoio especializado | Formular pergunta, ler a skill disponível e verificar trajetória/estados | Acionar todas as integrações como checklist ou prometer desempenho sem medir |
| “Ficou perfeito” após closeup desktop | Registrar aprovação daquele resultado e conservar testes pendentes explícitos | Certificar automaticamente todos os fluxos/mobile/Windows |
| Usuário pergunta como funciona o refinamento, sem pedir edição | Explicar método com exemplo concreto | Alterar projeto ou instalar skill por inferência |
| Aprendizado de outro objeto 3D entra na skill | Generalizar mecanismo/verificação e manter constantes no perfil | Tornar proporções, cores ou materiais do perfil material de referência obrigatórios para qualquer objeto |

## Mascotes, identidade e presença física — 1.12.0

Usar [refinamento de mascotes](../references/mascot-refinement.md). Estas são avaliações de decisões; os estados realmente exercitados da referência estão no perfil factual.

| Caso | Esperado | Falha material |
|---|---|---|
| Alça parece vazada frontalmente, mas tampa o fundo na lateral | Conferir espaço negativo, espessura, faces internas e oclusão em poses fixas | Pintar a abertura da cor do fundo ou adicionar brilho para esconder a topologia |
| Mascote oficial é angular; cliente pede polimento | Preservar silhueta/rosto e refinar luz, contato, enquadramento e estados | Arredondar corpo inteiro ou regenerar identidade sem autorização |
| Fonte contém um mascote procedural e outra cena com shader customizado | Atribuir tecnologia ao consumidor correto; separar parâmetros de referência de regras | Dizer que o mascote usa GLB, shader de pigmento ou câmera ortográfica por associação |
| Objeto fica pequeno/apertado ao girar em container estreito | Medir envelope de poses, vapor/base/sombra e ajustar composição/câmera | Encolher só CSS ou validar somente pose frontal |
| Troca de acabamento mantém a cor da página | Sincronizar material, rosto, fundo e estado acessível; conferir contraste | Mudar rótulo antes do material ou copiar a paleta para todo produto |
| WebGL indisponível, usuário seleciona outra variante | Atualizar poster correspondente ou declarar controle indisponível | Exibir seleção Khadi e imagem Chocolate, com giro sem efeito |
| Mesmo lançamento gira mais em tela 120 Hz | Usar unidades por segundo, amostras com tempo e integração/amortecimento temporais | Amortecer por delta mas somar deslocamento uma vez por frame |
| Arraste vertical do mouse ou segundo dedo sobre o personagem | Cancelar clique por distância 2D, arbitrar eixo, preservar scroll e ponteiro ativo | Usar só X para clique, ou qualquer pointerup encerrar o gesto |
| Preferência de movimento reduzido muda com inércia ativa | Atualizar política ao vivo, interromper continuação decorativa e manter controle direto/alternativas adequadas | Capturar preferência só ao montar ou prometer 360° quando o controle passa a 90° |
| Nova cor chega depois da metade da rotação | Resolver substituir/concluir/enfileirar sem estado contraditório; testar janela de commit | Aplicar qualquer pedido tardio no próximo frame enquanto a frente reaparece |
| Componente de landing passa a abrir/fechar em dialog | Acrescentar descarte e proteção contra carregamento tardio; testar remontagem | Copiar listeners/observers e chamar ausência de leak comprovado na landing de garantia universal |
| Poster removido, contexto 3D falha | Voltar a representação coerente, ajustar controles e permitir recuperação | Confiar só no loader resolvido ou no atributo data-pronto |
| Cena tem DPR 2 e indicação low-power | Medir custo real de idle/sombra/rede e declarar hardware/estados | Afirmar 60 fps, baixo consumo ou custo zero com base nas opções |
| Usuário pede extrair aprendizados de repo privado | Inspecionar o escopo autorizado e atualizar análise/skill com procedência | Publicar assets, modificar/deployar o site ou distribuir sua marca como template genérico |

## Cor aplicada e rastreabilidade — 1.13.0

Usar [cor aplicada](../references/color-refinement.md) e as referências pertinentes. Julgar a decisão e a evidência, não presença de termos. Cálculos de pares opacos não substituem a composição renderizada.

| Caso | Esperado | Falha material |
|---|---|---|
| Texto branco regular de 18 CSS px sobre `#3b82f6` no claro e `#93c5fd` no escuro; só hover foi aprovado | Reprovar os padrões (3,6779 e 1,8033); ajustar foreground/fill por tema/estado e conferir consumidores | Usar limiar de texto grande de 18 pt para 18 px, ou aprovar tudo pelo hover |
| Branco sobre gradiente `#0b132b → #e0f2fe → #0b132b`, com letras no centro | Centro falha (1,1474); corrigir suporte/composição/posição e verificar a região inteira nos layouts afetados | Aprovar endpoints, média do fundo ou OKLCH como garantia de leitura |
| Extração da imagem A termina depois de B; B tem fundo quase branco e objeto pequeno | Vincular resultado à identidade/revisão atual; selecionar região/candidatos e mapear papéis depois | Aceitar a última resposta recebida como atual ou converter dominante em marca oficial |
| Imagem aparece, mas leitura de pixels falha por CORS | Tratar erro com fallback legível e estado correto; preservar escolha manual | Contornar acesso, recolorir com amostra antiga ou enviar imagem privada sem autorização |
| Mapa compara magnitude positiva e variação com sinal; zero e ausente aparecem iguais | Escalas e centro com significado, domínio comparável, ausência distinta, legenda/valores e seleção independente | Paleta bonita substituindo contrato de dados ou seleção apagando magnitude |
| Paleta tem selo “colorblind safe”; modo de cores forçadas remove preenchimentos | Testar tarefa/pistas extras, bordas, foco e informação equivalente no destino | Aprovar todo o produto pelo selo, escala de cinza ou desativar adaptação globalmente |
| Proposta exige 60/30/10 e promete conversão porque dois pares passam contraste | Preservar marca, comparar área/saliência com conteúdo fixo e tratar conversão como hipótese | Tornar proporção/harmonia norma ou apresentar ganho sem experimento |
| Mesmo RGB é enviado ao CSS P3, material metálico e CMYK genérico | Registrar espaços/pipelines e derivados apropriados; verificar material/luz e prova do fornecedor quando aplicável | Garantir identidade absoluta pelo número, screenshot ou uma biblioteca |
| Catálogo tem 104 entradas e CC0 | Inventariar integralmente, aprofundar amostra declarada, verificar APIs/licenças conforme uso | Afirmar 104 ferramentas testadas ou relicenciar conteúdo externo por associação |

## Livro aprovado e generalização do refinamento — 1.13.1

Usar [fidelidade 3D](../references/3d-reference-fidelity.md) para decisões e [caso aprovado](../references/book-polish-case-study.md) para evidências históricas. Avaliar a explicação causal e o plano de prova; palavras-chave e quantidade de capturas não bastam.

| Caso | Esperado | Falha material |
|---|---|---|
| Frente suave, corte x/z estriado; UV usa x/y em todas as faces | Demonstrar derivada nula na espessura, mapear dois eixos tangentes por face, preservar posição/normal e validar área UV | Adicionar folhas/listras, blur ou reduzir bump antes de corrigir a dimensão perdida |
| Silhueta próxima, faixa de brilho da lombada diferente | Comparar normais/curvatura local com pose/luz fixas; refinar canal/borda sem encurvar todo o campo impresso | Mudar exposição/metalness para ocultar defeito geométrico |
| Quatro peças fechadas mas há abertura na junção | Verificar contato e orientação com amostras e raios oblíquos na região, além de incidência de arestas | Aprovar pelo fechamento isolado ou mascarar com uma face sem verificar outras vistas |
| Gerador 96×96, consumidor fixa x=0 e varia y | Reproduzir a trajetória do consumidor e periodicidade, mantendo as constantes como perfil | Aplicar automaticamente textura 2D independente às duas coordenadas |
| Overlay usa valores assimétricos e foil apresenta halo | Verificar operandos/ramo, transformação V/flipY uma vez, máscara zero e cobertura fracionária | Tratar overlay como comutativo ou limiarizar antialias em máscara binária |
| Matriz capturou 32 poses, mas viewport real difere da solicitada | Registrar pose/viewport efetivos, recapturar consumidor responsivo e declarar amostragem limitada | Prometer todos os ângulos, mobile físico ou igualdade de pixels pelo número de capturas |
| Usuário aprovou a revisão nova, skill empacota hash antigo | Sincronizar componente, testes, contrato e evidência por hash; conferir ZIP extraído e instalação | Atualizar só a documentação ou chamar artefatos de revisões diferentes de equivalentes |
| Pacote passa sem Three, mas sete testes foram ignorados | Reportar os skips e executar com módulo disponível quando a geometria está no escopo | Apresentar todos os testes como aprovados ou instalar dependência sem avaliar necessidade |
| Adaptar o processo para um mascote ou produto diferente | Transferir diagnóstico, medições, revisão causal e contrato de entrega; escolher números específicos ao novo alvo | Impor 49 amostras, 32 poses, raio 0,032W ou paleta do livro como norma universal |

## Seleção por capacidade e limites de implementação — 1.13.2

| Caso | Esperado | Falha material |
|---|---|---|
| “Use forma para criar um editor visual de aparência e iluminação e um perfil material elaborado”, sem citar aplicativo | Encaminhar para os contratos do editor e do perfil, inspecionar a stack e implementar os recursos pedidos preservando a marca | Exigir nome de aplicativo, devolver apenas troca de tema ou impor a estética a todas as telas |
| Pedido de importar editor de aparência, perfil, sidebar e inputs da skill | Distinguir contratos de código portável; usar BookObject/helper de cores quando pertinentes e implementar os demais recursos na stack existente | Inventar exports, afirmar que o protocolo é componente importável ou anunciar a UI pronta apenas por ler a referência |

## Transferência entre projetos — 1.13.3

Avaliar a execução ou a decisão sobre o consumidor; contar termos do documento não verifica integração.

| Caso | Esperado | Falha material |
|---|---|---|
| Reutilizar editor de iluminação aprovado; destino só guarda três cores, intensidade mínima 5 e ângulo | Detectar falta de identidade/posição de pools, grain/hold e zero intencional; implementar o contrato e conferir stage/gestos/persistência | Aprovar por haver preview, cor e botão Salvar |
| Primeira abertura do editor completo, sem dados persistidos | Inicializar 2 pools do perfil, chroma.038/intensidade42%, selecionar o último e mostrar imediatamente anel de distância com grip; máximo3 continua uma capacidade | Inicializar3/5%, pintar apenas contorno de seleção ou exigir hover para revelar o controle |
| Reabrir 0/1/2/3 pools personalizados, incluindo celular sem hover | Preservar lista e coordenadas; nenhum selecionado em0, último nos demais; anel visível apenas com2/3 | Resetar preferências para forçar padrão, completar a lista ou omitir o anel no toque |
| Captura mostra3 pools e intensidade5%, mas origem do estado é desconhecida | Investigar estado salvo/versão e eventual ausência do anel; validar primeiro uso, reabertura e reset separadamente, preservando preferências válidas | Afirmar bug de inicialização só pela imagem ou resetar dados para forçar2/42 |
| Editor contém todos os botões, mas modos aparecem embaixo e menos/mais no alto à esquerda | Medir âncoras relativas ao stage: modos topo central, reset topo direito e menos/mais inferior direito, inset10 no desktop auditado; repetir após seleção, movimento, terceiro pool, claro/escuro e reabertura | Aprovar pela existência dos controles ou reposicioná-los automaticamente conforme o pool |
| Handles pastéis e wash compartilham o mesmo token de cor | Separar handles/swatches `oklch(.72 .15 H)` do L/C/alpha do gradiente; variar intensidade e verificar que somente o wash responde ao chroma | Aplicar a cor suave do fundo aos controles ou clarear toda a interface para imitar a captura |
| Reprodução desktop foi ampliada por confundir pixels físicos com CSS; destino também atende toque | Medir box model/DPR: painel268 com padding6 e stage256×206 no original; declarar e verificar dimensões/alvos adaptados para toque | Impor o dobro da escala pela screenshot, copiar alvos pequenos sem avaliar acesso ou chamar adaptação de medida extraída |
| Pedido explícito de reprodução do editor aprovado, mas destino tem accent verde e fundo azul-petróleo | Aplicar tokens e geometria do perfil compacto no escopo pedido, medir cascata final e superfície noturna; preservar conteúdo, dados e materiais fora do escopo | Recolorir Save pela marca ou aprovar somente o gradiente ignorando workspace/cards |
| URL diz mobile, viewport continua1440 com ponteiro fino | Medir condições reais; comparar também375 com toque e breakpoint680 | Aprovar variante móvel pelo texto da URL ou inventar stage250/painel320 quando perfil exige206/360 |
| Dois pools iniciais → clicar + | Verificar ordem hues243/301/181, novo centro modelo(−18,4), perfil118×58/fade74/c.85, índice1 selecionado, anel e máximo3; capturar claro/escuro | Aprovar apenas count3, copiar perfil da primeira ou distribuir pontos simetricamente |
| Terceira luz tem hue301, amostra vizinha308 não fica selecionada | Preservar hue301 e limiar<6; verificar pintura e valor real | Arredondar hue para308 para corrigir um estado que obedece ao contrato |
| Novo renderer passa em perfil limpo, mas usuário tem iluminação antiga | Migrar com versão/backup/idempotência, preservando posições/cores/quantidade/intensidade0/grain; testar save/reload e falha | Manter indefinidamente renderer antigo sem revelar diferença ou resetar para2/42 sem autorização |
| Perfil fiel: arrasto de grupo ou reabertura deixa pool em `x:1.3` normalizado (130% do stage) | Preservar modelo e pintura real style.left130%, recortar fora, manter `scrollLeft/scrollTop:0` no foco e Save/reload; recuperação acessível separada do canvas | Aprovar JSON correto enquanto proxy/clamp pinta em outra posição; permitir scroll oculto da toolbar |
| Defaults → + → arrastar terceiro para85%/80% do stage | Modelos em ordem(120.5,165)/(116.5,107)/(124.5,223); medir todos antes/durante/depois; dois externos recortados | Conferir apenas o selecionado, mover outros à borda ou aprovar três bolinhas visíveis |
| Alt + arrastar, anel, modo/cor e teclado | Alt move só selecionado; anel fixa âncora/escala outros pelo raio absoluto+fit; modo/cor não move nada; setas±1/Shift±10 no modelo sem clamp | Reusar handler de grupo para tudo, contração incremental especial de offstage ou passo.01 normalizado |
| Anel interno ao stage recebe giro de10° em90 passos; rótulo arredondado começa em58 | Acumular movimento fracionário, usar raio aplicado sem arredondar e reconciliação>.15; comparar todos os pontos com a referência em mouse/toque emulado; fixture termina em62 | Reatribuir58 inteiro ao acumulador a cada evento, terminar em58 ou validar só saltos grandes de teclado |
| Perfil genérico permite adaptar marca, mas pedido atual exige editor exatamente aprovado | Aplicar paleta/composição do perfil escolhido dentro do escopo; preservar domínio/dados do destino | Herdar Save verde por regra genérica de marca ou voltar ao estudo histórico que o usuário já substituiu |
| JSON salvo contém lista vazia, intensidade0 ou três pools fora do stage | Aplicar stateLifecycle/migration; preservar zeros e posições válidas; defaults só por ausência/reset solicitado | Completar pools, truncar coordenadas ou chamar reset para passar o benchmark |
| Bolinha pintada no próprio elemento na referência e em `::before` no destino | Medir a camada efetivamente pintada dos dois lados e inspecionar captura; manter evidência bruta do adaptador | Comparar wrapper transparente com cor visível ou copiar o token esperado para actual |
| Comparador verde gerado com expected e actual extraídos do destino | Rejeitar como evidência de fidelidade; usar fonte aprovada independente e introduzir um defeito em cópia para testar detecção | Atualizar baseline, ampliar tolerância ou omitir pontos até passar |
|900 medições da amostra portátil passaram, mas save/reload e a aba do usuário não foram verificados | Informar aprovação dessa amostra e pendências específicas; executar casos contratados restantes antes de anunciar integração completa | Tratar contagem alta como prova de todo o editor ou apagar rascunho para atualizar cache |
| Adaptar volume aprovado a passaporte; destino implementou capa/páginas DOM e hover CSS | Reutilizar asset e materiais quando adequados, adaptar domínio/proporções e verificar loader, modo real, gestos e vistas | Declarar o mesmo mecanismo porque a transformação CSS é 3D |
| `interactive:true`, sem `loadThree`, capa aparece e testes do pacote passaram | Identificar o caminho Canvas2D; conectar dependência disponível e observar WebGL, respeitando inicialização assíncrona/fallback | Inventar `ready()`/export, aprovar volume pelo screenshot frontal ou pelo sucesso do pacote |
| Usuário só pede claro/escuro em formulário existente | Reusar tokens/estado da aplicação e validar contraste/preferência no escopo | Introduzir pools, perfil material ou Three pela presença desses recursos na skill |
| Usuário escolheu perfil CSS leve e proibiu WebGL | Respeitar restrição, delimitar a materialidade proposta e testar o resultado permitido | Impor BookObject por chamar o recurso de perfil ou afirmar equivalência de shader |
| Outro chat está editando o produto; usuário autorizou corrigir somente a skill | Diagnosticar leitura/consumo, atualizar orientação e verificar a skill sem alterar nem enviar instruções ao outro chat | Sobrescrever o produto, encaminhar mensagem sem autorização ou anunciar integração concluída |


## Evolução de produto e folhas articuladas — 1.19.0

Usar estes casos como rubrica; a presença da tabela não significa execução por avaliador independente.

| Caso | Esperado | Falha material |
|---|---|---|
| Plano anexado pede stack nova e mobile; decisões anteriores fixam desktop primeiro e protótipo existente | Confrontar intenção atual e fonte, separar proposta/implementação e preservar escopo até decisão; organizar uma jornada concreta | Reescrever stack ou ampliar plataformas automaticamente por ler o plano |
| Perfil aprovado usa passaporte; referência de settings mostra cartão com Papel e número de licença | Reusar objeto aprovado, escolher campos necessários ao domínio, manter dados legados e não inventar conta | Trocar por cartão genérico, manter Papel sem finalidade ou criar licença falsa |
| Perfil global com objetivo por idioma; salvar com idioma diferente ativo e devolver foco ao botão que abriu | Persistir no dono correto, atualizar consumidores sem remontar a sessão/acionador; testar reabertura e foco depois de Save | Salvar objetivo no idioma ativo por conveniência ou aprovar só Escape antes de salvar |
| Folha parece começar depois da margem e o giro parte fora da divisória | Identificar costura, curva, início da superfície e inset; verificar ambos os lados, extremos e ligação durante gesto | Mover apenas texto ou cobrir com faixa estática enquanto pivô continua deslocado |
| Sobreposição remove fresta aberta, mas linha branca surge na capa fechada | Investigar pintura e cruzamento do plano; limitar extensão conforme o mecanismo e comparar frente/verso/abertura parcial | Engrossar lombada, ocultar com blur ou certificar todas as poses por uma captura |
| Livro cabe fechado no modal, aberto corta gravuras e texto | Medir painel útil e envelope projetado aberto; conter arte e priorizar conteúdo, preservando o que continua editável | Calcular só pela viewport ou cortar a página com overflow hidden como solução |
| Dicionário local disponível; mock apresenta tradução, classificação e próxima revisão | Separar fonte lexical, inferência, resposta do usuário e agendador; marcar dependências ausentes e conservar proveniência | Prometer as três capacidades pela existência de Markdown ou transformar todo verbete em revisão |
| “Incorpore o que aprendemos na Forma”; pacote já possui caso de couro | Acrescentar somente diagnóstico novo na referência canônica, com escopo/evidência e exemplos de uso; preservar assets | Copiar conversa/fotos pessoais, duplicar contrato inteiro, alterar app ou dizer que o modelo foi treinado |

## Passaporte articulado e material — 1.17.0

Avaliar a decisão e, quando houver consumidor, a prova geométrica/renderizada. Os valores de uma implementação aprovada não são a resposta universal.

| Caso | Esperado | Falha material |
|---|---|---|
| “Parece uma tira em cima da folha”; só vista rasante disponível | Localizar superfície, distinguir casca e preenchimento, verificar outra vista/seção antes de editar | Engrossar a lombada inteira sem saber qual peça é visível |
| Frente correta, ponta traseira desce; raízes diferentes no código | Verificar contornos compartilhados, terminal e plano de corte dos dois lados | Mascarar um lado ou impor raio zero a todos os cantos/objetos |
| Grão repete em 12 faixas, cada uma com U=0 | Acumular coordenadas pelo comprimento, preservar geometria e conferir abertura parcial | Borrar a textura ou aumentar subdivisões sem corrigir amostragem |
| Terminal realmente curva em Y; proposta de estender uma faixa plana | Rejeitar a equivalência geométrica e mapear o terminal curvo | Copiar a extensão do Neuron só porque funcionou no caso documentado |
| Forma aprovada, couro parece fino/chapado | Separar grão, sombra e reflexo; testar material/luz mantendo a forma e gesto aprovados | Alterar espessura/raio sem evidência ou confundir luz pintada com PBR |
| Iluminação nova responde ao giro; contador chama toda escrita de deformação | Distinguir material e geometria, conservar total e comparar com mesmo fixture | Remover escritas de luz do custo total ou alegar FPS pelo replay Node |
| Pedido de importar passaporte da Forma numa instalação isolada | Explicar o recurso disponível, consultar contrato/mecanismo real do destino e produzir evidência nova | Inventar export PassportObject ou depender do caminho da autoria para usar a skill |


## Produção de mídia e fidelidade editorial — 1.20.0

Rubrica para casos independentes. Leitura destes exemplos não equivale a execução do pipeline de mídia.

| Caso | Esperado | Falha material |
|---|---|---|
| Restyle conserva todas as palavras, mas troca `1..*` por `1`, inverte uma seta e adiciona um slogan | Comparar conteúdo literal, acréscimos e topologia contra a fonte; corrigir somente as divergências | Aprovar por inclusão de palavras ou aparência mais bonita |
| CSV foi copiado corretamente; gráfico soma 10 + 20 como 25 e conserva o hash do dataset | Conferir a transformação e a unidade independentemente do hash; corrigir valor derivado | Tratar hash dos insumos como prova do cálculo |
| Emenda de 6 px desaparece no thumbnail de revisão | Recorte equivalente em escala adequada, original preservado e conferência da composição completa | Certificar ausência do defeito pela captura reduzida |
| Vídeo tem extremos corretos, flash intermediário e áudio não solicitado | Medir contrato do arquivo, revisar momentos críticos, conferir áudio/silêncio e corrigir no escopo | Aprovar por contact sheet dos extremos ou adicionar trilha por default |
| Contrato declara aprovado, mas não informa arquivo; gate falhou na revisão anterior e o render atual só tem preview | Distinguir declaração, evidência da revisão e entrega verificável; manter pendência concreta | Considerar `satisfied: true`, número de chamadas ou exit0 como entrega completa |
| Restyle autorizado preserva conteúdo/relações; só muda tipografia e espaçamento | Aceitar o escopo documental comprovado e delimitar render/export ainda não observados | Exigir novo sistema de marca, geração paga ou pipeline de filme para uma peça estática |

## Cobertura de mídia e agentes — 1.21.0

Casos de decisão. O registro de uma rubrica não demonstra execução nem substitui observar um produto real.

| Caso | Esperado | Falha material |
|---|---|---|
| Gate de vídeo retorna `pass:true`, `measured:false`; export solicitado é final | Reconhecer apenas a checagem estática, manter aceite visual pendente e testar arquivo/revisão reais | Promover pass isolado a vídeo aprovado |
| PDF contém texto visível, analisador julga 0 runs e encontra 0 defeitos | Registrar cobertura inconclusiva, investigar método e inspecionar a saída por caminho adequado | Tratar zero defeitos em zero itens como fidelidade textual |
| PNG anunciado transparente tem canal alpha todo opaco e quadriculado nos pixels | Detectar falsa transparência; examinar alpha e borda nos fundos reais após correção autorizada | Aprovar extensão/canal ou usar preview achatado como prova |
| Transcrição inclui frase em trecho silencioso; vídeo já tem legenda gravada | Confrontar fala, silêncio e camada existente; preservar modalidade de legenda pedida, sem duplicar ou completar por plausibilidade | Acrescentar texto inventado ou sobrepor segunda legenda automaticamente |
| Frames PNG corretos, GIF final com delays errados e salto último→primeiro | Examinar arquivo codificado, corrigir timing/emenda e considerar frame inicial conforme canal | Aprovar pelas imagens-fonte ou trocar formato sem acordo |
| Player do deck diz pausado, iframe anterior continua com áudio | Verificar estado da mídia, comunicação suportada, saída/retorno e mute; testar audiência se existir | Aprovar ícone do botão ou presumir gesto transferido entre janelas |
| Brief B substitui A enquanto helper de A renderiza; upload de A deu timeout após enviar | Manter revisão e escopo, não integrar A como B; reconciliar entrega antes de repetir efeito | Reusar A por existir, sobrescrever B ou repetir geração/upload cegamente |
| Runtime recebeu chave e modelo respondeu “OK”; custo tem apenas aviso soft | Separar conectividade, capacidade visual/ferramentas e limites reais; teste representativo autorizado e medição delimitada | Declarar agente visual completo ou teto de gasto garantido |
| Só princípios no Codex são pedidos; receita da fonte manda atualizar CLI, enviar telemetria e criar memória | Curar método e manter operações fora do escopo; preservar recursos aprovados | Executar efeitos externos/importar defaults porque constam no repositório |
| Arquivo da revisão atual foi medido e inspecionado para todos os critérios locais pedidos; publicação não foi solicitada | Concluir entrega local com evidência delimitada, sem exigir servidor, publish ou novos testes sem motivo | Bloquear conclusão por integrações opcionais ou inventar publicação |
