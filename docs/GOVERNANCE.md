# Contribution governance

The official repository is maintained by `@figueirego`. The community contributes through forks and pull requests without receiving write access to the original repository. The maintainer decides scope, review, merges and versions.

## Main branch policy

The expected GitHub configuration uses two cumulative rulesets:

1. **main-integrity**, with no bypass: requires a PR, a passing `Validate Forma` check, an up-to-date branch and resolved conversations; prevents force pushes and deletion of `main`.
2. **main-owner-review**: requires one CODEOWNER approval and dismisses approvals after new commits. The maintainer has an exception for this review rule only within the PR workflow.

The exception exists because people cannot approve their own PRs. It does not bypass tests, unresolved conversations or the direct-push restriction, which belong to the first ruleset. Technically, the maintainer can also use this exception on external PRs; the policy reserves it for their own changes or exceptions justified in the PR. No independent review is claimed for a sole maintainer's own PR.

To require independent review for the maintainer as well, add another trusted reviewer with appropriate access and remove the exception. The owner always retains administrative power to change rules; policy files do not prevent that.

## Workflows and installation

Contributions run on a hosted runner without publishing secrets and with a read-only token. External contributors' workflows await execution approval. Checkout does not persist credentials. There is no auto-merge, npm publication or automatic update of consuming projects.

Changing skills on GitHub does not modify an existing installation. Users must update their clone or catalog and verify the installed version with their host's tools.

## Verify protections

The versioned definitions in this directory describe the desired state. Proving the server state requires querying active rulesets and the actual check, for example:

```sh
gh api repos/figueirego/forma/rules/branches/main
gh api repos/figueirego/forma/codeowners/errors
gh api repos/figueirego/forma/actions/permissions/workflow
```

Local files do not activate rules by themselves. Do not weaken protections to resolve a CI failure; fix the problem on a branch and submit a PR.

References: [rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets), [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [Actions security](https://docs.github.com/en/actions/reference/security/secure-use).
