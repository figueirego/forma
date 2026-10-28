# Interface limpa: base reutilizável de aplicação

Use quando o pedido for reaplicar o conjunto de fundo limpo, sidebar, botões, busca e inputs. O nome de ativação é **base de interface limpa**; não depende de citar outro produto. É uma receita optativa para superfícies operacionais, não uma identidade obrigatória nem um tema para toda landing page.

O recurso inclui [CSS portátil](../assets/clean-shell.css), [exemplo HTML](../assets/clean-shell.html) e [comportamentos de demonstração](../assets/clean-shell.js). O CSS usa `.dc-shell` e tokens `--dc-*`; o exemplo permite inspecionar composição e estados antes de adaptar. Ele é implementação original com conteúdo sintético, não código ou marca extraídos de terceiros. Não confundir esta base com o editor completo de iluminação, perfil material, busca semântica ou BookObject: são capacidades independentes.

## O que preservar no conjunto

| Parte | Relação visual e funcional |
|---|---|
| Fundo | Superfície neutra de menor contraste; iluminação periférica opcional, afastada do conteúdo legível. Fundo limpo não exige branco puro em todas as camadas. |
| Sidebar | Pertence ao fundo; navegação organizada em grupos, ícone/texto/contador em colunas estáveis. Seleção com preenchimento neutro discreto, distinta de foco e hover. |
| Painel principal | Superfície elevada neutra, borda/sombra delicada, raio maior que controles. Conteúdo e toolbar compartilham inset. Não substituir por cards flutuantes sem a superfície contínua. |
| Botões | Hierarquia primário/secundário/ghost/ícone. Primário concentra accent; secundário usa superfície neutra e borda; ghost serve à toolbar. Foco, pressionado e indisponível permanecem perceptíveis. |
| Busca e campos | Busca como cápsula horizontal com ícone, texto e ações finais; input comum é um campo com label, não outra cápsula decorativa. Não reduzir área de digitação para acomodar todos os atalhos no estreito. |
| Conteúdo | Tipografia e espaçamento conduzem a hierarquia. Não inventar título gigante, hero, gradientes em cada card ou bordas pesadas para “polir”. |

O screenshot de referência mostra imagens de outros sistemas **dentro dos cards**. Esses formulários, marcas e botões pertencem ao conteúdo armazenado, não à shell. Excluir também barra do SO, controles da janela e janelas ao fundo ao extrair os componentes.

## Tokens por função, não uma lista de hex

Separe `ground`, `surface`, `surface-hover`, `surface-selected`, `line`, `text`, `text-muted`, `accent`, `on-accent` e `focus`. Mapeie esses papéis aos tokens já existentes do projeto. Cor ambiente e cor de ação são independentes: mudar o wash não recolore botões, estados de erro ou a superfície de leitura.

O [perfil factual](../assets/reference-profiles/desktop-material-reference-v1.json) conserva valores observados estaticamente e a cascata relevante. Exemplo claro auditado: fundo `#f0f4f6`, superfície elevada branca, hover preto a 4%, active preto a 8%; escuro: fundo `#0e0e10`, superfície `#131315`, hover branco a 6%, active branco a 10%. Transparência exige avaliar a composição efetiva. Não promover esses números automaticamente a norma de acessibilidade ou marca.

No preset distribuído, alvos maiores, paleta escura, adaptação estreita e contraste das ações são decisões próprias. Preserve os papéis ao substituir pela marca do destino; valide `on-accent`/accent novamente. Não substitua a fonte existente nem adicione biblioteca de ícones por associação visual.

## Estrutura e responsabilidade pelo espaço

Monte shell → sidebar + painel → toolbar + conteúdo. Defina quem rola e quem permanece visível. `min-width:0` e `min-height:0` permitem que texto e regiões flex/grid encolham sem empurrar a tela. Inset do painel, padding da toolbar e padding do conteúdo são papéis distintos; não somar margens de pai/filho para corrigir um desalinhamento local.

Na sidebar, mantenha o texto flexível e o contador independente, com números tabulares. Nome longo pode quebrar/truncar conforme a tarefa, conservando nome acessível; contagem não deve sobrepor o label. Perfil no rodapé deve permanecer alcançável em janela baixa, com rolagem atribuída à região correta, sem `position:absolute` que encubra navegação. Espaço intragrupo menor que intergrupo preserva proximidade sem multiplicar divisórias.

