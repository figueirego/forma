# Recursos executáveis e contratos

Neste plugin, `<forma-root>` é a pasta que contém `.codex-plugin/`, `references/`, `assets/`, `scripts/` e `tests/`; não é a pasta de uma especialista. Resolva-a a partir deste arquivo.

Consulte quando precisar reutilizar um asset ou executar um verificador. Os caminhos são relativos à raiz da skill instalada, não ao diretório de um projeto anterior.

## Disponibilidade

**Consulta executável:** a [biblioteca de referências](reference-library.md) inclui catálogo com procedência, `scripts/references.mjs` para seleção local e [página de consulta](../assets/reference-browser.html). `scripts/media.mjs` pesquisa coleções abertas e baixa somente um resultado explicitamente escolhido, com recibo/créditos e limites de rede/arquivo. Consulta local precisa de Node 18+; mídia de Node 22+ e rede. As fichas de implementação e os casos de investigação são da Forma; os índices de 202 sites e 2.079 portfólios conservam nomes/URLs e procedência externos. A coleção de portfólios é selecionada com `--portfolios`; URLs malformadas ficam em quarentena e a cobertura tem recibo próprio. As associações de casos não são verificações atuais dos sites. Mídia pesquisada mantém a autoria e a licença externas. O guia descreve comandos, opções, coleta pelo navegador do host e limites.

**Código portável disponível:** `BookObject`, helper de cores `assets/library-colors.js` e [base de interface limpa](clean-shell.md), com CSS encapsulado e exemplo HTML/JS funcional. A base fornece composição e controles demonstráveis; rotas, dados e ciclo de vida devem ser integrados na stack escolhida. **Contratos a implementar:** editor completo de aparência e iluminação e perfil material. Não confundir o tema do exemplo com o editor de pools. Reutilize os componentes existentes do projeto e implemente somente o que faltar.

**Conhecimento documentado:** [passaporte articulado](passport-polish-case-study.md), com manifesto de revisão e lições de geometria/material/desempenho. O código do passaporte permanece no consumidor e não é um novo componente exportado pela skill.

Execute pelo caminho absoluto da pasta em que esta skill estiver instalada. Os scripts `check_*` precisam apenas de Python 3.9+, não usam rede nem alteram o projeto. As regressões dos componentes usam Node; geometria real usa o módulo Three fornecido pelo consumidor:

- `python3 <forma-root>/scripts/check_evidence.py <report.json>` verifica integridade e cobertura de um registro de evidências. Formato e limites em [verificação](verification.md).
- `python3 <forma-root>/scripts/check_fidelity.py <contract.json> <observation.json>` compara cada medição requerida com valores esperados independentes; faltas e divergências falham. [Formato, coleta e limites](fidelity-contracts.md); [amostra congelada do editor compacto](../assets/reference-profiles/compact-appearance-v1.fidelity.json). Não coleta navegador, compara pixels ou certifica o produto.
- `python3 <forma-root>/scripts/check_contrast.py '#111827' '#ffffff' --threshold 4.5` calcula contraste WCAG para duas cores sRGB opacas. Não valida gradientes, transparência ou conformidade da interface.
- `python3 <forma-root>/scripts/check_layout.py <layout.json>` verifica contratos geométricos declarados sobre caixas medidas: alinhamento, centro, inset, gap, contenção e overflow. Não avalia qualidade perceptual sozinho; formato e limites em [contratos espaciais](layout-spatial-contracts.md).
- `python3 <forma-root>/scripts/check_package.py --root <forma-root>` verifica estrutura, links locais e inventário; no plugin, também manifesto, namespace e proveniência. Comparação opcional com instalação e ZIP em [operação do plugin](plugin-operation.md). Não executa um agente, testa UI ou instala recursos.
- [Tokens de exemplo](../assets/tokens.example.json) e [evidência de exemplo](../assets/evidence.example.json) são pontos de partida, não evidência de um projeto real. Nunca copie um status aprovado sem executar o teste.
- [Base de interface limpa](../assets/clean-shell.html) demonstra sidebar, superfícies, botões, busca textual, campos e temas; [CSS](../assets/clean-shell.css) encapsulado e [JS de demonstração](../assets/clean-shell.js) sem dependências externas. A criação de itens é em memória; não constitui backend, busca semântica ou integração automática ao consumidor.
- [BookObject](../assets/book-object.js) é uma implementação original de capa Canvas2D e volume Three opcional, com material, marca, rótulo da lombada e pose configuráveis; contrato, diferenças da referência e exemplo em [objetos reutilizáveis](reusable-objects.md). Não exige rede ou instalação para o modo estático. Regressões de contrato, geometria e material: `node --test <forma-root>/tests/book-*.test.cjs`. Use `BOOK_THREE_MODULE=/caminho/absoluto/three.module.js` para incluir malhas reais; sem ele, os testes dependentes registram skips, não aprovação. O [caso aprovado](book-polish-case-study.md) contém hashes, síntese da auditoria e localização e limites do histórico externo.
- `assets/library-colors.js` resolve cores automáticas por ID e variações de material sem DOM ou dependências; não é o alocador de cores por lista da referência. Contrato em [objetos reutilizáveis](reusable-objects.md#cor-automática-portátil); regressões: `node --test <forma-root>/tests/library-colors.test.cjs`.

## Experiências de referência

- [Protocolo](experience-library.md): converter pesquisa em decisões, mecanismos e critérios de teste, com limites de autoria.
- [Estudos delimitados](site-experiences.md): três fontes atuais observadas no desktop, incluindo leitura estática de código público licenciado; não são componentes nem auditoria dos 202 sites.
