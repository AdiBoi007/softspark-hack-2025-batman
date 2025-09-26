import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Users2, Calendar } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us your vibe",
    description: "Radius, budget, vibes, availability",
  },
  {
    icon: Users2,
    title: "Pick your mode",
    description: "Friends / Discover / Blind Date",
  },
  {
    icon: Calendar,
    title: "Nightflow unlocked",
    description: "Pre-drinks → main → afters, timed & booked",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Three simple steps to your perfect night out</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <step.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-comfortaa text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent/20 md:flex">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
