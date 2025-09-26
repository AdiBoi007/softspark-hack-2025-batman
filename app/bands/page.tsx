import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { BandsHero } from "@/components/bands/bands-hero"
import { FeatureGrid } from "@/components/bands/feature-grid"
import { VenueValueBanner } from "@/components/bands/venue-value-banner"
import { BandsDemo } from "@/components/bands/bands-demo"

export default function BandsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <BandsHero />
        <FeatureGrid />
        <VenueValueBanner />
        <BandsDemo />
      </main>
      <Footer />
    </div>
  )
}
