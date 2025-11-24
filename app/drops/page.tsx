import { getCurrentUser } from "@/lib/api/user"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export default async function DropsPage() {
  const user = await getCurrentUser()
  const supabase = await createClient()

  const { data: drops } = await supabase
    .from("drops")
    .select("*")
    .eq("university_id", user?.university_id)
    .gte("end_date", new Date().toISOString())
    .order("start_date", { ascending: true })

  const activeDrop = drops?.find(
    (drop) => new Date(drop.start_date) <= new Date() && new Date(drop.end_date) >= new Date(),
  )

  const upcomingDrops = drops?.filter((drop) => new Date(drop.start_date) > new Date())

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user ? { email: user.email, full_name: user.full_name } : undefined} />
      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Limited-Time Drops</h1>
              <p className="text-muted-foreground">Exclusive collections available for a limited time</p>
            </div>

            {activeDrop && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Active Now</h2>
                <Card className="border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary">Live Now</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Ends {new Date(activeDrop.end_date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="mt-4">{activeDrop.title}</CardTitle>
                    <CardDescription>{activeDrop.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )}

            {upcomingDrops && upcomingDrops.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {upcomingDrops.map((drop) => (
                    <Card key={drop.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Upcoming</Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(drop.start_date).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="mt-4">{drop.title}</CardTitle>
                        <CardDescription>{drop.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {!activeDrop && (!upcomingDrops || upcomingDrops.length === 0) && (
              <div className="text-center py-12">
                <p className="text-xl font-semibold mb-2">No active drops</p>
                <p className="text-muted-foreground">Check back soon for limited-time collections!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
