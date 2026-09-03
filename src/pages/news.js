/* समाचार page */
import { getNews } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderNews() {
  const items = await getNews();
  const cats = ['सबै', ...new Set(items.map(n => n.cat))];
  return {
    html: `
    ${pageHero('समाचार', 'केदारस्यूँ गाउँपालिकाका पछिल्ला समाचार र जानकारी', [['गृहपृष्ठ','/'],['समाचार','/news']])}
    <section class="section"><div class="container">
      <div class="news-tabs" id="newsTabs">
        ${cats.map((c, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
      </div>
      <div class="news-grid stagger" id="newsList">
        ${items.map(n => newsCard(n)).join('')}
      </div>
    </div></section>`,
    mount() {
      document.querySelectorAll('#newsTabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#newsTabs .tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const cat = tab.dataset.cat;
          document.querySelectorAll('#newsList .nc').forEach(c => {
            c.style.display = (cat === 'सबै' || c.dataset.cat === cat) ? '' : 'none';
          });
        });
      });
      return null;
    }
  };
}

function newsCard(n) {
  return `
  <article class="nc" data-cat="${n.cat}">
    <a href="/news/${n.id}" class="nc__media" data-link>
      <img src="${n.img}" alt="${n.title}" loading="lazy">
      <span class="nc__cat">${n.cat}</span>
    </a>
    <div class="nc__body">
      <h3 class="nc__title"><a href="/news/${n.id}" data-link>${n.title}</a></h3>
      <p class="nc__desc">${n.excerpt}</p>
    </div>
  </article>`;
}

export async function renderNewsDetail(id) {
  const items = await getNews();
  const n = items.find(x => x.id === id);
  if (!n) return null;
  const related = items.filter(x => x.id !== id).slice(0, 3);
  return {
    html: `
    ${pageHero(n.title, n.excerpt, [['गृहपृष्ठ','/'],['समाचार','/news'],[n.cat,`/news/${n.id}`]])}
    <section class="section"><div class="container">
      <div class="detail">
        <div class="detail__main">
          <div class="detail__hero reveal"><img src="${n.img}" alt="${n.title}"></div>
          <div class="prose reveal">
            <p><span class="news-card__date">${icon.calendar} ${n.date}</span> · <span class="tag">${n.cat}</span></p>
            <h3>${n.title}</h3>
            <p>${n.excerpt}</p>
            <p>${n.content || n.excerpt}</p>
          </div>
        </div>
        <aside class="sidebar">
          <div class="info-box reveal"><h4>${icon.news} सम्बन्धित समाचार</h4>
            <div style="display:flex;flex-direction:column;gap:1rem">
              ${related.map(r => `<a href="/news/${r.id}" data-link style="display:flex;gap:.75rem;align-items:center"><img src="${r.img}" alt="${r.title}" style="width:64px;height:64px;border-radius:.5rem;object-fit:cover;flex-shrink:0"><span><b style="display:block;font-size:.875rem;color:var(--neutral-900);line-height:1.3">${r.title}</b><span style="font-size:.75rem;color:var(--neutral-500)">${r.date}</span></span></a>`).join('')}
            </div>
          </div>
        </aside>
      </div>
    </div></section>`,
  };
}
