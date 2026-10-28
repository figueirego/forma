# Artefatos gerados, edição e exportação

Use para editores visuais, HTML gerado, apresentações, relatórios, posters, protótipos e canvas. Não impõe um novo editor ou formato ao projeto. Leia [contratos e confiança](contracts-trust.md) para operações assíncronas e [marca/marketing](brand-marketing.md) para adaptação por canal.

## 1. Definir o que será entregue

Declare formato de autoria, fonte de verdade, formato de preview, arquivo de entrega, editor de destino e editabilidade esperada. HTML, árvore de componentes, scene graph, Markdown e bitmap têm capacidades diferentes.

Mapeie as unidades obrigatórias de conteúdo para página/seção/estado antes de escolher layouts. Quantidade de templates não determina quantidade de páginas. Resumo autorizado pode reduzir conteúdo; omissão acidental não. Diferencie canvas de dimensão fixa, documento paginado e interface responsiva: todos podem ser HTML, mas precisam de critérios diferentes.

| Promessa | Evidência de aceite |
|---|---|
| Preview visual | Render aberto com fontes/assets, conteúdo e estados corretos |
| HTML funcional | Ações, links, semântica e layout testados no ambiente entregue |
| PPTX editável | Texto/objetos prometidos selecionáveis e alteráveis no editor alvo |
| PNG/PDF fiel | Arquivo final aberto, dimensões/páginas/fontes/recorte conferidos |
| Round-trip | Reabrir/importar e comparar os dados e relações que o contrato preserva |
| Artefato local | Destino e dependências de rede conhecidos; local não implica offline |

Uma imagem por slide dentro de PPTX conserva aparência, mas não torna texto e gráfico objetos editáveis. Um SVG/canvas rasterizado deve ser identificado como tal. Liste perdas por camada: texto, vetores, gráficos, links, notas, animação, fontes e efeitos. Se o formato não suporta uma propriedade, preserve a fonte e exponha a limitação; não ofereça download silenciosamente incompleto como sucesso integral.

### Contrato editorial em restyles

Antes de mudar a aparência de uma peça fornecida, inventarie o conteúdo que deve permanecer: texto literal, valores, unidades, anotações, marcas, agrupamentos e relações. Requebrar linhas ou recompor para outra proporção não autoriza reescrever, omitir ou acrescentar título, slogan, URL ou rodapé. Mantenha grafia de identificadores como `after_model` e cardinalidades como `1..*`; transformações de caixa/escape podem alterar o texto exibido apesar de a fonte conter a string correta.

