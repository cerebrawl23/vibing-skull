'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Code,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Lightbulb,
  Newspaper,
  Wrench,
  Database,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DailyDigest } from './daily-digest'

// ---------------------------------------------------------------------------
// THE BIG 3
// ---------------------------------------------------------------------------
const bigThree = [
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    icon: '🟠',
    color: 'border-orange-500/40 hover:border-orange-500/60',
    badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400',
    who: 'Built by Anthropic. Known for safety-first AI research and long-context reasoning.',
    what: 'Best at complex coding, multi-file refactoring, long document analysis, and autonomous agent workflows.',
    when: 'Use Claude when you need to refactor a codebase, write comprehensive docs, build full features autonomously, or analyze massive codebases.',
    how: 'Use CLAUDE.md at your project root for persistent context. Claude Code CLI for autonomous terminal workflows. Opus 4.6 and Sonnet 4.5 support up to 1M tokens in beta.',
    models: ['Opus 4.6 (flagship)', 'Sonnet 4.5 (balanced)', 'Haiku 4.5 (fast)'],
    topTools: [
      { name: 'Claude Code', desc: 'Autonomous CLI agent — creates files, runs tests, handles git', link: 'https://docs.anthropic.com/en/docs/claude-code' },
      { name: 'Cursor (with Claude)', desc: 'AI code editor with Composer for multi-file edits', link: 'https://docs.cursor.com' },
      { name: 'Cline', desc: 'VSCode agent with terminal access and browser automation', link: 'https://github.com/cline/cline' },
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    icon: '🟢',
    color: 'border-green-500/40 hover:border-green-500/60',
    badgeColor: 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400',
    who: 'Built by OpenAI. The most widely used AI assistant with the broadest knowledge base.',
    what: 'Best at multi-step reasoning (o3), fast prototyping, broad knowledge tasks, and agentic tool use combining search + code + images.',
    when: 'Use ChatGPT for quick code generation, learning new frameworks, debugging errors, complex reasoning problems, and when you need web search integrated.',
    how: 'Set Custom Instructions in Settings for your coding style. Use o3 for complex problems, GPT-4.1 (1M tokens) for large codebases, o4-mini for fast tasks.',
    models: ['GPT-5 Thinking (deep)', 'o3 / o3-pro (reasoning)', 'GPT-4.1 (1M coding)', 'o4-mini (fast)'],
    topTools: [
      { name: 'GitHub Copilot', desc: 'Real-time code suggestions in any IDE — just press Tab', link: 'https://docs.github.com/copilot' },
      { name: 'ChatGPT Canvas', desc: 'Side-by-side code editing with visual collaboration', link: 'https://openai.com/index/introducing-canvas/' },
      { name: 'v0 by Vercel', desc: 'Generate React/Next.js UI components from text prompts', link: 'https://v0.dev' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    icon: '🔵',
    color: 'border-blue-500/40 hover:border-blue-500/60',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    who: 'Built by Google DeepMind. Deep integration with Google Cloud, Firebase, and Android ecosystem.',
    what: 'Best at massive context analysis (2M tokens), multimodal tasks (images, video, audio, code), and Google ecosystem projects.',
    when: 'Use Gemini when analyzing huge codebases, working with Firebase/Google Cloud, doing multimodal tasks, or building Android apps.',
    how: 'Use GEMINI.md at your project root for CLI context. Gemini 2.5 Pro gives you 2M token context — the largest available. Gemini 3 Flash for speed-critical tasks.',
    models: ['Gemini 3 Pro (reasoning)', 'Gemini 3 Flash (speed)', 'Gemini 2.5 Pro (2M context)'],
    topTools: [
      { name: 'Gemini CLI', desc: 'Terminal-based agent with GEMINI.md project context', link: 'https://github.com/google-gemini/gemini-cli' },
      { name: 'Firebase Studio', desc: 'Full-stack app builder with Gemini integration', link: 'https://firebase.google.com/docs/studio' },
      { name: 'AI Studio', desc: 'Playground for testing prompts and building with Gemini API', link: 'https://aistudio.google.com' },
    ],
  },
]

// ---------------------------------------------------------------------------
// PROMPTING ESSENTIALS
// ---------------------------------------------------------------------------
const promptingTips = [
  {
    title: 'Be Specific',
    bad: 'Make a login page',
    good: 'Create a Next.js login page with email/password fields, Google OAuth, Zod validation, and shadcn/ui components.',
  },
  {
    title: 'Give Context',
    bad: 'Fix this error',
    good: "I'm getting 'Cannot read property of undefined' in my React component on line 42 when accessing user.profile.name. Here's the code and API response.",
  },
  {
    title: 'Show Examples',
    bad: 'Format the data nicely',
    good: 'Format the response like: { "user": "John", "status": "active" }. Keep snake_case keys, add a processed_at timestamp.',
  },
  {
    title: 'Break It Down',
    bad: 'Build me a complete e-commerce site',
    good: "Let's start with the database schema for products, users, and orders. Show relationships and explain your choices.",
  },
]

// ---------------------------------------------------------------------------
// TIPS & USE CASES
// ---------------------------------------------------------------------------
const tipsAndCases = [
  {
    title: 'Use CLAUDE.md for persistent memory',
    description: 'Drop a CLAUDE.md file at your project root with your tech stack, conventions, and rules. Claude reads it automatically at the start of every session.',
    tools: ['Claude Code'],
  },
  {
    title: 'Let the AI ask YOU questions',
    description: 'Add "ask clarifying questions before implementing" to your config file. Claude\'s AskUserQuestion tool gives you structured choices before it writes code — catching mistakes upfront.',
    tools: ['Claude Code'],
  },
  {
    title: 'Use Plan Mode for big changes',
    description: 'Press Shift+Tab twice in Claude Code to enter Plan Mode. The AI researches and designs before coding. 90% of decisions happen at the planning stage.',
    tools: ['Claude Code', 'Cursor'],
  },
  {
    title: 'Reference files with @ in Cursor',
    description: 'Use @file to reference specific files, @codebase to search your entire project, and @symbol to reference functions or classes directly in Cursor chat.',
    tools: ['Cursor'],
  },
  {
    title: 'Use reasoning models for hard problems',
    description: 'o3 and o3-pro make 20% fewer errors than previous models on difficult tasks. Use them for architecture decisions, debugging, and complex multi-step analysis.',
    tools: ['ChatGPT'],
  },
  {
    title: 'Upload entire repos to Gemini',
    description: 'Gemini 2.5 Pro has a 2M token context window — the largest available. Upload your full codebase for comprehensive analysis, migration planning, or architectural review.',
    tools: ['Gemini'],
  },
  {
    title: 'Config files work across tools',
    description: 'AGENTS.md is an open standard read by Cursor, Gemini CLI, GitHub Copilot, and more. Maintain both AGENTS.md (universal) and CLAUDE.md (Claude-specific) for full coverage.',
    tools: ['All Tools'],
  },
  {
    title: 'Custom subagents for parallel work',
    description: 'Define specialized agents in .claude/agents/ — like a test-runner or code-reviewer. Claude can spawn up to 7 in parallel, dramatically speeding up complex workflows.',
    tools: ['Claude Code'],
  },
]

// ---------------------------------------------------------------------------
// PROMPT CACHING
// ---------------------------------------------------------------------------
const cachingFacts = [
  { label: 'Cache reads cost', value: '10% of base', sub: '90% savings on repeated context' },
  { label: 'Default TTL', value: '5 minutes', sub: 'refreshed free on each use' },
  { label: 'Extended TTL', value: '1 hour', sub: '2× write price, still 90% read savings' },
  { label: 'Max breakpoints', value: '4 per request', sub: 'explicit mode only' },
]

const cachingModels = [
  { model: 'Sonnet 4.6', base: '$3', write5m: '$3.75', write1h: '$6', read: '$0.30' },
  { model: 'Sonnet 4.5', base: '$3', write5m: '$3.75', write1h: '$6', read: '$0.30' },
  { model: 'Haiku 4.5', base: '$1', write5m: '$1.25', write1h: '$2', read: '$0.10' },
  { model: 'Opus 4.6', base: '$5', write5m: '$6.25', write1h: '$10', read: '$0.50' },
]

const automaticCacheCode = `import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()

// Automatic caching — simplest approach
// Applies cache breakpoint to the last cacheable block automatically
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  cache_control: { type: "ephemeral" },  // ← top-level, that's it
  system: "You are a senior TypeScript developer. " +
    "Project context: Next.js 16, Supabase, Tailwind CSS 4. " +
    // ... your full CLAUDE.md contents here (1024+ tokens to be cacheable)
    "Follow existing code patterns and naming conventions...",
  messages: [{ role: "user", content: "Add a user settings page" }]
})

// Check if cache was used
console.log(response.usage)
// { cache_creation_input_tokens: 1850, cache_read_input_tokens: 0, ... } ← first call
// { cache_creation_input_tokens: 0,    cache_read_input_tokens: 1850, ... } ← subsequent`

const explicitCacheCode = `import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()

// Explicit breakpoints — fine-grained control (up to 4 per request)
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: "You are a senior TypeScript developer...",
    },
    {
      type: "text",
      text: "## Project Context\\n\\n" + fullProjectDocs,  // large static block
      cache_control: { type: "ephemeral" },  // ← breakpoint 1: cache everything above
    },
  ],
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: referenceCodeFile,  // another large static block
          cache_control: { type: "ephemeral" },  // ← breakpoint 2
        },
        { type: "text", text: "Refactor this to use the repository pattern" }
      ]
    }
  ]
})

// Verify: both breakpoints should show cache_read_input_tokens on 2nd call
console.log(response.usage.cache_read_input_tokens)  // > 0 means it worked`

// ---------------------------------------------------------------------------
// EXPANDABLE SECTION
// ---------------------------------------------------------------------------
function ExpandableSection({
  children,
  label,
  expandedLabel,
  defaultOpen = false,
}: {
  children: React.ReactNode
  label: string
  expandedLabel?: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {open ? (expandedLabel || 'Show Less') : label}
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export function GuideLibrary() {
  return (
    <div className="space-y-12">
      {/* ── HERO ── */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Master AI-Powered Coding</h1>
        <p className="text-muted-foreground">
          Know the Big 3. Pick the right tools. Write better prompts. Ship faster.
        </p>
      </div>

      {/* ── BEGINNERS BANNER ── */}
      <Link href="/beginners" className="group block">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-4 text-white shadow-lg transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Sparkles className="h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold">New to AI? Start with our Beginners Guide!</p>
              <p className="text-xs text-white/80">13 bite-sized lessons for ages 8-17</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: THE BIG 3
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">The Big 3 AI Assistants</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {bigThree.map((ai) => (
            <Card key={ai.id} className={`${ai.color} transition-colors`}>
              <CardContent className="pt-5 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ai.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{ai.name}</h3>
                    <p className="text-xs text-muted-foreground">{ai.company}</p>
                  </div>
                </div>

                {/* Who / What / When / How */}
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Who</p>
                    <p className="text-muted-foreground">{ai.who}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-0.5">What</p>
                    <p className="text-muted-foreground">{ai.what}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-0.5">When to Use</p>
                    <p className="text-muted-foreground">{ai.when}</p>
                  </div>
                </div>

                {/* Models */}
                <div className="flex flex-wrap gap-1">
                  {ai.models.map((m) => (
                    <Badge key={m} variant="outline" className={`text-[10px] ${ai.badgeColor}`}>{m}</Badge>
                  ))}
                </div>

                {/* How — expandable */}
                <ExpandableSection label="How to Get Started" expandedLabel="Hide Details">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{ai.how}</p>

                    {/* Top 3 Tools */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Best Tools</p>
                      <div className="space-y-2">
                        {ai.topTools.map((tool) => (
                          <a
                            key={tool.name}
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-sm group/tool"
                          >
                            <Wrench className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <span className="font-medium group-hover/tool:text-primary transition-colors">{tool.name}</span>
                              <span className="text-muted-foreground"> — {tool.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2: PROMPTING ESSENTIALS
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Prompting Essentials</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {promptingTips.map((tip) => (
            <Card key={tip.title}>
              <CardContent className="pt-5 space-y-3">
                <h3 className="font-semibold text-sm">{tip.title}</h3>
                <div className="grid gap-2">
                  <div className="rounded-md bg-red-500/5 border border-red-500/15 p-2.5">
                    <p className="text-[10px] font-semibold text-red-500 mb-0.5">Vague</p>
                    <p className="text-xs text-muted-foreground">{tip.bad}</p>
                  </div>
                  <div className="rounded-md bg-green-500/5 border border-green-500/15 p-2.5">
                    <p className="text-[10px] font-semibold text-green-500 mb-0.5">Specific</p>
                    <p className="text-xs text-muted-foreground">{tip.good}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3: TIPS & USE CASES
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Tips & Tricks</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {tipsAndCases.map((tip) => (
            <div key={tip.title} className="rounded-lg border p-4 space-y-2">
              <h3 className="text-sm font-semibold">{tip.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
              <div className="flex flex-wrap gap-1">
                {tip.tools.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4: PROMPT CACHING
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Prompt Caching</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Cache your system prompts and large context blocks — cache reads cost <strong>10% of base input price</strong>, a 90% saving on repeated context.
        </p>

        {/* Stat pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {cachingFacts.map((f) => (
            <div key={f.label} className="rounded-lg border p-3 text-center">
              <p className="text-lg font-bold text-primary">{f.value}</p>
              <p className="text-xs font-medium">{f.label}</p>
              <p className="text-[10px] text-muted-foreground">{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Two modes */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <div>
                <Badge variant="outline" className="text-[10px] mb-2 bg-green-500/10 text-green-600 border-green-500/20">Recommended</Badge>
                <h3 className="font-semibold text-sm">Automatic Caching</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Add one <code className="bg-muted px-1 rounded text-[11px]">cache_control</code> field at the top level of your request. The system automatically moves the breakpoint forward as conversation history grows. Best for multi-turn chats and Claude Code sessions.
                </p>
              </div>
              <ExpandableSection label="Show code example" expandedLabel="Hide code">
                <pre className="text-[11px] bg-muted/60 border rounded-md p-3 overflow-x-auto leading-relaxed font-mono whitespace-pre">
                  {automaticCacheCode}
                </pre>
              </ExpandableSection>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-3">
              <div>
                <Badge variant="outline" className="text-[10px] mb-2">Advanced</Badge>
                <h3 className="font-semibold text-sm">Explicit Breakpoints</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Place <code className="bg-muted px-1 rounded text-[11px]">cache_control</code> directly on individual content blocks. Supports up to 4 breakpoints per request — useful when you have multiple large static blocks (system prompt + tools + examples).
                </p>
              </div>
              <ExpandableSection label="Show code example" expandedLabel="Hide code">
                <pre className="text-[11px] bg-muted/60 border rounded-md p-3 overflow-x-auto leading-relaxed font-mono whitespace-pre">
                  {explicitCacheCode}
                </pre>
              </ExpandableSection>
            </CardContent>
          </Card>
        </div>

        {/* Pricing table */}
        <ExpandableSection label="View pricing per model (per million tokens)" expandedLabel="Hide pricing">
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs border rounded-lg overflow-hidden">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold">Model</th>
                  <th className="text-right py-2 px-3 font-semibold">Base input</th>
                  <th className="text-right py-2 px-3 font-semibold">Cache write (5m)</th>
                  <th className="text-right py-2 px-3 font-semibold">Cache write (1h)</th>
                  <th className="text-right py-2 px-3 font-semibold text-green-600">Cache read</th>
                </tr>
              </thead>
              <tbody>
                {cachingModels.map((m, i) => (
                  <tr key={m.model} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="py-2 px-3 font-medium">{m.model}</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{m.base}/MTok</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{m.write5m}/MTok</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{m.write1h}/MTok</td>
                    <td className="py-2 px-3 text-right font-semibold text-green-600">{m.read}/MTok</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-muted-foreground mt-2">
              Minimum 1,024 tokens required for a block to be cacheable. Cache read tokens are always 0.1× base input price.
            </p>
          </div>
        </ExpandableSection>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5: WHAT'S NEW — DAILY DIGEST
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">What&apos;s New</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Updated hourly from official blogs
          </p>
        </div>

        <DailyDigest />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5: QUICK LINKS
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Quick Links</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {[
            { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' },
            { title: 'OpenAI Docs', url: 'https://platform.openai.com/docs' },
            { title: 'Gemini API', url: 'https://ai.google.dev' },
            { title: 'Cursor Docs', url: 'https://docs.cursor.com' },
            { title: 'r/vibecoding', url: 'https://reddit.com/r/vibecoding' },
            { title: 'r/ClaudeAI', url: 'https://reddit.com/r/ClaudeAI' },
            { title: 'r/ChatGPT', url: 'https://reddit.com/r/ChatGPT' },
            { title: 'Prompt Guide', url: 'https://www.promptingguide.ai' },
          ].map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border p-2.5 text-xs font-medium hover:bg-muted transition-colors"
            >
              <span className="truncate">{link.title}</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
