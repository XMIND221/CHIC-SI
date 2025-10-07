"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, Tag, ArrowRight, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const categories = ["Tous", "Tendances", "Style Professionnel", "Tutoriels", "Conseils", "Culture", "Accessoires"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: blogPosts = [],
    error,
    isLoading,
  } = useSWR("/api/blog", fetcher, {
    refreshInterval: 5000,
  })

  const filteredPosts = blogPosts.filter((post: any) => {
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = filteredPosts.filter((post: any) => post.is_featured)
  const regularPosts = filteredPosts.filter((post: any) => !post.is_featured)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des articles...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erreur lors du chargement des articles</p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-champagne-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6">Blog Si-Chic</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Découvrez nos conseils mode, tendances et inspirations pour sublimer votre style modeste au quotidien
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 border-gray-200 focus:border-rose-300 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "border-gray-200 hover:border-rose-300"
              }`}
            >
              <Tag className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        {selectedCategory === "Tous" && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-gray-900 mb-8 text-center">Articles à la Une</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post: any) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image_url || "/placeholder.svg?height=400&width=600"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-rose-600 text-white">À la Une</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                        {post.category}
                      </Badge>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.published_at || post.created_at).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.read_time || "5 min"}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {post.author_photo ? (
                          <img
                            src={post.author_photo || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover border-2 border-rose-100"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-rose-600" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-700">{post.author}</span>
                      </div>

                      <Button asChild variant="ghost" className="text-rose-600 hover:text-rose-700">
                        <Link href={`/blog/${post.id}`}>
                          Lire la suite
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post: any) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image_url || "/placeholder.svg?height=300&width=400"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.published_at || post.created_at).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.read_time || "5 min"}
                  </div>
                </div>

                <h3 className="text-lg font-serif text-gray-900 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {post.author_photo ? (
                      <img
                        src={post.author_photo || "/placeholder.svg"}
                        alt={post.author}
                        className="w-6 h-6 rounded-full object-cover border-2 border-rose-100"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                        <User className="w-3 h-3 text-rose-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  </div>

                  <Button asChild variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">
                    <Link href={`/blog/${post.id}`}>
                      Lire
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-4">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Tous")
              }}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-20">
          <Card className="bg-gradient-to-br from-rose-50 to-champagne-50 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">Restez Inspirée</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Recevez nos derniers articles, conseils mode et tendances directement dans votre boîte mail
              </p>
              <div className="flex max-w-md mx-auto gap-4">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 border-gray-200 focus:border-rose-300"
                />
                <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6">S'abonner</Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">Pas de spam, désabonnement possible à tout moment</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
