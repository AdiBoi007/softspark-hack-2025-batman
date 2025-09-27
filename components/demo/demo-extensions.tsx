import { Badge } from "@/components/ui/badge"
import type { DemoExtension } from "@/lib/demo-showcase"
import { Zap, Check, FlaskConical } from "lucide-react"

interface DemoExtensionsProps {
  extensions: DemoExtension[]
}

export function DemoExtensions({ extensions }: DemoExtensionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge className="border border-border/40 bg-background/60 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Assemble AI extensions
          </Badge>
          <p className="mt-2 text-sm text-muted-foreground">
            Every planner call wires into these low-latency microservices.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {extensions.map((extension) => (
          <div key={extension.id} className="rounded-2xl border border-border/40 bg-background/60 p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-foreground">{extension.name}</h4>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${
                  extension.status === "live"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-purple-500/10 text-purple-200"
                }`}
              >
                {extension.status === "live" ? <Check className="h-3 w-3" /> : <FlaskConical className="h-3 w-3" />}
                {extension.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{extension.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Zap className="h-3 w-3" /> {extension.latency}
              </span>
              <span>{extension.poweredBy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
