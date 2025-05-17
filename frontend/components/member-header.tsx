"use client";
import { Dumbbell, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./member-mobile-nav";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/config";

export function MemberHeader() {
  const pathname = usePathname();
  const navigate = useRouter();

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
        </div>
        {/* LEFT SIDE OF THE HEADER */}
        <div className="flex items-center">
          <div className="sm:flex hidden space-x-2 mr-2">
            <Link
              href={`/member/dashboard/${useUserStore.getState().username}`}
              className={`${
                pathname.startsWith("/member/dashboard")
                  ? "bg-zinc-900 text-white rounded-full px-3 py-1 font-semibold"
                  : "bg-zinc-200 text-black rounded-full px-3 py-1 font-semibold"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href={`/member/space/${useUserStore.getState().username!}`}
              className={`${
                pathname.startsWith("/member/space")
                  ? "bg-zinc-900 text-white rounded-full px-3 py-1 font-semibold"
                  : "bg-zinc-200 text-black rounded-full px-3 py-1 font-semibold"
              }`}
            >
              Space
            </Link>
            <Link
              href={`/member/profile/${useUserStore.getState().username}`}
              className={`${
                pathname.startsWith("/member/profile")
                  ? "bg-zinc-900 text-white rounded-full px-3 py-1 font-semibold"
                  : "bg-zinc-200 text-black rounded-full px-3 py-1 font-semibold"
              }`}
            >
              Profile
            </Link>
            <div
              className="flex items-center bg-orange-800 text-white hover:bg-red-500 hover:cursor-pointer transition-all rounded-full px-4 font-bold"
              onClick={async () => {
                const sendReq = await fetch(
                  `${NEXT_PUBLIC_BACKEND_URL}/member/logout`,
                  {
                    method: "POST",
                    credentials: "include",
                  }
                );

                const res = await sendReq.json();

                if (res.success) {
                  localStorage.removeItem("userStore");
                  navigate.push("/auth/signin");
                } else {
                  return;
                }
              }}
            >
              Logout <LogOut size={20} className="ml-1"/>
            </div>
          </div>
          <ThemeToggle />
          {/* MOBILE MENU */}
          <div className="">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
