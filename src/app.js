/* हाम्रो केदारस्यूँ — App shell: router, shared layout, interactions */
import { site, nav } from './data.js';
import { icon } from './icons.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderTourist, renderTouristDetail } from './pages/tourist.js';
import { renderReligious } from './pages/religious.js';
import { renderNature } from './pages/nature.js';
import { renderCulture } from './pages/culture.js';
import { renderFood } from './pages/food.js';
import { renderProducts } from './pages/products.js';
import { renderHomestay } from './pages/homestay.js';
import { renderGallery } from './pages/gallery.js';
import { renderVideos } from './pages/videos.js';
import { renderNews, renderNewsDetail } from './pages/news.js';
import { renderEvents } from './pages/events.js';
import { renderContact } from './pages/contact.js';
import { renderNotFound } from './pages/notfound.js';

let currentCleanup = null;

/* Mount a page render result into #app. Returns a cleanup fn or null. */
function mountPage(renderFn, out) {
  const app = document.getElementById('app');
  if (out && typeof out === 'object' && 'html' in out) {
    app.innerHTML = out.html;
    if (typeof out.mount === 'function') return out.mount() || null;
  } else if (typeof out === 'string') {
    app.innerHTML = out;
  } else if (out instanceof HTMLElement) {
    app.innerHTML = '';
    app.appendChild(out);
  }
  return null;
}

/* ---------- Router ---------- */
const routes = [
  { path: '/', render: renderHome },
  { path: '/about', render: () => renderAbout() },
  { path: '/tourist', render: renderTourist },
  { path: '/tourist/:id', render: (p) => renderTouristDetail(p.id) },
  { path: '/religious', render: renderReligious },
  { path: '/nature', render: renderNature },
  { path: '/culture', render: renderCulture },
  { path: '/food', render: renderFood },
  { path: '/products', render: renderProducts },
  { path: '/homestay', render: renderHomestay },
  { path: '/gallery', render: renderGallery },
  { path: '/videos', render: renderVideos },
  { path: '/news', render: renderNews },
  { path: '/news/:id', render: (p) => renderNewsDetail(p.id) },
  { path: '/events', render: renderEvents },
  { path: '/contact', render: renderContact },
];

function matchRoute(path) {
  for (const r of routes) {
    const parts = r.path.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);
    if (parts.length !== pathParts.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) params[parts[i].slice(1)] = decodeURIComponent(pathParts[i]);
      else if (parts[i] !== pathParts[i]) { ok = false; break; }
    }
    if (ok) return { route: r, params };
  }
  return null;
}

