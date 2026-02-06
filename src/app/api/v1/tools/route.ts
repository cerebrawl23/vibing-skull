import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { toolFiltersSchema } from '@/lib/validators/tool'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const parsed = toolFiltersSchema.safeParse({
    category: searchParams.get('category') || undefined,
    pricing: searchParams.get('pricing') || undefined,
    tag: searchParams.get('tag') || undefined,
    search: searchParams.get('search') || undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
  })

  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: 'Invalid parameters' },
      { status: 400 }
    )
  }

  const { category, pricing, search, page, limit } = parsed.data
  const offset = (page - 1) * limit

  try {
    const supabase = await createClient()

    let query = supabase
      .from('tools')
      .select(
        `
        *,
        category:categories!inner(name, slug),
        tool_tags(tag:tags(name, slug))
      `,
        { count: 'exact' }
      )
      .eq('is_published', true)
      .order('is_featured', { ascending: false })
      .order('avg_rating', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq('categories.slug', category)
    }

    if (pricing) {
      query = query.eq('pricing', pricing)
    }

    if (search) {
      query = query.ilike('name', `%${search}%`)
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
