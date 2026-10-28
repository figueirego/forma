"""Behavior checks for local helpers; synthetic evidence is not product QA."""
import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from check_contrast import contrast
from check_evidence import validate


class ContrastTests(unittest.TestCase):
    def test_extremes(self):
        self.assertAlmostEqual(contrast("#000000", "#ffffff"), 21)
        self.assertEqual(contrast("#123456", "#123456"), 1)

    def test_no_rounding_pass(self):
        self.assertLess(contrast("#777777", "#ffffff"), 4.5)

    def test_rejects_nonopaque(self):
        for color in ("transparent", "#fff", "#ffffff80", "#gggggg"):
            with self.assertRaises(ValueError):
                contrast(color, "#ffffff")

    def test_example_pairs(self):
        data = json.loads((ROOT / "assets/tokens.example.json").read_text())
        for pair in data["contrastPairs"]:
            palette = data["color"][pair["mode"]]
            with self.subTest(pair=pair):
                self.assertGreaterEqual(contrast(palette[pair["foreground"]], palette[pair["background"]]), pair["minimum"])


class EvidenceTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.base = Path(self.tmp.name)
        (self.base / "result.txt").write_text("Synthetic test fixture, not real product evidence.")
        self.report = {"schema_version": 1, "scope": "helper fixture", "targets": ["a"], "checks": [
            {"id": "one", "target": "a", "status": "pass", "observation": "Synthetic", "artifact": "result.txt"}]}

    def test_valid_structure(self):
        self.assertEqual(validate(self.report, self.base), [])

    def test_each_target_needs_evidence(self):
        self.report["targets"].append("b")
        self.assertTrue(validate(self.report, self.base))

    def test_unresolved_and_na_do_not_fake_pass(self):
        for status in ("fail", "untested", "not-applicable"):
            data = copy.deepcopy(self.report)
            data["checks"][0].update(status=status, reason="fixture")
            self.assertTrue(validate(data, self.base))

    def test_bad_artifacts(self):
        (self.base / "empty.txt").touch()
        (self.base / "link.txt").symlink_to(self.base / "result.txt")
        for artifact in ("missing.txt", "empty.txt", "../result.txt", str(self.base / "result.txt"), "link.txt", "."):
            with self.subTest(artifact=artifact):
                data = copy.deepcopy(self.report)
                data["checks"][0]["artifact"] = artifact
                self.assertTrue(validate(data, self.base))

    def test_duplicate_and_malformed(self):
        self.report["checks"].append(copy.deepcopy(self.report["checks"][0]))
        self.assertTrue(validate(self.report, self.base))
        for data in (None, [], {}, {"targets": [None]}, {"targets": ["a"], "checks": [None]}):
            self.assertTrue(validate(data, self.base))

    def test_example_is_explicitly_untested(self):
        data = json.loads((ROOT / "assets/evidence.example.json").read_text())
        self.assertTrue(validate(data, ROOT / "assets"))


if __name__ == "__main__":
    unittest.main()
