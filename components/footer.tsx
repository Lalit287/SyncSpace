import Link from "next/link"
import { Code, Github, Twitter, Linkedin, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background-dark text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">TeamUp</span>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              Connect with developers and creators for hackathons and collaborative projects.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://github.com"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/communities" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Communities
                </Link>
              </li>
              <li>
                <Link href="/hackathons" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">hello@teamup.dev</span>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} TeamUp. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
