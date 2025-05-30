"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    content: "TeamUp helped me find the perfect teammates for our hackathon project. We ended up winning first place!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "UX Designer",
    company: "DesignHub",
    content:
      "As a designer, I was looking for developers to bring my ideas to life. TeamUp connected me with amazing talent!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Backend Engineer",
    company: "DataSystems",
    content:
      "The skill-matching algorithm is spot on. I found team members with complementary skills to mine within days.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-accent opacity-20">
        <Quote size={80} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-6">
            <img
              src={testimonials[current].avatar || "/placeholder.svg"}
              alt={testimonials[current].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-accent"
            />
          </div>

          <blockquote className="text-xl md:text-2xl italic mb-6 max-w-2xl">
            "{testimonials[current].content}"
          </blockquote>

          <div className="font-semibold text-lg">{testimonials[current].name}</div>
          <div className="text-sm text-muted-foreground">
            {testimonials[current].role} at {testimonials[current].company}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              current === index ? "bg-accent scale-125" : "bg-muted",
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 md:-translate-x-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent/20"
          onClick={() => {
            prev()
            setAutoplay(false)
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 md:translate-x-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent/20"
          onClick={() => {
            next()
            setAutoplay(false)
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
