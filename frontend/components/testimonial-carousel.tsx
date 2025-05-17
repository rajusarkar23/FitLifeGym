"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Member since 2019",
    content:
      "FitLife Gym has completely transformed my fitness journey. The trainers are knowledgeable and supportive, and the community keeps me motivated. I've lost 30 pounds and gained so much confidence!",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Member since 2021",
    content:
      "I've tried many gyms over the years, but FitLife is by far the best. The facilities are always clean, the equipment is top-notch, and the staff genuinely cares about your progress. I look forward to my workouts every day!",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Member since 2020",
    content:
      "As someone who was intimidated by gyms, FitLife made me feel welcome from day one. The personalized workout plans and nutrition guidance have helped me achieve results I never thought possible.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Member since 2022",
    content:
      "The group classes at FitLife are amazing! The instructors are energetic and motivating, and I've made great friends in the process. It doesn't even feel like working out anymore - it's just fun!",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = React.useState(0)
  const [autoplay, setAutoplay] = React.useState(true)

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  React.useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [autoplay, current])

  return (
    <div className="relative" onMouseEnter={() => setAutoplay(false)} onMouseLeave={() => setAutoplay(true)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-none relative overflow-hidden">
                <div className="absolute -top-10 -left-10 text-primary/10 dark:text-primary/5">
                  <Quote className="h-32 w-32" />
                </div>
                <CardContent className="flex flex-col items-center p-6 text-center relative z-10">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center space-x-1 py-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="mb-6 max-w-2xl text-lg font-medium italic">"{testimonial.content}"</blockquote>
                  <div className="text-center">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        onClick={prev}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous testimonial</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        onClick={next}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next testimonial</span>
      </Button>
      <div className="mt-4 flex justify-center space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-6" : "bg-muted hover:bg-primary/50"
            }`}
            onClick={() => setCurrent(i)}
          >
            <span className="sr-only">Testimonial {i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

