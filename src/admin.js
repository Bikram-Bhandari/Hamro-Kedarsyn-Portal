/* हाम्रो केदारस्यूँ — Admin Dashboard v3 */
import { supabase } from './lib/supabase.js';
import { icon } from './icons.js';
import { AdminModule } from './admin/module.js';
import { modules } from './admin/modules.js';

const root = document.getElementById('admin-root');
let currentUser = null;

/* ── helpers ── */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate = d => { if (!d) return '—'; try { return new Date(d).toLocaleDateString('ne-NP',{month:'short',day:'numeric',year:'numeric'}); } catch { return String(d).slice(0,10); } };

/* ══════════════════════════════════════════
   AUTH
══════════════════════════════════════════ */
async function boot() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) { currentUser = session.user; renderApp(); }
  else renderLogin();
}

/* ══════════════════════════════════════════
   LOGIN
══════════════════════════════════════════ */
function renderLogin() {
  document.body.className = 'admin-body';
  root.innerHTML = `
  <div class="al-wrap">
    <!-- left hero -->
    <div class="al-hero">
      <div class="al-hero__inner">
        <div class="al-hero__logo"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></div>
        <h2>हाम्रो केदारस्यूँ<br>प्रशासन प्यानल</h2>
        <p>केदारस्यूँ गाउँपालिकाको वेबसाइटको सम्पूर्ण सामग्री एकै ठाउँबाट व्यवस्थापन गर्नुहोस्।</p>
        <div class="al-feats">
          <div class="al-feat"><span class="al-feat__ic">${icon.mountain}</span>पर्यटन सामग्री व्यवस्थापन</div>
          <div class="al-feat"><span class="al-feat__ic">${icon.camera}</span>फोटो र भिडियो ग्यालरी</div>
          <div class="al-feat"><span class="al-feat__ic">${icon.news}</span>समाचार र कार्यक्रम</div>
          <div class="al-feat"><span class="al-feat__ic">${icon.settings}</span>वेबसाइट सेटिङ</div>
        </div>
      </div>
    </div>
    <!-- right form -->
    <div class="al-form-side">
      <div class="al-card">
        <div class="al-card__brand">
          <span class="logo-sm"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></span>
          <span>हाम्रो केदारस्यूँ</span>
        </div>
        <h2>लगइन गर्नुहोस्</h2>
        <p class="sub">वेबसाइट व्यवस्थापनका लागि लगइन गर्नुहोस्।</p>
        <div class="al-err" id="loginErr"></div>
        <form id="loginForm">
          <div class="af-group"><label>इमेल ठेगाना</label><input type="email" id="loginEmail" required placeholder="Enter your email"></div>
          <div class="af-group"><label>पासवर्ड</label><input type="password" id="loginPass" required placeholder="••••••••"></div>
          <button type="submit" class="btn btn-primary btn-full btn-lg" id="loginBtn" style="margin-top:.5rem">${icon.lock} लगइन गर्नुहोस्</button>
        </form>
      </div>
    </div>
  </div>`;
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const errEl = document.getElementById('loginErr');
    const btn = document.getElementById('loginBtn');
    errEl.classList.remove('show');
    btn.disabled = true;
    btn.innerHTML = `<span style="width:15px;height:15px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;display:inline-block;animation:spin .7s linear infinite"></span> लगइन हुँदै...`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: document.getElementById('loginEmail').value.trim(),
      password: document.getElementById('loginPass').value
    });
    btn.disabled = false;
    btn.innerHTML = `${icon.lock} लगइन गर्नुहोस्`;
    if (error) { errEl.textContent = 'लगइन असफल — इमेल वा पासवर्ड गलत।'; errEl.classList.add('show'); return; }
    currentUser = data.user;
    toast('स्वागत छ! लगइन सफल भयो।', 'ok');
    renderApp();
  });
}

