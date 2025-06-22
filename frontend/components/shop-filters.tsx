"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function ShopFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const categories = [
    { id: "abstract", name: "Abstract", count: 45 },
    { id: "anime", name: "Anime", count: 32 },
    { id: "quotes", name: "Quotes", count: 28 },
    { id: "nature", name: "Nature", count: 38 },
    { id: "vintage", name: "Vintage", count: 22 },
    { id: "minimalist", name: "Minimalist", count: 35 },
  ]

  const sizes = [
    { id: "small", name: "Small (12x16)", count: 89 },
    { id: "medium", name: "Medium (18x24)", count: 156 },
    { id: "large", name: "Large (24x36)", count: 78 },
    { id: "xlarge", name: "X-Large (36x48)", count: 34 },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleSizeChange = (sizeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, sizeId])
    } else {
      setSelectedSizes(selectedSizes.filter((id) => id !== sizeId))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 100])
    setSelectedCategories([])
    setSelectedSizes([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                  >
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-3">Sizes</h3>
            <div className="space-y-2">
              {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={size.id}
                    checked={selectedSizes.includes(size.id)}
                    onCheckedChange={(checked) => handleSizeChange(size.id, checked as boolean)}
                  />
                  <label
                    htmlFor={size.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                  >
                    {size.name} ({size.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
