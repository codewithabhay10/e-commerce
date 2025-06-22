import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET() {
  try {
    return NextResponse.json(mockProducts)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json()

    // In a real app, you would save to database
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      rating: 5,
      reviews: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
