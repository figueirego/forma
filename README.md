<p align="center">
  <img src="docs/assets/cover.png" width="100%" alt="Forma cover: a flat geometric F and the tagline From intent to craft.">
</p>

# Forma

**From intent to craft.**

A design system for coding assistants. Forma brings together a coordinator and 11 specialists to create, refine, and verify interfaces, visual systems, and brand materials in your project. It selects instructions and references for each task while preserving your identity and stack. Available as plugins for **Codex** and **Claude Code**, and as **Agent Skills** for other compatible environments.

<p>
  <a href="#install">Install</a> |
  <a href="#try-it">Try it</a> |
  <a href="#specialties">Specialties</a> |
  <a href="#contribute">Contribute</a> |
  <a href="#license">License</a>
</p>

## Try it

Describe the outcome, the context, and what should stay unchanged. The coordinator selects the relevant specialties. Start with a request like these:

**Refine an interface**

> Use Forma to improve this form's hierarchy, spacing, and error states. Preserve the existing brand and components, and test the affected interactions.

**Create brand materials**

> Use Forma to create a cover and a short presentation for this product. Use only documented benefits and deliver the requested editable formats.

**Create a clear PDF guide**

> Use Forma to turn this content into a clean PDF guide with situation/choice cards and comparison tables. Preserve our brand and all facts, deliver the PDF and editable source, and inspect every exported page.

**Audit before changing**

> Use Forma to review this flow on desktop and at mobile width. Show reproducible issues with evidence. Do not edit yet.

In Codex, invoke **`$forma:forma`**; in Claude Code, **`/forma:forma`**. In other environments, use the activation mechanism your assistant supports.

## Specialties

### Understand and direct

- [**Coordinator**](source/forma/SKILL.md) - interprets the request and selects the relevant instructions.
- [**Product**](source/forma/skills/product/SKILL.md) - research, journeys, information architecture, and flows.
- [**Reference**](source/forma/skills/reference/SKILL.md) - source analysis, reproduction, and fidelity backed by evidence.

### Build and refine

- [**Foundations**](source/forma/skills/foundations/SKILL.md) | [**Interface**](source/forma/skills/interface/SKILL.md) - color, typography, layout, components, and states.
- [**3D Objects**](source/forma/skills/objects-3d/SKILL.md) | [**Motion**](source/forma/skills/motion/SKILL.md) - materials, volumes, gestures, animation, and films.
- [**Graphs and Data**](source/forma/skills/graphs-data/SKILL.md) | [**Platforms**](source/forma/skills/platforms/SKILL.md) - visualizations and adaptation to web, mobile, and desktop.

### Communicate and deliver

- [**Brand**](source/forma/skills/brand/SKILL.md) - identity, campaigns, presentations, and graphic assets.
- [**Handoff**](source/forma/skills/handoff/SKILL.md) - editable artifacts, tokens, export, and integration.
- [**Validation**](source/forma/skills/validation/SKILL.md) - accessibility, states, and quality checks within a defined scope.

Start with the [use-case guide](source/forma/references/source-use-cases.md) and [resource map](source/forma/references/sources.md). For documents, see the [clear PDF guide](source/forma/references/clear-pdf-guides.md) and its [print specimen](source/forma/assets/clear-pdf-guide.html).

Explore the [reusable resources](source/forma/references/resources.md), [evaluation scenarios](source/forma/evals/routing-scenarios.md), and [changelog](CHANGELOG.md).

## Direction grounded in your project

Forma connects the project's own content to a visual concept, maps each section to a claim and its evidence, and treats marketing pages and working app screens differently. Refinement checks substance, hierarchy, real data, responsive behavior, and the final rendered result.

Forma maintains its own instructions, pattern descriptions and tools. Each addition starts with a project problem, connects to an actual resource and defines a check that can reveal a failure. Your approved brand and components take precedence over stylistic bans or image and animation quotas. See [authorship, dependencies and scope](docs/ORIGINALITY.md).

## Reference library

Forma includes searchable design patterns, website research candidates, developer portfolios, and a separate collection of observed design experiences. Browse them in the local selector or use the CLI:

```sh
node <skill-dir>/scripts/references.mjs --portfolios --query "Joao" --limit 3 --json
node <skill-dir>/scripts/references.mjs --portfolios --case portfolio-project-stories --limit 3
node <skill-dir>/scripts/references.mjs --observed --query "sticky navigation" --json
```

> Use Forma to find three references for this project, explain what fits our content, preserve the approved brand, and inspect the selected sites before implementing.

The media helper searches Openverse, Wikimedia Commons, the Art Institute of Chicago, and the Met. See the [reference and media guide](source/forma/references/reference-library.md).

