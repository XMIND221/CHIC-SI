-- Create banners table for hero carousel
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default banners
INSERT INTO public.banners (title, subtitle, image_url, display_order) VALUES
('Collections Exclusives', 'L''art de la couture française adaptée à la femme musulmane moderne', '/luxury-hijab-collection-banner.jpg', 1),
('Élégance Intemporelle', 'Des créations uniques pour chaque occasion', '/premium-abaya-showcase-banner.jpg', 2),
('Style Contemporain', 'Modernité et tradition en parfaite harmonie', '/modern-hijab-fashion-banner.jpg', 3);

-- Enable RLS
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin full access" ON public.banners FOR ALL USING (true);
