export interface Product {
  id: string
  title: string
  description: string
  price: number
  salePrice?: number
  sale?: boolean
  category: string
  image: string
  rating: number
  reviews: number
  createdAt: string
  size?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}
