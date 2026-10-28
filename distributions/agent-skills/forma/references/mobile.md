# Mobile e experiências adaptativas

Escolha iOS/Android nativo, Flutter, React Native, web móvel ou outra stack conforme o produto existente. Um mockup de celular no navegador não comprova comportamento nativo.

## Estrutura e entrada

Respeite navegação, back, apresentação de sheets, menus e controles do sistema. Use safe areas/window insets para recortes, barras, gestos e teclado; não hardcode margens de um aparelho. Pense em alcance do polegar sem esconder ações importantes.

Defina quando navegação inferior vira rail/sidebar em tablet. Dobráveis e split-screen exigem adaptação à área disponível, não apenas orientação. Não estique uma tela de telefone em todo tablet. Rotação deve preservar estado quando suportada; bloqueio de orientação precisa de razão funcional.

Toque, teclado físico, leitor de tela, switch, stylus e voz podem coexistir. Swipes e drag têm alternativas. Haptics acompanham significado, não cada toque; a função deve ser compreensível sem vibração ou som.

## Ciclo de vida

- Preservar rascunho após interrupção, background, reconexão e recriação de processo conforme requisitos.
- Pedir permissão no momento de necessidade, com propósito compreensível. Tratar recusa, recusa permanente e revogação; oferecer caminhos alternativos quando viáveis.
- Notificações precisam de utilidade, controles, deep link válido e comportamento para conteúdo indisponível.
- Upload/download mostra estado, consumo relevante, retry e cancelamento. Definir offline, cache, fila e conflitos.
- Autenticação e biometria precisam de fallback apropriado; não confundir retorno à aplicação com sessão válida.
- Preferir seletores e pickers do sistema quando reduzirem fricção e exposição de dados.

## Entrega

Teste font scale/Dynamic Type, leitor de tela, teclado cobrindo campos, conectividade ruim, voltar durante submissão, estado após retomada e dispositivo mínimo suportado. Screenshots de loja representam funcionalidades reais, com assets e textos revisados. Requisitos de loja, privacidade e SDK devem ser conferidos nas fontes oficiais no momento da publicação.

## Receita lista/detalhe

Na menor área suportada, lista e detalhe são regiões alternadas; voltar preserva filtro, seleção e posição. Aumente a largura até caberem lista legível, separação e detalhe com conteúdo mínimo real. Esse ponto observado orienta duas regiões; registre a condição pelo espaço, não pelo modelo de aparelho.

Redimensionar com detalhe aberto mantém item selecionado. Retornar ao estreito mantém região ativa e retorno; não reinicia jornada. Teste texto ampliado, teclado, item removido e deep link. Navegação vira rail/sidebar quando houver espaço e ganho de acesso. Veja [adaptação](platform-adapters.md) para stack e testes.
