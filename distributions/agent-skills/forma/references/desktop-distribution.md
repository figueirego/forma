# Desktop, instaladores e distribuição

EXE pode ser aplicação ou instalador; DMG é uma imagem de disco que pode conter app e outros arquivos. Identifique artefato, sistema, arquitetura e tecnologia antes de decidir UI ou executar conteúdo. WPF, WinUI, Avalonia, Qt, AppKit, SwiftUI, Electron e Tauri têm contratos diferentes.

## Aplicação desktop

| Área | Decisões a explicitar |
|---|---|
| Janelas | Tamanho mínimo, resize, maximize, fullscreen, múltiplas janelas, restauração de posição |
| Sistemas de entrada | Teclado, menus, atalhos locais, foco, pointer, touch quando suportado |
| Displays | Escala/DPI por monitor, múltiplos monitores, mudança de tela e área útil |
| Documentos | Abrir/salvar, recentes, alterações não salvas, autosave, recovery, impressão |
| Integração | File associations, drag/drop, clipboard, tray/menu bar, notificações e deep links |
| Acessibilidade | Semântica nativa, ordem de foco, alto contraste, zoom/text scale e leitores de tela |
| Processamento | Operações em background, progresso, cancelamento, pausa e encerramento seguro |

Não redesenhe controles de janela e diálogos de arquivo sem necessidade. Atalhos devem respeitar convenções de cada SO e evitar conflito global. Fechar janela, sair do app e minimizar para tray não são equivalentes; torne o comportamento previsível.

## Jornada de distribuição

Projete descoberta → download → verificação → instalação → primeiro uso → atualização → recuperação → desinstalação. Cada etapa informa produto, editor, versão/compatibilidade quando pertinente, destino e resultado.

- Download: diferenciar SO/arquitetura e formato; explicar requisitos reais, tamanho e alternativa compatível.
- Windows: distinguir instalador por usuário/máquina, elevação quando necessária, caminhos, associações, startup opcional e políticas corporativas. Não afirmar SmartScreen/reputação resolvidos só por assinar.
- macOS: distinguir app em DMG de instalador PKG; instrução de arrastar para Applications só quando corresponde ao pacote real. Não orientar desativar Gatekeeper para tornar o fluxo “suave”.
- Linux: respeitar formato/canal adotado e modelo de permissões; AppImage, pacote de distribuição e sandbox não são intercambiáveis.
- Instalação: prever espaço insuficiente, versão anterior, processo aberto, cancelamento, privilégios negados e falha parcial. Progresso determinado exige medição real.
- Atualização: verificar autenticidade pelo mecanismo existente, explicar restart, preservar trabalho, tratar falha e rollback compatível. Evitar reinício surpresa.
- Desinstalação: distinguir remover programa de apagar dados; permitir exportar/preservar quando aplicável, sem retenção manipulativa.

## Verificação e limites

Instalar, atualizar e desinstalar só em ambiente autorizado. Prefira VM/sandbox ou conta de teste quando houver risco de afetar o computador principal. Inspeção estática não prova instalação bem-sucedida. Registre arquitetura e versão do SO testadas.

Code signing, notarização, canais de distribuição e requisitos de loja mudam. Consulte Apple/Microsoft/fornecedor no momento da implementação; não inclua comandos desatualizados ou credenciais na skill. Design do fluxo não autoriza assinar, publicar ou alterar configuração de segurança.

## Atualização interrompida

| Estado | Informação | Ações | Preservação |
|---|---|---|---|
| Disponível | Versão, motivo, restart | Atualizar/adiar conforme política | Sessão |
| Baixando | Progresso real e erro | Pausar/cancelar só se suportado | App atual utilizável |
| Pronta | Trabalho não salvo, encerramento | Salvar/reiniciar ou continuar se suportado | Documentos/rascunhos |
| Aplicando | Operação em andamento | Sem cancelamento fictício se inseguro | Dados separados do app |
| Falhou | Etapa e recuperação | Retry/suporte/versão anterior só se suportada | Estado conhecido |
| Recuperada | Versão ativa e estado dos dados | Retomar tarefa | Sem anunciar versão nova após rollback |

Sem percentual exposto pelo atualizador, mostre progresso indeterminado. Rollback do binário pode ser incompatível com migração de dados; não prometê-lo sem contrato.

**Testes conforme escopo:** instalação limpa sem admin, versão existente, documento não salvo, espaço insuficiente, rede perdida, privilégio recusado, interrupção/retomada, assinatura inválida em fixture segura, remoção preservando dados. Registre SO/arquitetura, versão anterior, dados antes/depois e evidência. Falhas destrutivas não são testadas no host pessoal.
