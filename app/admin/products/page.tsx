"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

type Product = {
  id: string
  name: string
  description: string
  price: number
  category_id: string | null
  image_url: string
  images: string[]
  material: string
  colors: string[]
  sizes: string[]
  stock_quantity: number
  is_available: boolean
  is_featured: boolean
  rating: number
  review_count: number
  created_at: string
  updated_at: string
}

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

const getStatusBadge = (isAvailable: boolean, stock: number) => {
  if (!isAvailable || stock === 0) {
    return <Badge className="bg-red-100 text-red-800 border-red-200">Rupture</Badge>
  }
  if (stock < 10) {
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Stock faible</Badge>
  }
  return <Badge className="bg-green-100 text-green-800 border-green-200">En stock</Badge>
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    material: "",
    colors: "",
    sizes: "",
    stock_quantity: "",
    image_url: "",
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          material: formData.material,
          colors: formData.colors.split(",").map((c) => c.trim()),
          sizes: formData.sizes.split(",").map((s) => s.trim()),
          stock_quantity: Number.parseInt(formData.stock_quantity),
          image_url: formData.image_url || "/placeholder.svg",
          is_available: true,
          is_featured: false,
        }),
      })

      if (response.ok) {
        await fetchProducts()
        setIsAddDialogOpen(false)
        setFormData({
          name: "",
          description: "",
          price: "",
          material: "",
          colors: "",
          sizes: "",
          stock_quantity: "",
          image_url: "",
        })
        alert("Produit créé avec succès!")
      }
    } catch (error) {
      console.error("[v0] Error creating product:", error)
      alert("Erreur lors de la création du produit")
    }
  }

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return

    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          material: formData.material,
          colors: formData.colors.split(",").map((c) => c.trim()),
          sizes: formData.sizes.split(",").map((s) => s.trim()),
          stock_quantity: Number.parseInt(formData.stock_quantity),
          image_url: formData.image_url,
          is_available: selectedProduct.is_available,
          is_featured: selectedProduct.is_featured,
          category_id: selectedProduct.category_id,
          images: selectedProduct.images,
        }),
      })

      if (response.ok) {
        await fetchProducts()
        setIsEditDialogOpen(false)
        setSelectedProduct(null)
        alert("Produit modifié avec succès!")
      }
    } catch (error) {
      console.error("[v0] Error updating product:", error)
      alert("Erreur lors de la modification du produit")
    }
  }

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) return

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchProducts()
        alert("Produit supprimé avec succès!")
      }
    } catch (error) {
      console.error("[v0] Error deleting product:", error)
      alert("Erreur lors de la suppression du produit")
    }
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      material: product.material || "",
      colors: product.colors?.join(", ") || "",
      sizes: product.sizes?.join(", ") || "",
      stock_quantity: product.stock_quantity.toString(),
      image_url: product.image_url,
    })
    setIsEditDialogOpen(true)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && product.is_available && product.stock_quantity >= 10) ||
      (statusFilter === "low-stock" &&
        product.is_available &&
        product.stock_quantity < 10 &&
        product.stock_quantity > 0) ||
      (statusFilter === "out-of-stock" && (!product.is_available || product.stock_quantity === 0))
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
          </div>
        </AdminLayout>
      </AdminGuard>
    )
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des produits</h1>
              <p className="text-gray-600 mt-2">Gérez votre catalogue de produits Si-Chic</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un produit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  <DialogDescription>Créez un nouveau produit pour votre boutique</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Hijab Soie Premium"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description du produit..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (FCFA) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="29518"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="25"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="material">Matériau</Label>
                    <Input
                      id="material"
                      placeholder="Ex: Soie naturelle"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colors">Couleurs (séparées par des virgules)</Label>
                    <Input
                      id="colors"
                      placeholder="Ex: Rose poudré, Beige, Blanc cassé"
                      value={formData.colors}
                      onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sizes">Tailles (séparées par des virgules)</Label>
                    <Input
                      id="sizes"
                      placeholder="Ex: S, M, L, XL"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL de l'image</Label>
                    <Input
                      id="image_url"
                      placeholder="/image.jpg"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white" onClick={handleCreateProduct}>
                    Créer le produit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">En stock</SelectItem>
                    <SelectItem value="low-stock">Stock faible</SelectItem>
                    <SelectItem value="out-of-stock">Rupture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Produits ({filteredProducts.length})</CardTitle>
              <CardDescription>Liste de tous vos produits avec leurs informations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Produit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Prix</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Avis</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image_url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900">{product.stock_quantity}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-gray-900">
                              {product.rating.toFixed(1)} ({product.review_count})
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(product.is_available, product.stock_quantity)}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewProduct(product)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* View Product Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Détails du produit</DialogTitle>
                <DialogDescription>Informations complètes du produit</DialogDescription>
              </DialogHeader>
              {selectedProduct && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedProduct.image_url || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                      <p className="text-lg font-medium text-rose-600">{formatPrice(selectedProduct.price)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Matériau</Label>
                      <p className="text-gray-900">{selectedProduct.material}</p>
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <p className="text-gray-900">{selectedProduct.stock_quantity} unités</p>
                    </div>
                    <div>
                      <Label>Note</Label>
                      <p className="text-gray-900">
                        {selectedProduct.rating.toFixed(1)} ★ ({selectedProduct.review_count} avis)
                      </p>
                    </div>
                    <div>
                      <Label>Couleurs disponibles</Label>
                      <p className="text-gray-900">{selectedProduct.colors?.join(", ")}</p>
                    </div>
                    <div>
                      <Label>Tailles disponibles</Label>
                      <p className="text-gray-900">{selectedProduct.sizes?.join(", ")}</p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Product Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Modifier le produit</DialogTitle>
                <DialogDescription>Modifiez les informations du produit</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-name">Nom du produit</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Prix (FCFA)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-material">Matériau</Label>
                  <Input
                    id="edit-material"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-colors">Couleurs (séparées par des virgules)</Label>
                  <Input
                    id="edit-colors"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-sizes">Tailles (séparées par des virgules)</Label>
                  <Input
                    id="edit-sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image_url">URL de l'image</Label>
                  <Input
                    id="edit-image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white" onClick={handleUpdateProduct}>
                  Sauvegarder
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
