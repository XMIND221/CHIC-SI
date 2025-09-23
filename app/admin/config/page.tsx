"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Globe, Mail, Phone, MapPin, Clock, Shield, Truck, CreditCard } from "lucide-react"
import { useState } from "react"

const siteConfig = {
  general: {
    siteName: "Si-Chic",
    tagline: "Élégance Professionnelle pour Femmes Musulmanes",
    description:
      "Boutique en ligne spécialisée dans les vêtements professionnels pour femmes musulmanes. Découvrez notre collection alliant modernité et respect des valeurs.",
    language: "fr",
    timezone: "Africa/Dakar",
    currency: "FCFA",
  },
  contact: {
    email: "contact@si-chic.com",
    phone: "+221 77 123 45 67",
    whatsapp: "+221 77 123 45 67",
    address: "Dakar, Sénégal",
    workingHours: "Lun-Ven: 8h-18h, Sam: 9h-15h",
  },
  business: {
    companyName: "Si-Chic SARL",
    registrationNumber: "SN-DKR-2024-001234",
    taxNumber: "123456789",
    bankAccount: "SN08 SN01 0123 4567 8901 2345 67",
    deliveryZones: ["Dakar", "Thiès", "Saint-Louis", "Kaolack"],
    returnPolicy: "30 jours",
    warrantyPeriod: "6 mois",
  },
  features: {
    multiLanguage: false,
    guestCheckout: true,
    wishlist: true,
    reviews: true,
    newsletter: true,
    loyaltyProgram: false,
    affiliateProgram: false,
  },
}

export default function SiteConfiguration() {
  const [config, setConfig] = useState(siteConfig)

  const handleSave = () => {
    console.log("Configuration sauvegardée:", config)
  }

  const updateConfig = (section: string, field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configuration du site</h1>
              <p className="text-gray-600 mt-2">Gérez les paramètres généraux de votre boutique</p>
            </div>
            <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="business">Entreprise</TabsTrigger>
              <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Informations générales
                  </CardTitle>
                  <CardDescription>Paramètres de base de votre site web</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="siteName">Nom du site</Label>
                      <Input
                        id="siteName"
                        value={config.general.siteName}
                        onChange={(e) => updateConfig("general", "siteName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tagline">Slogan</Label>
                      <Input
                        id="tagline"
                        value={config.general.tagline}
                        onChange={(e) => updateConfig("general", "tagline", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description du site</Label>
                    <Textarea
                      id="description"
                      value={config.general.description}
                      onChange={(e) => updateConfig("general", "description", e.target.value)}
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="language">Langue</Label>
                      <Select
                        value={config.general.language}
                        onValueChange={(value) => updateConfig("general", "language", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Fuseau horaire</Label>
                      <Select
                        value={config.general.timezone}
                        onValueChange={(value) => updateConfig("general", "timezone", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Dakar">Africa/Dakar</SelectItem>
                          <SelectItem value="Africa/Casablanca">Africa/Casablanca</SelectItem>
                          <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Devise</Label>
                      <Select
                        value={config.general.currency}
                        onValueChange={(value) => updateConfig("general", "currency", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FCFA">FCFA</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Informations de contact
                  </CardTitle>
                  <CardDescription>Coordonnées affichées sur votre site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={config.contact.email}
                        onChange={(e) => updateConfig("contact", "email", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        value={config.contact.phone}
                        onChange={(e) => updateConfig("contact", "phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        value={config.contact.whatsapp}
                        onChange={(e) => updateConfig("contact", "whatsapp", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="workingHours" className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Horaires
                      </Label>
                      <Input
                        id="workingHours"
                        value={config.contact.workingHours}
                        onChange={(e) => updateConfig("contact", "workingHours", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Adresse
                    </Label>
                    <Textarea
                      id="address"
                      value={config.contact.address}
                      onChange={(e) => updateConfig("contact", "address", e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Informations légales
                  </CardTitle>
                  <CardDescription>Données légales et commerciales de votre entreprise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Raison sociale</Label>
                      <Input
                        id="companyName"
                        value={config.business.companyName}
                        onChange={(e) => updateConfig("business", "companyName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="registrationNumber">Numéro d'enregistrement</Label>
                      <Input
                        id="registrationNumber"
                        value={config.business.registrationNumber}
                        onChange={(e) => updateConfig("business", "registrationNumber", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="taxNumber">Numéro fiscal</Label>
                      <Input
                        id="taxNumber"
                        value={config.business.taxNumber}
                        onChange={(e) => updateConfig("business", "taxNumber", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankAccount" className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Compte bancaire
                      </Label>
                      <Input
                        id="bankAccount"
                        value={config.business.bankAccount}
                        onChange={(e) => updateConfig("business", "bankAccount", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="returnPolicy" className="flex items-center">
                        <Truck className="w-4 h-4 mr-2" />
                        Politique de retour
                      </Label>
                      <Input
                        id="returnPolicy"
                        value={config.business.returnPolicy}
                        onChange={(e) => updateConfig("business", "returnPolicy", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="warrantyPeriod">Période de garantie</Label>
                      <Input
                        id="warrantyPeriod"
                        value={config.business.warrantyPeriod}
                        onChange={(e) => updateConfig("business", "warrantyPeriod", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Zones de livraison</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {config.business.deliveryZones.map((zone, index) => (
                        <span key={index} className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm">
                          {zone}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Modifier les zones
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Fonctionnalités du site</CardTitle>
                  <CardDescription>Activez ou désactivez les fonctionnalités de votre boutique</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium">Multi-langues</Label>
                        <p className="text-sm text-gray-600">Support de plusieurs langues</p>
                      </div>
                      <Switch
                        checked={config.features.multiLanguage}
                        onCheckedChange={(checked) => updateConfig("features", "multiLanguage", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium">Commande invité</Label>
                        <p className="text-sm text-gray-600">Achat sans création de compte</p>
                      </div>
                      <Switch
                        checked={config.features.guestCheckout}
                        onCheckedChange={(checked) => updateConfig("features", "guestCheckout", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium">Liste de souhaits</Label>
                        <p className="text-sm text-gray-600">Produits favoris des clients</p>
                      </div>
                      <Switch
                        checked={config.features.wishlist}
                        onCheckedChange={(checked) => updateConfig("features", "wishlist", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium">Avis clients</Label>
                        <p className="text-sm text-gray-600">Commentaires et notes</p>
                      </div>
                      <Switch
                        checked={config.features.reviews}
                        onCheckedChange={(checked) => updateConfig("features", "reviews", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium">Newsletter</Label>
                        <p className="text-sm text-gray-600">Inscription à la newsletter</p>
                      </div>
                      <Switch
                        checked={config.features.newsletter}
                        onCheckedChange={(checked) => updateConfig("features", "newsletter", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium">Programme de fidélité</Label>
                        <p className="text-sm text-gray-600">Points et récompenses</p>
                      </div>
                      <Switch
                        checked={config.features.loyaltyProgram}
                        onCheckedChange={(checked) => updateConfig("features", "loyaltyProgram", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
