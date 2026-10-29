# Applied UX heuristics

Inspired by the organization of Laws of UX and UXplained's practice-based learning. Use only heuristics that explain an observed problem. They are not universal proofs, mandatory numerical limits or reasons to manipulate users.

| Family | Principles | Application and limit |
|---|---|---|
| Perception | Proximity, similarity, common region, uniform connectedness, Pragnanz | Relate elements through grouping; do not put every screen in boxes |
| Acquisition and choice | Fitts, Hick, choice overload | Enlarge targets and organize options; do not hide important functions just to reduce the count |
| Memory | Chunking, working memory, Miller, serial position | Preserve context and group information; 7 +/- 2 is not a menu rule |
| Familiarity | Jakob, mental models, active user paradox | Useful conventions and learning during use; do not copy a product blindly |
| Focus and complexity | Cognitive load, selective attention, Tesler, Occam | Simplify the work and expose necessary complexity at the right time |
| Feedback | Doherty, flow, goal-gradient | Fast responses and truthful progress; animation does not make the network faster |
| Recall | Peak-end, Zeigarnik, Von Restorff | End clearly and highlight unfinished tasks; avoid guilt, anxiety and distraction |
| Judgment | Aesthetic-usability effect, cognitive bias | Appearance affects perception but does not fix functionality; use honest persuasion |
| Robustness and priority | Postel, Pareto, Parkinson | Accept safe formats and prioritize real tasks; do not relax validation or invent percentages |

## Procedure

For centering, alignment and organization, consult the [mapping from laws to spatial relationships](layout-spatial-contracts.md#4-task-oriented-organization-and-ux-laws). Distinguish the principle from a source's proposed numerical recipe: law names do not justify arbitrary option limits, fixed padding or a universal score.

1. Describe the problem in task terms: "the user associates the error with the wrong field."
2. Identify evidence: distance, structure, behavior or test observations.
3. Choose an explanatory principle: proximity and feedback.
4. Propose a small change: move the error closer and associate it semantically with the field.
5. Verify success: understanding, assistive-technology reading and data correction.

In code, provide the fix in the real stack. In Figma, describe relationships/layout/states. In research, formulate a testable hypothesis. Do not force JSX into an audit of a native app or physical artifact.

## Deliberate practice

To learn, choose a short flow, capture a baseline, change one important relationship and compare. Explain the expected and observed effects. UXplained's challenge format inspires this method; each issue's submission rules belong to that activity and are not incorporated into the general skill.
