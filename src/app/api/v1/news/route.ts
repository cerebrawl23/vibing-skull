import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { newsFiltersSchema } from '@/lib/validators/news'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const parsed = newsFiltersSchema.safeParse({
    source: searchParams.get('source') || undefined,
    sort: searchParams.get('sort') || undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
  })

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: 'Invalid parameters' },
      { status: 400 }
    )
  }

  const { source, sort, page, limit } = parsed.data
  const offset = (page - 1) * limit

  try {
    const supabase = await createClient()

    let query = supabase
      .from('news_articles')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)

    if (source) {
      query = query.eq('source', source)
    }

    switch (sort) {
      case 'recent':
        query = query.order('published_at', { ascending: false })
        break
      case 'relevance':
        query = query.order('relevance_score', { ascending: false })
        break
      case 'trending':
      default:
        query = query.order('score', { ascending: false })
        break
    }

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      error: null,
      meta: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    })
  } catch {
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
