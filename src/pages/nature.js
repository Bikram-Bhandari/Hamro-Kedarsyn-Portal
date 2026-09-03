/* प्राकृतिक सम्पदा (live data) */
import { getNature } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderNature() {
  const items = await getNature();
  const cats = ['सबै', ...new Set(items.map(n => n.cat))];
  return {
    html: `
    ${pageHero('प्राकृतिक सम्पदा', 'नदी, झरना, जंगल, पहाड र दृश्यावलोकन स्थल', [['गृहपृष्ठ','/'],['प्राकृतिक सम्पदा','/nature']])}
    <section class="section"><div class="container">
      <div class="tabs reveal" id="natureTabs">${cats.map((c, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="grid grid--3 stagger" id="natureGrid">
        ${items.map(t => `<article class="card" data-cat="${t.cat}"><div class="card__media"><img src="${t.img}" alt="${t.title}" loading="lazy"><span class="card__badge">${icon.leaf} ${t.cat}</span></div><div class="card__body"><h3 class="card__title">${t.title}</h3><p class="card__text">${t.desc}</p></div></article>`).join('')}
      </div>
    </div></section>`,
    mount() {
      document.querySelectorAll('#natureTabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#natureTabs .tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const cat = tab.dataset.cat;
          document.querySelectorAll('#natureGrid .card').forEach(c => { c.style.display = (cat === 'सबै' || c.dataset.cat === cat) ? '' : 'none'; });
        });
      });
      return null;
    }
  };
}
