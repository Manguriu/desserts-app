"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Maximize2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

export type GalleryItem = {
  id: number
  title: string
  description?: string
  image: string
  category: "pastries" | "cakes" | "customers" | "shop"
  featured?: boolean
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  items: GalleryItem[]
  initialIndex: number
}

export default function GalleryModal({ isOpen, onClose, items, initialIndex }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const currentItem = items[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowLeft":
          prevImage()
          break
        case "ArrowRight":
          nextImage()
          break
        case "Escape":
          onClose()
          break
        case "f":
          toggleFullscreen()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Reset loading state when changing images
  useEffect(() => {
    setIsLoading(true)
  }, [currentIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = currentItem.image
    link.download = `${currentItem.title.replace(/\s+/g, "-").toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("relative w-full h-full flex flex-col", isFullscreen ? "p-0" : "p-4 sm:p-6 md:p-8")}
        >
          {/* Close button */}
          <div className={cn("absolute top-4 right-4 z-10 flex gap-2", isFullscreen && "opacity-0 hover:opacity-100")}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full h-full max-w-4xl mx-auto">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={
                  currentItem.image && currentItem.image.trim() !== ""
                    ? currentItem.image
                    : "/placeholder.svg?height=800&width=800"
                }
                alt={currentItem.title}
                fill
                className="object-contain"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>

          {/* Image info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "bg-black/70 p-4 rounded-lg mt-4",
              isFullscreen && "absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity",
            )}
          >
            <h2 className="text-white text-xl font-semibold">{currentItem.title}</h2>
            {currentItem.description && <p className="text-gray-300 mt-1">{currentItem.description}</p>}
            <div className="flex justify-between items-center mt-2">
              <span className="text-yellow-400 text-sm">
                Image {currentIndex + 1} of {items.length}
              </span>
              <span className="text-gray-400 text-sm capitalize">{currentItem.category}</span>
            </div>
          </motion.div>

          {/* Thumbnail navigation */}
          {!isMobile && !isFullscreen && (
            <div className="mt-4 overflow-x-auto pb-2">
              <div className="flex gap-2">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                      currentIndex === index
                        ? "border-yellow-400 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={
                        item.image && item.image.trim() !== "" ? item.image : "/placeholder.svg?height=100&width=100"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
