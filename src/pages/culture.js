/* संस्कृति (live data) */
import { getCulture } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderCulture() {
  const items = await getCulture();
  return {
    html: `
    ${pageHero('संस्कृति', 'देउडा, नृत्य, भेषभूषा, संस्कार र चाडपर्व — केदारस्यूँको सांस्कृतिक पहिचान', [['गृहपृष्ठ','/'],['संस्कृति','/culture']])}
    <section class="section"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">सांस्कृतिक पहिचान</span><h2>पुस्तौंदेखिको <span class="text-gradient">परम्परा</span></h2><p>देउडा, भेषभूषा, संस्कार र चाडपर्व — केदारस्यूँको सम्पन्न सांस्कृतिक संसार।</p></div>
      <div class="grid grid--2 stagger">
        ${items.map(t => `<article class="card" style="flex-direction:row"><div class="card__media" style="width:45%;aspect-ratio:1/1;flex-shrink:0"><img src="${t.img}" alt="${t.title}" loading="lazy"></div><div class="card__body"><span class="tag">${t.cat}</span><h3 class="card__title" style="margin-top:.5rem">${t.title}</h3><p class="card__text" style="-webkit-line-clamp:unset">${t.desc}</p></div></article>`).join('')}
      </div>
    </div></section>
    <section class="section section--alt"><div class="container">
      <div class="cta-band reveal"><div class="cta-band__inner"><h2>देउडा — सुदूरपश्चिमको दिल</h2><p>देउडा सुदूरपश्चिम प्रदेशको पहिचानको नृत्य हो। गोलो घेरा बनाएर गाइने यो नृत्य विवाह, चाडपर्व र मेलामा अनिवार्य हुन्छ।</p><a href="/videos" class="btn btn--accent btn--lg" data-link>${icon.video} देउडा भिडियो हेर्नुहोस्</a></div></div>
    </div></section>`,
  };
}
