"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"



export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // paths
  const pathname = usePathname()
  const about = "/about"
  const home = "/"
  const membership = "/membership"
  const gallery = "/gallery"
  const testimonials = "/testimonials"
  const contact = "/contact"

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className={`${pathname === home ? "text-primary font-medium hover:text-primary": "text-sm font-medium transition-colors hover:text-primary"}`}>
        Home
      </Link>
      <Link href="/membership" className={`${pathname === membership ? "text-primary font-medium hover:text-primary" :  "text-sm font-medium transition-colors hover:text-primary"}`}>
        Membership
      </Link>
      <Link href="/about" className={`${pathname === about ? "text-primary font-medium hover:text-primary" :  "text-sm font-medium transition-colors hover:text-primary"}`}>
        About
      </Link>
      <Link href="/gallery" className={`${pathname === gallery ? "text-primary font-medium hover:text-primary" :  "text-sm font-medium transition-colors hover:text-primary"}`}>
        Gallery
      </Link>
      <Link href="/testimonials" className={`${pathname === testimonials ? "text-primary font-medium hover:text-primary" :  "text-sm font-medium transition-colors hover:text-primary"}`}>
        Testimonials
      </Link>
      <Link href="/contact" className={`${pathname === contact ? "text-primary font-medium hover:text-primary" :  "text-sm font-medium transition-colors hover:text-primary"}`}>
        Contact
      </Link>
    </nav>
  )
}

