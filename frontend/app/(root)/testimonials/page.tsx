import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Testimonials
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Hear what our members have to say about their fitness journey with us
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Member Success Stories</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Real transformations from real members
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Before and after transformation"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <blockquote className="text-lg font-medium">
                  "I lost 50 pounds in 6 months with the help of the trainers at FitLife. The supportive community kept
                  me motivated throughout my journey."
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">Sarah J.</p>
                  <p className="text-sm text-muted-foreground">Member since 2021</p>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Before and after transformation"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <blockquote className="text-lg font-medium">
                  "After years of trying different gyms, I finally found my fitness home at FitLife. The personalized
                  approach has helped me build muscle and confidence."
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-sm text-muted-foreground">Member since 2020</p>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Before and after transformation"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <Star className="h-5 w-5 fill-primary text-primary" />
                </div>
                <blockquote className="text-lg font-medium">
                  "As a senior, I was hesitant to join a gym. The staff at FitLife created a program specifically for my
                  needs, and I've never felt better!"
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">Eleanor R.</p>
                  <p className="text-sm text-muted-foreground">Member since 2022</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Share Your Story</h2>
              <p className="text-muted-foreground md:text-xl">
                We love hearing about our members' fitness journeys. If you have a success story you'd like to share,
                we'd love to feature it on our website.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="/contact">Submit Your Story</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                width={1280}
                height={720}
                alt="Members celebrating fitness achievements"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Success Story Today
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community and begin your fitness journey with expert guidance and support.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/membership">Join Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

