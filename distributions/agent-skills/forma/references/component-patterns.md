# Catálogo de decisões para componentes

Escolha pelo comportamento necessário, depois pela aparência. As receitas são contratos agnósticos de stack; use componentes nativos/da biblioteca existente. Confira APIs atuais antes de implementar.

Quando o pedido for reaplicar o visual conjunto de fundo, sidebar, botões e campos, use a [base de interface limpa](clean-shell.md): inclui CSS portátil e exemplo funcional. Estas tabelas continuam definindo semântica e estados; a receita acrescenta relações de composição e hierarquia, sem substituir a stack.

## Ações, feedback e confirmação

| Padrão | Quando usar | Contrato | Teste adverso |
|---|---|---|---|
| Botão | Comando local ou submissão | Nome explícito, foco, pressed/busy quando aplicável; conteúdo não muda largura inesperadamente | Duplo clique, teclado, request lenta e erro |
| Link | Mudar localização/recurso | Destino real, semântica e comportamento do navegador | Nova aba, back, URL indisponível |
| Toast | Confirmação transitória não essencial | Não rouba foco; ação importante continua acessível fora dele | Leitor de tela e timeout |
| Banner inline | Falha ou condição persistente | Contexto, consequência e recuperação próximos da área afetada | Conteúdo longo, retry e erro parcial |
| Dialog | Decisão/interrupção necessária | Título, foco, cancelamento seguro, confirmação específica e retorno | Escape, clique fora conforme contrato, disparador removido |
| Undo | Operação reversível | Janela/prazo e alcance reais; restauração confirmada | Falha no undo, expiração e navegação |

Não crie clique em div por estética. Tooltip complementa um controle com nome; não é a única fonte de instrução indispensável nem recipiente de ações interativas.

## Formulários

| Necessidade | Padrão inicial | Evitar |
|---|---|---|
| Uma opção entre poucas mutuamente exclusivas | Radio group | Toggles independentes que permitem combinação inválida |
| Preferência aplicada imediatamente | Switch com estado explícito | Switch que só passa a valer após um botão oculto |
| Selecionar vários itens | Checkboxes ou seleção de lista | Estado indeterminado não explicado |
| Uma opção em conjunto extenso | Select/combobox com busca conforme volume | Dropdown custom sem teclado ou leitor de tela |
| Valor preciso com unidade | Campo numérico e indicação da unidade | Slider como único meio de precisão |
| Data de domínio | Controle adequado e formato explícito | Calendário difícil para data muito distante |

**Exemplo: salvar perfil.** Idle → edição → submissão → confirmação ou erros. Validação do servidor associa códigos aos campos. Durante envio, mantenha rascunho; não apague campos no 422. Se a sessão expirar, reautenticação deve preservar a intenção sem armazenar secrets. Nome e e-mail são exemplos, não imposição de formulário.

**Aceite:** usuário consegue identificar erro, corrigi-lo sem repetir campos válidos, enviar via teclado e perceber confirmação. Longa tradução não sobrepõe mensagens. Mudança de foco ocorre por motivo, não a cada validação.

**Anatomia espacial:** label, campo, ajuda e erro compõem um grupo. O grupo seguinte tem separação perceptível, sem margem duplicada do filho e do stack. Mensagens crescem sem se aproximar mais do campo seguinte. Na linha de preferências, texto multilinha alinha pelo topo quando facilitar associação; o controle preserva largura funcional e empilha por pressão de conteúdo. Veja [contratos espaciais](layout-spatial-contracts.md).

## Controles numéricos e prévia

Controle, valor acessível e prévia derivam do mesmo estado. Não mantenha três valores concorrentes no slider, desenho e formulário. Normalize na fronteira de atualização, incluindo setter programático, texto digitado e importação: número finito, unidade, mínimo, máximo, passo relativo ao mínimo e precisão decimal. Uma operação não altera controles vizinhos sem contrato explícito de agrupamento.

Defina teclado, reset e cancelamento junto com ponteiro. Uma biblioteca de ajuste com autosave não pode substituir silenciosamente rascunho → Salvar/Cancelar. Adaptadores por framework devem reutilizar a regra de atualização e liberar listeners/assinaturas ao desmontar. Não copie uma arquitetura de store para um campo simples quando o estado local existente basta.

