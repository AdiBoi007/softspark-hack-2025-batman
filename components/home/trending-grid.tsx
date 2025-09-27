import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TrendingCategory } from "@/lib/waypoint-data"

const timeLabels: Record<TrendingCategory["timeOfDay"], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  late: "Late night",
}

interface TrendingGridProps {
  categories: TrendingCategory[]
}

export function TrendingGrid({ categories }: TrendingGridProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col gap-4 text-center">
          <Badge className="mx-auto w-fit border border-border/50 bg-background/60 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Explore everything
          </Badge>
          <h2 className="font-comfortaa text-3xl font-semibold tracking-tight sm:text-4xl">Trending by category</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Eight lanes. One engine. Tap any category to jump into curated filters and live availability.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.slug}
              className="group border-border/40 bg-card/50 transition-transform duration-300 hover:-translate-y-1 hover:border-border"
            >
              <CardHeader className="space-y-3">
                <Badge variant="secondary" className={`w-fit border border-border/30 ${category.accent}`}>
                  {category.title}
                </Badge>
                <CardTitle className="text-xl">{category.summary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{category.highlight}</p>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                  <span>Tap to filter</span>
                  <span>{timeLabels[category.timeOfDay]}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
