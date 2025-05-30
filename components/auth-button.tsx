"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, Loader2 } from "lucide-react"
import { useState } from "react"

export function AuthButton() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <Button disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <Button onClick={handleSignOut} variant="outline">
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    )
  }

  return (
    <Button onClick={handleSignIn}>
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  )
}
