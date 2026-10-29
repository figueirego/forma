# Contributing to Forma

Propose contributions through pull requests. Fork the repository, create a branch and explain the problem before expanding the scope. Open an issue to discuss the goal of a major behavior change.

## Workflow

1. Edit the source in `source/forma/`, or the tooling in `tools/` when necessary.
2. Preserve approved decisions and the consumer project's brand; a specific example must not become a universal rule.
3. Run `npm ci --ignore-scripts`, `python3 tools/build.py` and `npm run check`.
4. Include source and generated files in the same PR. Use a descriptive commit, such as `fix: preserve light positions on selection`.
5. Describe the before/after behavior and the verification performed. Wait for review by `@figueirego`.

These commands require Python 3.12+ and Node 24+. Three.js is pinned in the lockfile for geometry tests. Installing test dependencies does not install a stack in projects served by Forma.

## Quality and evidence

- Write Forma-authored content in US English with ASCII punctuation. Preserve original source names, URLs, copyright holders and multilingual behavior. `npm run check` includes `tools/check_editorial.py`; use `--json` to inventory every file. This guard catches encoding and known copy regressions, not every grammar error.
- Visual changes: include captures without personal data, viewport/DPR, relevant states and exercised interactions.
- Bugs: include a minimal reproduction and a regression test when practical.
- Routing/instructions: include expected and adverse cases; state what was simulated and what was executed.
- External sources: preserve attribution and licensing. Do not copy code, private captures, trademarks, binaries or substantial content without redistribution rights.
- Never include credentials, customer data, personal paths or private conversations.
- Do not claim that a structural test proves visual perception, complete accessibility or universal fidelity.

Changes to workflows, dependencies, generators, tests and policies require special attention: they can weaken validation itself. Do not introduce `pull_request_target`, privileged tokens or automatic publication to run contributions.

## Review and licensing

The maintainer may request adjustments or decline a proposal. There is no automatic merge. Workflows from external contributors may require approval to run; that is separate from approving the change.

Only contribute material you can distribute under [MIT](LICENSE), preserving compatible third-party notices. See [governance](docs/GOVERNANCE.md) and [security](SECURITY.md).
