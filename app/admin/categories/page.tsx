"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Tag, ArrowLeft } from "lucide-react"
import { getCategories, createCategory, updateCategory, deleteCategory, type Category } from "./actions"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useRouter } from "next/navigation"

export default function CategoriesAdminPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
      alert("Erreur lors du chargement des catégories")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData)
        alert("✅ Catégorie modifiée avec succès!")
      } else {
        await createCategory(formData)
        alert("✅ Catégorie créée avec succès!")
      }
      setShowForm(false)
      setEditingCategory(null)
      await loadCategories()
    } catch (error) {
      console.error("Error saving category:", error)
      alert("❌ Erreur lors de la sauvegarde")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return

    try {
      await deleteCategory(id)
      alert("✅ Catégorie supprimée avec succès!")
      await loadCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
      alert("❌ Erreur lors de la suppression")
    }
  }

  if (isLoading) {
    return <div className="p-8">Chargement...</div>
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
            <h1 className="text-4xl font-serif font-bold">Catégories</h1>
            <p className="text-muted-foreground mt-2">Gérez les catégories de produits</p>
          </div>
          <Button
            onClick={() => {
              setEditingCategory(null)
              setShowForm(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Catégorie
          </Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name}
                  required
                  placeholder="Hijabs Premium"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingCategory?.description || ""}
                  placeholder="Soie, mousseline et tissus nobles"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  defaultValue={editingCategory?.image_url || ""}
                  placeholder="/category-image.jpg"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingCategory ? "Modifier" : "Créer"}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingCategory(null)
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded flex items-center justify-center overflow-hidden">
                  {category.image_url ? (
                    <img
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Tag className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCategory(category)
                      setShowForm(true)
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
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
