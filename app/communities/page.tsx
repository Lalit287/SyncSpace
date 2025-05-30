"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Users,
  MessageSquare,
  TrendingUp,
  Globe,
  Lock,
  Crown,
  Filter,
  BookOpen,
  Code,
  Palette,
  Smartphone,
  Brain,
  Shield,
  Gamepad2,
} from "lucide-react"
import Link from "next/link"

// Mock data
const communities = [
  {
    id: 1,
    name: "React Developers",
    description:
      "A community for React developers to share knowledge, discuss best practices, and collaborate on projects.",
    members: 2847,
    posts: 1234,
    category: "Frontend",
    isPrivate: false,
    isJoined: true,
    avatar: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    moderators: ["Sarah Chen", "Alex Rodriguez"],
    recentActivity: "2 hours ago",
    trending: true,
    icon: Code,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    description:
      "Explore the latest in artificial intelligence and machine learning. Share research, discuss algorithms, and build intelligent systems.",
    members: 4521,
    posts: 2156,
    category: "AI/ML",
    isPrivate: false,
    isJoined: false,
    avatar: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    tags: ["AI", "Machine Learning", "Deep Learning", "Python", "TensorFlow"],
    moderators: ["Dr. Emily Watson", "Michael Kim"],
    recentActivity: "1 hour ago",
    trending: true,
    icon: Brain,
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "UI/UX Designers",
    description:
      "A creative space for designers to showcase work, get feedback, and discuss design trends and methodologies.",
    members: 1923,
    posts: 856,
    category: "Design",
    isPrivate: false,
    isJoined: true,
    avatar: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    tags: ["UI/UX", "Design", "Figma", "Adobe", "Prototyping"],
    moderators: ["Emma Thompson", "David Park"],
    recentActivity: "30 min ago",
    trending: false,
    icon: Palette,
    color: "bg-pink-500",
  },
  {
    id: 4,
    name: "Mobile Development",
    description:
      "iOS, Android, React Native, Flutter - everything mobile development. Share apps, get code reviews, and discuss mobile trends.",
    members: 3156,
    posts: 1789,
    category: "Mobile",
    isPrivate: false,
    isJoined: false,
    avatar: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    tags: ["iOS", "Android", "React Native", "Flutter", "Swift", "Kotlin"],
    moderators: ["James Wilson", "Lisa Chang"],
    recentActivity: "45 min ago",
    trending: true,
    icon: Smartphone,
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Blockchain & Web3",
    description:
      "Decentralized technologies, smart contracts, DeFi, and the future of the web. Build the next generation of internet applications.",
    members: 2234,
    posts: 967,
    category: "Blockchain",
    isPrivate: false,
    isJoined: true,
    avatar: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    tags: ["Blockchain", "Web3", "Solidity", "DeFi", "Smart Contracts"],
    moderators: ["Alex Crypto", "Blockchain Bob"],
    recentActivity: "1 day ago",
    trending: false,
    icon: Shield,
    color: "bg-orange-500",
  },
  {
    id: 6,
    name: "Game Development",
    description:
      "Create amazing games! Discuss game engines, share your projects, and collaborate on indie game development.",
    members: 1876,
    posts: 743,
    category: "Gaming",
    isPrivate: false,
    isJoined: false,
    avatar: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    tags: ["Unity", "Unreal", "Game Design", "Indie Games", "C#"],
    moderators: ["GameDev Pro", "Indie Creator"],
    recentActivity: "3 hours ago",
    trending: false,
    icon: Gamepad2,
    color: "bg-red-500",
  },
]

const categories = [
  { name: "All", count: communities.length },
  { name: "Frontend", count: 1 },
  { name: "AI/ML", count: 1 },
  { name: "Design", count: 1 },
  { name: "Mobile", count: 1 },
  { name: "Blockchain", count: 1 },
  { name: "Gaming", count: 1 },
]

const trendingTopics = [
  { name: "React 18 Features", posts: 45, trend: "+12%" },
  { name: "AI Code Generation", posts: 67, trend: "+25%" },
  { name: "Mobile Performance", posts: 23, trend: "+8%" },
  { name: "Web3 Security", posts: 34, trend: "+15%" },
  { name: "Design Systems", posts: 29, trend: "+6%" },
]

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState("all")

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || community.category === selectedCategory

    const matchesView =
      viewMode === "all" ||
      (viewMode === "joined" && community.isJoined) ||
      (viewMode === "trending" && community.trending)

    return matchesSearch && matchesCategory && matchesView
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
            <h1 className="text-3xl font-bold mb-2">Communities</h1>
            <p className="text-muted-foreground">Connect with like-minded developers and creators</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create Community
          </Button>
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
                        placeholder="Search communities..."
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
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Tabs value={viewMode} onValueChange={setViewMode}>
                <TabsList>
                  <TabsTrigger value="all">All Communities</TabsTrigger>
                  <TabsTrigger value="joined">My Communities</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Communities Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredCommunities.map((community) => (
                <motion.div key={community.id} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    {/* Banner */}
                    <div className="relative h-32 bg-gradient-to-r from-primary/20 to-accent/20">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        {community.trending && (
                          <Badge className="bg-red-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {community.isPrivate ? (
                          <Badge variant="secondary">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Globe className="h-3 w-3 mr-1" />
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader className="relative -mt-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-lg ${community.color} flex items-center justify-center border-4 border-background`}
                        >
                          <community.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 pt-2">
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {community.members.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {community.posts.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="mt-3 line-clamp-2">{community.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {community.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {community.tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{community.tags.length - 4}
                            </Badge>
                          )}
                        </div>

                        {/* Moderators */}
                        <div className="flex items-center gap-2">
                          <Crown className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">
                            Moderated by {community.moderators.join(", ")}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-muted-foreground">Active {community.recentActivity}</span>
                          <div className="flex gap-2">
                            <Link href={`/communities/${community.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className={
                                community.isJoined
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-accent hover:bg-accent/90"
                              }
                            >
                              {community.isJoined ? "Joined" : "Join"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredCommunities.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No communities found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or create a new community.
                  </p>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Community
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.name ? "bg-accent text-accent-foreground" : "hover:bg-secondary/50"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{topic.name}</p>
                      <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600">
                      {topic.trend}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Community Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Suggest Feature
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
