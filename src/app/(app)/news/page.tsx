import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { NewsFeed } from '@/components/news/news-feed'
import { NewsFilters } from '@/components/news/news-filters'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'News Feed',
  description: 'Trending AI and vibe coding news from Reddit, Hacker News, and Dev.to.',
}

interface NewsPageProps {
  searchParams: Promise<{
    source?: string
    sort?: string
  }>
}

async function getArticles(source?: string, sort?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('news_articles')
    .select('*')
    .limit(50)

  if (source && source !== 'all' && ['reddit', 'hackernews', 'devto'].includes(source)) {
    query = query.eq('source', source as 'reddit' | 'hackernews' | 'devto')
  }

  // Sort by relevance (default), score, or recent
  switch (sort) {
    case 'score':
      query = query.order('score', { ascending: false, nullsFirst: false })
      break
    case 'recent':
      query = query.order('published_at', { ascending: false })
      break
    default:
      query = query.order('relevance_score', { ascending: false, nullsFirst: false })
  }

  const { data } = await query
  return data || []
}

function NewsFeedSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-6" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function NewsContent({ source, sort }: { source?: string; sort?: string }) {
  const articles = await getArticles(source, sort)
  return <NewsFeed articles={articles} />
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Newspaper className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">News Feed</h1>
          <p className="text-sm text-muted-foreground">
            Trending AI and vibe coding news from across the web
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="h-12" />}>
        <NewsFilters
          selectedSource={params.source || null}
          selectedSort={params.sort || null}
        />
      </Suspense>

      <Suspense fallback={<NewsFeedSkeleton />}>
        <NewsContent source={params.source} sort={params.sort} />
      </Suspense>
    </div>
  )
}
