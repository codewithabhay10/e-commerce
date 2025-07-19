"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Heart, ShoppingCart, ZoomIn, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { toast } from "sonner"
import type { Product } from "@/lib/types"
import { useAuth } from "@/components/auth-provider"


export function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState("medium")
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [loading, setLoading] = useState(true)

  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { user } = useAuth()

  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`)
        if (!res.ok) throw new Error("Failed to fetch product")
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>

  const sizes = [
    { id: "small", name: "Small (12x16)", price: product.price },
    { id: "medium", name: "Medium (18x24)", price: product.price + 10 },
    { id: "large", name: "Large (24x36)", price: product.price + 25 },
    { id: "xlarge", name: "X-Large (36x48)", price: product.price + 45 },
  ]

  const selectedSizeData = sizes.find((s) => s.id === selectedSize)
  const finalPrice = product.sale ? product.salePrice || product.price : selectedSizeData?.price || product.price

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart.")
      return
    }
    addItem(
      {
        ...product,
        price: finalPrice,
        size: selectedSize,
      },
      quantity
    )
    toast.success("Added to cart", {
      description: `${quantity}x ${product.title} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error("You must be logged in to add items to the wishlist.")
      return
    }
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
      toast("Removed from wishlist", {
        description: `${product.title} removed.`,
      })
    } else {
      addToWishlist(product)
      toast("Added to wishlist", {
        description: `${product.title} added.`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className={`w-full rounded-lg transition-transform duration-300 ${
                isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            {product.sale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                SALE
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 5)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews || 0} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              {product.sale ? (
                <>
                  <span className="text-3xl font-bold text-red-600">₹{finalPrice}</span>
                  <span className="text-xl text-gray-500 line-through">₹{selectedSizeData?.price}</span>
                </>
              ) : (
                <span className="text-3xl font-bold">₹{finalPrice}</span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.name} - ₹{size.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <Select value={quantity.toString()} onValueChange={(val) => setQuantity(parseInt(val))}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" onClick={handleWishlistToggle} className="px-4">
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist(product._id) ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          {/* Product Details */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• High-quality print on premium paper</li>
                <li>• Fade-resistant inks</li>
                <li>• Ready to frame</li>
                <li>• Ships within 1-2 business days</li>
                <li>• 30-day return policy</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
