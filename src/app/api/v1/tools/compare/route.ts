import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('ids')

  if (!ids) {
    return NextResponse.json(
      { data: null, error: 'Missing ids parameter' },
      { status: 400 }
    )
  }

  const slugs = ids.split(',').map((s) => s.trim()).filter(Boolean)

  if (slugs.length < 2 || slugs.length > 4) {
    return NextResponse.json(
      { data: null, error: 'Provide 2-4 tool slugs' },
      { status: 400 }
    )
  }

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
        tool_features(id, feature_name, feature_value, feature_group, display_order)
      `
      )
      .in('slug', slugs)
      .eq('is_published', true)

    if (error) {
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      )
    }

    // Extract unique feature groups
    const featureGroups = [
      ...new Set(
        data?.flatMap((t: any) =>
          t.tool_features?.map((f: any) => f.feature_group).filter(Boolean)
        ) ?? []
      ),
    ]

    return NextResponse.json({
      data: { tools: data, feature_groups: featureGroups },
      error: null,
    })
  } catch {
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
