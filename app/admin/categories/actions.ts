"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export async function getCategories() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) throw error
  return data as Category[]
}

export async function createCategory(formData: FormData) {
  const supabase = createAdminClient()

  const category = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
  }

  const { error } = await supabase.from("categories").insert(category)

  if (error) throw error

  revalidatePath("/admin/categories")
  revalidatePath("/")
  return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const updates = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("categories").update(updates).eq("id", id)

  if (error) throw error

  revalidatePath("/admin/categories")
  revalidatePath("/")
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/admin/categories")
  revalidatePath("/")
  return { success: true }
}
