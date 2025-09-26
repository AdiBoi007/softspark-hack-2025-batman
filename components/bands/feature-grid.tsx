import { Card, CardContent } from "@/components/ui/card"
import { Users2, Nfc, BarChart3, Sparkles, Bell, Building2 } from "lucide-react"

const features = [
  {
    icon: Users2,
    title: "Group Colors",
    description: "Group colors make your crew visible in seconds.",
    detail: "When a group creates a plan, their bands automatically sync to the same color for instant recognition.",
  },
  {
    icon: Nfc,
    title: "Tap-to-Enter",
    description: "Tap your band at the door — no phones, no QR codes.",
    detail: "NFC-enabled bands provide seamless venue check-in with instant welcome messages on venue displays.",
  },
  {
    icon: BarChart3,
    title: "Live Insights",
    description: "Real-time crowd density, wait times, and group analytics.",
    detail: "Gate sensors track capacity and provide live updates to users and venue operators.",
  },
  {
    icon: Sparkles,
    title: "Icebreakers",
    description: "Icebreakers on-band: tiny prompts, big energy.",
    detail: "AI-generated prompts and challenges appear on band displays to encourage social interaction.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Vibrations for drinks ready, events, and friend requests.",
    detail: "Bands buzz to signal important moments without disrupting the flow of your night.",
  },
  {
    icon: Building2,
    title: "Venue Boost",
    description: "Sync the room with the DJ — pulsing bands to the beat.",
    detail: "Bands sync with music and lighting systems for immersive, venue-wide experiences.",
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 bg-card/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">What the bands do</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Smart wearables that transform how groups connect and venues operate
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
