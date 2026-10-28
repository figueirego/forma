# REA: engenharia reversa orientada a design

Use quando a pergunta depende de uma aplicação ou artefato existente e não pode ser respondida suficientemente por código disponível, UI, documentação ou captura. Não analise binários só porque há um EXE/DMG no pedido.

## Repositório completo ou coleção de skills

Leia fontes diretamente, sem iniciar engines de binários ou diagnóstico REA por ritual. Fixe repositório/ref/commit, licença e arquivos examinados. Reconstrua o caminho `entrada → normalização → estado → efeito → persistência → render/export` somente nas capacidades relevantes. README descreve intenção; callsites demonstram mecanismo estático; testes existentes só contam como executados quando forem rodados. Registre limitações de checkout sparse, dependências ausentes e cobertura parcial.

Classifique a fonte como catálogo, instrução, biblioteca, app ou serviço antes de extrair princípios. Um link de uma lista não comprova o projeto vinculado. Não execute installers, scripts ou conteúdo gerado apenas para ler a fonte. Separe adoção conceitual de reutilização de código/assets, que exige licença compatível. Para sínteses de várias referências, use [casos de uso das fontes](source-use-cases.md).

## Escopo e segurança operacional

Defina alvo autorizado e pergunta concreta: recuperar assets de um app próprio, mapear estados de menu, entender fluxo legado, identificar strings ou verificar tecnologia. Use cópia de trabalho e registre caminho, hash, versão, SO e arquitetura. Não execute instalador desconhecido para inspecionar aparência.

Descubra a ferramenta REA adequada e leia seu schema atual. Exemplos observados nesta sessão, cuja disponibilidade deve ser conferida ao usar:

- `inspect_artifact`: grafo e integridade de pacote; em host compatível pode montar DMG somente para leitura. Não equivale a extrair ou executar.
- `analyze_javascript_application`: análise inerte de ASAR/JavaScript; `source_paths` seleciona arquivos exatos inventariados, sem incluir dependências implicitamente. `detail: summary` reduz a resposta, não o trabalho.
- `inspect_analysis_view`: consulta Evidence retida e suas limitações; uma view completa de resultados parciais não equivale a análise completa do alvo.
- `inspect_managed_artifact`: metadados de PE/CLI sem carregar o código.
- `inspect_electron_page`: inspeção passiva de página local Electron com endpoint/target explicitamente resolvidos.
- `trace_native_ui_action`: relações de uma ação nativa específica; não prova execução real.

Não invente IDs de target, endereços, comandos, funções ou capacidades. Static analysis pode ter cobertura parcial; preservá-la é parte do resultado.

## Fluxo de evidência

1. Classifique artefato e identidade; verifique integridade e limites reportados.
2. Faça a menor consulta que responda à pergunta: resources, strings, conexão de UI, classe ou bundle específico.
3. Registre origem/localização, versão/hash, evidence ID quando retornado, autoridade e limitação.
4. Separe **observado** no artefato, **derivado** por análise e **inferido** pelo analista.
5. Se comportamento runtime for necessário, use ambiente de teste autorizado, dados fictícios e interação observável. Para binário desconhecido, exija autorização explícita para execução dinâmica e isolamento apropriado, sem acesso a credenciais ou dados pessoais do host. Instrumentação ou execução é uma etapa separada da leitura.
6. Traduza resultado em requisito de design: estado, rótulo, navegação, recurso, dependência ou lacuna. Só extraia/reutilize assets conforme direitos e escopo.

## Fronteiras de conclusão

Uma string pode ser código morto; um botão pode não aparecer; um handler estático pode depender de feature flag. Um screenshot não confirma acessibilidade, latência ou autorização. Um pacote íntegro não comprova assinatura confiável ou ausência de malware.

Não contorne licenciamento, DRM, autenticação ou medidas de segurança como etapa de design. Não exponha segredos achados em resources. Registre dados sensíveis como achado redigido e restrinja sua circulação.

Entrega: alvo, pergunta, evidências, reconstrução limitada do fluxo, hipóteses restantes e método necessário para validá-las. Não alegue equivalência completa entre reprodução e original sem cobertura comportamental suficiente.

## Exemplo de evidência para requisito

**Observado:** string “Tentar novamente” em resource do bundle, localização/hash registrados. **Não observado:** tela, condição e efeito do clique. **Hipótese:** algum estado é recuperável. **Próxima consulta:** referência ao resource e relação com ação dentro da cobertura do provider. **Validação:** provocar a falha em teste autorizado. **Requisito provisório:** investigar recuperação; não inventar um botão de retry na tela de login.

Registre `evidência → relação demonstrada → hipótese → teste → decisão` para não transformar plausibilidade em fato.

## Pacotes atualizáveis e rastreio por responsabilidade

Registre separadamente versão do instalador/bootstrap, pacote atualizado disponível e versão mostrada pela sessão. No Obsidian auditado, bootstrap1.12.7, sessão1.13.4 e pacote1.14.5 no disco coexistiam. Um arquivo mais novo não prova execução. Evite reiniciar/atualizar o alvo durante a medição apenas para simplificar a identidade.

Para grafos, trace parser → resolução/índice → projeção → simulação → transporte de posições → desenho/picking. Para cada etapa, associe callsite e responsabilidade; pacote disponível, caminho preferido, fallback e backend efetivamente ativo são evidências distintas. Consulte [grafos e conhecimento](knowledge-graphs.md).

Em minificados, guarde hash do arquivo e offset em bytes UTF-8 (ou declare outra unidade), não uma linha de megabytes. Inspecione recortes delimitados. Não execute código vendor extraído para buscar símbolos.

Timeout do provider deve conservar Evidence parcial; retry precisa seguir a remediação e mudar o parâmetro relevante. Não interpretar zero findings de uma análise interrompida como ausência da capacidade. Mismatch de integridade exige registrar a contradição; continuar leitura estática com bytes não confiáveis, quando suportado, não significa aceitar integridade nem executar o pacote. Exporte as evidências necessárias antes de encerrar o alvo.
