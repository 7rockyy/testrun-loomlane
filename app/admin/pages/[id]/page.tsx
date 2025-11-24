import { AdminHeader } from "@/components/admin-header"
import { getAllPages } from "@/lib/api/pages"
import { PageEditor } from "@/components/page-editor"
import { notFound } from "next/navigation"

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const pages = await getAllPages()
  const page = pages.find((p: any) => p.id === params.id)

  if (!page) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader title={`Edit: ${page.title}`} />
      <main className="flex-1 p-6 md:p-8">
        <PageEditor page={page} />
      </main>
    </div>
  )
}
