import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const customerData = await request.json()

    console.log("[v0] Creating customer account:", customerData)

    const tempPassword = Math.random().toString(36).slice(-12) + "Aa1!" // Mot de passe temporaire sécurisé

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: customerData.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: customerData.first_name,
        last_name: customerData.last_name,
        phone: customerData.phone,
      },
    })

    if (authError) {
      console.error("[v0] Auth error:", authError)
      // Si l'utilisateur existe déjà, on continue quand même
      if (!authError.message.includes("already registered")) {
        return NextResponse.json({ error: authError.message }, { status: 500 })
      }
    }

    const userId = authData?.user?.id

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .upsert(
        [
          {
            id: userId,
            first_name: customerData.first_name,
            last_name: customerData.last_name,
            phone: customerData.phone,
            email: customerData.email,
            address: customerData.address,
            city: customerData.city,
            postal_code: customerData.postal_code,
            country: customerData.country,
            measurements: customerData.measurements,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "id" },
      )
      .select()

    if (profileError) {
      console.error("[v0] Profile error:", profileError)
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }

    if (userId) {
      const { error: resetError } = await supabase.auth.admin.generateLink({
        type: "recovery",
        email: customerData.email,
      })

      if (resetError) {
        console.error("[v0] Password reset email error:", resetError)
      } else {
        console.log("[v0] Password reset email sent to:", customerData.email)
      }
    }

    console.log("[v0] Customer account created successfully")

    return NextResponse.json({
      success: true,
      data: profileData,
      message: "Compte créé avec succès. Un email de connexion a été envoyé.",
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to create customer account" }, { status: 500 })
  }
}
