"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Users, Hash, Settings, Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data
const conversations = [
  {
    id: 1,
    type: "direct",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great! Let's schedule a call to discuss the API integration.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    project: "AI Code Review Tool",
  },
  {
    id: 2,
    type: "group",
    name: "Team Alpha",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Alex: I've pushed the latest changes to the repo",
    timestamp: "15 min ago",
    unread: 0,
    online: false,
    project: "Sustainable Food App",
    members: 4,
  },
  {
    id: 3,
    type: "direct",
    name: "Michael Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The smart contract is ready for testing",
    timestamp: "1 hour ago",
    unread: 1,
    online: true,
    project: "Blockchain Voting",
  },
  {
    id: 4,
    type: "community",
    name: "AI/ML Community",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Emma: Check out this new paper on transformer models",
    timestamp: "2 hours ago",
    unread: 5,
    online: false,
    members: 156,
  },
  {
    id: 5,
    type: "direct",
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback on the UI mockups!",
    timestamp: "1 day ago",
    unread: 0,
    online: false,
    project: "Mental Health Chatbot",
  },
]

const messages = [
  {
    id: 1,
    sender: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "Hey! I saw your project on the AI code review tool. Really interesting approach!",
    timestamp: "10:30 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 2,
    sender: "You",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "Thanks! I've been working on it for a few weeks. Would love to get your thoughts on the ML model architecture.",
    timestamp: "10:32 AM",
    isOwn: true,
    type: "text",
  },
  {
    id: 3,
    sender: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "I have some experience with similar models. The approach looks solid, but have you considered using transformer-based architectures?",
    timestamp: "10:35 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 4,
    sender: "You",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "That's a great suggestion! I was actually thinking about that. Do you have any specific recommendations?",
    timestamp: "10:37 AM",
    isOwn: true,
    type: "text",
  },
  {
    id: 5,
    sender: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "code_review_architecture.pdf",
    timestamp: "10:40 AM",
    isOwn: false,
    type: "file",
  },
  {
    id: 6,
    sender: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "I've attached a paper that might be helpful. It covers some recent advances in code analysis using transformers.",
    timestamp: "10:40 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 7,
    sender: "You",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "Perfect! I'll take a look. Would you be interested in collaborating on this project?",
    timestamp: "10:45 AM",
    isOwn: true,
    type: "text",
  },
  {
    id: 8,
    sender: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "I think we could build something really impactful together.",
    timestamp: "10:47 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 9,
    sender: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "Great! Let's schedule a call to discuss the API integration.",
    timestamp: "10:50 AM",
    isOwn: false,
    type: "text",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // Add message logic here
    setMessageInput("")
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-screen bg-background pt-16">
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Messages</h1>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1",
                    selectedConversation.id === conversation.id
                      ? "bg-accent/20 border border-accent/30"
                      : "hover:bg-secondary/50",
                  )}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.online && conversation.type === "direct" && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                    {conversation.type === "group" && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-background flex items-center justify-center">
                        <Users className="h-2 w-2 text-white" />
                      </div>
                    )}
                    {conversation.type === "community" && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full border-2 border-background flex items-center justify-center">
                        <Hash className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    {conversation.project && (
                      <Badge variant="outline" className="text-xs mt-1">
                        {conversation.project}
                      </Badge>
                    )}
                    {conversation.members && (
                      <p className="text-xs text-muted-foreground mt-1">{conversation.members} members</p>
                    )}
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-accent text-accent-foreground">{conversation.unread}</Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedConversation.name}</h2>
                  <div className="flex items-center gap-2">
                    {selectedConversation.online && selectedConversation.type === "direct" && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    )}
                    {selectedConversation.project && (
                      <Badge variant="outline" className="text-xs">
                        {selectedConversation.project}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn("flex gap-3", message.isOwn ? "flex-row-reverse" : "flex-row")}
                >
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[70%] space-y-1", message.isOwn ? "items-end" : "items-start")}>
                    {!message.isOwn && <p className="text-xs text-muted-foreground">{message.sender}</p>}
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2",
                        message.isOwn ? "bg-accent text-accent-foreground" : "bg-secondary",
                      )}
                    >
                      {message.type === "text" ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span className="text-sm">{message.content}</span>
                        </div>
                      )}
                    </div>
                    <p className={cn("text-xs text-muted-foreground", message.isOwn ? "text-right" : "text-left")}>
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button type="button" variant="ghost" size="icon" className="h-6 w-6">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-6 w-6">
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
