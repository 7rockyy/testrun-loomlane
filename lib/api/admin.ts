"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function checkAdminAccess() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (!userData || !["admin", "superadmin"].includes(userData.role)) {
    redirect("/")
  }

  return userData
}

export async function getAdminStats() {
  const supabase = await createClient()

  const [{ count: totalProducts }, { count: totalOrders }, { data: recentOrders }, { data: universities }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }).limit(5),
      supabase.from("universities").select("id, name"),
    ])

  const { data: ordersData } = await supabase.from("orders").select("total_amount, payment_status")

  const totalRevenue =
    ordersData?.filter((o) => o.payment_status === "paid").reduce((sum, order) => sum + order.total_amount, 0) || 0

  return {
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    totalRevenue,
    recentOrders: recentOrders || [],
    universities: universities || [],
  }
}

export async function getAllProducts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*, universities(name)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }

  return data || []
}

export async function createProduct(formData: FormData) {
  await checkAdminAccess()
  const supabase = await createClient()

  const product = {
    university_id: formData.get("university_id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: Number.parseFloat(formData.get("price") as string),
    image_url: formData.get("image_url") as string,
    sizes: JSON.parse(formData.get("sizes") as string),
    stock: JSON.parse(formData.get("stock") as string),
    is_limited_edition: formData.get("is_limited_edition") === "true",
  }

  const { error } = await supabase.from("products").insert(product)

  if (error) throw error
}

export async function updateProduct(productId: string, formData: FormData) {
  await checkAdminAccess()
  const supabase = await createClient()

  const updates = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: Number.parseFloat(formData.get("price") as string),
    image_url: formData.get("image_url") as string,
    sizes: JSON.parse(formData.get("sizes") as string),
    stock: JSON.parse(formData.get("stock") as string),
    is_limited_edition: formData.get("is_limited_edition") === "true",
    is_active: formData.get("is_active") === "true",
  }

  const { error } = await supabase.from("products").update(updates).eq("id", productId)

  if (error) throw error
}

export async function deleteProduct(productId: string) {
  await checkAdminAccess()
  const supabase = await createClient()

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) throw error
}

export async function getAllDrops() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("drops")
    .select("*, universities(name)")
    .order("start_date", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching drops:", error)
    return []
  }

  return data || []
}

export async function createDrop(formData: FormData) {
  await checkAdminAccess()
  const supabase = await createClient()

  const drop = {
    university_id: formData.get("university_id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
  }

  const { error } = await supabase.from("drops").insert(drop)

  if (error) throw error
}

export async function deleteDrop(dropId: string) {
  await checkAdminAccess()
  const supabase = await createClient()

  const { error } = await supabase.from("drops").delete().eq("id", dropId)

  if (error) throw error
}

export async function getAllOrders() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*),
      users(email, full_name),
      universities(name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching orders:", error)
    return []
  }

  return data || []
}

export async function getAdminOrderById(orderId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(*),
      users(email, full_name, phone),
      universities(name)
    `)
    .eq("id", orderId)
    .single()

  if (error) {
    console.error("[v0] Error fetching order:", error)
    return null
  }

  return data
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  trackingNumber?: string,
  courierName?: string,
) {
  await checkAdminAccess()
  const supabase = await createClient()

  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (trackingNumber) {
    updates.tracking_number = trackingNumber
  }

  if (courierName) {
    updates.courier_name = courierName
  }

  // Auto-update payment status based on order status
  if (status === "confirmed") {
    updates.payment_status = "paid"
  }

  const { error } = await supabase.from("orders").update(updates).eq("id", orderId)

  if (error) throw error
}

export async function getOrderStats() {
  const supabase = await createClient()

  const { data: orders } = await supabase.from("orders").select("status")

  const stats = {
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    canceled: 0,
  }

  orders?.forEach((order) => {
    if (order.status in stats) {
      stats[order.status as keyof typeof stats]++
    }
  })

  return stats
}

export async function getAllUniversities() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("universities").select("*").order("name", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching universities:", error)
    return []
  }

  return data || []
}

export async function createUniversity(formData: FormData) {
  await checkAdminAccess()
  const supabase = await createClient()

  const university = {
    name: formData.get("name") as string,
    email_domain: formData.get("email_domain") as string,
    logo_url: formData.get("logo_url") as string,
  }

  const { error } = await supabase.from("universities").insert(university)

  if (error) throw error
}

export async function updateUniversity(id: string, formData: FormData) {
  await checkAdminAccess()
  const supabase = await createClient()

  const updates = {
    name: formData.get("name") as string,
    email_domain: formData.get("email_domain") as string,
    logo_url: formData.get("logo_url") as string,
  }

  const { error } = await supabase.from("universities").update(updates).eq("id", id)

  if (error) throw error
}

export async function deleteUniversity(id: string) {
  await checkAdminAccess()
  const supabase = await createClient()

  const { error } = await supabase.from("universities").delete().eq("id", id)

  if (error) throw error
}

export async function getAllUsers() {
  await checkAdminAccess()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("users")
    .select("*, universities(name)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching users:", error)
    return []
  }

  return data || []
}

export async function updateUserRole(userId: string, role: string) {
  await checkAdminAccess()
  const supabase = await createClient()

  const { error } = await supabase.from("users").update({ role }).eq("id", userId)

  if (error) throw error
}
