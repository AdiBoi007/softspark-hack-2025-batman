import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, BarChart, Megaphone } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Faster doors",
    description: "Reduced friction at entry, faster throughput",
  },
  {
    icon: Users,
    title: "Higher engagement",
    description: "Interactive games keep people energized",
  },
  {
    icon: BarChart,
    title: "Real-time data",
    description: "Live crowding, demographics, engagement insights",
  },
  {
    icon: Megaphone,
    title: "Marketing moments",
    description: "Welcome messages, targeted promotions",
  },
]

export function VenueValueBanner() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 bg-accent/20 text-accent text-lg px-4 py-2">Venue Benefits</Badge>
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">
            Transform your venue operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Automated check-in, engagement boost, data insights, and marketing moments
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-comfortaa text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
