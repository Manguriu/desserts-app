"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CartButton() {
  const { itemCount } = useCart()
  const [isClient, setIsClient] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [prevCount, setPrevCount] = useState(0)

  // Handle hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Animate badge when count changes
  useEffect(() => {
    if (isClient && itemCount > prevCount) {
      setShowBadge(true)
      const timer = setTimeout(() => setShowBadge(false), 1000)
      return () => clearTimeout(timer)
    }
    setPrevCount(itemCount)
  }, [itemCount, isClient, prevCount])

  const handleOpenCart = () => {
    const event = new CustomEvent("open-cart")
    window.dispatchEvent(event)
  }

  if (!isClient) return null

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full relative"
        onClick={handleOpenCart}
        aria-label="Open cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="absolute -top-2 -right-2 z-10"
          >
            <Badge className="bg-green-500 border-0">Added!</Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
