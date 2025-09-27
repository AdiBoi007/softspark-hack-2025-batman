export interface DemoTimelineStop {
  slot: string
  title: string
  description: string
  category: string
  icon: string
  location: string
  mapUrl: string
  media: string
}

export interface DemoConversationTurn {
  sender: "user" | "ai"
  message: string
  timestamp: string
}

export interface DemoExtension {
  id: string
  name: string
  description: string
  status: "live" | "beta"
  latency: string
  poweredBy: string
}

export interface DemoProject {
  id: string
  name: string
  summary: string
  tags: string[]
  updatedAt: string
  conversation: DemoConversationTurn[]
}

export const demoTimeline: DemoTimelineStop[] = [
  {
    slot: "07:00",
    title: "Sunrise ocean dip",
    description: "Waypoint pings Assemble AI to confirm swell and tide, unlocks heated towel kiosk.",
    category: "beach",
    icon: "Waves",
    location: "North Point",
    mapUrl: "https://maps.google.com/?q=-33.8479,151.2829&output=embed",
    media: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slot: "09:15",
    title: "Third-wave coffee lab",
    description: "Barista preps your roast, AI pushes lactose-free reminder to the crew.",
    category: "cafe",
    icon: "Coffee",
    location: "Lumen Lab",
    mapUrl: "https://maps.google.com/?q=-33.8666,151.2094&output=embed",
    media: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slot: "11:00",
    title: "Coastal hike",
    description: "Live weather monitor switches the pace, queue-less transfer waiting at the summit.",
    category: "outdoor",
    icon: "Mountain",
    location: "Skyline Trail",
    mapUrl: "https://maps.google.com/?q=-33.7095,151.2843&output=embed",
    media: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slot: "14:30",
    title: "Thrift + ramen crawl",
    description: "Inventory API locks sizes, AI holds a chef counter for the crew.",
    category: "retail",
    icon: "Shirt",
    location: "Canal District",
    mapUrl: "https://maps.google.com/?q=-33.8688,151.2093&output=embed",
    media: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slot: "19:00",
    title: "Gallery immersion",
    description: "Private preview and Aperitif pairing, taxi lined up for jazz lounge.",
    category: "event",
    icon: "Palette",
    location: "Riverside Wing",
    mapUrl: "https://maps.google.com/?q=-33.8610,151.2110&output=embed",
    media: "https://images.unsplash.com/photo-1529429617124-aee40317d8e3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slot: "22:30",
    title: "Warehouse sunrise set",
    description: "Waypoint Bands glow to the beat, afters fallback ready if capacity spikes.",
    category: "nightlife",
    icon: "Sparkles",
    location: "Docklands",
    mapUrl: "https://maps.google.com/?q=-33.8631,151.1930&output=embed",
    media: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  },
]

export const demoConversation: DemoConversationTurn[] = [
  {
    sender: "user",
    message: "Can we build a day that starts at the beach and ends at a sunrise set?",
    timestamp: "07:02",
  },
  {
    sender: "ai",
    message:
      "Absolutely. I’ll stitch a chill-morning → high-energy night path, watching tides, dietary notes, and ride windows.",
    timestamp: "07:02",
  },
  {
    sender: "user",
    message: "Need vegan brunch and a thrift stop for 4 people.",
    timestamp: "07:03",
  },
  {
    sender: "ai",
    message:
      "Locking The Plant Club for 12:30, queue-skipping the Vintage Shed with your sizes flagged. Sending invite link now.",
    timestamp: "07:03",
  },
  {
    sender: "ai",
    message:
      "Weather just nudged wind speeds at Skyline Trail. Switching to the lake overlook route and updating shuttle timing.",
    timestamp: "09:40",
  },
  {
    sender: "user",
    message: "Need an afters option if the warehouse hits capacity.",
    timestamp: "18:20",
  },
  {
    sender: "ai",
    message:
      "Adding The Observatory Lounge as a backup—bands auto-switch colours, and rideshare tokens are pre-loaded.",
    timestamp: "18:20",
  },
]

