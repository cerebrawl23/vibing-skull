'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Bookmark, ExternalLink, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookmarkButton } from '@/components/news/bookmark-button'
import { NewsSourceBadge } from '@/components/news/news-source-badge'
import { formatDistanceToNow } from 'date-fns'
import type { Tables } from '@/lib/types/database'

type NewsArticle = Tables<'news_articles'>

export function BookmarkedArticlesList() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('bookmarks')
        .select('article_id, news_articles(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      const articleData = data?.map(b => b.news_articles).filter((a): a is NewsArticle => a !== null) ?? []
      setArticles(articleData)
      setLoading(false)
    }

    fetchBookmarks()
  }, [supabase])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Bookmarked Articles
        </CardTitle>
        {articles.length > 0 && (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/news">View all</Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-6">
            <Bookmark className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No bookmarked articles yet.
            </p>
            <Button variant="link" asChild className="mt-1">
              <Link href="/news">Check the news feed</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="rounded-lg border p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <NewsSourceBadge source={article.source} />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                      </span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-primary transition-colors line-clamp-2"
                    >
                      {article.title}
                    </a>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <BookmarkButton articleId={article.id} />
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
