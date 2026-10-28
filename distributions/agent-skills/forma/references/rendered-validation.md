# Validação em produto renderizado

Use ao criar interface ou testar esta skill na prática. Documentar critérios não equivale a cumprir os critérios. Faça o ciclo composição → execução → observação → correção → confirmação.

## Contrato mínimo de execução

1. Declare a tarefa principal e a natureza do artefato: protótipo de navegador, implementação web, app nativo ou instalador. Uma viewport mobile e um layout desktop não comprovam comportamento nativo.
2. Ao criar uma interface, implemente uma fatia vertical utilizável com conteúdo representativo: entrada, validação, sucesso observável, recuperação e persistência compatível com a promessa. Ao refinar uma existente, exercite o fluxo e os estados afetados, preservando os contratos existentes. Evite controles decorativos com aparência de ação.
3. Renderize cada composição na largura e altura alvo. Inspecione captura do viewport e página inteira; uma captura longa pode mostrar uma barra fixa sobre conteúdo que será alcançável ao rolar. Verifique o alcance real antes de classificar como bloqueio.
4. Execute a tarefa por teclado e ponteiro, incluindo retorno de foco e erro. Teste mudança de largura com um rascunho aberto. Teste conteúdo extremo.
5. Registre achados com reprodução, efeito e correção. Confirme novamente somente estados afetados e caminhos críticos. Guarde capturas iniciais e finais em nomes diferentes; não sobrescreva a baseline.

