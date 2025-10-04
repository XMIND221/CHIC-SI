"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Ruler, User, MapPin, Phone, Mail, MessageSquare } from "lucide-react"
import Image from "next/image"

interface WhatsAppOrderModalProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    material?: string
  }
  onClose: () => void
}

const WHATSAPP_NUMBER = "221777223755"

export default function WhatsAppOrderModal({ product, onClose }: WhatsAppOrderModalProps) {
  const [formData, setFormData] = useState({
    // Informations client
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",

    // Mesures (optionnelles)
    bust: "",
    waist: "",
    hips: "",
    armLength: "",
    garmentLength: "",
    shoulderWidth: "",

    // Notes
    notes: "",
    needsCustomMeasurements: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.firstName) newErrors.firstName = "Prénom requis"
    if (!formData.lastName) newErrors.lastName = "Nom requis"
    if (!formData.phone) newErrors.phone = "Téléphone requis"
    if (!formData.address) newErrors.address = "Adresse requise"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Créer le message WhatsApp
    let message = `🛍️ *NOUVELLE COMMANDE SI-CHIC*\n\n`
    message += `📦 *Produit:* ${product.name}\n`
    message += `💰 *Prix:* ${formatPrice(product.price)}\n\n`

    message += `👤 *INFORMATIONS CLIENT*\n`
    message += `Nom: ${formData.firstName} ${formData.lastName}\n`
    message += `Téléphone: ${formData.phone}\n`
    if (formData.email) message += `Email: ${formData.email}\n`
    message += `Adresse: ${formData.address}\n`
    if (formData.city) message += `Ville: ${formData.city}\n\n`

    // Ajouter les mesures si fournies
    if (formData.needsCustomMeasurements && (formData.bust || formData.waist || formData.hips)) {
      message += `📏 *MESURES PERSONNALISÉES*\n`
      if (formData.bust) message += `Tour de poitrine: ${formData.bust} cm\n`
      if (formData.waist) message += `Tour de taille: ${formData.waist} cm\n`
      if (formData.hips) message += `Tour de hanches: ${formData.hips} cm\n`
      if (formData.shoulderWidth) message += `Largeur d'épaules: ${formData.shoulderWidth} cm\n`
      if (formData.armLength) message += `Longueur de bras: ${formData.armLength} cm\n`
      if (formData.garmentLength) message += `Longueur souhaitée: ${formData.garmentLength} cm\n`
      message += `\n`
    }

    if (formData.notes) {
      message += `📝 *Notes:* ${formData.notes}\n`
    }

    // Encoder et ouvrir WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")

    onClose()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto elegant-shadow-lg animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border-b border-rose-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif font-bold text-gray-900 mb-2">Commander sur WhatsApp</CardTitle>
              <div className="flex items-center gap-3">
                <Badge className="bg-rose-100 text-rose-700 border-rose-200 font-medium">{product.name}</Badge>
                <span className="text-lg font-semibold text-rose-600">{formatPrice(product.price)}</span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-rose-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Aperçu du produit */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-rose-50/50 to-amber-50/50 rounded-lg border border-rose-100">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden elegant-shadow">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                {product.material && <p className="text-sm text-gray-600">{product.material}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
                <User className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-semibold text-gray-900">Vos informations</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    Prénom *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`mt-1 ${errors.firstName ? "border-red-500" : "border-rose-200 focus:border-rose-400"}`}
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Nom *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`mt-1 ${errors.lastName ? "border-red-500" : "border-rose-200 focus:border-rose-400"}`}
                    placeholder="Votre nom"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="w-4 h-4 text-rose-600" />
                    Téléphone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`mt-1 ${errors.phone ? "border-red-500" : "border-rose-200 focus:border-rose-400"}`}
                    placeholder="+221 XX XXX XX XX"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Mail className="w-4 h-4 text-rose-600" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 border-rose-200 focus:border-rose-400"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    Adresse de livraison *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`mt-1 ${errors.address ? "border-red-500" : "border-rose-200 focus:border-rose-400"}`}
                    placeholder="Rue, quartier..."
                  />
                  {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    Ville
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1 border-rose-200 focus:border-rose-400"
                    placeholder="Dakar, Thiès..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <input
                  type="checkbox"
                  id="needsCustom"
                  checked={formData.needsCustomMeasurements}
                  onChange={(e) => setFormData({ ...formData, needsCustomMeasurements: e.target.checked })}
                  className="w-4 h-4 text-rose-600 border-amber-300 rounded focus:ring-rose-500"
                />
                <Label
                  htmlFor="needsCustom"
                  className="text-sm font-medium text-amber-900 cursor-pointer flex items-center gap-2"
                >
                  <Ruler className="w-4 h-4" />
                  J'ai besoin de mesures personnalisées
                </Label>
              </div>

              {formData.needsCustomMeasurements && (
                <div className="space-y-4 p-4 bg-rose-50/30 border border-rose-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Remplissez vos mesures pour une confection sur mesure (optionnel)
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bust" className="text-sm text-gray-700">
                        Tour de poitrine (cm)
                      </Label>
                      <Input
                        id="bust"
                        type="number"
                        value={formData.bust}
                        onChange={(e) => setFormData({ ...formData, bust: e.target.value })}
                        className="mt-1 border-rose-200"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waist" className="text-sm text-gray-700">
                        Tour de taille (cm)
                      </Label>
                      <Input
                        id="waist"
                        type="number"
                        value={formData.waist}
                        onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                        className="mt-1 border-rose-200"
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hips" className="text-sm text-gray-700">
                        Tour de hanches (cm)
                      </Label>
                      <Input
                        id="hips"
                        type="number"
                        value={formData.hips}
                        onChange={(e) => setFormData({ ...formData, hips: e.target.value })}
                        className="mt-1 border-rose-200"
                        placeholder="95"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shoulderWidth" className="text-sm text-gray-700">
                        Largeur d'épaules (cm)
                      </Label>
                      <Input
                        id="shoulderWidth"
                        type="number"
                        value={formData.shoulderWidth}
                        onChange={(e) => setFormData({ ...formData, shoulderWidth: e.target.value })}
                        className="mt-1 border-rose-200"
                        placeholder="38"
                      />
                    </div>
                    <div>
                      <Label htmlFor="armLength" className="text-sm text-gray-700">
                        Longueur de bras (cm)
                      </Label>
                      <Input
                        id="armLength"
                        type="number"
                        value={formData.armLength}
                        onChange={(e) => setFormData({ ...formData, armLength: e.target.value })}
                        className="mt-1 border-rose-200"
                        placeholder="60"
                      />
                    </div>
                    <div>
                      <Label htmlFor="garmentLength" className="text-sm text-gray-700">
                        Longueur souhaitée (cm)
                      </Label>
                      <Input
                        id="garmentLength"
                        type="number"
                        value={formData.garmentLength}
                        onChange={(e) => setFormData({ ...formData, garmentLength: e.target.value })}
                        className="mt-1 border-rose-200"
                        placeholder="85"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notes additionnelles */}
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-rose-600" />
                Notes ou demandes spéciales
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 min-h-[80px] border-rose-200 focus:border-rose-400"
                placeholder="Couleur préférée, détails supplémentaires..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-rose-200 hover:bg-rose-50 bg-transparent"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-medium elegant-shadow"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Envoyer sur WhatsApp
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
