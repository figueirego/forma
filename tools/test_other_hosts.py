"""Cross-host layout, invocation, resource integrity and relocation regressions."""
from contextlib import redirect_stdout
from io import StringIO
import importlib.util
import json
from pathlib import Path
import re
import shutil
import tempfile
import unittest

from build_forma_plugin import build
from build_other_hosts import build_other_hosts


ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('forma_package_audit', ROOT / 'source/forma/scripts/check_package.py')
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class OtherHostTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.addClassCleanup(cls.temp.cleanup)
        cls.root = Path(cls.temp.name) / 'package'
        with redirect_stdout(StringIO()):
            build(ROOT / 'source/forma', cls.root)
            build_other_hosts(cls.root)

    def test_claude_manifest_catalog_and_original_provenance(self):
        root = self.root / 'plugins/forma-claude'
        report = checker.audit(root, source=ROOT / 'source/forma')
        self.assertEqual(report['errors'], [])
        self.assertEqual(report['counts']['skills'], 12)
        self.assertTrue(all(s['invocation'].startswith('/forma:') for s in report['catalog']))
        self.assertFalse((root / '.codex-plugin').exists())
        entry = json.loads((self.root / '.claude-plugin/marketplace.json').read_text())['plugins'][0]
        self.assertEqual((self.root / entry['source']).resolve(), root.resolve())

    def test_portable_discovery_and_links_survive_install_path(self):
        with tempfile.TemporaryDirectory() as tmp:
            installed = Path(tmp) / 'project with spaces/.agents/skills'
            shutil.copytree(self.root / 'distributions/agent-skills', installed)
            report = checker.audit(installed)
            self.assertEqual(report['errors'], [])
            roots = sorted(installed.glob('*/SKILL.md'))
            self.assertEqual(len(roots), 12)
            self.assertEqual(len(list(installed.rglob('SKILL.md'))), 12)
            for path in roots:
                name = re.search(r'^name: ([a-z0-9-]+)$', path.read_text(), re.M).group(1)
                self.assertEqual(path.parent.name, name)
            coordinator = (installed / 'forma/SKILL.md').read_text()
            self.assertIn('../forma-interface/SKILL.md', coordinator)
            self.assertNotIn('$forma:', coordinator)
            specialist = (installed / 'forma-interface/SKILL.md').read_text()
            self.assertIn('../forma/references/', specialist)

    def test_executable_assets_and_licenses_are_identical_across_hosts(self):
        source = ROOT / 'source/forma'
        paths = [p for p in source.rglob('*') if p.is_file()
                 and (p.suffix in {'.js', '.css', '.html', '.png', '.svg', '.json', '.py'} or p.name == 'LICENSE')
                 and '__pycache__' not in p.parts and p.parts[len(source.parts)] != 'skills']
        self.assertGreater(len(paths), 20)
        for path in paths:
            relative = path.relative_to(source)
            for distribution in ('plugins/forma', 'plugins/forma-claude', 'distributions/agent-skills/forma'):
                self.assertEqual((self.root / distribution / relative).read_bytes(), path.read_bytes(), str(relative))

    def test_namespace_is_specific_to_each_host(self):
        for folder, expected, forbidden in [('forma', '$forma:forma', '/forma:forma'),
                                            ('forma-claude', '/forma:forma', '$forma:forma')]:
            root = self.root / 'plugins' / folder
            for relative in ('skills/forma/SKILL.md', 'skills/forma/agents/openai.yaml'):
                text = (root / relative).read_text()
                self.assertIn(expected, text)
                self.assertNotIn(forbidden, text)

    def test_package_audit_rejects_ambiguous_manifests(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / 'mixed'
            shutil.copytree(self.root / 'plugins/forma-claude', root)
            (root / '.codex-plugin').mkdir()
            (root / '.codex-plugin/plugin.json').write_text((root / '.claude-plugin/plugin.json').read_text())
            self.assertIn('manifest-ambiguous', {e['code'] for e in checker.audit(root)['errors']})

    def test_claude_prompt_namespace_rejects_unknown_command(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / 'invalid-command'
            shutil.copytree(self.root / 'plugins/forma-claude', root)
            metadata = root / 'skills/forma/agents/openai.yaml'
            for invalid in ('/wrong:missing', '/forma:forma:missing'):
                metadata.write_text(f'interface:\n  default_prompt: "Use {invalid}"\n')
                self.assertIn('prompt-namespace', {e['code'] for e in checker.audit(root)['errors']})
            self.assertEqual(checker.CLAUDE_INVOCATION.findall('/tmp/project/file.js'), [])

    def test_flat_skills_reject_nested_and_mismatched_directories(self):
        for bad_path in ('forma/inner/SKILL.md', 'forma-wrong/SKILL.md'):
            with self.subTest(path=bad_path), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                for path, name in [('forma/SKILL.md', 'forma'), (bad_path, 'forma-interface')]:
                    file = root / path
                    file.parent.mkdir(parents=True, exist_ok=True)
                    file.write_text(f'---\nname: {name}\ndescription: Synthetic fixture\n---\n')
                self.assertIn('skill-layout', {e['code'] for e in checker.audit(root)['errors']})


if __name__ == '__main__':
    unittest.main()
