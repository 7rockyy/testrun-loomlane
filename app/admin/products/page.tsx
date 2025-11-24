import { getAllProducts } from "@/lib/api/admin"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit } from "lucide-react"
import { DeleteProductButton } from "@/components/delete-product-button"

export default async function AdminProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-xl font-semibold mb-2">No products yet</p>
            <p className="text-muted-foreground mb-6">Create your first product to get started</p>
            <Button asChild>
              <Link href="/admin/products/new">Add Product</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  {!product.is_active && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                    {product.is_limited_edition && <Badge className="bg-primary">LE</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.universities?.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