Se a comparação não mostrar a melhora esperada, retorne à hipótese do [playbook de refinamento](playbooks.md#a-correção-pontual-ou-refinamento). Confira revisão carregada e condições reais da captura antes de concluir que a correção falhou. Escolha nova evidência para a próxima tentativa; não substitua diagnóstico por ajustes cosméticos sucessivos.

## Falhas observadas no laboratório Pauta e regras transferíveis

| Falha ou risco observado | Decisão exigida | Como confirmar |
|---|---|---|
| Texto secundário com contraste abaixo do limiar | Medir a combinação efetivamente renderizada; tokens isolados não bastam | Scanner, quando disponível, e inspeção nas superfícies e estados suportados afetados; no experimento Pauta foram três composições |
| Metadados de 9–11px visualmente frágeis | Escolher tamanho por função, distância e densidade; ampliar texto útil antes de esconder conteúdo | Ler em escala normal e ampliar; não inventar um mínimo WCAG universal |
| `aria-label` omitia a disciplina visível no botão | Preferir nome vindo do conteúdo ou relacionar os textos relevantes | Comparar nome acessível e texto visível; testar comando por voz quando disponível |
| Navegações sem nomes distintos | Dar nomes que expressem função | Inspecionar landmarks, além do resultado automático |
| Detalhe sobreposto permitia foco no fundo | Decidir se é modal ou navegação; modal exige fundo inerte, Escape, contenção e retorno de foco | Tab/Shift+Tab nas bordas e fechamento com filtro ativo |
| Lista recriada após concluir destruía o controle focado | Definir destino de foco por identidade/posição, com alternativa quando a lista fica vazia | Concluir por teclado e continuar a próxima tarefa |
| Teste de checkbox por posição repetia a ação após a linha desaparecer | Localizar por identidade e afirmar o estado final de domínio; não repetir mutação até o controle parecer marcado | Item sai de pendentes, aparece concluído, persiste; evitar falso diagnóstico da UI |

Valores tipográficos e alvos de toque devem respeitar a plataforma e o projeto. Não aplicar densidade compacta do desktop a todos os tamanhos. Títulos longos devem quebrar sem expulsar ações ou invadir outros controles.

## Casos mínimos para edição e armazenamento

- Editar A → abrir B → voltar A: preservar rascunho na sessão.
- Salvar → recarregar: confirmar conteúdo persistido, não apenas toast.
- Simular falha real da camada de armazenamento → manter texto e exibir recuperação → tentar novamente.
- Alterar viewport durante edição: preservar campo, seleção quando aplicável e acesso ao salvar.
- Se reload perde rascunho não salvo, declarar esse limite; não chamar memória temporária de persistência.
- Para timer, usar tempo decorrido/deadline, testar pausa e retomada e declarar se sobrevive a reload. Não prometer precisão de tarefa em background nativo com um timer web.

## Evidência e limites

Axe sem violações detectadas não comprova conformidade completa. Separar resultados do scanner, inspeção visual e percurso por teclado; leitor de tela, zoom real, dispositivos físicos, desempenho em campo e instalação nativa permanecem pendentes até execução. Sem baseline preservada, comparação visual histórica é inconclusiva. Um protótipo aprovado para demonstração não é aprovado para produção.

Ao corrigir a skill, transformar o achado em uma regra verificável e um cenário de avaliação, sem impor cores, componentes ou escolhas específicas do produto de teste a todos os projetos.

## Controles sobrepostos e regressão por CSS

Inspecionar tanto o elemento pintado quanto o alvo de interação. Um anel pode estar visualmente correto e ter seu botão invisível deslocado por uma regra genérica como `.stage button`. Conferir `getBoundingClientRect`, transform, background e border computados; não certificar apenas pelo teste da fórmula. Escopar regras por papel (`.pool-handle`, `.pool-distance-hit`), separar anel/handle/grip e verificar clique sem salto, arraste nos dois sentidos e reversão nos limites. Capturar o resultado com o painel aberto e o restante da aplicação utilizável.

Se o usuário estiver testando ao mesmo tempo, usar uma aba de QA separada para evitar que gestos de duas pessoas invalidem a evidência. Testes devem distinguir estado inicial, ação executada e estado resultante; mudanças concorrentes não são efeito comprovado do teste.


## Regressões observadas no Pauta 1.7

- `backdrop-filter` no cabeçalho criou um contexto de empilhamento: sugestões com z-index alto continuaram atrás do conteúdo. Inspecione os ancestrais e a camada renderizada; elevar apenas o filho não basta. Ao abrir a busca, libere o contexto do cabeçalho ou use uma superfície na camada superior com posição ancorada.
- Um seletor antigo `.search span` aumentou títulos do dropdown. Audite a cascata dos descendentes novos, não só a classe do componente.
- Fechar uma paleta e restaurar foco no input reabria sugestões após confirmar. Diferencie confirmação/navegação de Escape e restaure foco apenas quando coerente com o destino.
- Um botão apenas na sidebar desaparece junto com ela no mobile. Verifique a alcançabilidade das funções, incluindo mapa, bibliotecas e configurações, em cada navegação adaptada.
- Meça `document.documentElement.clientWidth` e overflow além de configurar viewport. Zoom já ativo pode tornar a largura CSS diferente da dimensão pedida à ferramenta.
- Uma imagem de teste com pixels vermelhos e metadado de cartão verde distingue busca por pixels de filtro decorativo. Teste persistência após reload e a ausência de resultado ao combinar uma tag incompatível.
- Exporte o arquivo de verdade, abra-o e confira tipo/dimensões/conteúdo. Um toast “exportado” não valida PNG, ZIP, UTF-8 nem dados incluídos.

Esses casos orientam critérios reutilizáveis; não certificam outros produtos ou todos os dispositivos.


## Regressões de layout — contratos espaciais

- `Grafo` ganhou rótulo20px e sombra porque um span de texto herdou a regra de ícones e o botão herdou estilo de ação. Corrigir anatomia/classe; confirmar tipografia e elevação iguais às outras opções, inclusive rail/mobile.
- Metadata e propriedades tinham bordas vizinhas para a mesma separação. Definir um responsável pela fronteira e medir o espaço resultante.
- Altura da lista da paleta descontava125px fixos, embora os filtros pudessem quebrar em várias linhas. Usar layout flex/grid com região rolável e rodapé estável, testar chips multilinha e janela baixa.
- Nome e explicação em linha no perfil estreito comprimiam o campo. Empilhar pela pressão do conteúdo; o painel pode rolar enquanto a ação continua alcançável.
- Tags sem espaços precisam de regra explícita de quebra; `min-width:0` no botão pai sozinho não resolve `white-space:nowrap` do filho.

Use [contratos espaciais](layout-spatial-contracts.md) e registre as medidas de cada estado. Não universalize os valores do Pauta: o aprendizado é a relação entre elementos, a origem da regra e o método de confirmação.

## Aplicação da 1.10 no Pauta — recorte, adaptação e identidade da execução

Achados desta aplicação viram contratos de verificação, não um novo estilo obrigatório:

| Falha ou risco encontrado | Correção transferível | Confirmação |
|---|---|---|
| Resumo global desaparecia em faixas intermediárias e mobile | Reorganizar o conteúdo necessário em composição compacta e nomear seu escopo | Comparar total/denominador e alcançabilidade antes/depois de filtrar e estreitar o painel |
| Accent recoloria badges de disciplina, enquanto o cartão tinha cor livre | Separar categoria, objeto e ação | Alterar tema/accent, salvar, recarregar e conferir identidade nos lugares correspondentes |
| Atualização da mesma biblioteca reutilizava reset de troca de biblioteca | Passar identidade e política explícita de preservação ao callback | Mover item preserva recorte; trocar biblioteca executa apenas resets que pertencem à troca |
| Última tarefa saía do filtro, mas a UI podia ampliar ou anunciar conclusão | Conservar recorte vazio, explicar o motivo e oferecer recuperação | Mover último membro, manter seleção do filtro e recuperar “todos” por ação explícita |
| Segmentado/disciplina não atualizavam a seleção da navegação | Derivar todos os estados visuais/acessíveis do recorte final | Percorrer os controles em sequência e comparar seleção anunciada com os itens mostrados |
| Swatch ganhou padding, mas regra mobile antiga manteve caixa pequena | Medir desenho e alvo depois de toda a cascata | Conferir pintura, alvo, seleção e foco na largura afetada; não olhar só a regra nova |
| Mapa era tratado como grafo de relações | Explicar agrupamento e cor livre; oferecer Lista equivalente | Abrir título completo pela Lista e verificar foco no detalhe, sem inventar arestas |
| Toolbar/legenda ocupavam área sobre a projeção | Reservar espaço de layout e encaixar na viewport real do mapa | Fit contém conteúdo útil; controles e última ação continuam alcançáveis em janela baixa |

Antes de atribuir a falha à implementação, confirme a identidade dos arquivos efetivamente servidos e carregados. Nesta rodada, JavaScript antigo em cache mascarou uma correção local. Distinga quatro evidências: fonte local, resposta do servidor, recursos de um contexto novo de teste e recursos da aba já aberta pelo usuário. Um teste isolado não atualiza nem comprova a quarta.

Compare a identidade individual de CSS e JavaScript afetados com o artefato testado, usando versão/hash de conteúdo ou recurso versionado cuja resposta foi verificada. Inclua módulos importados e overrides de estilo pertinentes. Um `data-revision`, título, parâmetro de caso ou número global de versão repetido não comprova os bytes executados; URL estável sozinha também não basta. Se a ferramenta não expõe conteúdo/cache carregado, registre esse limite e não afirme atualização da aba. Confira comportamento e estilos computados após confirmar os recursos. Use a estratégia de cache do projeto; não desligue cache permanentemente nem adicione query strings arbitrárias em cada interação.

Antes de recarregar, fechar ou substituir uma aba, verifique alterações não salvas. Não salvar, descartar, resetar preferências ou limpar armazenamento só para testar. Preserve o rascunho por um mecanismo existente ou deixe a escolha de salvar/descartar ao usuário; enquanto isso, valide em contexto isolado e reporte separadamente. Um estado salvo com três luzes ou intensidade5% continua válido e não deve ser confundido com defaults defeituosos.

Registre largura/altura CSS reais, dimensão solicitada à ferramenta, zoom e DPR quando relevantes. Uma viewport configurada não comprova que a página recebeu esses valores. Se diferirem, explique a medida usada; não arredonde o resultado para corresponder ao plano. As vistas de navegador desktop/mobile continuam distintas de aplicativo nativo, dispositivo físico ou validação de teclado virtual.
