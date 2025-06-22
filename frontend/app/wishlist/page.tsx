import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WishlistPage } from "@/components/wishlist-page"

export default function Wishlist() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  )
}
