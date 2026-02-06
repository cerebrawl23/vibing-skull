'use client'

import { useEffect, useState } from 'react'
import { Star, Bookmark, StickyNote, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  favorites: number
  bookmarks: number
  notes: number
  history: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({ favorites: 0, bookmarks: 0, notes: 0, history: 0 })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const [favoritesRes, bookmarksRes, notesRes, historyRes] = await Promise.all([
        supabase.from('favorite_tools').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('bookmarks').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('user_notes').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('reading_history').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ])

      setStats({
        favorites: favoritesRes.count ?? 0,
        bookmarks: bookmarksRes.count ?? 0,
        notes: notesRes.count ?? 0,
        history: historyRes.count ?? 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  const statItems = [
    { label: 'Favorite Tools', value: stats.favorites, icon: Star },
    { label: 'Bookmarked Articles', value: stats.bookmarks, icon: Bookmark },
    { label: 'Notes', value: stats.notes, icon: StickyNote },
    { label: 'Recently Viewed', value: stats.history, icon: Clock },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-12 animate-pulse rounded bg-muted" />
            ) : (
              <div className="text-2xl font-bold">{stat.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
