export type PlaceCategory =
  | "nightlife"
  | "restaurant"
  | "cafe"
  | "beach"
  | "outdoor"
  | "event"
  | "travel"
  | "retail"
  | "cowork"
  | "uni"

export type ChatInsertType = "eventCard" | "itinerary" | "poll" | "rsvp" | "smartTimes"

export type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt: string
  inserts?: ChatInsertType[]
  eventCards?: EventCard[]
  itinerary?: ItineraryStep[]
  poll?: PollData
  smartTimes?: SmartTimeSuggestion[]
}

export type EventCard = {
  id: string
  title: string
  category: PlaceCategory
  area: string
  distKm?: number
  tags?: string[]
  budget?: "<30" | "30-60" | "60-100" | "100+"
  open?: string
  slot?: {
    start: string
    end?: string
  }
  rating?: number
  cta?: "add" | "join" | "book" | "details"
  meta?: string
}

export type ItineraryStep = {
  t: string
  label: string
  meta?: string
}

export type PollOption = {
  id: string
  label: string
  votes: number
  total: number
}

export type PollData = {
  title: string
  options: PollOption[]
  kind: "time" | "venue"
}

export type SmartTimeSuggestion = {
  slot: string
  reason: string
}

export type SavedContext = {
  id: string
  title: string
  timestamp: string
  summary: string
}

export const suggestionPrompts = [
  "Beach sunrise + best coffee within 3km",
  "Discover crew for rooftop cocktails Friday",
  "Friends plan: thrift crawl then ramen Saturday",
  "Study group on campus 2h tomorrow",
  "Weekend coastal hike + brunch itinerary",
]

export const savedContexts: SavedContext[] = [
  {
    id: "ctx-1",
    title: "Warehouse sunrise",
    timestamp: "Today 07:02",
    summary: "Beach dip → thrift crawl → warehouse set",
  },
  {
    id: "ctx-2",
    title: "Campus welcome night",
    timestamp: "Mar 22",
    summary: "Society fair + silent disco",
  },
  {
    id: "ctx-3",
    title: "Coastline weekender",
    timestamp: "Mar 10",
    summary: "Stay, hike, jazz supper",
  },
  {
    id: "ctx-4",
    title: "Study crawl",
    timestamp: "Feb 28",
    summary: "Cafés with late seats",
  },
  {
    id: "ctx-5",
    title: "Retail pop-up",
    timestamp: "Feb 18",
    summary: "Thrift + ramen + afters",
  },
]

