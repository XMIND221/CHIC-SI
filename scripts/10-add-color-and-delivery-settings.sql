-- Ajouter les paramètres de couleur et de livraison
INSERT INTO site_settings (key, value, category, label, description) VALUES
  ('primary_color', '#d4af37', 'appearance', 'Couleur Principale', 'Couleur principale du site (format hexadécimal)'),
  ('secondary_color', '#c9a961', 'appearance', 'Couleur Secondaire', 'Couleur secondaire du site (format hexadécimal)'),
  ('delivery_days', 'Samedi et Dimanche', 'general', 'Jours de Livraison', 'Jours où les livraisons sont effectuées'),
  ('delivery_info', 'Les livraisons se font uniquement les weekends (samedi et dimanche). Commandez avant vendredi pour recevoir votre colis le weekend suivant.', 'general', 'Informations de Livraison', 'Détails complets sur les livraisons')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  category = EXCLUDED.category,
  label = EXCLUDED.label,
  description = EXCLUDED.description;
