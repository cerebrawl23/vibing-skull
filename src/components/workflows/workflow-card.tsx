'use client'

import Link from 'next/link'
import { Clock, Star, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const difficultyConfig = {
  beginner: { label: 'Beginner', className: 'bg-green-500/10 text-green-500' },
  intermediate: { label: 'Intermediate', className: 'bg-amber-500/10 text-amber-500' },
  advanced: { label: 'Advanced', className: 'bg-red-500/10 text-red-500' },
}

interface WorkflowCardProps {
  workflow: {
    id: string
    title: string
    slug: string
    description: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimated_time: string | null
    is_featured: boolean
    workflow_steps?: { count: number }[]
    workflow_tools?: {
      tools: {
        name: string
        slug: string
      }
    }[]
  }
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const difficulty = difficultyConfig[workflow.difficulty]
  const stepCount = workflow.workflow_steps?.[0]?.count || 0
  const tools = workflow.workflow_tools?.map(wt => wt.tools) || []

  return (
    <Card className={cn(
      'group flex flex-col transition-all hover:shadow-md',
      workflow.is_featured && 'ring-1 ring-primary/20'
    )}>
      {workflow.is_featured && (
        <div className="absolute -top-2 left-4 z-10">
          <Badge className="bg-primary text-primary-foreground">
            <Star className="mr-1 h-3 w-3 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <CardContent className="flex-1 pt-6">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/workflows/${workflow.slug}`}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {workflow.title}
          </Link>
          <Badge variant="secondary" className={difficulty.className}>
            {difficulty.label}
          </Badge>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {workflow.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {workflow.estimated_time && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {workflow.estimated_time}
            </span>
          )}
          <span>{stepCount} steps</span>
        </div>

        {tools.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tools.slice(0, 4).map((tool) => (
              <Badge key={tool.slug} variant="outline" className="text-xs">
                {tool.name}
              </Badge>
            ))}
            {tools.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{tools.length - 4} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t bg-muted/30 px-4 py-3">
        <Button variant="ghost" className="ml-auto" asChild>
          <Link href={`/workflows/${workflow.slug}`}>
            View Guide
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
