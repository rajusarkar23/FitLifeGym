"use client"

import { useAdminStore } from "@/store/admin-store"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const DashboardPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (useAdminStore.getState().isAuthenticated && useAdminStore.getState().isSigninSuccess && typeof useAdminStore.getState().adminName === "string" && typeof useAdminStore.getState().adminUserName === "string") {
      router.push(`/admin/dashboard/${useAdminStore.getState().adminUserName}`)
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <Loader className="animate-spin"/>
    </div>
  )
}

export default DashboardPage