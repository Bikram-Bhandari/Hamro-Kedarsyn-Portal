/* गृहपृष्ठ — Homepage (live data from Supabase, static fallback) */
import { getHeroes, getTouristPlaces, getReligious, getNature, getCulture, getGallery, getVideos, getNews, getEvents, getSettings, about, stats } from '../content.js';
import { icon } from '../icons.js';

export async function renderHome() {
  const [heroes, tourist, religious, nature, culture, gallery, vids, news, events, settings] = await Promise.all([
    getHeroes(), getTouristPlaces(), getReligious(), getNature(), getCulture(),
    getGallery(), getVideos(), getNews(), getEvents(), getSettings(),
  ]);
  const upcoming = events.filter(e => !e.past).slice(0, 3);
  const latestNews = news.slice(0, 3);
  const previewGallery = gallery.slice(0, 8);

  return {
    html: `
    ${heroSlider(heroes)}

    <section class="section">
      <div class="container">
        <div class="intro">
          <div class="reveal">
            <span class="eyebrow">स्वागत छ</span>
            <h2>प्रकृति, संस्कृति र सम्पदाको <span class="text-gradient">सुन्दर संगम</span></h2>
            <p class="lead" style="margin-top:1rem">${about.intro}</p>
            <ul class="intro__list">
              <li><span class="tick">${icon.check}</span><div><b>प्राकृतिक सम्पदा</b><p>हिमाल, झरना, नदी र घना जंगलको अविस्मरणीय दृश्य।</p></div></li>
              <li><span class="tick">${icon.check}</span><div><b>धार्मिक तथा ऐतिहासिक सम्पदा</b><p>केदारनाथ मन्दिर लगायत पौराणिक स्थलको यात्रा।</p></div></li>
              <li><span class="tick">${icon.check}</span><div><b>स्थानीय संस्कृति र देउडा</b><p>देउडा, लोक नृत्य र चाडपर्वको जीवन्त अनुभव।</p></div></li>
              <li><span class="tick">${icon.check}</span><div><b>होमस्टे र स्थानीय अनुभव</b><p>गाउँले जीवनशैली र परम्परागत परिकारको स्वाद।</p></div></li>
            </ul>
            <a href="/about" class="btn btn--primary" data-link style="margin-top:1.5rem">${icon.arrow} थप जान्नुहोस्</a>
          </div>
          <div class="reveal reveal-d2" style="position:relative">
            <div class="intro__media">
              <img src="https://images.pexels.com/photos/32225790/pexels-photo-32225790.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="केदारस्यूँ गाउँ" loading="lazy">
            </div>
            <div class="intro__stat">
              <b>${stats[2].num}</b><span>${stats[2].label}<br>उत्कृष्ट गन्तव्य</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section--tight">
      <div class="container">
        <div class="stats reveal stagger">
          ${stats.map(s => `<div class="stat"><div class="stat__num">${s.num}</div><div class="stat__label">${s.label}</div></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">पर्यटन</span>
          <h2>प्रमुख <span class="text-gradient">पर्यटकीय स्थल</span></h2>
          <p>केदारस्यूँका अविस्मरणीय गन्तव्य — हिमाल देखि झरनासम्म।</p>
        </div>
        <div class="grid grid--3 stagger">
          ${tourist.slice(0,3).map(t => placeCard(t)).join('')}
        </div>
        <div class="center" style="margin-top:2.5rem">
          <a href="/tourist" class="btn btn--ghost" data-link>सबै पर्यटकीय स्थल हेर्नुहोस् ${icon.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">धार्मिक सम्पदा</span>
          <h2>पवित्र <span class="text-gradient">धार्मिक स्थल</span></h2>
          <p>आस्था र श्रद्धाका केन्द्र — केदारस्यूँका मन्दिर र थान।</p>
        </div>
        <div class="grid grid--3 stagger">
          ${religious.map(t => religiousCard(t)).join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">प्राकृतिक सम्पदा</span>
          <h2>प्रकृतिको <span class="text-gradient">अनमोल उपहार</span></h2>
          <p>नदी, झरना, जंगल र पहाड — केदारस्यूँको जैविक विविधता।</p>
        </div>
        <div class="grid grid--3 stagger">
          ${nature.slice(0,3).map(t => natureCard(t)).join('')}
        </div>
        <div class="center" style="margin-top:2.5rem">
          <a href="/nature" class="btn btn--ghost" data-link>सबै प्राकृतिक सम्पदा ${icon.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">संस्कृति</span>
          <h2>देउडा, नृत्य र <span class="text-gradient">परम्परा</span></h2>
          <p>पुस्तौंदेखि चलिआएको संस्कृति र चाडपर्वको रौनक।</p>
        </div>
        <div class="grid grid--4 stagger">
          ${culture.map(t => cultureCard(t)).join('')}
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">फोटो ग्यालरी</span>
          <h2>केदारस्यूँका <span class="text-gradient">रमणीय क्षण</span></h2>
          <p>प्रकृति, संस्कृति र गाउँ जीवनका सुन्दर तस्वीर।</p>
        </div>
        <div class="gallery-grid stagger">
          ${previewGallery.map(g => `
            <div class="gallery-item" data-gallery="${g.img}">
              <img src="${g.img}" alt="${g.cap||''}" loading="lazy">
              <div class="gallery-item__cap">${icon.camera} ${g.cap||''}</div>
            </div>`).join('')}
        </div>
        <div class="center" style="margin-top:2.5rem">
          <a href="/gallery" class="btn btn--ghost" data-link>पूरा ग्यालरी हेर्नुहोस् ${icon.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">भिडियो ग्यालरी</span>
          <h2>दृश्य र <span class="text-gradient">अनुभव</span></h2>
          <p>केदारस्यूँका सुन्दर क्षण भिडियोमा।</p>
        </div>
        <div class="grid grid--3 stagger">
          ${vids.slice(0,3).map(v => videoCard(v)).join('')}
        </div>
        <div class="center" style="margin-top:2.5rem">
          <a href="/videos" class="btn btn--ghost" data-link>सबै भिडियो हेर्नुहोस् ${icon.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">समाचार</span>
          <h2>पछिल्ला <span class="text-gradient">समाचार</span></h2>
          <p>केदारस्यूँ गाउँपालिकाका ताजा समाचार र जानकारी।</p>
        </div>
        <div class="news-grid stagger">
          ${latestNews.map(n => newsCard(n)).join('')}
        </div>
        <div class="center" style="margin-top:2.5rem">
          <a href="/news" class="btn btn--ghost" data-link>सबै समाचार हेर्नुहोस् ${icon.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">कार्यक्रम</span>
          <h2>आगामी <span class="text-gradient">कार्यक्रम</span></h2>
          <p>केदारस्यूँमा हुने चाडपर्व र कार्यक्रमको जानकारी।</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:1.25rem;max-width:760px;margin:0 auto">
          ${upcoming.map(e => eventCard(e)).join('')}
        </div>
        <div class="center" style="margin-top:2.5rem">
          <a href="/events" class="btn btn--ghost" data-link>सबै कार्यक्रम हेर्नुहोस् ${icon.arrow}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band reveal">
          <div class="cta-band__inner">
            <span class="eyebrow" style="background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.25)">यात्रा सुरु गर्नुहोस्</span>
            <h2>केदारस्यूँको यात्रा अहिले नै योजना बनाउनुहोस्</h2>
            <p>हिमाल, झरना, मन्दिर र देउडाको अविस्मरणीय अनुभवका लागि हामीसँग आजै सम्पर्क गर्नुहोस्।</p>
            <div class="flex wrap gap-3 aic" style="justify-content:center">
              <a href="/contact" class="btn btn--accent btn--lg" data-link>${icon.phone} सम्पर्क गर्नुहोस्</a>
              <a href="/homestay" class="btn btn--light btn--lg" data-link>${icon.bed} होमस्टे बुकिङ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    `,
    mount() {
      const stop = initHeroSlider();
      document.querySelectorAll('[data-gallery]').forEach(el => {
        el.addEventListener('click', () => {
          const imgs = [...document.querySelectorAll('[data-gallery]')].map(x => x.dataset.gallery);
          window.openLightbox(imgs, imgs.indexOf(el.dataset.gallery));
        });
      });
      document.querySelectorAll('[data-video]').forEach(el => {
        el.addEventListener('click', () => window.openVideoModal(el.dataset.video, el.dataset.title || ''));
      });
      return stop;
    }
  };
}

function heroSlider(heroes) {
  return `
  <section class="hero" id="hero">
    ${heroes.map((h, i) => `
      <div class="hero__slide ${i === 0 ? 'active' : ''}" style="background-image:url('${h.img}')">
        <div class="container hero__content">
          <span class="hero__eyebrow">${icon.sparkles} ${h.eyebrow}</span>
          <h1 class="hero__title">${h.title}</h1>
          <p class="hero__desc">${h.desc}</p>
          <div class="hero__cta">
            <a href="/tourist" class="btn btn--accent btn--lg" data-link>${icon.mountain} पर्यटन अन्वेषण</a>
            <a href="/about" class="btn btn--light btn--lg" data-link>${icon.info} हाम्रो केदारस्यूँ</a>
          </div>
        </div>
      </div>`).join('')}
    <div class="hero__nav">
      <div class="hero__dots">${heroes.map((_, i) => `<button class="hero__dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="स्लाइड ${i + 1}"></button>`).join('')}</div>
      <div class="hero__arrows">
        <button class="hero__arrow" id="heroPrev" aria-label="अघिल्लो">${icon.chevronLeft}</button>
        <button class="hero__arrow" id="heroNext" aria-label="पछिल्लो">${icon.chevronRight}</button>
      </div>
    </div>
    <div class="scroll-cue">${icon.chevronDown} तल स्क्रोल गर्नुहोस्</div>
  </section>`;
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  if (!slides.length) return () => {};
  let cur = 0; let timer;
  function go(n) {
    cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === cur));
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }
  function play() { timer = setInterval(() => go(cur + 1), 6000); }
  function stop() { clearInterval(timer); }
  document.getElementById('heroNext')?.addEventListener('click', () => { stop(); go(cur + 1); play(); });
  document.getElementById('heroPrev')?.addEventListener('click', () => { stop(); go(cur - 1); play(); });
  dots.forEach(d => d.addEventListener('click', () => { stop(); go(+d.dataset.slide); play(); }));
  const hero = document.getElementById('hero');
  hero?.addEventListener('mouseenter', stop);
  hero?.addEventListener('mouseleave', play);
  play();
  return stop;
}

function placeCard(t) {
  return `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${t.badge || 'पर्यटन'}</span></div><div class="card__body"><h3 class="card__title"><a href="/tourist/${t.id}" data-link>${t.title}</a></h3><p class="card__text">${t.short}</p><a href="/tourist/${t.id}" class="card__link" data-link>विस्तृत हेर्नुहोस् ${icon.arrow}</a></div></article>`;
}
function religiousCard(t) {
  return `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${icon.temple} धार्मिक</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.short}</p></div></article>`;
}
function natureCard(t) {
  return `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${icon.leaf} ${t.cat}</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.desc}</p></div></article>`;
}
function cultureCard(t) {
  return `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${icon.music} ${t.cat}</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.desc}</p></div></article>`;
}
function videoCard(v) {
  return `<div class="video-card" data-video="${v.id}" data-title="${v.title}"><img src="${v.thumb}" alt="${v.title}" loading="lazy"><div class="video-card__play"><span>${icon.play}</span></div><div class="video-card__cap"><b>${v.title}</b><span>${v.cat}</span></div></div>`;
}
function newsCard(n) {
  return `<article class="nc"><a href="/news/${n.id}" class="nc__media" data-link><img src="${n.img}" alt="${n.title}" loading="lazy"><span class="nc__cat">${n.cat}</span></a><div class="nc__body"><h3 class="nc__title"><a href="/news/${n.id}" data-link>${n.title}</a></h3><p class="nc__desc">${n.excerpt}</p></div></article>`;
}
function eventCard(e) {
  return `<article class="event-card"><div class="event-date"><b>${e.day}</b><span>${e.month}</span></div><div class="event-card__body"><h4 class="event-card__title">${e.title}</h4><div class="event-card__meta"><span>${icon.pin} ${e.loc}</span><span>${icon.clock} ${e.time}</span></div><p class="event-card__text">${e.desc}</p></div></article>`;
}
