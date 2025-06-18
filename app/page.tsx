import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, FileText, CheckCircle, LogIn, UserPlus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-slate-900">
            Blink<span className="text-indigo-600">Find</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/about" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
            About Us
          </Link>
          <Link href="/resume-builder" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium">
            Resume Builder
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-slate-700 hover:bg-slate-100">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
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
            <div className="flex items-center space-x-2 text-indigo-600">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium bg-indigo-50 px-3 py-1 rounded-full">
                Your Everyday AI for Smarter Living & Working
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900">
                <span>Turn </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Hours of Work
                </span>
                <span> Into</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Minutes
                </span>
                <span> — With </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Apply for jobs, plan your day, automate your business — all without switching between tools.
              </p>

              <p className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-lg inline-block">
                Built for busy people who want real results.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-lg">
                Start Free
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                How It Works
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Product Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-sm bg-white/80 border-slate-200 backdrop-blur-sm shadow-xl">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium bg-blue-50 px-2 py-1 rounded">AI Products</span>
                </div>

                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-xl">
                  <FileText className="h-8 w-8 text-indigo-600" />
                </div>

                <div>
                  <CardTitle className="text-slate-900 text-xl">AI Resume Builder</CardTitle>
                  <CardDescription className="text-slate-600 mt-2">
                    Create ATS-optimized resumes in minutes with AI-powered suggestions
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Create Resume in 5 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>ATS Scoring</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Job-Specific Content</span>
                  </div>
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                  Explore AI Resume Builder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
