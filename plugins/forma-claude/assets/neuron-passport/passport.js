import { createPassportMotion, PASSPORT_GEOMETRY } from './passport-motion.js?v=3.23.0';
import { passportCountries, levels } from './data.js?v=3.15.2';
import { passportCoverCatalog } from './passport-catalog.js?v=3.12';

const countryCodes = new Set(passportCountries.map(c => c.code));
const skinColors = { red: '#672b39', green: '#204c3b', blue: '#192742', black: '#292c2c', original: '#26454b' };
const countryByCode = new Map(passportCountries.map(c => [c.code, c]));
const normalizeText = text => String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
const pageNames = ['Capa', 'Meus dados', 'Meu inglês'];
let passportInstanceSequence = 0;
const cornerHandles = (turn, destination, label, mobile = false) => ['top', 'bottom'].map(corner => `<button type="button" class="np-corner np-corner-${corner}${mobile ? ' np-mobile-back' : ''}" data-np-corner="${corner}" data-np-turn="${turn}" data-np-destination="${destination}" aria-label="${label} pelo canto ${corner === 'top' ? 'superior' : 'inferior'}" title="Puxe para virar"><span aria-hidden="true"></span></button>`).join('');
const iconGlobe = `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="42"/><ellipse cx="50" cy="50" rx="21" ry="42"/><path d="M8 50h84M14 29c20 12 52 12 72 0M14 71c20-12 52-12 72 0M50 8v84"/></svg>`;

export function normalizePassport(value = {}, legacyCountry = '') {
  const source = value && typeof value === 'object' ? value : {};
  const country = Object.hasOwn(source, 'country') ? source.country : legacyCountry;
  return {
    country: countryCodes.has(country) ? country : '',
    nativeLanguage: typeof source.nativeLanguage === 'string' ? source.nativeLanguage.trim().slice(0, 60) : 'Português',
    bio: typeof source.bio === 'string' ? source.bio.trim().slice(0, 180) : '',
    photo: typeof source.photo === 'string' && source.photo.length <= 700000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(source.photo) ? source.photo : '',
  };
}

function passportSkin(code) {
  const country = countryByCode.get(code);
  const source = passportCoverCatalog[code];
  return { code: country?.code || '', name: country?.name || 'Original Neuron', flag: country?.flag || '', color: source?.color || 'original', ...source };
}

function learnerInitials(name) {
  const words = String(name).trim().split(/\s+/u).filter(Boolean);
  return words.length ? [words[0], ...(words.length > 1 ? [words.at(-1)] : [])].map(w => Array.from(w)[0]).join('').toLocaleUpperCase('pt-BR') : 'N';
}

export async function preparePassportPhoto(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Escolha uma foto JPG, PNG ou WebP.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Escolha uma imagem de até 8 MB.');
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    if (!img.naturalWidth || !img.naturalHeight) throw new Error('Não foi possível abrir essa imagem.');
    const canvas = document.createElement('canvas');
    canvas.width = 320; canvas.height = 400;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Não foi possível preparar a foto neste navegador.');
    const ratio = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const width = img.naturalWidth * ratio, height = img.naturalHeight * ratio;
    context.drawImage(img, (320 - width) / 2, (400 - height) / 2, width, height);
    return canvas.toDataURL('image/jpeg', .86);
  } finally { URL.revokeObjectURL(url); }
}

