"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateUserRole } from "@/lib/api/admin"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function UserRoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onRoleChange(newRole: string) {
    setIsLoading(true)
    try {
      await updateUserRole(userId, newRole)
      toast({
        title: "Role Updated",
        description: "User role has been updated successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select defaultValue={currentRole} onValueChange={onRoleChange} disabled={isLoading}>
      <SelectTrigger className="w-[130px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="student">Student</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="superadmin">Superadmin</SelectItem>
      </SelectContent>
    </Select>
  )
}
