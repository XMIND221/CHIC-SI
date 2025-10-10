"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("XAF", "FCFA")
}

const mockProducts = [
  {
    id: 1,
    name: "Hijab Soie Premium Bordeaux",
    price: 25000,
    image: "/elegant-bordeaux-silk-hijab.jpg",
    material: "Soie naturelle",
  },
  {
    id: 2,
    name: "Abaya Moderne Noire Brodée",
    price: 85000,
    image: "/modern-black-embroidered-abaya.jpg",
    material: "Crêpe de luxe",
  },
  {
    id: 3,
    name: "Ensemble Professionnel Beige",
    price: 65000,
    image: "/professional-beige-hijab-outfit.jpg",
    material: "Polyester premium",
  },
  {
    id: 4,
    name: "Hijab Sport Respirant Rose",
    price: 18000,
    image: "/breathable-pink-sports-hijab.jpg",
    material: "Polyester recyclé",
  },
  {
    id: 5,
    name: "Abaya Cérémonie Dorée",
    price: 120000,
    image: "/golden-ceremony-abaya-elegant.jpg",
    material: "Satin brodé or",
  },
  {
    id: 6,
    name: "Hijab Mousseline Bleu Ciel",
    price: 22000,
    image: "/sky-blue-chiffon-hijab-flowing.jpg",
    material: "Mousseline de soie",
  },
]

export default function Products() {
  const [wishlist, setWishlist] = useState<number[]>([])
  const { addItem } = useCartStore()

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: (typeof mockProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Nos Collections</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Découvrez nos créations uniques, confectionnées avec passion dans notre atelier
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <div key={product.id} className="group">
              {/* Image */}
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id) ? "fill-stone-900 text-stone-900" : "text-stone-600"
                    }`}
                  />
                </button>

                {/* Add to cart button - shows on hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    className="w-full bg-white hover:bg-stone-50 text-stone-900"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>

              {/* Product info */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-stone-900">{product.name}</h3>
                <p className="text-sm text-stone-600">{product.material}</p>
                <p className="text-lg font-semibold text-stone-900">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-stone-900 text-stone-900 hover:bg-stone-50 bg-transparent"
            asChild
          >
            <Link href="/boutique">Voir toute la collection</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
