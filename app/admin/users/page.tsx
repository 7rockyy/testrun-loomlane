import { AdminHeader } from "@/components/admin-header"
import { getAllUsers, getAllUniversities } from "@/lib/api/admin"
import { UsersTable } from "@/components/users-table"

export default async function AdminUsersPage() {
  const [users, universities] = await Promise.all([getAllUsers(), getAllUniversities()])

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader title="Users" />
      <main className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">All Users</h2>
        </div>

        <UsersTable initialUsers={users} universities={universities} />
      </main>
    </div>
  )
}
