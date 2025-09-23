-- Table pour stocker les codes SMS temporaires pour l'admin
CREATE TABLE IF NOT EXISTS admin_sms_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '10 minutes'),
  used BOOLEAN DEFAULT FALSE,
  attempts INTEGER DEFAULT 0
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_admin_sms_codes_phone ON admin_sms_codes(phone_number);
CREATE INDEX IF NOT EXISTS idx_admin_sms_codes_expires ON admin_sms_codes(expires_at);

-- RLS (Row Level Security)
ALTER TABLE admin_sms_codes ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion et la lecture des codes
CREATE POLICY "Allow admin SMS operations" ON admin_sms_codes
  FOR ALL USING (phone_number = '+221777461097');

-- Fonction pour nettoyer les codes expirés
CREATE OR REPLACE FUNCTION cleanup_expired_sms_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM admin_sms_codes 
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;
