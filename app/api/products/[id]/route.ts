import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()

    const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (error) {
      console.error("[v0] Error fetching product:", error)
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] Product GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] ===== PUT REQUEST START =====")
    console.log("[v0] Product ID:", params.id)

    const supabase = createAdminClient()
    console.log("[v0] Admin client created successfully")

    const body = await request.json()
    console.log("[v0] Request body:", JSON.stringify(body, null, 2))

    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (body.name !== undefined) updateData.name = body.name
    if (body.description !== undefined) updateData.description = body.description
    if (body.price !== undefined) updateData.price = body.price
    if (body.image_url !== undefined) updateData.image_url = body.image_url
    if (body.material !== undefined) updateData.material = body.material
    if (body.colors !== undefined) updateData.colors = body.colors
    if (body.sizes !== undefined) updateData.sizes = body.sizes
    if (body.stock_quantity !== undefined) updateData.stock_quantity = body.stock_quantity
    if (body.is_available !== undefined) updateData.is_available = body.is_available
    if (body.is_featured !== undefined) updateData.is_featured = body.is_featured

    console.log("[v0] Update data prepared:", JSON.stringify(updateData, null, 2))
    console.log("[v0] Calling Supabase update...")

    const { data: product, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] ❌ SUPABASE ERROR:", JSON.stringify(error, null, 2))
      return NextResponse.json({ error: error.message || "Failed to update product", details: error }, { status: 500 })
    }

    console.log("[v0] ✅ Product updated successfully!")
    console.log("[v0] Updated product:", JSON.stringify(product, null, 2))
    console.log("[v0] ===== PUT REQUEST END =====")

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("[v0] ❌ EXCEPTION in PUT:", error)
    console.error("[v0] Error message:", error?.message)
    console.error("[v0] Error stack:", error?.stack)
    return NextResponse.json({ error: "Internal server error", details: error?.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()

    const { error } = await supabase.from("products").delete().eq("id", params.id)

    if (error) {
      console.error("[v0] Error deleting product:", error)
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Product DELETE error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