/* ══════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════ */
function renderApp() {
  document.body.className = 'admin-body';
  root.innerHTML = `
  <div class="ad-layout" id="adLayout">
    <div class="ad-overlay" id="adOverlay"></div>

    <!-- SIDEBAR -->
    <aside class="ad-sidebar" id="adSidebar">
      <div class="ad-brand">
        <div class="ad-brand__logo"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></div>
        <div class="ad-brand__text"><b>हाम्रो केदारस्यूँ</b><small>प्रशासन प्यानल</small></div>
      </div>
      <nav class="ad-nav" id="adNav"></nav>
      <div class="ad-sidebar__foot">
        <a class="ad-nav__item" href="/" target="_blank" rel="noopener">${icon.globe} वेबसाइट हेर्नुहोस्</a>
        <button class="ad-nav__item" id="logoutSide">${icon.logout} लगआउट</button>
      </div>
    </aside>

    <!-- RIGHT COLUMN -->
    <div class="ad-right">
      <!-- TOPBAR -->
      <header class="ad-topbar">
        <div class="ad-topbar__left">
          <button class="ad-mob-btn" id="adMobBtn">${icon.menu}</button>
          <div>
            <h1 id="pgTitle">ड्यासबोर्ड</h1>
            <div class="crumb" id="pgCrumb">हाम्रो केदारस्यूँ प्रशासन</div>
          </div>
        </div>
        <div class="ad-topbar__right">
          <a class="ad-icon-btn" href="/" target="_blank" rel="noopener" title="वेबसाइट हेर्नुहोस्">${icon.globe}</a>
          <div class="ad-user-wrap" id="adUserWrap">
            <div class="ad-user" id="adUserBtn">
              <span class="ad-user__av"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></span>
              <div><div class="ad-user__name">प्रशासक</div><div class="ad-user__email">${esc(currentUser?.email?.slice(0,22) || '')}</div></div>
              ${icon.chevronDown}
            </div>
            <div class="ad-dropdown" id="adDropdown">
              <div class="ad-dropdown__head"><b>प्रशासक ज्यू</b><small>${esc(currentUser?.email || '')}</small></div>
              <button class="ad-dropdown__item" data-goto="profile">${icon.user} प्रोफाइल</button>
              <button class="ad-dropdown__item" data-goto="settings">${icon.settings} वेबसाइट सेटिङ</button>
              <div class="ad-dropdown__sep"></div>
              <a class="ad-dropdown__item" href="/" target="_blank" rel="noopener">${icon.globe} वेबसाइट हेर्नुहोस्</a>
              <div class="ad-dropdown__sep"></div>
              <button class="ad-dropdown__item red" id="logoutTop">${icon.logout} लगआउट</button>
            </div>
          </div>
        </div>
      </header>

      <!-- MAIN CONTENT -->
      <main class="ad-main">
        <div class="ad-content" id="adContent"></div>
      </main>
    </div>
  </div>
  <div class="ad-toasts" id="adToasts"></div>`;

  buildSidebar();
  bindShell();
  navigate('dashboard');
}

function buildSidebar() {
  const nav = document.getElementById('adNav');
  nav.innerHTML = modules.map(m => {
    if (m.group) return `<div class="ad-nav__section">${m.group}</div>`;
    return `<button class="ad-nav__item" data-goto="${m.id}">${m.icon} ${m.label}</button>`;
  }).join('');
  nav.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.goto)));
}

function bindShell() {
  // mobile sidebar
  document.getElementById('adMobBtn').addEventListener('click', () => {
    document.getElementById('adSidebar').classList.toggle('open');
    document.getElementById('adOverlay').classList.toggle('open');
  });
  document.getElementById('adOverlay').addEventListener('click', closeSidebar);

  // logout
  document.getElementById('logoutSide').addEventListener('click', doLogout);
  document.getElementById('logoutTop').addEventListener('click', doLogout);

  // user dropdown
  const btn = document.getElementById('adUserBtn');
  const drop = document.getElementById('adDropdown');
  btn.addEventListener('click', e => { e.stopPropagation(); drop.classList.toggle('open'); });
  document.addEventListener('click', e => { if (!e.target.closest('#adUserWrap')) drop.classList.remove('open'); });
  drop.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => { drop.classList.remove('open'); navigate(b.dataset.goto); }));
}

function closeSidebar() {
  document.getElementById('adSidebar').classList.remove('open');
  document.getElementById('adOverlay').classList.remove('open');
}

async function doLogout() {
  await supabase.auth.signOut();
  currentUser = null;
  toast('लगआउट भयो।', 'info');
  renderLogin();
}

