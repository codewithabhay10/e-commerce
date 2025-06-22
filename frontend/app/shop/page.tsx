import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopFilters } from "@/components/shop-filters"

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <ShopFilters />
          </aside>
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
