import { AdminHeader } from "@/components/admin-header"
import { getAllUniversities } from "@/lib/api/admin"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateUniversityDialog } from "@/components/create-university-dialog"
import { DeleteUniversityButton } from "@/components/delete-university-button"

export default async function AdminUniversitiesPage() {
  const universities = await getAllUniversities()

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader title="Universities" />
      <main className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">All Universities</h2>
          <CreateUniversityDialog />
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No universities found
                  </TableCell>
                </TableRow>
              ) : (
                universities.map((uni: any) => (
                  <TableRow key={uni.id}>
                    <TableCell className="font-medium">{uni.name}</TableCell>
                    <TableCell>{uni.email_domain}</TableCell>
                    <TableCell>
                      {uni.logo_url ? (
                        <img
                          src={uni.logo_url || "/placeholder.svg"}
                          alt={uni.name}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs">No logo</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreateUniversityDialog
                          university={uni}
                          trigger={
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          }
                        />
                        <DeleteUniversityButton id={uni.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
