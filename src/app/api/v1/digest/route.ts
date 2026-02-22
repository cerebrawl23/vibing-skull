import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache for 1 hour

interface DigestItem {
  source: 'anthropic' | 'openai' | 'google'
  sourceLabel: string
  title: string
  url: string
  summary: string
  publishedAt: string
}

const RSS_FEEDS = [
  {
    source: 'anthropic' as const,
    sourceLabel: 'Anthropic',
    url: 'https://www.anthropic.com/rss.xml',
  },
  {
    source: 'openai' as const,
    sourceLabel: 'OpenAI',
    url: 'https://openai.com/index/rss.xml',
  },
  {
    source: 'google' as const,
    sourceLabel: 'Google AI',
    url: 'https://blog.google/technology/ai/rss/',
  },
]

function extractItems(xml: string, maxItems: number = 5): Array<{ title: string; url: string; summary: string; publishedAt: string }> {
  const items: Array<{ title: string; url: string; summary: string; publishedAt: string }> = []

  // Match <item> or <entry> blocks (RSS 2.0 and Atom)
  const itemPattern = /<item[\s>]([\s\S]*?)<\/item>|<entry[\s>]([\s\S]*?)<\/entry>/gi
  let match

  while ((match = itemPattern.exec(xml)) !== null && items.length < maxItems) {
    const block = match[1] || match[2]

    const title = extractTag(block, 'title')
    const link = extractLink(block)
    const description = extractTag(block, 'description') || extractTag(block, 'summary') || extractTag(block, 'content')
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'published') || extractTag(block, 'updated')

    if (title && link) {
      items.push({
        title: cleanHtml(title).slice(0, 200),
        url: link,
        summary: cleanHtml(description || '').slice(0, 300),
        publishedAt: pubDate || new Date().toISOString(),
      })
    }
  }

  return items
}

function extractTag(block: string, tag: string): string | null {
  // Handle CDATA sections
  const cdataPattern = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i')
  const cdataMatch = block.match(cdataPattern)
  if (cdataMatch) return cdataMatch[1].trim()

  // Handle regular tags
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const match = block.match(pattern)
  return match ? match[1].trim() : null
}

function extractLink(block: string): string | null {
  // RSS 2.0: <link>url</link>
  const linkTag = extractTag(block, 'link')
  if (linkTag && linkTag.startsWith('http')) return linkTag

  // Atom: <link href="url" />
  const atomLink = block.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/?>/i)
  if (atomLink) return atomLink[1]

  return linkTag
}

function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function GET() {
  const allItems: DigestItem[] = []

  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': 'VibingSkull/1.0 (https://vibingskull.com)' },
      })

      if (!res.ok) return []

      const xml = await res.text()
      const items = extractItems(xml, 5)

      return items.map((item) => ({
        source: feed.source,
        sourceLabel: feed.sourceLabel,
        ...item,
      }))
    })
  )

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value)
    }
  }

  // Sort by published date descending
  allItems.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  })

  return NextResponse.json(
    { items: allItems, fetchedAt: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    }
  )
}
