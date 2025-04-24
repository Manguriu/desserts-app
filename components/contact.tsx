"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const storeHours = [
    { day: "Monday - Friday", hours: "7:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 7:00 PM" },
  ];

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-24 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Have questions or want to place a special order? Reach out to us and
            we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="rounded-lg border-pink-100 dark:border-pink-900 focus:border-pink-300 dark:focus:border-pink-700 focus:ring focus:ring-pink-200 dark:focus:ring-pink-800 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="rounded-lg border-pink-100 dark:border-pink-900 focus:border-pink-300 dark:focus:border-pink-700 focus:ring focus:ring-pink-200 dark:focus:ring-pink-800 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="min-h-[100px] md:min-h-[120px] rounded-lg border-pink-100 dark:border-pink-900 focus:border-pink-300 dark:focus dark:focus:border-pink-700 focus:ring focus:ring-pink-200 dark:focus:ring-pink-800 focus:ring-opacity-50"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-md hover:shadow-lg transition-all"
                size={isMobile ? "default" : "lg"}
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden dark:bg-gray-900 dark:shadow-gray-900/30">
              <div className="h-[150px] sm:h-[180px] md:h-[200px] relative">
                {/* Clickable Google Maps link */}
                <a
                  href="https://maps.app.goo.gl/qb8ocuoqpFrAUuLy9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <MapPin className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                  <span className="sr-only">Open location in Google Maps</span>
                </a>
              </div>

              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Visit Our Shop
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-pink-500 dark:text-pink-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Naivas Supermarket - Thika Town
                      <br />
                      Commercial St, Thika
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-pink-500 dark:text-pink-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      0746 354053
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-pink-500 dark:text-pink-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      hello@sweettreats.com
                    </p>
                  </div>
                </div>

                {/* Optional Share Location Button */}
                <Button
                  onClick={async () => {
                    const url = "https://maps.app.goo.gl/qb8ocuoqpFrAUuLy9";
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: "Sweet Treats Location",
                          text: "Come visit us at Naivas Supermarket, Thika!",
                          url,
                        });
                      } catch (err) {
                        console.error("Share failed:", err);
                      }
                    } else {
                      alert("Sharing not supported. Here's the link:\n" + url);
                    }
                  }}
                  className="mt-4 w-full sm:w-auto"
                >
                  Share Location
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl dark:bg-gray-900 dark:shadow-gray-900/30">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Clock className="h-5 w-5 text-pink-500 dark:text-pink-400 mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Store Hours
                  </h3>
                </div>
                <div className="space-y-2">
                  {storeHours.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm sm:text-base"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.day}
                      </span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
