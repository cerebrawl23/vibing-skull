import { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Lightbulb,
  Terminal,
  FileCode,
  MessageSquare,
  Zap,
  ExternalLink,
  Sparkles,
  Brain,
  Code,
  Wand2,
  CheckCircle,
  ArrowRight,
  Flame,
  Settings,
  FolderOpen
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Learn - The Vibing Skull',
  description: 'Master AI-powered coding with Claude, Gemini, ChatGPT, and the best coding tools',
}

const bigThreeAI = [
  {
    name: 'Claude',
    company: 'Anthropic',
    icon: '🟠',
    color: 'border-orange-500/50 bg-orange-500/5',
    bestFor: 'Complex agents, coding, nuanced reasoning',
    strengths: [
      '1M token context (Opus 4.6, Sonnet 4.5 beta)',
      'Opus 4.6: Latest flagship with agent teams',
      'Sonnet 4.5: Best for complex agents & coding',
      'Haiku 4.5: Fastest with near-frontier performance',
      'Claude Code CLI for autonomous coding',
    ],
    useCases: [
      'Build full features autonomously (Claude Code)',
      'Refactor entire codebases',
      'Multi-file debugging and review',
      'Create detailed technical specs',
      'Agent teams for complex workflows',
    ],
    tools: ['Claude Code', 'Claude.ai', 'API'],
    tip: 'Use CLAUDE.md files to give Claude persistent project context. Opus 4.6 supports 1M tokens in beta.',
  },
  {
    name: 'ChatGPT',
    company: 'OpenAI',
    icon: '🟢',
    color: 'border-green-500/50 bg-green-500/5',
    bestFor: 'Reasoning, agentic tool use, broad knowledge',
    strengths: [
      'GPT-5 Thinking: 196K context, deep reasoning',
      'o3: Smartest reasoning model, 20% fewer errors than o1',
      'GPT-4.1: 1M token context for coding tasks',
      'o4-mini: Fast, cost-efficient reasoning',
      'Agentic tools: web search + Python + images combined',
    ],
    useCases: [
      'Complex multi-step reasoning (o3/o3-pro)',
      'Large codebase analysis (GPT-4.1)',
      'Quick code generation (GPT-4o)',
      'Math, science, and coding problems',
      'Custom GPTs with full model selection',
    ],
    tools: ['ChatGPT', 'GitHub Copilot', 'API'],
    tip: 'Use o3 for complex problems needing multi-faceted analysis. GPT-4.1 handles 1M tokens for entire repos.',
  },
  {
    name: 'Gemini',
    company: 'Google',
    icon: '🔵',
    color: 'border-blue-500/50 bg-blue-500/5',
    bestFor: 'Massive context, multimodal, Google ecosystem',
    strengths: [
      'Gemini 2.5 Pro: 2M token context window',
      'Gemini 3 Pro: Reasoning-first, agentic workflows',
      'Gemini 3 Flash: Fastest in its class',
      'Native multimodal (images, video, audio, code)',
      'Deep Google Cloud/Firebase integration',
    ],
    useCases: [
      'Analyze entire large codebases (2M context)',
      'Complex agentic workflows (Gemini 3 Pro)',
      'Fast real-time applications (Gemini 3 Flash)',
      'Multimodal analysis of UIs/screenshots',
      'Firebase/Google Cloud projects',
    ],
    tools: ['Gemini', 'AI Studio', 'Vertex AI', 'API'],
    tip: 'Gemini 2.5 Pro\'s 2M token context can analyze massive repos. Use Gemini 3 Flash for latency-sensitive tasks.',
  },
]

