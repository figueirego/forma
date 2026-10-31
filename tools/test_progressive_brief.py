"""Package regressions for shared brief instructions; not conversational evals.

The independent agent scenarios are in evals/progressive-brief-scenarios.md.
Passing these tests proves resource identity and reachability after packaging,
not that a model asked the right question or executed the requested design.
"""
from contextlib import redirect_stdout
from io import StringIO
import hashlib
import json
from pathlib import Path
import re
import tempfile
import unittest
from urllib.parse import unquote, urlsplit

from build_forma_plugin import build
from build_other_hosts import build_other_hosts


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source/forma'
SHARED = (
    'references/progressive-brief.md',
    'references/design-specification.md',
    'references/templates.md',
    'evals/progressive-brief-scenarios.md',
)
ENTRYPOINTS = (
    'SKILL.md',
    'skills/product/SKILL.md',
    'skills/reference/SKILL.md',
    'skills/foundations/SKILL.md',
    'skills/handoff/SKILL.md',
)
LINK = re.compile(r'\[[^\]\n]*\]\(([^)\n]+)\)')
INVOCATION = re.compile(r'(?:\$forma:|/forma:|\$)(forma(?:-[a-z0-9]+)*)\b')


def local_links(path):
    """Return inline local targets, including fragments, for rebasing checks."""
    for match in LINK.finditer(path.read_text()):
        raw = match.group(1)
        parsed = urlsplit(raw)
        if not parsed.scheme and not parsed.netloc:
            target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path.resolve()
            yield raw, target, parsed


def normalized_document(path, identities):
    """Compare full prose while representing links by their canonical identity.

    This is independent of the builder's path transformation: identities come
    from the package manifest, then every target must exist at its actual path.
    """
    def replace(match):
        raw = match.group(1)
        parsed = urlsplit(raw)
        if parsed.scheme or parsed.netloc:
            return match.group(0)
        target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path.resolve()
        if not target.is_file():
            raise AssertionError(f'Missing link from {path}: {raw}')
        if target not in identities:
            raise AssertionError(f'Link outside the canonical package from {path}: {raw}')
        canonical = identities[target]
        if parsed.query:
            canonical += '?' + parsed.query
        if parsed.fragment:
            canonical += '#' + parsed.fragment
        return match.group(0).replace('(' + raw + ')', '(' + canonical + ')')

    text = LINK.sub(replace, path.read_text())
    return INVOCATION.sub(r'@skill:\1', text)


class ProgressiveBriefPackageTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.addClassCleanup(cls.temp.cleanup)
        initial = Path(cls.temp.name) / 'build'
        with redirect_stdout(StringIO()):
            build(SOURCE, initial)
            build_other_hosts(initial)
        # Verify relocation, including spaces, rather than the authoring path.
        cls.root = Path(cls.temp.name) / 'relocated project' / 'package'
        cls.root.parent.mkdir()
        initial.rename(cls.root)
        cls.source_paths = {p.relative_to(SOURCE).as_posix(): p for p in SOURCE.rglob('*') if p.is_file()}
        cls.source_identities = {p.resolve(): name for name, p in cls.source_paths.items()}
        codex = cls.root / 'plugins/forma'
        claude = cls.root / 'plugins/forma-claude'
        manifest = json.loads((codex / 'provenance.json').read_text())
        codex_paths = {entry['source']: codex / entry['packaged'] for entry in manifest['files']}
        claude_manifest = json.loads((claude / 'provenance.json').read_text())
        claude_paths = {entry['source']: claude / entry['packaged'] for entry in claude_manifest['files']}
        portable = cls.root / 'distributions/agent-skills'
        portable_paths = {}
        for name in cls.source_paths:
            path = Path(name)
            if name == 'SKILL.md' or path.parts[0] == 'agents':
                relative = Path('forma') / path
            elif path.parts[0] == 'skills':
                relative = Path('forma-' + path.parts[1]) / Path(*path.parts[2:])
            else:
                relative = Path('forma') / path
            portable_paths[name] = portable / relative
        cls.distributions = {'codex': codex_paths, 'claude': claude_paths, 'agent-skills': portable_paths}

    def test_protocol_templates_and_scenarios_preserve_full_canonical_content(self):
        for relative in SHARED:
            expected = normalized_document(self.source_paths[relative], self.source_identities)
            for host, paths in self.distributions.items():
                with self.subTest(host=host, resource=relative):
                    identities = {path.resolve(): name for name, path in paths.items()}
                    self.assertEqual(normalized_document(paths[relative], identities), expected)

    def test_packaged_protocols_record_current_source_hashes(self):
        # Source equality includes manifest integrity, not just matching filenames.
        for folder in ('forma', 'forma-claude'):
            plugin = self.root / 'plugins' / folder
            entries = {e['source']: e for e in json.loads((plugin / 'provenance.json').read_text())['files']}
            for relative in SHARED:
                with self.subTest(host=folder, resource=relative):
                    entry = entries[relative]
                    self.assertEqual(entry['source_sha256'], hashlib.sha256((SOURCE / relative).read_bytes()).hexdigest())
                    self.assertEqual(entry['packaged_sha256'], hashlib.sha256((plugin / entry['packaged']).read_bytes()).hexdigest())

    def test_entrypoints_reach_shared_protocols_in_every_distribution(self):
        for host, paths in self.distributions.items():
            identities = {path.resolve(): name for name, path in paths.items()}
            required = {paths[name].resolve() for name in SHARED[:2]}
            for entry in ENTRYPOINTS:
                with self.subTest(host=host, entry=entry):
                    visited, queue = set(), [paths[entry].resolve()]
                    while queue:
                        path = queue.pop()
                        if path in visited:
                            continue
                        visited.add(path)
                        for raw, target, _ in local_links(path):
                            self.assertTrue(target.is_file(), f'{host}: {path}: {raw}')
                            self.assertIn(target, identities, f'{host}: {path}: {raw}')
                            if target.suffix == '.md' and target not in visited:
                                queue.append(target)
                    self.assertTrue(required <= visited, f'{host}: protocols unreachable from {entry}')

    def test_relocated_links_keep_their_canonical_target_and_fragment(self):
        for relative in (*SHARED, *ENTRYPOINTS):
            expected = [(self.source_identities[target], parsed.query, parsed.fragment)
                        for _, target, parsed in local_links(self.source_paths[relative])]
            for host, paths in self.distributions.items():
                with self.subTest(host=host, resource=relative):
                    identities = {path.resolve(): name for name, path in paths.items()}
                    actual = []
                    for raw, target, parsed in local_links(paths[relative]):
                        self.assertFalse(Path(unquote(parsed.path)).is_absolute(), f'Nonportable link: {raw}')
                        self.assertTrue(target.is_file(), str(target))
                        actual.append((identities[target], parsed.query, parsed.fragment))
                    self.assertEqual(actual, expected)

    def test_shared_alignment_has_no_host_specific_question_tool_identifier(self):
        # This enforces a capability-neutral instruction boundary. It does not
        # assert that a host has a question tool or that an agent used it well.
        tools = re.compile(r'\b(?:request_user_input(?:_async)?|AskUserQuestion|mcp__codex_app\w*|functions\.request_user_input\w*)\b')
        for host, paths in self.distributions.items():
            for relative in (*ENTRYPOINTS, *SHARED[:2]):
                with self.subTest(host=host, resource=relative):
                    self.assertIsNone(tools.search(paths[relative].read_text()))

    def test_generated_invocations_resolve_to_the_distributed_skill_catalog(self):
        for host, paths in self.distributions.items():
            names = {re.search(r'^name: ([a-z0-9-]+)$', path.read_text(), re.M).group(1)
                     for name, path in paths.items() if Path(name).name == 'SKILL.md'}
            for relative in (*ENTRYPOINTS, *SHARED):
                with self.subTest(host=host, resource=relative):
                    text = paths[relative].read_text()
                    for invocation in INVOCATION.finditer(text):
                        self.assertIn(invocation.group(1), names)
                    if host == 'claude':
                        self.assertNotIn('$forma:', text)
                    elif host == 'agent-skills':
                        self.assertNotIn('$forma:', text)
                        self.assertNotIn('/forma:', text)


if __name__ == '__main__':
    unittest.main()
