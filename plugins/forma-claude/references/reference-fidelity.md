# Fidelidade visual e tecnológica

Use quando o usuário pedir reproduzir um sistema, extrair uma referência ou apontar que o resultado não segue a referência. Não aplique o perfil material de referência automaticamente a outros projetos.

## Contrato antes da implementação

Distinguir inspiração, adaptação e reprodução. Se o usuário corrigir a fidelidade, não continuar usando a paleta autoral como se fosse equivalente. Declare quais superfícies, estados e mecanismos serão reproduzidos e quais pertencem a outro produto. Registre fonte, versão, hash, localização, evidência estática/runtime e limites.

Quando o usuário escolher uma implementação já aprovada, ela prevalece sobre um estudo histórico de outro aplicativo. Para o editor compacto aprovado, consulte [seu perfil](../assets/reference-profiles/compact-appearance-v1.json) e [comparação por contrato](fidelity-contracts.md). Marca, proporções ou gestos só mudam dentro das adaptações autorizadas; nomes de projetos não são presets universais.

## Extração em cinco camadas

1. **Primitivos:** valores exatos, unidades, espaço de cor, fontes/pesos/subsets/licença, raios e dimensões.
2. **Semântica:** fill de ação, on-fill, accent-text, superfície, ambiente, texto secundário, seleção, foco e estados. A mesma família pode ter três cores distintas no mesmo modo.
3. **Composição:** ordem de camadas, transparência sobre o fundo efetivo, blur, stops de gradiente, elevação por papel e geometria. Uma cor correta no papel errado não é fidelidade.
4. **Estado:** padrão CSS, override JS, preferência persistida, contexto do conteúdo, tema resolvido, alto contraste e movimento reduzido. Não confundir default estático com resultado final.
5. **Tecnologia:** manifesto declarado, versão realmente empacotada, callsite do recurso e execução observada. Presença de Three não prova que todo WebGL usa Three; versão de framework instalada não é runtime medido.

Extraia tabelas e fórmulas necessárias, não um dump integral do bundle. Identifique offsets de caracteres versus bytes. REA parcial, timeout ou grafo truncado deve permanecer parcial no relatório. Aproveite evidência retida, estreite arquivos; não repetir análise ampla sem mudar o escopo. Leitura direta de tokens é evidência estática independente, não sucesso retroativo de AST.

## Implementação rastreável

Crie uma tabela: propriedade → fonte → valor/papel original → implementação → adaptação → verificação. Preserve os valores originais no perfil de referência; não sobrescreva a evidência com as adaptações do produto.

Mantenha ação e ambiente independentes quando a referência o fizer. Migre IDs antigos de preferência e valide números finitos conforme o domínio de cada campo: limites do ponteiro/stage não são limites universais do modelo; coordenadas externas válidas precisam sobreviver à pintura e persistência. Mantenha cancelamento reversível e só confirme persistência após sucesso. Um controle de ambiente fixo não equivale a editor livre de campos/ruído/contexto.

Escolha a tecnologia pelo mecanismo necessário. CSS OKLCH/color-mix e fonte correta podem reproduzir cores em vanilla JS; isso não autoriza dizer que usa a mesma stack React/Electron. Uma casca de navegador não comprova app nativo, instalador, IPC ou atualização automática.

## Três gates independentes

- **Funcional:** preview, salvar/recarregar, cancelar/Escape, reset, sistema, migração, storage indisponível e sincronização.
- **Acessibilidade:** texto sobre fundo composto, teclado, foco, alvos, redução de movimento/transparência. Não inferir contraste de gradientes por um único token.
- **Fidelidade:** pares por modo, fonte efetivamente carregada, geometria, opacidade, composição e estados comparados com viewport/conteúdo equivalentes.

Passar em contraste não aprova fidelidade. Se o original falha em contraste, preserve fill quando possível e registre adaptação de on-fill/texto por papel. Não chame a adaptação de cópia exata. Não conclua por uma nota global ou pela quantidade de tokens extraídos.

## Referência desktop auditada — artefato 0.19.0

Consulte sob demanda `../assets/reference-profiles/desktop-material-reference-v1.json` (inspeção estática do artefato local). Onze famílias; blue dark fill #3d6fe6, ink branco e accent-text #7ea6ff. Superfície dark #131315 sobre ground #0e0e10. Inter Variable é a fonte da UI; Geist Mono e Source Serif 4 têm papéis específicos.

Ambiente: hue181, chroma.038, grain0; dois pools com geometria e luminância próprios por modo, nove stops smoothstep e base/highlight separados. `hold` bloqueia influência contextual; não desliga iluminação. Cor contextual com chroma>.02 pode alterar hue e elevar chroma configurado ×1.45 (máximo.09). Leia o perfil para fórmula/precedência completas. O contexto observado estaticamente não foi exercitado em runtime neste estudo.

React/ReactDOM18.3.1 presentes no renderer; Electron no shell; Three0.186.0 em livros; perfil usa WebGL2 direto; grafo usa canvas/worker; mola customizada não comprova Framer Motion. Dependências de PDF, IA local ou SQLite não são pré-requisitos para reproduzir aparência.

## Entrega

Mostre resultado visual atual, diferenças intencionais e lacunas. Diga se comparação runtime da referência não foi possível. Não declarar perfeito, pixel-perfect ou paridade integral com base apenas em extração estática. A aprovação visual do usuário continua separada dos checks técnicos.
