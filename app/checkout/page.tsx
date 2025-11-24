import { redirect } from "next/navigation"
import { getCart } from "@/lib/api/cart"
import { getCurrentUser } from "@/lib/api/user"
import { Header } from "@/components/header"
import { CheckoutForm } from "@/components/checkout-form"

export default async function CheckoutPage() {
  const [user, cartItems] = await Promise.all([getCurrentUser(), getCart()])

  if (cartItems.length === 0) {
    redirect("/cart")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} cartCount={cartItems.length} />
      <main className="flex-1 bg-muted/30">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm cartItems={cartItems} total={total} userEmail={user?.email} />
            </div>

            <div>
              <div className="bg-card rounded-lg p-6 space-y-4 sticky top-20">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product?.image_url || "/placeholder.svg?height=64&width=64" || "/placeholder.svg"}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">{item.product?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
