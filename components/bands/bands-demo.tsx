"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Users, Nfc, Music4, Shuffle, BarChart3, Clock } from "lucide-react"

interface Crew {
  id: string
  name: string
  color: string
  size: number
}

interface DemoEvent {
  id: string
  type: "CREW_CREATED" | "GATE_TAP" | "ICEBREAKER" | "DJ_SYNC" | "MERGE_CREWS" | "VENUE_STATS"
  timestamp: string
  message: string
  crewId?: string
}

const demoPrompts = [
  "Purple Crew → Dance battle in 30s",
  "Yellow Crew → Mirror Purple Crew",
  "Everyone in Blue → Start a conga line!",
  "Red Crew → High-five every Green Crew you see",
  "Green Crew → Find someone wearing Pink",
  "All crews → Freeze dance when music stops",
]

const crewColors = [
  { name: "Purple", value: "#8B5CF6", bg: "bg-purple-500" },
  { name: "Blue", value: "#3B82F6", bg: "bg-blue-500" },
  { name: "Green", value: "#10B981", bg: "bg-green-500" },
  { name: "Yellow", value: "#F59E0B", bg: "bg-yellow-500" },
  { name: "Pink", value: "#EC4899", bg: "bg-pink-500" },
  { name: "Red", value: "#EF4444", bg: "bg-red-500" },
]

