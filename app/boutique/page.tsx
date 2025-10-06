import Header from "@/components/header"
import Footer from "@/components/footer"
import Boutique from "@/components/boutique"

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Boutique />
      </main>
      <Footer />
    </div>
  )
}
