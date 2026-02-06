'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FavoriteButton } from '@/components/tools/favorite-button'
import type { Tables } from '@/lib/types/database'

type Tool = Tables<'tools'>

export function FavoriteToolsList() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('favorite_tools')
        .select('tool_id, tools(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      const toolData = data?.map(f => f.tools).filter((t): t is Tool => t !== null) ?? []
      setTools(toolData)
      setLoading(false)
    }

    fetchFavorites()
  }, [supabase])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Favorite Tools
        </CardTitle>
        {tools.length > 0 && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tools">View all</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-6">
            <Star className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No favorite tools yet.
            </p>
            <Button variant="link" asChild className="mt-1">
              <Link href="/tools">Browse the tool directory</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted text-sm font-semibold">
                    {tool.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="font-medium hover:text-primary transition-colors truncate block"
                    >
                      {tool.name}
                    </Link>
                    <Badge variant="secondary" className="text-xs">
                      {tool.pricing}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FavoriteButton toolId={tool.id} />
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
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
