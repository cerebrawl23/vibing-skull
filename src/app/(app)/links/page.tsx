import type { Metadata } from 'next'
import {
  BookOpen,
  GraduationCap,
  Users,
  Mail,
  Github,
  Wrench,
  ExternalLink,
  Link as LinkIcon,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Important Links - The Vibing Skull',
  description: 'A curated collection of essential resources for vibe coding — documentation, learning, communities, newsletters, repos, and free AI tools.',
}

interface LinkItem {
  name: string
  url: string
  description: string
}

interface LinkCategory {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  iconBg: string
  badgeLabel: string
  links: LinkItem[]
}

const categories: LinkCategory[] = [
  {
    title: 'Official Documentation',
    description: 'Primary docs for the tools and platforms you use every day',
    icon: BookOpen,
    color: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    badgeLabel: 'Docs',
    links: [
      {
        name: 'Claude Code Docs',
        url: 'https://docs.anthropic.com/en/docs/claude-code',
        description: 'Official documentation for Anthropic\'s Claude Code CLI agent',
      },
      {
        name: 'Cursor Docs',
        url: 'https://docs.cursor.com',
        description: 'Guides and references for the Cursor AI code editor',
      },
      {
        name: 'OpenAI Platform',
        url: 'https://platform.openai.com/docs',
        description: 'API docs, guides, and references for GPT models and tools',
      },
      {
        name: 'Gemini API / AI Studio',
        url: 'https://ai.google.dev',
        description: 'Google\'s AI developer hub for Gemini models and AI Studio',
      },
      {
        name: 'GitHub Copilot Docs',
        url: 'https://docs.github.com/copilot',
        description: 'Setup, usage, and best practices for GitHub Copilot',
      },
      {
        name: 'Vercel Docs',
        url: 'https://vercel.com/docs',
        description: 'Deployment, serverless functions, and framework guides',
      },
      {
        name: 'Supabase Docs',
        url: 'https://supabase.com/docs',
        description: 'Open-source Firebase alternative with Postgres, Auth, and more',
      },
      {
        name: 'Next.js Docs',
        url: 'https://nextjs.org/docs',
        description: 'The React framework for production — routing, rendering, and APIs',
      },
      {
        name: 'Tailwind CSS Docs',
        url: 'https://tailwindcss.com/docs',
        description: 'Utility-first CSS framework for rapid UI development',
      },
    ],
  },
  {
    title: 'Learning Resources',
    description: 'Free courses and guides to level up your coding and AI skills',
    icon: GraduationCap,
    color: 'text-green-500',
    iconBg: 'bg-green-500/10',
    badgeLabel: 'Learn',
    links: [
      {
        name: 'Prompt Engineering Guide',
        url: 'https://www.promptingguide.ai',
        description: 'Comprehensive guide to writing effective prompts for AI models',
      },
      {
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org',
        description: 'Free full-stack curriculum with certifications and projects',
      },
      {
        name: 'The Odin Project',
        url: 'https://www.theodinproject.com',
        description: 'Open-source full-stack web development curriculum',
      },
      {
        name: 'CS50 (Harvard)',
        url: 'https://cs50.harvard.edu',
        description: 'Harvard\'s legendary intro to computer science — free online',
      },
      {
        name: 'Full Stack Open',
        url: 'https://fullstackopen.com',
        description: 'Deep dive into modern web development with React and Node.js',
      },
      {
        name: 'JavaScript.info',
        url: 'https://javascript.info',
        description: 'The Modern JavaScript Tutorial — from basics to advanced topics',
      },
    ],
  },
  {
    title: 'AI Communities',
    description: 'Join the conversation — subreddits, forums, and developer hubs',
    icon: Users,
    color: 'text-orange-500',
    iconBg: 'bg-orange-500/10',
    badgeLabel: 'Community',
    links: [
      {
        name: 'r/ClaudeAI',
        url: 'https://reddit.com/r/ClaudeAI',
        description: 'Reddit community for Claude users — tips, prompts, and discussion',
      },
      {
        name: 'r/ChatGPT',
        url: 'https://reddit.com/r/ChatGPT',
        description: 'The largest ChatGPT community on Reddit',
      },
      {
        name: 'r/vibecoding',
        url: 'https://reddit.com/r/vibecoding',
        description: 'The home of vibe coding — build with AI, share your work',
      },
      {
        name: 'r/cursor',
        url: 'https://reddit.com/r/cursor',
        description: 'Community for Cursor AI editor users and enthusiasts',
      },
      {
        name: 'r/LocalLLaMA',
        url: 'https://reddit.com/r/LocalLLaMA',
        description: 'Running and fine-tuning open-source LLMs locally',
      },
      {
        name: 'Hacker News',
        url: 'https://news.ycombinator.com',
        description: 'Y Combinator\'s tech news and startup community',
      },
      {
        name: 'Dev.to',
        url: 'https://dev.to',
        description: 'Inclusive community for developers sharing articles and ideas',
      },
    ],
  },
  {
    title: 'Newsletters & News',
    description: 'Stay current with the best AI and tech newsletters delivered to your inbox',
    icon: Mail,
    color: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    badgeLabel: 'Newsletter',
    links: [
      {
        name: 'TLDR Tech',
        url: 'https://tldr.tech',
        description: 'Byte-sized daily tech news — the most popular tech newsletter',
      },
      {
        name: 'The Rundown AI',
        url: 'https://www.rundown.ai',
        description: 'Daily AI news and insights in 5 minutes or less',
      },
      {
        name: 'Ben\'s Bites',
        url: 'https://bensbites.com',
        description: 'Daily digest of the latest AI tools, news, and trends',
      },
      {
        name: 'AI Breakfast',
        url: 'https://aibreakfast.beehiiv.com',
        description: 'Morning roundup of the most important AI developments',
      },
    ],
  },
  {
    title: 'GitHub Repos & Tools',
    description: 'Open-source repos, awesome lists, and builder tools worth bookmarking',
    icon: Github,
    color: 'text-slate-500 dark:text-slate-400',
    iconBg: 'bg-slate-500/10',
    badgeLabel: 'Repo',
    links: [
      {
        name: 'Awesome CursorRules',
        url: 'https://github.com/PatrickJS/awesome-cursorrules',
        description: 'Curated list of .cursorrules files for different tech stacks',
      },
      {
        name: 'Awesome ChatGPT Prompts',
        url: 'https://github.com/f/awesome-chatgpt-prompts',
        description: 'Collection of effective ChatGPT prompt templates',
      },
      {
        name: 'shadcn/ui',
        url: 'https://ui.shadcn.com',
        description: 'Beautiful, accessible components built with Radix UI and Tailwind',
      },
      {
        name: 'v0 by Vercel',
        url: 'https://v0.dev',
        description: 'Generate React and Next.js UI from text prompts instantly',
      },
      {
        name: 'Bolt.new',
        url: 'https://bolt.new',
        description: 'Build and deploy full-stack apps from a single prompt',
      },
    ],
  },
  {
    title: 'Free AI Tools',
    description: 'The best free AI tools you can start using right now',
    icon: Wrench,
    color: 'text-cyan-500',
    iconBg: 'bg-cyan-500/10',
    badgeLabel: 'Free',
    links: [
      {
        name: 'ChatGPT',
        url: 'https://chat.openai.com',
        description: 'OpenAI\'s conversational AI — free tier with GPT-4o access',
      },
      {
        name: 'Claude',
        url: 'https://claude.ai',
        description: 'Anthropic\'s AI assistant — great for coding, writing, and analysis',
      },
      {
        name: 'Gemini',
        url: 'https://gemini.google.com',
        description: 'Google\'s multimodal AI with massive context window',
      },
      {
        name: 'Perplexity',
        url: 'https://perplexity.ai',
        description: 'AI-powered search engine with cited, up-to-date answers',
      },
      {
        name: 'NotebookLM',
        url: 'https://notebooklm.google.com',
        description: 'Google\'s AI notebook — upload sources and get instant insights',
      },
      {
        name: 'Gamma',
        url: 'https://gamma.app',
        description: 'Create beautiful presentations, documents, and websites with AI',
      },
      {
        name: 'Microsoft Copilot',
        url: 'https://copilot.microsoft.com',
        description: 'Microsoft\'s free AI assistant powered by GPT-4',
      },
    ],
  },
]

export default function LinksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <LinkIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Important Links</h1>
            <p className="text-sm text-muted-foreground">
              A curated collection of essential resources for vibe coding
            </p>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid gap-8">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card key={category.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.iconBg}`}>
                    <IconComponent className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {category.links.length} links
                      </Badge>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1.5 rounded-lg border p-4 transition-colors hover:bg-muted/50 hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {link.name}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {link.description}
                      </span>
                      <span className="mt-auto pt-1">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {category.badgeLabel}
                        </Badge>
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-8 text-center p-8 rounded-lg border bg-muted/50">
        <h2 className="text-2xl font-bold mb-2">Know a great resource?</h2>
        <p className="text-muted-foreground mb-4">
          Help us grow this list — suggest links, tools, or communities we should add
        </p>
        <a
          href="mailto:hello@vibingskull.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Suggest a Link
        </a>
      </div>
    </div>
  )
}
