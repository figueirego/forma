#!/usr/bin/env python3
"""Check explicit JSON geometry contracts. Read-only, Python 3.9+, no dependencies."""
import argparse
import json
import math
from pathlib import Path


FORMAT = "design-complete-layout-v1"
LIMITATIONS = [
    "Checks supplied geometry only; does not measure a browser or verify its accuracy.",
    "All rectangles must use the same coordinate space and units (normally CSS pixels).",
    "Does not verify optical centering, perceptual grouping, visual fidelity or accessibility.",
]
EDGES = {"left", "right", "top", "bottom", "centerX", "centerY"}
FIELDS = {
    "align": {"elements", "edge"},
    "inset": {"container", "element", "side", "expected"},
    "gap": {"from", "to", "axis", "expected"},
    "containment": {"container", "element"},
    "no-horizontal-overflow": {"element"},
    "center": {"container", "element", "axis"},
}


def number(value, label, minimum=None):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"{label} must be a finite number.")
    try:
        value = float(value)
    except OverflowError:
        raise ValueError(f"{label} must be a finite number.") from None
    if not math.isfinite(value) or (minimum is not None and value < minimum):
        raise ValueError(f"{label} must be finite" + (f" and >= {minimum}." if minimum is not None else "."))
    return value


def identifier(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label} must be a nonempty string.")
    return value


def rectangle(value, label):
    if not isinstance(value, dict):
        raise ValueError(f"{label} must be an object.")
    allowed = {"x", "y", "width", "height", "scrollWidth", "clientWidth"}
    if set(value) - allowed:
        raise ValueError(f"{label} contains unknown rectangle fields.")
    rect = {key: number(value.get(key), f"{label}.{key}", 0 if key in {"width", "height"} else None)
            for key in ("x", "y", "width", "height")}
    for key in ("scrollWidth", "clientWidth"):
        if key in value:
            rect[key] = number(value[key], f"{label}.{key}", 0)
    rect.update(left=rect["x"], top=rect["y"], right=rect["x"] + rect["width"],
                bottom=rect["y"] + rect["height"], centerX=rect["x"] + rect["width"] / 2,
                centerY=rect["y"] + rect["height"] / 2)
    for key in EDGES:
        number(rect[key], f"{label}.{key}")
    return rect


def invalid(message):
    return {"status": "invalid", "checks": [], "errors": [message], "limitations": LIMITATIONS[:]}


def validate(data):
    """Return a report; invalid contracts never count as failed or passing checks."""
    try:
        return evaluate(data)
    except ValueError as error:
        return invalid(str(error))


