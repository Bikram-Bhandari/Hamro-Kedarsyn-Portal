/* भिडियो ग्यालरी (live data) */
import { getVideos } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderVideos() {
  const items = await getVideos();
  const cats = ['सबै', ...new Set(items.map(v => v.cat))];
  return {
    html: `
    ${pageHero('भिडियो ग्यालरी', 'केदारस्यूँका सुन्दर क्षण र सांस्कृतिक भिडियो', [['गृहपृष्ठ','/'],['भिडियो ग्यालरी','/videos']])}
    <section class="section"><div class="container">
      <div class="tabs reveal" id="vidTabs">${cats.map((c, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="grid grid--3 stagger" id="vidGrid">
        ${items.map(v => `<div class="video-card" data-video="${v.id}" data-title="${v.title}" data-cat="${v.cat}"><img src="${v.thumb}" alt="${v.title}" loading="lazy"><div class="video-card__play"><span>${icon.play}</span></div><div class="video-card__cap"><b>${v.title}</b><span>${v.cat}</span></div></div>`).join('')}
      </div>
    </div></section>`,
    mount() {
      document.querySelectorAll('#vidTabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#vidTabs .tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const cat = tab.dataset.cat;
          document.querySelectorAll('#vidGrid .video-card').forEach(c => { c.style.display = (cat === 'सबै' || c.dataset.cat === cat) ? '' : 'none'; });
        });
      });
      document.querySelectorAll('[data-video]').forEach(el => {
        el.addEventListener('click', () => window.openVideoModal(el.dataset.video, el.dataset.title));
      });
      return null;
    }
  };
}
