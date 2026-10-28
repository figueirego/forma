"""Regressions for namespace, portable links and repeatable package generation."""
from contextlib import redirect_stdout
from io import StringIO
import json
from pathlib import Path, PureWindowsPath
import tempfile
import unittest

from build_forma_plugin import build, relative_link


class PackagingTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.base = Path(self.tmp.name)
        self.source = self.base / 'source'
        self.source.mkdir()
        self.write('SKILL.md', '---\nname: forma\ndescription: fixture\nmetadata:\n  version: 1.0.0\n---\n# Forma\n[Ref](references/test.md)\nUse $forma.\n')
        self.write('references/test.md', '# Test\nUse $forma.\n')
        self.write('agents/openai.yaml', 'interface:\n  default_prompt: "Use $forma"\n')
        for name in ['icon.svg', 'logo.png', 'preview-desktop-top.png', 'preview-mobile-top.png']:
            self.write('assets/plugin-brand/' + name, 'Synthetic identity fixture; no visual claim.')

    def write(self, name, content):
        path = self.source / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)

    def package(self, folder='a'):
        target = self.base / folder / 'forma-plugin'
        with redirect_stdout(StringIO()):
            build(self.source, target)
        return target

    def test_namespaced_prompt_and_rebased_reference(self):
        root = self.package() / 'plugins/forma'
        self.assertIn('../../references/test.md', (root / 'skills/forma/SKILL.md').read_text())
        self.assertIn('$forma:forma', (root / 'skills/forma/agents/openai.yaml').read_text())
        entries = json.loads((root / 'catalog.json').read_text())['skills']
        self.assertEqual(entries, [{'name': 'forma', 'path': 'skills/forma/SKILL.md', 'invocation': '$forma:forma'}])

    def test_relative_links_are_posix_for_windows_paths(self):
        self.assertEqual(relative_link(PureWindowsPath('references/test.md'), PureWindowsPath('skills/forma')), '../../references/test.md')

    def test_public_catalog_and_license_metadata(self):
        self.write('LICENSE', 'Synthetic license fixture\n')
        self.write('THIRD_PARTY_NOTICES.md', '# Synthetic third-party notice\n')
        target = self.package()
        marketplace = json.loads((target / '.agents/plugins/marketplace.json').read_text())
        self.assertEqual(marketplace['name'], 'forma-community')
        self.assertEqual(marketplace['plugins'][0]['source']['path'], './plugins/forma')
        plugin = target / 'plugins/forma'
        manifest = json.loads((plugin / '.codex-plugin/plugin.json').read_text())
        self.assertEqual(manifest['license'], 'MIT')
        self.assertEqual(manifest['homepage'], 'https://github.com/figueirego/forma')
        provenance = json.loads((plugin / 'provenance.json').read_text())['files']
        for name in ('LICENSE', 'THIRD_PARTY_NOTICES.md'):
            self.assertEqual((plugin / name).read_bytes(), (self.source / name).read_bytes())
            self.assertTrue(any(entry['source'] == name for entry in provenance))

    def test_archives_are_reproducible(self):
        first = self.package('a').with_suffix('.zip').read_bytes()
        second = self.package('b').with_suffix('.zip').read_bytes()
        self.assertEqual(first, second)

    def test_duplicate_skill_names_fail_before_writes(self):
        self.write('skills/other/SKILL.md', '---\nname: forma\ndescription: fixture\n---\n# Other\n')
        with self.assertRaisesRegex(ValueError, 'Duplicate skill names'):
            self.package()
        self.assertFalse((self.base / 'a/forma-plugin').exists())

    def test_broken_reference_fails_before_writes(self):
        self.write('references/test.md', '# Test\n[Missing](missing.md)\n')
        with self.assertRaisesRegex(ValueError, 'Unresolved source link'):
            self.package()
        self.assertFalse((self.base / 'a/forma-plugin').exists())


if __name__ == '__main__':
    unittest.main()
