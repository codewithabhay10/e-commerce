"use client";
import React from "react";
import { motion } from "framer-motion";


export function ScrollingGallery() {
  // Images of posters on walls in various settings
  const posterImages = [
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752840859/Screenshot_2025-07-18_173642_dtwxkp.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752840859/Screenshot_2025-07-18_173653_lnotfw.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752840859/Screenshot_2025-07-18_174202_gea3hi.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752841029/Screenshot_2025-07-18_174556_gjdcs6.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/c_crop,w_1142,h_738,x_0,y_0/v1752841029/Screenshot_2025-07-18_174628_vehppc.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752841029/Screenshot_2025-07-18_174640_ro7wil.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752841029/Screenshot_2025-07-18_174618_yjfupx.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752841281/Screenshot_2025-07-18_174840_o9ploj.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752841281/Screenshot_2025-07-18_175018_dzfsc0.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752841570/Screenshot_2025-07-18_175520_uha2jy.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752874677/2e7ff8a174bdac1241f84ff4782e27cb_c2subj.jpg",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752871763/Screenshot_2025-07-19_021515_z1ffpk.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752871762/Screenshot_2025-07-19_021733_g4lfj8.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752871762/Screenshot_2025-07-19_021712_hyhseq.png",
    "https://res.cloudinary.com/dexibzteg/image/upload/v1752871762/Screenshot_2025-07-19_021443_m1rssy.png",
  ];

  // Different sets for each row to avoid repetition
  const topRowImages = posterImages.slice(0, 8);
  const bottomRowImages = posterImages.slice(8, 16);

  // Duplicate arrays for seamless loop
  const topRowDuplicated = [...topRowImages, ...topRowImages];
  const bottomRowDuplicated = [...bottomRowImages, ...bottomRowImages];

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center py-12 px-4"
        >
          <h2 className="mb-4 text-charcoal text-3xl font-bold tracking-tight animate-fade-in-up">
            See Your Space Transformed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-in-up delay-150">
            Discover how our premium posters look in real homes, offices, and
            creative spaces. Get inspired by our customer showcase.
          </p>
        </motion.div>
      </div>

      <div className="space-y-6">
        {/* Top Row - Moving Right to Left */}
        <div className="poster-gallery-row">
          <div className="poster-gallery-track poster-gallery-track-reverse">
            {topRowDuplicated.map((image, index) => (
              <div key={index} className="poster-gallery-item">
                <img
                  src={image}
                  alt={`Poster showcase ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Moving Left to Right */}
        <div className="poster-gallery-row">
          <div className="poster-gallery-track">
            {bottomRowDuplicated.map((image, index) => (
              <div key={index} className="poster-gallery-item">
                <img
                  src={image}
                  alt={`Poster showcase ${index + 9}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button className="bg-terracotta text-white px-8 py-3 rounded-full hover:bg-terracotta/90 transition-colors duration-300 artistic-shadow hover-lift">
          View Full Gallery
        </button>
      </div>
    </section>
  );
}
