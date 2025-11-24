"use server"

import { createClient } from "@/lib/supabase/server"
import type { CartItem } from "@/lib/types"

export async function getCart(): Promise<CartItem[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error fetching cart:", error)
    return []
  }

  return data || []
}

export async function addToCart(productId: string, size: string, quantity = 1) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Check if item already exists
  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .eq("size", size)
    .single()

  if (existing) {
    // Update quantity
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id)

    if (error) throw error
  } else {
    // Insert new item
    const { error } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, product_id: productId, size, quantity })

    if (error) throw error
  }
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  const supabase = await createClient()

  if (quantity <= 0) {
    const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId)

    if (error) throw error
  } else {
    const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId)

    if (error) throw error
  }
}

export async function removeFromCart(cartItemId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId)

  if (error) throw error
}

export async function clearCart() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

  if (error) throw error
}

export async function getCartCount(userId: string): Promise<number> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("cart_items").select("quantity").eq("user_id", userId)

  if (error) {
    console.error("[v0] Error fetching cart count:", error)
    return 0
  }

  return data?.reduce((sum, item) => sum + item.quantity, 0) || 0
}
