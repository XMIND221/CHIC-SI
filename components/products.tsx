"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, ShoppingBag, Ruler, Search, Filter, Grid, List } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import CustomOrderForm from "./custom-order-form"

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

const mockProducts = [
  {
    id: 1,
    name: "Hijab Soie Premium Bordeaux",
    price: 25000,
    originalPrice: 30000,
    image: "/elegant-bordeaux-silk-hijab.jpg",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 124,
    material: "Soie naturelle",
    colors: ["Bordeaux", "Noir", "Beige"],
    category: "hijabs",
    customizable: true,
  },
  {
    id: 2,
    name: "Abaya Moderne Noire Brodée",
    price: 85000,
    image: "/modern-black-embroidered-abaya.jpg",
    badge: "Premium",
    rating: 4.9,
    reviews: 89,
    material: "Crêpe de luxe",
    colors: ["Noir", "Bleu marine", "Gris anthracite"],
    category: "abayas",
    customizable: true,
  },
  {
    id: 3,
    name: "Ensemble Professionnel Beige",
    price: 65000,
    image: "/professional-beige-hijab-outfit.jpg",
    badge: "Nouveau",
    rating: 4.7,
    reviews: 56,
    material: "Polyester premium",
    colors: ["Beige", "Gris", "Bleu marine"],
    category: "professionnel",
    customizable: false,
  },
  {
    id: 4,
    name: "Hijab Sport Respirant Rose",
    price: 18000,
    image: "/breathable-pink-sports-hijab.jpg",
    badge: "Éco-responsable",
    rating: 4.6,
    reviews: 78,
    material: "Polyester recyclé",
    colors: ["Rose", "Blanc", "Gris"],
    category: "sport",
    customizable: false,
  },
  {
    id: 5,
    name: "Abaya Cérémonie Dorée",
    price: 120000,
    originalPrice: 150000,
    image: "/golden-ceremony-abaya-elegant.jpg",
    badge: "Premium",
    rating: 5.0,
    reviews: 34,
    material: "Satin brodé or",
    colors: ["Doré", "Champagne", "Ivoire"],
    category: "ceremonie",
    customizable: true,
  },
  {
    id: 6,
    name: "Hijab Mousseline Bleu Ciel",
    price: 22000,
    image: "/sky-blue-chiffon-hijab-flowing.jpg",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 156,
    material: "Mousseline de soie",
    colors: ["Bleu ciel", "Blanc", "Rose poudré"],
    category: "hijabs",
    customizable: true,
  },
  {
    id: 7,
    name: "Kimono Moderne Fleuri",
    price: 45000,
    image: "/modern-floral-kimono-hijab-style.jpg",
    badge: "Nouveau",
    rating: 4.5,
    reviews: 42,
    material: "Viscose imprimée",
    colors: ["Multicolore", "Noir", "Blanc"],
    category: "kimonos",
    customizable: false,
  },
  {
    id: 8,
    name: "Ensemble Bureau Gris Perle",
    price: 58000,
    image: "/pearl-grey-office-hijab-ensemble.jpg",
    badge: "Premium",
    rating: 4.7,
    reviews: 67,
    material: "Laine mélangée",
    colors: ["Gris perle", "Noir", "Bleu marine"],
    category: "professionnel",
    customizable: true,
  },
  {
    id: 9,
    name: "Hijab Coton Bio Vert Sauge",
    price: 20000,
    image: "/sage-green-organic-cotton-hijab.jpg",
    badge: "Éco-responsable",
    rating: 4.6,
    reviews: 91,
    material: "Coton biologique",
    colors: ["Vert sauge", "Beige", "Terracotta"],
    category: "hijabs",
    customizable: false,
  },
  {
    id: 10,
    name: "Abaya Casual Denim",
    price: 55000,
    image: "/casual-denim-abaya-modern-style.jpg",
    badge: "Nouveau",
    rating: 4.4,
    reviews: 38,
    material: "Denim stretch",
    colors: ["Bleu denim", "Noir", "Blanc"],
    category: "casual",
    customizable: false,
  },
  {
    id: 11,
    name: "Hijab Satin Luxe Violet",
    price: 28000,
    originalPrice: 35000,
    image: "/luxury-violet-satin-hijab-elegant.jpg",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 203,
    material: "Satin de soie",
    colors: ["Violet", "Prune", "Lavande"],
    category: "hijabs",
    customizable: true,
  },
  {
    id: 12,
    name: "Tenue Sport Complète Noire",
    price: 42000,
    image: "/placeholder-n8ttl.png",
    badge: "Éco-responsable",
    rating: 4.7,
    reviews: 85,
    material: "Polyester recyclé",
    colors: ["Noir", "Gris", "Blanc"],
    category: "sport",
    customizable: false,
  },
  {
    id: 13,
    name: "Abaya Broderie Traditionnelle",
    price: 95000,
    image: "/placeholder-edwm5.png",
    badge: "Premium",
    rating: 4.8,
    reviews: 72,
    material: "Coton brodé main",
    colors: ["Bleu royal", "Bordeaux", "Vert émeraude"],
    category: "traditionnelle",
    customizable: true,
  },
  {
    id: 14,
    name: "Hijab Plissé Moderne Corail",
    price: 24000,
    image: "/placeholder-0t3bo.png",
    badge: "Nouveau",
    rating: 4.5,
    reviews: 49,
    material: "Polyester plissé",
    colors: ["Corail", "Pêche", "Saumon"],
    category: "hijabs",
    customizable: false,
  },
  {
    id: 15,
    name: "Ensemble Cérémonie Champagne",
    price: 110000,
    originalPrice: 130000,
    image: "/placeholder-rbx7u.png",
    badge: "Premium",
    rating: 5.0,
    reviews: 28,
    material: "Taffetas brodé",
    colors: ["Champagne", "Doré", "Ivoire"],
    category: "ceremonie",
    customizable: true,
  },
  {
    id: 16,
    name: "Hijab Jersey Confort Taupe",
    price: 16000,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Bestseller",
    rating: 4.6,
    reviews: 187,
    material: "Jersey de coton",
    colors: ["Taupe", "Beige", "Gris clair"],
    category: "casual",
    customizable: false,
  },
]

