"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Heart, MessageCircle } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function PromoBanner() {
  const { data: settings } = useSWR("/api/settings", fetcher, {
    refreshInterval: 5000,
  })

  const getSettingValue = (key: string, defaultValue: string) => {
    const setting = settings?.find((s: any) => s.key === key)
    return setting?.value || defaultValue
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37]/10 via-[#C9A961]/5 to-[#D4AF37]/10 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <Sparkles className="mb-4 h-12 w-12 text-[#D4AF37]" />
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {getSettingValue("banner1_title", "Découvrez Notre Collection Exclusive")}
          </h2>
          <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
            {getSettingValue("banner1_subtitle", "Des pièces uniques pour sublimer votre style")}
          </p>
          <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#C9A961]">
            <Link href="/boutique">
              Explorer la boutique <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-[#D4AF37]/10 blur-2xl" />
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-[#C9A961]/10 blur-3xl" />
    </div>
  )
}

export function NewArrivalsbanner() {
  const { data: settings } = useSWR("/api/settings", fetcher, {
    refreshInterval: 5000,
  })

  const getSettingValue = (key: string, defaultValue: string) => {
    const setting = settings?.find((s: any) => s.key === key)
    return setting?.value || defaultValue
  }

  return (
    <div className="relative overflow-hidden bg-[#D4AF37]/5 py-20">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/elegant-african-fabric-pattern.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-[#D4AF37]/20 px-6 py-2 text-sm font-semibold text-[#D4AF37]">
            Nouveautés
          </div>
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            {getSettingValue("banner2_title", "Les Tendances de la Saison")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {getSettingValue("banner2_subtitle", "Les dernières tendances mode à découvrir")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="#collections">Voir les collections</Link>
            </Button>
            <Button asChild size="lg" className="bg-[#D4AF37] hover:bg-[#C9A961]">
              <Link href="/boutique">Acheter maintenant</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EleganceBanner() {
  const { data: settings } = useSWR("/api/settings", fetcher, {
    refreshInterval: 5000,
  })

  const getSettingValue = (key: string, defaultValue: string) => {
    const setting = settings?.find((s: any) => s.key === key)
    return setting?.value || defaultValue
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-[#D4AF37]/5 to-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Heart className="mb-4 h-10 w-10 text-[#D4AF37]" />
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {getSettingValue("banner3_title", "L'Élégance à la Sénégalaise")}
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {getSettingValue("banner3_subtitle", "Tradition et modernité en parfaite harmonie")}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="#about">En savoir plus</Link>
            </Button>
          </div>
          <div className="relative h-64 md:h-80">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#C9A961]/20" />
            <div className="absolute inset-4 rounded-xl bg-[#D4AF37]/10 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-20">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#C9A961" strokeWidth="2" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="100" cy="100" r="20" fill="none" stroke="#C9A961" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CommunityCTA() {
  const { data: settings } = useSWR("/api/settings", fetcher, {
    refreshInterval: 5000,
  })

  const getSettingValue = (key: string, defaultValue: string) => {
    const setting = settings?.find((s: any) => s.key === key)
    return setting?.value || defaultValue
  }

  const whatsappNumber = getSettingValue("whatsapp_number", "+221784624991").replace(/\s/g, "")

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37]/10 to-[#C9A961]/10 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <MessageCircle className="mx-auto mb-4 h-12 w-12 text-[#D4AF37]" />
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {getSettingValue("banner4_title", "Rejoignez Notre Communauté")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {getSettingValue("banner4_subtitle", "Suivez-nous pour ne rien manquer")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BA5A]">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Bonjour%2C%20je%20suis%20intéressé(e)%20par%20vos%20produits`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contacter sur WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#C9A961]/10 blur-3xl" />
    </div>
  )
}
