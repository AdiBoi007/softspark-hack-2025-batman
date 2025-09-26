"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, Users, Star, ArrowLeft, ArrowRight, Play } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const premiumGroups = [
  {
    id: "premium-1",
    title: "Rooftop Sunset Sessions",
    description: "Curated group for golden hour cocktails with city views",
    match: "8/8 matched",
    time: "Fri 6:00 PM",
    area: "Circular Quay",
    distance: "1.2 km",
    vibe: "Sophisticated",
    price: "$45-65",
    rating: 4.9,
    attendees: [
      { name: "Sarah M.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "James K.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Emma L.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
      { name: "Alex R.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    ],
    highlights: ["Premium venue", "Professional crowd", "Networking"],
    gradient: "from-orange-500 via-pink-500 to-purple-500",
    popularity: 95,
  },
  {
    id: "premium-2",
    title: "Underground Electronic",
    description: "Deep house & techno with Sydney's best DJs",
    match: "6/8 matched",
    time: "Sat 10:00 PM",
    area: "Surry Hills",
    distance: "2.8 km",
    vibe: "Underground",
    price: "$25-40",
    rating: 4.8,
    attendees: [
      { name: "Maya P.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Chris D.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
      { name: "Zoe T.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Ryan M.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    ],
    highlights: ["Live DJ sets", "Dance floor", "Late night"],
    gradient: "from-purple-600 via-blue-600 to-cyan-500",
    popularity: 88,
  },
  {
    id: "premium-3",
    title: "Craft Beer & Live Music",
    description: "Local bands, craft brews, and good conversations",
    match: "7/8 matched",
    time: "Thu 7:30 PM",
    area: "Newtown",
    distance: "3.5 km",
    vibe: "Laid-back",
    price: "$20-35",
    rating: 4.7,
    attendees: [
      { name: "Tom W.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Lisa H.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Jake S.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
      { name: "Amy C.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    ],
    highlights: ["Live music", "Craft beer", "Casual vibe"],
    gradient: "from-green-500 via-teal-500 to-blue-500",
    popularity: 82,
  },
  {
    id: "premium-4",
    title: "Wine & Dine Experience",
    description: "Fine dining paired with premium wines",
    match: "5/8 matched",
    time: "Sat 7:00 PM",
    area: "The Rocks",
    distance: "1.8 km",
    vibe: "Upscale",
    price: "$80-120",
    rating: 4.9,
    attendees: [
      { name: "Sophie B.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Michael T.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Grace L.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "David K.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
    ],
    highlights: ["Fine dining", "Wine pairing", "Intimate setting"],
    gradient: "from-red-500 via-pink-500 to-rose-500",
    popularity: 91,
  },
]

export function PremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % premiumGroups.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 380 // Card width + gap
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % premiumGroups.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + premiumGroups.length) % premiumGroups.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-comfortaa text-4xl font-bold mb-6">Discover Premium Experiences</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            AI-curated groups of 8 people with verified profiles and shared interests
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2"
            >
              <Play className={`h-4 w-4 ${isAutoPlaying ? "animate-pulse" : ""}`} />
              {isAutoPlaying ? "Auto-playing" : "Paused"}
            </Button>
            <Badge variant="secondary">Live Matching</Badge>
          </div>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {premiumGroups.map((group, index) => {
              const isActive = index === currentIndex

              return (
                <Card
                  key={group.id}
                  className={`min-w-[360px] snap-start transition-all duration-500 ${
                    isActive
                      ? "scale-105 shadow-2xl ring-2 ring-accent/50"
                      : "scale-95 opacity-75 hover:scale-100 hover:opacity-90"
                  }`}
                >
                  <CardContent className="p-0">
                    {/* Header with gradient */}
                    <div className={`h-32 bg-gradient-to-r ${group.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm">
                          <Users className="h-3 w-3 mr-1" />
                          {group.match}
                        </Badge>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-white text-xs font-medium">{group.rating}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-comfortaa text-xl font-bold text-white mb-1">{group.title}</h3>
                        <p className="text-white/90 text-sm">{group.description}</p>
                      </div>

                      {/* Animated particles */}
                      {isActive && (
                        <>
                          <div className="absolute top-8 right-8 w-2 h-2 bg-white/60 rounded-full animate-ping" />
                          <div className="absolute top-16 right-16 w-1 h-1 bg-white/40 rounded-full animate-ping delay-500" />
                          <div className="absolute top-12 right-24 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-1000" />
                        </>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Event details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{group.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>{group.area}</span>
                        </div>
                      </div>

                      {/* Popularity meter */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Popularity</span>
                          <span className="font-medium">{group.popularity}%</span>
                        </div>
                        <Progress value={group.popularity} className="h-2" />
                      </div>

                      {/* Attendees */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Current Members:</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {group.attendees.map((attendee, i) => (
                              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {attendee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">+4 more</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {group.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Est. cost per person</p>
                          <p className="font-semibold">{group.price}</p>
                        </div>
                        <Button size="sm" disabled className="bg-accent/20 text-accent">
                          Join (Demo)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {premiumGroups.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-accent w-8" : "bg-muted-foreground/30"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
