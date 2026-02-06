import { RawNewsArticle } from '@/lib/types/news'

const PRIMARY_KEYWORDS = [
  'vibe coding', 'vibe-coding', 'vibecoding',
  'ai coding', 'ai-coding',
  'cursor', 'copilot', 'claude code', 'windsurf', 'aider', 'cline',
  'v0', 'bolt.new', 'lovable',
  'ai programming', 'ai developer',
  'code generation', 'ai assistant', 'ai editor',
]

const SECONDARY_KEYWORDS = [
  'prompt engineering', 'llm', 'gpt', 'claude', 'openai', 'anthropic',
  'supabase', 'vercel', 'next.js', 'react',
  'ship fast', 'build with ai', 'ai tool',
  'code completion', 'ai pair programming',
]

const SOURCE_BONUSES: Record<string, number> = {
  'r/vibecoding': 20,
  'r/cursor': 15,
  'r/ClaudeAI': 15,
  'r/artificial': 10,
  'r/programming': 5,
}

export function scoreRelevance(article: RawNewsArticle): number {
  const text = `${article.title} ${article.content_preview || ''}`.toLowerCase()
  let score = 0

  // Keyword matching (max 40)
  let keywordScore = 0
  for (const kw of PRIMARY_KEYWORDS) {
    if (text.includes(kw)) keywordScore += 10
  }
  for (const kw of SECONDARY_KEYWORDS) {
    if (text.includes(kw)) keywordScore += 5
  }
  score += Math.min(keywordScore, 40)

  // Source bonus (max 20)
  if (article.subreddit && SOURCE_BONUSES[`r/${article.subreddit}`]) {
    score += SOURCE_BONUSES[`r/${article.subreddit}`]
  } else if (article.source === 'devto') {
    score += 10
  } else if (article.source === 'hackernews') {
    score += 10
  }

  // Engagement bonus (max 20)
  const s = article.score
  if (article.source === 'reddit') {
    score += s > 1000 ? 20 : s > 500 ? 15 : s > 100 ? 10 : s > 20 ? 5 : 0
  } else if (article.source === 'hackernews') {
    score += s > 500 ? 20 : s > 200 ? 15 : s > 50 ? 10 : s > 10 ? 5 : 0
  } else if (article.source === 'devto') {
    score += s > 500 ? 20 : s > 100 ? 15 : s > 20 ? 10 : s > 5 ? 5 : 0
  }

  // Recency bonus (max 20)
  const hoursAgo = (Date.now() - new Date(article.published_at).getTime()) / (1000 * 60 * 60)
  if (hoursAgo < 6) score += 20
  else if (hoursAgo < 24) score += 15
  else if (hoursAgo < 72) score += 10
  else if (hoursAgo < 168) score += 5

  return Math.min(score, 100)
}
