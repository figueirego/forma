# Diagnóstico e refinamento cromático

Use quando uma paleta parece desequilibrada, um tema perde leitura, uma extração vira tokens ou um gradiente/material diverge da referência. Complete [sistema visual](visual-system.md), [adaptação](adaptive-visual-systems.md) e [acessibilidade](accessibility.md); não refaça o sistema inteiro para corrigir um par de cores.

O resultado útil é **problema observado → variável responsável → ajuste localizado → comparação → evidência e limite**. Uma correção pequena pode caber no próprio diff e na captura existente. O catálogo [Colorful](https://github.com/Siddharth11/Colorful) oferece caminhos de investigação, não um padrão de conformidade nem uma stack obrigatória.

## Diagnosticar antes de trocar a paleta

| Sintoma observado | Hipótese a conferir | Intervenção e critério |
|---|---|---|
| Duas cores com o mesmo HSL L parecem ter pesos diferentes | L do HSL não mede luminância nem uniformidade perceptual | Comparar no tamanho/contexto real; ajustar a função de cada cor, sem igualar números por obrigação |
| Tudo disputa atenção | Muitas áreas, contornos ou elementos com contraste/croma altos | Reduzir a presença dos secundários; a ação/conteúdo prioritário precisa continuar identificável |
| Texto some só em certas posições | Fundo composto, transparência, imagem ou gradiente varia | Conferir a região atrás do texto; mudar superfície/scrim, cor do texto ou posição conforme o caso |
| Marca e erro parecem a mesma ação | Semântica depende da mesma pista cromática | Separar papéis e acrescentar texto/ícone; repetir o teste com os dois estados juntos |
| Tema escuro parece uma versão lavada/invertida | Mapeamento inadequado de superfícies, estados ou contrastes | Ajustar tokens semânticos do tema, preservando reconhecimento e hierarquia |
| Cor extraída muda a cada imagem ou recorte | Amostragem seleciona fundo/pele/sombra em vez do elemento pretendido | Fixar região e regra de seleção; aceitar ou rejeitar candidatos pelo papel final |
| Meio do gradiente fica cinza, muito vivo ou em faixas | Interpolação, caminho de matiz, precisão ou exportação | Comparar percursos/stops no destino; não esconder qualquer defeito com grain |
| Cor do render difere do swatch CSS | Iluminação, material, exposição ou gestão de cor | Inspecionar o pipeline 3D antes de compensar o token da UI |

Comece com uma amostra problemática e uma correta. Fixe conteúdo, viewport, tema, estado e escala; documente perfil/gamut quando relevante. Identifique os tokens e a camada que os consome. Trocar o accent global para corrigir uma legenda pode introduzir erros em todos os controles.

Separe quatro perguntas: **a cor comunica o papel? o conteúdo é legível? a hierarquia é adequada? a reprodução é fiel?** Uma taxa de contraste responde apenas a parte da segunda. Aprovação estética não substitui as demais.

## Medidas que mudam decisões

| Termo | Uso prático e erro a evitar |
|---|---|
| Matiz — hue | Família cromática; ângulo depende do modelo. Não tratar graus de HSL e OKLCH como coordenadas equivalentes |
| Croma — chroma | Distância do neutro no espaço escolhido; não é porcentagem universal de “força”. O máximo reproduzível varia com matiz, lightness e gamut |
| Saturação | Medida relativa cuja definição depende do modelo; S do HSL, HSLuv e C do OKLCH não são intercambiáveis |
| Lightness | Estimativa/modelo da clareza percebida. L do HSL não é L do Oklab nem garantia de mesmo peso visual |
| Luminância relativa | Grandeza usada no cálculo de contraste WCAG; não usar diretamente o L de HSL/OKLCH como se fosse luminância |

HSL é conveniente para edição, mas não uniforme. Quando passos tonais ou mudanças de matiz geram resultados inconsistentes, experimentar Oklab/OKLCH pode tornar os ajustes mais previsíveis. Não migrar tokens existentes só para usar sintaxe moderna; conferir conversão e aparência final. [CSS Color 4](https://www.w3.org/TR/css-color-4/#the-hsl-notation), [Oklab, pelo autor](https://bottosson.github.io/posts/oklab/).

OKLCH continua sendo um modelo: igualar L/C não assegura contraste WCAG, saliência, distinção entre categorias ou aprovação da marca. Delta E pode auxiliar comparação de amostras sob condições definidas; não adotar um único limiar para texto, miniaturas, séries e grandes superfícies.

**Gamut:** preservar cor-fonte e destino. Um candidato fora de sRGB pode precisar de mapeamento; simples corte de canais pode alterar sua aparência. P3 é uma possibilidade de saída, não garantia de melhor design. Compare fallback sRGB e saída ampla nos destinos suportados; não certifique P3 por uma captura convertida para sRGB. [CSS Color 4 — gamut](https://www.w3.org/TR/css-color-4/#gamut-mapping).

## Composição, marca e significado

- Harmonias análoga, complementar ou triádica são maneiras de produzir candidatos. Escolha pelo papel e contexto, não por regra universal de beleza.
- Observe **área, frequência, posição, contraste local e croma juntos**. Um ponto vivo e um painel inteiro da mesma cor têm efeitos diferentes. Não impor distribuição 60/30/10.
- Compare neutros com o conteúdo real: um cinza discretamente quente/frio pode aproximar ou afastar imagens, pele, madeira ou metal. Temperatura é relativa à vizinhança, não uma emoção garantida.
- Verifique a mesma cor sobre fundos diferentes. Não “corrigir” o hex da marca apenas porque um fundo produz uma aparência distinta; primeiro avalie composição e contexto.
- Afirmações como “azul gera confiança” são hipóteses contextuais. Público, cultura, tarefa e convenções existentes pesam mais que uma associação psicológica universal.
- Comece pela hierarquia e agrupamento. Cor não deve encobrir conteúdo desorganizado, margens inconsistentes ou ausência de prioridade.

Para cada cor importante, nomeie o papel: marca, ação, foco, seleção, estado, categoria, decoração ou material. A mesma primitiva pode alimentar papéis distintos, mas esses papéis precisam poder evoluir separadamente. Marca vermelha e erro vermelho não constituem automaticamente uma falha: teste a combinação real e as pistas adicionais.

Uma rampa serve ao produto quando oferece pares utilizáveis: texto/superfície, borda/vizinhança, ícone/superfície e foco/vizinhança. Níveis numéricos iguais em duas rampas não prometem igual luminância ou contraste. Preserve uma variante autorizada de marca para contextos em que a cor principal não funciona.

Estados default, hover, pressed, selected, focus e disabled têm contratos diferentes. Não reduzir todos à mudança de opacidade. Estado selecionado precisa ser reconhecível; foco deve permanecer independente da seleção; erro precisa explicar a recuperação. Verificar adjacências exigidas pela norma, sem inventar obrigação de 3:1 entre todos os pares de estados.

Para temas e cores por contexto, use a precedência e persistência de [sistemas adaptativos](adaptive-visual-systems.md). Uma cor livre de biblioteca não deve reclassificar dados, trocar erro por sucesso ou alterar o accent sem intenção. Se o produto promete personalização, teste limites claros, escuros e saturados, não apenas o preset favorito.

## Gradientes, alpha e superfícies compostas

Antes de ajustar stops, diferencie a função: ambientação, iluminação simulada, preenchimento de marca ou codificação de dados. Registre só as variáveis relevantes: stops/posições, espaço de interpolação, caminho de matiz, alpha, composição e destino.

Comparar interpolação em sRGB, Oklab e OKLCH pode explicar um meio apagado ou saturado. Em modelos polares, o percurso curto/longo de matiz muda as cores intermediárias. Defina a intenção e teste suporte; não suponha que CSS, canvas, biblioteca e exportador compartilham defaults. [CSS Color 4 — interpolação](https://www.w3.org/TR/css-color-4/#interpolation).

Transparência exige avaliar o fundo. Confira alpha premultiplicado no pipeline próprio e não reproduza uma mistura apenas interpolando hex. `color-mix()` e sintaxe relativa ajudam a derivar candidatos; não escolhem automaticamente contraste seguro nem semântica. [CSS Color 4 — alpha](https://www.w3.org/TR/css-color-4/#interpolating-with-alpha), [CSS Color 5](https://www.w3.org/TR/css-color-5/).

Para gradiente atrás de texto, inspecione as regiões efetivamente ocupadas, incluindo mudança de conteúdo, posição e estado. A média do fundo ou somente os dois extremos não demonstra contraste mínimo. Scrim, superfície sólida ou reposicionamento podem ser mais robustos que trocar todas as cores.

Se houver banding, compare render original e arquivo exportado na escala de uso: precisão, compressão e distribuição de stops podem participar do defeito. Dithering/grain é opção estética/técnica contextual, não garantia de correção. Evite que ruído reduza legibilidade ou modifique a aparência aprovada do material.

Em blur/translucidez, teste conteúdo claro, escuro e movimentado atrás. O fallback sem transparência precisa conservar leitura, agrupamento e interação. Não atribua aos tokens um resultado produzido pela composição final.

## Extrair de imagem e escolher ferramentas

A extração produz **candidatos observados**, não cores oficiais de marca, pares acessíveis ou significado semântico. Se há identidade fornecida, compare com a fonte oficial antes de substituí-la.

Procedimento proporcional: delimitar imagem/região → conferir perfil, resolução e fundo → extrair candidatos → descartar pixels irrelevantes → atribuir papéis → testar pares e composição. Registre recorte/amostragem se a reprodutibilidade importar. Preserve versão anterior para comparar.

No produto, diferencie carregamento, falha de leitura e ausência de candidato. CORS, arquivo inválido ou resposta tardia não podem deixar outra imagem com a paleta anterior parecendo atual. Uma falha deve conservar uma superfície legível; extração local não autoriza enviar imagem privada a outro serviço.

| Necessidade | Caminho possível no Colorful | Limite a verificar antes de adotar |
|---|---|---|
| Converter, interpolar e explorar rampas | [Chroma.js](https://gka.github.io/chroma.js/) | Espaço/modo, clipping e versão; distribuição tonal não certifica contraste ou semântica |
| Extrair candidatos de imagens | [Color Thief](https://lokeshdhakar.com/projects/color-thief/) | Região, amostragem, formato, versão e leitura permitida; não confundir modo assíncrono com execução em worker |
| Escolher famílias para dados | [ColorBrewer](https://colorbrewer2.org/) | Tipo de variável, classes, domínio, legenda e tamanho; filtros de segurança não validam o gráfico inteiro |
| Rampa contínua para magnitude | [Cubehelix](https://people.phy.cam.ac.uk/dag9/CUBEHELIX/) | Parâmetros e resultado final; a família não torna qualquer configuração adequada |
| Obter primitivas de UI | [Open Color](https://yeun.github.io/open-color/) | Adaptar a papéis/temas reais; níveis não são pares automaticamente aprovados |
| Explorar harmonias ou direções | Adobe Color, Paletton e geradores do catálogo | Candidato precisa de julgamento de composição, direitos e teste no produto |
| Criar gradiente no runtime | CSS existente ou biblioteca do projeto; bibliotecas do catálogo apenas se necessárias | Capacidade, suporte, custo e manutenção; não instalar dependência para uma interpolação já resolvida |

Escolha primeiro a capacidade necessária; preserve tooling existente. Catálogo, documentação, biblioteca instalada e comportamento executado são evidências diferentes. Confirme documentação/versionamento atual antes de usar uma API. Licença CC0 do catálogo não relicencia ferramentas, imagens ou paletas externas.

## Dados, visão cromática e cores forçadas

Para dados, aplique [o contrato de dashboards](data-dashboards.md): qualitativa distingue categorias; sequencial representa ordem/magnitude; divergente precisa de centro significativo. Não transforme uma lista de cores bonitas em escala quantitativa sem domínio e legenda.

Confira a rampa **depois** de interpolação, conversão e exportação. Ordem tonal, mudanças abruptas, clipping e região neutra podem sugerir limites inexistentes. Se comparações exigem domínio fixo, não normalizar cada painel silenciosamente. Ausente, zero e selecionado precisam de sinais distintos.

Com muitas categorias, pare de acrescentar cores quando a leitura falhar. Agrupamento, rótulos diretos, símbolos, traços ou exploração por seleção podem resolver melhor. Não existe distância cromática universal que garanta distinção em todos os tamanhos e perfis de visão.

Use simulação de deficiências de visão cromática como diagnóstico complementar, não como prova de experiência individual. Escala de cinza ajuda a revelar dependência tonal, mas não substitui CVD nem contraste. Teste a tarefa: localizar série, reconhecer erro, identificar seleção e seguir link. [WCAG — uso da cor](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

Acrescente pistas adequadas: rótulo/ícone em estado, sublinhado em link conforme contexto, check na escolha, padrão/forma em dados. Informação gráfica e componentes necessários têm requisitos de contraste contra cores adjacentes; decoração e estados inativos têm tratamento distinto. [WCAG — contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

Em `forced-colors`, teste foco, bordas, seleção e ícones com cores do sistema. Sombras e certos fundos podem desaparecer; uma borda real pode preservar identificação. Não desligue globalmente a adaptação com `forced-color-adjust: none` para conservar branding. Exceções, como uma amostra cromática, precisam de nome/seleção legíveis fora da própria cor. [CSS Color Adjustment](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-mode).

## UI, material 3D e saída física

Um hex da UI e uma cor-base de material respondem a pipelines diferentes. Para 3D, separe albedo/base color de luz, roughness, metalness, reflexão, exposição e tone mapping. Confira color space das texturas e saída do renderer; mapas de dados não são automaticamente texturas de cor. Use [fidelidade 3D](3d-reference-fidelity.md) para comparar material, geometria e luz com condições fixas.

Não clareie a marca global para compensar uma cena subexposta. Ajuste o responsável e verifique outras poses/luzes suportadas. Metal dourado não é aprovado por um retângulo amarelo: leitura depende de reflexão, geometria, enquadramento e movimento. Teste o fallback 2D separadamente.

Em tela, registre destino e condições relevantes; screenshot comprova a captura, não todos os monitores. Para impressão, siga [produção de marca](brand-marketing.md): perfil, papel, tinta, acabamento e prova do fornecedor. Conversão genérica RGB→CMYK ou preview no navegador não comprova cor impressa. Não exigir prova física numa tarefa exclusivamente web.

## Dois exemplos de decisão

### A. Mesmo HSL L, legibilidade diferente

**Caso sintético:** botões amarelo `#ffff00` e azul `#0000ff`, ambos HSL com S=100% e L=50%, texto branco regular de 16 CSS px. O helper de sRGB opaco calcula **1,0738:1** no amarelo e **8,5925:1** no azul. Igual L não sustentou a premissa de contraste equivalente.

Se amarelo é a identidade aprovada, a correção localizada pode ser um token de texto escuro sobre esse preenchimento: preto/amarelo dá **19,5560:1**. Não há motivo automático para dessaturar toda a marca ou trocar a família cromática. Inspecione também borda, foco e estados; os três cálculos não certificam o botão completo.

Se o problema restante for “o amarelo ocupa atenção demais”, contraste do texto já está resolvido. Compare área/frequência do preenchimento ou uma variante secundária autorizada. Essa decisão precisa da composição renderizada; não decorre do resultado numérico.

### B. Gradiente de biblioteca vazando para estados

**Caso sintético:** a pessoa escolhe imagem vermelha para a biblioteca; a extração altera o accent, o fundo e o erro de formulário juntos. A hipótese principal é acoplamento de papéis, não “vermelho ruim”.

Separe cor ambiental do contexto, ação e erro; conserve texto de erro e indicação de seleção. Gere candidatos apenas para a área prometida pelo controle. Se o texto cobre o gradiente, teste a composição e adicione uma superfície legível quando necessário.

Validação: trocar por imagem clara/escura, falhar a extração, mudar tema e salvar/reabrir. Aprovar quando a preferência correta persiste, nenhuma resposta antiga colore o contexto novo e ação/erro/seleção continuam compreensíveis. P3 ou OKLCH podem ser irrelevantes para a causa desse defeito.

## Matriz mínima de confirmação

Execute apenas as linhas aplicáveis, cobrindo primeiro o defeito e seus consumidores compartilhados. Não criar todas as combinações cartesianas sem risco que justifique.

| Recorte | Conferir | Evidência útil |
|---|---|---|
| Papel alterado | Par de cores, significado e prioridade | Token/diff e comparação no conteúdo real |
| Estados do componente | Texto, ícone, borda, foco, erro/seleção | Estado acionado e cálculo quando aplicável |
| Temas/contextos suportados | Legibilidade, precedência e persistência | Mesmo fluxo nos recortes afetados |
| Gradiente/imagem/alpha | Fundo composto mais desfavorável relevante | Captura/região e método, sem média enganosa |
| Dados | Ordem, categorias, ausência, legenda e seleção | Valor conhecido e tarefa de identificação |
| Acessibilidade cromática | Pistas extras, CVD quando útil, forced-colors | Operação e leitura além do swatch |
| Render/exportação | Destino, perfil/gamut e fidelidade | Arquivo reaberto ou renderer real |

Use [verificação](verification.md) para registrar aprovado, falhou, inferido, não testado ou não aplicável com motivo. `check_contrast.py` aceita somente sRGB opaco; não converter entrada desconhecida silenciosamente nem anunciar avaliação de gradientes/P3. APCA ou ferramentas experimentais podem complementar pesquisa; não substituir por elas a aprovação WCAG 2.2 exigida pelo contrato.

O critério de saída é a resolução do defeito com os recortes relevantes verificados e limites declarados. Não prometer “paleta perfeita”, equivalência universal entre telas ou conformidade integral a partir deste módulo.

## Procedência e alcance

Síntese original: catálogo Colorful no commit `3af5997a081170eae9f745c2203a41f9fef316d1`, inspeção em 26/10/2026, combinado com os contratos existentes desta skill. Colorful reúne materiais heterogêneos; presença na lista não confirma manutenção, precisão ou acessibilidade de cada recurso.

Fontes técnicas vinculadas acima: CSS Color 4 era Candidate Recommendation Draft e CSS Color 5 Working Draft na consulta; verificar mudanças e suporte no alvo antes de depender de sintaxe. Textos “Understanding” da WCAG explicam critérios; a [WCAG 2.2](https://www.w3.org/TR/WCAG22/) é a referência normativa. Documentação de ferramentas sustenta o roteamento, não comprova execução de todas elas nem inspeção de todos os links do catálogo.
