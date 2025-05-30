"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  ImageIcon,
  Code,
  LinkIcon,
  Hash,
  ArrowLeft,
  Eye,
  Video,
  Users,
  Lightbulb,
  HelpCircle,
  Briefcase,
  MessageSquare,
  BookOpen,
  Zap,
  Target,
  Upload,
  X,
  Calendar,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const postTypes = [
  {
    value: "discussion",
    label: "Discussion",
    description: "Start a conversation or ask for opinions",
    icon: MessageSquare,
    color: "bg-blue-500",
    placeholder: "What would you like to discuss with the community?",
  },
  {
    value: "tutorial",
    label: "Tutorial",
    description: "Share knowledge and teach others",
    icon: BookOpen,
    color: "bg-green-500",
    placeholder: "Share your knowledge and help others learn...",
  },
  {
    value: "question",
    label: "Question",
    description: "Ask for help or clarification",
    icon: HelpCircle,
    color: "bg-yellow-500",
    placeholder: "What do you need help with?",
  },
  {
    value: "showcase",
    label: "Showcase",
    description: "Show off your work or project",
    icon: Eye,
    color: "bg-purple-500",
    placeholder: "Tell us about your amazing project...",
  },
  {
    value: "opportunity",
    label: "Opportunity",
    description: "Share job openings or collaboration requests",
    icon: Briefcase,
    color: "bg-orange-500",
    placeholder: "Describe the opportunity and requirements...",
  },
  {
    value: "idea",
    label: "Idea",
    description: "Share innovative concepts or brainstorm",
    icon: Lightbulb,
    color: "bg-pink-500",
    placeholder: "Share your innovative idea...",
  },
  {
    value: "event",
    label: "Event",
    description: "Announce or promote events",
    icon: Calendar,
    color: "bg-indigo-500",
    placeholder: "Tell us about your event...",
  },
  {
    value: "news",
    label: "News",
    description: "Share industry news and updates",
    icon: Zap,
    color: "bg-red-500",
    placeholder: "Share the latest news and updates...",
  },
]

const communities = [
  {
    id: 1,
    name: "React Developers",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 2847,
    category: "Frontend",
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 4521,
    category: "AI/ML",
  },
  {
    id: 3,
    name: "UI/UX Designers",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 1923,
    category: "Design",
  },
]

const codeLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "C#",
  "HTML",
  "CSS",
  "SQL",
  "Shell",
]

