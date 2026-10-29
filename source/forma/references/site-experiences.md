# Estudos de sites: técnicas e limites

Amostra investigada em 29/10/2026, no navegador IAB, viewport CSS **1280 × 720**, DPR **2**. Os três estudos abaixo são delimitados; não representam auditoria dos 202 sites. A consulta ao índice continua marcada como candidata histórica. Não foram copiados código, mídia ou fontes para o pacote, nem instaladas dependências desses sites. Capturas brutas de terceiros ficam fora da distribuição. Para repetir ou ampliar, use o [protocolo de experiências](experience-library.md).

## Controles ligados à prévia

**Fonte:** [DialKit](https://www.dialkit.dev/). **Observado:** o controle de peso tipográfico passou de 450 a 800 pela tecla End; o `font-weight` computado do título acompanhou a alteração. Isso confirma essa interação desktop, não todos os controles.

**Código lido:** [store](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/store/DialStore.ts#L516), [normalização](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/numeric.ts#L9) e [adaptador React](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/src/hooks/useDialStorePanel.ts#L47). Snapshot `1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c`, pacote 2.1.0, [MIT ©2026 Josh Puckett](https://github.com/joshpuckett/dialkit/blob/1ef9fe8c3abfe7fd3338b45e5f4350407d49ac2c/LICENSE). Há store compartilhado e adaptadores; não foi comprovado que esse commit está publicado no site. Testes upstream não foram executados.

**Decisão Forma:** preservar uma fonte de estado para controle e prévia, normalizar todas as entradas e liberar assinaturas ao desmontar. O caminho programático lido não normaliza todos os sliders; autosave de presets também não equivale a Salvar/Cancelar. Portanto, não transferir essas políticas para nossos editores.

**Aplicação documental:** [contrato de controles](component-patterns.md#controles-numéricos-e-prévia). Implementação no consumidor permanece pendente. Testar teclado, ponteiro, setter, extremos, passos fracionários, reset, cancelamento e controles vizinhos.

## Tipografia demonstrada no conteúdo

**Fonte:** [PP Neue Montreal](https://neuemontreal.com/). **Observado:** navegação por seções e comparação de pesos em título/texto. Clicar em Weights levou à região de demonstração. O DOM declarou `Framer b354274`; o título inicial usou família PP Neue Montreal Text Regular e 24px. Isso não identifica o mecanismo de todas as animações.

**Decisão Forma:** comparar título e leitura com conteúdo real, acentos e números; guardar tamanho, peso, entrelinha e comprimento de linha como papéis distintos. A amostra visual com texto muito fino sobre vídeo exige teste de legibilidade, não adoção automática. Use o [sistema visual](visual-system.md) e [contratos espaciais](layout-spatial-contracts.md).

**Direitos e limites:** fonte comercial e assets não foram incorporados; licença de reuso não foi estabelecida neste estudo. Reconstrução independente usa fontes autorizadas do projeto. Não foram testados mobile, leitor de tela, todos os estados de rolagem ou redução de movimento. Validação no consumidor deve cobrir essas condições e fallback de fonte.

## Dados com representação textual

**Fonte:** [relatório de software em saúde da thoughtbot](https://thoughtbot.com/healthcare-software-delivery-report). **Observado:** regiões editoriais, estatísticas, listas comparativas e seção de metodologia. O DOM expôs valores por rótulos acessíveis, como percentual, e oito elementos canvas. O recorte capturado durante a entrada mostrou contagem intermediária; não usar esse frame como valor final.

**Decisão Forma:** separar dados finais da animação de apresentação e manter representação textual equivalente. A existência de canvas não comprova WebGL nem uma biblioteca específica. Quando um contador anima, teclado/leitor e captura de comparação devem distinguir transição de resultado estável. Use [dados e dashboards](data-dashboards.md).

**Direitos e limites:** não reutilizamos números de pesquisa como dados do produto, nem código/assets do site. Não auditamos validade científica, leitor de tela real, desempenho ou comportamento mobile. Para o consumidor, comparar valores/legenda/texto, interromper animação, testar movimento reduzido, carregamento e ausência de dados.

## O que entra no repertório

Entram perguntas, decisões, contraindicações, fontes e caminhos de verificação. O código público pode ser estudado ou adotado conforme licença; não se torna autoria Forma por receber outro nome. Uma experiência só passa a validada no destino quando houver consumidor e prova próprios. Os demais sites continuam como candidatas para investigação conforme o caso de uso.
