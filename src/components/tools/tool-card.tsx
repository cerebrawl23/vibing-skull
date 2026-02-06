'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Star } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PricingBadge } from './pricing-badge'
import { ToolRating } from './tool-rating'
import { FavoriteButton } from './favorite-button'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  tool: {
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
  showCategory?: boolean
}

export function ToolCard({ tool, showCategory = true }: ToolCardProps) {
  const platforms = [
    tool.supports_vscode && 'VS Code',
    tool.supports_jetbrains && 'JetBrains',
    tool.supports_neovim && 'Neovim',
    tool.supports_web && 'Web',
    tool.supports_cli && 'CLI',
  ].filter((p): p is string => Boolean(p))

  return (
    <Card className={cn(
      'group relative flex flex-col transition-all hover:shadow-md',
      tool.is_featured && 'ring-1 ring-primary/20'
    )}>
      {tool.is_featured && (
        <div className="absolute -top-2 left-4 z-10">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="mr-1 h-3 w-3 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <CardContent className="flex-1 pt-6">
        <div className="flex items-start gap-3">
          {tool.logo_url ? (
            <Image
              src={tool.logo_url}
              alt={tool.name}
              width={40}
              height={40}
              className="rounded-lg"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg font-semibold">
              {tool.name.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/tools/${tool.slug}`}
                className="font-semibold hover:text-primary transition-colors truncate"
              >
                {tool.name}
              </Link>
              <PricingBadge pricing={tool.pricing} className="shrink-0" />
            </div>

            {showCategory && tool.category && (
              <Link
                href={`/tools?category=${tool.category.slug}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {tool.category.name}
              </Link>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {tool.description}
        </p>

        {platforms.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {platforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-4 py-3">
        <ToolRating
          rating={tool.avg_rating || 0}
          count={tool.rating_count || 0}
        />

        <div className="flex items-center gap-1">
          <FavoriteButton toolId={tool.id} />
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/tools/${tool.slug}`}>
              Details
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
