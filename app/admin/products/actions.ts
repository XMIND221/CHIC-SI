"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"

export async function updateProduct(id: string, data: any) {
  console.log("[v0] ===== SERVER ACTION: UPDATE PRODUCT =====")
  console.log("[v0] Product ID:", id)
  console.log("[v0] Data:", JSON.stringify(data, null, 2))

  try {
    const supabase = createAdminClient()

    const updateData = {
      name: data.name,
      description: data.description,
      price: data.price,
      image_url: data.image_url,
      material: data.material || "",
      colors: data.colors || [],
      sizes: data.sizes || [],
      stock_quantity: data.stock_quantity,
      is_available: data.is_available,
      is_featured: data.is_featured,
      updated_at: new Date().toISOString(),
    }

    console.log("[v0] Calling Supabase update...")
    const { data: product, error } = await supabase.from("products").update(updateData).eq("id", id).select().single()

    if (error) {
      console.error("[v0] ❌ Supabase error:", error)
      throw new Error(error.message)
    }

    console.log("[v0] ✅ Product updated successfully!")
    console.log("[v0] Updated product:", product)

    // Revalidate all product-related paths
    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/boutique")

    return { success: true, product }
  } catch (error: any) {
    console.error("[v0] ❌ Error in updateProduct:", error)
    return { success: false, error: error.message }
  }
}

export async function createProduct(data: any) {
  console.log("[v0] ===== SERVER ACTION: CREATE PRODUCT =====")
  console.log("[v0] Data:", JSON.stringify(data, null, 2))

  try {
    const supabase = createAdminClient()

    const insertData = {
      name: data.name,
      description: data.description,
      price: data.price,
      image_url: data.image_url,
      material: data.material || "",
      colors: data.colors || [],
      sizes: data.sizes || [],
      stock_quantity: data.stock_quantity,
      is_available: data.is_available,
      is_featured: data.is_featured,
    }

    console.log("[v0] Calling Supabase insert...")
    const { data: product, error } = await supabase.from("products").insert(insertData).select().single()

    if (error) {
      console.error("[v0] ❌ Supabase error:", error)
      throw new Error(error.message)
    }

    console.log("[v0] ✅ Product created successfully!")
    console.log("[v0] Created product:", product)

    // Revalidate all product-related paths
    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/boutique")

    return { success: true, product }
  } catch (error: any) {
    console.error("[v0] ❌ Error in createProduct:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteProduct(id: string) {
  console.log("[v0] ===== SERVER ACTION: DELETE PRODUCT =====")
  console.log("[v0] Product ID:", id)

  try {
    const supabase = createAdminClient()

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("[v0] ❌ Supabase error:", error)
      throw new Error(error.message)
    }

    console.log("[v0] ✅ Product deleted successfully!")

    // Revalidate all product-related paths
    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/boutique")

    return { success: true }
  } catch (error: any) {
    console.error("[v0] ❌ Error in deleteProduct:", error)
    return { success: false, error: error.message }
  }
}
