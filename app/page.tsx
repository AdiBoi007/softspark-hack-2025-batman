import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { SafetyBar } from "@/components/safety-bar"
import { TrustSafety } from "@/components/trust-safety"
import { FinalCTA } from "@/components/final-cta"
import { TrendingGrid } from "@/components/home/trending-grid"
import { SmartJourneysCarousel } from "@/components/home/smart-journeys-carousel"
import { ModeSwitchboard } from "@/components/home/mode-switchboard"
import { ImmersiveGallery } from "@/components/home/immersive-gallery"
import { InteractiveFlowDiagram } from "@/components/interactive-flow-diagram"
import { CitySignalPanel } from "@/components/home/city-signal-panel"
import { DiscoverCrewsSection } from "@/components/home/discover-crews"
import { FriendsPlanner } from "@/components/home/friends-planner"
import { QuickActions } from "@/components/home/quick-actions"
import { WaypointUniTeaser } from "@/components/home/waypoint-uni-teaser"
import { trendingByCategory, friendsTemplates } from "@/lib/waypoint-data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <SafetyBar />
        <TrendingGrid categories={trendingByCategory} />
        <SmartJourneysCarousel />
        <InteractiveFlowDiagram />
        <ImmersiveGallery />
        <ModeSwitchboard />
        <CitySignalPanel />
        <DiscoverCrewsSection />
        <FriendsPlanner templates={friendsTemplates} />
        <QuickActions />
        <WaypointUniTeaser />
        <TrustSafety />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
