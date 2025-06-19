"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-gray-300 mb-2">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
              wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500 mb-3">Looking for something specific?</p>
              <div className="flex flex-col gap-2">
                <Link href="/leads" className="text-sm text-blue-600 hover:text-blue-800">
                  → View your leads
                </Link>
                <Link href="/calendar" className="text-sm text-blue-600 hover:text-blue-800">
                  → Check your calendar
                </Link>
                <Link href="/tasks" className="text-sm text-blue-600 hover:text-blue-800">
                  → See your tasks
                </Link>
                <Link href="/contacts" className="text-sm text-blue-600 hover:text-blue-800">
                  → Browse contacts
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-xs text-gray-500">If you believe this is an error, please contact support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
