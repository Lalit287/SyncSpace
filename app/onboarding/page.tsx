"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, ArrowLeft, Check, Github, Linkedin, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST APIs",
  "Machine Learning",
  "AI",
  "Data Science",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Blockchain",
  "Web3",
  "DevOps",
  "Cybersecurity",
]

const interests = [
  "Web Development",
  "Mobile Development",
  "AI/Machine Learning",
  "Data Science",
  "Game Development",
  "Blockchain/Web3",
  "IoT",
  "Cybersecurity",
  "DevOps",
  "Cloud Computing",
  "AR/VR",
  "Fintech",
  "Healthcare Tech",
  "EdTech",
  "E-commerce",
  "Social Impact",
  "Climate Tech",
  "Robotics",
]

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3-5 years)" },
  { value: "expert", label: "Expert (5+ years)" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    experience: "",
    selectedSkills: [] as string[],
    selectedInterests: [] as string[],
    skillLevels: {} as Record<string, number>,
    github: "",
    linkedin: "",
    portfolio: "",
    availability: [20],
    hackathonExperience: "",
    teamPreference: "",
    goals: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter((i) => i !== interest)
        : [...prev.selectedInterests, interest],
    }))
  }

  const updateSkillLevel = (skill: string, level: number) => {
    setFormData((prev) => ({
      ...prev,
      skillLevels: { ...prev.skillLevels, [skill]: level },
    }))
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <motion.div
              className="bg-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Tell us about yourself</CardTitle>
                    <CardDescription>Let's start with some basic information to set up your profile.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself, your passion for technology, and what drives you..."
                        value={formData.bio}
                        onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your level" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {/* Step 2: Skills */}
              {currentStep === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>What are your skills?</CardTitle>
                    <CardDescription>Select the technologies and skills you're proficient in.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={formData.selectedSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-accent/80 transition-colors"
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {formData.selectedSkills.length > 0 && (
                      <div className="space-y-4">
                        <Label>Rate your proficiency (1-5)</Label>
                        {formData.selectedSkills.map((skill) => (
                          <div key={skill} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{skill}</span>
                              <span className="text-sm text-muted-foreground">
                                {formData.skillLevels[skill] || 1}/5
                              </span>
                            </div>
                            <Slider
                              value={[formData.skillLevels[skill] || 1]}
                              onValueChange={(value) => updateSkillLevel(skill, value[0])}
                              max={5}
                              min={1}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </>
              )}

              {/* Step 3: Interests */}
              {currentStep === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>What interests you?</CardTitle>
                    <CardDescription>Choose the domains and technologies you're passionate about.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant={formData.selectedInterests.includes(interest) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-accent/80 transition-colors"
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </>
              )}

              {/* Step 4: Social Links */}
              {currentStep === 4 && (
                <>
                  <CardHeader>
                    <CardTitle>Connect your profiles</CardTitle>
                    <CardDescription>Link your professional profiles to showcase your work.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="github" className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          GitHub Profile
                        </Label>
                        <Input
                          id="github"
                          placeholder="https://github.com/username"
                          value={formData.github}
                          onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Portfolio Website
                        </Label>
                        <Input
                          id="portfolio"
                          placeholder="https://yourportfolio.com"
                          value={formData.portfolio}
                          onChange={(e) => setFormData((prev) => ({ ...prev, portfolio: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {/* Step 5: Preferences */}
              {currentStep === 5 && (
                <>
                  <CardHeader>
                    <CardTitle>Final preferences</CardTitle>
                    <CardDescription>Tell us about your availability and team preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Weekly availability (hours)</Label>
                        <div className="px-3">
                          <Slider
                            value={formData.availability}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, availability: value }))}
                            max={40}
                            min={5}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>5 hours</span>
                            <span>{formData.availability[0]} hours/week</span>
                            <span>40 hours</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hackathon-experience">Hackathon Experience</Label>
                        <Select
                          value={formData.hackathonExperience}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, hackathonExperience: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="first-time">First-time participant</SelectItem>
                            <SelectItem value="few-hackathons">Participated in 2-5 hackathons</SelectItem>
                            <SelectItem value="experienced">Experienced (5+ hackathons)</SelectItem>
                            <SelectItem value="veteran">Veteran (10+ hackathons)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="team-preference">Team Size Preference</Label>
                        <Select
                          value={formData.teamPreference}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, teamPreference: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Preferred team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo projects</SelectItem>
                            <SelectItem value="small">Small teams (2-3 people)</SelectItem>
                            <SelectItem value="medium">Medium teams (4-5 people)</SelectItem>
                            <SelectItem value="large">Large teams (6+ people)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goals">What are your goals?</Label>
                        <Textarea
                          id="goals"
                          placeholder="What do you hope to achieve through hackathons and team collaborations?"
                          value={formData.goals}
                          onChange={(e) => setFormData((prev) => ({ ...prev, goals: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between p-6 pt-0">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-accent hover:bg-accent/90"
                >
                  {isLoading ? (
                    "Setting up..."
                  ) : currentStep === totalSteps ? (
                    <>
                      <Check className="h-4 w-4" />
                      Complete Setup
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
