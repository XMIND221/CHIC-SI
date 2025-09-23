import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroLogo from "@/components/hero-logo"
import Categories from "@/components/categories"
import Products from "@/components/products"
import About from "@/components/about"
import LogoMosaic from "@/components/logo-mosaic"
import BackgroundCarousel from "@/components/background-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white relative">
      <BackgroundCarousel />
      <Header />
      <main>
        <HeroLogo />
        <Categories />
        <Products />
        <LogoMosaic />
        <About />
      </main>
      <Footer />
    </div>
  )
}
