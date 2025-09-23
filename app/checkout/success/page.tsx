"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CheckoutSuccessPage() {
  const orderNumber = "SC-2024-" + Math.random().toString(36).substr(2, 6).toUpperCase()

  useEffect(() => {
    // Clear any cart state if needed
    // This is handled by the checkout page before redirect
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-4">Commande confirmée !</h1>

          <p className="text-xl text-gray-600 mb-2">Merci pour votre confiance</p>

          <p className="text-gray-500">
            Numéro de commande : <span className="font-mono font-semibold">{orderNumber}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-rose-600" />
                Confirmation par email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Un email de confirmation a été envoyé à votre adresse. Vous y trouverez tous les détails de votre
                commande et le suivi de livraison.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  Si vous ne recevez pas l'email dans les 10 minutes, vérifiez vos spams ou contactez-nous.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-rose-600" />
                Livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Votre commande sera préparée avec soin et expédiée sous 24-48h. Vous recevrez un SMS avec le suivi de
                livraison.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Délai estimé :</span>
                  <span className="font-medium">2-3 jours ouvrés</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transporteur :</span>
                  <span className="font-medium">DHL Express</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-rose-600 font-semibold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Préparation</h3>
                <p className="text-sm text-gray-600">Votre commande est en cours de préparation dans nos ateliers</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-rose-600 font-semibold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Expédition</h3>
                <p className="text-sm text-gray-600">Envoi sécurisé avec numéro de suivi</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-rose-600 font-semibold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Livraison</h3>
                <p className="text-sm text-gray-600">Réception à l'adresse indiquée</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-rose-600 hover:bg-rose-700">
            <Link href="/account">
              Suivre ma commande
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/">Continuer les achats</Link>
          </Button>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
          <p className="text-gray-600 mb-4">Notre équipe est disponible pour répondre à toutes vos questions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="tel:+221331234567">+221 33 123 45 67</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