export default function CreatePostPage() {
  const router = useRouter()
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    type: "",
    community: "",
    tags: [] as string[],
    codeLanguage: "",
    codeSnippet: "",
    links: [] as string[],
    images: [] as string[],
    eventDate: "",
    eventLocation: "",
    isAnonymous: false,
    allowComments: true,
    notifyReplies: true,
  })
  const [currentTag, setCurrentTag] = useState("")
  const [currentLink, setCurrentLink] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("write")

  const handleAddTag = () => {
    if (currentTag.trim() && !postData.tags.includes(currentTag.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleAddLink = () => {
    if (currentLink.trim() && !postData.links.includes(currentLink.trim())) {
      setPostData((prev) => ({
        ...prev,
        links: [...prev.links, currentLink.trim()],
      }))
      setCurrentLink("")
    }
  }

  const handleRemoveLink = (linkToRemove: string) => {
    setPostData((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link !== linkToRemove),
    }))
  }

  const handleSubmit = async () => {
    if (!postData.title.trim() || !postData.content.trim() || !postData.type || !postData.community) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/communities/${postData.community}`)
    }, 2000)
  }

  const selectedPostType = postTypes.find((type) => type.value === postData.type)
  const selectedCommunity = communities.find((community) => community.id.toString() === postData.community)

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/communities">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <p className="text-muted-foreground">Share your thoughts with the community</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Select Community</CardTitle>
                  <CardDescription>Choose which community to post in</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={postData.community}
                    onValueChange={(value) => setPostData((prev) => ({ ...prev, community: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a community" />
                    </SelectTrigger>
                    <SelectContent>
                      {communities.map((community) => (
                        <SelectItem key={community.id} value={community.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={community.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{community.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{community.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {community.members.toLocaleString()} members
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </motion.div>

            {/* Post Type Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Choose Post Type</CardTitle>
                  <CardDescription>Select the type of post you want to create</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {postTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          postData.type === type.value
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        }`}
                        onClick={() => setPostData((prev) => ({ ...prev, type: type.value }))}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center`}>
                            <type.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">{type.label}</h3>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Post Content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                  {selectedPostType && (
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded ${selectedPostType.color} flex items-center justify-center`}>
                        <selectedPostType.icon className="h-3 w-3 text-white" />
                      </div>
                      <Badge variant="outline">{selectedPostType.label}</Badge>
                      {selectedCommunity && (
                        <>
                          <span className="text-muted-foreground">in</span>
                          <Badge variant="secondary">{selectedCommunity.name}</Badge>
                        </>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your post title..."
                      value={postData.title}
                      onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="write" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          placeholder={selectedPostType?.placeholder || "Write your post content..."}
                          value={postData.content}
                          onChange={(e) => setPostData((prev) => ({ ...prev, content: e.target.value }))}
                          className="min-h-[300px]"
                        />
                      </div>

                      {/* Formatting Tools */}
                      <div className="flex items-center gap-2 p-2 border rounded-lg">
                        <Button variant="outline" size="sm">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Code className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Link
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          File
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="preview">
                      <div className="border rounded-lg p-4 min-h-[300px] bg-secondary/20">
                        <h3 className="text-lg font-semibold mb-3">{postData.title || "Post Title"}</h3>
                        <div className="prose prose-sm max-w-none">
                          {postData.content ? (
                            <p className="whitespace-pre-wrap">{postData.content}</p>
                          ) : (
                            <p className="text-muted-foreground italic">Post content will appear here...</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Event Details (for event posts) */}
                  {postData.type === "event" && (
                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/10">
                      <h4 className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Event Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-date">Event Date</Label>
                          <Input
                            id="event-date"
                            type="datetime-local"
                            value={postData.eventDate}
                            onChange={(e) => setPostData((prev) => ({ ...prev, eventDate: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-location">Location</Label>
                          <Input
                            id="event-location"
                            placeholder="Event location or online"
                            value={postData.eventLocation}
                            onChange={(e) => setPostData((prev) => ({ ...prev, eventLocation: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Code Snippet (for tutorial/showcase posts) */}
                  {(postData.type === "tutorial" || postData.type === "showcase") && (
                    <div className="space-y-4 p-4 border rounded-lg bg-secondary/10">
                      <h4 className="font-medium flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Code Snippet
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="code-language">Programming Language</Label>
                          <Select
                            value={postData.codeLanguage}
                            onValueChange={(value) => setPostData((prev) => ({ ...prev, codeLanguage: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              {codeLanguages.map((lang) => (
                                <SelectItem key={lang} value={lang.toLowerCase()}>
                                  {lang}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="code-snippet">Code</Label>
                        <Textarea
                          id="code-snippet"
                          placeholder="Paste your code here..."
                          value={postData.codeSnippet}
                          onChange={(e) => setPostData((prev) => ({ ...prev, codeSnippet: e.target.value }))}
                          className="font-mono text-sm min-h-[150px]"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags and Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Tags & Links</CardTitle>
                  <CardDescription>Add relevant tags and useful links to your post</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tags */}
                  <div className="space-y-4">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      />
                      <Button onClick={handleAddTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    {postData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {postData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            {tag} <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="space-y-4">
                    <Label>Useful Links</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a link..."
                        value={currentLink}
                        onChange={(e) => setCurrentLink(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddLink())}
                      />
                      <Button onClick={handleAddLink} variant="outline">
                        Add
                      </Button>
                    </div>
                    {postData.links.length > 0 && (
                      <div className="space-y-2">
                        {postData.links.map((link, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm flex-1 truncate">{link}</span>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveLink(link)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end gap-4"
            >
              <Link href="/communities">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !postData.title.trim() ||
                  !postData.content.trim() ||
                  !postData.type ||
                  !postData.community
                }
                className="bg-accent hover:bg-accent/90"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publish Post
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Community Info */}
            {selectedCommunity && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-accent" />
                    {selectedCommunity.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {selectedCommunity.members.toLocaleString()} members
                    </div>
                    <Badge variant="outline">{selectedCommunity.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Post Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Posting Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be respectful and constructive</li>
                  <li>• Use clear and descriptive titles</li>
                  <li>• Add relevant tags to help others find your post</li>
                  <li>• Include code examples when helpful</li>
                  <li>• Search before posting to avoid duplicates</li>
                  <li>• Follow community-specific rules</li>
                </ul>
              </CardContent>
            </Card>

            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-comments">Allow Comments</Label>
                  <input
                    type="checkbox"
                    id="allow-comments"
                    checked={postData.allowComments}
                    onChange={(e) => setPostData((prev) => ({ ...prev, allowComments: e.target.checked }))}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-replies">Notify on Replies</Label>
                  <input
                    type="checkbox"
                    id="notify-replies"
                    checked={postData.notifyReplies}
                    onChange={(e) => setPostData((prev) => ({ ...prev, notifyReplies: e.target.checked }))}
                    className="rounded"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Tips for Great Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Start with an engaging title</li>
                  <li>• Provide context and background</li>
                  <li>• Use formatting to improve readability</li>
                  <li>• Include relevant examples or screenshots</li>
                  <li>• Engage with comments and feedback</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
