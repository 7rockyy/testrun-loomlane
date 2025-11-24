import { AdminHeader } from "@/components/admin-header"
import { getAllPages } from "@/lib/api/pages"
import { PagesTable } from "@/components/pages-table"

export default async function AdminPagesPage() {
  const pages = await getAllPages()

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader title="Pages" />
      <main className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Content Pages</h2>
            <p className="text-muted-foreground">Manage your website content pages</p>
          </div>
        </div>

        <PagesTable pages={pages} />
      </main>
    </div>
  )
}
