"use server"

import { createClient } from "@/lib/supabase/server"
import type { ShippingAddress } from "@/lib/types"

export async function createOrder(cartItems: any[], shippingAddress: ShippingAddress, paymentMethod = "UPI") {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Get user's university
  const { data: userData } = await supabase.from("users").select("university_id").eq("id", user.id).single()

  // Calculate total
  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  // Generate order number
  const orderNumber = `LL${Date.now()}`

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      university_id: userData?.university_id,
      order_number: orderNumber,
      total_amount: totalAmount,
      status: "pending",
      payment_status: "pending",
      payment_method: paymentMethod,
      shipping_address: shippingAddress,
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product.name,
    product_image: item.product.image_url,
    size: item.size,
    quantity: item.quantity,
    price: item.product.price,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) throw itemsError

  // Clear cart
  const { error: clearError } = await supabase.from("cart_items").delete().eq("user_id", user.id)

  if (clearError) throw clearError

  return order
}

export async function getOrders() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching orders:", error)
    return []
  }

  return data || []
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .eq("id", orderId)
    .single()

  if (error) {
    console.error("[v0] Error fetching order:", error)
    return null
  }

  return data
}
