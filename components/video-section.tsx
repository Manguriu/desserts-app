"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TikTokEmbed from "@/components/tiktok-embed"


// Video item type
type VideoItem = {
  id: number
  title: string
  description?: string
  thumbnail: string
  videoUrl: string
  duration: string
  featured?: boolean
  type: "video" | "tiktok"
  tiktokUrl?: string
}

// Sample video data
const videoItems: VideoItem[] = [
  {
    id: 1,
    title: "How We Make Our Honey Glazed Donuts",
    description: "A behind-the-scenes look at our signature pastry",
    thumbnail: "",
    videoUrl: "",
    duration: "1:45",
    featured: true,
    type: "video",
  },
  {
    id: 2,
    title: "Queen Bee Cake Decoration",
    description: "Watch our pastry chef create our famous celebration cake",
    thumbnail: "",
    videoUrl: "",
    duration: "2:30",
    featured: true,
    type: "video",
  },
  {
    id: 3,
    title: "The Hive Thika - Strawberry Dessert",
    description: "Enjoying our delicious strawberry dessert at The Hive Thika",
    thumbnail: "/tiktokThumb.png",
    videoUrl: "",
    duration: "0:30",
    featured: true,
    type: "tiktok",
    tiktokUrl: "https://www.tiktok.com/@hive_pastries/video/7269714354512186630",
  },
  {
    id: 4,
    title: "Honeycomb Pattern Technique",
    description: "Learn how we create our signature honeycomb pattern",
    thumbnail: "",
    videoUrl: "",
    duration: "3:20",
    type: "video",
  },
  {
    id: 5,
    title: "The Hive Pastries Story",
    description: "The journey of how our bakery came to bee",
    thumbnail: "",
    videoUrl: "",
    duration: "4:15",
    featured: true,
    type: "video",
  },
  {
    id: 6,
    title: "Honey Harvest Season",
    description: "See how we source our premium honey",
    thumbnail: "",
    videoUrl: "",
    duration: "2:10",
    type: "video",
  },
]

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "tiktok">("all")
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const filteredVideos =
    activeTab === "all"
      ? videoItems
      : activeTab === "videos"
        ? videoItems.filter((v) => v.type === "video")
        : videoItems.filter((v) => v.type === "tiktok")

  const handleVideoClick = (video: VideoItem) => {
    setActiveVideo(video)
    setIsPlaying(true)

    // Reset video player when selecting a new video
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const togglePlay = () => {
    if (!videoRef.current || activeVideo?.type === "tiktok") return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current || activeVideo?.type === "tiktok") return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current || activeVideo?.type === "tiktok") return

    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  const closeVideoPlayer = () => {
    setActiveVideo(null)
    setIsPlaying(false)
  }

  // Listen for fullscreen change events
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
  
    document.addEventListener("fullscreenchange", handleFullscreenChange)
  
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <section id="videos" className="py-12 md:py-16 lg:py-24 bg-yellow-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Sweet Moments in Motion</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Watch our behind-the-scenes videos, customer stories, and more from The Hive Pastries.
            </p>
          </motion.div>
        </div>

        {/* Video Type Tabs */}
        <div className="mb-8 flex justify-center">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "all" | "videos" | "tiktok")}
          >
            <TabsList className="bg-yellow-100 dark:bg-yellow-900/30">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Video Player */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-12 relative rounded-xl overflow-hidden shadow-xl"
          >
            {activeVideo.type === "video" ? (
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnail}
                  className="w-full h-full object-contain"
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  autoPlay
                  playsInline
                />

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <span className="text-white text-sm">{activeVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-white hover:bg-white/20"
                      onClick={toggleFullscreen}
                    >
                      <Maximize2 className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-white hover:bg-white/20"
                      onClick={closeVideoPlayer}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Play/Pause Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/20 hover:bg-white/30 text-white h-16 w-16"
                      onClick={togglePlay}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <TikTokEmbed url={activeVideo.tiktokUrl || ""} className="w-full max-w-md mx-auto" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={closeVideoPlayer}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}

            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold">{activeVideo.title}</h3>
              {activeVideo.description && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">{activeVideo.description}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className={cn(
                  "overflow-hidden cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all rounded-xl dark:bg-gray-900 dark:shadow-gray-900/30",
                  activeVideo?.id === video.id && "ring-2 ring-yellow-400",
                )}
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={
                        video.thumbnail && video.thumbnail.trim() !== ""
                          ? video.thumbnail
                          : "/MainLogo.png"
                      }
                      alt={video.title}
                      fill
                      className={cn(
                        "transition-transform duration-500 hover:scale-110",
                        video.type === "tiktok" ? "object-contain" : "object-cover",
                      )}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/20 hover:bg-white/30 text-white h-12 w-12"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {video.featured && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500">
                      Featured
                    </Badge>
                  )}
                  {video.type === "tiktok" && (
                    <Badge className="absolute top-2 left-2 bg-black text-white">TikTok</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{video.title}</h3>
                    {video.type === "tiktok" && (
                      <a
                        href={video.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  {video.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
