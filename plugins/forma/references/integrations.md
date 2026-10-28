# Integrações opcionais e operação honesta

Esta skill sintetiza critérios e pode trabalhar localmente. Não é um wrapper que executa todos os plugins em toda tarefa. Descubra ferramentas disponíveis por nome/descrição; leia a skill operacional atual antes de usar cada serviço. Não suponha que instalação, autenticação e ferramentas disponíveis são a mesma coisa.

| Fonte/ferramenta | Quando ajuda | Fronteira operacional |
|---|---|---|
| Design Taste Frontend | Composição e identidade de landing/portfólio | Não aplicar suas regras de marketing a dashboards/nativo |
| Design Motion Principles | Criar ou auditar movimento | Escolher workflow adequado e respeitar reduced motion |
| Impeccable | Refinar, estruturar, auditar e adaptar UI | Em trabalho real de UI, rodar context conforme a skill; autoria desta síntese não é edição de interface |
| UI/UX Pro Max | Consultar padrões, fontes e stack | Busca curta, domínio explícito, verificar pertinência; output é recomendação |
| API Design | Traduzir contratos para estados de UI | Preservar API existente; não impor envelope/versionamento desnecessário |
| ECC `design-system` | Extrair tokens e auditar consistência | Evidência por dimensão; estética não compensa falha funcional |
| ECC `research-ops` / `agent-architecture-audit` / `eval-harness` | Estudar agente, rastrear falha entre camadas ou avaliar contratos de execução | Escolher pelo problema; distinguir instrução, mecanismo e prova. Evals não se resumem à contagem de chamadas |
| LangChain / Deep Agents / Design Agent | Integração opcional quando for necessário executar um agente separado | Métodos podem ser usados no host atual; seguir [produção coordenada](agent-production.md). Nome no documento não instala grafo, modelo, serviços ou conector |
| ECC `continuous-learning-v2` | Curar correções de uma sessão para melhorar a skill quando solicitado | Separar caso local de princípio transferível; não ativar hooks/observador nem promover preferências globais como efeito colateral. Ver [evolução de produto aprovado](approved-product-evolution.md) |
| ECC `frontend-design-direction` / `make-interfaces-feel-better` | Definir direção ou investigar refinamento de interação | Escolher pela lacuna, preservar marca e escopo local; não aplicar ambos por padrão |
| ECC `motion-foundations` / `frontend-a11y` / `browser-qa` | Movimento, acesso ou reprodução no navegador | Usar só o fluxo pertinente; leitura não comprova execução ou conformidade |
| Product Design | Pesquisa, ideação, auditoria de fluxos e protótipos | Ler router e workflow; captura real para auditoria, comparação de fonte/render para fidelidade |
| Open Design | Produzir/refinar artefatos no ambiente do plugin | Requer runtime/MCP local; respeitar modo escolhido, brief e deduplicação de execução |
| AI Graphic Design | Peças, slides e moodboards | Usa Superdesign; texto editável, assets classificados, quantidade/custo conforme contrato |
| 01 Superdesign | Direções visuais, canvas, variantes e componentes | Reusar projeto/contexto válido; sem init de repo para peça gráfica isolada |
| Font Pairing: Design & Brands | Comparação de famílias e papéis tipográficos | Famílias/variantes suportadas, licença e glifos verificados; não obrigar trio |
| Figma | Fonte de design, variables, components, protótipo e handoff | Ler skills do caso, preservar IDs/instâncias, verificar render e assets |
| REA | Evidência de artefatos e runtimes existentes | Aplicar [REA](rea.md), sem confundir estático com executado |

## Escolher apoio durante o refinamento

Use a relação **lacuna de evidência → apoio escolhido → resultado esperado → aplicação no alvo**. A tabela acima fornece opções, não uma lista de dependências obrigatórias. Por exemplo: gesto abrupto → skill de motion para investigar continuidade/interrupção → mudança localizada → confirmar a interação renderizada. Para uma inconsistência ainda sem causa, ECC Design System ou Impeccable podem orientar a auditoria; se o código local já explica um padding incorreto, corrija diretamente.

