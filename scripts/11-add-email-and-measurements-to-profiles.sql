-- Ajouter les colonnes email et measurements à la table profiles

-- Ajouter la colonne email si elle n'existe pas
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'email'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN email text;
  END IF;
END $$;

-- Ajouter la colonne measurements (JSONB) si elle n'existe pas
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'measurements'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN measurements jsonb;
  END IF;
END $$;

-- Créer un index sur l'email pour les recherches rapides
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- Commentaires pour documentation
COMMENT ON COLUMN public.profiles.email IS 'Email du client pour la connexion et les notifications';
COMMENT ON COLUMN public.profiles.measurements IS 'Mesures détaillées du client au format JSON (bust, waist, hips, armLength, length, shoulderWidth, notes)';
