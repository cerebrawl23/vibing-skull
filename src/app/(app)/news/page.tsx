import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { TldrNews } from '@/components/news/tldr-news'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Daily Digest - The Vibing Skull',
  description: 'AI and vibe coding news curated daily from Reddit, Hacker News, and Dev.to.',
}

async function getArticles() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('news_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100)

  return data || []
}

function NewsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  )
}

async function NewsContent() {
  const articles = await getArticles()
  return <TldrNews articles={articles} />
}

export default function NewsPage() {
  return (
    <Suspense fallback={<NewsSkeleton />}>
      <NewsContent />
    </Suspense>
  )
}
