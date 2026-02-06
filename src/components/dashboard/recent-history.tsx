'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Clock, Code, Newspaper, Workflow, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import type { Tables } from '@/lib/types/database'

type HistoryItem = Tables<'reading_history'> & {
  tools?: Tables<'tools'> | null
  news_articles?: Tables<'news_articles'> | null
  workflows?: Tables<'workflows'> | null
}

export function RecentHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('reading_history')
        .select('*, tools(*), news_articles(*), workflows(*)')
        .eq('user_id', user.id)
        .order('visited_at', { ascending: false })
        .limit(10)

      setHistory(data ?? [])
      setLoading(false)
    }

    fetchHistory()
  }, [supabase])

  const getItemDetails = (item: HistoryItem) => {
    switch (item.item_type) {
      case 'tool':
        return {
          icon: Code,
          title: item.tools?.name ?? 'Unknown Tool',
          link: item.tools?.slug ? `/tools/${item.tools.slug}` : null,
          externalLink: item.tools?.url,
          badge: 'Tool',
        }
      case 'article':
        return {
          icon: Newspaper,
          title: item.news_articles?.title ?? 'Unknown Article',
          link: null,
          externalLink: item.news_articles?.url,
          badge: 'Article',
        }
      case 'workflow':
        return {
          icon: Workflow,
          title: item.workflows?.title ?? 'Unknown Workflow',
          link: item.workflows?.slug ? `/workflows/${item.workflows.slug}` : null,
          externalLink: null,
          badge: 'Workflow',
        }
      default:
        return {
          icon: Clock,
          title: 'Unknown',
          link: null,
          externalLink: null,
          badge: 'Unknown',
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No recent activity yet.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Your browsing history will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item) => {
              const details = getItemDetails(item)
              const Icon = details.icon

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      {details.link ? (
                        <Link
                          href={details.link}
                          className="font-medium hover:text-primary transition-colors truncate block"
                        >
                          {details.title}
                        </Link>
                      ) : (
                        <span className="font-medium truncate block">{details.title}</span>
                      )}
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-xs">
                          {details.badge}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(item.visited_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {details.externalLink && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" asChild>
                      <a href={details.externalLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
