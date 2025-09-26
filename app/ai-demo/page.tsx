"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowUp, MapPin, Clock, Users, Car, Calendar, ExternalLink, Phone, Globe, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  data?: any // For structured data like venues, reservations, etc.
}

interface Venue {
  id: string
  name: string
  address: string
  rating: number
  priceLevel: string
  cuisine: string
  phone?: string
  website?: string
  openTableSlug?: string
  resySlug?: string
  latitude: number
  longitude: number
}

export default function AIDemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey! I'm your AI concierge. Tell me what you're looking for - dinner plans, drinks, events - and I'll make it happen with real bookings and rides. Try: 'Dinner for 4 in Surry Hills at 8pm, Italian, $$'",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const parseIntent = (message: string) => {
    const partyMatch = message.match(/(\d+)\s*(people|person|pax)?/i)
    const timeMatch = message.match(/(\d{1,2})(:\d{2})?\s*(pm|am)?/i) || message.match(/(dinner|lunch|breakfast)/i)
    const cuisineMatch = message.match(
      /(italian|chinese|japanese|thai|indian|mexican|french|greek|vietnamese|korean|american)/i,
    )
    const budgetMatch = message.match(/(\$+|\bbudget\b|\bcheap\b|\bexpensive\b|\bfine dining\b)/i)
    const locationMatch = message.match(
      /(surry hills|cbd|bondi|manly|newtown|paddington|darlinghurst|potts point|circular quay)/i,
    )

    return {
      party: partyMatch ? Number.parseInt(partyMatch[1]) : 2,
      time: timeMatch ? (timeMatch[0].includes("dinner") ? "20:00" : timeMatch[0]) : "19:00",
      cuisine: cuisineMatch ? cuisineMatch[1].toLowerCase() : "restaurant",
      budget: budgetMatch ? budgetMatch[1] : "$$",
      location: locationMatch ? locationMatch[1] : "Sydney CBD",
    }
  }

  const searchVenues = async (intent: any): Promise<Venue[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockVenues: Venue[] = [
      {
        id: "1",
        name: "Fratelli Paradiso",
        address: "12-16 Challis Ave, Potts Point NSW 2011",
        rating: 4.5,
        priceLevel: "$$",
        cuisine: "Italian",
        phone: "+61293577744",
        website: "https://fratelliparadiso.com",
        openTableSlug: "fratelli-paradiso-potts-point",
        latitude: -33.8688,
        longitude: 151.2093,
      },
      {
        id: "2",
        name: "Rosso Pomodoro",
        address: "15 Challis Ave, Potts Point NSW 2011",
        rating: 4.3,
        priceLevel: "$$",
        cuisine: "Italian",
        phone: "+61293264804",
        resySlug: "rosso-pomodoro-potts-point",
        latitude: -33.869,
        longitude: 151.2095,
      },
      {
        id: "3",
        name: "Via Napoli",
        address: "238 Victoria St, Darlinghurst NSW 2010",
        rating: 4.4,
        priceLevel: "$$$",
        cuisine: "Italian",
        phone: "+61293321811",
        openTableSlug: "via-napoli-darlinghurst",
        latitude: -33.8751,
        longitude: 151.214,
      },
    ]

    return mockVenues.filter((v) => v.cuisine.toLowerCase().includes(intent.cuisine) || intent.cuisine === "restaurant")
  }

  const generateReservationLink = (venue: Venue, intent: any) => {
    const date = new Date().toISOString().split("T")[0]
    const time = intent.time.replace(":", "")

    if (venue.openTableSlug) {
      return `https://www.opentable.com/r/${venue.openTableSlug}?covers=${intent.party}&dateTime=${date}T${intent.time}:00`
    } else if (venue.resySlug) {
      return `https://resy.com/cities/sydney/${venue.resySlug}?date=${date}&seats=${intent.party}&time=${intent.time}`
    }
    return null
  }

  const generateUberLink = (venue: Venue) => {
    const encodedAddress = encodeURIComponent(venue.address)
    return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodedAddress}&dropoff[latitude]=${venue.latitude}&dropoff[longitude]=${venue.longitude}&productType=ride`
  }

  const generateCalendarFile = (venue: Venue, intent: any) => {
    const date = new Date()
    const startTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      Number.parseInt(intent.time.split(":")[0]),
      Number.parseInt(intent.time.split(":")[1] || "0"),
    )
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000) // 2 hours later

    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Waypoint//EN
BEGIN:VEVENT
UID:${venue.id}-${Date.now()}@waypoint.app
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
SUMMARY:Dinner - ${venue.name}
LOCATION:${venue.address}
DESCRIPTION:Uber link: ${generateUberLink(venue)}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar" })
    return URL.createObjectURL(blob)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      const intent = parseIntent(userInput)
      const venues = await searchVenues(intent)

      if (venues.length > 0) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Perfect! I found ${venues.length} great ${intent.cuisine} spots for ${intent.party} people at ${intent.time}. Here are your options with instant booking:`,
          role: "assistant",
          timestamp: new Date(),
          data: { venues, intent },
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "I couldn't find venues matching your criteria, but I'm working on expanding our database. Try a different cuisine or location!",
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      }
    } catch (error) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error processing your request. Please try again!",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }

    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const renderVenueCard = (venue: Venue, intent: any) => {
    const reservationLink = generateReservationLink(venue, intent)
    const uberLink = generateUberLink(venue)
    const calendarLink = generateCalendarFile(venue, intent)

    return (
      <Card key={venue.id} className="p-4 bg-secondary/50 border-border/20 hover:bg-secondary/70 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-comfortaa font-semibold text-foreground">{venue.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {venue.address}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              ⭐ {venue.rating}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {venue.priceLevel}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            {intent.party} people
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {intent.time}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {venue.cuisine}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {reservationLink && (
            <Button
              size="sm"
              className="bg-soft-gold text-black hover:bg-soft-gold/90"
              onClick={() => window.open(reservationLink, "_blank")}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Book Table
            </Button>
          )}

          <Button size="sm" variant="outline" onClick={() => window.open(uberLink, "_blank")}>
            <Car className="w-3 h-3 mr-1" />
            Get Uber
          </Button>
        </div>

        <div className="flex gap-2">
          {venue.phone && (
            <Button
              size="sm"
              variant="ghost"
              className="text-xs"
              onClick={() => window.open(`tel:${venue.phone}`, "_self")}
            >
              <Phone className="w-3 h-3 mr-1" />
              Call
            </Button>
          )}

          {venue.website && (
            <Button size="sm" variant="ghost" className="text-xs" onClick={() => window.open(venue.website, "_blank")}>
              <Globe className="w-3 h-3 mr-1" />
              Website
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="text-xs"
            onClick={() => {
              const link = document.createElement("a")
              link.href = calendarLink
              link.download = `${venue.name.replace(/\s+/g, "-")}-reservation.ics`
              link.click()
            }}
          >
            <Calendar className="w-3 h-3 mr-1" />
            Add to Calendar
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-comfortaa">
      {/* Header */}
      <div className="border-b border-border/20 p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-comfortaa text-foreground">AI Concierge</h1>
            <p className="text-xs text-muted-foreground mt-1">Real bookings • Live integrations • Instant results</p>
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${message.role === "user" ? "ml-12" : "mr-12"}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user" ? "bg-foreground text-background" : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "assistant" && message.data?.venues && (
                  <div className="mt-4 space-y-3">
                    {message.data.venues.map((venue: Venue) => renderVenueCard(venue, message.data.intent))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-foreground rounded-2xl px-4 py-3 mr-12">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">Searching venues...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border/20 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end bg-secondary rounded-3xl border border-border/20 focus-within:border-border/40 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Try: 'Dinner for 4 in Surry Hills at 8pm, Italian, $$'"
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground resize-none border-0 outline-none px-4 py-3 text-sm leading-relaxed min-h-[44px] max-h-[200px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 m-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center transition-all duration-200 hover:bg-foreground/90 disabled:bg-muted-foreground disabled:cursor-not-allowed"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
