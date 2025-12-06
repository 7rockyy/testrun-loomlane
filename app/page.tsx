import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/api/user"
import { Flame, Sparkles, ShieldCheck, Truck, Star, Shirt } from "lucide-react"

const heroPosters = [
  {
    title: "BITS Hyderabad Heritage Hoodie",
    tag: "Live Drop",
    image:
      "https://images.unsplash.com/photo-1542293787938-4d273c3f3f50?auto=format&fit=crop&w=1200&q=80&q=80",
    accent: "Emerald fleece • limited batch",
  },
  {
    title: "Flame University Athletics",
    tag: "New Release",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80&q=80",
    accent: "Performance tees • moisture control",
  },
  {
    title: "Design Dept. Studio Tee",
    tag: "Capsule",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80&q=80",
    accent: "Oversized fit • soft-hand print",
  },
]

const featureGrid = [
  {
    title: "Built for campus",
    description: "Fits tested on real students. Durable fabrics that survive late labs and long commutes.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Limited drops",
    description: "Small batches keep every piece special and cut down on waste.",
    icon: <Flame className="h-5 w-5" />,
  },
  {
    title: "Fast shipping",
    description: "Tracked delivery with transparent updates when weather or carriers slow things down.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Quality guaranteed",
    description: "Heavyweight fleece, ringspun cotton, and verified suppliers only.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
]

const fitShowcase = [
  {
    title: "Signature Hoodies",
    description: "Brushed fleece, double-needle seams, and campus crests.",
    image:
      "https://images.unsplash.com/photo-1542293787938-4d273c3f3f50?auto=format&fit=crop&w=1200&q=80&q=80",
  },
  {
    title: "Everyday Tees",
    description: "Soft-hand prints on breathable ringspun cotton.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80&q=80",
  },
  {
    title: "Outerwear & Windbreakers",
    description: "Lightweight shells with reflective hits and packable pockets.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80&q=80",
  },
  {
    title: "Caps & Accessories",
    description: "Cord caps, totes, and lanyards to finish the fit.",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80&q=80",
  },
]

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} />
      <main className="relative">
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-emerald-600/10 text-emerald-800 border border-emerald-200 w-fit">New Season</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-slate-900">
                  Campus merch that actually fits your life
                </h1>
                <p className="text-lg text-slate-700 max-w-2xl">
                  Drops co-created with students, built with better fabrics, and shipped fast. From BITS Hoodies to
                  campus tees—your campus, your style.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-500">
                    <Link href="/shop">Shop the latest</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-emerald-200 text-emerald-800 bg-white hover:bg-emerald-50"
                  >
                    <Link href="/drops">View drops</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span>Student-rated fits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shirt className="h-4 w-4 text-emerald-600" />
                    <span>Size runs XS–XXL</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 bg-emerald-100 blur-3xl" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {heroPosters.map((poster, index) => (
                    <Link key={poster.title} href="/shop">
                      <div
                        className={`rounded-2xl overflow-hidden border border-emerald-100 bg-white shadow-xl transform cursor-pointer ${
                          index % 2 === 0 ? "sm:-translate-y-6" : "sm:translate-y-6"
                        }`}
                      >
                        <div className="aspect-[4/5] relative">
                          <img src={poster.image} alt={poster.title} className="object-cover w-full h-full" />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-emerald-600 text-white">{poster.tag}</Badge>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <p className="text-sm text-emerald-700">{poster.accent}</p>
                          <h3 className="text-lg font-semibold">{poster.title}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureGrid.map((item) => (
            <div key={item.title} className="rounded-xl border border-emerald-100 bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  {item.icon}
                </span>
                <p className="text-sm uppercase tracking-wide text-emerald-700/80">Best practice</p>
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="container mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-emerald-700 uppercase text-xs tracking-[0.3em]">Fits for every campus</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Find your best fit</h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-emerald-200 text-emerald-800 bg-white hover:bg-emerald-50"
            >
              <Link href="/shop">Browse all</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fitShowcase.map((item) => (
              <div key={item.title} className="rounded-2xl overflow-hidden border border-emerald-100 bg-white">
                <div className="aspect-[4/5] relative">
                  <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-emerald-600 text-white">New</Badge>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
