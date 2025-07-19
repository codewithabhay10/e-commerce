"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function ShopFilters({
  onApplyFilters,
}: {
  onApplyFilters?: (filters: {
    priceRange: number[];
    categories: string[];
    sizes: string[];
    rating: number;
  }) => void;
}) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const categories = [
    { id: "bollywood", name: "Bollywood", count: 156 },
    { id: "anime", name: "Anime", count: 203 },
    { id: "basketball", name: "Basketball", count: 124 },
    { id: "cricket", name: "Cricket", count: 89 },
    { id: "music", name: "Music", count: 178 },
    { id: "abstract", name: "Abstract", count: 145 },
    { id: "motivation", name: "Motivation", count: 134 },
    { id: "television", name: "Television", count: 167 },
    { id: "sports", name: "Sports", count: 112 },
    { id: "nature", name: "Nature", count: 121 },
    { id: "vintage", name: "Vintage", count: 98 },
    { id: "travel", name: "Travel", count: 109 },
  ];

  const sizes = [
    { id: "small", name: "Small (12x16)", count: 89 },
    { id: "medium", name: "Medium (18x24)", count: 156 },
    { id: "large", name: "Large (24x36)", count: 78 },
    { id: "xlarge", name: "X-Large (36x48)", count: 34 },
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handleSizeChange = (sizeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, sizeId]);
    } else {
      setSelectedSizes(selectedSizes.filter((id) => id !== sizeId));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setSelectedRating(checked ? rating : 0);
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedRating(0);
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        priceRange,
        categories: selectedCategories,
        sizes: selectedSizes,
        rating: selectedRating,
      });
    }
  };

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
            <Slider
              defaultValue={[0, 500]}
              value={priceRange}
              onValueChange={(value: number[]) =>
                setPriceRange(value as [number, number])
              }
              min={0}
              max={500}
              step={5}
              className="mb-2"
            />

            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
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
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none cursor-pointer"
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
                    onCheckedChange={(checked) =>
                      handleSizeChange(size.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={size.id}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {size.name} ({size.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-medium mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating === rating}
                    onCheckedChange={(checked) =>
                      handleRatingChange(rating, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium cursor-pointer flex items-center space-x-1"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">& up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters} className="w-1/2">
              Clear
            </Button>
            <Button onClick={handleApplyFilters} className="w-1/2">
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
