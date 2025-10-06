"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, ArrowLeft, Upload, LinkIcon } from "lucide-react"
import { getTrends, createTrend, updateTrend, deleteTrend } from "./actions"
import Link from "next/link"
import Image from "next/image"

interface Trend {
  id: string
  title: string
  description: string | null
  image_url: string
  link_url: string | null
  is_active: boolean
  display_order: number
}

export default function TrendsAdminPage() {
  const [trends, setTrends] = useState<Trend[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    link_url: "",
    is_active: true,
    display_order: 0,
  })

  useEffect(() => {
    loadTrends()
  }, [])

  const loadTrends = async () => {
    try {
      const data = await getTrends()
      setTrends(data)
    } catch (error) {
      alert("Erreur lors du chargement des tendances")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const { url } = await response.json()
      setFormData((prev) => ({ ...prev, image_url: url }))
    } catch (error) {
      alert("Erreur lors de l'upload de l'image")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString())
    })

    try {
      if (editingTrend) {
        await updateTrend(editingTrend.id, data)
        alert("✅ Tendance modifiée avec succès!")
      } else {
        await createTrend(data)
        alert("✅ Tendance créée avec succès!")
      }

      setIsEditing(false)
      setEditingTrend(null)
      setFormData({
        title: "",
        description: "",
        image_url: "",
        link_url: "",
        is_active: true,
        display_order: 0,
      })
      await loadTrends()
    } catch (error) {
      alert("❌ Erreur lors de l'enregistrement de la tendance")
    }
  }

  const handleEdit = (trend: Trend) => {
    setEditingTrend(trend)
    setFormData({
      title: trend.title,
      description: trend.description || "",
      image_url: trend.image_url,
      link_url: trend.link_url || "",
      is_active: trend.is_active,
      display_order: trend.display_order,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette tendance ?")) return

    try {
      await deleteTrend(id)
      alert("✅ Tendance supprimée avec succès!")
      await loadTrends()
    } catch (error) {
      alert("❌ Erreur lors de la suppression de la tendance")
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold">Tendances</h1>
              <p className="text-muted-foreground">Gérez les tendances affichées sur le site</p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle Tendance
            </Button>
          )}
        </div>

        {/* Form */}
        {isEditing && (
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Ordre d'affichage</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link_url">Lien (URL)</Label>
                <div className="flex gap-2">
                  <LinkIcon className="w-5 h-5 text-muted-foreground mt-2" />
                  <Input
                    id="link_url"
                    type="url"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="/boutique"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Image *</Label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="URL de l'image"
                    />
                  </div>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploading}
                    />
                    <Label htmlFor="image-upload">
                      <Button type="button" variant="outline" disabled={uploading} asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          {uploading ? "Upload..." : "Upload"}
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>
                {formData.image_url && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <Image src={formData.image_url || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Tendance active</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingTrend ? "Modifier" : "Créer"}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditingTrend(null)
                    setFormData({
                      title: "",
                      description: "",
                      image_url: "",
                      link_url: "",
                      is_active: true,
                      display_order: 0,
                    })
                  }}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Trends List */}
        {isLoading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trends.map((trend) => (
              <Card key={trend.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={trend.image_url || "/placeholder.svg"} alt={trend.title} fill className="object-cover" />
                  {!trend.is_active && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Inactive</span>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{trend.title}</h3>
                  {trend.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{trend.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">Ordre: {trend.display_order}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(trend)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(trend.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
