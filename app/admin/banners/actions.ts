"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export interface Banner {
  id: string
  title: string
  subtitle: string | null
  image_url: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getBanners() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from("banners").select("*").order("display_order", { ascending: true })

  if (error) throw error
  return data as Banner[]
}

export async function createBanner(formData: FormData) {
  const supabase = createAdminClient()

  const banner = {
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    image_url: formData.get("image_url") as string,
    display_order: Number.parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "true",
  }

  const { error } = await supabase.from("banners").insert(banner)

  if (error) throw error

  revalidatePath("/admin/banners")
  revalidatePath("/")
  return { success: true }
}

export async function updateBanner(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const updates = {
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    image_url: formData.get("image_url") as string,
    display_order: Number.parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "true",
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("banners").update(updates).eq("id", id)

  if (error) throw error

  revalidatePath("/admin/banners")
  revalidatePath("/")
  return { success: true }
}

export async function deleteBanner(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("banners").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/admin/banners")
  revalidatePath("/")
  return { success: true }
}