export default function Products() {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showCustomForm, setShowCustomForm] = useState<number | null>(null)
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addItem } = useCartStore()

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "hijabs", label: "Hijabs" },
    { value: "abayas", label: "Abayas" },
    { value: "professionnel", label: "Professionnel" },
    { value: "sport", label: "Sport" },
    { value: "ceremonie", label: "Cérémonie" },
    { value: "casual", label: "Casual" },
    { value: "kimonos", label: "Kimonos" },
    { value: "traditionnelle", label: "Traditionnelle" },
  ]

  const sortOptions = [
    { value: "name", label: "Nom A-Z" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "rating", label: "Mieux notés" },
    { value: "newest", label: "Nouveautés" },
  ]

  useEffect(() => {
    let filtered = products

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.material.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrage par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Tri
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, sortBy, products])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    console.log("[v0] Adding product to cart:", product.name)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    console.log("[v0] Product added to cart successfully")
  }

  const handleCustomOrder = (product: (typeof products)[0]) => {
    console.log("[v0] Opening custom order form for:", product.name)
    setShowCustomForm(product.id)
  }

  const handleCustomOrderSubmit = (customOrder: any) => {
    console.log("[v0] Submitting custom order:", customOrder)
    addItem({
      id: customOrder.id,
      name: `${customOrder.name} (Sur Mesure)`,
      price: customOrder.price,
      image: customOrder.image,
      isCustom: true,
      measurements: customOrder.measurements,
    })
    setShowCustomForm(null)
    console.log("[v0] Custom order added to cart successfully")
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Chargement des produits...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="relative mb-12">
        <div className="h-80 relative overflow-hidden carousel-container">
          <img
            src="/luxury-boutique-products-showcase.jpg"
            alt="Produits Vedettes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-crystal-float drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
                Boutique Luxueuse
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-xl [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                Nos pièces les plus appréciées, sélectionnées pour leur qualité exceptionnelle et leur style intemporel
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-effect"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 glass-effect">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 glass-effect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="glass-effect"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="glass-effect"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
            {filteredProducts.length > 1 ? "s" : ""}
          </div>
        </div>

        <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group glass-card rounded-2xl overflow-hidden luxury-shadow hover:immersive-shadow transition-all duration-500 animate-crystal-float animate-glass-shine ${
                viewMode === "list" ? "flex" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "aspect-[3/4]"}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className={`crystal-shadow glass-effect
                      ${product.badge === "Bestseller" ? "bg-blue-100/80 text-blue-800 border-blue-200/50" : ""}
                      ${product.badge === "Nouveau" ? "bg-green-100/80 text-green-800 border-green-200/50" : ""}
                      ${product.badge === "Premium" ? "bg-purple-100/80 text-purple-800 border-purple-200/50" : ""}
                      ${product.badge === "Éco-responsable" ? "bg-emerald-100/80 text-emerald-800 border-emerald-200/50" : ""}
                    `}
                  >
                    {product.badge}
                  </Badge>
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 glass-effect hover:bg-white/20 crystal-shadow"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.includes(product.id) ? "fill-primary text-primary" : "text-gray-600"
                    }`}
                  />
                </Button>

                {/* Quick Actions */}
                {viewMode === "grid" && (
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="space-y-2">
                      <Button
                        className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold crystal-shadow transform hover:scale-105 transition-all duration-300 border border-gray-200"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Ajouter au panier
                      </Button>
                      {product.customizable && (
                        <Button
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold crystal-shadow transform hover:scale-105 transition-all duration-300"
                          onClick={() => handleCustomOrder(product)}
                        >
                          <Ruler className="w-4 h-4 mr-2" />✨ Sur Mesure ✨
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} avis)</span>
                </div>

                {/* Material */}
                <p className="text-sm text-gray-700 mb-3 font-medium">{product.material}</p>

                {/* Colors */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-700 font-medium">Couleurs:</span>
                  <div className="flex space-x-1">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border-2 border-white crystal-shadow bg-gradient-to-br from-gray-200 to-gray-300"
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-600 font-medium">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <Badge
                      variant="destructive"
                      className="bg-red-100/80 text-red-800 border-red-200/50 crystal-shadow glass-effect"
                    >
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Actions for list view */}
                {viewMode === "list" && (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold crystal-shadow transform hover:scale-105 transition-all duration-300 border border-gray-200"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                    {product.customizable && (
                      <Button
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold crystal-shadow transform hover:scale-105 transition-all duration-300"
                        onClick={() => handleCustomOrder(product)}
                      >
                        <Ruler className="w-4 h-4 mr-2" />✨ Sur Mesure ✨
                      </Button>
                    )}
                  </div>
                )}

                {/* Custom Order Button for grid view */}
                {viewMode === "grid" && product.customizable && (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-medium glass-effect crystal-shadow hover:scale-105 transition-all duration-300 bg-white hover:text-gray-900"
                      onClick={() => handleCustomOrder(product)}
                    >
                      <Ruler className="w-4 h-4 mr-2" />
                      Personnaliser ce modèle
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold crystal-shadow transform hover:scale-105 transition-all duration-300"
          >
            Voir tous les produits ({products.length})
          </Button>
        </div>
      </div>

      {/* Custom Order Form Modal */}
      {showCustomForm && (
        <CustomOrderForm
          product={products.find((p) => p.id === showCustomForm)!}
          onSubmit={handleCustomOrderSubmit}
          onCancel={() => setShowCustomForm(null)}
        />
      )}
    </section>
  )
}
