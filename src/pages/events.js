/* कार्यक्रम (live data) */
import { getEvents } from '../content.js';
import { icon } from '../icons.js';
import { pageHero } from '../partials.js';

export async function renderEvents() {
  const items = await getEvents();
  const upcoming = items.filter(e => !e.past);
  const past = items.filter(e => e.past);
  return {
    html: `
    ${pageHero('कार्यक्रम', 'आगामी र विगतका कार्यक्रम — चाडपर्व, मेला र सांस्कृतिक गतिविधि', [['गृहपृष्ठ','/'],['कार्यक्रम','/events']])}
    <section class="section"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">आगामी कार्यक्रम</span><h2>भाग लिनुहोस् — <span class="text-gradient">उत्सवमा</span></h2></div>
      <div class="grid grid--2 stagger">${upcoming.map(e => eventCard(e, false)).join('')}</div>
    </div></section>
    <section class="section section--alt"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">विगतका कार्यक्रम</span><h2>सम्पन्न <span class="text-gradient">कार्यक्रम</span></h2></div>
      <div class="grid grid--2 stagger">${past.map(e => eventCard(e, true)).join('')}</div>
    </div></section>`,
  };
}

function eventCard(e, past) {
  return `<article class="event-card" ${past ? 'style="opacity:.85"' : ''}><div class="event-date" ${past ? 'style="background:var(--neutral-400)"' : ''}><b>${e.day}</b><span>${e.month} ${e.year}</span></div><div class="event-card__body">${past ? '<span class="tag" style="margin-bottom:.5rem">सम्पन्न</span><br>' : ''}<h4 class="event-card__title">${e.title}</h4><div class="event-card__meta"><span>${icon.pin} ${e.loc}</span><span>${icon.clock} ${e.time}</span></div><p class="event-card__text">${e.desc}</p></div></article>`;
}
