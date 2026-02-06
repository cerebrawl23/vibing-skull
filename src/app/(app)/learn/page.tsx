import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Lightbulb,
  Terminal,
  FileCode,
  MessageSquare,
  Settings,
  Zap,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Learn - The Vibing Skull',
  description: 'Tips, tricks, and guides for mastering AI-powered coding tools',
}

const guides = [
  {
    title: 'Claude Code Mastery',
    description: 'Master the CLI that changed everything',
    icon: Terminal,
    color: 'text-orange-500',
    items: [
      {
        title: 'The AskUserQuestion Tool',
        description: 'How Claude Code asks for clarification mid-task instead of guessing. Use this pattern in your own prompts.',
        tag: 'Essential',
      },
      {
        title: '.claude Files & Project Memory',
        description: 'Create CLAUDE.md files to give Claude persistent context about your project structure, conventions, and preferences.',
        tag: 'Pro Tip',
      },
      {
        title: 'Hooks System',
        description: 'Run shell commands automatically before/after Claude actions. Perfect for auto-formatting, testing, and validation.',
        tag: 'Advanced',
      },
      {
        title: 'MCP Servers',
        description: 'Extend Claude with custom tools via Model Context Protocol. Connect to databases, APIs, and more.',
        tag: 'Advanced',
      },
      {
        title: 'TodoWrite for Planning',
        description: 'Claude uses todo lists to track complex multi-step tasks. Ask it to "make a plan" for better results.',
        tag: 'Workflow',
      },
    ],
  },
  {
    title: 'Cursor Power User',
    description: 'Get the most out of the AI-first editor',
    icon: FileCode,
    color: 'text-blue-500',
    items: [
      {
        title: '.cursorrules Files',
        description: 'Define project-specific AI behavior. Set coding standards, preferred libraries, and response formats.',
        tag: 'Essential',
      },
      {
        title: 'Composer vs Chat',
        description: 'Use Composer for multi-file edits, Chat for exploration. Know when to use each.',
        tag: 'Workflow',
      },
      {
        title: '@-Mentions for Context',
        description: 'Reference files, docs, and codebase with @ mentions. Better context = better completions.',
        tag: 'Pro Tip',
      },
      {
        title: 'Codebase Indexing',
        description: 'Let Cursor index your entire codebase for semantic search and better suggestions.',
        tag: 'Setup',
      },
    ],
  },
  {
    title: 'Prompt Engineering',
    description: 'Communicate effectively with AI',
    icon: MessageSquare,
    color: 'text-green-500',
    items: [
      {
        title: 'Be Specific, Not Vague',
        description: '"Add a button" vs "Add a blue primary button in the header that opens a modal with a contact form"',
        tag: 'Fundamental',
      },
      {
        title: 'Show, Don\'t Just Tell',
        description: 'Include examples of the output format you want. AI learns from patterns.',
        tag: 'Technique',
      },
      {
        title: 'Chain of Thought',
        description: 'Ask AI to "think step by step" for complex problems. Reasoning improves accuracy.',
        tag: 'Technique',
      },
      {
        title: 'Context Windows Matter',
        description: 'Front-load important info. AI pays more attention to the beginning of prompts.',
        tag: 'Advanced',
      },
    ],
  },
]

const quickLinks = [
  { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code', icon: BookOpen },
  { title: 'Cursor Docs', url: 'https://docs.cursor.com', icon: BookOpen },
  { title: 'Awesome CursorRules', url: 'https://github.com/PatrickJS/awesome-cursorrules', icon: Sparkles },
  { title: 'Anthropic Cookbook', url: 'https://github.com/anthropics/anthropic-cookbook', icon: Lightbulb },
  { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai', icon: MessageSquare },
  { title: 'LangChain Docs', url: 'https://docs.langchain.com', icon: Settings },
]

const dailyTips = [
  {
    tip: 'Start your CLAUDE.md with a project summary and tech stack. Claude will reference this context in every conversation.',
    tool: 'Claude Code',
  },
  {
    tip: 'Use "proceed" or "continue" when Claude asks for confirmation. It\'s faster than typing "yes please go ahead".',
    tool: 'Claude Code',
  },
  {
    tip: 'In Cursor, press Cmd+K (Ctrl+K) on selected code to get inline edits without opening chat.',
    tool: 'Cursor',
  },
  {
    tip: 'Ask AI to "explain your reasoning" after it generates code. You\'ll catch bugs and learn patterns.',
    tool: 'General',
  },
  {
    tip: 'Create a .cursorrules file in every project. Even a simple one dramatically improves output quality.',
    tool: 'Cursor',
  },
  {
    tip: 'When debugging, paste the error AND the relevant code. Context is everything.',
    tool: 'General',
  },
]

export default function LearnPage() {
  // Pick a random tip for "Tip of the Day"
  const tipOfTheDay = dailyTips[Math.floor(Date.now() / 86400000) % dailyTips.length]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learn</h1>
        <p className="text-muted-foreground">
          Tips, tricks, and guides to master AI-powered coding
        </p>
      </div>

      {/* Tip of the Day */}
      <Card className="mb-8 border-primary/50 bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Tip of the Day</CardTitle>
            <Badge variant="outline">{tipOfTheDay.tool}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{tipOfTheDay.tip}</p>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-muted transition-colors"
            >
              <link.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium truncate">{link.title}</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
            </a>
          ))}
        </div>
      </div>

      {/* Guides */}
      <div className="space-y-8">
        {guides.map((guide) => (
          <div key={guide.title}>
            <div className="flex items-center gap-3 mb-4">
              <guide.icon className={`h-6 w-6 ${guide.color}`} />
              <div>
                <h2 className="text-xl font-semibold">{guide.title}</h2>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {guide.items.map((item) => (
                <Card key={item.title} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {item.tag}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Community Resources */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Community</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="https://reddit.com/r/vibecoding"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-1">r/vibecoding</h3>
            <p className="text-sm text-muted-foreground">The home of vibe coding on Reddit</p>
          </a>
          <a
            href="https://reddit.com/r/cursor"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-1">r/cursor</h3>
            <p className="text-sm text-muted-foreground">Cursor editor community</p>
          </a>
          <a
            href="https://reddit.com/r/ClaudeAI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-1">r/ClaudeAI</h3>
            <p className="text-sm text-muted-foreground">Claude and Anthropic discussions</p>
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center p-8 rounded-lg border bg-muted/50">
        <h2 className="text-2xl font-bold mb-2">Want to contribute?</h2>
        <p className="text-muted-foreground mb-4">
          Share your tips, .cursorrules files, or CLAUDE.md templates
        </p>
        <a
          href="mailto:hello@vibingskull.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit a Tip
        </a>
      </div>
    </div>
  )
}
