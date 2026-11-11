# Conversation evidence receipts

Use the [progressive brief scenarios](../source/forma/evals/progressive-brief-scenarios.md) to run independent conversations. `tools/check_conversation_evidence.py` verifies the integrity and consistency of their receipts. It does not run a model, score behavior, or certify that an observation is true.

Keep receipts, raw conversations and delivered files outside the installed Forma package. Each run has its own directory. Before the run, freeze the candidate revision, package identity and fixture. Preserve the submitted output before a reviewer changes it. A corrected or coached retry is a separate run.

## Run and review

1. Copy the frozen candidate manifest into the run directory. Include revision, package version and hashes, host/version/mode, activation details, available tools and the fixture identity in that manifest or other hashed evidence. Uncommitted candidates need content hashes in addition to a commit label.
2. Capture the raw conversation and actual tool events. A readable JSONL or Markdown transcript works; the validator treats it as evidence bytes and does not interpret its messages. For an interactive question card, also retain the actual card and submitted response evidence.
3. Save the actual output when the case requires delivery. Hash the transcript, candidate manifest, outputs and any other supporting files with SHA256. All declared files must be nonempty regular files inside this run directory.
4. Have a reviewer evaluate the six dimensions against the scenario and cite the saved evidence. Do not expose the rubric or expected answer to the responding agent. Preserve material failures even when other dimensions pass.
5. Write `receipt.json`, then validate it. Record unavailable hosts as `not-run`; a simulation must remain labeled `simulated`.

```sh
python3 -B tools/check_conversation_evidence.py artifacts/conversations/run-01/receipt.json
python3 -B tools/check_conversation_evidence.py artifacts/conversations/run-01/receipt.json --require-pass
python3 -B -m unittest discover -s tools -p test_conversation_evidence.py -v
```

Multiple receipt paths may be supplied. Run IDs must be unique within that invocation. Exit code `0` means receipts are structurally valid, including honest `fail`, `incomplete` and `not-run` results. With `--require-pass`, every supplied receipt must also record `pass`. This flag does not require actual host execution; inspect `execution_class` separately when choosing which runs support a release claim. Exit code `1` reports invalid evidence or an unmet required outcome. Argument errors use the standard argparse exit code `2`.

The JSON report always includes `semantic_evaluation: false`. `valid` describes receipt integrity, while `required_outcomes_satisfied` only describes the requested outcome check. Neither is a new behavioral assessment.

## Receipt format

Required fields for an executed run:

| Field | Meaning |
| --- | --- |
| `schema_version` | `forma.conversation-evidence.v1` |
| `run_id` | Unique nonempty run identifier; encode variants such as PB06-A here |
| `case_id` | `PB01` through `PB15` |
| `execution_class` | `actual-headless`, `actual-interactive` or `simulated` |
| `host` | Host identity and mode in readable text |
| `candidate` | `revision` label and `file` path to the frozen manifest |
| `evidence` | Object mapping relative file paths to lowercase SHA256 hashes |
| `transcript` | Path to the captured conversation, listed in `evidence` |
| `artifact_required` | Boolean recording whether this case requires a delivered artifact |
| `artifact` | Path to the delivered output, when present; listed in `evidence` |
| `outcome` | `pass`, `fail` or `incomplete` |
| `review` | Reviewer identity, six dimensions and material failures |
| `limits` | List of known limits; an empty list is valid |

The candidate manifest is a hashed record of the evaluated candidate, not a pointer to the current checkout. The validator checks its bytes but does not resolve or verify hash entries inside that manifest. Add actual copied source/package files to `evidence` when their local integrity also needs checking. For a multi-file output, list every delivered file in `evidence`; `artifact` points to its entry point or a delivered output manifest.

Each review dimension is keyed by one of these exact names:

| Key | Manual assessment |
| --- | --- |
| `context_reuse` | Existing context and approved decisions were used |
| `question_discipline` | Necessary questions were sequenced and bounded |
| `answer_semantics` | Actual answers and pending events were interpreted correctly |
| `scope_preservation` | Scope and unrelated approved choices were preserved |
| `evidence_quality` | Claims were supported and limits were explicit |
| `delivery` | The authorized handoff or actual artifact was delivered |

