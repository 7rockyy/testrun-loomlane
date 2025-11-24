"use server"

import { createClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/types"

export async function getProducts(universityId?: string): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false })

  if (universityId) {
    query = query.eq("university_id", universityId)
  }

  const { data, error } = await query

  if (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }

  return data
}

export async function getProductsByCategory(category: string, universityId?: string): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (universityId) {
    query = query.eq("university_id", universityId)
  }

  const { data, error } = await query

  if (error) {
    console.error("[v0] Error fetching products by category:", error)
    return []
  }

  return data || []
}

export async function getActiveDrops() {
  const supabase = await createClient()
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("drops")
    .select("*, universities(name)")
    .eq("is_active", true)
    .lte("start_date", now)
    .gte("end_date", now)
    .order("end_date", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching active drops:", error)
    return []
  }

  return data || []
}
