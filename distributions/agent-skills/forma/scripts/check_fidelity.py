#!/usr/bin/env python3
"""Compare supplied measurements with a separate JSON contract. Read-only, Python 3.9+."""
import argparse
from fractions import Fraction
import json
import math
from pathlib import Path, PureWindowsPath


LIMITATION = (
    "Only compares supplied measurements and local artifact presence; does not verify "
    "capture authenticity, requirement completeness, the loaded revision, or visual quality."
)


def nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def finite_number(value: object) -> bool:
    return type(value) is int or (type(value) is float and math.isfinite(value))


def json_value(value: object) -> bool:
    if value is None or type(value) in (str, bool, int):
        return True
    if type(value) is float:
        return math.isfinite(value)
    if type(value) is list:
        return all(json_value(item) for item in value)
    if type(value) is dict:
        return all(type(key) is str and json_value(item) for key, item in value.items())
    return False


def exact(expected: object, actual: object) -> bool:
    if type(expected) is not type(actual):
        return False
    if isinstance(expected, dict):
        return expected.keys() == actual.keys() and all(
            exact(value, actual[key]) for key, value in expected.items()
        )
    if isinstance(expected, list):
        return len(expected) == len(actual) and all(
            exact(left, right) for left, right in zip(expected, actual)
        )
    return expected == actual


def fields(value: dict, required: set, optional: set, label: str) -> list[str]:
    errors = []
    if required - value.keys():
        errors.append(f"{label}: missing required fields: {', '.join(sorted(required - value.keys()))}.")
    if value.keys() - required - optional:
        errors.append(f"{label}: unknown fields are not allowed.")
    return errors


def artifact_errors(value: object, base: Path, label: str) -> list[str]:
    if not nonempty(value):
        return [f"{label}: nonempty relative artifact path required."]
    # Forward-slash paths keep the same meaning on POSIX and Windows.
    relative = Path(value)
    windows = PureWindowsPath(value)
    if "\\" in value or relative.is_absolute() or windows.drive or windows.root or ".." in relative.parts:
        return [f"{label}: artifact must use a relative path inside the observation directory, without '..' or backslashes."]
    candidate = base / relative
    try:
        current = base
        for part in relative.parts:
            current = current / part
            if current.is_symlink():
                raise ValueError("symlink artifact components are not allowed")
        candidate.resolve().relative_to(base.resolve())
        if not candidate.is_file() or candidate.stat().st_size == 0:
            raise ValueError("missing, empty or non-file artifact")
    except (OSError, ValueError, RuntimeError) as error:
        return [f"{label}: {error}"]
    return []


