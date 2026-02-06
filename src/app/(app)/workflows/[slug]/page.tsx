import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TrackVisit } from '@/components/shared/track-visit'

const difficultyConfig = {
  beginner: { label: 'Beginner', className: 'bg-green-500/10 text-green-500' },
  intermediate: { label: 'Intermediate', className: 'bg-amber-500/10 text-amber-500' },
  advanced: { label: 'Advanced', className: 'bg-red-500/10 text-red-500' },
}

interface WorkflowDetailPageProps {
  params: Promise<{ slug: string }>
}

async function getWorkflow(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('workflows')
    .select(`
      *,
      workflow_steps(*),
      workflow_tools(
        role_in_workflow,
        is_required,
        display_order,
        tools(id, name, slug, description, url, pricing)
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  return data
}

export async function generateMetadata({ params }: WorkflowDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const workflow = await getWorkflow(slug)

  if (!workflow) {
    return { title: 'Workflow Not Found' }
  }

  return {
    title: `${workflow.title} - Workflow Guide`,
    description: workflow.description,
  }
}

export default async function WorkflowDetailPage({ params }: WorkflowDetailPageProps) {
  const { slug } = await params
  const workflow = await getWorkflow(slug)

  if (!workflow) {
    notFound()
  }

  const difficulty = difficultyConfig[workflow.difficulty as keyof typeof difficultyConfig]
  const steps = workflow.workflow_steps?.sort((a: { step_number: number }, b: { step_number: number }) => a.step_number - b.step_number) || []
  const tools = workflow.workflow_tools?.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order) || []

  return (
    <div className="space-y-8">
      <TrackVisit itemType="workflow" itemId={workflow.id} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/workflows" className="hover:text-foreground transition-colors">
          Workflows
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{workflow.title}</span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-start gap-3">
          <h1 className="text-3xl font-bold">{workflow.title}</h1>
          <Badge variant="secondary" className={difficulty.className}>
            {difficulty.label}
          </Badge>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">{workflow.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {workflow.estimated_time}
          </span>
          <span>{steps.length} steps</span>
          <span>{tools.length} tools</span>
        </div>
      </div>

      <Separator />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Steps */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Steps</h2>
          <div className="space-y-4">
            {steps.map((step: { id: string; step_number: number; title: string; description: string; estimated_time: string | null }) => (
              <Card key={step.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {step.step_number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      {step.estimated_time && (
                        <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.estimated_time}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
                    {step.description.split('\n\n').map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tool Stack Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tool Stack</h2>
          <div className="space-y-3">
            {tools.map((wt: { tools: { id: string; name: string; slug: string; description: string; url: string; pricing: string }; role_in_workflow: string | null; is_required: boolean }) => (
              <Card key={wt.tools.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                      {wt.tools.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/tools/${wt.tools.slug}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {wt.tools.name}
                        </Link>
                        {wt.is_required && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {wt.role_in_workflow}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={wt.tools.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-4">
        <Button variant="ghost" asChild>
          <Link href="/workflows">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workflows
          </Link>
        </Button>
      </div>
    </div>
  )
}
