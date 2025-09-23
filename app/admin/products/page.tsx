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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Blazer Professionnel Élégant",
    price: 58380,
    originalPrice: 78715,
    category: "Professionnel",
    stock: 15,
    status: "active",
    image: "/hijabi-woman-blazer.png",
    badge: "Bestseller",
    material: "Laine mélangée",
    colors: ["Noir", "Marine", "Gris"],
    sales: 45,
  },
  {
    id: 2,
    name: "Hijab Soie Premium",
    price: 29518,
    category: "Hijabs",
    stock: 32,
    status: "active",
    image: "/luxury-silk-hijab.png",
    badge: "Premium",
    material: "Soie naturelle",
    colors: ["Rose poudré", "Beige", "Blanc cassé"],
    sales: 38,
  },
  {
    id: 3,
    name: "Abaya Moderne Cintrée",
    price: 81995,
    category: "Abayas",
    stock: 8,
    status: "low-stock",
    image: "/modern-fitted-abaya.png",
    badge: "Nouveau",
    material: "Crêpe premium",
    colors: ["Noir", "Taupe", "Bordeaux"],
    sales: 29,
  },
  {
    id: 4,
    name: "Ensemble Sport Confort",
    price: 42637,
    category: "Sport",
    stock: 0,
    status: "out-of-stock",
    image: "/modest-sportswear-hijab.png",
    badge: "Éco-responsable",
    material: "Coton bio",
    colors: ["Gris chiné", "Marine", "Rose"],
    sales: 52,
  },
  {
    id: 5,
    name: "Pantalon Tailleur Chic",
    price: 36078,
    category: "Professionnel",
    stock: 22,
    status: "active",
    image: "/chic-tailored-trousers-women.png",
    badge: "Bestseller",
    material: "Polyester stretch",
    colors: ["Noir", "Marine", "Camel"],
    sales: 67,
  },
  {
    id: 6,
    name: "Tunique Longue Raffinée",
    price: 49197,
    category: "Tuniques",
    stock: 18,
    status: "active",
    image: "/placeholder.svg?height=400&width=300",
    badge: "Premium",
    material: "Viscose fluide",
    colors: ["Blanc", "Beige", "Kaki"],
    sales: 23,
  },
]

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

const getStatusBadge = (status: string, stock: number) => {
  if (status === "out-of-stock" || stock === 0) {
    return <Badge className="bg-red-100 text-red-800 border-red-200">Rupture</Badge>
  }
  if (status === "low-stock" || stock < 10) {
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Stock faible</Badge>
  }
  return <Badge className="bg-green-100 text-green-800 border-green-200">En stock</Badge>
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleViewProduct = (product: any) => {
    console.log("[v0] Viewing product:", product.name)
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const handleEditProduct = (product: any) => {
    console.log("[v0] Editing product:", product.name)
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleDeleteProduct = (product: any) => {
    console.log("[v0] Deleting product:", product.name)
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      // Ici vous pouvez ajouter la logique de suppression
      alert(`Produit "${product.name}" supprimé avec succès`)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  <DialogDescription>Créez un nouveau produit pour votre boutique</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du produit</Label>
                    <Input id="name" placeholder="Ex: Hijab Soie Premium" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hijabs">Hijabs</SelectItem>
                        <SelectItem value="abayas">Abayas</SelectItem>
                        <SelectItem value="professionnel">Professionnel</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="tuniques">Tuniques</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (FCFA)</Label>
                    <Input id="price" type="number" placeholder="29518" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" placeholder="25" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Description du produit..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="material">Matériau</Label>
                    <Input id="material" placeholder="Ex: Soie naturelle" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colors">Couleurs disponibles</Label>
                    <Input id="colors" placeholder="Ex: Rose poudré, Beige, Blanc cassé" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">Créer le produit</Button>
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
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="Hijabs">Hijabs</SelectItem>
                    <SelectItem value="Abayas">Abayas</SelectItem>
                    <SelectItem value="Professionnel">Professionnel</SelectItem>
                    <SelectItem value="Sport">Sport</SelectItem>
                    <SelectItem value="Tuniques">Tuniques</SelectItem>
                  </SelectContent>
                </Select>
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
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Catégorie</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Prix</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Ventes</th>
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
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.material}</p>
                              {product.badge && (
                                <Badge
                                  variant="secondary"
                                  className={`mt-1 text-xs ${
                                    product.badge === "Bestseller"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : product.badge === "Premium"
                                        ? "bg-purple-100 text-purple-800 border-purple-200"
                                        : product.badge === "Nouveau"
                                          ? "bg-green-100 text-green-800 border-green-200"
                                          : "bg-emerald-100 text-emerald-800 border-emerald-200"
                                  }`}
                                >
                                  {product.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900">{product.category}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>
                            {product.originalPrice && (
                              <p className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900">{product.stock}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900">{product.sales}</span>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(product.status, product.stock)}</td>
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
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                      <p className="text-gray-600">{selectedProduct.category}</p>
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
                      <p className="text-gray-900">{selectedProduct.stock} unités</p>
                    </div>
                    <div>
                      <Label>Ventes</Label>
                      <p className="text-gray-900">{selectedProduct.sales} vendus</p>
                    </div>
                    <div>
                      <Label>Couleurs disponibles</Label>
                      <p className="text-gray-900">{selectedProduct.colors?.join(", ")}</p>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Product Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Modifier le produit</DialogTitle>
                <DialogDescription>Modifiez les informations du produit</DialogDescription>
              </DialogHeader>
              {selectedProduct && (
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nom du produit</Label>
                    <Input id="edit-name" defaultValue={selectedProduct.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Catégorie</Label>
                    <Select defaultValue={selectedProduct.category.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hijabs">Hijabs</SelectItem>
                        <SelectItem value="abayas">Abayas</SelectItem>
                        <SelectItem value="professionnel">Professionnel</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="tuniques">Tuniques</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Prix (FCFA)</Label>
                    <Input id="edit-price" type="number" defaultValue={selectedProduct.price} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-stock">Stock</Label>
                    <Input id="edit-stock" type="number" defaultValue={selectedProduct.stock} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-material">Matériau</Label>
                    <Input id="edit-material" defaultValue={selectedProduct.material} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-colors">Couleurs disponibles</Label>
                    <Input id="edit-colors" defaultValue={selectedProduct.colors?.join(", ")} />
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={() => {
                    alert(`Produit "${selectedProduct?.name}" modifié avec succès`)
                    setIsEditDialogOpen(false)
                  }}
                >
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
