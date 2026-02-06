import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Code } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ToolGrid } from '@/components/tools/tool-grid'
import { ToolFilters } from '@/components/tools/tool-filters'
import { ToolSearch } from '@/components/tools/tool-search'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Tool Directory',
  description: 'Browse and compare the best AI coding tools for vibe coding.',
}

interface ToolsPageProps {
  searchParams: Promise<{
    category?: string
    pricing?: string
    search?: string
  }>
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('id, name, slug, tools(count)')
    .order('display_order')
  return data || []
}

async function getTools(category?: string, pricing?: string, search?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('tools')
    .select(`
      id,
      name,
      slug,
      description,
      logo_url,
      url,
      pricing,
      avg_rating,
      rating_count,
      is_featured,
      supports_vscode,
      supports_jetbrains,
      supports_neovim,
      supports_web,
      supports_cli,
      category:categories(name, slug),
      tool_tags(tags(name, slug))
    `)
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('name')

  if (category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) {
      query = query.eq('category_id', cat.id)
    }
  }

  if (pricing && pricing !== 'all' && ['free', 'paid', 'freemium', 'open_source'].includes(pricing)) {
    query = query.eq('pricing', pricing as 'free' | 'paid' | 'freemium' | 'open_source')
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data } = await query
  return data || []
}

function ToolGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="mt-3 h-10 w-full" />
          <div className="mt-3 flex gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function ToolsContent({ category, pricing, search }: { category?: string; pricing?: string; search?: string }) {
  const tools = await getTools(category, pricing, search)
  return <ToolGrid tools={tools} showCategory={!category} />
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tool Directory</h1>
            <p className="text-sm text-muted-foreground">
              Discover and compare the best AI coding tools
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64">
          <ToolSearch defaultValue={params.search} />
        </div>
      </div>

      <Suspense fallback={<div className="h-20" />}>
        <ToolFilters
          categories={categories}
          selectedCategory={params.category || null}
          selectedPricing={params.pricing || null}
        />
      </Suspense>

      <Suspense fallback={<ToolGridSkeleton />}>
        <ToolsContent
          category={params.category}
          pricing={params.pricing}
          search={params.search}
        />
      </Suspense>
    </div>
  )
}
