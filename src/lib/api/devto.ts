import type { RawNewsArticle } from '@/lib/types/news'

const DEVTO_BASE = 'https://dev.to/api'

const TAG_QUERIES = [
  { tag: 'ai', top: 7, per_page: 20 },
  { tag: 'machinelearning', top: 7, per_page: 15 },
  { tag: 'copilot', top: 30, per_page: 15 },
  { tag: 'chatgpt', top: 7, per_page: 15 },
  { tag: 'webdev', top: 3, per_page: 10 },
]

interface DevtoArticle {
  id: number
  title: string
  url: string
  canonical_url: string
  user: { username: string }
  description: string
  cover_image: string | null
  social_image: string | null
  positive_reactions_count: number
  comments_count: number
  published_at: string
  tag_list: string[]
}

export async function fetchDevtoArticles(): Promise<RawNewsArticle[]> {
  const articles: RawNewsArticle[] = []
  const seen = new Set<number>()

  for (const query of TAG_QUERIES) {
    try {
      const res = await fetch(
        `${DEVTO_BASE}/articles?tag=${query.tag}&top=${query.top}&per_page=${query.per_page}`,
        {
          headers: {
            'User-Agent': 'TheVibingSkull/1.0',
            Accept: 'application/vnd.forem.api-v1+json',
          },
          next: { revalidate: 1800 },
        }
      )

      if (!res.ok) continue

      const data: DevtoArticle[] = await res.json()

      for (const article of data) {
        if (seen.has(article.id)) continue
        seen.add(article.id)

        articles.push({
          external_id: String(article.id),
          source: 'devto',
          title: article.title,
          url: article.canonical_url || article.url,
          author: article.user.username,
          content_preview: article.description?.slice(0, 300) ?? null,
          thumbnail_url: article.cover_image || article.social_image,
          source_url: article.url,
          subreddit: null,
          score: article.positive_reactions_count,
          comment_count: article.comments_count,
          published_at: article.published_at,
          tags: article.tag_list,
        })
      }
    } catch {
      // Skip failed queries
    }
  }

  return articles
}
