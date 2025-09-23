"use client"

import AdminGuard from "@/components/admin/admin-guard"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  MapPin,
  Phone,
  Mail,
  Ruler,
  Check,
  X,
} from "lucide-react"
import { useState } from "react"

interface CustomMeasurements {
  id: string
  bust?: number
  waist?: number
  hips?: number
  shoulderWidth?: number
  armLength?: number
  totalLength?: number
  neckCircumference?: number
  wristCircumference?: number
  notes?: string
  status: "pending" | "validated" | "rejected"
  validatedBy?: string
  validatedAt?: string
  rejectionReason?: string
}

const orders = [
  {
    id: "#CMD-001",
    customer: {
      name: "Aminata Diallo",
      email: "aminata.diallo@email.com",
      phone: "+221 77 123 45 67",
      address: "Dakar, Sénégal",
    },
    items: [
      {
        name: "Blazer Professionnel Élégant",
        quantity: 1,
        price: 58380,
        customMeasurements: {
          id: "MEAS-001",
          bust: 92,
          waist: 78,
          hips: 98,
          shoulderWidth: 42,
          armLength: 58,
          totalLength: 65,
          neckCircumference: 36,
          wristCircumference: 40,
          notes: "Préfère une coupe légèrement cintrée",
          status: "validated" as const,
          validatedBy: "Admin",
          validatedAt: "2024-01-15 15:30",
        },
      },
      {
        name: "Pantalon Tailleur Chic",
        quantity: 1,
        price: 36078,
        customMeasurements: {
          id: "MEAS-002",
          waist: 78,
          hips: 98,
          totalLength: 105,
          notes: "Longueur standard",
          status: "validated" as const,
          validatedBy: "Admin",
          validatedAt: "2024-01-15 15:30",
        },
      },
    ],
    total: 125400,
    status: "completed",
    paymentStatus: "paid",
    date: "2024-01-15",
    time: "14:30",
    shippingMethod: "Express 24h",
    trackingNumber: "SC240115001",
  },
  {
    id: "#CMD-002",
    customer: {
      name: "Fatou Sow",
      email: "fatou.sow@email.com",
      phone: "+221 76 987 65 43",
      address: "Thiès, Sénégal",
    },
    items: [
      {
        name: "Hijab Soie Premium",
        quantity: 2,
        price: 29518,
      },
      {
        name: "Abaya Moderne Cintrée",
        quantity: 1,
        price: 81995,
        customMeasurements: {
          id: "MEAS-003",
          bust: 88,
          waist: 72,
          hips: 94,
          shoulderWidth: 40,
          armLength: 56,
          totalLength: 140,
          neckCircumference: 36,
          notes: "Abaya longue avec manches ajustées",
          status: "pending" as const,
        },
      },
    ],
    total: 141031,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15",
    time: "10:15",
    shippingMethod: "Standard",
    trackingNumber: "SC240115002",
  },
  {
    id: "#CMD-003",
    customer: {
      name: "Mariam Kone",
      email: "mariam.kone@email.com",
      phone: "+223 65 432 10 98",
      address: "Bamako, Mali",
    },
    items: [
      { name: "Ensemble Sport Confort", quantity: 2, price: 42637 },
      { name: "Tunique Longue Raffinée", quantity: 1, price: 49197 },
    ],
    total: 134471,
    status: "pending",
    paymentStatus: "pending",
    date: "2024-01-14",
    time: "16:45",
    shippingMethod: "International",
    trackingNumber: null,
  },
  {
    id: "#CMD-004",
    customer: {
      name: "Aissatou Ba",
      email: "aissatou.ba@email.com",
      phone: "+221 78 555 44 33",
      address: "Saint-Louis, Sénégal",
    },
    items: [{ name: "Hijab Soie Premium", quantity: 3, price: 29518 }],
    total: 88554,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-14",
    time: "09:20",
    shippingMethod: "Standard",
    trackingNumber: "SC240114001",
  },
  {
    id: "#CMD-005",
    customer: {
      name: "Khadija Diop",
      email: "khadija.diop@email.com",
      phone: "+221 77 888 99 00",
      address: "Kaolack, Sénégal",
    },
    items: [
      { name: "Blazer Professionnel Élégant", quantity: 1, price: 58380 },
      { name: "Hijab Soie Premium", quantity: 1, price: 29518 },
    ],
    total: 87898,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-13",
    time: "11:30",
    shippingMethod: "Express 24h",
    trackingNumber: null,
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("XAF", "FCFA")
}

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
          <Package className="w-3 h-3 mr-1" />
          En préparation
        </Badge>
      )
    case "shipped":
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          <Truck className="w-3 h-3 mr-1" />
          Expédiée
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Annulée
        </Badge>
      )
    default:
      return null
  }
}

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Payée</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">En attente</Badge>
    case "refunded":
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Remboursée</Badge>
    default:
      return null
  }
}

