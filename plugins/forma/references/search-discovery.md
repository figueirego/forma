# Busca e descoberta

Use esta referência para campo de busca, sugestões, filtros, catálogo, paleta de comandos e pesquisa semântica. Aparência, relevância, escopo, concorrência e recuperação fazem parte do mesmo contrato. Preserve o domínio do produto: tarefas de estudo não ganham busca visual apenas por receberem um botão colorido.

## Comece por uma consulta concreta

Exemplo de especificação: “azul” no acervo atual + tag “referência” deve retornar itens daquela biblioteca que atendam ao filtro escolhido. Defina se azul significa palavra no título, cor atribuída pelo usuário ou cor extraída da imagem. Esses resultados são diferentes. Mostre o filtro ativo e permita removê-lo sem apagar filtros independentes.

Antes de implementar, registre:

| Dimensão | Decisão necessária |
|---|---|
| Universo | Biblioteca/workspace, coleção e descendentes, favoritos, lixeira, permissão e tipos de item |
| Consulta | Campos pesquisados, prefixo/frase, normalização Unicode, acentos, idioma, comprimento mínimo |
| Filtros | AND/OR entre tags, cor, tipo, data e texto; chips, valores e remoção |
| Motor | Substring, índice textual, vetores ou combinação; estado de instalação/indexação |
| Ranking | Relevância, data, grupos por tipo, deduplicação e desempate estável |
| Completude | Paginação, limites, itens ainda não indexados, resultados parciais |
| Estado | Texto digitado, consulta aplicada, request em andamento, resultado aceito e histórico |
| Persistência | Sessão versus biblioteca versus perfil; histórico, recentes e privacidade |

Não apresente concatenação de listas como fusão de scores. Se o ranking for relevância, um botão que diz “Mais recentes” precisa refletir a ordenação efetiva ou explicar a exceção.

## Superfícies e geometria

Um campo na toolbar pode abrir sugestões ancoradas abaixo, com mesma largura e espaçamento consistente. O ícone de cor pode abrir outro popover; Cmd/Ctrl+K pode abrir uma paleta modal. Observe cada um separadamente: retângulo, âncora, elevação, scrim, blur, foco, rolagem, clique fora e Escape.

- Diferencie `focused-empty`, `typing`, `loading`, `results`, `no-results`, `error`, `partial` e `unavailable`. Espaços em branco não devem produzir comportamento arbitrário.
- Não use scrim ou blur por convenção estética: reproduza o contrato observado. Um popover pode escurecer o contexto sem criar um modal com foco preso.
- Limite o painel à área visível, faça flip/shift quando necessário e teste bordas, zoom e teclado virtual. Medidas desktop não provam mobile.
- Em faixas horizontais, indique conteúdo fora da área com fade ou controle. Não confunda seis chips visíveis com seis opções totais.
- Suporte nomes longos, RTL, cor selecionada, hover, foco, toque e arraste sem disparar clique ao terminar o gesto.

## Cores com significados independentes

Mantenha separados: accent da interface; ambiente/pools; cor atribuída a item/coleção; paleta extraída dos pixels; material de perfil/livro. Uma nota com papel verde não é automaticamente uma imagem que contém verde.

Busca por cor exige definição de espaço de cor, distância/tolerância, percentual mínimo de pixels, tratamento de preto/branco/cinza e de transparência. A cor de um chip é representação do filtro, não prova de correspondência exata de RGB. Mostre nomes acessíveis e estado selecionado além da cor.

Escolher um chip nomeado, arrastar um seletor e informar um valor customizado podem produzir filtros diferentes. Defina commit, preview, remoção e reset de cada ação. Não altere o tema ao aplicar um filtro de conteúdo.

## Teclado e foco

Use o padrão semântico adequado ao comportamento real. Sugestões navegáveis pedem input identificado, relação com painel/lista, expansão e item ativo; grupos de filtros podem usar botões/toggles com nomes próprios. Não aplique `combobox` apenas para decorar um input.

Especifique Tab, Shift+Tab, setas, Enter, Escape, Backspace com campo vazio e atalho global. Diferencie:

- **Fechar:** oculta sugestões ou perde foco; não implica apagar consulta.
- **Limpar texto:** remove apenas texto, se esse for o rótulo.
- **Limpar busca:** pode remover texto e todos os filtros, mas deve ficar explícito.
- **Cancelar consulta:** interrompe ou invalida trabalho pendente; blur sozinho não faz isso.

Não capture atalhos de edição indevidamente. IME/composição deve terminar antes de enviar Enter ou disparar requisição definitiva. Preserve foco ao remover chip e devolva-o ao disparador ao fechar modal. Resultados precisam de anúncio resumido, sem ler todo o acervo a cada tecla.

## Concorrência e contexto

Debounce reduz trabalho; não impede resposta fora de ordem. Mantenha uma identidade por consulta com biblioteca, filtros, texto, tipo, ordenação e página. Ao resolver, aceite o resultado somente se essa identidade e a geração ainda forem atuais. Invalide também ao limpar texto, trocar coleção, biblioteca, modo ou fechar a superfície quando o contrato exigir cancelamento.

