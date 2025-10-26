"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle } from "lucide-react"

export function FacultyRequestForm({ setOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    // Close modal after a delay
    setTimeout(() => setOpen(false), 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-foreground">Request Submitted!</h3>
        <p className="text-muted-foreground mt-2">Thank you. We will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full Name / Coaching Name</Label>
        <Input id="name" placeholder="e.g. John Doe / ABC Coaching" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact">Mobile Number / Email ID</Label>
        <Input id="contact" placeholder="e.g. 9876543210 or john.doe@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="e.g. Delhi, Pune" required />
      </div>

      <Separator className="my-2 bg-border/20" />

      <div className="grid gap-2">
        <Label htmlFor="subject">Faculty for Which Subject?</Label>
        <Input id="subject" placeholder="e.g. Polity, History, Economy" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Language</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Mode</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Gender Preference</Label>
        <RadioGroup defaultValue="any" name="gender" className="flex items-center gap-4 pt-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any" />
            <Label htmlFor="any">Any</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full mt-4 text-white" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  )
}
