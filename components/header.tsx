"use client"

import Link from "next/link"
import { ShoppingCart, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { getMockSession, clearMockSession } from "@/lib/auth/mock-auth"
import { useState, useEffect } from "react"

interface HeaderProps {
  user?: {
    email: string
    full_name?: string
  }
  cartCount?: number
}

export function Header({ user, cartCount = 0 }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isMockMode, setIsMockMode] = useState(false)
  const [mockUser, setMockUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mockSession = getMockSession()
    if (mockSession) {
      setIsMockMode(true)
      setMockUser(mockSession)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const handleSignOut = async () => {
    if (isMockMode) {
      clearMockSession()
      router.push("/auth/login")
      router.refresh()
    } else {
      // Handle Supabase logout
      await supabase.auth.signOut()
      router.push("/auth/login")
      router.refresh()
    }
  }

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/drops", label: "Limited Drops" },
    { href: "/orders", label: "My Orders" },
    { href: "/about", label: "About Us" },
    { href: "/our-work", label: "Our Work" },
    { href: "/contact", label: "Contact" },
  ]

  const currentUser = isMockMode ? mockUser : user
  const displayName = isMockMode ? mockUser?.email : user?.full_name || user?.email

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/">
                  <img src="/images/loomlane-logo.png" alt="Loomlane" className="h-8 mb-4 object-contain" />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <img src="/images/loomlane-logo.png" alt="Loomlane" className="h-8 object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
                {isMockMode && mockUser?.role && (
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    Role: {mockUser.role}
                  </DropdownMenuLabel>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {isMockMode && mockUser?.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {isMockMode && mockUser?.role === "superadmin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
