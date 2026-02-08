'use client'

import { useState, useMemo } from 'react'
import {
  ExternalLink,
  MessageSquare,
  ArrowUp,
  Clock,
  Newspaper,
  Bookmark,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BookmarkButton } from './bookmark-button'
import { formatDistanceToNow } from 'date-fns'

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
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

type NewsCategory = 'all' | 'ai' | 'dev-tools' | 'web-dev' | 'programming' | 'tech' | 'career' | 'other'

// ---------------------------------------------------------------------------
// CATEGORY INFERENCE
// ---------------------------------------------------------------------------
const categoryKeywords: Record<Exclude<NewsCategory, 'all' | 'other'>, string[]> = {
  ai: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'claude', 'gemini', 'chatgpt', 'copilot', 'neural', 'model', 'openai', 'anthropic', 'transformer', 'deep learning', 'agent', 'rag', 'embedding', 'diffusion', 'midjourney', 'stable diffusion', 'cursor', 'vibe cod'],
  'dev-tools': ['vscode', 'ide', 'editor', 'git', 'docker', 'kubernetes', 'ci/cd', 'devops', 'terminal', 'cli', 'plugin', 'extension', 'tool', 'framework', 'library', 'package', 'npm', 'bun', 'deno'],
  'web-dev': ['react', 'next', 'vue', 'svelte', 'angular', 'tailwind', 'css', 'html', 'frontend', 'backend', 'fullstack', 'api', 'rest', 'graphql', 'supabase', 'firebase', 'vercel', 'netlify', 'jamstack', 'web', 'browser'],
  programming: ['rust', 'python', 'javascript', 'typescript', 'golang', 'java', 'c++', 'swift', 'kotlin', 'ruby', 'algorithm', 'data structure', 'coding', 'programming', 'software', 'engineer', 'developer', 'debug', 'refactor', 'optimization'],
  tech: ['startup', 'funding', 'acquisition', 'ipo', 'google', 'apple', 'microsoft', 'amazon', 'meta', 'nvidia', 'chip', 'hardware', 'cloud', 'saas', 'market', 'billion', 'regulation', 'privacy', 'security'],
  career: ['job', 'hiring', 'interview', 'salary', 'remote', 'career', 'freelance', 'layoff', 'workplace', 'mentor', 'resume', 'portfolio', 'junior', 'senior', 'manager'],
}

