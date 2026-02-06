import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const difficulty = request.nextUrl.searchParams.get('difficulty')
  const page = Number(request.nextUrl.searchParams.get('page') || '1')
  const limit = Number(request.nextUrl.searchParams.get('limit') || '10')
  const offset = (page - 1) * limit

  try {
    const supabase = await createClient()

    let query = supabase
      .from('workflows')
      .select(
        `
        *,
        workflow_steps(id, step_number, title, estimated_time),
        workflow_tools(tool:tools(id, name, slug, logo_url), role_in_workflow, is_required, display_order)
      `,
        { count: 'exact' }
      )
      .eq('is_published', true)
      .order('is_featured', { ascending: false })
      .order('view_count', { ascending: false })
      .range(offset, offset + limit - 1)

    if (difficulty && ['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
      query = query.eq('difficulty', difficulty as 'beginner' | 'intermediate' | 'advanced')
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
