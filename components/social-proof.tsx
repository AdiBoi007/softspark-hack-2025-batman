"use client"

import { useEffect, useState } from "react"

const testimonials = [
  "Finally, a night out app that actually works",
  "Met my best friends through Discover mode",
  "The bands make finding your crew so easy",
  "AI planning is surprisingly good",
  "Never had a boring night since joining",
  "Safety features give me peace of mind",
]

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 border-y border-border/40">
      <div className="container">
        <div className="text-center">
          <p className="text-muted-foreground animate-fade-in">"{testimonials[currentIndex]}"</p>
        </div>
      </div>
    </section>
  )
}
