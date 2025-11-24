import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getMockSession } from "@/lib/auth/mock-auth"

export async function middleware(request: NextRequest) {
  const hasMockSession = getMockSession() !== null

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!hasMockSession) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/auth/login"
        return NextResponse.redirect(redirectUrl)
      }
      // Check if user is admin in mock session would require additional logic
    }

    if (
      hasMockSession &&
      request.nextUrl.pathname.startsWith("/auth") &&
      !request.nextUrl.pathname.includes("/callback")
    ) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/"
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    console.error("[v0] Supabase auth error:", error)
    return NextResponse.next()
  }

  // Admin route protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/auth/login"
      return NextResponse.redirect(redirectUrl)
    }

    try {
      const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

      if (!userData || !["admin", "superadmin"].includes(userData.role)) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error("[v0] Database error:", error)
      // If database check fails, redirect to home
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = "/"
      return NextResponse.redirect(redirectUrl)
    }
  }

  // This was redirecting non-logged-in users away from all pages except auth and home

  if (user && request.nextUrl.pathname.startsWith("/auth") && !request.nextUrl.pathname.includes("/callback")) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/"
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
