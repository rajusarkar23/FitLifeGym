import Link from "next/link"
import { ChevronRight, Dumbbell, Users, Clock, Award, Zap, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Transform Your Body, Transform Your Life
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide state-of-the-art equipment, expert trainers, and a supportive community to help you achieve
                your fitness goals.
              </p>
            </div>
          </div>

          <div className="dumbbell-divider my-8"></div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden border-primary/20 dark:border-primary/30 group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10"></div>
              <CardHeader className="pb-2 relative">
                <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>
                <Dumbbell className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl">Modern Equipment</CardTitle>
                <CardDescription>State-of-the-art fitness equipment for all your workout needs</CardDescription>
              </CardHeader>
            </Card>
            <Card className="relative overflow-hidden border-primary/20 dark:border-primary/30 group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10"></div>
              <CardHeader className="pb-2 relative">
                <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>
                <Users className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl">Expert Trainers</CardTitle>
                <CardDescription>Certified personal trainers to guide your fitness journey</CardDescription>
              </CardHeader>
            </Card>
            <Card className="relative overflow-hidden border-primary/20 dark:border-primary/30 group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10"></div>
              <CardHeader className="pb-2 relative">
                <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>
                <Clock className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl">24/7 Access</CardTitle>
                <CardDescription>Workout on your schedule with round-the-clock gym access</CardDescription>
              </CardHeader>
            </Card>
            <Card className="relative overflow-hidden border-primary/20 dark:border-primary/30 group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10"></div>
              <CardHeader className="pb-2 relative">
                <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>
                <Award className="h-12 w-12 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl">Results Guaranteed</CardTitle>
                <CardDescription>Proven programs designed to deliver real, lasting results</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Preview */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gym-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Membership Plans</h2>
                <Target className="h-6 w-6 text-primary" />
              </div>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the perfect plan that fits your fitness goals and budget
              </p>
            </div>
          </div>

          <div className="dumbbell-divider my-8"></div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Essential gym access for casual fitness enthusiasts</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold">$29</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Access to main gym area</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Standard operating hours</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Fitness assessment</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors duration-300">
                  <Link href="/membership">Join Now</Link>
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col border-primary relative overflow-hidden group transform hover:scale-105 transition-transform duration-300 z-10 shadow-lg">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground rotate-12">
                BEST
              </div>
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle>Premium</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Our most popular plan for fitness enthusiasts
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold">$49</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>24/7 gym access</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Group fitness classes</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Personalized workout plan</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Nutrition consultation</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full animate-pulse-glow">
                  <Link href="/membership">Join Now</Link>
                </Button>
              </div>
            </Card>
            <Card className="flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <CardTitle>Elite</CardTitle>
                <CardDescription>Ultimate fitness experience with premium perks</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-3xl font-bold">$79</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>All Premium features</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Personal training sessions</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Spa & recovery services</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority class booking</span>
                  </li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors duration-300">
                  <Link href="/membership">Join Now</Link>
                </Button>
              </div>
            </Card>
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/membership" className="flex items-center gap-2">
                View All Membership Details
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Members Say</h2>
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our community about their fitness journey with us
              </p>
            </div>
          </div>

          <div className="dumbbell-divider my-8"></div>

          <div className="mx-auto max-w-5xl py-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 gym-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gym-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community today and transform your life with expert guidance and support.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/membership" className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Memberships
                </Link>
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

