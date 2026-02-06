import type { RawNewsArticle } from '@/lib/types/news'

const SUBREDDITS = [
  { name: 'vibecoding', sort: 'hot' },
  { name: 'cursor', sort: 'hot' },
  { name: 'ClaudeAI', sort: 'hot' },
  { name: 'artificial', sort: 'hot' },
  { name: 'programming', sort: 'hot' },
  { name: 'LocalLLaMA', sort: 'hot' },
]

interface RedditPost {
  data: {
    id: string
    title: string
    url: string
    author: string
    selftext: string
    thumbnail: string
    permalink: string
    subreddit: string
    score: number
    num_comments: number
    created_utc: number
    is_self: boolean
    link_flair_text: string | null
  }
}

interface RedditListing {
  data: {
    children: RedditPost[]
  }
}

async function getRedditAccessToken(): Promise<string | null> {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET

  if (!clientId || !clientSecret) return null

  try {
    const res = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': process.env.REDDIT_USER_AGENT || 'TheVibingSkull/1.0',
      },
      body: 'grant_type=client_credentials',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.access_token
  } catch {
    return null
  }
}

export async function fetchRedditArticles(): Promise<RawNewsArticle[]> {
  const token = await getRedditAccessToken()
  const articles: RawNewsArticle[] = []
  const seen = new Set<string>()

  const baseUrl = token
    ? 'https://oauth.reddit.com'
    : 'https://www.reddit.com'

  const headers: Record<string, string> = {
    'User-Agent': process.env.REDDIT_USER_AGENT || 'TheVibingSkull/1.0',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  for (const sub of SUBREDDITS) {
    try {
      const res = await fetch(
        `${baseUrl}/r/${sub.name}/${sub.sort}.json?limit=25`,
        { headers, next: { revalidate: 1800 } }
      )

      if (!res.ok) continue

      const data: RedditListing = await res.json()

      for (const post of data.data.children) {
        const p = post.data
        if (seen.has(p.id)) continue
        seen.add(p.id)

        const articleUrl = p.is_self
          ? `https://www.reddit.com${p.permalink}`
          : p.url

        articles.push({
          external_id: p.id,
          source: 'reddit',
          title: p.title,
          url: articleUrl,
          author: p.author,
          content_preview: p.selftext?.slice(0, 300) || null,
          thumbnail_url:
            p.thumbnail && p.thumbnail.startsWith('http')
              ? p.thumbnail
              : null,
          source_url: `https://www.reddit.com${p.permalink}`,
          subreddit: p.subreddit,
          score: p.score,
          comment_count: p.num_comments,
          published_at: new Date(p.created_utc * 1000).toISOString(),
          tags: [p.subreddit, p.link_flair_text].filter(Boolean) as string[],
        })
      }
    } catch {
      // Skip failed subreddit fetches
    }
  }

  return articles
}
