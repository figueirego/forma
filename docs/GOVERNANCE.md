# Governança das contribuições

O repositório oficial é mantido por `@figueirego`. A comunidade contribui por forks e pull requests, sem receber acesso de escrita ao repositório original. O mantenedor decide escopo, revisão, merge e versões.

## Política da branch main

A configuração esperada no GitHub usa dois rulesets cumulativos:

1. **main-integrity**, sem bypass: exige PR, check `Validate Forma` aprovado e branch atualizada, conversas resolvidas; impede force push e exclusão de `main`.
2. **main-owner-review**: exige uma aprovação do CODEOWNER e descarta aprovações após novos commits. O mantenedor tem exceção somente no fluxo de PR para esta regra de revisão.

A exceção existe porque uma pessoa não pode aprovar seu próprio PR. Ela não libera os testes, as conversas pendentes nem push direto, que pertencem ao primeiro ruleset. Tecnicamente o mantenedor pode usar a exceção também em PRs externos; a política é reservá-la a alterações próprias ou exceções justificadas no PR. Não há alegação de revisão independente de um PR do único mantenedor.

Para tornar revisão independente obrigatória também para o mantenedor, adicione outro revisor confiável com acesso apropriado e remova a exceção. O proprietário sempre conserva poderes administrativos para alterar regras; arquivos de política não impedem isso.

## Workflows e instalação

Contribuições executam em runner hospedado, sem secrets de publicação e com token de leitura. Workflows de contribuidores externos aguardam autorização de execução. O checkout não preserva credenciais. Não há auto-merge, publicação npm ou atualização automática de consumidores.

Alterar as skills no GitHub não modifica uma instalação existente. Consumidores devem atualizar o clone/catálogo e conferir a versão instalada conforme as ferramentas de seu host.

## Verificar as proteções

As definições versionadas nesta pasta são o estado desejado. A comprovação do servidor exige consultar os rulesets ativos e o check real, por exemplo:

```sh
gh api repos/figueirego/forma/rules/branches/main
gh api repos/figueirego/forma/codeowners/errors
gh api repos/figueirego/forma/actions/permissions/workflow
```

Os arquivos locais não ativam regras por si só. Não enfraqueça as proteções para resolver uma falha de CI; corrija o problema em uma branch e envie PR.

Referências: [rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [segurança no Actions](https://docs.github.com/en/actions/reference/security/secure-use).
