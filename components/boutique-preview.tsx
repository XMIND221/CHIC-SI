"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, MessageSquare, Loader2, ArrowRight } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"
import WhatsAppOrderModal from "./whatsapp-order-modal"

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

type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  material: string
  colors: string[]
  stock_quantity: number
  is_available: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function BoutiquePreview() {
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR("/api/products", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
  })

  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addItem } = useCartStore()

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    })
  }

  // Show only first 3 products
  const previewProducts = products.slice(0, 3)

  if (isLoading) {
    return (
      <section id="boutique" className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="boutique" className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500">Erreur lors du chargement des produits</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="boutique" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Notre Boutique</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Découvrez nos dernières créations
          </p>
        </div>

        {/* Products Grid - Preview (3 products) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {previewProducts.map((product: Product, index: number) => (
            <div key={product.id} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-5 overflow-hidden rounded-sm">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2.5 bg-background/90 backdrop-blur-sm rounded-full elegant-shadow hover:bg-background transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id) ? "fill-primary text-primary" : "text-foreground"
                    }`}
                  />
                </button>

                {/* Add to Cart and Commande sur WhatsApp */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                  <Button
                    className="w-full bg-background/95 backdrop-blur-sm hover:bg-background text-foreground elegant-shadow"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white elegant-shadow"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Commander sur WhatsApp
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.material}</p>
                <h3 className="text-lg font-medium text-foreground leading-snug">{product.name}</h3>
                <p className="text-xl font-semibold text-foreground">{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background text-base h-12 px-8"
            asChild
          >
            <Link href="/boutique">
              Voir toute la collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* WhatsApp Order Modal */}
      {selectedProduct && <WhatsAppOrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}
