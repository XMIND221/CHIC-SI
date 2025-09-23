"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ruler, Info, CheckCircle, AlertCircle, Eye, ArrowLeft } from "lucide-react"

interface CustomOrderFormProps {
  product: {
    id: number
    name: string
    price: number
    image: string
  }
  onSubmit: (measurements: any) => void
  onCancel: () => void
}

export default function CustomOrderForm({ product, onSubmit, onCancel }: CustomOrderFormProps) {
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    armLength: "",
    garmentLength: "",
    shoulderWidth: "",
    notes: "",
  })

  const [showGuide, setShowGuide] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validationRanges = {
    bust: { min: 70, max: 150, label: "Tour de poitrine" },
    waist: { min: 50, max: 120, label: "Tour de taille" },
    hips: { min: 70, max: 160, label: "Tour de hanches" },
    armLength: { min: 40, max: 80, label: "Longueur de bras" },
    garmentLength: { min: 60, max: 150, label: "Longueur souhaitée" },
    shoulderWidth: { min: 30, max: 60, label: "Largeur d'épaules" },
  }

  const validateMeasurement = (field: string, value: string) => {
    const numValue = Number.parseFloat(value)
    const range = validationRanges[field as keyof typeof validationRanges]

    if (!range) return ""

    if (isNaN(numValue)) return ""
    if (numValue < range.min || numValue > range.max) {
      return `${range.label} doit être entre ${range.min} et ${range.max} cm`
    }
    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!measurements.bust) newErrors.bust = "Tour de poitrine requis"
    if (!measurements.waist) newErrors.waist = "Tour de taille requis"
    if (!measurements.hips) newErrors.hips = "Tour de hanches requis"

    // Validate ranges
    Object.keys(validationRanges).forEach((field) => {
      const value = measurements[field as keyof typeof measurements]
      if (value) {
        const error = validateMeasurement(field, value)
        if (error) newErrors[field] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const customOrder = {
      ...product,
      isCustom: true,
      measurements,
      price: product.price + 15000, // Supplément pour personnalisation
    }
    onSubmit(customOrder)
  }

  const handleInputChange = (field: string, value: string) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    if (value) {
      const error = validateMeasurement(field, value)
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }))
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-champagne-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="mr-3 p-2 hover:bg-rose-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-rose-600" />
              </Button>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-rose-600" />
                  Commande Personnalisée
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">{product.name}</p>
              </div>
            </div>
            <Badge className="bg-rose-100 text-rose-800 border-rose-200">Sur Mesure</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guide des mesures amélioré */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Guide des mesures</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Prenez vos mesures en portant des sous-vêtements ajustés</li>
                      <li>• Utilisez un mètre ruban souple</li>
                      <li>• Restez droite et détendue</li>
                      <li>• Toutes les mesures sont en centimètres</li>
                    </ul>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGuide(!showGuide)}
                  className="ml-4 text-blue-600 border-blue-200 hover:bg-blue-100"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Guide visuel
                </Button>
              </div>

              {showGuide && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div>
                      <h5 className="font-medium mb-2">Comment mesurer :</h5>
                      <ul className="space-y-2">
                        <li>
                          <strong>Tour de poitrine :</strong> Autour de la partie la plus large de la poitrine
                        </li>
                        <li>
                          <strong>Tour de taille :</strong> À la partie la plus étroite du torse
                        </li>
                        <li>
                          <strong>Tour de hanches :</strong> Autour de la partie la plus large des hanches
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Mesures complémentaires :</h5>
                      <ul className="space-y-2">
                        <li>
                          <strong>Longueur de bras :</strong> De l'épaule au poignet
                        </li>
                        <li>
                          <strong>Largeur d'épaules :</strong> D'une épaule à l'autre
                        </li>
                        <li>
                          <strong>Longueur souhaitée :</strong> Du cou à la longueur désirée
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mesures principales avec validation */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bust" className="text-sm font-medium text-gray-700">
                  Tour de poitrine (cm) *
                </Label>
                <Input
                  id="bust"
                  type="number"
                  placeholder="Ex: 90"
                  value={measurements.bust}
                  onChange={(e) => handleInputChange("bust", e.target.value)}
                  required
                  className={`mt-1 ${errors.bust ? "border-red-500" : ""}`}
                />
                {errors.bust && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.bust}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="waist" className="text-sm font-medium text-gray-700">
                  Tour de taille (cm) *
                </Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="Ex: 70"
                  value={measurements.waist}
                  onChange={(e) => handleInputChange("waist", e.target.value)}
                  required
                  className={`mt-1 ${errors.waist ? "border-red-500" : ""}`}
                />
                {errors.waist && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.waist}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="hips" className="text-sm font-medium text-gray-700">
                  Tour de hanches (cm) *
                </Label>
                <Input
                  id="hips"
                  type="number"
                  placeholder="Ex: 95"
                  value={measurements.hips}
                  onChange={(e) => handleInputChange("hips", e.target.value)}
                  required
                  className={`mt-1 ${errors.hips ? "border-red-500" : ""}`}
                />
                {errors.hips && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.hips}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="shoulderWidth" className="text-sm font-medium text-gray-700">
                  Largeur d'épaules (cm)
                </Label>
                <Input
                  id="shoulderWidth"
                  type="number"
                  placeholder="Ex: 38"
                  value={measurements.shoulderWidth}
                  onChange={(e) => handleInputChange("shoulderWidth", e.target.value)}
                  className={`mt-1 ${errors.shoulderWidth ? "border-red-500" : ""}`}
                />
                {errors.shoulderWidth && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.shoulderWidth}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="armLength" className="text-sm font-medium text-gray-700">
                  Longueur de bras (cm)
                </Label>
                <Input
                  id="armLength"
                  type="number"
                  placeholder="Ex: 60"
                  value={measurements.armLength}
                  onChange={(e) => handleInputChange("armLength", e.target.value)}
                  className={`mt-1 ${errors.armLength ? "border-red-500" : ""}`}
                />
                {errors.armLength && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.armLength}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="garmentLength" className="text-sm font-medium text-gray-700">
                  Longueur souhaitée (cm)
                </Label>
                <Input
                  id="garmentLength"
                  type="number"
                  placeholder="Ex: 85"
                  value={measurements.garmentLength}
                  onChange={(e) => handleInputChange("garmentLength", e.target.value)}
                  className={`mt-1 ${errors.garmentLength ? "border-red-500" : ""}`}
                />
                {errors.garmentLength && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.garmentLength}
                  </div>
                )}
              </div>
            </div>

            {/* Notes additionnelles */}
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes additionnelles
              </Label>
              <Textarea
                id="notes"
                placeholder="Ajoutez ici toute demande spécifique ou information importante..."
                value={measurements.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>

            {/* Prix personnalisé */}
            <div className="bg-champagne-50 border border-champagne-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Prix sur mesure</p>
                  <p className="text-sm text-gray-600">Supplément personnalisation: +15 000 FCFA</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-rose-600">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "XAF",
                      minimumFractionDigits: 0,
                    })
                      .format(product.price + 15000)
                      .replace("XAF", "FCFA")}
                  </p>
                </div>
              </div>
            </div>

            {/* Délai de confection */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">Délai de confection</p>
                  <p className="text-sm text-yellow-800">2-3 semaines pour la réalisation sur mesure</p>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                Annuler
              </Button>
              <Button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
                Ajouter au panier
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
