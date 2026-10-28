"""Read-only Forma package audit. Python 3.9+, standard library only."""
import argparse
from collections import Counter
import hashlib
import json
import os
from pathlib import Path, PurePosixPath, PureWindowsPath
import re
import stat
import sys
from urllib.parse import unquote, urlsplit
from zipfile import BadZipFile, ZipFile


LIMITS = [
    "Structural validation only: no target code, model, network or product UI is executed.",
    "YAML validation is limited to single-line name, description and interface.default_prompt scalars; not a full YAML parser.",
    "Markdown checks inline links/images and reference definitions outside fenced code; heading anchors approximate GitHub ATX headings, not full CommonMark/HTML rendering.",
    "External URLs and fragments in non-Markdown files are not validated.",
    "Hashes compare bytes, not authorship or trust. Source hashes are verified only with --source.",
    "Filesystem and ZIP comparisons ignore __pycache__, .pyc and .DS_Store. For wrapper ZIPs, equality covers the uniquely matched package subtree; all ZIP entry paths and symlinks are checked.",
    "Catalog discovery models the Codex compatibility manifest, not native host activation or invocation.",
]
NAME = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*\Z")
HASH = re.compile(r"[0-9a-f]{64}\Z")
INVOCATION = re.compile(r"\$[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*)*\b")


class InputError(ValueError):
    """Unreadable or malformed audit input, distinct from a failed invariant."""


def digest(data):
    return hashlib.sha256(data).hexdigest()


def ignored(name):
    path = PurePosixPath(name)
    return "__pycache__" in path.parts or path.suffix == ".pyc" or path.name == ".DS_Store"


def error(errors, code, path, detail):
    errors.append({"code": code, "path": str(path), "detail": detail})


def inventory(root, errors, label):
    root = Path(os.path.abspath(root))
    if root.is_symlink():
        error(errors, "symlink", label, "Package root must not be a symlink")
        return root, {}
    if not root.is_dir():
        raise InputError("{} is not a readable directory: {}".format(label, root))
    files = {}

    def walk_error(exc):
        raise exc

    for current, dirs, names in os.walk(root, followlinks=False, onerror=walk_error):
        for name in sorted(dirs + names):
            path = Path(current) / name
            relative = path.relative_to(root).as_posix()
            # Reject even ignored symlinks, without reading their targets.
            if path.is_symlink():
                error(errors, "symlink", label + "/" + relative, "Symlinks are not portable package files")
                if name in dirs:
                    dirs.remove(name)
                continue
            if ignored(relative):
                if name in dirs:
                    dirs.remove(name)
                continue
            if name in names:
                if not path.is_file():
                    error(errors, "special-file", label + "/" + relative, "Expected a regular file")
                    continue
                files[relative] = path.read_bytes()
        dirs.sort()
    return root, files


def decode(data, path):
    try:
        return data.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise InputError("Invalid UTF-8 in {}: {}".format(path, exc)) from exc


