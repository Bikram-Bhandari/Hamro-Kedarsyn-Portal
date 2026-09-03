/* हाम्रो केदारस्यूँ — About / municipality info */
import { about, stats } from '../data.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export function renderAbout() {
  return {
    html: `
    ${pageHero('हाम्रो केदारस्यूँ', 'गाउँपालिकाको परिचय, इतिहास, भूगोल, जनसंख्या र वडा विवरण', [['गृहपृष्ठ','/'],['हाम्रो केदारस्यूँ','/about']])}

    <section class="section">
      <div class="container">
        <div class="detail">
          <div class="detail__main">
            <div class="reveal">
              <span class="eyebrow">गाउँपालिकाको परिचय</span>
              <h2>केदारस्यूँ <span class="text-gradient">गाउँपालिका</span></h2>
              <p class="lead" style="margin:1rem 0">${about.intro}</p>
              <div class="prose">
                <p>${about.intro} यो गाउँपालिका वि.सं. २०७३ मा तत्कालीन गाविसहरूलाई एकीकरण गरी गठन भएको हो। हाल यसमा ९ वटा वडा रहेका छन्।</p>
              </div>
            </div>

            <div class="info-box reveal" id="itihas" style="margin-top:2rem">
              <h4>${icon.book} इतिहास</h4>
              <div class="prose"><p>${about.history}</p></div>
            </div>

            <div class="info-box reveal" id="bhugol" style="margin-top:1.5rem">
              <h4>${icon.globe} भूगोल</h4>
              <div class="prose"><p>${about.geography}</p></div>
            </div>

            <div class="info-box reveal" id="janjana" style="margin-top:1.5rem">
              <h4>${icon.users} जनसंख्या</h4>
              <div class="prose"><p>${about.population}</p></div>
            </div>

            <div class="reveal" id="wada" style="margin-top:2rem">
              <h3 style="margin-bottom:1rem">वडा विवरण</h3>
              <div class="grid grid--3 stagger">
                ${about.wardData.map(w => `
                  <div class="card">
                    <div class="card__body">
                      <h4 class="card__title">${w.name}</h4>
                      <p class="card__text">${w.desc}</p>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>

          <aside class="sidebar">
            <div class="info-box reveal">
              <h4>${icon.info} प्रशासनिक जानकारी</h4>
              <div class="info-row"><b>स्थापना</b><span>${about.established}</span></div>
              <div class="info-row"><b>क्षेत्रफल</b><span>${about.area}</span></div>
              <div class="info-row"><b>वडा संख्या</b><span>${about.wards} वटा</span></div>
              <div class="info-row"><b>कार्यालय</b><span>${about.office}</span></div>
              <div class="info-row"><b>प्रदेश</b><span>सुदूरपश्चिम</span></div>
              <div class="info-row"><b>जिल्ला</b><span>बझाङ</span></div>
            </div>
            <div class="info-box reveal">
              <h4>${icon.map} नक्सा</h4>
              <div class="map-embed">${mapIframe('Kedarsyun Rural Municipality, Bajhang, Nepal')}</div>
            </div>
            <div class="cta-band reveal" style="padding:1.5rem">
              <div class="cta-band__inner">
                <h4 style="color:#fff;margin-bottom:.5rem">सम्पर्क गर्नुहोस्</h4>
                <p style="font-size:.9rem;margin-bottom:1rem">जानकारीका लागि हामीलाई फोन गर्नुहोस्।</p>
                <a href="/contact" class="btn btn--accent" data-link>${icon.phone} सम्पर्क</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="section--tight section--alt">
      <div class="container">
        <div class="stats reveal stagger">
          ${stats.map(s => `<div class="stat"><div class="stat__num">${s.num}</div><div class="stat__label">${s.label}</div></div>`).join('')}
        </div>
      </div>
    </section>
    `,
  };
}

function mapIframe(q) {
  return `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=11&output=embed" loading="lazy" title="नक्सा"></iframe>`;
}
