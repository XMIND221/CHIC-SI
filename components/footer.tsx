import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Truck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 luxury-gradient"></div>
        <div className="relative glass-banner py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-8 animate-crystal-float">Livraison Premium à Dakar</h3>
              <div className="grid md:grid-cols-3 gap-8 text-white">
                <div className="glass-card p-6 rounded-xl crystal-shadow animate-glass-shine">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Truck className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">Livraison Week-end</p>
                      <p className="text-white/90">Samedi et Dimanche</p>
                      <p className="text-sm text-white/80 mt-1">Service exclusif</p>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-card p-6 rounded-xl crystal-shadow animate-glass-shine"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-white/20 rounded-full">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">DD 33 Derklé</p>
                      <p className="text-white/90">Dakar, Sénégal</p>
                      <p className="text-sm text-white/80 mt-1">Zone de livraison</p>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-card p-6 rounded-xl crystal-shadow animate-glass-shine"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">+221 77 746 10 97</p>
                      <p className="text-white/90">Service client</p>
                      <p className="text-sm text-white/80 mt-1">Disponible 7j/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl crystal-shadow">
              <h3 className="text-3xl font-bold text-primary mb-4">Si-Chic</h3>
              <p className="text-gray-300 leading-relaxed">
                Votre destination pour des vêtements professionnels élégants qui respectent vos valeurs et subliment
                votre style.
              </p>
            </div>
            <div className="flex space-x-4 justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="glass-effect text-gray-300 hover:text-white crystal-shadow hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-effect text-gray-300 hover:text-white crystal-shadow hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-effect text-gray-300 hover:text-white crystal-shadow hover:scale-110 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary">Navigation</h4>
            <div className="glass-card p-4 rounded-xl crystal-shadow">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Nouveautés</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Hijabs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Abayas</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Professionnel</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Sur Mesure</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary">Support</h4>
            <div className="glass-card p-4 rounded-xl crystal-shadow">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Guide des tailles</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Livraison & Retours</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>FAQ</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Nous contacter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300"
                  >
                    <span>Conditions générales</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary">Contact</h4>
            <div className="glass-card p-6 rounded-xl crystal-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300 text-sm">contact@si-chic.sn</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">+221 77 746 10 97</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300 text-sm">DD 33 Derklé, Dakar</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-300 text-sm">Livraison week-end</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="glass-card p-4 rounded-xl crystal-shadow">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 Si-Chic. Tous droits réservés.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Politique de confidentialité
                </a>
                <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Mentions légales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
