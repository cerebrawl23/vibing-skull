import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('reading_history')
      .select(`
        *,
        article:news_articles(id, title, url, source),
        tool:tools(id, name, slug, logo_url),
        workflow:workflows(id, title, slug)
      `)
      .eq('user_id', user.id)
      .order('visited_at', { ascending: false })
      .limit(50)

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, error: null })
  } catch {
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const { item_type, article_id, tool_id, workflow_id } = await request.json()

    if (!item_type || !['article', 'tool', 'workflow'].includes(item_type)) {
      return NextResponse.json({ data: null, error: 'Valid item_type required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('reading_history')
      .insert({
        user_id: user.id,
        item_type,
        article_id: article_id ?? null,
        tool_id: tool_id ?? null,
        workflow_id: workflow_id ?? null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, error: null }, { status: 201 })
  } catch {
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 })
  }
}
