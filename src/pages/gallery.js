/* फोटो ग्यालरी (live data) */
import { getGallery, galleryCategories } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderGallery() {
  const items = await getGallery();
  const cats = ['सबै', ...new Set(items.map(g => g.cat))];
  return {
    html: `
    ${pageHero('फोटो ग्यालरी', 'केदारस्यूँका रमणीय दृश्य — वर्गानुसार तस्वीर संगालो', [['गृहपृष्ठ','/'],['फोटो ग्यालरी','/gallery']])}
    <section class="section"><div class="container">
      <div class="tabs reveal" id="galTabs">${cats.map((c, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="gallery-grid stagger" id="galGrid">
        ${items.map((g, i) => `<div class="gallery-item" data-cat="${g.cat}" data-idx="${i}"><img src="${g.img}" alt="${g.cap||''}" loading="lazy"><div class="gallery-item__cap">${icon.camera} ${g.cap||''}</div></div>`).join('')}
      </div>
    </div></section>`,
    mount() {
      const all = [...document.querySelectorAll('#galGrid .gallery-item')];
      document.querySelectorAll('#galTabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#galTabs .tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const cat = tab.dataset.cat;
          all.forEach(el => { el.style.display = (cat === 'सबै' || el.dataset.cat === cat) ? '' : 'none'; });
        });
      });
      all.forEach(el => {
        el.addEventListener('click', () => {
          const visible = all.filter(x => x.style.display !== 'none');
          const imgs = visible.map(x => items[+x.dataset.idx].img);
          window.openLightbox(imgs, visible.indexOf(el));
        });
      });
      return null;
    }
  };
}
