import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPosters } from "@/components/featured-posters"
import { Categories } from "@/components/categories"
import WhyPixelPatrikaSection from "@/components/why-pixel-patrika"
import { ScrollingGallery } from "@/components/ScrollingGallery"
import { MarqueeText } from "@/components/MarqueeText"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MarqueeText />
        <HeroSection />
        <ScrollingGallery />
        <Categories />
        <WhyPixelPatrikaSection />
        <FeaturedPosters />
      </main>
      <Footer />
    </div>
  )
}
