import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { toolRatingSchema } from '@/lib/validators/tool'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = toolRatingSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { data: null, error: 'Invalid rating data' },
        { status: 400 }
      )
    }

    const { tool_id, rating, review_text } = parsed.data

    const { data, error } = await supabase
      .from('tool_ratings')
      .upsert(
        {
          tool_id,
          user_id: user.id,
          rating,
          review_text: review_text ?? null,
        },
        { onConflict: 'tool_id,user_id' }
      )
      .select()
      .single()

    if (error) {
      return NextResponse.json({ data: null, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, error: null })
  } catch {
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 })
  }
}
