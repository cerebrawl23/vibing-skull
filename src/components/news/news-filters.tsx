'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const sourceOptions = [
  { value: 'all', label: 'All Sources' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'hackernews', label: 'Hacker News' },
  { value: 'devto', label: 'Dev.to' },
]

const sortOptions = [
  { value: 'recent', label: 'Recent' },
  { value: 'relevance', label: 'Relevance' },
  { value: 'score', label: 'Score' },
]

interface NewsFiltersProps {
  selectedSource: string | null
  selectedSort: string | null
}

export function NewsFilters({ selectedSource, selectedSort }: NewsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all' && value !== 'recent') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/news?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Source Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Source:</span>
        {sourceOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedSource === option.value || (!selectedSource && option.value === 'all') ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateParams('source', option.value)}
            className="h-7"
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Sort Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort:</span>
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedSort === option.value || (!selectedSort && option.value === 'recent') ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateParams('sort', option.value)}
            className="h-7"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
