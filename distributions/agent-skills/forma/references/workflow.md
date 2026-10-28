# Processo compartilhado de design

A coordenadora escolhe a especialidade; este processo conecta diagnóstico, construção, verificação e entrega quando o trabalho exige múltiplas etapas. Para uma correção pequena, leia apenas o trecho pertinente.

## Processo proporcional ao trabalho

Para trabalho amplo, escolha um playbook em [playbooks](playbooks.md) e use seus entregáveis mínimos. Para ajuste pequeno, trabalhe direto no alvo. O objetivo é reduzir decisões repetidas, não obrigar um processo inteiro para cada edição.

Quando o usuário pedir ajuda para refinar um artefato existente, conduza o diagnóstico, a correção autorizada e a comparação. Escolha outras skills, ferramentas ou referências pela dúvida que precisam resolver, conforme [integrações](integrations.md#escolher-apoio-durante-o-refinamento). Um pedido apenas de explicação continua sendo explicação; não transforma uma conversa conceitual em edição de projeto.

### 1. Entender e estabelecer a referência

Leia instruções locais e inspecione arquivos, fluxos, tokens, assets, dependências, testes e restrições relevantes. Para interfaces existentes, observe a experiência quando acessível; screenshots são evidência visual, código é evidência estrutural. Registre o que não foi observado.

Para novos produtos, defina tarefa, público, contexto, conteúdo, canais, restrições e sucesso. Para um botão desalinhado, não abra um processo de descoberta de produto inteiro.

Quando várias fontes forem fornecidas, classifique capacidade, evidência e licença antes de combinar suas recomendações. Catálogo, prompt, componente e aplicativo não têm a mesma autoridade. Separe adotar, adaptar, já coberto, rejeitar e pendente; leia [casos de uso](source-use-cases.md). Se a direção estiver aberta, compare alternativas com condições equivalentes em [direções](design-directions.md); não exigir variantes para uma escolha já feita.

### 2. Projetar fluxo e estados antes do acabamento

Trace o caminho principal, decisões, entrada/saída, erros recuperáveis, cancelamento e ações destrutivas. Identifique conteúdo mínimo, típico e extremo. Mapeie dados reais e autorização. Só então escolha composição, tipografia, cor e movimento.

Para composição nova ou defeito de layout, leia [contratos espaciais](layout-spatial-contracts.md). Antes de estilizar, defina container de referência, eixos de alinhamento, limites de largura, insets compartilhados, distâncias intra/intergrupo e regra de wrap/stack/scroll. Uma escala de tokens não substitui essas relações. Centralizar um painel não significa centralizar todo o seu conteúdo.

Para grafos e ligações, leia [grafos e conhecimento](knowledge-graphs.md) antes de escolher o renderer. Defina identidade, procedência, direção, resolução, contagens e atualização após rename/delete. Separe relações reais, sugestões semânticas, agrupamentos e posição visual. A interface precisa permitir explicar e abrir a fonte de cada relação.

Para novos sistemas ou mudanças amplas, registre a direção em documentação existente; crie DESIGN.md apenas se útil e não houver equivalente. Use tokens semânticos e componentes com estados. Dials opcionais de expressão, movimento e densidade são comunicação, não obrigações de efeito.

### 3. Construir na plataforma certa

Reutilize o que existe. Um EXE é um artefato executável, não uma estética; DMG é distribuição, não framework. Detecte a tecnologia antes de indicar implementação. Não instale sistemas de UI apenas porque a referência lembra sua marca.

Quando o pedido for “copiar a tecnologia para adaptar”, entregue um mecanismo reutilizável com dados, materiais, dimensões, interação, fallback e ciclo de vida separados do produto. Uma cópia visual fixa não atende esse pedido. Para reproduzir uma referência, medir também geometria, UV/normais, cadeia de cor, enquadramento nominal versus canvas expandido e resposta aos gestos: usar a mesma biblioteca 3D não estabelece equivalência. Leia [objetos reutilizáveis](reusable-objects.md); para cenas de campanha, compare mecanismos e custos em [web imersiva](immersive-web-tech.md), sem importar toda a stack por associação.

No pedido de fidelidade, fixe tolerâncias e compare geometria, projeção, paleta, shader, gestos, transições e adaptação separadamente. Inclua frente/lateral/verso e estados de repouso/hover/arraste/soltar/sair quando pertinentes. Registre observado, confirmado estaticamente, inferido e proposto. FLIP de posição/escala não comprova interpolação de pose/material; fallback e testes funcionais aprovados não tornam um exemplo genérico equivalente à referência.

Quando persistirem diferenças em objetos 3D, use o [protocolo do pacote ao pixel](3d-reference-fidelity.md): rastreie configuração até o consumidor, preserve unidades/UV por face, autoria de normais, máscaras, fonte exata e resolução de atlas/buffer/saída. Comparar EXE e DMG pode confirmar módulos equivalentes sem validar os runtimes. Corrija a especificação antes de alterar números sem diagnóstico.

Associe sintoma → mecanismo → correção → regressão → comparação renderizada. Brilho pode divergir por normais; estrias por UV que perde uma dimensão; fechamento de uma peça não prova contato com a outra. O [caso do livro aprovado](book-polish-case-study.md) mostra essa cadeia com evidências. Transfira o método, mantendo constantes específicas no perfil de referência.

Use conteúdo e assets autorizados. Mocks devem ser identificados como demonstração. Nunca invente clientes, depoimentos, escassez, métricas, preços ou capacidades. Gere imagens quando contribuírem e a tarefa autorizar; texto legível e interações não devem virar uma imagem rasterizada.

### 4. Verificar e corrigir com evidência

Use [verificação](verification.md) e, para interfaces implementadas, o [ciclo renderizado](rendered-validation.md). Faça uma rodada agrupada nos estados e dispositivos relevantes, corrija os problemas encontrados e confirme as mudanças. Pare o polimento quando critérios estiverem satisfeitos. Se persistirem defeitos relevantes, continue a correção funcional necessária ou reporte o bloqueio; nunca transforme limite de rodadas em aprovação fictícia.

Declare a superfície realmente testada: viewport mobile no navegador não é teste em aparelho físico, e um layout desktop não é validação de aplicativo nativo. Inspeção do bundle confirma mecanismos presentes, não sua execução nem paridade de pixels. Ao reaproveitar um componente da skill, confira o contrato e a revisão efetivamente distribuídos junto com seus testes. Verifique também a integração no destino: rota → componente → estado/renderizador → interação observada. Testes do asset, layout ou contraste não aprovam um mecanismo substituído ou nunca carregado.

Quando incorporar um resultado aprovado, preserve a revisão por hash, o antes/depois e os limites conhecidos; confirme que fonte, instalação e pacote carregam o mesmo asset. Aprovação humana, teste executado, teste ignorado e equivalência visual medida são evidências distintas.

### 5. Entregar algo utilizável

Entregue o artefato solicitado, não apenas sugestões. Informe o que mudou, motivo, verificações executadas e limitações materiais. Em auditorias, priorize achados reproduzíveis com alvo, impacto e menor correção. Em planos, entregue especificações implementáveis, sem alegar implementação.

## Invariantes

- A tarefa principal funciona sem depender de hover, animação, cor isolada ou gesto sem alternativa.
- Conteúdo permanece alcançável com texto ampliado, tradução e janelas pequenas.
- Cada distância e divisória tem um responsável identificável; alinhamento e centralização são verificados no container correto, com estilos computados, medidas e leitura visual. Correção óptica não encobre defeito estrutural.
- Estado persistido, rascunho, pendência e falha não são apresentados como sucesso equivalente. Operações que escrevem em mais de um armazenamento exigem transação, compensação verificável ou feedback explícito de sucesso parcial.
- Não descarte dados silenciosamente nem substitua fluxos nativos por simulações decorativas.
- Grafo, mapa de coleções e Canvas autoral têm contratos diferentes. Proximidade, cor e animação não provam relação semântica; renderização, simulação, índice e armazenamento exigem evidências próprias.
- Inspeção de referência não concede permissão para copiar marca, assets restritos ou publicar.
- Solicitar design não autoriza compras, publicação, deploy, alteração de credenciais ou instalação de binários desconhecidos.
- Ferramenta ausente não bloqueia especificações e trabalho local independentes. Explique a limitação concreta; não invente integração executada.
- Preview, fonte editável, arquivo exportado e publicação são entregas distintas. Declare perdas de conversão e valide o arquivo final; a extensão não comprova editabilidade ou funcionamento.

