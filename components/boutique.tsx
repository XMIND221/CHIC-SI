"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, MessageSquare, Loader2, Search, SlidersHorizontal } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import WhatsAppOrderModal from "./whatsapp-order-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function Boutique() {
  const {
    data: allProducts = [],
    error,
    isLoading,
  } = useSWR("/api/products", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
  })

  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [priceFilter, setPriceFilter] = useState("all")
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

  const categories = ["Tous", ...Array.from(new Set(allProducts.map((p: Product) => p.material).filter(Boolean)))]

  const products = allProducts.filter((product: Product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.material?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "Tous" || product.material === selectedCategory

    let matchesPrice = true
    if (priceFilter === "low") {
      matchesPrice = product.price < 20000
    } else if (priceFilter === "medium") {
      matchesPrice = product.price >= 20000 && product.price < 50000
    } else if (priceFilter === "high") {
      matchesPrice = product.price >= 50000
    }

    return matchesSearch && matchesCategory && matchesPrice
  })

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
            Chaque pièce est confectionnée avec soin dans notre atelier de Dakar
          </p>
        </div>

        {/* Search Bar and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-lg border-border focus:border-primary rounded-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filtres:</span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="low">Moins de 20 000 FCFA</SelectItem>
                <SelectItem value="medium">20 000 - 50 000 FCFA</SelectItem>
                <SelectItem value="high">Plus de 50 000 FCFA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {products.length} produit{products.length > 1 ? "s" : ""} trouvé{products.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Tous")
                setPriceFilter("all")
              }}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {products.map((product: Product, index: number) => (
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
                  {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                    <p className="text-sm text-amber-600">Plus que {product.stock_quantity} en stock</p>
                  )}
                  {product.stock_quantity === 0 && <p className="text-sm text-red-600">Rupture de stock</p>}
                </div>
              </div>
            ))}
          </div>
        )}

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
            <a href="https://wa.me/221784624991" target="_blank" rel="noopener noreferrer">
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
