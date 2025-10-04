-- Script de réinitialisation pour la production
-- Ce script supprime toutes les données de test et prépare le site pour la production

-- Supprimer toutes les données de test
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM favorites;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM banners;
DELETE FROM profiles WHERE id != '00000000-0000-0000-0000-000000000000';
DELETE FROM admin_sms_codes;

-- Réinitialiser les paramètres du site avec les vraies informations
DELETE FROM site_settings;

INSERT INTO site_settings (key, value, label, description, category) VALUES
  ('site_name', 'Si-Chic', 'Nom du site', 'Nom de la boutique', 'general'),
  ('site_description', 'Boutique de mode élégante', 'Description du site', 'Description de la boutique', 'general'),
  ('contact_phone', '+221 78 462 49 91', 'Téléphone', 'Numéro WhatsApp de contact', 'contact'),
  ('contact_email', 'contact@sichic.com', 'Email', 'Email de contact', 'contact'),
  ('contact_address', 'Dakar, Sénégal', 'Adresse', 'Adresse physique', 'contact'),
  ('hero_title', 'Si-Chic', 'Titre Hero', 'Titre principal de la page d''accueil', 'homepage'),
  ('hero_subtitle', 'Élégance & Raffinement', 'Sous-titre Hero', 'Sous-titre de la page d''accueil', 'homepage'),
  ('about_title', 'À Propos de Si-Chic', 'Titre À Propos', 'Titre de la section À Propos', 'about'),
  ('about_description', 'Si-Chic est votre destination pour la mode élégante et raffinée. Nous proposons une sélection soigneusement choisie de vêtements et accessoires qui allient style et qualité.', 'Description À Propos', 'Description de la boutique', 'about');

-- Créer une catégorie par défaut
INSERT INTO categories (name, description, image_url) VALUES
  ('Nouvelle Collection', 'Découvrez nos dernières créations', '/placeholder.svg?height=400&width=600');

-- Message de confirmation
SELECT 'Base de données réinitialisée avec succès pour la production!' as message;
