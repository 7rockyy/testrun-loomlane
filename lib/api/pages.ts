"use server"

import { createClient } from "@/lib/supabase/server"

export async function getPageBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("pages").select("*").eq("slug", slug).eq("is_published", true).single()

  if (error) {
    console.error("[v0] Error fetching page:", error)
    return null
  }

  return data
}

export async function getAllPages() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("pages").select("*").order("title", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching pages:", error)
    return []
  }

  return data || []
}

export async function updatePage(pageId: string, formData: FormData) {
  const supabase = await createClient()

  const updates = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    meta_description: formData.get("meta_description") as string,
    is_published: formData.get("is_published") === "true",
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("pages").update(updates).eq("id", pageId)

  if (error) throw error
}

export async function createPage(formData: FormData) {
  const supabase = await createClient()

  const page = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    meta_description: formData.get("meta_description") as string,
    is_published: formData.get("is_published") === "true",
  }

  const { error } = await supabase.from("pages").insert(page)

  if (error) throw error
}
