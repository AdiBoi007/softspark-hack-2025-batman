"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Beta User",
    location: "Sydney",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Waypoint completely changed how I experience nightlife. Found my crew within minutes of arriving at a new venue!",
    highlight: "Found my crew within minutes",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Venue Owner",
    location: "Melbourne",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Our venue saw 40% more engagement since implementing Waypoint. Customers love the seamless experience.",
    highlight: "40% more engagement",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Beta User",
    location: "Brisbane",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "The blind date feature is genius! Met my boyfriend through Waypoint's AI matching. It just works.",
    highlight: "Met my boyfriend",
    verified: true,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Event Organizer",
    location: "Perth",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Managing events with Waypoint is effortless. Real-time insights help us create better experiences.",
    highlight: "Real-time insights",
    verified: true,
  },
]

export function PremiumTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-secondary/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-comfortaa text-4xl font-bold mb-6">What Our Community Says</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from beta users, venue owners, and event organizers
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="relative overflow-hidden bg-gradient-to-br from-background/80 to-secondary/20 backdrop-blur-sm border-accent/20">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-6">
                <Quote className="h-12 w-12 text-accent/50 flex-shrink-0 mt-2" />
                <div className="flex-1">
                  <p className="text-xl md:text-2xl leading-relaxed mb-6 font-medium">
                    "{testimonials[activeTestimonial].text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-accent/20">
                        <AvatarImage src={testimonials[activeTestimonial].avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {testimonials[activeTestimonial].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
                          {testimonials[activeTestimonial].verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-purple-500/5 animate-pulse" />
            </CardContent>
          </Card>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                index === activeTestimonial
                  ? "ring-2 ring-accent shadow-xl bg-gradient-to-br from-accent/10 to-transparent"
                  : "hover:bg-secondary/50"
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{testimonial.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{testimonial.text}</p>

                <Badge variant="outline" className="text-xs">
                  {testimonial.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeTestimonial ? "bg-accent w-8" : "bg-muted-foreground/30"
              }`}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
