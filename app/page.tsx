import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroLogo from "@/components/hero-logo"
import BoutiquePreview from "@/components/boutique-preview"
import Categories from "@/components/categories"
import About from "@/components/about"
import Contact from "@/components/contact"
import Trends from "@/components/trends"
import { PromoBanner, NewArrivalsbanner, EleganceBanner, CommunityCTA } from "@/components/section-dividers"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroLogo />
        <PromoBanner />
        <BoutiquePreview />
        <NewArrivalsbanner />
        <Trends />
        <Categories />
        <EleganceBanner />
        <About />
        <CommunityCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