const codingTools = [
  {
    name: 'Cursor',
    category: 'AI Code Editor',
    description: 'VSCode fork with deep AI integration',
    capabilities: [
      'Multi-file editing with Composer',
      'Inline code generation (Cmd+K)',
      'Codebase-aware suggestions',
      'Chat with your code',
      '.cursorrules for custom behavior',
    ],
    bestFor: 'Daily coding with AI assistance',
  },
  {
    name: 'Claude Code',
    category: 'CLI Agent',
    description: 'Autonomous coding agent in your terminal',
    capabilities: [
      'Creates/edits multiple files',
      'Runs commands and tests',
      'Git operations',
      'Asks clarifying questions',
      'Tracks progress with todos',
    ],
    bestFor: 'Complex multi-step tasks',
  },
  {
    name: 'GitHub Copilot',
    category: 'Code Completion',
    description: 'AI pair programmer for any IDE',
    capabilities: [
      'Real-time code suggestions',
      'Multi-IDE support',
      'Copilot Chat',
      'PR summaries',
      'Documentation generation',
    ],
    bestFor: 'Inline completions while coding',
  },
  {
    name: 'v0 by Vercel',
    category: 'UI Generator',
    description: 'Generate React/Next.js UI from prompts',
    capabilities: [
      'Text to React components',
      'shadcn/ui integration',
      'Iterative refinement',
      'Copy-paste ready code',
      'Responsive by default',
    ],
    bestFor: 'Rapid UI prototyping',
  },
  {
    name: 'Bolt.new',
    category: 'Full-Stack Builder',
    description: 'Build entire apps from prompts',
    capabilities: [
      'Full-stack code generation',
      'Database setup',
      'Authentication',
      'Deployment ready',
      'In-browser preview',
    ],
    bestFor: 'Quick MVPs and prototypes',
  },
  {
    name: 'Cline',
    category: 'VSCode Agent',
    description: 'Autonomous AI agent for VSCode',
    capabilities: [
      'Multi-file editing',
      'Terminal commands',
      'Browser automation',
      'Human-in-the-loop',
      'Multiple LLM support',
    ],
    bestFor: 'Autonomous coding in VSCode',
  },
]

const promptingGuide = [
  {
    title: 'Be Specific About Output',
    bad: 'Make a login page',
    good: 'Create a Next.js login page with email/password fields, a "Forgot Password" link, OAuth buttons for Google and GitHub, form validation using Zod, and error handling. Use shadcn/ui components and Tailwind CSS.',
    why: 'Specific prompts eliminate guesswork and reduce back-and-forth.',
  },
  {
    title: 'Provide Context',
    bad: 'Fix this error',
    good: 'I\'m getting "Cannot read property of undefined" in my React component when fetching user data. Here\'s the component code and the API response structure. The error happens on line 42 when accessing user.profile.name.',
    why: 'Context helps AI understand your specific situation.',
  },
  {
    title: 'Show Examples',
    bad: 'Format the data nicely',
    good: 'Format the API response like this example:\n```\n{ "user": "John", "status": "active" }\n```\nKeep snake_case keys, add a "processed_at" timestamp.',
    why: 'Examples are worth a thousand words. AI learns patterns instantly.',
  },
  {
    title: 'Request Reasoning',
    bad: 'Which database should I use?',
    good: 'I\'m building a real-time chat app with 10K concurrent users. Compare PostgreSQL, MongoDB, and Redis for this use case. Consider: write speed, real-time subscriptions, and scalability. Recommend one with reasoning.',
    why: 'Asking for reasoning produces better analysis and catches errors.',
  },
  {
    title: 'Break Down Complex Tasks',
    bad: 'Build me a complete e-commerce site',
    good: 'Let\'s build an e-commerce site step by step. First, help me design the database schema for products, users, orders, and cart. Show the relationships and explain your choices.',
    why: 'Complex tasks fail. Break them into smaller, verifiable steps.',
  },
]

const whatYouCanDo = [
  {
    title: 'Build Full Features',
    description: 'Describe a feature in plain English and let AI implement it across multiple files.',
    tools: ['Claude Code', 'Cursor Composer', 'Cline'],
    example: '"Add user authentication with Google OAuth, protected routes, and a user profile page"',
  },
  {
    title: 'Refactor Entire Codebases',
    description: 'Migrate frameworks, update patterns, or restructure projects systematically.',
    tools: ['Claude Code', 'Cursor', 'Gemini 2.5 Pro'],
    example: '"Convert this Express.js API to use the repository pattern with dependency injection"',
  },
  {
    title: 'Debug Complex Issues',
    description: 'Paste error messages, stack traces, and code—AI will find the root cause.',
    tools: ['Claude Sonnet 4.5', 'o3', 'Cursor Chat'],
    example: '"This API call works locally but fails in production with a 500 error. Here\'s the code and logs..."',
  },
  {
    title: 'Generate UI from Designs',
    description: 'Upload screenshots or describe layouts to get production-ready React code.',
    tools: ['v0', 'Claude', 'Gemini 3 Pro'],
    example: '"Create a pricing page with 3 tiers like in this screenshot, using Tailwind CSS"',
  },
  {
    title: 'Write Tests Automatically',
    description: 'Generate comprehensive test suites for your existing code.',
    tools: ['Claude Code', 'Copilot', 'GPT-4.1'],
    example: '"Write unit tests for this payment processing module. Cover edge cases like failed transactions"',
  },
  {
    title: 'Complex Reasoning Tasks',
    description: 'Multi-step analysis combining web search, code execution, and visual reasoning.',
    tools: ['o3', 'Gemini 3 Pro', 'Claude Opus 4.6'],
    example: '"Research this library, analyze my codebase, and show me how to integrate it step by step"',
  },
]

