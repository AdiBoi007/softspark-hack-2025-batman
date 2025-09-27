import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, BarChart, Megaphone } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Launch in under an hour",
    description: "Self install, no AV crew, no venue rewiring. A single $40 purchase covers bands, reader puck, dashboards, and shipping.",
  },
  {
    icon: Users,
    title: "Do more with tiny teams",
    description: "Run beach pop-ups, club residencies, campus nights, and weekender hikes with the same reusable kit.",
  },
  {
    icon: BarChart,
    title: "Proof of impact on tap",
    description: "Real-time density, spend, and dwell time reports to secure sponsors and repeat budgets.",
  },
  {
    icon: Megaphone,
    title: "Monetise gently",
    description: "Bands unlock partner perks, scavenger hunts, or local deals without printing or payroll costs.",
  },
]

export function VenueValueBanner() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 bg-accent/20 text-accent text-lg px-4 py-2">Venue Benefits</Badge>
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">
            Premium energy, thrift-store pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most crews recoup the $40 kit with one sponsor shout-out. We keep the back-of-house effortless so you can run more nights.
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
