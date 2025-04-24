"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ShoppingCart, Trash2, ArrowLeft, CreditCard, CheckCircle, Smartphone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type CheckoutStep = "cart" | "delivery" | "payment" | "confirmation"
type PaymentMethod = "card" | "mpesa" | "paypal" | "cash"

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    instructions: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa")
  const [saveInfo, setSaveInfo] = useState(false)
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })
  const [mpesaInfo, setMpesaInfo] = useState({
    phoneNumber: "",
  })

  const { items, removeItem, updateQuantity, clearCart, subtotal, formatCurrency } = useCart()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const deliveryFee = 200
  const tax = Math.round(subtotal * 0.16) // 16% VAT in Kenya
  const total = subtotal + deliveryFee + tax

  // Handle opening the cart
  useEffect(() => {
    const handleOpenCart = () => {
      setIsOpen(true)
      setCurrentStep("cart")
    }

    window.addEventListener("open-cart", handleOpenCart)
    window.addEventListener("add-to-order", handleOpenCart)
    window.addEventListener("open-order-modal", handleOpenCart)

    return () => {
      window.removeEventListener("open-cart", handleOpenCart)
      window.removeEventListener("add-to-order", handleOpenCart)
      window.removeEventListener("open-order-modal", handleOpenCart)
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

  // Handle input changes for delivery info
  const handleDeliveryInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle input changes for card info
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle input changes for M-Pesa info
  const handleMpesaInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMpesaInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  // Format M-Pesa phone number
  const formatMpesaNumber = (value: string) => {
    // Remove non-numeric characters
    let v = value.replace(/\D/g, "")

    // If it starts with 0, replace with 254
    if (v.startsWith("0") && v.length > 1) {
      v = "254" + v.substring(1)
    }

    // If it doesn't start with 254, add it
    if (!v.startsWith("254") && v.length > 0) {
      v = "254" + v
    }

    return v
  }

  // Process payment
  const processPayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep("confirmation")
    }, 2000)
  }

  // Complete order and reset
  const completeOrder = () => {
    clearCart()
    setIsOpen(false)
    setCurrentStep("cart")
    setDeliveryInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      instructions: "",
    })
    setCardInfo({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    })
    setMpesaInfo({
      phoneNumber: "",
    })
  }

  // Get step title
  const getStepTitle = () => {
    switch (currentStep) {
      case "cart":
        return "Your Cart"
      case "delivery":
        return "Delivery Information"
      case "payment":
        return "Payment Method"
      case "confirmation":
        return "Order Confirmation"
    }
  }

  // Render cart items
  const renderCartItems = () => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
          <Button
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => {
              setIsOpen(false)
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Browse Menu
          </Button>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 py-3 border-b dark:border-gray-700">
              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image && item.image.trim() !== "" ? item.image : "/placeholder.svg?height=400&width=400"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-5 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">VAT (16%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            className="w-full mt-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
            onClick={() => setCurrentStep("delivery")}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  )

  // Render delivery form
  const renderDeliveryForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={deliveryInfo.name}
            onChange={handleDeliveryInfoChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={deliveryInfo.email}
            onChange={handleDeliveryInfoChange}
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={deliveryInfo.phone}
          onChange={handleDeliveryInfoChange}
          placeholder="0712 345 678"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Delivery Address</Label>
        <Input
          id="address"
          name="address"
          value={deliveryInfo.address}
          onChange={handleDeliveryInfoChange}
          placeholder="123 Moi Avenue, Apartment 4B"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={deliveryInfo.city}
            onChange={handleDeliveryInfoChange}
            placeholder="Nairobi"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Postal Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={deliveryInfo.zipCode}
            onChange={handleDeliveryInfoChange}
            placeholder="00100"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
        <Textarea
          id="instructions"
          name="instructions"
          value={deliveryInfo.instructions}
          onChange={handleDeliveryInfoChange}
          placeholder="Ring doorbell, leave at door, etc."
          className="min-h-[80px]"
        />
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={(checked) => setSaveInfo(checked as boolean)} />
        <Label htmlFor="saveInfo" className="text-sm">
          Save this information for next time
        </Label>
      </div>

      <div className="space-y-2 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">VAT (16%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
        <Button variant="outline" className="rounded-full" onClick={() => setCurrentStep("cart")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
        <Button
          className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 sm:flex-1"
          onClick={() => setCurrentStep("payment")}
          disabled={
            !deliveryInfo.name ||
            !deliveryInfo.email ||
            !deliveryInfo.phone ||
            !deliveryInfo.address ||
            !deliveryInfo.city ||
            !deliveryInfo.zipCode
          }
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  )

  // Render payment form
  const renderPaymentForm = () => (
    <div className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
        {/* M-Pesa Option */}
        <div className="flex items-center space-x-2 mb-4">
          <RadioGroupItem value="mpesa" id="mpesa" />
          <Label htmlFor="mpesa" className="flex items-center">
            <Smartphone className="h-4 w-4 mr-2 text-green-600" />
            M-Pesa
          </Label>
        </div>

        {paymentMethod === "mpesa" && (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label htmlFor="mpesaPhoneNumber">M-Pesa Phone Number</Label>
              <Input
                id="mpesaPhoneNumber"
                name="phoneNumber"
                value={mpesaInfo.phoneNumber}
                onChange={(e) => setMpesaInfo({ phoneNumber: formatMpesaNumber(e.target.value) })}
                placeholder="254712345678"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter your M-Pesa registered phone number starting with 254
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <p className="text-sm text-green-800 dark:text-green-400">
                You will receive an M-Pesa prompt on your phone to complete the payment of {formatCurrency(total)}.
              </p>
            </div>
          </div>
        )}

        {/* Credit/Debit Card Option */}
        <div className="flex items-center space-x-2 mb-4">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Credit/Debit Card
          </Label>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: formatCardNumber(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                value={cardInfo.cardName}
                onChange={handleCardInfoChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  name="expiry"
                  value={cardInfo.expiry}
                  onChange={(e) => setCardInfo({ ...cardInfo, expiry: formatExpiry(e.target.value) })}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  value={cardInfo.cvv}
                  onChange={handleCardInfoChange}
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* PayPal Option */}
        <div className="flex items-center space-x-2 mb-4">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex items-center">
            <div className="flex items-center">
              <span className="text-blue-600 font-bold mr-1">Pay</span>
              <span className="text-blue-800 font-bold">Pal</span>
            </div>
          </Label>
        </div>

        {paymentMethod === "paypal" && (
          <div className="space-y-4 pl-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-400">
                You will be redirected to PayPal to complete your payment of {formatCurrency(total)}.
              </p>
            </div>
          </div>
        )}

        {/* Cash on Delivery Option */}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash">Cash on Delivery</Label>
        </div>

        {paymentMethod === "cash" && (
          <div className="space-y-4 pl-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                Please have exact change of {formatCurrency(total)} ready for the delivery person.
              </p>
            </div>
          </div>
        )}
      </RadioGroup>

      <div className="space-y-2 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">VAT (16%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
        <Button variant="outline" className="rounded-full" onClick={() => setCurrentStep("delivery")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 sm:flex-1"
          onClick={processPayment}
          disabled={
            isProcessing ||
            (paymentMethod === "card" &&
              (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiry || !cardInfo.cvv)) ||
            (paymentMethod === "mpesa" && !mpesaInfo.phoneNumber)
          }
        >
          {isProcessing ? (
            <>
              <span className="animate-spin mr-2">◌</span>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </div>
    </div>
  )

  // Render confirmation
  const renderConfirmation = () => (
    <div className="text-center py-6 space-y-4">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h3 className="text-xl font-semibold">Thank You for Your Order!</h3>

      <p className="text-gray-600 dark:text-gray-400">
        Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4 text-left">
        <p className="font-medium mb-2">Order Summary</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Order Number:</span>
            <span>#{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
            <span>
              {paymentMethod === "card"
                ? "Credit/Debit Card"
                : paymentMethod === "mpesa"
                  ? "M-Pesa"
                  : paymentMethod === "paypal"
                    ? "PayPal"
                    : "Cash on Delivery"}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
        onClick={completeOrder}
      >
        Continue Shopping
      </Button>
    </div>
  )

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "cart":
        return renderCartItems()
      case "delivery":
        return renderDeliveryForm()
      case "payment":
        return renderPaymentForm()
      case "confirmation":
        return renderConfirmation()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <div className="flex items-center">
                {currentStep !== "cart" && currentStep !== "confirmation" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 rounded-full"
                    onClick={() => setCurrentStep(currentStep === "payment" ? "delivery" : "cart")}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto p-4 max-h-[calc(90vh-70px)]">{renderStepContent()}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
