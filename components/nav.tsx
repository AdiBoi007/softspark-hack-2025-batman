"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { WaitlistDialog } from "@/components/waitlist-dialog"

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  const navItems = [
    { href: "/explore", label: "Explore" },
    { href: "/solo", label: "Solo" },
    { href: "/discover", label: "Discover" },
    { href: "/friends", label: "Friends" },
    { href: "/assistant", label: "AI" },
    { href: "/demo", label: "Demo" },
    { href: "/uni", label: "Uni" },
    { href: "/bands", label: "Bands" },
    { href: "/safety", label: "Safety" },
    { href: "/faq", label: "FAQ" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-comfortaa text-xl font-bold tracking-tight">Waypoint</span>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground/70 sm:inline">Connection Engine</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => setWaitlistOpen(true)}
          >
            Join the Beta
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4"
                  onClick={() => {
                    setIsOpen(false)
                    setWaitlistOpen(true)
                  }}
                >
                  Join the Beta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} initialMode="Discover" />
    </nav>
  )
}