const dailyTips = [
  {
    tip: 'Put your CLAUDE.md file at the project root. Claude reads it automatically and uses it for context in every conversation.',
    tool: 'Claude Code',
  },
  {
    tip: 'In Cursor, use @file to reference specific files in chat. Use @codebase to search your entire project.',
    tool: 'Cursor',
  },
  {
    tip: 'When debugging, always include: the error message, the relevant code, what you expected, and what actually happened.',
    tool: 'General',
  },
  {
    tip: 'Use o3 or o3-pro for complex reasoning problems. They make 20% fewer major errors than o1 on difficult tasks.',
    tool: 'ChatGPT',
  },
  {
    tip: 'Use Gemini 2.5 Pro\'s 2M token context to analyze massive repositories at once—the largest context window available.',
    tool: 'Gemini',
  },
  {
    tip: 'Create a .cursorrules file that specifies your tech stack, coding style, and preferred patterns.',
    tool: 'Cursor',
  },
  {
    tip: 'Claude Opus 4.6 and Sonnet 4.5 now support 1M token context in beta. Enable it for large codebase analysis.',
    tool: 'Claude',
  },
  {
    tip: 'GPT-4.1 has a 1M token context window optimized for coding. Use it to ingest entire code repositories.',
    tool: 'ChatGPT',
  },
]

