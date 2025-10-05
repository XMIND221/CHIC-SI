"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useSWR, { mutate } from "swr"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, ImageIcon, ArrowLeft, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { updateProduct, createProduct, deleteProduct } from "./actions"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  is_available: boolean
  is_featured: boolean
  stock_quantity: number
  colors: string[]
  sizes: string[]
  material: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminProductsPage() {
  const router = useRouter()
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR("/api/products/all", fetcher, {
    refreshInterval: 5000, // Auto-refresh every 5 seconds to show updates
    revalidateOnFocus: true,
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    material: "",
    colors: "",
    sizes: "",
    stock_quantity: "10",
    is_available: true,
    is_featured: false,
  })

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin_authenticated")
      if (!isAuth) {
        router.push("/admin")
        return
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image_url: formData.image_url,
      material: formData.material,
      colors: formData.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      sizes: formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      stock_quantity: Number.parseInt(formData.stock_quantity),
      is_available: formData.is_available,
      is_featured: formData.is_featured,
    }

    console.log("[v0] Submitting product:", editingProduct ? "UPDATE" : "CREATE")

    try {
      let result
      if (editingProduct) {
        console.log("[v0] Calling updateProduct server action...")
        result = await updateProduct(editingProduct.id, productData)
      } else {
        console.log("[v0] Calling createProduct server action...")
        result = await createProduct(productData)
      }

      console.log("[v0] Server action result:", result)

      if (!result.success) {
        throw new Error(result.error || "Failed to save product")
      }

      console.log("[v0] ✅ Product saved successfully!")
      alert(editingProduct ? "✅ Produit modifié avec succès!" : "✅ Produit ajouté avec succès!")

      setDialogOpen(false)
      resetForm()

      await mutate("/api/products/all")
      await mutate("/api/products")
      console.log("[v0] ✅ Data revalidated!")
    } catch (error: any) {
      console.error("[v0] ❌ Error saving product:", error)
      alert(`❌ Erreur: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      material: product.material || "",
      colors: product.colors?.join(", ") || "",
      sizes: product.sizes?.join(", ") || "",
      stock_quantity: product.stock_quantity?.toString() || "10",
      is_available: product.is_available,
      is_featured: product.is_featured,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return

    try {
      console.log("[v0] Calling deleteProduct server action...")
      const result = await deleteProduct(id)

      if (!result.success) {
        throw new Error(result.error || "Failed to delete product")
      }

      console.log("[v0] ✅ Product deleted successfully!")
      alert("✅ Produit supprimé avec succès!")

      await mutate("/api/products/all")
      await mutate("/api/products")
    } catch (error: any) {
      console.error("[v0] ❌ Error deleting product:", error)
      alert(`❌ Erreur: ${error.message}`)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image_url: data.url }))
      alert("✅ Image uploadée avec succès!")
    } catch (error) {
      console.error("Upload error:", error)
      alert("❌ Erreur lors de l'upload de l'image")
    } finally {
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      image_url: "",
      material: "",
      colors: "",
      sizes: "",
      stock_quantity: "10",
      is_available: true,
      is_featured: false,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/dashboard")} className="gap-2 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold">Produits</h1>
            <p className="text-muted-foreground mt-2">Gérez votre catalogue de produits</p>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">
                  {editingProduct ? "Modifier le produit" : "Nouveau produit"}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct
                    ? "Modifiez les informations du produit"
                    : "Ajoutez un nouveau produit à votre boutique"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Ex: Hijab en soie premium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    placeholder="Décrivez le produit..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (FCFA) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      placeholder="15000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      required
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de l'image *</Label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label
                        htmlFor="image-upload"
                        className="flex-1 flex items-center justify-center gap-2 h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {isUploading ? "Upload en cours..." : "Uploader une image"}
                      </Label>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">ou</div>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      required
                      placeholder="Entrez l'URL de l'image"
                    />
                    {formData.image_url && (
                      <div className="mt-2 rounded-lg overflow-hidden border">
                        <img
                          src={formData.image_url || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Matière</Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="Ex: Soie, Coton, Polyester"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="colors">Couleurs (séparées par des virgules)</Label>
                  <Input
                    id="colors"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Ex: Noir, Blanc, Beige"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sizes">Tailles (séparées par des virgules)</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="Ex: S, M, L, XL"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="available">Disponible</Label>
                    <p className="text-sm text-muted-foreground">Le produit est en stock</p>
                  </div>
                  <Switch
                    id="available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Produit vedette</Label>
                    <p className="text-sm text-muted-foreground">Mettre en avant sur la page d'accueil</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    className="flex-1"
                    disabled={isSaving}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSaving}>
                    {isSaving ? "Enregistrement..." : editingProduct ? "Mettre à jour" : "Ajouter"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des produits...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Erreur lors du chargement des produits</p>
          </div>
        ) : products.length === 0 ? (
          <Card className="elegant-shadow">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun produit</h3>
              <p className="text-muted-foreground mb-6">Commencez par ajouter votre premier produit</p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un produit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <Card key={product.id} className="elegant-shadow hover:elegant-shadow-lg transition-all overflow-hidden">
                <div className="aspect-square relative overflow-hidden bg-secondary/20">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {product.is_featured && <Badge className="bg-primary text-primary-foreground">Vedette</Badge>}
                    {!product.is_available && <Badge variant="secondary">Indisponible</Badge>}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} FCFA</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 bg-transparent"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="w-4 h-4" />
                      Modifier
                    </Button>
                    <Button variant="destructive" size="sm" className="gap-2" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
