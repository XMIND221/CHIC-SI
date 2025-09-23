-- Insert categories
INSERT INTO public.categories (name, description, image_url) VALUES
('Hijabs Premium', 'Collection de hijabs en soie et matières nobles', '/luxury-hijab-collection-banner.jpg'),
('Abayas Élégantes', 'Abayas modernes et sophistiquées', '/premium-abaya-showcase-banner.jpg'),
('Tenues Complètes', 'Ensembles coordonnés hijab et abaya', '/modern-hijab-fashion-banner.jpg'),
('Accessoires', 'Épingles, bandeaux et accessoires assortis', '/luxury-boutique-products-showcase.jpg');

-- Insert products
INSERT INTO public.products (name, description, price, category_id, image_url, images, material, colors, sizes, stock_quantity, is_featured, rating, review_count) VALUES
-- Hijabs Premium
('Hijab Soie Bordeaux Élégant', 'Hijab en soie pure avec finitions délicates, parfait pour les occasions spéciales', 45000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/elegant-bordeaux-silk-hijab.jpg', ARRAY['/elegant-bordeaux-silk-hijab.jpg'], 'Soie pure', ARRAY['Bordeaux', 'Noir', 'Beige'], ARRAY['Standard'], 15, true, 4.8, 24),

('Hijab Moderne Noir Brodé', 'Hijab avec broderies subtiles et finitions premium', 38000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/modern-black-embroidered-abaya.jpg', ARRAY['/modern-black-embroidered-abaya.jpg'], 'Crêpe premium', ARRAY['Noir', 'Gris anthracite'], ARRAY['Standard'], 20, true, 4.7, 18),

('Hijab Professionnel Beige', 'Parfait pour le bureau, coupe moderne et élégante', 32000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/professional-beige-hijab-outfit.jpg', ARRAY['/professional-beige-hijab-outfit.jpg'], 'Jersey premium', ARRAY['Beige', 'Taupe', 'Blanc cassé'], ARRAY['Standard'], 25, false, 4.6, 12),

('Hijab Sport Rose Respirant', 'Hijab technique pour le sport, tissu respirant', 28000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/breathable-pink-sports-hijab.jpg', ARRAY['/breathable-pink-sports-hijab.jpg'], 'Polyester technique', ARRAY['Rose poudré', 'Gris clair', 'Blanc'], ARRAY['Standard'], 30, false, 4.5, 8),

-- Abayas Élégantes
('Abaya Cérémonie Dorée', 'Abaya de luxe avec détails dorés pour les grandes occasions', 125000, (SELECT id FROM categories WHERE name = 'Abayas Élégantes'), '/golden-ceremony-abaya-elegant.jpg', ARRAY['/golden-ceremony-abaya-elegant.jpg'], 'Crêpe de luxe', ARRAY['Noir et or', 'Bleu marine et or'], ARRAY['S', 'M', 'L', 'XL'], 8, true, 4.9, 15),

('Abaya Chiffon Bleu Ciel', 'Abaya fluide en chiffon, coupe moderne', 85000, (SELECT id FROM categories WHERE name = 'Abayas Élégantes'), '/sky-blue-chiffon-hijab-flowing.jpg', ARRAY['/sky-blue-chiffon-hijab-flowing.jpg'], 'Chiffon premium', ARRAY['Bleu ciel', 'Rose poudré', 'Vert menthe'], ARRAY['S', 'M', 'L', 'XL'], 12, false, 4.4, 9),

-- Tenues Complètes
('Ensemble Kimono Floral Moderne', 'Set complet hijab et kimono avec motifs floraux', 95000, (SELECT id FROM categories WHERE name = 'Tenues Complètes'), '/modern-floral-kimono-hijab-style.jpg', ARRAY['/modern-floral-kimono-hijab-style.jpg'], 'Viscose premium', ARRAY['Floral rose', 'Floral bleu'], ARRAY['S', 'M', 'L'], 10, true, 4.7, 11),

('Ensemble Bureau Gris Perle', 'Tenue complète professionnelle, hijab et veste assortis', 78000, (SELECT id FROM categories WHERE name = 'Tenues Complètes'), '/pearl-grey-office-hijab-ensemble.jpg', ARRAY['/pearl-grey-office-hijab-ensemble.jpg'], 'Laine mélangée', ARRAY['Gris perle', 'Bleu marine'], ARRAY['S', 'M', 'L', 'XL'], 15, false, 4.6, 7),

-- Plus de produits pour atteindre 16+
('Hijab Satin Luxe Champagne', 'Hijab en satin avec reflets nacrés', 42000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/elegant-bordeaux-silk-hijab.jpg', ARRAY['/elegant-bordeaux-silk-hijab.jpg'], 'Satin premium', ARRAY['Champagne', 'Or rose', 'Argent'], ARRAY['Standard'], 18, false, 4.8, 16),

('Abaya Dentelle Noire Sophistiquée', 'Abaya avec empiècements de dentelle française', 110000, (SELECT id FROM categories WHERE name = 'Abayas Élégantes'), '/modern-black-embroidered-abaya.jpg', ARRAY['/modern-black-embroidered-abaya.jpg'], 'Crêpe et dentelle', ARRAY['Noir', 'Bleu nuit'], ARRAY['S', 'M', 'L', 'XL'], 6, true, 4.9, 22),

('Hijab Cachemire Blanc Pur', 'Hijab en cachemire pour l\'hiver', 65000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/professional-beige-hijab-outfit.jpg', ARRAY['/professional-beige-hijab-outfit.jpg'], 'Cachemire', ARRAY['Blanc pur', 'Crème', 'Gris clair'], ARRAY['Standard'], 12, false, 4.7, 13),

('Ensemble Mariage Rose Poudré', 'Tenue complète pour mariages et cérémonies', 150000, (SELECT id FROM categories WHERE name = 'Tenues Complètes'), '/breathable-pink-sports-hijab.jpg', ARRAY['/breathable-pink-sports-hijab.jpg'], 'Soie et tulle', ARRAY['Rose poudré', 'Champagne'], ARRAY['S', 'M', 'L'], 5, true, 5.0, 8),

('Abaya Quotidienne Confort', 'Abaya confortable pour tous les jours', 55000, (SELECT id FROM categories WHERE name = 'Abayas Élégantes'), '/sky-blue-chiffon-hijab-flowing.jpg', ARRAY['/sky-blue-chiffon-hijab-flowing.jpg'], 'Jersey stretch', ARRAY['Noir', 'Gris', 'Bleu marine'], ARRAY['S', 'M', 'L', 'XL', 'XXL'], 35, false, 4.3, 28),

('Hijab Été Léger Menthe', 'Hijab ultra-léger pour les chaudes journées', 25000, (SELECT id FROM categories WHERE name = 'Hijabs Premium'), '/sky-blue-chiffon-hijab-flowing.jpg', ARRAY['/sky-blue-chiffon-hijab-flowing.jpg'], 'Lin mélangé', ARRAY['Vert menthe', 'Bleu ciel', 'Corail'], ARRAY['Standard'], 40, false, 4.4, 19),

('Ensemble Travail Moderne', 'Set professionnel hijab et blazer', 88000, (SELECT id FROM categories WHERE name = 'Tenues Complètes'), '/pearl-grey-office-hijab-ensemble.jpg', ARRAY['/pearl-grey-office-hijab-ensemble.jpg'], 'Polyester premium', ARRAY['Anthracite', 'Bleu marine'], ARRAY['S', 'M', 'L', 'XL'], 20, false, 4.5, 14),

('Abaya Soirée Velours Noir', 'Abaya en velours pour les soirées élégantes', 135000, (SELECT id FROM categories WHERE name = 'Abayas Élégantes'), '/golden-ceremony-abaya-elegant.jpg', ARRAY['/golden-ceremony-abaya-elegant.jpg'], 'Velours premium', ARRAY['Noir', 'Bordeaux'], ARRAY['S', 'M', 'L', 'XL'], 7, true, 4.8, 12);