const hotTopics = [
  {
    title: 'CLAUDE.md',
    category: 'Configuration',
    isHot: true,
    description: 'Claude Code\'s native configuration file for project context and instructions.',
    details: [
      'Loaded automatically into every conversation',
      'Global: ~/.claude/CLAUDE.md (applies everywhere)',
      'Project: ./CLAUDE.md (project-specific)',
      'Think of it as "README for Claude"',
    ],
    example: `# Project: My SaaS App
Tech: Next.js 14, TypeScript, Tailwind, Supabase
Style: Functional components, named exports
Testing: Jest + React Testing Library
Never: Use any type, skip error handling`,
    tip: 'Keep it minimal—only universally applicable instructions. It goes into every single session.',
  },
  {
    title: 'AGENTS.md',
    category: 'Configuration',
    isHot: true,
    description: 'Universal open standard for AI agent configuration that works across multiple tools.',
    details: [
      'Works with Cursor, Zed, GitHub Copilot, Gemini CLI',
      'Not natively read by Claude Code (add reference in CLAUDE.md)',
      'Portable across different AI tools',
      'Community-driven standard',
    ],
    example: `# AGENTS.md
## Context
Full-stack TypeScript project using React.

## Instructions
- Follow existing code patterns
- Add tests for new features
- Use descriptive variable names`,
    tip: 'Use both: AGENTS.md for universal compatibility, CLAUDE.md for Claude-specific features.',
  },
  {
    title: '.claude Folder',
    category: 'Configuration',
    isHot: false,
    description: 'Project-level configuration directory for Claude Code settings, commands, and agents.',
    details: [
      '.claude/settings.json - Project settings',
      '.claude/settings.local.json - Local overrides (gitignored)',
      '.claude/commands/ - Custom slash commands',
      '.claude/agents/ - Custom subagent definitions',
    ],
    example: `// .claude/settings.json
{
  "permissions": {
    "deny": [".env", "secrets/", "*.pem"]
  },
  "hooks": {
    "onFileChange": "npm run lint"
  }
}`,
    tip: 'Use permissions.deny to protect sensitive files. Commit settings.json, gitignore settings.local.json.',
  },
  {
    title: 'Claude Cowork',
    category: 'Feature',
    isHot: true,
    description: 'Claude Code for non-coding work—file management, document processing, and office tasks.',
    details: [
      'Built into Claude Desktop (Mac)',
      'Designate a folder for Claude to read/modify',
      'Runs in isolated VM for security',
      'Creates plans, executes tasks, delivers outputs',
    ],
    example: `Example tasks:
• "Organize my Downloads folder by file type"
• "Turn these receipt screenshots into an expense spreadsheet"
• "Create a summary from these meeting notes"
• "Rename and organize these photos by date"`,
    tip: 'Available to Pro ($20/mo) and Max ($100+/mo) subscribers. Built entirely using Claude Code!',
  },
  {
    title: 'AskUserQuestion Tool',
    category: 'Feature',
    isHot: true,
    description: 'Claude pauses and asks YOU structured questions when it detects ambiguity.',
    details: [
      'Inverts the prompt relationship—the AI prompts you',
      'Multiple choice, checkboxes, and text input',
      'Surfaces design decisions upfront (cheaper to change)',
      'Best in Plan Mode (Shift+Tab x2)',
    ],
    example: `Claude asks:
"Which auth strategy should I use?"
○ JWT tokens (stateless, scalable)
○ Session cookies (simpler, traditional)
○ OAuth only (delegate to providers)

You select → Claude implements correctly`,
    tip: 'Add "ask clarifying questions before implementing" to CLAUDE.md to trigger this more often.',
  },
  {
    title: 'Custom Subagents',
    category: 'Feature',
    isHot: false,
    description: 'Create specialized autonomous agents that Claude can spawn for specific tasks.',
    details: [
      'Defined in .claude/agents/ as Markdown + YAML',
      'Up to 7 simultaneous subagent operations',
      'Built-in agents: Explore, Plan, general-purpose',
      'Create via /agents command or manually',
    ],
    example: `---
name: test-runner
description: Run and fix failing tests
tools: [Bash, Read, Edit]
---
# Test Runner Agent
Run the test suite, analyze failures,
and fix broken tests automatically.`,
    tip: 'Subagents dramatically speed up complex workflows like codebase exploration and multi-file analysis.',
  },
]

const crossAIConfig = [
  {
    tool: 'Claude Code',
    file: 'CLAUDE.md',
    location: 'Project root or ~/.claude/',
    notes: 'Hierarchical loading, supports subagents',
    link: 'https://code.claude.com/docs',
  },
  {
    tool: 'Cursor',
    file: '.cursorrules',
    location: 'Project root',
    notes: 'Also supports .cursor/rules/',
    link: 'https://docs.cursor.com',
  },
  {
    tool: 'Gemini CLI',
    file: 'GEMINI.md',
    location: 'Project root',
    notes: 'Also reads AGENTS.md, .cursorrules',
    link: 'https://geminicli.com/docs',
  },
  {
    tool: 'ChatGPT',
    file: 'Custom Instructions',
    location: 'Settings → Personalization',
    notes: '1,500 char limit, applies to all chats',
    link: 'https://help.openai.com',
  },
  {
    tool: 'GitHub Copilot',
    file: '.github/copilot-instructions.md',
    location: 'Repository root',
    notes: 'Supports AGENTS.md standard',
    link: 'https://docs.github.com/copilot',
  },
]

