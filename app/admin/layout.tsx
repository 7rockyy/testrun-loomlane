import type React from "react"
import { checkAdminAccess } from "@/lib/api/admin"
import { AdminHeader } from "@/components/admin-header"
import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAdminAccess()

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex">
        <aside className="hidden lg:block w-64 border-r bg-muted/30">
          <div className="space-y-4 py-6 px-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
              <AdminNav />
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
