import json
from pathlib import Path
import unittest

from import_portfolios import build, parse_readme, validate_urls


REVISION = 'c2ee35d6363e7b2ee4c34f40accb478c0f828e4f'


class PortfolioImportTests(unittest.TestCase):
    def test_complete_listing_with_whitespace_and_unicode(self):
        text = '# List\n## Current Portfolio Count: 999\n## A\n- [Ana] (https://ana.example) [Do not import]\n## J\n- [João](https://joao.example)\n## Contributing\n- [Guide](guide.md)'
        index, receipt = build(text, [{'name': 'Ana', 'url': 'https://old.example'}], REVISION)
        self.assertEqual(['Ana', 'João'], [entry['name'] for entry in index['entries']])
        self.assertEqual(4, index['entries'][0]['source']['line'])
        self.assertNotIn('Do not import', json.dumps(index))
        self.assertEqual(3, receipt['counts']['union'])
        self.assertEqual('https://old.example', receipt['feedNotInReadme'][0]['url'])

    def test_duplicate_names_are_distinct_and_ids_ignore_source_line(self):
        text = '## A\n- [Alex](https://one.example)\n- [Alex](https://two.example)'
        index, receipt = build(text, [], REVISION)
        moved, _ = build('\n' + text, [], REVISION)
        self.assertEqual([e['id'] for e in index['entries']], [e['id'] for e in moved['entries']])
        self.assertNotEqual(index['entries'][0]['id'], index['entries'][1]['id'])
        self.assertEqual([{'name': 'Alex', 'occurrences': 2}], receipt['repeatedNames'])

    def test_malformed_urls_remain_factual_but_not_clickable(self):
        for raw in ['https://bad.example?x="', 'javascript:alert', 'https://user:pass@example.com', 'https://bad.example\\evil', 'https://bad.example:99999', 'https://exa%mple.org', 'https://%00.example', 'https://example.org/\x7f', 'https://example.org/a\u2003b']:
            with self.subTest(raw=raw):
                index, receipt = build(f'## A\n- [Example]({raw})', [], REVISION)
                self.assertIsNone(index['entries'][0]['url'])
                self.assertEqual(raw, index['entries'][0]['source']['originalUrl'])
                self.assertEqual(1, receipt['counts']['quarantinedUrls'])
        self.assertEqual([True, False, False, True], validate_urls([
            'http://example.org/path?q=one&b=two#section',
            'https://999.999.999.999', 'https://exa%mple.org', 'https://[::1]/path',
        ]))

    def test_balanced_parentheses_are_preserved_and_unclosed_urls_fail(self):
        raw = 'https://example.org/work_(demo)'
        index, _ = build(f'## A\n- [Example]({raw}) [ignored]', [], REVISION)
        self.assertEqual(raw, index['entries'][0]['source']['originalUrl'])
        self.assertEqual(raw, index['entries'][0]['url'])
        with self.assertRaisesRegex(ValueError, 'Unclosed URL'):
            parse_readme('## A\n- [Example](https://example.org/work_(demo)')

    def test_unparsed_rows_and_duplicates_fail_instead_of_losing_coverage(self):
        for text in ['## A\n- malformed item', '## A\n- [A](https://a.example)\n- [A](https://a.example)']:
            with self.subTest(text=text), self.assertRaises(ValueError):
                build(text, [], REVISION)
        with self.assertRaises(ValueError):
            parse_readme('# Empty')
        with self.assertRaises(ValueError):
            build('## A\n- [A](https://a.example)', [], 'master')

    def test_shipped_snapshot_coverage_and_known_feed_drift(self):
        directory = Path(__file__).resolve().parents[1] / 'source/forma/assets/reference-library'
        index = json.loads((directory / 'portfolio-index.json').read_text())
        receipt = json.loads((directory / 'portfolio-import.json').read_text())
        self.assertEqual(2079, len(index['entries']))
        self.assertEqual(2079, receipt['counts']['readmeEntries'])
        self.assertEqual(2071, receipt['counts']['feedEntries'])
        self.assertEqual(9, len(receipt['readmeNotInFeed']))
        self.assertEqual([{'name': 'Pavithran S', 'url': 'https://pavithran26.vercel.app'}], receipt['feedNotInReadme'])
        self.assertEqual(1, sum(e['url'] is None for e in index['entries']))
        self.assertEqual(9, len(receipt['repeatedNames']))
        self.assertEqual(2079, len({e['source']['line'] for e in index['entries']}))
        self.assertTrue(any(e['name'] == 'Md Mizan' and e['source']['line'] == 1240 for e in index['entries']))


if __name__ == '__main__':
    unittest.main()