export const seededMessages: ChatMessage[] = [
  {
    id: "m-1",
    role: "user",
    content: "Plan a Saturday coastal hike + brunch within 5km, $30–$60, 3 friends.",
    createdAt: "08:05",
  },
  {
    id: "m-2",
    role: "assistant",
    content:
      "Here’s a coastal Saturday that keeps travel light and budget on target. I’m holding tables and watching weather in the background.",
    createdAt: "08:05",
    inserts: ["eventCard", "itinerary", "smartTimes"],
    eventCards: [
      {
        id: "ec-1",
        title: "Bondi Coastal Walk — South End",
        category: "outdoor",
        area: "Bondi",
        distKm: 4.6,
        tags: ["Sunrise", "Low tide", "Pet-friendly"],
        budget: "<30",
        open: "Trail open",
        cta: "add",
        meta: "Trailhead meetup • 08:00",
      },
      {
        id: "ec-2",
        title: "Lox & Bagel Co.",
        category: "restaurant",
        area: "North Bondi",
        distKm: 1.2,
        tags: ["Vegan options", "Bookings held"],
        budget: "30-60",
        slot: { start: "10:15" },
        rating: 4.8,
        cta: "book",
        meta: "Table for 4 reserved",
      },
    ],
    itinerary: [
      { t: "08:00", label: "Meet at Bondi Coastal Walk — South End", meta: "Trail open • Bottled water on kiosk" },
      { t: "09:30", label: "Coffee at Drift Espresso", meta: "Walk-in seats held" },
      { t: "10:15", label: "Brunch at Lox & Bagel Co.", meta: "$35pp set menu" },
      { t: "11:45", label: "Seaside stroll + sun chairs", meta: "Optional" },
    ],
    smartTimes: [
      { slot: "07:45", reason: "Sunrise 07:12 + low wind" },
      { slot: "09:30", reason: "Coffee crowd quiet" },
      { slot: "10:15", reason: "Brunch table held" },
    ],
  },
  {
    id: "m-3",
    role: "user",
    content: "Find a Discover crew for rooftop cocktails Friday 8–10pm, $60–$100.",
    createdAt: "12:14",
  },
  {
    id: "m-4",
    role: "assistant",
    content: "Three curated crews match your vibe and timing. Tap join to reserve a spot.",
    createdAt: "12:14",
    inserts: ["eventCard"],
    eventCards: [
      {
        id: "crew-1",
        title: "Skyline Spritz Society",
        category: "nightlife",
        area: "CBD Rooftop",
        distKm: 2.1,
        tags: ["7/8 matched", "Dress smart"],
        budget: "60-100",
        slot: { start: "20:00", end: "22:00" },
        cta: "join",
        meta: "Hosted by Amelie • capacity 8",
      },
      {
        id: "crew-2",
        title: "Golden Hour Negronis",
        category: "nightlife",
        area: "Chippendale",
        distKm: 3.4,
        tags: ["6/8 matched", "Live DJ"],
        budget: "60-100",
        slot: { start: "19:30", end: "22:30" },
        cta: "join",
        meta: "Hosted by Marcus • capacity 12",
      },
      {
        id: "crew-3",
        title: "Rooftop Vinyl Social",
        category: "nightlife",
        area: "Surry Hills",
        distKm: 1.8,
        tags: ["8/10 matched", "Vinyl trade"],
        budget: "60-100",
        slot: { start: "20:30", end: "23:00" },
        cta: "join",
        meta: "Hosted by Tessa • capacity 10",
      },
    ],
  },
  {
    id: "m-5",
    role: "user",
    content: "Campus study group 2 hours tomorrow, USYD.",
    createdAt: "17:05",
  },
  {
    id: "m-6",
    role: "assistant",
    content:
      "Here’s a verified on-campus slot with a quiet room and society connection. I’ll keep it synced with your calendars.",
    createdAt: "17:05",
    inserts: ["eventCard", "smartTimes", "poll"],
    eventCards: [
      {
        id: "uni-1",
        title: "USYD Study Collective — Quiet Wing",
        category: "uni",
        area: "Fisher Library L4",
        distKm: 0.4,
        tags: ["Campus verified", "Power + whiteboard"],
        slot: { start: "14:00", end: "16:00" },
        cta: "add",
        meta: "Hosted by Jenny (Society Lead)",
      },
    ],
    smartTimes: [
      { slot: "13:30", reason: "Calendar gap for everyone" },
      { slot: "14:00", reason: "Room holds until 16:30" },
      { slot: "15:00", reason: "Backup time if labs run late" },
    ],
    poll: {
      title: "Need to shift the start time?",
      kind: "time",
      options: [
        { id: "opt-1", label: "13:30", votes: 3, total: 5 },
        { id: "opt-2", label: "14:00", votes: 5, total: 5 },
        { id: "opt-3", label: "15:00", votes: 1, total: 5 },
      ],
    },
  },
]

export const suggestionResponses: Record<string, { user: ChatMessage; assistant: ChatMessage }> = {
  "Beach sunrise + best coffee within 3km": {
    user: {
      id: "sg-1-u",
      role: "user",
      content: "Beach sunrise + best coffee within 3km",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    assistant: {
      id: "sg-1-a",
      role: "assistant",
      content: "Locked sunrise dip and the highest-rated coffee cart nearby. Want me to add towels or rides?",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inserts: ["eventCard"],
      eventCards: [
        {
          id: "sg-beach-1",
          title: "Bronte Rock Pool",
          category: "beach",
          area: "Bronte",
          distKm: 2.8,
          tags: ["Sunrise 06:12", "Low tide"],
          budget: "<30",
          cta: "add",
        },
        {
          id: "sg-coffee-1",
          title: "Little Riptide Cart",
          category: "cafe",
          area: "Bronte",
          distKm: 0.3,
          tags: ["Single origin", "Pastry hold"],
          budget: "<30",
          cta: "add",
        },
      ],
    },
  },
}