Cancelamento no cliente e cancelamento do motor são coisas diferentes. Se o motor não aborta, descarte respostas antigas e limite concorrência. No backend, fixe a conexão/identidade da biblioteca antes de qualquer `await`; não retome uma operação antiga sobre um banco global recém-trocado.

Se o frontend aguarda 220ms e a grade mais 90ms, a espera pode acumular. Registre o orçamento ponta a ponta; não copie dois timers sem necessidade. Enter deve drenar a pendência sem duplicar chamadas. Loading acompanha a consulta que poderá pintar a tela, não qualquer Promise antiga.

Cache precisa incluir identidade de biblioteca, escopo, versão dos índices e filtros relevantes. Invalide/versione ao alterar memberships, tags, conteúdo, cor extraída, lixeira, restauração, importação e indexação. Use o mesmo contrato de descendentes nos motores textual e semântico. Se diferirem por decisão de produto, exponha a diferença.

## Semântica e estados de dados

Separar instalação do modelo, indexação do acervo e consulta. Modelo instalado não significa acervo completo ou relevante. Documente execução local/remota, custo de download, espaço, cancelamento, falha e fallback. Não simule “IA” com resultados estáticos nem prometa busca semântica a partir de um campo bonito.

Resultados vazios podem significar: nenhum item; filtros muito restritos; acervo não indexado; modelo ausente; permissão; erro. Mostre estado correto e recuperação. Em falha parcial, preserve resultados válidos, indique fonte indisponível e permita retry. Se houver limite sem paginação, não mostre total como se fosse completo.

Histórico de consultas e itens vistos são entidades diferentes. Defina deduplicação, limite, escopo e expiração. “Clear history” precisa informar se limpa consultas, vistos recentes ou ambos; não misture bibliotecas. Não carregue títulos privados em evidências compartilhadas sem necessidade.

## Evidência da referência desktop — artefato 0.19.0

Extração estática do renderer SHA256 `038a8f7cbd96a203799799468673ce7bdb1e3f2c6ef32dcae36672876925a184`, confrontada com capturas do usuário. Observação nativa confirmou a toolbar em repouso; a ferramenta de controle da janela não permitiu testar a digitação nesta revisão. Estes detalhes descrevem o build analisado, não regras universais:

- Campo `R3`: pill de 40px, min240/max560px; painel abaixo a 8px, mesma largura, raio20px. Focus + consulta aparada vazia + seletor fechado abre sugestões. Digitar oculta esse painel; a grade continua sendo o destino da busca.
- Painel ancorado usa scrim sem blur; a paleta `S3` de Cmd/Ctrl+K é outra superfície modal. O seletor `M3` também é separado. Não reutilizar o backdrop de Settings para todos.
- 17 cores nomeadas em faixa horizontal; a captura mostra apenas a primeira parte. São filtros sobre paleta extraída de imagens, não os 11 accents nem os matizes dos pools.
- Consulta de header tem debounce220ms; Enter aplica e registra histórico, depois perde foco. Escape apenas perde foco; não limpa consulta nem prova cancelamento da pendência. O clear geral limpa texto, tags e cor.
- Pesquisa textual usa SQLite FTS5 com AND entre termos e prefixo somente no último: `glass ring` vira `"glass" AND "ring"*`. Aspas digitadas não criam busca de frase neste parser. Semântica usa CLIP local quando disponível; resultados heterogêneos são concatenados/deduplicados, não uma fusão de ranking comparável entre tipos.
- A rota semântica ativa automaticamente com modelo instalado, texto aparado com mais de1 caractere e fora de Trash/Favorites. Cor/tags sem texto seguem o caminho SQL. Tags são filtros exatos, AND e sem diferenciar caixa. Somente a paleta `S3` interpreta `#` inicial e Space/Tab como adição de tag; não atribua essa sintaxe ao campo inline `R3`.
- Picker usa SV + hue, presets, hex e conta-gotas quando disponível. A cor provisória só é aplicada por preset/Search/Enter. O build não limita sua posição ao viewport e pode aplicar a última cor válida quando Enter recebe hex inválido; são pontos de correção ao adaptar, não padrões a copiar.
- Histórico guarda até20 consultas e24 itens vistos por biblioteca, em arquivos separados dos acervos; o painel mostra até8 consultas. Clear history e Clear recently viewed são ações distintas. O placeholder de significado depende do modelo instalado, sem provar que a indexação está completa.
- Riscos estáticos a não herdar: escopo recursivo da consulta textual versus coleção exata em vetores; cache de vetores sem invalidação em alguns caminhos de membership; tratamento incompleto de falhas/cancelamento. Não foram reproduzidos por injeção de falhas no acervo do usuário.

Reprodução fiel exige identidade/versionamento e registro de desvios, como em [fidelidade](reference-fidelity.md). Um defeito comprovado na referência deve ser corrigido deliberadamente, preservando o registro do comportamento original.

