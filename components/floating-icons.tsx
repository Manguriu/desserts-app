"use client"

import { motion } from "framer-motion"
import { Phone, Mail, SendHorizontal,Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function FloatingIcons() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-2 sm:gap-3 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => (window.location.href = "tel:+254746354053")}
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Call us</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "left"}>
              <p>Call us</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => (window.location.href = "mailto:hello@sweettreats.com")}
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Email us</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "left"}>
              <p>Email us</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => window.open("https://api.whatsapp.com/send?phone=254759837429", "_blank")}
              >
                <SendHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "left"}>
              <p>WhatsApp Us</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => window.open("https://www.instagram.com/hive_pastries/?hl=en", "_blank")}
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "left"}>
              <p>Follow on Instagram</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => window.open("https://www.facebook.com/hivepastries/", "_blank")}
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "left"}>
              <p>Like on Facebook</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
