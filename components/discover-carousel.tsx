"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Clock, Users, Star, Zap } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const sampleGroups = [
  {
    id: "sx1",
    title: "Techno Night",
    description: "Underground beats with Sydney's top DJs",
    match: "7/8 matched",
    time: "Fri 9:00 PM",
    area: "Surry Hills",
    dist: "3 km",
    vibe: "Electronic",
    rating: 4.8,
    price: "$25-40",
    attendees: [
      { name: "Alex K.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Maya S.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Chris L.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
    ],
    features: ["Live DJ", "Dance Floor", "Late Night"],
    popularity: 92,
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: "sx2",
    title: "Rooftop Cocktails",
    description: "Premium drinks with harbor views",
    match: "5/8 matched",
    time: "Sat 7:30 PM",
    area: "CBD",
    dist: "1 km",
    vibe: "Upscale",
    rating: 4.9,
    price: "$45-65",
    attendees: [
      { name: "Sarah M.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "James R.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Emma T.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    ],
    features: ["City Views", "Premium Bar", "Networking"],
    popularity: 88,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: "sx3",
    title: "Live Jazz + Eats",
    description: "Intimate venue with craft cocktails",
    match: "6/8 matched",
    time: "Thu 8:00 PM",
    area: "Newtown",
    dist: "2 km",
    vibe: "Chill",
    rating: 4.7,
    price: "$30-50",
    attendees: [
      { name: "Tom W.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Lisa H.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
      { name: "Jake M.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    ],
    features: ["Live Music", "Craft Cocktails", "Intimate"],
    popularity: 85,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "sx4",
    title: "Hip-Hop Vibes",
    description: "Urban beats and street food",
    match: "4/8 matched",
    time: "Sat 10:00 PM",
    area: "Kings Cross",
    dist: "2.5 km",
    vibe: "Urban",
    rating: 4.6,
    price: "$20-35",
    attendees: [
      { name: "Ryan D.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Zoe P.", avatar: "/placeholder.svg?height=32&width=32", verified: true },
      { name: "Marcus J.", avatar: "/placeholder.svg?height=32&width=32", verified: false },
    ],
    features: ["Hip-Hop", "Street Food", "Dance"],
    popularity: 79,
    gradient: "from-red-500 to-orange-500",
  },
]

export function DiscoverCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [animatedPopularity, setAnimatedPopularity] = useState<Record<string, number>>({})

  useEffect(() => {
    sampleGroups.forEach((group) => {
      let current = 0
      const increment = group.popularity / 30
      const timer = setInterval(() => {
        current += increment
        if (current >= group.popularity) {
          current = group.popularity
          clearInterval(timer)
        }
        setAnimatedPopularity((prev) => ({ ...prev, [group.id]: Math.floor(current) }))
      }, 50)
    })
  }, [])

  return (
    <TooltipProvider>
      <section className="py-20 bg-gradient-to-br from-card/20 via-background to-secondary/10">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl mb-6">Discover Crews</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join AI-matched groups of 8 people with similar vibes and verified profiles
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">156 active groups</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Live matching</span>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sampleGroups.map((group) => {
              const isHovered = hoveredCard === group.id
              const animatedPop = animatedPopularity[group.id] || 0

              return (
                <Card
                  key={group.id}
                  className={`min-w-[320px] snap-start transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isHovered ? "ring-2 ring-accent/50" : ""
                  }`}
                  onMouseEnter={() => setHoveredCard(group.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0">
                    <div className={`h-24 bg-gradient-to-r ${group.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm">
                          <Users className="h-3 w-3 mr-1" />
                          {group.match}
                        </Badge>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-white text-xs font-medium">{group.rating}</span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-4">
                        <h3 className="font-comfortaa text-lg font-bold text-white">{group.title}</h3>
                      </div>

                      {isHovered && (
                        <>
                          <div className="absolute top-4 right-8 w-1 h-1 bg-white/60 rounded-full animate-ping" />
                          <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping delay-300" />
                          <div className="absolute top-6 right-16 w-1 h-1 bg-white/50 rounded-full animate-ping delay-700" />
                        </>
                      )}
                    </div>

                    <div className="p-5 space-y-4">
                      <p className="text-sm text-muted-foreground">{group.description}</p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{group.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>
                            {group.area} ({group.dist})
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Popularity</span>
                          <span className="font-medium">{animatedPop}%</span>
                        </div>
                        <Progress value={animatedPop} className="h-1.5" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Current members:</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            {group.attendees.map((attendee, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {attendee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="flex items-center gap-2">
                                    <span>{attendee.name}</span>
                                    {attendee.verified && (
                                      <Badge variant="secondary" className="text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">+5 more</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {group.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Est. cost</p>
                          <p className="text-sm font-semibold">{group.price}</p>
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
        </div>
      </section>
    </TooltipProvider>
  )
}
