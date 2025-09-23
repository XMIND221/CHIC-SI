"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Lock, MessageSquare, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const authorizedNumbers = [
    { value: "+221777461097", label: "+221 77 746 10 97" },
    { value: "+221784624991", label: "+221 78 462 49 91" },
  ]

  const [phone, setPhone] = useState(authorizedNumbers[0].value)
  const [showDropdown, setShowDropdown] = useState(false)
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  const sendSMSCode = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep("code")
        setSuccess("Code envoyé par SMS")
        setCountdown(60)

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(data.error || "Erreur lors de l'envoi du code")
      }
    } catch (error) {
      setError("Erreur de connexion")
    }

    setIsLoading(false)
  }

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/verify-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem("adminPhone", phone)
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "Code incorrect")
      }
    } catch (error) {
      setError("Erreur de connexion")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
            {step === "phone" ? (
              <Phone className="w-8 h-8 text-rose-600" />
            ) : (
              <MessageSquare className="w-8 h-8 text-rose-600" />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Administration Si-Chic</CardTitle>
            <CardDescription className="text-gray-600">
              {step === "phone" ? "Choisissez le numéro pour recevoir le code" : "Entrez le code reçu par SMS"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {step === "phone" ? (
            <div className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Numéro administrateur autorisé
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full h-12 pl-10 pr-10 border border-gray-200 rounded-md bg-white text-left focus:border-rose-500 focus:ring-1 focus:ring-rose-500 flex items-center justify-between"
                  >
                    <span className="text-gray-900">{authorizedNumbers.find((num) => num.value === phone)?.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      {authorizedNumbers.map((number) => (
                        <button
                          key={number.value}
                          type="button"
                          onClick={() => {
                            setPhone(number.value)
                            setShowDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-rose-50 first:rounded-t-md last:rounded-b-md ${
                            phone === number.value ? "bg-rose-50 text-rose-700" : "text-gray-900"
                          }`}
                        >
                          {number.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={sendSMSCode}
                className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Envoi en cours..." : "Recevoir le code"}
              </Button>
            </div>
          ) : (
            <form onSubmit={verifyCode} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                  Code de vérification
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="pl-10 h-12 border-gray-200 focus:border-rose-500 focus:ring-rose-500 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-medium"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? "Vérification..." : "Vérifier le code"}
              </Button>

              <div className="flex justify-between items-center text-sm">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("phone")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Retour
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={sendSMSCode}
                  disabled={countdown > 0 || isLoading}
                  className="text-rose-600 hover:text-rose-700"
                >
                  {countdown > 0 ? `Renvoyer (${countdown}s)` : "Renvoyer le code"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Accès réservé au gérant autorisé • {authorizedNumbers.find((num) => num.value === phone)?.label}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