async function render() {
  const path = location.pathname;
  const m = matchRoute(path);
  // run cleanup from previous page
  if (currentCleanup) { try { currentCleanup(); } catch {} currentCleanup = null; }

  // scroll to top unless hash present
  if (!location.hash) window.scrollTo(0, 0);

  let out;
  if (m) {
    out = await m.route.render(m.params);
  } else {
    out = await renderNotFound();
  }
  if (out === null) { out = await renderNotFound(); }
  currentCleanup = mountPage(m ? m.route.render : renderNotFound, out);

  updateNavActive(path);
  initReveal();
  // handle in-page hash after render
  if (location.hash) {
    requestAnimationFrame(() => {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ---------- Shared layout ---------- */
function buildLayout() {
  // Loader
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.id = 'loader';
  loader.innerHTML = `
    <div class="loader__mark"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></div>
    <div class="loader__bar"></div>
    <div class="loader__txt">${site.name}</div>`;
  document.body.appendChild(loader);

  // Announcement bar
  const announce = document.createElement('div');
  announce.className = 'announce';
  announce.id = 'announce';
  announce.innerHTML = `
    <div class="announce__track">
      <span>${icon.sparkles} स्वागत छ — हाम्रो केदारस्यूँमा !</span>
      <span>${icon.calendar} आगामी : केदारडाँडा पदयात्रा — साउन १५</span>
      <span>${icon.info} पर्यटन जानकारीका लागि सम्पर्क गर्नुहोस् — ${site.phone}</span>
      <span>${icon.sparkles} स्वागत छ — हाम्रो केदारस्यूँमा !</span>
      <span>${icon.calendar} आगामी : केदारडाँडा पदयात्रा — साउन १५</span>
      <span>${icon.info} पर्यटन जानकारीका लागि सम्पर्क गर्नुहोस् — ${site.phone}</span>
    </div>
    <button class="announce__close" aria-label="बन्द गर्नुहोस्">✕</button>`;
  document.body.appendChild(announce);

  // Header
  const header = document.createElement('header');
  header.className = 'header';
  header.id = 'header';
  header.innerHTML = `
    <div class="container header__inner">
      <a href="/" class="brand" data-link>
        <span class="brand__mark"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></span>
        <span class="brand__txt"><b>${site.name}</b><small>${site.tagline}</small></span>
      </a>
      <nav class="nav hide-mobile" id="nav"></nav>
      <div class="header__actions">
        <button class="icon-btn" id="searchBtn" aria-label="खोज">${icon.search}</button>
        <a href="/contact" class="btn btn--primary hide-mobile" data-link>सम्पर्क</a>
        <button class="burger show-mobile" id="burger" aria-label="मेनु">${'<span></span>'.repeat(3)}</button>
      </div>
    </div>`;
  document.body.appendChild(header);

  buildNav(header.querySelector('#nav'));

  // Mobile drawer
  const drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.id = 'drawer';
  drawer.innerHTML = `
    <div class="drawer__bg" data-drawer-close></div>
    <aside class="drawer__panel">
      <div class="drawer__head">
        <a href="/" class="brand" data-link>
          <span class="brand__mark"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></span>
          <span class="brand__txt"><b>${site.name}</b><small class="drawer-tagline">${site.tagline}</small></span>
        </a>
        <button class="icon-btn" data-drawer-close aria-label="बन्द">${icon.close}</button>
      </div>
      <nav class="drawer__nav" id="drawerNav"></nav>
    </aside>`;
  document.body.appendChild(drawer);
  buildDrawerNav(drawer.querySelector('#drawerNav'));

  // Main
  const main = document.createElement('main');
  main.id = 'app';
  document.body.appendChild(main);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = footerHTML();
  document.body.appendChild(footer);

  // Back to top
  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.id = 'toTop';
  toTop.setAttribute('aria-label', 'माथि');
  toTop.innerHTML = icon.up;
  document.body.appendChild(toTop);

  // Search overlay
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.id = 'searchOverlay';
  searchOverlay.innerHTML = `
    <div class="search-panel">
      <div class="search-panel__input">${icon.search}<input type="search" id="globalSearch" placeholder="पर्यटकीय स्थल, समाचार, कार्यक्रम खोज्नुहोस्..."></div>
      <div class="search-panel__results" id="searchResults"></div>
    </div>`;
  document.body.appendChild(searchOverlay);

  bindGlobalInteractions();
}

function buildNav(navEl) {
  navEl.innerHTML = nav.map(item => {
    if (item.children) {
      return `<div class="nav__item has-drop">
        <a class="nav__link" href="${item.href}" data-link>${item.label} <span class="caret">${icon.chevronDown}</span></a>
        <div class="drop">
          ${item.children.map(c => `<a class="drop__link" href="${c.href}" data-link>${navIconFor(c.label)} ${c.label}</a>`).join('')}
        </div>
      </div>`;
    }
    return `<div class="nav__item"><a class="nav__link" href="${item.href}" data-link>${item.label}</a></div>`;
  }).join('');
}

function buildDrawerNav(el) {
  let html = '';
  for (const item of nav) {
    html += `<a class="drawer__link" href="${item.href}" data-link>${navIconFor(item.label)} ${item.label}</a>`;
    if (item.children) {
      for (const c of item.children) {
        html += `<a class="drawer__link drawer__sub" href="${c.href}" data-link>${navIconFor(c.label)} ${c.label}</a>`;
      }
    }
  }
  el.innerHTML = html;
}

function navIconFor(label) {
  const map = {
    'गृहपृष्ठ': icon.home, 'हाम्रो केदारस्यूँ': icon.info, 'पर्यटन': icon.mountain,
    'संस्कृति': icon.music, 'ग्यालरी': icon.camera, 'समाचार': icon.news,
    'कार्यक्रम': icon.calendar, 'सम्पर्क': icon.mail,
    'गाउँपालिकाको परिचय': icon.info, 'इतिहास': icon.book, 'भूगोल': icon.globe,
    'जनसंख्या': icon.users, 'वडा विवरण': icon.map,
    'पर्यटकीय स्थल': icon.mountain, 'धार्मिक स्थल': icon.temple,
    'प्राकृतिक सम्पदा': icon.leaf, 'होमस्टे': icon.bed,
    'संस्कृति र देउडा': icon.music, 'स्थानीय परिकार': icon.food,
    'स्थानीय उत्पादन': icon.shopping, 'फोटो ग्यालरी': icon.camera,
    'भिडियो ग्यालरी': icon.video,
  };
  return map[label] || icon.arrow;
}

function footerHTML() {
  const year = '२०८२';
  return `
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <span class="brand__mark"><img src="/images/हाम्रो_केदारस्यूँ-logo.png" alt="logo"></span>
          <h4>${site.name}</h4>
          <p>${site.tagline}। केदारस्यूँ गाउँपालिका, बझाङ, सुदूरपश्चिम प्रदेश, नेपाल।</p>
          <div class="social">
            <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="फेसबुक">${icon.facebook}</a>
            <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="इन्स्टाग्राम">${icon.instagram}</a>
            <a href="${site.social.youtube}" target="_blank" rel="noopener" aria-label="युट्युब">${icon.youtube}</a>
            <a href="${site.social.tiktok}" target="_blank" rel="noopener" aria-label="टिकटक">${icon.tiktok}</a>
          </div>
        </div>
        <div>
          <h4>छिटो पहुँच</h4>
          <div class="footer__links">
            <a href="/" data-link>गृहपृष्ठ</a>
            <a href="/about" data-link>हाम्रो केदारस्यूँ</a>
            <a href="/tourist" data-link>पर्यटकीय स्थल</a>
            <a href="/culture" data-link>संस्कृति</a>
            <a href="/news" data-link>समाचार</a>
            <a href="/events" data-link>कार्यक्रम</a>
          </div>
        </div>
        <div>
          <h4>थप पृष्ठ</h4>
          <div class="footer__links">
            <a href="/religious" data-link>धार्मिक स्थल</a>
            <a href="/nature" data-link>प्राकृतिक सम्पदा</a>
            <a href="/food" data-link>स्थानीय परिकार</a>
            <a href="/products" data-link>स्थानीय उत्पादन</a>
            <a href="/homestay" data-link>होमस्टे</a>
            <a href="/gallery" data-link>फोटो ग्यालरी</a>
          </div>
        </div>
        <div>
          <h4>सम्पर्क</h4>
          <ul class="footer__contact">
            <li>${icon.pin}<span>${site.address}</span></li>
            <li>${icon.phone}<a href="tel:${site.phoneRaw}">${site.phone}</a></li>
            <li>${icon.mail}<a href="mailto:${site.email}">${site.email}</a></li>
            <li>${icon.clock}<span>कार्यालय समय : बिहान ९ — दिउँसो ५</span></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <p>© ${year} ${site.name}। सर्वाधिकार सुरक्षित।</p>
        <p>बझाङ · सुदूरपश्चिम प्रदेश · नेपाल</p>
      </div>
      <div class="footer__dev">
        Developer: <a href="https://bikrambhandari.info.np" target="_blank" rel="noopener">Bikram Bhandari</a>
      </div>
    </div>`;
}

/* ---------- Interactions ---------- */
function bindGlobalInteractions() {
  // delegate link clicks for SPA navigation
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-link]');
    if (a) {
      const href = a.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigate(href);
      }
    }
    const close = e.target.closest('[data-drawer-close]');
    if (close) closeDrawer();
  });

  // burger
  document.getElementById('burger').addEventListener('click', toggleDrawer);

  // search
  document.getElementById('searchBtn').addEventListener('click', openSearch);
  document.getElementById('searchOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'searchOverlay') closeSearch();
  });
  document.getElementById('globalSearch').addEventListener('input', onSearch);


  // announce close
  document.querySelector('.announce__close').addEventListener('click', () => {
    document.getElementById('announce').style.display = 'none';
    header.classList.add('header--scrolled');
  });

  // scroll behaviour
  const header = document.getElementById('header');
  const toTop = document.getElementById('toTop');
  const announce = document.getElementById('announce');
  if (window.scrollY > 10) {
    header.classList.add('header--scrolled');
    announce?.classList.add('announce--hidden');
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header.classList.add('header--scrolled');
    else header.classList.remove('header--scrolled');
    if (window.scrollY > 500) toTop.classList.add('show');
    else toTop.classList.remove('show');
    if (announce) {
      if (window.scrollY > 10) announce.classList.add('announce--hidden');
      else announce.classList.remove('announce--hidden');
    }
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ESC closes overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); closeDrawer(); closeLightbox(); closeVideoModal(); }
  });
}

