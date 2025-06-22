"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"

interface CartItem extends Product {
  quantity: number
  size?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id && item.size === (product as any).size)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id && item.size === (product as any).size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((currentItems) => currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => {
    const price = item.sale ? item.salePrice || item.price : item.price
    return sum + price * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
