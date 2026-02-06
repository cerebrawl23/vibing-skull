import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('tools')
      .select(
        `
        *,
        category:categories(name, slug),
        tool_tags(tag:tags(name, slug)),
        tool_pros_cons(id, type, content, display_order),
        tool_features(id, feature_name, feature_value, feature_group, display_order),
        tool_ratings(id, rating, review_text, created_at)
      `
      )
      .or(`id.eq.${id},slug.eq.${id}`)
      .eq('is_published', true)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { data: null, error: 'Tool not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data, error: null })
  } catch {
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