export const demoExtensions: DemoExtension[] = [
  {
    id: "assemble-weather",
    name: "Assemble Weather Lens",
    description: "Hyperlocal sunrise/sunset, wind, swell, and UV checks every 3 minutes.",
    status: "live",
    latency: "650ms",
    poweredBy: "Assemble AI",
  },
  {
    id: "venue-capacity",
    name: "Live Venue Capacity",
    description: "Door counter + queue analytics feed fallback reservations and safety pings.",
    status: "live",
    latency: "420ms",
    poweredBy: "Waypoint Bands",
  },
  {
    id: "inventory-sync",
    name: "Inventory Sync",
    description: "Pulls thrift, rental, and ticket inventory so you never show up to sold-out racks.",
    status: "beta",
    latency: "890ms",
    poweredBy: "Assemble Commerce",
  },
  {
    id: "dietary-engine",
    name: "Dietary Engine",
    description: "Matches restaurants and bars to your crew’s allergies + goals, pushes table adjustments automatically.",
    status: "live",
    latency: "530ms",
    poweredBy: "Assemble AI",
  },
  {
    id: "ride-orchestrator",
    name: "Ride Orchestrator",
    description: "Coordinates shared rides, scooters, ferries, and parking allowances between stops.",
    status: "beta",
    latency: "760ms",
    poweredBy: "Waypoint Transit",
  },
]

export const demoProjects: DemoProject[] = [
  {
    id: "sunrise-club",
    name: "Sunrise Swim + Warehouse",
    summary: "Beach-to-warehouse itinerary with Assemble AI handling tides, thrift, and afters.",
    tags: ["Sunrise", "Warehouse", "Bands"],
    updatedAt: "7:02 AM",
    conversation: demoConversation,
  },
  {
    id: "campus-launch",
    name: "Campus Society Launch Night",
    summary: "Waypoint Uni verification, society mixers, and live band orchestration.",
    tags: ["Uni", "Societies"],
    updatedAt: "Mar 22",
    conversation: [
      {
        sender: "user",
        message: "Plan a campus welcome night that starts with a fair and ends with a silent disco.",
        timestamp: "16:10",
      },
      {
        sender: "ai",
        message:
          "Queued a society fair with verified .edu check-in, mapped budget food trucks, and lined up Bands for the silent disco finale.",
        timestamp: "16:11",
      },
      {
        sender: "user",
        message: "Need inclusive lighting cues for neurodiverse students.",
        timestamp: "16:12",
      },
      {
        sender: "ai",
        message:
          "Switching Bands to low-stimulus mode before the disco, adding quiet zones, and pushing notifications to staff.",
        timestamp: "16:12",
      },
      {
        sender: "ai",
        message:
          "Assemble Weather Lens just flagged light rain at 18:00. I’ve moved the fair canopy deliveries 45 minutes earlier.",
        timestamp: "16:18",
      },
    ],
  },
  {
    id: "weekender-escape",
    name: "Coastline Weekender",
    summary: "Two-day AI concierge trip with stay, hikes, and jazz supper.",
    tags: ["Travel", "Concierge"],
    updatedAt: "Yesterday",
    conversation: [
      {
        sender: "user",
        message: "Design a weekend escape with minimal planning overhead for 3 friends.",
        timestamp: "09:42",
      },
      {
        sender: "ai",
        message:
          "Pulling stays within 90 minutes of the city, adding a coastal trail, vintage lunch stop, and Sunday jazz supper.",
        timestamp: "09:42",
      },
      {
        sender: "user",
        message: "Budget cap $120 each, keep dietary notes in sync.",
        timestamp: "09:43",
      },
      {
        sender: "ai",
        message:
          "Locked lakehouse stay with split payments, vegetarian brunch on day two, and shuttle windows to avoid peak traffic.",
        timestamp: "09:43",
      },
    ],
  },
]