/* ══════════════════════════════════════════
   ROUTER
══════════════════════════════════════════ */
async function navigate(id) {
  closeSidebar();
  const mod = modules.find(m => m.id === id);
  document.getElementById('pgTitle').textContent = mod?.label || 'ड्यासबोर्ड';
  document.getElementById('pgCrumb').textContent = mod?.group || 'हाम्रो केदारस्यूँ प्रशासन';
  // highlight active
  document.querySelectorAll('.ad-nav__item[data-goto]').forEach(b => b.classList.toggle('active', b.dataset.goto === id));

  const content = document.getElementById('adContent');
  content.innerHTML = `<div class="ad-loading">${icon.loaderSpin} <span>लोड हुँदै...</span></div>`;

  if (id === 'dashboard') await renderDashboard(content);
  else if (id === 'settings') await renderSettings(content);
  else if (id === 'messages') await renderMessages(content);
  else if (id === 'images') await renderImageLibrary(content);
  else if (id === 'profile') renderProfile(content);
  else if (mod?.table) {
    const inst = new AdminModule(mod, content, toast);
    await inst.load();
  }
}

/* ══════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════ */
async function renderDashboard(el) {
  const statDefs = [
    { label:'पर्यटकीय स्थल', table:'tourist_places', goto:'tourist', c:'#0f766e', cb:'#f0fdfa', ic:icon.mountain },
    { label:'धार्मिक स्थल',   table:'religious_sites', goto:'religious', c:'#15803d', cb:'#f0fdf4', ic:icon.temple },
    { label:'समाचार',         table:'news_items',      goto:'news',     c:'#d97706', cb:'#fffbeb', ic:icon.news },
    { label:'कार्यक्रम',      table:'events',          goto:'events',   c:'#0d9488', cb:'#ecfdf5', ic:icon.calendar },
    { label:'फोटो ग्यालरी',   table:'gallery_items',   goto:'gallery',  c:'#7c3aed', cb:'#f5f3ff', ic:icon.camera },
    { label:'भिडियो',         table:'videos',          goto:'videos',   c:'#dc2626', cb:'#fef2f2', ic:icon.video },
    { label:'होमस्टे',        table:'homestays',       goto:'homestay', c:'#0891b2', cb:'#f0f9ff', ic:icon.bed },
    { label:'सन्देश',         table:'contact_messages',goto:'messages', c:'#b45309', cb:'#fffbeb', ic:icon.mail },
  ];

  const counts = await Promise.all(
    statDefs.map(async d => {
      const { count } = await supabase.from(d.table).select('*', { count:'exact', head:true });
      return { ...d, count: count || 0 };
    })
  );

  const now = new Date().toLocaleDateString('ne-NP', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  el.innerHTML = `
  <!-- welcome banner -->
  <div class="dash-banner">
    <div class="dash-banner__inner">
      <div>
        <h2>नमस्ते, प्रशासक ज्यू!</h2>
        <p>हाम्रो केदारस्यूँ वेबसाइटको प्रशासन प्यानलमा स्वागत छ। यहाँबाट तपाईं वेबसाइटका सम्पूर्ण सामग्री थप्न, सम्पादन गर्न र हटाउन सक्नुहुन्छ।</p>
        <div class="dash-banner__time">${icon.clock} ${now}</div>
      </div>
      <div class="dash-banner__logo"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></div>
    </div>
  </div>

  <!-- stat cards -->
  <div class="dash-stats">
    ${counts.map(d => `
      <div class="ds-card" style="--c:${d.c};--cb:${d.cb}" data-goto="${d.goto}">
        <div class="ds-card__head">
          <div class="ds-card__ic">${d.ic}</div>
          <div class="ds-card__arrow">↗</div>
        </div>
        <div class="ds-card__num">${d.count}</div>
        <div class="ds-card__label">${d.label}</div>
      </div>`).join('')}
  </div>

  <!-- quick access -->
  <div class="dash-quick">
    ${[
      { goto:'tourist', ic:icon.mountain, label:'पर्यटकीय स्थल' },
      { goto:'news',    ic:icon.news,     label:'समाचार' },
      { goto:'gallery', ic:icon.camera,   label:'फोटो ग्यालरी' },
      { goto:'events',  ic:icon.calendar, label:'कार्यक्रम' },
    ].map(q => `
      <div class="dq-item" data-goto="${q.goto}">
        <div class="dq-item__ic">${q.ic}</div>
        <span>${q.label}<br><small style="font-weight:400;color:var(--muted)">व्यवस्थापन</small></span>
      </div>`).join('')}
  </div>

  <!-- bottom grid -->
  <div class="dash-grid">
    <!-- recent messages -->
    <div class="ad-panel">
      <div class="ad-panel__head">
        <div><h2>हालैका सन्देश</h2><div class="ad-panel__sub">सम्पर्क पृष्ठबाट आएका</div></div>
        <button class="btn btn-ghost" data-goto="messages">सबै हेर्नुहोस्</button>
      </div>
      <div id="recentMsgs"><div class="ad-loading">${icon.loaderSpin}</div></div>
    </div>

    <!-- quick links -->
    <div class="ad-panel">
      <div class="ad-panel__head"><h2>द्रुत व्यवस्थापन</h2></div>
      <div class="act-list">
        ${[
          { goto:'hero',      ic:icon.image,    label:'हिरो स्लाइडर',   sub:'होमपेजको ब्यानर', c:'#7c3aed', cb:'#f5f3ff' },
          { goto:'religious', ic:icon.temple,   label:'धार्मिक स्थल',   sub:'मन्दिर र थान', c:'#15803d', cb:'#f0fdf4' },
          { goto:'nature',    ic:icon.leaf,     label:'प्राकृतिक सम्पदा', sub:'नदी, झरना, जंगल', c:'#0d9488', cb:'#ecfdf5' },
          { goto:'culture',   ic:icon.music,    label:'संस्कृति',        sub:'देउडा, चाडपर्व', c:'#d97706', cb:'#fffbeb' },
          { goto:'food',      ic:icon.food,     label:'स्थानीय परिकार',  sub:'परम्परागत खाना', c:'#dc2626', cb:'#fef2f2' },
          { goto:'products',  ic:icon.shopping, label:'स्थानीय उत्पादन', sub:'मह, जडीबुटी', c:'#0891b2', cb:'#f0f9ff' },
        ].map(a => `
          <div class="act-item" data-goto="${a.goto}">
            <div class="act-item__dot" style="background:${a.cb};color:${a.c}">${a.ic}</div>
            <div class="act-item__body">
              <div class="act-item__title">${a.label}</div>
              <div class="act-item__sub">${a.sub}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--light);flex-shrink:0"><polyline points="9 18 15 12 9 6"/></svg>
          </div>`).join('')}
      </div>
    </div>
  </div>`;

  // wire clicks
  el.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.goto)));
  loadRecentMessages();
}

