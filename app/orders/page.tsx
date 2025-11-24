import Link from "next/link"
import { getOrders } from "@/lib/api/orders"
import { getCurrentUser } from "@/lib/api/user"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

const statusColors = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  processing: "bg-purple-500",
  shipped: "bg-indigo-500",
  delivered: "bg-green-500",
  canceled: "bg-red-500",
  refunded: "bg-gray-500",
}

export default async function OrdersPage() {
  const [user, orders] = await Promise.all([getCurrentUser(), getOrders()])

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} />
      <main className="flex-1 bg-muted/30">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                <Button asChild>
                  <Link href="/shop">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-mono font-semibold">{order.order_number}</h3>
                          <Badge className={statusColors[order.status]}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">₹{order.total_amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.order_items.length} item
                          {order.order_items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      {order.order_items.slice(0, 3).map((item) => (
                        <div key={item.id} className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item.product_image || "/placeholder.svg?height=64&width=64" || "/placeholder.svg"}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.order_items.length > 3 && (
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-sm font-semibold text-muted-foreground">
                          +{order.order_items.length - 3}
                        </div>
                      )}
                    </div>

                    <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                      <Link href={`/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
