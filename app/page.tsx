"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ParticlesBackground from "@/components/particles-background"
import Counter from "@/components/counter-animation"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Code,
  Users,
  MessageSquare,
  Rocket,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
  Star,
  Trophy,
  Target,
} from "lucide-react"

export default function Home() {
  // Animation controls
  const controls = useAnimation()

  // Refs for scroll animations
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)

  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (featuresInView) {
      controls.start("visible")
    }
  }, [controls, featuresInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-accent" />
                <span className="font-bold text-xl">TeamUp</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <ParticlesBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="flex-1 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Build Your <span className="text-accent">Dream Team</span> for Your Next Hackathon
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Connect with like-minded developers, designers, and creators. Find the perfect teammates based on
                skills, interests, and project goals. Join thousands of innovators building the future together.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-6">
                    Join Community <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    Sign In
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">15K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">2.5K+</div>
                  <div className="text-sm text-muted-foreground">Teams Formed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">350+</div>
                  <div className="text-sm text-muted-foreground">Hackathons</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">AI Hackathon 2025</h3>
                          <p className="text-xs text-muted-foreground">Starting in 3 days</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3 bg-background/50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Team Matching</h4>
                            <p className="text-xs text-muted-foreground">3 members found</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-background/50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">New Messages</h4>
                            <p className="text-xs text-muted-foreground">5 unread messages</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-background/50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                            <Rocket className="h-4 w-4 text-secondary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Project Progress</h4>
                            <div className="w-full bg-muted h-1.5 rounded-full mt-1">
                              <div className="bg-accent h-1.5 rounded-full w-[65%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      <h4 className="text-sm font-medium mb-3">Recommended Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">React</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Node.js</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">UI/UX</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">ML</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float"></div>
                <div
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <ChevronRight className="h-6 w-6 rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TeamUp?</h2>
            <p className="text-muted-foreground">
              Our platform is designed to make team formation seamless and effective for hackathons and collaborative
              projects.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Skill-Based Matching</CardTitle>
                  <CardDescription>
                    Find team members with complementary skills to create a balanced team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our advanced algorithm analyzes skills, experience levels, and interests to suggest the most
                    compatible teammates for your project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Real-time Messaging</CardTitle>
                  <CardDescription>
                    Communicate seamlessly with potential teammates and existing team members.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our built-in messaging system supports individual chats, group discussions, and file sharing to keep
                    your team connected.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Rocket className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>Track progress, assign tasks, and manage your hackathon projects.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Keep your team organized with built-in project management tools designed specifically for hackathon
                    projects and timelines.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Hackathon Integration</CardTitle>
                  <CardDescription>
                    Stay updated on upcoming hackathons and find teams specifically for those events.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We partner with hackathon organizers to provide seamless integration and special features for
                    registered events.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Code className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Community Building</CardTitle>
                  <CardDescription>
                    Join interest-based communities to connect with like-minded developers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Participate in discussions, share resources, and build your network within specialized tech
                    communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Verified Profiles</CardTitle>
                  <CardDescription>Connect with confidence through our verification system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All users can verify their skills and experience through GitHub integration and peer endorsements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground">Connecting developers and creators across the globe.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={15000} label="Registered Users" />
            <Counter end={2500} label="Teams Formed" />
            <Counter end={350} label="Hackathons" />
            <Counter end={98} label="Success Rate" suffix="%" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground">
              Hear from developers who found their dream teams through our platform.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Team?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers and creators building amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6"
                >
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Code className="h-6 w-6 text-accent" />
                <span className="font-bold text-xl">TeamUp</span>
              </Link>
              <p className="text-muted-foreground mb-4">
                Building the future of collaborative development, one team at a time.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trophy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Target className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/communities" className="hover:text-accent transition-colors">
                    Communities
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-accent transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/hackathons" className="hover:text-accent transition-colors">
                    Hackathons
                  </Link>
                </li>
                <li>
                  <Link href="/messages" className="hover:text-accent transition-colors">
                    Messages
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-accent transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TeamUp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
