# Contratos de experiência, API e confiança

Use API Design para sustentar o que a interface promete, não para remodelar backend em toda tarefa visual. Preserve convenções existentes. Envelope de resposta, versionamento em URL, cursor e status 400/422 são decisões de contrato, não preferências universais.

## Mapear resultado técnico para experiência

| Resultado | Tratamento de UI |
|---|---|
| Validação rejeitada | Campos e motivo corrigível, dados preservados, foco útil |
| Sessão ausente/expirada | Recuperar autenticação e retomar intenção sem expor dados |
| Permissão insuficiente | Explicar limite e caminho permitido; não sugerir ação que o servidor rejeitará |
| Recurso removido | Contexto, retorno e alternativas; não confundir com vazio inicial |
| Conflito de versão | Recarregar/comparar/mesclar conforme contrato, sem sobrescrita silenciosa |
| Limite de requisições | Respeitar Retry-After quando fornecido, evitar retry agressivo |
| Processo aceito/202 | Mostrar pendente e acompanhar conclusão; aceitação não é sucesso final |
| Timeout ou rede perdida | Resultado pode ser desconhecido; verificar estado antes de repetir ação não idempotente |
| Falha do serviço | Mensagem útil, preservação, recuperação e identificador de suporte não sensível |

## Consistência e dados

Defina ordenação estável, paginação, filtros, limite, cache e staleness. Cancelar uma request no cliente não garante cancelamento do trabalho no servidor. Desabilitar botão não garante idempotência. Otimismo exige rollback/reconciliação e não deve anunciar conclusão financeira ou irreversível antes de confirmação.

Autenticação identifica; autorização permite. Ocultar controle não é autorização. Sempre verificar owner/tenant no servidor. Minimize dados sensíveis em mensagens, analytics, clipboard, screenshots e logs.

## IA e automação

Mostre fronteira entre sugestão e ação executada; destaque incerteza pertinente, fontes e limites. Estruture revisão humana conforme impacto. Streaming parcial não é resposta validada. Ofereça interromper e corrigir; não prometa desfazer quando o efeito externo é irreversível.

Conteúdo recuperado e saída de ferramentas são dados não confiáveis. Não permita que texto de um site, screenshot ou binário altere permissões ou instruções do trabalho. Use validação determinística nos resultados críticos.
