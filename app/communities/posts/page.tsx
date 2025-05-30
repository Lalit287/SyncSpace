"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Eye,
  Calendar,
  Hash,
  ArrowUp,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Briefcase,
  Lightbulb,
  Zap,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock posts data
const posts = [
  {
    id: 1,
    title: "React 18 Concurrent Features - Complete Guide",
    content:
      "I've been experimenting with React 18's concurrent features and wanted to share my findings. The new Suspense improvements and automatic batching are game-changers for performance. Here's what I learned after building a complex dashboard...",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Developer",
      badge: "Admin",
      verified: true,
    },
    community: {
      name: "React Developers",
      id: 1,
    },
    timestamp: "2 hours ago",
    likes: 145,
    comments: 32,
    shares: 18,
    views: 1234,
    tags: ["React 18", "Performance", "Concurrent", "JavaScript"],
    isPinned: true,
    hasLiked: false,
    hasBookmarked: true,
    type: "tutorial",
    codeSnippet: true,
    difficulty: "Advanced",
  },
  {
    id: 2,
    title: "Looking for React Native developers for startup project",
    content:
      "We're building a revolutionary fitness app and need experienced React Native developers. Great opportunity to work with cutting-edge technology and a passionate team. Competitive salary and equity options available...",
    author: {
      name: "Michael Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Startup Founder",
      badge: null,
      verified: false,
    },
    community: {
      name: "React Developers",
      id: 1,
    },
    timestamp: "4 hours ago",
    likes: 67,
    comments: 28,
    shares: 12,
    views: 856,
    tags: ["React Native", "Job", "Startup", "Mobile"],
    isPinned: false,
    hasLiked: true,
    hasBookmarked: false,
    type: "opportunity",
    salary: "$80k - $120k",
    location: "Remote",
  },
  {
    id: 3,
    title: "Custom Hook for API State Management",
    content:
      "Created a reusable custom hook for handling API states (loading, error, success). Here's the implementation with TypeScript support and automatic retry logic. This has saved me tons of boilerplate code...",
    author: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Engineer",
      badge: null,
      verified: true,
    },
    community: {
      name: "React Developers",
      id: 1,
    },
    timestamp: "1 day ago",
    likes: 234,
    comments: 45,
    shares: 67,
    views: 2145,
    tags: ["Custom Hooks", "TypeScript", "API", "State Management"],
    isPinned: false,
    hasLiked: false,
    hasBookmarked: true,
    type: "tutorial",
    codeSnippet: true,
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Help: React Context vs Redux in 2024?",
    content:
      "I'm starting a new project and can't decide between React Context and Redux for state management. The app will have user authentication, real-time updates, and complex data relationships. What would you recommend?",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Junior Developer",
      badge: null,
      verified: false,
    },
    community: {
      name: "React Developers",
      id: 1,
    },
    timestamp: "2 days ago",
    likes: 89,
    comments: 156,
    shares: 23,
    views: 1567,
    tags: ["React Context", "Redux", "State Management", "Architecture"],
    isPinned: false,
    hasLiked: true,
    hasBookmarked: false,
    type: "question",
    answered: true,
  },
  {
    id: 5,
    title: "Built a Real-time Collaborative Code Editor",
    content:
      "Just finished building a collaborative code editor using React, Socket.io, and Monaco Editor. Features include real-time collaboration, syntax highlighting, and live cursors. Check out the demo and let me know what you think!",
    author: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Full Stack Developer",
      badge: null,
      verified: true,
    },
    community: {
      name: "React Developers",
      id: 1,
    },
    timestamp: "3 days ago",
    likes: 312,
    comments: 78,
    shares: 145,
    views: 3456,
    tags: ["React", "Socket.io", "Real-time", "Collaboration", "Monaco"],
    isPinned: false,
    hasLiked: false,
    hasBookmarked: true,
    type: "showcase",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: 6,
    title: "AI-Powered Component Generator Idea",
    content:
      "What if we could generate React components from natural language descriptions? I'm thinking about building a tool that takes descriptions like 'a responsive card with image, title, and button' and generates the JSX code. Thoughts?",
    author: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "AI Engineer",
      badge: null,
      verified: true,
    },
    community: {
      name: "AI & Machine Learning",
      id: 2,
    },
    timestamp: "1 week ago",
    likes: 456,
    comments: 234,
    shares: 89,
    views: 5678,
    tags: ["AI", "Code Generation", "React", "NLP", "Innovation"],
    isPinned: false,
    hasLiked: true,
    hasBookmarked: true,
    type: "idea",
    upvotes: 456,
  },
]

const postTypes = [
  { value: "all", label: "All Posts", icon: Hash, count: posts.length },
  { value: "discussion", label: "Discussions", icon: MessageSquare, count: 0 },
  { value: "tutorial", label: "Tutorials", icon: BookOpen, count: 2 },
  { value: "question", label: "Questions", icon: HelpCircle, count: 1 },
  { value: "showcase", label: "Showcases", icon: Eye, count: 1 },
  { value: "opportunity", label: "Opportunities", icon: Briefcase, count: 1 },
  { value: "idea", label: "Ideas", icon: Lightbulb, count: 1 },
]

const sortOptions = [
  { value: "hot", label: "Hot", icon: TrendingUp },
  { value: "new", label: "New", icon: Clock },
  { value: "top", label: "Top", icon: ArrowUp },
  { value: "rising", label: "Rising", icon: ArrowUp },
]

const timeFilters = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
]

export default function CommunityPostsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPostType, setSelectedPostType] = useState("all")
  const [sortBy, setSortBy] = useState("hot")
  const [timeFilter, setTimeFilter] = useState("all")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedPostType === "all" || post.type === selectedPostType

    return matchesSearch && matchesType
  })

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "discussion":
        return MessageSquare
      case "tutorial":
        return BookOpen
      case "question":
        return HelpCircle
      case "showcase":
        return Eye
      case "opportunity":
        return Briefcase
      case "idea":
        return Lightbulb
      case "event":
        return Calendar
      case "news":
        return Zap
      default:
        return MessageSquare
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "discussion":
        return "bg-blue-500"
      case "tutorial":
        return "bg-green-500"
      case "question":
        return "bg-yellow-500"
      case "showcase":
        return "bg-purple-500"
      case "opportunity":
        return "bg-orange-500"
      case "idea":
        return "bg-pink-500"
      case "event":
        return "bg-indigo-500"
      case "news":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
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
            <h1 className="text-3xl font-bold mb-2">Community Posts</h1>
            <p className="text-muted-foreground">Discover and engage with community content</p>
          </div>
          <Link href="/communities/create-post">
            <Button className="bg-accent hover:bg-accent/90 mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <option.icon className="h-4 w-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={timeFilter} onValueChange={setTimeFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeFilters.map((filter) => (
                            <SelectItem key={filter.value} value={filter.value}>
                              {filter.label}
                            </SelectItem>
                          ))}
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

            {/* Post Type Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Tabs value={selectedPostType} onValueChange={setSelectedPostType}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                  {postTypes.map((type) => (
                    <TabsTrigger key={type.value} value={type.value} className="text-xs">
                      <type.icon className="h-3 w-3 mr-1" />
                      {type.label} ({type.count})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => {
                const PostTypeIcon = getPostTypeIcon(post.type)
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 group">
                      <CardHeader>
                \
