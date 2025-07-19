"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopFilters } from "@/components/shop-filters"

export default function ShopPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number], // <-- tuple type
    categories: [] as string[],
    sizes: [] as string[],
    rating: 0,
  })
  const [search, setSearch] = useState("")

  return (
    <div className="min-h-screen flex flex-col">
      <Header search={search} setSearch={setSearch} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <ShopFilters
              onApplyFilters={(newFilters) =>
                setFilters((prev) => ({
                  ...prev,
                  ...newFilters,
                  priceRange: newFilters.priceRange as [number, number], // Ensure tuple type
                }))
              }
            />
          </aside>
          <div className="flex-1">
            <ProductGrid filters={filters} search={search} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
