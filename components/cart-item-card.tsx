"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "@/lib/types"
import { updateCartItem, removeFromCart } from "@/lib/api/cart"
import { useRouter } from "next/navigation"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdateQuantity = async (newQuantity: number) => {
    setLoading(true)
    try {
      await updateCartItem(item.id, newQuantity)
      setQuantity(newQuantity)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading(true)
    try {
      await removeFromCart(item.id)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error removing item:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!item.product) return null

  const subtotal = item.product.price * quantity

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.product.image_url || "/placeholder.svg?height=80&width=80"}
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
            <p className="text-sm font-semibold mt-1">₹{item.product.price.toFixed(2)}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button variant="ghost" size="icon" onClick={handleRemove} disabled={loading} className="h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={loading || quantity <= 1}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={loading}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm font-bold">₹{subtotal.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