async function loadRecentMessages() {
  const el = document.getElementById('recentMsgs');
  if (!el) return;
  const { data } = await supabase.from('contact_messages').select('*').order('created_at',{ascending:false}).limit(6);
  const msgs = data || [];
  if (!msgs.length) {
    el.innerHTML = emptyHTML('कुनै सन्देश छैन', 'सम्पर्क पृष्ठबाट आउने सन्देशहरू यहाँ देखिनेछन्।');
    return;
  }
  el.innerHTML = `<div class="act-list">
    ${msgs.map(m => `
      <div class="act-item" data-msgid="${m.id}">
        <div class="act-item__dot" style="background:${m.is_read?'#f1f5f9':'#fef3c7'};color:${m.is_read?'#64748b':'#b45309'}">${icon.mail}</div>
        <div class="act-item__body">
          <div class="act-item__title">${esc(m.name)} — ${esc(m.subject||'सन्देश')}</div>
          <div class="act-item__sub">${fmtDate(m.created_at)} · ${esc(m.phone||'')}</div>
        </div>
        ${!m.is_read ? '<span class="tag tag-new">नयाँ</span>' : ''}
      </div>`).join('')}
  </div>`;
  el.querySelectorAll('[data-msgid]').forEach(b => b.addEventListener('click', async () => {
    const id = b.dataset.msgid;
    const { data: m } = await supabase.from('contact_messages').select('*').eq('id',id).maybeSingle();
    if (m) { msgModal(m); if (!m.is_read) supabase.from('contact_messages').update({is_read:true}).eq('id',id); }
  }));
}

