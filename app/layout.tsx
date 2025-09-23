import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import CartSidebar from "@/components/cart-sidebar"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Si-Chic - Maison de Couture Premium pour Hijab",
  description:
    "Découvrez l'excellence de la haute couture française adaptée aux femmes musulmanes modernes. Collections exclusives, sur-mesure d'exception.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        {children}
        <CartSidebar />
      </body>
    </html>
  )
}
