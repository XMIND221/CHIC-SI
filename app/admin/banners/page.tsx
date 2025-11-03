"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2, ImageIcon, ArrowLeft } from "lucide-react"
import { getBanners, createBanner, updateBanner, deleteBanner, type Banner } from "./actions"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useRouter } from "next/navigation"

export default function BannersAdminPage() {
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadBanners()
  }, [])

  async function loadBanners() {
    try {
      const data = await getBanners()
      setBanners(data)
    } catch (error) {
      console.error("Error loading banners:", error)
      alert("Erreur lors du chargement des bannières")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, formData)
        alert("✅ Bannière modifiée avec succès!")
      } else {
        await createBanner(formData)
        alert("✅ Bannière créée avec succès!")
      }
      setShowForm(false)
      setEditingBanner(null)
      await loadBanners()
    } catch (error) {
      console.error("Error saving banner:", error)
      alert("❌ Erreur lors de la sauvegarde")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette bannière ?")) return

    try {
      await deleteBanner(id)
      alert("✅ Bannière supprimée avec succès!")
      await loadBanners()
    } catch (error) {
      console.error("Error deleting banner:", error)
      alert("❌ Erreur lors de la suppression")
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8">Chargement...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/dashboard")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-serif font-bold">Bannières</h1>
            <p className="text-muted-foreground mt-2">Gérez les bannières du carousel</p>
          </div>
          <Button
            onClick={() => {
              setEditingBanner(null)
              setShowForm(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Bannière
          </Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingBanner?.title}
                  required
                  placeholder="Collections Exclusives"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Sous-titre</Label>
                <Textarea
                  id="subtitle"
                  name="subtitle"
                  defaultValue={editingBanner?.subtitle || ""}
                  placeholder="L'art de la couture française..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="image_url">URL de l'image *</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  defaultValue={editingBanner?.image_url}
                  required
                  placeholder="/banner-image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="display_order">Ordre d'affichage</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingBanner?.display_order || 0}
                  placeholder="0"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  value="true"
                  defaultChecked={editingBanner?.is_active ?? true}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_active">Actif</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingBanner ? "Modifier" : "Créer"}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingBanner(null)
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid gap-4">
          {banners.map((banner) => (
            <Card key={banner.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-32 h-20 bg-muted rounded flex items-center justify-center overflow-hidden">
                  {banner.image_url ? (
                    <img
                      src={banner.image_url || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{banner.title}</h3>
                  <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Ordre: {banner.display_order}</span>
                    <span>{banner.is_active ? "✅ Actif" : "❌ Inactif"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingBanner(banner)
                      setShowForm(true)
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(banner.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