**Aceite:** teclado, ponteiro e setter produzem o mesmo valor final; extremos e passo fracionário não oscilam; prévia e valor anunciado concordam; reset restaura a revisão esperada; cancelar não modifica dados salvos; reabrir/desmontar não duplica handlers. O [estudo de controles](site-experiences.md#controles-ligados-à-prévia) motivou esses critérios, mas não comprova sua implementação em um consumidor.

## Navegação e disclosure

Tabs alternam painéis irmãos, acordeão revela conteúdo e menu contém comandos/opções. Não use todos como versões visuais do mesmo componente. Defina seleção, foco, history e URL separadamente. Tabs de navegação real precisam de roteamento coerente; tabs locais não precisam inventar páginas.

Sidebar pode colapsar por pressão de conteúdo; preserve rótulos acessíveis e indicação de seleção. Breadcrumb exprime hierarquia, não substitui histórico. Command palette complementa descoberta e não deve ser única forma de alcançar função essencial.

## Tabelas e listas operacionais

**Exemplo: pedidos com filtros.** Defina chave estável, colunas, ordenação inicial, filtros ativos, contagem e paginação. Diferencie “selecionar página” de “selecionar todos os resultados”. Ação em lote informa quantos itens e quais falharam. Alterar filtro deve ter regra explícita para seleção existente.

**Estados:** zero registros, zero resultados filtrados, carregamento inicial, refresh com dados antigos, erro parcial, registro removido e ausência de autorização. Não trocar dado financeiro por skeleton em todo refresh.

**Mobile:** escolha preservar tabela com scroll identificável, priorizar colunas ou oferecer detalhe por linha conforme tarefa. Ocultar coluna exige acesso alternativo. Virtualização precisa de testes de foco/semântica; se quebra acesso, use paginação ou alternativa apropriada.

**Aceite:** sort é determinístico, filtro pode ser limpo, estado persiste no retorno conforme contrato, seleção não muda de identidade após refresh e ação parcial não anuncia sucesso total.

**Anatomia espacial:** header e linhas compartilham guias de colunas/insets; números comparáveis conservam borda de alinhamento; título/metadados pertencem ao mesmo grupo; ações não invadem texto longo. Em flex/grid, permita shrink e wrap do texto antes de reduzir fonte. Defina quando truncar e como acessar o texto completo.

## Upload e processamento assíncrono

Antes de enviar, mostre formatos/tamanho reais. Validar → enviar → processar → concluído são estados diferentes. Ofereça picker além de drag/drop, nome legível, progresso mensurável e retry por arquivo. Cancelar transporte não garante cancelar processamento remoto.

**Aceite:** arquivo inválido não elimina os válidos; perda de conexão distingue falha confirmada de resultado desconhecido; confirmação representa o resultado final.

## Busca, filtros e recomendações

Consulta, seleção e submit são ações diferentes. Debounce não deve atrasar teclado local nem enviar requests obsoletas sobre resultados atuais. Faça requests canceláveis quando suportado e descarte respostas fora de ordem. Exiba consulta que gerou o resultado.

Recomendação deve distinguir ordem algorítmica de ordenação escolhida, publicidade de resultado e sugestão de verdade. Histórico e sugestões não devem vazar dados entre usuários/tenants.

## Empty states e onboarding

Identifique a causa antes da composição: recém-criado, filtro, permissão, sincronização ou falha. Só o primeiro caso costuma pedir “começar”. Uma ilustração não substitui explicação. Dê primeiro passo útil e exemplo identificado quando favorecer entendimento.

## Controle de qualidade comum

Para dialog/painel, alinhe os insets relevantes de header/body/footer e atribua a rolagem a uma região explícita. Título centralizado precisa de referência definida: trilhas assimétricas podem deslocá-lo mesmo com `space-between`. Chips e mensagens de erro podem aumentar a altura; o corpo deve adaptar-se sem um cálculo fixo que corte rodapé ou resultados.

Para cada padrão usado, documente somente diferenças do componente existente: estado inicial, evento, resultado, erro, foco e conteúdo extremo. Não copie todos estes contratos para o projeto quando a biblioteca já os implementa e foram verificados.
