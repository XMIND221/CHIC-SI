import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroLogo from "@/components/hero-logo"
import Boutique from "@/components/boutique"
import Categories from "@/components/categories"
import About from "@/components/about"
import Contact from "@/components/contact"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroLogo />
        <Boutique />
        <Categories />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
