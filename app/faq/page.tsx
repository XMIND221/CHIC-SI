"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const faqData = [
  {
    category: "Commandes & Livraison",
    questions: [
      {
        question: "Quels sont les délais de livraison ?",
        answer:
          "Nous livrons en 24-48h à Dakar, 3-5 jours dans les autres régions du Sénégal, et 7-14 jours à l'international. La livraison est gratuite dès 75 000 FCFA d'achat.",
      },
      {
        question: "Puis-je modifier ou annuler ma commande ?",
        answer:
          "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant la confirmation. Après ce délai, contactez notre service client au +221 77 XXX XXXX.",
      },
      {
        question: "Comment suivre ma commande ?",
        answer:
          "Un email de confirmation avec un numéro de suivi vous sera envoyé. Vous pouvez également suivre votre commande depuis votre compte client sur notre site.",
      },
    ],
  },
  {
    category: "Produits & Tailles",
    questions: [
      {
        question: "Comment choisir ma taille ?",
        answer:
          "Consultez notre guide des tailles disponible sur chaque fiche produit. En cas de doute, notre équipe est disponible pour vous conseiller. Nous proposons également un service de retouches.",
      },
      {
        question: "Quels sont les matériaux utilisés ?",
        answer:
          "Nous utilisons exclusivement des tissus premium : soie naturelle, coton peigné, lin européen, et des mélanges techniques pour le confort et la durabilité. Tous nos tissus sont certifiés Oeko-Tex.",
      },
      {
        question: "Les couleurs correspondent-elles aux photos ?",
        answer:
          "Nos photos sont prises en lumière naturelle pour une fidélité maximale. Cependant, l'affichage peut varier selon votre écran. En cas de non-satisfaction, nos retours sont gratuits sous 30 jours.",
      },
    ],
  },
  {
    category: "Paiement & Sécurité",
    questions: [
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer:
          "Nous acceptons Orange Money, Wave, Free Money, les cartes Visa/Mastercard, et les virements bancaires. Tous les paiements sont sécurisés par cryptage SSL.",
      },
      {
        question: "Mes données sont-elles sécurisées ?",
        answer:
          "Absolument. Nous utilisons un cryptage SSL 256 bits et ne stockons aucune donnée bancaire. Vos informations personnelles sont protégées selon le RGPD.",
      },
      {
        question: "Puis-je payer en plusieurs fois ?",
        answer:
          "Oui, nous proposons un paiement en 2 ou 3 fois sans frais pour les commandes supérieures à 100 000 FCFA via Orange Money et Wave.",
      },
    ],
  },
  {
    category: "Retours & Échanges",
    questions: [
      {
        question: "Quelle est votre politique de retour ?",
        answer:
          "Retours gratuits sous 30 jours dans l'état d'origine avec étiquettes. Les articles sur-mesure ne sont pas échangeables sauf défaut de fabrication.",
      },
      {
        question: "Comment procéder à un échange ?",
        answer:
          "Connectez-vous à votre compte, sélectionnez 'Retourner un article', imprimez l'étiquette de retour gratuite et déposez le colis dans un point relais partenaire.",
      },
      {
        question: "Quand serai-je remboursée ?",
        answer:
          "Le remboursement est effectué sous 5-7 jours ouvrés après réception et contrôle de l'article retourné, sur le même moyen de paiement utilisé.",
      },
    ],
  },
  {
    category: "Mode Modeste & Conseils",
    questions: [
      {
        question: "Vos vêtements respectent-ils les principes de pudeur ?",
        answer:
          "Tous nos vêtements sont conçus selon les principes de la mode modeste : coupes amples, manches longues, longueurs appropriées, et tissus non transparents.",
      },
      {
        question: "Proposez-vous des conseils en style ?",
        answer:
          "Oui ! Notre équipe de stylistes spécialisées en mode modeste vous accompagne gratuitement. Prenez rendez-vous via WhatsApp ou email pour un conseil personnalisé.",
      },
      {
        question: "Avez-vous des tenues pour occasions spéciales ?",
        answer:
          "Nous proposons une collection événementielle (mariages, cérémonies) et un service sur-mesure pour créer la tenue parfaite selon vos besoins et l'occasion.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-champagne-50/30">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            Centre d'Aide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-800 mb-6 text-balance">
            Questions{" "}
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-champagne-600 bg-clip-text text-transparent">
              Fréquentes
            </span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Trouvez rapidement les réponses à vos questions sur Si-Chic, nos produits et nos services.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-2xl border-neutral-200 focus:border-rose-300 focus:ring-rose-200"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">Aucune question trouvée pour "{searchTerm}"</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchTerm("")}>
                Voir toutes les questions
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="glass-effect rounded-3xl border border-neutral-100/50 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-rose-50 to-champagne-50 px-8 py-6 border-b border-neutral-100/50">
                    <h2 className="text-2xl font-serif font-bold text-neutral-800">{category.category}</h2>
                  </div>

                  <div className="divide-y divide-neutral-100/50">
                    {category.questions.map((faq, index) => {
                      const itemId = `${categoryIndex}-${index}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <div key={index} className="px-8 py-6">
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full flex items-center justify-between text-left group"
                          >
                            <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-rose-600 transition-colors pr-4">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-rose-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-neutral-400 group-hover:text-rose-500 transition-colors flex-shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="mt-4 pr-8">
                              <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-50/50 to-champagne-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-neutral-800 mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Notre équipe de service client est là pour vous aider. Contactez-nous par le moyen qui vous convient le
            mieux.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Button
              variant="outline"
              className="h-auto p-6 flex-col space-y-3 hover:bg-rose-50 border-rose-200 bg-transparent"
            >
              <Phone className="w-6 h-6 text-rose-500" />
              <div>
                <p className="font-semibold text-neutral-800">Téléphone</p>
                <p className="text-sm text-neutral-600">+221 77 XXX XXXX</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 flex-col space-y-3 hover:bg-rose-50 border-rose-200 bg-transparent"
            >
              <Mail className="w-6 h-6 text-rose-500" />
              <div>
                <p className="font-semibold text-neutral-800">Email</p>
                <p className="text-sm text-neutral-600">contact@si-chic.sn</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 flex-col space-y-3 hover:bg-rose-50 border-rose-200 bg-transparent"
            >
              <MessageCircle className="w-6 h-6 text-rose-500" />
              <div>
                <p className="font-semibold text-neutral-800">WhatsApp</p>
                <p className="text-sm text-neutral-600">Chat en direct</p>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
