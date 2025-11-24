import { getProducts } from "@/lib/api/products"
import { getCurrentUser } from "@/lib/api/user"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ShopPage() {
  const user = await getCurrentUser()
  const products = await getProducts(user?.university_id)

  const categories = [...new Set(products.map((p) => p.category))]
  const productsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = products.filter((p) => p.category === category)
      return acc
    },
    {} as Record<string, typeof products>,
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{user?.universities?.name || "Campus"} Merchandise</h1>
              <p className="text-muted-foreground">Exclusive merchandise for your university</p>
            </div>

            {categories.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  <ProductGrid products={products} />
                </TabsContent>
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <ProductGrid products={productsByCategory[category]} />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
