-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, category, label, description) VALUES
  ('site_name', 'Si-Chic', 'general', 'Nom du site', 'Le nom de votre boutique'),
  ('site_description', 'Votre destination mode pour un style élégant et moderne', 'general', 'Description du site', 'Description courte de votre boutique'),
  ('contact_phone', '+221784624991', 'contact', 'Téléphone', 'Numéro de téléphone WhatsApp'),
  ('contact_email', 'contact@si-chic.sn', 'contact', 'Email', 'Adresse email de contact'),
  ('contact_address', 'DD 33 Derklé, Dakar, Sénégal', 'contact', 'Adresse', 'Adresse physique de la boutique'),
  ('about_title', 'Pourquoi Si-Chic', 'about', 'Titre À Propos', 'Titre de la section À Propos'),
  ('about_description', 'Depuis 3 ans, nous nous engageons à offrir des vêtements qui allient style moderne, qualité premium et respect des valeurs', 'about', 'Description À Propos', 'Description de la section À Propos'),
  ('hero_title', 'Élégance & Modernité', 'hero', 'Titre Hero', 'Titre principal de la page d''accueil'),
  ('hero_subtitle', 'Découvrez notre collection exclusive de vêtements qui allient style contemporain et respect des valeurs', 'hero', 'Sous-titre Hero', 'Sous-titre de la page d''accueil')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- Create policy to allow service role full access
CREATE POLICY "Allow service role full access" ON site_settings
  FOR ALL USING (true);
