"""Portable package regressions using synthetic fixtures, not product QA."""
import copy
import hashlib
import json
from pathlib import Path
import shutil
import stat
import subprocess
import sys
import tempfile
import unittest
from zipfile import ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
sys.dont_write_bytecode = True
sys.path.insert(0, str(ROOT / "scripts"))
from check_package import audit


def write(root, name, content):
    path = root / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def hashes(root):
    return {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in root.rglob("*") if p.is_file()}


class PackageTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.base = Path(self.tmp.name)
        self.source = self.base / "canonical"
        write(self.source, "SKILL.md", '---\nname: forma\ndescription: "Synthetic fixture"\nmetadata:\n  version: 1.0.0\n---\n# Forma\n[Guide](references/guide.md#t\u00edtulo-\u00fatil)\n[Again](references/guide.md#repetido-1)\n')
        write(self.source, "references/guide.md", "# T\u00edtulo \u00fatil\n## Repetido\n## Repetido\n\n```markdown\n[Not a real link](absent.md)\n```\n")
        write(self.source, "agents/openai.yaml", 'interface:\n  default_prompt: "Use $forma for this fixture."\npolicy:\n  allow_implicit_invocation: true\n')
        write(self.source, "assets/icon.svg", '<svg viewBox="0 0 64 64"></svg>\n')

    def plugin(self):
        root = self.base / "plugin"
        entries = []
        for path in sorted(self.source.rglob("*")):
            if not path.is_file():
                continue
            relative = path.relative_to(self.source).as_posix()
            target = "skills/forma/" + relative if relative == "SKILL.md" or relative.startswith("agents/") else relative
            data = path.read_text(encoding="utf-8")
            if relative == "SKILL.md":
                data = data.replace("(references/", "(../../references/")
            if relative.endswith("openai.yaml"):
                data = data.replace("$forma", "$forma:forma")
            write(root, target, data)
            entries.append({"source": relative, "packaged": target,
                            "source_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                            "packaged_sha256": hashlib.sha256((root / target).read_bytes()).hexdigest()})
        manifest = {"name": "forma", "version": "1.0.0", "skills": "./skills/",
                    "interface": {"logo": "./assets/icon.svg", "composerIcon": "./assets/icon.svg", "screenshots": []}}
        write(root, ".codex-plugin/plugin.json", json.dumps(manifest))
        write(root, "provenance.json", json.dumps({"files": entries}))
        return root

    def codes(self, report):
        return {item["code"] for item in report["errors"]}

    def zip(self, root, prefix="", extra=None):
        path = self.base / "package.zip"
        with ZipFile(path, "w") as zipped:
            for file in sorted(root.rglob("*")):
                if file.is_file():
                    zipped.writestr(prefix + file.relative_to(root).as_posix(), file.read_bytes())
            for name, value in (extra or {}).items():
                zipped.writestr(name, value)
        return path

    def cli(self, *args):
        return subprocess.run([sys.executable, "-B", str(ROOT / "scripts/check_package.py"), *map(str, args)],
                              text=True, capture_output=True, check=False)

    def test_standalone_catalog_links_anchors_and_read_only(self):
        before = hashes(self.source)
        report = audit(self.source)
        self.assertEqual(report["status"], "pass", report)
        self.assertEqual(report["catalog"], [{"name": "forma", "path": "SKILL.md", "invocation": "$forma"}])
        self.assertEqual(report["counts"]["local_links"], 2)
        self.assertEqual(hashes(self.source), before)

    def test_plugin_source_cache_wrapper_zip_and_dynamic_catalog(self):
        root = self.plugin()
        installed = self.base / "installed"
        shutil.copytree(root, installed)
        archive = self.zip(root, "market/plugins/forma/", {"market/README.md": "Container documentation"})
        report = audit(root, installed=installed, archive=archive, source=self.source)
        self.assertEqual(report["status"], "pass", report)
        self.assertEqual(report["counts"]["skills"], 1)
        self.assertEqual(report["catalog"][0]["invocation"], "$forma:forma")
        self.assertEqual(report["archive_root"], "market/plugins/forma/")

    def test_reference_definition_and_angle_path_with_spaces(self):
        write(self.source, "references/a b.md", "# Another\n")
        with (self.source / "SKILL.md").open("a", encoding="utf-8") as stream:
            stream.write('\n[Space](<references/a b.md#another> "title")\n[Named][ref]\n[ref]: references/guide.md#t\u00edtulo-\u00fatil\n')
        self.assertEqual(audit(self.source)["status"], "pass")

    def test_specialist_release_version_must_match_coordinator(self):
        path = "skills/objects-3d/SKILL.md"
        header = '---\nname: forma-objects-3d\ndescription: "Synthetic specialist"\nmetadata:\n  version: {}\n---\n'
        write(self.source, path, header.format("1.0.0"))
        self.assertEqual(audit(self.source)["status"], "pass")
        write(self.source, path, header.format("0.9.0"))
        errors = audit(self.source)["errors"]
        self.assertTrue(any(e["code"] == "skill-version" and e["path"] == path for e in errors), errors)

    def test_missing_duplicate_or_body_only_version_cannot_pass(self):
        base = '---\nname: forma\ndescription: "Synthetic fixture"\n{}---\n# Forma\n'
        for metadata in ("", "metadata:\n  version: 1.0.0\n  version: 1.0.1\n", "metadata:\n  version: unknown\n"):
            with self.subTest(metadata=metadata):
                write(self.source, "SKILL.md", base.format(metadata) + "metadata:\n  version: 1.0.0\n")
                self.assertIn("skill-version", self.codes(audit(self.source)))

    def test_manifest_release_version_must_match_skill_metadata(self):
        root = self.plugin()
        path = root / ".codex-plugin/plugin.json"
        manifest = json.loads(path.read_text())
        manifest["version"] = "1.0.1"
        path.write_text(json.dumps(manifest))
        self.assertIn("skill-version", self.codes(audit(root)))

    def test_flat_skill_distribution_enforces_versions_without_manifest(self):
        root = self.base / "flat"
        header = '---\nname: {}\ndescription: "Synthetic fixture"\nmetadata:\n  version: {}\n---\n'
        write(root, "forma/SKILL.md", header.format("forma", "1.0.0"))
        path = "forma-motion/SKILL.md"
        write(root, path, header.format("forma-motion", "1.0.0"))
        self.assertEqual(audit(root)["status"], "pass")
        write(root, path, header.format("forma-motion", "0.9.0"))
        self.assertIn("skill-version", self.codes(audit(root)))

    def test_broken_file_and_heading_fail_separately(self):
        with (self.source / "SKILL.md").open("a", encoding="utf-8") as stream:
            stream.write("\n[Missing](references/absent.md)\n[Bad heading](references/guide.md#absent)\n")
        self.assertTrue({"link-missing", "anchor-missing"}.issubset(self.codes(audit(self.source))))

    def test_percent_encoded_escape_is_rejected_even_when_target_exists(self):
        write(self.base, "outside.md", "# Outside\n")
        with (self.source / "SKILL.md").open("a", encoding="utf-8") as stream:
            stream.write("\n[Escape](%2e%2e/outside.md)\n")
        self.assertIn("link-escape", self.codes(audit(self.source)))

    def test_absolute_local_path_is_not_portable(self):
        with (self.source / "SKILL.md").open("a", encoding="utf-8") as stream:
            stream.write("\n[Absolute]({})\n".format(self.source / "references/guide.md"))
        self.assertIn("link-escape", self.codes(audit(self.source)))

    def test_file_url_cannot_bypass_local_path_check(self):
        with (self.source / "SKILL.md").open("a", encoding="utf-8") as stream:
            stream.write("\n[Local file](file:///private/outside.md)\n")
        self.assertIn("link-escape", self.codes(audit(self.source)))

    def test_symlink_file_directory_and_root_are_rejected(self):
        write(self.base, "outside.txt", "outside")
        (self.source / "linked.txt").symlink_to(self.base / "outside.txt")
        (self.source / "directory-link").symlink_to(self.source / "references", target_is_directory=True)
        self.assertIn("symlink", self.codes(audit(self.source)))
        linked_root = self.base / "root-link"
        linked_root.symlink_to(self.source, target_is_directory=True)
        self.assertIn("symlink", self.codes(audit(linked_root)))

    def test_duplicate_skill_and_missing_frontmatter_are_rejected(self):
        write(self.source, "skills/duplicate/SKILL.md", '---\nname: forma\ndescription: "Duplicate"\n---\n')
        write(self.source, "skills/invalid/SKILL.md", "# No frontmatter\n")
        self.assertTrue({"duplicate-skill", "frontmatter"}.issubset(self.codes(audit(self.source))))

    def test_empty_or_duplicate_scalar_does_not_pass_as_yaml(self):
        for header in ("name: forma\ndescription:\nmetadata: yes", "name: forma\nname: another\ndescription: valid", "name: bad_name\ndescription: valid", "name: forma\ndescription: true", "name: 42\ndescription: valid"):
            with self.subTest(header=header):
                write(self.source, "SKILL.md", "---\n" + header + "\n---\n")
                self.assertEqual(audit(self.source)["status"], "fail")

    def test_manifest_path_traversal_and_missing_icon(self):
        root = self.plugin()
        manifest_path = root / ".codex-plugin/plugin.json"
        manifest = json.loads(manifest_path.read_text())
        manifest["skills"] = "./../canonical"
        manifest["interface"]["logo"] = "./assets/absent.svg"
        manifest_path.write_text(json.dumps(manifest))
        self.assertTrue({"manifest-path", "manifest-missing", "empty-catalog"}.issubset(self.codes(audit(root))))

    def test_skill_outside_declared_roots_is_not_silently_ignored(self):
        root = self.plugin()
        write(root, "hidden/SKILL.md", '---\nname: hidden\ndescription: "Hidden"\n---\n')
        self.assertIn("undiscovered-skill", self.codes(audit(root)))

    def test_recorded_catalog_drift_and_duplicate_records_fail(self):
        root = self.plugin()
        skills = audit(root)["catalog"]
        data = {"version": "1.0.0", "skills": skills}
        write(root, "catalog.json", json.dumps(data))
        self.assertEqual(audit(root)["status"], "pass")
        for changed in (
            {"version": "0.9.0", "skills": skills},
            {"version": "1.0.0", "skills": skills + skills},
            {"version": "1.0.0", "skills": [{**skills[0], "invocation": "$forma"}]},
        ):
            with self.subTest(changed=changed):
                write(root, "catalog.json", json.dumps(changed))
                self.assertTrue({"catalog-mismatch", "catalog-version"}.intersection(self.codes(audit(root))))

    def test_wrong_namespace_fails_even_if_expected_token_also_appears(self):
        root = self.plugin()
        metadata = "skills/forma/agents/openai.yaml"
        for prompt in ("Use $forma", "Use $other:forma", "Use $forma:forma and $forma", "Use $forma:missing", "Use $forma:forma:forma"):
            with self.subTest(prompt=prompt):
                write(root, metadata, 'interface:\n  default_prompt: "{}"\n'.format(prompt))
                self.assertIn("prompt-namespace", self.codes(audit(root)))

    def test_plain_prompts_need_no_forced_invocation_but_manifest_tokens_must_resolve(self):
        root = self.plugin()
        metadata = "skills/forma/agents/openai.yaml"
        write(root, metadata, 'interface:\n  default_prompt: "Refine this interface."\n')
        # Refresh the fixture's integrity record after the intentional valid change.
        provenance_path = root / "provenance.json"
        provenance = json.loads(provenance_path.read_text())
        for entry in provenance["files"]:
            if entry["packaged"] == metadata:
                entry["packaged_sha256"] = hashlib.sha256((root / metadata).read_bytes()).hexdigest()
        provenance_path.write_text(json.dumps(provenance))
        manifest_path = root / ".codex-plugin/plugin.json"
        manifest = json.loads(manifest_path.read_text())
        manifest["interface"]["defaultPrompt"] = ["Refine this interface.", "Use $forma:forma"]
        manifest_path.write_text(json.dumps(manifest))
        self.assertEqual(audit(root)["status"], "pass")
        for value in ("Use $forma", ["Use $forma:missing"]):
            manifest["interface"]["defaultPrompt"] = value
            manifest_path.write_text(json.dumps(manifest))
            self.assertIn("prompt-namespace", self.codes(audit(root)))

    def test_provenance_detects_corrupted_packaged_and_source_bytes(self):
        root = self.plugin()
        write(root, "assets/icon.svg", "corrupted package")
        write(self.source, "references/guide.md", "corrupted source")
        errors = audit(root, source=self.source)["errors"]
        self.assertTrue(any(e["code"] == "provenance-hash" and "packaged bytes" in e["detail"] for e in errors))
        self.assertTrue(any(e["code"] == "provenance-hash" and "source bytes" in e["detail"] for e in errors))

    def test_provenance_duplicate_omission_and_escape(self):
        root = self.plugin()
        path = root / "provenance.json"
        data = json.loads(path.read_text())
        data["files"].append(copy.deepcopy(data["files"][0]))
        data["files"][1]["source"] = "../outside"
        path.write_text(json.dumps(data))
        self.assertTrue({"provenance-duplicate", "provenance-path", "provenance-omission"}.issubset(self.codes(audit(root, source=self.source))))

    def test_installed_missing_extra_and_different_bytes(self):
        root = self.plugin()
        installed = self.base / "installed"
        shutil.copytree(root, installed)
        (installed / "references/guide.md").unlink()
        write(installed, "extra.txt", "unexpected")
        write(installed, "assets/icon.svg", "different")
        self.assertTrue({"installed-missing", "installed-extra", "installed-mismatch"}.issubset(self.codes(audit(root, installed=installed))))

    def test_zip_extra_missing_corruption_and_traversal(self):
        root = self.plugin()
        archived = self.base / "archived"
        shutil.copytree(root, archived)
        (archived / "references/guide.md").unlink()
        write(archived, "assets/icon.svg", "different")
        archive = self.zip(archived, "plugin/", {"plugin/extra.txt": "extra", "../escape.txt": "unsafe"})
        self.assertTrue({"archive-extra", "archive-missing", "archive-mismatch", "archive-path"}.issubset(self.codes(audit(root, archive=archive))))

    def test_zip_symlink_is_rejected_without_extraction(self):
        archive = self.zip(self.source, "forma/")
        with ZipFile(archive, "a") as zipped:
            info = ZipInfo("forma/link.txt")
            info.create_system = 3
            info.external_attr = (stat.S_IFLNK | 0o777) << 16
            zipped.writestr(info, "../../outside.txt")
        self.assertIn("archive-symlink", self.codes(audit(self.source, archive=archive)))
        self.assertFalse((self.base / "outside.txt").exists())

    def test_transient_files_ignored_but_symlinks_never_ignored(self):
        write(self.source, "__pycache__/test.pyc", "temporary")
        write(self.source, ".DS_Store", "temporary")
        self.assertEqual(audit(self.source)["status"], "pass")
        (self.source / "ignored.pyc").symlink_to(self.source / "SKILL.md")
        self.assertIn("symlink", self.codes(audit(self.source)))

    def test_target_python_is_only_read_never_executed(self):
        marker = self.base / "executed.txt"
        write(self.source, "scripts/target.py", "from pathlib import Path\nPath({!r}).write_text('bad')\n".format(str(marker)))
        before = hashes(self.source)
        self.assertEqual(audit(self.source)["status"], "pass")
        self.assertEqual(hashes(self.source), before)
        self.assertFalse(marker.exists())

    def test_cli_exit_codes_and_json_for_bad_input(self):
        good = self.cli("--root", self.source)
        self.assertEqual(good.returncode, 0, good.stderr)
        self.assertEqual(json.loads(good.stdout)["status"], "pass")
        write(self.source, "references/guide.md", "# changed\n")
        failed = self.cli("--root", self.source)
        self.assertEqual(failed.returncode, 1, failed.stderr)
        self.assertEqual(json.loads(failed.stdout)["status"], "fail")
        for args in (("--root", self.base / "absent"), (), ("--unknown", "value")):
            with self.subTest(args=args):
                invalid = self.cli(*args)
                self.assertEqual(invalid.returncode, 2, invalid.stderr)
                self.assertEqual(json.loads(invalid.stdout)["status"], "invalid-input")

    def test_cli_malformed_manifest_and_zip_are_invalid_input(self):
        root = self.plugin()
        for invalid in ('{malformed', '{"name":"forma","name":"other"}', '{"name":"forma","skills":NaN}'):
            with self.subTest(invalid=invalid):
                write(root, ".codex-plugin/plugin.json", invalid)
                result = self.cli("--root", root)
                self.assertEqual(result.returncode, 2, result.stderr)
                self.assertEqual(json.loads(result.stdout)["status"], "invalid-input")
        write(self.base, "bad.zip", "not a zip")
        result = self.cli("--root", self.source, "--archive", self.base / "bad.zip")
        self.assertEqual(result.returncode, 2, result.stderr)


if __name__ == "__main__":
    unittest.main()