Sidebar compacta, rail e layout mobile são estados diferentes. Compactar reduz densidade; rail esconde rótulos visuais mantendo nomes e recuperação; mobile pode reorganizar navegação com disclosure ou drawer apropriado. Não esconder recursos só porque a largura diminuiu. Para drawer modal implemente foco/escape/retorno; disclosure inline não deve bloquear a página. Não copiar controles de janela nativa para uma página web como botões sem função.

## Estados são parte do design

- Link navega; botão executa. `aria-current` identifica destino atual, `aria-pressed` opção alternável e `aria-expanded` disclosure, conforme o comportamento real.
- Ícone decorativo tem `aria-hidden`; botão só com ícone tem nome acessível. Área de interação é independente do desenho. Use os ícones já disponíveis ou SVGs originais consistentes.
- Hover não é a única forma de descobrir ações. Foco deve sobreviver a truncamento/overflow; teclado e touch têm caminho equivalente.
- Disabled não recebe ação; busy anuncia progresso e evita submissão duplicada sem perder largura/foco. Erro preserva entrada e aparece junto da tarefa. Ausência de backend não deve simular confirmação persistida.
- Busca textual, paleta de comandos e busca semântica são contratos diferentes. O exemplo implementa somente busca textual; ⌘K/Ctrl+K foca esse campo, não cria outra capacidade.
- Tema escolhido (sistema/claro/escuro) e tema resolvido são distintos. Testar mudanças do SO enquanto “sistema” estiver ativo; falha de storage não vira sucesso. O wash opcional não é o editor de pools.

## Como levar a outro projeto

1. Leia a stack, tokens, componentes, rotas e estilos globais existentes. Confirme o pedido pelo conjunto e escolha o escopo autorizado; não converter “ajuste de padding” em troca da shell.
2. Abra o exemplo para compreender as relações. Reutilize/adapte o CSS ou traduza os mesmos papéis para a biblioteca existente. Não colar HTML de página inteira dentro de outra aplicação nem montar uma segunda sidebar concorrente.
3. Mapeie classes/tokens a componentes reais: shell, nav item, counter, toolbar, button, search e field. A marca, domínio, rotas, labels e dados vêm do consumidor; dados sintéticos e estado em memória da demonstração não vão para produção.
4. Integre eventos, rotas, theme provider e persistência existentes. Não importar automaticamente o JS de demonstração em uma SPA: seu boot é de página isolada; componentes com montagem/desmontagem precisam conectar e limpar listeners conforme seu ciclo de vida.
5. Compare o conjunto renderizado e os estados. Registrar a mudança de controle/espessura/densidade como adaptação quando sair da referência, sem dizer que coincidência de tokens prova fidelidade.

**Pedido reutilizável:** “Use $forma:forma e a base de interface limpa para aplicar fundo neutro, sidebar agrupada, painel contínuo, botões discretos e busca/inputs consistentes. Preserve minha marca, stack, dados e rotas; adapte e teste desktop/mobile, claro/escuro e teclado.”

## Aceite no consumidor

Verificar ao menos claro/escuro, sidebar expandida/recolhida quando implementada, viewport estreito, nomes longos/contagens grandes, busca sem resultado, foco por teclado e estados dos controles afetados. Confirmar viewport sem overflow involuntário, conteúdo alcançável, alinhamento compartilhado e seleção distinguível sem depender só de cor. Captura + medidas de estilo/layout + interação são evidências complementares. O exemplo pode passar e a integração no destino falhar por CSS global ou estado desconectado.

As medidas do perfil são extração estática de um build; a imagem fornecida não estabelece DPR, zoom, breakpoint, focus/busy ou comportamento mobile. A base distribuída é uma adaptação verificável, não alegação de equivalência total com aquele aplicativo.

### Aprendizado da validação da receita

A classe de um botão contextual pode perder seu `display: none` para a regra posterior do botão genérico com igual especificidade. Conferir os estilos computados nos dois lados do breakpoint e manter o override contextual depois da base. Um botão de navegação mobile visível no desktop pode ser acionável sem ter efeito ali; a aparência isolada do botão não revela esse erro. Resultado singular da busca também deve ter concordância própria, sem reutilizar a mensagem plural.
