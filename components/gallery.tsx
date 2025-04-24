"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote, Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import GalleryModal, { type GalleryItem } from "@/components/gallery-modal"

// Gallery item types
type GalleryCategory = "pastries" | "cakes" | "customers" | "shop"

// Testimonial type
type Testimonial = {
  id: number
  name: string
  comment: string
  rating: number
  image: string
  date: string
}

// Sample gallery data
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Honey Glazed Donuts",
    description: "Our signature honey-glazed donuts, made fresh daily",
    image: "/Gallery/Honey Glazed Donuts.png",
    category: "pastries",
    featured: true,
  },
  {
    id: 2,
    title: "Chocolate Honeycomb Cake",
    description: "Rich chocolate cake with honeycomb pieces",
    image: "/Gallery/Chocolate Honeycomb Cake.png",
    category: "cakes",
    featured: true,
  },
  {
    id: 3,
    title: "Bee Pollen Cookies",
    description: "Healthy and delicious cookies with bee pollen",
    image: "/Gallery/Bee Pollen Cookies.png",
    category: "pastries",
  },
  {
    id: 4,
    title: "The Hive Storefront",
    description: "Our welcoming shop entrance",
    image: "/Gallery/The Hive Storefront.png",
    category: "shop",
    featured: true,
  },
  {
    id: 5,
    title: "Honey Macaron Tower",
    description: "Perfect for special occasions",
    image: "/Gallery/Honey Macaron Tower.png",
    category: "cakes",
  },
  {
    id: 6,
    title: "Happy Customers",
    description: "Family enjoying our pastries",
    image: "/Gallery/Happy Customers.png",
    category: "customers",
  },
  {
    id: 7,
    title: "Honeycomb Bread",
    description: "Artisanal bread with honey and seeds",
    image: "/Gallery/Honeycomb Bread.png",
    category: "pastries",
  },
  {
    id: 8,
    title: "Baking Workshop",
    description: "Learn to bake with our expert pastry chefs",
    image: "/Gallery/Baking Workshop.png",
    category: "shop",
  },
  {
    id: 9,
    title: "Queen Bee Cake",
    description: "Our award-winning celebration cake",
    image: "/Gallery/Queen Bee Cake.png",
    category: "cakes",
    featured: true,
  },
  {
    id: 10,
    title: "Customer Celebration",
    description: "Birthday celebration at The Hive",
    image: "/Gallery/Customer Celebration.png",
    category: "customers",
    featured: true,
  },
  {
    id: 11,
    title: "Honey Tart Collection",
    description: "Assorted mini tarts with honey filling",
    image: "/Gallery/Honey Tart Collection.png",
    category: "pastries",
  },
  {
    id: 12,
    title: "Behind the Counter",
    description: "Our dedicated team at work",
    image: "/Gallery/Behind the Counter.png",
    category: "shop",
  },
]

