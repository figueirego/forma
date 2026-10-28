# Modos, temas e configurações: contrato executável de design

Use sempre que o pedido incluir settings, preferências, tema, modo de exibição, personalização ou painel administrativo. Complementa adaptive-visual-systems e contracts-trust. Aplicar o método ECC Click-path Audit: mapear donos e resets antes de seguir controles; ECC Design System: auditar consistência e estados sem inventar scores.

## Entregável obrigatório para mudanças amplas

Produza um registro por configuração: **id, rótulo, propósito, tipo, valores, default, origem do default, dono/escopo, precedência, persistência, handler, preview, commit, cancelamento, erro/retry, reset, efeito lateral, dependências, acessibilidade, teste e evidência**. Campos desconhecidos permanecem desconhecidos. Não invente padrões só porque o controle está selecionado na captura.

Separe:
- modo de cor (preferido e resolvido);
- modo de trabalho/navegação;
- modo de apresentação/densidade;
- preferências de acessibilidade;
- dados e operações de manutenção;
- identidade, conta e segurança.

Uma aba não define o dono do dado. Sidebar pode ser global, tema por workspace e accent sincronizado no perfil. Documente a precedência real e seus efeitos ao trocar contexto.

## Modelo de estados

Para formulário com Save: confirmado → draft → preview → saving → confirmado, ou error com draft preservado. Cancel restaura o confirmado, sem gravar em outro contexto. Fechamento e navegação devem tratar dirty state deliberadamente.

Mantenha o rascunho durante a navegação entre abas da mesma sessão. Salvar uma seção deve confirmar somente os campos que ela possui, mesmo se perfil/aparência compartilham um objeto persistido. Use uma lista explícita de campos sobre o confirmado atual; não espalhe todo o draft de outra seção. Teste nos dois sentidos: nome pendente → salvar tema e tema/sidebar pendente → salvar perfil. Fechar e reabrir segue a política declarada de descarte/retomada, não a política de alternar abas.

Para ajuste imediato: confirmado → pending → confirmado/error; dizer que aplica automaticamente e fornecer recuperação adequada. Se houver debounce, defina flush no fechamento, cancelamento do timer, ordem de versões e destino do write. Não chamar fechar de Save quando não confirma persistência.

Defina o evento que confirma texto: por tecla, debounce, Enter ou saída de foco. “Automático” é insuficiente. Não recrie o formulário após cada alteração; atualize a prévia e preserve identidade do campo, seleção, foco e primeiro clique no próximo controle. Se change e blur confirmam a mesma edição, deduplique a gravação. Testar eventos reais no navegador; chamar onchange diretamente em teste não cobre input → Tab.

Ações como criar biblioteca, importar, atualizar ou sair da conta têm contratos próprios. Não escondê-las atrás do Save geral. Especifique side effects: troca de contexto, fechamento de viewers, descarte de cache, efeitos remotos e retenção de dados. Picker cancelado não é falha nem sucesso.

## Pipeline de tema

Fonte persistida → validação/fallback → modo resolvido → tokens semânticos → estilos computados DOM/native/canvas. Defina primeiro frame, onboarding, múltiplas janelas, listener do SO, override de contexto, retorno ao sistema e reset. Não transformar uma exceção do produto referência (ex.: primeiro uso sempre claro) em regra universal.

Tokens incluem accent fill/on-fill/text; background/surface/overlay; text/border/focus/status. Verificar override JS, alpha e fundo real. App reduce-motion e preferência do SO precisam de precedência declarada; parar CSS, JS, shaders e scroll suave quando apropriado. High contrast é um modo, não um certificado.

Separe também cores de categoria, objeto personalizável e ação. Salvar tema/accent não deve alterar a identidade cromática da categoria ou o valor de cor gravado no objeto. Confira esses valores e a aparência composta após salvar e recarregar, nas superfícies pertinentes.

## Anatomia e área de interação

Rótulo nativo associado por `for`/`id` ou equivalente pode ampliar o acesso ao campo sem tornar toda uma linha com vários controles uma ação ambígua. Um nome em `aria-label` não torna o título visual clicável. Teste clicar no rótulo, no desenho e no alvo, além do teclado.

Swatch, switch e ícone podem ter desenho menor que a área interativa. Ao ampliá-la, confirme `box-sizing`, padding, borda e `background-clip` finais; uma media query antiga pode reduzir a caixa e encolher ainda mais a pintura. Escolha dimensões pela plataforma e pelo contexto, sem universalizar os valores do Pauta. Preserve indicação de seleção e foco ao redor do alvo funcional.

## Auditoria do caminho do clique

Para cada controle: evento → calls em ordem → state lido/escrito → resets → await real → retorno → renderização final. Pergunte: um efeito posterior desfaz o anterior? O pai otimista restaura um valor ainda não persistido? A resposta pertence ao contexto atual? O cache depende desse valor? O feedback confirma a mesma operação que acabou?

