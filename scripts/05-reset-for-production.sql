-- Script de réinitialisation pour la production
-- Ce script vide toutes les données de test et prépare le site pour la production

-- Vider les tables dans le bon ordre (en respectant les contraintes de clés étrangères)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM favorites;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM banners;
DELETE FROM admin_sms_codes;

-- Réinitialiser les compteurs
-- Note: Les UUID ne nécessitent pas de réinitialisation de séquence

-- Insérer des catégories de base
INSERT INTO categories (id, name, description, image_url, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Robes', 'Collection de robes élégantes', '/placeholder.svg?height=400&width=600', NOW(), NOW()),
  (gen_random_uuid(), 'Ensembles', 'Ensembles coordonnés', '/placeholder.svg?height=400&width=600', NOW(), NOW()),
  (gen_random_uuid(), 'Accessoires', 'Accessoires de mode', '/placeholder.svg?height=400&width=600', NOW(), NOW());

-- Insérer une bannière de bienvenue
INSERT INTO banners (id, title, subtitle, image_url, display_order, is_active, created_at, updated_at) VALUES
  (gen_random_uuid(), 'Bienvenue chez Si-Chic', 'Découvrez notre nouvelle collection', '/placeholder.svg?height=600&width=1200', 1, true, NOW(), NOW());

-- Message de confirmation
SELECT 'Base de données réinitialisée avec succès pour la production!' as message;
