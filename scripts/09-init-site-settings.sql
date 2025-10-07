-- Initialize site settings with default values
-- This script creates all the settings that can be modified from the admin

-- Clear existing settings
TRUNCATE TABLE site_settings;

-- General Settings
INSERT INTO site_settings (key, value, category, label, description) VALUES
('site_name', 'Si-Chic', 'general', 'Nom du Site', 'Le nom de votre boutique'),
('site_tagline', 'L''élégance à la sénégalaise', 'general', 'Slogan', 'Le slogan de votre boutique'),
('whatsapp_number', '+221 78 462 49 91', 'contact', 'Numéro WhatsApp', 'Numéro WhatsApp pour les commandes');

-- Contact Information
INSERT INTO site_settings (key, value, category, label, description) VALUES
('contact_email', 'contact@sichic.sn', 'contact', 'Email', 'Adresse email de contact'),
('contact_phone', '+221 78 462 49 91', 'contact', 'Téléphone', 'Numéro de téléphone'),
('contact_address', 'Dakar, Sénégal', 'contact', 'Adresse', 'Adresse physique de la boutique');

-- About Section
INSERT INTO site_settings (key, value, category, label, description) VALUES
('about_title', 'Pourquoi Si-Chic', 'about', 'Titre À Propos', 'Titre de la section À Propos'),
('about_description', 'Depuis 3 ans, nous nous engageons à offrir des vêtements qui allient style moderne, qualité premium et respect des valeurs', 'about', 'Description À Propos', 'Description de la section À Propos');

-- Hero Section
INSERT INTO site_settings (key, value, category, label, description) VALUES
('hero_title', 'Collection Exclusive', 'hero', 'Titre Hero', 'Titre principal de la page d''accueil'),
('hero_subtitle', 'Découvrez notre nouvelle collection de vêtements élégants', 'hero', 'Sous-titre Hero', 'Sous-titre de la page d''accueil');

-- Section Banners
INSERT INTO site_settings (key, value, category, label, description) VALUES
('banner1_title', 'Découvrez notre collection exclusive', 'banners', 'Bannière 1 - Titre', 'Titre de la première bannière'),
('banner1_subtitle', 'Des pièces uniques pour sublimer votre style', 'banners', 'Bannière 1 - Sous-titre', 'Sous-titre de la première bannière'),
('banner2_title', 'Nouveautés de la saison', 'banners', 'Bannière 2 - Titre', 'Titre de la deuxième bannière'),
('banner2_subtitle', 'Les dernières tendances mode à découvrir', 'banners', 'Bannière 2 - Sous-titre', 'Sous-titre de la deuxième bannière'),
('banner3_title', 'L''élégance à la sénégalaise', 'banners', 'Bannière 3 - Titre', 'Titre de la troisième bannière'),
('banner3_subtitle', 'Tradition et modernité en parfaite harmonie', 'banners', 'Bannière 3 - Sous-titre', 'Sous-titre de la troisième bannière'),
('banner4_title', 'Rejoignez notre communauté', 'banners', 'Bannière 4 - Titre', 'Titre de la quatrième bannière'),
('banner4_subtitle', 'Suivez-nous pour ne rien manquer', 'banners', 'Bannière 4 - Sous-titre', 'Sous-titre de la quatrième bannière');
