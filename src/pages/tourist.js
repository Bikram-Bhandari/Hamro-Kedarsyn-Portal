/* पर्यटकीय स्थल — list + detail (live data) */
import { getTouristPlaces } from '../content.js';
import { icon } from '../icons.js';
import { pageHero, mapIframe, shareRow } from '../partials.js';

export async function renderTourist() {
  const items = await getTouristPlaces();
  return {
    html: `
    ${pageHero('पर्यटकीय स्थल', 'केदारस्यूँका अविस्मरणीय पर्यटकीय गन्तव्य — हिमालदेखि झरनासम्म', [['गृहपृष्ठ','/'],['पर्यटकीय स्थल','/tourist']])}
    <section class="section"><div class="container">
      <div class="grid grid--3 stagger">
        ${items.map(t => `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${t.badge || 'पर्यटन'}</span></div><div class="card__body"><h3 class="card__title"><a href="/tourist/${t.id}" data-link>${t.title}</a></h3><p class="card__text">${t.short}</p><div class="card__meta"><span>${icon.pin} केदारस्यूँ</span></div><a href="/tourist/${t.id}" class="card__link" data-link>विस्तृत हेर्नुहोस् ${icon.arrow}</a></div></article>`).join('')}
      </div>
    </div></section>`,
  };
}

export async function renderTouristDetail(id) {
  const items = await getTouristPlaces();
  const t = items.find(x => x.id === id);
  if (!t) return null;
  return {
    html: `
    ${pageHero(t.title, t.short, [['गृहपृष्ठ','/'],['पर्यटकीय स्थल','/tourist'],[t.title,`/tourist/${t.id}`]])}
    <section class="section"><div class="container">
      <div class="detail">
        <div class="detail__main">
          <div class="detail__hero reveal"><img id="detailMainImg" src="${t.gallery[0]}" alt="${t.title}"><span class="card__badge card__badge--accent" style="position:absolute;top:1rem;left:1rem">${t.badge || 'पर्यटन'}</span></div>
          <div class="detail__thumbs" id="thumbs">${t.gallery.map((g, i) => `<div class="detail__thumb ${i === 0 ? 'active' : ''}" data-img="${g}"><img src="${g}" alt="thumbnail"></div>`).join('')}</div>
          <div class="prose reveal"><h3>${t.title} को परिचय</h3><p>${t.desc}</p></div>
          <div class="info-box reveal"><h4>${icon.info} यात्रा जानकारी</h4><div class="info-row"><b>कसरी पुग्ने</b><span>${t.howToReach}</span></div><div class="info-row"><b>उपयुक्त समय</b><span>${t.bestTime}</span></div></div>
          <div class="info-box reveal"><h4>${icon.sparkles} यात्रा सुझाव</h4><ul style="margin-top:.5rem">${t.tips.map(tip => `<li style="padding:.5rem 0;border-bottom:1px dashed var(--neutral-200);display:flex;gap:.5rem;align-items:center;font-size:.9375rem">${icon.check}<span>${tip}</span></li>`).join('')}</ul></div>
          ${shareRow(t.title)}
        </div>
        <aside class="sidebar">
          <div class="info-box reveal"><h4>${icon.map} स्थान</h4><div class="map-embed">${mapIframe(t.mapQuery)}</div></div>
          <div class="cta-band reveal" style="padding:1.5rem"><div class="cta-band__inner"><h4 style="color:#fff;margin-bottom:.5rem">भ्रमण योजना</h4><p style="font-size:.9rem;margin-bottom:1rem">होमस्टे बुकिङ र गाइडका लागि सम्पर्क गर्नुहोस्।</p><a href="/homestay" class="btn btn--accent" data-link>${icon.bed} होमस्टे हेर्नुहोस्</a></div></div>
        </aside>
      </div>
    </div></section>`,
    mount() {
      document.querySelectorAll('#thumbs .detail__thumb').forEach(th => {
        th.addEventListener('click', () => {
          document.getElementById('detailMainImg').src = th.dataset.img;
          document.querySelectorAll('#thumbs .detail__thumb').forEach(x => x.classList.remove('active'));
          th.classList.add('active');
        });
      });
      return null;
    }
  };
}
