import React from 'react';
import { Truck, Gift, Star, Zap } from 'lucide-react';

export function MarqueeText() {
  const promotionalMessages = [
    { text: "FREE DELIVERY FOR PREPAID ORDERS", icon: Truck },
    { text: "BUY 4 GET 3 FREE", icon: Gift },
    { text: "PREMIUM QUALITY GUARANTEED", icon: Star },
    { text: "48 HOUR EXPRESS SHIPPING", icon: Zap },
    { text: "ECO-FRIENDLY MATERIALS", icon: Star },
    { text: "BUY 10 GET 15% OFF", icon: Gift },
    { text: "WORLDWIDE SHIPPING AVAILABLE", icon: Truck },
    { text: "500+ UNIQUE DESIGNS", icon: Star }
  ];

  // Duplicate messages for seamless loop
  const duplicatedMessages = [...promotionalMessages, ...promotionalMessages];

  return (
    <div className="bg-charcoal text-white py-2 overflow-hidden relative">
      {/* Moving text container */}
      <div className="marquee-container">
        <div className="marquee-content">
          {duplicatedMessages.map((message, index) => {
            const IconComponent = message.icon;
            return (
              <div key={index} className="marquee-item">
                <IconComponent className="w-4 h-4 text-terracotta" />
                <span className="font-medium tracking-wide">{message.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Gradient fade effects on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-charcoal to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-charcoal to-transparent z-10"></div>
    </div>
  );
}