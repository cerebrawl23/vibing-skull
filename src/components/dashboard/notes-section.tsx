'use client'

import { useEffect, useState } from 'react'
import { StickyNote, Plus, Trash2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { formatDistanceToNow } from 'date-fns'
import type { Tables } from '@/lib/types/database'

type Note = Tables<'user_notes'>

export function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const fetchNotes = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(10)

    setNotes(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [supabase])

  const handleCreate = async () => {
    if (!newContent.trim()) return

    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaving(false)
      return
    }

    const { data, error } = await supabase
      .from('user_notes')
      .insert({
        user_id: user.id,
        title: newTitle.trim() || null,
        content: newContent.trim(),
      })
      .select()
      .single()

    if (!error && data) {
      setNotes(prev => [data, ...prev])
      setNewTitle('')
      setNewContent('')
      setIsCreating(false)
    }
    setSaving(false)
  }

  const handleDelete = async (noteId: string) => {
    const { error } = await supabase
      .from('user_notes')
      .delete()
      .eq('id', noteId)

    if (!error) {
      setNotes(prev => prev.filter(n => n.id !== noteId))
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5" />
          Notes
        </CardTitle>
        {!isCreating && (
          <Button variant="outline" size="sm" onClick={() => setIsCreating(true)}>
            <Plus className="mr-1 h-4 w-4" />
            New Note
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isCreating && (
          <div className="mb-4 space-y-3 rounded-lg border p-3">
            <Input
              placeholder="Title (optional)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write your note..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsCreating(false)
                  setNewTitle('')
                  setNewContent('')
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleCreate}
                disabled={saving || !newContent.trim()}
              >
                <Save className="mr-1 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : notes.length === 0 && !isCreating ? (
          <div className="text-center py-6">
            <StickyNote className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No notes yet. Create one to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    {note.title && (
                      <h4 className="font-medium mb-1">{note.title}</h4>
                    )}
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                      {note.content}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
