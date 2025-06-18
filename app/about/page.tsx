import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Target, Users, Zap, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
          <Link href="/about" className="text-purple-400 font-medium">
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

      {/* About Content */}
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                BlinkFind
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're building the future of productivity with AI-powered tools that save you time and help you achieve
              more.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  To democratize AI and make powerful productivity tools accessible to everyone, regardless of technical
                  expertise.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  A passionate team of AI researchers, developers, and designers working to solve real-world
                  productivity challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  A world where AI handles the mundane tasks, freeing humans to focus on creativity, strategy, and
                  meaningful work.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white text-center">Our Story</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                BlinkFind was born from a simple observation: people spend too much time on repetitive tasks that could
                be automated. Our founders, experienced in both AI research and business operations, saw an opportunity
                to bridge the gap between cutting-edge AI technology and everyday productivity needs.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Starting with our AI Resume Builder, we've helped thousands of job seekers create professional,
                ATS-optimized resumes in minutes instead of hours. But that's just the beginning. We're building a
                comprehensive suite of AI tools designed to handle the tasks that consume your valuable time.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 bg-slate-800/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white">Ready to Transform Your Productivity?</h3>
            <p className="text-gray-300">
              Join thousands of users who are already saving hours every week with BlinkFind.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
              Get Started Free
            </Button>
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
