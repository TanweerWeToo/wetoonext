"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle } from "lucide-react"

export function FacultyJoinForm({ setOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setOpen(false), 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-foreground">Application Submitted!</h3>
        <p className="text-muted-foreground mt-2">Thank you for your interest. We will review your application.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="e.g. Jane Smith" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contactInfo">Mobile or Email</Label>
          <Input id="contactInfo" placeholder="Your contact info" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferredLocation">Preferred Location</Label>
        <Input id="preferredLocation" placeholder="e.g. Mukherjee Nagar, Delhi or Online" required />
      </div>

      <Separator className="my-2 bg-border/20" />

      <div className="grid gap-2">
        <Label htmlFor="teachingSubject">Primary Subject for Teaching</Label>
        <Input id="teachingSubject" placeholder="e.g. Geography, International Relations" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cseAttempts">UPSC CSE Attempts (Mains/Interview)</Label>
        <Input id="cseAttempts" placeholder="e.g. 3 Mains, 1 Interview" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="experience">Teaching Experience</Label>
        <Textarea id="experience" placeholder="Describe your teaching experience (years, institutes, etc.)" required />
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
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full mt-4 text-white" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}
