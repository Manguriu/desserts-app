"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function About() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 bg-blue-50 dark:bg-blue-950/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] w-full rounded-3xl overflow-hidden shadow-xl">
              <Image src="/About/About.png" alt="Our pastry chef" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Sweet Story</h2>
            <div className="space-y-3 md:space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <p>
                Sweet Treats began with a simple passion for creating delicious desserts that bring joy to people's
                lives. Founded in 2015 by pastry chef Emma Johnson, our little shop has grown into a beloved destination
                for dessert lovers.
              </p>
              <p>
                We believe that the best desserts are made with high-quality ingredients, creativity, and a whole lot of
                love. Every cake, yogurt parfait, ice cream scoop, and coffee drink is crafted with attention to detail
                and a commitment to excellence.
              </p>
              <p className="hidden md:block">
                Our team of talented pastry chefs and baristas work tirelessly to create new and exciting flavors while
                perfecting the classics. We source our ingredients locally whenever possible and prioritize sustainable
                practices.
              </p>
              <p className="font-medium text-pink-500 dark:text-pink-400">
                Whether you're celebrating a special occasion or simply treating yourself, we're here to make your day a
                little sweeter!
              </p>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-500 dark:text-pink-400">8+</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Years of Experience</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-500 dark:text-pink-400">50+</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Unique Recipes</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-md">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-500 dark:text-pink-400">10k+</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Happy Customers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
