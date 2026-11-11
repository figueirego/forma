import { createServer } from 'node:http';
import { readFile, realpath, stat, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { browserScenarios } from './browser-regression.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputRoot = path.join(root, 'artifacts/browser-regression');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.md': 'text/plain' };

function inside(base, file) {
  const relative = path.relative(base, file);
  return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

// Ephemeral loopback server, with only the test assets and pinned Three package
// exposed. It does not serve repository metadata, credentials or arbitrary paths.
const allowed = await Promise.all([
  realpath(path.join(root, 'source/forma')),
  realpath(path.join(root, 'node_modules/three')),
]);
const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405).end(); return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    if (pathname === '/favicon.ico') { response.writeHead(204).end(); return; }
    const file = await realpath(path.resolve(root, '.' + pathname));
    if (!allowed.some(base => inside(base, file))) { response.writeHead(403).end(); return; }
    if (!(await stat(file)).isFile()) { response.writeHead(404).end(); return; }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
});

let browser;
const report = { schemaVersion: 1, executedAt: new Date().toISOString(),
  browser: 'Chromium', viewport: { width: 1440, height: 1000 }, results: [],
  limits: ['One desktop browser and viewport; no physical-device or cross-browser claim',
    'Sample data only; no production integration or model conversation is exercised',
    'Screenshots capture the rendered states; no pixel-fidelity score is inferred'] };

await mkdir(outputRoot, { recursive: true });
const output = await mkdtemp(path.join(outputRoot, report.executedAt.replaceAll(':', '-') + '-'));
try {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const baseURL = 'http://127.0.0.1:' + server.address().port + '/';
  browser = await chromium.launch();
  report.browserVersion = browser.version();
  for (const scenario of browserScenarios) {
    const context = await browser.newContext({ viewport: report.viewport, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(15000);
    const issues = [];
    page.on('pageerror', error => issues.push({ kind: 'pageerror', message: error.message,
      stack: error.stack || null, page: page.url() }));
    page.on('console', message => {
      if (message.type() === 'error') issues.push({ kind: 'console', message: message.text(),
        location: message.location(), page: page.url() });
    });
    page.on('response', response => {
      if (response.status() >= 400) issues.push({ kind: 'http', status: response.status(), url: response.url() });
    });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === new URL(baseURL).origin || ['data:', 'blob:'].includes(url.protocol)) return route.continue();
      issues.push({ kind: 'unexpected-network', url: url.href });
      return route.abort('blockedbyclient');
    });
    const result = { id: scenario.id, status: 'failed', issues, checkpoints: [] };
    const checkpoint = async name => {
      const screenshot = scenario.id + '-' + name + '.png';
      await page.screenshot({ path: path.join(output, screenshot), fullPage: true });
      result.checkpoints.push(screenshot);
    };
    let timer;
    try {
      result.checks = await Promise.race([
        scenario.run(page, baseURL, { checkpoint }),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Scenario exceeded 60 seconds')), 60000); }),
      ]);
      result.status = issues.length ? 'failed' : 'passed';
    } catch (error) {
      result.error = { message: error.message, stack: error.stack };
    } finally {
      clearTimeout(timer);
      result.screenshot = scenario.id + '.png';
      try { await page.screenshot({ path: path.join(output, result.screenshot), fullPage: true }); }
      catch (error) { result.screenshotError = error.message; result.status = 'failed'; }
      await context.close();
      if (issues.length) result.status = 'failed';
      report.results.push(result);
      console.log(result.status.toUpperCase() + ' ' + scenario.id);
      if (result.error) console.error(result.error.message);
      for (const issue of issues) console.error(JSON.stringify(issue));
    }
  }
} catch (error) {
  report.setupError = { message: error.message, stack: error.stack };
  console.error(error.message);
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
  report.status = !report.setupError && report.results.length === browserScenarios.length &&
    report.results.every(result => result.status === 'passed') ? 'passed' : 'failed';
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log('Browser report: ' + path.relative(root, path.join(output, 'report.json')));
  if (report.status !== 'passed') process.exitCode = 1;
}
