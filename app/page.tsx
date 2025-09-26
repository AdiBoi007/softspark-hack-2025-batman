import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { SafetyBar } from "@/components/safety-bar"
import { DiscoverCarousel } from "@/components/discover-carousel"
import { BlindDateSection } from "@/components/blind-date-section"
import { FriendsPreview } from "@/components/friends-preview"
import { BandsTeaser } from "@/components/bands-teaser"
import { TrustSafety } from "@/components/trust-safety"
import { SocialProof } from "@/components/social-proof"
import { FinalCTA } from "@/components/final-cta"
import { EnhancedFeatures } from "@/components/enhanced-features"
import { PremiumStats } from "@/components/premium-stats"
import { PremiumTestimonials } from "@/components/premium-testimonials"
import { AdvancedVenueMap } from "@/components/advanced-venue-map"
import { PremiumCarousel } from "@/components/premium-carousel"
import { CircularTechDiagram } from "@/components/circular-tech-diagram"
import { EnhancedHowItWorks } from "@/components/enhanced-how-it-works"
import { RotatingVenueStats } from "@/components/rotating-venue-stats"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <SafetyBar />
        <PremiumStats />
        <CircularTechDiagram />
        <EnhancedHowItWorks />
        <EnhancedFeatures />
        <RotatingVenueStats />
        <PremiumCarousel />
        <DiscoverCarousel />
        <AdvancedVenueMap />
        <BlindDateSection />
        <FriendsPreview />
        <BandsTeaser />
        <PremiumTestimonials />
        <TrustSafety />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