// Sample testimonials
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    comment:
      "The honey glazed donuts are absolutely divine! I've never tasted anything like them before. The Hive Pastries has become my weekend treat spot.",
    rating: 5,
    image: "/Gallery/person1.png",
    date: "March 15, 2023",
  },
  {
    id: 2,
    name: "Michael Kimani",
    comment:
      "I ordered a Queen Bee Cake for my daughter's birthday and it was a huge hit! Not only was it beautiful, but it tasted amazing too. Will definitely order again.",
    rating: 5,
    image: "/Gallery/person1.png",
    date: "February 3, 2023",
  },
  {
    id: 3,
    name: "Aisha Omondi",
    comment:
      "The atmosphere at The Hive is so welcoming, and their pastries are consistently excellent. The bee pollen cookies are my favorite - delicious and nutritious!",
    rating: 4,
    image: "/Gallery/person1.png",
    date: "April 22, 2023",
  },
  {
    id: 4,
    name: "David Mwangi",
    comment:
      "As someone with a sweet tooth, I've tried many bakeries in town, but The Hive Pastries stands out for their quality and creativity. Their honeycomb bread is exceptional.",
    rating: 5,
    image: "/Gallery/person1.png",
    date: "January 17, 2023",
  },
]
// Filter categories
const categories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pastries", label: "Pastries" },
  { id: "cakes", label: "Cakes" },
  { id: "customers", label: "Customers" },
  { id: "shop", label: "Our Shop" },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const filteredItems =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
    setModalOpen(true)
  }

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
      ))
  }

  return (
    <section
      id="gallery"
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Our Sweet Gallery</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Explore our delicious creations and happy customer moments at The Hive Pastries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-6 md:mt-8"
          >
            {/* Category scroll buttons for mobile/tablet */}
            {!isMobile && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-md rounded-full hidden sm:flex"
                  onClick={() => scrollCategories("left")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-md rounded-full hidden sm:flex"
                  onClick={() => scrollCategories("right")}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Scrollable categories */}
            <div
              ref={categoriesRef}
              className="flex items-center gap-2 overflow-x-auto py-2 px-4 sm:px-8 md:px-12 scrollbar-hide snap-x"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 sm:px-6 whitespace-nowrap snap-start ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
                      : "border-yellow-200 dark:border-yellow-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-950/30"
                  }`}
                  size={isMobile ? "sm" : "default"}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Gallery Items */}
        <div className="relative mb-12">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="h-6 w-1 bg-yellow-400 rounded-full mr-2"></span>
            Featured Highlights
          </h3>

          {!isMobile && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-md rounded-full hidden sm:flex border-yellow-200 dark:border-yellow-800"
                onClick={() => scrollGallery("left")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-md rounded-full hidden sm:flex border-yellow-200 dark:border-yellow-800"
                onClick={() => scrollGallery("right")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          <div ref={galleryRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
            {galleryItems
              .filter((item) => item.featured)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                  className="min-w-[280px] sm:min-w-[320px] snap-start"
                >
                  <Card
                    className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all rounded-xl dark:bg-gray-900 dark:shadow-gray-900/30 cursor-pointer group"
                    onClick={() => openImageModal(galleryItems.findIndex((i) => i.id === item.id))}
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={
                          item.image && item.image.trim() !== "" ? item.image : "/placeholder.svg?height=600&width=600"
                        }
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Search className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800">
                          {categories.find((cat) => cat.id === item.category)?.label}
                        </Badge>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <ExternalLink className="h-4 w-4 text-yellow-500" />
                          <span className="sr-only">View full size</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Main Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
            >
              <Card
                className="overflow-hidden group h-full border-0 shadow-lg hover:shadow-xl transition-all rounded-xl dark:bg-gray-900 dark:shadow-gray-900/30 cursor-pointer"
                onClick={() => openImageModal(filteredItems.indexOf(item))}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={item.image && item.image.trim() !== "" ? item.image : "/placeholder.svg?height=600&width=600"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  {item.featured && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">{item.description}</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800">
                    {categories.find((cat) => cat.id === item.category)?.label}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="h-6 w-1 bg-yellow-400 rounded-full mr-2"></span>
            Customer Experiences
          </h3>

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-md rounded-full border-yellow-200 dark:border-yellow-800"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 shadow-md rounded-full border-yellow-200 dark:border-yellow-800"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="overflow-hidden px-10">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="border-0 shadow-lg rounded-xl overflow-hidden dark:bg-gray-900 dark:shadow-gray-900/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <div className="flex items-center mt-1 mb-2">
                              {renderStars(testimonial.rating)}
                              <span className="text-xs text-gray-500 ml-2">{testimonial.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 relative">
                          <Quote className="h-6 w-6 text-yellow-200 dark:text-yellow-900 absolute -top-2 -left-2 opacity-50" />
                          <p className="text-gray-600 dark:text-gray-300 relative z-10 pl-4">{testimonial.comment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "bg-yellow-500 w-4 sm:w-6"
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Share Your Sweet Moments With Us!</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
            Tag us on social media with #TheHivePastries to be featured in our gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size={isMobile ? "default" : "lg"}>Visit Our Instagram</Button>
            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className="rounded-full border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400"
              onClick={() => (window.location.href = "#videos")}
            >
              Watch Our Videos
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={activeCategory === "all" ? galleryItems : filteredItems}
        initialIndex={selectedImageIndex}
      />
    </section>
  )
}
