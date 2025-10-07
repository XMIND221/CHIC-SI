"use client"

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Contact() {
  const { data: settings } = useSWR("/api/settings", fetcher, {
    refreshInterval: 5000,
  })

  const getSettingValue = (key: string, defaultValue: string) => {
    const setting = settings?.find((s: any) => s.key === key)
    return setting?.value || defaultValue
  }

  const whatsappNumber = getSettingValue("whatsapp_number", "+221784624991").replace(/\s/g, "")
  const contactEmail = getSettingValue("contact_email", "contact@si-chic.sn")
  const contactPhone = getSettingValue("contact_phone", "+221 78 462 49 91")
  const contactAddress = getSettingValue("contact_address", "DD 33 Derklé, Dakar, Sénégal")

  const whatsappMessage = encodeURIComponent(
    "Bonjour Si-Chic, je souhaite obtenir plus d'informations sur vos produits.",
  )

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Contactez-Nous</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-primary/20">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Adresse</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{contactAddress}</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-primary/20">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
              <Phone className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
            <a href={`tel:${whatsappNumber}`} className="text-muted-foreground text-sm hover:text-primary">
              {contactPhone}
            </a>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-primary/20">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <a href={`mailto:${contactEmail}`} className="text-muted-foreground text-sm hover:text-primary">
              {contactEmail}
            </a>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow border-primary/20">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
            <p className="text-muted-foreground text-sm">Service client 7j/7</p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary via-amber-400 to-rose-400 hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Discuter sur WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
