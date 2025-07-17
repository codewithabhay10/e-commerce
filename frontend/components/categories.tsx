"use client";

import React from "react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
}

export function Categories() {
  const categories: Category[] = [
    {
      id: "abstract",
      name: "Abstract",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
      count: 124,
      description: "Bold geometric patterns and flowing forms",
    },
    {
      id: "quotes",
      name: "Quotes",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      count: 89,
      description: "Inspiring words in beautiful typography",
    },
    {
      id: "anime",
      name: "Anime",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      count: 156,
      description: "Your favorite characters and scenes",
    },
    {
      id: "nature",
      name: "Nature",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
      count: 203,
      description: "Breathtaking landscapes and flora",
    },
    {
      id: "vintage",
      name: "Vintage",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      count: 78,
      description: "Classic designs with timeless appeal",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
      count: 167,
      description: "Clean lines and subtle elegance",
    },
  ];

  const handleCategoryClick = (category: string) => {
    // 👉 Replace with your router logic (e.g. router.push(`/shop?category=${category}`))
    console.log("Navigate to:", category);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-charcoal">Explore by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect poster for your style. From bold abstracts to serene nature scenes,
            find artwork that speaks to your aesthetic.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group cursor-pointer hover-lift"
            >
              <div className="relative overflow-hidden rounded-2xl artistic-shadow bg-white">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                      {category.count} designs
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => handleCategoryClick("all")}
            className="inline-flex items-center px-8 py-3 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors hover-lift"
          >
            View All Categories
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
