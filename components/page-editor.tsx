"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updatePage } from "@/lib/api/pages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export function PageEditor({ page }: { page: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPublished, setIsPublished] = useState(page.is_published)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    formData.set("is_published", isPublished.toString())

    try {
      await updatePage(page.id, formData)
      toast({
        title: "Success",
        description: "Page updated successfully.",
      })
      router.push("/admin/pages")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update page.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/pages">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pages
          </Link>
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-[#4A7C59] hover:bg-[#3A6B48]">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
          <CardDescription>Update the content and settings for this page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input id="title" name="title" defaultValue={page.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Input
              id="meta_description"
              name="meta_description"
              defaultValue={page.meta_description}
              placeholder="SEO description for this page"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Page Content</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={page.content}
              rows={15}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">You can use HTML markup to format your content</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is_published" checked={isPublished} onCheckedChange={setIsPublished} />
            <Label htmlFor="is_published">Published</Label>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
