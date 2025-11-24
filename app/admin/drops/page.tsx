import { getAllDrops } from "@/lib/api/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Clock } from "lucide-react"

export default async function AdminDropsPage() {
  const drops = await getAllDrops()

  const now = new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Limited Drops</h1>
          <p className="text-muted-foreground">Manage limited-time campaigns</p>
        </div>
        <Button asChild>
          <Link href="/admin/drops/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Drop
          </Link>
        </Button>
      </div>

      {drops.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-xl font-semibold mb-2">No drops yet</p>
            <p className="text-muted-foreground mb-6">Create your first limited drop campaign</p>
            <Button asChild>
              <Link href="/admin/drops/new">Create Drop</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {drops.map((drop: any) => {
            const startDate = new Date(drop.start_date)
            const endDate = new Date(drop.end_date)
            const isActive = now >= startDate && now <= endDate
            const isUpcoming = now < startDate
            const isEnded = now > endDate

            return (
              <Card key={drop.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={isActive ? "bg-primary" : isUpcoming ? "bg-blue-500" : "bg-gray-500"}>
                      {isActive ? "Live" : isUpcoming ? "Upcoming" : "Ended"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{drop.universities?.name}</span>
                  </div>
                  <CardTitle className="mt-4">{drop.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{drop.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