Em REA, registrar hash/versão e fonte exata. Diferenciar observado na UI, recuperado estaticamente e reproduzido. Se AST for parcial, complementar por leitura dirigida e rotular a origem; nunca alegar que REA executou o controle.

## Critérios mínimos de aceite

- Save confirma armazenamento; falha preserva draft e permite retry.
- Cancel/Escape/clique fora têm política coerente e retorno de foco.
- Reset declara escopo e valor resultante; não remove identidade/dados por acidente.
- Trocar contexto com gravação pendente não escreve no destino errado.
- Importação/exportação assíncrona captura sessão, seção e revisão; fechar/trocar aba invalida o retorno quando a operação pertence àquela seção. Descartar resposta antiga não cancela automaticamente a leitura/cálculo: declare o que foi interrompido.
- Preferência global e local têm precedência previsível, mostrada quando relevante.
- Estado reiniciado/reaberto corresponde ao persistido.
- Valores inválidos/migração recebem fallback explícito sem sobrescrever dados silenciosamente.
- Densidade de toolbar, lista, grade e leitura são independentes quando necessário.
- Labels, ajuda, disabled reason, teclado e status acessível acompanham cada opção.
- Operações externas/destrutivas mantêm suas permissões e confirmações próprias.

## Ensaios representativos

Tema-only Save com erro; draft→Escape→reabrir; live preview→discard antes/depois do debounce; SO muda em system; perfil global sobrescreve opção local; troca de workspace durante write; compact sem alterar grid; reduced-motion muda durante shader; preferência desconhecida de versão anterior; export cancelado; reset parcial. Registrar resultado, screenshot/estado e limitações por caso.

## Regressões observadas no Pauta (implementação 1.3)

- **Tokens não vencem a cascata automaticamente.** Textarea conservou fundo branco por regra anterior mais específica enquanto texto ficou claro. Inspecionar computed foreground/background de campos, badges, ajuda e estados; corrigir precedência e repetir as combinações. Não usar um cálculo dos tokens como prova de aplicação real.
- **Uma preferência, um dono.** Remover toggles legados que mantêm densidade apenas em classes locais quando um controller persistente assume o valor. Toolbar e Settings devem consultar o mesmo estado.
- **Configuração alcançável no mobile.** Não esconder a engrenagem junto de ações secundárias ao estreitar o header. Preservar alvo, busca e acesso por teclado; dialog longo precisa rolagem e ações alcançáveis.
- **Validar o ciclo de foco no browser alvo.** Um dialog nativo fornece base semântica, mas teste Tab/Shift+Tab nos extremos, Escape, foco de retorno e interação com outros overlays. Corrigir o percurso observado, sem declarar conformidade completa só pelo elemento dialog.
- **Persistência testável sem depender do browser.** Isolar normalização/read/save com adapter de storage. Cobrir erro de escrita, corrupção, versão futura e defaults sem sobrescrever dados na leitura. Separar teste do adapter de injeção de falha no formulário: o primeiro não prova o segundo.
- **Matriz e limites juntos.** Reportar pares, temas, accents e estados realmente medidos, mínimo obtido e áreas não testadas. Contrast ratio bom em oito elementos não certifica toda a tela.
- **Conflitos entre janelas.** Se outra janela salva com draft aberto, comunicar política: manter draft e substituir ao confirmar, ou resolver conflito. Cancelar deve voltar ao confirmado mais recente, não snapshot obsoleto.

## Configurações com contratos diferentes dentro da mesma janela

Caso verificado na referência desktop auditada, artefato 0.19: abas Profile, Libraries, Data, Appearance e Account. Não inventar abas General/Shortcuts/About por hábito. Modal completo: largura `min(980px,100vw−56px)`, altura `min(728px,100vh−72px)`, conteúdo rolável e rodapé separado. Tabs com ícone acima do texto e overflow horizontal. Estes valores são referência desktop, não especificação mobile universal. O editor rápido de iluminação é outro componente, não modal no canto do painel.

- Profile e Appearance editam rascunho até Save. Cor do cartão pertence ao perfil, accent pertence à UI, tecido pertence à biblioteca, wash pertence ao ambiente.
- Nome, padrão e cor de capa de Libraries persistem imediatamente. Um botão Save global não implica rollback destas operações. Selecionar o livro abre detalhes; abrir a biblioteca é outra ação.
- Data executa operações independentes: backup, exportação, importação e lixeira. Progresso, cancelamento, seleção de escopo e destino pertencem a cada operação. Confirmar restauração de backup com teste de restore; criar arquivo não prova recuperação.
- Account agrupa identidade/licença/sessão, versão/atualização, ajuda e links legais. Não propagar email, licença ou identificadores para exemplos/documentação sem necessidade.

Classic/Rail muda a arquitetura de navegação global, não o conteúdo do editor. O dono de sidebar, contagens, compact, contraste e movimento deve ser explícito. Testar leitura com sidebar estreita, nomes truncados, ícone sem texto e comando equivalente de teclado. Perfil local salvo, sincronização remota do perfil e estado da biblioteca são confirmações distintas.

