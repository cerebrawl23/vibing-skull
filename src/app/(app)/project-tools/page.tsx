import { Metadata } from 'next'
import Link from 'next/link'
import {
  Layers,
  Rocket,
  Zap,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  FolderTree,
  GitBranch,
  FileCode,
  Settings,
  ListChecks,
  ArrowRight,
  Newspaper,
  Star,
  ShieldCheck,
  Code,
  Wrench,
  FileText,
  Target,
  Lightbulb,
  Bug,
  Lock,
  Eye,
  Layout,
  MessageSquare,
  BookOpen,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/ui/copy-button'

export const metadata: Metadata = {
  title: 'Project Tools & Best Stacks - The Vibing Skull',
  description: 'Recommended tech stacks, project kickoff prompts, coding protocols, and best practices for AI-assisted vibe coding projects.',
}

const recommendedStacks = [
  {
    name: 'The "Vibe Coder" Stack',
    badge: 'Most Popular',
    badgeColor: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
    cardColor: 'border-orange-500/50 bg-orange-500/5',
    icon: Star,
    iconColor: 'text-orange-500',
    layers: [
      { label: 'Frontend', value: 'Next.js + React + Tailwind CSS + shadcn/ui' },
      { label: 'Backend', value: 'Supabase (Auth + Database + Storage + Realtime)' },
      { label: 'Deployment', value: 'Vercel' },
      { label: 'AI', value: 'Claude Code or Cursor' },
    ],
    why: 'Zero backend code needed, generous free tiers, works perfectly with AI coding tools.',
  },
  {
    name: 'The "Full Control" Stack',
    badge: 'Advanced',
    badgeColor: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    cardColor: 'border-blue-500/50 bg-blue-500/5',
    icon: Settings,
    iconColor: 'text-blue-500',
    layers: [
      { label: 'Frontend', value: 'Next.js + React + Tailwind CSS' },
      { label: 'Backend', value: 'Node.js + Express + PostgreSQL' },
      { label: 'ORM', value: 'Prisma or Drizzle' },
      { label: 'Deployment', value: 'Railway or Render' },
      { label: 'AI', value: 'Claude Code' },
    ],
    why: 'Full control over your backend, better for complex business logic.',
  },
  {
    name: 'The "Rapid Prototype" Stack',
    badge: 'Fastest',
    badgeColor: 'bg-green-500/20 text-green-600 border-green-500/30',
    cardColor: 'border-green-500/50 bg-green-500/5',
    icon: Zap,
    iconColor: 'text-green-500',
    layers: [
      { label: 'Builder', value: 'Bolt.new or v0 by Vercel' },
      { label: 'Backend', value: 'Supabase' },
      { label: 'Deployment', value: 'Vercel' },
    ],
    why: 'Go from idea to deployed app in hours, not days. Perfect for MVPs and hackathons.',
  },
  {
    name: 'The "Mobile App" Stack',
    badge: 'Mobile',
    badgeColor: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
    cardColor: 'border-purple-500/50 bg-purple-500/5',
    icon: Smartphone,
    iconColor: 'text-purple-500',
    layers: [
      { label: 'Framework', value: 'React Native + Expo' },
      { label: 'Backend', value: 'Supabase' },
      { label: 'Deployment', value: 'EAS Build' },
      { label: 'AI', value: 'Cursor' },
    ],
    why: 'One codebase for iOS and Android, great developer experience.',
  },
]

// ── Day Zero Onboarding Prompt ──
const dayZeroPrompt = `You are an expert software architect and AI coding assistant. I'm starting a brand new project and need your help setting it up properly from Day Zero.

PROJECT DETAILS:
- Project Name: [YOUR PROJECT NAME]
- Description: [2-3 sentences about what you're building]
- Target Users: [Who is this for?]
- Tech Stack: [e.g., Next.js + Supabase + Tailwind CSS + shadcn/ui]

PLEASE HELP ME WITH:

1. PROJECT STRUCTURE: Create a complete folder structure with all necessary files and directories. Include placeholder files where needed.

2. CONFIGURATION FILES: Set up all config files (tsconfig, tailwind, eslint, prettier, .env.example, .gitignore, etc.) with sensible defaults for my stack.

3. CORE SETUP: Initialize the project with:
   - Authentication scaffolding
   - Database schema design (list the tables I'll need)
   - API route structure
   - Component library setup
   - Theme/styling system

4. AI CONTEXT FILES: Create a CLAUDE.md file that includes:
   - Project overview and architecture
   - Tech stack details
   - Coding conventions and style guide
   - File structure explanation
   - Common patterns used in this project

5. DOCUMENTATION: Create a README.md with:
   - Project description
   - Setup instructions
   - Environment variables needed
   - Development workflow

6. FIRST FEATURES: List the first 5 features I should build, in order, with brief implementation notes for each.

Start with the folder structure, then work through each section. Ask me clarifying questions if anything is ambiguous.`

// ── Project Kickoff Master Prompt ──
const kickoffPrompt = `You are an expert full-stack software architect. I need you to create a comprehensive project plan for the following application:

PROJECT VISION:
[Describe your app in 2-3 paragraphs. Include the problem it solves, who it's for, and what makes it unique.]

DELIVERABLES - Please provide ALL of the following:

1. TECH STACK RECOMMENDATION
   - Frontend framework and UI library
   - Backend/API approach
   - Database choice and why
   - Authentication strategy
   - Deployment platform
   - AI coding tool recommendations

2. DATABASE SCHEMA
   - All tables with columns and types
   - Relationships between tables
   - Indexes for performance
   - Row Level Security policies (if using Supabase)

3. API ROUTE MAP
   - Every endpoint the app needs
   - HTTP methods and expected payloads
   - Authentication requirements per route

4. PAGE/SCREEN MAP
   - Every page in the application
   - URL structure
   - Which pages need auth
   - Component hierarchy per page

5. COMPONENT ARCHITECTURE
   - Shared/reusable components list
   - Feature-specific components
   - State management approach
   - Data fetching patterns

6. AUTHENTICATION FLOW
   - Sign up / Sign in flow
   - Protected routes
   - Role-based access (if needed)
   - Session management

7. FILE STRUCTURE
   - Complete directory tree
   - Naming conventions
   - Where each type of code lives

8. ENVIRONMENT VARIABLES
   - Every env var needed
   - Which are public vs secret
   - Example values for .env.example

9. THIRD-PARTY INTEGRATIONS
   - APIs and services needed
   - SDK/library for each
   - Cost considerations

10. MVP FEATURE PRIORITY
    - Ordered list of features to build
    - Estimated complexity (Low/Medium/High)
    - Dependencies between features

11. TESTING STRATEGY
    - What to test and how
    - Testing libraries to use
    - Minimum test coverage goals

12. DEPLOYMENT CHECKLIST
    - Steps to go from local to production
    - CI/CD pipeline setup
    - Domain and DNS configuration
    - Performance optimization checklist

13. AI CONTEXT FILES
    - CLAUDE.md content
    - .cursorrules content
    - Project-specific instructions for AI tools

Please be thorough and specific. Use code blocks for schemas, file structures, and configuration examples.`

// ── The Ultimate Vibe Coding Guide (18 Best Practices) ──
const vibeCodingTips = [
  {
    title: 'Start with a clear vision document',
    description: 'Before touching any code, write down exactly what your app does, who it\'s for, and what the core features are. Share this with your AI assistant as the first message in every session. A clear vision prevents scope creep and keeps the AI focused.',
    icon: Target,
    iconColor: 'text-blue-500',
  },
  {
    title: 'Design your UI/UX before coding',
    description: 'Sketch your screens on paper or use a tool like Figma/Excalidraw. Describe layouts to your AI assistant clearly: "a sidebar on the left, main content area with cards in a grid." AI generates much better code when it understands the visual target.',
    icon: Layout,
    iconColor: 'text-indigo-500',
  },
  {
    title: 'Set up Git from minute one',
    description: 'Initialize a git repo immediately and commit after every working change. This is your safety net. When AI breaks something (it will), you can revert to the last working state. Use branches for experimental features.',
    icon: GitBranch,
    iconColor: 'text-purple-500',
  },
  {
    title: 'Lock in your tech stack early',
    description: 'Choose your stack once and stick with it. Don\'t let AI convince you to switch libraries mid-project. State your stack in your CLAUDE.md or .cursorrules so the AI never suggests alternatives. Consistency beats optimization.',
    icon: Layers,
    iconColor: 'text-orange-500',
  },
  {
    title: 'Write detailed AI rules files',
    description: 'Your CLAUDE.md or .cursorrules file is the most important file in your project. Include: tech stack, coding style, naming conventions, file structure, error handling patterns, and any project-specific rules. Update it as your project evolves.',
    icon: FileCode,
    iconColor: 'text-cyan-500',
  },
  {
    title: 'One feature at a time, one prompt at a time',
    description: 'Never ask AI to "build the whole app." Break features into the smallest possible units. "Add a login form with email and password fields" is better than "build the authentication system." Small prompts = predictable results.',
    icon: MessageSquare,
    iconColor: 'text-green-500',
  },
  {
    title: 'Always provide context in prompts',
    description: 'Start each prompt with relevant context: what file you\'re working in, what you\'ve already built, what the expected behavior is. "In src/components/Dashboard.tsx, add a card that shows the user\'s total projects count from the projects table."',
    icon: BookOpen,
    iconColor: 'text-teal-500',
  },
  {
    title: 'Review every line of AI-generated code',
    description: 'Never blindly accept AI output. Read through it, understand what it does, and check for mistakes. AI often generates plausible-looking code that has subtle bugs, missing error handling, or security issues. You are the quality gate.',
    icon: Eye,
    iconColor: 'text-amber-500',
  },
  {
    title: 'Test after every change',
    description: 'After each AI-generated change, run the app and test the specific feature. Don\'t stack multiple untested changes. When something breaks, you need to know exactly which change caused it.',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  {
    title: 'Fix bugs immediately',
    description: 'When you see a bug, fix it now. Don\'t add it to a "fix later" list. With AI-generated code, technical debt compounds much faster. One unfixed bug leads to AI building more code on top of broken foundations.',
    icon: Bug,
    iconColor: 'text-red-500',
  },
  {
    title: 'Use plan mode for complex features',
    description: 'For anything touching multiple files, ask AI to create a plan first. Review the plan, adjust it, then ask AI to implement step by step. This prevents AI from going down the wrong path and generating hundreds of lines you need to undo.',
    icon: ListChecks,
    iconColor: 'text-violet-500',
  },
  {
    title: 'Keep components small and focused',
    description: 'If a component file is growing past 150-200 lines, it\'s time to split it up. Tell AI to refactor large components into smaller, reusable pieces. Small components are easier for both humans and AI to understand and modify.',
    icon: Code,
    iconColor: 'text-pink-500',
  },
  {
    title: 'Never commit secrets or .env files',
    description: 'Use .env.local for development secrets and add .env* to your .gitignore. Create a .env.example with placeholder values so others (and your future self) know what\'s needed. AI sometimes suggests hardcoding secrets \u2014 always catch this.',
    icon: Lock,
    iconColor: 'text-red-600',
  },
  {
    title: 'Build mobile-first from the start',
    description: 'Start every component with the mobile layout, then add responsive breakpoints for larger screens. Retrofitting mobile responsiveness into a desktop-first design is painful and generates messy code.',
    icon: Smartphone,
    iconColor: 'text-purple-600',
  },
  {
    title: 'Use AI for debugging, not just building',
    description: 'When stuck, paste the error message and relevant code to your AI and ask it to diagnose the issue. AI is excellent at spotting typos, missing imports, and logic errors. Describe what you expected vs what happened.',
    icon: Bug,
    iconColor: 'text-orange-600',
  },
  {
    title: 'Don\'t fight the framework',
    description: 'If you\'re using Next.js, use Next.js patterns (App Router, Server Components, API routes). Don\'t ask AI to implement patterns from other frameworks. Working with your framework\'s conventions produces cleaner, more maintainable code.',
    icon: Settings,
    iconColor: 'text-slate-500',
  },
  {
    title: 'Document as you go',
    description: 'Add comments to complex logic, keep your README updated, and maintain your AI context files. When you come back to the project after a break, good documentation means your AI assistant can pick up right where you left off.',
    icon: FileText,
    iconColor: 'text-blue-600',
  },
  {
    title: 'Ship early, iterate often',
    description: 'Deploy your app as soon as you have a working MVP. Real user feedback is worth more than perfecting features in isolation. Use Vercel or similar for easy deploys. Your first version doesn\'t need to be perfect \u2014 it just needs to work.',
    icon: Rocket,
    iconColor: 'text-emerald-500',
  },
]

// ── Essential Project Files ──
const projectFiles = [
  {
    name: 'CLAUDE.md',
    description: 'The context file for Claude Code. It\'s automatically read at the start of every session, giving Claude persistent memory about your project.',
    purpose: 'Stores your project overview, tech stack, coding conventions, file structure, and any rules Claude should follow. Think of it as your project\'s instruction manual for AI.',
    whyUseIt: 'Without it, Claude starts every session blind. With it, Claude immediately understands your architecture, patterns, and preferences \u2014 producing much better code from the first prompt.',
  },
  {
    name: 'AGENTS.md',
    description: 'Defines how AI coding agents should behave when working on your project, including permissions, workflow rules, and specialized instructions.',
    purpose: 'Goes beyond CLAUDE.md by specifying agent-level behaviors: which tools agents can use, how they should handle errors, commit message formats, and testing requirements.',
    whyUseIt: 'As AI agents become more autonomous, this file ensures they follow your team\'s workflow. It prevents agents from making unwanted changes or skipping important steps like testing.',
  },
  {
    name: 'skills.md',
    description: 'A reference of reusable prompt patterns and common operations for your project that AI assistants can draw from.',
    purpose: 'Contains pre-written prompt templates for common tasks: "how to add a new page", "how to create an API endpoint", "how to add a database table." Saves you from re-explaining patterns.',
    whyUseIt: 'Eliminates repetition. Instead of explaining your component pattern every time, AI reads skills.md and follows established patterns. This keeps code consistent across the entire project.',
  },
  {
    name: 'CHANGELOG.md',
    description: 'A chronological log of notable changes made to the project, organized by version or date.',
    purpose: 'Tracks what was added, changed, fixed, or removed in each release. Follows a structured format (like Keep a Changelog) so anyone can quickly understand what\'s different.',
    whyUseIt: 'Helps you track progress, communicate changes to users, and gives AI full context of the project\'s evolution. When debugging regressions, the changelog tells you exactly when something changed.',
  },
  {
    name: 'FEATURES.md',
    description: 'A living document that lists all planned, in-progress, and completed features for your project.',
    purpose: 'Serves as your product roadmap. Each feature includes a status (planned/in-progress/done), description, and any relevant technical notes or dependencies.',
    whyUseIt: 'Keeps you focused on what matters. When AI reads this file, it understands the full scope of your project and can make better architectural decisions. Prevents scope creep by making priorities visible.',
  },
  {
    name: 'PROJECT.md',
    description: 'A high-level architectural document that describes the project\'s structure, design decisions, and technical constraints.',
    purpose: 'Covers the "why" behind your architecture: why you chose Supabase over Firebase, why you\'re using Server Components, why the folder structure is organized a certain way.',
    whyUseIt: 'Preserves institutional knowledge. New contributors (including AI) instantly understand not just what the code does, but why it\'s built that way. Prevents AI from suggesting changes that conflict with your design decisions.',
  },
  {
    name: 'README.md',
    description: 'The front door of your project. The first file anyone reads, whether it\'s a teammate, contributor, or AI assistant.',
    purpose: 'Contains: project description, setup instructions, environment variables needed, how to run locally, how to deploy, and basic architecture overview.',
    whyUseIt: 'It\'s universal \u2014 every tool and platform understands README.md. GitHub displays it automatically. AI tools read it first. A good README means anyone can clone your repo and be productive in minutes.',
  },
]

const commonMistakes = [
  {
    title: 'Don\'t ask AI to "build the whole app"',
    description: 'Break it into features and implement them one at a time. Massive prompts produce massive bugs.',
  },
  {
    title: 'Don\'t skip understanding the code',
    description: 'If you can\'t explain it, you can\'t debug it. Take time to understand what AI generates before moving on.',
  },
  {
    title: 'Don\'t ignore errors or warnings',
    description: 'Fix them immediately. Technical debt compounds fast with AI-generated code \u2014 one unfixed bug leads to more bugs built on top.',
  },
  {
    title: 'Don\'t commit secrets or .env files',
    description: 'Never commit API keys or passwords. Use .env.local for development and add .env* to .gitignore. Create a .env.example with placeholders.',
  },
  {
    title: 'Don\'t skip mobile responsiveness',
    description: 'Test on mobile from the start. Retrofitting responsive design later is painful and produces messy code.',
  },
  {
    title: 'Don\'t let AI switch your tech stack',
    description: 'AI sometimes suggests different libraries mid-project. Lock your stack in your context files and stick with it. Consistency wins.',
  },
  {
    title: 'Don\'t stack untested changes',
    description: 'Test after every AI-generated change. When something breaks, you need to know exactly which change caused it.',
  },
  {
    title: 'Don\'t forget to update your AI context files',
    description: 'Your CLAUDE.md or .cursorrules should evolve with your project. Stale context files lead to stale AI output.',
  },
]

const projectStructure = `my-project/
\u251C\u2500\u2500 src/
\u2502   \u251C\u2500\u2500 app/           # Next.js pages & routes
\u2502   \u251C\u2500\u2500 components/    # React components
\u2502   \u2502   \u251C\u2500\u2500 ui/        # Reusable UI components
\u2502   \u2502   \u2514\u2500\u2500 features/  # Feature-specific components
\u2502   \u251C\u2500\u2500 lib/           # Utilities, hooks, types
\u2502   \u2514\u2500\u2500 styles/        # Global styles
\u251C\u2500\u2500 public/            # Static assets
\u251C\u2500\u2500 CLAUDE.md          # AI context (Claude Code)
\u251C\u2500\u2500 AGENTS.md          # Agent behavior rules
\u251C\u2500\u2500 skills.md          # Reusable prompt patterns
\u251C\u2500\u2500 CHANGELOG.md       # Version history
\u251C\u2500\u2500 FEATURES.md        # Feature roadmap
\u251C\u2500\u2500 PROJECT.md         # Architecture decisions
\u251C\u2500\u2500 README.md          # Project documentation
\u251C\u2500\u2500 .cursorrules       # Cursor AI rules
\u251C\u2500\u2500 .env.local         # Environment variables (gitignored)
\u2514\u2500\u2500 .env.example       # Env var template (committed)`

export default function ProjectToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Project Tools & Best Stacks</h1>
            <p className="text-muted-foreground">
              Everything you need to set up, plan, and build your next AI-assisted project
            </p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SECTION 1: Recommended Tech Stacks           */}
      {/* ============================================ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Recommended Tech Stacks</h2>
            <p className="text-sm text-muted-foreground">
              Proven combinations that work great with AI coding tools
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recommendedStacks.map((stack) => (
            <Card key={stack.name} className={`${stack.cardColor} h-full`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <stack.icon className={`h-6 w-6 ${stack.iconColor}`} />
                    <CardTitle className="text-lg">{stack.name}</CardTitle>
                  </div>
                  <Badge className={stack.badgeColor}>{stack.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {stack.layers.map((layer) => (
                    <div key={layer.label} className="flex items-start gap-3">
                      <Badge variant="outline" className="text-xs shrink-0 mt-0.5 min-w-[80px] justify-center">
                        {layer.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{layer.value}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this stack:</span> {stack.why}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: Project Kickoff Prompts            */}
      {/* ============================================ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Project Kickoff Prompts</h2>
            <p className="text-sm text-muted-foreground">
              Copy these proven prompts to jumpstart any new project with AI
            </p>
          </div>
        </div>

        {/* Day Zero Onboarding Prompt */}
        <Card className="mb-6 border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                <CardTitle>&quot;Day Zero&quot; Project Onboarding Prompt</CardTitle>
              </div>
              <CopyButton text={dayZeroPrompt} />
            </div>
            <CardDescription>
              Use this when starting a brand new project. Paste it into Claude Code or Cursor to get a complete project scaffold in minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 border p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                {dayZeroPrompt}
              </pre>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">Project Structure</Badge>
              <Badge variant="outline" className="text-xs">Config Files</Badge>
              <Badge variant="outline" className="text-xs">Auth Setup</Badge>
              <Badge variant="outline" className="text-xs">AI Context Files</Badge>
              <Badge variant="outline" className="text-xs">Documentation</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Project Kickoff Master Prompt */}
        <Card className="mb-6 border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                <CardTitle>Project Kickoff Master Prompt</CardTitle>
              </div>
              <CopyButton text={kickoffPrompt} />
            </div>
            <CardDescription>
              A comprehensive prompt that produces a complete project plan with 13 deliverables. Perfect for planning before you write any code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 border p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                {kickoffPrompt}
              </pre>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">Tech Stack</Badge>
              <Badge variant="outline" className="text-xs">Database Schema</Badge>
              <Badge variant="outline" className="text-xs">API Routes</Badge>
              <Badge variant="outline" className="text-xs">Component Architecture</Badge>
              <Badge variant="outline" className="text-xs">Auth Flow</Badge>
              <Badge variant="outline" className="text-xs">Deployment</Badge>
              <Badge variant="outline" className="text-xs">Testing</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: The Ultimate Vibe Coding Guide     */}
      {/* ============================================ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">The Ultimate Vibe Coding Guide</h2>
            <p className="text-sm text-muted-foreground">
              18 battle-tested best practices for building with AI coding tools
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {vibeCodingTips.map((tip, index) => (
            <Card key={tip.title} className="h-full">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <tip.icon className={`h-4 w-4 ${tip.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">#{index + 1}</span>
                      {tip.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: Essential Project Files            */}
      {/* ============================================ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Essential Project Files</h2>
            <p className="text-sm text-muted-foreground">
              These files make your project organized, documented, and AI-friendly
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projectFiles.map((file) => (
            <Card key={file.name} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base font-mono">{file.name}</CardTitle>
                </div>
                <CardDescription className="text-xs">{file.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">What it does:</p>
                  <p className="text-xs text-muted-foreground">{file.purpose}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Why use it:</p>
                  <p className="text-xs text-muted-foreground">{file.whyUseIt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: Common Mistakes to Avoid           */}
      {/* ============================================ */}
      <section className="mb-12">
        <Card className="border-red-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle>Common Mistakes to Avoid</CardTitle>
            </div>
            <CardDescription>Learn from others&apos; failures so you don&apos;t repeat them</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-3 md:grid-cols-2">
              {commonMistakes.map((item, index) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-500">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: Project Structure Template         */}
      {/* ============================================ */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-primary" />
              <CardTitle>Project Structure Template</CardTitle>
            </div>
            <CardDescription>A recommended folder structure for AI-assisted projects with all essential files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 border p-4">
              <pre className="text-sm text-muted-foreground whitespace-pre font-mono overflow-x-auto">
                {projectStructure}
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============================================ */}
      {/* Stay Updated / News CTA                      */}
      {/* ============================================ */}
      <Link href="/news" className="group block">
        <Card className="border-primary/30 bg-primary/5 transition-colors hover:bg-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Stay Updated</CardTitle>
                <CardDescription>
                  Check out the latest AI & tech news curated daily from Reddit, Hacker News, and more.
                </CardDescription>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-105">
                Browse News <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}
