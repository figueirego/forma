# Interação, dados e conteúdo

## Contrato de estado

Para cada ação relevante, especifique gatilho, pré-condição, feedback, resultado persistido, erro, cancelamento e repetição. Cubra estados aplicáveis, não uma lista mecânica em toda tela:

| Estado | O usuário precisa saber | Comportamento |
|---|---|---|
| Inicial/vazio | O que existe aqui e como começar | Ação pertinente; diferenciar vazio de filtro sem resultados |
| Carregando | O que está pendente | Preservar contexto; skeleton só se a forma for previsível |
| Sucesso | O que foi concluído | Confirmação proporcional, próximo passo ou retorno |
| Erro parcial | O que funcionou e o que falhou | Retentar só o necessário; manter dados válidos |
| Offline/desatualizado | Atualidade e limites | Distinguir cache de dado atual; indicar sincronização |
| Sem permissão | Limite e alternativa | Não revelar informação restrita; encaminhar acesso quando permitido |
| Conflito | Qual versão difere | Resolver ou preservar ambas, sem sobrescrita silenciosa |

## Navegação, diálogos e comandos

Mantenha back, histórico e estado de filtros previsíveis. Use links para navegação e comandos para ações. Context menus e atalhos complementam caminhos descobríveis. Não coloque ações exclusivas em hover ou long press.

Use modal para interrupção necessária. Defina nome acessível, foco inicial, limite de foco, Escape conforme risco e retorno ao disparador. Se o disparador desaparecer, escolha destino lógico. Conteúdo de popover não modal tem outro contrato. Ações destrutivas precisam de consequência clara, confirmação ou undo conforme reversibilidade e risco.

## Formulários e onboarding

Rótulos persistentes, instrução antes do erro provável e mensagens junto ao campo. Valide no momento que ajuda sem punir digitação incompleta. Preserve dados no erro; resuma erros em formulários longos com ligação aos campos. Diferencie obrigatório, opcional e indisponível.

Ofereça autofill, colagem, gerenciadores de senha e teclado adequado. Explique unidades e formatos; não torne datas ambíguas. Mostre progresso real em multietapas, permita revisar e voltar sem perder conteúdo. Onboarding deve levar ao primeiro valor, ser pulável quando possível e reaparecer como ajuda contextual.

## Tabelas, busca e gráficos

Tabelas são adequadas para comparação entre atributos; cards não são automaticamente melhores. Defina alinhamento, unidades, cabeçalhos, ordenação e estado de seleção. Paginação, virtualização e carregamento incremental dependem de volume e tarefa. Preserve acesso por teclado e posição ao atualizar.

Busca deve mostrar consulta ativa, filtros, resultados e recuperação. Diferencie ausência de resultado, erro de rede e falta de permissão. Não sugira que uma busca parcial cobriu todo o acervo.

Para pesquisa com sugestões, cor, tags, histórico ou IA, use [busca e descoberta](search-discovery.md). Campo ancorado, seletor de cor e paleta de comandos podem ser três superfícies diferentes: não transfira automaticamente modalidade, blur, teclado ou regras de fechamento entre elas.

Em gráficos, escolha o tipo pela pergunta: comparar, evoluir, distribuir ou relacionar. Identifique escala, período, unidade, origem, dados faltantes e incerteza. Evite eixos enganosos, 3D decorativo e dependência de cor. Ofereça alternativa textual/tabela e acesso às informações do tooltip sem mouse.

Em monitoramento, mapas de indicadores ou comparação temporal, leia [dashboards temporais e geográficos](data-dashboards.md). Defina recorte, denominadores e identidade do snapshot antes de ligar os painéis; valor atual não pode aparecer como histórico, e resposta antiga não pode substituir a seleção mais recente.

## Conteúdo e localização

Escreva ações específicas, consequências claras e erro recuperável: o que aconteceu, o que foi preservado e próximo passo. Use terminologia de domínio consistente. Não corte citações de modo a alterar sentido. Não invente atribuições.

Prepare pluralização, RTL, datas, fuso, moeda e números locais; não concatene frases traduzíveis. Teste expansão e strings longas. Não use bandeira como sinônimo de idioma. Alt text descreve propósito/contexto; decoração não precisa ser narrada.

## Colaboração e IA

Em edição colaborativa, diferencie presença, edição, salvamento e versão confirmada. Trate desconexão, conflitos e permissão alterada durante a sessão. Em IA, diferencie sugestão de execução, streaming de conclusão e confiança de certeza. Inclua editar, interromper, retentar, revisar fontes e reverter quando apropriado.

Ao fechar um documento com autosave, aguarde o flush da versão atual. Falha deve preservar o rascunho e oferecer retry ou descarte explícito; não absorva a exceção e feche mesmo assim. “Salvo” precisa nomear o destino: gravação local não demonstra sincronização remota. Exportar/copiar um rascunho também não equivale a persistir o formulário de origem.
