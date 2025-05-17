"use client";
import { Dumbbell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./member-mobile-nav";
import Link from "next/link";

export function AdminHeader() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* LEFT BRAND SECTION  */}
        <div className="flex items-center space-x-2 group">
          <div className="relative">
            <Dumbbell className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <span className="font-bold text-lg flex gap-1">
            FitLife <span className="text-primary">Gym</span>
          </span>

          <div className="flex items-center justify-center">
            <h3 className="font-bold text-xl italic text-blue-600">Admin Dashboard</h3>
          </div>
        </div>
        {/* LEFT SIDE OF THE HEADER */}
        <div className="flex items-center">
          <div className="space-x-4">
            <Link href={"/admin/dashboard"}>Dashboard</Link>
            <Link href={"/admin/overview"}>Overview</Link>
          </div>
          <ThemeToggle />
          {/* MOBILE MENU */}
          <div className="">
           {/* <MobileNav /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
