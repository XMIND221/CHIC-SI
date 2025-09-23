import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const AUTHORIZED_NUMBERS = ["+221777461097", "+221784624991"]

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()

    if (!AUTHORIZED_NUMBERS.includes(phone)) {
      return NextResponse.json({ error: "Numéro non autorisé" }, { status: 403 })
    }

    const { data: smsCode, error } = await supabase
      .from("admin_sms_codes")
      .select("*")
      .eq("phone_number", phone)
      .eq("code", code)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (error || !smsCode) {
      await supabase
        .from("admin_sms_codes")
        .update({ attempts: supabase.raw("attempts + 1") })
        .eq("phone_number", phone)
        .eq("code", code)

      return NextResponse.json({ error: "Code incorrect ou expiré" }, { status: 400 })
    }

    await supabase.from("admin_sms_codes").update({ used: true }).eq("id", smsCode.id)

    await supabase.from("admin_sms_codes").delete().eq("phone_number", phone).neq("id", smsCode.id)

    return NextResponse.json({
      success: true,
      message: "Authentification réussie",
    })
  } catch (error) {
    console.error("Erreur verify-sms:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