A scored dimension has `score: 0`, `1` or `2`, plus one or more evidence references. A reference has `path` and an optional one-based `line`; the path must be listed in `evidence`. A line reference must address an existing line in a UTF-8 file. Use `score: null` and a nonempty `reason` for a dimension that does not apply. A reviewer may add notes, but notes do not replace evidence references.

Example shape below is documentation, not an executed result. Replace all hash placeholders with hashes of the actual captured bytes:

```json
{
  "schema_version": "forma.conversation-evidence.v1",
  "run_id": "PB02-host-a-01",
  "case_id": "PB02",
  "execution_class": "actual-headless",
  "host": "Host name, version and headless mode",
  "candidate": {"revision": "candidate revision", "file": "candidate.json"},
  "evidence": {
    "candidate.json": "<64 lowercase hexadecimal characters>",
    "transcript.jsonl": "<64 lowercase hexadecimal characters>",
    "index.html": "<64 lowercase hexadecimal characters>"
  },
  "transcript": "transcript.jsonl",
  "artifact_required": true,
  "artifact": "index.html",
  "outcome": "pass",
  "review": {
    "reviewer": "Independent review identity",
    "dimensions": {
      "context_reuse": {"score": 2, "evidence": [{"path": "transcript.jsonl"}]},
      "question_discipline": {"score": 2, "evidence": [{"path": "transcript.jsonl"}]},
      "answer_semantics": {"score": null, "reason": "No question or answer event in this run."},
      "scope_preservation": {"score": 2, "evidence": [{"path": "index.html"}]},
      "evidence_quality": {"score": 2, "evidence": [{"path": "transcript.jsonl"}]},
      "delivery": {"score": 2, "evidence": [{"path": "index.html"}]}
    },
    "material_failures": []
  },
  "limits": ["This headless run does not validate a native question card."]
}
```

## Outcomes and unavailable runs

- `pass`: every applicable dimension is `2`, at least one dimension applies, no material failure exists, and a requested artifact is present. Pending-choice cases can pass with `artifact_required: false` when the scenario requires preserving the pending state instead of executing dependent work.
- `fail`: at least one dimension is `0` or a material failure is recorded. The receipt still requires a transcript, candidate and review; an output that was never delivered must not be invented.
- `incomplete`: a nonempty `reason` is required. The candidate and transcript remain required; `review` and a not-yet-delivered artifact may be absent. Partial scores never turn into a pass.
- `not-run`: both `execution_class` and `outcome` must be `not-run`, with a nonempty reason. Do not attach execution scores, transcript, artifact or an `evidence` map. No files are required. An optional candidate may contain only a revision label.

Minimal unavailable-host receipt:

```json
{
  "schema_version": "forma.conversation-evidence.v1",
  "run_id": "PB02-unavailable-host",
  "case_id": "PB02",
  "execution_class": "not-run",
  "host": "Unavailable host name",
  "outcome": "not-run",
  "reason": "Host unavailable in this evaluation environment."
}
```

## Integrity boundary

Paths use forward slashes and are relative to the receipt's directory. Absolute paths, `..`, `.` segments, empty segments, backslashes and symbolic links are rejected. Copy a shared candidate manifest into each run rather than referring to `../candidate.json`. Every referenced file must have a matching declared hash. JSON duplicate keys and nonfinite numbers are rejected.

These are integrity checks for trusted, quiescent local evidence. They are not an authenticated signature, an attestation of the host, a semantic transcript parser, or protection against a hostile process replacing files during validation. A person who rewrites evidence and its hashes can produce a consistent receipt. Preserve provenance in version control and review the raw captures independently.

Keep committed samples fictional and free of credentials or personal information. The unit-test fixtures are synthetic validator inputs, not successful conversational trials. A release report must still identify actual versus simulated runs, the missing host/case matrix, independent review, and untested limits.
