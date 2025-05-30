"use client"

import { useSession } from "next-auth/react"
import { LoginButton } from "@/components/login-button"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function AuthTestPage() {
  const { data: session, status } = useSession()

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Authentication Test Page</h1>

        <div className="p-4 border rounded-md">
          <h2 className="font-semibold mb-2">Authentication Status: {status}</h2>

          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            <div className="space-y-4">
              <div>
                <p>Signed in as:</p>
                <pre className="bg-muted p-2 rounded-md mt-2 overflow-auto">{JSON.stringify(session, null, 2)}</pre>
              </div>
              <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p>Not signed in</p>
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
