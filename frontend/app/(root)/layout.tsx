import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Home -  FitLife Gym, transform Your Body, Transform Your Life",
  description:
    "FitLife Gym offers state-of-the-art equipment, expert trainers, and a supportive community to help you achieve your fitness goals.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    
      <div className={`${inter.className} gym-pattern min-h-screen`}>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
      </div>
  )
}



import '../globals.css'