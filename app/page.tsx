import Hero from "@/components/hero"
import Menu from "@/components/menu"
import Gallery from "@/components/gallery"
import About from "@/components/about"
import Contact from "@/components/contact"
import FloatingIcons from "@/components/floating-icons"
import VideoSection from "@/components/video-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Hero />
      <Menu />
      <Gallery />
      <VideoSection />
      <About />
      <Contact />
      <FloatingIcons />
    </main>
  )
}
