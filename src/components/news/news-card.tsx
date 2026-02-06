'use client'

import { ExternalLink, MessageSquare, ArrowUp, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsSourceBadge } from './news-source-badge'
import { BookmarkButton } from './bookmark-button'
import { formatDistanceToNow } from 'date-fns'

interface NewsCardProps {
  article: {
    id: string
    title: string
    url: string
    source: 'reddit' | 'hackernews' | 'devto'
    source_url: string
    author: string | null
    content_preview: string | null
    subreddit: string | null
    score: number | null
    comment_count: number | null
    published_at: string
  }
}

export function NewsCard({ article }: NewsCardProps) {
  const publishedAt = new Date(article.published_at)
  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true })

  return (
    <Card className="group transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Vote/Score Column */}
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">{article.score || 0}</span>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <NewsSourceBadge source={article.source} />
              {article.subreddit && (
                <span className="text-xs text-muted-foreground">
                  r/{article.subreddit}
                </span>
              )}
            </div>

            <h3 className="mt-2 font-medium leading-snug">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {article.title}
              </a>
            </h3>

            {article.content_preview && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {article.content_preview}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {article.author && (
                <span>by {article.author}</span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </span>
              <a
                href={article.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-3 w-3" />
                {article.comment_count || 0} comments
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              asChild
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <BookmarkButton articleId={article.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
