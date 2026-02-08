import { Metadata } from 'next'
import {
  BookOpen,
  Bug,
  Code,
  FileText,
  Search,
  BarChart3,
  Calendar,
  ClipboardList,
  Keyboard,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Terminal,
  Zap,
  CheckCircle,
  Copy,
  Target,
  Layers,
  FileCode,
  PenLine,
  TrendingUp,
  GitCompare,
  BrainCircuit,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Cheat Sheets - The Vibing Skull',
  description: 'Copy-ready prompt templates, AI tool comparisons, keyboard shortcuts, and the PTCF framework for vibe coders.',
}

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const codingPrompts = [
  {
    name: 'Debug This Code',
    icon: Bug,
    color: 'text-red-500',
    prompt:
      'You are a senior developer. Analyze the following code for bugs, edge cases, and performance issues. Explain each problem and provide the corrected version with comments.',
  },
  {
    name: 'Code Review',
    icon: Search,
    color: 'text-blue-500',
    prompt:
      'Act as a thorough code reviewer. Review this code for: readability, maintainability, security vulnerabilities, performance, and best practices. Provide specific suggestions.',
  },
  {
    name: 'Explain This Code',
    icon: Lightbulb,
    color: 'text-yellow-500',
    prompt:
      'Break down this code line by line as if explaining to a junior developer. Highlight what each section does and why design decisions were made.',
  },
  {
    name: 'Convert Code',
    icon: GitCompare,
    color: 'text-purple-500',
    prompt:
      'Convert this [language A] code to [language B]. Maintain the same logic and functionality. Add comments explaining any language-specific differences.',
  },
  {
    name: 'Write Tests',
    icon: CheckCircle,
    color: 'text-green-500',
    prompt:
      'Generate comprehensive unit tests for this code. Cover: happy path, edge cases, error handling, and boundary conditions. Use [testing framework].',
  },
  {
    name: 'Optimize This',
    icon: Zap,
    color: 'text-orange-500',
    prompt:
      'Analyze this code for performance bottlenecks. Suggest optimizations with benchmarks. Explain the trade-offs of each optimization.',
  },
]

const writingPrompts = [
  {
    name: 'Professional Email',
    icon: MessageSquare,
    color: 'text-blue-500',
    prompt:
      'Write a professional email about [topic]. Tone: [formal/casual]. Include a clear subject line, greeting, body with key points, and call to action.',
  },
  {
    name: 'Blog Post Outline',
    icon: FileText,
    color: 'text-indigo-500',
    prompt:
      'Create a detailed blog post outline about [topic] for [audience]. Include: compelling title options, intro hook, 5-7 main sections with sub-points, and a conclusion with CTA.',
  },
  {
    name: 'Summarize This',
    icon: ClipboardList,
    color: 'text-teal-500',
    prompt:
      'Summarize the following text in [number] bullet points. Capture the main arguments, key data, and actionable takeaways. Preserve the original meaning.',
  },
  {
    name: 'Rewrite for Clarity',
    icon: PenLine,
    color: 'text-pink-500',
    prompt:
      'Rewrite this text to be clearer and more concise. Maintain the original meaning but improve readability. Target a [grade level] reading level.',
  },
]

const researchPrompts = [
  {
    name: 'Compare Options',
    icon: BarChart3,
    color: 'text-cyan-500',
    prompt:
      'Compare [A] vs [B] vs [C] for [use case]. Create a table with: features, pricing, pros, cons, and best-for scenarios. End with a recommendation.',
  },
  {
    name: 'Research Brief',
    icon: BookOpen,
    color: 'text-emerald-500',
    prompt:
      'Research [topic] and provide a comprehensive brief covering: current state, key players, recent developments, challenges, and future outlook. Cite sources where possible.',
  },
  {
    name: 'Decision Matrix',
    icon: Layers,
    color: 'text-violet-500',
    prompt:
      'Help me decide between [options]. Create a weighted decision matrix with criteria: [list criteria]. Score each option 1-5 and provide a final recommendation.',
  },
  {
    name: 'Trend Analysis',
    icon: TrendingUp,
    color: 'text-amber-500',
    prompt:
      'Analyze current trends in [field]. Identify: emerging patterns, declining trends, opportunities, and potential disruptions. Support with data where available.',
  },
]