Critério para menus: documentar o efeito de cada ação antes de automatizá-la. 'Check for updates' pode iniciar download; New library pode ter contratos diferentes no menu e na prateleira; apagar biblioteca não equivale a esvaziar lixeira. Na auditoria, inspecionar estes caminhos sem confundir o clique com autorização para executar a operação final.

## Bibliotecas, arquivos e limites de plataforma

- **Criar, selecionar, abrir e arquivar são ações distintas.** Defina qual muda a biblioteca ativa, para onde vai o foco e o que acontece com buscas/drafts/jobs. Arquivar a biblioteca ativa exige um destino válido; lixeira de tarefas não deve remover a biblioteca. Trocar contexto limpa/fecha filtros e popovers que não pertencem ao novo destino.
- **Importação é uma fronteira de entrada.** Validar versão, limites de tamanho/quantidade, campos, IDs duplicados, enumerações e cores antes de persistir. Nunca inserir uma cor livre em `style.background`: um valor `url(...)` pode disparar acesso externo. Conteúdo local de imagem deve aceitar apenas formatos raster explicitamente suportados, dataURL/base64 e tamanho limitado; rejeitar URLs remotas e SVG quando não previstos. Validar novamente antes de renderizar. Um arquivo importado não recebe confiança por ter sido escolhido pelo usuário.
- **Imagem assíncrona pertence a um draft.** Fixar biblioteca + item + geração antes de decodificar/processar. Se A começa, B começa depois e A termina por último, apenas B pode atualizar o draft. Remover a imagem também invalida jobs anteriores; finalização antiga não limpa o input de um upload novo. Fechar bitmaps/liberar URLs temporárias em sucesso, erro e cancelamento.
- **Importar não é restaurar.** No Pauta, importar cria novas bibliotecas/IDs e preserva as existentes. O backup inclui perfil e bibliotecas. A opção explícita “Restaurar também perfil do backup”, desmarcada por padrão, valida e grava perfil junto das novas bibliotecas; importar sem essa opção preserva o perfil atual. Identidade da biblioteca ativa, tema e iluminação não são restaurados pelo backup. Declarar esses limites e testar recuperação de cada entidade antes de oferecer “restauração completa”.
- **Download iniciado não é arquivo confirmado.** Um link com Blob pode gerar JSON/ZIP/PNG, mas não confirma destino, gravação pelo navegador nem cópia externa segura. Distinguir “arquivo gerado” de “backup verificado”; abrir o artefato e executar um round-trip controlado. Exportação por pastas deve gerar conteúdo interoperável real, nomes seguros e tratamento de colisões.
- **Portar capacidades, não promessas nativas.** Browser pode oferecer perfil local, bibliotecas na origem, download e clipboard sujeito a suporte/permissão. Isso não equivale a conta autenticada, sincronização, pasta nativa, importador Eagle ou atualização de app instalado. Não exibir ações de login/licença/update fictícias para preencher a composição da referência; explicar o estado local e fornecer apenas caminhos implementados.
- **Persistência é transação de produto.** Validar cópia candidata, gravar e só então trocar estado confirmado/emitir sucesso. Em quota excedida ou formato incompatível, conservar o último estado e draft recuperável. Importação aditiva, backup, exclusão e restauração precisam de falhas visíveis independentes do Save de aparência.

Uma checagem de funções de storage prova serialização/contrato, não o ciclo completo de formulário, download, importação e retorno de foco. Registrar esses níveis separadamente.

## Composição das configurações

Formulários podem ficar ao lado do objeto em painéis largos e preceder a prévia em painéis estreitos. Escolha pela tarefa, preservando a mesma ordem semântica no DOM quando houver stack. Use largura do container, não somente viewport: um dialog de 700px em monitor largo ainda é um painel estreito. Reserve área própria para fechar, tabs roláveis e rodapé; texto de erro não deve expulsar a ação de salvar da área alcançável. Nomes longos, status em duas linhas, um único item e última biblioteca arquivável fazem parte do ensaio.

Quando o objeto for o foco aprovado, reserve espaço para seu envelope fechado **e aberto**, incluindo perspectiva e controles. O formulário pode ter largura limitada e rolagem independente (`min-height:0` no layout flex/grid quando necessário). Não diminuir o objeto inteiro para acomodar uma coluna secundária excessiva, nem aceitar clipping do conteúdo para fazê-lo caber. Verifique janelas desktop baixas e redimensionamento com o objeto aberto; viewport largo não garante espaço útil dentro do modal.

Ao concentrar um perfil antes separado em Configurações, reutilize componente, estado e entrada de edição. Links legados podem abrir o mesmo painel; evitar duas versões divergentes do formulário. Após salvar, atualizar os consumidores afetados sem remontar a sessão em curso ou destruir o elemento que deve recuperar foco. Teste abrir por cada entrada real → editar → salvar/falhar → fechar → reabrir e o retorno de foco após o commit, não só após Cancelar. Dados globais e por contexto devem ser verificados também com outro contexto ativo.
