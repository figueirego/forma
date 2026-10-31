/* Preview navigation only. No storage, network calls, or business actions. */
(() => {
  const screens = new Set(['workspace', 'landing', 'controls']);
  const themes = new Set(['light', 'dark']);
  const params = new URLSearchParams(location.search);
  const root = document.querySelector('.forma-soft-glass');
  const setScreen = (screen) => {
    if (!screens.has(screen)) return;
    document.querySelectorAll('[data-preview-screen]').forEach((panel) => {
      panel.hidden = panel.dataset.previewScreen !== screen;
    });
    document.querySelectorAll('[data-screen]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.screen === screen));
    });
  };
  const setTheme = (theme) => {
    if (!themes.has(theme)) return;
    root.dataset.theme = theme;
    document.querySelectorAll('[data-set-theme]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setTheme === theme));
    });
  };
  document.querySelectorAll('[data-screen]').forEach((button) => {
    button.addEventListener('click', () => setScreen(button.dataset.screen));
  });
  document.querySelectorAll('[data-set-theme]').forEach((button) => {
    button.addEventListener('click', () => setTheme(button.dataset.setTheme));
  });
  setScreen(params.get('screen') || 'workspace');
  setTheme(params.get('theme') || 'light');
})();
