import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, FileText, CheckCircle, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold text-white">
            Blink<span className="text-purple-400">Find</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-purple-300 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-purple-300 transition-colors">
            About Us
          </Link>
          <Link href="/resume-builder" className="text-white hover:text-purple-300 transition-colors">
            Resume Builder
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Tagline */}
            <div className="flex items-center space-x-2 text-purple-300">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium">Your Everyday AI for Smarter Living & Working</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Turn </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Hours of Work
                </span>
                <span className="text-white"> Into</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Minutes
                </span>
                <span className="text-white"> — With </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
              </h1>

              <p className="text-lg text-gray-300 max-w-lg">
                Apply for jobs, plan your day, automate your business — all without switching between tools.
              </p>

              <p className="text-sm text-gray-400">Built for busy people who want real results.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                Start Free
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                How It Works →
              </Button>
            </div>
          </div>

          {/* Product Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-sm bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-400">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">AI Products</span>
                </div>

                <div className="flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-400" />
                </div>

                <div>
                  <CardTitle className="text-white text-xl">AI Resume Builder</CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    Create ATS-optimized resumes in minutes with AI-powered suggestions
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Create Resume in 5 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>ATS Scoring</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Job-Specific Content</span>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Explore AI Resume Builder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
