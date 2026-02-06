'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/types/database'

type HistoryItem = Tables<'reading_history'> & {
  tools?: Tables<'tools'> | null
  news_articles?: Tables<'news_articles'> | null
  workflows?: Tables<'workflows'> | null
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchHistory = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setHistory([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('reading_history')
      .select('*, tools(*), news_articles(*), workflows(*)')
      .eq('user_id', user.id)
      .order('visited_at', { ascending: false })
      .limit(50)

    setHistory(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const trackVisit = async (
    itemType: 'tool' | 'article' | 'workflow',
    itemId: string
  ): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const insertData: {
      user_id: string
      item_type: 'tool' | 'article' | 'workflow'
      tool_id?: string
      article_id?: string
      workflow_id?: string
    } = {
      user_id: user.id,
      item_type: itemType,
    }

    if (itemType === 'tool') insertData.tool_id = itemId
    else if (itemType === 'article') insertData.article_id = itemId
    else if (itemType === 'workflow') insertData.workflow_id = itemId

    const { error } = await supabase
      .from('reading_history')
      .insert(insertData)

    return !error
  }

  return { history, loading, trackVisit, refetch: fetchHistory }
}
