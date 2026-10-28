"""Run the repository's local validation gates without regenerating output."""
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]


def main():
    commands = [
        [sys.executable, '-B', '-m', 'unittest', 'discover', '-s', 'source/forma/tests', '-p', 'test_*.py', '-v'],
        [sys.executable, '-B', '-m', 'unittest', 'discover', '-s', 'tools', '-p', 'test_*.py', '-v'],
        ['node', 'tools/test-node.mjs'],
        [sys.executable, '-B', 'source/forma/scripts/check_package.py', '--root', 'source/forma'],
        [sys.executable, '-B', 'source/forma/scripts/check_package.py', '--root', 'plugins/forma', '--source', 'source/forma'],
        [sys.executable, '-B', 'tools/build.py', '--check'],
    ]
    for command in commands:
        print('\nRunning: ' + ' '.join(command), flush=True)
        result = subprocess.run(command, cwd=ROOT, check=False)
        if result.returncode:
            return result.returncode
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
