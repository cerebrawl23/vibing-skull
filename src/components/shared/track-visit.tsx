'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface TrackVisitProps {
  itemType: 'tool' | 'article' | 'workflow'
  itemId: string
}

export function TrackVisit({ itemType, itemId }: TrackVisitProps) {
  const supabase = createClient()

  useEffect(() => {
    const trackVisit = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

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

      await supabase.from('reading_history').insert(insertData)
    }

    trackVisit()
  }, [supabase, itemType, itemId])

  return null
}
