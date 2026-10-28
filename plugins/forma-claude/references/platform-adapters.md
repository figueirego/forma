# Adaptar intenção à plataforma

Não escolha framework por extensão do artefato. Detecte manifests e estrutura: package.json/Electron/Tauri, pubspec, Xcode/Swift packages, Gradle/Compose/XML, projetos .NET/XAML ou Qt. Nome de biblioteca no lockfile não prova uso em todas as telas.

## Mapa de intenção

| Intenção | Web | Apple nativo | Android | Windows/.NET |
|---|---|---|---|---|
| Layout adaptativo | Grid/flex, limites intrínsecos | Layouts e size classes conforme plataforma | Window size/insets e layouts adaptativos | Containers XAML/layout e DPI por janela |
| Texto escalável | rem, zoom e reflow | Estilos do sistema/Dynamic Type quando disponível | sp/font scale | Escala e estilos nativos; testar alto DPI |
| Semântica | HTML, ARIA quando necessário | Accessibility labels/traits/actions | Semantics/content descriptions | Automation peers/properties |
| Navegar | Router + history/deep link | Navigation e apresentação nativas | Back stack e back do sistema | Navigation, menus e histórico do app |
| Foco | Ordem DOM e foco gerenciado | Primeiro responder/foco conforme plataforma | Focus e acessibilidade distintos | Tab order, keyboard focus e automation |
| Selecionar arquivo | Input/picker apropriado | Picker/document APIs do sistema | Picker/contrato do sistema | File dialog do sistema |
| Tema | Tokens e preferência suportada | Cores semânticas e aparência | Theme/cores semânticas | Resource dictionaries/tema/contraste |

Estes nomes descrevem responsabilidades, não assinaturas de API. Consulte documentação da versão do projeto ao escrever código. React Native, Flutter, Avalonia e outros frameworks precisam de teste no runtime de cada destino, não só no preview.

## Exemplo de adaptação: editar um item

- Telefone: detalhe em tela própria ou sheet conforme a complexidade; teclado e safe areas preservam ação.
- Tablet: lista/detalhe quando permite manter contexto; não abrir uma sheet enorme só para copiar o telefone.
- Desktop: edição inline, painel ou janela conforme tarefa; atalhos e comportamento de documento são importantes.
- Web: deep link/retorno/filtro devem continuar funcionando; recarregar não pode produzir estado impossível.

O dado e o resultado são compartilhados; densidade, navegação e controles podem mudar. Paridade de funcionalidade não exige identidade de pixels.

## Receitas de verificação por stack

**Web:** localizar componente e estilos → renderizar rota → testar teclado/resize/zoom → erro e recuperação → checks existentes.

**SwiftUI/AppKit/UIKit:** conferir target e versão mínima → usar estilos/layout/acessibilidade do projeto → preview como ajuda → executar app ou teste suportado → fonte ampliada, foco, aparência, lifecycle. Preview não prova integração.

**Compose/Android Views:** conferir min/target SDK e navegação → insets/font scale/semantics → emulador ou dispositivo → voltar, rotação/redimensionamento, retomada e permissão recusada.

**WPF/WinUI/Avalonia:** conferir framework e temas → layout sem dimensões rígidas desnecessárias → automation e teclado → resize, DPI, monitores e alto contraste no SO alvo. Compilar no macOS não confirma UI Windows.

**Electron/Tauri:** identificar fronteira renderer/host → não expor API privilegiada para corrigir fluxo visual → testar janela, foco, menu e diálogo nativos → avaliar consumo/processos e atualização no ambiente autorizado.

**Flutter/React Native:** reutilizar tema/componentes, configurar semântica e escala → verificar diferenças de back, teclado, picker e permissão por destino → evitar tratar screenshot web como teste de ambos os sistemas.

## Handoff entre plataformas

Registre intenção comum, comportamento específico e exceções. Vincule um token semântico a seu equivalente em cada plataforma; não transforme todo tamanho CSS em literal nativo. Compartilhe conteúdo e regras de negócio quando possível, mantendo adaptações de acesso e interação verificáveis.
