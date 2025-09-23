"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const backgroundImages = [
  {
    src: "/elegant-hijab-professional.jpg",
    alt: "Femme élégante en hijab professionnel",
  },
  {
    src: "/modern-abaya-senegalese.jpg",
    alt: "Abaya moderne sénégalaise",
  },
  {
    src: "/office-outfit-hijab.jpg",
    alt: "Tenue de bureau avec hijab",
  },
  {
    src: "/elegant-senegalese-woman-in-professional-hijab-out.jpg",
    alt: "Femme sénégalaise en tenue professionnelle",
  },
  {
    src: "/beautiful-hijab-fashion-model-in-rose-gold-outfit.jpg",
    alt: "Modèle hijab en tenue rose gold",
  },
]

export default function BackgroundCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 4000) // Change d'image toutes les 4 secondes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-30" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90" />

      {/* Effet de particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-rose-200/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
