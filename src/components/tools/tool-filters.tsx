'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Code, Palette, MessageSquare, Rocket } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-code-assistants': <Code className="h-4 w-4" />,
  'ai-design-ui': <Palette className="h-4 w-4" />,
  'prompting-context': <MessageSquare className="h-4 w-4" />,
  'deployment-backend': <Rocket className="h-4 w-4" />,
}

const pricingOptions = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'open_source', label: 'Open Source' },
  { value: 'paid', label: 'Paid' },
]

interface Category {
  id: string
  name: string
  slug: string
  tools: { count: number }[]
}

interface ToolFiltersProps {
  categories: Category[]
  selectedCategory: string | null
  selectedPricing: string | null
}

export function ToolFilters({ categories, selectedCategory, selectedPricing }: ToolFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/tools?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <Tabs
        value={selectedCategory || 'all'}
        onValueChange={(value) => updateParams('category', value)}
      >
        <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Tools
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.slug}
              value={category.slug}
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {categoryIcons[category.slug]}
              {category.name}
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {category.tools[0]?.count || 0}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Pricing Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Pricing:</span>
        {pricingOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedPricing === option.value || (!selectedPricing && option.value === 'all') ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateParams('pricing', option.value)}
            className="h-7"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
