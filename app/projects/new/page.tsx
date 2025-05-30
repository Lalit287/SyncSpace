"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Upload, X, Target, Code, Palette, Database, Smartphone, Globe, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

const skillCategories = {
  Frontend: ["React", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  Backend: ["Node.js", "Python", "Java", "Go", "PHP", "Ruby", "C#"],
  Mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
  Database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
  DevOps: ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD"],
  Design: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"],
  Data: ["Machine Learning", "Data Science", "Python", "R", "TensorFlow"],
  Other: ["Blockchain", "IoT", "AR/VR", "Game Development", "Cybersecurity"],
}

const hackathons = [
  { id: "ai-challenge", name: "AI Innovation Challenge", date: "March 15-17, 2024" },
  { id: "sustainable-tech", name: "Sustainable Tech Hackathon", date: "April 5-7, 2024" },
  { id: "fintech-revolution", name: "FinTech Revolution", date: "April 20-22, 2024" },
  { id: "health-tech", name: "HealthTech Innovation", date: "May 10-12, 2024" },
  { id: "general", name: "General Project (No specific hackathon)", date: "" },
]

const teamRoles = [
  { id: "frontend", label: "Frontend Developer", icon: Code, color: "bg-blue-500" },
  { id: "backend", label: "Backend Developer", icon: Database, color: "bg-green-500" },
  { id: "mobile", label: "Mobile Developer", icon: Smartphone, color: "bg-purple-500" },
  { id: "designer", label: "UI/UX Designer", icon: Palette, color: "bg-pink-500" },
  { id: "fullstack", label: "Full Stack Developer", icon: Globe, color: "bg-orange-500" },
  { id: "devops", label: "DevOps Engineer", icon: Zap, color: "bg-yellow-500" },
  { id: "data", label: "Data Scientist", icon: Target, color: "bg-indigo-500" },
]

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hackathon: "",
    requiredSkills: [] as string[],
    teamRoles: [] as string[],
    teamSize: [4],
    timeline: "",
    difficulty: "",
    projectType: "",
    goals: "",
    resources: "",
    communication: "discord",
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter((s) => s !== skill)
        : [...prev.requiredSkills, skill],
    }))
  }

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      teamRoles: prev.teamRoles.includes(role) ? prev.teamRoles.filter((r) => r !== role) : [...prev.teamRoles, role],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/projects")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
          <p className="text-muted-foreground">
            Share your project idea and find the perfect team members to bring it to life.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Tell us about your project idea</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your project title..."
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, its goals, and what makes it unique..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hackathon">Target Hackathon</Label>
                    <Select
                      value={formData.hackathon}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, hackathon: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hackathon" />
                      </SelectTrigger>
                      <SelectContent>
                        {hackathons.map((hackathon) => (
                          <SelectItem key={hackathon.id} value={hackathon.id}>
                            <div>
                              <div className="font-medium">{hackathon.name}</div>
                              {hackathon.date && <div className="text-xs text-muted-foreground">{hackathon.date}</div>}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="2-3-months">2-3 Months</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner Friendly</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-type">Project Type</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="mobile-app">Mobile Application</SelectItem>
                        <SelectItem value="desktop-app">Desktop Application</SelectItem>
                        <SelectItem value="api">API/Backend Service</SelectItem>
                        <SelectItem value="ai-ml">AI/ML Project</SelectItem>
                        <SelectItem value="blockchain">Blockchain/Web3</SelectItem>
                        <SelectItem value="iot">IoT Project</SelectItem>
                        <SelectItem value="game">Game Development</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Requirements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Team Requirements</CardTitle>
                <CardDescription>Specify what kind of team members you're looking for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Required Roles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {teamRoles.map((role) => (
                      <div
                        key={role.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.teamRoles.includes(role.id)
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        }`}
                        onClick={() => handleRoleToggle(role.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${role.color} flex items-center justify-center`}>
                            <role.icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-sm">{role.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Team Size</Label>
                  <div className="px-3">
                    <Slider
                      value={formData.teamSize}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, teamSize: value }))}
                      max={10}
                      min={2}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>2 people</span>
                      <span>{formData.teamSize[0]} people total</span>
                      <span>10 people</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communication">Preferred Communication</Label>
                  <Select
                    value={formData.communication}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, communication: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select communication method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="in-app">In-app messaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Required Skills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>Select the technologies and skills needed for this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={formData.requiredSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-accent/80 transition-colors"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Provide more context about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="goals">Project Goals & Success Metrics</Label>
                  <Textarea
                    id="goals"
                    placeholder="What do you hope to achieve? How will you measure success?"
                    value={formData.goals}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resources">Available Resources</Label>
                  <Textarea
                    id="resources"
                    placeholder="What resources do you already have? (APIs, datasets, design assets, etc.)"
                    value={formData.resources}
                    onChange={(e) => setFormData((prev) => ({ ...prev, resources: e.target.value }))}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>Project Assets (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload mockups, wireframes, or reference materials
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </Label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files</Label>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end gap-4"
          >
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90">
              {isSubmitting ? "Creating Project..." : "Create Project"}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
