import Link from "next/link"
import { Dumbbell } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Dumbbell className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-lg">
            FitLife <span className="text-primary">Gym</span>
          </span>
        </Link>
        <MainNav className="mx-6 hidden md:flex" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild className="hidden md:flex" size="sm">
              <Link href="/membership" className="flex items-center gap-1">
                <Dumbbell className="h-4 w-4" />
                Join Now
              </Link>
            </Button>
          </nav>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

