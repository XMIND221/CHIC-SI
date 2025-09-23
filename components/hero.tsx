"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Truck, Award, Sparkles } from "lucide-react"

const heroSlides = [
  {
    title: "Collection Automne-Hiver 2024",
    subtitle: "Haute Couture Parisienne",
    description:
      "Découvrez l'excellence de notre atelier parisien avec des créations uniques alliant tradition française et modernité islamique.",
    cta: "Explorer la Collection",
    accent: "Édition Limitée",
  },
  {
    title: "Service Sur Mesure d'Exception",
    subtitle: "Artisanat de Luxe",
    description:
      "Nos maîtres couturiers créent votre garde-robe idéale avec des matériaux nobles et des finitions d'exception.",
    cta: "Prendre Rendez-vous",
    accent: "Exclusif",
  },
  {
    title: "Certification Halal Premium",
    subtitle: "Éthique & Excellence",
    description: "Chaque création respecte vos valeurs avec une traçabilité complète et des matériaux certifiés halal.",
    cta: "Nos Engagements",
    accent: "Certifié",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen luxury-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10">
            {/* Premium Badges */}
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Certifié Halal Premium
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Atelier Parisien
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 px-4 py-2">
                <Truck className="w-4 h-4 mr-2" />
                Livraison VIP 24h
              </Badge>
            </div>

            {/* Dynamic Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
                  {heroSlides[currentSlide].accent}
                </span>
              </div>

              <h2 className="text-lg font-medium text-neutral-600 tracking-wide">
                {heroSlides[currentSlide].subtitle}
              </h2>

              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-neutral-900 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-xl text-neutral-600 max-w-2xl leading-relaxed font-light">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            {/* Enhanced Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-12 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-lg font-semibold text-neutral-900">4.9/5</div>
                <div className="text-sm text-neutral-500">Excellence</div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-2xl font-serif font-bold text-neutral-900">25,000+</div>
                <div className="text-sm text-neutral-600">Clientes d'exception</div>
              </div>
            </div>

            {/* Premium CTAs */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {heroSlides[currentSlide].cta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-neutral-300 bg-white/80 backdrop-blur-sm hover:bg-white px-8 py-4 text-lg font-medium transition-all duration-300"
              >
                Consultation Privée
              </Button>
            </div>

            {/* Luxury Customer Showcase */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 border-3 border-white shadow-lg animate-float"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Rejoignez notre clientèle d'exception</p>
                <p className="text-xs text-neutral-500">Paris • Londres • Dubai • New York</p>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/elegant-hijab-woman.png"
                alt="Femme professionnelle en hijab élégant - Collection Si-Chic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Premium Elements */}
            <div className="absolute -top-6 -right-6 glass-effect rounded-2xl p-6 shadow-xl animate-float">
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-gradient-gold">24h</div>
                <div className="text-sm text-neutral-600 font-medium">Livraison VIP</div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -left-6 glass-effect rounded-2xl p-6 shadow-xl animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-gradient-gold">100%</div>
                <div className="text-sm text-neutral-600 font-medium">Sur Mesure</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gradient-to-r from-rose-500 to-rose-600 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
