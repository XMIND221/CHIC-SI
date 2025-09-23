"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const categories = [
  {
    name: "Hijabs Premium",
    description: "Soie, mousseline et tissus nobles",
    itemCount: 45,
    startingPrice: "19 023 FCFA",
    image: "/placeholder-i7q4m.png",
    badge: "Bestseller",
  },
  {
    name: "Abayas Modernes",
    description: "Coupes contemporaines et élégantes",
    itemCount: 32,
    startingPrice: "58 380 FCFA",
    image: "/modern-elegant-abaya-collection.png",
    badge: "Nouveau",
  },
  {
    name: "Tenues Professionnelles",
    description: "Blazers, pantalons et ensembles",
    itemCount: 28,
    startingPrice: "42 637 FCFA",
    image: "/hijabi-business-attire.png",
    badge: "Premium",
  },
  {
    name: "Sport & Activité",
    description: "Confort et performance réunis",
    itemCount: 18,
    startingPrice: "25 582 FCFA",
    image: "/placeholder-4uq5v.png",
    badge: "Éco-responsable",
  },
]

const bannerImages = [
  {
    image: "/luxury-hijab-collection-banner.jpg",
    title: "Collections Exclusives",
    subtitle: "L'art de la couture française adaptée à la femme musulmane moderne",
  },
  {
    image: "/premium-abaya-showcase-banner.jpg",
    title: "Élégance Intemporelle",
    subtitle: "Des créations uniques pour chaque occasion",
  },
  {
    image: "/modern-hijab-fashion-banner.jpg",
    title: "Style Contemporain",
    subtitle: "Modernité et tradition en parfaite harmonie",
  },
]

export default function Categories() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50/30">
      <div className="relative mb-12 carousel-container">
        <div className="relative h-96 overflow-hidden">
          {bannerImages.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out carousel-slide ${
                index === currentBanner
                  ? "translate-x-0"
                  : index < currentBanner
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              <img src={banner.image || "/placeholder.svg"} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-crystal-float drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
                    {banner.title}
                  </h2>
                  <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-xl [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 glass-effect p-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 glass-effect p-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 carousel-indicator ${
                index === currentBanner ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative glass-card rounded-xl sm:rounded-2xl overflow-hidden luxury-shadow hover:immersive-shadow transition-all duration-500 animate-crystal-float animate-glass-shine"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <Badge
                    variant="secondary"
                    className={`text-xs sm:text-sm crystal-shadow glass-effect
                      ${category.badge === "Bestseller" ? "bg-orange-100/80 text-orange-800 border-orange-200/50" : ""}
                      ${category.badge === "Nouveau" ? "bg-green-100/80 text-green-800 border-green-200/50" : ""}
                      ${category.badge === "Premium" ? "bg-purple-100/80 text-purple-800 border-purple-200/50" : ""}
                      ${category.badge === "Éco-responsable" ? "bg-emerald-100/80 text-emerald-800 border-emerald-200/50" : ""}
                    `}
                  >
                    {category.badge}
                  </Badge>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">{category.name}</h3>
                <p className="text-gray-700 text-sm mb-3 sm:mb-4 leading-relaxed">{category.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-1 sm:space-y-0">
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">{category.itemCount} articles</div>
                  <div className="text-base sm:text-lg font-bold text-primary">
                    À partir de {category.startingPrice}
                  </div>
                </div>

                <Button className="w-full luxury-gradient hover:shadow-lg text-white font-semibold crystal-shadow transform hover:scale-105 transition-all duration-300">
                  Découvrir la collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