const getMeasurementStatusBadge = (status: string) => {
  switch (status) {
    case "validated":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <Check className="w-3 h-3 mr-1" />
          Validées
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      )
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <X className="w-3 h-3 mr-1" />
          Rejetées
        </Badge>
      )
    default:
      return null
  }
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedMeasurement, setSelectedMeasurement] = useState<CustomMeasurements | null>(null)
  const [isMeasurementDialogOpen, setIsMeasurementDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  const handleValidateMeasurement = (measurementId: string) => {
    console.log("[v0] Validating measurement:", measurementId)
    // Ici vous intégreriez l'API pour valider les mesures
    setIsMeasurementDialogOpen(false)
    setSelectedMeasurement(null)
  }

  const handleRejectMeasurement = (measurementId: string, reason: string) => {
    console.log("[v0] Rejecting measurement:", measurementId, "Reason:", reason)
    // Ici vous intégreriez l'API pour rejeter les mesures
    setIsMeasurementDialogOpen(false)
    setSelectedMeasurement(null)
    setRejectionReason("")
  }

  const handleViewMeasurement = (measurement: CustomMeasurements) => {
    setSelectedMeasurement(measurement)
    setIsMeasurementDialogOpen(true)
  }

  const getPendingMeasurementsCount = () => {
    return orders.reduce((count, order) => {
      return (
        count +
        order.items.filter((item) => item.customMeasurements && item.customMeasurements.status === "pending").length
      )
    }, 0)
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des commandes</h1>
            <p className="text-gray-600 mt-2">Suivez et gérez toutes les commandes de votre boutique</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total commandes</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{orders.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {orders.filter((o) => o.status === "pending").length}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expédiées</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {orders.filter((o) => o.status === "shipped").length}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Truck className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Terminées</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {orders.filter((o) => o.status === "completed").length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Mesures à valider</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{getPendingMeasurementsCount()}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Ruler className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par numéro, client ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="processing">En préparation</SelectItem>
                    <SelectItem value="shipped">Expédiées</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                    <SelectItem value="cancelled">Annulées</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Commandes ({filteredOrders.length})</CardTitle>
              <CardDescription>Liste de toutes les commandes avec leurs détails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Commande</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Montant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Paiement</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Mesures</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.items.length} article(s)</p>
                            {order.trackingNumber && (
                              <p className="text-xs text-blue-600 mt-1">Suivi: {order.trackingNumber}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{order.customer.name}</p>
                            <p className="text-sm text-gray-500">{order.customer.email}</p>
                            <p className="text-xs text-gray-400">{order.customer.address}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                          <p className="text-sm text-gray-500">{order.shippingMethod}</p>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                        <td className="py-4 px-4">{getPaymentBadge(order.paymentStatus)}</td>
                        <td className="py-4 px-4">
                          {(() => {
                            const itemsWithMeasurements = order.items.filter((item) => item.customMeasurements)
                            if (itemsWithMeasurements.length === 0) {
                              return <span className="text-sm text-gray-400">Aucune</span>
                            }
                            const pendingCount = itemsWithMeasurements.filter(
                              (item) => item.customMeasurements?.status === "pending",
                            ).length
                            const validatedCount = itemsWithMeasurements.filter(
                              (item) => item.customMeasurements?.status === "validated",
                            ).length

                            return (
                              <div className="space-y-1">
                                {validatedCount > 0 && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                    {validatedCount} validée(s)
                                  </Badge>
                                )}
                                {pendingCount > 0 && (
                                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                                    {pendingCount} en attente
                                  </Badge>
                                )}
                              </div>
                            )
                          })()}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm text-gray-900">{order.date}</p>
                            <p className="text-xs text-gray-500">{order.time}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Order Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedOrder && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <span>Détails de la commande {selectedOrder.id}</span>
                      {getStatusBadge(selectedOrder.status)}
                    </DialogTitle>
                    <DialogDescription>
                      Commande passée le {selectedOrder.date} à {selectedOrder.time}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                    {/* Customer Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Informations client</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{selectedOrder.customer.address}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Shipping Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Livraison</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Méthode: {selectedOrder.shippingMethod}</p>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div>
                            <p className="text-sm font-medium">Numéro de suivi:</p>
                            <p className="text-sm text-blue-600">{selectedOrder.trackingNumber}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">Statut paiement:</p>
                          {getPaymentBadge(selectedOrder.paymentStatus)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Articles commandés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                <p className="text-sm text-gray-600">{formatPrice(item.price)} / unité</p>
                              </div>
                            </div>
                            {item.customMeasurements && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <Ruler className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium">Mesures personnalisées</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {getMeasurementStatusBadge(item.customMeasurements.status)}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewMeasurement(item.customMeasurements!)}
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      Voir
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                  {item.customMeasurements.bust && (
                                    <span>Tour de poitrine: {item.customMeasurements.bust}cm</span>
                                  )}
                                  {item.customMeasurements.waist && (
                                    <span>Tour de taille: {item.customMeasurements.waist}cm</span>
                                  )}
                                  {item.customMeasurements.hips && (
                                    <span>Tour de hanches: {item.customMeasurements.hips}cm</span>
                                  )}
                                  {item.customMeasurements.totalLength && (
                                    <span>Longueur totale: {item.customMeasurements.totalLength}cm</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Total:</p>
                            <p className="text-lg font-bold text-rose-600">{formatPrice(selectedOrder.total)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                      Fermer
                    </Button>
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white">Modifier le statut</Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={isMeasurementDialogOpen} onOpenChange={setIsMeasurementDialogOpen}>
            <DialogContent className="max-w-2xl">
              {selectedMeasurement && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Ruler className="w-5 h-5" />
                      <span>Mesures personnalisées - {selectedMeasurement.id}</span>
                    </DialogTitle>
                    <DialogDescription>
                      Consultez et validez les mesures avant transmission à la production
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4 space-y-6">
                    {/* Statut actuel */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Statut actuel:</span>
                      {getMeasurementStatusBadge(selectedMeasurement.status)}
                    </div>

                    {/* Mesures */}
                    <div className="grid grid-cols-2 gap-4">
                      {selectedMeasurement.bust && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Tour de poitrine</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.bust} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.waist && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Tour de taille</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.waist} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.hips && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Tour de hanches</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.hips} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.shoulderWidth && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Largeur d'épaules</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.shoulderWidth} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.armLength && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Longueur de bras</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.armLength} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.totalLength && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Longueur totale</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.totalLength} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.neckCircumference && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Tour de cou</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.neckCircumference} cm</p>
                        </div>
                      )}
                      {selectedMeasurement.wristCircumference && (
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Tour de poignet</p>
                          <p className="text-lg font-semibold">{selectedMeasurement.wristCircumference} cm</p>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {selectedMeasurement.notes && (
                      <div>
                        <p className="font-medium mb-2">Notes du client:</p>
                        <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{selectedMeasurement.notes}</p>
                      </div>
                    )}

                    {/* Informations de validation */}
                    {selectedMeasurement.status === "validated" && selectedMeasurement.validatedBy && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          Validé par {selectedMeasurement.validatedBy} le {selectedMeasurement.validatedAt}
                        </p>
                      </div>
                    )}

                    {/* Zone de rejet */}
                    {selectedMeasurement.status === "pending" && (
                      <div className="space-y-3">
                        <p className="font-medium">Motif de rejet (optionnel):</p>
                        <Textarea
                          placeholder="Expliquez pourquoi ces mesures ne sont pas acceptables..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsMeasurementDialogOpen(false)}>
                      Fermer
                    </Button>
                    {selectedMeasurement.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          onClick={() => handleRejectMeasurement(selectedMeasurement.id, rejectionReason)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Rejeter
                        </Button>
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleValidateMeasurement(selectedMeasurement.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Valider
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </AdminGuard>
  )
}
