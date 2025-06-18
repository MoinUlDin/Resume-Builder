import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlinkFind - AI-Powered Productivity Platform",
  description:
    "Transform hours of work into minutes with AI. Create ATS-optimized resumes, automate your business, and boost productivity with BlinkFind.",
  keywords: "AI, productivity, resume builder, ATS optimization, automation, artificial intelligence",
  authors: [{ name: "BlinkFind Team" }],
  creator: "BlinkFind",
  publisher: "BlinkFind",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blinkfind.com",
    title: "BlinkFind - AI-Powered Productivity Platform",
    description: "Transform hours of work into minutes with AI-powered tools",
    siteName: "BlinkFind",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlinkFind - AI-Powered Productivity Platform",
    description: "Transform hours of work into minutes with AI-powered tools",
    creator: "@blinkfind",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