## Reusable components

[AppearanceEditor](source/forma/references/reusable-components.md#appearanceeditor-integration) provides the compact lighting UI, keyboard/touch event handling, draft preview, Save/Cancel and explicit persistence adapters. [NeuronPassport](source/forma/references/reusable-components.md#neuronpassport-integration) preserves the approved Neuron CSS 3D engine, visual layers and corner gestures in an isolated frame. The old Three PassportObject remains a legacy alternative, not a fidelity substitute.

Run the [component lab](source/forma/assets/components-lab.html) from a repository checkout after `npm ci --ignore-scripts`, using a local HTTP server at the repository root. The primary components need no Three dependency; diagnostics identify the actual CSS renderer. [Setup and adapters](source/forma/references/reusable-components.md) explain how to use the destination's existing stack. The lab uses sample data and browser-local storage; package tests and a standalone demo do not prove consumer integration, cross-engine behavior or physical touch.

## Install

Choose **one format per assistant**. The packages are ready to use in this repository; no build is required. You can also download the entire repository through **Code -> Download ZIP** on GitHub.

<details open>
<summary><strong>Codex</strong> | native plugin</summary>

Use a version of Codex that supports `codex plugin`:

```sh
git clone https://github.com/figueirego/forma.git
cd forma
codex plugin marketplace add .
codex plugin add forma@forma-community
codex plugin list --marketplace forma-community --json
```

Keep the clone available: it is the catalog's local source. Start a new chat or use the supported reload mechanism, then select **Forma**. Check the source: `forma-local`, `forma-community`, and the standalone skill are separate installations. Do not edit the installed cache.

Registering the ready-to-use package does not require Node, Python, or API keys. Codex and optional integrations have their own requirements and terms.

</details>

<details>
<summary><strong>Claude Code</strong> | native plugin</summary>

```sh
claude plugin marketplace add figueirego/forma
claude plugin install forma@forma-community
claude plugin list
```

Start a new session and use `/forma:forma` followed by your request. To try a clone before installing, run `claude --plugin-dir ./plugins/forma-claude` from this repository's root. These instructions apply to **Claude Code**, not every Claude chat surface.

</details>

<details>
<summary><strong>Cursor, Copilot, OpenCode, and Gemini CLI</strong> | Agent Skills</summary>

From the root of the clone or extracted ZIP, replace the path with your project's path. The first command previews the plan; the second applies it:

```sh
python3 tools/install_skills.py --destination /path/to/project/.agents/skills
python3 tools/install_skills.py --destination /path/to/project/.agents/skills --apply
```

The installer requires Python 3.12+, preserves other skills, and refuses conflicts without overwriting files. On Windows, use `py -3` instead of `python3` and put the local path in quotes.

Without Python, copy **all 12 folders** from `distributions/agent-skills/` into the skills directory recognized by your assistant. They share resources: do not copy only the `SKILL.md` files. Then use the environment's supported reload mechanism.

</details>

See the [installation guide](docs/INSTALLATION.md) for updates, removal, and evidence by environment. **Format compatibility does not guarantee the same tools, permissions, or behavior across assistants.**

## Scope and limits

Forma provides instructions, references, and local resources; it is not a standalone visual editor. Browser, design-canvas and artifact-inspection capabilities depend on the environment and are not connected automatically. Design methods and routing remain in Forma.

Structure and geometry tests do not prove rendering quality; a mobile viewport is not a physical device. The package includes executable resources and implementation specifications; inspect their current availability before promising reuse. AppearanceEditor and the extracted NeuronPassport are executable modules, while domain integrations and fidelity still need destination evidence. See [operation and limits](source/forma/references/plugin-operation.md) and the [release-validation protocol](source/forma/references/release-validation.md). That protocol separates frozen trials, original failures, reviewed corrections, rendered behavior, retrieval and runtime cost; it does not claim universal reliability or authorize publication.

## Contribute

Fork the repository, create a branch, and open a PR. Documentation, reproducible bugs, examples, accessibility improvements, and tests are welcome. Read the [contribution guide](CONTRIBUTING.md).

To change the skills, edit `source/forma/`, regenerate the distributions, and run the checks with **Python 3.12+ and Node 24+**:

```sh
npm ci --ignore-scripts
python3 tools/build.py
npm run check
```

Plugins, catalogs, and Agent Skills are generated and versioned; CI checks that they match the source. Changes go through a PR and maintainer review. See the [governance rules](docs/GOVERNANCE.md), including the sole-maintainer exception and the limits of remote branch protections, and the [security policy](SECURITY.md).

## License

[MIT](LICENSE).
