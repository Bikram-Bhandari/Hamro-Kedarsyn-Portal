/* Global search — searches live data from Supabase with static fallback */
import { getTouristPlaces, getReligious, getNature, getCulture, getFood, getProducts, getHomestays, getNews, getEvents } from './content.js';

let _cache = null;
async function loadAll() {
  if (_cache) return _cache;
  const [tourist, religious, nature, culture, food, products, homestays, news, events] = await Promise.all([
    getTouristPlaces(), getReligious(), getNature(), getCulture(),
    getFood(), getProducts(), getHomestays(), getNews(), getEvents(),
  ]);
  _cache = { tourist, religious, nature, culture, food, products, homestays, news, events };
  return _cache;
}

export async function searchAll(q) {
  const query = q.toLowerCase().trim();
  if (!query) return [];
  const d = await loadAll();
  const out = [];
  const push = (type, title, href) => out.push({ type, title, href });
  d.tourist.forEach(t => { if (t.title.toLowerCase().includes(query) || (t.short||'').toLowerCase().includes(query)) push('पर्यटकीय स्थल', t.title, `/tourist/${t.id}`); });
  d.religious.forEach(t => { if (t.title.toLowerCase().includes(query) || (t.short||'').toLowerCase().includes(query)) push('धार्मिक स्थल', t.title, '/religious'); });
  d.nature.forEach(t => { if (t.title.toLowerCase().includes(query)) push('प्राकृतिक सम्पदा', t.title, '/nature'); });
  d.culture.forEach(t => { if (t.title.toLowerCase().includes(query) || (t.desc||'').toLowerCase().includes(query)) push('संस्कृति', t.title, '/culture'); });
  d.food.forEach(t => { if (t.title.toLowerCase().includes(query)) push('स्थानीय परिकार', t.title, '/food'); });
  d.products.forEach(t => { if (t.title.toLowerCase().includes(query)) push('स्थानीय उत्पादन', t.title, '/products'); });
  d.homestays.forEach(t => { if (t.title.toLowerCase().includes(query)) push('होमस्टे', t.title, '/homestay'); });
  d.news.forEach(n => { if (n.title.toLowerCase().includes(query) || n.excerpt.toLowerCase().includes(query)) push('समाचार', n.title, `/news/${n.id}`); });
  d.events.forEach(e => { if (e.title.toLowerCase().includes(query) || (e.desc||'').toLowerCase().includes(query)) push('कार्यक्रम', e.title, '/events'); });
  return out.slice(0, 12);
}
