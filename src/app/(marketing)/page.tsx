import Link from 'next/link'
import { ArrowRight, Code, Palette, MessageSquare, Rocket, Newspaper, Workflow, Star, BookOpen, Zap, ExternalLink, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PricingBadge } from '@/components/tools/pricing-badge'

const categories = [
  {
    title: 'AI Code Assistants',
    description: 'Cursor, Copilot, Claude Code, Windsurf, and more',
    icon: Code,
    href: '/tools?category=ai-code-assistants',
  },
  {
    title: 'AI Design & UI',
    description: 'v0, Bolt, Lovable, screenshot-to-code tools',
    icon: Palette,
    href: '/tools?category=ai-design-ui',
  },
  {
    title: 'Prompting & Context',
    description: 'Prompt libraries, .cursorrules, context management',
    icon: MessageSquare,
    href: '/tools?category=prompting-context',
  },
  {
    title: 'Deployment & Backend',
    description: 'Supabase, Vercel, Railway, Firebase, and more',
    icon: Rocket,
    href: '/tools?category=deployment-backend',
  },
]

const features = [
  {
    title: 'Curated Tool Directory',
    description: 'Browse 30+ hand-picked AI coding tools organized by category with ratings, comparisons, and detailed reviews.',
    icon: Code,
  },
  {
    title: 'Live News Feed',
    description: 'Stay current with auto-aggregated AI coding news from Reddit, Hacker News, and Dev.to.',
    icon: Newspaper,
  },
  {
    title: 'Tips & Guides',
    description: 'Learn Claude Code tricks, Cursor tips, prompt engineering, and more from our curated guides.',
    icon: BookOpen,
  },
  {
    title: 'Workflow Templates',
    description: 'Follow step-by-step guides like "Build a SaaS in a Weekend" with recommended tool stacks.',
    icon: Workflow,
  },
]

const quickLinks = [
  { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code', external: true },
  { title: 'Cursor Docs', url: 'https://docs.cursor.com', external: true },
  { title: 'Awesome CursorRules', url: 'https://github.com/PatrickJS/awesome-cursorrules', external: true },
  { title: 'Prompt Guide', url: 'https://www.promptingguide.ai', external: true },
  { title: 'Learn Tips', url: '/learn', external: false },
  { title: 'Compare Tools', url: '/tools/compare', external: false },
]

const dailyTips = [
  'Create a CLAUDE.md file in your project root to give Claude persistent context about your codebase.',
  'Use "proceed" instead of "yes" when Claude asks for confirmation - it\'s faster to type.',
  'In Cursor, press Cmd+K on selected code for inline edits without opening the chat.',
  'Ask AI to "think step by step" for complex problems - reasoning improves accuracy.',
  'Create a .cursorrules file in every project to dramatically improve output quality.',
]

async function getFeaturedTools() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tools')
    .select('id, name, slug, description, pricing, is_featured, avg_rating, category:categories(name)')
    .eq('is_published', true)
    .eq('is_featured', true)
    .limit(6)

  return data || []
}

export default async function HomePage() {
  const featuredTools = await getFeaturedTools()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,var(--tw-gradient-from)_0%,transparent_100%)] from-primary/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your command center for{' '}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                vibe coding
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover, compare, and organize the best AI coding tools.
              Curated directory, trending news, workflow templates, and a
              personal dashboard — all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/tools">
                  Browse Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Featured Tools</h2>
                <p className="mt-2 text-muted-foreground">
                  Top-rated tools loved by vibe coders
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/tools">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.slug}`}>
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
                          {tool.name.charAt(0)}
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          Featured
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <CardTitle className="flex items-center gap-2">
                          {tool.name}
                          <PricingBadge pricing={tool.pricing} />
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tool.category?.name}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Explore by Category
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Find the right tools for every part of your vibe coding workflow
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href}>
                <Card className="h-full transition-colors hover:bg-accent">
                  <CardHeader>
                    <cat.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="mt-2">{cat.title}</CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Everything You Need
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links & Tip */}
      <section className="border-t border-border py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Tip of the Day */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Tip of the Day</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {dailyTips[Math.floor(Date.now() / 86400000) % dailyTips.length]}
                </p>
                <Link href="/learn" className="mt-4 inline-flex items-center text-sm text-primary hover:underline">
                  More tips & guides <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-sm"
                  >
                    {link.title}
                    {link.external && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beginners Banner */}
      <section className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/beginners" className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-8 text-white shadow-lg transition-transform hover:scale-[1.01] sm:p-10">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black sm:text-3xl">New to AI? Start Here!</h3>
                  <p className="mt-1 text-white/90">
                    13 bite-sized lessons for ages 8-17. Learn prompting, discover free tools, and build cool things — no experience needed.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-purple-700 shadow-md transition-transform group-hover:scale-105">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to level up your vibe coding?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Create a free account to save favorites, bookmark articles, and track your workflow.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
