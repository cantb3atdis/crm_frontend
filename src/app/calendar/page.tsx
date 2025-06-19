"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, User } from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "Call with John Smith",
    date: "2024-01-20",
    time: "10:00 AM",
    type: "call",
    leadName: "John Smith",
    duration: "30 min",
  },
  {
    id: 2,
    title: "Demo for Tech Corp",
    date: "2024-01-22",
    time: "2:00 PM",
    type: "meeting",
    leadName: "Sarah Johnson",
    duration: "1 hour",
  },
  {
    id: 3,
    title: "Follow-up email",
    date: "2024-01-23",
    time: "9:00 AM",
    type: "task",
    leadName: "Mike Wilson",
    duration: "15 min",
  },
]

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const getEventsForDate = (date: number) => {
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.date).getDate()
      return eventDate === date
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "call":
        return "bg-blue-100 text-blue-800"
      case "meeting":
        return "bg-green-100 text-green-800"
      case "task":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your schedule and appointments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h2>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                    Month
                  </Button>
                  <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                    Week
                  </Button>
                  <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                    Day
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {view === "month" && (
                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {daysInMonth.map((date) => {
                    const events = getEventsForDate(date)
                    const isSelected = selectedDate === date
                    const isToday = date === new Date().getDate()

                    return (
                      <div
                        key={date}
                        className={`min-h-[80px] p-1 border border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          isSelected ? "bg-blue-50 border-blue-200" : ""
                        } ${isToday ? "bg-blue-100" : ""}`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                          {date}
                        </div>
                        <div className="space-y-1">
                          {events.slice(0, 2).map((event) => (
                            <div key={event.id} className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate">
                              {event.title}
                            </div>
                          ))}
                          {events.length > 2 && <div className="text-xs text-gray-500">+{events.length - 2} more</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {view === "week" && <div className="text-center py-12 text-gray-500">Week view coming soon</div>}

              {view === "day" && <div className="text-center py-12 text-gray-500">Day view coming soon</div>}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{event.time}</span>
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{event.leadName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-500 pl-3 py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Add */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Add</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Book Meeting
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
