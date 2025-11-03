import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const customerData = await request.json()

    console.log("[v0] Saving customer to Supabase:", customerData)

    // Insert customer data into profiles table
    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          phone: customerData.phone,
          email: customerData.email,
          address: customerData.address,
          city: customerData.city,
          postal_code: customerData.postal_code,
          country: customerData.country,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Customer saved successfully:", data)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to save customer" }, { status: 500 })
  }
}
