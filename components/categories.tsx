"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const categories = [
  {
    name: "Hijabs Premium",
    description: "Soie, mousseline et tissus nobles",
    itemCount: 45,
    startingPrice: "19 023 FCFA",
    image: "/luxury-silk-hijab-collection.jpg",
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
    image: "/modest-athletic-wear-hijab-sports.jpg",
    badge: "Éco-responsable",
  },
]

export default function Categories() {
  const [currentBanner, setCurrentBanner] = useState(0)

  const { data: banners = [] } = useSWR("/api/banners", fetcher, {
    refreshInterval: 5000,
  })

  useEffect(() => {
    if (banners.length === 0) return
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section id="collections" className="py-16 bg-gradient-to-b from-stone-50 to-background">
      {/* Banner Carousel */}
      {banners.length > 0 && (
        <div className="relative mb-16 overflow-hidden">
          <div className="relative h-[400px] md:h-[500px]">
            {banners.map((banner: any, index: number) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentBanner ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                }`}
              >
                <img
                  src={banner.image_url || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-4xl mx-auto px-4">
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                      {banner.title}
                    </h2>
                    <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-xl">
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
            aria-label="Next banner"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentBanner ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Nos Collections</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos collections soigneusement sélectionnées pour chaque occasion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className={`text-sm shadow-lg backdrop-blur-sm
                      ${category.badge === "Bestseller" ? "bg-orange-100/90 text-orange-800 border-orange-200" : ""}
                      ${category.badge === "Nouveau" ? "bg-green-100/90 text-green-800 border-green-200" : ""}
                      ${category.badge === "Premium" ? "bg-purple-100/90 text-purple-800 border-purple-200" : ""}
                      ${category.badge === "Éco-responsable" ? "bg-emerald-100/90 text-emerald-800 border-emerald-200" : ""}
                    `}
                  >
                    {category.badge}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{category.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-muted-foreground font-medium">{category.itemCount} articles</div>
                  <div className="text-lg font-bold text-primary">À partir de {category.startingPrice}</div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary via-amber-400 to-rose-400 hover:opacity-90 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                  Découvrir
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
