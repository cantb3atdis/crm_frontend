"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Zap, Clock, Mail, Calendar, Edit, Trash2, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockAutomations = [
  {
    id: 1,
    name: "New Lead Follow-up",
    trigger: "Lead Created",
    action: "Send Email",
    delay: "1 day",
    active: true,
    description: "Send welcome email to new leads after 1 day",
  },
  {
    id: 2,
    name: "Qualified Lead Reminder",
    trigger: "Lead Status Changed",
    action: "Create Task",
    delay: "3 days",
    active: true,
    description: "Create follow-up task when lead becomes qualified",
  },
  {
    id: 3,
    name: "Inactive Lead Check",
    trigger: "No Activity",
    action: "Send Notification",
    delay: "7 days",
    active: false,
    description: "Notify when lead has no activity for 7 days",
  },
]

export default function AutomationPage() {
  const { toast } = useToast()
  const [automations, setAutomations] = useState(mockAutomations)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const toggleAutomation = (id: number) => {
    setAutomations(automations.map((auto) => (auto.id === id ? { ...auto, active: !auto.active } : auto)))
    toast({
      title: "Automation updated",
      description: "The automation status has been changed.",
    })
  }

  const deleteAutomation = (id: number) => {
    setAutomations(automations.filter((auto) => auto.id !== id))
    toast({
      title: "Automation deleted",
      description: "The automation has been removed.",
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automation</h1>
          <p className="text-gray-600">Set up automated workflows to save time</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Automation
        </Button>
      </div>

      {/* Create Automation Form */}
      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Automation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="automationName">Automation Name</Label>
              <Input id="automationName" placeholder="Enter automation name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="trigger">Trigger</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead-created">Lead Created</SelectItem>
                    <SelectItem value="status-changed">Status Changed</SelectItem>
                    <SelectItem value="no-activity">No Activity</SelectItem>
                    <SelectItem value="date-reached">Date Reached</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="delay">Delay</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="1-hour">1 Hour</SelectItem>
                    <SelectItem value="1-day">1 Day</SelectItem>
                    <SelectItem value="3-days">3 Days</SelectItem>
                    <SelectItem value="1-week">1 Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="action">Action</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send-email">Send Email</SelectItem>
                    <SelectItem value="create-task">Create Task</SelectItem>
                    <SelectItem value="send-notification">Send Notification</SelectItem>
                    <SelectItem value="schedule-call">Schedule Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Describe what this automation does" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowCreateForm(false)
                  toast({
                    title: "Automation created",
                    description: "Your new automation has been set up successfully.",
                  })
                }}
              >
                Create Automation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Automations */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        automation.active ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <Zap className={`h-5 w-5 ${automation.active ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{automation.name}</h3>
                      <Badge variant={automation.active ? "default" : "secondary"}>
                        {automation.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{automation.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Zap className="mr-1 h-3 w-3" />
                        {automation.trigger}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {automation.delay}
                      </span>
                      <span className="flex items-center">
                        {automation.action === "Send Email" && <Mail className="mr-1 h-3 w-3" />}
                        {automation.action === "Create Task" && <Calendar className="mr-1 h-3 w-3" />}
                        {automation.action === "Send Notification" && <Bell className="mr-1 h-3 w-3" />}
                        {automation.action}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={automation.active} onCheckedChange={() => toggleAutomation(automation.id)} />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteAutomation(automation.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {automations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No automations yet</h3>
            <p className="text-gray-600 mb-4">Create your first automation to start saving time on repetitive tasks.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Automation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
