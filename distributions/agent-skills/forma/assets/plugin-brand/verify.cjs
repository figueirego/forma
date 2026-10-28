const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require('playwright');
const sharp = require('sharp');

const root = __dirname;
const heroSource = process.env.FORMA_HERO_SOURCE || null;
const provenance = JSON.parse(fs.readFileSync(path.join(root, 'provenance.json'), 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const expectedSpecialists = ['foundations', 'interface', 'product', 'objects-3d', 'graphs-data', 'motion', 'platforms', 'brand', 'reference', 'validation', 'handoff'];
const checks = [];
function check(name, pass, evidence) {
  checks.push({name, pass: !!pass, evidence});
}
function luminance(hex) {
  const rgb = hex.replace('#', '').match(/../g).map(n => parseInt(n, 16) / 255);
  const [r, g, b] = rgb.map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
}
function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x,y) => y-x);
  return (lighter + .05) / (darker + .05);
}
(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME_BIN ? {executablePath: process.env.CHROME_BIN} : {}),
    headless: true
  });
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, deviceScaleFactor: 1, reducedMotion: 'reduce'});
  const errors = [];
  const externalRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => { if (/^https?:/.test(request.url())) externalRequests.push(request.url()); });
  await page.goto('file://' + path.join(root, 'identidade.html'));
  await page.evaluate(() => document.fonts.ready);
  const layouts = [];
  for (const [width, height] of [[320,800], [360,800], [390,844], [768,1024], [1024,900], [1440,1000]]) {
    await page.setViewportSize({width, height});
    const measurements = await page.evaluate(() => {
      const rect = element => {
        const r = element.getBoundingClientRect();
        return {x:r.x, y:r.y, width:r.width, height:r.height, right:r.right};
      };
      return {
        viewport: {width:innerWidth,height:innerHeight},
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        h1: rect(document.querySelector('h1')),
        hero: rect(document.querySelector('.hero')),
        columns: getComputedStyle(document.querySelector('.specialists')).gridTemplateColumns,
        smallMarks: [...document.querySelectorAll('.small-samples svg')].map(rect),
        images: [...document.images].map(i => ({src:i.getAttribute('src'),complete:i.complete,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight})),
        specialistIds: [...document.querySelectorAll('[data-specialist]')].map(e=>e.dataset.specialist)
      };
    });
    layouts.push(measurements);
    check('no-horizontal-overflow-' + width, measurements.documentWidth <= width, {viewport:width, documentWidth:measurements.documentWidth});
    check('images-loaded-' + width, measurements.images.every(i=>i.complete && i.naturalWidth>0), measurements.images);
  }
  check('eleven-specialists-in-order', JSON.stringify(layouts[0].specialistIds) === JSON.stringify(expectedSpecialists), layouts[0].specialistIds);
  check('24-and-32-pixel-samples', layouts[0].smallMarks.map(r=>r.width).join(',') === '24,32', layouts[0].smallMarks);
  const hrefs = await page.locator('a').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')));
  const badLinks = [];
  for (const href of hrefs) {
    if (href.startsWith('#')) {
      if (!await page.locator(href).count()) badLinks.push(href);
    } else if (!fs.existsSync(path.resolve(root, href))) badLinks.push(href);
  }
  check('all-links-resolve', badLinks.length === 0, {hrefs,badLinks});
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => ({text:document.activeElement.textContent.trim(),href:document.activeElement.getAttribute('href'),outline:getComputedStyle(document.activeElement).outlineStyle}));
  check('keyboard-skip-link', focused.href === '#conteudo' && focused.outline !== 'none', focused);
  await page.locator('.text-link').click();
  check('navigation-anchor', await page.evaluate(()=>location.hash) === '#sistema', await page.evaluate(()=>location.hash));
  // Fresh pages avoid stale compositor tiles after changing viewport dimensions.
  for (const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
    const capturePage = await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
    await capturePage.goto('file://' + path.join(root,'identidade.html'));
    await capturePage.evaluate(async () => { await document.fonts.ready; await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))); });
    await capturePage.screenshot({path:path.join(root,'preview-' + name + '-top.png')});
    if (name === 'mobile') {
      await capturePage.locator('.identity-section').screenshot({path:path.join(root,'preview-symbols.png')});
      await capturePage.locator('.usage-grid').screenshot({path:path.join(root,'preview-usage.png')});
    }
    await capturePage.close();
  }

  const iconSource = fs.readFileSync(path.join(root,'icon.svg'),'utf8').replace(/<\?xml[^>]*>/, '');
  const logoPage = await browser.newPage({viewport:{width:512,height:512},deviceScaleFactor:1});
  await logoPage.setContent('<style>html,body{margin:0;width:512px;height:512px;background:transparent}svg{width:512px;height:512px;display:block}</style>' + iconSource);
  await logoPage.screenshot({path:path.join(root,'logo.png'),omitBackground:true});
  const logoMeta = await sharp(path.join(root,'logo.png')).metadata();
  const logoStats = await sharp(path.join(root,'logo.png')).stats();
  check('logo-png-512-transparent', logoMeta.width===512 && logoMeta.height===512 && logoMeta.hasAlpha && logoStats.channels[3].min===0 && logoStats.channels[3].max===255, {width:logoMeta.width,height:logoMeta.height,hasAlpha:logoMeta.hasAlpha,alphaRange:[logoStats.channels[3].min,logoStats.channels[3].max]});

  const svgFiles = ['icon.svg','icon-dark.svg','wordmark.svg','wordmark-dark.svg'];
  const svgEvidence = [];
  for (const name of svgFiles) {
    const data = fs.readFileSync(path.join(root,name),'utf8');
    const measurement = await logoPage.evaluate(svg => {
      const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
      return {parseError:!!doc.querySelector('parsererror'),rects:[...doc.querySelectorAll('rect')].map(n=>['x','y','width','height'].map(a=>Number(n.getAttribute(a)))),editableText:doc.querySelector('text')?.textContent || null};
    }, data);
    svgEvidence.push({file:name,...measurement});
  }
  const expectedRects = [[12,12,24,96],[42,12,66,24],[42,48,48,24]];
  check('canonical-three-part-geometry', svgEvidence.every(i=>!i.parseError && JSON.stringify(i.rects)===JSON.stringify(expectedRects)),svgEvidence);
  check('wordmark-text-editable',svgEvidence.filter(i=>i.file.startsWith('wordmark')).every(i=>i.editableText==='Forma'),svgEvidence.filter(i=>i.file.startsWith('wordmark')));
  const wordmarkPage = await browser.newPage({viewport:{width:440,height:128},deviceScaleFactor:1});
  await wordmarkPage.setContent('<style>html,body{margin:0}</style>'+fs.readFileSync(path.join(root,'wordmark.svg'),'utf8').replace(/<\?xml[^>]*>/,''));
  const wordBox = await wordmarkPage.locator('text').evaluate(e=>{const b=e.getBBox();return{x:b.x,y:b.y,width:b.width,height:b.height,font:getComputedStyle(e).fontFamily};});
  check('wordmark-fits-svg',wordBox.x>=0 && wordBox.y>=0 && wordBox.x+wordBox.width<=440 && wordBox.y+wordBox.height<=128,wordBox);

  const contrastPairs = [
    ['ink/paper','#172238','#F5F4F0'],
    ['muted/paper','#596274','#F5F4F0'],
    ['blue/paper','#315BE8','#F5F4F0'],
    ['white/blue','#FFFFFF','#315BE8'],
    ['paper/ink','#F5F4F0','#172238'],
    ['darkMuted/ink','#B9C1D1','#172238'],
    ['darkAccent/ink','#A8BCFF','#172238']
  ].map(([name,foreground,background])=>({name,foreground,background,ratio:Number(contrast(foreground,background).toFixed(3)),pass:contrast(foreground,background)>=4.5}));
  check('declared-text-pairs-contrast',contrastPairs.every(p=>p.pass),contrastPairs);
  check('no-external-page-requests',externalRequests.length===0,externalRequests);
  check('no-browser-errors',errors.length===0,errors);
  const heroHash = hash(path.join(root,'hero.png'));
  check('hero-matches-provenance',heroHash===provenance.hero.sha256,{copiedSha256:heroHash,expectedSha256:provenance.hero.sha256});
  if (heroSource) check('hero-byte-identical-to-optional-source',fs.existsSync(heroSource) && heroHash===hash(heroSource),{sourcePresent:fs.existsSync(heroSource),sourceSha256:fs.existsSync(heroSource)?hash(heroSource):null});

  const report = {
    createdAt:new Date().toISOString(),
    mode:'Chromium headless, viewport resizing; local file. Not physical-device, print, screen-reader or full accessibility certification.',
    browser:await browser.version(),
    executable:process.env.CHROME_BIN || 'Playwright-managed Chromium',
    playwright:require('playwright/package.json').version,
    entry:'identidade.html',
    sourceHashes:Object.fromEntries(['identidade.html','identity.css','tokens.css','tokens.json','icon.svg','icon-dark.svg','wordmark.svg','wordmark-dark.svg','hero.png','provenance.json'].map(name=>[name,hash(path.join(root,name))])),
    allPassed:checks.every(c=>c.pass),
    checks,
    responsiveMeasurements:layouts,
    contrastPairs,
    limitations:['Hero is supplied AI artwork, not an interactive 3D mechanism.','Fonts use system fallbacks and may vary across operating systems.','Contrast results cover declared opaque color pairs, not every photographic pixel.','These checks do not establish trademark clearance or consumer integration.']
  };
  fs.writeFileSync(path.join(root,'qa.json'),JSON.stringify(report,null,2)+'\n');
  await browser.close();
  console.log(JSON.stringify({allPassed:report.allPassed,checks:checks.length,failed:checks.filter(c=>!c.pass),browser:report.browser,heroSha256:heroHash},null,2));
  if(!report.allPassed)process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});

