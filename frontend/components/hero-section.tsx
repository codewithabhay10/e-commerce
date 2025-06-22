"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Transform Your Space</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover premium quality posters that bring life to your walls. From abstract art to anime and inspirational
          quotes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
          <Link href="/categories">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
