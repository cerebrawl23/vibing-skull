'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Layers,
  Rocket,
  ListChecks,
  FileCode,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Wrench,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type ToolCategory = 'stacks' | 'prompts' | 'best-practices' | 'project-files' | 'pitfalls'

interface ToolGuide {
  id: string
  title: string
  description: string
  category: ToolCategory
  bullets: string[]
  copyableText?: string
  badge?: string
}

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const categoryConfig: Record<ToolCategory, { label: string; icon: typeof Layers; color: string; bg: string }> = {
  stacks: { label: 'Tech Stacks', icon: Layers, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400' },
  prompts: { label: 'Kickoff Prompts', icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
  'best-practices': { label: 'Best Practices', icon: ListChecks, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
  'project-files': { label: 'Project Files', icon: FileCode, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
  pitfalls: { label: 'Common Pitfalls', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' },
}

const categoryOrder: ToolCategory[] = ['stacks', 'prompts', 'best-practices', 'project-files', 'pitfalls']

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const dayZeroPrompt = `You are an expert software architect and AI coding assistant. I'm starting a brand new project and need your help setting it up properly from Day Zero.

PROJECT DETAILS:
- Project Name: [YOUR PROJECT NAME]
- Description: [2-3 sentences about what you're building]
- Target Users: [Who is this for?]
- Tech Stack: [e.g., Next.js + Supabase + Tailwind CSS + shadcn/ui]

PLEASE HELP ME WITH:

1. PROJECT STRUCTURE: Create a complete folder structure with all necessary files and directories.

2. CONFIGURATION FILES: Set up all config files (tsconfig, tailwind, eslint, prettier, .env.example, .gitignore) with sensible defaults.

3. CORE SETUP: Initialize the project with authentication scaffolding, database schema, API route structure, component library, and theme system.

4. AI CONTEXT FILES: Create a CLAUDE.md with project overview, tech stack, coding conventions, file structure, and patterns.

5. DOCUMENTATION: Create a README.md with setup instructions, env vars, and development workflow.

6. FIRST FEATURES: List the first 5 features to build, in order, with implementation notes.

Start with the folder structure, then work through each section.`

const kickoffPrompt = `You are an expert full-stack software architect. I need you to create a comprehensive project plan for the following application:

PROJECT VISION:
[Describe your app in 2-3 paragraphs. Include the problem it solves, who it's for, and what makes it unique.]

DELIVERABLES - Please provide ALL of the following:

1. TECH STACK RECOMMENDATION — Frontend, backend, database, auth, deployment, AI tools
2. DATABASE SCHEMA — All tables, columns, types, relationships, indexes, RLS policies
3. API ROUTE MAP — Every endpoint, HTTP methods, payloads, auth requirements
4. PAGE/SCREEN MAP — Every page, URL structure, auth requirements, component hierarchy
5. COMPONENT ARCHITECTURE — Shared components, feature components, state management, data fetching
6. AUTHENTICATION FLOW — Sign up/in, protected routes, roles, session management
7. FILE STRUCTURE — Complete directory tree, naming conventions
8. ENVIRONMENT VARIABLES — Every env var, public vs secret, example values
9. THIRD-PARTY INTEGRATIONS — APIs, SDKs, cost considerations
10. MVP FEATURE PRIORITY — Ordered features, complexity estimates, dependencies
11. TESTING STRATEGY — What to test, libraries, coverage goals
12. DEPLOYMENT CHECKLIST — Local to production steps, CI/CD, DNS, performance
13. AI CONTEXT FILES — CLAUDE.md content, .cursorrules content, project-specific AI instructions

Please be thorough and specific. Use code blocks for schemas, file structures, and configuration.`

const toolGuides: ToolGuide[] = [
  // ── TECH STACKS (5) ──
  {
    id: 'vibe-stack',
    title: 'The "Vibe Coder" Stack',
    description: 'Most popular stack for AI-assisted projects. Zero backend code needed with generous free tiers.',
    category: 'stacks',
    badge: 'Most Popular',
    bullets: [
      'Frontend: Next.js + React + Tailwind CSS + shadcn/ui',
      'Backend: Supabase (Auth + Database + Storage + Realtime)',
      'Deployment: Vercel with auto-deploy from Git',
      'AI: Claude Code or Cursor for development',
      'Why: Zero backend code needed, generous free tiers, works perfectly with AI coding tools',
    ],
  },
  {
    id: 'full-control-stack',
    title: 'The "Full Control" Stack',
    description: 'Full control over your backend for complex business logic and custom APIs.',
    category: 'stacks',
    badge: 'Advanced',
    bullets: [
      'Frontend: Next.js + React + Tailwind CSS',
      'Backend: Node.js + Express + PostgreSQL',
      'ORM: Prisma or Drizzle for type-safe database access',
      'Deployment: Railway or Render',
      'AI: Claude Code for development',
      'Why: Full control over backend logic, better for complex business rules and custom middleware',
    ],
  },
  {
    id: 'rapid-stack',
    title: 'The "Rapid Prototype" Stack',
    description: 'Go from idea to deployed app in hours. Perfect for MVPs and hackathons.',
    category: 'stacks',
    badge: 'Fastest',
    bullets: [
      'Builder: Bolt.new or v0 by Vercel for UI generation',
      'Backend: Supabase for database and auth',
      'Deployment: Vercel for instant deploys',
      'Why: Fastest path from idea to working product, perfect for validation and demos',
    ],
  },
  {
    id: 'mobile-stack',
    title: 'The "Mobile App" Stack',
    description: 'One codebase for iOS and Android with great developer experience.',
    category: 'stacks',
    badge: 'Mobile',
    bullets: [
      'Framework: React Native + Expo for cross-platform development',
      'Backend: Supabase for auth, database, and storage',
      'Deployment: EAS Build for app store distribution',
      'AI: Cursor for React Native development',
      'Why: Single codebase, native performance, familiar React patterns',
    ],
  },
  {
    id: 'project-structure',
    title: 'Project Folder Structure Template',
    description: 'Recommended folder structure for AI-assisted projects with all essential files.',
    category: 'stacks',
    bullets: [
      'src/app/ — Next.js pages and routes (App Router)',
      'src/components/ui/ — Reusable UI components (shadcn/ui)',
      'src/components/features/ — Feature-specific components',
      'src/lib/ — Utilities, hooks, types, and validators',
      'Root files: CLAUDE.md, AGENTS.md, skills.md, .cursorrules',
      'Config: .env.local (gitignored), .env.example (committed)',
      'Docs: README.md, CHANGELOG.md, FEATURES.md, PROJECT.md',
    ],
  },
  // ── KICKOFF PROMPTS (2) ──
  {
    id: 'day-zero',
    title: '"Day Zero" Project Onboarding Prompt',
    description: 'Paste into Claude Code or Cursor when starting a brand new project. Gets you a complete scaffold in minutes.',
    category: 'prompts',
    badge: 'Essential',
    bullets: [
      'Generates complete project folder structure',
      'Sets up all configuration files with sensible defaults',
      'Scaffolds authentication, database schema, and API routes',
      'Creates CLAUDE.md with project context for AI',
      'Produces README.md with setup instructions',
      'Lists the first 5 features to build in order',
    ],
    copyableText: dayZeroPrompt,
  },
  {
    id: 'kickoff-master',
    title: 'Project Kickoff Master Prompt (13 Deliverables)',
    description: 'Comprehensive planning prompt that produces a complete project plan before you write any code.',
    category: 'prompts',
    badge: 'Complete Plan',
    bullets: [
      'Tech stack recommendation with justifications',
      'Full database schema with relationships and indexes',
      'Complete API route map with auth requirements',
      'Page/screen map with component hierarchy',
      'Authentication flow and session management',
      'Environment variables and third-party integrations',
      'MVP feature priority with complexity estimates',
      'Testing strategy and deployment checklist',
      'AI context files (CLAUDE.md, .cursorrules)',
    ],
    copyableText: kickoffPrompt,
  },
  // ── BEST PRACTICES (18) ──
  {
    id: 'tip-vision',
    title: 'Start with a Clear Vision Document',
    description: 'Before any code, write down what your app does, who it serves, and core features. Share with AI as the first message.',
    category: 'best-practices',
    bullets: [
      'A clear vision prevents scope creep and keeps AI focused',
      'Include the problem, target user, and 3-5 core features',
      'Share this at the start of every AI coding session',
      'Update it as your understanding of the product evolves',
    ],
  },
  {
    id: 'tip-ui-design',
    title: 'Design Your UI/UX Before Coding',
    description: 'Sketch screens on paper, Figma, or Excalidraw. AI generates much better code with a visual target.',
    category: 'best-practices',
    bullets: [
      'Even rough wireframes dramatically improve AI output quality',
      'Describe layouts clearly: "sidebar left, card grid in main area"',
      'Use v0 by Vercel to quickly generate UI prototypes',
      'Reference existing sites or screenshots as visual examples',
    ],
  },
  {
    id: 'tip-git',
    title: 'Set Up Git from Minute One',
    description: 'Initialize a repo immediately and commit after every working change. This is your safety net.',
    category: 'best-practices',
    bullets: [
      'Commit after every working state — AI will break things',
      'Use branches for experimental features',
      'When something goes wrong, git revert to last working state',
      'Good commit messages help AI understand project history',
    ],
  },
  {
    id: 'tip-stack',
    title: 'Lock In Your Tech Stack Early',
    description: 'Choose once and stick with it. State your stack in CLAUDE.md so AI never suggests alternatives.',
    category: 'best-practices',
    bullets: [
      'AI sometimes suggests library switches mid-project — resist',
      'Consistency beats optimization, especially with AI-generated code',
      'Lock your stack in CLAUDE.md or .cursorrules',
      'Switching libraries mid-project creates migration headaches',
    ],
  },
  {
    id: 'tip-rules',
    title: 'Write Detailed AI Rules Files',
    description: 'Your CLAUDE.md or .cursorrules is the most important file in your project. Update it as you evolve.',
    category: 'best-practices',
    bullets: [
      'Include: tech stack, coding style, naming conventions',
      'Add: file structure, error handling patterns, component patterns',
      'Specify what AI should never do (no console.log, no any type)',
      'Review and update rules after major refactors or new patterns',
    ],
  },
  {
    id: 'tip-one-feature',
    title: 'One Feature, One Prompt',
    description: 'Never ask AI to "build the whole app." Break features into the smallest possible units.',
    category: 'best-practices',
    bullets: [
      '"Add a login form with email and password" > "Build authentication"',
      'Small prompts produce predictable, testable results',
      'Each prompt should have one clear objective and deliverable',
      'Stack small wins instead of gambling on big prompts',
    ],
  },
  {
    id: 'tip-context',
    title: 'Always Provide Context in Prompts',
    description: 'Start each prompt with what file you\'re in, what you\'ve built, and what the expected behavior is.',
    category: 'best-practices',
    bullets: [
      'Reference specific files: "In src/components/Dashboard.tsx..."',
      'Mention relevant database tables and API endpoints',
      'Describe the current state and the desired end state',
      'Include constraints: "must work with our existing auth flow"',
    ],
  },
  {
    id: 'tip-review',
    title: 'Review Every Line of AI Code',
    description: 'Never blindly accept AI output. Read through it and understand what it does. You are the quality gate.',
    category: 'best-practices',
    bullets: [
      'AI generates plausible-looking code that can have subtle bugs',
      'Check for missing error handling and security vulnerabilities',
      'Verify imports and dependencies are correct',
      'If you can\'t explain the code, you can\'t debug it later',
    ],
  },
  {
    id: 'tip-test',
    title: 'Test After Every Change',
    description: 'After each AI-generated change, run the app and test the specific feature. Don\'t stack untested changes.',
    category: 'best-practices',
    bullets: [
      'Run the app and verify the feature works as expected',
      'Check both the happy path and edge cases',
      'When something breaks, you need to know which change caused it',
      'Automated tests help but manual verification is still essential',
    ],
  },
  {
    id: 'tip-fix-bugs',
    title: 'Fix Bugs Immediately',
    description: 'One unfixed bug leads to AI building more code on top of broken foundations. Fix it now.',
    category: 'best-practices',
    bullets: [
      'Technical debt compounds much faster with AI-generated code',
      'AI can\'t distinguish between intentional behavior and bugs',
      'A "fix later" list becomes a "never fix" list',
      'Each bug you skip increases the cost of future changes',
    ],
  },
  {
    id: 'tip-plan-mode',
    title: 'Use Plan Mode for Complex Features',
    description: 'For anything touching multiple files, ask AI to plan first. Review, adjust, then implement step by step.',
    category: 'best-practices',
    bullets: [
      'In Claude Code: Shift+Tab to enter Plan Mode',
      'Review the plan before any code is written',
      'Catch wrong approaches early when they\'re cheap to fix',
      'Plans prevent hundreds of lines of unwanted code',
    ],
  },
  {
    id: 'tip-small-components',
    title: 'Keep Components Small and Focused',
    description: 'If a file grows past 150-200 lines, split it. Small components are easier for both humans and AI to work with.',
    category: 'best-practices',
    bullets: [
      'One component should do one thing well',
      'Extract reusable pieces into shared components',
      'AI generates better code for focused, well-scoped components',
      'Smaller files = fewer merge conflicts and easier reviews',
    ],
  },
  {
    id: 'tip-secrets',
    title: 'Never Commit Secrets or .env Files',
    description: 'Use .env.local for development and .env.example for templates. AI sometimes suggests hardcoding secrets.',
    category: 'best-practices',
    bullets: [
      'Add .env* to your .gitignore immediately',
      'Create .env.example with placeholder values',
      'AI may hardcode API keys — always check generated code',
      'Use environment variables for all sensitive configuration',
    ],
  },
  {
    id: 'tip-mobile',
    title: 'Build Mobile-First from the Start',
    description: 'Start with mobile layout, then add responsive breakpoints. Retrofitting mobile is painful.',
    category: 'best-practices',
    bullets: [
      'Default styles = mobile, then add md: and lg: breakpoints',
      'Test at 375px (mobile), 768px (tablet), 1280px (desktop)',
      'AI-generated responsive code is messy when retrofitted',
      'Mobile-first produces cleaner, more maintainable CSS',
    ],
  },
  {
    id: 'tip-debug-ai',
    title: 'Use AI for Debugging Too',
    description: 'When stuck, paste the error and code to AI. Describe what you expected vs what happened.',
    category: 'best-practices',
    bullets: [
      'AI excels at spotting typos, missing imports, and logic errors',
      'Include the full error message, not just the first line',
      'Describe the expected behavior alongside the actual behavior',
      'Share relevant code files for complete context',
    ],
  },
  {
    id: 'tip-framework',
    title: 'Don\'t Fight the Framework',
    description: 'Use Next.js patterns with Next.js. Don\'t ask AI to implement patterns from other frameworks.',
    category: 'best-practices',
    bullets: [
      'App Router → use Server Components, route handlers, middleware',
      'Don\'t import Express patterns into a Next.js project',
      'Working with your framework produces cleaner, faster code',
      'AI knows framework conventions — let it use them',
    ],
  },
  {
    id: 'tip-document',
    title: 'Document As You Go',
    description: 'Add comments to complex logic and keep AI context files updated. Future-you will thank present-you.',
    category: 'best-practices',
    bullets: [
      'Update CLAUDE.md when you add new patterns or conventions',
      'Keep README setup instructions current and accurate',
      'Good docs mean AI can pick up right where you left off',
      'Comment the "why" not the "what" — code shows what, comments show why',
    ],
  },
  {
    id: 'tip-ship',
    title: 'Ship Early, Iterate Often',
    description: 'Deploy as soon as you have a working MVP. Real user feedback beats perfecting features in isolation.',
    category: 'best-practices',
    bullets: [
      'Use Vercel, Netlify, or Railway for easy one-click deploys',
      'Your first version doesn\'t need to be perfect — it needs to work',
      'Real user feedback is worth more than theoretical improvements',
      'Iterate based on actual usage data, not assumptions',
    ],
  },
  // ── PROJECT FILES (7) ──
  {
    id: 'file-claude-md',
    title: 'CLAUDE.md',
    description: 'The context file for Claude Code. Automatically read at the start of every session, giving Claude persistent project memory.',
    category: 'project-files',
    bullets: [
      'Stores project overview, tech stack, and coding conventions',
      'Includes file structure explanation and common patterns',
      'Contains rules Claude should always follow',
      'Without it, Claude starts every session blind to your project',
      'With it, Claude immediately understands your architecture and preferences',
    ],
  },
  {
    id: 'file-agents-md',
    title: 'AGENTS.md',
    description: 'Defines how AI agents should behave — permissions, workflow rules, and specialized instructions.',
    category: 'project-files',
    bullets: [
      'Specifies which tools agents can use and how they handle errors',
      'Defines commit message formats, testing requirements, and review rules',
      'Prevents agents from making unwanted changes or skipping steps',
      'Works across multiple AI tools (Cursor, Copilot, Gemini CLI)',
      'Essential as AI agents become more autonomous',
    ],
  },
  {
    id: 'file-skills-md',
    title: 'skills.md',
    description: 'Reusable prompt patterns and common operations that AI assistants can draw from.',
    category: 'project-files',
    bullets: [
      'Pre-written templates: "how to add a page", "how to create an API route"',
      'Eliminates re-explaining patterns in every conversation',
      'Keeps code consistent across the entire project',
      'AI reads it and follows established patterns automatically',
    ],
  },
  {
    id: 'file-changelog',
    title: 'CHANGELOG.md',
    description: 'Chronological log of notable changes, organized by version or date.',
    category: 'project-files',
    bullets: [
      'Tracks what was added, changed, fixed, or removed per release',
      'Follows Keep a Changelog format for consistency',
      'Helps track progress and communicate changes to users',
      'Gives AI full context of the project\'s evolution',
      'Critical for debugging regressions — tells you when things changed',
    ],
  },
  {
    id: 'file-features',
    title: 'FEATURES.md',
    description: 'Living document listing all planned, in-progress, and completed features.',
    category: 'project-files',
    bullets: [
      'Serves as your product roadmap with status tracking',
      'Each feature has status (planned/in-progress/done) and notes',
      'Prevents scope creep by making priorities visible',
      'AI reads it to understand full project scope for better decisions',
    ],
  },
  {
    id: 'file-project',
    title: 'PROJECT.md',
    description: 'High-level architectural document explaining the "why" behind your design decisions.',
    category: 'project-files',
    bullets: [
      'Covers why you chose Supabase over Firebase, Server Components, etc.',
      'Preserves institutional knowledge for future contributors',
      'Prevents AI from suggesting changes that conflict with your architecture',
      'New contributors instantly understand the reasoning behind the codebase',
    ],
  },
  {
    id: 'file-readme',
    title: 'README.md',
    description: 'The front door of your project. The first file anyone (or any AI) reads.',
    category: 'project-files',
    bullets: [
      'Project description and purpose',
      'Setup instructions and environment variables needed',
      'How to run locally and how to deploy',
      'Universal — every platform and AI tool reads it first',
      'Good README = anyone can clone your repo and be productive in minutes',
    ],
  },
  // ── PITFALLS (8) ──
  {
    id: 'pitfall-whole-app',
    title: 'Don\'t Ask AI to "Build the Whole App"',
    description: 'Break it into features and implement them one at a time. Massive prompts produce massive bugs.',
    category: 'pitfalls',
    bullets: [
      'AI loses coherence on prompts that are too broad',
      'You can\'t verify correctness of a 500-line output',
      'Small, focused prompts are predictable and testable',
      'Build incrementally: scaffold → auth → first feature → second feature',
    ],
  },
  {
    id: 'pitfall-understanding',
    title: 'Don\'t Skip Understanding the Code',
    description: 'If you can\'t explain it, you can\'t debug it. Take time to understand what AI generates.',
    category: 'pitfalls',
    bullets: [
      'Read through every file AI creates or modifies',
      'Ask AI to explain code you don\'t understand',
      'Understanding now saves hours of debugging later',
      'You are responsible for the code in your project',
    ],
  },
  {
    id: 'pitfall-errors',
    title: 'Don\'t Ignore Errors or Warnings',
    description: 'Fix them immediately. Technical debt compounds fast with AI-generated code.',
    category: 'pitfalls',
    bullets: [
      'One unfixed bug leads to AI building on broken foundations',
      'TypeScript errors often indicate real problems, not false positives',
      'ESLint warnings frequently catch actual issues',
      'The longer you wait to fix, the harder and more expensive it gets',
    ],
  },
  {
    id: 'pitfall-secrets',
    title: 'Don\'t Commit Secrets or .env Files',
    description: 'Never commit API keys or passwords. Use .env.local and .gitignore.',
    category: 'pitfalls',
    bullets: [
      'AI sometimes hardcodes secrets — always double-check',
      'Add .env* to .gitignore before your first commit',
      'Create .env.example with placeholder values for the team',
      'Use environment variables for all sensitive configuration',
    ],
  },
  {
    id: 'pitfall-mobile',
    title: 'Don\'t Skip Mobile Responsiveness',
    description: 'Test on mobile from the start. Retrofitting responsive design later is painful.',
    category: 'pitfalls',
    bullets: [
      'Build mobile-first with Tailwind breakpoints',
      'Test at 375px width regularly during development',
      'AI-generated responsive code is messy when added later',
      'Many users browse on phones — don\'t ignore them',
    ],
  },
  {
    id: 'pitfall-stack-switch',
    title: 'Don\'t Let AI Switch Your Tech Stack',
    description: 'AI sometimes suggests different libraries mid-project. Lock your stack in context files.',
    category: 'pitfalls',
    bullets: [
      'State your exact stack in CLAUDE.md and .cursorrules',
      'Reject suggestions to "try this other library instead"',
      'Consistency produces better code than chasing the latest tool',
      'Stack switching mid-project creates half-migrated messes',
    ],
  },
  {
    id: 'pitfall-untested',
    title: 'Don\'t Stack Untested Changes',
    description: 'Test after every AI-generated change. When something breaks, know exactly which change caused it.',
    category: 'pitfalls',
    bullets: [
      'Run the app after every change, no matter how small',
      'Verify the specific feature you asked AI to build',
      'When bugs appear in a stack of changes, bisecting is painful',
      'One change at a time keeps debugging simple',
    ],
  },
  {
    id: 'pitfall-stale-context',
    title: 'Don\'t Forget to Update AI Context Files',
    description: 'Your CLAUDE.md or .cursorrules should evolve with your project. Stale context = stale output.',
    category: 'pitfalls',
    bullets: [
      'Update after adding new patterns or conventions',
      'Remove rules that no longer apply',
      'Add new files and directories to the structure section',
      'Stale context files make AI suggest outdated approaches',
    ],
  },
]

// ---------------------------------------------------------------------------
// COPY BUTTON (inline)
// ---------------------------------------------------------------------------
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-green-600 dark:text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3 text-muted-foreground" />
          Copy Prompt
        </>
      )}
    </button>
  )
}

// ---------------------------------------------------------------------------
// TOOL GUIDE CARD
// ---------------------------------------------------------------------------
function ToolGuideCard({ guide, isExpanded, onToggle }: { guide: ToolGuide; isExpanded: boolean; onToggle: () => void }) {
  const cat = categoryConfig[guide.category]
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-5 pb-4 flex flex-col flex-1">
        {/* Top row: badge + optional extra badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className={`text-xs ${cat.bg}`}>
            {cat.label}
          </Badge>
          {guide.badge && (
            <Badge variant="secondary" className="text-xs">{guide.badge}</Badge>
          )}
        </div>

        {/* Title & description */}
        <h3 className="text-base font-semibold leading-tight mb-1">{guide.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>

        {/* Expand/collapse */}
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-auto"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="h-3.5 w-3.5" /></>
          ) : (
            <>View Details <ChevronDown className="h-3.5 w-3.5" /></>
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <ul className="space-y-2">
              {guide.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {bullet}
                </li>
              ))}
            </ul>

            {guide.copyableText && (
              <div className="space-y-2">
                <div className="rounded-lg bg-muted/50 border p-3 max-h-48 overflow-y-auto">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                    {guide.copyableText}
                  </pre>
                </div>
                <CopyBtn text={guide.copyableText} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export function ProjectGuideLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const c of categoryOrder) {
      counts[c] = toolGuides.filter((g) => g.category === c).length
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    let result = toolGuides
    if (selectedCategory !== 'all') {
      result = result.filter((g) => g.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.bullets.some((b) => b.toLowerCase().includes(q))
      )
    }
    return result
  }, [selectedCategory, searchQuery])

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Project Tools & Guides</h1>
            <p className="text-sm text-muted-foreground">
              {toolGuides.length} guides covering tech stacks, kickoff prompts, best practices, and essential files
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search project tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border bg-background px-10 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All ({toolGuides.length})
        </button>
        {categoryOrder.map((cat) => {
          const config = categoryConfig[cat]
          const Icon = config.icon
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {config.label} ({categoryCounts[cat]})
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} {filtered.length === 1 ? 'guide' : 'guides'}
        {selectedCategory !== 'all' && ` in ${categoryConfig[selectedCategory].label}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* Guide grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <ToolGuideCard
              key={guide.id}
              guide={guide}
              isExpanded={expandedIds.has(guide.id)}
              onToggle={() => toggleExpanded(guide.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No guides match your search.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="text-center p-8 rounded-lg border bg-muted/50">
        <h2 className="text-xl font-bold mb-2">Have a project tip to share?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Submit your favorite tech stacks, kickoff prompts, or best practices
        </p>
        <a
          href="mailto:hello@vibingskull.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
        >
          Submit a Guide
        </a>
      </div>
    </div>
  )
}
