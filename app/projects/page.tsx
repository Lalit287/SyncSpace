"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Bookmark,
} from "lucide-react"
import Link from "next/link"

// Mock data
const projects = [
  {
    id: 1,
    title: "AI-Powered Code Review Tool",
    description:
      "Building an intelligent code review system that uses machine learning to detect bugs, suggest improvements, and ensure code quality standards.",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Developer",
    },
    skills: ["Python", "Machine Learning", "React", "Node.js"],
    teamSize: "3/5",
    timeline: "2 weeks",
    difficulty: "Advanced",
    hackathon: "AI Innovation Challenge",
    likes: 45,
    comments: 12,
    shares: 8,
    timePosted: "3 hours ago",
    urgency: "high",
    type: "AI/ML",
    location: "Remote",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Sustainable Food Tracking App",
    description:
      "Mobile application to help users track their food consumption, reduce waste, and make more sustainable eating choices with personalized recommendations.",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Product Manager",
    },
    skills: ["React Native", "UI/UX", "Backend", "Database"],
    teamSize: "2/4",
    timeline: "1 month",
    difficulty: "Intermediate",
    hackathon: "Sustainable Tech Hackathon",
    likes: 32,
    comments: 8,
    shares: 5,
    timePosted: "6 hours ago",
    urgency: "medium",
    type: "Mobile",
    location: "San Francisco, CA",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    description:
      "Secure and transparent voting platform using blockchain technology to ensure election integrity and provide real-time results verification.",
    author: {
      name: "Michael Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Blockchain Developer",
    },
    skills: ["Solidity", "Web3", "React", "Smart Contracts"],
    teamSize: "4/6",
    timeline: "3 weeks",
    difficulty: "Expert",
    hackathon: "FinTech Revolution",
    likes: 67,
    comments: 23,
    shares: 15,
    timePosted: "1 day ago",
    urgency: "low",
    type: "Blockchain",
    location: "New York, NY",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Mental Health Support Chatbot",
    description:
      "AI-powered chatbot that provides 24/7 mental health support, mood tracking, and connects users with professional resources when needed.",
    author: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Psychology Student",
    },
    skills: ["Python", "NLP", "Psychology", "UI/UX"],
    teamSize: "1/3",
    timeline: "1 month",
    difficulty: "Intermediate",
    hackathon: "HealthTech Innovation",
    likes: 28,
    comments: 15,
    shares: 6,
    timePosted: "2 days ago",
    urgency: "medium",
    type: "AI/ML",
    location: "Boston, MA",
    isBookmarked: true,
  },
  {
    id: 5,
    title: "Smart Home Energy Optimizer",
    description:
      "IoT solution that monitors and optimizes home energy consumption using smart sensors and machine learning algorithms to reduce costs and environmental impact.",
    author: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "IoT Engineer",
    },
    skills: ["IoT", "Python", "Arduino", "Data Analysis"],
    teamSize: "2/5",
    timeline: "6 weeks",
    difficulty: "Advanced",
    hackathon: "Climate Tech Challenge",
    likes: 41,
    comments: 9,
    shares: 12,
    timePosted: "3 days ago",
    urgency: "low",
    type: "IoT",
    location: "Seattle, WA",
    isBookmarked: false,
  },
]

const filters = {
  difficulty: ["Beginner", "Intermediate", "Advanced", "Expert"],
  type: ["Web Development", "Mobile", "AI/ML", "Blockchain", "IoT", "Game Dev", "Data Science"],
  timeline: ["1 week", "2 weeks", "1 month", "2-3 months", "Ongoing"],
  teamSize: ["1-2 people", "3-4 people", "5-6 people", "7+ people"],
  urgency: ["High", "Medium", "Low"],
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    difficulty: "Beginner",
    type: "Web Development",
    timeline: "1 week",
    teamSize: "1-2 people",
    urgency: "High",
    location: "",
  })
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState("all")
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([2, 4])

  const toggleBookmark = (projectId: number) => {
    setBookmarkedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilters = Object.entries(selectedFilters).every(([key, value]) => {
      if (!value) return true
      // Add filter logic here based on project properties
      return true
    })

    const matchesView =
      viewMode === "all" ||
      (viewMode === "bookmarked" && bookmarkedProjects.includes(project.id)) ||
      (viewMode === "my-projects" && project.author.name === "Current User")

    return matchesSearch && matchesFilters && matchesView
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Discover Projects</h1>
            <p className="text-muted-foreground">Find exciting projects to join and collaborate on</p>
          </div>
          <Link href="/projects/new">
            <Button className="bg-accent hover:bg-accent/90 mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </Link>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, skills, or technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select
                    value={selectedFilters.type}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">All Types</SelectItem>
                      {filters.type.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedFilters.difficulty}
                    onValueChange={(value) => setSelectedFilters((prev) => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">All Levels</SelectItem>
                      {filters.difficulty.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="urgent">Most Urgent</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* View Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Tabs value={viewMode} onValueChange={setViewMode}>
            <TabsList>
              <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked ({bookmarkedProjects.length})</TabsTrigger>
              <TabsTrigger value="my-projects">My Projects (0)</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{project.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{project.author.name}</p>
                        <p className="text-xs text-muted-foreground">{project.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          project.urgency === "high"
                            ? "destructive"
                            : project.urgency === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {project.teamSize}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(project.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${bookmarkedProjects.includes(project.id) ? "fill-current text-accent" : ""}`}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {project.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {project.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.skills.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.timeline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {project.difficulty}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.timePosted}
                      </div>
                    </div>

                    {/* Hackathon */}
                    {project.hackathon && (
                      <Badge variant="secondary" className="text-xs">
                        {project.hackathon}
                      </Badge>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                          <Heart className="h-3 w-3" />
                          {project.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                          <MessageCircle className="h-3 w-3" />
                          {project.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                          <Share2 className="h-3 w-3" />
                          {project.shares}
                        </Button>
                      </div>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Join Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new project to get started.
              </p>
              <Link href="/projects/new">
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Load More */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Load More Projects
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
