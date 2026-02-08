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
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Project Tools & Best Stacks - The Vibing Skull',
  description: 'Recommended tech stacks, project preparation checklists, and best practices for AI-assisted vibe coding projects.',
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

const beforeYouStart = [
  {
    title: 'Define your project clearly',
    description: 'Write a 2-3 sentence description of what you\'re building. Be specific about the problem it solves and who it\'s for.',
  },
  {
    title: 'List your features',
    description: 'Break them into "Must Have", "Nice to Have", and "Future". Focus on must-haves first.',
  },
  {
    title: 'Choose your stack',
    description: 'Pick from the recommended stacks above. Don\'t overthink it \u2014 the best stack is one you can actually ship with.',
  },
  {
    title: 'Set up your project structure',
    description: 'Use a framework CLI (create-next-app, create-expo-app, etc.) to scaffold your project properly.',
  },
  {
    title: 'Initialize git immediately',
    description: 'Run git init, create a .gitignore, and make your first commit before writing any code.',
  },
]

const aiSetup = [
  {
    title: 'Create a CLAUDE.md or .cursorrules file',
    description: 'Add your project context so AI understands your codebase from the start.',
  },
  {
    title: 'Include key project details',
    description: 'Tech stack, coding style, naming conventions, and project structure should all be documented.',
  },
  {
    title: 'Set up your folder structure first',
    description: 'Create your folder structure BEFORE asking AI to write code. AI works better with existing structure.',
  },
  {
    title: 'Create a README.md',
    description: 'Include project overview, setup instructions, and architecture decisions. This helps both humans and AI.',
  },
]

const duringDevelopment = [
  {
    title: 'Commit frequently',
    description: 'Make small, focused commits with clear messages. This creates checkpoints you can return to.',
  },
  {
    title: 'Test as you go',
    description: 'Don\'t wait until the end to test. Verify each feature works before moving to the next.',
  },
  {
    title: 'Review AI output',
    description: 'Always read and understand code before accepting it. AI makes mistakes \u2014 you\'re the quality gate.',
  },
  {
    title: 'Break tasks into small pieces',
    description: 'AI works better with focused, specific requests. "Add a login form" beats "build authentication".',
  },
  {
    title: 'Use plan mode',
    description: 'Have AI plan before implementing complex features. Review the plan, then ask it to execute.',
  },
  {
    title: 'Keep context files updated',
    description: 'Update CLAUDE.md or .cursorrules as your project evolves. Stale context leads to stale output.',
  },
]

const commonMistakes = [
  {
    title: 'Don\'t ask AI to "build the whole app"',
    description: 'Break it into features and implement them one at a time. Massive prompts produce massive bugs.',
  },
  {
    title: 'Don\'t skip understanding',
    description: 'If you can\'t explain the code, you can\'t debug it. Take time to understand what AI generates.',
  },
  {
    title: 'Don\'t ignore errors',
    description: 'Fix them immediately. Don\'t pile up technical debt \u2014 it compounds fast with AI-generated code.',
  },
  {
    title: 'Don\'t forget .env files',
    description: 'Never commit secrets. Use .env.local for local development and add .env* to .gitignore.',
  },
  {
    title: 'Don\'t skip mobile responsiveness',
    description: 'Test on mobile from the start. It\'s much harder to retrofit responsive design later.',
  },
]

const projectStructure = `my-project/
\u251C\u2500\u2500 src/
\u2502   \u251C\u2500\u2500 app/           # Next.js pages
\u2502   \u251C\u2500\u2500 components/    # React components
\u2502   \u2502   \u251C\u2500\u2500 ui/        # Reusable UI components
\u2502   \u2502   \u2514\u2500\u2500 features/  # Feature-specific components
\u2502   \u251C\u2500\u2500 lib/           # Utilities, hooks, types
\u2502   \u2514\u2500\u2500 styles/        # Global styles
\u251C\u2500\u2500 public/            # Static assets
\u251C\u2500\u2500 CLAUDE.md          # AI context file
\u251C\u2500\u2500 .cursorrules       # Cursor AI rules
\u251C\u2500\u2500 .env.local         # Environment variables (gitignored)
\u2514\u2500\u2500 README.md          # Project documentation`

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
      {/* SECTION 2: Project Preparation & Best Practices */}
      {/* ============================================ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <ListChecks className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Project Preparation & Best Practices</h2>
            <p className="text-sm text-muted-foreground">
              A comprehensive guide to setting up an AI-assisted coding project for success
            </p>
          </div>
        </div>

        {/* Before You Start Coding */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <CardTitle>Before You Start Coding</CardTitle>
            </div>
            <CardDescription>Get these fundamentals right before writing a single line of code</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {beforeYouStart.map((item, index) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
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

        {/* Setting Up for AI-Assisted Development */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              <CardTitle>Setting Up for AI-Assisted Development</CardTitle>
            </div>
            <CardDescription>Configure your project so AI tools understand your codebase</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {aiSetup.map((item, index) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600">
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

        {/* During Development Best Practices */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <CardTitle>During Development Best Practices</CardTitle>
            </div>
            <CardDescription>Habits that keep your project healthy while working with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {duringDevelopment.map((item, index) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-bold text-green-600">
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

        {/* Common Mistakes to Avoid */}
        <Card className="mb-6 border-red-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle>Common Mistakes to Avoid</CardTitle>
            </div>
            <CardDescription>Learn from others' failures so you don't repeat them</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
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

        {/* Project Structure Template */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-primary" />
              <CardTitle>Project Structure Template</CardTitle>
            </div>
            <CardDescription>A recommended folder structure for Next.js projects with AI tooling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 border p-4">
              <pre className="text-sm text-muted-foreground whitespace-pre font-mono overflow-x-auto">
                {projectStructure}
              </pre>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-1 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">CLAUDE.md</span> gives Claude Code persistent project context
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-1 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">.cursorrules</span> configures Cursor AI behavior
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-500 mt-1 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">.env.local</span> is gitignored by default in Next.js
                </p>
              </div>
              <div className="flex items-start gap-2">
                <GitBranch className="h-3.5 w-3.5 text-purple-500 mt-1 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Separate ui/ and features/</span> keeps components organized
                </p>
              </div>
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