Compare o conteúdo **renderizado** com a fonte independente. Um teste que só procura as frases esperadas não detecta texto extra, repetição ou relações invertidas. Verifique essas dimensões separadamente. Para gráfico/diagrama, preserve [dados e topologia](data-dashboards.md#dados-e-topologia-em-peças-exportadas). Se leitura de raster não resolver uma seta ou palavra, registre a incerteza e esclareça o ponto em vez de completar por aparência.

## 2. Uma fonte de verdade, revisões explícitas

Em edição por seleção, relacione objeto visível a ID estável, documento e revisão. Coordenadas de tela servem para seleção/feedback, não substituem identidade. Um seletor DOM por posição pode apontar para outro nó depois da geração. Antes de aplicar patch assíncrono, revalide alvo e revisão.

Descreva o escopo: objeto selecionado, região, página ou documento. Mudanças fora dele precisam de dependência concreta ou nova instrução. Em uma seleção múltipla, valores mistos não devem ser sobrescritos apenas por abrir o inspector.

Capture estado confirmado → aplique mudança validada → confirme persistência → registre undo/versão conforme a arquitetura existente. Em erro, preserve draft e mostre recuperação. Não crie snapshots em cada frame de drag; agrupe pela intenção de edição quando apropriado. Defina como autosave, undo e geração concorrem; restaurar um snapshot não deve apagar alterações posteriores silenciosamente.

Snapshot de geração, undo de edição e backup têm alcances diferentes; a presença de um não prova os demais. Uma escrita por arquivo temporário + rename pode evitar conteúdo pela metade, mas não prova proteção contra sobrescrita por outro escritor. Defina revisão/precondição e coordenação compatíveis com o armazenamento existente; timeout deve terminar em estado recuperável, não apenas parar tentativas sem feedback.

Persistir e atualizar preview são confirmações distintas. Se a escrita concluiu e o refresh falhou, indicar que o arquivo foi salvo e permitir atualizar a prévia; não reverter conteúdo confirmado apenas por falha visual.

**Ensaio:** selecionar título A, iniciar reescrita, mudar para documento B, receber resultado de A. O resultado só pode alterar A na revisão prevista ou ficar pendente de reconciliação; nunca o título atualmente selecionado de B.

## 3. Preview é uma fronteira de confiança

Trate HTML, SVG, URLs, arquivos e mensagens gerados/importados como entrada não confiável. Use o isolamento compatível com o produto: origem separada ou sandbox com capacidades mínimas, política de rede/assets e validação de mensagens. Não ampliar privilégios do renderer para fazer o preview funcionar.

Para uma bridge de seleção/edição, valide canal, frame emissor, sessão/revisão e schema antes de aceitar mensagens. Não confie apenas no nome do evento nem em `origin: null` de um iframe sandboxed. Sanitização de conteúdo, isolamento da execução e autorização do efeito são responsabilidades distintas.

O preview não recebe credenciais, filesystem/IPC irrestrito ou capacidade de publicar por herança do editor. Upload de assets privados, acesso externo e custo de geração seguem a autorização existente. Componente gerado não pode transformar texto de uma fonte em instrução privilegiada.

O importador de assets também precisa de fronteira própria: valide caminhos e symlinks contra as raízes permitidas antes de ler/incorporar arquivos. CSP do navegador não restringe o processo local que constrói o preview.

## 4. Jobs e contexto de geração

Uma geração pertence a projeto/documento, revisão de entrada, pedido e modo/provedor. Preserve essa identidade em progresso, preview, resultado e erro. Retry deve consultar resultado conhecido ou reutilizar a chave idempotente quando suportado; não duplicar geração paga ao fazer polling. Não trocar provedor por falha sem autorização.

Distinguir planejado, em execução, preview parcial, concluído, cancelado, falhou e resultado desconhecido. Interromper o stream não prova que o trabalho parou. Progresso real, cancelamento suportado e preservação de trabalho são critérios de UX; percentuais inventados não ajudam.

## 5. Exportar e verificar

Quando houver várias saídas, conserve uma relação simples no brief/contrato já existente: formato, dimensão/unidade, conteúdo obrigatório, editabilidade, revisão de origem e arquivo final. Acrescente duração/FPS/áudio somente para mídia temporal. Revalide cada variante após recompor; a aprovação de um quadrado não aprova automaticamente o recorte vertical. Uma camada animável precisa de identidade, limites, âncora e vínculos quando pertinentes; imagem achatada não comprova partes editáveis ou movimento independente.

Fixe a revisão exportada e as opções: páginas, dimensões/unidade, escala/DPR, fontes, assets, transparência, animação e formato. Aguarde fontes/mídia prontas; não capture placeholder ou frame arbitrário. Erros por página/asset devem impedir sucesso integral ou produzir entrega parcial explicitamente identificada.

Abra o resultado com parser/editor apropriado e compare contagem, conteúdo, ordem, dimensões e capacidades prometidas. Para deck, verifique também notas e objetos editáveis; para relatório, unidades, fontes e dados; para poster, recorte e tamanho final. Um arquivo existente ou toast de download não prova correção.

Conteúdo acima do limite de captura exige paginação, tiles, formato alternativo ou aviso de entrega parcial; nunca corte silenciosamente a última seção. Use fonte independente para comparar quantidade e conteúdo, não somente dados produzidos pelo mesmo extrator. Arquivo HTML único com fontes/scripts por CDN não é autossuficiente offline; teste sem rede quando isso for requisito. Projeto de vídeo exportado não é MP4 renderizado.

Teste conteúdo acentuado/RTL, fonte ausente, asset bloqueado, página longa, transparência e falha intermediária conforme a promessa. Round-trip compara propriedades preservadas; não declare conversão sem perdas quando o conversor suporta só um subconjunto. Exportar não publica, e criar backup não prova restauração.

### Transparência e composição

Para recorte transparente ou marca, confira o alpha real do arquivo final. Extensão PNG, canal alpha presente e quadriculado visível não provam transparência: os pixels podem ser todos opacos ou conter um checkerboard pintado. Examine a região que deveria ser transparente e preserve os pixels semitransparentes legítimos das bordas.

Componha a saída sobre os fundos relevantes do destino e observe halos, franjas e detalhes em escala útil, além da composição inteira. Um recorte aceitável sobre branco pode carregar uma borda clara inadequada no tema escuro. Investigue matte, premultiplicação, conversão de cor ou compressão conforme a causa; não esconda o defeito com blur nem imponha temas fora do escopo. Recolorir marca ou eliminar detalhes exige que isso pertença ao pedido. Preview achatado não comprova alpha preservado no download.

Base conceitual: Huashu e HTML Anything (múltiplos formatos), DeepSeek Design (documento editável/seleção/export), Open CoDesign e Kun (contexto de trabalho e versões). São evidências estáticas com capacidades e licenças distintas; consulte [casos de uso](source-use-cases.md).
