import { Award, Heart, Truck, Headphones } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Qualité Premium",
    description: "Matériaux nobles et finitions soignées pour une durabilité exceptionnelle",
  },
  {
    icon: Heart,
    title: "Valeurs Respectées",
    description: "Designs pensés pour allier modernité et respect de vos convictions",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Expédition sous 24h et livraison gratuite dès 75€ d'achat",
  },
  {
    icon: Headphones,
    title: "Service Client",
    description: "Équipe dédiée pour vous accompagner dans vos choix et commandes",
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Pourquoi Si-Chic</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Depuis 3 ans, nous nous engageons à offrir des vêtements qui allient style moderne, qualité premium et
            respect des valeurs
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary via-amber-400 to-rose-400 rounded-full mb-6 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