function navigate(path) {
  closeDrawer();
  history.pushState({}, '', path);
  render();
}

function toggleDrawer() {
  const d = document.getElementById('drawer');
  const b = document.getElementById('burger');
  d.classList.toggle('open');
  b.classList.toggle('open');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
}

/* Search */
let searchTimer;
function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('globalSearch').focus(), 100);
}
function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('globalSearch').value = '';
  document.getElementById('searchResults').innerHTML = '';
}
function onSearch(e) {
  clearTimeout(searchTimer);
  const q = e.target.value.trim();
  const res = document.getElementById('searchResults');
  if (q.length < 2) { res.innerHTML = ''; return; }
  searchTimer = setTimeout(() => { res.innerHTML = searchResultsHTML(q); bindSearchClicks(res); }, 120);
}
function onDrawerSearch(e) {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('#drawerNav .drawer__link').forEach(a => {
    const txt = a.textContent.toLowerCase();
    a.style.display = (!q || txt.includes(q)) ? '' : 'none';
  });
}
function searchResultsHTML(q) {
  import('./search.js').then(m => {
    const results = m.searchAll(q);
    const res = document.getElementById('searchResults');
    if (!results.length) { res.innerHTML = '<div class="search-empty">कुनै नतिजा भेटिएन। अर्को शब्द प्रयास गर्नुहोस्।</div>'; return; }
    res.innerHTML = results.map(r => `
      <a class="search-result" href="${r.href}" data-link>
        <span class="search-result__icon">${navIconFor(r.type) || icon.search}</span>
        <span><b>${r.title}</b><span>${r.type}</span></span>
      </a>`).join('');
    bindSearchClicks(res);
  });
  return '<div class="search-empty">खोज्दै...</div>';
}
function bindSearchClicks(scope) {
  scope.querySelectorAll('a[data-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      closeSearch();
      navigate(a.getAttribute('href'));
    });
  });
}

