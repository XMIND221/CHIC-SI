"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Crown, Heart, Star } from "lucide-react"

export default function HeroLogo() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Élégance Sénégalaise",
      subtitle: "Maison de Couture Premium",
      description: "L'art de la mode modeste réinventé avec sophistication",
      image: "/luxury-hijab-collection-banner.jpg",
    },
    {
      title: "Créations Authentiques",
      subtitle: "Savoir-Faire Artisanal",
      description: "Chaque pièce raconte l'histoire de notre héritage",
      image: "/premium-abaya-showcase-banner.jpg",
    },
    {
      title: "Excellence Parisienne",
      subtitle: "Atelier de Haute Couture",
      description: "Où tradition sénégalaise rencontre raffinement français",
      image: "/modern-hijab-fashion-banner.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scrollToProducts = () => {
    console.log("[v0] Discover button clicked - scrolling to products")
    const productsSection = document.querySelector("#products-section")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  const scrollToCustomOrders = () => {
    console.log("[v0] Custom orders button clicked - scrolling to products")
    const productsSection = document.querySelector("#products-section")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </div>
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-crystal-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-crystal-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-primary/10 rounded-full blur-2xl animate-float delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 py-16">
        <div className="mb-16">
          <div className="relative inline-block group">
            <div className="relative w-[600px] h-40 sm:w-[800px] sm:h-52 md:w-[1000px] md:h-64 mx-auto group-hover:scale-105 transition-all duration-700">
              <Image
                src="/si-chic-logo-complete.png"
                alt="Si-Chic - Maison de Couture Sénégalaise"
                fill
                className="object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
              <Crown className="w-10 h-10 md:w-12 md:h-12 text-accent animate-bounce drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Badge className="bg-primary text-primary-foreground px-6 py-2 text-sm font-semibold rounded-full luxury-shadow animate-elegant-pulse">
              <Star className="w-4 h-4 mr-2" />
              Nouvelle Collection Automne 2024
            </Badge>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-foreground leading-tight px-2 text-balance drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>

            <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-foreground/80 mb-4 px-2 text-pretty">
              {slides[currentSlide].subtitle}
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed px-4 text-pretty drop-shadow-sm">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button
              onClick={scrollToProducts}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full luxury-shadow hover:immersive-shadow transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Découvrir la Collection
            </Button>

            <Button
              onClick={scrollToCustomOrders}
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 text-lg font-semibold rounded-full crystal-shadow hover:luxury-shadow transition-all duration-300 hover:scale-105 glass-effect bg-transparent"
            >
              <Heart className="w-5 h-5 mr-2" />
              Créations Sur Mesure
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center space-x-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 glass-effect ${
                  index === currentSlide
                    ? "bg-primary w-8 luxury-shadow"
                    : "bg-primary/30 w-3 hover:bg-primary/50 crystal-shadow"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
