'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/types/database'

type Note = Tables<'user_notes'>

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchNotes = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setNotes([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    setNotes(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const createNote = async (content: string, title?: string, toolId?: string): Promise<Note | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_notes')
      .insert({
        user_id: user.id,
        content,
        title: title || null,
        tool_id: toolId || null,
      })
      .select()
      .single()

    if (!error && data) {
      setNotes(prev => [data, ...prev])
      return data
    }

    return null
  }

  const updateNote = async (noteId: string, updates: { content?: string; title?: string }): Promise<boolean> => {
    const { error } = await supabase
      .from('user_notes')
      .update(updates)
      .eq('id', noteId)

    if (!error) {
      setNotes(prev => prev.map(note =>
        note.id === noteId
          ? { ...note, ...updates, updated_at: new Date().toISOString() }
          : note
      ))
      return true
    }

    return false
  }

  const deleteNote = async (noteId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('user_notes')
      .delete()
      .eq('id', noteId)

    if (!error) {
      setNotes(prev => prev.filter(note => note.id !== noteId))
      return true
    }

    return false
  }

  return { notes, loading, createNote, updateNote, deleteNote, refetch: fetchNotes }
}
