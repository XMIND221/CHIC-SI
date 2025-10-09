"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { Truck, ArrowLeft, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import OrderModal, { type OrderFormData } from "@/components/order-modal"
import useSWR from "swr"

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

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: settings } = useSWR("/api/settings", fetcher, {
    refreshInterval: 5000,
  })

  const getSettingValue = (key: string, defaultValue: string) => {
    const setting = settings?.find((s: any) => s.key === key)
    return setting?.value || defaultValue
  }

  const whatsappNumber = getSettingValue("whatsapp_number", "+221784624991").replace(/\s/g, "")

  useEffect(() => {
    if (items.length === 0) {
      router.push("/")
    }
  }, [items, router])

  const handleOrderSubmit = async (formData: OrderFormData) => {
    setIsLoading(true)

    try {
      console.log("[v0] Starting order process with measurements")

      const customerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country,
        measurements: formData.measurements,
      }

      console.log("[v0] Saving customer data and creating account:", customerData)

      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })

      if (!response.ok) {
        console.error("[v0] Failed to save customer data")
        alert("Erreur lors de la création de votre compte. Veuillez réessayer.")
        setIsLoading(false)
        return
      }

      const result = await response.json()
      console.log("[v0] Customer account created successfully:", result)

      const subtotal = getTotalPrice()
      const shipping = subtotal > 100000 ? 0 : 5000
      const total = subtotal + shipping

      let message = `🌸 *NOUVELLE COMMANDE SI-CHIC* 🌸\n\n`
      message += `👤 *INFORMATIONS CLIENT*\n`
      message += `Nom: ${formData.firstName} ${formData.lastName}\n`
      message += `Téléphone: ${formData.phone}\n`
      message += `Email: ${formData.email}\n\n`

      message += `📏 *MESURES DÉTAILLÉES*\n`
      message += `Tour de poitrine: ${formData.measurements.bust} cm\n`
      message += `Tour de taille: ${formData.measurements.waist} cm\n`
      message += `Tour de hanches: ${formData.measurements.hips} cm\n`
      message += `Longueur de bras: ${formData.measurements.armLength} cm\n`
      message += `Longueur totale: ${formData.measurements.length} cm\n`
      if (formData.measurements.shoulderWidth) {
        message += `Largeur d'épaules: ${formData.measurements.shoulderWidth} cm\n`
      }
      if (formData.measurements.notes) {
        message += `Notes: ${formData.measurements.notes}\n`
      }
      message += `\n`

      message += `📍 *ADRESSE DE LIVRAISON*\n`
      message += `${formData.address}\n`
      message += `${formData.city}, ${formData.postalCode}\n`
      message += `${formData.country}\n\n`

      if (formData.deliveryNotes) {
        message += `📝 *INSTRUCTIONS DE LIVRAISON*\n${formData.deliveryNotes}\n\n`
      }

      message += `🛍️ *DÉTAILS DE LA COMMANDE*\n`
      message += `━━━━━━━━━━━━━━━━━━━━\n`

      items.forEach((item, index) => {
        message += `\n${index + 1}. *${item.name}*\n`
        message += `   Quantité: ${item.quantity}\n`
        message += `   Prix unitaire: ${formatPrice(item.price)}\n`
        message += `   Sous-total: ${formatPrice(item.price * item.quantity)}\n`

        if (item.size) {
          message += `   Taille: ${item.size}\n`
        }

        if (item.color) {
          message += `   Couleur: ${item.color}\n`
        }
      })

      message += `\n━━━━━━━━━━━━━━━━━━━━\n`
      message += `💰 *RÉCAPITULATIF*\n`
      message += `Sous-total: ${formatPrice(subtotal)}\n`
      message += `Livraison: ${shipping === 0 ? "GRATUITE ✨" : formatPrice(shipping)}\n`
      message += `*TOTAL: ${formatPrice(total)}*\n\n`
      message += `✨ Un compte a été créé automatiquement pour ce client.\n`
      message += `Merci de confirmer cette commande ! 🙏`

      console.log("[v0] WhatsApp message created, redirecting...")

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      clearCart()
      window.open(whatsappUrl, "_blank")

      setIsModalOpen(false)
      router.push("/checkout/success")
    } catch (error) {
      console.error("[v0] Order error:", error)
      alert("Erreur lors de la préparation de la commande. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const total = subtotal + shipping

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-rose-600 hover:text-rose-700">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer les achats
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif text-gray-900 mb-2">Finaliser la commande</h1>
              <p className="text-gray-600">Vérifiez votre panier et cliquez sur le bouton pour finaliser</p>
            </div>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Commande via WhatsApp</h3>
                    <p className="text-sm text-gray-600">Finalisez votre commande directement avec notre équipe</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                  <p className="text-sm text-gray-700 mb-2">✅ Confirmation instantanée de votre commande</p>
                  <p className="text-sm text-gray-700 mb-2">✅ Paiement sécurisé à la livraison ou par mobile money</p>
                  <p className="text-sm text-gray-700 mb-2">✅ Service client personnalisé</p>
                  <p className="text-sm text-gray-700 mb-2">✅ Création automatique de votre compte Si-Chic</p>
                  <p className="text-sm text-gray-700">✅ Vêtements sur mesure avec vos mensurations exactes</p>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Commander via WhatsApp - {formatPrice(total)}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Récapitulatif de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        {item.customMeasurements && (
                          <Badge variant="secondary" className="mt-1 bg-amber-100 text-amber-800 text-xs">
                            ✨ Sur Mesure
                          </Badge>
                        )}
                        <p className="text-sm text-gray-600">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Livraison
                    </span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Gratuite" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping === 0 && <p className="text-xs text-green-600">Livraison gratuite dès 100 000 FCFA</p>}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 pt-4">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span>Commande via WhatsApp</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-rose-600" />
                  <div>
                    <p className="font-medium text-sm">Livraison rapide</p>
                    <p className="text-xs text-gray-600">2-3 jours à Dakar, 3-5 jours en région</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
