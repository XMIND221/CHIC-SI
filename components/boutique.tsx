"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, MessageSquare } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
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

const categories = [
  { id: "all", name: "Tout" },
  { id: "hijabs", name: "Hijabs" },
  { id: "abayas", name: "Abayas" },
  { id: "ensembles", name: "Ensembles" },
  { id: "sport", name: "Sport" },
  { id: "ceremonie", name: "Cérémonie" },
]

const products = [
  {
    id: 1,
    name: "Hijab Soie Premium Bordeaux",
    price: 25000,
    image: "/elegant-bordeaux-silk-hijab.jpg",
    category: "hijabs",
    material: "Soie naturelle",
  },
  {
    id: 2,
    name: "Abaya Moderne Noire Brodée",
    price: 85000,
    image: "/modern-black-embroidered-abaya.jpg",
    category: "abayas",
    material: "Crêpe de luxe",
  },
  {
    id: 3,
    name: "Ensemble Professionnel Beige",
    price: 65000,
    image: "/professional-beige-hijab-outfit.jpg",
    category: "ensembles",
    material: "Polyester premium",
  },
  {
    id: 4,
    name: "Hijab Sport Respirant Rose",
    price: 18000,
    image: "/breathable-pink-sports-hijab.jpg",
    category: "sport",
    material: "Polyester recyclé",
  },
  {
    id: 5,
    name: "Abaya Cérémonie Dorée",
    price: 120000,
    image: "/golden-ceremony-abaya-elegant.jpg",
    category: "ceremonie",
    material: "Satin brodé or",
  },
  {
    id: 6,
    name: "Hijab Mousseline Bleu Ciel",
    price: 22000,
    image: "/sky-blue-chiffon-hijab-flowing.jpg",
    category: "hijabs",
    material: "Mousseline de soie",
  },
  {
    id: 7,
    name: "Abaya Quotidienne Grise",
    price: 55000,
    image: "/elegant-grey-daily-abaya-modest-fashion.jpg",
    category: "abayas",
    material: "Jersey premium",
  },
  {
    id: 8,
    name: "Ensemble Sport Complet Noir",
    price: 45000,
    image: "/black-sports-hijab-outfit-athletic-wear.jpg",
    category: "sport",
    material: "Tissu technique",
  },
  {
    id: 9,
    name: "Hijab Satin Champagne",
    price: 28000,
    image: "/champagne-satin-hijab-luxury-fabric.jpg",
    category: "hijabs",
    material: "Satin de soie",
  },
]

export default function Boutique() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const { addItem } = useCartStore()

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section id="boutique" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Notre Boutique</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Chaque pièce est confectionnée avec soin dans notre atelier de Dakar
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                ${
                  selectedCategory === category.id
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-transparent hover:bg-muted"
                }
              `}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-5 overflow-hidden rounded-sm">
                <Image
                  src={product.image || "/placeholder.svg"}
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

        {/* Contact CTA */}
        <div className="mt-20 text-center space-y-6 py-16 border-t border-border">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Besoin d'une création sur mesure ?
          </h3>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Contactez-nous sur WhatsApp pour discuter de votre projet personnalisé
          </p>
          <Button
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background text-base h-12 px-8"
            asChild
          >
            <a href="https://wa.me/221777223755" target="_blank" rel="noopener noreferrer">
              Commander sur WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* WhatsApp Order Modal */}
      {selectedProduct && <WhatsAppOrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  )
}
