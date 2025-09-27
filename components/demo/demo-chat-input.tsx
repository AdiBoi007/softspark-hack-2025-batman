"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp } from "lucide-react"

interface DemoChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function DemoChatInput({ onSend, disabled }: DemoChatInputProps) {
  const [value, setValue] = useState("")

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value.trim())
    setValue("")
  }

  return (
    <div className="mt-4 flex items-center gap-3 rounded-full border border-border/40 bg-background/80 px-3 py-2">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSend()
          }
        }}
        placeholder="Message Assemble AI…"
        className="border-none bg-transparent focus-visible:ring-0"
        disabled={disabled}
      />
      <Button
        size="icon"
        className="size-10 rounded-full bg-foreground text-background hover:bg-foreground/90"
        onClick={handleSend}
        disabled={disabled}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  )
}
