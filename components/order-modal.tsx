"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { User, Ruler, MapPin } from "lucide-react"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: OrderFormData) => void
  isLoading?: boolean
}

export interface OrderFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
  measurements: {
    bust: string
    waist: string
    hips: string
    armLength: string
    length: string
    shoulderWidth: string
    notes: string
  }
  deliveryNotes: string
}

export default function OrderModal({ isOpen, onClose, onSubmit, isLoading = false }: OrderModalProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sénégal",
    measurements: {
      bust: "",
      waist: "",
      hips: "",
      armLength: "",
      length: "",
      shoulderWidth: "",
      notes: "",
    },
    deliveryNotes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith("measurements.")) {
      const measurementKey = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [measurementKey]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-rose-700">Finaliser votre commande</DialogTitle>
          <DialogDescription>
            Remplissez vos informations pour créer votre compte et finaliser votre commande
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <User className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Informations personnelles</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+221 XX XXX XX XX"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Mesures détaillées */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <Ruler className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Mesures détaillées (en cm)</h3>
            </div>
            <p className="text-sm text-gray-600">
              Ces mesures nous permettront de créer votre vêtement sur mesure parfaitement ajusté
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="measurements.bust">Tour de poitrine *</Label>
                <Input
                  id="measurements.bust"
                  name="measurements.bust"
                  type="number"
                  required
                  value={formData.measurements.bust}
                  onChange={handleInputChange}
                  placeholder="Ex: 90"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurements.waist">Tour de taille *</Label>
                <Input
                  id="measurements.waist"
                  name="measurements.waist"
                  type="number"
                  required
                  value={formData.measurements.waist}
                  onChange={handleInputChange}
                  placeholder="Ex: 70"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurements.hips">Tour de hanches *</Label>
                <Input
                  id="measurements.hips"
                  name="measurements.hips"
                  type="number"
                  required
                  value={formData.measurements.hips}
                  onChange={handleInputChange}
                  placeholder="Ex: 95"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="measurements.armLength">Longueur de bras *</Label>
                <Input
                  id="measurements.armLength"
                  name="measurements.armLength"
                  type="number"
                  required
                  value={formData.measurements.armLength}
                  onChange={handleInputChange}
                  placeholder="Ex: 60"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurements.length">Longueur totale *</Label>
                <Input
                  id="measurements.length"
                  name="measurements.length"
                  type="number"
                  required
                  value={formData.measurements.length}
                  onChange={handleInputChange}
                  placeholder="Ex: 140"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurements.shoulderWidth">Largeur d'épaules</Label>
                <Input
                  id="measurements.shoulderWidth"
                  name="measurements.shoulderWidth"
                  type="number"
                  value={formData.measurements.shoulderWidth}
                  onChange={handleInputChange}
                  placeholder="Ex: 40"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="measurements.notes">Notes sur les mesures (optionnel)</Label>
              <Textarea
                id="measurements.notes"
                name="measurements.notes"
                value={formData.measurements.notes}
                onChange={handleInputChange}
                placeholder="Précisions supplémentaires sur vos mesures..."
                rows={2}
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
          </div>

          <Separator />

          {/* Adresse de livraison */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <MapPin className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Adresse de livraison</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse complète *</Label>
              <Textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Numéro, rue, quartier..."
                rows={2}
                className="border-rose-200 focus:border-rose-400"
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
                  placeholder="Dakar"
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="border-rose-200 focus:border-rose-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="border-rose-200 focus:border-rose-400"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryNotes">Instructions de livraison (optionnel)</Label>
              <Textarea
                id="deliveryNotes"
                name="deliveryNotes"
                value={formData.deliveryNotes}
                onChange={handleInputChange}
                placeholder="Étage, code d'accès, instructions spéciales..."
                rows={2}
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
            <p className="text-sm text-gray-700">
              ✨ <strong>Votre compte sera créé automatiquement</strong> après votre première commande. Vous recevrez
              vos identifiants par email.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-rose-600 hover:bg-rose-700 text-white min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Traitement...
                </>
              ) : (
                "Finaliser la commande"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