## Matriz mínima de aceite

1. Focar vazio, fechar, reabrir, digitar, confirmar, limpar e remover apenas um filtro; conferir estado final e foco.
2. Aplicar texto + duas tags + cor em escopo definido; comprovar AND/OR e conteúdo retornado.
3. Consultas A→B com A resolvendo por último; somente B pode substituir resultados.
4. Trocar biblioteca durante requisição; nenhum item, histórico ou resultado antigo pode surgir no contexto novo.
5. Aquecer consulta, mover item entre coleções, repetir; resultado precisa refletir o novo membership.
6. Comparar coleção pai/filha nos motores; testar lixeira, tipo e permissão.
7. Simular modelo ausente, indexação parcial e falha de uma fonte; diferenciar do vazio legítimo.
8. Verificar teclado, leitor de tela, janela estreita, zoom, toque, IME e posição do popover junto às bordas.

Escolha casos adequados ao produto e registre os efetivamente executados. Estática confirma mecanismos; screenshot confirma aparência de um estado; só a execução confirma a transição observada.

## Lições de implementação — busca local no Pauta

Exemplo de aceite: uma tarefa “Planejar índices do banco” pode aparecer para “acelerar consultas” sem compartilhar essas palavras. Execute esse caso com o modelo real, registre posição/score e inclua um item irrelevante como controle. Um teste que devolve vetores simulados verifica integração, não relevância semântica.

- **Modalidade é parte do contrato.** O Pauta implementa embeddings de texto multilíngue (`paraphrase-multilingual-MiniLM-L12-v2`, 384 dimensões, mean pooling normalizado, q8), em Worker/WASM. A referência desktop analisada usa CLIP para relações entre texto e imagem. O primeiro não reconhece sozinho o conteúdo visual de uma imagem. Paleta de pixels e tags também não transformam um encoder textual em multimodal.
- **Local tem custo e fronteira.** O manifesto desta implementação soma aproximadamente158MB de modelo, tokenizer e runtime, servidos pela origem da aplicação, com modelos remotos desativados. Consulta e conteúdo não precisam sair para um serviço de inferência. Documentar versão, revisão, hashes/licenças, primeira carga e cache; medir tempo/memória em dispositivo alvo. Assets presentes no projeto não provam que o navegador os carregou nem que funcionará offline após uma nova sessão.
- **Ranking precisa de avaliação.** A implementação apresenta hits semânticos e acrescenta matches textuais ainda ausentes. Isso é concatenação/deduplicação, não fusão de scores calibrados. O limiar depende do modelo e do acervo; não transformar um valor usado no protótipo em constante universal. Avaliar paráfrases, português, notas longas, termos exatos, itens irrelevantes e filtros combinados.
- **Pendente não é vazio.** Durante download/inicialização/inferência, preservar hits textuais provisórios e indicar busca em andamento. Só mostrar vazio definitivo depois de concluir as fontes previstas. Erro deve oferecer retry e identificar fallback textual; limpar/trocar biblioteca deve encerrar o estado pendente da consulta anterior.
- **Uma consulta possui identidade.** Biblioteca + revisão dos dados + filtros + texto + modo formam o contexto. Cancelar timer/cliente, invalidar geração e validar identidade após cada `await`. Cancelamento cooperativo no Worker pode deixar a inferência atual terminar; descarte da resposta obsoleta e limite de trabalho continuam necessários. Timeout com encerramento do Worker é uma recuperação distinta, com custo de reinicialização.
- **Histórico não é conteúdo nem autenticação.** Consultas (20) e vistos (24) têm limites e ações de limpeza separados por biblioteca; deduplicar tags como conjunto. Validar schema, versão, cor e modo ao ler; erro de storage/corrupção não equivale a histórico vazio e não autoriza sobrescrita automática. Escopo por ID evita mistura acidental, mas `localStorage` não isola usuários que compartilham a mesma origem/perfil do navegador.
- **Cor exige procedência.** Na tarefa sem imagem, usar a cor atribuída é uma adaptação explícita de domínio. Com imagem, a paleta deriva dos pixels; uma paleta explicitamente vazia não pode cair silenciosamente na cor da tarefa. Neutralidade, hue circular, luminosidade, cromaticidade e proporção mínima de pixels precisam de testes próprios. Amostragem/quantização diferente da referência impede prometer resultados idênticos.
- **Seletor tem draft e foco próprios.** Hex inválido + Enter mantém erro e não aplica a última cor válida. Escape/clique fora descarta; Search/preset confirma. Limitar/virar popover nas bordas, oferecer sliders acessíveis para S/V, devolver foco ao disparador e fechar ao trocar biblioteca. Um picker antigo não deve interceptar Escape de um novo modal acima dele.

Estas são decisões e requisitos derivados da implementação e leitura do código. A validação visual, latência real e qualidade dos embeddings no navegador devem constar separadamente no registro de execução.
