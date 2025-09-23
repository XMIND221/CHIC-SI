import { Crown, Heart, Shield, Sparkles, Users, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-champagne-50/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Maison de Couture Sénégalaise
          </Badge>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-800 mb-6 text-balance">
            L'Histoire de{" "}
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-champagne-600 bg-clip-text text-transparent">
              Si-Chic
            </span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            Née de la passion d'une femme sénégalaise pour l'élégance modeste, Si-Chic révolutionne la mode
            professionnelle pour les femmes portant le hijab.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="glass-effect p-8 rounded-3xl border border-rose-100/50">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-rose-500 mr-3" />
                  <h2 className="text-2xl font-serif font-bold text-neutral-800">Notre Mission</h2>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Offrir aux femmes musulmanes des vêtements professionnels qui allient élégance, confort et respect des
                  valeurs islamiques. Chaque pièce Si-Chic est conçue pour sublimer la femme moderne dans son
                  environnement professionnel.
                </p>
              </div>

              <div className="glass-effect p-8 rounded-3xl border border-champagne-100/50">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-champagne-600 mr-3" />
                  <h2 className="text-2xl font-serif font-bold text-neutral-800">Notre Vision</h2>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Devenir la référence mondiale de la mode modeste professionnelle, en créant un pont entre tradition et
                  modernité, entre élégance et pudeur, pour une femme épanouie et confiante.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden glass-effect border border-rose-100/50">
                <Image
                  src="/placeholder-2q2qc.png"
                  alt="Fondatrice Si-Chic"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-effect p-4 rounded-2xl border border-champagne-100/50">
                <p className="text-sm font-medium text-neutral-700">Fondée à Dakar</p>
                <p className="text-xs text-neutral-500">Sénégal, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50/50 to-champagne-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Chaque création Si-Chic est guidée par des valeurs profondes qui reflètent notre engagement envers nos
              clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Respect & Pudeur",
                description:
                  "Nos créations honorent les principes de modestie tout en affirmant la féminité et l'élégance.",
                color: "rose",
              },
              {
                icon: Award,
                title: "Qualité Premium",
                description:
                  "Matériaux nobles, finitions impeccables et savoir-faire artisanal pour des pièces durables.",
                color: "champagne",
              },
              {
                icon: Users,
                title: "Communauté",
                description:
                  "Créer un lien fort avec nos clientes et célébrer la diversité de la femme musulmane moderne.",
                color: "rose",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-3xl border border-neutral-100/50 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${
                    value.color === "rose" ? "from-rose-100 to-rose-200" : "from-champagne-100 to-champagne-200"
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon
                    className={`w-8 h-8 ${value.color === "rose" ? "text-rose-600" : "text-champagne-600"}`}
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-800 mb-4">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire de la Fondatrice */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect p-12 rounded-3xl border border-rose-100/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-neutral-800 mb-4">L'Histoire de Notre Fondatrice</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-champagne-400 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg max-w-none text-neutral-600">
              <p className="text-center leading-relaxed mb-6">
                "En tant que femme sénégalaise évoluant dans le monde professionnel, j'ai souvent ressenti le défi de
                concilier mes valeurs religieuses avec les exigences vestimentaires du milieu corporate. C'est de cette
                expérience personnelle qu'est née Si-Chic."
              </p>

              <p className="text-center leading-relaxed mb-6">
                "Notre mission va au-delà de la simple création de vêtements. Nous voulons permettre à chaque femme
                musulmane de s'épanouir professionnellement sans compromis sur ses convictions, en lui offrant des
                tenues qui reflètent sa personnalité et ses valeurs."
              </p>

              <p className="text-center leading-relaxed font-medium">
                "Si-Chic, c'est l'alliance parfaite entre tradition sénégalaise, élégance parisienne et modernité
                internationale."
              </p>
            </div>

            <div className="text-center mt-8">
              <p className="font-serif text-lg text-neutral-700">— Fondatrice, Si-Chic</p>
              <p className="text-sm text-neutral-500">Dakar, Sénégal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neutral-50 to-rose-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-neutral-800 mb-8">Notre Engagement Envers Vous</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-2xl border border-neutral-100/50">
              <h3 className="font-semibold text-neutral-800 mb-3">Fabrication Éthique</h3>
              <p className="text-neutral-600 text-sm">
                Partenariat avec des ateliers locaux sénégalais pour soutenir l'économie locale et garantir des
                conditions de travail équitables.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-2xl border border-neutral-100/50">
              <h3 className="font-semibold text-neutral-800 mb-3">Service Personnalisé</h3>
              <p className="text-neutral-600 text-sm">
                Conseil en style, retouches sur mesure et service client dédié pour une expérience unique et
                personnalisée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
