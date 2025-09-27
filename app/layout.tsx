import type React from "react"
import type { Metadata } from "next"
import { Comfortaa } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Waypoint — Connection Engine",
  description:
    "Do more, together. Plan solo, meet a new crew, or go with friends—across nightlife, beaches, hikes, cafés, events, and beyond.",
  generator: "Waypoint",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${comfortaa.variable} antialiased`}>
        <Suspense>
          {children}
          <Analytics />
          <Toaster richColors position="bottom-center" />
        </Suspense>
      </body>
    </html>
  )
}
