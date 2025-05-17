import Link from "next/link"
import Image from "next/image"
import { Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-8 w-8 text-primary animate-pulse-glow" />
                <span className="text-lg font-semibold text-primary">FitLife Gym</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Transform Your Body, <span className="text-primary">Transform Your Life</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our community of fitness enthusiasts and achieve your health goals with expert guidance and
                support.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="animate-pulse-glow">
                <Link href="/membership">Join Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 rounded-xl"></div>
            <Image
              src="https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/hero_image.jpg"
              width={800}
              height={800}
              alt="Hero"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg z-20 dark:bg-background/60">
              <span className="text-sm font-bold">Start Today!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

