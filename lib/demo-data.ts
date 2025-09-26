export interface Crew {
  id: string
  name: string
  color: string
  size: number
}

export interface DemoEvent {
  id: string
  type: "CREW_CREATED" | "GATE_TAP" | "ICEBREAKER" | "DJ_SYNC" | "MERGE_CREWS" | "VENUE_STATS"
  timestamp: string
  message: string
  crewId?: string
}

export const demoPrompts = [
  "Purple Crew → Dance battle in 30s",
  "Yellow Crew → Mirror Purple Crew",
  "Everyone in Blue → Start a conga line!",
  "Red Crew → High-five every Green Crew you see",
  "Green Crew → Find someone wearing Pink",
  "All crews → Freeze dance when music stops",
  "Orange Crew → Start a wave around the room",
  "Teal Crew → Form a circle and share fun facts",
]

export const sampleGroups = [
  {
    id: "sx1",
    title: "Techno Night",
    match: "7/8 matched",
    time: "Fri 9:00 PM",
    area: "Surry Hills",
    dist: "3 km",
    vibe: "Electronic",
  },
  {
    id: "sx2",
    title: "Rooftop Cocktails",
    match: "5/8 matched",
    time: "Sat 7:30 PM",
    area: "CBD",
    dist: "1 km",
    vibe: "Upscale",
  },
  {
    id: "sx3",
    title: "Live Jazz + Eats",
    match: "6/8 matched",
    time: "Thu 8:00 PM",
    area: "Newtown",
    dist: "2 km",
    vibe: "Chill",
  },
  {
    id: "sx4",
    title: "Hip-Hop Vibes",
    match: "4/8 matched",
    time: "Sat 10:00 PM",
    area: "Kings Cross",
    dist: "2.5 km",
    vibe: "Urban",
  },
]
