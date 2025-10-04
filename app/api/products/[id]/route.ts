import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

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
    console.log("[v0] PUT request for product ID:", params.id)

    const supabase = await createClient()
    const body = await request.json()

    console.log("[v0] Update data received:", body)

    // Build update object with only provided fields
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

    console.log("[v0] Updating product with data:", updateData)

    const { data: product, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error updating product:", error)
      return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 })
    }

    console.log("[v0] Product updated successfully:", product)
    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] Product PUT error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

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
