/* Design previews only: no requests, persistence, form handling or product actions. */
(() => {
  "use strict";
  document.querySelectorAll(".forma-soft-glass-landing").forEach((root) => {
    const canvases = [...root.querySelectorAll("[data-sgl-landscape]")];

    // Original, deterministic halftone artwork. Draw only on resize or theme change.
    function drawLandscape(canvas) {
      const context = canvas.getContext("2d");
      if (!context) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const front = canvas.dataset.sglLandscape === "front";
      const dark = root.dataset.theme === "dark";
      context.fillStyle = dark ? "#ff773c" : "#ff5000";
      const pitch = width < 640 ? 4.5 : 5.2;
      for (let x = pitch / 2; x < width; x += pitch) {
        const unit = x / width;
        const valley = Math.pow(Math.sin(unit * Math.PI), 1.5);
        const ridge = front
          ? height * (.88 + valley * .105) + Math.sin(unit * 25) * 3
          : height * (.55 + valley * .36) + Math.sin(unit * 17) * 16;
        for (let y = Math.max(ridge, 0); y < height; y += pitch) {
          const depth = Math.min(1, (y - ridge) / (front ? 35 : 100));
          const texture = .84 + .16 * Math.sin(x * .05 + y * .08);
          const radius = Math.max(.2, pitch * .46 * depth * texture);
          context.globalAlpha = (front ? .95 : .62) * (dark ? .74 : 1);
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    }
    const redraw = () => canvases.forEach(drawLandscape);
    root.querySelectorAll("[data-sgl-theme]").forEach((button) => {
      button.addEventListener("click", () => {
        root.dataset.theme = button.dataset.sglTheme;
        root.querySelectorAll("[data-sgl-theme]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });
        // Immediate palette swap avoids a low-contrast interpolated midpoint.
        redraw();
      });
    });
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(redraw);
      canvases.forEach((canvas) => observer.observe(canvas));
    } else {
      window.addEventListener("resize", redraw, { passive: true });
    }
    redraw();

    root.querySelectorAll("[data-sgl-tabs]").forEach((group) => {
      const tablist = group.querySelector('[role="tablist"]');
      if (!tablist) return;
      const tabs = [...tablist.querySelectorAll('[role="tab"]')];
      if (tablist.classList.contains("sgl-vertical-tabs")) {
        const compact = window.matchMedia("(max-width: 860px)");
        const orient = () => tablist.setAttribute("aria-orientation", compact.matches ? "horizontal" : "vertical");
        orient();
        compact.addEventListener("change", orient);
      }
      function select(tab, moveFocus = false) {
        tabs.forEach((item) => {
          const selected = item === tab;
          item.setAttribute("aria-selected", String(selected));
          item.tabIndex = selected ? 0 : -1;
          const panel = group.querySelector(`#${item.getAttribute("aria-controls")}`);
          if (panel) panel.hidden = !selected;
        });
        if (moveFocus) tab.focus();
      }
      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => select(tab));
        tab.addEventListener("keydown", (event) => {
          const vertical = tablist.getAttribute("aria-orientation") === "vertical";
          const previous = vertical ? "ArrowUp" : "ArrowLeft";
          const next = vertical ? "ArrowDown" : "ArrowRight";
          let target;
          if (event.key === previous) target = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === next) target = (index + 1) % tabs.length;
          else if (event.key === "Home") target = 0;
          else if (event.key === "End") target = tabs.length - 1;
          else return;
          event.preventDefault();
          select(tabs[target], true);
        });
      });
    });

    // The four steps stay readable without JS; observing them only adds emphasis.
    const steps = [...root.querySelectorAll(".sgl-steps > li")];
    const tiles = [...root.querySelectorAll("[data-sgl-story]")];
    const markers = [...root.querySelectorAll(".sgl-story-progress i")];
    function emphasize(index) {
      tiles.forEach((tile, position) => tile.classList.toggle("is-current", position === index));
      markers.forEach((marker, position) => marker.classList.toggle("is-current", position === index));
    }
    emphasize(0);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) emphasize(steps.indexOf(entry.target));
        });
      }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });
      steps.forEach((step) => observer.observe(step));
    }
    // Native anchors already work without JS; keep their visual current state useful.
    const navigation = [...root.querySelectorAll(".sgl-nav-pill a")];
    navigation.forEach((link) => link.addEventListener("click", () => {
      navigation.forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "location");
    }));
  });
})();
