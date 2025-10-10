"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, X, Heart, Share2 } from "lucide-react"
import Image from "next/image"

interface BlogArticleModalProps {
  post: any
  isOpen: boolean
  onClose: () => void
}

export default function BlogArticleModal({ post, isOpen, onClose }: BlogArticleModalProps) {
  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header Image */}
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={post.image_url || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-rose-600 text-white">{post.category}</Badge>
            {post.featured && <Badge className="bg-amber-600 text-white">À la Une</Badge>}
          </div>

          {/* Title */}
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-serif text-gray-900">{post.title}</DialogTitle>
          </DialogHeader>

          {/* Author & Date */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {post.author_photo ? (
                  <img
                    src={post.author_photo || "/placeholder.svg"}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-rose-100"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-rose-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.read_time || "5 min"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{post.excerpt}</p>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-rose-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm font-medium text-gray-900 mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="border-gray-200 text-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
