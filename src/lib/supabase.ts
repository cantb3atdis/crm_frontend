import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Types for your database tables
export type Lead = {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: "New" | "Contacted" | "Qualified" | "Lost"
  source: string
  value: number
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  name: string
  company: string
  title: string
  email: string
  phone: string
  address: string
  status: "Active" | "Inactive"
  created_at: string
  updated_at: string
}

export type Task = {
  id: string
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  status: "pending" | "in-progress" | "completed"
  due_date: string
  lead_id?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  lead_id?: string
  pinned: boolean
  created_at: string
  updated_at: string
}
