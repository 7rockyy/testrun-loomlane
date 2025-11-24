"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUniversity, updateUniversity } from "@/lib/api/admin"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CreateUniversityDialogProps {
  university?: any
  trigger?: React.ReactNode
}

export function CreateUniversityDialog({ university, trigger }: CreateUniversityDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      if (university) {
        await updateUniversity(university.id, formData)
        toast({
          title: "Success",
          description: "University updated successfully.",
        })
      } else {
        await createUniversity(formData)
        toast({
          title: "Success",
          description: "University created successfully.",
        })
      }
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-[#4A7C59] hover:bg-[#3A6B48]">
            <Plus className="mr-2 h-4 w-4" /> Add University
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{university ? "Edit University" : "Add University"}</DialogTitle>
          <DialogDescription>
            {university ? "Update the university details below." : "Add a new university to the platform."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" defaultValue={university?.name} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email_domain" className="text-right">
                Domain
              </Label>
              <Input
                id="email_domain"
                name="email_domain"
                placeholder="example.edu"
                defaultValue={university?.email_domain}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo_url" className="text-right">
                Logo URL
              </Label>
              <Input
                id="logo_url"
                name="logo_url"
                placeholder="https://..."
                defaultValue={university?.logo_url}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="bg-[#4A7C59] hover:bg-[#3A6B48]">
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
