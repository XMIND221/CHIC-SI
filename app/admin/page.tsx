"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false) // Added show/hide password
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple password check
    if (password === "sichic2024") {
      localStorage.setItem("admin_authenticated", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Mot de passe incorrect")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md elegant-shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-serif">Admin Si-Chic</CardTitle>
          <CardDescription className="text-base">Connectez-vous pour gérer votre boutique</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  className="h-12 text-base pr-12"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive font-medium">{error}</p>}
              <div className="bg-muted/50 border border-border rounded-lg p-3 space-y-1">
                <p className="text-sm font-medium">Mot de passe par défaut :</p>
                <p className="text-lg font-mono font-bold text-primary">sichic2024</p>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
