import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, Calendar, DollarSign, User, Building, ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from your database
const mockLead = {
  id: 1,
  name: "John Smith",
  company: "Tech Corp",
  title: "CTO",
  email: "john@techcorp.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business St, City, State 12345",
  status: "Qualified",
  source: "Website",
  value: "$5,000",
  probability: "75%",
  expectedCloseDate: "2024-02-15",
  createdDate: "2024-01-15",
  lastContact: "2024-01-18",
  notes: "Very interested in our premium package. Mentioned they need implementation by March.",
  interactions: [
    {
      id: 1,
      type: "Email",
      date: "2024-01-18",
      description: "Sent pricing proposal",
      outcome: "Positive response",
    },
    {
      id: 2,
      type: "Call",
      date: "2024-01-16",
      description: "Initial discovery call",
      outcome: "Qualified lead",
    },
    {
      id: 3,
      type: "Website",
      date: "2024-01-15",
      description: "Downloaded whitepaper",
      outcome: "Lead created",
    },
  ],
}

export default function LeadDetailsPage({ params }: { params: { id: string } }) {
  const lead = mockLead // In real app: fetch lead by params.id

  const statusColors = {
    New: "bg-blue-100 text-blue-800",
    Contacted: "bg-yellow-100 text-yellow-800",
    Qualified: "bg-green-100 text-green-800",
    Lost: "bg-red-100 text-red-800",
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/leads">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <p className="text-gray-600">
              {lead.title} at {lead.company}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{lead.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{lead.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{lead.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lead.interactions.map((interaction, index) => (
                  <div key={interaction.id}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{interaction.type.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{interaction.type}</p>
                          <p className="text-sm text-gray-500">{interaction.date}</p>
                        </div>
                        <p className="text-sm text-gray-600">{interaction.description}</p>
                        <p className="text-sm text-green-600">{interaction.outcome}</p>
                      </div>
                    </div>
                    {index < lead.interactions.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{lead.notes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className={statusColors[lead.status as keyof typeof statusColors]}>{lead.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Source</span>
                <span className="font-medium">{lead.source}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Value</span>
                <span className="font-medium text-green-600">{lead.value}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Probability</span>
                <span className="font-medium">{lead.probability}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{lead.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Contact</p>
                  <p className="font-medium">{lead.lastContact}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Expected Close</p>
                  <p className="font-medium">{lead.expectedCloseDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call Lead
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <DollarSign className="mr-2 h-4 w-4" />
                Convert to Customer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
