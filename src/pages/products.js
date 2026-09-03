/* स्थानीय उत्पादन (live data) */
import { getProducts } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderProducts() {
  const items = await getProducts();
  const cats = ['सबै', ...new Set(items.map(p => p.cat))];
  return {
    html: `
    ${pageHero('स्थानीय उत्पादन', 'कृषि उत्पादन, मह, जडीबुटी र हस्तकला — केदारस्यूँका स्थानीय उत्पादन', [['गृहपृष्ठ','/'],['स्थानीय उत्पादन','/products']])}
    <section class="section"><div class="container">
      <div class="tabs reveal" id="prodTabs">${cats.map((c, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="grid grid--3 stagger" id="prodGrid">
        ${items.map(t => `<article class="card" data-cat="${t.cat}"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${icon.shopping} ${t.cat}</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.desc}</p></div></article>`).join('')}
      </div>
    </div></section>`,
    mount() {
      document.querySelectorAll('#prodTabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#prodTabs .tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const cat = tab.dataset.cat;
          document.querySelectorAll('#prodGrid .card').forEach(c => { c.style.display = (cat === 'सबै' || c.dataset.cat === cat) ? '' : 'none'; });
        });
      });
      return null;
    }
  };
}
