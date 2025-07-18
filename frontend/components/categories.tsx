"use client";

import React from "react";
import { motion } from "framer-motion";
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
      id: "bollywood",
      name: "Bollywood",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873101/custom-hand-painted-bollywood-posters-2_q1voo3.jpg",
      count: 156,
      description: "Iconic stars and memorable movie moments",
    },
    {
      id: "anime",
      name: "Anime",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873099/naruto2_y7tpbs.webp",
      count: 203,
      description: "Your favorite characters and epic scenes",
    },
    {
      id: "basketball",
      name: "Basketball",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873095/basketball-poster-template-design_742173-32030_nujyoi.avif",
      count: 124,
      description: "Legendary players and classic moments",
    },
    {
      id: "cricket",
      name: "Cricket",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873099/productimg-maagsdesigns-wallposters_16_rkaxo8.webp",
      count: 89,
      description: "Cricket heroes and unforgettable matches",
    },
    {
      id: "music",
      name: "Music",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873101/retro-music-poster-template_23-2148344330_dy8arc.avif",
      count: 178,
      description: "Artists, bands, and musical inspiration",
    },
    {
      id: "abstract",
      name: "Abstract",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873095/65242a46b2f62f3d34694411-eye-see-you-conceptual-abstract-picture_tqsm1e.jpg",
      count: 145,
      description: "Bold geometric patterns and flowing forms",
    },
    {
      id: "motivation",
      name: "Motivation",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873093/1-1_klgtlx.webp",
      count: 134,
      description: "Inspiring quotes and uplifting messages",
    },
    {
      id: "television",
      name: "Television",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873095/2_86b35b21-89a3-4721-82d2-ced6f54d7142_xksgjf.webp",
      count: 167,
      description: "Beloved TV shows and iconic characters",
    },
    {
      id: "sports",
      name: "Sports",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752873094/american-football-poster-template-design_742173-31417_hdshy7.avif",
      count: 112,
      description: "Athletic excellence and sporting legends",
    },
    {
      id: "nature",
      name: "Nature",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752874221/botanical-garden-poster-template_23-2150205786_i9ki2k.avif",
      count: 121,
      description: "Breathtaking landscapes and serene scenes",
    },
    {
      id: "vintage",
      name: "Vintage",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752874220/tlp_hero_vintage-posters-e4806ad9b3d6f2f2f0e5d8709ae1d222_z258kf.jpg",
      count: 98,
      description: "Classic retro posters and timeless designs",
    },
    {
      id: "travel",
      name: "Travel",
      image:
        "https://res.cloudinary.com/dexibzteg/image/upload/v1752874222/Screenshot_2025-07-19_025955_nlmrdc.png",
      count: 109,
      description: "World landmarks and wanderlust inspiration",
    },
  ];

  const handleCategoryClick = (category: string) => {
    console.log("Navigate to:", category);
  };

  return (
    <section className="py-10 bg-secondary/30 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center py-12 px-4"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the perfect poster for your style. From bold abstracts to
            serene nature scenes, find artwork that speaks to your aesthetic.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group cursor-pointer hover-lift"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-xl artistic-shadow bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => handleCategoryClick("all")}
            className="inline-flex items-center px-8 py-3 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors hover-lift"
          >
            View All Categories
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
