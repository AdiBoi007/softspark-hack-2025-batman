"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, TrendingUp, Clock, Zap, Wifi, Volume2 } from "lucide-react"
import { useState, useEffect } from "react"

const venues = [
  {
    id: 1,
    name: "Ivy Rooftop",
    type: "Rooftop Bar",
    capacity: 85,
    currentCrowd: 72,
    waitTime: "5 min",
    vibe: "Upscale",
    position: { x: 120, y: 80 },
    color: "from-blue-500 to-cyan-500",
    features: ["NFC Entry", "Live DJ", "Premium Cocktails"],
  },
  {
    id: 2,
    name: "Basement Club",
    type: "Underground",
    capacity: 92,
    currentCrowd: 88,
    waitTime: "15 min",
    vibe: "Electronic",
    position: { x: 280, y: 120 },
    color: "from-purple-500 to-pink-500",
    features: ["Sound System", "Light Show", "VIP Area"],
  },
  {
    id: 3,
    name: "Garden Lounge",
    type: "Outdoor",
    capacity: 45,
    currentCrowd: 32,
    waitTime: "No wait",
    vibe: "Chill",
    position: { x: 200, y: 180 },
    color: "from-green-500 to-emerald-500",
    features: ["Garden Setting", "Live Music", "Craft Beer"],
  },
  {
    id: 4,
    name: "Sky Terrace",
    type: "High-rise",
    capacity: 78,
    currentCrowd: 65,
    waitTime: "8 min",
    vibe: "Trendy",
    position: { x: 350, y: 60 },
    color: "from-orange-500 to-red-500",
    features: ["City Views", "Signature Cocktails", "Photo Spots"],
  },
]

export function AdvancedVenueMap() {
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)
  const [animatedCapacities, setAnimatedCapacities] = useState<Record<number, number>>({})

  useEffect(() => {
    venues.forEach((venue) => {
      let current = 0
      const increment = venue.currentCrowd / 30
      const timer = setInterval(() => {
        current += increment
        if (current >= venue.currentCrowd) {
          current = venue.currentCrowd
          clearInterval(timer)
        }
        setAnimatedCapacities((prev) => ({ ...prev, [venue.id]: Math.floor(current) }))
      }, 50)
    })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-comfortaa text-4xl font-bold mb-6">Live Venue Intelligence</h2>
          <p className="text-xl text-muted-foreground">
            Real-time crowd data, wait times, and vibe matching powered by Waypoint Bands
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Interactive Map */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-background/80 to-secondary/20 backdrop-blur-sm border-accent/20 w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Sydney CBD - Live Now
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative h-80 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
                  {/* Map background grid */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 320">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Venue markers */}
                  <TooltipProvider>
                    {venues.map((venue) => {
                      const isSelected = selectedVenue === venue.id
                      const animatedCapacity = animatedCapacities[venue.id] || 0
                      const capacityPercent = (animatedCapacity / venue.capacity) * 100

                      return (
                        <Tooltip key={venue.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`absolute cursor-pointer transition-all duration-300 ${
                                isSelected ? "scale-125 z-10" : "hover:scale-110"
                              }`}
                              style={{
                                left: venue.position.x,
                                top: venue.position.y,
                                transform: "translate(-50%, -50%)",
                              }}
                              onClick={() => setSelectedVenue(isSelected ? null : venue.id)}
                            >
                              {/* Venue pulse effect */}
                              <div
                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${venue.color} opacity-30 animate-ping`}
                              />

                              {/* Main venue marker */}
                              <div
                                className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${venue.color} flex items-center justify-center shadow-lg border-2 border-white/20`}
                              >
                                <div className="text-white font-bold text-xs">{Math.round(capacityPercent)}%</div>
                              </div>

                              {/* Capacity ring */}
                              <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  stroke="rgba(255,255,255,0.2)"
                                  strokeWidth="2"
                                  fill="none"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  stroke="white"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeDasharray={`${2 * Math.PI * 20}`}
                                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - capacityPercent / 100)}`}
                                  className="transition-all duration-1000"
                                />
                              </svg>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-center">
                              <p className="font-semibold">{venue.name}</p>
                              <p className="text-xs text-muted-foreground">{venue.type}</p>
                              <p className="text-xs">
                                {animatedCapacity}/{venue.capacity} people
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </TooltipProvider>

                  {/* Connection lines between venues */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    {venues.map((venue, index) => {
                      const nextVenue = venues[(index + 1) % venues.length]
                      return (
                        <line
                          key={`${venue.id}-${nextVenue.id}`}
                          x1={venue.position.x}
                          y1={venue.position.y}
                          x2={nextVenue.position.x}
                          y2={nextVenue.position.y}
                          stroke="url(#connectionLine)"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                        />
                      )
                    })}
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Venue Details */}
            <div className="space-y-6 w-full">
              {selectedVenue ? (
                <Card className="bg-gradient-to-br from-background/80 to-secondary/20 backdrop-blur-sm border-accent/20">
                  <CardContent className="p-6">
                    {(() => {
                      const venue = venues.find((v) => v.id === selectedVenue)!
                      const animatedCapacity = animatedCapacities[venue.id] || 0
                      const capacityPercent = (animatedCapacity / venue.capacity) * 100

                      return (
                        <>
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="font-comfortaa text-2xl font-bold mb-2">{venue.name}</h3>
                              <Badge variant="secondary" className="mb-2">
                                {venue.type}
                              </Badge>
                              <p className="text-sm text-muted-foreground">{venue.vibe} vibe</p>
                            </div>
                            <div
                              className={`w-16 h-16 rounded-full bg-gradient-to-r ${venue.color} flex items-center justify-center animate-pulse`}
                            >
                              <TrendingUp className="h-8 w-8 text-white" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Current Capacity</span>
                                <span className="font-mono">
                                  {animatedCapacity}/{venue.capacity}
                                </span>
                              </div>
                              <Progress value={capacityPercent} className="h-3" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-accent" />
                                <span className="text-sm">Wait: {venue.waitTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{Math.round(capacityPercent)}% full</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium">Features:</p>
                              <div className="flex flex-wrap gap-2">
                                {venue.features.map((feature) => (
                                  <Badge key={feature} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button className="w-full mt-4" disabled>
                              Join Queue (Demo)
                            </Button>
                          </div>
                        </>
                      )
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-br from-background/80 to-secondary/20 backdrop-blur-sm border-accent/20">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-comfortaa text-lg font-semibold mb-2">Select a Venue</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on any venue marker to see live data, wait times, and crowd insights
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Live Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                  <CardContent className="p-4 text-center">
                    <Wifi className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold font-mono">156</p>
                    <p className="text-xs text-muted-foreground">Connected Venues</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                  <CardContent className="p-4 text-center">
                    <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold font-mono">2.3s</p>
                    <p className="text-xs text-muted-foreground">Avg Entry Time</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold font-mono">12.8k</p>
                    <p className="text-xs text-muted-foreground">Active Tonight</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                  <CardContent className="p-4 text-center">
                    <Volume2 className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold font-mono">94%</p>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
