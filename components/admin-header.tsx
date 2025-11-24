"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AdminNav } from "./admin-nav"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
                <AdminNav />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/images/screenshot-202025-11-24-20at-206.png" alt="Loomlane" className="h-8" />
            <span className="font-semibold text-sm hidden sm:inline">Admin</span>
          </Link>
        </div>

        <Button asChild variant="outline" size="sm" className="hidden sm:flex bg-transparent">
          <Link href="/shop">View Store</Link>
        </Button>

        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
