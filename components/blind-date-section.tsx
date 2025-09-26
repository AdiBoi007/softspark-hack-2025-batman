import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartHandshake, ArrowRight } from "lucide-react"
import Link from "next/link"

export function BlindDateSection() {
  return (
    <section className="py-20">
      <div className="container">
        <Card className="mx-auto max-w-4xl">
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <HeartHandshake className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-comfortaa text-3xl font-bold tracking-tight">Blind dates, reimagined</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Opt into 1:1 (or double) blind dates. AI plans, you vibe.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/blind-date">
                Try blind dating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