const quickLinks = [
  { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code', icon: BookOpen },
  { title: 'Cursor Docs', url: 'https://docs.cursor.com', icon: BookOpen },
  { title: 'Gemini API', url: 'https://ai.google.dev', icon: BookOpen },
  { title: 'OpenAI Docs', url: 'https://platform.openai.com/docs', icon: BookOpen },
  { title: 'Awesome CursorRules', url: 'https://github.com/PatrickJS/awesome-cursorrules', icon: Sparkles },
  { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai', icon: MessageSquare },
]

export default function LearnPage() {
  const tipOfTheDay = dailyTips[Math.floor(Date.now() / 86400000) % dailyTips.length]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learn</h1>
        <p className="text-muted-foreground">
          Master AI-powered coding: what each tool can do and how to use them effectively
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

      {/* The Big 3 AI */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">The Big 3 AI Assistants</h2>
            <p className="text-sm text-muted-foreground">Claude, ChatGPT, and Gemini — know their strengths</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {bigThreeAI.map((ai) => (
            <Card key={ai.name} className={`${ai.color} h-full`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ai.icon}</span>
                  <div>
                    <CardTitle>{ai.name}</CardTitle>
                    <CardDescription>{ai.company}</CardDescription>
                  </div>
                </div>
                <p className="text-sm font-medium text-primary mt-2">{ai.bestFor}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Strengths</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {ai.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">What You Can Do</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {ai.useCases.map((u) => (
                      <li key={u} className="flex items-start gap-2">
                        <Wand2 className="h-3 w-3 text-primary mt-1 shrink-0" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Pro Tip:</span> {ai.tip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What You Can Do */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Wand2 className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">What You Can Do With AI</h2>
            <p className="text-sm text-muted-foreground">Real capabilities that change how you code</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whatYouCanDo.map((item) => (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">"{item.example}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hot Topics */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="h-6 w-6 text-orange-500" />
          <div>
            <h2 className="text-2xl font-bold">Hot Topics: Configuration Files & Features</h2>
            <p className="text-sm text-muted-foreground">CLAUDE.md, AGENTS.md, Cowork, AskUserQuestion, and more</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {hotTopics.map((topic) => (
            <Card key={topic.title} className={topic.isHot ? 'border-orange-500/30' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {topic.category === 'Configuration' ? (
                      <FolderOpen className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Settings className="h-5 w-5 text-purple-500" />
                    )}
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    {topic.isHot && (
                      <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">
                        <Flame className="h-3 w-3 mr-1" /> Hot
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">{topic.category}</Badge>
                </div>
                <CardDescription className="mt-2">{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-muted-foreground space-y-1">
                  {topic.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Example:</p>
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono overflow-x-auto">
                    {topic.example}
                  </pre>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Pro Tip:</span> {topic.tip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cross-AI Configuration Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration Files Across AI Tools
            </CardTitle>
            <CardDescription>How to set up instructions for each major AI coding tool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold">Tool</th>
                    <th className="text-left py-2 px-3 font-semibold">Config File</th>
                    <th className="text-left py-2 px-3 font-semibold">Location</th>
                    <th className="text-left py-2 px-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {crossAIConfig.map((config) => (
                    <tr key={config.tool} className="border-b last:border-0">
                      <td className="py-2 px-3 font-medium">{config.tool}</td>
                      <td className="py-2 px-3">
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">{config.file}</code>
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">{config.location}</td>
                      <td className="py-2 px-3 text-muted-foreground">{config.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Coding Tools */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">AI Coding Tools & Editors</h2>
            <p className="text-sm text-muted-foreground">The tools that make vibe coding possible</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {codingTools.map((tool) => (
            <Card key={tool.name}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{tool.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                  {tool.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-medium text-primary">Best for: {tool.bestFor}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/tools" className="inline-flex items-center text-sm text-primary hover:underline">
            View all tools in our directory <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* Prompting Guide */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Prompting That Works</h2>
            <p className="text-sm text-muted-foreground">The difference between okay and excellent AI output</p>
          </div>
        </div>
        <div className="space-y-4">
          {promptingGuide.map((item) => (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-xs font-semibold text-red-500 mb-1">❌ Vague</p>
                    <p className="text-sm text-muted-foreground">{item.bad}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs font-semibold text-green-500 mb-1">✅ Specific</p>
                    <p className="text-sm text-muted-foreground">{item.good}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Why it matters:</span> {item.why}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-12">
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
      </section>

      {/* Community */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Community</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <a
            href="https://reddit.com/r/vibecoding"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-1">r/vibecoding</h3>
            <p className="text-sm text-muted-foreground">The home of vibe coding</p>
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
            <p className="text-sm text-muted-foreground">Claude discussions</p>
          </a>
          <a
            href="https://reddit.com/r/ChatGPT"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold mb-1">r/ChatGPT</h3>
            <p className="text-sm text-muted-foreground">ChatGPT community</p>
          </a>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center p-8 rounded-lg border bg-muted/50">
        <h2 className="text-2xl font-bold mb-2">Have a tip to share?</h2>
        <p className="text-muted-foreground mb-4">
          Submit your favorite AI coding tips, .cursorrules files, or CLAUDE.md templates
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
