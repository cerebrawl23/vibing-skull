'use client'

import { NewsCard } from './news-card'

interface Article {
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

interface NewsFeedProps {
  articles: Article[]
}

export function NewsFeed({ articles }: NewsFeedProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No articles found.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          News is synced automatically every 30 minutes.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
