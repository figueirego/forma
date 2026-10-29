/*
 * Optional, standalone demo controller - not a router, backend or framework adapter.
 * Synthetic collections and mutations live in memory. localStorage holds preferences
 * only; storage failure leaves the demo operational and produces a visible message.
 * Public CSS/markup contract is documented at the top of clean-shell.css.
 */
(() => {
  "use strict";
  const shell = document.querySelector(".dc-shell");
  if (!shell) return;

  const $ = (selector) => shell.querySelector(selector);
  const $$ = (selector) => [...shell.querySelectorAll(selector)];
  const svgNamespace = "http://www.w3.org/2000/svg";
  // Original, static line geometry. Never insert user-supplied markup into this registry.
  const icons = Object.freeze({
    atelier: '<path d="m5 18 7-13 7 13M8 13h8M9 18h6"/>',
    layers: '<rect x="4" y="4" width="12" height="12" rx="2"/><path d="M8 20h10a2 2 0 0 0 2-2V8"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    archive: '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M10 12h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    settings: '<path d="M5 4v6m0 4v6M12 4v10m0 4v2M19 4v2m0 4v10M2 10h6m1 4h6m1-8h6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    sidebar: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M5.5 8h1"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    list: '<path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    document: '<path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8M8 16h6"/>',
  });

  function paintIcon(svg, name) {
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.innerHTML = icons[name] || icons.layers;
    return svg;
  }
  function icon(name) {
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.classList.add("dc-icon");
    return paintIcon(svg, name);
  }
  $$("[data-dc-icon]").forEach((svg) => paintIcon(svg, svg.dataset.dcIcon));

  const storageKey = "design-complete.clean-shell.preferences.v1";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const mobile = window.matchMedia("(max-width: 759px)");
  const preferences = { theme: "system", ambient: false, view: "grid", collapsed: false };
  let storageAvailable = true;
  function reportStorageFailure() {
    storageAvailable = false;
    const message = "Storage is unavailable. Preferences will last only for this session.";
    $("#dc-storage-status").textContent = message;
    $("#dc-status").textContent = message;
  }
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "null");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      if (["light", "dark", "system"].includes(saved.theme)) preferences.theme = saved.theme;
      if (typeof saved.ambient === "boolean") preferences.ambient = saved.ambient;
      if (["grid", "list"].includes(saved.view)) preferences.view = saved.view;
      if (typeof saved.collapsed === "boolean") preferences.collapsed = saved.collapsed;
    }
  } catch {
    reportStorageFailure();
  }
  function savePreferences() {
    if (!storageAvailable) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {
      reportStorageFailure();
    }
  }
  function applyPreferences() {
    shell.dataset.dcTheme = preferences.theme === "system" ? (systemTheme.matches ? "dark" : "light") : preferences.theme;
    shell.dataset.dcAmbient = String(preferences.ambient);
    shell.dataset.dcCollapsed = String(preferences.collapsed);
    $("#dc-collections").dataset.dcView = preferences.view;
    $$("[data-dc-view-button]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.dcViewButton === preferences.view)));
    $$("input[name='dc-theme']").forEach((input) => { input.checked = input.value === preferences.theme; });
    $("#dc-ambient").checked = preferences.ambient;
    const label = preferences.collapsed ? "Expand sidebar" : "Collapse sidebar";
    $(".dc-sidebar-toggle").setAttribute("aria-label", label);
    $(".dc-sidebar-toggle").setAttribute("title", label);
    $(".dc-sidebar-toggle").setAttribute("aria-expanded", String(!preferences.collapsed));
  }
  systemTheme.addEventListener("change", applyPreferences);
  applyPreferences();

  const categories = ["Design", "Research", "Product"];
  const collections = [
    { id: 1, name: "Ways of seeing", description: "Composition, color and small details that make a difference.", category: "Design", favorite: true, archived: false, color: "paper", art: "frames", created: 7, references: ["Composition study", "Notes on contrast", "A palette to explore"] },
    { id: 2, name: "Calm interfaces", description: "Ideas to make everyday life a little simpler.", category: "Design", favorite: false, archived: false, color: "blue", art: "grid", created: 6, references: ["Essential navigation", "States and feedback", "Rhythm between elements"] },
    { id: 3, name: "Conversations and discoveries", description: "Questions, observations and research findings.", category: "Research", favorite: true, archived: false, color: "green", art: "circles", created: 5, references: ["Interview guide", "Journey observations", "Open questions"] },
    { id: 4, name: "Everyday objects", description: "Material, texture and the beauty of thoughtful objects.", category: "Design", favorite: false, archived: false, color: "rose", art: "arch", created: 4, references: ["Material notebook", "Form and function", "Small gestures"] },
    { id: 5, name: "Next steps", description: "Hypotheses and possibilities for what comes next.", category: "Product", favorite: false, archived: false, color: "lilac", art: "square", created: 3, references: ["Opportunity map", "Initial hypotheses", "Experiment criteria"] },
    { id: 6, name: "Reading notes", description: "Excerpts and reflections to revisit when you have more time.", category: "Research", favorite: false, archived: false, color: "paper", art: "lines", created: 2, references: ["Weekly notes", "An idea to revisit", "Connections between topics"] },
    { id: 7, name: "Early drafts", description: "A completed cycle, saved for reference.", category: "Product", favorite: false, archived: true, color: "blue", art: "frames", created: 1, references: ["Starting point", "Lessons from the cycle"] },
  ];
  let nextId = 8;
  let currentFilter = "all";
  let currentDetail = null;
  const dialogOpeners = new WeakMap();
  const filterLabels = { all: "Collections", favorites: "Favorites", archived: "Archived", Design: "Design", Research: "Research", Product: "Product" };
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("en-US");
  const announce = (message) => { $("#dc-status").textContent = message; };

  function matchesFilter(item) {
    if (currentFilter === "archived") return item.archived;
    if (item.archived) return false;
    if (currentFilter === "favorites") return item.favorite;
    return currentFilter === "all" || item.category === currentFilter;
  }
  function updateCounts() {
    const active = collections.filter((item) => !item.archived);
    const counts = { all: active.length, favorites: active.filter((item) => item.favorite).length, archived: collections.filter((item) => item.archived).length };
    categories.forEach((category) => { counts[category] = active.filter((item) => item.category === category).length; });
    $$("[data-dc-count]").forEach((element) => { element.textContent = String(counts[element.dataset.dcCount]); });
  }
  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }
  function renderCard(item) {
    const article = document.createElement("article");
    article.className = "dc-card";
    const open = document.createElement("button");
    open.type = "button";
    open.className = "dc-card-open";
    open.dataset.dcOpen = String(item.id);
    open.setAttribute("aria-label", `Open collection ${item.name}`);
    const cover = document.createElement("span");
    cover.className = `dc-cover dc-cover--${item.color}`;
    cover.setAttribute("aria-hidden", "true");
    const artwork = document.createElement("span");
    artwork.className = `dc-cover-art dc-cover-art--${item.art}`;
    cover.append(artwork);
    const body = document.createElement("span");
    body.className = "dc-card-body";
    body.append(textElement("span", "dc-card-title", item.name), textElement("span", "dc-card-description", item.description || "A new space for your references."));
    open.append(cover, body);
    open.addEventListener("click", () => showDetail(item.id, open));
    const footer = document.createElement("div");
    footer.className = "dc-card-footer";
    footer.append(textElement("span", "dc-card-meta", `${item.references.length} references - ${item.category}`));
    const favorite = document.createElement("button");
    favorite.type = "button";
    favorite.className = "dc-icon-button dc-favorite";
    favorite.dataset.dcFavorite = String(item.id);
    favorite.setAttribute("aria-label", `Favorite ${item.name}`);
    favorite.setAttribute("title", item.favorite ? "Remove from favorites" : "Add to favorites");
    favorite.setAttribute("aria-pressed", String(item.favorite));
    favorite.append(icon("star"));
    favorite.addEventListener("click", () => {
      item.favorite = !item.favorite;
      renderCollections();
      const replacement = $(`[data-dc-favorite="${item.id}"]`);
      (replacement || $("#dc-search")).focus({ preventScroll: true });
      announce(`${item.name}: ${item.favorite ? "added to favorites" : "removed from favorites"}. This change lasts only for this session.`);
    });
    footer.append(favorite);
    article.append(open, footer);
    return article;
  }
  function renderCollections() {
    const query = normalize($("#dc-search").value.trim());
    const visible = collections.filter((item) => matchesFilter(item) && (!query || normalize(`${item.name} ${item.description} ${item.category}`).includes(query)));
    visible.sort($("#dc-sort").value === "name" ? (a, b) => a.name.localeCompare(b.name, "en-US") : (a, b) => b.created - a.created);
    $("#dc-collections").replaceChildren(...visible.map(renderCard));
    $("#dc-empty").hidden = visible.length > 0;
    $("#dc-result-count").textContent = `${visible.length} ${visible.length === 1 ? "collection" : "collections"}${query ? (visible.length === 1 ? " found" : " found") : ""}`;
    $("#dc-empty-copy").textContent = query ? "No collections match your search within this filter. Try another term or clear the search and filters." : "This filter has no collections yet. Create one or return to all collections.";
    $("#dc-filter-hint").textContent = currentFilter === "all" && !query ? "Your reference library, taking shape." : "";
    $("#dc-page-title").textContent = filterLabels[currentFilter];
    $("#dc-breadcrumb-label").textContent = filterLabels[currentFilter];
    $("#dc-page-description").textContent = currentFilter === "archived" ? "References saved to revisit when you need them." : currentFilter === "favorites" ? "Ideas you want to keep close." : "A place to organize what inspires your work.";
    $$("[data-dc-filter]").forEach((button) => {
      if (button.dataset.dcFilter === currentFilter) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    updateCounts();
  }

  function openDialog(dialog, opener) {
    dialogOpeners.set(dialog, opener || document.activeElement);
    dialog.showModal();
  }
  $$("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      const opener = dialogOpeners.get(dialog);
      if (opener instanceof HTMLElement && opener.isConnected && opener.getClientRects().length) {
        opener.focus({ preventScroll: true });
      } else {
        const replacement = currentDetail ? $(`[data-dc-open="${currentDetail}"]`) : null;
        (replacement || $("#dc-search")).focus({ preventScroll: true });
      }
    });
    dialog.querySelectorAll("[data-dc-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  });
  function showDetail(id, opener) {
    currentDetail = id;
    renderDetail();
    openDialog($("#dc-detail-dialog"), opener);
  }
  function renderDetail() {
    const item = collections.find((entry) => entry.id === currentDetail);
    if (!item) return;
    $("#dc-detail-title").textContent = item.name;
    $("#dc-detail-meta").textContent = `${item.category} - ${item.references.length} references${item.archived ? " - Archived" : ""}`;
    $("#dc-detail-description").textContent = item.description || "Your collection is ready for ideas.";
    $("#dc-detail-list").replaceChildren(...item.references.map((reference) => {
      const li = document.createElement("li");
      li.append(icon("document"), textElement("span", "", reference));
      return li;
    }));
    $("#dc-detail-note").textContent = item.references.length ? "Synthetic references with no attached documents or links. Favoriting and archiving affect only this session." : "Collection created in this session. Adding references is not part of this demo.";
    $("#dc-detail-favorite").textContent = "Favorite";
    $("#dc-detail-favorite").setAttribute("aria-pressed", String(item.favorite));
    $("#dc-detail-archive").textContent = item.archived ? "Restore collection" : "Archive";
  }
  $("#dc-detail-favorite").addEventListener("click", () => {
    const item = collections.find((entry) => entry.id === currentDetail);
    if (!item) return;
    item.favorite = !item.favorite;
    renderDetail();
    renderCollections();
    announce(`${item.name}: ${item.favorite ? "added to favorites" : "removed from favorites"}.`);
  });
  $("#dc-detail-archive").addEventListener("click", () => {
    const item = collections.find((entry) => entry.id === currentDetail);
    if (!item) return;
    item.archived = !item.archived;
    renderDetail();
    renderCollections();
    announce(`${item.name}: ${item.archived ? "archived" : "restored"}. This change lasts only for this session.`);
  });

  function setMobileNavigation(open, restoreFocus = false) {
    shell.dataset.dcNavOpen = String(open);
    const button = $(".dc-mobile-toggle");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    button.setAttribute("title", open ? "Close navigation" : "Open navigation");
    paintIcon(button.querySelector("svg"), open ? "close" : "menu");
    if (restoreFocus) button.focus({ preventScroll: true });
  }
  $$("[data-dc-filter]").forEach((button) => button.addEventListener("click", () => {
    currentFilter = button.dataset.dcFilter;
    renderCollections();
    if (mobile.matches) setMobileNavigation(false, true);
  }));
  $$("[data-dc-action='add']").forEach((button) => button.addEventListener("click", () => {
    $("#dc-add-form").reset();
    $("#dc-form-error").hidden = true;
    $("#dc-name").setCustomValidity("");
    if (categories.includes(currentFilter)) $("#dc-add-form").elements.category.value = currentFilter;
    openDialog($("#dc-add-dialog"), button);
  }));
  $$("[data-dc-action='settings']").forEach((button) => button.addEventListener("click", () => openDialog($("#dc-settings-dialog"), button)));
  $("#dc-name").addEventListener("input", () => {
    $("#dc-name").setCustomValidity("");
    $("#dc-form-error").hidden = true;
  });
  $("#dc-add-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    if (!name) {
      $("#dc-form-error").textContent = "Enter a collection name.";
      $("#dc-form-error").hidden = false;
      $("#dc-name").setCustomValidity("Enter a collection name.");
      $("#dc-name").reportValidity();
      return;
    }
    const category = categories.includes(form.elements.category.value) ? form.elements.category.value : "Design";
    collections.push({ id: nextId, name, description: form.elements.description.value.trim(), category, favorite: false, archived: false, color: { Design: "blue", Research: "green", Product: "lilac" }[category], art: "frames", created: nextId, references: [] });
    nextId += 1;
    currentFilter = "all";
    $("#dc-search").value = "";
    $("#dc-sort").value = "recent";
    renderCollections();
    $("#dc-add-dialog").close();
    announce(`Collection \"${name}\" created for this session only.`);
  });
  $("#dc-search").addEventListener("input", renderCollections);
  $("#dc-sort").addEventListener("change", renderCollections);
  $("#dc-reset-search").addEventListener("click", () => {
    currentFilter = "all";
    $("#dc-search").value = "";
    renderCollections();
    $("#dc-search").focus();
  });
  $$("[data-dc-view-button]").forEach((button) => button.addEventListener("click", () => {
    preferences.view = button.dataset.dcViewButton;
    applyPreferences();
    savePreferences();
  }));
  $$("input[name='dc-theme']").forEach((input) => input.addEventListener("change", () => {
    preferences.theme = input.value;
    applyPreferences();
    savePreferences();
  }));
  $("#dc-ambient").addEventListener("change", (event) => {
    preferences.ambient = event.currentTarget.checked;
    applyPreferences();
    savePreferences();
  });
  $(".dc-sidebar-toggle").addEventListener("click", () => {
    preferences.collapsed = !preferences.collapsed;
    applyPreferences();
    savePreferences();
  });
  $(".dc-mobile-toggle").addEventListener("click", () => setMobileNavigation(shell.dataset.dcNavOpen !== "true"));
  mobile.addEventListener("change", () => {
    const active = document.activeElement;
    const wasInNavigation = $(".dc-sidebar").contains(active);
    setMobileNavigation(false, mobile.matches && wasInNavigation);
    if (!mobile.matches && active === $(".dc-mobile-toggle")) $(".dc-sidebar-toggle").focus();
  });

  $("#dc-shortcut").textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? "\u2318 K" : "Ctrl K";
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobile.matches && shell.dataset.dcNavOpen === "true" && !$("dialog[open]")) {
      setMobileNavigation(false, true);
      return;
    }
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== "k" || event.defaultPrevented || event.isComposing || $("dialog[open]")) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']"))) return;
    // Scope the shortcut to this shell (or document body), so embedding is non-invasive.
    if (target instanceof Node && target !== document.body && !shell.contains(target)) return;
    event.preventDefault();
    $("#dc-search").focus();
  });
  renderCollections();
})();
