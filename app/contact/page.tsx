"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones, Shield } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orderNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        orderNumber: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-champagne-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative w-32 h-20 mx-auto mb-6">
              <Image src="/si-chic-logo-complete.png" alt="Si-Chic" fill className="object-contain" priority />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6">Contactez-nous</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe dédiée est à votre écoute pour vous accompagner dans votre expérience Si-Chic. Nous sommes là
              pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-serif">
                  <MessageCircle className="w-6 h-6 mr-3 text-rose-600" />
                  Informations de Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-rose-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      Avenue Léopold Sédar Senghor
                      <br />
                      Plateau, Dakar
                      <br />
                      Sénégal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-rose-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+221 33 123 45 67</p>
                    <p className="text-gray-600">+221 77 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-rose-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@si-chic.sn</p>
                    <p className="text-gray-600">commandes@si-chic.sn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-rose-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Horaires</h3>
                    <p className="text-gray-600">Lun - Ven: 9h00 - 18h00</p>
                    <p className="text-gray-600">Sam: 9h00 - 16h00</p>
                    <p className="text-gray-600">Dim: Fermé</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Headphones className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-800">Service Client Premium</h4>
                  <p className="text-sm text-green-700">Réponse sous 2h en moyenne</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-800">Conseils Personnalisés</h4>
                  <p className="text-sm text-blue-700">Expertise mode et style</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-center">Envoyez-nous un message</CardTitle>
                <p className="text-center text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Message envoyé !</h3>
                    <p className="text-gray-600">Merci pour votre message. Notre équipe vous répondra sous 24h.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-rose-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-rose-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-rose-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-rose-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-rose-300"
                          placeholder="Ex: Question sur une commande"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="orderNumber">Numéro de commande (optionnel)</Label>
                        <Input
                          id="orderNumber"
                          name="orderNumber"
                          type="text"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          className="border-gray-200 focus:border-rose-300"
                          placeholder="Ex: SC-2024-001"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-rose-300 resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Vos données sont protégées et ne seront jamais partagées</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-900 mb-4">Questions Fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-rose-500">
              <CardHeader>
                <CardTitle className="text-lg">Délais de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Livraison standard : 2-3 jours ouvrés à Dakar, 3-5 jours en région. Livraison express disponible sous
                  24h.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-500">
              <CardHeader>
                <CardTitle className="text-lg">Retours et échanges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Retours gratuits sous 30 jours. Les articles doivent être dans leur état d'origine avec les
                  étiquettes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-500">
              <CardHeader>
                <CardTitle className="text-lg">Paiement sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous acceptons les cartes bancaires, Orange Money, Wave et les virements bancaires. Tous les paiements
                  sont sécurisés.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-500">
              <CardHeader>
                <CardTitle className="text-lg">Service sur-mesure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Prenez rendez-vous pour une consultation personnalisée. Délai de création : 2-3 semaines selon la
                  complexité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
