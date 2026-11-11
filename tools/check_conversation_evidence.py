"""Validate local conversation receipts, not LLM behavior or observation truth.

Read-only. Run evidence must be in a trusted, quiescent directory; path checks
are not a security boundary against concurrent filesystem replacement.
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import stat


SCHEMA = 'forma.conversation-evidence.v1'
DIMENSIONS = ('context_reuse', 'question_discipline', 'answer_semantics',
              'scope_preservation', 'evidence_quality', 'delivery')
CLASSES = ('actual-headless', 'actual-interactive', 'simulated', 'not-run')
OUTCOMES = ('pass', 'fail', 'incomplete', 'not-run')
SHA256 = re.compile(r'[0-9a-f]{64}\Z')
CASE = re.compile(r'PB(?:0[1-9]|1[0-5])\Z')


def nonempty(value):
    return isinstance(value, str) and bool(value.strip())


def contained_file(base, name):
    """Accept portable relative regular files, with no symlink traversal."""
    if (not nonempty(name) or '\\' in name or ':' in name or '\0' in name
            or any(part in ('', '.', '..') for part in name.split('/'))
            or PurePosixPath(name).is_absolute()):
        raise ValueError('expected relative contained path')
    base = base.resolve(strict=True)
    path = base
    for part in PurePosixPath(name).parts:
        path /= part
        if path.is_symlink():
            raise ValueError('symlink not allowed')
    path.resolve(strict=True).relative_to(base)
    info = path.stat()
    if not stat.S_ISREG(info.st_mode) or info.st_size == 0:
        raise ValueError('missing, empty or non-file evidence')
    return path


def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def validate(data, base):
    """Return structural errors; valid receipts may record fail or incomplete."""
    if not isinstance(data, dict):
        return ['Receipt must be an object.']
    errors = []
    if data.get('schema_version') != SCHEMA:
        errors.append(f'schema_version must be {SCHEMA}.')
    for field in ('run_id', 'host'):
        if not nonempty(data.get(field)):
            errors.append(f'{field}: nonempty text required.')
    if not isinstance(data.get('case_id'), str) or not CASE.fullmatch(data['case_id']):
        errors.append('case_id: expected PB01 through PB15.')
    execution, outcome = data.get('execution_class'), data.get('outcome')
    if execution not in CLASSES:
        errors.append('execution_class: invalid value.')
    if outcome not in OUTCOMES:
        errors.append('outcome: invalid value.')
    if outcome == 'not-run' or execution == 'not-run':
        if outcome != 'not-run' or execution != 'not-run':
            errors.append('not-run execution and outcome must agree.')
        if not nonempty(data.get('reason')):
            errors.append('not-run requires a reason.')
        for field in ('review', 'transcript', 'artifact', 'evidence'):
            if field in data:
                errors.append(f'not-run must not include {field} or executed scores.')
        if 'candidate' in data:
            candidate = data['candidate']
            if (not isinstance(candidate, dict) or set(candidate) != {'revision'}
                    or not nonempty(candidate.get('revision'))):
                errors.append('not-run candidate may contain only a revision label.')
        return errors

    evidence = data.get('evidence')
    if not isinstance(evidence, dict) or not evidence:
        errors.append('evidence: nonempty path-to-SHA256 object required.')
        evidence = {}
    files = {}
    for name, expected in evidence.items():
        if not isinstance(expected, str) or not SHA256.fullmatch(expected):
            errors.append(f'evidence {name}: expected lowercase SHA256.')
            continue
        try:
            path = contained_file(base, name)
            if digest(path) != expected:
                errors.append(f'evidence {name}: SHA256 mismatch.')
                continue
            files[name] = path
        except (OSError, ValueError) as error:
            errors.append(f'evidence {name}: {error}')

    def declared_file(name, label):
        if not nonempty(name) or name not in evidence:
            errors.append(f'{label}: file not in evidence.')
        elif name not in files:
            errors.append(f'{label}: evidence file did not verify.')

    candidate = data.get('candidate')
    if not isinstance(candidate, dict) or not nonempty(candidate.get('revision')):
        errors.append('candidate: revision and hashed file required.')
    else:
        declared_file(candidate.get('file'), 'candidate.file')
    declared_file(data.get('transcript'), 'transcript')
    if type(data.get('artifact_required')) is not bool:
        errors.append('artifact_required: boolean required.')
    if 'artifact' in data:
        declared_file(data['artifact'], 'artifact')
    elif data.get('artifact_required') is True and outcome == 'pass':
        errors.append('pass requires the requested artifact.')
    limits = data.get('limits')
    if not isinstance(limits, list) or not all(nonempty(item) for item in limits):
        errors.append('limits: list of nonempty strings required (may be empty).')
    if outcome == 'incomplete' and not nonempty(data.get('reason')):
        errors.append('incomplete requires a reason.')
    review = data.get('review')
    if review is None and outcome == 'incomplete':
        return errors
    if not isinstance(review, dict):
        return errors + ['review: manual review object required.']
    if not nonempty(review.get('reviewer')):
        errors.append('review.reviewer: identify the reviewer.')
    dimensions = review.get('dimensions')
    if not isinstance(dimensions, dict) or set(dimensions) != set(DIMENSIONS):
        return errors + ['review.dimensions: exactly the six declared dimensions required.']
    applicable = []
    for name, dimension in dimensions.items():
        label = f'review.dimensions.{name}'
        if not isinstance(dimension, dict) or 'score' not in dimension:
            errors.append(f'{label}: score and supporting evidence required.')
            continue
        score = dimension['score']
        if score is None:
            if not nonempty(dimension.get('reason')):
                errors.append(f'{label}: not-applicable requires a reason.')
            continue
        if type(score) is not int or score not in (0, 1, 2):
            errors.append(f'{label}: score must be 0, 1, 2 or null.')
            continue
        applicable.append(score)
        refs = dimension.get('evidence')
        if not isinstance(refs, list) or not refs:
            errors.append(f'{label}: supporting evidence references required.')
            continue
        for index, ref in enumerate(refs):
            target = f'{label}.evidence[{index}]'
            if not isinstance(ref, dict):
                errors.append(f'{target}: path and optional line required.')
                continue
            declared_file(ref.get('path'), target)
            if 'line' in ref:
                line = ref['line']
                if type(line) is not int or line < 1:
                    errors.append(f'{target}: line must be a positive integer.')
                elif isinstance(ref.get('path'), str) and ref['path'] in files:
                    try:
                        count = len(files[ref['path']].read_text(encoding='utf-8').splitlines())
                        if line > count:
                            errors.append(f'{target}: line exceeds evidence file.')
                    except (OSError, UnicodeError) as error:
                        errors.append(f'{target}: cannot verify text line: {error}')
    failures = review.get('material_failures')
    if not isinstance(failures, list) or not all(nonempty(item) for item in failures):
        errors.append('review.material_failures: list of nonempty strings required.')
    if outcome == 'pass' and (not applicable or any(score != 2 for score in applicable)
                              or failures != []):
        errors.append('pass requires applicable scores of 2 and no material failures.')
    if outcome == 'fail' and not failures and not any(score == 0 for score in applicable):
        errors.append('fail requires a violated dimension or material failure.')
    return errors


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f'Duplicate JSON key: {key}')
        result[key] = value
    return result


def reject_constant(value):
    raise ValueError(f'Nonfinite JSON number: {value}')


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('receipts', nargs='+', type=Path)
    parser.add_argument('--require-pass', action='store_true',
                        help='Fail if any structurally valid receipt records a non-pass outcome.')
    args = parser.parse_args(argv)
    results, seen = [], set()
    for receipt in args.receipts:
        data = None
        try:
            if receipt.is_symlink():
                raise ValueError('Receipt must not be a symlink.')
            data = json.loads(receipt.read_text(encoding='utf-8'),
                              object_pairs_hook=unique_object, parse_constant=reject_constant)
            errors = validate(data, receipt.parent)
        except (OSError, UnicodeError, ValueError) as error:
            errors = [str(error)]
        identifier = data.get('run_id') if isinstance(data, dict) else None
        outcome = data.get('outcome') if isinstance(data, dict) else None
        if isinstance(identifier, str):
            if identifier in seen:
                errors.append('Duplicate run_id in supplied receipts.')
            seen.add(identifier)
        results.append({'receipt': str(receipt), 'run_id': identifier, 'outcome': outcome,
                        'valid': not errors, 'errors': errors})
    valid = all(result['valid'] for result in results)
    passed = all(result['outcome'] == 'pass' for result in results)
    print(json.dumps({'valid': valid, 'semantic_evaluation': False,
                      'required_outcomes_satisfied': passed if args.require_pass else None,
                      'runs': results,
                      'limits': ['Hashes validate local bytes, not the origin or truth of observations.',
                                 'Scores are supplied by a reviewer; this tool does not judge LLM behavior.']},
                     ensure_ascii=False, indent=2))
    return 0 if valid and (not args.require_pass or passed) else 1


if __name__ == '__main__':
    raise SystemExit(main())