const productivityPrompts = [
  {
    name: 'Meeting Agenda',
    icon: Calendar,
    color: 'text-sky-500',
    prompt:
      'Create a structured meeting agenda for [topic]. Include: objectives, time allocations, discussion points, action items section, and follow-up plan.',
  },
  {
    name: 'Project Plan',
    icon: ClipboardList,
    color: 'text-lime-500',
    prompt:
      'Create a project plan for [project]. Include: objectives, scope, timeline, milestones, resource requirements, risks, and success metrics.',
  },
  {
    name: 'Daily Standup',
    icon: Zap,
    color: 'text-orange-500',
    prompt:
      'Help me prepare my daily standup. Yesterday I worked on [X]. Today I plan to [Y]. I\'m blocked by [Z]. Format this concisely.',
  },
  {
    name: 'Weekly Review',
    icon: FileCode,
    color: 'text-rose-500',
    prompt:
      'Help me conduct a weekly review. Prompt me through: accomplishments, incomplete tasks, lessons learned, next week\'s priorities, and habit tracking.',
  },
]

const aiToolsReference = [
  {
    name: 'ChatGPT',
    emoji: '🟢',
    color: 'border-green-500/50 bg-green-500/5',
    bestFor: 'General tasks, plugins, image generation',
    freeTier: 'Free tier available',
    highlight: 'GPT-5 Thinking, o3 reasoning, GPT-4.1 coding',
  },
  {
    name: 'Claude',
    emoji: '🟠',
    color: 'border-orange-500/50 bg-orange-500/5',
    bestFor: 'Coding, long documents, structured output',
    freeTier: 'Free tier available',
    highlight: 'Opus 4.6, Sonnet 4.5, Claude Code CLI',
  },
  {
    name: 'Gemini',
    emoji: '🔵',
    color: 'border-blue-500/50 bg-blue-500/5',
    bestFor: 'Google integration, massive context windows',
    freeTier: 'Free tier available',
    highlight: '2M token context, Gemini 3 Pro/Flash',
  },
  {
    name: 'Perplexity',
    emoji: '🟣',
    color: 'border-purple-500/50 bg-purple-500/5',
    bestFor: 'Research with inline citations',
    freeTier: 'Free Pro for students',
    highlight: 'Web-grounded answers, source links',
  },
  {
    name: 'Copilot',
    emoji: '⚪',
    color: 'border-gray-500/50 bg-gray-500/5',
    bestFor: 'In-IDE code completion',
    freeTier: 'Free for students',
    highlight: 'Tab-to-accept, multi-IDE, PR summaries',
  },
]

const keyboardShortcuts = [
  {
    tool: 'Cursor',
    color: 'border-cyan-500/50 bg-cyan-500/5',
    shortcuts: [
      { keys: 'Cmd+K', description: 'Inline edit — generate or modify code at cursor' },
      { keys: 'Cmd+L', description: 'Open AI chat panel' },
      { keys: 'Cmd+Shift+L', description: 'Open Composer for multi-file edits' },
    ],
  },
  {
    tool: 'Claude Code',
    color: 'border-orange-500/50 bg-orange-500/5',
    shortcuts: [
      { keys: '/', description: 'Slash commands (agents, compact, help, etc.)' },
      { keys: 'Shift+Tab', description: 'Toggle Plan Mode (think before acting)' },
      { keys: 'Esc', description: 'Cancel current generation' },
    ],
  },
  {
    tool: 'VS Code + Copilot',
    color: 'border-blue-500/50 bg-blue-500/5',
    shortcuts: [
      { keys: 'Tab', description: 'Accept the current suggestion' },
      { keys: 'Esc', description: 'Dismiss the current suggestion' },
      { keys: 'Alt+]', description: 'Cycle to the next suggestion' },
    ],
  },
]

