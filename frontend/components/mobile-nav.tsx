"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useMobile()

  if (!isMobile) return null

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col space-y-4 py-4">
          <Link href="/" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/membership" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Membership
          </Link>
          <Link href="/about" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/gallery" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <Link href="/testimonials" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Testimonials
          </Link>
          <Link href="/contact" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Button asChild className="mt-4">
            <Link href="/membership" onClick={() => setOpen(false)}>
              Join Now
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

