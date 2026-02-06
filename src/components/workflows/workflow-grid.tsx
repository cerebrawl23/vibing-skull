'use client'

import { WorkflowCard } from './workflow-card'

interface Workflow {
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

interface WorkflowGridProps {
  workflows: Workflow[]
}

export function WorkflowGrid({ workflows }: WorkflowGridProps) {
  if (workflows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No workflows found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  )
}
