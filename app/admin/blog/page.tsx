"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Pencil, Trash2, FileText, Calendar, User } from "lucide-react"
import Link from "next/link"
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "./actions"
import useSWR from "swr"

const categories = ["Tendances", "Style Professionnel", "Tutoriels", "Conseils", "Culture", "Accessoires"]

export default function AdminBlogPage() {
  const { data: posts, mutate } = useSWR("blog-posts", getBlogPosts, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
  })

  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, formData)
        alert("✅ Article modifié avec succès!")
      } else {
        await createBlogPost(formData)
        alert("✅ Article créé avec succès!")
      }
      setShowForm(false)
      setEditingPost(null)
      mutate()
    } catch (error) {
      alert("❌ Erreur lors de l'enregistrement de l'article")
      console.error(error)
    }
  }

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return

    try {
      await deleteBlogPost(id)
      alert("✅ Article supprimé avec succès!")
      mutate()
    } catch (error) {
      alert("❌ Erreur lors de la suppression de l'article")
      console.error(error)
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
      const imageInput = document.getElementById("image_url") as HTMLInputElement
      if (imageInput) imageInput.value = url
      alert("✅ Image uploadée avec succès!")
    } catch (error) {
      alert("❌ Erreur lors de l'upload de l'image")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au tableau de bord
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold">Gestion du Blog</h1>
              <p className="text-muted-foreground">Gérez les articles de votre blog</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowForm(true)
              setEditingPost(null)
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvel Article
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingPost ? "Modifier l'Article" : "Nouvel Article"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingPost?.title}
                      required
                      placeholder="Titre de l'article"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL) *</Label>
                    <Input
                      id="slug"
                      name="slug"
                      defaultValue={editingPost?.slug}
                      required
                      placeholder="titre-de-larticle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_photo">Photo de l'auteur</Label>
                    <Input
                      id="author_photo"
                      name="author_photo"
                      defaultValue={editingPost?.author_photo}
                      placeholder="URL de la photo"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Extrait *</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      defaultValue={editingPost?.excerpt}
                      required
                      rows={3}
                      placeholder="Résumé de l'article"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Contenu (HTML) *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={editingPost?.content}
                      required
                      rows={10}
                      placeholder="<p>Contenu de l'article en HTML...</p>"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Auteur *</Label>
                    <Input id="author" name="author" defaultValue={editingPost?.author || "Si-Chic"} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <select
                      id="category"
                      name="category"
                      defaultValue={editingPost?.category}
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="read_time">Temps de lecture</Label>
                    <Input
                      id="read_time"
                      name="read_time"
                      defaultValue={editingPost?.read_time || "5 min"}
                      placeholder="5 min"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image de couverture</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image_url"
                        name="image_url"
                        defaultValue={editingPost?.image_url}
                        placeholder="URL de l'image ou uploadez"
                        className="flex-1"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="w-auto"
                      />
                    </div>
                    {uploading && <p className="text-sm text-muted-foreground">Upload en cours...</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Upload photo auteur</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
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
                          const photoInput = document.getElementById("author_photo") as HTMLInputElement
                          if (photoInput) photoInput.value = url
                          alert("✅ Photo uploadée avec succès!")
                        } catch (error) {
                          alert("❌ Erreur lors de l'upload de la photo")
                          console.error(error)
                        } finally {
                          setUploading(false)
                        }
                      }}
                      disabled={uploading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={editingPost?.tags?.join(", ")}
                    placeholder="Hijab, Mode, Tendances"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    defaultChecked={editingPost?.featured}
                    value="true"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="featured">Article à la une</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingPost ? "Modifier" : "Créer"}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingPost(null)
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {posts?.map((post: any) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={post.featured ? "default" : "secondary"}>{post.category}</Badge>
                      {post.featured && <Badge className="bg-rose-600">À la une</Badge>}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {post.read_time}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
