"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, TrendingUp, Eye } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableProducts: 0,
    featuredProducts: 0,
    totalViews: 0,
  })

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin_authenticated")
      if (!isAuth) {
        router.push("/admin")
        return
      }
    }

    // Fetch stats
    fetchStats()
  }, [router])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/products")
      const products = await response.json()

      setStats({
        totalProducts: products.length,
        availableProducts: products.filter((p: any) => p.is_available).length,
        featuredProducts: products.filter((p: any) => p.is_featured).length,
        totalViews: products.reduce((sum: number, p: any) => sum + (p.review_count || 0), 0),
      })
    } catch (error) {
      console.error("[v0] Error fetching stats:", error)
    }
  }

  const statCards = [
    {
      title: "Total Produits",
      value: stats.totalProducts,
      description: "Produits dans la boutique",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Produits Disponibles",
      value: stats.availableProducts,
      description: "En stock actuellement",
      icon: ShoppingBag,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Produits Vedettes",
      value: stats.featuredProducts,
      description: "Mis en avant",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Avis",
      value: stats.totalViews,
      description: "Avis clients",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-2">Vue d'ensemble de votre boutique Si-Chic</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="elegant-shadow hover:elegant-shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="elegant-shadow">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Bienvenue dans votre espace admin</CardTitle>
            <CardDescription className="text-base">Gérez facilement votre boutique en ligne Si-Chic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-lg mb-2">📦 Gestion des Produits</h3>
                <p className="text-sm text-muted-foreground">
                  Ajoutez, modifiez ou supprimez des produits. Les changements sont instantanés sur le site.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <h3 className="font-semibold text-lg mb-2">🎨 Interface Simple</h3>
                <p className="text-sm text-muted-foreground">
                  Interface intuitive et facile à utiliser pour gérer votre boutique sans complications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
