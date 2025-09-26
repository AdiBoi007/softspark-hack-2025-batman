"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, MapPin, Clock } from "lucide-react"

const venues = [
  { name: "Electric Nights", capacity: 85, crowd: "Mixed 20-30s", peak: "11 PM", color: "from-purple-500 to-pink-500" },
  {
    name: "Bass Underground",
    capacity: 92,
    crowd: "Electronic fans",
    peak: "12 AM",
    color: "from-blue-500 to-cyan-500",
  },
  { name: "Rooftop Vibes", capacity: 67, crowd: "Cocktail lovers", peak: "10 PM", color: "from-orange-500 to-red-500" },
  { name: "Jazz Corner", capacity: 45, crowd: "Mature crowd", peak: "9 PM", color: "from-green-500 to-emerald-500" },
]

export function RotatingVenueStats() {
  const [rotation, setRotation] = useState(0)
  const [activeVenue, setActiveVenue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 1)
      if (rotation % 90 === 0) {
        setActiveVenue((prev) => (prev + 1) % venues.length)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [rotation])

  return (
    <section className="py-16 bg-gradient-to-r from-background via-muted/10 to-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Live Venue Data
          </Badge>
          <h2 className="font-comfortaa text-2xl font-bold">Real-time venue insights</h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-80">
              {/* Central display */}
              <Card className="absolute inset-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 border-2 border-accent/30">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-sm truncate">{venues[activeVenue].name}</h3>
                  <div className="mt-2">
                    <Progress value={venues[activeVenue].capacity} className="h-2" />
                    <p className="text-xs mt-1">{venues[activeVenue].capacity}% full</p>
                  </div>
                </CardContent>
              </Card>

              {/* Rotating venue indicators */}
              {venues.map((venue, index) => {
                const angle = index * 90 + rotation
                const x = Math.cos((angle * Math.PI) / 180) * 120
                const y = Math.sin((angle * Math.PI) / 180) * 120
                const isActive = index === activeVenue

                return (
                  <div
                    key={venue.name}
                    className={`absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isActive ? "scale-125 z-10" : "scale-100"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    <div className={`h-full w-full rounded-full bg-gradient-to-br ${venue.color} p-0.5`}>
                      <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                        <MapPin className={`h-5 w-5 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Venue details grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {venues.map((venue, index) => (
              <Card
                key={venue.name}
                className={`transition-all duration-300 ${
                  index === activeVenue ? "ring-2 ring-accent/50 bg-accent/5" : ""
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold">{venue.capacity}%</span>
                  </div>
                  <h4 className="font-medium text-sm truncate">{venue.name}</h4>
                  <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{venue.peak}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
