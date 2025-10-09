"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import useSWR from "swr"

interface Trend {
  id: string
  title: string
  description: string | null
  image_url: string
  link_url: string | null
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Trends() {
  const { data: trends, error } = useSWR<Trend[]>("/api/trends", fetcher, {
    refreshInterval: 5000,
  })

  if (error) {
    return (
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Erreur lors du chargement des tendances</p>
        </div>
      </section>
    )
  }

  if (!trends || !Array.isArray(trends) || trends.length === 0) {
    return null
  }

  return (
    <section id="trends" className="py-16 px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Tendances du Moment</h2>
          <p className="text-muted-foreground text-lg">Découvrez les dernières tendances de la mode africaine</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trends.map((trend) => (
            <Card key={trend.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={trend.image_url || "/placeholder.svg"}
                  alt={trend.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">{trend.title}</h3>
                  {trend.description && <p className="text-sm opacity-90">{trend.description}</p>}
                </div>
              </div>
              {trend.link_url && (
                <div className="p-4">
                  <Link href={trend.link_url}>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Découvrir
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
