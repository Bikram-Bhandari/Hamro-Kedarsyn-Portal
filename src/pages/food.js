/* स्थानीय परिकार (live data) */
import { getFood } from '../content.js';
import { pageHero } from '../partials.js';

export async function renderFood() {
  const items = await getFood();
  return {
    html: `
    ${pageHero('स्थानीय परिकार', 'केदारस्यूँका परम्परागत र स्वादिला परिकार', [['गृहपृष्ठ','/'],['स्थानीय परिकार','/food']])}
    <section class="section"><div class="container">
      <div class="grid grid--2 stagger">
        ${items.map(t => `<article class="card"><div class="card__media" style="aspect-ratio:16/9"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">परिकार</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.desc}</p><div style="margin-top:.5rem;padding-top:.75rem;border-top:1px solid var(--neutral-100)"><b style="font-size:.85rem;color:var(--neutral-700);display:block;margin-bottom:.3rem">सामग्री</b><p style="font-size:.875rem;color:var(--neutral-600)">${t.items}</p></div></div></article>`).join('')}
      </div>
    </div></section>`,
  };
}
