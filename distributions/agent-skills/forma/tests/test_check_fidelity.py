"""Synthetic measurement checks; passing fixtures are not visual product QA."""
import copy
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.dont_write_bytecode = True
sys.path.insert(0, str(ROOT / "scripts"))
from check_fidelity import validate


class FidelityTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.base = Path(self.tmp.name)
        (self.base / "capture.txt").write_text("Synthetic measurements, not a real UI capture.", encoding="utf-8")
        self.contract = {
            "schema_version": 1,
            "profile_id": "synthetic-lighting",
            "checks": [
                {"id": "width", "kind": "number", "expected": 268, "tolerance": .25},
                {"id": "theme", "kind": "exact", "expected": {"modes": ["light", "dark"], "enabled": True, "selection": None}},
            ],
        }
        self.observation = {
            "schema_version": 1,
            "profile_id": "synthetic-lighting",
            "results": [
                {"id": "width", "actual": 268, "artifact": "capture.txt"},
                {"id": "theme", "actual": copy.deepcopy(self.contract["checks"][1]["expected"]), "artifact": "capture.txt"},
            ],
        }

    def check(self):
        return validate(self.contract, self.observation, self.base)

    def test_matching_measurements_do_not_mutate_inputs_or_artifact(self):
        original_contract = copy.deepcopy(self.contract)
        original_observation = copy.deepcopy(self.observation)
        artifact = (self.base / "capture.txt").read_bytes()
        self.assertEqual(self.check(), [])
        self.assertEqual(self.contract, original_contract)
        self.assertEqual(self.observation, original_observation)
        self.assertEqual((self.base / "capture.txt").read_bytes(), artifact)

    def test_tolerance_boundary_is_inclusive_but_does_not_round(self):
        for value, passes in ((267.75, True), (268.25, True), (268.2500001, False), (267.7499999, False)):
            with self.subTest(actual=value):
                self.observation["results"][0]["actual"] = value
                self.assertEqual(not self.check(), passes)

    def test_omitted_tolerance_means_zero(self):
        self.contract["checks"][0].pop("tolerance")
        self.assertEqual(self.check(), [])
        self.observation["results"][0]["actual"] = 268.000001
        self.assertTrue(self.check())

    def test_tolerance_is_absolute_not_relative(self):
        self.contract["checks"][0].update(expected=10**12, tolerance=.25)
        self.observation["results"][0]["actual"] = 10**12 + 1
        self.assertTrue(self.check())

    def test_large_integers_keep_precision_and_finite_float_delta_does_not_overflow(self):
        check = self.contract["checks"][0]
        result = self.observation["results"][0]
        check.update(expected=2**53, tolerance=0)
        result["actual"] = 2**53 + 1
        self.assertTrue(self.check())
        check.update(expected=10**400, tolerance=0)
        result["actual"] = 10**400
        self.assertEqual(self.check(), [])
        result["actual"] += 1
        self.assertTrue(self.check())
        check.update(expected=1e308, tolerance=1e308)
        result["actual"] = -1e308
        self.assertTrue(self.check())

    def test_number_does_not_require_identical_int_float_types(self):
        self.observation["results"][0]["actual"] = 268.0
        self.assertEqual(self.check(), [])
        self.contract["checks"][0].update(expected=-8, tolerance=0)
        self.observation["results"][0]["actual"] = -8.0
        self.assertEqual(self.check(), [])

    def test_number_expected_and_actual_require_finite_nonbool_numbers(self):
        invalid = (True, False, "268", None, [], {}, float("nan"), float("inf"), -float("inf"))
        for value in invalid:
            for side in ("expected", "actual"):
                contract, observation = copy.deepcopy(self.contract), copy.deepcopy(self.observation)
                if side == "expected":
                    contract["checks"][0][side] = value
                else:
                    observation["results"][0][side] = value
                with self.subTest(side=side, value=value):
                    self.assertTrue(validate(contract, observation, self.base))

    def test_tolerance_requires_finite_nonnegative_nonbool_number(self):
        for value in (-1, True, False, "1", None, [], float("nan"), float("inf"), -float("inf")):
            with self.subTest(tolerance=value):
                self.contract["checks"][0]["tolerance"] = value
                self.assertTrue(self.check())

    def test_exact_is_recursive_and_type_strict(self):
        for expected, actual in (
            (True, 1), (False, 0), (1, 1.0), ("1", 1),
            ({"value": [True]}, {"value": [1]}),
            ({"value": [1]}, {"value": [1.0]}),
            (["light", "dark"], ["dark", "light"]),
            ({"value": None}, {"value": None, "extra": False}),
        ):
            with self.subTest(expected=expected, actual=actual):
                self.contract["checks"][1]["expected"] = expected
                self.observation["results"][1]["actual"] = actual
                self.assertTrue(self.check())

    def test_exact_accepts_json_values_and_object_key_order_is_irrelevant(self):
        for value in (None, True, False, 1, 1.5, "blue", [], {}, [None, False, {"x": 1.5}]):
            with self.subTest(value=value):
                self.contract["checks"][1]["expected"] = copy.deepcopy(value)
                self.observation["results"][1]["actual"] = copy.deepcopy(value)
                self.assertEqual(self.check(), [])
        self.contract["checks"][1]["expected"] = {"a": 1, "b": False}
        self.observation["results"][1]["actual"] = {"b": False, "a": 1}
        self.assertEqual(self.check(), [])

    def test_exact_rejects_non_json_types_and_nested_nonfinite_values(self):
        invalid = (float("nan"), float("inf"), {"x": [-float("inf")]}, (1, 2), {1: "not a JSON key"}, {1, 2})
        for value in invalid:
            for side in ("expected", "actual"):
                contract, observation = copy.deepcopy(self.contract), copy.deepcopy(self.observation)
                if side == "expected":
                    contract["checks"][1][side] = value
                else:
                    observation["results"][1][side] = value
                with self.subTest(side=side, value=value):
                    self.assertTrue(validate(contract, observation, self.base))

    def test_null_does_not_replace_missing_expected_or_actual(self):
        self.contract["checks"][1]["expected"] = None
        self.observation["results"][1]["actual"] = None
        self.assertEqual(self.check(), [])
        for document, collection, field in ((self.contract, "checks", "expected"), (self.observation, "results", "actual")):
            saved = document[collection][1].pop(field)
            self.assertTrue(self.check())
            document[collection][1][field] = saved

    def test_all_declared_checks_are_required_exactly_once(self):
        self.observation["results"].pop()
        self.assertTrue(any("required result is missing" in error for error in self.check()))
        self.observation["results"].append(copy.deepcopy(self.observation["results"][0]))
        self.assertTrue(any("duplicate result" in error for error in self.check()))

    def test_unknown_result_and_duplicate_contract_ids_fail(self):
        self.observation["results"][0]["id"] = "unknown"
        self.assertTrue(any("unknown result" in error for error in self.check()))
        self.observation["results"][0]["id"] = "width"
        self.contract["checks"].append(copy.deepcopy(self.contract["checks"][0]))
        self.assertTrue(any("duplicate contract" in error for error in self.check()))

    def test_profiles_and_versions_must_match_the_schema(self):
        for field, value in (("profile_id", "different"), ("profile_id", ""), ("profile_id", None),
                             ("schema_version", True), ("schema_version", 1.0), ("schema_version", 2)):
            observation = copy.deepcopy(self.observation)
            observation[field] = value
            with self.subTest(field=field, value=value):
                self.assertTrue(validate(self.contract, observation, self.base))
        self.contract["schema_version"] = False
        self.assertTrue(self.check())

    def test_malformed_documents_checks_and_results_fail_without_crashing(self):
        for contract, observation in (
            (None, self.observation), (self.contract, []), ({}, self.observation),
            (dict(self.contract, checks=[]), self.observation),
            (dict(self.contract, checks=[None]), self.observation),
            (dict(self.contract, checks=[{"id": [], "kind": "number", "expected": 1}]), self.observation),
            (dict(self.contract, checks=[{"id": "x", "kind": [], "expected": 1}]), self.observation),
            (self.contract, dict(self.observation, results=None)),
            (self.contract, dict(self.observation, results=[])),
            (self.contract, dict(self.observation, results=[None])),
            (self.contract, dict(self.observation, results=[{"id": [], "actual": 1, "artifact": "capture.txt"}])),
        ):
            with self.subTest(contract=contract, observation=observation):
                self.assertTrue(validate(contract, observation, self.base))

    def test_observation_cannot_override_tolerance_or_expected_value(self):
        for extra in ({"tolerance": 1000}, {"expected": 300}, {"kind": "exact"}, {"status": "pass"}):
            observation = copy.deepcopy(self.observation)
            observation["results"][0].update(actual=300, **extra)
            with self.subTest(extra=extra):
                errors = validate(self.contract, observation, self.base)
                self.assertTrue(any("unknown fields" in error for error in errors))
                self.assertTrue(any("beyond the contract tolerance" in error for error in errors))
        self.assertEqual(self.contract["checks"][0]["expected"], 268)

    def test_self_baseline_in_observation_and_status_without_actual_do_not_pass(self):
        self.observation["results"][0]["actual"] = 300
        self.observation["checks"] = [{"id": "width", "kind": "number", "expected": 300}]
        self.observation["expected"] = {"width": 300}
        self.assertTrue(self.check())
        self.observation.pop("checks")
        self.observation.pop("expected")
        self.observation["results"][0].pop("actual")
        self.observation["results"][0]["status"] = "pass"
        self.assertTrue(any("actual" in error for error in self.check()))

    def test_unknown_contract_fields_and_exact_tolerance_fail(self):
        for check in (
            {"id": "width", "kind": "number", "expected": 268, "tolernace": 1000},
            {"id": "width", "kind": "exact", "expected": 268, "tolerance": 0},
            {"id": "width", "kind": "unknown", "expected": 268},
        ):
            with self.subTest(check=check):
                contract = dict(self.contract, checks=[check])
                observation = dict(self.observation, results=[self.observation["results"][0]])
                errors = validate(contract, observation, self.base)
                self.assertTrue(errors)
                self.assertTrue(all(error.startswith("checks[0]:") for error in errors))
        self.contract["baseline"] = self.observation
        self.assertTrue(self.check())

    def test_nested_relative_artifact_is_valid(self):
        nested = self.base / "evidence"
        nested.mkdir()
        (nested / "capture.txt").write_text("Synthetic nested evidence.", encoding="utf-8")
        self.observation["results"][0]["artifact"] = "evidence/capture.txt"
        self.assertEqual(self.check(), [])

    def test_missing_empty_directory_absolute_and_traversing_artifacts_fail(self):
        (self.base / "empty.txt").touch()
        (self.base / "folder").mkdir()
        for artifact in (None, "", " ", "missing.txt", "empty.txt", "folder", ".", "../capture.txt",
                         "folder/../capture.txt", str(self.base / "capture.txt"), "/capture.txt",
                         "C:/capture.txt", "C:relative.txt", "C:\\capture.txt", "\\\\server\\share\\capture.txt",
                         "..\\capture.txt", "folder\\capture.txt", "bad\x00name"):
            with self.subTest(artifact=artifact):
                self.observation["results"][0]["artifact"] = artifact
                self.assertTrue(self.check())

    def test_symlink_files_and_intermediate_directories_fail(self):
        folder = self.base / "folder"
        folder.mkdir()
        (folder / "capture.txt").write_text("Synthetic evidence.", encoding="utf-8")
        try:
            (self.base / "link.txt").symlink_to(self.base / "capture.txt")
            (self.base / "linked-folder").symlink_to(folder, target_is_directory=True)
            (self.base / "dangling.txt").symlink_to(self.base / "absent.txt")
        except (OSError, NotImplementedError):
            self.skipTest("Creating symlinks is unavailable on this platform.")
        for artifact in ("link.txt", "linked-folder/capture.txt", "dangling.txt"):
            with self.subTest(artifact=artifact):
                self.observation["results"][0]["artifact"] = artifact
                self.assertTrue(any("symlink" in error for error in self.check()))

    def run_cli(self, contract_path, observation_path):
        return subprocess.run(
            [sys.executable, str(ROOT / "scripts/check_fidelity.py"), str(contract_path), str(observation_path)],
            capture_output=True, text=True, env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"},
        )

    def test_cli_success_uses_observation_directory_and_states_its_limits(self):
        contracts = self.base / "contracts"
        contracts.mkdir()
        contract_path = contracts / "contract.json"
        observation_path = self.base / "observation.json"
        contract_path.write_text(json.dumps(self.contract), encoding="utf-8")
        observation_path.write_text(json.dumps(self.observation), encoding="utf-8")
        before = {path: path.read_bytes() for path in self.base.rglob("*") if path.is_file()}
        run = self.run_cli(contract_path, observation_path)
        self.assertEqual(run.returncode, 0, run.stdout + run.stderr)
        self.assertIn("PASS: supplied measurements", run.stdout)
        for limitation in ("capture authenticity", "requirement completeness", "loaded revision", "visual quality"):
            self.assertIn(limitation, run.stdout)
        after = {path: path.read_bytes() for path in self.base.rglob("*") if path.is_file()}
        self.assertEqual(after, before)

    def test_cli_divergent_or_incomplete_data_exits_one(self):
        contract_path = self.base / "contract.json"
        observation_path = self.base / "observation.json"
        contract_path.write_text(json.dumps(self.contract), encoding="utf-8")
        variants = [dict(self.observation, results=[]), dict(self.observation, profile_id="other")]
        mismatch = copy.deepcopy(self.observation)
        mismatch["results"][0]["actual"] = 300
        variants.append(mismatch)
        absent = copy.deepcopy(self.observation)
        absent["results"][0]["artifact"] = "absent.txt"
        variants.append(absent)
        for data in variants:
            with self.subTest(data=data):
                observation_path.write_text(json.dumps(data), encoding="utf-8")
                run = self.run_cli(contract_path, observation_path)
                self.assertEqual(run.returncode, 1, run.stdout + run.stderr)
                self.assertNotIn("PASS:", run.stdout)

    def test_cli_invalid_json_nonfinite_duplicate_keys_and_io_exit_two(self):
        contract_path = self.base / "contract.json"
        observation_path = self.base / "observation.json"
        valid_contract = json.dumps(self.contract)
        valid_observation = json.dumps(self.observation)
        invalid = ("{", '{"schema_version":1,"schema_version":1}',
                   '{"value":NaN}', '{"value":Infinity}', '{"value":-Infinity}',
                   '{"value":1e400}', '{"nested":{"actual":1,"actual":2}}')
        for content in invalid:
            for side in ("contract", "observation"):
                contract_path.write_text(content if side == "contract" else valid_contract, encoding="utf-8")
                observation_path.write_text(content if side == "observation" else valid_observation, encoding="utf-8")
                with self.subTest(side=side, content=content):
                    run = self.run_cli(contract_path, observation_path)
                    self.assertEqual(run.returncode, 2, run.stdout + run.stderr)
                    self.assertIn("INVALID:", run.stdout)
        contract_path.write_text(valid_contract, encoding="utf-8")
        observation_path.write_bytes(b"\xff")
        self.assertEqual(self.run_cli(contract_path, observation_path).returncode, 2)
        observation_path.unlink()
        self.assertEqual(self.run_cli(contract_path, observation_path).returncode, 2)


if __name__ == "__main__":
    unittest.main()
