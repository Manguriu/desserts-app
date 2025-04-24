import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import Navbar from "@/components/navbar"
import Cart from "@/components/cart"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sweet Treats - Dessert Shop",
  description: "Delicious cakes, yogurt, ice cream, and coffee",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Navbar />
            {children}
            <Cart />
            <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800 py-8">
              <div className="container mx-auto px-4 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © {new Date().getFullYear()} Sweet Treats. All rights reserved.
                </p>
              </div>
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
