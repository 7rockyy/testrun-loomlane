import Link from "next/link"
import { notFound } from "next/navigation"
import { getOrderById } from "@/lib/api/orders"
import { getCurrentUser } from "@/lib/api/user"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [order, user] = await Promise.all([getOrderById(id), getCurrentUser()])

  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} />
      <main className="flex-1 bg-muted/30">
        <div className="container px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-12 pb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>

              <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>

              <div className="bg-muted rounded-lg p-6 mb-8 text-left">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number</span>
                    <span className="font-mono font-semibold">{order.order_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-semibold">₹{order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-semibold">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-semibold capitalize">{order.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href={`/orders/${order.id}`}>View Order Details</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
