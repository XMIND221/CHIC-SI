import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching products:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    return NextResponse.json(products || [])
  } catch (error) {
    console.error("[v0] Products API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          name: body.name,
          description: body.description,
          price: body.price,
          category_id: body.category_id || null,
          image_url: body.image_url,
          images: body.images || [body.image_url],
          material: body.material,
          colors: body.colors || [],
          sizes: body.sizes || [],
          stock_quantity: body.stock_quantity || 0,
          is_available: body.is_available !== false,
          is_featured: body.is_featured || false,
          rating: 0,
          review_count: 0,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating product:", error)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("[v0] Products POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
