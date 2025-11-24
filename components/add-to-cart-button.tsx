"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

interface AddToCartButtonProps {
  productId: string
  availableSizes: string[]
}

export function AddToCartButton({ productId, availableSizes }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0] || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    if (!selectedSize) return

    setLoading(true)

    // Store in localStorage for now (will integrate with Supabase cart later)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.productId === productId && item.size === selectedSize)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ productId, size: selectedSize, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    setTimeout(() => {
      setLoading(false)
      router.push("/cart")
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="size-select" className="mb-2 block">
          Size
        </Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger id="size-select">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {availableSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleAddToCart} disabled={!selectedSize || loading} className="w-full" size="lg">
        <ShoppingCart className="mr-2 h-5 w-5" />
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}
