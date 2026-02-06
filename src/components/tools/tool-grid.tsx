'use client'

import { ToolCard } from './tool-card'

interface Tool {
  id: string
  name: string
  slug: string
  description: string
  logo_url: string | null
  url: string
  pricing: 'free' | 'paid' | 'freemium' | 'open_source'
  avg_rating: number | null
  rating_count: number | null
  is_featured: boolean
  supports_vscode?: boolean
  supports_jetbrains?: boolean
  supports_neovim?: boolean
  supports_web?: boolean
  supports_cli?: boolean
  category?: { name: string; slug: string }
  tool_tags?: { tags: { name: string; slug: string } }[]
}

interface ToolGridProps {
  tools: Tool[]
  showCategory?: boolean
}

export function ToolGrid({ tools, showCategory = true }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No tools found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} showCategory={showCategory} />
      ))}
    </div>
  )
}
