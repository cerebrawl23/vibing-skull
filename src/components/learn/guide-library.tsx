'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Brain,
  Code,
  Settings,
  Wand2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Zap,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type GuideCategory = 'ai-models' | 'tools' | 'configuration' | 'capabilities' | 'prompting'

interface Guide {
  id: string
  title: string
  description: string
  category: GuideCategory
  bullets: string[]
  example?: string
  tip?: string
  link?: { title: string; url: string }
}

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const categoryConfig: Record<GuideCategory, { label: string; icon: typeof Brain; color: string; bg: string }> = {
  'ai-models': { label: 'AI Models', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
  tools: { label: 'Coding Tools', icon: Code, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
  configuration: { label: 'Configuration', icon: Settings, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
  capabilities: { label: 'Capabilities', icon: Wand2, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400' },
  prompting: { label: 'Prompting', icon: MessageSquare, color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400' },
}

const categoryOrder: GuideCategory[] = ['ai-models', 'tools', 'configuration', 'capabilities', 'prompting']

// ---------------------------------------------------------------------------
// GUIDE DATA (28 guides)
// ---------------------------------------------------------------------------
const guides: Guide[] = [
  // ── AI MODELS (3) ──
  {
    id: 'claude',
    title: 'Claude by Anthropic',
    description: 'Best for complex agents, coding, nuanced reasoning, and long document analysis.',
    category: 'ai-models',
    bullets: [
      '1M token context window (Opus 4.6, Sonnet 4.5 beta)',
      'Opus 4.6: Latest flagship model with agent team capabilities',
      'Sonnet 4.5: Best balance of speed and intelligence for agents & coding',
      'Haiku 4.5: Fastest model with near-frontier performance',
      'Claude Code CLI enables fully autonomous coding workflows',
      'Build full features, refactor codebases, and debug multi-file issues',
      'Create detailed technical specs and architectural plans',
    ],
    example: 'Use CLAUDE.md files at your project root to give Claude persistent context. Opus 4.6 supports 1M tokens in beta for analyzing massive repositories.',
    tip: 'Tools: Claude Code (CLI), Claude.ai (web), API',
    link: { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' },
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT by OpenAI',
    description: 'Best for reasoning, agentic tool use, broad knowledge, and multi-step analysis.',
    category: 'ai-models',
    bullets: [
      'GPT-5 Thinking: 196K context with deep reasoning capabilities',
      'o3: Smartest reasoning model — 20% fewer errors than o1 on difficult tasks',
      'GPT-4.1: 1M token context window optimized specifically for coding',
      'o4-mini: Fast and cost-efficient reasoning for everyday tasks',
      'Agentic tools combine web search, Python execution, and image generation',
      'Custom GPTs with full model selection for tailored workflows',
    ],
    example: 'Use o3 for complex problems needing multi-faceted analysis. GPT-4.1 handles 1M tokens, making it ideal for ingesting entire code repositories at once.',
    tip: 'Tools: ChatGPT (web), GitHub Copilot, API',
    link: { title: 'OpenAI Platform Docs', url: 'https://platform.openai.com/docs' },
  },
  {
    id: 'gemini',
    title: 'Gemini by Google',
    description: 'Best for massive context windows, multimodal tasks, and Google ecosystem integration.',
    category: 'ai-models',
    bullets: [
      'Gemini 2.5 Pro: Industry-leading 2M token context window',
      'Gemini 3 Pro: Reasoning-first model built for agentic workflows',
      'Gemini 3 Flash: Fastest model in its class for real-time applications',
      'Native multimodal capabilities — images, video, audio, and code',
      'Deep integration with Google Cloud, Firebase, and Vertex AI',
      'Analyze entire large codebases at once with the 2M context',
    ],
    example: 'Gemini 2.5 Pro\'s 2M token context can analyze massive repositories in one prompt. Use Gemini 3 Flash for latency-sensitive applications and real-time features.',
    tip: 'Tools: Gemini (web), AI Studio, Vertex AI, API',
    link: { title: 'Google AI Developer', url: 'https://ai.google.dev' },
  },
  // ── CODING TOOLS (6) ──
  {
    id: 'cursor',
    title: 'Cursor — AI Code Editor',
    description: 'VSCode fork with deep AI integration for multi-file editing and codebase-aware coding.',
    category: 'tools',
    bullets: [
      'Multi-file editing with Composer for complex changes across your project',
      'Inline code generation with Cmd+K for quick edits at cursor position',
      'Codebase-aware suggestions that understand your project structure',
      'Chat with your code using @file, @codebase, and @symbol references',
      '.cursorrules configuration file for project-specific AI behavior',
    ],
    example: 'Create a .cursorrules file specifying your tech stack, coding style, and preferred patterns. Use @codebase in chat to search your entire project.',
    tip: 'Best for: Daily coding workflow with AI assistance',
    link: { title: 'Cursor Docs', url: 'https://docs.cursor.com' },
  },
  {
    id: 'claude-code',
    title: 'Claude Code — CLI Agent',
    description: 'Autonomous coding agent that runs in your terminal, capable of multi-file changes and complex tasks.',
    category: 'tools',
    bullets: [
      'Creates and edits multiple files across your project autonomously',
      'Runs terminal commands, tests, and verifies changes',
      'Git operations — commits, branches, and push workflows',
      'Asks clarifying questions when requirements are ambiguous',
      'Tracks progress with todo lists for complex multi-step tasks',
      'Plan mode (Shift+Tab) for thinking before acting',
    ],
    example: 'Put a CLAUDE.md file at your project root with your tech stack, conventions, and patterns. Claude reads it automatically at the start of every session.',
    tip: 'Best for: Complex multi-step tasks, refactoring, and autonomous feature building',
    link: { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' },
  },
  {
    id: 'github-copilot',
    title: 'GitHub Copilot — Code Completion',
    description: 'AI pair programmer that suggests code in real-time directly inside your IDE.',
    category: 'tools',
    bullets: [
      'Real-time code suggestions as you type — just press Tab to accept',
      'Works across VS Code, JetBrains, Neovim, and more',
      'Copilot Chat for asking questions about your code inline',
      'Automated pull request summaries for faster reviews',
      'Documentation generation from existing code',
    ],
    example: 'Use .github/copilot-instructions.md in your repo to customize Copilot behavior. Free for verified students and open-source maintainers.',
    tip: 'Best for: Inline code completions while typing',
    link: { title: 'Copilot Docs', url: 'https://docs.github.com/copilot' },
  },
  {
    id: 'v0',
    title: 'v0 by Vercel — UI Generator',
    description: 'Generate production-ready React and Next.js UI components from text prompts.',
    category: 'tools',
    bullets: [
      'Text-to-React component generation with high fidelity',
      'Built-in shadcn/ui and Tailwind CSS integration',
      'Iterative refinement — describe changes in natural language',
      'Copy-paste ready code that works out of the box',
      'Responsive components by default',
    ],
    example: '"Create a pricing page with 3 tiers: Free, Pro, and Enterprise. Use a card layout with feature checklists. Highlight the Pro tier as recommended."',
    tip: 'Best for: Rapid UI prototyping and component generation',
  },
  {
    id: 'bolt',
    title: 'Bolt.new — Full-Stack Builder',
    description: 'Build entire applications from prompts with database, auth, and deployment included.',
    category: 'tools',
    bullets: [
      'Full-stack code generation from natural language descriptions',
      'Automatic database schema setup and configuration',
      'Built-in authentication and user management',
      'Deployment-ready output with environment configuration',
      'In-browser preview for instant visual feedback',
    ],
    example: '"Build a task management app with user accounts, project boards, drag-and-drop tasks, due dates, and team collaboration features."',
    tip: 'Best for: Quick MVPs, prototypes, and hackathon projects',
  },
  {
    id: 'cline',
    title: 'Cline — VSCode Agent',
    description: 'Autonomous AI coding agent for VS Code with multi-file editing and terminal access.',
    category: 'tools',
    bullets: [
      'Multi-file editing with full project awareness',
      'Terminal command execution for builds, tests, and scripts',
      'Browser automation for testing and web interactions',
      'Human-in-the-loop approval for sensitive operations',
      'Supports multiple LLM providers — use any model you prefer',
    ],
    example: 'Cline can browse the web, run terminal commands, and edit files simultaneously. Configure your preferred LLM provider in the extension settings.',
    tip: 'Best for: Autonomous coding workflows directly in VS Code',
  },
  // ── CONFIGURATION (7) ──
  {
    id: 'claude-md',
    title: 'CLAUDE.md — Project Context File',
    description: 'Claude Code\'s native configuration file that gives Claude persistent memory about your project.',
    category: 'configuration',
    bullets: [
      'Loaded automatically into every Claude Code conversation',
      'Global config: ~/.claude/CLAUDE.md applies to all projects',
      'Project config: ./CLAUDE.md for project-specific instructions',
      'Think of it as "README for Claude" — project overview, conventions, and rules',
      'Hierarchical loading — global + project configs merge together',
    ],
    example: '# Project: My SaaS App\nTech: Next.js 16, TypeScript, Tailwind, Supabase\nStyle: Functional components, named exports\nTesting: Jest + React Testing Library\nNever: Use any type, skip error handling',
    tip: 'Keep it minimal and focused. Only include universally applicable instructions since it loads into every session.',
  },
  {
    id: 'agents-md',
    title: 'AGENTS.md — Universal AI Config',
    description: 'Open standard for AI agent configuration that works across Cursor, Zed, GitHub Copilot, and more.',
    category: 'configuration',
    bullets: [
      'Works with Cursor, Zed, GitHub Copilot, Gemini CLI, and more',
      'Not natively read by Claude Code (reference it from CLAUDE.md instead)',
      'Portable across different AI tools and platforms',
      'Community-driven open standard with growing adoption',
    ],
    example: '# AGENTS.md\n## Context\nFull-stack TypeScript project using React.\n\n## Instructions\n- Follow existing code patterns\n- Add tests for new features\n- Use descriptive variable names',
    tip: 'Use both: AGENTS.md for cross-tool compatibility, CLAUDE.md for Claude-specific features.',
  },
  {
    id: 'claude-folder',
    title: '.claude Folder — Project Settings',
    description: 'Project-level configuration directory for Claude Code settings, custom commands, and agent definitions.',
    category: 'configuration',
    bullets: [
      '.claude/settings.json — Project-wide settings (committed to git)',
      '.claude/settings.local.json — Local overrides (gitignored)',
      '.claude/commands/ — Custom slash commands for common tasks',
      '.claude/agents/ — Custom subagent definitions for specialized tasks',
    ],
    example: '// .claude/settings.json\n{\n  "permissions": {\n    "deny": [".env", "secrets/", "*.pem"]\n  },\n  "hooks": {\n    "onFileChange": "npm run lint"\n  }\n}',
    tip: 'Use permissions.deny to protect sensitive files. Commit settings.json but gitignore settings.local.json.',
  },
  {
    id: 'cowork',
    title: 'Claude Cowork — AI for Non-Coding Tasks',
    description: 'Claude Code for file management, document processing, and office tasks — built into Claude Desktop.',
    category: 'configuration',
    bullets: [
      'Built into Claude Desktop for Mac — no CLI needed',
      'Designate a folder for Claude to read, modify, and organize files',
      'Runs in an isolated VM for security and peace of mind',
      'Creates execution plans, performs tasks, and delivers organized outputs',
    ],
    example: 'Example tasks:\n- "Organize my Downloads folder by file type"\n- "Turn these receipt screenshots into an expense spreadsheet"\n- "Summarize these meeting notes into action items"\n- "Rename and organize these photos by date"',
    tip: 'Available to Pro ($20/mo) and Max ($100+/mo) subscribers. The entire feature was built using Claude Code.',
  },
  {
    id: 'ask-user-question',
    title: 'AskUserQuestion — AI Prompts You',
    description: 'Claude pauses and asks YOU structured questions when it detects ambiguity in your request.',
    category: 'configuration',
    bullets: [
      'Inverts the traditional prompt relationship — the AI prompts the human',
      'Offers multiple choice, checkboxes, and free-text input options',
      'Surfaces design decisions upfront when changes are cheaper to make',
      'Works best in Plan Mode (Shift+Tab twice) for architectural decisions',
    ],
    example: 'Claude asks:\n"Which auth strategy should I use?"\n- JWT tokens (stateless, scalable)\n- Session cookies (simpler, traditional)\n- OAuth only (delegate to providers)\n\nYou select -> Claude implements correctly the first time.',
    tip: 'Add "ask clarifying questions before implementing" to your CLAUDE.md to trigger this behavior more often.',
  },
  {
    id: 'custom-subagents',
    title: 'Custom Subagents — Specialized AI Workers',
    description: 'Create autonomous subagents that Claude spawns for specific tasks like testing, exploring, or analyzing.',
    category: 'configuration',
    bullets: [
      'Defined as Markdown + YAML front matter in .claude/agents/',
      'Up to 7 simultaneous subagent operations running in parallel',
      'Built-in agents: Explore (codebase search), Plan (architecture), general-purpose',
      'Create custom agents via the /agents command or manually',
    ],
    example: '---\nname: test-runner\ndescription: Run and fix failing tests\ntools: [Bash, Read, Edit]\n---\n# Test Runner Agent\nRun the test suite, analyze failures,\nand fix broken tests automatically.',
    tip: 'Subagents dramatically speed up complex workflows like codebase exploration and multi-file analysis.',
  },
  {
    id: 'cross-ai-config',
    title: 'Configuration Files Across AI Tools',
    description: 'Each major AI coding tool has its own configuration file. Here\'s how to set them all up.',
    category: 'configuration',
    bullets: [
      'Claude Code: CLAUDE.md at project root or ~/.claude/ (hierarchical loading)',
      'Cursor: .cursorrules at project root (also supports .cursor/rules/)',
      'Gemini CLI: GEMINI.md at project root (also reads AGENTS.md and .cursorrules)',
      'ChatGPT: Custom Instructions in Settings > Personalization (1,500 char limit)',
      'GitHub Copilot: .github/copilot-instructions.md (supports AGENTS.md standard)',
    ],
    tip: 'For maximum compatibility, maintain both CLAUDE.md (for Claude) and AGENTS.md (for everything else) at your project root.',
  },
  // ── CAPABILITIES (6) ──
  {
    id: 'build-features',
    title: 'Build Full Features with AI',
    description: 'Describe a feature in plain English and let AI implement it across multiple files autonomously.',
    category: 'capabilities',
    bullets: [
      'Describe what you want in natural language — AI handles the implementation',
      'Works across multiple files including components, API routes, and database',
      'Best with Claude Code, Cursor Composer, or Cline for multi-file changes',
      'Start with a clear description and let the AI ask clarifying questions',
    ],
    example: '"Add user authentication with Google OAuth, protected routes, a user profile page with avatar upload, and a settings page for changing email preferences."',
    tip: 'Break large features into smaller pieces. "Add auth" is better as a series: "Add login page" → "Add OAuth" → "Add protected routes" → "Add profile page".',
  },
  {
    id: 'refactor-code',
    title: 'Refactor Entire Codebases',
    description: 'Migrate frameworks, update patterns, or restructure projects systematically with AI assistance.',
    category: 'capabilities',
    bullets: [
      'Migrate between frameworks (e.g., Express to Fastify, Pages to App Router)',
      'Update coding patterns across an entire project consistently',
      'Restructure folder organization with automatic import updates',
      'Best with Claude Code or Cursor for codebase-wide changes',
    ],
    example: '"Convert this Express.js API to use the repository pattern with dependency injection. Update all route handlers to use the new pattern."',
    tip: 'Use Gemini 2.5 Pro\'s 2M token context to analyze the full codebase before starting a major refactor.',
  },
  {
    id: 'debug-issues',
    title: 'Debug Complex Issues with AI',
    description: 'Paste error messages, stack traces, and code — AI will find the root cause and suggest fixes.',
    category: 'capabilities',
    bullets: [
      'Share the error message, relevant code, and what you expected to happen',
      'AI analyzes stack traces and identifies root causes quickly',
      'Works best when you include context about when the error occurs',
      'Use Claude Sonnet 4.5, o3, or Cursor Chat for debugging tasks',
    ],
    example: '"This API call works locally but returns a 500 error in production. Here\'s the route handler, the error from Vercel logs, and my environment variables setup."',
    tip: 'Always include: the error message, the relevant code, what you expected, and what actually happened.',
  },
  {
    id: 'generate-ui',
    title: 'Generate UI from Designs',
    description: 'Upload screenshots or describe layouts to get production-ready React components instantly.',
    category: 'capabilities',
    bullets: [
      'Describe a layout in words and get React code with Tailwind CSS',
      'Upload screenshots or wireframes for pixel-accurate reproduction',
      'Best with v0 by Vercel, Claude, or Gemini 3 Pro for visual tasks',
      'Generates responsive, accessible components by default',
    ],
    example: '"Create a pricing page with 3 tiers like this screenshot. Use a card layout with feature checklists, monthly/annual toggle, and highlight the middle tier."',
    tip: 'Be specific about colors, spacing, and layout. The more detail you provide, the closer the output matches your vision.',
  },
  {
    id: 'write-tests',
    title: 'Write Tests Automatically',
    description: 'Generate comprehensive test suites for your existing code covering edge cases and error scenarios.',
    category: 'capabilities',
    bullets: [
      'Generate unit tests, integration tests, and end-to-end tests',
      'AI identifies edge cases and boundary conditions you might miss',
      'Works with Jest, Vitest, Playwright, Cypress, and other frameworks',
      'Use Claude Code, Copilot, or GPT-4.1 for testing workflows',
    ],
    example: '"Write unit tests for this payment processing module. Cover successful payments, declined cards, network timeouts, duplicate submissions, and refund flows."',
    tip: 'Ask for tests AFTER building the feature. AI writes better tests when it can see the actual implementation.',
  },
  {
    id: 'complex-reasoning',
    title: 'Complex Reasoning & Research',
    description: 'Multi-step analysis combining web search, code execution, and visual reasoning in one prompt.',
    category: 'capabilities',
    bullets: [
      'Chain multiple reasoning steps: research → analyze → plan → implement',
      'Best with o3, Gemini 3 Pro, or Claude Opus 4.6 for complex tasks',
      'Combine web search results with codebase analysis for informed decisions',
      'Use for architecture decisions, technology evaluation, and migration planning',
    ],
    example: '"Research the top 3 real-time database options, compare them for my use case (10K concurrent users, chat app), analyze my current codebase, and create a migration plan."',
    tip: 'For the best results, use thinking/reasoning models (o3, Claude with extended thinking) on complex multi-step problems.',
  },
  // ── PROMPTING (6) ──
  {
    id: 'be-specific',
    title: 'Be Specific About Your Output',
    description: 'Vague prompts produce vague results. Specific prompts eliminate guesswork and reduce back-and-forth.',
    category: 'prompting',
    bullets: [
      'State the exact deliverable you want (code, list, table, plan)',
      'Include technology constraints (framework, library versions)',
      'Specify formatting preferences (code blocks, bullet points)',
      'Mention error handling and edge case requirements upfront',
    ],
    example: 'Bad: "Make a login page"\nGood: "Create a Next.js login page with email/password fields, a Forgot Password link, OAuth buttons for Google and GitHub, form validation using Zod, and error state handling. Use shadcn/ui and Tailwind CSS."',
    tip: 'Every detail you include saves one round of back-and-forth.',
  },
  {
    id: 'provide-context',
    title: 'Always Provide Context',
    description: 'Context helps AI understand your specific situation, tech stack, and constraints before generating code.',
    category: 'prompting',
    bullets: [
      'Share your tech stack and framework versions',
      'Mention relevant files and their current state',
      'Describe what you\'ve already tried and why it didn\'t work',
      'Include the error message and where it occurs',
    ],
    example: 'Bad: "Fix this error"\nGood: "I\'m getting \'Cannot read property of undefined\' in my React component when fetching user data. Here\'s the component code and the API response structure. The error is on line 42 when accessing user.profile.name."',
    tip: 'The more context you provide upfront, the less time AI spends guessing and the fewer iterations you need.',
  },
  {
    id: 'show-examples',
    title: 'Show Examples of What You Want',
    description: 'Examples are worth a thousand words. AI learns patterns instantly from concrete examples.',
    category: 'prompting',
    bullets: [
      'Show input/output examples for data transformations',
      'Include a code snippet of the pattern you want to follow',
      'Reference existing files or components as style guides',
      'Provide before/after examples for refactoring tasks',
    ],
    example: 'Bad: "Format the data nicely"\nGood: "Format the API response like this example:\n{ \\"user\\": \\"John\\", \\"status\\": \\"active\\" }\nKeep snake_case keys and add a \\"processed_at\\" timestamp."',
    tip: 'When working with AI coding tools, use @file to reference existing code as an example pattern.',
  },
  {
    id: 'request-reasoning',
    title: 'Request Reasoning for Better Analysis',
    description: 'Asking AI to explain its thinking produces better analysis, catches errors, and reveals trade-offs.',
    category: 'prompting',
    bullets: [
      'Ask AI to explain why it chose a particular approach',
      'Request trade-off analysis between different solutions',
      'Have AI list assumptions it\'s making about your requirements',
      'Use "think step by step" for complex multi-part problems',
    ],
    example: 'Bad: "Which database should I use?"\nGood: "I\'m building a real-time chat app with 10K concurrent users. Compare PostgreSQL, MongoDB, and Redis for this use case. Consider write speed, real-time subscriptions, and horizontal scalability. Recommend one with detailed reasoning."',
    tip: 'AI that explains its reasoning makes fewer mistakes. Always ask "why" alongside "what".',
  },
  {
    id: 'break-down-tasks',
    title: 'Break Down Complex Tasks',
    description: 'Complex prompts fail. Break them into smaller, verifiable steps that build on each other.',
    category: 'prompting',
    bullets: [
      'Never ask AI to "build the whole app" in one prompt',
      'Start with the foundation (schema, structure) before features',
      'Verify each step works before moving to the next',
      'Use Plan Mode for multi-step implementations',
    ],
    example: 'Bad: "Build me a complete e-commerce site"\nGood: "Let\'s build an e-commerce site step by step. First, help me design the database schema for products, users, orders, and cart. Show the relationships and explain your design choices."',
    tip: 'Small prompts = predictable results. Each prompt should have one clear objective.',
  },
  {
    id: 'ptcf-framework',
    title: 'The PTCF Prompting Framework',
    description: 'Persona, Task, Context, Format — four elements that transform mediocre prompts into great ones.',
    category: 'prompting',
    bullets: [
      'P (Persona): Tell the AI who it should be — activates domain-specific knowledge',
      'T (Task): State exactly what you need done — be specific about deliverables',
      'C (Context): Supply background info — tech stack, constraints, prior decisions',
      'F (Format): Describe the output shape — tables, lists, code blocks, step-by-step',
    ],
    example: 'P: "You are a senior full-stack developer specializing in Next.js"\nT: "Refactor the auth module to use JWT tokens with refresh rotation"\nC: "We use Next.js 16, Supabase, and currently use session cookies"\nF: "Return a numbered step-by-step plan first, then the code for each step"',
    tip: 'You don\'t need all four elements every time, but the more you include, the better the output quality.',
  },
]

// ---------------------------------------------------------------------------
// DAILY TIPS
// ---------------------------------------------------------------------------
const dailyTips = [
  { tip: 'Put your CLAUDE.md file at the project root. Claude reads it automatically and uses it for context in every conversation.', tool: 'Claude Code' },
  { tip: 'In Cursor, use @file to reference specific files in chat. Use @codebase to search your entire project.', tool: 'Cursor' },
  { tip: 'When debugging, always include: the error message, the relevant code, what you expected, and what actually happened.', tool: 'General' },
  { tip: 'Use o3 or o3-pro for complex reasoning problems. They make 20% fewer major errors than o1 on difficult tasks.', tool: 'ChatGPT' },
  { tip: 'Gemini 2.5 Pro\'s 2M token context can analyze massive repositories at once — the largest context window available.', tool: 'Gemini' },
  { tip: 'Create a .cursorrules file that specifies your tech stack, coding style, and preferred patterns.', tool: 'Cursor' },
  { tip: 'Claude Opus 4.6 and Sonnet 4.5 now support 1M token context in beta. Enable it for large codebase analysis.', tool: 'Claude' },
  { tip: 'GPT-4.1 has a 1M token context window optimized for coding. Use it to ingest entire code repositories.', tool: 'ChatGPT' },
]

// ---------------------------------------------------------------------------
// COMMUNITY LINKS
// ---------------------------------------------------------------------------
const communityLinks = [
  { title: 'r/vibecoding', description: 'The home of vibe coding', url: 'https://reddit.com/r/vibecoding' },
  { title: 'r/cursor', description: 'Cursor editor community', url: 'https://reddit.com/r/cursor' },
  { title: 'r/ClaudeAI', description: 'Claude discussions', url: 'https://reddit.com/r/ClaudeAI' },
  { title: 'r/ChatGPT', description: 'ChatGPT community', url: 'https://reddit.com/r/ChatGPT' },
]

const quickLinks = [
  { title: 'Claude Code Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' },
  { title: 'Cursor Docs', url: 'https://docs.cursor.com' },
  { title: 'Gemini API', url: 'https://ai.google.dev' },
  { title: 'OpenAI Docs', url: 'https://platform.openai.com/docs' },
  { title: 'Awesome CursorRules', url: 'https://github.com/PatrickJS/awesome-cursorrules' },
  { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai' },
]

// ---------------------------------------------------------------------------
// GUIDE CARD
// ---------------------------------------------------------------------------
function GuideCard({ guide, isExpanded, onToggle }: { guide: Guide; isExpanded: boolean; onToggle: () => void }) {
  const cat = categoryConfig[guide.category]
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-5 pb-4 flex flex-col flex-1">
        {/* Category badge */}
        <Badge variant="outline" className={`w-fit text-xs mb-3 ${cat.bg}`}>
          {cat.label}
        </Badge>

        {/* Title & description */}
        <h3 className="text-base font-semibold leading-tight mb-1">{guide.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>

        {/* Expand/collapse button */}
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline mt-auto"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="h-3.5 w-3.5" /></>
          ) : (
            <>Read Guide <ChevronDown className="h-3.5 w-3.5" /></>
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            {/* Key points */}
            <ul className="space-y-2">
              {guide.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Example */}
            {guide.example && (
              <div className="rounded-lg bg-muted/50 border p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Example / Pro Tip:</p>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {guide.example}
                </pre>
              </div>
            )}

            {/* Tool info */}
            {guide.tip && (
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{guide.tip}</span>
              </p>
            )}

            {/* External link */}
            {guide.link && (
              <a
                href={guide.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                {guide.link.title} <ExternalLink className="h-3 w-3" />
              </a>
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
export function GuideLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const tipOfTheDay = dailyTips[Math.floor(Date.now() / 86400000) % dailyTips.length]

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const c of categoryOrder) {
      counts[c] = guides.filter((g) => g.category === c).length
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    let result = guides
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
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Learning Guides</h1>
            <p className="text-sm text-muted-foreground">
              {guides.length} guides on AI models, coding tools, prompting techniques, and more
            </p>
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="rounded-lg border border-primary/50 bg-primary/5 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Tip of the Day</span>
          <Badge variant="outline" className="text-xs">{tipOfTheDay.tool}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{tipOfTheDay.tip}</p>
      </div>

      {/* Beginners Banner */}
      <Link href="/beginners" className="group block">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-5 text-white shadow-lg transition-transform hover:scale-[1.01]">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-black sm:text-lg">New to AI? Start with our Beginners Guide!</h3>
              <p className="mt-0.5 text-sm text-white/90">13 bite-sized lessons for ages 8-17</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-purple-700 shadow-md transition-transform group-hover:scale-105">
              Start Learning <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </Link>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search guides..."
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
          All ({guides.length})
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
            <GuideCard
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

      {/* Quick Links & Community */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border bg-card p-3 text-sm hover:bg-muted transition-colors"
              >
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="font-medium truncate">{link.title}</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Community */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Community</h2>
          <div className="grid grid-cols-2 gap-2">
            {communityLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-card p-3 hover:bg-muted transition-colors"
              >
                <p className="text-sm font-semibold">{link.title}</p>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-lg border bg-muted/50">
        <h2 className="text-xl font-bold mb-2">Have a tip to share?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Submit your favorite AI coding tips, configuration files, or workflow guides
        </p>
        <a
          href="mailto:hello@vibingskull.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
        >
          Submit a Tip
        </a>
      </div>
    </div>
  )
}
