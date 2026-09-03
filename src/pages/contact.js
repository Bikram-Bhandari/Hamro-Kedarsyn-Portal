/* सम्पर्क (live settings + submit to Supabase) */
import { getSettings, faqs } from '../content.js';
import { supabase } from '../lib/supabase.js';
import { icon } from '../icons.js';
import { pageHero, mapIframe } from '../partials.js';

export async function renderContact() {
  const site = await getSettings();
  return {
    html: `
    ${pageHero('सम्पर्क', 'केदारस्यूँ गाउँपालिकासँग सम्पर्क गर्नुहोस्', [['गृहपृष्ठ','/'],['सम्पर्क','/contact']])}
    <section class="section"><div class="container">
      <div class="contact-grid">
        <div class="reveal">
          <h2 style="margin-bottom:.5rem">सम्पर्क जानकारी</h2>
          <p class="lead" style="margin-bottom:1.5rem">तपाईंका प्रश्न, सुझाव वा भ्रमण योजनाका लागि हामीसँग सम्पर्क गर्नुहोस्।</p>
          <div class="contact-info">
            <div class="contact-item"><span class="contact-item__icon">${icon.pin}</span><div><b>ठेगाना</b><span>${site.address}</span></div></div>
            <div class="contact-item"><span class="contact-item__icon">${icon.phone}</span><div><b>फोन</b><a href="tel:${site.phoneRaw||site.phone}">${site.phone}</a></div></div>
            <div class="contact-item"><span class="contact-item__icon">${icon.mail}</span><div><b>इमेल</b><a href="mailto:${site.email}">${site.email}</a></div></div>
            <div class="contact-item"><span class="contact-item__icon">${icon.clock}</span><div><b>कार्यालय समय</b><span>बिहान ९:०० — दिउँसो ५:०० (आइतबार बन्द)</span></div></div>
          </div>
          <div style="margin-top:1.5rem"><b style="display:block;margin-bottom:.75rem">सामाजिक सञ्जाल</b>
            <div class="social">
              <a href="${site.social?.facebook||'#'}" target="_blank" rel="noopener" aria-label="फेसबुक">${icon.facebook}</a>
              <a href="${site.social?.instagram||'#'}" target="_blank" rel="noopener" aria-label="इन्स्टाग्राम">${icon.instagram}</a>
              <a href="${site.social?.youtube||'#'}" target="_blank" rel="noopener" aria-label="युट्युब">${icon.youtube}</a>
              <a href="${site.social?.tiktok||'#'}" target="_blank" rel="noopener" aria-label="टिकटक">${icon.tiktok}</a>
            </div>
          </div>
        </div>
        <div class="reveal reveal-d2">
          <form class="form" id="contactForm" novalidate>
            <h3 style="margin-bottom:1rem">सन्देश पठाउनुहोस्</h3>
            <div class="form__row">
              <div class="form__group"><label>नाम *</label><input type="text" name="name" required placeholder="तपाईंको नाम"></div>
              <div class="form__group"><label>फोन नम्बर *</label><input type="tel" name="phone" required placeholder="९८XXXXXXXX"></div>
            </div>
            <div class="form__group"><label>इमेल</label><input type="email" name="email" placeholder="example@email.com"></div>
            <div class="form__group"><label>विषय *</label><input type="text" name="subject" required placeholder="सन्देशको विषय"></div>
            <div class="form__group"><label>सन्देश *</label><textarea name="message" required placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."></textarea></div>
            <button type="submit" class="btn btn--primary btn--block btn--lg">${icon.send} सन्देश पठाउनुहोस्</button>
            <div class="form__msg form__msg--ok" id="formOk">धन्यवाद ! तपाईंको सन्देश प्राप्त भयो। हामी चाँडै सम्पर्क गर्नेछौं।</div>
            <div class="form__msg form__msg--err" id="formErr">कृपया सबै आवश्यक ठाउँ भर्नुहोस्।</div>
          </form>
        </div>
      </div>
    </div></section>
    <section class="section--tight section--alt"><div class="container"><div class="reveal"><div class="map-embed" style="aspect-ratio:21/9">${mapIframe(site.mapQuery, 10)}</div></div></div></section>
    <section class="section"><div class="container">
      <div class="section-head reveal"><span class="eyebrow">प्रश्नोत्तर</span><h2>बारम्बार सोधिने <span class="text-gradient">प्रश्न</span></h2></div>
      <div class="grid grid--2 stagger">${faqs.map(f => `<div class="info-box"><h4>${icon.info} ${f.q}</h4><p style="font-size:.9375rem;color:var(--neutral-600)">${f.a}</p></div>`).join('')}</div>
    </div></section>`,
    mount() {
      const form = document.getElementById('contactForm');
      const ok = document.getElementById('formOk');
      const err = document.getElementById('formErr');
      const submitBtn = form?.querySelector('button[type="submit"]');
      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        ok.classList.remove('show'); err.classList.remove('show');
        const req = form.querySelectorAll('[required]');
        let valid = true;
        req.forEach(f => { if (!f.value.trim()) { valid = false; f.style.borderColor = 'var(--error)'; } else { f.style.borderColor = ''; } });
        if (!valid) { err.classList.add('show'); return; }
        const fd = new FormData(form);
        const payload = Object.fromEntries(fd);
        submitBtn.disabled = true; submitBtn.textContent = 'पठाइँदै...';
        const { error } = await supabase.from('contact_messages').insert(payload);
        submitBtn.disabled = false; submitBtn.innerHTML = icon.send + ' सन्देश पठाउनुहोस्';
        if (error) { err.textContent = 'सन्देश पठाउन असफल। कृपया पछि प्रयास गर्नुहोस्।'; err.classList.add('show'); return; }
        ok.classList.add('show'); form.reset();
        setTimeout(() => ok.classList.remove('show'), 5000);
      });
      return null;
    }
  };
}
