import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users2, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FriendsPreview() {
  return (
    <section className="py-20 bg-card/20">
      <div className="container">
        <Card className="mx-auto max-w-4xl">
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Users2 className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-comfortaa text-3xl font-bold tracking-tight">Plan with your crew</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Sync your friends with a link. AI balances vibes, budgets, timing.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/friends">
                Sync your friends
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
