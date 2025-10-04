import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()

    const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).maybeSingle()

    if (error) {
      console.error("[v0] Error fetching product:", error)
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (!product) {
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

    let supabase
    try {
      supabase = createAdminClient()
    } catch (clientError: any) {
      console.error("[v0] ❌ Failed to create admin client:", clientError.message)
      return NextResponse.json({ error: "Server configuration error", details: clientError.message }, { status: 500 })
    }

    const body = await request.json()
    console.log("[v0] Request body:", JSON.stringify(body, null, 2))

    const updateData: any = {
      name: body.name,
      description: body.description,
      price: body.price,
      image_url: body.image_url,
      material: body.material || "",
      colors: body.colors || [],
      sizes: body.sizes || [],
      stock_quantity: body.stock_quantity,
      is_available: body.is_available,
      is_featured: body.is_featured,
      updated_at: new Date().toISOString(),
    }

    console.log("[v0] Update data prepared:", JSON.stringify(updateData, null, 2))
    console.log("[v0] Calling Supabase update...")

    const { data: products, error } = await supabase.from("products").update(updateData).eq("id", params.id).select()

    if (error) {
      console.error("[v0] ❌ SUPABASE ERROR:", JSON.stringify(error, null, 2))
      return NextResponse.json({ error: error.message || "Failed to update product", details: error }, { status: 500 })
    }

    const product = products?.[0]
    if (!product) {
      console.error("[v0] ❌ Product not found after update")
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
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
