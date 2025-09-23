"use client"

import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, ShoppingBag, Ruler } from "lucide-react"
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

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleCart} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Panier ({items.length})</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Votre panier est vide</p>
              <Button onClick={toggleCart} variant="outline">
                Continuer les achats
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                    {item.isCustom && (
                      <div className="absolute -top-1 -right-1">
                        <Badge className="bg-rose-100 text-rose-800 border-rose-200 text-xs px-1 py-0">
                          <Ruler className="w-3 h-3" />
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                    {item.isCustom && (
                      <Badge variant="outline" className="text-xs mt-1 bg-rose-50 text-rose-700 border-rose-200">
                        Sur Mesure
                      </Badge>
                    )}
                    <p className="text-sm text-gray-600 mt-1">{formatPrice(item.price)}</p>

                    {item.isCustom && item.measurements && (
                      <div className="text-xs text-gray-500 mt-1">
                        <p>
                          Mesures: {item.measurements.bust}cm - {item.measurements.waist}cm - {item.measurements.hips}cm
                        </p>
                        {item.measurements.notes && <p className="truncate">Note: {item.measurements.notes}</p>}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.isCustom}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>

                      <span className="w-8 text-center text-sm">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.isCustom}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-red-600 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                <Link href="/checkout" onClick={toggleCart}>
                  Procéder au paiement
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                Vider le panier
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