function inferCategory(article: Article): Exclude<NewsCategory, 'all'> {
  const text = `${article.title} ${article.subreddit || ''} ${article.content_preview || ''}`.toLowerCase()

  let bestCategory: Exclude<NewsCategory, 'all'> = 'other'
  let bestScore = 0

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let score = 0
    for (const keyword of keywords) {
      if (text.includes(keyword)) score++
    }
    if (score > bestScore) {
      bestScore = score
      bestCategory = category as Exclude<NewsCategory, 'all' | 'other'>
    }
  }

  return bestCategory
}

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const categoryLabels: Record<Exclude<NewsCategory, 'all'>, { label: string; color: string }> = {
  ai: { label: 'AI & ML', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  'dev-tools': { label: 'Dev Tools', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  'web-dev': { label: 'Web Dev', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' },
  programming: { label: 'Programming', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  tech: { label: 'Tech Industry', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
  career: { label: 'Career', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
  other: { label: 'Other', color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20' },
}

const sourceLabels: Record<string, { label: string; color: string }> = {
  reddit: { label: 'Reddit', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  hackernews: { label: 'Hacker News', color: 'bg-orange-600/10 text-orange-600 border-orange-600/20' },
  devto: { label: 'Dev.to', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
}

type SortOption = 'recent' | 'score' | 'comments'

// ---------------------------------------------------------------------------
// ARTICLE ROW
// ---------------------------------------------------------------------------
function ArticleRow({ article, category }: { article: Article; category: Exclude<NewsCategory, 'all'> }) {
  const timeAgo = formatDistanceToNow(new Date(article.published_at), { addSuffix: true })
  const catConfig = categoryLabels[category]
  const srcConfig = sourceLabels[article.source]

  return (
    <div className="group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
      {/* Score */}
      <div className="hidden sm:flex flex-col items-center gap-0.5 text-muted-foreground pt-1">
        <ArrowUp className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">{article.score || 0}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${catConfig.color}`}>
            {catConfig.label}
          </Badge>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${srcConfig.color}`}>
            {srcConfig.label}
          </Badge>
          {article.subreddit && (
            <span className="text-[10px] text-muted-foreground">r/{article.subreddit}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium leading-snug mb-1">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {article.title}
          </a>
        </h3>

        {/* Preview */}
        {article.content_preview && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {article.content_preview}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {article.author && <span>by {article.author}</span>}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo}
          </span>
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <MessageSquare className="h-3 w-3" />
            {article.comment_count || 0} comments
          </a>
          <span className="sm:hidden inline-flex items-center gap-1">
            <ArrowUp className="h-3 w-3" />
            {article.score || 0}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 shrink-0">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
        <BookmarkButton articleId={article.id} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// FEATURED ARTICLE
// ---------------------------------------------------------------------------
function FeaturedArticle({ article, category }: { article: Article; category: Exclude<NewsCategory, 'all'> }) {
  const timeAgo = formatDistanceToNow(new Date(article.published_at), { addSuffix: true })
  const catConfig = categoryLabels[category]

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Featured</Badge>
          <Badge variant="outline" className={`text-xs ${catConfig.color}`}>
            {catConfig.label}
          </Badge>
        </div>
        <h2 className="text-lg font-bold leading-snug mb-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {article.title}
          </a>
        </h2>
        {article.content_preview && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {article.content_preview}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="outline" className={`text-[10px] ${sourceLabels[article.source].color}`}>
            {sourceLabels[article.source].label}
          </Badge>
          {article.author && <span>by {article.author}</span>}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {timeAgo}
          </span>
          <span className="inline-flex items-center gap-1">
            <ArrowUp className="h-3 w-3" /> {article.score || 0}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="h-3 w-3" /> {article.comment_count || 0} comments
          </span>
          <div className="ml-auto">
            <BookmarkButton articleId={article.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export function TldrNews({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all')
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('recent')

  // Categorize all articles
  const categorizedArticles = useMemo(() => {
    return articles.map((article) => ({
      ...article,
      inferredCategory: inferCategory(article),
    }))
  }, [articles])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: categorizedArticles.length }
    for (const article of categorizedArticles) {
      counts[article.inferredCategory] = (counts[article.inferredCategory] || 0) + 1
    }
    return counts
  }, [categorizedArticles])

  // Filter and sort
  const filtered = useMemo(() => {
    let result = categorizedArticles

    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.inferredCategory === selectedCategory)
    }

    if (selectedSource !== 'all') {
      result = result.filter((a) => a.source === selectedSource)
    }

    switch (sortBy) {
      case 'score':
        result = [...result].sort((a, b) => (b.score || 0) - (a.score || 0))
        break
      case 'comments':
        result = [...result].sort((a, b) => (b.comment_count || 0) - (a.comment_count || 0))
        break
      default:
        result = [...result].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    }

    return result
  }, [categorizedArticles, selectedCategory, selectedSource, sortBy])

  // Featured = highest score article
  const featured = filtered.length > 0 ? filtered.reduce((best, current) => (current.score || 0) > (best.score || 0) ? current : best) : null
  const remaining = filtered.filter((a) => a.id !== featured?.id)

  // Today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (articles.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Newspaper className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Daily Digest</h1>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
        </div>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No articles found.</p>
          <p className="mt-1 text-sm text-muted-foreground">News is synced automatically every day.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Newspaper className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Daily Digest</h1>
          <p className="text-sm text-muted-foreground">
            {today} &middot; {articles.length} articles from across the web
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="space-y-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All ({categoryCounts.all || 0})
          </button>
          {(Object.keys(categoryLabels) as Exclude<NewsCategory, 'all'>[]).map((cat) => {
            const count = categoryCounts[cat] || 0
            if (count === 0) return null
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {categoryLabels[cat].label} ({count})
              </button>
            )
          })}
        </div>

        {/* Source + Sort row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Source:</span>
            {['all', 'reddit', 'hackernews', 'devto'].map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedSource === src
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {src === 'all' ? 'All' : src === 'hackernews' ? 'HN' : src === 'devto' ? 'Dev.to' : 'Reddit'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Sort:</span>
            {([['recent', 'Recent'], ['score', 'Top'], ['comments', 'Discussed']] as [SortOption, string][]).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  sortBy === value
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        {selectedCategory !== 'all' && ` in ${categoryLabels[selectedCategory as Exclude<NewsCategory, 'all'>].label}`}
      </p>

      {/* Featured article */}
      {featured && (
        <FeaturedArticle article={featured} category={featured.inferredCategory} />
      )}

      {/* Article list */}
      {remaining.length > 0 ? (
        <div className="space-y-2">
          {remaining.map((article) => (
            <ArticleRow key={article.id} article={article} category={article.inferredCategory} />
          ))}
        </div>
      ) : (
        filtered.length === 0 && (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">No articles match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedSource('all')
              }}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )
      )}
    </div>
  )
}
