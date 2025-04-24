"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ShoppingCart, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"

// Import the MenuItem type from menu.tsx
type MenuItem = {
  id: number
  name: string
  description: string
  price: string
  image: string
  category: "cake" | "yogurt" | "icecream" | "coffee"
  popular?: boolean
}

type OrderItem = MenuItem & {
  quantity: number
}

export default function OrderModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [activeTab, setActiveTab] = useState<"cart" | "checkout">("cart")
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Calculate total price
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", ""))
      return total + price * item.quantity
    }, 0)
  }

  // Handle adding items to order
  useEffect(() => {
    const handleAddToOrder = (event: Event) => {
      const customEvent = event as CustomEvent
      const menuItem = customEvent.detail.item as MenuItem

      setOrderItems((prevItems) => {
        // Check if item already exists in order
        const existingItemIndex = prevItems.findIndex((item) => item.id === menuItem.id)

        if (existingItemIndex >= 0) {
          // Increment quantity if item already exists
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex].quantity += 1
          return updatedItems
        } else {
          // Add new item with quantity 1
          return [...prevItems, { ...menuItem, quantity: 1 }]
        }
      })

      // Open modal when adding items
      setIsOpen(true)
      setActiveTab("cart")
    }

    const handleOpenOrderModal = () => {
      setIsOpen(true)
      setActiveTab("cart")
    }

    window.addEventListener("add-to-order", handleAddToOrder)
    window.addEventListener("open-order-modal", handleOpenOrderModal)

    return () => {
      window.removeEventListener("add-to-order", handleAddToOrder)
      window.removeEventListener("open-order-modal", handleOpenOrderModal)
    }
  }, [])

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

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // Remove item if quantity is less than 1
      setOrderItems(orderItems.filter((item) => item.id !== id))
    } else {
      setOrderItems(orderItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle order submission
  const handleSubmitOrder = () => {
    // In a real app, this would send the order to a backend
    console.log("Order submitted:", {
      items: orderItems,
      customer: customerInfo,
      total: calculateTotal().toFixed(2),
    })

    // Show confirmation
    alert("Thank you for your order! We'll prepare it right away.")

    // Reset order and close modal
    setOrderItems([])
    setIsOpen(false)
    setActiveTab("cart")
  }

  // Proceed to checkout
  const proceedToCheckout = () => {
    setActiveTab("checkout")
  }

  // Go back to cart
  const backToCart = () => {
    setActiveTab("cart")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-pink-500 mr-2" />
                <h2 className="text-lg sm:text-xl font-semibold">{activeTab === "cart" ? "Your Order" : "Checkout"}</h2>
                {activeTab === "cart" && orderItems.length > 0 && (
                  <Badge className="ml-2 bg-pink-500">{orderItems.length}</Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-pink-50"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto p-3 sm:p-4 max-h-[calc(90vh-60px)]">
              {activeTab === "cart" && (
                <>
                  {orderItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Your order is empty. Add some delicious treats!</p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-3 sm:pb-4">
                          <div className="flex-1 pr-2">
                            <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-5 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={() => setOrderItems(orderItems.filter((i) => i.id !== item.id))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {orderItems.length > 0 && (
                    <div className="mt-4 sm:mt-6">
                      <div className="flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === "checkout" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">Your Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        className="rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        placeholder="Your email"
                        className="rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        placeholder="Your address"
                        className="rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee:</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base sm:text-lg pt-2 border-t">
                        <span>Total:</span>
                        <span>${(calculateTotal() + 2.99).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 sm:p-4 border-t">
              {activeTab === "cart" ? (
                orderItems.length > 0 ? (
                  <Button
                    className="w-full rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
                    size={isMobile ? "default" : "lg"}
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Button
                    className="w-full rounded-lg"
                    variant="outline"
                    size={isMobile ? "default" : "lg"}
                    onClick={() => {
                      setIsOpen(false)
                      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Browse Menu
                  </Button>
                )
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    className="rounded-lg"
                    size={isMobile ? "default" : "lg"}
                    onClick={backToCart}
                  >
                    Back to Cart
                  </Button>
                  <Button
                    className="rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 sm:flex-1"
                    size={isMobile ? "default" : "lg"}
                    onClick={handleSubmitOrder}
                  >
                    Place Order
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
