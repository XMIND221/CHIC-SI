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

const blogPosts = [
  {
    id: 1,
    title: "Les Tendances Hijab Automne-Hiver 2024",
    excerpt:
      "Découvrez les couleurs, textures et styles qui marqueront la saison froide. Du velours luxueux aux tons terreux, explorez les tendances incontournables.",
    content: "Cette saison, les hijabs se parent de couleurs chaudes et de textures riches...",
    author: "Aminata Diallo",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Tendances",
    image: "/blog-hijab-trends.png",
    featured: true,
    tags: ["Hijab", "Mode", "Tendances", "Automne-Hiver"],
  },
  {
    id: 2,
    title: "Comment Porter l'Abaya au Bureau : Guide Complet",
    excerpt:
      "L'abaya moderne s'invite dans le monde professionnel. Nos conseils pour allier élégance, confort et codes vestimentaires.",
    content: "L'abaya professionnelle doit respecter certains codes tout en conservant son élégance...",
    author: "Fatou Seck",
    date: "2024-01-12",
    readTime: "7 min",
    category: "Style Professionnel",
    image: "/blog-professional-abaya.png",
    featured: false,
    tags: ["Abaya", "Bureau", "Professionnel", "Style"],
  },
  {
    id: 3,
    title: "L'Art du Drapé : Techniques de Nouage du Hijab",
    excerpt:
      "Maîtrisez les techniques traditionnelles et modernes pour sublimer votre hijab. Tutoriels pas à pas avec photos.",
    content: "Le drapé du hijab est un art qui se transmet de génération en génération...",
    author: "Khadija Ba",
    date: "2024-01-10",
    readTime: "10 min",
    category: "Tutoriels",
    image: "/blog-hijab-draping.png",
    featured: true,
    tags: ["Hijab", "Tutoriel", "Techniques", "Drapé"],
  },
  {
    id: 4,
    title: "Entretien des Tissus Précieux : Soie et Cachemire",
    excerpt:
      "Préservez la beauté de vos pièces en soie et cachemire avec nos conseils d'experts. Lavage, séchage et rangement.",
    content: "Les tissus nobles nécessitent un soin particulier pour conserver leur éclat...",
    author: "Mariam Touré",
    date: "2024-01-08",
    readTime: "6 min",
    category: "Conseils",
    image: "/blog-fabric-care.png",
    featured: false,
    tags: ["Entretien", "Soie", "Cachemire", "Conseils"],
  },
  {
    id: 5,
    title: "Mode Modeste : L'Évolution du Style Sénégalais",
    excerpt: "Retour sur l'évolution de la mode modeste au Sénégal, de la tradition aux créations contemporaines.",
    content: "La mode modeste sénégalaise puise ses racines dans une riche tradition...",
    author: "Aïssatou Ndiaye",
    date: "2024-01-05",
    readTime: "8 min",
    category: "Culture",
    image: "/blog-senegalese-fashion.png",
    featured: false,
    tags: ["Culture", "Sénégal", "Histoire", "Mode"],
  },
  {
    id: 6,
    title: "Accessoires Hijab : Sublimer votre Look",
    excerpt: "Épingles, bandeaux, bijoux de tête... Découvrez comment les accessoires transforment votre style hijab.",
    content: "Les accessoires sont la touche finale qui personnalise votre look hijab...",
    author: "Bineta Fall",
    date: "2024-01-03",
    readTime: "4 min",
    category: "Accessoires",
    image: "/blog-hijab-accessories.png",
    featured: false,
    tags: ["Accessoires", "Hijab", "Style", "Bijoux"],
  },
]

const categories = ["Tous", "Tendances", "Style Professionnel", "Tutoriels", "Conseils", "Culture", "Accessoires"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
              {featuredPosts.slice(0, 2).map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg?height=400&width=600"}
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
                        {new Date(post.date).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
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
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg?height=300&width=400"}
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
                    {new Date(post.date).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-lg font-serif text-gray-900 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>

                  <Button asChild variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">
                    <Link href={`/blog/${post.id}`}>
                      Lire
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
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