def validate(contract: object, observation: object, base: Path) -> list[str]:
    """Return structural, coverage and comparison errors; never measure or render UI."""
    errors: list[str] = []
    for label, document, required in (
        ("contract", contract, {"schema_version", "profile_id", "checks"}),
        ("observation", observation, {"schema_version", "profile_id", "results"}),
    ):
        if not isinstance(document, dict):
            errors.append(f"{label}: must be a JSON object.")
            continue
        errors.extend(fields(document, required, set(), label))
        if type(document.get("schema_version")) is not int or document["schema_version"] != 1:
            errors.append(f"{label}: schema_version must be 1.")
        if not nonempty(document.get("profile_id")):
            errors.append(f"{label}: nonempty profile_id required.")
    if not isinstance(contract, dict) or not isinstance(observation, dict):
        return errors
    if contract.get("profile_id") != observation.get("profile_id"):
        errors.append("observation: profile_id does not match the contract.")
    checks, results = contract.get("checks"), observation.get("results")
    if not isinstance(checks, list) or not checks:
        errors.append("contract: checks must be a nonempty list.")
        return errors
    if not isinstance(results, list):
        errors.append("observation: results must be a list.")
        return errors

    declared: dict[str, dict] = {}
    for index, check in enumerate(checks):
        label = f"checks[{index}]"
        if not isinstance(check, dict):
            errors.append(f"{label}: must be an object.")
            continue
        kind = check.get("kind")
        errors.extend(fields(check, {"id", "kind", "expected"}, {"tolerance"} if kind == "number" else set(), label))
        identifier = check.get("id")
        if not nonempty(identifier):
            errors.append(f"{label}: nonempty id required.")
            continue
        if identifier in declared:
            errors.append(f"{label}: duplicate contract id {identifier!r}.")
            continue
        declared[identifier] = check
        if kind not in ("number", "exact"):
            errors.append(f"{label}: kind must be 'number' or 'exact'.")
        elif kind == "number":
            if not finite_number(check.get("expected")):
                errors.append(f"{label}: expected must be a finite number, not bool.")
            tolerance = check.get("tolerance", 0)
            if not finite_number(tolerance) or tolerance < 0:
                errors.append(f"{label}: tolerance must be a finite number >= 0, not bool.")
        else:
            try:
                valid = "expected" in check and json_value(check["expected"])
            except RecursionError:
                valid = False
            if not valid:
                errors.append(f"{label}: expected must be a finite JSON value.")

    seen: set[str] = set()
    for index, result in enumerate(results):
        label = f"results[{index}]"
        if not isinstance(result, dict):
            errors.append(f"{label}: must be an object.")
            continue
        errors.extend(fields(result, {"id", "actual", "artifact"}, set(), label))
        identifier = result.get("id")
        if not nonempty(identifier):
            errors.append(f"{label}: nonempty id required.")
            continue
        errors.extend(artifact_errors(result.get("artifact"), base, label))
        if identifier in seen:
            errors.append(f"{label}: duplicate result id {identifier!r}.")
            continue
        seen.add(identifier)
        if identifier not in declared:
            errors.append(f"{label}: unknown result id {identifier!r}.")
            continue
        check = declared[identifier]
        if "actual" not in result or "expected" not in check:
            continue
        expected, actual = check["expected"], result["actual"]
        if check.get("kind") == "number":
            if not finite_number(actual):
                errors.append(f"{identifier!r}: actual must be a finite number, not bool.")
                continue
            tolerance = check.get("tolerance", 0)
            if not finite_number(expected) or not finite_number(tolerance) or tolerance < 0:
                continue
            # Preserve integer precision and avoid overflow between finite floats.
            if abs(Fraction(actual) - Fraction(expected)) > Fraction(tolerance):
                errors.append(f"{identifier!r}: actual differs from expected beyond the contract tolerance.")
        elif check.get("kind") == "exact":
            try:
                valid = json_value(expected) and json_value(actual)
                matches = valid and exact(expected, actual)
            except RecursionError:
                valid, matches = False, False
            if not valid:
                errors.append(f"{identifier!r}: exact values must be finite JSON values.")
            elif not matches:
                errors.append(f"{identifier!r}: actual does not exactly match expected, including types.")
    for identifier in declared:
        if identifier not in seen:
            errors.append(f"{identifier!r}: required result is missing.")
    return errors


def reject_constant(value: str):
    raise ValueError(f"{value} is not a finite JSON number.")


def finite_float(value: str) -> float:
    number = float(value)
    if not math.isfinite(number):
        raise ValueError("JSON number exceeds the finite float range.")
    return number


def unique_object(pairs: list) -> dict:
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate JSON object key: {key!r}.")
        result[key] = value
    return result


def read_json(path: Path):
    return json.loads(
        path.read_text(encoding="utf-8"), parse_constant=reject_constant,
        parse_float=finite_float, object_pairs_hook=unique_object,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("contract", type=Path)
    parser.add_argument("observation", type=Path)
    args = parser.parse_args()
    try:
        contract = read_json(args.contract)
        observation = read_json(args.observation)
        errors = validate(contract, observation, args.observation.parent)
    except (OSError, UnicodeError, ValueError, RecursionError) as error:
        print(f"INVALID: {error}")
        return 2
    if errors:
        print("INCOMPLETE OR DIVERGENT")
        for error in errors:
            print(f"- {error}")
        return 1
    print("PASS: supplied measurements match the supplied contract.")
    print(LIMITATION)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
