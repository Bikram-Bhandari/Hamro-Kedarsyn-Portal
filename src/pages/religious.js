/* धार्मिक स्थल (live data) */
import { getReligious } from '../content.js';
import { icon } from '../icons.js';
import { pageHero, mapIframe } from '../partials.js';

export async function renderReligious() {
  const items = await getReligious();
  return {
    html: `
    ${pageHero('धार्मिक स्थल', 'आस्था र श्रद्धाका केन्द्र — केदारस्यूँका मन्दिर र पवित्र स्थल', [['गृहपृष्ठ','/'],['धार्मिक स्थल','/religious']])}
    <section class="section"><div class="container">
      <div class="grid grid--3 stagger">
        ${items.map(t => `<article class="card"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">धार्मिक</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.short}</p></div></article>`).join('')}
      </div>
    </div></section>
    <section class="section section--alt"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">विस्तृत जानकारी</span><h2>धार्मिक <span class="text-gradient">महत्व</span></h2></div>
      <div class="grid grid--3 stagger">
        ${items.map(t => `<div class="info-box"><h4>${t.title}</h4><div class="prose" style="font-size:.9375rem"><p>${t.desc}</p></div><div style="margin-top:1rem;padding-top:1rem;border-top:1px dashed var(--neutral-200)"><b style="font-size:.85rem;color:var(--neutral-700)">इतिहास</b><p style="font-size:.875rem;color:var(--neutral-600);margin-top:.3rem">${t.history}</p></div>${t.mapQuery ? `<div class="map-embed" style="margin-top:1rem">${mapIframe(t.mapQuery, 10)}</div>` : ''}</div>`).join('')}
      </div>
    </div></section>`,
  };
}
