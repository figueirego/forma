#!/usr/bin/env python3
"""Check declared evidence coverage, not visual quality or truth. Read-only."""
import argparse
import json
from pathlib import Path


def nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate(data: object, base: Path) -> list[str]:
    errors: list[str] = []
    if not isinstance(data, dict):
        return ["Report must be a JSON object."]
    if type(data.get("schema_version")) is not int or data["schema_version"] != 1:
        errors.append("schema_version must be 1.")
    if not nonempty(data.get("scope")):
        errors.append("scope must describe the work.")
    targets = data.get("targets")
    if not isinstance(targets, list) or not targets or not all(nonempty(t) for t in targets):
        return errors + ["targets must be a nonempty list of nonempty strings."]
    if len(set(targets)) != len(targets):
        errors.append("Duplicate targets.")
    checks = data.get("checks")
    if not isinstance(checks, list) or not checks:
        return errors + ["checks must be a nonempty list."]
    covered: set[str] = set()
    identities: set[tuple[str, str]] = set()
    for index, check in enumerate(checks):
        label = f"checks[{index}]"
        if not isinstance(check, dict):
            errors.append(f"{label}: must be an object.")
            continue
        target, identifier = check.get("target"), check.get("id")
        if not nonempty(identifier) or not nonempty(target) or target not in targets:
            errors.append(f"{label}: nonempty id and declared target required.")
            continue
        identity = (target, identifier)
        if identity in identities:
            errors.append(f"{label}: duplicate check for target.")
        identities.add(identity)
        status = check.get("status")
        if status not in ("pass", "fail", "untested", "not-applicable"):
            errors.append(f"{label}: invalid status.")
            continue
        if status != "pass":
            if not nonempty(check.get("reason")):
                errors.append(f"{label}: reason required.")
            if status != "not-applicable":
                errors.append(f"{label}: {status} remains unresolved.")
            continue
        if not nonempty(check.get("observation")):
            errors.append(f"{label}: observation required for pass.")
        artifact = check.get("artifact")
        if not nonempty(artifact):
            errors.append(f"{label}: relative artifact required for pass.")
            continue
        relative = Path(artifact)
        if relative.is_absolute() or ".." in relative.parts:
            errors.append(f"{label}: artifact must stay inside report directory.")
            continue
        candidate = base / relative
        try:
            current = base
            for part in relative.parts:
                current = current / part
                if current.is_symlink():
                    raise ValueError("symlink not allowed")
            candidate.resolve().relative_to(base.resolve())
            if not candidate.is_file() or candidate.stat().st_size == 0:
                raise ValueError("missing, empty or non-file artifact")
        except (OSError, ValueError) as error:
            errors.append(f"{label}: {error}")
            continue
        if nonempty(check.get("observation")):
            covered.add(target)
    for target in targets:
        if target not in covered:
            errors.append(f"{target}: no passing check with local evidence.")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("report", type=Path)
    args = parser.parse_args()
    try:
        data = json.loads(args.report.read_text(encoding="utf-8"))
        errors = validate(data, args.report.parent)
    except (OSError, UnicodeError, ValueError) as error:
        print(f"INVALID: {error}")
        return 2
    if errors:
        print("INCOMPLETE OR INVALID")
        for error in errors:
            print(f"- {error}")
        return 1
    print("PASS: declared coverage and local artifacts are structurally complete.")
    print("This does not verify observations, rendered appearance, accessibility or requirement completeness.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
