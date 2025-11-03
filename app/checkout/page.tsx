"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { Truck, MapPin, User, ArrowLeft, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"

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

const WHATSAPP_NUMBER = "221771234567" // Replace with actual Si-Chic WhatsApp number

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sénégal",
    notes: "",
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push("/")
    }
  }, [items, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[v0] Starting WhatsApp checkout process")

      // Save customer information to Supabase
      const customerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country,
      }

      console.log("[v0] Saving customer data:", customerData)

      // Save to Supabase profiles table
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })

      if (!response.ok) {
        console.error("[v0] Failed to save customer data")
      } else {
        console.log("[v0] Customer data saved successfully")
      }

      // Create WhatsApp message with order details
      const subtotal = getTotalPrice()
      const shipping = subtotal > 100000 ? 0 : 5000
      const total = subtotal + shipping

      let message = `🌸 *NOUVELLE COMMANDE SI-CHIC* 🌸\n\n`
      message += `👤 *INFORMATIONS CLIENT*\n`
      message += `Nom: ${formData.firstName} ${formData.lastName}\n`
      message += `Téléphone: ${formData.phone}\n`
      message += `Email: ${formData.email}\n\n`

      message += `📍 *ADRESSE DE LIVRAISON*\n`
      message += `${formData.address}\n`
      message += `${formData.city}, ${formData.postalCode}\n`
      message += `${formData.country}\n\n`

      if (formData.notes) {
        message += `📝 *INSTRUCTIONS*\n${formData.notes}\n\n`
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

        if (item.customMeasurements) {
          message += `   ✨ *COMMANDE SUR MESURE*\n`
          message += `   Tour de poitrine: ${item.customMeasurements.bust}cm\n`
          message += `   Tour de taille: ${item.customMeasurements.waist}cm\n`
          message += `   Tour de hanches: ${item.customMeasurements.hips}cm\n`
          message += `   Longueur de bras: ${item.customMeasurements.armLength}cm\n`
          message += `   Longueur totale: ${item.customMeasurements.length}cm\n`
          if (item.customMeasurements.notes) {
            message += `   Notes: ${item.customMeasurements.notes}\n`
          }
        }
      })

      message += `\n━━━━━━━━━━━━━━━━━━━━\n`
      message += `💰 *RÉCAPITULATIF*\n`
      message += `Sous-total: ${formatPrice(subtotal)}\n`
      message += `Livraison: ${shipping === 0 ? "GRATUITE ✨" : formatPrice(shipping)}\n`
      message += `*TOTAL: ${formatPrice(total)}*\n\n`
      message += `Merci de confirmer cette commande ! 🙏`

      console.log("[v0] WhatsApp message created, redirecting...")

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

      // Clear cart and redirect to WhatsApp
      clearCart()
      window.open(whatsappUrl, "_blank")

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      console.error("[v0] WhatsApp checkout error:", error)
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
              <p className="text-gray-600">Remplissez vos informations pour finaliser votre achat via WhatsApp</p>
            </div>

            <form onSubmit={handleWhatsAppCheckout} className="space-y-8">
              <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-rose-700">
                    <User className="w-5 h-5 mr-2" />
                    Vos informations
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Ces informations seront utilisées pour créer votre compte Si-Chic
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-rose-700">
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-rose-700">
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-rose-700">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="+221 XX XXX XX XX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-rose-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-rose-600" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse complète *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-rose-300"
                      placeholder="Numéro, rue, quartier..."
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300"
                        placeholder="Dakar"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Instructions de livraison (optionnel)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-rose-300"
                      placeholder="Étage, code d'accès, instructions spéciales..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

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
                    <p className="text-sm text-gray-700 mb-2">
                      ✅ Paiement sécurisé à la livraison ou par mobile money
                    </p>
                    <p className="text-sm text-gray-700 mb-2">✅ Service client personnalisé</p>
                    <p className="text-sm text-gray-700">✅ Création automatique de votre compte Si-Chic</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Préparation...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Commander via WhatsApp - {formatPrice(total)}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </form>
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
