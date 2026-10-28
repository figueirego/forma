# Contribuir com a Forma

Contribuições são propostas por pull request. Faça um fork, crie uma branch e explique o problema antes de ampliar o escopo. Para uma mudança grande de comportamento, abra uma issue para discutir o objetivo.

## Fluxo

1. Edite a fonte em `source/forma/`, ou o tooling em `tools/` quando necessário.
2. Preserve decisões aprovadas e a marca do consumidor; um exemplo específico não deve se tornar regra universal.
3. Execute `npm ci --ignore-scripts`, `python3 tools/build.py` e `npm run check`.
4. Inclua fonte e arquivos gerados no mesmo PR. Use um commit descritivo, por exemplo `fix: preservar posição das luzes ao selecionar`.
5. Descreva o antes/depois e a verificação realizada. Aguarde a revisão de `@figueirego`.

Os comandos exigem Python 3.12+ e Node 24+. Three.js está fixado no lockfile para os testes de geometria. Instalar dependências de teste não instala uma stack nos projetos atendidos pela Forma.

## Qualidade e evidências

- Mudança visual: inclua capturas sem dados pessoais, viewport/DPR, estados relevantes e interações exercitadas.
- Bug: inclua reprodução mínima e regressão quando prática.
- Roteamento/instruções: inclua casos esperados e adversos; mantenha explícito o que foi simulado e o que foi executado.
- Fontes externas: preserve atribuição e licença. Não copie código, capturas privadas, marcas, binários ou conteúdo extenso sem direito de redistribuição.
- Nunca inclua credenciais, dados de clientes, caminhos pessoais ou conversas privadas.
- Não afirme que um teste estrutural comprova percepção visual, acessibilidade completa ou fidelidade universal.

Alterações em workflows, dependências, gerador, testes e políticas exigem atenção especial: elas podem enfraquecer a própria validação. Não introduza `pull_request_target`, tokens privilegiados ou publicação automática para executar contribuições.

## Revisão e licença

O mantenedor pode pedir ajustes ou recusar uma proposta. Não existe merge automático. A execução de workflows de contribuidores externos pode aguardar aprovação; isso é separado da aprovação da alteração.

Ao contribuir, envie apenas material que você pode distribuir sob a [MIT](LICENSE), preservando os avisos compatíveis de terceiros. Veja [governança](docs/GOVERNANCE.md) e [segurança](SECURITY.md).
