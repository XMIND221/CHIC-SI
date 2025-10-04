"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, LogOut, Menu, X, Settings } from "lucide-react"
import { useState } from "react"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  const navigation = [
    { name: "Tableau de Bord", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b elegant-shadow">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">S</span>
              </div>
              <span className="font-serif font-bold text-xl hidden sm:inline">Admin Si-Chic</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant="ghost" className="gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm">
                Voir le site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
