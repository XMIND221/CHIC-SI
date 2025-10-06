"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function getTrends() {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from("trends").select("*").order("display_order", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching trends:", error)
    throw new Error("Erreur lors du chargement des tendances")
  }

  return data
}

export async function createTrend(formData: FormData) {
  const supabase = createAdminClient()

  const trendData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
    link_url: formData.get("link_url") as string,
    is_active: formData.get("is_active") === "true",
    display_order: Number.parseInt(formData.get("display_order") as string) || 0,
  }

  const { error } = await supabase.from("trends").insert([trendData])

  if (error) {
    console.error("[v0] Error creating trend:", error)
    throw new Error("Erreur lors de la création de la tendance")
  }

  revalidatePath("/admin/trends")
  revalidatePath("/")
  return { success: true }
}

export async function updateTrend(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const updateData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
    link_url: formData.get("link_url") as string,
    is_active: formData.get("is_active") === "true",
    display_order: Number.parseInt(formData.get("display_order") as string) || 0,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("trends").update(updateData).eq("id", id)

  if (error) {
    console.error("[v0] Error updating trend:", error)
    throw new Error("Erreur lors de la modification de la tendance")
  }

  revalidatePath("/admin/trends")
  revalidatePath("/")
  return { success: true }
}

export async function deleteTrend(id: string) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("trends").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting trend:", error)
    throw new Error("Erreur lors de la suppression de la tendance")
  }

  revalidatePath("/admin/trends")
  revalidatePath("/")
  return { success: true }
}
