"use client"

import { useEffect, useState, type ComponentType } from "react"
import { useRouter } from "next/navigation"
import { Command, Search, Sparkles, Wand2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickAction {
  id: string
  label: string
  description: string
  shortcut: string
  href: string
  icon: ComponentType<{ className?: string }>
}

const quickActions: QuickAction[] = [
  {
    id: "solo",
    label: "Start a Solo Journey",
    description: "Open the Journey Builder with your last vibe presets.",
    shortcut: "⇧⌘J",
    href: "/solo",
    icon: Wand2,
  },
  {
    id: "discover",
    label: "Join a Discover crew",
    description: "Filter live crews by category and compatibility.",
    shortcut: "⌘M",
    href: "/discover",
    icon: Sparkles,
  },
  {
    id: "friends",
    label: "Launch Friends planner",
    description: "Kick off polls, templates, and invite links in seconds.",
    shortcut: "⇧⌘F",
    href: "/friends",
    icon: Command,
  },
  {
    id: "explore",
    label: "Browse Explore feed",
    description: "Dive into live city signals, filters, and map view.",
    shortcut: "⌘E",
    href: "/explore",
    icon: Search,
  },
]

export function QuickActions() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <section className="py-20">
      <div className="container">
        <Card className="border-border/40 bg-card/60">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <Badge className="border border-border/50 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Quick actions
              </Badge>
              <CardTitle className="text-2xl text-foreground">Command the city from your keyboard</CardTitle>
              <p className="max-w-xl text-sm text-muted-foreground">
                Hit <kbd className="rounded border border-border/40 bg-background/80 px-1 py-0.5 text-xs">⌘K</kbd> anywhere to pull up the palette. Every action routes through Waypoint’s planners with context intact.
              </p>
            </div>
            <Button className="gap-2" variant="outline" onClick={() => setOpen(true)}>
              <Command className="h-4 w-4" />
              Open palette
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={() => router.push(action.href)}
                  className="group flex flex-col gap-3 rounded-2xl border border-border/40 bg-background/60 p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-border"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2 text-foreground">
                      <Icon className="h-4 w-4 text-accent" />
                      {action.label}
                    </span>
                    <span className="rounded border border-border/40 bg-background/60 px-1 py-0.5 font-mono text-[10px] uppercase tracking-[0.25em]">
                      {action.shortcut}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen} title="Waypoint command palette" description="Launch planners, crews, and modes instantly.">
        <CommandInput placeholder="Type an action or category" />
        <CommandList>
          <CommandEmpty>No matches right now.</CommandEmpty>
          <CommandGroup heading="Planners">
            {quickActions.map((action) => (
              <CommandItem
                key={`cmd-${action.id}`}
                onSelect={() => {
                  setOpen(false)
                  router.push(action.href)
                }}
              >
                <action.icon className="h-4 w-4" />
                <span>{action.label}</span>
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Support">
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push("/faq")
              }}
            >
              <Search className="h-4 w-4" />
              <span>Open FAQ</span>
              <CommandShortcut>?</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false)
                router.push("/uni")
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Join Uni waitlist</span>
              <CommandShortcut>U</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </section>
  )
}
