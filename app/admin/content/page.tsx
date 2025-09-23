"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Edit, Eye, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

const contentSections = [
  {
    id: "hero",
    name: "Section Héro",
    description: "Contenu principal de la page d'accueil",
    status: "active",
    lastModified: "Il y a 2 heures",
  },
  {
    id: "about",
    name: "À propos",
    description: "Section valeurs et présentation",
    status: "active",
    lastModified: "Il y a 1 jour",
  },
  {
    id: "categories",
    name: "Catégories",
    description: "Descriptions des catégories de produits",
    status: "active",
    lastModified: "Il y a 3 jours",
  },
  {
    id: "footer",
    name: "Pied de page",
    description: "Liens et informations de contact",
    status: "active",
    lastModified: "Il y a 1 semaine",
  },
]

const heroContent = {
  title: "Élégance Professionnelle",
  subtitle: "Collection Automne-Hiver 2024",
  description:
    "Découvrez notre nouvelle collection de vêtements professionnels pour femmes musulmanes. Alliant modernité et respect des valeurs, nos créations subliment votre style au quotidien.",
  ctaText: "Découvrir la collection",
  ctaSecondary: "Commande sur mesure",
  badges: [
    { text: "Certifié Halal", active: true },
    { text: "Paiement Sécurisé", active: true },
    { text: "Livraison 24h", active: true },
  ],
  stats: {
    rating: "4.9",
    customers: "2,847",
    reviews: "1,234",
  },
}

export default function ContentManagement() {
  const [selectedSection, setSelectedSection] = useState("hero")
  const [heroData, setHeroData] = useState(heroContent)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // Ici on sauvegarderait les données
    setIsEditing(false)
    console.log("Contenu sauvegardé:", heroData)
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion du contenu</h1>
              <p className="text-gray-600 mt-2">Modifiez le contenu de votre site Si-Chic</p>
            </div>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle section
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar des sections */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Sections du site</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {contentSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                          selectedSection === section.id ? "bg-rose-50 border-r-2 border-rose-600" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{section.name}</h3>
                          <Badge variant={section.status === "active" ? "default" : "secondary"} className="text-xs">
                            {section.status === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{section.description}</p>
                        <p className="text-xs text-gray-500">{section.lastModified}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Section Héro</CardTitle>
                      <CardDescription>Modifiez le contenu principal de votre page d'accueil</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Aperçu
                      </Button>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Annuler" : "Modifier"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Contenu</TabsTrigger>
                      <TabsTrigger value="badges">Badges</TabsTrigger>
                      <TabsTrigger value="stats">Statistiques</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-6 mt-6">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="title">Titre principal</Label>
                          <Input
                            id="title"
                            value={heroData.title}
                            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subtitle">Sous-titre</Label>
                          <Input
                            id="subtitle"
                            value={heroData.subtitle}
                            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={heroData.description}
                            onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                            disabled={!isEditing}
                            rows={4}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cta1">Bouton principal</Label>
                            <Input
                              id="cta1"
                              value={heroData.ctaText}
                              onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cta2">Bouton secondaire</Label>
                            <Input
                              id="cta2"
                              value={heroData.ctaSecondary}
                              onChange={(e) => setHeroData({ ...heroData, ctaSecondary: e.target.value })}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="badges" className="space-y-6 mt-6">
                      <div className="space-y-4">
                        {heroData.badges.map((badge, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={badge.active}
                                onChange={(e) => {
                                  const newBadges = [...heroData.badges]
                                  newBadges[index].active = e.target.checked
                                  setHeroData({ ...heroData, badges: newBadges })
                                }}
                                disabled={!isEditing}
                                className="rounded"
                              />
                              <Input
                                value={badge.text}
                                onChange={(e) => {
                                  const newBadges = [...heroData.badges]
                                  newBadges[index].text = e.target.value
                                  setHeroData({ ...heroData, badges: newBadges })
                                }}
                                disabled={!isEditing}
                                className="flex-1"
                              />
                            </div>
                            {isEditing && (
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <Button variant="outline" className="w-full bg-transparent">
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter un badge
                          </Button>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-6 mt-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="rating">Note moyenne</Label>
                          <Input
                            id="rating"
                            value={heroData.stats.rating}
                            onChange={(e) =>
                              setHeroData({
                                ...heroData,
                                stats: { ...heroData.stats, rating: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="customers">Nombre de clientes</Label>
                          <Input
                            id="customers"
                            value={heroData.stats.customers}
                            onChange={(e) =>
                              setHeroData({
                                ...heroData,
                                stats: { ...heroData.stats, customers: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reviews">Nombre d'avis</Label>
                          <Input
                            id="reviews"
                            value={heroData.stats.reviews}
                            onChange={(e) =>
                              setHeroData({
                                ...heroData,
                                stats: { ...heroData.stats, reviews: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {isEditing && (
                    <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
