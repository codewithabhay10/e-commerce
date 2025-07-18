import React from 'react';

export function ScrollingGallery() {
  // Images of posters on walls in various settings
  const posterImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', // Living room with art
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop', // Office with posters
    'https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=300&h=200&fit=crop', // Gallery wall
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop', // Modern room with art
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop', // Stylish office
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=300&h=200&fit=crop', // Bedroom with wall art
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', // Another living space
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop', // Kitchen with art
    'https://images.unsplash.com/photo-1560449752-ac4d8e4d6d4d?w=300&h=200&fit=crop', // Modern gallery
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop', // Cozy room
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', // Living room
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop', // Office space
    'https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=300&h=200&fit=crop', // Art gallery
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop', // Designer room
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop', // Corporate office
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=300&h=200&fit=crop', // Bedroom decor
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
        <div className="text-center">
          <h2 className="mb-4 text-charcoal">See Your Space Transformed</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how our premium posters look in real homes, offices, and creative spaces. 
            Get inspired by our customer showcase.
          </p>
        </div>
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
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="poster-gallery-overlay">
                  <div className="poster-gallery-badge">
                    <span className="text-xs font-medium">Shop This Look</span>
                  </div>
                </div>
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
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="poster-gallery-overlay">
                  <div className="poster-gallery-badge">
                    <span className="text-xs font-medium">Shop This Look</span>
                  </div>
                </div>
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