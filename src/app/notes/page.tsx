"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, FileText, User, Calendar, Edit, Trash2, Pin } from "lucide-react"

const mockNotes = [
  {
    id: 1,
    title: "Meeting Notes - Tech Corp Demo",
    content:
      "Great demo session with Tech Corp team. They were particularly interested in our automation features. Next steps: send pricing proposal by Friday.",
    leadName: "John Smith",
    tags: ["demo", "pricing"],
    date: "2024-01-18",
    pinned: true,
  },
  {
    id: 2,
    title: "Product Feedback from Sarah",
    content:
      "Sarah mentioned they need better reporting capabilities. Consider this for next product update. She also asked about API integrations.",
    leadName: "Sarah Johnson",
    tags: ["feedback", "product"],
    date: "2024-01-17",
    pinned: false,
  },
  {
    id: 3,
    title: "Industry Research Notes",
    content:
      "Key trends in CRM space: AI integration, mobile-first design, automation workflows. Competitors are focusing on SMB market.",
    leadName: null,
    tags: ["research", "industry"],
    date: "2024-01-16",
    pinned: false,
  },
  {
    id: 4,
    title: "Follow-up Strategy",
    content:
      "New approach for lead nurturing: 1) Initial contact within 24hrs, 2) Demo within 1 week, 3) Proposal within 3 days of demo.",
    leadName: null,
    tags: ["strategy", "process"],
    date: "2024-01-15",
    pinned: true,
  },
]

const tagColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
]

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const pinnedNotes = filteredNotes.filter((note) => note.pinned)
  const regularNotes = filteredNotes.filter((note) => !note.pinned)

  const togglePin = (noteId: number) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, pinned: !note.pinned } : note)))
  }

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600">Keep track of important information and ideas</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search notes, tags, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Create Note Form */}
      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Note title" />
            </div>
            <div>
              <Textarea placeholder="Write your note here..." rows={6} />
            </div>
            <div>
              <Input placeholder="Tags (comma separated)" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateForm(false)}>Save Note</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Pin className="mr-2 h-5 w-5" />
            Pinned Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-lg transition-shadow border-yellow-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => togglePin(note.id)} className="text-yellow-600">
                        <Pin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.content}</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, index) => (
                        <Badge key={tag} className={tagColors[index % tagColors.length]}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      {note.leadName && (
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {note.leadName}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {note.date}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          All Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => togglePin(note.id)}>
                      <Pin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.content}</p>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag, index) => (
                      <Badge key={tag} className={tagColors[index % tagColors.length]}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {note.leadName && (
                      <span className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {note.leadName}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {note.date}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try adjusting your search terms." : "Create your first note to get started."}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Note
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
