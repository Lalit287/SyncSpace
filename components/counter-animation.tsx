"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CounterProps {
  end: number
  duration?: number
  label: string
  prefix?: string
  suffix?: string
}

export default function Counter({ end, duration = 2000, label, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const countRef = useRef(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      let startTime: number
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
        const currentCount = Math.floor(easeOutQuart * end)

        setCount(currentCount)
        countRef.current = currentCount

        if (percentage < 1) {
          requestAnimationFrame(animateCount)
        }
      }

      requestAnimationFrame(animateCount)
    }
  }, [isInView, end, duration, hasAnimated])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl font-bold text-primary">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  )
}