def evaluate(data):
    if not isinstance(data, dict) or data.get("format") != FORMAT:
        raise ValueError(f"Root must be an object with format {FORMAT!r}.")
    viewport = data.get("viewport")
    if not isinstance(viewport, dict):
        raise ValueError("viewport must contain positive width and height.")
    dimensions = {key: number(viewport.get(key), f"viewport.{key}", 0) for key in ("width", "height")}
    if any(value == 0 for value in dimensions.values()):
        raise ValueError("viewport width and height must be positive.")
    elements = data.get("elements")
    if not isinstance(elements, dict):
        raise ValueError("elements must be an object of named rectangles.")
    rectangles = {"viewport": rectangle({"x": 0, "y": 0, **dimensions}, "viewport")}
    for name, value in elements.items():
        identifier(name, "element id")
        if name == "viewport":
            raise ValueError("Element id 'viewport' is reserved for the viewport rectangle.")
        rectangles[name] = rectangle(value, f"elements.{name}")
    checks = data.get("checks")
    if not isinstance(checks, list) or not checks:
        raise ValueError("checks must be a nonempty array.")
    results, seen = [], set()
    for check in checks:
        if not isinstance(check, dict):
            raise ValueError("Each check must be an object.")
        check_id = identifier(check.get("id"), "check.id")
        if check_id in seen:
            raise ValueError(f"Duplicate check id: {check_id}.")
        seen.add(check_id)
        kind = check.get("type")
        if not isinstance(kind, str) or kind not in FIELDS:
            raise ValueError(f"{check_id}: unknown check type.")
        if set(check) - (FIELDS[kind] | {"id", "type", "tolerance"}):
            raise ValueError(f"{check_id}: unknown fields for {kind}.")
        tolerance = number(check.get("tolerance", 1), f"{check_id}.tolerance", 0)

        def ref(field):
            name = identifier(check.get(field), f"{check_id}.{field}")
            if name not in rectangles:
                raise ValueError(f"{check_id}: missing rectangle {name!r}.")
            return rectangles[name]

        result = {"id": check_id, "type": kind, "tolerance": tolerance}
        expected = 0
        if kind == "align":
            names, edge = check.get("elements"), check.get("edge")
            if not isinstance(names, list) or len(names) < 2:
                raise ValueError(f"{check_id}: align needs at least two element ids.")
            names = [identifier(name, f"{check_id}.elements") for name in names]
            if len(set(names)) != len(names) or any(name not in rectangles for name in names):
                raise ValueError(f"{check_id}: duplicate or missing alignment rectangles.")
            if not isinstance(edge, str) or edge not in EDGES:
                raise ValueError(f"{check_id}: invalid alignment edge.")
            values = {name: rectangles[name][edge] for name in names}
            actual = number(max(values.values()) - min(values.values()), f"{check_id}.actual")
            result.update(edge=edge, values=values)
            passed = actual <= tolerance
        elif kind == "no-horizontal-overflow":
            element = ref("element")
            if not {"scrollWidth", "clientWidth"} <= element.keys():
                raise ValueError(f"{check_id}: overflow requires scrollWidth and clientWidth.")
            actual = number(element["scrollWidth"] - element["clientWidth"], f"{check_id}.actual")
            passed = actual <= tolerance
        elif kind == "gap":
            before, after = ref("from"), ref("to")
            axis = check.get("axis")
            if axis not in ("x", "y"):
                raise ValueError(f"{check_id}: axis must be x or y.")
            actual = number(after[axis] - before["right" if axis == "x" else "bottom"], f"{check_id}.actual")
            expected = number(check.get("expected"), f"{check_id}.expected")
            passed = abs(actual - expected) <= tolerance
        else:
            container, element = ref("container"), ref("element")
            insets = {"left": element["left"] - container["left"], "top": element["top"] - container["top"],
                      "right": container["right"] - element["right"], "bottom": container["bottom"] - element["bottom"]}
            for side, value in insets.items():
                number(value, f"{check_id}.insets.{side}")
            if kind == "containment":
                actual = insets
                passed = all(value >= -tolerance for value in insets.values())
            elif kind == "inset":
                side = check.get("side")
                if not isinstance(side, str) or side not in insets:
                    raise ValueError(f"{check_id}: side must be left, right, top or bottom.")
                actual = insets[side]
                expected = number(check.get("expected"), f"{check_id}.expected")
                passed = abs(actual - expected) <= tolerance
            else:
                axis = check.get("axis")
                if axis not in ("x", "y"):
                    raise ValueError(f"{check_id}: axis must be x or y.")
                edge = "centerX" if axis == "x" else "centerY"
                actual = number(element[edge] - container[edge], f"{check_id}.actual")
                passed = abs(actual) <= tolerance
        comparison = "each-at-least" if kind == "containment" else "at-most" if kind in {"align", "no-horizontal-overflow"} else "equals"
        result.update(passed=passed, actual=actual, expected=expected, comparison=comparison)
        results.append(result)
    return {"status": "pass" if all(result["passed"] for result in results) else "fail",
            "checks": results, "limitations": LIMITATIONS[:]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", type=Path, help="JSON contract; 'viewport' is a reserved rectangle reference.")
    args = parser.parse_args()

    def reject_constant(value):
        raise ValueError(f"{value} is not a finite JSON number.")

    try:
        report = validate(json.loads(args.path.read_text(encoding="utf-8"), parse_constant=reject_constant))
    except (OSError, UnicodeError, ValueError) as error:
        report = invalid(f"Cannot read JSON contract: {error}")
    print(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False))
    return {"pass": 0, "fail": 1, "invalid": 2}[report["status"]]


if __name__ == "__main__":
    raise SystemExit(main())
