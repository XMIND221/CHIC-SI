-- Seed 5 demo products for Si-Chic boutique
INSERT INTO products (name, description, price, image_url, material, colors, sizes, stock_quantity, is_available, is_featured)
VALUES
  (
    'Hijab Premium en Soie',
    'Hijab élégant en soie naturelle, doux et confortable pour un port quotidien. Parfait pour toutes les occasions.',
    15000,
    '/placeholder.svg?height=400&width=400',
    'Soie naturelle',
    ARRAY['Noir', 'Blanc', 'Beige', 'Rose'],
    ARRAY['Unique'],
    25,
    true,
    true
  ),
  (
    'Abaya Moderne Noire',
    'Abaya moderne avec des détails raffinés, coupe élégante et tissu de haute qualité. Idéale pour les événements formels.',
    35000,
    '/placeholder.svg?height=400&width=400',
    'Crêpe premium',
    ARRAY['Noir', 'Bleu marine'],
    ARRAY['S', 'M', 'L', 'XL'],
    15,
    true,
    true
  ),
  (
    'Turban Chic en Coton',
    'Turban confortable en coton respirant, facile à porter et disponible en plusieurs couleurs tendance.',
    8000,
    '/placeholder.svg?height=400&width=400',
    'Coton bio',
    ARRAY['Camel', 'Gris', 'Bordeaux', 'Vert olive'],
    ARRAY['Unique'],
    30,
    true,
    false
  ),
  (
    'Kimono Brodé Élégant',
    'Kimono long avec broderies délicates, parfait pour ajouter une touche d''élégance à votre tenue.',
    28000,
    '/placeholder.svg?height=400&width=400',
    'Polyester brodé',
    ARRAY['Beige', 'Rose poudré', 'Bleu ciel'],
    ARRAY['S', 'M', 'L'],
    12,
    true,
    true
  ),
  (
    'Ensemble Hijab & Sous-hijab',
    'Ensemble complet comprenant un hijab en jersey et un sous-hijab en coton pour un confort optimal.',
    12000,
    '/placeholder.svg?height=400&width=400',
    'Jersey & Coton',
    ARRAY['Noir', 'Blanc', 'Taupe'],
    ARRAY['Unique'],
    20,
    true,
    false
  );
