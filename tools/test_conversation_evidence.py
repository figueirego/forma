"""Receipt integrity tests; synthetic fixtures are not conversational trials."""
from copy import deepcopy
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

import check_conversation_evidence as checker


class ConversationEvidenceTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name).resolve()
        self.run = self.root / 'run'
        self.run.mkdir()
        files = {
            'candidate.json': '{"revision":"synthetic-test-only"}\n',
            'transcript.jsonl': '{"role":"user","text":"Synthetic fixture"}\n'
                                '{"role":"assistant","text":"Synthetic submission"}\n',
            'index.html': '<h1>Synthetic test artifact</h1>\n',
        }
        for name, contents in files.items():
            (self.run / name).write_text(contents, encoding='utf-8')
        self.data = {
            'schema_version': 'forma.conversation-evidence.v1',
            'run_id': 'PB01-synthetic', 'case_id': 'PB01',
            'execution_class': 'simulated', 'host': 'Synthetic unittest fixture',
            'candidate': {'revision': 'synthetic-test-only', 'file': 'candidate.json'},
            'evidence': {name: self.digest(self.run / name) for name in files},
            'transcript': 'transcript.jsonl', 'artifact_required': True,
            'artifact': 'index.html', 'outcome': 'pass', 'limits': ['Not a real trial.'],
            'review': {
                'reviewer': 'Synthetic reviewer',
                'dimensions': {name: {'score': 2, 'evidence': [
                    {'path': 'transcript.jsonl', 'line': 2}]}
                    for name in checker.DIMENSIONS},
                'material_failures': [],
            },
        }

    @staticmethod
    def digest(path):
        return hashlib.sha256(path.read_bytes()).hexdigest()

    def errors(self, data=None):
        return checker.validate(self.data if data is None else data, self.run)

    def test_valid_receipt_checks_integrity_without_modifying_evidence(self):
        before = {p.name: p.read_bytes() for p in self.run.iterdir()}
        self.assertEqual(self.errors(), [])
        self.assertEqual(before, {p.name: p.read_bytes() for p in self.run.iterdir()})

    def test_tampered_candidate_transcript_and_artifact_are_rejected(self):
        for name in self.data['evidence']:
            with self.subTest(name=name):
                path = self.run / name
                before = path.read_bytes()
                path.write_bytes(before + b'changed')
                self.assertTrue(any('SHA256 mismatch' in e for e in self.errors()))
                path.write_bytes(before)

    def test_missing_evidence_is_rejected(self):
        (self.run / 'index.html').unlink()
        self.assertTrue(any('index.html' in e for e in self.errors()))

    def test_noncanonical_or_missing_hash_is_rejected(self):
        for value in (None, 123, 'a' * 63, 'A' * 64, 'z' * 64):
            with self.subTest(hash=value):
                self.data['evidence']['candidate.json'] = value
                self.assertTrue(any('lowercase SHA256' in e for e in self.errors()))

    def test_traversal_absolute_windows_and_symlink_paths_are_rejected(self):
        outside = self.root / 'outside.txt'
        outside.write_text('Not part of this run.')
        for name in ('../outside.txt', str(outside), 'C:\\outside.txt',
                     'nested/../outside.txt', './candidate.json'):
            with self.subTest(path=name):
                data = deepcopy(self.data)
                data['evidence'][name] = self.digest(outside)
                self.assertTrue(any('relative contained path' in e for e in self.errors(data)))
        link = self.run / 'linked'
        try:
            link.symlink_to(self.root, target_is_directory=True)
        except (OSError, NotImplementedError) as error:
            self.skipTest(f'Symlinks unavailable: {error}')
        data = deepcopy(self.data)
        data['evidence']['linked/outside.txt'] = self.digest(outside)
        self.assertTrue(any('symlink' in e for e in self.errors(data)))

    def test_empty_artifact_or_undeclared_reference_cannot_support_pass(self):
        (self.run / 'index.html').write_bytes(b'')
        self.data['evidence']['index.html'] = self.digest(self.run / 'index.html')
        self.assertTrue(any('empty' in e for e in self.errors()))
        data = deepcopy(self.data)
        data['review']['dimensions']['delivery']['evidence'] = [{'path': 'unlisted.txt'}]
        self.assertTrue(any('not in evidence' in e for e in self.errors(data)))

    def test_reference_line_must_exist_and_be_an_integer(self):
        for line in (0, 3, True, '2'):
            with self.subTest(line=line):
                data = deepcopy(self.data)
                data['review']['dimensions']['delivery']['evidence'][0]['line'] = line
                self.assertTrue(any('line' in e for e in self.errors(data)))

    def test_malformed_reference_path_reports_error_without_crashing(self):
        self.data['review']['dimensions']['delivery']['evidence'] = [
            {'path': ['transcript.jsonl'], 'line': 1}]
        self.assertTrue(any('not in evidence' in e for e in self.errors()))

    def test_false_pass_requires_all_dimensions_no_failures_and_output(self):
        variants = []
        data = deepcopy(self.data)
        data['review']['dimensions']['delivery']['score'] = 1
        variants.append(data)
        data = deepcopy(self.data)
        del data['review']['dimensions']['delivery']
        variants.append(data)
        data = deepcopy(self.data)
        data['review']['material_failures'] = ['Scope changed.']
        variants.append(data)
        data = deepcopy(self.data)
        del data['artifact']
        variants.append(data)
        data = deepcopy(self.data)
        for dimension in data['review']['dimensions'].values():
            dimension.update(score=None, reason='Not applicable.')
        variants.append(data)
        for index, data in enumerate(variants):
            with self.subTest(index=index):
                self.assertTrue(self.errors(data))

    def test_pending_case_can_pass_without_implementation_artifact(self):
        self.data.update(case_id='PB06', run_id='PB06-C-synthetic', artifact_required=False)
        del self.data['artifact']
        self.assertEqual(self.errors(), [])

    def test_not_run_needs_reason_but_no_files_or_scores(self):
        data = {'schema_version': 'forma.conversation-evidence.v1',
                'run_id': 'PB01-missing-host', 'case_id': 'PB01',
                'execution_class': 'not-run', 'host': 'Unavailable host',
                'outcome': 'not-run', 'reason': 'Host unavailable.'}
        self.assertEqual(self.errors(data), [])
        for key, value in [('review', self.data['review']),
                           ('transcript', 'transcript.jsonl'), ('artifact', 'index.html'),
                           ('evidence', self.data['evidence'])]:
            with self.subTest(key=key):
                invalid = dict(data, **{key: value})
                self.assertTrue(self.errors(invalid))
        invalid = dict(data, outcome='pass')
        self.assertTrue(any('must agree' in e for e in self.errors(invalid)))
        invalid = dict(data, execution_class='actual-headless')
        self.assertTrue(any('must agree' in e for e in self.errors(invalid)))
        del data['reason']
        self.assertTrue(self.errors(data))

    def test_incomplete_preserves_missing_output_without_passing(self):
        self.data.update(outcome='incomplete', reason='Artifact was not submitted.')
        del self.data['artifact']
        del self.data['review']
        self.assertEqual(self.errors(), [])

    def run_cli(self, *arguments):
        path = self.run / 'run.json'
        path.write_text(json.dumps(self.data), encoding='utf-8')
        return subprocess.run([sys.executable, '-B', str(Path(checker.__file__)),
                               str(path), *arguments], capture_output=True, text=True)

    def test_cli_reports_validation_separately_from_outcome(self):
        result = self.run_cli('--require-pass')
        self.assertEqual(result.returncode, 0, result.stdout)
        self.assertFalse(json.loads(result.stdout)['semantic_evaluation'])
        self.data.update(outcome='incomplete', reason='Review not submitted.')
        del self.data['review']
        self.assertEqual(self.run_cli().returncode, 0)
        result = self.run_cli('--require-pass')
        self.assertEqual(result.returncode, 1)
        self.assertEqual(json.loads(result.stdout)['runs'][0]['outcome'], 'incomplete')

    def test_cli_rejects_duplicate_json_keys_and_nonfinite_values(self):
        path = self.run / 'run.json'
        for contents in ('{"outcome":"fail","outcome":"pass"}', '{"score":NaN}'):
            with self.subTest(contents=contents):
                path.write_text(contents)
                result = subprocess.run([sys.executable, '-B', str(Path(checker.__file__)),
                                         str(path)], capture_output=True, text=True)
                self.assertEqual(result.returncode, 1)
                self.assertFalse(json.loads(result.stdout)['valid'])

    def test_cli_rejects_duplicate_run_identity(self):
        result = self.run_cli(str(self.run / 'run.json'))
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertTrue(any('Duplicate run_id' in error
                            for run in json.loads(result.stdout)['runs']
                            for error in run['errors']))


if __name__ == '__main__':
    unittest.main()
