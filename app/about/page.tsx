import { getPageBySlug } from "@/lib/api/pages"
import { Header } from "@/components/header"
import { notFound } from "next/navigation"

export default async function AboutPage() {
  const page = await getPageBySlug("about")

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </article>
      </main>
    </div>
  )
}
