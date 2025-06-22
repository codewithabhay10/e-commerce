"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

export function FeaturedPosters() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products")
        const data: Product[] = await res.json()
        setFeaturedProducts(data.slice(0, 8)) // Just pick first 8 as "featured"
      } catch (error) {
        console.error("Failed to fetch featured products", error)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Posters</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked collection of our most popular and trending posters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id || (product as any).id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
