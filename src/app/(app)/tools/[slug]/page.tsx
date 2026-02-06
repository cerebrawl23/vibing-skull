import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Star,
  Check,
  X,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PricingBadge } from '@/components/tools/pricing-badge'
import { ToolRating } from '@/components/tools/tool-rating'
import { ToolCard } from '@/components/tools/tool-card'
import { ToolActions } from '@/components/tools/tool-actions'
import { TrackVisit } from '@/components/shared/track-visit'

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

async function getTool(slug: string) {
  const supabase = await createClient()

  const { data: tool } = await supabase
    .from('tools')
    .select(`
      *,
      category:categories(*),
      tool_tags(tags(*)),
      tool_pros_cons(*),
      tool_features(*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  return tool
}

async function getRelatedTools(categoryId: string, currentToolId: string) {
  const supabase = await createClient()

  const { data } = await supabase
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
      category:categories(name, slug)
    `)
    .eq('category_id', categoryId)
    .eq('is_published', true)
    .neq('id', currentToolId)
    .limit(3)

  return data || []
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return {
    title: `${tool.name} - AI Coding Tool`,
    description: tool.meta_description || tool.description,
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = await getRelatedTools(tool.category_id, tool.id)

  const pros = tool.tool_pros_cons
    ?.filter((item: { type: string }) => item.type === 'pro')
    .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order) || []

  const cons = tool.tool_pros_cons
    ?.filter((item: { type: string }) => item.type === 'con')
    .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order) || []

  const featureGroups: Record<string, Array<{ id: string; feature_name: string; feature_value: string | null; feature_group: string | null }>> = {}
  if (tool.tool_features) {
    for (const feature of tool.tool_features) {
      const group = feature.feature_group || 'General'
      if (!featureGroups[group]) featureGroups[group] = []
      featureGroups[group].push(feature)
    }
  }

  const platforms = [
    tool.supports_vscode && 'VS Code',
    tool.supports_jetbrains && 'JetBrains',
    tool.supports_neovim && 'Neovim',
    tool.supports_web && 'Web',
    tool.supports_cli && 'CLI',
  ].filter((p): p is string => Boolean(p))

  return (
    <div className="space-y-8">
      <TrackVisit itemType="tool" itemId={tool.id} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/tools?category=${tool.category?.slug}`}
          className="hover:text-foreground transition-colors"
        >
          {tool.category?.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{tool.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-2xl font-bold">
            {tool.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              {tool.is_featured && (
                <Badge className="bg-primary">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
            <p className="mt-1 text-lg text-muted-foreground">{tool.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <PricingBadge pricing={tool.pricing} />
              <ToolRating rating={tool.avg_rating || 0} count={tool.rating_count || 0} size="md" />
              {platforms.length > 0 && (
                <div className="flex gap-1">
                  {platforms.map((platform) => (
                    <Badge key={platform} variant="secondary">
                      {platform}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <ToolActions
          toolId={tool.id}
          url={tool.url}
          githubUrl={tool.github_url}
          docsUrl={tool.docs_url}
        />
      </div>

      <Separator />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Long Description */}
          {tool.long_description && (
            <Card>
              <CardHeader>
                <CardTitle>About {tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {tool.long_description.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pros and Cons */}
          {(pros.length > 0 || cons.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {pros.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-green-500">
                      <Check className="h-5 w-5" />
                      Pros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pros.map((pro: { id: string; content: string }) => (
                        <li key={pro.id} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {pro.content}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {cons.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <X className="h-5 w-5" />
                      Cons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cons.map((con: { id: string; content: string }) => (
                        <li key={con.id} className="flex items-start gap-2 text-sm">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          {con.content}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Features */}
          {Object.keys(featureGroups).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(featureGroups).map(([group, features]) => (
                    <div key={group}>
                      <h4 className="mb-2 font-medium text-muted-foreground">{group}</h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {features.map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                          >
                            <span className="text-sm">{feature.feature_name}</span>
                            <span className="text-sm font-medium">{feature.feature_value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Details */}
          {tool.pricing_details && (
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tool.pricing_details}</p>
              </CardContent>
            </Card>
          )}

          {/* AI Model */}
          {tool.ai_model && (
            <Card>
              <CardHeader>
                <CardTitle>AI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{tool.ai_model}</p>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {tool.tool_tags && tool.tool_tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.tool_tags.map((tt: { tags: { slug: string; name: string } }) => (
                    <Badge key={tt.tags.slug} variant="secondary">
                      {tt.tags.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Related Tools</h2>
            <Button variant="ghost" asChild>
              <Link href={`/tools?category=${tool.category?.slug}`}>
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <ToolCard key={relatedTool.id} tool={relatedTool} showCategory={false} />
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="pt-4">
        <Button variant="ghost" asChild>
          <Link href="/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>
    </div>
  )
}