Antes de acionar apoio, formule a pergunta concreta e qual resultado mudaria sua decisão. Confira instalação/conexão e leia a skill operacional atual. Se faltar uma capacidade, use alternativa compatível e declare o limite; não instale, assine ou envie material privado a outro serviço apenas para completar a lista.

A coordenadora seleciona a especialista interna conforme [roteamento](routing.md); os apoios desta página não substituem essa seleção. Quando o usuário pedir ECC, use a skill ECC pertinente de verdade, resolvida no catálogo/instalação atual. O ECC organiza skills e receitas por caso; não implica executar toda a coleção, nem fornece autodescoberta comprovada dos módulos aninhados desta skill. Quando outro apoio for explicitamente solicitado, inclua-o no plano e leia seu contrato atual; não ignore a instrução sob a justificativa de minimizar contexto.

Busque novas referências quando faltar um padrão de interação, uma direção ou uma explicação técnica. Restrinja a investigação ao caso relevante e compare papel, plataforma e evidência. Uma referência visual adicional não substitui rastrear o mecanismo de um defeito técnico. Preserve a identidade aprovada; constantes de outra referência não se tornam tokens do projeto por padrão.

Quando uma revisão independente puder revelar um ponto cego, delegue uma pergunta delimitada com fonte, estado e critério. Separe auditoria de edição; atribua arquivos quando houver implementação paralela. Consolide no mesmo diagnóstico, resolvendo divergências por evidência. No registro existente, bastam lacuna, apoio usado, resultado, decisão e verificação; ajustes pequenos não exigem novo relatório.

## Figma

Para design-to-code, carregue a skill correspondente antes de get_design_context, inclua seus parâmetros requeridos e obtenha screenshot. Inspecione biblioteca/Code Connect e reutilize componentes mapeados. Código retornado é referência a adaptar, não implementação funcional garantida. Nunca use screenshot completo como substituto de interface.

Para edição no canvas, inspecione primeiro as convenções e nós existentes. Use auto layout, variables e componentes onde apropriado. Preserve IDs retornados, trate tentativas parciais sem duplicação e compare a composição renderizada. Não invente link de arquivo nem publique biblioteca sem autorização.

Para tokens/componentes, carregue a skill operacional de biblioteca além da API de edição quando ela exigir. Declare escopo (fundação, componente, biblioteca ou reconciliação), reutilize assets compatíveis e verifique aliases, bindings, propriedades/variantes e modos resolvidos; aparência igual não confirma conexão ao token. Não transformar um pedido de componente em biblioteca inteira. Confira o contrato de serialização e recuperação atual antes de mutações concorrentes ou retry.

## Open Design e Superdesign

Esta síntese não instala aplicativo, configura MCP, conecta conta ou inicia geração paga. Quando uma tarefa futura precisar dessas ações, consulte o contrato do plugin e a autorização da sessão. Não execute o utilitário de sistema macOS chamado od como se fosse Open Design.

Preserve modo de execução e IDs de uma geração; polling não é nova geração. Uma falha de autenticação/crédito não autoriza trocar provedor. Ao usar canvas, retorne somente URLs realmente fornecidas pelo serviço. Não faça upload de repositório inteiro ou assets privados como contexto por padrão.

## Fallback

Escolha uma rota principal por artefato: Figma existente → contexto/componentes/implementação; repositório existente → edição local com sistema atual; peça gráfica → um canvas adequado; investigação de binário → REA. Open Design e Superdesign são alternativas de produção, não etapas obrigatórias sucessivas. Registre ferramenta responsável, projeto/draft/node IDs reais, artefatos e condição de saída. Troque rota por bloqueio concreto ou preferência do usuário, preservando decisões e ativos; não gere o mesmo trabalho pago em dois serviços por padrão.

Se uma ferramenta faltar, informe qual parte depende dela. Continue brief, especificação, código local ou auditoria de evidência disponível que não dependa da ferramenta. Não chame isso de execução do plugin. Dependências opcionais não devem bloquear um ajuste simples de spacing.

Para escolha entre repertórios/skills, consulte [casos de uso das fontes](source-use-cases.md). Revisar documentação de uma integração não implica ter criado um artefato nela. Se a tarefa for sintetizar princípios, não inicie geração, autenticação ou instalação apenas para marcar o plugin como utilizado.
