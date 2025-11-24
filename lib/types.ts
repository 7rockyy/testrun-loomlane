export interface University {
  id: string
  name: string
  email_domain: string
  logo_url: string | null
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  university_id: string | null
  role: "student" | "admin" | "superadmin"
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  university_id: string
  name: string
  description: string | null
  category: string
  price: number
  image_url: string | null
  images: string[]
  sizes: string[]
  stock: Record<string, number>
  is_active: boolean
  is_limited_edition: boolean
  drop_id: string | null
  created_at: string
  updated_at: string
}

export interface Drop {
  id: string
  university_id: string
  title: string
  description: string | null
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
}

export interface Order {
  id: string
  user_id: string | null
  university_id: string | null
  order_number: string
  total_amount: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "canceled" | "refunded"
  payment_status: "pending" | "paid" | "failed" | "refunded"
  payment_method: string | null
  payment_id: string | null
  shipping_address: ShippingAddress
  tracking_number: string | null
  courier_name: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_image: string | null
  size: string
  quantity: number
  price: number
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  size: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface ShippingAddress {
  full_name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  zip_code: string
}
