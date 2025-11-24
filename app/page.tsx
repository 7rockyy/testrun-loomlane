import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getActiveDrops } from "@/lib/api/products"
import { getCartCount } from "@/lib/api/cart"
import Link from "next/link"
import { ArrowRight, Zap, Package, Truck } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userData = null
  let drops: any[] = []
  let cartCount = 0

  if (user) {
    const { data } = await supabase.from("users").select("*, universities(name)").eq("id", user.id).single()
    userData = data
    drops = await getActiveDrops()
    cartCount = await getCartCount(user.id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={userData} cartCount={cartCount} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#4A7C59]/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <img
              src="/images/screenshot-202025-11-24-20at-206.png"
              alt="Loomlane"
              className="h-20 md:h-24 mx-auto mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Premium Merchandise for College Students
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover exclusive university-branded apparel designed for students who want to represent their campus
              with style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {user ? (
                <Button asChild size="lg" className="bg-[#4A7C59] hover:bg-[#3A6B48] text-lg">
                  <Link href="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-[#4A7C59] hover:bg-[#3A6B48] text-lg">
                  <Link href="/auth/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg" className="text-lg bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Loomlane?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make it easy to get premium university merchandise delivered to your doorstep.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Package className="h-10 w-10 text-[#4A7C59] mb-2" />
                <CardTitle>University-Specific</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse products designed exclusively for your university. Every piece represents your campus pride.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-[#4A7C59] mb-2" />
                <CardTitle>Limited Drops</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get access to exclusive limited-edition designs and campus event collections before they sell out.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 text-[#4A7C59] mb-2" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quick shipping and reliable order tracking ensure your merch arrives when you need it.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {user && drops.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Active Drops</h2>
                <p className="text-muted-foreground">Limited-time collections at {userData?.universities?.name}</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/drops">View All</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drops.slice(0, 3).map((drop: any) => (
                <Card key={drop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-[#4A7C59]" />
                      <span className="text-xs font-semibold text-[#4A7C59]">LIMITED DROP</span>
                    </div>
                    <CardTitle>{drop.title}</CardTitle>
                    <CardDescription>{drop.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Ends: {new Date(drop.end_date).toLocaleDateString()}
                    </div>
                    <Button asChild className="w-full bg-[#4A7C59] hover:bg-[#3A6B48]">
                      <Link href="/drops">Shop Drop</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-[#4A7C59] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Represent Your University?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {user
              ? "Browse our latest collections and find the perfect merch for you."
              : "Join thousands of students already shopping with Loomlane."}
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href={user ? "/shop" : "/auth/signup"}>
              {user ? "Start Shopping" : "Sign Up Now"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/images/screenshot-202025-11-24-20at-206.png" alt="Loomlane" className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground">Premium merchandise for college students.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/shop" className="hover:text-foreground transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/drops" className="hover:text-foreground transition-colors">
                    Limited Drops
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/our-work" className="hover:text-foreground transition-colors">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {user ? (
                  <>
                    <li>
                      <Link href="/orders" className="hover:text-foreground transition-colors">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile" className="hover:text-foreground transition-colors">
                        Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/auth/login" className="hover:text-foreground transition-colors">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link href="/auth/signup" className="hover:text-foreground transition-colors">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Loomlane. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
