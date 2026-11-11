import { mountInkTheme } from './ink-theme.js';

const toggle = document.querySelector('#theme-toggle');
const theme = mountInkTheme({
  initialTheme: document.documentElement.dataset.theme,
  applyTheme(value) {
    document.documentElement.dataset.theme = value;
    toggle.textContent = value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  },
});
let count = 0;
toggle.disabled = false;

// Integrate into one existing dispatcher; do not replay synthetic clicks.
document.addEventListener('click', event => {
  const target = theme.resolveClick(event)?.closest?.('button,a');
  if (target === toggle) void theme.toggle();
  else if (target?.dataset.action === 'count') {
    document.querySelector('#count').textContent = `${++count} actions`;
  }
});