function updateNavActive(path) {
  const top = path.split('/')[1] || '';
  document.querySelectorAll('.nav__item').forEach(item => {
    const link = item.querySelector('.nav__link');
    if (!link) return;
    const href = link.getAttribute('href');
    const seg = href.split('/')[1] || '';
    item.classList.toggle('active', top && seg === top);
  });
}

/* Reveal on scroll */
let revealObserver;
function initReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));
}

/* Lightbox helpers (global) */
window.openLightbox = function (imgs, idx) {
  let i = idx || 0;
  const lb = document.createElement('div');
  lb.className = 'lightbox open';
  lb.innerHTML = `
    <button class="lightbox__close">${icon.close}</button>
    <button class="lightbox__nav lightbox__prev">${icon.chevronLeft}</button>
    <img class="lightbox__img" src="${imgs[i]}" alt="">
    <button class="lightbox__nav lightbox__next">${icon.chevronRight}</button>
    <div class="lightbox__cap">${i + 1} / ${imgs.length}</div>`;
  document.body.appendChild(lb);
  const img = lb.querySelector('.lightbox__img');
  const cap = lb.querySelector('.lightbox__cap');
  const upd = () => { img.src = imgs[i]; cap.textContent = `${i + 1} / ${imgs.length}`; };
  lb.querySelector('.lightbox__close').onclick = () => lb.remove();
  lb.querySelector('.lightbox__prev').onclick = () => { i = (i - 1 + imgs.length) % imgs.length; upd(); };
  lb.querySelector('.lightbox__next').onclick = () => { i = (i + 1) % imgs.length; upd(); };
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.remove(); });
};
function closeLightbox() {
  document.querySelector('.lightbox')?.remove();
}

/* Video modal (global) */
window.openVideoModal = function (youtubeId, title) {
  const vm = document.createElement('div');
  vm.className = 'video-modal open';
  vm.innerHTML = `
    <button class="lightbox__close" style="top:1.5rem;right:1.5rem">${icon.close}</button>
    <div class="video-modal__frame"><iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" title="${title}" allow="autoplay;encrypted-media" allowfullscreen></iframe></div>`;
  document.body.appendChild(vm);
  vm.querySelector('.lightbox__close').onclick = () => vm.remove();
  vm.addEventListener('click', (e) => { if (e.target === vm) vm.remove(); });
};
function closeVideoModal() {
  document.querySelector('.video-modal')?.remove();
}

/* ---------- Boot ---------- */
window.addEventListener('popstate', render);

buildLayout();
render();
window._render = render;

// hide loader once first render done + small delay
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 600);
});
// fallback hide
setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 2000);

export { navigate, icon, site };
