/* होमस्टे (live data) */
import { getHomestays } from '../content.js';
import { icon } from '../icons.js';
import { pageHero, mapIframe } from '../partials.js';

export async function renderHomestay() {
  const items = await getHomestays();
  return {
    html: `
    ${pageHero('होमस्टे', 'गाउँले जीवनशैली, स्थानीय परिकार र संस्कृतिको वास्तविक अनुभव', [['गृहपृष्ठ','/'],['होमस्टे','/homestay']])}
    <section class="section"><div class="container">
      <div class="grid grid--3 stagger">
        ${items.map(t => `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${icon.bed} होमस्टे</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.desc}</p><div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem">${t.facilities.map(f => `<span class="tag tag--green">${icon.check} ${f}</span>`).join('')}</div><div class="card__meta"><span>${icon.phone} ${t.contact}</span></div></div></article>`).join('')}
      </div>
    </div></section>
    <section class="section section--alt"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">स्थान</span><h2>होमस्टे <span class="text-gradient">नक्सा</span></h2></div>
      <div class="grid grid--3 stagger">
        ${items.map(t => `<div class="info-box"><h4>${icon.bed} ${t.title}</h4><div class="map-embed">${mapIframe(t.mapQuery, 10)}</div><a href="tel:${t.contact}" class="card__link" style="margin-top:.75rem">${icon.phone} ${t.contact}</a></div>`).join('')}
      </div>
    </div></section>`,
  };
}
