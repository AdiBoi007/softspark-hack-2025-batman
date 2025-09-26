import { Badge } from "@/components/ui/badge"
import { ShieldCheck, MapPin, Users, AlertTriangle } from "lucide-react"

const safetyFeatures = [
  {
    icon: ShieldCheck,
    label: "ID Verification",
  },
  {
    icon: MapPin,
    label: "Public Venues",
  },
  {
    icon: Users,
    label: "Live Check-ins",
  },
  {
    icon: AlertTriangle,
    label: "SOS",
  },
]

export function SafetyBar() {
  return (
    <section className="border-y border-border/40 bg-card/50 py-6">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-6">
          {safetyFeatures.map((feature) => (
            <Badge key={feature.label} variant="secondary" className="flex items-center gap-2 px-4 py-2">
              <feature.icon className="h-4 w-4" />
              {feature.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
