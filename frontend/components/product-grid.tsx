"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Product } from "@/lib/types"

const productsPerPage = 12

interface Filters {
  priceRange: [number, number]
  categories: string[]
  sizes: string[]
  rating: number
}

interface ProductGridProps {
  filters: Filters
  search: string
}

export function ProductGrid({ filters, search }: ProductGridProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Get search query from URL
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() || ""

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products")
        const data = await res.json()
        setAllProducts(data)
        setLoading(false)
      } catch (err) {
        console.error("Failed to load products:", err)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const applyFilters = (products: Product[]) => {
      return products.filter((product) => {
        const price = product.sale ? product.salePrice ?? product.price : product.price

        if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false
        if (filters.rating > 0 && product.rating < filters.rating) return false

        // Use search prop
        if (search && !product.title.toLowerCase().includes(search.trim().toLowerCase())) {
          return false
        }

        return true
      })
    }

    const sorted = sortProducts(applyFilters(allProducts), sortBy)
    setFilteredProducts(sorted)
    setCurrentPage(1)
  }, [allProducts, filters, sortBy, search])

  const sortProducts = (products: Product[], sortBy: string) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
      case "price-high":
        return [...products].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
      case "name":
        return [...products].sort((a, b) => a.title.localeCompare(b.title))
      case "newest":
        return [...products].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      default:
        return products
    }
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">All Posters</h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : currentProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.071-2.33"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search to see more results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
