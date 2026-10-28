"""Synthetic layout-contract checks, not browser or perceptual validation."""
import copy
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from check_layout import validate


class LayoutTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / "assets/layout.example.json").read_text())

    def single(self, check):
        self.data["checks"] = [dict(id="test", **check)]
        return validate(self.data)

    def test_example_passes_all_six_types(self):
        report = validate(self.data)
        self.assertEqual(report["status"], "pass")
        self.assertEqual(len({check["type"] for check in report["checks"]}), 6)
        self.assertIn("Synthetic", self.data["description"])

    def test_alignment_uses_spread_and_exact_tolerance(self):
        self.data["elements"]["content"]["x"] += 1
        check = {"type": "align", "elements": ["title", "content"], "edge": "left"}
        self.assertEqual(self.single(check)["status"], "pass")
        self.data["elements"]["content"]["x"] += 0.001
        report = self.single(check)
        self.assertEqual(report["status"], "fail")
        self.assertAlmostEqual(report["checks"][0]["actual"], 1.001)

    def test_all_alignment_edges(self):
        self.data["elements"]["copy"] = copy.deepcopy(self.data["elements"]["title"])
        for edge in ("left", "right", "top", "bottom", "centerX", "centerY"):
            with self.subTest(edge=edge):
                self.assertEqual(self.single({"type": "align", "elements": ["title", "copy"], "edge": edge})["status"], "pass")

    def test_signed_gap_detects_overlap(self):
        self.data["elements"]["content"]["y"] = 130
        check = {"type": "gap", "from": "title", "to": "content", "axis": "y", "expected": 24}
        report = self.single(check)
        self.assertEqual(report["status"], "fail")
        self.assertEqual(report["checks"][0]["actual"], -6)
        check["expected"] = -6
        self.assertEqual(self.single(check)["status"], "pass")

    def test_horizontal_gap_and_inset_directions(self):
        self.data["elements"]["adjacent"] = {"x": 700, "y": 104, "width": 20, "height": 32}
        self.assertEqual(self.single({"type": "gap", "from": "title", "to": "adjacent", "axis": "x", "expected": 24})["status"], "pass")
        for side, expected in (("left", 24), ("top", 24), ("right", 24), ("bottom", 444)):
            with self.subTest(side=side):
                self.assertEqual(self.single({"type": "inset", "container": "panel", "element": "title", "side": side, "expected": expected})["status"], "pass")

    def test_containment_checks_all_sides(self):
        for field, value in (("x", 98), ("x", 150), ("y", 78), ("y", 300)):
            data = copy.deepcopy(self.data)
            data["elements"]["content"][field] = value
            data["checks"] = [{"id": "bounds", "type": "containment", "container": "panel", "element": "content"}]
            with self.subTest(field=field, value=value):
                self.assertEqual(validate(data)["status"], "fail")

    def test_center_uses_specified_parent_not_viewport(self):
        check = {"type": "center", "container": "panel", "element": "title", "axis": "x"}
        self.assertEqual(self.single(check)["status"], "pass")
        check["container"] = "viewport"
        report = self.single(check)
        self.assertEqual(report["status"], "fail")
        self.assertEqual(report["checks"][0]["actual"], -200)
        self.data["elements"]["title"]["y"] = 314
        check.update(container="panel", axis="y")
        self.assertEqual(self.single(check)["status"], "pass")

    def test_overflow_dimensions_are_required_and_tolerated(self):
        check = {"type": "no-horizontal-overflow", "element": "content"}
        self.data["elements"]["content"]["scrollWidth"] = 553
        self.assertEqual(self.single(check)["status"], "pass")
        self.data["elements"]["content"]["scrollWidth"] = 554
        self.assertEqual(self.single(check)["status"], "fail")
        del self.data["elements"]["content"]["clientWidth"]
        self.assertEqual(self.single(check)["status"], "invalid")

    def test_invalid_numeric_values(self):
        for value in (True, False, "24", None, float("nan"), float("inf"), -float("inf"), 10 ** 400):
            for field in ("geometry", "tolerance", "expected"):
                data = copy.deepcopy(self.data)
                if field == "geometry":
                    data["elements"]["title"]["x"] = value
                else:
                    data["checks"][1][field] = value
                with self.subTest(value=str(value), field=field):
                    self.assertEqual(validate(data)["status"], "invalid")

    def test_invalid_shapes_references_and_options(self):
        cases = [None, [], {}, dict(self.data, checks=[]), dict(self.data, checks=[None]),
                 dict(self.data, elements={"viewport": self.data["elements"]["panel"]}),
                 dict(self.data, viewport={"width": 0, "height": 800})]
        for check in (
            {"type": "mystery"},
            {"type": "center", "container": "absent", "element": "title", "axis": "x"},
            {"type": "center", "container": "panel", "element": "title", "axis": "z"},
            {"type": "align", "elements": ["title"], "edge": "left"},
            {"type": "align", "elements": ["title", "title"], "edge": "left"},
            {"type": "align", "elements": ["title", "content"], "edge": []},
            {"type": "gap", "from": "title", "to": "content", "axis": "y"},
            {"type": "containment", "container": "panel", "element": "title", "tolerance": -1},
            {"type": "containment", "container": "panel", "element": "title", "tolernace": 1},
        ):
            cases.append(dict(self.data, checks=[dict(id="bad", **check)]))
        for data in cases:
            with self.subTest(data=data):
                report = validate(data)
                self.assertEqual(report["status"], "invalid")
                self.assertEqual(report["checks"], [])

    def test_duplicate_ids_and_arithmetic_overflow_invalid(self):
        self.data["checks"].append(copy.deepcopy(self.data["checks"][0]))
        self.assertEqual(validate(self.data)["status"], "invalid")
        self.data["checks"].pop()
        self.data["elements"]["panel"].update(x=1e308, width=1e308)
        self.assertEqual(validate(self.data)["status"], "invalid")

    def test_negative_dimensions_invalid_but_signed_coordinates_valid(self):
        self.data["elements"]["outside"] = {"x": -20, "y": -10, "width": 1, "height": 1}
        self.assertEqual(validate(self.data)["status"], "pass")
        for field in ("width", "height", "scrollWidth", "clientWidth"):
            data = copy.deepcopy(self.data)
            data["elements"]["outside"][field] = -1
            with self.subTest(field=field):
                self.assertEqual(validate(data)["status"], "invalid")

    def test_cli_exit_codes_and_json_output(self):
        fail = copy.deepcopy(self.data)
        fail["elements"]["title"]["x"] += 10
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "contract.json"
            for content, status, code in ((json.dumps(self.data), "pass", 0),
                                          (json.dumps(fail), "fail", 1), ("{", "invalid", 2),
                                          (json.dumps(dict(self.data, unused=float("nan"))), "invalid", 2)):
                path.write_text(content)
                run = subprocess.run([sys.executable, str(ROOT / "scripts/check_layout.py"), str(path)], capture_output=True, text=True)
                self.assertEqual(run.returncode, code, run.stderr)
                self.assertEqual(json.loads(run.stdout)["status"], status)
                self.assertEqual(path.read_text(), content)


if __name__ == "__main__":
    unittest.main()
