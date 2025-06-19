import { createClient } from "../../lib/supabase-server"
import AuthForm from "./auth-form"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auth - RealEstate Pro CRM",
  description: "Sign in to your real estate CRM",
}

async function Auth() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">RealEstate Pro CRM</h1>
        <AuthForm />
      </div>
    </div>
  )
}

export default Auth
