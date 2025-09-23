"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, Package, TrendingUp, Eye, AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Revenus du mois",
    value: "2 847 650 FCFA",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Commandes",
    value: "156",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: ShoppingBag,
  },
  {
    title: "Clients actifs",
    value: "1,247",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Produits en stock",
    value: "89",
    change: "-3.1%",
    changeType: "negative" as const,
    icon: Package,
  },
]

const recentOrders = [
  {
    id: "#CMD-001",
    customer: "Aminata Diallo",
    amount: "125 400 FCFA",
    status: "completed",
    date: "Il y a 2h",
  },
  {
    id: "#CMD-002",
    customer: "Fatou Sow",
    amount: "89 750 FCFA",
    status: "processing",
    date: "Il y a 4h",
  },
  {
    id: "#CMD-003",
    customer: "Mariam Kone",
    amount: "156 200 FCFA",
    status: "pending",
    date: "Il y a 6h",
  },
  {
    id: "#CMD-004",
    customer: "Aissatou Ba",
    amount: "67 890 FCFA",
    status: "completed",
    date: "Il y a 8h",
  },
]

const topProducts = [
  {
    name: "Blazer Professionnel Élégant",
    sales: 45,
    revenue: "2 627 100 FCFA",
    trend: "up",
  },
  {
    name: "Hijab Soie Premium",
    sales: 38,
    revenue: "1 121 684 FCFA",
    trend: "up",
  },
  {
    name: "Abaya Moderne Cintrée",
    sales: 29,
    revenue: "2 377 855 FCFA",
    trend: "down",
  },
  {
    name: "Ensemble Sport Confort",
    sales: 52,
    revenue: "2 217 124 FCFA",
    trend: "up",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Terminée
        </Badge>
      )
    case "processing":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <Clock className="w-3 h-3 mr-1" />
          En cours
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      )
    default:
      return null
  }
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminLayout>
        <div className="admin-page-content space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-2">Aperçu de votre boutique Si-Chic</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p
                        className={`text-sm mt-2 flex items-center ${
                          stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-rose-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-rose-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Commandes récentes</CardTitle>
                <CardDescription>Les dernières commandes de votre boutique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900">{order.id}</p>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{order.amount}</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Voir toutes les commandes
                </Button>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Produits populaires</CardTitle>
                <CardDescription>Les produits les plus vendus ce mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} ventes</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{product.revenue}</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp
                            className={`w-4 h-4 mr-1 ${product.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          />
                          <span className={`text-sm ${product.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                            {product.trend === "up" ? "↗" : "↘"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Voir tous les produits
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
