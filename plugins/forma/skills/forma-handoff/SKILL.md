---
name: forma-handoff
description: "Prepare and verify the handoff between design and implementation: Figma, editable artifacts, tokens, components, export and consumer integration. Use to deliver the required format; not to replace requested functionality with documentation or a screenshot."
metadata:
  version: 1.21.0
---

# Artifacts, tokens and handoff

## When to use

- Use for Figma, design-to-code work, editable artifacts, export, tokens or resource transfer to another project.
- Do not use to publish a library without authorization or present a full screenshot as an implemented interface.

This module instructs the agent after it is read; it does not connect services, export files or call other modules automatically.
Preserve the existing brand, stack, IDs and source of truth; deliver the format useful to the destination.

## Inputs

- Artifact/source, destination, requested format, editing scope and content/state requirements.
- Existing components/tokens, assets/licenses, tool access and verifiable acceptance criteria.

## Procedure

1. Establish the source of truth, production route and type of delivery: specification, editable source, code or final file.
   Read [artifacts and editing](../../references/artifact-workflows.md); inventory actual IDs and dependencies to avoid duplication and invented links.
2. For Figma or another service, read [integrations](../../references/integrations.md) and the current operational skill before using tools.
   Inspect existing context, render, components and bindings. Generated code remains a reference until adapted, integrated and verified.
3. For tokens/components, read [tokens and handoff](../../references/tokens-handoff.md).
   Map roles, aliases, modes, consumers and exceptions; example JSON has its own format and does not imply compliance with another pipeline.
4. When transferring a capability, follow reuse in [playbooks](../../references/playbooks.md).
   Connect implementation, events, state, assets and lifecycle to the consumer. BookObject/the helper are code; the clean shell has a demo; the editor/profile are contracts to implement.
5. Open the editable/exported artifact or run the consumer in the destination and inspect the final result.
   Use [rendered validation](../../references/rendered-validation.md) and [verification](../../references/verification.md); validate fonts, assets, sizes, links and states for the format.
   For multiple deliverables, verify each output and its revision against the existing contract. For video, also check [duration, frames and audio](../../references/motion.md#films-and-rendered-sequences); preview, rendered file and confirmed delivery are distinct stages.
   For cutouts, verify [alpha and composition](../../references/artifact-workflows.md#transparency-and-composition) in the final file; PNG format or a checkerboard preview does not prove transparency.

## Output and stopping condition

Deliver real files/links, format, location, consumer and the minimum instructions needed for use.
Identify what is editable, exported, integrated, persisted or only specified, with corresponding evidence.
Stop when the recipient can use the artifact in the agreed format and the result has been opened/exercised.
If integration, runtime or an export tool is missing, state the limit; do not conclude a requested implementation with isolated documentation.

## Optional support and limits

Figma, Open Design, Superdesign and `ecc:design-system` can support the selected route; use one primary service per artifact when sufficient.
If available, read their current `SKILL.md` and discover actual tools. Plugin availability, connection and editing capability are separate checks.
Do not install services, regenerate paid artifacts or publish by default. In-memory contracts and demos do not prove persistence or export in the consumer.