/* ══════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════ */
async function renderSettings(el) {
  const { data } = await supabase.from('site_settings').select('*').maybeSingle();
  const s = data || {};
  el.innerHTML = `
  <div class="ad-panel">
    <div class="ad-panel__head"><h2>वेबसाइट सेटिङ</h2></div>
    <div class="ad-panel__body">
      <form id="settingsForm">
        <div class="af-divider">आधारभूत जानकारी</div>
        <div class="af-row">
          <div class="af-group"><label>वेबसाइट नाम</label><input name="site_name" value="${esc(s.site_name||'')}"></div>
          <div class="af-group"><label>ट्यागलाइन</label><input name="tagline" value="${esc(s.tagline||'')}"></div>
        </div>
        <div class="af-row">
          <div class="af-group"><label>फोन</label><input name="phone" value="${esc(s.phone||'')}"></div>
          <div class="af-group"><label>इमेल</label><input name="email" value="${esc(s.email||'')}"></div>
        </div>
        <div class="af-group"><label>ठेगाना</label><input name="address" value="${esc(s.address||'')}"></div>
        <div class="af-group"><label>नक्सा क्वेरी</label><input name="map_query" value="${esc(s.map_query||'')}"></div>

        <div class="af-divider">सामाजिक सञ्जाल</div>
        <div class="af-row">
          <div class="af-group"><label>फेसबुक</label><input name="facebook" value="${esc(s.facebook||'')}"></div>
          <div class="af-group"><label>इन्स्टाग्राम</label><input name="instagram" value="${esc(s.instagram||'')}"></div>
        </div>
        <div class="af-row">
          <div class="af-group"><label>युट्युब</label><input name="youtube" value="${esc(s.youtube||'')}"></div>
          <div class="af-group"><label>टिकटक</label><input name="tiktok" value="${esc(s.tiktok||'')}"></div>
        </div>

        <div class="af-divider">फुटर</div>
        <div class="af-group"><label>फुटर पाठ</label><input name="footer_text" value="${esc(s.footer_text||'')}"></div>
        <div class="af-group"><label>कपिराइट</label><input name="copyright_text" value="${esc(s.copyright_text||'')}"></div>
        <button type="submit" class="btn btn-primary">${icon.save} सेभ गर्नुहोस्</button>
      </form>
    </div>
  </div>`;
  document.getElementById('settingsForm').addEventListener('submit', async e => {
    e.preventDefault();
    const payload = { ...Object.fromEntries(new FormData(e.target)), updated_at: new Date().toISOString() };
    const { error } = await supabase.from('site_settings').upsert({ id: s.id, ...payload });
    error ? toast('सेभ असफल: ' + error.message, 'err') : toast('सेटिङ सेभ भयो।', 'ok');
  });
}

/* ══════════════════════════════════════════
   MESSAGES
══════════════════════════════════════════ */
async function renderMessages(el) {
  const { data } = await supabase.from('contact_messages').select('*').order('created_at',{ascending:false});
  const msgs = data || [];
  const unread = msgs.filter(m => !m.is_read).length;
  el.innerHTML = `
  <div class="ad-panel ad-panel--flush">
    <div class="ad-panel__head">
      <div><h2>सम्पर्क सन्देश</h2><div class="ad-panel__sub">${msgs.length} कुल${unread ? ` · ${unread} नयाँ` : ''}</div></div>
    </div>
    ${msgs.length ? `
    <div class="ad-table-wrap">
    <table class="ad-table">
      <thead><tr><th>नाम</th><th>सम्पर्क</th><th>विषय</th><th>मिति</th><th>स्थिति</th><th>कार्य</th></tr></thead>
      <tbody>
        ${msgs.map(m => `<tr data-id="${m.id}">
          <td><div class="td-main">${esc(m.name)}</div><div class="td-sub">${esc(m.email||'—')}</div></td>
          <td>${esc(m.phone||'—')}</td>
          <td style="max-width:200px"><div class="td-main">${esc(m.subject||'—')}</div><div class="td-sub">${esc((m.message||'').slice(0,50))}${(m.message||'').length>50?'…':''}</div></td>
          <td>${fmtDate(m.created_at)}</td>
          <td><span class="tag ${m.is_read?'tag-on':'tag-new'}">${m.is_read?'पढिएको':'नयाँ'}</span></td>
          <td><div class="row-acts">
            <button class="btn-edit" data-act="read" title="पढ्ने">${icon.eye}</button>
            <button class="btn-del"  data-act="del"  title="हटाउने">${icon.trash}</button>
          </div></td>
        </tr>`).join('')}
      </tbody>
    </table></div>` : emptyHTML('कुनै सन्देश छैन','सम्पर्क पृष्ठबाट आउने सन्देशहरू यहाँ देखिनेछन्।')}
  </div>`;
  el.querySelectorAll('[data-act]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const row = btn.closest('tr'); const id = row.dataset.id;
      if (btn.dataset.act === 'del') {
        if (!confirm('हटाउने हो?')) return;
        await supabase.from('contact_messages').delete().eq('id',id);
        toast('सन्देश हटाइयो।','ok'); row.remove();
      } else {
        const m = msgs.find(x=>x.id===id);
        msgModal(m);
        if (!m.is_read) supabase.from('contact_messages').update({is_read:true}).eq('id',id);
      }
    });
  });
}

