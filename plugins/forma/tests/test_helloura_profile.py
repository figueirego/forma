"""Validate transfer contracts and icon packaging, not rendered/production fidelity."""

import json
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]


class HelloUraProfileTests(unittest.TestCase):
    def setUp(self):
        self.profile = json.loads(
            (ROOT / "assets/reference-profiles/helloura-experience.json").read_text()
        )
        self.material = json.loads(
            (ROOT / "assets/soft-glass/calm-navigation.json").read_text()
        )

    def test_experience_and_material_share_current_context_and_source_evidence(self):
        navigation = self.material["navigation"]
        self.assertEqual(self.profile["theme"]["sidebar"], navigation["surface"])
        self.assertEqual(self.profile["theme"]["accentOrange"], navigation["selectedIcon"])
        self.assertEqual(navigation["selectedIcon"], navigation["selectedIndicator"]["color"])
        self.assertEqual(self.profile["context"]["approved"], navigation["contextStyle"])
        self.assertEqual(navigation["contextStyle"], "integrated")
        self.assertEqual(navigation["contextBlur"], "none")
        self.assertNotEqual(navigation["selectedFill"], navigation["brandAccent"])
        evidence = {item["file"]: item["sha256"] for item in self.profile["sourceEvidence"]
                    if item["surface"] == "workspace"}
        for record in self.material["evidence"]["files"]:
            if record["file"] in evidence:
                self.assertEqual(record["sha256"], evidence[record["file"]])

    def test_private_artifact_is_not_misrepresented_as_a_public_runtime(self):
        kit = self.profile["localKit"]
        self.assertFalse(kit["distributed"])
        self.assertEqual(set(kit["entrypoints"]), {"workspace", "landing"})
        self.assertTrue(kit["manifest"].startswith("~/.local/share/forma/reference-kits/"))
        self.assertIn("Visual simulation only", self.profile["routes"]["boundary"])
        self.assertGreater(len(self.profile["validation"]["limits"]), 0)
        serialized = json.dumps(self.profile)
        self.assertNotIn("/Users/", serialized)
        self.assertNotIn("C:\\\\Users", serialized)

    def test_icon_family_has_unique_safe_symbols_and_shared_geometry(self):
        sprite = ET.parse(ROOT / "assets/operational-icons.svg").getroot()
        namespace = "{http://www.w3.org/2000/svg}"
        symbols = sprite.findall(f".//{namespace}symbol")
        ids = [symbol.attrib["id"] for symbol in symbols]
        self.assertEqual(len(symbols), self.profile["icons"]["count"])
        self.assertEqual(len(ids), len(set(ids)))
        self.assertTrue({"op-history", "op-phone-hangup", "op-message"}.issubset(ids))
        for symbol in symbols:
            self.assertEqual(symbol.attrib["viewBox"], self.profile["icons"]["viewBox"])
            self.assertEqual(float(symbol.attrib["stroke-width"]), self.profile["icons"]["strokeWidth"])
            self.assertEqual(symbol.attrib["stroke"], "currentColor")
            self.assertEqual(symbol.attrib["stroke-linecap"], "round")
            self.assertEqual(symbol.attrib["stroke-linejoin"], "round")
            self.assertGreater(len(symbol), 0)
        allowed = {"svg", "title", "defs", "symbol", "g", "path", "circle", "rect", "line", "polyline", "polygon"}
        for node in sprite.iter():
            self.assertIn(node.tag.removeprefix(namespace), allowed)
            for attribute in node.attrib:
                self.assertFalse(attribute.lower().startswith("on"))
                self.assertNotIn("href", attribute.lower())

    def test_corrected_history_arrow_meets_the_clock_arc(self):
        sprite = ET.parse(ROOT / "assets/operational-icons.svg").getroot()
        namespace = "{http://www.w3.org/2000/svg}"
        history = sprite.find(f".//{namespace}symbol[@id='op-history']")
        paths = [node.attrib["d"] for node in history.findall(f"{namespace}path")]
        self.assertIn("M4.5 8a8.5 8.5 0 1 1 0 8", paths)
        self.assertIn("M4.5 3.5V8H9M12 7.5V12l3 2", paths)


if __name__ == "__main__":
    unittest.main()
