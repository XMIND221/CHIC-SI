"use client"

import { useState } from "react"
import useSWR from "swr"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, MessageSquare, Loader2 } from "lucide-react"
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
  category?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface CollectionModalProps {
  isOpen: boolean
  onClose: () => void
  collectionName: string
  collectionDescription: string
}

export default function CollectionModal({
  isOpen,
  onClose,
  collectionName,
  collectionDescription,
}: CollectionModalProps) {
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
  const { addItem } = useCartStore()

  // Filter products by collection name (you can adjust this logic based on your data structure)
  const products = Array.isArray(allProducts)
    ? allProducts.filter((product: Product) => {
        // Match collection name with product category or name
        const searchTerm = collectionName.toLowerCase()
        return (
          product.name?.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.category?.toLowerCase().includes(searchTerm)
        )
      })
    : []

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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {collectionName}
            </DialogTitle>
            <p className="text-muted-foreground text-lg mt-2">{collectionDescription}</p>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Erreur lors du chargement des produits</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit disponible dans cette collection pour le moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {products.map((product: Product) => (
                <div key={product.id} className="group">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(product.id) ? "fill-primary text-primary" : "text-foreground"
                        }`}
                      />
                    </button>

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                      <Button
                        size="sm"
                        className="w-full bg-background/95 backdrop-blur-sm hover:bg-background text-foreground shadow-md"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="w-3 h-3 mr-2" />
                        Ajouter
                      </Button>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-md"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <MessageSquare className="w-3 h-3 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.material}</p>
                    <h3 className="text-base font-medium text-foreground leading-snug line-clamp-2">{product.name}</h3>
                    <p className="text-lg font-semibold text-foreground">{formatPrice(product.price)}</p>
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                      <p className="text-xs text-amber-600">Plus que {product.stock_quantity} en stock</p>
                    )}
                    {product.stock_quantity === 0 && <p className="text-xs text-red-600">Rupture de stock</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* WhatsApp Order Modal */}
      {selectedProduct && <WhatsAppOrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