function msgModal(m) {
  const modal = document.createElement('div');
  modal.className = 'ad-modal open';
  modal.innerHTML = `<div class="ad-modal__card">
    <div class="ad-modal__head"><h3>${esc(m.subject||'सन्देश')}</h3><button class="ad-modal__close" data-close>${icon.close}</button></div>
    <div class="ad-modal__body">
      <div class="info-row"><b>नाम</b><span>${esc(m.name)}</span></div>
      <div class="info-row"><b>फोन</b><span>${esc(m.phone||'—')}</span></div>
      <div class="info-row"><b>इमेल</b><span>${esc(m.email||'—')}</span></div>
      <div class="info-row"><b>मिति</b><span>${fmtDate(m.created_at)}</span></div>
      <div class="af-divider" style="margin:1rem 0 .5rem">सन्देश</div>
      <p style="background:#f8fafc;padding:1rem;border-radius:.65rem;line-height:1.75;font-size:.875rem;border:1px solid #e2e8f0">${esc(m.message||'')}</p>
    </div>
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target===modal||e.target.closest('[data-close]')) modal.remove(); });
}

/* ══════════════════════════════════════════
   PROFILE
══════════════════════════════════════════ */
function renderProfile(el) {
  el.innerHTML = `
  <div class="ad-panel">
    <div class="ad-panel__head"><h2>प्रशासक प्रोफाइल</h2></div>
    <div class="ad-panel__body">
      <div style="display:flex;align-items:center;gap:1.25rem;padding-bottom:1.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--border)">
        <div class="ad-user__av" style="width:68px;height:68px;font-size:0;box-shadow:0 8px 24px -6px rgba(15,118,110,.4);overflow:hidden"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo" style="width:100%;height:100%;object-fit:cover"></div>
        <div><b style="font-size:1.1rem;display:block;margin-bottom:.3rem">${esc(currentUser?.email||'')}</b><span class="tag-label">प्रशासक</span></div>
      </div>
      <form id="passForm" style="max-width:400px">
        <div class="af-divider">पासवर्ड परिवर्तन</div>
        <div class="af-group"><label>नयाँ पासवर्ड</label><input type="password" id="newPass" minlength="6" required placeholder="कम्तिमा ६ अक्षर"></div>
        <div id="passOk" style="display:none;background:#dcfce7;color:#15803d;padding:.65rem .9rem;border-radius:.65rem;font-size:.85rem;margin-bottom:.75rem">पासवर्ड सफलतापूर्वक परिवर्तन भयो।</div>
        <div id="passErr" style="display:none;background:#fef2f2;color:#dc2626;padding:.65rem .9rem;border-radius:.65rem;font-size:.85rem;margin-bottom:.75rem"></div>
        <button type="submit" class="btn btn-primary">${icon.lock} पासवर्ड परिवर्तन गर्नुहोस्</button>
      </form>
    </div>
  </div>`;
  document.getElementById('passForm').addEventListener('submit', async e => {
    e.preventDefault();
    const ok = document.getElementById('passOk'), err = document.getElementById('passErr');
    ok.style.display='none'; err.style.display='none';
    const { error } = await supabase.auth.updateUser({ password: document.getElementById('newPass').value });
    if (error) { err.textContent = error.message; err.style.display='block'; }
    else { ok.style.display='block'; e.target.reset(); toast('पासवर्ड परिवर्तन भयो।','ok'); }
  });
}

/* ══════════════════════════════════════════
   IMAGE LIBRARY
══════════════════════════════════════════ */
async function renderImageLibrary(el) {
  el.innerHTML = `
    <div class="ad-panel ad-panel--flush">
      <div class="ad-panel__head">
        <div><h2>तस्वीर पुस्तकालय</h2><div class="ad-panel__sub">अपलोड गरिएका तस्वीर — URL कपी गरेर प्रयोग गर्नुहोस्</div></div>
        <div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center">
          <div class="ad-search">${icon.search}<input type="search" placeholder="खोज्नुहोस्..." id="imgSearch"></div>
          <label class="btn btn-primary" id="imgUploadBtn" style="cursor:pointer">${icon.plus} तस्वीर अपलोड<input type="file" accept="image/*" multiple style="display:none" id="imgFileInput"></label>
        </div>
      </div>
      <div id="imgGrid"><div class="ad-loading">${icon.loaderSpin} <span>लोड हुँदै...</span></div></div>
    </div>`;

  let allImages = [];
  let searchQ = '';

  async function loadImages() {
    const { data, error } = await supabase.from('image_library').select('*').order('created_at', { ascending: false });
    if (error) { document.getElementById('imgGrid').innerHTML = emptyHTML('लोड असफल', error.message); return; }
    allImages = data || [];
    renderGrid();
  }

  function renderGrid() {
    const filtered = searchQ
      ? allImages.filter(r => (r.label || r.filename || r.url || '').toLowerCase().includes(searchQ.toLowerCase()))
      : allImages;

    if (!filtered.length) {
      document.getElementById('imgGrid').innerHTML = emptyHTML('कुनै तस्वीर छैन', 'माथिको बटनबाट तस्वीर अपलोड गर्नुहोस्।');
      return;
    }

    document.getElementById('imgGrid').innerHTML = `
      <div class="img-lib-grid">
        ${filtered.map(r => `
          <div class="img-lib-card">
            <div class="img-lib-card__img"><img src="${esc(r.url)}" alt="${esc(r.label||'')}" loading="lazy" onerror="this.style.opacity=.2"></div>
            <div class="img-lib-card__body">
              <div class="img-lib-card__label">${esc(r.label || r.filename || 'बिना नाम')}</div>
              <div class="img-lib-card__url" title="${esc(r.url)}">${esc(r.url.length > 40 ? r.url.slice(0,40)+'…' : r.url)}</div>
            </div>
            <div class="img-lib-card__acts">
              <button class="btn btn-ghost btn-sm" data-copy="${esc(r.url)}">${icon.copy} URL कपी</button>
              <button class="btn-del btn-sm" data-imgdel="${r.id}" title="हटाउने">${icon.trash}</button>
            </div>
          </div>`).join('')}
      </div>`;
  }

  // Search
  const si = document.getElementById('imgSearch');
  si.addEventListener('input', () => { searchQ = si.value; renderGrid(); });

  // Upload
  const fileInput = document.getElementById('imgFileInput');
  fileInput.addEventListener('change', async () => {
    const files = Array.from(fileInput.files);
    if (!files.length) return;
    const btn = document.getElementById('imgUploadBtn');
    btn.style.opacity = '.6'; btn.style.pointerEvents = 'none';
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('images').upload(path, file, { contentType: file.type });
      if (upErr) { toast('अपलोड असफल: ' + upErr.message, 'err'); continue; }
      const { data: pub } = supabase.storage.from('images').getPublicUrl(path);
      const url = pub.publicUrl;
      const { error: dbErr } = await supabase.from('image_library').insert({ url, filename: file.name, label: file.name.replace(/\.[^.]+$/, '') });
      if (dbErr) toast('डाटाबेसमा सेभ असफल: ' + dbErr.message, 'err');
    }
    btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
    fileInput.value = '';
    toast('तस्वीर अपलोड भयो।', 'ok');
    loadImages();
  });

  // Copy URL + delete (event delegation)
  document.getElementById('imgGrid').addEventListener('click', async e => {
    const cp = e.target.closest('[data-copy]');
    if (cp) {
      try {
        await navigator.clipboard.writeText(cp.dataset.copy);
        toast('URL कपी भयो!', 'ok');
      } catch {
        const ta = document.createElement('textarea'); ta.value = cp.dataset.copy; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
        toast('URL कपी भयो!', 'ok');
      }
      return;
    }
    const dl = e.target.closest('[data-imgdel]');
    if (dl) {
      if (!confirm('यो तस्वीर हटाउने हो?')) return;
      const id = dl.dataset.imgdel;
      const row = allImages.find(r => r.id === id);
      if (row) {
        const path = row.url.split('/images/')[1];
        if (path) await supabase.storage.from('images').remove([decodeURIComponent(path)]);
      }
      const { error } = await supabase.from('image_library').delete().eq('id', id);
      if (error) { toast('हटाउन असफल: ' + error.message, 'err'); return; }
      toast('तस्वीर हटाइयो।', 'ok');
      loadImages();
    }
  });

  loadImages();
}

/* Global image picker — used by AdminModule forms */
let _pickerResolve = null;
function openImagePicker(onPick) {
  const modal = document.createElement('div');
  modal.className = 'ad-modal open';
  modal.innerHTML = `<div class="ad-modal__card" style="max-width:760px">
    <div class="ad-modal__head"><h3>तस्वीर पुस्तकालयबाट छान्नुहोस्</h3><button class="ad-modal__close" data-close>${icon.close}</button></div>
    <div class="ad-modal__body">
      <div style="display:flex;gap:.6rem;margin-bottom:1rem;flex-wrap:wrap;align-items:center">
        <div class="ad-search" style="flex:1;min-width:200px">${icon.search}<input type="search" placeholder="खोज्नुहोस्..." id="pickerSearch"></div>
        <label class="btn btn-primary" style="cursor:pointer" id="pickerUploadBtn">${icon.plus} अपलोड<input type="file" accept="image/*" multiple style="display:none" id="pickerFileInput"></label>
      </div>
      <div id="pickerGrid" style="max-height:420px;overflow-y:auto"><div class="ad-loading">${icon.loaderSpin}</div></div>
    </div>
  </div>`;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  let pickerImages = [];
  let q = '';

  async function loadPickerImages() {
    const { data } = await supabase.from('image_library').select('*').order('created_at', { ascending: false });
    pickerImages = data || [];
    renderPickerGrid();
  }

  function renderPickerGrid() {
    const filtered = q ? pickerImages.filter(r => (r.label || r.filename || '').toLowerCase().includes(q.toLowerCase())) : pickerImages;
    const grid = document.getElementById('pickerGrid');
    if (!filtered.length) { grid.innerHTML = emptyHTML('कुनै तस्वीर छैन', 'अपलोड बटनबाट थप्नुहोस्।'); return; }
    grid.innerHTML = `<div class="img-lib-grid img-lib-grid--picker">
      ${filtered.map(r => `<div class="img-lib-card img-lib-card--picker" data-pick="${esc(r.url)}">
        <div class="img-lib-card__img"><img src="${esc(r.url)}" alt="${esc(r.label||'')}" loading="lazy"></div>
        <div class="img-lib-card__label">${esc(r.label || r.filename || 'बिना नाम')}</div>
      </div>`).join('')}
    </div>`;
    grid.querySelectorAll('[data-pick]').forEach(c => c.addEventListener('click', () => { onPick(c.dataset.pick); close(); }));
  }

  const sInput = document.getElementById('pickerSearch');
  sInput.addEventListener('input', () => { q = sInput.value; renderPickerGrid(); });

  const pf = document.getElementById('pickerFileInput');
  pf.addEventListener('change', async () => {
    const files = Array.from(pf.files);
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('images').upload(path, file, { contentType: file.type });
      if (upErr) continue;
      const { data: pub } = supabase.storage.from('images').getPublicUrl(path);
      await supabase.from('image_library').insert({ url: pub.publicUrl, filename: file.name, label: file.name.replace(/\.[^.]+$/, '') });
    }
    pf.value = '';
    toast('तस्वीर अपलोड भयो।', 'ok');
    loadPickerImages();
  });

  loadPickerImages();
}

window.openImagePicker = openImagePicker;

/* ══════════════════════════════════════════
   TOAST & HELPERS
══════════════════════════════════════════ */
function toast(msg, type='ok') {
  const wrap = document.getElementById('adToasts');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = `ad-toast ${type}`;
  el.innerHTML = (type==='ok'?icon.check:type==='err'?icon.close:icon.info) + ' ' + msg;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transform='translateY(10px)'; setTimeout(()=>el.remove(),320); }, 3500);
}

function emptyHTML(title, sub='') {
  return `<div class="ad-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg><div class="ad-empty__title">${title}</div><p>${sub}</p></div>`;
}

/* auth state watcher */
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') { currentUser = null; renderLogin(); }
});

boot();
