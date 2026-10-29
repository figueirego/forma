# Operate and verify the Forma distribution

In this plugin, `<forma-root>` is the directory containing `.codex-plugin/`, `references/`, `assets/`, `scripts/` and `tests/`; it is not a specialist directory. Resolve it relative to this file.

Read this when installing, updating, diagnosing discovery or maintaining Forma itself. To create an interface, use the relevant specialist; reinstalling the tool does not fix the product.

## One source, formats for each environment

The canonical source organizes a coordinator and nested specialists. The plugin generates sibling skills discovered by Codex, with shared references and assets. The standalone skill and plugin can coexist, but they are separate copies: check the path actually loaded. Edit the authored source, generate the package and update the installation; editing the cache loses the change on the next update.

The community edition also generates a Claude Code plugin and a flat Agent Skills package. In the latter, `forma/` contains the coordinator and resources, and the other 11 folders are its siblings. All must stay together. The difference is discovery, namespace and paths; these are not 12 running agents or three design implementations.

The `.agents/skills/` directory is shared by compatible versions of Cursor, Copilot, OpenCode and Gemini CLI. Personal resources may not reach cloud or remote sessions: confirm the effective scope. Use the [public installation matrix](https://github.com/figueirego/forma/blob/main/docs/INSTALLATION.md) and current host documentation. Do not assume an optional integration exists merely because the package was copied.

In the standalone distribution, select the skill named `forma`. In the plugin, the host adds its namespace to the entry and specialists. Use the name announced by the current catalog; do not invent an `invoke_skill` tool. The generator adapts links and prompts to the distribution. Agent metadata provides presentation and instructions, not running processes.

The package includes contracts, helpers, examples and the components declared in [resources](resources.md). The complete appearance editor remains an implementation contract; the plugin does not automatically inject it into any framework. External plugins, keys, services, models and connections are not installed as implicit dependencies.

## Repeatable verification

Resolve the root containing `references/`, `assets/`, `scripts/` and `tests/`. In the plugin it also contains `.codex-plugin/` or `.claude-plugin/`; in the Agent Skills package it is `forma/`. Do not use a specialist's folder as the root. The variable `<package-root>` means the plugin or canonical source root; for Agent Skills, it is the folder **above `forma/`**, containing the 12 folders. This audit folder must contain only the Forma distribution, without other skills.

```sh
python3 <forma-root>/scripts/check_package.py --root <package-root>
```

The checker is local and read-only. It derives the catalog from the files and checks Markdown links/anchors, names, scalar metadata fields and, when a manifest exists, plugin paths and prompts. It is not a complete YAML parser, security scanner or meaning evaluator. Host frontmatter validation remains a separate step.

When authoring/updating, add only the comparisons available:

```sh
python3 <forma-root>/scripts/check_package.py --root <plugin-root> --source <canonical-root> --installed <installed-root> --archive <plugin.zip>
```

`--source` checks hashes and provenance coverage; `--installed` checks the copy; `--archive` checks the distributed contents. An omitted comparison was not executed. The marketplace ZIP may include the catalog root around the plugin; preserve this structure when distributing. None of these checks executes hooks, starts a server or calls a model.

## Installation and discovery

Use the manager available in the host and check its help/output. In the audited Codex CLI, the sequence is `codex plugin marketplace add <marketplace-root>`, `codex plugin add forma@forma-community` and `codex plugin list --marketplace forma-community --json`. The name `forma-community` belongs to the distributed community catalog; another catalog may announce another identity. Do not copy private paths from another machine.

In Claude Code, the shell commands are `claude plugin marketplace add figueirego/forma`, `claude plugin install forma@forma-community` and `claude plugin list`. Use the entry announced by the host; invocation syntax differs from Codex. In the Agent Skills package, use natural language or the command actually available in the host. The package does not install model runtimes.

After updating, check discovery in a new session or supported reload: entry, specialists, namespace, prompts and cache path. A valid manifest or enabled installation does not demonstrate that an old conversation reloaded the version. Do not automatically delete the standalone skill; to avoid ambiguity, select the plugin entry and confirm its origin.

## Four separate kinds of proof

| Layer | Evidence | Limit |
|---|---|---|
| Package | Checks, hashes, frontmatter and files | Does not execute the agent's decision |
| Host | Current discovery, name, origin and enabled state | Does not demonstrate a design result |
| Agent | Case in an isolated session reading the installation, observed artifact/diff and decision | One sample does not measure universal reliability |
| Consumer | Actual component/route, relevant states, interactions and rendering | A fixture does not approve every project |

For a routing change, follow the [version comparison](../evals/routing-scenarios.md#compare-versions-without-confusing-evidence). Record failures, inapplicable checks and untested paths. Do not combine these layers into a "100%" seal.

## Plugin identity

Files in `assets/plugin-brand/` identify Forma in the catalog and its presentation. The symbol, brand color, typography and hero are not defaults for apps created with the tool. Preserve each consumer's approved identity. The hero is a generated brand image; it is not a WebGL component or proof of modeling or interactive motion.
