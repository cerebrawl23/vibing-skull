import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { aggregateNews } from '@/lib/api/news-aggregator'
import { NEWS_MAX_AGE_DAYS } from '@/lib/utils/constants'

export async function GET(request: Request) {
  // Verify cron secret in production
  const authHeader = request.headers.get('authorization')
  if (
    process.env.NODE_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()

    // Aggregate news from all sources
    const result = await aggregateNews()

    // Upsert articles into database
    let inserted = 0
    for (const article of result.articles) {
      const { error } = await supabase.from('news_articles').upsert(
        {
          external_id: article.external_id,
          source: article.source,
          title: article.title,
          url: article.url,
          author: article.author,
          content_preview: article.content_preview,
          thumbnail_url: article.thumbnail_url,
          source_url: article.source_url,
          subreddit: article.subreddit,
          score: article.score,
          comment_count: article.comment_count,
          relevance_score: article.relevance_score,
          tags: article.tags,
          published_at: article.published_at,
          fetched_at: new Date().toISOString(),
        },
        { onConflict: 'source,external_id' }
      )

      if (!error) inserted++
    }

    // Clean up old articles
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - NEWS_MAX_AGE_DAYS)

    const { count: deleted } = await supabase
      .from('news_articles')
      .delete()
      .lt('published_at', cutoffDate.toISOString())

    return NextResponse.json({
      success: true,
      fetched: result.fetched,
      relevant: result.relevant,
      inserted,
      deleted: deleted ?? 0,
    })
  } catch (error) {
    console.error('News sync failed:', error)
    return NextResponse.json(
      { error: 'News sync failed' },
      { status: 500 }
    )
  }
}
