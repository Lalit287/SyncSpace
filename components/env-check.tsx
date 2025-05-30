"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EnvCheck() {
  const [envStatus, setEnvStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Check if environment variables are available on the client side
    fetch("/api/auth-check")
      .then((res) => res.json())
      .then((data) => setEnvStatus(data))
      .catch((err) => console.error("Failed to check env vars:", err))
  }, [])

  const requiredVars = ["NEXTAUTH_URL", "NEXTAUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Environment Variables Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {requiredVars.map((varName) => (
          <div key={varName} className="flex justify-between items-center">
            <span className="text-sm font-mono">{varName}</span>
            <Badge variant={envStatus[varName] ? "default" : "destructive"}>
              {envStatus[varName] ? "✓ Set" : "✗ Missing"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
