"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";
import { useUserStore } from "@/store/user-store";
import { usePathname, useRouter } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/config";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMobile();
  const pathname = usePathname();
  const navigate = useRouter()

  if (!isMobile) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <SheetTitle>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTitle>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col space-y-4 py-4">
          <Link
            href={`/member/dashboard/${useUserStore.getState().username}`}
            className={`${
              pathname.startsWith("/member/dashboard")
                ? "bg-zinc-900 text-white rounded px-3 py-1 font-semibold"
                : "bg-zinc-200 text-black rounded px-3 py-1 font-semibold"
            }`}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href={`/member/space/${useUserStore.getState().username}`}
            className={`${
              pathname.startsWith("/member/space")
                ? "bg-zinc-900 text-white rounded px-3 py-1 font-semibold"
                : "bg-zinc-200 text-black rounded px-3 py-1 font-semibold"
            }`}
            onClick={() => setOpen(false)}
          >
            Space
          </Link>
          <Link
            href={`/member/profile/${useUserStore.getState().username}`}
            className={`${
              pathname.startsWith("/member/profile")
                ? "bg-zinc-900 text-white rounded px-3 py-1 font-semibold"
                : "bg-zinc-200 text-black rounded px-3 py-1 font-semibold"
            }`}
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <div
            className="flex items-center bg-red-300 hover:bg-red-500 hover:cursor-pointer transition-all rounded px-4 font-bold"
            onClick={async () => {
            
              // THIS BELOW IS FOR ONLY SAME ORIGIN
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
            Logout
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
