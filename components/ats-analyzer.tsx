"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, FileText } from "lucide-react"

interface ATSAnalyzerProps {
  formData: any
  atsScore: number
}

export function ATSAnalyzer({ formData, atsScore }: ATSAnalyzerProps) {
  const getATSAnalysis = () => {
    const analysis = {
      strengths: [] as string[],
      weaknesses: [] as string[],
      suggestions: [] as string[],
      criticalIssues: [] as string[],
    }

    // Personal Information Analysis
    if (formData.firstName && formData.lastName && formData.email) {
      analysis.strengths.push("Complete contact information provided")
    } else {
      analysis.criticalIssues.push("Missing essential contact information")
    }

    if (formData.phone) {
      analysis.strengths.push("Phone number included for easy contact")
    } else {
      analysis.suggestions.push("Add phone number to improve recruiter accessibility")
    }

    if (formData.linkedin) {
      analysis.strengths.push("LinkedIn profile linked for professional networking")
    } else {
      analysis.suggestions.push("Add LinkedIn profile to enhance professional presence")
    }

    // Professional Summary Analysis
    if (formData.summary) {
      if (formData.summary.length >= 100) {
        analysis.strengths.push("Comprehensive professional summary provided")
      } else if (formData.summary.length >= 50) {
        analysis.suggestions.push("Expand professional summary to 100+ characters for better impact")
      } else {
        analysis.weaknesses.push("Professional summary too brief")
      }
    } else {
      analysis.criticalIssues.push("Missing professional summary - critical for ATS ranking")
    }

    // Education Analysis
    const hasEducation = formData.education[0]?.degree && formData.education[0]?.institution
    if (hasEducation) {
      analysis.strengths.push("Education credentials properly documented")
    } else {
      analysis.weaknesses.push("Education section incomplete")
    }

    // Experience Analysis
    const hasExperience = formData.experience[0]?.title && formData.experience[0]?.company
    if (hasExperience) {
      analysis.strengths.push("Work experience documented")
      if (formData.experience[0]?.description && formData.experience[0].description.length > 100) {
        analysis.strengths.push("Detailed job descriptions provided")
      } else {
        analysis.suggestions.push("Add detailed job descriptions with achievements and metrics")
      }
    } else {
      analysis.criticalIssues.push("No work experience documented")
    }

    // Skills Analysis
    if (formData.skills) {
      const skillCount = formData.skills.split(",").filter((skill: string) => skill.trim()).length
      if (skillCount >= 5) {
        analysis.strengths.push("Comprehensive skills list provided")
      } else {
        analysis.suggestions.push("Add more relevant skills (aim for 8-12 skills)")
      }
    } else {
      analysis.criticalIssues.push("No skills listed - essential for ATS keyword matching")
    }

    // Projects Analysis
    const hasProjects = formData.projects?.some((project: any) => project.name && project.description)
    if (hasProjects) {
      analysis.strengths.push("Projects showcase practical experience")
    } else {
      analysis.suggestions.push("Add relevant projects to demonstrate practical skills")
    }

    return analysis
  }

  const analysis = getATSAnalysis()

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  return (
    <div className="space-y-6">
      {/* ATS Score Overview */}
      <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            ATS Score Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(atsScore)}`}>{atsScore}/100</div>
              <div className="text-sm text-slate-600 mt-1">{getScoreLabel(atsScore)}</div>
              <Progress value={atsScore} className="mt-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-semibold">{analysis.strengths.length}</div>
                <div className="text-xs text-green-700">Strengths</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-red-600 font-semibold">{analysis.criticalIssues.length}</div>
                <div className="text-xs text-red-700">Critical Issues</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="bg-white/80 border-slate-200 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-green-700 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Strengths ({analysis.strengths.length})
              </h4>
              <div className="space-y-1">
                {analysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Critical Issues */}
          {analysis.criticalIssues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-red-700 flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                Critical Issues ({analysis.criticalIssues.length})
              </h4>
              <div className="space-y-1">
                {analysis.criticalIssues.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <XCircle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-amber-700 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Suggestions ({analysis.suggestions.length})
              </h4>
              <div className="space-y-1">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <AlertCircle className="h-3 w-3 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weaknesses */}
          {analysis.weaknesses.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-orange-700 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Areas for Improvement ({analysis.weaknesses.length})
              </h4>
              <div className="space-y-1">
                {analysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <AlertCircle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