/** A profile book with articulated DOM leaves. All personal text stays selectable. */
export function renderPassportProfile(host, ctx) {
  const e = ctx.escape;
  const abort = new AbortController();
  const listen = (node, event, fn, options = {}) => node.addEventListener(event, fn, { ...options, signal: abort.signal });
  let page = 0, selectedSkin = ctx.state.passport.country;
  let query = '', colorFilter = 'all', visibleCount = 24;
  let photoDraft = '', photoVersion = 0, photoPending = false;
  let disposed = false, motion = null, paintedCountry = null;

  host.innerHTML = `<section class="np-profile p-page${ctx.embedded ? ' np-profile-embedded' : ''}" aria-labelledby="np-title">
    <header class="np-heading"><div><span class="eyebrow">SEU CAMINHO, EM PÁGINAS</span><h${ctx.embedded ? '2' : '1'} id="np-title">Meu passaporte</h${ctx.embedded ? '2' : '1'}><p>Uma capa que é sua. Um mundo para descobrir.</p></div>
      <div class="np-header-actions"><button class="button secondary" data-np-edit>${ctx.icon('user', 17)} Editar perfil</button><button class="button secondary" data-np-skins>${ctx.icon('palette', 17)} Trocar capa</button></div>
    </header>
    <div class="np-experience" data-np-page="0" data-np-interaction="direct">
      <div class="np-stage" role="group" aria-label="Passaporte interativo" tabindex="0" aria-describedby="np-instructions">
        <div class="np-ground" aria-hidden="true"></div>
        <div class="np-book" data-np-book>
          <div class="np-back-cover" aria-hidden="true"><div class="np-back-exterior"><span class="np-back-mark">neuron.<small>UN MONDE À DÉCOUVRIR</small></span><span class="np-cover-grain"></span><span class="np-cover-light"></span></div><div class="np-back-lining"></div><div class="np-cover-rim"></div></div>
          <div class="np-page-block" aria-hidden="true">${Array.from({length:16},(_,i)=>`<i class="np-paper-edge" style="--sheet:${i}"></i>`).join('')}<div class="np-paper-rim"></div></div>
          <div class="np-binding" aria-hidden="true">${Array.from({length:PASSPORT_GEOMETRY.spineSegments},()=>'<i class="np-spine-face"></i><i class="np-spine-inner-face"></i>').join('')}<div class="np-spine-terminal np-terminal-top" data-np-spine-end="top"></div><div class="np-spine-terminal np-terminal-bottom" data-np-spine-end="bottom"></div></div>
          <div class="np-cover-joint" aria-hidden="true">${Array.from({length:12},()=>'<i class="np-joint-strip"></i>').join('')}</div>
          <div class="np-base-joint" aria-hidden="true">${Array.from({length:12},()=>'<i class="np-joint-strip"></i>').join('')}</div>
          <div class="np-leaf-joint" aria-hidden="true">${Array.from({length:12},()=>'<i class="np-joint-strip"></i>').join('')}</div>
          <div class="np-base np-paper" data-np-panel="2" aria-hidden="true" inert>
            <div class="np-page-kicker"><span>neuron.</span><span class="np-page-category">Idiomas</span></div>
            <div class="np-language-title"><div><h2>Inglês</h2><span lang="en">English</span></div><span class="np-language-seal" aria-hidden="true">EN</span></div>
            <div class="np-level-row"><span>Nível</span><div class="np-english-level" data-np-english-level></div></div>
            <div class="np-route-engraving" aria-hidden="true"><svg viewBox="0 0 220 42" fill="none"><path d="M8 29C38 29 34 9 65 12S106 38 139 26 174 7 210 12" stroke-dasharray="2 4"/><circle cx="8" cy="29" r="3"/><circle cx="210" cy="12" r="3"/><path d="m116 13 4-7 4 7-4-2-4 2Zm4-7v13M39 28l8-3-2 8m-6-5 6 5"/></svg></div>
            <dl class="np-language-data"><div><dt>Meu objetivo</dt><dd data-np-english-goal></dd></div></dl>
            <div class="np-page-bottom"><a href="#hoje" class="np-study-link"><span>Continuar aprendendo</span><span class="np-study-arrow" aria-hidden="true">${ctx.icon('arrow-right', 13)}</span></a><span>03</span></div>${cornerHandles('leaf',1,'Voltar aos meus dados',true)}
          </div>
          <div class="np-leaf np-data-leaf">
            <div class="np-face np-front np-paper" data-np-panel="1" aria-hidden="true" inert>
              <div class="np-page-kicker"><span>neuron.</span><span class="np-page-category">Perfil</span></div>
              <div class="np-identity-top"><div class="np-photo" data-np-photo></div><div class="np-name-block"><h2 data-np-name dir="auto"></h2></div></div>
              <dl class="np-person-data"><div><dt>Idioma nativo</dt><dd data-np-native dir="auto"></dd></div><div><dt>Aprendendo</dt><dd>Inglês</dd></div></dl>
              <div class="np-identity-engraving" aria-hidden="true"><svg viewBox="0 0 220 40" fill="none"><path d="M8 29h32m7 0h6m6 0c18 0 19-20 40-20s25 20 45 20h29" stroke-dasharray="2 4"/><path d="m187 31 14-24m-9 16c-9 1-13-3-13-8 8-1 13 2 13 8Zm4-8c-6-3-6-8-3-12 7 3 7 7 3 12Zm-4 9c8 2 14-2 15-7-8-2-13 1-15 7Zm-7 9c9 2 15-1 17-6-8-3-14 0-17 6Z"/><circle cx="8" cy="29" r="3"/></svg></div>
              <div class="np-page-bottom"><span>01</span></div>${cornerHandles('leaf',2,'Virar para o inglês')}${cornerHandles('cover',0,'Fechar capa',true)}
            </div>
            <div class="np-face np-back np-paper np-language-art" data-np-panel="2" aria-hidden="true" inert>
              <div class="np-page-kicker">neuron.</div>
              <p class="np-hello" lang="en">Hello,<br><em>world.</em></p>
              <div class="np-globe-art" aria-hidden="true"><svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="49"/><circle cx="60" cy="60" r="44"/><ellipse cx="60" cy="60" rx="23" ry="44"/><path d="M16 60h88M22 39c23 13 53 13 76 0M22 81c23-13 53-13 76 0M60 16v88"/><path d="m36 26 13 6 3 9-9 5-2 10-8-2-6-12 2-9Zm12 35 10 4 4 10-6 6-2 14-7-9-5-15Zm21-32 13 2 10 12-12 4-5 10-10-4 3-11-4-5Zm10 39 12 5 3 11-12 3-5-9Z" fill="currentColor" fill-opacity=".12"/><path d="M25 85C34 61 59 47 91 37" stroke-dasharray="2 4"/><circle cx="25" cy="85" r="2.5" fill="currentColor"/><circle cx="91" cy="37" r="2.5" fill="currentColor"/></svg></div>
              <div class="np-language-imprint"><span class="np-language-seal">EN</span><span>Em aprendizado</span></div>
              <div class="np-page-bottom"><span>02</span></div>${cornerHandles('leaf',1,'Voltar aos meus dados')}
            </div>
          </div>
          <div class="np-leaf np-cover-leaf"><div class="np-cover-rim" aria-hidden="true"></div>
            <div class="np-face np-front np-cover-front" data-np-panel="0">
              <div class="np-cover-fallback"><span class="np-cover-country" data-np-cover-country></span><div class="np-cover-symbol">${iconGlobe}</div><span class="np-cover-title">PASSAPORTE<small>NEURON · IDIOMAS</small></span><svg class="np-cover-chip" viewBox="0 0 30 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="28" height="16" rx="1"/><circle cx="15" cy="9" r="5"/><path d="M1 9h9m10 0h9"/></svg></div>
              <img class="np-country-cover" data-np-cover-image alt="" hidden referrerpolicy="no-referrer">
              <span class="np-cover-grain" aria-hidden="true"></span><span class="np-cover-light" aria-hidden="true"></span><span class="np-cover-ridge" aria-hidden="true"></span>
              <button class="np-cover-open" data-np-open aria-label="Abrir passaporte"></button>${cornerHandles('cover',1,'Abrir capa')}
            </div>
            <div class="np-face np-back np-paper np-endpaper" data-np-panel="1" aria-hidden="true" inert>
              <span class="np-endpaper-brand">neuron.</span>
              <div class="np-compass" aria-hidden="true"><svg viewBox="0 0 140 140" fill="none"><circle cx="70" cy="70" r="53"/><circle cx="70" cy="70" r="46" stroke-dasharray="1 4"/><circle cx="70" cy="70" r="35"/><path d="M70 18v6m0 92v16M8 70h13m98 0h13M26 26l9 9m70 70 9 9M26 114l9-9m70-70 9-9"/><path d="m70 25 9 36 36 9-36 9-9 36-9-36-36-9 36-9Z"/><path d="m70 25 9 36-9 9Zm45 45-36 9-9-9Zm-45 45-9-36 9-9ZM25 70l36-9 9 9Z" fill="currentColor" fill-opacity=".18"/><circle cx="70" cy="70" r="5"/><path d="M67 13V7l6 6V7"/></svg></div>
              <p>Toda língua<br>abre uma <em>porta.</em></p><div class="np-endpaper-flourish" aria-hidden="true"><svg viewBox="0 0 120 18" fill="none"><path d="M5 9h40m30 0h40m-55-6 6 6-6 6-6-6 6-6Z"/></svg></div>${cornerHandles('cover',0,'Fechar capa')}
            </div>
          </div>
        </div>
      </div>
      <div class="np-object-controls" aria-label="Manipular passaporte">
        <div class="np-manipulation-modes" role="group" aria-label="Modo de interação">
          <button type="button" data-np-mode="read" aria-pressed="true">${ctx.icon('book',16)} Ler</button>
          <button type="button" data-np-mode="rotate" aria-pressed="false">${ctx.icon('rotate-3d',16)} Girar</button>
          <button type="button" data-np-mode="move" aria-pressed="false">${ctx.icon('move',16)} Mover</button>
        </div>
        <span class="np-control-divider" aria-hidden="true"></span>
        <div class="np-zoom-controls" role="group" aria-label="Aproximação">
          <button type="button" data-np-zoom="out" aria-label="Afastar passaporte">${ctx.icon('minus',16)}</button><output data-np-zoom-output>100%</output><button type="button" data-np-zoom="in" aria-label="Aproximar passaporte">${ctx.icon('plus',16)}</button>
        </div>
        <button type="button" class="np-reset-view" data-np-reset-view aria-label="Centralizar e restaurar posição" title="Centralizar e restaurar posição">${ctx.icon('refresh',16)}</button>
        <div class="np-view-presets" role="group" aria-label="Ângulos do passaporte" hidden><button data-np-pose="front">Frente</button><button data-np-pose="spine">Lombada</button><button data-np-pose="edge">Folhas</button><button data-np-pose="back">Verso</button></div>
      </div>
      <p class="np-gesture-help" id="np-gesture-help" data-np-gesture-help></p><p class="sr-only" data-np-view-status role="status"></p>
      <div class="np-book-controls">
        <button class="np-arrow" data-np-prev aria-label="Página anterior" disabled>${ctx.icon('arrow-left',18)}</button>
        <div class="np-page-tabs" role="group" aria-label="Páginas do passaporte">${pageNames.map((name,i)=>`<button type="button" data-np-go="${i}"${i===0?' aria-current="step"':''}>${name}</button>`).join('')}</div>
        <button class="np-arrow" data-np-next aria-label="Abrir passaporte">${ctx.icon('arrow-right',18)}</button>
      </div>
      <p class="np-instructions" id="np-instructions" data-np-instructions>Arraste um canto da capa para abrir, ou use a seta.</p>
      <p class="sr-only" data-np-announcement role="status" aria-live="polite"></p>
      <div class="np-skin-credit"><span class="np-skin-dot" aria-hidden="true"></span><span data-np-credit></span><span class="np-image-status" data-np-image-status role="status"></span></div>
    </div>
  </section>
  <dialog class="np-dialog np-skin-dialog" aria-labelledby="np-skin-title">
    <header class="np-dialog-heading"><div><span class="eyebrow">DO SEU JEITO</span><h2 id="np-skin-title">Escolha a sua capa</h2><p>Um passaporte como skin. A identidade por dentro é sua.</p></div><button class="icon-button" data-np-close aria-label="Fechar seletor de capas">${ctx.icon('x',20)}</button></header>
    <div class="np-skin-toolbar"><label class="np-skin-search">${ctx.icon('search',18)}<input type="search" placeholder="Buscar país" aria-label="Buscar país" data-np-search></label><div class="np-color-filters" role="group" aria-label="Filtrar capas por cor">${[['all','Todas'],['red','Vermelho'],['green','Verde'],['blue','Azul'],['black','Preto']].map(([key,label])=>`<button data-np-color="${key}" aria-pressed="${key==='all'}">${key==='all'?'':`<i style="--swatch:${skinColors[key]}" aria-hidden="true"></i>`}${label}</button>`).join('')}</div></div>
    <div class="np-skin-scroll"><div class="np-skin-grid" data-np-grid></div><button class="button quiet np-more" data-np-more>Mostrar mais capas</button><p class="np-gallery-count" data-np-count role="status"></p></div>
    <footer class="np-dialog-footer"><div><strong data-np-selected></strong><small data-np-selected-credit></small><p class="p-field-error" data-np-skin-error role="alert"></p></div><button class="button primary" data-np-apply-skin>Usar esta capa</button></footer>
  </dialog>
  <dialog class="np-dialog np-editor-dialog" aria-labelledby="np-editor-title">
    <form data-np-edit-form novalidate><header class="np-dialog-heading"><div><span class="eyebrow">SEUS DADOS</span><h2 id="np-editor-title">Por dentro do passaporte</h2><p>Seu perfil e seu momento no inglês.</p></div><button class="icon-button" type="button" data-np-editor-close aria-label="Fechar editor de perfil">${ctx.icon('x',20)}</button></header>
    <div class="np-editor-body"><div class="np-photo-editor"><div class="np-photo" data-np-photo-draft></div><div><label class="button secondary" for="np-photo-input">Escolher foto<input type="file" id="np-photo-input" name="photo" accept="image/jpeg,image/png,image/webp" class="sr-only"></label><button type="button" class="np-remove-photo" data-np-remove-photo>Remover foto</button><p class="p-help">Opcional · fica só neste navegador.</p></div></div>
      <div class="p-field"><label for="np-name">Como quer ser chamado?</label><input id="np-name" name="name" maxlength="100" autocomplete="nickname" placeholder="Seu nome ou apelido"></div>
      <div class="p-field"><label for="np-native">Idioma nativo</label><input id="np-native" name="nativeLanguage" maxlength="60" placeholder="Ex.: Português"></div>
      <div class="p-field"><label for="np-bio">Sobre você <span class="muted">· opcional</span></label><textarea id="np-bio" name="bio" maxlength="180" rows="2" placeholder="O que desperta sua curiosidade?"></textarea></div>
      <div class="np-editor-divider"><span>Seu inglês</span><small>Um ponto de partida, sem pressão.</small></div>
      <div class="p-field"><label for="np-goal">O que você quer conseguir?</label><textarea id="np-goal" name="goal" maxlength="280" rows="2" required aria-describedby="np-form-error"></textarea></div>
      <div class="p-field"><label for="np-level">Como você se percebe hoje?</label><select id="np-level" name="level">${Object.entries(levels).map(([code,label])=>`<option value="${code}">${e(label)}</option>`).join('')}</select></div>
      <p class="p-field-error" id="np-form-error" data-np-form-error role="alert"></p>
    </div><footer class="np-dialog-footer"><p class="p-help">Salvo neste navegador ao confirmar.</p><div class="np-editor-actions"><button type="button" class="button secondary" data-np-editor-cancel>Cancelar</button><button type="submit" class="button primary" data-np-save-profile>Salvar perfil</button></div></footer></form>
  </dialog>`;

  if (ctx.embedded) {
    // The full passport can remain mounted behind the settings dialog.
    const prefix = `np-embedded-${++passportInstanceSequence}-`;
    const ids = new Map();
    for (const node of host.querySelectorAll('[id]')) {
      const previous = node.id;
      node.id = `${prefix}${previous}`;
      ids.set(previous, node.id);
    }
    const references = ['for', 'form', 'aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'aria-activedescendant', 'aria-details', 'aria-errormessage'];
    for (const node of host.querySelectorAll(references.map(attribute => `[${attribute}]`).join(','))) {
      for (const attribute of references) {
        const value = node.getAttribute(attribute);
        if (value) node.setAttribute(attribute, value.split(/\s+/u).map(id => ids.get(id) || id).join(' '));
      }
    }
  }

  const root = host.querySelector('.np-experience');
  const stage = host.querySelector('.np-stage');
  const book = host.querySelector('[data-np-book]');
  const skinsDialog = host.querySelector('.np-skin-dialog');
  const editorDialog = host.querySelector('.np-editor-dialog');
  const coverImg = host.querySelector('[data-np-cover-image]');
  const form = host.querySelector('[data-np-edit-form]');
  const error = host.querySelector('[data-np-form-error]');
  const fields = form.elements;
  const englishProfile = () => ctx.state.profiles?.en || ctx.state.profile;

  function paintPhoto(node, photo, name) {
    node.replaceChildren();
    if (photo) { const img=document.createElement('img'); img.src=photo; img.alt='Sua foto de perfil'; node.append(img); }
    else { const span=document.createElement('span'); span.textContent=learnerInitials(name); node.append(span); }
  }

  function updateIdentityPages() {
    if (disposed) return;
    const identity = ctx.state.passport;
    const name = ctx.state.profile.name || 'Seu nome aqui';
    const nameNode = host.querySelector('[data-np-name]');
    nameNode.textContent=name; nameNode.title=name;
    nameNode.dataset.npNameLength=name.length>45?'long':name.length>25?'medium':'short';
    const nativeNode = host.querySelector('[data-np-native]');
    nativeNode.textContent=identity.nativeLanguage || 'Não informado'; nativeNode.title=nativeNode.textContent;
    const goalNode = host.querySelector('[data-np-english-goal]');
    goalNode.textContent=englishProfile().goal || ''; goalNode.title=goalNode.textContent;
    host.querySelector('[data-np-english-level]').textContent=levels[englishProfile().level] || levels.zero;
    paintPhoto(host.querySelector('[data-np-photo]'), identity.photo, ctx.state.profile.name);
    motion?.refresh();
  }
  listen(document, 'neuron:profile-saved', () => { updateIdentityPages(); updateCover(); });

  function updateCover() {
    const skin=passportSkin(ctx.state.passport.country);
    if (disposed || paintedCountry === skin.code) return;
    paintedCountry = skin.code;
    book.style.setProperty('--cover-color',skinColors[skin.color]);
    root.style.setProperty('--cover-color',skinColors[skin.color]);
    host.querySelector('[data-np-cover-country]').textContent=skin.code ? skin.name.toLocaleUpperCase('pt-BR') : 'NEURON';
    host.querySelector('[data-np-credit]').innerHTML=skin.code ? `${e(skin.flag)} ${e(skin.name)} <span>·</span> ${skin.image?'<a href="https://www.passportindex.org/pt/byColor.php" target="_blank" rel="noopener noreferrer">Passport Index</a>':'Skin Neuron'}` : 'Original Neuron · seu passaporte de estudos';
    const status=host.querySelector('[data-np-image-status]');
    status.textContent='';
    coverImg.hidden=true;
    coverImg.onload=()=>{ if(disposed) return; coverImg.hidden=false; status.textContent=''; };
    coverImg.onerror=()=>{ if(disposed) return; coverImg.hidden=true; status.textContent='Capa online indisponível. Exibindo versão simplificada.'; };
    if(skin.image) coverImg.src=skin.image;
    else coverImg.removeAttribute('src');
  }

  function goPage(next) {
    page=Math.max(0,Math.min(2,next));
    root.dataset.npPage=String(page);
    motion?.goPage(page);
    host.querySelectorAll('[data-np-panel]').forEach(panel=>{
      const active=Number(panel.dataset.npPanel)===page;
      if (!active && panel.contains(document.activeElement)) stage.focus({preventScroll:true});
      panel.inert=!active; panel.setAttribute('aria-hidden',String(!active));
    });
    host.querySelectorAll('[data-np-go]').forEach(button=>{ if(Number(button.dataset.npGo)===page) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current'); });
    host.querySelector('[data-np-prev]').disabled=page===0;
    host.querySelector('[data-np-next]').disabled=page===2;
    host.querySelector('[data-np-next]').setAttribute('aria-label',page===0?'Abrir passaporte':'Próxima página');
    host.querySelector('[data-np-announcement]').textContent=`${pageNames[page]}. Página ${page+1} de 3.`;
    host.querySelector('[data-np-instructions]').textContent=page===0?'Arraste um canto da capa para abrir, ou use a seta.':page===1?'Puxe um canto da folha direita para descobrir seu inglês.':'Puxe um canto à esquerda para voltar, ou use a seta.';
  }

  const allSkins=[passportSkin(''),...passportCountries.map(c=>passportSkin(c.code))];
  const featured=['','BR','IT','PT','US','JP','FR','GB','DE','CA'];
  allSkins.sort((a,b)=>{ const ai=featured.indexOf(a.code),bi=featured.indexOf(b.code); return (ai<0?100:ai)-(bi<0?100:bi) || a.name.localeCompare(b.name,'pt-BR'); });

  function updateSelectedSkin() {
    const skin=passportSkin(selectedSkin);
    host.querySelector('[data-np-selected]').textContent=skin.name;
    host.querySelector('[data-np-selected-credit]').textContent=skin.image ? `Capa: Passport Index${skin.credit?` · ${skin.credit}`:''}` : 'Design original do Neuron';
    host.querySelectorAll('[data-np-skin]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.npSkin===selectedSkin)));
  }

  function renderGallery() {
    const filtered=allSkins.filter(skin=>(colorFilter==='all'||skin.color===colorFilter)&&normalizeText(skin.name).includes(normalizeText(query)));
    const shown=filtered.slice(0,visibleCount);
    const grid=host.querySelector('[data-np-grid]');
    grid.innerHTML=shown.length ? shown.map(skin=>`<button class="np-skin-option" type="button" data-np-skin="${e(skin.code)}" aria-pressed="${skin.code===selectedSkin}" aria-label="Selecionar capa ${e(skin.name)}"><span class="np-mini-book" style="--cover-color:${skinColors[skin.color]}"><span class="np-mini-fallback"><b>${e(skin.name)}</b>${iconGlobe}<small>PASSAPORTE</small></span>${skin.thumbnail?`<img src="${e(skin.thumbnail)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:''}</span><span class="np-skin-name">${e(skin.name)}</span><span class="np-skin-check" aria-hidden="true">✓</span></button>`).join('') : '<p class="np-empty-search">Nenhuma capa encontrada. Tente outro nome ou outra cor.</p>';
    grid.querySelectorAll('img').forEach(img=>listen(img,'error',()=>{img.hidden=true;}));
    host.querySelector('[data-np-more]').hidden=shown.length>=filtered.length;
    host.querySelector('[data-np-count]').textContent=`${shown.length} de ${filtered.length} capas · Imagens dos países carregadas pela internet.`;
    host.querySelectorAll('[data-np-color]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.npColor===colorFilter)));
    updateSelectedSkin();
  }

  function openSkins() {
    if (disposed) return;
    if (skinsDialog.open) { host.querySelector('[data-np-search]').focus(); return; }
    selectedSkin=ctx.state.passport.country; query='';colorFilter='all';visibleCount=24;
    host.querySelector('[data-np-search]').value='';host.querySelector('[data-np-skin-error]').textContent='';
    renderGallery();skinsDialog.showModal();
  }
  listen(host.querySelector('[data-np-skins]'),'click',openSkins);
  listen(host.querySelector('[data-np-close]'),'click',()=>skinsDialog.close());
  listen(skinsDialog,'close',()=>{
    const trigger = ctx.skinTrigger ? ctx.skinTrigger() : host.querySelector('[data-np-skins]');
    (trigger?.isConnected ? trigger : stage).focus({preventScroll:true});
  });
  listen(host.querySelector('[data-np-search]'),'input',event=>{query=event.target.value;visibleCount=24;renderGallery();});
  listen(skinsDialog,'click',event=>{
    const filter=event.target.closest('[data-np-color]');
    const option=event.target.closest('[data-np-skin]');
    if(filter){colorFilter=filter.dataset.npColor;visibleCount=24;renderGallery();}
    if(option){selectedSkin=option.dataset.npSkin;updateSelectedSkin();}
  });
  listen(host.querySelector('[data-np-more]'),'click',()=>{visibleCount+=24;renderGallery();});
  listen(host.querySelector('[data-np-apply-skin]'),'click',()=>{
    if(!ctx.save({passport:normalizePassport({...ctx.state.passport,country:selectedSkin})})) {host.querySelector('[data-np-skin-error]').textContent='Não foi possível salvar. Tente novamente; a escolha continua aqui.';return;}
    updateCover();goPage(0);skinsDialog.close();ctx.toast(ctx.embedded ? 'Capa em prévia. Salve o perfil para confirmar.' : 'Sua capa foi salva.');
  });

  function showPhotoDraft() { paintPhoto(host.querySelector('[data-np-photo-draft]'),photoDraft,fields.namedItem('name').value);host.querySelector('[data-np-remove-photo]').hidden=!photoDraft; }
  function openEditor() {
    const identity=ctx.state.passport;
    fields.namedItem('name').value=ctx.state.profile.name;
    fields.namedItem('nativeLanguage').value=identity.nativeLanguage;
    fields.namedItem('bio').value=identity.bio;
    fields.namedItem('goal').value=englishProfile().goal;
    fields.namedItem('level').value=englishProfile().level;
    fields.namedItem('photo').value='';photoDraft=identity.photo;photoPending=false;photoVersion++;
    error.textContent='';fields.namedItem('goal').removeAttribute('aria-invalid');showPhotoDraft();editorDialog.showModal();
  }
  listen(host.querySelector('[data-np-edit]'),'click',openEditor);
  for(const button of host.querySelectorAll('[data-np-editor-close],[data-np-editor-cancel]')) listen(button,'click',()=>editorDialog.close());
  listen(editorDialog,'close',()=>{photoVersion++;photoPending=false;host.querySelector('[data-np-save-profile]').disabled=false;host.querySelector('[data-np-edit]').focus();});
  listen(fields.namedItem('name'),'input',showPhotoDraft);
  listen(host.querySelector('[data-np-remove-photo]'),'click',()=>{photoVersion++;photoPending=false;photoDraft='';fields.namedItem('photo').value='';host.querySelector('[data-np-save-profile]').disabled=false;showPhotoDraft();});
  listen(fields.namedItem('photo'),'change',async event=>{
    const file=event.target.files?.[0];if(!file)return;
    const version=++photoVersion;photoPending=true;host.querySelector('[data-np-save-profile]').disabled=true;error.textContent='Preparando sua foto…';
    try { const photo=await preparePassportPhoto(file);if(disposed||version!==photoVersion)return;photoDraft=photo;error.textContent='';showPhotoDraft(); }
    catch(cause){if(!disposed&&version===photoVersion)error.textContent=cause.message||'Não foi possível abrir a foto.';}
    finally{if(!disposed&&version===photoVersion){photoPending=false;host.querySelector('[data-np-save-profile]').disabled=false;}}
  });
  listen(fields.namedItem('goal'),'input',()=>{fields.namedItem('goal').removeAttribute('aria-invalid');error.textContent='';});
  listen(form,'submit',event=>{
    event.preventDefault();if(photoPending)return;
    const goal=fields.namedItem('goal').value.trim();
    if(!goal){error.textContent='Escreva um objetivo para o seu inglês.';fields.namedItem('goal').setAttribute('aria-invalid','true');fields.namedItem('goal').focus();return;}
    if(!form.reportValidity())return;
    const profile={...ctx.state.profile,name:fields.namedItem('name').value.trim()};
    const english={...englishProfile(),goal,level:fields.namedItem('level').value};
    const passport=normalizePassport({...ctx.state.passport,nativeLanguage:fields.namedItem('nativeLanguage').value,bio:fields.namedItem('bio').value,photo:photoDraft});
    if(!ctx.save({profile,profiles:{en:english},passport})){error.textContent='Não foi possível salvar. Seus campos continuam aqui para tentar novamente.';return;}
    updateIdentityPages();editorDialog.close();goPage(1);ctx.toast('Perfil salvo no seu passaporte.');
  });

  listen(host.querySelector('[data-np-open]'),'click',()=>{goPage(1);stage.focus({preventScroll:true});});
  listen(host.querySelector('.np-study-link'),'click',event=>{
    event.preventDefault();
    if(ctx.state.language!=='en'&&!ctx.save({language:'en'}))return;
    ctx.navigate('hoje');
  });
  listen(host.querySelector('[data-np-prev]'),'click',()=>goPage(page-1));
  listen(host.querySelector('[data-np-next]'),'click',()=>goPage(page+1));
  for(const button of host.querySelectorAll('[data-np-go]'))listen(button,'click',()=>goPage(Number(button.dataset.npGo)));
  motion=createPassportMotion({host,root,stage,book,onPage:goPage,interaction:ctx.interaction==='modes'?'modes':'direct'});
  updateIdentityPages();updateCover();goPage(0);
  ctx.onReady?.({updateIdentity:updateIdentityPages,updateCover,openSkins,goPage});
  return ()=>{if(disposed)return;disposed=true;photoVersion++;motion.dispose();abort.abort();coverImg.onload=null;coverImg.onerror=null;skinsDialog.close();editorDialog.close();};
}
