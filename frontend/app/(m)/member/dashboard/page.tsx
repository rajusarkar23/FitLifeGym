"use client";

import { useUserStore } from "@/store/user-store";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      useUserStore.getState().isUserLogedIn &&
      useUserStore.getState().isPlanSelected
    ) {
      router.push(`/member/dashboard/${useUserStore.getState().username}`);
    } else{
        router.push(`/auth/signin`)
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <Loader className="animate-spin" />
    </div>
  );
};

export default page;
