"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"; // Make sure this path is correct

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&auto=format",
      title: "Curate Your Walls with",
      subtitle: "Pixel-Perfect Art",
      accent: "Transform your space into a personal gallery",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1920&h=1080&fit=crop&auto=format",
      title: "Discover Art That",
      subtitle: "Speaks to You",
      accent: "Handpicked designs for every aesthetic",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=1920&h=1080&fit=crop&auto=format",
      title: "Express Yourself with",
      subtitle: "Premium Prints",
      accent: "Museum-quality posters at accessible prices",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1920&h=1080&fit=crop&auto=format",
      title: "Create Spaces That",
      subtitle: "Inspire You",
      accent: "From minimalist to maximalist, we have it all",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const onShopPosters = () => {
    // Add routing or logic here
    console.log("Shop Posters Clicked");
  };

  const onExploreCollections = () => {
    // Add routing or logic here
    console.log("Explore Collections Clicked");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <ImageWithFallback
              src={slide.image}
              alt={`Gallery slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e77c6c66] to-transparent" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="w-12 h-12 bg-black/20 hover:bg-black/40 text-white border border-white/20 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="w-12 h-12 bg-black/20 hover:bg-black/40 text-white border border-white/20 rounded-full backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-terracotta animate-pulse" />
              <span className="text-sm font-medium">
                Premium Art Collection
              </span>
              <Sparkles className="w-5 h-5 text-terracotta animate-pulse" />
            </div>
          </div>

          <div
            key={currentSlide}
            className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <h1 className="mb-4 leading-tight text-4xl md:text-6xl font-bold">
              <span className="block text-white/90 mb-2">
                {slides[currentSlide].title}
              </span>
              <span className="block bg-gradient-to-r from-terracotta via-mustard to-pastel-pink bg-clip-text text-transparent animate-pulse">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-white/90 leading-relaxed">
              {slides[currentSlide].accent}
            </p>
          </div>

          <div className="mb-10">
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-6">
              Discover thousands of carefully curated posters from talented
              artists worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse"></div>
                <span>Premium Quality Prints</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-mustard rounded-full animate-pulse"></div>
                <span>Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pastel-pink rounded-full animate-pulse"></div>
                <span>500+ Unique Designs</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button
              size="lg"
              onClick={onShopPosters}
              className="group bg-gradient-to-r from-terracotta to-mustard text-white px-10 py-6 text-lg font-semibold rounded-full border-2 border-white/10"
            >
              <span className="mr-3">Shop Posters</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onExploreCollections}
              className="group border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold rounded-full backdrop-blur-sm bg-black/30"
            >
              <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Explore Collections</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-b from-terracotta to-mustard bg-clip-text mb-2">
                10K+
              </div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-b from-mustard to-pastel-pink bg-clip-text mb-2">
                500+
              </div>
              <div className="text-sm text-white/80">Unique Designs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-b from-pastel-pink to-terracotta bg-clip-text mb-2">
                50+
              </div>
              <div className="text-sm text-white/80">Artists</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-terracotta shadow-lg shadow-terracotta/50"
                : "bg-white/30 hover:bg-white/50"
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-terracotta rounded-full animate-ping opacity-75" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
