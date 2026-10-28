import { readdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const threeModule = fileURLToPath(import.meta.resolve('three'));
await import(import.meta.resolve('three'));
const tests = readdirSync(path.join(root, 'source/forma/tests'))
  .filter(name => name.endsWith('.test.cjs'))
  .sort()
  .map(name => path.join(root, 'source/forma/tests', name));
if (tests.length === 0) throw new Error('No Node tests found');

const result = spawnSync(process.execPath, ['--test', '--test-reporter=tap', ...tests], {
  cwd: root,
  env: { ...process.env, BOOK_THREE_MODULE: threeModule },
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});
process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
if (!/^# skipped 0$/m.test(result.stdout) || /# SKIP\b/i.test(result.stdout)) {
  console.error('All Node tests, including real Three.js geometry tests, must execute without skips.');
  process.exit(1);
}
