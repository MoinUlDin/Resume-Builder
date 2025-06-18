"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
  Code,
} from "lucide-react"
import Link from "next/link"

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState("personal")
  const [atsScore, setAtsScore] = useState(0)
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
        technologies: "",
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
    if (formData.firstName && formData.lastName) score += 10
    if (formData.email) score += 10
    if (formData.summary && formData.summary.length > 50) score += 30
    if (formData.education[0].degree && formData.education[0].institution) score += 20
    if (formData.experience[0].title && formData.experience[0].company) score += 20
    if (formData.skills) score += 10
    setAtsScore(score)
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
          technologies: "",
        },
      ],
    })
  }

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
          <Link href="/resume-builder" className="text-purple-400 font-medium">
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

      {/* Resume Builder Content */}
      <div className="container mx-auto px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">AI Resume Builder</h1>
            <p className="text-gray-300">Create your professional resume step by step</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-purple-600">
                    <User className="h-4 w-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="education" className="data-[state=active]:bg-purple-600">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="data-[state=active]:bg-purple-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">
                    <Code className="h-4 w-4 mr-2" />
                    Skills & Projects
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal" className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Personal Information</CardTitle>
                      <CardDescription className="text-gray-400">Basic information about yourself</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                          <div className="text-xs text-gray-400">{getFieldProgress(formData.firstName)}%</div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                          <div className="text-xs text-gray-400">{getFieldProgress(formData.lastName)}%</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <div className="text-xs text-gray-400">{getFieldProgress(formData.email)}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <div className="text-xs text-gray-400">{getFieldProgress(formData.phone)}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-white">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <div className="text-xs text-gray-400">{getFieldProgress(formData.location)}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-white">
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="text-white">
                          Portfolio/Website
                        </Label>
                        <Input
                          id="portfolio"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="summary" className="text-white">
                          Professional Summary
                        </Label>
                        <Textarea
                          id="summary"
                          value={formData.summary}
                          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                          placeholder="Write a compelling professional summary..."
                        />
                        <div className="text-xs text-gray-400">{getFieldProgress(formData.summary)}%</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Education */}
                <TabsContent value="education" className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-white">Education</CardTitle>
                          <CardDescription className="text-gray-400">Your educational background</CardDescription>
                        </div>
                        <Button onClick={addEducation} size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="space-y-4 p-4 border border-slate-600 rounded-lg">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-medium">Education {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newEducation = formData.education.filter((_, i) => i !== index)
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white">Degree/Qualification *</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].degree = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">Institution/University *</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].institution = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white">Location</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].location = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">GPA (Optional)</Label>
                              <Input
                                value={edu.gpa}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].gpa = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white">Start Date</Label>
                              <Input
                                type="date"
                                value={edu.startDate}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].startDate = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">End Date</Label>
                              <Input
                                type="date"
                                value={edu.endDate}
                                onChange={(e) => {
                                  const newEducation = [...formData.education]
                                  newEducation[index].endDate = e.target.value
                                  setFormData({ ...formData, education: newEducation })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Relevant Coursework, Projects, or Achievements</Label>
                            <Textarea
                              value={edu.achievements}
                              onChange={(e) => {
                                const newEducation = [...formData.education]
                                newEducation[index].achievements = e.target.value
                                setFormData({ ...formData, education: newEducation })
                              }}
                              className="bg-slate-700 border-slate-600 text-white"
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
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-white">Experience</CardTitle>
                          <CardDescription className="text-gray-400">Your work experience</CardDescription>
                        </div>
                        <Button onClick={addExperience} size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {formData.experience.map((exp, index) => (
                        <div key={index} className="space-y-4 p-4 border border-slate-600 rounded-lg">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-medium">Experience {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newExperience = formData.experience.filter((_, i) => i !== index)
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white">Job Title</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].title = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].company = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-white">Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].location = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">Start Date</Label>
                              <Input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].startDate = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-white">End Date</Label>
                              <Input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => {
                                  const newExperience = [...formData.experience]
                                  newExperience[index].endDate = e.target.value
                                  setFormData({ ...formData, experience: newExperience })
                                }}
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">Job Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => {
                                const newExperience = [...formData.experience]
                                newExperience[index].description = e.target.value
                                setFormData({ ...formData, experience: newExperience })
                              }}
                              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </div>
                      ))}

                      {formData.experience.length === 0 && (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                          <p className="text-gray-400">No work experience added yet</p>
                          <Badge variant="destructive" className="mt-2">
                            Issues
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Skills & Projects */}
                <TabsContent value="skills" className="space-y-6">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Skills & Projects</CardTitle>
                      <CardDescription className="text-gray-400">Showcase your abilities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="skills" className="text-white">
                          Skills
                        </Label>
                        <Textarea
                          id="skills"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="List your technical and soft skills..."
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-white">Projects</Label>
                          <Button onClick={addProject} size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Project
                          </Button>
                        </div>

                        {formData.projects.map((project, index) => (
                          <div key={index} className="space-y-4 p-4 border border-slate-600 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="text-white font-medium">Project {index + 1}</h4>
                              {index > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newProjects = formData.projects.filter((_, i) => i !== index)
                                    setFormData({ ...formData, projects: newProjects })
                                  }}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label className="text-white">Project Name</Label>
                                <Input
                                  value={project.name}
                                  onChange={(e) => {
                                    const newProjects = [...formData.projects]
                                    newProjects[index].name = e.target.value
                                    setFormData({ ...formData, projects: newProjects })
                                  }}
                                  className="bg-slate-700 border-slate-600 text-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-white">Description</Label>
                                <Textarea
                                  value={project.description}
                                  onChange={(e) => {
                                    const newProjects = [...formData.projects]
                                    newProjects[index].description = e.target.value
                                    setFormData({ ...formData, projects: newProjects })
                                  }}
                                  className="bg-slate-700 border-slate-600 text-white"
                                  placeholder="Describe the project and your role..."
                                />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-white">Technologies Used</Label>
                                <Input
                                  value={project.technologies}
                                  onChange={(e) => {
                                    const newProjects = [...formData.projects]
                                    newProjects[index].technologies = e.target.value
                                    setFormData({ ...formData, projects: newProjects })
                                  }}
                                  className="bg-slate-700 border-slate-600 text-white"
                                  placeholder="React, Node.js, MongoDB..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {(!formData.skills || formData.projects.length === 0) && (
                          <div className="text-center py-4">
                            <Badge variant="destructive">Issues</Badge>
                            <p className="text-gray-400 text-sm mt-2">Add skills and projects to improve your resume</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* ATS Score */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">ATS Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">{atsScore}/100</div>
                      <Progress value={atsScore} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Suggestions</h4>
                      <div className="space-y-2 text-sm">
                        {!formData.summary && (
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                            <span className="text-gray-400">Professional summary is crucial for ATS ranking</span>
                          </div>
                        )}
                        {!formData.skills && (
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                            <span className="text-gray-400">Add relevant skills to improve visibility</span>
                          </div>
                        )}
                        {!formData.experience[0].title && (
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                            <span className="text-gray-400">Work experience section is empty</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Overall Progress</span>
                      <span className="text-sm text-white">{getOverallProgress()}%</span>
                    </div>
                    <Progress value={getOverallProgress()} />

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Personal Info</span>
                        <span className="text-gray-300">
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
                        <span className="text-gray-400">Education</span>
                        <span className="text-gray-300">
                          {formData.education[0].degree && formData.education[0].institution ? "100" : "0"}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Experience</span>
                        <span className="text-gray-300">
                          {formData.experience[0].title && formData.experience[0].company ? "100" : "0"}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Skills</span>
                        <span className="text-gray-300">{formData.skills ? "100" : "0"}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={updateAtsScore}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Update ATS Score
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-white/10">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Resume
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={atsScore < 50}>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