export function BandsDemo() {
  const [crews, setCrews] = useState<Crew[]>([])
  const [events, setEvents] = useState<DemoEvent[]>([])
  const [newCrewName, setNewCrewName] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [venueStats, setVenueStats] = useState({
    capacity: 68,
    waitTime: 8,
    waypointGroups: 12,
  })
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [isDJSyncing, setIsDJSyncing] = useState(false)

  const addEvent = (event: Omit<DemoEvent, "id" | "timestamp">) => {
    const newEvent: DemoEvent = {
      ...event,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
    }
    setEvents((prev) => [newEvent, ...prev].slice(0, 10))
  }

  const createCrew = () => {
    if (!newCrewName || !selectedColor) return

    const colorInfo = crewColors.find((c) => c.value === selectedColor)
    if (!colorInfo) return

    const newCrew: Crew = {
      id: Date.now().toString(),
      name: newCrewName,
      color: selectedColor,
      size: 8,
    }

    setCrews((prev) => [...prev, newCrew])
    addEvent({
      type: "CREW_CREATED",
      message: `${colorInfo.name} Crew "${newCrewName}" created with 8 bands`,
      crewId: newCrew.id,
    })

    setNewCrewName("")
    setSelectedColor("")
  }

  const simulateGateTap = (crew: Crew) => {
    const colorName = crewColors.find((c) => c.value === crew.color)?.name
    addEvent({
      type: "GATE_TAP",
      message: `${colorName} Crew "${crew.name}" tapped in - Welcome message displayed!`,
      crewId: crew.id,
    })

    // Update venue stats
    setVenueStats((prev) => ({
      ...prev,
      capacity: Math.min(95, prev.capacity + Math.floor(Math.random() * 5) + 3),
      waypointGroups: prev.waypointGroups + 1,
    }))
  }

  const startIcebreaker = () => {
    const randomPrompt = demoPrompts[Math.floor(Math.random() * demoPrompts.length)]
    setCurrentPrompt(randomPrompt)
    addEvent({
      type: "ICEBREAKER",
      message: `Icebreaker started: "${randomPrompt}"`,
    })

    // Clear prompt after 5 seconds
    setTimeout(() => setCurrentPrompt(""), 5000)
  }

  const djSync = () => {
    setIsDJSyncing(true)
    addEvent({
      type: "DJ_SYNC",
      message: "DJ sync activated - All bands pulsing to the beat!",
    })

    setTimeout(() => setIsDJSyncing(false), 3000)
  }

  const mergeCrews = () => {
    if (crews.length < 2) return

    const crew1 = crews[0]
    const crew2 = crews[1]
    const color1Name = crewColors.find((c) => c.value === crew1.color)?.name
    const color2Name = crewColors.find((c) => c.value === crew2.color)?.name

    addEvent({
      type: "MERGE_CREWS",
      message: `${color1Name} Crew and ${color2Name} Crew merged → Rainbow glow activated!`,
    })

    // Update first crew to rainbow effect
    setCrews((prev) =>
      prev.map((crew, index) =>
        index === 0 ? { ...crew, color: "linear-gradient(45deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)" } : crew,
      ),
    )
  }

  return (
    <section id="bands-demo" className="py-20 bg-card/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Live Demo</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience how Waypoint Bands work in real-time at venues
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Demo Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Demo Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Create Crew */}
                <div className="space-y-3">
                  <Label>Create a Crew</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Crew name"
                      value={newCrewName}
                      onChange={(e) => setNewCrewName(e.target.value)}
                    />
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {crewColors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${color.bg}`} />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={createCrew} disabled={!newCrewName || !selectedColor} className="w-full">
                    Create Crew
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={startIcebreaker}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Shuffle className="h-4 w-4" />
                    Start Icebreaker
                  </Button>
                  <Button
                    variant="outline"
                    onClick={djSync}
                    disabled={isDJSyncing}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Music4 className="h-4 w-4" />
                    DJ Sync
                  </Button>
                  <Button
                    variant="outline"
                    onClick={mergeCrews}
                    disabled={crews.length < 2}
                    className="flex items-center gap-2 col-span-2 bg-transparent"
                  >
                    <Shuffle className="h-4 w-4" />
                    Merge Crews
                  </Button>
                </div>

                {/* Crew List */}
                {crews.length > 0 && (
                  <div className="space-y-2">
                    <Label>Active Crews</Label>
                    {crews.map((crew) => {
                      const colorName = crewColors.find((c) => c.value === crew.color)?.name
                      return (
                        <div key={crew.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                background: crew.color.includes("gradient") ? crew.color : crew.color,
                              }}
                            />
                            <span className="font-medium">
                              {colorName} Crew "{crew.name}"
                            </span>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => simulateGateTap(crew)}>
                            <Nfc className="h-3 w-3 mr-1" />
                            Tap In
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live Visuals */}
          <div className="space-y-6">
            {/* Venue Display */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Display</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-lg text-center">
                  <h3 className="font-comfortaa text-2xl font-bold mb-2">Welcome to the Club!</h3>
                  {events.length > 0 && events[0].type === "GATE_TAP" && (
                    <p className="text-accent animate-pulse">{events[0].message.split(" - ")[1]}</p>
                  )}
                  {currentPrompt && (
                    <div className="mt-4 p-3 bg-accent/20 rounded border border-accent/40">
                      <p className="text-accent font-medium animate-pulse">{currentPrompt}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Crew Bands Strip */}
            {crews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Crew Bands</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {crews.map((crew) => {
                      const colorName = crewColors.find((c) => c.value === crew.color)?.name
                      return (
                        <div key={crew.id} className="space-y-2">
                          <Label>
                            {colorName} Crew "{crew.name}"
                          </Label>
                          <div className="flex gap-2">
                            {Array.from({ length: crew.size }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-8 h-8 rounded-full border-2 ${isDJSyncing ? "beat-pulse" : "pulse-glow"}`}
                                style={{
                                  background: crew.color.includes("gradient") ? crew.color : crew.color,
                                  borderColor: crew.color.includes("gradient") ? "#E8CC7E" : crew.color,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Bar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Live Venue Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent">{venueStats.capacity}%</div>
                    <div className="text-sm text-muted-foreground">Capacity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{venueStats.waitTime}m</div>
                    <div className="text-sm text-muted-foreground">Wait Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{venueStats.waypointGroups}</div>
                    <div className="text-sm text-muted-foreground">Waypoint Groups</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Log */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Event Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {events.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No events yet. Create a crew to get started!</p>
                  ) : (
                    events.map((event) => (
                      <div key={event.id} className="flex items-start gap-2 text-sm p-2 bg-muted/20 rounded">
                        <span className="text-muted-foreground text-xs">{event.timestamp}</span>
                        <span>{event.message}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
