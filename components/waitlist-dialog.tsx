"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { triggerConfetti } from "@/lib/confetti"

interface WaitlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: string
  initialCategories?: string[]
  initialCrewId?: string
}

const categoryOptions = [
  { label: "Nightlife", value: "nightlife" },
  { label: "Restaurants", value: "restaurant" },
  { label: "Cafés", value: "cafe" },
  { label: "Beaches", value: "beach" },
  { label: "Outdoors", value: "outdoor" },
  { label: "Events", value: "event" },
  { label: "Travel", value: "travel" },
  { label: "Shops & Retail", value: "retail" },
  { label: "Study / Cowork", value: "cowork" },
]

const interestOptions = [
  "Sunrise Swims",
  "Third-Wave Coffee",
  "Design Districts",
  "Jazz Nights",
  "Trail Runs",
  "Thrift Crawls",
  "Late-Night Eats",
  "Live Gigs",
]

export function WaitlistDialog({ open, onOpenChange, initialMode, initialCategories, initialCrewId }: WaitlistDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    city: "",
    ageRange: "",
    interests: [] as string[],
    budget: "",
    availability: "",
    mode: initialMode ?? "",
    categories: initialCategories ?? [],
    campus: "",
    degree: "",
    year: "",
    idealDays: "",
    crewId: initialCrewId ?? "",
  })

  const normalizedCategories = useMemo(() => {
    if (!initialCategories?.length) return []
    const mapping: Record<string, string> = {
      Nightlife: "nightlife",
      Restaurants: "restaurant",
      "Cafés": "cafe",
      Beaches: "beach",
      Outdoors: "outdoor",
      Events: "event",
      Travel: "travel",
      Shops: "retail",
      "Study/Cowork": "cowork",
      "Shops & Retail": "retail",
    }
    return initialCategories.map((item) => mapping[item] ?? item.toLowerCase())
  }, [initialCategories])

  useEffect(() => {
    if (!open) return

    setFormData((prev) => ({
      ...prev,
      mode: initialMode ?? prev.mode ?? "",
      categories: normalizedCategories.length ? normalizedCategories : prev.categories,
      crewId: initialCrewId ?? prev.crewId ?? "",
    }))
  }, [open, initialMode, normalizedCategories, initialCrewId])

  useEffect(() => {
    if (open) return
    setFormData({
      email: "",
      name: "",
      city: "",
      ageRange: "",
      interests: [],
      budget: "",
      availability: "",
      mode: initialMode ?? "",
      categories: normalizedCategories,
      campus: "",
      degree: "",
      year: "",
      idealDays: "",
      crewId: initialCrewId ?? "",
    })
  }, [open, initialMode, normalizedCategories, initialCrewId])

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((v) => v !== interest),
    }))
  }

  const handleCategoryToggle = (category: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Unable to join waitlist right now.")
      }

      await triggerConfetti()
      toast.success("You’re on the list. We’ll be in touch soon.")
      onOpenChange(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSubmitting(false)
    }
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
            <Label>Categories you want planned</Label>
            <div className="grid grid-cols-2 gap-2">
              {categoryOptions.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={formData.categories.includes(category.value)}
                    onCheckedChange={(checked) => handleCategoryToggle(category.value, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.value}`} className="text-sm">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interests (select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="text-sm">
                    {interest}
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
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Late Night">Late Night</SelectItem>
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
                <SelectItem value="Solo">Solo</SelectItem>
                <SelectItem value="Discover">Discover</SelectItem>
                <SelectItem value="Friends">Friends</SelectItem>
                <SelectItem value="Uni">Uni</SelectItem>
                <SelectItem value="Bands">Bands</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="campus">Campus (optional)</Label>
              <Input
                id="campus"
                value={formData.campus}
                onChange={(e) => setFormData((prev) => ({ ...prev, campus: e.target.value }))}
                placeholder="e.g. NYU, UCLA, UCL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                placeholder="2025"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree / Focus</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={(e) => setFormData((prev) => ({ ...prev, degree: e.target.value }))}
                placeholder="Design, CS, Business..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideal-days">Ideal day(s)</Label>
              <Input
                id="ideal-days"
                value={formData.idealDays}
                onChange={(e) => setFormData((prev) => ({ ...prev, idealDays: e.target.value }))}
                placeholder="Fridays, Sunday mornings..."
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Join Waitlist"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
