"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ATSAnalyzer } from "@/components/ats-analyzer"
import { supabase } from "@/lib/supabase"
import {
  Star,
  LogIn,
  UserPlus,
  Download,
  Eye,
  Sparkles,
  AlertCircle,
  Plus,
  Trash2,
  User,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Upload,
  Calendar,
  Users,
  Building,
  Save,
} from "lucide-react"
import Link from "next/link"

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState("personal")
  const [atsScore, setAtsScore] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    education: [
      {
        degree: "",
        institution: "",
        location: "",
        gpa: "",
        startDate: "",
        endDate: "",
        achievements: "",
      },
    ],
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: "",
    projects: [
      {
        name: "",
        description: "",
        skills: [] as string[],
        media: [] as string[],
        additionalDetails: "",
        isCurrentlyWorking: false,
        startDate: "",
        endDate: "",
        contributors: [] as string[],
        associatedWith: "",
      },
    ],
  })

  const getFieldProgress = (value: string) => {
    return value.trim() ? 100 : 0
  }

  const getOverallProgress = () => {
    const requiredFields = [formData.firstName, formData.lastName, formData.email, formData.summary]
    const filledFields = requiredFields.filter((field) => field.trim()).length
    return Math.round((filledFields / requiredFields.length) * 100)
  }

  const updateAtsScore = () => {
    let score = 0

    // Personal Information (20 points)
    if (formData.firstName && formData.lastName) score += 5
    if (formData.email) score += 5
    if (formData.phone) score += 5
    if (formData.location) score += 5

    // Professional Summary (30 points)
    if (formData.summary) {
      if (formData.summary.length >= 100) score += 30
      else if (formData.summary.length >= 50) score += 20
      else score += 10
    }

    // Education (15 points)
    if (formData.education[0].degree && formData.education[0].institution) score += 15

    // Experience (20 points)
    if (formData.experience[0].title && formData.experience[0].company) {
      score += 10
      if (formData.experience[0].description && formData.experience[0].description.length > 100) {
        score += 10
      }
    }

    // Skills (10 points)
    if (formData.skills) {
      const skillCount = formData.skills.split(",").filter((skill) => skill.trim()).length
      if (skillCount >= 5) score += 10
      else score += 5
    }

    // Projects (5 points)
    if (formData.projects.some((project) => project.name && project.description)) {
      score += 5
    }

    setAtsScore(Math.min(score, 100))
  }

  const saveToSupabase = async () => {
    setIsSaving(true)
    try {
      const { data, error } = await supabase.from("resumes").upsert({
        user_id: "anonymous", // Replace with actual user ID when auth is implemented
        form_data: formData,
        ats_score: atsScore,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      console.log("Resume saved successfully")
    } catch (error) {
      console.error("Error saving resume:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          institution: "",
          location: "",
          gpa: "",
          startDate: "",
          endDate: "",
          achievements: "",
        },
      ],
    })
  }

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: "",
          description: "",
          skills: [],
          media: [],
          additionalDetails: "",
          isCurrentlyWorking: false,
          startDate: "",
          endDate: "",
          contributors: [],
          associatedWith: "",
        },
      ],
    })
  }

  const addSkillToProject = (projectIndex: number, skill: string) => {
    if (skill.trim()) {
      const newProjects = [...formData.projects]
      newProjects[projectIndex].skills.push(skill.trim())
      setFormData({ ...formData, projects: newProjects })
    }
  }

  const removeSkillFromProject = (projectIndex: number, skillIndex: number) => {
    const newProjects = [...formData.projects]
    newProjects[projectIndex].skills.splice(skillIndex, 1)
    setFormData({ ...formData, projects: newProjects })
  }

  useEffect(() => {
    updateAtsScore()
  }, [formData])

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
          <Link href="/resume-builder" className="text-indigo-600 font-medium">
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

      {/* Resume Builder Content */}
      <div className="container mx-auto px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-indigo-600">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium bg-indigo-50 px-3 py-1 rounded-full">AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Create Your Perfect Resume in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Minutes
              </span>
            </h1>
            <p className="text-slate-600">Create your professional resume step by step with AI assistance</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 shadow-sm">
                  <TabsTrigger
                    value="personal"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 text-slate-900 font-medium"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 text-slate-900 font-medium"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 text-slate-900 font-medium"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 text-slate-900 font-medium"
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Projects
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal" className="space-y-6">
                  <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-slate-900">Personal Information</CardTitle>
                      <CardDescription className="text-slate-600">Basic information about yourself</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-slate-700 font-medium">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          <div className="text-xs text-slate-500">{getFieldProgress(formData.firstName)}%</div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-slate-700 font-medium">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          <div className="text-xs text-slate-500">{getFieldProgress(formData.lastName)}%</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <div className="text-xs text-slate-500">{getFieldProgress(formData.email)}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700 font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <div className="text-xs text-slate-500">{getFieldProgress(formData.phone)}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-slate-700 font-medium">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <div className="text-xs text-slate-500">{getFieldProgress(formData.location)}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-slate-700 font-medium">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="text-slate-700 font-medium">
                          Portfolio/Website
                        </Label>
                        <Input
                          id="portfolio"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="summary" className="text-slate-700 font-medium">
                          Professional Summary *
                        </Label>
                        <Textarea
                          id="summary"
                          value={formData.summary}
                          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                          className="bg-white border-slate-300 text-slate-900 min-h-[120px] focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Write a compelling professional summary..."
                        />
                        <div className="text-xs text-slate-500">{getFieldProgress(formData.summary)}%</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Education */}
                <TabsContent value="education" className="space-y-6">
                  <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-slate-900">Education</CardTitle>
                          <CardDescription className="text-slate-600">Your educational background</CardDescription>
                        </div>
                        <Button
                          onClick={addEducation}
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                          <div className="flex justify-between items-center">
                            <h4 className="text-slate-900 font-medium">Education {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newEducation = formData.education.filter((_, i) => i !== index)
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Degree/Qualification *</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].degree = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Institution/University *</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].institution = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Location</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].location = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">GPA (Optional)</Label>
                              <Input
                                value={edu.gpa}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].gpa = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Start Date</Label>
                              <Input
                                type="date"
                                value={edu.startDate}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].startDate = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">End Date</Label>
                              <Input
                                type="date"
                                value={edu.endDate}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].endDate = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Relevant Coursework, Projects, or Achievements
                            </Label>
                            <Textarea
                              value={edu.achievements}
                              onChange={(e) => {
                                const newEducation = [...formData.education]
                                newEducation[index].achievements = e.target.value
                                setFormData({ ...formData, education: newEducation })
                              }}
                              className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="List relevant coursework, projects, or achievements..."
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience */}
                <TabsContent value="experience" className="space-y-6">
                  <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-slate-900">Experience</CardTitle>
                          <CardDescription className="text-slate-600">Your work experience</CardDescription>
                        </div>
                        <Button
                          onClick={addExperience}
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                          <div className="flex justify-between items-center">
                            <h4 className="text-slate-900 font-medium">Experience {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newExperience = formData.experience.filter((_, i) => i !== index)
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Job Title</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].title = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].company = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].location = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">Start Date</Label>
                              <Input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].startDate = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium">End Date</Label>
                              <Input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].endDate = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">Job Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => {
                                const newExperience = [...formData.experience]
                                newExperience[index].description = e.target.value
                                setFormData({ ...formData, experience: newExperience })
                              }}
                              className="bg-white border-slate-300 text-slate-900 min-h-[100px] focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      ))}

                      {formData.experience.length === 0 && (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                          <p className="text-slate-600">No work experience added yet</p>
                          <Badge variant="destructive" className="mt-2">
                            Issues
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Projects */}
                <TabsContent value="projects" className="space-y-6">
                  <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-slate-900">Projects</CardTitle>
                          <CardDescription className="text-slate-600">
                            Showcase your projects and achievements
                          </CardDescription>
                        </div>
                        <Button onClick={addProject} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {formData.projects.map((project, index) => (
                        <div key={index} className="space-y-6 p-6 border border-slate-200 rounded-lg bg-slate-50/50">
                          <div className="flex justify-between items-center">
                            <h4 className="text-slate-900 font-medium text-lg">Project {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newProjects = formData.projects.filter((_, i) => i !== index)
                                  setFormData({ ...formData, projects: newProjects })
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {/* Project Name */}
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">Project Name *</Label>
                            <Input
                              value={project.name}
                              onChange={(e) => {
                                const newProjects = [...formData.projects]
                                newProjects[index].name = e.target.value
                                setFormData({ ...formData, projects: newProjects })
                              }}
                              className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="Enter project name"
                            />
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...formData.projects]
                                newProjects[index].description = e.target.value
                                setFormData({ ...formData, projects: newProjects })
                              }}
                              className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                              placeholder="Describe the project and your role..."
                              maxLength={2000}
                            />
                            <div className="text-xs text-slate-500">
                              {project.description.length}/2,000 - 2000 maximum characters allowed.
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="space-y-3">
                            <Label className="text-slate-700 font-medium">Skills</Label>
                            <p className="text-sm text-slate-600">
                              We recommend adding your top 5 used in this project. They'll also appear in your Skills
                              section.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.skills.map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="secondary"
                                  className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                                >
                                  {skill}
                                  <button
                                    onClick={() => removeSkillFromProject(index, skillIndex)}
                                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add a skill"
                                className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    const input = e.target as HTMLInputElement
                                    addSkillToProject(index, input.value)
                                    input.value = ""
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={(e) => {
                                  const input = (e.target as HTMLElement).parentElement?.querySelector(
                                    "input",
                                  ) as HTMLInputElement
                                  if (input) {
                                    addSkillToProject(index, input.value)
                                    input.value = ""
                                  }
                                }}
                                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                              >
                                Add skill
                              </Button>
                            </div>
                          </div>

                          {/* Media */}
                          <div className="space-y-3">
                            <Label className="text-slate-700 font-medium">Media</Label>
                            <p className="text-sm text-slate-600">
                              Add media like images, documents, sites or presentations. Learn more about media file
                              types supported
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-slate-300 text-slate-700 hover:bg-slate-50"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Add media
                            </Button>
                          </div>

                          {/* Additional Details */}
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">Additional Details</Label>
                            <Textarea
                              value={project.additionalDetails}
                              onChange={(e) => {
                                const newProjects = [...formData.projects]
                                newProjects[index].additionalDetails = e.target.value
                                setFormData({ ...formData, projects: newProjects })
                              }}
                              className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="Any additional details about the project..."
                            />
                          </div>

                          {/* Currently Working Checkbox */}
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`currently-working-${index}`}
                              checked={project.isCurrentlyWorking}
                              onCheckedChange={(checked) => {
                                const newProjects = [...formData.projects]
                                newProjects[index].isCurrentlyWorking = checked as boolean
                                setFormData({ ...formData, projects: newProjects })
                              }}
                            />
                            <Label htmlFor={`currently-working-${index}`} className="text-slate-700">
                              I am currently working on this project
                            </Label>
                          </div>

                          {/* Dates */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-700 font-medium flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                Start Date
                              </Label>
                              <div className="grid grid-cols-2 gap-2">
                                <select
                                  value={project.startDate.split("-")[1] || ""}
                                  onChange={(e) => {
                                    const newProjects = [...formData.projects]
                                    const year = project.startDate.split("-")[0] || new Date().getFullYear()
                                    newProjects[index].startDate = `${year}-${e.target.value.padStart(2, "0")}`
                                    setFormData({ ...formData, projects: newProjects })
                                  }}
                                  className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {new Date(0, i).toLocaleString("default", { month: "long" })}
                                    </option>
                                  ))}
                                </select>
                                <Input
                                  type="number"
                                  placeholder="Year"
                                  value={project.startDate.split("-")[0] || ""}
                                  onChange={(e) => {
                                    const newProjects = [...formData.projects]
                                    const month = project.startDate.split("-")[1] || "01"
                                    newProjects[index].startDate = `${e.target.value}-${month}`
                                    setFormData({ ...formData, projects: newProjects })
                                  }}
                                  className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                              </div>
                            </div>

                            {!project.isCurrentlyWorking && (
                              <div className="space-y-2">
                                <Label className="text-slate-700 font-medium flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  End Date
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                  <select
                                    value={project.endDate.split("-")[1] || ""}
                                    onChange={(e) => {
                                      const newProjects = [...formData.projects]
                                      const year = project.endDate.split("-")[0] || new Date().getFullYear()
                                      newProjects[index].endDate = `${year}-${e.target.value.padStart(2, "0")}`
                                      setFormData({ ...formData, projects: newProjects })
                                    }}
                                    className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                                  >
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                      <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                                      </option>
                                    ))}
                                  </select>
                                  <Input
                                    type="number"
                                    placeholder="Year"
                                    value={project.endDate.split("-")[0] || ""}
                                    onChange={(e) => {
                                      const newProjects = [...formData.projects]
                                      const month = project.endDate.split("-")[1] || "01"
                                      newProjects[index].endDate = `${e.target.value}-${month}`
                                      setFormData({ ...formData, projects: newProjects })
                                    }}
                                    className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Contributors */}
                          <div className="space-y-3">
                            <Label className="text-slate-700 font-medium flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              Contributors
                            </Label>
                            <p className="text-sm text-slate-600">Add connections who contributed to the project.</p>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-slate-300 text-slate-700 hover:bg-slate-50"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add contributor
                            </Button>
                          </div>

                          {/* Associated With */}
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              Associated with
                            </Label>
                            <Input
                              value={project.associatedWith}
                              onChange={(e) => {
                                const newProjects = [...formData.projects]
                                newProjects[index].associatedWith = e.target.value
                                setFormData({ ...formData, projects: newProjects })
                              }}
                              className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="Company, organization, or institution"
                            />
                          </div>
                        </div>
                      ))}

                      {/* Skills Section */}
                      <Card className="bg-white border-slate-200">
                        <CardHeader>
                          <CardTitle className="text-slate-900">Skills</CardTitle>
                          <CardDescription className="text-slate-600">
                            List your technical and soft skills
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label htmlFor="skills" className="text-slate-700 font-medium">
                              Skills
                            </Label>
                            <Textarea
                              id="skills"
                              value={formData.skills}
                              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                              className="bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500"
                              placeholder="List your technical and soft skills (e.g., JavaScript, React, Project Management, Communication)"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* ATS Analyzer */}
              <ATSAnalyzer formData={formData} atsScore={atsScore} />

              {/* Progress Overview */}
              <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900">Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Overall Progress</span>
                      <span className="text-sm text-slate-900 font-medium">{getOverallProgress()}%</span>
                    </div>
                    <Progress value={getOverallProgress()} />

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Personal Info</span>
                        <span className="text-slate-700">
                          {Math.round(
                            ([formData.firstName, formData.lastName, formData.email, formData.summary].filter((f) =>
                              f.trim(),
                            ).length /
                              4) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Education</span>
                        <span className="text-slate-700">
                          {formData.education[0].degree && formData.education[0].institution ? "100" : "0"}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Experience</span>
                        <span className="text-slate-700">
                          {formData.experience[0].title && formData.experience[0].company ? "100" : "0"}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Projects</span>
                        <span className="text-slate-700">
                          {formData.projects.some((p) => p.name && p.description) ? "100" : "0"}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Skills</span>
                        <span className="text-slate-700">{formData.skills ? "100" : "0"}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                      onClick={saveToSupabase}
                      disabled={isSaving}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Progress"}
                    </Button>
                    <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Resume
                    </Button>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md"
                      disabled={atsScore < 50}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
