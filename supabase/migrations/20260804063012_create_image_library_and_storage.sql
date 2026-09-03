/*
# Image Library Table + Storage Bucket

## Purpose
Creates an `image_library` table and a Supabase Storage bucket `images`
so the admin can upload images once and reuse their public URL across
all content sections (tourist places, gallery, news, etc.).

## New Table
- `image_library`
  - `id` (uuid, primary key)
  - `url` (text, not null) — public URL of the image
  - `filename` (text) — original filename
  - `label` (text) — optional caption/label for searching
  - `category` (text) — optional category tag
  - `created_at` (timestamptz)

## Storage
- Creates bucket `images` (public)
- Policies: authenticated can upload/update/delete; anon+authenticated can read

## Security
- RLS enabled on `image_library`
- SELECT: anon + authenticated (public images)
- INSERT/UPDATE/DELETE: authenticated only (admin)
*/

CREATE TABLE IF NOT EXISTS image_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  filename text,
  label text,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE image_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_image_library" ON image_library;
CREATE POLICY "public_read_image_library" ON image_library
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_image_library" ON image_library;
CREATE POLICY "admin_insert_image_library" ON image_library
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_image_library" ON image_library;
CREATE POLICY "admin_update_image_library" ON image_library
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_image_library" ON image_library;
CREATE POLICY "admin_delete_image_library" ON image_library
  FOR DELETE TO authenticated USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "public_read_images_bucket" ON storage.objects;
CREATE POLICY "public_read_images_bucket" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'images');

DROP POLICY IF EXISTS "admin_upload_images_bucket" ON storage.objects;
CREATE POLICY "admin_upload_images_bucket" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "admin_update_images_bucket" ON storage.objects;
CREATE POLICY "admin_update_images_bucket" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'images') WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "admin_delete_images_bucket" ON storage.objects;
CREATE POLICY "admin_delete_images_bucket" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');

CREATE INDEX IF NOT EXISTS idx_image_library_created ON image_library(created_at DESC);
