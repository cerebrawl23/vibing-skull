'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Newspaper, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface DigestItem {
  source: 'anthropic' | 'openai' | 'google'
  sourceLabel: string
  title: string
  url: string
  summary: string
  publishedAt: string
}

const sourceColors: Record<string, string> = {
  anthropic: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
  openai: 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400',
  google: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 30) return `${Math.floor(diffDays / 30)}mo ago`
  if (diffDays > 0) return `${diffDays}d ago`
  if (diffHours > 0) return `${diffHours}h ago`
  return 'Just now'
}

export function DailyDigest() {
  const [items, setItems] = useState<DigestItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/digest')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
        Loading latest updates...
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No updates available right now. Check back soon!
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {items.slice(0, 12).map((item, i) => (
        <a
          key={`${item.source}-${i}`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`text-[10px] shrink-0 ${sourceColors[item.source] || ''}`}>
                {item.sourceLabel}
              </Badge>
              {item.publishedAt && (
                <span className="text-[10px] text-muted-foreground">{timeAgo(item.publishedAt)}</span>
              )}
            </div>
            <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </p>
            {item.summary && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.summary}</p>
            )}
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ))}
    </div>
  )
}