def json_object(data, path):
    def unique_object(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise InputError("Duplicate JSON key in {}: {}".format(path, key))
            result[key] = value
        return result

    def invalid_constant(value):
        raise InputError("Non-JSON constant in {}: {}".format(path, value))

    try:
        result = json.loads(decode(data, path), object_pairs_hook=unique_object, parse_constant=invalid_constant)
    except json.JSONDecodeError as exc:
        raise InputError("Malformed JSON in {}: {}".format(path, exc)) from exc
    if not isinstance(result, dict):
        raise InputError("Expected a JSON object in " + path)
    return result


def portable_path(value):
    if not isinstance(value, str) or not value or "\\" in value or "\x00" in value:
        return False
    path = PurePosixPath(value)
    return not path.is_absolute() and not PureWindowsPath(value).drive and ".." not in value.split("/")


def declared_path(value, files, errors, label, directory=False):
    if not isinstance(value, str) or not value.startswith("./") or value == "./" or not portable_path(value):
        error(errors, "manifest-path", label, "Expected ./-prefixed path contained in the plugin")
        return None
    relative = PurePosixPath(value).as_posix().rstrip("/")
    exists = any(name.startswith(relative + "/") for name in files) if directory else relative in files
    if not exists:
        error(errors, "manifest-missing", label, "Referenced {} is missing: {}".format("directory" if directory else "file", value))
        return None
    return relative


def plugin_manifest(files, errors):
    path = ".codex-plugin/plugin.json"
    if path not in files:
        if "SKILL.md" not in files:
            error(errors, "entrypoint", "root", "Expected SKILL.md or .codex-plugin/plugin.json")
        return None, []
    manifest = json_object(files[path], path)
    name = manifest.get("name")
    if not isinstance(name, str) or not NAME.fullmatch(name):
        error(errors, "plugin-name", path, "Invalid plugin name")
    roots = manifest.get("skills", "./skills/")
    if isinstance(roots, str):
        roots = [roots]
    if not isinstance(roots, list) or not roots:
        raise InputError("Manifest skills must be a nonempty string or array")
    resolved = []
    for value in roots:
        result = declared_path(value, files, errors, "manifest.skills", directory=True)
        if result:
            resolved.append(result)
    interface = manifest.get("interface", {})
    if not isinstance(interface, dict):
        raise InputError("Manifest interface must be an object")
    for key in ("composerIcon", "composerIconDark", "logo", "logoDark"):
        if key in interface:
            declared_path(interface[key], files, errors, "manifest.interface." + key)
    screenshots = interface.get("screenshots", [])
    if not isinstance(screenshots, list):
        raise InputError("Manifest interface.screenshots must be an array")
    for value in screenshots:
        declared_path(value, files, errors, "manifest.interface.screenshots")
    return manifest, resolved


def scalar(value):
    value = value.strip()
    if not value or value[0] in "|>{[&*!":
        return None
    if value[0] in "\"'":
        quote = value[0]
        if len(value) < 2 or value[-1] != quote:
            return None
        return value[1:-1].replace("''", "'") if quote == "'" else value[1:-1]
    value = re.split(r"\s+#", value, maxsplit=1)[0].strip()
    if value.lower() in ("null", "~", "true", "false", "yes", "no", "on", "off") or re.fullmatch(r"[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?", value):
        return None
    return value


def frontmatter(text, path, errors):
    match = re.match(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|\Z)", text, re.S)
    if not match:
        error(errors, "frontmatter", path, "Missing opening YAML frontmatter")
        return None
    fields = {}
    for key in ("name", "description"):
        values = re.findall(r"^" + key + r":[ \t]*([^\r\n]*)$", match.group(1), re.M)
        fields[key] = scalar(values[0]) if len(values) == 1 else None
        if not fields[key]:
            error(errors, "frontmatter", path, "Expected one nonempty single-line scalar: " + key)
    if fields["name"] and not NAME.fullmatch(fields["name"]):
        error(errors, "skill-name", path, "Name must use lowercase letters, digits and single hyphens")
        return None
    return fields["name"]


def catalog(files, manifest, roots, errors):
    all_skills = sorted(name for name in files if PurePosixPath(name).name == "SKILL.md")
    selected = all_skills if manifest is None else [name for name in all_skills if any(name.startswith(root + "/") for root in roots)]
    for path in sorted(set(all_skills) - set(selected)):
        error(errors, "undiscovered-skill", path, "Skill is outside manifest skills roots")
    if not selected:
        error(errors, "empty-catalog", "root", "No discoverable skills")
    result = []
    seen = set()
    plugin_name = manifest.get("name") if manifest else None
    for path in selected:
        name = frontmatter(decode(files[path], path), path, errors)
        if not name:
            continue
        if name in seen:
            error(errors, "duplicate-skill", path, "Duplicate skill name: " + name)
        seen.add(name)
        invocation = "${}:{}".format(plugin_name, name) if plugin_name else "$" + name
        result.append({"name": name, "path": path, "invocation": invocation})
    if manifest:
        valid_invocations = {skill["invocation"] for skill in result}
        for item in result:
            metadata = str(PurePosixPath(item["path"]).parent / "agents/openai.yaml")
            if metadata not in files:
                continue  # Presentation metadata is optional in the skill format.
            text = decode(files[metadata], metadata)
            section = re.search(r"^interface:\s*\n((?:[ \t]+[^\n]*\n|\n)*)", text + "\n", re.M)
            values = re.findall(r"^[ \t]+default_prompt:[ \t]*([^\r\n]*)$", section.group(1), re.M) if section else []
            prompt = scalar(values[0]) if len(values) == 1 else None
            tokens = set(INVOCATION.findall(prompt or ""))
            if prompt is None or (tokens and (item["invocation"] not in tokens or not tokens.issubset(valid_invocations))):
                error(errors, "prompt-namespace", metadata, "Skill tokens in default_prompt must include " + item["invocation"] + " and name known packaged skills")
        prompts = manifest.get("interface", {}).get("defaultPrompt", [])
        if isinstance(prompts, str):
            prompts = [prompts]
        if not isinstance(prompts, list) or any(not isinstance(prompt, str) for prompt in prompts):
            raise InputError("Manifest interface.defaultPrompt must be a string or array of strings")
        for index, prompt in enumerate(prompts):
            invalid = set(INVOCATION.findall(prompt)) - valid_invocations
            if invalid:
                error(errors, "prompt-namespace", "manifest.interface.defaultPrompt[{}]".format(index),
                      "Unknown or unnamespaced skill invocation: " + ", ".join(sorted(invalid)))
    return result


def recorded_catalog(files, skills, manifest, errors):
    if "catalog.json" not in files:
        return
    data = json_object(files["catalog.json"], "catalog.json")
    entries = data.get("skills")
    if not isinstance(entries, list) or any(not isinstance(item, dict) for item in entries):
        raise InputError("catalog.skills must be an array of objects")
    fields = ("name", "path", "invocation")
    observed = [{key: item.get(key) for key in fields} for item in entries]
    # Compare serialized records to retain duplicates and tolerate only array ordering.
    ordered = lambda records: sorted(json.dumps(item, sort_keys=True) for item in records)
    if ordered(observed) != ordered(skills):
        error(errors, "catalog-mismatch", "catalog.json", "Recorded name/path/invocation entries differ from discovered skills")
    if manifest and data.get("version") != manifest.get("version"):
        error(errors, "catalog-version", "catalog.json", "Recorded version differs from plugin manifest")


def prose(text):
    lines = []
    fence = None
    for line in text.splitlines():
        marker = re.match(r"^ {0,3}(`{3,}|~{3,})(.*)$", line)
        if fence:
            if marker and marker.group(1)[0] == fence[0] and len(marker.group(1)) >= len(fence) and not marker.group(2).strip():
                fence = None
            continue
        if marker:
            fence = marker.group(1)
        else:
            lines.append(line)
    return "\n".join(lines)


def anchors(text):
    seen = Counter()
    result = set()
    for heading in re.findall(r"^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$", prose(text), re.M):
        heading = re.sub(r"\[([^]]+)\]\([^)]*\)", r"\1", heading)
        slug = re.sub(r"[^\w\- ]", "", heading.lower(), flags=re.U).replace(" ", "-")
        result.add(slug + ("-{}".format(seen[slug]) if seen[slug] else ""))
        seen[slug] += 1
    return result


def markdown_links(root, files, errors):
    markdown = {name: decode(data, name) for name, data in files.items() if name.endswith(".md")}
    count = 0
    for name, text in markdown.items():
        text = prose(text)
        targets = re.findall(r"\[[^]\n]*\]\(([^)\n]+)\)", text)
        targets += re.findall(r"^ {0,3}\[[^]\n]+\]:\s*(.+)$", text, re.M)
        for target in targets:
            target = target.strip()
            if target.startswith("<") and ">" in target:
                target = target[1:target.index(">")]
            else:
                target = re.split(r"\s+[\"']", target, maxsplit=1)[0]
            try:
                parsed = urlsplit(target)
            except ValueError:
                error(errors, "link-url", name, "Malformed link: " + target)
                continue
            if parsed.scheme.lower() == "file" or re.match(r"^[A-Za-z]:[\\/]", target):
                error(errors, "link-escape", name, "Absolute local file URL is not portable: " + target)
                continue
            if parsed.scheme or parsed.netloc:
                continue
            count += 1
            local = unquote(parsed.path)
            if "\\" in local or "\x00" in local or PureWindowsPath(local).drive or PurePosixPath(local).is_absolute():
                error(errors, "link-escape", name, "Nonportable local link: " + target)
                continue
            path = ((root / name).parent / local).resolve() if local else root / name
            try:
                relative = path.relative_to(root.resolve()).as_posix()
            except ValueError:
                error(errors, "link-escape", name, "Link escapes package: " + target)
                continue
            if relative not in files:
                error(errors, "link-missing", name, "Missing file: " + target)
                continue
            fragment = unquote(parsed.fragment)
            if fragment and relative in markdown and fragment not in anchors(markdown[relative]):
                error(errors, "anchor-missing", name, "Missing heading anchor: " + target)
    return len(markdown), count


def provenance(files, source_files, errors):
    path = "provenance.json"
    if path not in files:
        error(errors, "provenance-missing", path, "Forma plugin must retain its source-to-package manifest")
        return 0
    data = json_object(files[path], path)
    entries = data.get("files")
    if not isinstance(entries, list) or not entries:
        raise InputError("provenance.files must be a nonempty array")
    source_seen, package_seen = set(), set()
    for entry in entries:
        if not isinstance(entry, dict):
            raise InputError("Each provenance entry must be an object")
        for key, sha_key, available, seen in (
            ("source", "source_sha256", source_files, source_seen),
            ("packaged", "packaged_sha256", files, package_seen),
        ):
            name, expected = entry.get(key), entry.get(sha_key)
            if not portable_path(name) or PurePosixPath(name).as_posix() != name:
                error(errors, "provenance-path", path, "Invalid " + key + " path: " + repr(name))
                continue
            if name in seen:
                error(errors, "provenance-duplicate", path, "Duplicate " + key + " path: " + name)
            seen.add(name)
            if not isinstance(expected, str) or not HASH.fullmatch(expected):
                error(errors, "provenance-hash", name, "Invalid " + sha_key)
            elif available is not None:
                if name not in available:
                    error(errors, "provenance-file", name, "Missing " + key + " file")
                elif digest(available[name]) != expected:
                    error(errors, "provenance-hash", name, key + " bytes differ from recorded hash")
    if source_files is not None:
        for name in sorted(set(source_files) - source_seen):
            error(errors, "provenance-omission", name, "Canonical source file is not recorded")
    return len(entries)


def compare(expected, actual, errors, label):
    for name in sorted(set(expected) | set(actual)):
        if name not in actual:
            error(errors, label + "-missing", name, "File is missing")
        elif name not in expected:
            error(errors, label + "-extra", name, "Unexpected file")
        elif expected[name] != actual[name]:
            error(errors, label + "-mismatch", name, "File bytes differ")


def check_archive(archive, files, errors, plugin):
    with ZipFile(archive) as zipped:
        members = {}
        for info in zipped.infolist():
            name = info.filename
            if not portable_path(name) or "." in name.split("/"):
                error(errors, "archive-path", name, "Unsafe ZIP entry path")
                continue
            if stat.S_ISLNK(info.external_attr >> 16):
                error(errors, "archive-symlink", name, "ZIP symlink is not allowed")
                continue
            if info.is_dir():
                continue
            if name in members:
                error(errors, "archive-duplicate", name, "Duplicate ZIP entry")
                continue
            members[name] = zipped.read(info)
    marker = ".codex-plugin/plugin.json" if plugin else "SKILL.md"
    candidates = [name[:-len(marker)] for name, data in members.items()
                  if (name == marker or name.endswith("/" + marker)) and data == files.get(marker)]
    if len(candidates) != 1:
        error(errors, "archive-root", str(archive), "Expected one package subtree with identical root entrypoint; found {}".format(len(candidates)))
        return None
    prefix = candidates[0]
    selected = {name[len(prefix):]: data for name, data in members.items()
                if name.startswith(prefix) and not ignored(name[len(prefix):])}
    compare(files, selected, errors, "archive")
    return prefix


def audit(root, installed=None, archive=None, source=None):
    errors = []
    root, files = inventory(root, errors, "root")
    manifest, roots = plugin_manifest(files, errors)
    skills = catalog(files, manifest, roots, errors)
    recorded_catalog(files, skills, manifest, errors)
    markdown_count, link_count = markdown_links(root, files, errors)
    source_files = inventory(source, errors, "source")[1] if source is not None else None
    if source_files is not None and manifest is None:
        raise InputError("--source applies to a Forma plugin with provenance.json")
    provenance_count = provenance(files, source_files, errors) if manifest else 0
    compared = {"installed": installed is not None, "archive": archive is not None, "source": source is not None}
    if installed is not None:
        compare(files, inventory(installed, errors, "installed")[1], errors, "installed")
    archive_root = check_archive(archive, files, errors, manifest is not None) if archive is not None else None
    return {"status": "fail" if errors else "pass", "kind": "plugin" if manifest else "skill",
            "counts": {"files": len(files), "skills": len(skills), "markdown": markdown_count,
                       "local_links": link_count, "provenance_entries": provenance_count},
            "catalog": skills, "comparisons": compared, "archive_root": archive_root,
            "errors": errors, "limits": LIMITS}


def main(argv=None):
    class Parser(argparse.ArgumentParser):
        def error(self, message):
            raise InputError(message)

    parser = Parser(description=__doc__)
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--installed", type=Path)
    parser.add_argument("--archive", type=Path)
    parser.add_argument("--source", type=Path)
    try:
        args = parser.parse_args(argv)
        report = audit(args.root, args.installed, args.archive, args.source)
    except (InputError, OSError, BadZipFile, RuntimeError) as exc:
        print(json.dumps({"status": "invalid-input", "counts": {}, "catalog": [],
                          "errors": [{"code": "input", "detail": str(exc)}], "limits": LIMITS}, ensure_ascii=False, indent=2))
        return 2
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["status"] == "pass" else 1


if __name__ == "__main__":
    sys.exit(main())
