/* Content service — fetches live data from Supabase, falls back to static seed.
   The public website uses this so admin edits appear immediately.
   If Supabase is unreachable or a table is empty, static seed data is used. */
import { supabase } from './lib/supabase.js';
import {
  heroes as staticHeroes, touristPlaces, religiousSites, natureItems,
  cultureItems, foodItems, productItems, homestays, galleryItems,
  galleryCategories, videos, newsItems, events, about, stats, faqs, site as staticSite
} from './data.js';

const cache = {};

async function fetchTable(table, fallback) {
  if (cache[table]) return cache[table];
  try {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error || !data || !data.length) { cache[table] = fallback; return fallback; }
    cache[table] = data; return data;
  } catch { cache[table] = fallback; return fallback; }
}

export async function getHeroes() {
  const rows = await fetchTable('hero_slides', null);
  if (rows && rows.length) {
    return rows.filter(r => r.is_active).sort((a,b) => a.sort_order - b.sort_order).map(r => ({
      img: r.image_url, eyebrow: r.subtitle || 'केदारस्यूँ', title: r.title, desc: r.description || '',
    }));
  }
  return staticHeroes;
}

export async function getTouristPlaces() {
  const rows = await fetchTable('tourist_places', null);
  if (rows && rows.length) return rows.map(mapTourist);
  return touristPlaces;
}
function mapTourist(r) {
  return {
    id: r.id, title: r.title, badge: r.badge || 'पर्यटन',
    img: r.image_url, gallery: Array.isArray(r.gallery) && r.gallery.length ? r.gallery : [r.image_url].filter(Boolean),
    short: r.short_desc || '', desc: r.description || '',
    howToReach: r.how_to_reach || '', bestTime: r.best_time || '', tips: r.tips || [],
    mapQuery: r.map_query || 'Kedarsyun, Bajhang, Nepal',
  };
}

export async function getReligious() {
  const rows = await fetchTable('religious_sites', null);
  if (rows && rows.length) return rows.map(r => ({
    id: r.id, title: r.title, img: r.image_url, short: r.short_desc || '',
    desc: r.description || '', history: r.history || '', mapQuery: r.map_query || '',
  }));
  return religiousSites;
}

export async function getNature() {
  const rows = await fetchTable('nature_items', null);
  if (rows && rows.length) return rows.map(r => ({ id: r.id, title: r.title, cat: r.category, img: r.image_url, desc: r.description || '' }));
  return natureItems;
}

export async function getCulture() {
  const rows = await fetchTable('culture_items', null);
  if (rows && rows.length) return rows.map(r => ({ id: r.id, title: r.title, cat: r.category, img: r.image_url, desc: r.description || '' }));
  return cultureItems;
}

export async function getFood() {
  const rows = await fetchTable('food_items', null);
  if (rows && rows.length) return rows.map(r => ({ id: r.id, title: r.title, img: r.image_url, desc: r.description || '', items: r.ingredients || '' }));
  return foodItems;
}

export async function getProducts() {
  const rows = await fetchTable('product_items', null);
  if (rows && rows.length) return rows.map(r => ({ id: r.id, title: r.title, cat: r.category, img: r.image_url, desc: r.description || '' }));
  return productItems;
}

export async function getHomestays() {
  const rows = await fetchTable('homestays', null);
  if (rows && rows.length) return rows.map(r => ({
    id: r.id, title: r.title, img: r.image_url, desc: r.description || '',
    facilities: r.facilities || [], contact: r.contact || '', mapQuery: r.map_query || '',
  }));
  return homestays;
}

export async function getGallery() {
  const rows = await fetchTable('gallery_items', null);
  if (rows && rows.length) return rows.map(r => ({ cat: r.category, img: r.image_url, cap: r.caption || '' }));
  return galleryItems;
}

export async function getVideos() {
  const rows = await fetchTable('videos', null);
  if (rows && rows.length) return rows.map(r => ({ id: r.youtube_id, title: r.title, cat: r.category, thumb: r.thumbnail_url }));
  return videos;
}

export async function getNews() {
  const rows = await fetchTable('news_items', null);
  if (rows && rows.length) return rows.map(r => ({
    id: r.id, date: r.published_date || '', cat: r.category, title: r.title,
    img: r.image_url, excerpt: r.excerpt || '', content: r.content || '',
  }));
  return newsItems;
}

export async function getEvents() {
  const rows = await fetchTable('events', null);
  if (rows && rows.length) return rows.map(r => ({
    id: r.id, day: r.day, month: r.month, year: r.year, title: r.title,
    loc: r.location, time: r.event_time, desc: r.description || '', past: r.is_past,
  }));
  return events;
}

export async function getSettings() {
  try {
    const { data } = await supabase.from('site_settings').select('*').maybeSingle();
    if (data) return { ...staticSite, name: data.site_name || staticSite.name, tagline: data.tagline || staticSite.tagline, phone: data.phone || staticSite.phone, email: data.email || staticSite.email, address: data.address || staticSite.address, mapQuery: data.map_query || staticSite.mapQuery, social: { facebook: data.facebook || staticSite.social.facebook, instagram: data.instagram || staticSite.social.instagram, youtube: data.youtube || staticSite.social.youtube, tiktok: data.tiktok || staticSite.social.tiktok } };
  } catch {}
  return staticSite;
}

export { galleryCategories, about, stats, faqs };
