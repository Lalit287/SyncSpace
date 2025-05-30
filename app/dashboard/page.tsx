"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  MapPin,
  Star,
  Code,
  Trophy,
  Target,
  Bell,
  Settings,
  Hash,
  Eye,
} from "lucide-react"
import Link from "next/link"

// Mock data
const userStats = {
  connections: 24,
  activeProjects: 3,
  communities: 5,
  communityRank: 156,
}

const recommendedUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "TypeScript", "Tailwind"],
    compatibility: 95,
    location: "San Francisco, CA",
    isOnline: true,
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Figma", "UI/UX", "Prototyping"],
    compatibility: 88,
    location: "New York, NY",
    isOnline: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Backend Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Python", "MongoDB"],
    compatibility: 92,
    location: "Seattle, WA",
    isOnline: true,
  },
]

// Updated communities data
const myCommunities = [
  {
    id: 1,
    name: "React Developers",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 2847,
    newPosts: 12,
    category: "Frontend",
    color: "bg-blue-500",
    icon: Code,
  },
  {
    id: 2,
    name: "UI/UX Designers",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 1923,
    newPosts: 8,
    category: "Design",
    color: "bg-pink-500",
    icon: Target,
  },
  {
    id: 3,
    name: "Blockchain & Web3",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 2234,
    newPosts: 5,
    category: "Blockchain",
    color: "bg-orange-500",
    icon: Trophy,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "connection",
    user: "Sarah Wilson",
    action: "connected with you",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    type: "project",
    user: "Team Alpha",
    action: "invited you to join their project",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    type: "community",
    user: "React Developers",
    action: "new post in community",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const trendingProjects = [
  {
    id: 1,
    title: "AI-Powered Code Review Tool",
    description: "Building an intelligent code review system using machine learning",
    author: "DevTeam Pro",
    likes: 45,
    comments: 12,
    shares: 8,
    tags: ["AI", "DevTools", "Machine Learning"],
    timePosted: "3 hours ago",
    teamSize: "3/5",
    urgency: "high",
  },
  {
    id: 2,
    title: "Sustainable Food Tracking App",
    description: "Mobile app to track food waste and promote sustainable eating habits",
    author: "GreenTech Innovators",
    likes: 32,
    comments: 8,
    shares: 5,
    tags: ["Mobile", "Sustainability", "React Native"],
    timePosted: "6 hours ago",
    teamSize: "2/4",
    urgency: "medium",
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform using blockchain technology",
    author: "CryptoBuilders",
    likes: 67,
    comments: 23,
    shares: 15,
    tags: ["Blockchain", "Web3", "Security"],
    timePosted: "1 day ago",
    teamSize: "4/6",
    urgency: "low",
  },
]

const communityPosts = [
  {
    id: 1,
    title: "React 18 Concurrent Features - Complete Guide",
    community: "React Developers",
    author: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    likes: 45,
    comments: 12,
    timePosted: "2 hours ago",
    isNew: true,
  },
  {
    id: 2,
    title: "Design System Best Practices for 2024",
    community: "UI/UX Designers",
    author: "Emma Thompson",
    avatar: "/placeholder.svg?height=32&width=32",
    likes: 32,
    comments: 8,
    timePosted: "4 hours ago",
    isNew: true,
  },
  {
    id: 3,
    title: "Smart Contract Security Audit Checklist",
    community: "Blockchain & Web3",
    author: "Michael Kim",
    avatar: "/placeholder.svg?height=32&width=32",
    likes: 28,
    comments: 15,
    timePosted: "6 hours ago",
    isNew: false,
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("feed")

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
            <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="text-muted-foreground">Ready to build something amazing today?</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Link href="/projects/new">
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{userStats.connections}</div>
                <p className="text-sm text-muted-foreground">Connections</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Code className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">{userStats.activeProjects}</div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Hash className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">{userStats.communities}</div>
                <p className="text-sm text-muted-foreground">Communities</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">#{userStats.communityRank}</div>
                <p className="text-sm text-muted-foreground">Community Rank</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects, skills, or people..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="feed">Project Feed</TabsTrigger>
                <TabsTrigger value="communities">Communities</TabsTrigger>
                <TabsTrigger value="recommendations">For You</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4">
                {trendingProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: project.id * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>{project.author[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{project.author}</p>
                                <p className="text-xs text-muted-foreground">{project.timePosted}</p>
                              </div>
                            </div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription className="mt-2">{project.description}</CardDescription>
                          </div>
                          <Badge
                            variant={
                              project.urgency === "high"
                                ? "destructive"
                                : project.urgency === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="ml-4"
                          >
                            {project.teamSize}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {project.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {project.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <Share2 className="h-4 w-4" />
                              {project.shares}
                            </Button>
                          </div>
                          <Button size="sm" className="bg-accent hover:bg-accent/90">
                            Join Project
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="communities" className="space-y-4">
                {communityPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: post.id * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{post.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{post.author}</h4>
                                <span className="text-sm text-muted-foreground">in</span>
                                <Badge variant="outline" className="text-xs">
                                  <Hash className="h-3 w-3 mr-1" />
                                  {post.community}
                                </Badge>
                                {post.isNew && <Badge className="bg-accent text-accent-foreground text-xs">New</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">{post.timePosted}</p>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </Button>
                          </div>
                          <Link href={`/communities/${post.community.toLowerCase().replace(/\s+/g, "-")}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Post
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent" />
                      Recommended for You
                    </CardTitle>
                    <CardDescription>Based on your skills and interests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              {user.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.role}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{user.location}</span>
                              </div>
                              <div className="flex gap-1 mt-2">
                                {user.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{user.compatibility}%</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Connect
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Trending This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["AI/Machine Learning", "Blockchain", "Sustainability", "Mobile Development", "DevTools"].map(
                        (trend, index) => (
                          <div key={trend} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-accent">#{index + 1}</span>
                              </div>
                              <span className="font-medium">{trend}</span>
                            </div>
                            <Badge variant="secondary">{Math.floor(Math.random() * 100) + 50} projects</Badge>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* My Communities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-accent" />
                  My Communities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myCommunities.map((community) => (
                  <Link key={community.id} href={`/communities/${community.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg ${community.color} flex items-center justify-center`}>
                        <community.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{community.name}</h4>
                        <p className="text-xs text-muted-foreground">{community.members.toLocaleString()} members</p>
                      </div>
                      {community.newPosts > 0 && (
                        <Badge className="bg-accent text-accent-foreground">{community.newPosts}</Badge>
                      )}
                    </div>
                  </Link>
                ))}
                <Link href="/communities">
                  <Button variant="outline" className="w-full">
                    View All Communities
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Link href="/activity">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/projects/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Messages
                  </Button>
                </Link>
                <Link href="/communities">
                  <Button variant="outline" className="w-full justify-start">
                    <Hash className="h-4 w-4 mr-2" />
                    Browse Communities
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
