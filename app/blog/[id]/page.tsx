"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Heart, Share2, MessageCircle, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"

const blogPosts = [
  {
    id: 1,
    title: "Les Tendances Hijab Automne-Hiver 2024",
    excerpt:
      "Découvrez les couleurs, textures et styles qui marqueront la saison froide. Du velours luxueux aux tons terreux, explorez les tendances incontournables.",
    content: `
      <p>Cette saison automne-hiver 2024, les hijabs se parent de couleurs chaudes et de textures riches qui reflètent parfaitement l'esprit cocooning de la saison froide. Les créateurs de mode modeste rivalisent d'ingéniosité pour proposer des pièces à la fois élégantes et fonctionnelles.</p>

      <h2>Les Couleurs Phares de la Saison</h2>
      <p>Les tons terreux dominent cette saison avec des nuances de camel, de rouille et de brun chocolat. Ces couleurs naturelles s'harmonisent parfaitement avec les tenues automnales et apportent une chaleur réconfortante au visage.</p>

      <p>Le bordeaux et le prune font également leur grand retour, offrant une alternative sophistiquée aux classiques noir et marine. Ces teintes profondes subliment particulièrement les peaux mates et apportent une touche de luxe à n'importe quelle tenue.</p>

      <h2>Textures et Matières Tendance</h2>
      <p>Le velours s'impose comme LA texture incontournable de cette saison. Doux au toucher et d'un éclat subtil, il transforme le hijab en véritable accessoire de mode. Attention cependant à bien l'entretenir pour préserver sa beauté.</p>

      <p>La maille fine fait également son apparition, offrant confort et facilité de port. Plus structurée que la mousseline traditionnelle, elle maintient parfaitement le drapé tout en étant moins glissante.</p>

      <h2>Styles et Techniques de Port</h2>
      <p>Cette saison privilégie les drapés amples et les volumes généreux. Le style "turban moderne" gagne en popularité, alliant praticité et élégance. Les plis asymétriques et les superpositions créent du mouvement et de la profondeur.</p>

      <p>N'hésitez pas à jouer avec les accessoires : épingles dorées, bandeaux en velours ou encore bijoux de tête discrets peuvent transformer complètement votre look.</p>
    `,
    author: "Aminata Diallo",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Tendances",
    image: "/blog-hijab-trends.png",
    featured: true,
    tags: ["Hijab", "Mode", "Tendances", "Automne-Hiver"],
  },
  // Add other posts here if needed for the demo
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-rose-600 hover:text-rose-700">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <Badge className="bg-rose-100 text-rose-800">{post.category}</Badge>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString("fr-FR")}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-4 leading-tight">{post.title}</h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Experte Mode Modeste</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-rose-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-rose-600">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] mb-8 rounded-2xl overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg?height=600&width=800"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 leading-relaxed space-y-6" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-gray-200 text-gray-600">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        {/* Social Share */}
        <Card className="mb-12 border-l-4 border-l-rose-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cet article vous a plu ?</h3>
                <p className="text-gray-600">Partagez-le avec vos amies !</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  J'aime
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Commenter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-8">Articles Similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={relatedPost.image || "/placeholder.svg?height=200&width=300"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="bg-rose-100 text-rose-800 mb-2">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{relatedPost.excerpt}</p>
                    <Button asChild variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 p-0">
                      <Link href={`/blog/${relatedPost.id}`}>Lire l'article</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  )
}
