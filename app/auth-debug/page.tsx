"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EnvCheck from "@/components/env-check"

export default function AuthDebug() {
  const { data: session, status } = useSession()

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Authentication Debug</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <EnvCheck />

        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Status:</strong> {status}
            </div>

            {session ? (
              <div className="space-y-2">
                <div>
                  <strong>User:</strong> {session.user?.name}
                </div>
                <div>
                  <strong>Email:</strong> {session.user?.email}
                </div>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div>Not signed in</div>
                <Button onClick={() => signIn("google")}>Sign In with Google</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {session && (
        <Card>
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(session, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
