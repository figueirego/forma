"""Portable installation must be explicit, conflict-free and reversible on error."""
from contextlib import redirect_stderr, redirect_stdout
from io import StringIO
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

import install_skills as installer


class InstallSkillsTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        # macOS may provide a temporary path under the /var symlink.
        self.root = Path(temporary.name).resolve()
        self.source = self.root / 'package'
        self.source.mkdir()
        self.destination = self.root / 'agent/skills'
        self.add_skill('forma')
        self.add_skill('forma-brand')
        resources = self.source / 'forma/references'
        resources.mkdir()
        (resources / 'guide.md').write_text('Shared resource.\n', encoding='utf-8')
        (self.source / 'forma/empty').mkdir()

    def add_skill(self, name):
        skill = self.source / name
        skill.mkdir()
        (skill / 'SKILL.md').write_text(
            f'---\nname: {name}\ndescription: Test fixture\n---\n# {name}\n', encoding='utf-8')

    def run_install(self, apply=False):
        return installer.install_skills(self.source, self.destination, apply=apply)

    def snapshot(self, root):
        if not root.exists():
            return None
        return {path.relative_to(root): (path.read_bytes(), path.stat().st_mtime_ns)
                if path.is_file() else None for path in root.rglob('*')}

    def symlink(self, path, target, *, directory=False):
        try:
            path.symlink_to(target, target_is_directory=directory)
        except (OSError, NotImplementedError) as exc:
            self.skipTest(f'Symlink creation is unavailable: {exc}')

    def test_dry_run_reports_files_and_paths_without_creating_any_parent(self):
        before = self.snapshot(self.root)
        report = self.run_install()
        self.assertEqual(report['mode'], 'dry-run')
        self.assertEqual(report['summary'], {'skills': 2, 'files': 3, 'new': 2, 'unchanged': 0})
        self.assertEqual({item['action'] for item in report['skills']}, {'would-install'})
        self.assertEqual(report['skills'][0]['path'], str(self.destination / 'forma'))
        self.assertEqual(self.snapshot(self.root), before)
        self.assertFalse(self.destination.parent.exists())

    def test_apply_is_idempotent_and_preserves_unrelated_skills(self):
        unrelated = self.destination / 'another-skill'
        unrelated.mkdir(parents=True)
        (unrelated / 'SKILL.md').write_text('User-owned skill.\n')
        before_unrelated = self.snapshot(unrelated)
        report = self.run_install(apply=True)
        self.assertEqual(report['summary']['new'], 2)
        self.assertEqual({item['action'] for item in report['skills']}, {'installed'})
        self.assertTrue((self.destination / 'forma/empty').is_dir())
        self.assertEqual((self.destination / 'forma/references/guide.md').read_bytes(),
                         (self.source / 'forma/references/guide.md').read_bytes())
        before = self.snapshot(self.destination)
        repeated = self.run_install(apply=True)
        self.assertEqual(repeated['summary']['unchanged'], 2)
        self.assertEqual(repeated['summary']['new'], 0)
        self.assertEqual(self.snapshot(self.destination), before)
        self.assertEqual(self.snapshot(unrelated), before_unrelated)

    def test_changed_missing_and_extra_contents_refuse_the_entire_batch(self):
        self.run_install(apply=True)
        self.add_skill('forma-motion')
        guide = self.destination / 'forma/references/guide.md'
        original = guide.read_bytes()
        for difference in ('changed', 'missing', 'extra-file', 'extra-directory', 'missing-directory'):
            with self.subTest(difference=difference):
                if difference == 'changed':
                    guide.write_bytes(b'Local edits must survive.\n')
                elif difference == 'missing':
                    guide.unlink()
                elif difference == 'extra-file':
                    (self.destination / 'forma/local.txt').write_bytes(b'User content')
                elif difference == 'extra-directory':
                    (self.destination / 'forma/local').mkdir()
                else:
                    (self.destination / 'forma/empty').rmdir()
                before = self.snapshot(self.destination)
                for apply in (False, True):
                    with self.assertRaisesRegex(installer.InstallError, 'Conflicting skills'):
                        self.run_install(apply=apply)
                self.assertEqual(self.snapshot(self.destination), before)
                self.assertFalse((self.destination / 'forma-motion').exists())
                if difference in ('changed', 'missing'):
                    guide.write_bytes(original)
                elif difference == 'extra-file':
                    (self.destination / 'forma/local.txt').unlink()
                elif difference == 'extra-directory':
                    (self.destination / 'forma/local').rmdir()
                else:
                    (self.destination / 'forma/empty').mkdir()

    def test_source_root_symlink_is_rejected(self):
        link = self.root / 'linked-package'
        self.symlink(link, self.source, directory=True)
        with self.assertRaisesRegex(installer.InstallError, 'Symlink'):
            installer.install_skills(link, self.destination, apply=True)
        self.assertFalse(self.destination.parent.exists())

    def test_source_symlinks_are_rejected_even_if_the_target_is_inside_package(self):
        self.symlink(self.source / 'forma/references/link.md', self.source / 'forma/SKILL.md')
        with self.assertRaisesRegex(installer.InstallError, 'Symlink'):
            self.run_install(apply=True)
        self.assertFalse(self.destination.parent.exists())

    def test_destination_symlink_ancestor_is_rejected_without_touching_target(self):
        outside = self.root / 'outside'
        outside.mkdir()
        (outside / 'keep.txt').write_bytes(b'Untouched')
        self.symlink(self.destination.parent, outside, directory=True)
        before = self.snapshot(outside)
        with self.assertRaisesRegex(installer.InstallError, 'Symlink'):
            self.run_install(apply=True)
        self.assertEqual(self.snapshot(outside), before)

    def test_existing_skill_symlink_is_rejected_before_other_skill_is_installed(self):
        self.destination.mkdir(parents=True)
        self.symlink(self.destination / 'forma-brand', self.source / 'forma-brand', directory=True)
        with self.assertRaisesRegex(installer.InstallError, 'Symlink'):
            self.run_install(apply=True)
        self.assertFalse((self.destination / 'forma').exists())

    def test_unknown_source_root_file_and_invalid_skill_names_are_rejected(self):
        for name in ('README.md', 'unrelated', 'forma-Bad', 'forma--brand'):
            with self.subTest(name=name):
                path = self.source / name
                if name.endswith('.md'):
                    path.write_text('Not a skill directory')
                else:
                    path.mkdir()
                with self.assertRaisesRegex(installer.InstallError, 'Unexpected item'):
                    self.run_install(apply=True)
                self.assertFalse(self.destination.parent.exists())
                if path.is_dir():
                    path.rmdir()
                else:
                    path.unlink()

    def test_mismatched_missing_or_duplicated_entrypoint_name_is_rejected(self):
        entrypoint = self.source / 'forma-brand/SKILL.md'
        for data in (b'---\nname: forma-other\n---\n', b'# No frontmatter\n',
                     b'---\nname: forma-brand\nname: forma-brand\n---\n', None):
            with self.subTest(data=data):
                if data is None:
                    entrypoint.unlink()
                else:
                    entrypoint.write_bytes(data)
                with self.assertRaises(installer.InstallError):
                    self.run_install(apply=True)
                self.assertFalse(self.destination.parent.exists())

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'Named pipes are unavailable')
    def test_special_file_is_rejected_without_opening_it(self):
        os.mkfifo(self.source / 'forma/pipe')
        with self.assertRaisesRegex(installer.InstallError, 'Special file'):
            self.run_install(apply=True)
        self.assertFalse(self.destination.parent.exists())

    def test_partial_copy_failure_removes_only_new_content(self):
        self.run_install(apply=True)
        self.add_skill('forma-motion')
        self.add_skill('forma-product')
        before = self.snapshot(self.destination)
        write_file = installer._write_file

        def fail_after_write(path, data, created):
            write_file(path, data, created)
            if 'forma-product' in path.parts:
                raise OSError('Simulated write failure')

        with patch.object(installer, '_write_file', side_effect=fail_after_write):
            with self.assertRaisesRegex(OSError, 'Simulated write failure'):
                self.run_install(apply=True)
        self.assertEqual(self.snapshot(self.destination), before)

    def test_partial_failure_also_removes_new_destination_ancestors(self):
        with patch.object(installer, '_write_file', side_effect=OSError('Disk full')):
            with self.assertRaisesRegex(OSError, 'Disk full'):
                self.run_install(apply=True)
        self.assertFalse(self.destination.parent.exists())

    def test_concurrently_created_target_is_not_overwritten_or_removed(self):
        self.destination.mkdir(parents=True)
        make_directory = installer._make_directory
        occupied = self.destination / 'forma-brand'

        def race(path, created):
            if path == occupied:
                path.mkdir()
                (path / 'keep.txt').write_bytes(b'Another process owns this')
            make_directory(path, created)

        with patch.object(installer, '_make_directory', side_effect=race):
            with self.assertRaises(FileExistsError):
                self.run_install(apply=True)
        self.assertEqual((occupied / 'keep.txt').read_bytes(), b'Another process owns this')
        self.assertFalse((self.destination / 'forma').exists())

    def test_rollback_preserves_unexpected_files_added_by_another_process(self):
        def fail_with_new_file(path, data, created):
            (path.parent / 'external.txt').write_bytes(b'Not owned by the installer')
            raise OSError('Simulated failure')

        with patch.object(installer, '_write_file', side_effect=fail_with_new_file):
            with self.assertRaisesRegex(installer.InstallError, 'cleanup incomplete'):
                self.run_install(apply=True)
        self.assertEqual((self.destination / 'forma/external.txt').read_bytes(),
                         b'Not owned by the installer')

    def test_cli_requires_destination_and_works_from_another_directory(self):
        script = Path(installer.__file__).resolve()
        missing = subprocess.run([sys.executable, '-B', str(script)], cwd=self.root,
                                 capture_output=True, text=True, check=False)
        self.assertEqual(missing.returncode, 2)
        self.assertIn('--destination', missing.stderr)
        preview = subprocess.run(
            [sys.executable, '-B', str(script), '--source', str(self.source),
             '--destination', str(self.destination)], cwd=self.root,
            capture_output=True, text=True, check=False)
        self.assertEqual(preview.returncode, 0, preview.stderr)
        self.assertEqual(json.loads(preview.stdout)['mode'], 'dry-run')
        self.assertFalse(self.destination.exists())
        self.assertEqual(installer.DEFAULT_SOURCE, installer.ROOT / 'distributions/agent-skills')

    def test_cli_returns_failure_for_conflict(self):
        self.run_install(apply=True)
        (self.destination / 'forma/local.txt').write_text('Local content')
        stderr = StringIO()
        with redirect_stderr(stderr), redirect_stdout(StringIO()):
            result = installer.main(['--source', str(self.source), '--destination',
                                     str(self.destination), '--apply'])
        self.assertEqual(result, 1)
        self.assertIn('Conflicting skills', stderr.getvalue())


if __name__ == '__main__':
    unittest.main()
