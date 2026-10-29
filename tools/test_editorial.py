"""Editorial checks protect copy while preserving real source names and Unicode."""
import json
from pathlib import Path
import tempfile
import unittest

from check_editorial import audit, inspect_text, PRESERVED_NEURON


class EditorialTests(unittest.TestCase):
    def test_all_files_are_classified_and_unknown_types_fail(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            (root / 'README.md').write_text('# Guide\nEnglish instructions.\n')
            (root / 'forgotten.custom').write_text('Unknown format')
            report = audit(root)
            self.assertEqual(len(report['files']), 2)
            self.assertEqual(report['errors'][0]['path'], 'forgotten.custom')

    def test_plain_ascii_portuguese_is_not_mistaken_for_english(self):
        # Assemble the negative fixture without putting forbidden copy in documentation.
        self.assertTrue(inspect_text('source/forma/references/mobile.md', 'Nao ' + 'altere o fluxo.')[1])
        self.assertFalse(inspect_text('source/forma/references/mobile.md', 'Preserve the existing flow.')[1])

    def test_source_name_exception_does_not_hide_translated_copy_errors(self):
        file = 'source/forma/assets/reference-library/site-index.json'
        self.assertFalse(inspect_text(file, json.dumps({'name': 'Ana S\u00e1', 'summary': 'Original source name.'}))[1])
        self.assertTrue(inspect_text(file, json.dumps({'name': 'Ana S\u00e1', 'summary': 'Descri\u00e7\u00e3o'}))[1])

    def test_test_files_are_reviewed_and_unicode_escapes_keep_runtime_values(self):
        file = 'source/forma/tests/unicode.test.cjs'
        self.assertFalse(inspect_text(file, r"const fixture = '\u00c1lbum';")[1])
        self.assertTrue(inspect_text('source/forma/tests/README.md', 'Nao ' + 'altere o fluxo.')[1])
        self.assertTrue(inspect_text(file, '\ufffd')[1])

    def test_json_escapes_cannot_hide_authored_copy(self):
        self.assertTrue(inspect_text('source/forma/assets/new.json', json.dumps({'summary': 'Configura\u00e7\u00f5es'}))[1])

    def test_preserved_neuron_exception_is_bounded_and_hash_checked(self):
        source = Path(__file__).resolve().parents[1] / 'source/forma/assets/neuron-passport'
        for name in PRESERVED_NEURON:
            relative = 'source/forma/assets/neuron-passport/' + name
            original = (source / name).read_text()
            self.assertFalse(inspect_text(relative, original)[1])
            self.assertTrue(inspect_text(relative, original + '\n')[1])
        self.assertTrue(inspect_text('source/forma/assets/neuron-passport/new.js', 'Nao ' + 'altere o fluxo.')[1])

    def test_html_requires_correct_document_language(self):
        self.assertFalse(inspect_text('example.html', '<html lang="en-US">')[1])
        self.assertTrue(inspect_text('example.html', '<html lang="pt-BR">')[1])


if __name__ == '__main__':
    unittest.main()
