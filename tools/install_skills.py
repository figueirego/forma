"""Install the portable Forma skills into an explicit local skills directory.

Dry-run is the default. Existing skills must match the complete file/directory
inventory; the installer never updates or deletes an existing installation.
Run one installer at a time, in a directory writable only by trusted users.
Path checks detect common changes, but are not a filesystem security boundary
against another process deliberately replacing directories during installation.
"""
import argparse
import json
import os
from pathlib import Path
import re
import stat
import sys


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / 'distributions/agent-skills'
SKILL_NAME = re.compile(r'forma(?:-[a-z0-9]+)*\Z')


class InstallError(ValueError):
    """The complete installation cannot be performed without a conflict."""


def _identity(info):
    return info.st_dev, info.st_ino, stat.S_IFMT(info.st_mode)


def _reject_link(path, info):
    # Windows directory junctions/reparse points also redirect path traversal.
    reparse = getattr(stat, 'FILE_ATTRIBUTE_REPARSE_POINT', 0)
    if stat.S_ISLNK(info.st_mode) or getattr(info, 'st_file_attributes', 0) & reparse:
        raise InstallError(f'Symlink or reparse point is not allowed: {path}')


def _check_ancestors(path, *, allow_missing=False):
    for ancestor in (*reversed(path.parents), path):
        try:
            info = ancestor.lstat()
        except FileNotFoundError:
            if allow_missing:
                continue
            raise InstallError(f'Missing directory: {ancestor}') from None
        _reject_link(ancestor, info)
        if not stat.S_ISDIR(info.st_mode):
            raise InstallError(f'Expected directory: {ancestor}')


def _read_file(path, expected):
    flags = os.O_RDONLY | getattr(os, 'O_BINARY', 0)
    flags |= getattr(os, 'O_NOFOLLOW', 0) | getattr(os, 'O_NONBLOCK', 0)
    with os.fdopen(os.open(path, flags), 'rb') as stream:
        before = os.fstat(stream.fileno())
        if not stat.S_ISREG(before.st_mode) or _identity(before) != _identity(expected):
            raise InstallError(f'File changed while reading: {path}')
        data = stream.read()
        after = os.fstat(stream.fileno())
        if (before.st_size, before.st_mtime_ns) != (after.st_size, after.st_mtime_ns):
            raise InstallError(f'File changed while reading: {path}')
    current = path.lstat()
    _reject_link(path, current)
    if _identity(current) != _identity(expected):
        raise InstallError(f'File replaced while reading: {path}')
    return data


def _inventory(root):
    """Bytes for regular files and None for directories, including empty ones."""
    _check_ancestors(root)
    inventory = {}

    def visit(directory):
        before = directory.lstat()
        _reject_link(directory, before)
        if not stat.S_ISDIR(before.st_mode):
            raise InstallError(f'Expected directory: {directory}')
        for path in sorted(directory.iterdir()):
            info = path.lstat()
            _reject_link(path, info)
            relative = path.relative_to(root)
            if stat.S_ISDIR(info.st_mode):
                inventory[relative] = None
                visit(path)
            elif stat.S_ISREG(info.st_mode):
                inventory[relative] = _read_file(path, info)
            else:
                raise InstallError(f'Special file is not allowed: {path}')
        after = directory.lstat()
        _reject_link(directory, after)
        if (_identity(before), before.st_mtime_ns) != (_identity(after), after.st_mtime_ns):
            raise InstallError(f'Directory changed while reading: {directory}')

    visit(root)
    return inventory


def _source_skills(source):
    inventory = _inventory(source)
    names = sorted(path.name for path in inventory if len(path.parts) == 1)
    if 'forma' not in names:
        raise InstallError('The source must contain the forma skill directory')
    skills = {}
    for name in names:
        if inventory[Path(name)] is not None or not SKILL_NAME.fullmatch(name):
            raise InstallError(f'Unexpected item in source root: {name}')
        files = {Path(*path.parts[1:]): data for path, data in inventory.items()
                 if path.parts[0] == name and len(path.parts) > 1}
        entrypoint = files.get(Path('SKILL.md'))
        if entrypoint is None:
            raise InstallError(f'Missing regular SKILL.md in {name}')
        try:
            lines = entrypoint.decode('utf-8').splitlines()
        except UnicodeDecodeError as exc:
            raise InstallError(f'SKILL.md must be UTF-8: {name}') from exc
        if not lines or lines[0] != '---' or '---' not in lines[1:]:
            raise InstallError(f'Missing SKILL.md frontmatter: {name}')
        frontmatter = lines[1:lines.index('---', 1)]
        declared = [line[5:].strip() for line in frontmatter if line.startswith('name:')]
        if len(declared) != 1 or declared[0] not in (name, f'"{name}"', f"'{name}'"):
            raise InstallError(f'SKILL.md name must match its directory: {name}')
        skills[name] = files
    return skills


