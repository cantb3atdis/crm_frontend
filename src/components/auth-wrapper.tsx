"use client"

import type React from "react"

import { useSession } from "./auth-provider"
import { Sidebar } from "./sidebar"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session && pathname !== "/auth") {
      router.push("/auth")
    }
  }, [session, isLoading, pathname, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show auth page without sidebar
  if (pathname === "/auth") {
    return <>{children}</>
  }

  // Redirect to auth if not authenticated
  if (!session) {
    return null
  }

  // Show dashboard with sidebar for authenticated users
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
