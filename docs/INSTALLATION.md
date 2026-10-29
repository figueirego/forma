# Install Forma in your assistant

The same source generates three formats: a Codex plugin, a Claude Code plugin and Agent Skills. Choose **one format per host** to avoid duplicate entries. This package provides instructions, references and local resources; it does not include a model, standalone visual editor, subscription or automatic connection to external tools.

## Download

Clone `https://github.com/figueirego/forma.git` or choose **Code > Download ZIP** in the repository and extract everything. The `plugins/` and `distributions/` directories are already generated. Node and development dependencies are needed only to rebuild the packages or run repository tests. The optional installer uses Python 3.12+ and only the standard library.

## Codex

From the clone root, using a version that supports `codex plugin`:

```sh
codex plugin marketplace add .
codex plugin add forma@forma-community
codex plugin list --marketplace forma-community --json
```

In a new session or after a supported reload, use `$forma:forma`. Keep the clone: it is the marketplace's local source. Check the selected version and source in the manager's response. `forma-local`, a standalone skill and `forma-community` are separate installations.

To update: update the clone, inspect `codex plugin marketplace upgrade --help` and refresh the `forma-community` snapshot using your version's syntax. Then check the catalog and installation again; do not assume an open conversation already uses the new files. To remove: `codex plugin remove forma@forma-community`; remove the catalog with `codex plugin marketplace remove forma-community`.

## Claude Code

```sh
claude plugin marketplace add figueirego/forma
claude plugin install forma@forma-community
claude plugin list
```

In a new session, invoke `/forma:forma` followed by your request. For example, the interface specialist uses `/forma:forma-interface`. To test a branch or clone without registering the marketplace, run `claude --plugin-dir ./plugins/forma-claude` from that clone's root.

Validate manifests without calling a model:

```sh
claude plugin validate ./plugins/forma-claude
claude plugin validate .
```

Update the catalog and plugin with `claude plugin marketplace update forma-community` and `claude plugin update forma@forma-community`, then start a new session. Remove only this installation with `claude plugin uninstall forma@forma-community`.

These instructions are for **Claude Code**. They do not imply availability in Claude chat, Cowork or an official store. Sources: [plugins](https://code.claude.com/docs/en/plugins), [marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) and [manifest reference](https://code.claude.com/docs/en/plugins-reference).

## Agent Skills: Cursor, Copilot, OpenCode and Gemini CLI

The `distributions/agent-skills/` package has 12 sibling directories, each with its own `SKILL.md`. Each directory name matches its skill name. Shared resources live in `forma/`; specialist links point there. Install all directories together. This avoids relying on recursive discovery, which varies by host.

Directories supported by documentation consulted on October 28, 2026:

| Host | Project | User | Discovery/invocation |
|---|---|---|---|
| Cursor | `.agents/skills/` or `.cursor/skills/` | `~/.agents/skills/` or `~/.cursor/skills/` | Automatic or `/forma`; user resources are not necessarily forwarded to cloud/SSH environments |
| GitHub Copilot | `.agents/skills/` or `.github/skills/` | `~/.agents/skills/` or `~/.copilot/skills/` | By relevance; also `/forma` in VS Code. Personal scope depends on the surface |
| OpenCode | `.agents/skills/` or `.opencode/skills/` | `~/.agents/skills/` or `~/.config/opencode/skills/` | The agent uses the skill tool, subject to host permissions |
| Gemini CLI | `.agents/skills/` or `.gemini/skills/` | `~/.agents/skills/` or `~/.gemini/skills/` | `/skills list` and `/skills reload`; the agent activates skills with user consent |

Sources: [Cursor](https://cursor.com/docs/skills), [Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills), [VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills), [OpenCode](https://opencode.ai/docs/skills/), [Gemini CLI](https://geminicli.com/docs/cli/skills/) and [Agent Skills](https://agentskills.io/specification). Check your installed version: supported directories do not mean every remote environment receives your personal files.

### Project installation

From the Forma repository root, substitute your project's path. The first command only displays the plan:

```sh
python3 tools/install_skills.py --destination /path/to/project/.agents/skills
python3 tools/install_skills.py --destination /path/to/project/.agents/skills --apply
```

For example, in PowerShell:

```powershell
py -3 tools/install_skills.py --destination "C:\Projects\MyApp\.agents\skills"
py -3 tools/install_skills.py --destination "C:\Projects\MyApp\.agents\skills" --apply
```

For a personal installation, use the user directory in the table. Prefer a project installation when your team or a remote agent needs the same files; review them before committing. Do not use two directories with different Forma copies at the same time.

The installer does not change assistant settings, use the network or overwrite files. Identical directories remain untouched; any conflict stops installation before copying. Do not run concurrent installations, and use only directories you control. Symlinks are rejected. If copying fails, the installer attempts to remove only items created in that run; the error reports any cleanup it could not complete.

Without Python, copy all 12 directories to your chosen location using a file manager. Verify that `forma/SKILL.md` and `forma-interface/SKILL.md` are directly under the skills root. Avoid an intermediate directory such as `.agents/skills/agent-skills/`.

### Verify and use

1. Refresh skills in your host or open a new session.
2. Confirm that `forma` and all 11 specialists are available from the selected source. Listing a skill is not executing it.
3. Ask: "Use Forma to review this form. First identify the loaded source and interface specialist, read the relevant contracts and propose a change without editing."
4. Check which files were actually read. Then authorize implementation and test the result in the product.

In portable instructions, `$forma` identifies the skill; it is not a universal command. In Cursor/VS Code, select `/forma` when available; in OpenCode or Gemini, use natural language and the host's activation mechanism.

### Update and remove

Back up the 12 existing Forma directories outside the watched directory. Check for local changes before moving them. Install the new version in the now-empty location; the installer refuses to merge versions automatically. Leave other skills intact. To remove Forma, remove only `forma/` and the `forma-*` directories listed in the installed distribution after checking their names; do not use wildcard deletion if third-party skills have similar names.

## What was verified

- Deterministic generation and agreement between source and distributions.
- Catalogs, frontmatter, paths, links, plugin provenance and identical executable resources.
- Installation in an independent temporary directory with spaces in its path; dry run, conflicts, idempotence and preservation of other skills.
- Claude Code manifests can be checked with the local CLI commands above; the result observed for a change is recorded in its PR.

These checks do not execute design tasks in every assistant. Discovery and behavior must be confirmed in the host's actual version and session; a local macOS test does not certify Windows or physical devices. Report unavailable tools and use accessible evidence instead of simulating results.