def _preflight(destination, skills):
    _check_ancestors(destination, allow_missing=True)
    actions = {}
    conflicts = []
    for name, expected in skills.items():
        target = destination / name
        try:
            target.lstat()
        except FileNotFoundError:
            actions[name] = 'install'
            continue
        if _inventory(target) == expected:
            actions[name] = 'unchanged'
        else:
            conflicts.append(name)
    if conflicts:
        raise InstallError('Conflicting skills; nothing installed: ' + ', '.join(conflicts))
    return actions


def _make_directory(path, created):
    _check_ancestors(path.parent)
    path.mkdir()  # Exclusive: a concurrently created target is a conflict.
    created.append((path, _identity(path.lstat()), True))


def _write_file(path, data, created):
    _check_ancestors(path.parent)
    with path.open('xb') as stream:
        created.append((path, _identity(os.fstat(stream.fileno())), False))
        stream.write(data)


def _rollback(created):
    """Never recursively delete: concurrent additions must remain untouched."""
    failures = []
    for path, identity, is_directory in reversed(created):
        try:
            _check_ancestors(path.parent)
            current = path.lstat()
            _reject_link(path, current)
            if _identity(current) != identity:
                raise InstallError(f'Created path was replaced: {path}')
            if is_directory:
                path.rmdir()
            else:
                path.unlink()
        except (OSError, InstallError) as exc:
            failures.append(f'{path}: {exc}')
    return failures


def install_skills(source, destination, *, apply=False):
    """Return a JSON-compatible report; refuse every conflict before mutation."""
    # Do not resolve symlinks before validating the caller's actual path.
    source = Path(source).expanduser().absolute()
    destination = Path(destination).expanduser().absolute()
    skills = _source_skills(source)
    actions = _preflight(destination, skills)
    if apply and 'install' in actions.values():
        created = []
        try:
            if _preflight(destination, skills) != actions:
                raise InstallError('Destination changed after preflight; retry separately')
            for directory in (*reversed(destination.parents), destination):
                try:
                    directory.lstat()
                except FileNotFoundError:
                    _make_directory(directory, created)
            # Reserve all target roots before copying any contents.
            for name, action in actions.items():
                if action == 'install':
                    _make_directory(destination / name, created)
            for name, files in skills.items():
                if actions[name] == 'unchanged':
                    continue
                for relative, data in sorted(files.items()):
                    target = destination / name / relative
                    if data is None:
                        _make_directory(target, created)
                    else:
                        _write_file(target, data, created)
            for name, expected in skills.items():
                if _inventory(destination / name) != expected:
                    raise InstallError(f'Destination changed during installation: {name}')
        except (OSError, ValueError, KeyboardInterrupt) as exc:
            failures = _rollback(created)
            if failures:
                raise InstallError(f'{exc}; cleanup incomplete: ' + '; '.join(failures)) from exc
            raise
    entries = [
        {'name': name, 'path': str(destination / name),
         'action': ('installed' if apply else 'would-install') if action == 'install' else action,
         'files': sum(data is not None for data in skills[name].values())}
        for name, action in actions.items()
    ]
    return {
        'mode': 'apply' if apply else 'dry-run',
        'source': str(source), 'destination': str(destination),
        'summary': {'skills': len(entries), 'files': sum(item['files'] for item in entries),
                    'new': sum(action == 'install' for action in actions.values()),
                    'unchanged': sum(action == 'unchanged' for action in actions.values())},
        'skills': entries,
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=DEFAULT_SOURCE,
                        help='Portable package directory (default: distributions/agent-skills)')
    parser.add_argument('--destination', type=Path, required=True,
                        help='Explicit skills root, for example ~/.agents/skills')
    parser.add_argument('--apply', action='store_true', help='Create new skills; default is dry-run')
    args = parser.parse_args(argv)
    try:
        report = install_skills(args.source, args.destination, apply=args.apply)
    except (OSError, ValueError) as exc:
        print(f'Installation refused: {exc}', file=sys.stderr)
        return 1
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
