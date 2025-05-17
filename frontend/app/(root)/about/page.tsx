import Image from "next/image"
import Link from "next/link"
import { Dumbbell, Users, Award, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About Our Gym
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Dedicated to helping you achieve your fitness goals since 2010
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Mission</h2>
              <p className="text-muted-foreground md:text-xl">
                At FitLife Gym, our mission is to inspire and empower individuals to transform their lives through
                fitness. We believe that everyone deserves access to high-quality fitness facilities, expert guidance,
                and a supportive community to help them achieve their health and wellness goals.
              </p>
              <p className="text-muted-foreground md:text-xl">
                We are committed to creating an inclusive environment where people of all fitness levels feel welcome
                and motivated to pursue their personal best. Through innovative programs, state-of-the-art equipment,
                and passionate trainers, we strive to make fitness accessible, enjoyable, and sustainable for everyone.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                width={1280}
                height={720}
                alt="Gym interior with modern equipment"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Values</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The core principles that guide everything we do
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <Dumbbell className="h-12 w-12 text-primary" />
                <CardTitle className="text-xl">Excellence</CardTitle>
                <CardDescription>
                  We strive for excellence in all aspects of our service, from our facilities to our programs
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-12 w-12 text-primary" />
                <CardTitle className="text-xl">Community</CardTitle>
                <CardDescription>
                  We foster a supportive community where members motivate and inspire each other
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Award className="h-12 w-12 text-primary" />
                <CardTitle className="text-xl">Integrity</CardTitle>
                <CardDescription>
                  We operate with honesty, transparency, and always put our members' needs first
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-12 w-12 text-primary" />
                <CardTitle className="text-xl">Innovation</CardTitle>
                <CardDescription>
                  We continuously evolve our programs and facilities to incorporate the latest fitness trends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our expert trainers and staff are dedicated to helping you achieve your fitness goals
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  width={160}
                  height={160}
                  alt="John Doe"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-sm text-muted-foreground">Founder & Head Trainer</p>
                <p className="mt-2 text-sm">
                  Certified personal trainer with over 15 years of experience in fitness and nutrition.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  width={160}
                  height={160}
                  alt="Jane Smith"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className="text-sm text-muted-foreground">Nutrition Specialist</p>
                <p className="mt-2 text-sm">
                  Registered dietitian specializing in sports nutrition and weight management.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  width={160}
                  height={160}
                  alt="Mike Johnson"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Mike Johnson</h3>
                <p className="text-sm text-muted-foreground">Fitness Coach</p>
                <p className="mt-2 text-sm">
                  Specialized in strength training and high-intensity interval training (HIIT).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Story</h2>
              <p className="text-muted-foreground md:text-xl">
                FitLife Gym was founded in 2010 by John Doe, a passionate fitness enthusiast with a vision to create a
                gym that was more than just a place to work out. He wanted to build a community where people could come
                together to support each other on their fitness journeys.
              </p>
              <p className="text-muted-foreground md:text-xl">
                Starting with just a small studio and a handful of dedicated members, FitLife has grown into a premier
                fitness destination with state-of-the-art facilities and a thriving community of fitness enthusiasts.
                Today, we continue to expand our offerings and improve our services to help more people achieve their
                health and wellness goals.
              </p>
              <p className="text-muted-foreground md:text-xl">
                Over the years, we've helped thousands of members transform their lives through fitness, and we're just
                getting started.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">2010</h3>
                <p className="text-muted-foreground">FitLife Gym founded with a small studio and basic equipment</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">2013</h3>
                <p className="text-muted-foreground">
                  Expanded to a larger facility and introduced group fitness classes
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">2016</h3>
                <p className="text-muted-foreground">Added specialized training programs and nutrition counseling</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">2019</h3>
                <p className="text-muted-foreground">
                  Renovated facility with state-of-the-art equipment and recovery services
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">2022</h3>
                <p className="text-muted-foreground">
                  Launched digital fitness platform and expanded community programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community</h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Become a part of the FitLife family and start your fitness journey today
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/membership">View Memberships</Link>
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

