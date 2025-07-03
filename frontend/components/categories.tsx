import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "abstract",
    name: "Abstract",
    description: "Modern abstract designs",
    image: "/placeholder.svg?height=200&width=300",
    count: 45,
  },
  {
    id: "anime",
    name: "Anime",
    description: "Popular anime characters",
    image: "/placeholder.svg?height=200&width=300",
    count: 32,
  },
  {
    id: "quotes",
    name: "Quotes",
    description: "Inspirational quotes",
    image: "/placeholder.svg?height=200&width=300",
    count: 28,
  },
  {
    id: "nature",
    name: "Nature",
    description: "Beautiful landscapes",
    image: "/placeholder.svg?height=200&width=300",
    count: 38,
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of posters organized by themes and styles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count} posters</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
