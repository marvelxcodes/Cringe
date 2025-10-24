# Database Setup Guide

## Supabase SQL Schema

Run these commands in your Supabase SQL Editor to set up the database:

### 1. Create Templates Table

```sql
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
```

### 2. Create Memes Table

```sql
CREATE TABLE IF NOT EXISTS memes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_memes_user_id ON memes(user_id);
CREATE INDEX IF NOT EXISTS idx_memes_template_id ON memes(template_id);
CREATE INDEX IF NOT EXISTS idx_memes_created_at ON memes(created_at DESC);
```

### 3. Enable Row Level Security

```sql
-- Enable RLS on both tables
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE memes ENABLE ROW LEVEL SECURITY;
```

### 4. Create RLS Policies

```sql
-- Templates: Allow public read access
CREATE POLICY "Allow public read access to templates"
  ON templates
  FOR SELECT
  USING (true);

-- Templates: Allow authenticated users to insert (optional)
CREATE POLICY "Allow authenticated insert to templates"
  ON templates
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Memes: Allow public read access
CREATE POLICY "Allow public read access to memes"
  ON memes
  FOR SELECT
  USING (true);

-- Memes: Allow anyone to insert (you can restrict this later)
CREATE POLICY "Allow public insert to memes"
  ON memes
  FOR INSERT
  WITH CHECK (true);

-- Memes: Allow users to update/delete their own memes (optional)
CREATE POLICY "Allow users to update own memes"
  ON memes
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete own memes"
  ON memes
  FOR DELETE
  USING (auth.uid() = user_id);
```

### 5. Seed Sample Templates

```sql
INSERT INTO templates (name, image_url, category) VALUES
  ('Distracted Boyfriend', 'https://i.imgflip.com/1ur9b0.jpg', 'funny'),
  ('Drake Hotline Bling', 'https://i.imgflip.com/30b1gx.jpg', 'dank'),
  ('Two Buttons', 'https://i.imgflip.com/1g8my4.jpg', 'funny'),
  ('Change My Mind', 'https://i.imgflip.com/24y43o.jpg', 'trending'),
  ('Success Kid', 'https://i.imgflip.com/1bhk.jpg', 'wholesome'),
  ('Disaster Girl', 'https://i.imgflip.com/23ls.jpg', 'funny'),
  ('Mocking SpongeBob', 'https://i.imgflip.com/1otk96.jpg', 'dank'),
  ('Bernie Sanders', 'https://i.imgflip.com/4t0m5.jpg', 'trending'),
  ('Woman Yelling at Cat', 'https://i.imgflip.com/345v97.jpg', 'funny'),
  ('Always Has Been', 'https://i.imgflip.com/46e43q.jpg', 'dank'),
  ('This Is Fine', 'https://i.imgflip.com/1wz3as.jpg', 'wholesome'),
  ('Expanding Brain', 'https://i.imgflip.com/1jwhww.jpg', 'dank')
ON CONFLICT DO NOTHING;
```

## Storage Bucket Setup

### 1. Create Memes Bucket

1. Go to Supabase Dashboard → Storage
2. Click "Create bucket"
3. Name: `memes`
4. Set to **Public** ✅
5. Click "Create bucket"

### 2. Configure Bucket Policies

```sql
-- Allow public uploads to memes bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('memes', 'memes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to read files
CREATE POLICY "Allow public read access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'memes');

-- Allow anyone to upload files (you can restrict this)
CREATE POLICY "Allow public insert access"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'memes');

-- Allow users to delete their own uploads (optional)
CREATE POLICY "Allow users to delete own files"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'memes' AND auth.uid() = owner);
```

## Verification

### Check Tables

```sql
-- List all templates
SELECT * FROM templates ORDER BY created_at DESC;

-- List all memes
SELECT * FROM memes ORDER BY created_at DESC;

-- Count templates by category
SELECT category, COUNT(*) 
FROM templates 
GROUP BY category;
```

### Check Storage

```sql
-- List all files in memes bucket
SELECT * FROM storage.objects WHERE bucket_id = 'memes';
```

## Optional: Add User Authentication

If you want to track which user created each meme:

```sql
-- Create profiles table (optional)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## Troubleshooting

### RLS Blocking Queries?

If you're getting permission errors, temporarily disable RLS for testing:

```sql
ALTER TABLE templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE memes DISABLE ROW LEVEL SECURITY;
```

**⚠️ Remember to re-enable RLS in production!**

### Storage Upload Issues?

Check:
1. Bucket is set to **public**
2. CORS is configured properly
3. File size limits (default: 50MB)

### Need to Reset?

```sql
-- Drop all policies
DROP POLICY IF EXISTS "Allow public read access to templates" ON templates;
DROP POLICY IF EXISTS "Allow public read access to memes" ON memes;
-- ... (drop all policies)

-- Drop tables
DROP TABLE IF EXISTS memes CASCADE;
DROP TABLE IF EXISTS templates CASCADE;

-- Delete storage bucket
DELETE FROM storage.buckets WHERE id = 'memes';
```

Then re-run the setup commands above.
