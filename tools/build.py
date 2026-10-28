"""Regenerate committed plugin files, or check drift without writing to the repo."""
import argparse
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
import shutil
import sys
import tempfile

sys.dont_write_bytecode = True
from build_forma_plugin import build
from build_other_hosts import build_other_hosts


ROOT = Path(__file__).resolve().parents[1]
GENERATED_ROOTS = (Path('plugins'), Path('.agents/plugins'), Path('.claude-plugin'), Path('distributions'))


def inventory(root):
    """Include every generated file; never follow symlinks, including parents."""
    files = {}
    for relative in GENERATED_ROOTS:
        for ancestor in (*relative.parents, relative):
            if (root / ancestor).is_symlink():
                raise ValueError(f'Symlink in generated path: {ancestor}')
        directory = root / relative
        if not directory.exists():
            continue
        if not directory.is_dir():
            raise ValueError(f'Expected generated directory: {relative}')
        for path in sorted(directory.rglob('*')):
            name = path.relative_to(root)
            if path.is_symlink():
                raise ValueError(f'Symlink in generated files: {name}')
            if path.is_file():
                files[name] = path.read_bytes()
            elif not path.is_dir():
                raise ValueError(f'Expected regular generated file: {name}')
    return files


def render(source):
    if source.is_symlink():
        raise ValueError('Canonical source must not be a symlink')
    with tempfile.TemporaryDirectory(prefix='forma-build-') as temporary:
        destination = Path(temporary) / 'forma-community'
        with redirect_stdout(StringIO()):
            build(source, destination)
            build_other_hosts(destination)
        return inventory(destination)


def generate(root=ROOT, check=False):
    root = Path(root)
    expected = render(root / 'source/forma')
    actual = inventory(root)
    missing = sorted(expected.keys() - actual.keys())
    extra = sorted(actual.keys() - expected.keys())
    changed = sorted(name for name in expected.keys() & actual.keys()
                     if expected[name] != actual[name])
    if check:
        for category, paths in [('Missing', missing), ('Extra', extra), ('Changed', changed)]:
            for path in paths:
                print(f'{category}: {path.as_posix()}')
        if missing or extra or changed:
            print('Generated files differ. Run npm run build and review the diff.')
            return 1
        print(f'Generated files match the source ({len(expected)} files).')
        return 0

    # Both roots contain generated output only; handwritten repo files stay intact.
    for relative in GENERATED_ROOTS:
        directory = root / relative
        if directory.exists():
            shutil.rmtree(directory)
    for relative, data in expected.items():
        destination = root / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
    print(f'Generated {len(expected)} files across plugin catalogs and Agent Skills.')
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Fail on any drift; do not write repository files')
    args = parser.parse_args()
    try:
        return generate(check=args.check)
    except (OSError, ValueError) as exc:
        print(f'Build failed: {exc}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
