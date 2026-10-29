# Reproduce without reinterpreting what was approved

Use when the request is for **faithful reproduction or transfer**. For inspiration or new creation, define the new product's criteria; do not impose this editor, its dimensions, or its gestures.

## Fix the target and complete the comparison

1. Record the approved artifact, revision, and state; if the approved implementation differs from the original study, the user's current choice takes precedence. Separate what will be preserved from authorized adaptations. Historical evidence is not automatically a current rule.
2. Read the existing component and portable profile. Reuse available original code before reimplementing; if only a contract exists, implement it in the stack. References and checkers do not import a component automatically.
3. Fix expected values **before** changing the destination. A test that calls the same function on both sides, copies destination output, or regenerates its baseline from that output does not demonstrate fidelity. Version the contract; widening tolerance or removing a case requires a reason and a new decision, not convenience to make tests green.
4. Collect the model, boxes, and computed styles in the browser using the same data, CSS viewport, DPR, font, mode, and selection. Compare the actual painted role: if a dot is painted in `::before`, reading the button's transparent background produces a false defect. Identify the painted layer in each implementation; do not substitute a declared token for computed color. Gestures require every element before/during/after. Inspect captures too: measuring coordinates does not prove clipping, material, legibility, or the absence of an overlapping element.
5. Compare, correct within scope, and repeat affected cases. Failures or missing measurements remain pending; do not combine everything into an average score. Verify [loaded identity and drafts](rendered-validation.md#applying-110-to-pauta---scope-adaptation-and-execution-identity), persistence, errors, and access separately. Announce acceptance only for proven criteria.

## Portable verifier

`python3 <skill-dir>/scripts/check_fidelity.py <contract.json> <observation.json>`

Python 3.9+, standard library, local reads. The script does not open the browser, execute the application, change preferences, or use the network. It rejects divergent, missing, or duplicate measurements, nonfinite values, incompatible types, and invalid local evidence. It does not accept `status:pass` instead of a measurement. Exit 0 means **the supplied values** satisfy the contract; it does not confirm collection accuracy, requirement completeness, or full visual fidelity. Exit 1 indicates divergence/incompleteness; exit 2 indicates a read/JSON failure.

Minimal contract, with criteria independent of the observation:

```json
{
  "schema_version": 1,
  "profile_id": "my-component-approved-revision",
  "checks": [
    {"id":"stage.height","kind":"number","expected":206,"tolerance":1},
    {"id":"selection","kind":"exact","expected":[false,true,false]}
  ]
}
```

Corresponding observation, populated only after measurement:

```json
{
  "schema_version": 1,
  "profile_id": "my-component-approved-revision",
  "results": [
    {"id":"stage.height","actual":206,"artifact":"captures/measurements.json"},
    {"id":"selection","actual":[false,true,false],"artifact":"captures/measurements.json"}
  ]
}
```

The example is illustrative and was not executed. `artifact` must point to a nonempty local file inside the observation directory, using a relative path with no `..` segments; absolute paths and symlinks are forbidden. Retain enough raw captures/traces to review the numbers' origin; file existence does not prove its content. Tolerance belongs to the contract, never the observation. `number` compares finite scalars and rejects booleans; `exact` compares JSON values and types, including inside lists/objects. Do not round observations to conceal errors.

The contract may be small for a local correction. A partial selection must have its own scope/identifier and an equally partial result; never remove checks from the full contract to announce complete acceptance. Do not require this format if existing tests already compare the same invariants with equivalent evidence.

## Approved compact editor sample

[Profile and semantics](../assets/reference-profiles/compact-appearance-v1.json) and [frozen measurements](../assets/reference-profiles/compact-appearance-v1.fidelity.json) serve distinct roles. The first specifies the mechanism; the second provides a regression sample measured in Chromium, DPR 1, reduced motion, viewport 1440x900/fine pointer and 375x900/emulated touch. The reference is independent of the consumer. It is not an executable component and does not require installing/accessing the authoring project.

IDs `visual.<width>.<light|dark>.<2|3>.<field>` refer to the first clean opening with 2 pools and the + action that creates 3, in each mode. They include panel/stage, relative control anchors, wave/dial, dot color/position/selection, and the computed gradient string. Coordinates `points.<index>.x/y` are stage percentages with a tolerance of .01 percentage point; boxes use CSS px with tolerance 1. Selection, colors, and gradient are exact comparisons within this CSS serialization context.

IDs `gesture.<mouse|touch>.<step>.<field>` compare the entire trajectory of the 3 dots. The sequence is: defaults -> +; drag the selected dot to 30%/40%, 50%/60%, 85%/80%; release; ArrowUp; Shift+ArrowLeft; Alt+ArrowDown. Reopen defaults -> +; start the ring at angle 0 degrees/radius 25 px and move to 1,2,3,4,5,6,8,10,15,60,120,180,240,260,220,180,120,60,0 degrees; release. The trace samples each step after updating the preview. `ring-<index>-<degrees>` retains sample identification; `ring-down-no-jump` and `ring-up` check start and end. Do not replace the gesture with direct state assignment.

Collect these fields through an adapter for the destination's actual selectors/components. Do not copy `expected` into `actual`. Record the actually observed viewport and modes outside the minimal JSON, and retain raw traces/captures. Different CSS font aliases may load the same bytes; check the effective font, not just its name. Another engine may serialize CSS differently: investigate/normalize semantics in a separate contract before claiming visual divergence; do not reduce a gradient comparison to one color.

This sample **does not cover everything**: it includes 2/3-light layout/color and some gestures; it does not certify loaded fonts, reset, removal, empty state, Alt+drag, 10-degree rotation/90 events, save/reload, migration, failure, context/hold, nonzero grain, clipping/focus, or tab identity. Exercise these cases when the complete editor is contracted, according to [editor regressions](lighting-editors-icons.md#full-contract-regressions). The portable sample is an additional defense, not a replacement for the complete matrix.

## Prove the defense detects defects

Besides the correct case, introduce an outlying dot stuck at the edge, movement of another pool under an individual operation, a divergent color/gradient, resized stage, wrong selection, or missing dot into test copies. The verifier must fail on the affected data. Also test missing evidence and attempts to change tolerance in the observation. Do not modify the approved product or baseline to create these cases.

A green result is necessary for contracted measurements; rendered inspection, access, persistence, and user agreement remain separate. Scripts do not make the skill infallible.
