"use client"

import { useEffect, useState } from "react"

import type { DemoConversationTurn } from "@/lib/demo-showcase"

interface DemoConversationProps {
  turns: DemoConversationTurn[]
}

export function DemoConversation({ turns }: DemoConversationProps) {
  const [visibleTurns, setVisibleTurns] = useState<DemoConversationTurn[]>([])

  useEffect(() => {
    setVisibleTurns([])
    let index = 0
    const interval = setInterval(() => {
      index += 1
      setVisibleTurns((prev) => turns.slice(0, index))
      if (index === turns.length) {
        clearInterval(interval)
      }
    }, 1600)
    return () => clearInterval(interval)
  }, [turns])

  return (
    <div className="flex flex-col gap-3">
      {visibleTurns.map((turn, index) => (
        <div
          key={`${turn.timestamp}-${turn.message}`}
          className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-sm transition-all duration-300 ${
            turn.sender === "ai"
              ? "self-start bg-emerald-500/10 text-emerald-100"
              : "self-end bg-foreground text-background"
          }`}
          style={{ opacity: 0.2 + (index + 1) / visibleTurns.length }}
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] opacity-70">
            <span>{turn.sender === "ai" ? "Assemble AI" : "You"}</span>
            <span>{turn.timestamp}</span>
          </div>
          <p className="mt-2 text-sm">{turn.message}</p>
        </div>
      ))}
    </div>
  )
}
