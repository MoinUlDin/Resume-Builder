import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Target, Users, Zap, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
          <Link href="/about" className="text-indigo-600 font-medium">
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

      {/* About Content */}
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                BlinkFind
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We're building the future of productivity with AI-powered tools that save you time and help you achieve
              more.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-slate-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  To democratize AI and make powerful productivity tools accessible to everyone, regardless of technical
                  expertise.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  A passionate team of AI researchers, developers, and designers working to solve real-world
                  productivity challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  A world where AI handles the mundane tasks, freeing humans to focus on creativity, strategy, and
                  meaningful work.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center">Our Story</h2>
            <div className="bg-white/60 rounded-2xl p-8 backdrop-blur-sm border border-slate-200">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  BlinkFind was born from a simple observation: people spend too much time on repetitive tasks that
                  could be automated. Our founders, experienced in both AI research and business operations, saw an
                  opportunity to bridge the gap between cutting-edge AI technology and everyday productivity needs.
                </p>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Starting with our AI Resume Builder, we've helped thousands of job seekers create professional,
                  ATS-optimized resumes in minutes instead of hours. But that's just the beginning. We're building a
                  comprehensive suite of AI tools designed to handle the tasks that consume your valuable time.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-slate-900">Ready to Transform Your Productivity?</h3>
            <p className="text-slate-600">
              Join thousands of users who are already saving hours every week with BlinkFind.
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-lg">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
