'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/types/database'

type Tool = Tables<'tools'>

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchFavorites = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setFavorites([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('favorite_tools')
      .select('tool_id')
      .eq('user_id', user.id)

    setFavorites(data?.map(f => f.tool_id) ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchFavorites()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchFavorites()
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, fetchFavorites])

  const toggleFavorite = async (toolId: string): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const isFavorited = favorites.includes(toolId)

    if (isFavorited) {
      const { error } = await supabase
        .from('favorite_tools')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId)

      if (!error) {
        setFavorites(prev => prev.filter(id => id !== toolId))
        return true
      }
    } else {
      const { error } = await supabase
        .from('favorite_tools')
        .insert({ user_id: user.id, tool_id: toolId })

      if (!error) {
        setFavorites(prev => [...prev, toolId])
        return true
      }
    }

    return false
  }

  const isFavorite = (toolId: string) => favorites.includes(toolId)

  return { favorites, loading, toggleFavorite, isFavorite, refetch: fetchFavorites }
}

export function useFavoriteTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchFavoriteTools = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setTools([])
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('favorite_tools')
        .select('tool_id, tools(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const toolData = data?.map(f => f.tools).filter((t): t is Tool => t !== null) ?? []
      setTools(toolData)
      setLoading(false)
    }

    fetchFavoriteTools()
  }, [supabase])

  return { tools, loading }
}