const ptcfSteps = [
  {
    letter: 'P',
    label: 'Persona',
    color: 'bg-purple-500',
    description: 'Tell the AI who it should be. Defining a role activates domain-specific knowledge and sets the right tone.',
    example: '"You are a senior full-stack developer specializing in Next.js and TypeScript."',
  },
  {
    letter: 'T',
    label: 'Task',
    color: 'bg-blue-500',
    description: 'State exactly what you need done. Be specific about the action, the scope, and the deliverable.',
    example: '"Refactor the authentication module to use JWT tokens with refresh rotation."',
  },
  {
    letter: 'C',
    label: 'Context',
    color: 'bg-green-500',
    description: 'Supply the background the AI needs. Include tech stack, constraints, prior decisions, and any relevant code.',
    example: '"We use Next.js 16, Supabase for the database, and the app currently uses session cookies."',
  },
  {
    letter: 'F',
    label: 'Format',
    color: 'bg-orange-500',
    description: 'Describe the shape of the output you want. Tables, bullet points, code blocks, step-by-step — be explicit.',
    example: '"Return the implementation as a numbered step-by-step plan first, then provide the code for each step."',
  },
]

// ---------------------------------------------------------------------------
// HELPER COMPONENTS
// ---------------------------------------------------------------------------

function PromptCard({
  name,
  icon: Icon,
  color,
  prompt,
}: {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  prompt: string
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${color}`} />
          <CardTitle className="text-sm">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-lg bg-muted/50 border p-3">
          <Copy className="absolute top-2 right-2 h-3 w-3 text-muted-foreground opacity-40" />
          <p className="text-xs text-muted-foreground font-mono leading-relaxed pr-5">
            {prompt}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function PromptSection({
  title,
  description,
  icon: Icon,
  iconColor,
  prompts,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  prompts: {
    name: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    prompt: string
  }[]
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="secondary" className="text-xs">{prompts.length} prompts</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prompts.map((p) => (
          <PromptCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------

export default function CheatSheetsPage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Cheat Sheets Collection</h1>
            <p className="text-sm text-muted-foreground">
              Copy-ready prompts, tool comparisons, shortcuts, and frameworks for vibe coders
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SECTION 1 — Prompting Cheat Sheet                                 */}
      {/* ================================================================= */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Prompting Cheat Sheet</h2>
            <p className="text-sm text-muted-foreground">
              Battle-tested prompt templates organized by use case — copy, customize, and paste
            </p>
          </div>
        </div>

        <PromptSection
          title="Coding Prompts"
          description="Templates for debugging, reviewing, converting, testing, and optimizing code."
          icon={Code}
          iconColor="text-emerald-500"
          prompts={codingPrompts}
        />

        <PromptSection
          title="Writing Prompts"
          description="Templates for professional emails, blog outlines, summaries, and rewrites."
          icon={PenLine}
          iconColor="text-pink-500"
          prompts={writingPrompts}
        />

        <PromptSection
          title="Research & Analysis Prompts"
          description="Templates for comparisons, research briefs, decision matrices, and trend analysis."
          icon={BrainCircuit}
          iconColor="text-violet-500"
          prompts={researchPrompts}
        />

        <PromptSection
          title="Productivity Prompts"
          description="Templates for meetings, project plans, standups, and weekly reviews."
          icon={Target}
          iconColor="text-sky-500"
          prompts={productivityPrompts}
        />
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — AI Tools Quick Reference                              */}
      {/* ================================================================= */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">AI Tools Quick Reference</h2>
            <p className="text-sm text-muted-foreground">
              At-a-glance comparison of the major AI assistants and what each does best
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {aiToolsReference.map((tool) => (
            <Card key={tool.name} className={`${tool.color} h-full`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tool.emoji}</span>
                  <CardTitle className="text-base">{tool.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Best for</p>
                  <p className="text-xs text-muted-foreground">{tool.bestFor}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Highlights</p>
                  <p className="text-xs text-muted-foreground">{tool.highlight}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {tool.freeTier}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — Keyboard Shortcuts                                    */}
      {/* ================================================================= */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Keyboard className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
            <p className="text-sm text-muted-foreground">
              Essential shortcuts for the most popular AI coding tools
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {keyboardShortcuts.map((group) => (
            <Card key={group.tool} className={group.color}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">{group.tool}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.shortcuts.map((sc) => (
                    <div key={sc.keys} className="flex items-start gap-3">
                      <kbd className="inline-flex shrink-0 items-center rounded-md border bg-muted px-2 py-0.5 text-xs font-mono font-semibold text-foreground">
                        {sc.keys}
                      </kbd>
                      <p className="text-xs text-muted-foreground leading-relaxed">{sc.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — The PTCF Prompting Framework                          */}
      {/* ================================================================= */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Layers className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">The PTCF Prompting Framework</h2>
            <p className="text-sm text-muted-foreground">
              Persona, Task, Context, Format — four parts that turn a mediocre prompt into a great one
            </p>
          </div>
        </div>

        {/* Visual overview */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {ptcfSteps.map((step, i) => (
                <div key={step.letter} className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step.color} text-white font-bold text-lg`}>
                    {step.letter}
                  </div>
                  <span className="text-sm font-semibold">{step.label}</span>
                  {i < ptcfSteps.length - 1 && (
                    <span className="text-muted-foreground mx-1 hidden sm:inline">+</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
              Structure every prompt with these four elements and you will consistently get higher-quality, more relevant responses from any AI model.
            </p>
          </CardContent>
        </Card>

        {/* Detailed breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          {ptcfSteps.map((step) => (
            <Card key={step.letter}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step.color} text-white font-bold text-sm`}>
                    {step.letter}
                  </div>
                  <CardTitle className="text-base">{step.label}</CardTitle>
                </div>
                <CardDescription className="mt-2">{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted/50 border p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Example:</p>
                  <p className="text-xs text-muted-foreground font-mono italic leading-relaxed">
                    {step.example}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full PTCF example */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Putting It All Together
            </CardTitle>
            <CardDescription>
              A complete prompt that uses every PTCF element
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 border p-4 space-y-3">
              <div>
                <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30 mb-1">P - Persona</Badge>
                <p className="text-xs text-muted-foreground font-mono">
                  You are a senior full-stack developer specializing in Next.js and TypeScript with 10 years of experience.
                </p>
              </div>
              <div>
                <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 mb-1">T - Task</Badge>
                <p className="text-xs text-muted-foreground font-mono">
                  Refactor the authentication module to replace session cookies with JWT tokens using refresh-token rotation.
                </p>
              </div>
              <div>
                <Badge className="bg-green-500/20 text-green-600 border-green-500/30 mb-1">C - Context</Badge>
                <p className="text-xs text-muted-foreground font-mono">
                  We use Next.js 16, Supabase for the database, and the app currently uses session cookies. We have about 5,000 daily active users and need zero-downtime migration.
                </p>
              </div>
              <div>
                <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30 mb-1">F - Format</Badge>
                <p className="text-xs text-muted-foreground font-mono">
                  Return a numbered step-by-step migration plan first, then provide the code for each step with inline comments explaining every change.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================================================================= */}
      {/* CTA Footer                                                        */}
      {/* ================================================================= */}
      <div className="text-center p-8 rounded-lg border bg-muted/50">
        <h2 className="text-2xl font-bold mb-2">Want more cheat sheets?</h2>
        <p className="text-muted-foreground mb-4">
          We are always adding new prompt templates, tool comparisons, and quick-reference guides.
          Send us your favorites!
        </p>
        <a
          href="mailto:hello@vibingskull.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit a Cheat Sheet
        </a>
      </div>
    </div>
  )
}
