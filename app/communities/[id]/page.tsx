"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Plus,
  Search,
  MoreVertical,
  Pin,
  Eye,
  ThumbsUp,
  Reply,
  Send,
  ImageIcon,
  Code,
  Calendar,
  Star,
  Crown,
  Settings,
  LinkIcon,
} from "lucide-react"
import { useParams } from "next/navigation"

// Mock data for community
const community = {
  id: 1,
  name: "React Developers",
  description:
    "A community for React developers to share knowledge, discuss best practices, and collaborate on projects.",
  members: 2847,
  posts: 1234,
  category: "Frontend",
  isPrivate: false,
  isJoined: true,
  avatar: "/placeholder.svg?height=80&width=80",
  banner: "/placeholder.svg?height=300&width=800",
  tags: ["React", "JavaScript", "Frontend", "Web Development"],
  moderators: [
    { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32", role: "Admin" },
    { name: "Alex Rodriguez", avatar: "/placeholder.svg?height=32&width=32", role: "Moderator" },
  ],
  rules: [
    "Be respectful and professional",
    "No spam or self-promotion without permission",
    "Use appropriate tags for your posts",
    "Search before posting to avoid duplicates",
    "Help others and share knowledge",
  ],
  createdAt: "January 2023",
}

// Mock posts data
const posts = [
  {
    id: 1,
    title: "React 18 Concurrent Features - Complete Guide",
    content:
      "I've been experimenting with React 18's concurrent features and wanted to share my findings. The new Suspense improvements and automatic batching are game-changers for performance...",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Developer",
      badge: "Admin",
    },
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
    shares: 8,
    views: 234,
    tags: ["React 18", "Performance", "Concurrent"],
    isPinned: true,
    hasLiked: false,
    hasBookmarked: true,
    type: "discussion",
  },
  {
    id: 2,
    title: "Looking for React Native developers for startup project",
    content:
      "We're building a revolutionary fitness app and need experienced React Native developers. Great opportunity to work with cutting-edge technology and a passionate team...",
    author: {
      name: "Michael Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Startup Founder",
      badge: null,
    },
    timestamp: "4 hours ago",
    likes: 23,
    comments: 18,
    shares: 5,
    views: 156,
    tags: ["React Native", "Job", "Startup"],
    isPinned: false,
    hasLiked: true,
    hasBookmarked: false,
    type: "opportunity",
  },
  {
    id: 3,
    title: "Custom Hook for API State Management",
    content:
      "Created a reusable custom hook for handling API states (loading, error, success). Here's the implementation with TypeScript support...",
    author: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Engineer",
      badge: null,
    },
    timestamp: "1 day ago",
    likes: 67,
    comments: 24,
    shares: 15,
    views: 445,
    tags: ["Custom Hooks", "TypeScript", "API"],
    isPinned: false,
    hasLiked: false,
    hasBookmarked: true,
    type: "tutorial",
    codeSnippet: true,
  },
  {
    id: 4,
    title: "React Performance Optimization Tips",
    content:
      "After optimizing several large React applications, here are the most impactful performance improvements you can make...",
    author: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Lead",
      badge: null,
    },
    timestamp: "2 days ago",
    likes: 89,
    comments: 31,
    shares: 22,
    views: 678,
    tags: ["Performance", "Optimization", "Best Practices"],
    isPinned: false,
    hasLiked: true,
    hasBookmarked: false,
    type: "guide",
  },
]

const postTypes = [
  { value: "all", label: "All Posts", count: posts.length },
  { value: "discussion", label: "Discussions", count: 1 },
  { value: "opportunity", label: "Opportunities", count: 1 },
  { value: "tutorial", label: "Tutorials", count: 1 },
  { value: "guide", label: "Guides", count: 1 },
]

export default function CommunityPage() {
  const params = useParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPostType, setSelectedPostType] = useState("all")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedPostType === "all" || post.type === selectedPostType

    return matchesSearch && matchesType
  })

  const handleCreatePost = () => {
    // Handle post creation
    setIsCreatePostOpen(false)
    setNewPostTitle("")
    setNewPostContent("")
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "discussion":
        return MessageSquare
      case "opportunity":
        return Star
      case "tutorial":
        return Code
      case "guide":
        return Eye
      default:
        return MessageSquare
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "discussion":
        return "bg-blue-500"
      case "opportunity":
        return "bg-green-500"
      case "tutorial":
        return "bg-purple-500"
      case "guide":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Community Header */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 rounded-xl bg-blue-500 flex items-center justify-center border-4 border-background">
              <Code className="h-12 w-12 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {community.members.toLocaleString()} members
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {community.posts.toLocaleString()} posts
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created {community.createdAt}
                </div>
              </div>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="secondary">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-accent hover:bg-accent/90">{community.isJoined ? "Joined" : "Join Community"}</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Create Post */}
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
              <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                      Share your knowledge, ask questions, or start a discussion with the community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Title</Label>
                      <Input
                        id="post-title"
                        placeholder="Enter post title..."
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Write your post content..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add Image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-2" />
                        Code Block
                      </Button>
                      <Button variant="outline" size="sm">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePost} className="bg-accent hover:bg-accent/90">
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Post Type Filters */}
            <Tabs value={selectedPostType} onValueChange={setSelectedPostType}>
              <TabsList className="grid w-full grid-cols-5">
                {postTypes.map((type) => (
                  <TabsTrigger key={type.value} value={type.value} className="text-xs">
                    {type.label} ({type.count})
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

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
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{post.author.name}</h4>
                                {post.author.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Crown className="h-3 w-3 mr-1" />
                                    {post.author.badge}
                                  </Badge>
                                )}
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                                {post.isPinned && (
                                  <>
                                    <span className="text-sm text-muted-foreground">•</span>
                                    <Pin className="h-3 w-3 text-accent" />
                                  </>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{post.author.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded ${getPostTypeColor(post.type)} flex items-center justify-center`}
                            >
                              <PostTypeIcon className="h-3 w-3 text-white" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription className="text-base">{post.content}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Code Snippet Preview */}
                          {post.codeSnippet && (
                            <div className="bg-secondary/50 rounded-lg p-4 border">
                              <div className="flex items-center gap-2 mb-2">
                                <Code className="h-4 w-4 text-accent" />
                                <span className="text-sm font-medium">Code Preview</span>
                              </div>
                              <pre className="text-xs text-muted-foreground">
                                {`const useApiState = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // ... implementation
};`}
                              </pre>
                            </div>
                          )}

                          {/* Post Stats */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                {post.likes}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {post.comments}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className={post.hasLiked ? "text-accent" : ""}>
                                <Heart className={`h-4 w-4 mr-1 ${post.hasLiked ? "fill-current" : ""}`} />
                                Like
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Reply className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm" className={post.hasBookmarked ? "text-accent" : ""}>
                                <Bookmark className={`h-4 w-4 mr-1 ${post.hasBookmarked ? "fill-current" : ""}`} />
                                Save
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Info */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{community.description}</p>
                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Moderators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Moderators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {community.moderators.map((mod) => (
                  <div key={mod.name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mod.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{mod.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{mod.name}</p>
                      <p className="text-xs text-muted-foreground">{mod.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Community Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm">
                  {community.rules.map((rule, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="font-medium text-accent">{index + 1}.</span>
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
