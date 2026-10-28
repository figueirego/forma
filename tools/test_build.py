"""Check generated drift without repairing it or touching handwritten files."""
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from build import generate


class GeneratedFilesTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.expected = {
            Path('plugins/forma/SKILL.md'): b'generated skill\n',
            Path('.agents/plugins/marketplace.json'): b'{}\n',
        }
        self.addCleanup(patch.stopall)
        patch('build.render', return_value=self.expected).start()
        (self.root / 'README.md').write_text('Handwritten README\n')

    def run_build(self, check=False):
        output = StringIO()
        with redirect_stdout(output):
            result = generate(self.root, check=check)
        return result, output.getvalue()

    def snapshot(self):
        return {p.relative_to(self.root): (p.read_bytes(), p.stat().st_mtime_ns)
                for p in self.root.rglob('*') if p.is_file()}

    def test_build_preserves_handwritten_files_and_checks_clean_output(self):
        self.assertEqual(self.run_build()[0], 0)
        self.assertEqual((self.root / 'README.md').read_text(), 'Handwritten README\n')
        before = self.snapshot()
        self.assertEqual(self.run_build(check=True)[0], 0)
        self.assertEqual(self.snapshot(), before)

    def test_check_reports_missing_extra_and_changed_without_writes(self):
        self.run_build()
        (self.root / 'plugins/forma/SKILL.md').write_text('manual change\n')
        (self.root / '.agents/plugins/marketplace.json').unlink()
        (self.root / 'plugins/forma/.extra').write_text('untracked output\n')
        before = self.snapshot()
        result, output = self.run_build(check=True)
        self.assertEqual(result, 1)
        self.assertIn('Missing: .agents/plugins/marketplace.json', output)
        self.assertIn('Changed: plugins/forma/SKILL.md', output)
        self.assertIn('Extra: plugins/forma/.extra', output)
        self.assertEqual(self.snapshot(), before)

    def test_missing_generated_directories_are_not_created_by_check(self):
        before = self.snapshot()
        self.assertEqual(self.run_build(check=True)[0], 1)
        self.assertFalse((self.root / 'plugins').exists())
        self.assertFalse((self.root / '.agents').exists())
        self.assertEqual(self.snapshot(), before)

    def test_build_removes_obsolete_generated_files(self):
        self.run_build()
        obsolete = self.root / 'plugins/forma/obsolete.txt'
        obsolete.write_text('removed from canonical source\n')
        self.assertEqual(self.run_build()[0], 0)
        self.assertFalse(obsolete.exists())
        self.assertEqual(self.run_build(check=True)[0], 0)
        self.assertEqual((self.root / 'README.md').read_text(), 'Handwritten README\n')

    def test_symlinked_generated_directory_is_rejected_before_writes(self):
        target = self.root / 'outside'
        target.mkdir()
        (target / 'keep.txt').write_text('untouched\n')
        (self.root / 'plugins').symlink_to(target, target_is_directory=True)
        for check in (True, False):
            with self.assertRaisesRegex(ValueError, 'Symlink'):
                self.run_build(check=check)
        self.assertEqual((target / 'keep.txt').read_text(), 'untouched\n')


if __name__ == '__main__':
    unittest.main()
