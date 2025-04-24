"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ShoppingCart } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const products = [
  {
    id: 1,
    name: "Delicious Cakes",
    description: "Freshly baked with love",
    image: "/Menu/Delicious Cakes.png",
  },
  {
    id: 2,
    name: "Creamy Yogurt",
    description: "Smooth and refreshing",
    image: "/Menu/Creamy Yogurt.png",
  },
  {
    id: 3,
    name: "Premium Ice Cream",
    description: "Made with the finest ingredients",
    image: "/Menu/Premium Ice Cream.png",
  },
  {
    id: 4,
    name: "Aromatic Coffee",
    description: "The perfect pick-me-up",
    image: "/Menu/Aromatic coffe.png",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleOpenCart = () => {
    const event = new CustomEvent("open-cart")
    window.dispatchEvent(event)
  }

  return (
    <section id="home" className="pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12 lg:pb-16 overflow-hidden dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 order-2 lg:order-1 mt-6 lg:mt-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Sweet Moments, <br />
              Sweeter Treats
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
              Indulge in our handcrafted desserts made with premium ingredients and lots of love. From cakes to ice
              cream, we have something for every sweet tooth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size={isMobile ? "default" : "lg"}
                className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Menu <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="rounded-full border-pink-300 dark:border-pink-700 text-pink-500 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/30"
                onClick={handleOpenCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order Online
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] w-full rounded-3xl overflow-hidden shadow-xl">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    scale: currentSlide === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                  style={{ display: currentSlide === index ? "block" : "none" }}
                >
                  <Image
                    src={
                      product.image && product.image.trim() !== ""
                        ? product.image
                        : "/placeholder.svg?height=600&width=800"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {product.name}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base md:text-lg">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
                    currentSlide === index
                      ? "bg-pink-500 w-4 sm:w-6"
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
