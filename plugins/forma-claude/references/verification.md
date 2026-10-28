# Verificação, auditoria e aceite

Nesta distribuição, `<forma-root>` é a raiz deste plugin, que contém `.claude-plugin/`; contém `references/`, `assets/`, `scripts/` e `tests/`. Resolva-a a partir deste arquivo.

Defina critérios antes de julgar. Separe **verificado**, **inferido**, **não testado** e **não aplicável com motivo**. Não atribua nota a uma área que não foi acessada.

## Matriz proporcional

| Dimensão | Evidência mínima pertinente |
|---|---|
| Tarefa principal | Percurso real ou teste de comportamento; não apenas screenshot |
| Estados | Vazio, carregando, falha, sucesso e extremos aplicáveis |
| Layout | Container/eixos e contratos espaciais declarados; medidas de alinhamento/insets/gaps/overflow + capturas nos tamanhos e estados suportados |
| Acessibilidade | Automação disponível + teclado, foco, semântica e testes assistivos pertinentes |
| Conteúdo | Texto real revisado, links, traduções e fontes de claims |
| Visual | Hierarquia, espaçamento, tipografia, cores, assets, clipping e consistência |
| Cor, quando alterada | Papel/modo/estado, pares e composição; legibilidade, semântica, equilíbrio contextual e fidelidade julgados separadamente conforme [refinamento cromático](color-refinement.md) |
| Motion | Interrupção, reduced motion, resposta e continuidade |
| Desempenho | Medição no contexto declarado; distinguir lab de campo |
| Engenharia | Build/lint/types/testes pertinentes quando houve código |
| API/dados | Falhas, permissões, retry, staleness e persistência conforme contrato |
| Grafos/ligações | Fixture com relações esperadas; resolução, ocorrências, backlinks, filtros/profundidade e rename; navegação e alternativa fora do canvas |
| Nativo/instalador | SO/arquitetura/estado de instalação explicitamente testados |
| Exportação | Abrir arquivo final e conferir formato, dimensões, assets e editabilidade |
| Editor/geração | Alvo e revisão preservados, preview isolado, edição concorrente, undo e falha parcial conforme contrato |
| Reúso de capacidade | Contrato pedido ligado ao consumidor real; estado/renderizador e operação discriminante observados no destino, conforme [integração](playbooks.md#h-reutilizar-capacidades-em-outro-projeto) |
| Base de interface limpa | Hierarquia fundo/sidebar/painel, seleção/foco, botões/campos, rolagem e alinhamento observados juntos; conteúdo extremo e adaptação por largura, conforme [receita](clean-shell.md) |

Escolha amostras pelo risco: um componente compartilhado exige consumidores representativos; um ajuste textual não exige instalar todas as plataformas. Imagens de aparência correta não substituem checks de comportamento.

Para revisar a própria skill, inventarie entrypoint, referências, exemplos, helpers e cenários. Registre por área: manter/alterar, problema ou critério revisado, evidência e método de validação. Leitura documental, teste de helper, avaliação independente de decisão e execução renderizada são níveis distintos. Não converter cobertura de arquivos em alegação de todos os fluxos/dispositivos testados. Novas regras precisam de cenário que revele uma decisão errada, não de teste que apenas busque palavras na documentação.

Confira também o contrato do verificador: quantidade esperada/examinada, falhas descartadas, dependências ausentes e testes pulados. Exit code 0 pode representar um skip ou artefato parcial. `skipped`/`partial` de ferramentas externas permanecem não verificados/incompletos no relatório; não são `pass` nem `not-applicable` por conveniência. Métricas automáticas de semelhança/diversidade são apoio, não julgamento visual independente.

Ligue cada gate bem-sucedido ao alvo e à revisão de entrada e saída que ele examinou. Contar chamadas de inspeção ou encontrar um gate anterior ao último render não prova que todos os requisitos foram checados, nem que o gate passou. Um contrato com `satisfied: true` e um texto de evidência é uma declaração a conferir: localize o arquivo/medição e a autorização citados; não trate o próprio relato como prova independente. Verificação estática, texto no DOM e texto legível no arquivo entregue também são evidências diferentes.

Em uma transferência, diferencie teste do pacote e teste do consumidor: hashes, imports resolvidos e regressões do componente não mostram que a rota o instanciou. Um editor de três cores que salva pode continuar incapaz de representar pools/posição/grain; um passaporte CSS pode passar layout e contraste sem possuir a malha/material pedidos. Não usar esses checks como aprovação substituta. Quando o escopo for apenas documental, validar decisões em cenários independentes e declarar que o produto continua sem correção executada.

## Comparação visual

Para resultados de agentes e ferramentas, consulte também [cobertura dos verificadores](#cobertura-de-verificadores-e-recibos). A aprovação precisa corresponder à pergunta realmente medida.

Use [contratos espaciais](layout-spatial-contracts.md) para transformar “está desalinhado” em alvo e relação verificáveis. Um script geométrico confirma apenas os contratos incluídos; não detecta requisitos omitidos nem substitui inspeção óptica, legibilidade ou teste de tarefa.

Para reprodução, fonte e implementação devem ter mesmo viewport, tema, estado, conteúdo e escala. Examine juntas, não por memória. Confira geometria e assets, mas registre diferenças de renderização legítimas. Para novo design, compare com critérios e direção definidos, sem inventar uma “fonte original”.

Para uma emenda, halo ou borda de poucos pixels, uma captura geral reduzida pode esconder o defeito. Compare recortes equivalentes antes/depois, incluindo a borda de referência, em escala nativa ou ampliação sem suavização enganosa; depois confira a composição inteira. Preserve as capturas originais. A pergunta visual deve ser concreta, como “a junção ficou fechada neste ângulo?”, sem concluir pelo tamanho de um thumbnail. Para filmes, amostre também o entorno dos cortes conforme [revisão temporal](motion.md#filmes-e-sequências-renderizadas).

## Rodadas e encerramento

Faça uma inspeção agrupada, corrija achados relevantes em lote e confirme as alterações. Repetir só se mudanças/falhas justificarem. Não prolongue refinamento cosmético sem benefício. Se um bloqueador persistir, registre-o e não declare aprovação. As exigências específicas de um plugin usado continuam válidas.

## Severidade

- **Crítica:** perda de dados, exposição sensível, ação irreversível enganosa ou tarefa essencial inviável.
- **Alta:** fluxo principal falha para um grupo relevante, navegação inacessível, persistência incorreta.
- **Média:** fricção reproduzível com recuperação, inconsistência que induz erro, falha relevante de adaptação.
- **Baixa:** refinamento visual/local sem impacto material no uso.

Cada achado contém alvo/localização, estado, passos, evidência, impacto, correção mínima e como verificar. Separe observação de hipótese. Sem achados, diga o escopo e os limites, não “perfeito”.

## Entrega

Informe artefato e local, mudança e razão, verificações executadas e pendências. Não declare “produção pronta” se funções forem mockadas, tela não tiver sido renderizada ou instalação não tiver sido testada. Documentação pode estar completa mesmo quando uma implementação futura ainda não existe: nomeie a natureza da entrega.

## Registro verificável local

Para tarefa ampla com múltiplos estados/dispositivos, use o [exemplo de registro](../assets/evidence.example.json). Para ajuste simples, evidência na resposta ou teste existente pode bastar. O JSON tem:

- `schema_version: 1`, `scope` e lista `targets` com identificadores estáveis do contexto testado.
- `checks`: cada item declara `id`, `target` e `status` (`pass`, `fail`, `untested`, `not-applicable`).
- `pass` exige `observation` e `artifact`, caminho relativo de arquivo local não vazio dentro da pasta do relatório, sem symlink ou `..`.
- Outros estados exigem `reason`; falha ou teste pendente impede aprovação estrutural. Cada target precisa de pelo menos uma evidência aprovada.

Exemplo de check preenchido após um teste real: `{"id":"save-error","target":"web-390x844","status":"pass","observation":"Falha preservou os campos; retry persistiu a alteração.","artifact":"captures/save-error.png"}`. O arquivo deve existir e a observação precisa ser verdadeira. Screenshot é evidência de aparência; log/teste/percurso é necessário para alegar persistência.

Execute `python3 <forma-root>/scripts/check_evidence.py <report.json>`. Exit 0 significa cobertura declarada e arquivos presentes; exit 1 indica registro incompleto/inválido; exit 2 indica erro de leitura/JSON. O checker não descobre requisitos omitidos, não inspeciona pixels e não prova que uma observação é verdadeira. Critérios e inspeção humana continuam essenciais.

O exemplo distribuído começa `untested` e deve falhar: não é um relatório pronto. Não renomeie teste inacessível para “não aplicável”. Preserve pendências no registro mesmo quando impedem exit 0.

## Verificação de contraste

`python3 <forma-root>/scripts/check_contrast.py '#111827' '#ffffff' --threshold 4.5` calcula a razão WCAG de cores sRGB opacas, sem arredondar para decidir aprovação. Use o limiar pertinente ao elemento. Para alpha, gradiente, imagem e blur, avalie fundo final composto e todas as regiões relevantes; o utilitário não faz composição. Resultado aprovado não valida foco, semântica ou acessibilidade completa.

## Cobertura de verificadores e recibos

Antes de consumir um `pass`, confira **o que foi examinado, o que ficou de fora e a qual revisão pertence**. `measured:false`, zero itens julgados, fonte não resolvida ou falha de coleta não viram aceite visual por haver zero defeitos registrados. Se não existe conteúdo a verificar naquele critério, justifique a não aplicabilidade pelo contrato; não transforme falha do analisador em dispensa.

No registro existente de uma tarefa composta, vincule critério → método/versão → alvo/revisão → cobertura → resultado → artefato. Para uma amostra temporal, declare intervalo, cadência e momentos examinados; para tipografia, famílias/pesos/glifos efetivos; para export, identidade da fonte e do arquivo. Use hash quando for útil confirmar os bytes; ele não prova qualidade nem correção do conteúdo. Não exigir esquema novo em todo ajuste.

Separe coleta e julgamento. Um coletor pode terminar com exit0 e registrar erros de assets; uma heurística pode medir só CSS resolvível ou uma amostra de frames. Leia essas limitações antes de concluir. Não modificar thresholds, omitir regiões ou reconstruir expected a partir do candidato para obter aprovação. Uma nota de dispensa escrita pelo próprio gerador não altera o aceite do usuário.

O [checker local de evidências](resources.md) continua verificando somente a estrutura declarada e arquivos presentes; não autentica observações, mede cobertura omitida ou valida esses recibos semanticamente. Use [cenários independentes](../evals/scenarios.md#cobertura-de-mídia-e-agentes--1210), além das provas do produto quando houver implementação. Para runtime, [produção coordenada](agent-production.md) distingue execução, retomada e entrega.
