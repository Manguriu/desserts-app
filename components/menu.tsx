"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useCart } from "@/lib/cart-context"

// Menu item type
type MenuItem = {
  id: number
  name: string
  description: string
  price: string
  image: string
  category: "cake" | "yogurt" | "icecream" | "coffee"
  popular?: boolean
}

// Sample menu data
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Strawberry Shortcake",
    description: "Light sponge cake with fresh strawberries and whipped cream",
    price: "KSh 850",
    image: "/Menu/Strawberry Shortcake.png",
    category: "cake",
    popular: true,
  },
  {
    id: 2,
    name: "Chocolate Fudge Cake",
    description: "Rich chocolate cake with fudge frosting",
    price: "KSh 950",
    image: "/Menu/Chocolate Fudge Cake.png",
    category: "cake",
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    price: "KSh 1,050",
    image: "/Menu/Red Velvet Cake.png",
    category: "cake",
    popular: true,
  },
  {
    id: 4,
    name: "Carrot Cake",
    description: "Spiced cake with walnuts and cream cheese frosting",
    price: "KSh 900",
    image: "/Menu/Carrot Cake.png",
    category: "cake",
  },
  {
    id: 5,
    name: "Greek Yogurt Parfait",
    description: "Creamy Greek yogurt with honey and mixed berries",
    price: "KSh 750",
    image: "/Menu/Greek Yogurt Parfait.png",
    category: "yogurt",
    popular: true,
  },
  {
    id: 6,
    name: "Mango Yogurt Bowl",
    description: "Smooth yogurt topped with fresh mango and granola",
    price: "KSh 800",
    image: "/Menu/Mango Yogurt Bowl.png",
    category: "yogurt",
  },
  {
    id: 7,
    name: "Berry Blast Yogurt",
    description: "Tart yogurt with strawberries, blueberries and blackberries",
    price: "KSh 850",
    image: "/Menu/Berry Blast Yogurt.png",
    category: "yogurt",
  },
  {
    id: 8,
    name: "Honey Almond Yogurt",
    description: "Creamy yogurt with honey drizzle and toasted almonds",
    price: "KSh 750",
    image: "/Menu/Honey Almond Yogurt.png",
    category: "yogurt",
  },
  {
    id: 9,
    name: "Vanilla Bean Ice Cream",
    description: "Classic vanilla ice cream with real vanilla beans",
    price: "KSh 600",
    image: "/Menu/Vanilla Bean Ice Cream.png",
    category: "icecream",
  },
  {
    id: 10,
    name: "Mint Chocolate Chip",
    description: "Refreshing mint ice cream with chocolate chips",
    price: "KSh 650",
    image: "/Menu/Mint Chocolate Chip.png",
    category: "icecream",
    popular: true,
  },
  {
    id: 11,
    name: "Salted Caramel Ice Cream",
    description: "Sweet and salty caramel swirled in creamy ice cream",
    price: "KSh 700",
    image: "/Menu/Salted Caramel Ice Cream.png",
    category: "icecream",
    popular: true,
  },
  {
    id: 12,
    name: "Strawberry Cheesecake Ice Cream",
    description: "Strawberry ice cream with cheesecake chunks",
    price: "KSh 800",
    image: "/Menu/Strawberry Cheesecake Ice Cream.png",
    category: "icecream",
  },
  {
    id: 13,
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: "KSh 550",
    image: "/Menu/Cappuccino.png",
    category: "coffee",
  },
  {
    id: 14,
    name: "Caramel Macchiato",
    description: "Espresso with vanilla syrup, milk and caramel drizzle",
    price: "KSh 600",
    image: "/Menu/Caramel Macchiato.png",
    category: "coffee",
    popular: true,
  },
  {
    id: 15,
    name: "Mocha Latte",
    description: "Espresso with chocolate, steamed milk and whipped cream",
    price: "KSh 650",
    image: "/Menu/Mocha Latte.png",
    category: "coffee",
  },
  {
    id: 16,
    name: "Cold Brew",
    description: "Smooth, cold-steeped coffee served over ice",
    price: "KSh 580",
    image: "/Menu/Cold Brew.png",
    category: "coffee",
    popular: true,
  },
]

// Filter categories
const categories = [
  { id: "all", label: "All" },
  { id: "cake", label: "Cakes" },
  { id: "yogurt", label: "Yogurt" },
  { id: "icecream", label: "Ice Cream" },
  { id: "coffee", label: "Coffee" },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all")
  const categoriesRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")
  const { addItem } = useCart()

  const filteredItems =
    activeCategory === "all" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleAddToCart = (item: MenuItem) => {
    addItem(item)
  }

  return (
    <section id="menu" className="py-12 md:py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Our Delicious Menu</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Explore our wide range of handcrafted desserts and beverages, made with premium ingredients and lots of
              love.
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
                      ? "bg-gradient-to-r from-pink-400 to-purple-400"
                      : "border-pink-200 dark:border-pink-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-950/30"
                  }`}
                  size={isMobile ? "sm" : "default"}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
            >
              <Card className="overflow-hidden group h-full border-0 shadow-lg hover:shadow-xl transition-all rounded-xl dark:bg-gray-900 dark:shadow-gray-900/30">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={item.image && item.image.trim() !== "" ? item.image : "/placeholder.svg?height=400&width=400"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.popular && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                    <span className="font-bold text-pink-500 dark:text-pink-400">{item.price}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">{item.description}</p>
                  <Button
                    variant="ghost"
                    className="w-full mt-3 sm:mt-4 rounded-lg border border-pink-200 dark:border-pink-800 text-pink-500 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600 dark:hover:text-pink-300 text-sm sm:text-base"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
