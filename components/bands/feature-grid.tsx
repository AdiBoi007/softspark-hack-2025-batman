import { Card, CardContent } from "@/components/ui/card"
import { Users2, Nfc, BarChart3, Sparkles, Bell, Building2 } from "lucide-react"

const features = [
  {
    icon: Users2,
    title: "Crew colour sync",
    description: "Beach meetups, campus societies, moonlit hikes — everyone glows on-budget.",
    detail:
      "Drop custom colour palettes per crew and reuse the bands season after season. One $40 purchase covers the full kit.",
  },
  {
    icon: Nfc,
    title: "Tap-to-enter",
    description: "No QR codes, no scanners. Tuck the reader into any doorway or tent flap.",
    detail:
      "NFC taps log attendance, welcome guests, and unlock sponsor perks. Hardware ships in a carry-on case and powers off USB.",
  },
  {
    icon: BarChart3,
    title: "Live spend intel",
    description: "See merch sell-outs, bar queues, and crew dwell time from a cheap tablet.",
    detail:
      "Operators watch heatmaps and conversion trails in real time, with instant exports for partners or campus compliance.",
  },
  {
    icon: Sparkles,
    title: "On-band moments",
    description: "Low-cost ways to surprise: sunrise breathing prompts, thrift bingo, silent disco cues.",
    detail:
      "Send timed challenges, sponsor drops, or gratitude pings without printing signage or hiring extra MCs.",
  },
  {
    icon: Bell,
    title: "Calm crew comms",
    description: "Bands buzz softly for stage changes, shuttle departures, or safety checks.",
    detail:
      "Cut PA chaos and WhatsApp threads. Attendees feel handheld while staff stay lean.",
  },
  {
    icon: Building2,
    title: "Plug into any vibe",
    description: "Sync lights at a rooftop jazz set, a study rave, or an outdoor market for less than a DJ’s tab.",
    detail:
      "Our bridge talks to DMX, Pioneer, and Ableton. Set it once; bands ride the beat all night.",
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 bg-card/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Hardware + software that pays for itself</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A $40 kit covers up to 500 guests and flips any plan — from beach sunrise to campus fair — into a connected experience.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-comfortaa text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-accent text-sm font-medium">{feature.description}</p>
                <p className="mt-3 text-sm text-muted-foreground">{feature.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
