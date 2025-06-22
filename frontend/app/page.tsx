import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPosters } from "@/components/featured-posters"
import { Categories } from "@/components/categories"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Categories />
        <FeaturedPosters />
      </main>
      <Footer />
    </div>
  )
}
