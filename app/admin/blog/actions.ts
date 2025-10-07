"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function getBlogPosts() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching blog posts:", error)
    throw new Error("Erreur lors du chargement des articles")
  }

  return data
}

export async function createBlogPost(formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const category = formData.get("category") as string
  const image_url = formData.get("image_url") as string
  const featured = formData.get("featured") === "true"
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())
  const read_time = formData.get("read_time") as string

  const { error } = await supabase.from("blog_posts").insert([
    {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      image_url,
      featured,
      tags,
      read_time,
    },
  ])

  if (error) {
    console.error("[v0] Error creating blog post:", error)
    throw new Error("Erreur lors de la création de l'article")
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  return { success: true }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const author_photo = formData.get("author_photo") as string
  const category = formData.get("category") as string
  const image_url = formData.get("image_url") as string
  const featured = formData.get("featured") === "true"
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())
  const read_time = formData.get("read_time") as string

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt,
      content,
      author,
      author_photo,
      category,
      image_url,
      featured,
      tags,
      read_time,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("[v0] Error updating blog post:", error)
    throw new Error("Erreur lors de la modification de l'article")
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/", "layout")
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting blog post:", error)
    throw new Error("Erreur lors de la suppression de l'article")
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  return { success: true }
}
