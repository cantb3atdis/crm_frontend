import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Calendar, TrendingUp, Phone, CheckSquare } from "lucide-react"
import Link from "next/link"

export default function Page() {
  const stats = [
    { name: "Total Leads", value: "24", icon: UserPlus, change: "+12%" },
    { name: "Active Clients", value: "18", icon: Users, change: "+5%" },
    { name: "This Week Calls", value: "8", icon: Phone, change: "+20%" },
    { name: "Pending Tasks", value: "6", icon: CheckSquare, change: "-10%" },
  ]

  const recentLeads = [
    { name: "John Smith", company: "Tech Corp", status: "New", date: "2024-01-15" },
    { name: "Sarah Johnson", company: "Design Studio", status: "Contacted", date: "2024-01-14" },
    { name: "Mike Wilson", company: "Marketing Inc", status: "Qualified", date: "2024-01-13" },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {lead.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{lead.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/leads">
                <Button variant="outline" className="w-full">
                  View All Leads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/leads">
                <Button className="w-full h-20 flex flex-col items-center justify-center">
                  <UserPlus className="h-6 w-6 mb-2" />
                  Add Lead
                </Button>
              </Link>
              <Link href="/calendar">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule
                </Button>
              </Link>
              <Link href="/tasks">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <CheckSquare className="h-6 w-6 mb-2" />
                  Add Task
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
