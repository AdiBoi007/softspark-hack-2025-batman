"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface WaitlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    city: "",
    ageRange: "",
    vibes: [] as string[],
    budget: "",
    availability: "",
    mode: "",
  })

  const vibeOptions = [
    "Rooftop",
    "Cocktails",
    "Techno",
    "Hip-Hop",
    "Live Music",
    "Dive Bars",
    "Chill Pubs",
    "Late-night Eats",
  ]

  const handleVibeChange = (vibe: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      vibes: checked ? [...prev.vibes, vibe] : prev.vibes.filter((v) => v !== vibe),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call
    console.log("Waitlist submission:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-comfortaa">Join the Beta</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Age Range</Label>
            <Select
              value={formData.ageRange}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, ageRange: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-21">18-21</SelectItem>
                <SelectItem value="22-26">22-26</SelectItem>
                <SelectItem value="27-34">27-34</SelectItem>
                <SelectItem value="35+">35+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Vibes (select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2">
              {vibeOptions.map((vibe) => (
                <div key={vibe} className="flex items-center space-x-2">
                  <Checkbox
                    id={vibe}
                    checked={formData.vibes.includes(vibe)}
                    onCheckedChange={(checked) => handleVibeChange(vibe, checked as boolean)}
                  />
                  <Label htmlFor={vibe} className="text-sm">
                    {vibe}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Budget</Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<$30">Under $30</SelectItem>
                <SelectItem value="$30-$60">$30-$60</SelectItem>
                <SelectItem value="$60-$100">$60-$100</SelectItem>
                <SelectItem value="$100+">$100+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Availability</Label>
            <Select
              value={formData.availability}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tonight">Tonight</SelectItem>
                <SelectItem value="This Weekend">This Weekend</SelectItem>
                <SelectItem value="Next Week">Next Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mode</Label>
            <Select value={formData.mode} onValueChange={(value) => setFormData((prev) => ({ ...prev, mode: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friends">Friends</SelectItem>
                <SelectItem value="Discover">Discover</SelectItem>
                <SelectItem value="Blind Date">Blind Date</SelectItem>
                <SelectItem value="Bands">Bands</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Join Waitlist
          </Button>

          <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
