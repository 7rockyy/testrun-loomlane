import { getAllOrders, getOrderStats } from "@/lib/api/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const statusColors = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  processing: "bg-purple-500",
  shipped: "bg-indigo-500",
  delivered: "bg-green-500",
  canceled: "bg-red-500",
  refunded: "bg-gray-500",
}

export default async function AdminOrdersPage() {
  const [orders, stats] = await Promise.all([getAllOrders(), getOrderStats()])

  const filterOrders = (status?: string) => {
    if (!status) return orders
    return orders.filter((order: any) => order.status === status)
  }

  const OrderList = ({ orders }: { orders: any[] }) => (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No orders in this category</p>
          </CardContent>
        </Card>
      ) : (
        orders.map((order: any) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-mono font-semibold">{order.order_number}</h3>
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                    <Badge variant="secondary">{order.payment_status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <span className="font-medium">Customer:</span> {order.users?.full_name || order.users?.email}
                    </p>
                    <p>
                      <span className="font-medium">University:</span> {order.universities?.name}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Items:</span> {order.order_items.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{order.total_amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.payment_method}</p>
                  </div>
                  <Button asChild>
                    <Link href={`/admin/orders/${order.id}`}>Manage</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">Manage and fulfill customer orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shipped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Canceled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.canceled}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <OrderList orders={orders} />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <OrderList orders={filterOrders("pending")} />
        </TabsContent>
        <TabsContent value="confirmed" className="mt-6">
          <OrderList orders={filterOrders("confirmed")} />
        </TabsContent>
        <TabsContent value="processing" className="mt-6">
          <OrderList orders={filterOrders("processing")} />
        </TabsContent>
        <TabsContent value="shipped" className="mt-6">
          <OrderList orders={filterOrders("shipped")} />
        </TabsContent>
        <TabsContent value="delivered" className="mt-6">
          <OrderList orders={filterOrders("delivered")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
