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
      .from('workflows')
      .select(
        `
        *,
        workflow_steps(id, step_number, title, description, estimated_time),
        workflow_tools(
          tool:tools(id, name, slug, description, logo_url, pricing, avg_rating),
          role_in_workflow,
          is_required,
          display_order
        )
      `
      )
      .or(`id.eq.${id},slug.eq.${id}`)
      .eq('is_published', true)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { data: null, error: 'Workflow not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await supabase
      .from('workflows')
      .update({ view_count: (data.view_count ?? 0) + 1 })
      .eq('id', data.id)

    return NextResponse.json({ data, error: null })
  } catch {
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
