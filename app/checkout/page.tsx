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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCartStore } from "@/lib/cart-store"
import { CreditCard, Smartphone, Building2, Shield, Truck, MapPin, User, ArrowLeft, UserPlus } from "lucide-react"
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

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [createAccount, setCreateAccount] = useState(true)

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
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (createAccount) {
        if (formData.password !== formData.confirmPassword) {
          alert("Les mots de passe ne correspondent pas")
          setIsLoading(false)
          return
        }

        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          createdAt: new Date().toISOString(),
        }

        localStorage.setItem("si-chic-user", JSON.stringify(userData))
        console.log("Account created successfully:", userData)
      }

      await new Promise((resolve) => setTimeout(resolve, 3000))

      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Payment error:", error)
      alert("Erreur lors du traitement de la commande")
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
              <p className="text-gray-600">
                Remplissez vos informations pour finaliser votre achat et créer votre compte Si-Chic
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-rose-600" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300"
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
                        className="border-gray-200 focus:border-rose-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-gray-200 focus:border-rose-300"
                        placeholder="+221 XX XXX XX XX"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-rose-600" />
                    Création de votre compte Si-Chic
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="createAccount" checked={createAccount} onCheckedChange={setCreateAccount} />
                    <Label
                      htmlFor="createAccount"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Créer un compte pour suivre mes commandes et bénéficier d'avantages exclusifs
                    </Label>
                  </div>

                  {createAccount && (
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe *</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          required={createAccount}
                          value={formData.password}
                          onChange={handleInputChange}
                          className="border-gray-200 focus:border-rose-300"
                          placeholder="Minimum 6 caractères"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required={createAccount}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="border-gray-200 focus:border-rose-300"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                    <div className="flex items-start space-x-2">
                      <UserPlus className="w-5 h-5 text-rose-600 mt-0.5" />
                      <div className="text-sm text-rose-800">
                        <p className="font-medium mb-1">Avantages de votre compte Si-Chic :</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Suivi de vos commandes en temps réel</li>
                          <li>Historique de vos achats</li>
                          <li>Offres exclusives et ventes privées</li>
                          <li>Programme de fidélité</li>
                        </ul>
                      </div>
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-rose-600" />
                    Mode de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center flex-1 cursor-pointer">
                        <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium">Carte bancaire</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard</p>
                        </div>
                      </Label>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Sécurisé
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="orange" id="orange" />
                      <Label htmlFor="orange" className="flex items-center flex-1 cursor-pointer">
                        <Smartphone className="w-5 h-5 mr-3 text-orange-600" />
                        <div>
                          <p className="font-medium">Orange Money</p>
                          <p className="text-sm text-gray-500">Paiement mobile</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="wave" id="wave" />
                      <Label htmlFor="wave" className="flex items-center flex-1 cursor-pointer">
                        <Smartphone className="w-5 h-5 mr-3 text-blue-600" />
                        <div>
                          <p className="font-medium">Wave</p>
                          <p className="text-sm text-gray-500">Paiement mobile</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center flex-1 cursor-pointer">
                        <Building2 className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="font-medium">Virement bancaire</p>
                          <p className="text-sm text-gray-500">Paiement à la livraison disponible</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">
                        Tous vos paiements sont sécurisés et cryptés. Vos données bancaires ne sont jamais stockées.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Finaliser la commande - {formatPrice(total)}
                  </>
                )}
              </Button>
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
                  <Shield className="w-4 h-4" />
                  <span>Paiement 100% sécurisé</span>
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
