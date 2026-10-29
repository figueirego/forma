---
name: forma-graphs-data
description: "Design knowledge graphs, maps, dashboards, time series and data exploration with verifiable identity, provenance and interaction. Use for relationships and analytical reading; not to turn fictional data or visual position into domain facts."
metadata:
  version: 1.17.1
---

# Graphs, maps and data

## When to use

- Use for links/backlinks, local/global graphs, canvases, geographic maps, metrics, history and live updates.
- Do not use to infer real relationships from visual proximity or build a dashboard without an analytical question.

This module requires explicit reading; it does not start queries, pipelines or other modules automatically.
Preserve the domain, brand, stack and source of truth; choose a renderer after understanding the data.

## Inputs

- The question the person needs to answer, dataset/source, units, period and expected operation.
- Record identity, relationship/aggregation rules, scale, permissions and examples of known results.

## Procedure

1. Start with a concrete input and result; identify data, derivations and hypotheses.
   Use [playbooks](../forma/references/playbooks.md) to define the deliverable; do not treat fixtures as real metrics.
2. For graphs, read [graphs and knowledge](../forma/references/knowledge-graphs.md).
   Define identity, direction, origin, resolution, counts and rename/delete behavior; separate confirmed relationships, semantic suggestions, clusters and position.
3. For maps/dashboards, read [temporal and geographic data](../forma/references/data-dashboards.md).
   Establish units, denominators, timezone/period, aggregation, scale and stale/no-data states; use [adaptive systems](../forma/references/adaptive-visual-systems.md) only for relevant theme/canvas concerns.
4. Implement filters, selection and inspection while preserving context and making the source accessible.
   Read [interaction and content](../forma/references/interaction-content.md) and, depending on access/update behavior, [contracts and trust](../forma/references/contracts-trust.md). Provide a readable alternative to the canvas.
5. Compare results with known fixtures and perform the rendered task at a representative scale.
   Use [verification](../forma/references/verification.md); check counts, extremes, empty states, keyboard input and applicable update/cancellation behavior.

## Output and stopping condition

Deliver a usable visualization or the requested specification, reading/interaction rules and evidence of the results.
Include only scale, coverage and update limits actually measured, without inventing benchmarks.
Stop when a person can answer the question, inspect the source and obtain the expected result without losing context.
A beautiful graph with incorrect relationships or a rendered map with incorrect totals does not meet acceptance criteria.

## Optional support and limits

`ecc:dashboard-builder`, `ecc:design-system` and `accessibility` can help with analytical composition, consistency and access.
If present, read the current `SKILL.md` and [integrations](../forma/references/integrations.md) before use; do not assume a connection to data or tools.
In-memory examples do not demonstrate persisted updates. Do not add a database, physics simulation, WebGL or geographic service without a concrete need.
