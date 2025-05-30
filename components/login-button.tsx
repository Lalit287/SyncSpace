"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign in with Google"}
    </Button>
  )
}
