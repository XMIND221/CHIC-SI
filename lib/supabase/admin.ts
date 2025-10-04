import { createClient } from "@supabase/supabase-js"

/**
 * Admin Supabase client with service role key
 * This bypasses Row Level Security (RLS) and should only be used in API routes
 * NEVER use this client in client-side code
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log("[v0] Creating admin client...")
  console.log("[v0] Supabase URL exists:", !!supabaseUrl)
  console.log("[v0] Service key exists:", !!supabaseServiceKey)

  if (!supabaseUrl) {
    console.error("[v0] ❌ Missing SUPABASE_URL")
    throw new Error("Missing SUPABASE_URL environment variable")
  }

  if (!supabaseServiceKey) {
    console.error("[v0] ❌ Missing SUPABASE_SERVICE_ROLE_KEY")
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable")
  }

  const client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  console.log("[v0] ✅ Admin client created successfully")
  return client
}
