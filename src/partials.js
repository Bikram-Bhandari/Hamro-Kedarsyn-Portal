/* Shared partials */
import { icon } from './icons.js';

export function pageHero(title, desc, crumbs = []) {
  const crumb = crumbs.map(([label, href]) => href ? `<a href="${href}" data-link>${label}</a>` : `<span>${label}</span>`).join('<span>›</span>');
  return `
  <section class="page-hero">
    <div class="container page-hero__inner">
      <nav class="breadcrumb">${crumb}</nav>
      <h1>${title}</h1>
      <p>${desc}</p>
    </div>
  </section>`;
}

export function mapIframe(q, zoom = 11) {
  return `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed" loading="lazy" title="नक्सा"></iframe>`;
}

export function cardGrid(items, cardFn) {
  return `<div class="grid grid--3 stagger">${items.map(cardFn).join('')}</div>`;
}

export function emptyState(msg) {
  return `<div class="empty">${icon.search}<p style="margin-top:1rem">${msg}</p></div>`;
}

export function shareRow(title) {
  return `
  <div class="info-box" style="margin-top:1.5rem">
    <h4>${icon.share} साझेदारी गर्नुहोस्</h4>
    <div class="social">
      <a href="https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" aria-label="फेसबुक">${icon.facebook}</a>
      <a href="https://wa.me/?text=${encodeURIComponent(title + ' ' + location.href)}" target="_blank" rel="noopener" aria-label="व्हाट्सएप">${icon.share}</a>
      <a href="mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(location.href)}" aria-label="इमेल">${icon.mail}</a>
    </div>
  </div>`;
}
