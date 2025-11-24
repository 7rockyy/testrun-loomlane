"use server"

import { createClient } from "@/lib/supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !authUser) {
    return null
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*, universities(*)")
    .eq("id", authUser.id)
    .single()

  if (userError) {
    console.error("[v0] Error fetching user data:", userError)
    return null
  }

  return userData
}
