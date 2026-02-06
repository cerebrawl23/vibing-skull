import type { RawNewsArticle } from '@/lib/types/news'

const HN_ALGOLIA_BASE = 'https://hn.algolia.com/api/v1'

const SEARCH_QUERIES = [
  'AI coding',
  'vibe coding',
  'cursor AI editor',
  'copilot coding',
  'claude code',
  'AI programming tools',
]

interface HNHit {
  objectID: string
  title: string
  url: string | null
  author: string
  points: number
  num_comments: number
  created_at: string
  story_text: string | null
}

interface HNSearchResponse {
  hits: HNHit[]
}

export async function fetchHackerNewsArticles(): Promise<RawNewsArticle[]> {
  const articles: RawNewsArticle[] = []
  const seen = new Set<string>()

  for (const query of SEARCH_QUERIES) {
    try {
      const res = await fetch(
        `${HN_ALGOLIA_BASE}/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=20`,
        { next: { revalidate: 1800 } }
      )

      if (!res.ok) continue

      const data: HNSearchResponse = await res.json()

      for (const hit of data.hits) {
        if (seen.has(hit.objectID)) continue
        if (!hit.url && !hit.story_text) continue
        seen.add(hit.objectID)

        articles.push({
          external_id: hit.objectID,
          source: 'hackernews',
          title: hit.title,
          url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
          author: hit.author,
          content_preview: hit.story_text?.slice(0, 300) ?? null,
          thumbnail_url: null,
          source_url: `https://news.ycombinator.com/item?id=${hit.objectID}`,
          subreddit: null,
          score: hit.points ?? 0,
          comment_count: hit.num_comments ?? 0,
          published_at: hit.created_at,
          tags: ['hackernews'],
        })
      }
    } catch {
      // Skip failed queries
    }
  }

  return articles
}
