"use client";
import { CheckCircle, DollarSign, Leaf, Zap } from "lucide-react";
import Link from "next/link";


const features = [
  {
    title: "High-Quality Prints",
    description: "Premium paper and archival inks ensure your posters look stunning and last for years.",
    icon: <CheckCircle className="text-rose-500" size={32} />,
    bgColor: "bg-rose-100",
  },
  {
    title: "Affordable Pricing",
    description: "Beautiful art shouldn’t break the bank. Quality prints at prices that make sense.",
    icon: <DollarSign className="text-yellow-500" size={32} />,
    bgColor: "bg-yellow-100",
  },
  {
    title: "Eco-Friendly Materials",
    description: "Sustainably sourced paper and eco-conscious printing processes for a greener future.",
    icon: <Leaf className="text-green-500" size={32} />,
    bgColor: "bg-green-100",
  },
  {
    title: "Fast Shipping",
    description: "Get your posters quickly with our expedited printing and shipping process.",
    icon: <Zap className="text-pink-500" size={32} />,
    bgColor: "bg-pink-100",
  },
];

export default function WhyPixelPatrikaSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#f9f8ff] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Pixel Patrika?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We're committed to bringing you the best poster experience — from selection to delivery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${item.bgColor}`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white border border-gray-200 rounded-xl py-8 px-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800">Experience the Pixel Patrika Promise 🚀</h3>
          <p className="text-gray-500 mt-2 mb-4">Join 50,000+ happy customers and elevate your space with beautiful posters.</p>
          <Link href="/shop" className="inline-flex items-center space-x-2">
            <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition">
              Explore Posters
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
