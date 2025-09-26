import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, MapPin, Users, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "ID checks",
    description: "Verified profiles for all users",
  },
  {
    icon: MapPin,
    title: "Public venues",
    description: "Only licensed, public locations",
  },
  {
    icon: Users,
    title: "Live check-ins",
    description: "Real-time location sharing",
  },
  {
    icon: AlertTriangle,
    title: "SOS",
    description: "One-tap emergency assistance",
  },
]

export function TrustSafety() {
  return (
    <section id="why-trust" className="py-20 bg-card/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">Trust & Safety</h2>
          <p className="mt-4 text-lg text-muted-foreground">Your safety is our priority, every step of the way</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {safetyFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-comfortaa text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/safety">
              Learn more about safety
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
