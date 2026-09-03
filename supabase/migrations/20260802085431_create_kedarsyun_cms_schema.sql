/*
# हाम्रो केदारस्यूँ — CMS Content Schema

## Purpose
Creates all content tables for the Kedarsyun tourism portal CMS.
The public website reads content (anon role), while only the
authenticated administrator can create, update, or delete content.

## New Tables (14)
1. hero_slides      — homepage hero banner slides
2. tourist_places   — tourist destinations with gallery + map
3. religious_sites  — temples and sacred sites
4. nature_items     — rivers, waterfalls, forests, hills, viewpoints
5. culture_items    — deuda, dance, dress, traditions, festivals
6. food_items       — local cuisine
7. product_items    — local products (honey, herbs, handicrafts)
8. homestays        — homestay listings with facilities + map
9. gallery_items    — photo gallery (category-tagged)
10. videos          — video gallery (YouTube + local)
11. news_items      — news articles
12. events          — upcoming and past events
13. site_settings   — singleton: site name, tagline, contact, social
14. contact_messages— submissions from the public contact form

## Security Model
- Public content tables (1-12): SELECT open to anon+authenticated
  (the website must read these without login). Writes restricted
  to authenticated (the admin).
- site_settings: same as above.
- contact_messages: INSERT open to anon+authenticated (anyone can
  submit the contact form). SELECT restricted to authenticated
  (only admin reads messages). No UPDATE/DELETE for anon.
- RLS enabled on every table. 4 separate policies per table
  (select/insert/update/delete) — no FOR ALL.
*/

-- 1. Hero slides
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  image_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 2. Tourist places
CREATE TABLE IF NOT EXISTS tourist_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_desc text,
  description text,
  image_url text,
  gallery jsonb DEFAULT '[]',
  how_to_reach text,
  best_time text,
  tips jsonb DEFAULT '[]',
  map_query text,
  badge text DEFAULT 'पर्यटन',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Religious sites
CREATE TABLE IF NOT EXISTS religious_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_desc text,
  description text,
  image_url text,
  history text,
  map_query text,
  created_at timestamptz DEFAULT now()
);

-- 4. Nature items
CREATE TABLE IF NOT EXISTS nature_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- 5. Culture items
CREATE TABLE IF NOT EXISTS culture_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- 6. Food items
CREATE TABLE IF NOT EXISTS food_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  ingredients text,
  created_at timestamptz DEFAULT now()
);

-- 7. Product items
CREATE TABLE IF NOT EXISTS product_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- 8. Homestays
CREATE TABLE IF NOT EXISTS homestays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  facilities jsonb DEFAULT '[]',
  contact text,
  map_query text,
  created_at timestamptz DEFAULT now()
);

-- 9. Gallery items
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- 10. Videos
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  youtube_id text,
  thumbnail_url text,
  created_at timestamptz DEFAULT now()
);

-- 11. News items
CREATE TABLE IF NOT EXISTS news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  image_url text,
  category text,
  published_date text,
  created_at timestamptz DEFAULT now()
);

-- 12. Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  event_time text,
  day text,
  month text,
  year text,
  is_past boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 13. Site settings (singleton — one row, id fixed)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL DEFAULT 'हाम्रो केदारस्यूँ',
  tagline text,
  phone text,
  email text,
  address text,
  map_query text,
  facebook text,
  instagram text,
  youtube text,
  tiktok text,
  footer_text text,
  copyright_text text,
  updated_at timestamptz DEFAULT now()
);

-- 14. Contact messages (from public contact form)
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  subject text,
  message text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============ Enable RLS on all tables ============
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourist_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE religious_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE nature_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE culture_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE homestays ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============ Policies for public content tables ============
-- Pattern: anon+authenticated SELECT (public), authenticated-only writes (admin)
-- Using a DO block to apply the same pattern to multiple tables

DO $$
DECLARE
  t text;
  tbls text[] := ARRAY[
    'hero_slides','tourist_places','religious_sites','nature_items',
    'culture_items','food_items','product_items','homestays',
    'gallery_items','videos','news_items','events','site_settings'
  ];
  lbl text;
BEGIN
  FOREACH t IN ARRAY tbls LOOP
    lbl := t;
    -- SELECT: public read
    EXECUTE format('DROP POLICY IF EXISTS "public_read_%s" ON %s;', lbl, t);
    EXECUTE format('CREATE POLICY "public_read_%s" ON %s FOR SELECT TO anon, authenticated USING (true);', lbl, t);
    -- INSERT: admin only
    EXECUTE format('DROP POLICY IF EXISTS "admin_insert_%s" ON %s;', lbl, t);
    EXECUTE format('CREATE POLICY "admin_insert_%s" ON %s FOR INSERT TO authenticated WITH CHECK (true);', lbl, t);
    -- UPDATE: admin only
    EXECUTE format('DROP POLICY IF EXISTS "admin_update_%s" ON %s;', lbl, t);
    EXECUTE format('CREATE POLICY "admin_update_%s" ON %s FOR UPDATE TO authenticated USING (true) WITH CHECK (true);', lbl, t);
    -- DELETE: admin only
    EXECUTE format('DROP POLICY IF EXISTS "admin_delete_%s" ON %s;', lbl, t);
    EXECUTE format('CREATE POLICY "admin_delete_%s" ON %s FOR DELETE TO authenticated USING (true);', lbl, t);
  END LOOP;
END $$;

-- ============ Policies for contact_messages ============
-- Anyone can submit (anon INSERT), only admin can read/delete (authenticated)
DROP POLICY IF EXISTS "admin_read_messages" ON contact_messages;
CREATE POLICY "admin_read_messages" ON contact_messages
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "public_submit_message" ON contact_messages;
CREATE POLICY "public_submit_message" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_message" ON contact_messages;
CREATE POLICY "admin_update_message" ON contact_messages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_message" ON contact_messages;
CREATE POLICY "admin_delete_message" ON contact_messages
  FOR DELETE TO authenticated USING (true);

-- ============ Seed site_settings with a default row ============
INSERT INTO site_settings (site_name, tagline, phone, email, address, map_query, facebook, instagram, youtube, tiktok, footer_text, copyright_text)
SELECT 'हाम्रो केदारस्यूँ', 'प्राकृतिक सौन्दर्य, संस्कृति, सम्पदा र पर्यटनको डिजिटल परिचय',
  '०९४-५४००१२', 'info@kedarsyun.gov.np', 'केदारस्यूँ गाउँपालिका, बझाङ, सुदूरपश्चिम प्रदेश, नेपाल',
  'Kedarsyun Rural Municipality, Bajhang, Nepal',
  'https://facebook.com', 'https://instagram.com', 'https://youtube.com', 'https://tiktok.com',
  'बझाङ · सुदूरपश्चिम प्रदेश · नेपाल', '© २०८२ हाम्रो केदारस्यूँ। सर्वाधिकार सुरक्षित।'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- ============ Indexes ============
CREATE INDEX IF NOT EXISTS idx_tourist_places_featured ON tourist_places(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_items_created ON news_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_is_past ON events(is_past);
CREATE INDEX IF NOT EXISTS idx_gallery_items_cat ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
