import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const AUTHORIZED_NUMBERS = ["+221777461097", "+221784624991"]

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!AUTHORIZED_NUMBERS.includes(phone)) {
      return NextResponse.json({ error: "Numéro non autorisé" }, { status: 403 })
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await supabase.from("admin_sms_codes").delete().eq("phone_number", phone)

    const { error } = await supabase.from("admin_sms_codes").insert({
      phone_number: phone,
      code: code,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
    })

    if (error) {
      console.error("Erreur Supabase:", error)
      return NextResponse.json({ error: "Erreur lors de la génération du code" }, { status: 500 })
    }

    console.log(`[SMS ADMIN] Code ${code} envoyé au ${phone}`)

    // En production, remplacer par un vrai service SMS comme Twilio, Orange SMS API, etc.
    // await sendSMS(phone, `Votre code Si-Chic Admin: ${code}. Valide 10 minutes.`)

    return NextResponse.json({
      success: true,
      message: "Code envoyé par SMS",
      // En développement seulement - retirer en production
      devCode: code,
    })
  } catch (error) {
    console.error("Erreur send-sms:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
