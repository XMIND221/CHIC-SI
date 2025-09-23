-- Mise à jour de la politique pour inclure le deuxième numéro d'admin
DROP POLICY IF EXISTS "Allow admin SMS operations" ON admin_sms_codes;

-- Ajout du deuxième numéro d'admin +221784624991
CREATE POLICY "Allow admin SMS operations" ON admin_sms_codes
  FOR ALL USING (phone_number IN ('+221777461097', '+221784624991'));
