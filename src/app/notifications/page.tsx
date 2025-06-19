"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, Check, X, User, Calendar, Mail, Zap, Settings } from "lucide-react"

const mockNotifications = [
  {
    id: 1,
    title: "New lead added",
    message: "John Smith from Tech Corp has been added as a new lead",
    type: "lead",
    read: false,
    timestamp: "2 minutes ago",
    action: "View Lead",
  },
  {
    id: 2,
    title: "Task due soon",
    message: "Follow up with Sarah Johnson is due in 1 hour",
    type: "task",
    read: false,
    timestamp: "1 hour ago",
    action: "View Task",
  },
  {
    id: 3,
    title: "Meeting reminder",
    message: "Demo with Tech Corp scheduled for 2:00 PM today",
    type: "calendar",
    read: true,
    timestamp: "3 hours ago",
    action: "View Calendar",
  },
  {
    id: 4,
    title: "Email sent",
    message: "Pricing proposal sent to Mike Wilson",
    type: "email",
    read: true,
    timestamp: "5 hours ago",
    action: "View Email",
  },
  {
    id: 5,
    title: "Automation triggered",
    message: "Follow-up email sent to new lead automatically",
    type: "automation",
    read: true,
    timestamp: "1 day ago",
    action: "View Automation",
  },
  {
    id: 6,
    title: "Lead status changed",
    message: "Emily Davis moved from Contacted to Qualified",
    type: "lead",
    read: true,
    timestamp: "2 days ago",
    action: "View Lead",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "lead":
      return <User className="h-4 w-4" />
    case "task":
      return <Check className="h-4 w-4" />
    case "calendar":
      return <Calendar className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    case "automation":
      return <Zap className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "lead":
      return "bg-blue-100 text-blue-600"
    case "task":
      return "bg-green-100 text-green-600"
    case "calendar":
      return "bg-purple-100 text-purple-600"
    case "email":
      return "bg-yellow-100 text-yellow-600"
    case "automation":
      return "bg-orange-100 text-orange-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const filteredNotifications = notifications.filter((notif) => filter === "all" || !notif.read)

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">{unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}</p>
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant={filter === "all" ? "default" : "ghost"} size="sm" onClick={() => setFilter("all")}>
                All ({notifications.length})
              </Button>
              <Button variant={filter === "unread" ? "default" : "ghost"} size="sm" onClick={() => setFilter("unread")}>
                Unread ({unreadCount})
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Auto-mark as read</span>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all ${!notification.read ? "border-blue-200 bg-blue-50/30" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(
                    notification.type,
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      {notification.action}
                    </Button>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "All your notifications have been read."
                : "You'll see notifications here when there's activity in your CRM."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Leads</p>
              <p className="text-sm text-gray-600">Get notified when new leads are added</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Task Reminders</p>
              <p className="text-sm text-gray-600">Receive reminders for upcoming tasks</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Calendar Events</p>
              <p className="text-sm text-gray-600">Get notified about scheduled meetings</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automation Updates</p>
              <p className="text-sm text-gray-600">Notifications when automations are triggered</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
