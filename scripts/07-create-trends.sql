-- Create trends table
CREATE TABLE IF NOT EXISTS trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for active trends
CREATE INDEX IF NOT EXISTS idx_trends_active ON trends(is_active, display_order);

-- Insert demo trends
INSERT INTO trends (title, description, image_url, link_url, display_order) VALUES
('Hijabs Élégants', 'Découvrez notre nouvelle collection de hijabs en soie premium', '/placeholder.svg?height=400&width=600', '/boutique', 1),
('Abayas Modernes', 'Des abayas contemporaines pour toutes les occasions', '/placeholder.svg?height=400&width=600', '/boutique', 2),
('Turbans Chic', 'Turbans colorés et confortables pour un style unique', '/placeholder.svg?height=400&width=600', '/boutique', 3);
