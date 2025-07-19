"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"

export function Header({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()
  // const [search, setSearch] = useState(searchParams.get("q") || "")

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // No navigation, just update state
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Pixel Patrika
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <form onSubmit={handleSearch} className="flex-1 justify-center mx-4 max-w-lg hidden md:flex">
          <Input
            type="search"
            placeholder="Search posters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/shop" className="text-gray-700 hover:text-primary">
            Shop
          </Link>
          <Link href="/wishlist" className="relative">
            <Heart className="h-6 w-6 text-gray-700 hover:text-primary" />
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/orders" className="text-gray-700 hover:text-primary">
                Orders
              </Link>
              {user.role === "admin" && (
                <Link href="/admin" className="text-gray-700 hover:text-primary">
                  Admin
                </Link>
              )}
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden py-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search posters..."
            className="pl-10 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link href="/shop" className="text-gray-700 hover:text-primary">
              Shop
            </Link>
            <Link href="/wishlist" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart ({cartItemsCount})</span>
            </Link>
            {user ? (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-primary">
                  Orders
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-gray-700 hover:text-primary">
                    Admin
                  </Link>
                )}
                <Button variant="outline" onClick={logout} className="w-fit">
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
