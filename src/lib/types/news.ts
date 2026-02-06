import { Database } from './database'

export type NewsArticle = Database['public']['Tables']['news_articles']['Row']
export type NewsArticleInsert = Database['public']['Tables']['news_articles']['Insert']

export type NewsSource = 'reddit' | 'hackernews' | 'devto'
export type NewsSortOption = 'trending' | 'recent' | 'relevance'

export interface RawNewsArticle {
  external_id: string
  source: NewsSource
  title: string
  url: string
  author: string | null
  content_preview: string | null
  thumbnail_url: string | null
  source_url: string
  subreddit: string | null
  score: number
  comment_count: number
  published_at: string
  tags: string[]
}

export interface NewsFilters {
  source?: NewsSource
  sort?: NewsSortOption
  page?: number
  limit?: number
}
