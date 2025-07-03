"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    // add background image
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24 relative overflow-hidden " style={{height: '525px' , paddingTop: '130px', backgroundImage: 'url(/assets/image.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Decorative Blurred Circles */}
      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-3xl" />

     
    </section>
  )
}
