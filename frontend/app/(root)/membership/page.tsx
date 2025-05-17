import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MembershipPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Membership Plans
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the perfect membership plan that fits your fitness goals and lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="monthly" className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>Essential gym access for casual fitness enthusiasts</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <span className="text-4xl font-bold">$29</span>
                      <span className="text-muted-foreground"> /month</span>
                    </div>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Access to main gym area</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Standard operating hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Fitness assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Locker room access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Free WiFi</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href={"/auth/signin"} className="bg-primary w-full h-10 items-center flex justify-center rounded text-white">Join Now</Link>
                  </CardFooter>
                </Card>
                <Card className="border-primary">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground rounded-full">
                        Most Popular
                      </span>
                    </div>
                    <CardTitle>Premium</CardTitle>
                    <CardDescription className="text-primary-foreground/90">
                      Our most popular plan for fitness enthusiasts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <span className="text-4xl font-bold">$49</span>
                      <span className="text-muted-foreground"> /month</span>
                    </div>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>24/7 gym access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Group fitness classes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Personalized workout plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Nutrition consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Fitness tracking app</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Guest passes (2/month)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                  <Link href={"/auth/signin"} className="bg-primary w-full h-10 items-center flex justify-center rounded text-white">Join Now</Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Elite</CardTitle>
                    <CardDescription>Ultimate fitness experience with premium perks</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <span className="text-4xl font-bold">$79</span>
                      <span className="text-muted-foreground"> /month</span>
                    </div>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>All Premium features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Personal training sessions (2/month)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Spa & recovery services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Priority class booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Towel service</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Exclusive member events</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Guest passes (unlimited)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                  <Link href={"/auth/signin"} className="bg-primary w-full h-10 items-center flex justify-center rounded text-white">Join Now</Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="annual" className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>Essential gym access for casual fitness enthusiasts</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <span className="text-4xl font-bold">$279</span>
                      <span className="text-muted-foreground"> /year</span>
                      <p className="text-sm text-muted-foreground">$23.25/month, billed annually</p>
                    </div>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Access to main gym area</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Standard operating hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Fitness assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Locker room access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Free WiFi</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Now</Button>
                  </CardFooter>
                </Card>
                <Card className="border-primary">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground rounded-full">
                        Most Popular
                      </span>
                    </div>
                    <CardTitle>Premium</CardTitle>
                    <CardDescription className="text-primary-foreground/90">
                      Our most popular plan for fitness enthusiasts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <span className="text-4xl font-bold">$469</span>
                      <span className="text-muted-foreground"> /year</span>
                      <p className="text-sm text-muted-foreground">$39.08/month, billed annually</p>
                    </div>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>24/7 gym access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Group fitness classes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Personalized workout plan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Nutrition consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Fitness tracking app</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Guest passes (2/month)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Elite</CardTitle>
                    <CardDescription>Ultimate fitness experience with premium perks</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div>
                      <span className="text-4xl font-bold">$759</span>
                      <span className="text-muted-foreground"> /year</span>
                      <p className="text-sm text-muted-foreground">$63.25/month, billed annually</p>
                    </div>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>All Premium features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Personal training sessions (2/month)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Spa & recovery services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Priority class booking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Towel service</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Exclusive member events</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Guest passes (unlimited)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground md:text-xl">
                Find answers to common questions about our membership plans
              </p>
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I freeze my membership?</h3>
                <p className="text-muted-foreground">
                  Yes, you can freeze your membership for up to 3 months per year with a small administrative fee.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Is there a joining fee?</h3>
                <p className="text-muted-foreground">
                  There is a one-time joining fee of $49 for all new members, which covers your initial fitness
                  assessment and setup.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Can I upgrade my membership?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade your membership at any time. The new rate will be prorated for the remainder of
                  your billing cycle.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">What is your cancellation policy?</h3>
                <p className="text-muted-foreground">
                  We require 30 days notice for cancellation. Please visit the front desk or contact us to initiate the
                  process.
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community today and transform your life with expert guidance and support.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

