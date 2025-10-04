import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function PUT(request: Request, { params }: { params: { key: string } }) {
  try {
    const { value } = await request.json()
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("site_settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", params.key)
      .select()
      .maybeSingle()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: "Setting not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating setting:", error)
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
  }
}
