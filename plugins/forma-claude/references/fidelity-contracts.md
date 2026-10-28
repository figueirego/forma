# Reproduzir sem reinterpretar o que já foi aprovado

Nesta distribuição, `<forma-root>` é a raiz deste plugin, que contém `.claude-plugin/`; contém `references/`, `assets/`, `scripts/` e `tests/`. Resolva-a a partir deste arquivo.

Use quando o pedido for **reprodução ou transferência fiel**. Para inspiração ou criação nova, defina critérios do novo produto; não imponha este editor, suas medidas ou seus gestos.

## Fixar o alvo e fechar a comparação

1. Registre o artefato aprovado, revisão e estado; se a implementação aprovada difere do estudo original, prevalece a escolha atual do usuário. Separe o que será preservado das adaptações autorizadas. Evidência histórica não é automaticamente regra atual.
2. Leia o componente existente e o perfil portátil. Reutilize código próprio disponível antes de reimplementar; se só há contrato, implemente-o na stack. Referências e checkers não importam um componente automaticamente.
3. Fixe os esperados **antes** de alterar o destino. Um teste que chama a mesma função nos dois lados, copia o resultado do destino ou regenera o baseline com ele não demonstra fidelidade. Versione o contrato; ampliar tolerância ou retirar um caso exige motivo e nova decisão, não conveniência para obter verde.
4. Colete modelo, caixas e estilos computados no navegador com os mesmos dados, viewport CSS, DPR, fonte, modo e seleção. Compare o papel visual real: se uma bolinha é pintada em `::before`, ler o fundo transparente do botão produz um falso defeito. Identifique a camada pintada em cada implementação; não use o token declarado como substituto da cor computada. Gestos exigem todos os elementos antes/durante/depois. Inspecione também capturas: medir coordenadas não prova clipping, material, legibilidade ou ausência de outro elemento por cima.
5. Compare, corrija dentro do escopo e repita os casos afetados. Falha ou medição ausente continua pendente; não some tudo em uma nota média. Verifique [identidade carregada e rascunhos](rendered-validation.md#aplicação-da-110-no-pauta--recorte-adaptação-e-identidade-da-execução), persistência, erro e acesso separadamente. Só anuncie aprovação dos critérios comprovados.

## Verificador portátil

`python3 <forma-root>/scripts/check_fidelity.py <contract.json> <observation.json>`

Python3.9+, stdlib, leitura local. O script não abre o navegador, não executa o aplicativo, não altera preferências e não usa rede. Ele reprova medições divergentes, ausentes, duplicadas, valores não finitos, tipos incompatíveis e evidências locais inválidas. Não aceita um `status:pass` no lugar da medição. Exit0 significa que **os valores fornecidos** satisfazem o contrato; não confirma a veracidade da coleta, a completude dos requisitos ou fidelidade visual integral. Exit1 indica divergência/incompletude; exit2, falha de leitura/JSON.

Contrato mínimo, com critérios independentes da observação:

```json
{
  "schema_version": 1,
  "profile_id": "meu-componente-revisao-aprovada",
  "checks": [
    {"id":"stage.height","kind":"number","expected":206,"tolerance":1},
    {"id":"selection","kind":"exact","expected":[false,true,false]}
  ]
}
```

Observação correspondente, preenchida apenas depois de medir:

```json
{
  "schema_version": 1,
  "profile_id": "meu-componente-revisao-aprovada",
  "results": [
    {"id":"stage.height","actual":206,"artifact":"captures/measurements.json"},
    {"id":"selection","actual":[false,true,false],"artifact":"captures/measurements.json"}
  ]
}
```

O exemplo é ilustrativo e não foi executado. `artifact` deve apontar para arquivo local não vazio dentro da pasta da observação, relativo, sem `..`, caminho absoluto ou symlink. Guarde capturas/traços brutos suficientes para revisar a origem dos números; existência do arquivo não prova seu conteúdo. Tolerância pertence ao contrato, nunca à observação. `number` compara escalares finitos e não aceita booleanos; `exact` compara valores JSON e tipos, inclusive dentro de listas/objetos. Não arredonde a observação para ocultar erro.

O contrato pode ser pequeno para uma correção local. Uma seleção parcial deve ter escopo/identificador próprio e resultado igualmente parcial; nunca remover checks do contrato completo para anunciar aprovação completa. Não exigir este formato se os testes existentes já comparam os mesmos invariantes com evidência equivalente.

## Amostra do editor compacto aprovado

[Perfil e semântica](../assets/reference-profiles/compact-appearance-v1.json) e [medições congeladas](../assets/reference-profiles/compact-appearance-v1.fidelity.json) têm papéis distintos. O primeiro especifica o mecanismo; o segundo fornece uma amostra de regressão medida em Chromium, DPR1, movimento reduzido, viewport1440×900/ponteiro fino e375×900/toque emulado. A referência é independente do consumidor. Não é componente executável nem exige instalar/acessar o projeto de autoria.

IDs `visual.<largura>.<light|dark>.<2|3>.<campo>` referem-se a primeira abertura limpa com2 pools e ao + que cria3, em cada modo. Contêm painel/stage, âncoras relativas dos controles, onda/dial, cor/posição/seleção dos pontos e string computada do gradiente. Coordenadas `points.<índice>.x/y` são percentuais do stage, com tolerância.01 ponto percentual; caixas usam CSS px com tolerância1. Seleção, cores e gradiente são comparações exatas dentro desse contexto de serialização CSS.

IDs `gesture.<mouse|touch>.<etapa>.<campo>` comparam a trajetória inteira dos3 pontos. A sequência é: defaults→+; arrastar o selecionado para30%/40%,50%/60%,85%/80%; soltar; ArrowUp; Shift+ArrowLeft; Alt+ArrowDown. Reabrir defaults→+; iniciar anel no ângulo0°/raio25px e mover para1,2,3,4,5,6,8,10,15,60,120,180,240,260,220,180,120,60,0°; soltar. O traço amostra cada passo após atualizar a prévia. `ring-<índice>-<graus>` conserva a identificação da amostra; `ring-down-no-jump` e `ring-up` verificam início e término. Não substituir o gesto por atribuição direta ao estado.

Colete esses campos por um adaptador dos seletores/componentes reais do destino. Não copiar `expected` para `actual`. Registre viewport e modos realmente observados fora do JSON mínimo e retenha os traços/capturas brutos. Um alias CSS de fonte diferente pode carregar os mesmos bytes; confira a fonte efetiva, não apenas o nome. Outra engine pode serializar CSS de modo diferente: investigue/normalize semanticamente em contrato separado antes de alegar divergência visual; não reduza uma comparação de gradiente a uma única cor.

Esta amostra **não cobre tudo**: inclui layout/cor de2/3 luzes e parte dos gestos; não certifica fonte carregada, reset, remoção, vazio, Alt+arrasto, giro10°/90 eventos, save/reload, migração, falha, contexto/hold, grain nãozero, clipping/foco ou identidade da aba. Exercite esses casos quando o editor completo for contratado, conforme [regressões do editor](lighting-editors-icons.md#regressões-do-contrato-completo). A amostra portátil é uma defesa adicional, não um substituto da matriz completa.

## Provar que a defesa detecta defeitos

Além do caso correto, introduza em cópias de teste um ponto externo preso à borda, deslocamento de outro pool sob operação individual, cor/gradiente divergente, estágio redimensionado, seleção errada ou ausência de um ponto. O verificador deve falhar pelo dado afetado. Teste também ausência de evidência e tentativa de alterar tolerância na observação. Não modificar o produto ou baseline aprovado para criar esses casos.

Um resultado verde é necessário para as medições contratadas; inspeção renderizada, acesso, persistência e concordância do usuário continuam separados. Scripts não tornam a skill infalível.
