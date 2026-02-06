import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Workflow } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { WorkflowGrid } from '@/components/workflows/workflow-grid'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Workflow Templates',
  description: 'Step-by-step vibe coding workflow guides with recommended tool stacks.',
}

async function getWorkflows() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('workflows')
    .select(`
      id,
      title,
      slug,
      description,
      difficulty,
      estimated_time,
      is_featured,
      workflow_steps(count),
      workflow_tools(tools(name, slug))
    `)
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('title')

  return data || []
}

function WorkflowGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function WorkflowsContent() {
  const workflows = await getWorkflows()
  return <WorkflowGrid workflows={workflows} />
}

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Workflow className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Workflow Templates</h1>
          <p className="text-sm text-muted-foreground">
            Step-by-step guides with recommended tool stacks
          </p>
        </div>
      </div>

      <Suspense fallback={<WorkflowGridSkeleton />}>
        <WorkflowsContent />
      </Suspense>
    </div>
  )
}
