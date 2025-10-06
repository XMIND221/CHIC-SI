-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  read_time TEXT DEFAULT '5 min',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Insert demo blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, image_url, featured, tags, read_time) VALUES
(
  'Les Tendances Hijab Automne-Hiver 2024',
  'tendances-hijab-automne-hiver-2024',
  'Découvrez les couleurs, textures et styles qui marqueront la saison froide. Du velours luxueux aux tons terreux, explorez les tendances incontournables.',
  '<p>Cette saison automne-hiver 2024, les hijabs se parent de couleurs chaudes et de textures riches qui reflètent parfaitement l''esprit cocooning de la saison froide.</p><h2>Les Couleurs Phares de la Saison</h2><p>Les tons terreux dominent cette saison avec des nuances de camel, de rouille et de brun chocolat.</p>',
  'Aminata Diallo',
  'Tendances',
  '/placeholder.svg?height=600&width=800',
  true,
  ARRAY['Hijab', 'Mode', 'Tendances', 'Automne-Hiver'],
  '5 min'
),
(
  'Comment Porter l''Abaya au Bureau : Guide Complet',
  'porter-abaya-bureau-guide',
  'L''abaya moderne s''invite dans le monde professionnel. Nos conseils pour allier élégance, confort et codes vestimentaires.',
  '<p>L''abaya professionnelle doit respecter certains codes tout en conservant son élégance. Découvrez nos conseils pour un look bureau impeccable.</p>',
  'Fatou Seck',
  'Style Professionnel',
  '/placeholder.svg?height=600&width=800',
  false,
  ARRAY['Abaya', 'Bureau', 'Professionnel', 'Style'],
  '7 min'
),
(
  'L''Art du Drapé : Techniques de Nouage du Hijab',
  'art-drape-techniques-nouage-hijab',
  'Maîtrisez les techniques traditionnelles et modernes pour sublimer votre hijab. Tutoriels pas à pas avec photos.',
  '<p>Le drapé du hijab est un art qui se transmet de génération en génération. Découvrez les techniques essentielles.</p>',
  'Khadija Ba',
  'Tutoriels',
  '/placeholder.svg?height=600&width=800',
  true,
  ARRAY['Hijab', 'Tutoriel', 'Techniques', 'Drapé'],
  '10 min'
);
