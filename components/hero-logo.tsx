"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroLogo() {
  return (
    <section className="relative bg-background min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] text-balance">
                Élégance
                <br />
                <span className="text-primary">intemporelle</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
                Découvrez l'art de la couture sénégalaise avec nos collections de hijabs et abayas sur mesure
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background text-base h-12 px-8">
                Explorer la boutique
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent">
                Prendre rendez-vous
              </Button>
            </div>

            <div className="pt-8 space-y-3">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Besoin d'aide ?</p>
              <a
                href="https://wa.me/221777223755"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-foreground hover:text-primary transition-colors inline-block"
              >
                WhatsApp: +221 77 722 37 55
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-scale-in">
            <div className="aspect-[3/4] relative rounded-sm overflow-hidden elegant-shadow-lg">
              <Image
                src="/elegant-bordeaux-silk-hijab.jpg"
                alt="Collection Si-Chic"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
