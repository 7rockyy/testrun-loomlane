import { notFound } from "next/navigation"
import { getProductById } from "@/lib/api/products"
import { getCurrentUser } from "@/lib/api/user"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, user] = await Promise.all([getProductById(id), getCurrentUser()])

  if (!product) {
    notFound()
  }

  const availableSizes = product.sizes.filter((size) => product.stock[size] > 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image_url || "/placeholder.svg?height=600&width=600&query=product"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.is_limited_edition && <Badge className="bg-primary">Limited Edition</Badge>}
                </div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
              </div>

              {product.description && (
                <div>
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="size" className="mb-2 block">
                    Select Size
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const inStock = product.stock[size] > 0
                      return (
                        <Button
                          key={size}
                          variant={inStock ? "outline" : "ghost"}
                          disabled={!inStock}
                          className="min-w-[60px]"
                        >
                          {size}
                          {!inStock && <span className="ml-1 text-xs">(Out)</span>}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {availableSizes.length > 0 ? (
                  <AddToCartButton productId={product.id} availableSizes={availableSizes} />
                ) : (
                  <Button disabled className="w-full" size="lg">
                    Out of Stock
                  </Button>
                )}
              </div>

              <div className="border-t pt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span className="font-mono">{product.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability:</span>
                  <span>{availableSizes.length > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
