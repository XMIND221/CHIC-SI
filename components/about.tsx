import { Badge } from "@/components/ui/badge"
import { Award, Heart, Truck, Headphones } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Qualité Premium",
    description: "Matériaux nobles et finitions soignées pour une durabilité exceptionnelle",
    stat: "98% de satisfaction",
  },
  {
    icon: Heart,
    title: "Valeurs Respectées",
    description: "Designs pensés pour allier modernité et respect de vos convictions",
    stat: "Certifié Halal",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Expédition sous 24h et livraison gratuite dès 75€ d'achat",
    stat: "24h en moyenne",
  },
  {
    icon: Headphones,
    title: "Service Client",
    description: "Équipe dédiée pour vous accompagner dans vos choix et commandes",
    stat: "7j/7 disponible",
  },
]

const stats = [
  { number: "12,000+", label: "Clientes satisfaites" },
  { number: "4.9/5", label: "Note moyenne" },
  { number: "150+", label: "Modèles disponibles" },
  { number: "3 ans", label: "D'expérience" },
]

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-rose-100 text-rose-800 border-rose-200 mb-4">
            Pourquoi Si-Chic ?
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">L'Excellence à Votre Service</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Depuis 3 ans, Si-Chic s'engage à offrir aux femmes musulmanes des vêtements qui allient parfaitement style
            moderne, qualité premium et respect des valeurs islamiques.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-6 group-hover:bg-rose-200 transition-colors">
                  <IconComponent className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{value.description}</p>
                <Badge variant="outline" className="border-rose-200 text-rose-700">
                  {value.stat}
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-rose-50 to-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Si-Chic en Chiffres</h3>
            <p className="text-gray-600">La confiance de nos clientes se mesure par ces résultats</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-rose-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
