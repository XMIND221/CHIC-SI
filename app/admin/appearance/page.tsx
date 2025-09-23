"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Save, Palette, Type, Layout, Eye } from "lucide-react"
import { useState } from "react"

const colorPalettes = [
  {
    name: "Rose Élégant (Actuel)",
    primary: "#e11d48",
    secondary: "#f1f5f9",
    accent: "#fdf2f8",
    current: true,
  },
  {
    name: "Champagne Luxe",
    primary: "#d4af37",
    secondary: "#f8f6f0",
    accent: "#fefcf3",
    current: false,
  },
  {
    name: "Bleu Royal",
    primary: "#1e40af",
    secondary: "#f1f5f9",
    accent: "#eff6ff",
    current: false,
  },
  {
    name: "Vert Émeraude",
    primary: "#059669",
    secondary: "#f0fdf4",
    accent: "#ecfdf5",
    current: false,
  },
]

const fontPairs = [
  {
    name: "Playfair Display + Inter (Actuel)",
    heading: "Playfair Display",
    body: "Inter",
    current: true,
  },
  {
    name: "Cormorant + Source Sans Pro",
    heading: "Cormorant Garamond",
    body: "Source Sans Pro",
    current: false,
  },
  {
    name: "Crimson Text + Open Sans",
    heading: "Crimson Text",
    body: "Open Sans",
    current: false,
  },
  {
    name: "Libre Baskerville + Nunito",
    heading: "Libre Baskerville",
    body: "Nunito",
    current: false,
  },
]

export default function AppearanceSettings() {
  const [selectedPalette, setSelectedPalette] = useState(0)
  const [selectedFonts, setSelectedFonts] = useState(0)
  const [layoutSettings, setLayoutSettings] = useState({
    containerWidth: [1200],
    borderRadius: [8],
    spacing: [16],
    shadowIntensity: [2],
  })
  const [features, setFeatures] = useState({
    darkMode: false,
    animations: true,
    gradients: true,
    glassmorphism: false,
  })

  const handleSave = () => {
    console.log("Paramètres d'apparence sauvegardés")
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apparence du site</h1>
              <p className="text-gray-600 mt-2">Personnalisez l'apparence de votre boutique Si-Chic</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </Button>
              <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>

          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors">Couleurs</TabsTrigger>
              <TabsTrigger value="typography">Typographie</TabsTrigger>
              <TabsTrigger value="layout">Mise en page</TabsTrigger>
              <TabsTrigger value="effects">Effets</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Palette de couleurs
                  </CardTitle>
                  <CardDescription>
                    Choisissez la palette de couleurs qui représente le mieux votre marque
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {colorPalettes.map((palette, index) => (
                      <div
                        key={index}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPalette === index
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPalette(index)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900">{palette.name}</h3>
                          {palette.current && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Actuel</span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: palette.primary }}
                          />
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: palette.secondary }}
                          />
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: palette.accent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Couleurs personnalisées</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="primary-color">Couleur principale</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            id="primary-color"
                            type="color"
                            value={colorPalettes[selectedPalette].primary}
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input value={colorPalettes[selectedPalette].primary} className="flex-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="secondary-color">Couleur secondaire</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            id="secondary-color"
                            type="color"
                            value={colorPalettes[selectedPalette].secondary}
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input value={colorPalettes[selectedPalette].secondary} className="flex-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="accent-color">Couleur d'accent</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            id="accent-color"
                            type="color"
                            value={colorPalettes[selectedPalette].accent}
                            className="w-12 h-10 p-1 border rounded"
                          />
                          <Input value={colorPalettes[selectedPalette].accent} className="flex-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Type className="w-5 h-5 mr-2" />
                    Typographie
                  </CardTitle>
                  <CardDescription>Sélectionnez les polices qui reflètent l'élégance de votre marque</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {fontPairs.map((pair, index) => (
                      <div
                        key={index}
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedFonts === index
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedFonts(index)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-900">{pair.name}</h3>
                          {pair.current && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Actuel</span>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Titres - {pair.heading}</p>
                            <h2 className="text-2xl font-bold text-gray-900">Élégance Professionnelle</h2>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Texte - {pair.body}</p>
                            <p className="text-gray-700">
                              Découvrez notre collection de vêtements professionnels pour femmes musulmanes. Alliant
                              modernité et respect des valeurs.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layout className="w-5 h-5 mr-2" />
                    Mise en page
                  </CardTitle>
                  <CardDescription>
                    Ajustez les paramètres de mise en page pour optimiser l'expérience utilisateur
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Label className="text-base font-medium">Largeur du contenu</Label>
                    <p className="text-sm text-gray-600 mb-4">
                      Largeur maximale du contenu principal: {layoutSettings.containerWidth[0]}px
                    </p>
                    <Slider
                      value={layoutSettings.containerWidth}
                      onValueChange={(value) => setLayoutSettings({ ...layoutSettings, containerWidth: value })}
                      max={1400}
                      min={1000}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Arrondi des bordures</Label>
                    <p className="text-sm text-gray-600 mb-4">Rayon des bordures: {layoutSettings.borderRadius[0]}px</p>
                    <Slider
                      value={layoutSettings.borderRadius}
                      onValueChange={(value) => setLayoutSettings({ ...layoutSettings, borderRadius: value })}
                      max={20}
                      min={0}
                      step={2}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Espacement</Label>
                    <p className="text-sm text-gray-600 mb-4">
                      Espacement entre les éléments: {layoutSettings.spacing[0]}px
                    </p>
                    <Slider
                      value={layoutSettings.spacing}
                      onValueChange={(value) => setLayoutSettings({ ...layoutSettings, spacing: value })}
                      max={32}
                      min={8}
                      step={4}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Intensité des ombres</Label>
                    <p className="text-sm text-gray-600 mb-4">Niveau d'ombre: {layoutSettings.shadowIntensity[0]}</p>
                    <Slider
                      value={layoutSettings.shadowIntensity}
                      onValueChange={(value) => setLayoutSettings({ ...layoutSettings, shadowIntensity: value })}
                      max={5}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="space-y-6 mt-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Effets visuels</CardTitle>
                  <CardDescription>
                    Activez ou désactivez les effets visuels pour personnaliser l'expérience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Mode sombre</Label>
                      <p className="text-sm text-gray-600">Permet aux utilisateurs de basculer en mode sombre</p>
                    </div>
                    <Switch
                      checked={features.darkMode}
                      onCheckedChange={(checked) => setFeatures({ ...features, darkMode: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Animations</Label>
                      <p className="text-sm text-gray-600">Animations subtiles lors des interactions</p>
                    </div>
                    <Switch
                      checked={features.animations}
                      onCheckedChange={(checked) => setFeatures({ ...features, animations: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Dégradés</Label>
                      <p className="text-sm text-gray-600">Utilise des dégradés pour certains éléments</p>
                    </div>
                    <Switch
                      checked={features.gradients}
                      onCheckedChange={(checked) => setFeatures({ ...features, gradients: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Effet de verre</Label>
                      <p className="text-sm text-gray-600">Effet glassmorphism sur certains composants</p>
                    </div>
                    <Switch
                      checked={features.glassmorphism}
                      onCheckedChange={(checked) => setFeatures({ ...features, glassmorphism: checked })}
                    />
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
