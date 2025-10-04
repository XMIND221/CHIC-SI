"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingBag, Heart, Menu, X, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import ThemeSelector from "@/components/theme-selector"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems, toggleCart } = useCartStore()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-rose-100/50 shadow-xl shadow-rose-100/20"
          : "bg-gradient-to-b from-white via-rose-50/30 to-white border-b border-rose-100/30"
      }`}
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-rose-500 to-champagne-500 text-white py-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="relative flex items-center justify-center space-x-3">
          <p className="text-sm font-medium tracking-wide">
            ✨ Atelier Sénégalais Premium • Livraison Express Gratuite • Service VIP 24/7 ✨
          </p>
          <Crown className="w-4 h-4 text-yellow-200 animate-bounce" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group cursor-pointer">
              <div className="hidden sm:block">
                <div className="relative w-48 h-14 p-2 rounded-2xl bg-gradient-to-br from-white via-rose-50/50 to-champagne-50/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-200/30 group-hover:scale-105">
                  <Image
                    src="/si-chic-logo-complete.png"
                    alt="Si-Chic - Maison de Couture Sénégalaise"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                </div>
              </div>
              <div className="sm:hidden">
                <div className="relative w-12 h-12 p-2 rounded-xl bg-gradient-to-br from-rose-100 to-champagne-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Image src="/si-chic-logo-icon.png" alt="Si-Chic" fill className="object-contain p-1" priority />
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex">
            <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-rose-100/50">
              {[
                { name: "Collections", href: "#", icon: "✨" },
                { name: "Hijabs", href: "#", icon: "🌸" },
                { name: "Abayas", href: "#", icon: "👗" },
                { name: "À Propos", href: "/about", icon: "💎" },
                { name: "Blog", href: "/blog", icon: "📖" },
                { name: "Contact", href: "/contact", icon: "💌" },
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:bg-rose-50 text-neutral-700 hover:text-rose-600"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/20 to-champagne-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <ThemeSelector />
            </div>

            <div className="hidden sm:flex items-center space-x-1 bg-white/80 backdrop-blur-lg rounded-full px-3 py-2 shadow-lg border border-rose-100/50">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-rose-50 transition-all duration-300 rounded-full"
              >
                <Search className="h-4 w-4 text-neutral-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-rose-50 transition-all duration-300 rounded-full"
              >
                <Heart className="h-4 w-4 text-neutral-600" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-rose-100/50 hover:bg-rose-50 transition-all duration-300 hover:scale-105"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5 text-neutral-600" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold animate-pulse shadow-lg">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-11 w-11 bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-rose-100/50 hover:bg-rose-50 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-rose-100/50 bg-white/95 backdrop-blur-xl rounded-b-3xl shadow-2xl">
            <nav className="flex flex-col space-y-4">
              {[
                { name: "Collections Premium", href: "#", icon: "✨" },
                { name: "Hijabs Couture", href: "#", icon: "🌸" },
                { name: "Abayas Signature", href: "#", icon: "👗" },
                { name: "À Propos", href: "/about", icon: "💎" },
                { name: "Blog", href: "/blog", icon: "📖" },
                { name: "Contact", href: "/contact", icon: "💌" },
                { name: "FAQ", href: "/faq", icon: "❓" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-neutral-700 hover:text-rose-600 hover:bg-rose-50 font-medium transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="flex items-center justify-center space-x-4 pt-6 border-t border-rose-100/50">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-rose-50 hover:bg-rose-100">
                  <Search className="h-5 w-5 text-rose-600" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-rose-50 hover:bg-rose-100">
                  <Heart className="h-5 w-5 text-rose-600" />
                </Button>
                <div className="md:hidden">
                  <ThemeSelector />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
