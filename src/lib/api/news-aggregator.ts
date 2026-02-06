import { fetchRedditArticles } from './reddit'
import { fetchHackerNewsArticles } from './hackernews'
import { fetchDevtoArticles } from './devto'
import { scoreRelevance } from '@/lib/utils/relevance-scorer'
import { NEWS_RELEVANCE_THRESHOLD } from '@/lib/utils/constants'
import type { RawNewsArticle } from '@/lib/types/news'

export interface AggregationResult {
  fetched: number
  scored: number
  relevant: number
  articles: (RawNewsArticle & { relevance_score: number })[]
}

export async function aggregateNews(): Promise<AggregationResult> {
  // Fetch from all sources in parallel
  const results = await Promise.allSettled([
    fetchRedditArticles(),
    fetchHackerNewsArticles(),
    fetchDevtoArticles(),
  ])

  const allArticles: RawNewsArticle[] = []

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allArticles.push(...result.value)
    }
  }

  // Score all articles for relevance
  const scoredArticles = allArticles.map((article) => ({
    ...article,
    relevance_score: scoreRelevance(article),
  }))

  // Filter by relevance threshold
  const relevantArticles = scoredArticles.filter(
    (a) => a.relevance_score >= NEWS_RELEVANCE_THRESHOLD
  )

  // Sort by relevance score descending
  relevantArticles.sort((a, b) => b.relevance_score - a.relevance_score)

  return {
    fetched: allArticles.length,
    scored: scoredArticles.length,
    relevant: relevantArticles.length,
    articles: relevantArticles,
  }
}
