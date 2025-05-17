"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    // Show success toast
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon!",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Contact Us
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We're here to help. Reach out to us with any questions or inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
                <p className="text-muted-foreground md:text-xl">
                  Have questions about our gym, membership options, or services? Fill out the form and we'll get back to
                  you as soon as possible.
                </p>
              </div>
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      Visit Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>123 Fitness Street, Workout City, WO 12345</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-primary" />
                      Call Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <Link href="tel:+11234567890" className="hover:underline">
                        (123) 456-7890
                      </Link>
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      Email Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <Link href="mailto:info@fitlifegym.com" className="hover:underline">
                        info@fitlifegym.com
                      </Link>
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <p>Monday - Friday: 5:00 AM - 11:00 PM</p>
                      <p>Saturday - Sunday: 7:00 AM - 9:00 PM</p>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject of your message"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      required
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215266754809!2d-73.98784492426285!3d40.75798657138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710534456646!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gym Location"
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community today and transform your life with expert guidance and support.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/membership">Explore Memberships</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/gallery">View Our Facilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

