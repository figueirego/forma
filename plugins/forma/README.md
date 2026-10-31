# Forma 1.34.0

A community design plugin for Codex, distributed under the MIT license: one coordinator and 11 specialists. It requires no server, API key, hooks or separate authentication. Codex usage remains subject to the user's plan. External integrations are optional and may only be used when available and authorized.

Select **Forma** in the plugin catalog or invoke `$forma:forma`. Example: "Use Forma to refine this project's sidebar, buttons and colors while preserving its identity." For a focused task, select Forma Interface, Forma Motion or another specialist.

The coordinator is at [skills/forma/SKILL.md](skills/forma/SKILL.md). The shared root contains `references/`, `assets/`, `scripts/`, `tests/` and `evals/`. Example paths using `<forma-root>` point to this root, including when the skill is in the installed cache.

[Progressive briefing](references/progressive-brief.md) resolves material gaps one question at a time, using native controls or numbered text. Product shares the same project brief and [design specification](references/design-specification.md) with every specialist. Complete requests proceed directly; prompt-only and design-only scopes remain bounded. This protocol is shared across Forma distributions, not a Codex-only runtime.

This package preserves Forma 1.34.0's executable resources; `provenance.json` records source and packaged files. BookObject, AppearanceEditor and the extracted NeuronPassport have reusable implementations and documented adapters or dependencies. The legacy Three passport is separate from the approved CSS mechanism. Consumer integration still needs its own validation. Design methods and routing are internal to Forma; host tools and required rendering dependencies remain separate.

Build: edit `source/forma/` in the [public repository](https://github.com/figueirego/forma), run `npm run build`, then `npm run check`. This directory is generated; do not edit a second copy of the principles here. Marketplace installation copies a snapshot; later source changes require rebuilding and updating the plugin. The standalone skill is a separate distribution.

Local checks: `python3 scripts/check_package.py --root .` and `python3 -m unittest discover -s tests -p 'test_*.py' -v` from the plugin root. The [catalog](catalog.json) is derived from source; the validator checks actual files. Passing these utilities does not prove product design or integration. See [operation and limits](references/plugin-operation.md).

Visual identity: [presentation](assets/plugin-brand/identidade.html), [guide](assets/plugin-brand/README.md) and SVG/PNG assets. Forma's brand belongs to the plugin; it is not a required theme for your projects. The hero is a generated image, not an interactive 3D component.
