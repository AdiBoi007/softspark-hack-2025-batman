import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Users, MapPin, Phone, Clock, Star, AlertTriangle, CheckCircle } from "lucide-react"

const safetyFeatures = [
  {
    icon: Shield,
    title: "ID Verification",
    description: "Government ID required for all users",
    details: "Every user must verify their identity with a government-issued photo ID before accessing the platform.",
  },
  {
    icon: Users,
    title: "Community Moderation",
    description: "24/7 human moderation team",
    details: "Our trained safety team reviews reports and takes action within minutes, not hours.",
  },
  {
    icon: MapPin,
    title: "Safe Venues Only",
    description: "Vetted public locations",
    details: "All venues are pre-screened for safety, lighting, security presence, and emergency access.",
  },
  {
    icon: Phone,
    title: "Emergency Support",
    description: "Instant help when you need it",
    details: "One-tap emergency contact with local authorities and our safety team.",
  },
  {
    icon: Clock,
    title: "Check-in System",
    description: "Automated safety check-ins",
    details: "Regular check-ins during events with escalation protocols if you don't respond.",
  },
  {
    icon: Star,
    title: "Rating System",
    description: "Community-driven safety scores",
    details: "Rate your experience and help keep the community safe for everyone.",
  },
]

const safetyTips = [
  {
    category: "Before You Go",
    tips: [
      "Share your plans with a trusted friend",
      "Check the venue location and reviews",
      "Ensure your phone is fully charged",
      "Have backup transportation planned",
    ],
  },
  {
    category: "During Your Night",
    tips: [
      "Stay with your group or match",
      "Don't leave drinks unattended",
      "Use our check-in feature regularly",
      "Trust your instincts - leave if uncomfortable",
    ],
  },
  {
    category: "If Something Goes Wrong",
    tips: [
      "Use the emergency button in the app",
      "Contact venue security immediately",
      "Report any incidents to our team",
      "Seek help from other patrons if needed",
    ],
  },
]

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-green-500/20 text-green-400">Safety First</Badge>
              <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-6xl">
                Your safety is our priority
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                We've built multiple layers of protection so you can focus on having fun and making genuine connections.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">How We Keep You Safe</h2>
              <p className="mt-4 text-lg text-muted-foreground">Comprehensive safety measures at every step</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {safetyFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                          <Icon className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{feature.details}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="font-comfortaa text-3xl font-bold tracking-tight sm:text-4xl">
                  Safety Tips & Guidelines
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">Best practices for a safe and enjoyable experience</p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {safetyTips.map((section, index) => (
                  <AccordionItem key={section.category} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {section.category}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 ml-8">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-20 bg-red-500/5">
          <div className="container">
            <Card className="max-w-2xl mx-auto border-red-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <CardTitle className="text-red-700">Emergency Contact</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  If you're in immediate danger, call local emergency services first (000 in Australia).
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Waypoint Safety Team:</p>
                  <p className="text-sm">24/7 Emergency Line: +61 1800 WAYPOINT</p>
                  <p className="text-sm">Email: safety@waypoint.app</p>
                  <p className="text-sm">In-app: Use the emergency button</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
