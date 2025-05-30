"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Edit,
  Plus,
  X,
  Star,
  Trophy,
  Target,
  Code,
  Palette,
  Database,
  Smartphone,
  Brain,
  Shield,
  Camera,
  Save,
  GraduationCap,
  Briefcase,
  Heart,
  Award,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react"

// Mock user data
const userData = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  university: "Stanford University",
  major: "Computer Science",
  graduationYear: "2024",
  bio: "Passionate full-stack developer with a love for creating innovative solutions. Experienced in React, Node.js, and cloud technologies. Always eager to learn new technologies and collaborate on exciting projects.",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=300&width=800",
  joinedDate: "January 2023",
  website: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  stats: {
    projects: 12,
    connections: 156,
    hackathons: 8,
    communities: 5,
  },
}

const skillCategories = [
  {
    name: "Programming Languages",
    icon: Code,
    color: "bg-blue-500",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "Go"],
  },
  {
    name: "Frontend",
    icon: Palette,
    color: "bg-pink-500",
    skills: ["React", "Vue.js", "Angular", "HTML/CSS", "Tailwind CSS"],
  },
  {
    name: "Backend",
    icon: Database,
    color: "bg-green-500",
    skills: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB"],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    color: "bg-purple-500",
    skills: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    name: "AI/ML",
    icon: Brain,
    color: "bg-orange-500",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API"],
  },
  {
    name: "DevOps",
    icon: Shield,
    color: "bg-red-500",
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD", "Terraform"],
  },
]

const interests = [
  "Artificial Intelligence",
  "Web Development",
  "Mobile Apps",
  "Blockchain",
  "Game Development",
  "IoT",
  "Cybersecurity",
  "Data Science",
  "Cloud Computing",
  "Open Source",
]

const qualities = [
  "Team Player",
  "Problem Solver",
  "Creative Thinker",
  "Quick Learner",
  "Detail Oriented",
  "Leadership",
  "Communication",
  "Adaptable",
  "Innovative",
  "Reliable",
]

const achievements = [
  {
    id: 1,
    title: "Hackathon Winner",
    description: "1st place at TechCrunch Disrupt Hackathon 2023",
    date: "Oct 2023",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    id: 2,
    title: "Open Source Contributor",
    description: "Contributed to 15+ open source projects",
    date: "2023",
    icon: Github,
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Community Leader",
    description: "Moderator of React Developers Community",
    date: "2023",
    icon: Users,
    color: "text-blue-500",
  },
  {
    id: 4,
    title: "Mentor",
    description: "Mentored 20+ junior developers",
    date: "2023",
    icon: Heart,
    color: "text-red-500",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [editData, setEditData] = useState(userData)
  const [newSkill, setNewSkill] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newQuality, setNewQuality] = useState("")

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && selectedCategory) {
      // Add skill logic here
      setNewSkill("")
      setSelectedCategory("")
    }
  }

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      // Add interest logic here
      setNewInterest("")
    }
  }

  const handleAddQuality = () => {
    if (newQuality.trim()) {
      // Add quality logic here
      setNewQuality("")
    }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="absolute inset-0 bg-black/20"></div>
        {isEditing && (
          <Button variant="secondary" size="icon" className="absolute top-4 right-4">
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8"
        >
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{userData.name[0]}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="secondary" size="icon" className="absolute -bottom-2 -right-2">
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">@{userData.username}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {userData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {userData.joinedDate}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "bg-accent hover:bg-accent/90" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{userData.stats.projects}</div>
              <p className="text-sm text-muted-foreground">Projects</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{userData.stats.connections}</div>
              <p className="text-sm text-muted-foreground">Connections</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{userData.stats.hackathons}</div>
              <p className="text-sm text-muted-foreground">Hackathons</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">{userData.stats.communities}</div>
              <p className="text-sm text-muted-foreground">Communities</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={editData.name}
                            onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={editData.phone}
                            onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editData.location}
                            onChange={(e) => setEditData((prev) => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="university">University</Label>
                          <Input
                            id="university"
                            value={editData.university}
                            onChange={(e) => setEditData((prev) => ({ ...prev, university: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="major">Major</Label>
                          <Input
                            id="major"
                            value={editData.major}
                            onChange={(e) => setEditData((prev) => ({ ...prev, major: e.target.value }))}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.university}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.major}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Class of {userData.graduationYear}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editData.bio}
                        onChange={(e) => setEditData((prev) => ({ ...prev, bio: e.target.value }))}
                        className="min-h-[120px]"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">{userData.bio}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={editData.website}
                            onChange={(e) => setEditData((prev) => ({ ...prev, website: e.target.value }))}
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            value={editData.github}
                            onChange={(e) => setEditData((prev) => ({ ...prev, github: e.target.value }))}
                            placeholder="https://github.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={editData.linkedin}
                            onChange={(e) => setEditData((prev) => ({ ...prev, linkedin: e.target.value }))}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-accent hover:underline"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                        <a
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-accent hover:underline"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                        <a
                          href={userData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-accent hover:underline"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                {skillCategories.map((category) => (
                  <Card key={category.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                          <category.icon className="h-4 w-4 text-white" />
                        </div>
                        {category.name}
                        {isEditing && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Skill</DialogTitle>
                                <DialogDescription>Add a new skill to {category.name}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Input
                                  placeholder="Enter skill name"
                                  value={newSkill}
                                  onChange={(e) => setNewSkill(e.target.value)}
                                />
                                <Button onClick={handleAddSkill} className="w-full">
                                  Add Skill
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="relative group">
                            {skill}
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="interests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Interests
                      </div>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Interest
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Interest</DialogTitle>
                              <DialogDescription>Add a new area of interest</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="Enter interest"
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                              />
                              <Button onClick={handleAddInterest} className="w-full">
                                Add Interest
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardTitle>
                    <CardDescription>Areas of technology and development that excite you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge key={interest} variant="outline" className="relative group">
                          {interest}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Qualities
                      </div>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Quality
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Quality</DialogTitle>
                              <DialogDescription>Add a personal or professional quality</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="Enter quality"
                                value={newQuality}
                                onChange={(e) => setNewQuality(e.target.value)}
                              />
                              <Button onClick={handleAddQuality} className="w-full">
                                Add Quality
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardTitle>
                    <CardDescription>Personal and professional strengths that define you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {qualities.map((quality) => (
                        <Badge key={quality} className="bg-accent text-accent-foreground relative group">
                          {quality}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements & Recognition
                    </CardTitle>
                    <CardDescription>Milestones and accomplishments in your journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className={`w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center`}>
                            <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Code className="h-4 w-4 mr-2" />
                  View Projects
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Joined React Developers Community</p>
                  <p className="text-muted-foreground text-xs">2 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Completed AI Hackathon Project</p>
                  <p className="text-muted-foreground text-xs">1 week ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Updated profile skills</p>
                  <p className="text-muted-foreground text-xs">2 weeks ago</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">AI/ML Community</h4>
                  <p className="text-xs text-muted-foreground">Based on your interests</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Join
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">Web3 Hackathon</h4>
                  <p className="text-xs text-muted-foreground">Matches your skills</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
