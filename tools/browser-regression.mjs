import assert from 'node:assert/strict';

// Only public UI actions and DOM reads: the same scenarios can use a native
// Playwright Page or a host browser adapter. No application-state injection.
const asset = (baseURL, name) => new URL('source/forma/assets/' + name, baseURL).href;
const button = (page, name) => page.getByRole('button', { name, exact: true });

async function selected(page, name) {
  assert.equal(await button(page, name).getAttribute('aria-pressed'), 'true',
    name + ' should be selected');
}

export async function appearancePersistence(page, baseURL) {
  await page.goto(asset(baseURL, 'components-lab.html'));
  await button(page, 'Dark mode').click();
  await button(page, 'Hue 36 degrees').click();
  await button(page, 'Save').click();
  await page.getByText('Saved to this browser. Reopen saved or reload to verify persistence.',
    { exact: true }).waitFor({ state: 'visible' });

  await button(page, 'Reopen saved').click();
  await selected(page, 'Dark mode');
  await selected(page, 'Hue 36 degrees');
  await page.reload();
  await button(page, 'Dark mode').waitFor({ state: 'visible' });
  await selected(page, 'Dark mode');
  await selected(page, 'Hue 36 degrees');

  await button(page, 'Light mode').click();
  await selected(page, 'Light mode');
  await button(page, 'Hue 132 degrees').click();
  await selected(page, 'Hue 132 degrees');
  await button(page, 'Discard changes').click();
  await page.getByText('Preview discarded. The saved appearance is restored.',
    { exact: true }).waitFor({ state: 'visible' });
  await selected(page, 'Dark mode');
  await selected(page, 'Hue 36 degrees');
  assert.equal(await page.getByRole('alert').filter({ visible: true }).count(), 0);
  return ['save acknowledged', 'reopen restored', 'reload persisted', 'discard restored saved appearance'];
}

export async function passportNavigation(page, baseURL, { checkpoint = async () => {} } = {}) {
  await page.goto(asset(baseURL, 'components-lab.html'));
  await page.getByText('Ready. Use the original page arrows or drag a corner; sample changes stay in this session.',
    { exact: true }).waitFor({ state: 'visible' });
  const frame = page.frameLocator('iframe[title="Passaporte interativo do Neuron"]');
  // The cover hit target and forward arrow share a name. Scope to the footer
  // arrow, which remains the accessible alternative to the drag gesture.
  await frame.locator('[data-np-next]').click();
  await frame.getByText('Meus dados. P\u00e1gina 2 de 3.', { exact: true })
    .waitFor({ state: 'attached' });
  // ARIA changes before the articulated cover finishes opening. Require the
  // painted geometry to settle, then check that the profile is not occluded.
  await frame.locator('.np-stage[data-turn="1.000 0.000"]:is([data-motion-state="idle"],[data-motion-state="static"])')
    .waitFor({ state: 'visible' });
  const profileName = frame.getByRole('heading', { name: 'Alex Morgan', exact: true });
  await profileName.waitFor({ state: 'visible' });
  assert.equal(await profileName.evaluate(element => {
    const rect = element.getBoundingClientRect();
    const hit = element.ownerDocument.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    return hit === element || element.contains(hit);
  }), true, 'The profile name must be painted in front of the opened cover');
  assert.equal(await frame.getByRole('button', { name: 'Pr\u00f3xima p\u00e1gina', exact: true }).isEnabled(), true);
  await checkpoint('opened-profile');
  await frame.getByRole('button', { name: 'P\u00e1gina anterior', exact: true }).click();
  await frame.getByText('Capa. P\u00e1gina 1 de 3.', { exact: true })
    .waitFor({ state: 'attached' });
  await frame.locator('.np-stage[data-turn="0.000 0.000"]:is([data-motion-state="idle"],[data-motion-state="static"])')
    .waitFor({ state: 'visible' });
  assert.equal(await frame.getByRole('heading', { name: 'Alex Morgan', exact: true }).count(), 0,
    'The closed profile must leave the accessibility tree');
  assert.equal(await frame.getByRole('button', { name: 'P\u00e1gina anterior', exact: true }).isEnabled(), false);
  return ['real frame ready', 'profile visibly opened without cover occlusion', 'back returned to closed cover'];
}

export async function referenceSearch(page, baseURL) {
  await page.goto(asset(baseURL, 'reference-browser.html'));
  const search = page.getByLabel('What do you want to create?', { exact: true });
  const pattern = page.getByRole('button', { name: 'View pattern: Quiet workspace shell', exact: true });
  await pattern.waitFor({ state: 'visible' });
  await search.fill('quiet workspace shell');
  await pattern.waitFor({ state: 'visible' });
  await pattern.click();
  const detail = page.getByRole('dialog');
  await detail.waitFor({ state: 'visible' });
  await button(page, 'Close reference').press('Escape');
  await detail.waitFor({ state: 'hidden' });
  assert.equal(await pattern.evaluate(element => element === element.ownerDocument.activeElement), true,
    'Closing the dialog should return focus to its opener');

  await search.fill('zzzz-no-such-forma-capability-9173');
  await page.getByText('No patterns match these filters. Try another term or a broader context.',
    { exact: true }).waitFor({ state: 'visible' });
  assert.equal(await page.getByRole('button', { name: /^View pattern:/ }).count(), 0,
    'An unknown query must not substitute unrelated patterns');
  assert.equal(await page.getByRole('status').innerText(), '0 patterns / 0 shown');

  await search.fill('');
  await pattern.waitFor({ state: 'visible' });
  return ['generic pattern query', 'dialog opened and Escape restored focus', 'unknown query stayed empty', 'clearing search restored results'];
}

export const browserScenarios = Object.freeze([
  { id: 'appearance-persistence', run: appearancePersistence },
  { id: 'passport-navigation', run: passportNavigation },
  { id: 'reference-search', run: referenceSearch },
]);
