import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="bg-foreground/95 py-12 border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <MapPin className="w-6 h-6 mx-auto md:mx-0 mb-2 text-primary" />
              <p className="font-semibold">DD 33 Derklé</p>
              <p className="text-background/70 text-sm">Dakar, Sénégal</p>
            </div>

            <div className="space-y-2">
              <Phone className="w-6 h-6 mx-auto md:mx-0 mb-2 text-primary" />
              <p className="font-semibold">+221 77 722 37 55</p>
              <p className="text-background/70 text-sm">Service client 7j/7</p>
            </div>

            <div className="space-y-2">
              <Mail className="w-6 h-6 mx-auto md:mx-0 mb-2 text-primary" />
              <p className="font-semibold">contact@si-chic.sn</p>
              <p className="text-background/70 text-sm">Réponse sous 24h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold">Si-Chic</h3>
            <p className="text-background/70 leading-relaxed">
              Maison de couture sénégalaise spécialisée dans les hijabs et abayas sur mesure
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-background/70 hover:text-background hover:bg-background/10"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background/70 hover:text-background hover:bg-background/10"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#boutique" className="text-background/70 hover:text-background transition-colors text-sm">
                  Boutique
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Hijabs
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Abayas
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Sur Mesure
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Guide des tailles
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Livraison & Retours
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Informations</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8">
          <p className="text-center text-background/60 text-sm">© 2025 Si-Chic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
