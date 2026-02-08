'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Copy,
  Check,
  Code,
  PenLine,
  Briefcase,
  Megaphone,
  GraduationCap,
  Palette,
  Target,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type Category =
  | 'coding'
  | 'writing'
  | 'business'
  | 'marketing'
  | 'learning'
  | 'creative'
  | 'productivity'
  | 'data'

interface Prompt {
  title: string
  category: Category
  prompt: string
}

// ---------------------------------------------------------------------------
// CATEGORY CONFIG
// ---------------------------------------------------------------------------
const categoryConfig: Record<Category, { label: string; icon: typeof Code; color: string; bg: string }> = {
  coding: { label: 'Coding', icon: Code, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
  writing: { label: 'Writing', icon: PenLine, color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400' },
  business: { label: 'Business', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
  marketing: { label: 'Marketing', icon: Megaphone, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400' },
  learning: { label: 'Learning', icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
  creative: { label: 'Creative', icon: Palette, color: 'text-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400' },
  productivity: { label: 'Productivity', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
  data: { label: 'Data & Analysis', icon: BarChart3, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' },
}

const categoryOrder: Category[] = ['coding', 'writing', 'business', 'marketing', 'learning', 'creative', 'productivity', 'data']

// ---------------------------------------------------------------------------
// PROMPT DATA (65 prompts)
// ---------------------------------------------------------------------------
const prompts: Prompt[] = [
  // ── CODING (10) ──
  {
    title: 'Debug My Code',
    category: 'coding',
    prompt: 'You are a senior developer. Analyze the following code for bugs, edge cases, and performance issues. For each problem found, explain why it\'s an issue and provide the corrected version with inline comments explaining every fix.',
  },
  {
    title: 'Full Code Review',
    category: 'coding',
    prompt: 'Act as a thorough code reviewer. Examine this code for readability, maintainability, security vulnerabilities, performance bottlenecks, and adherence to best practices. Provide specific, actionable feedback with corrected code examples for each issue.',
  },
  {
    title: 'Explain This Code',
    category: 'coding',
    prompt: 'Break down this code as if explaining to someone learning to program. Walk through each section, explain what it does, why it was written this way, and highlight any design patterns or techniques being used. Include a brief summary at the end.',
  },
  {
    title: 'Refactor for Clean Code',
    category: 'coding',
    prompt: 'Refactor the following code to improve readability, reduce complexity, and follow modern best practices. Apply SOLID principles where applicable. Explain each change you make and why it improves the code. Preserve all existing functionality.',
  },
  {
    title: 'Write Unit Tests',
    category: 'coding',
    prompt: 'Generate comprehensive unit tests for this code. Cover the happy path, edge cases, error conditions, and boundary values. Use [testing framework] and follow the Arrange-Act-Assert pattern. Aim for at least 90% code coverage.',
  },
  {
    title: 'Convert to Another Language',
    category: 'coding',
    prompt: 'Convert this [source language] code to [target language]. Maintain identical logic and structure where possible. Use idiomatic patterns for the target language and add inline comments where the two languages handle things differently.',
  },
  {
    title: 'Optimize Performance',
    category: 'coding',
    prompt: 'Analyze this code for performance issues. Identify bottlenecks, unnecessary computations, memory inefficiencies, and excessive re-renders. Provide optimized alternatives and explain the performance impact of each change with Big-O analysis where applicable.',
  },
  {
    title: 'Design an API Endpoint',
    category: 'coding',
    prompt: 'Design a RESTful API endpoint for [feature]. Include: route path, HTTP method, request body schema with validation rules, successful response format, error response formats with status codes, authentication requirements, rate limiting considerations, and example curl commands.',
  },
  {
    title: 'Database Schema Design',
    category: 'coding',
    prompt: 'Design a database schema for [feature/application]. Include tables with column names, data types, primary keys, foreign keys, unique constraints, indexes for common queries, and relationships. Explain your normalization decisions and provide sample SQL queries for the most common operations.',
  },
  {
    title: 'System Architecture Plan',
    category: 'coding',
    prompt: 'Design the system architecture for [application]. Include a component diagram showing how pieces connect, data flow between services, technology choices with justifications, scalability strategy, caching approach, and potential bottlenecks with mitigation plans.',
  },
  // ── WRITING (8) ──
  {
    title: 'Professional Email',
    category: 'writing',
    prompt: 'Write a professional email about [topic]. Tone: [formal/friendly/urgent]. Include a clear subject line, appropriate greeting, concise body with key points structured logically, and a specific call to action. Keep it under 200 words.',
  },
  {
    title: 'Blog Post Draft',
    category: 'writing',
    prompt: 'Write a blog post about [topic] for [target audience]. Include an attention-grabbing headline, hook in the opening paragraph, 4-6 sections with descriptive subheadings, practical examples or data points in each section, and a conclusion with a clear call to action. Aim for [word count] words.',
  },
  {
    title: 'Summarize Any Text',
    category: 'writing',
    prompt: 'Summarize the following content into [number] concise bullet points. Capture the main arguments, supporting evidence, key data points, and actionable takeaways. Preserve the original meaning without adding your own opinions or editorializing.',
  },
  {
    title: 'Rewrite for Clarity',
    category: 'writing',
    prompt: 'Rewrite this text to be clearer and more concise. Remove jargon, break up long sentences, improve logical flow between paragraphs, and strengthen weak verbs. Target a [grade level] reading level while maintaining the original meaning and professional tone.',
  },
  {
    title: 'Social Media Posts',
    category: 'writing',
    prompt: 'Create [number] social media posts about [topic] for [platform]. Each post should open with a hook, deliver clear value, and end with a call to action. Include relevant hashtags, stay within platform character limits, and vary the angle between educational, entertaining, and promotional.',
  },
  {
    title: 'Product Description',
    category: 'writing',
    prompt: 'Write a compelling product description for [product]. Lead with the primary benefit, highlight 3-5 key features with user-focused explanations, address common objections, include social proof or stats where relevant, and close with a strong call to action. Tone: [professional/casual/luxury].',
  },
  {
    title: 'Technical Documentation',
    category: 'writing',
    prompt: 'Write technical documentation for [feature/API/system]. Structure it with: overview and purpose, prerequisites, step-by-step setup instructions, code examples with comments, configuration options, common pitfalls and their solutions, troubleshooting guide, and a FAQ section.',
  },
  {
    title: 'Press Release',
    category: 'writing',
    prompt: 'Write a press release announcing [news/launch]. Follow AP style with: compelling headline, dateline, lead paragraph covering who/what/when/where/why, 2-3 supporting paragraphs with quotes, background context paragraph, and company boilerplate. Keep it under 500 words.',
  },
  // ── BUSINESS (8) ──
  {
    title: 'Business Strategy Brief',
    category: 'business',
    prompt: 'Analyze the business landscape for [industry/product]. Identify the top 3 market opportunities, primary competitive threats, potential strategic partnerships, and recommend a go-to-market strategy. Include quarterly milestones and KPIs to track progress over 12 months.',
  },
  {
    title: 'Competitive Analysis',
    category: 'business',
    prompt: 'Conduct a competitive analysis comparing [your product] against [competitor 1], [competitor 2], and [competitor 3]. Create a comparison table covering features, pricing tiers, target audience, market positioning, strengths, and weaknesses. Conclude with differentiation strategies.',
  },
  {
    title: 'Pitch Deck Outline',
    category: 'business',
    prompt: 'Create a 12-slide pitch deck outline for [startup/product]. Cover: problem statement with market pain, your solution and demo, market size (TAM/SAM/SOM), business model and unit economics, traction and key metrics, competitive landscape, team highlights, financial projections, and funding ask with use of funds.',
  },
  {
    title: 'SWOT Analysis',
    category: 'business',
    prompt: 'Perform a detailed SWOT analysis for [business/product]. For each quadrant (Strengths, Weaknesses, Opportunities, Threats), provide 4-5 specific points with concrete examples. Then create an action plan that leverages strengths, addresses weaknesses, captures opportunities, and mitigates threats.',
  },
  {
    title: 'Financial Model Framework',
    category: 'business',
    prompt: 'Create a financial model framework for [business type]. Include revenue streams with pricing assumptions, detailed cost structure (fixed and variable), customer acquisition cost and lifetime value calculations, break-even analysis, and month-by-month projections for the first 18 months. State all assumptions clearly.',
  },
  {
    title: 'Customer Persona Builder',
    category: 'business',
    prompt: 'Create a detailed customer persona for [product/service]. Include: name and demographics, job title and responsibilities, goals and motivations, pain points and frustrations, buying behavior and decision criteria, preferred communication channels, common objections, and how our product specifically solves their problems.',
  },
  {
    title: 'Meeting Notes to Action Items',
    category: 'business',
    prompt: 'Transform this meeting transcript into a structured summary. Extract: key decisions made (with context), action items with assigned owners and deadlines, open questions needing follow-up, risks identified, and clearly defined next steps. Format it so it can be shared directly with the team.',
  },
  {
    title: 'OKR Framework',
    category: 'business',
    prompt: 'Create OKRs (Objectives and Key Results) for [team/company] for [quarter/year]. Write 3-4 objectives, each with 3-4 measurable key results. Each key result should have a specific metric and target number. Include 2-3 supporting initiatives per key result and identify dependencies between teams.',
  },
  // ── MARKETING (8) ──
  {
    title: 'SEO Content Strategy',
    category: 'marketing',
    prompt: 'Create an SEO content strategy for [website/business]. Identify 10 high-value target keywords with search intent classification (informational, navigational, transactional). For each keyword, suggest a content piece, outline on-page optimization, and recommend internal linking. Include a 3-month content calendar.',
  },
  {
    title: 'Ad Copy Variations',
    category: 'marketing',
    prompt: 'Write [number] ad copy variations for [product/service] targeting [audience]. For each variation, provide: headline (max 30 chars), description (max 90 chars), and CTA button text. Test different angles: benefit-focused, problem-focused, urgency-driven, and social-proof-based.',
  },
  {
    title: 'Email Campaign Sequence',
    category: 'marketing',
    prompt: 'Design a [number]-email nurture sequence for [goal: onboarding/conversion/retention]. For each email provide: subject line, preview text, body copy outline, primary CTA, and recommended send timing. Include a welcome email, 2-3 value emails, and a conversion email. Track open rates and click goals.',
  },
  {
    title: '30-Day Content Calendar',
    category: 'marketing',
    prompt: 'Create a 30-day content calendar for [brand] across [platforms]. Plan daily posts mixing content types: educational (40%), entertaining (30%), and promotional (30%). Include post copy, visual suggestions, hashtags, optimal posting times, and weekly engagement tactics.',
  },
  {
    title: 'Brand Voice Guide',
    category: 'marketing',
    prompt: 'Define a brand voice guide for [company]. Include: 5 voice attributes with descriptions, tone variations by context (social media vs email vs support), vocabulary do\'s and don\'ts, 5 example sentences rewritten in the brand voice, and guidelines for different audience segments.',
  },
  {
    title: 'Landing Page Copy',
    category: 'marketing',
    prompt: 'Write landing page copy for [product/service]. Structure it as: hero section (headline + subheading + CTA), problem section, solution section with 3 key benefits, social proof section (testimonials/stats), feature comparison, FAQ (5 questions), and final CTA with urgency element.',
  },
  {
    title: 'Product Launch Playbook',
    category: 'marketing',
    prompt: 'Create a product launch playbook for [product]. Cover 3 phases: pre-launch (4 weeks out — teaser content, waitlist, influencer seeding), launch day (announcements, social blitz, PR outreach), and post-launch (2 weeks — user feedback, content series, retargeting). Include KPIs for each phase.',
  },
  {
    title: 'Influencer Outreach Plan',
    category: 'marketing',
    prompt: 'Draft an influencer outreach strategy for [brand/product]. Define ideal influencer criteria (follower count, engagement rate, niche), create 3 outreach message templates (cold DM, email, follow-up), propose collaboration formats (review, tutorial, giveaway), and outline compensation structures for different tiers.',
  },
  // ── LEARNING (8) ──
  {
    title: 'Explain Like I\'m a Beginner',
    category: 'learning',
    prompt: 'Explain [concept] in simple terms that someone with no background knowledge would understand. Use everyday analogies, avoid all technical jargon (or define it immediately when used), include a real-world example, and end with a "test your understanding" question.',
  },
  {
    title: 'Study Plan Builder',
    category: 'learning',
    prompt: 'Create a structured study plan to learn [topic/skill] from scratch in [timeframe]. Break it into weekly milestones with specific objectives. For each week, recommend 2-3 resources (prioritize free ones), include hands-on practice exercises, and define a way to measure progress.',
  },
  {
    title: 'Step-by-Step Tutorial',
    category: 'learning',
    prompt: 'Write a step-by-step tutorial for [task]. Start with prerequisites and what the reader will learn. Number every step clearly, include code examples or screenshots descriptions at each stage, show expected output, list common errors with solutions, and end with a challenge exercise.',
  },
  {
    title: 'Research Deep-Dive',
    category: 'learning',
    prompt: 'Research [topic] and provide a comprehensive overview covering: current state of the field, key concepts and essential terminology (with definitions), major developments in the past 12 months, leading companies and thought leaders, open problems, and a list of recommended resources for further learning.',
  },
  {
    title: 'Book Summary & Takeaways',
    category: 'learning',
    prompt: 'Summarize [book title] by [author]. Cover: the central thesis in 2-3 sentences, the 5 most important arguments with supporting evidence, the most actionable insights I can apply today, 3 memorable quotes with context, who would benefit most from reading it, and similar books to read next.',
  },
  {
    title: 'Skill Roadmap',
    category: 'learning',
    prompt: 'Create a learning roadmap for becoming proficient in [skill/technology]. Divide it into beginner, intermediate, and advanced stages. For each stage, list: specific topics to learn, best resources (courses, docs, tutorials), a project to build that demonstrates mastery, and estimated time investment.',
  },
  {
    title: 'Practice Problem Set',
    category: 'learning',
    prompt: 'Generate [number] practice problems for [topic] at [beginner/intermediate/advanced] difficulty. Format each problem with: clear problem statement, input/output examples, hints (hidden by default), complete solution with step-by-step explanation, and a note on common mistakes to watch for.',
  },
  {
    title: 'Concept Comparison',
    category: 'learning',
    prompt: 'Compare [concept A] vs [concept B] side by side. For each, explain: what it is, when to use it, advantages and drawbacks, a real-world example, and performance or practical trade-offs. End with a clear recommendation for different use cases and address common misconceptions.',
  },
  // ── CREATIVE (7) ──
  {
    title: 'Brainstorm Ideas',
    category: 'creative',
    prompt: 'Generate [number] creative ideas for [project/topic]. For each idea, provide: a catchy one-line concept, a 2-3 sentence description, the target audience, potential challenges to consider, and a feasibility rating (easy/medium/hard). Include a mix of safe, innovative, and bold options.',
  },
  {
    title: 'Name Generator',
    category: 'creative',
    prompt: 'Generate [number] name options for [product/company/feature]. For each name: explain the meaning or wordplay behind it, check for negative connotations in other languages or contexts, suggest a complementary tagline, and rate its memorability and uniqueness on a 1-5 scale.',
  },
  {
    title: 'UI Design Brief',
    category: 'creative',
    prompt: 'Create a UI design brief for [screen/feature]. Include: primary user goals for this screen, layout wireframe description (placement of each element), key interactive components and their states, color and typography recommendations, responsive behavior across breakpoints, and accessibility requirements.',
  },
  {
    title: 'User Story Mapping',
    category: 'creative',
    prompt: 'Create user stories for [feature] using the format: "As a [user type], I want [action] so that [benefit]." Write 8-12 stories covering the full user journey. For each story, add acceptance criteria, edge cases to consider, and a priority ranking (must-have, should-have, nice-to-have).',
  },
  {
    title: 'Color Palette Generator',
    category: 'creative',
    prompt: 'Design a color palette for [brand/project/mood]. Include: primary color (with hex, RGB, and HSL), secondary color, accent color, 3 neutral shades, success/warning/error colors. Explain the psychology behind each choice and show 3 example usage contexts (hero section, card, button).',
  },
  {
    title: 'Microcopy Writer',
    category: 'creative',
    prompt: 'Write all microcopy for [app/feature]. Cover: button labels (primary and secondary CTAs), empty state messages (first-time and no-results), error messages (validation, server, network), success confirmations, loading state text, onboarding tooltips, and input placeholder text. Tone: [friendly/professional/playful].',
  },
  {
    title: 'Design System Foundations',
    category: 'creative',
    prompt: 'Define the foundational design tokens for [project]. Include: 8-point spacing scale, typography scale (6 sizes with line heights), semantic color tokens with light/dark variants, border-radius values (3 sizes), shadow definitions (3 elevations), breakpoint values, and usage guidelines for each token.',
  },
  // ── PRODUCTIVITY (7) ──
  {
    title: 'Meeting Agenda Builder',
    category: 'productivity',
    prompt: 'Create a structured meeting agenda for [topic] with [number] attendees and [duration]. Include: meeting objective (one sentence), time-boxed agenda items with discussion prompts, designated facilitator notes, decision points clearly marked, an action items capture template, and follow-up plan.',
  },
  {
    title: 'Project Kickoff Plan',
    category: 'productivity',
    prompt: 'Create a project kickoff plan for [project]. Cover: project goals and measurable success criteria, scope definition (in-scope and out-of-scope), team roles and responsibilities (RACI matrix), communication cadence and channels, risk assessment with mitigation strategies, timeline with milestones, and definition of done.',
  },
  {
    title: 'Decision Framework',
    category: 'productivity',
    prompt: 'Help me decide between [option A], [option B], and [option C] for [context]. Create a weighted decision matrix with 5-7 criteria relevant to my situation. Score each option 1-5 per criterion, calculate weighted totals, identify any deal-breakers, and provide a final recommendation with clear reasoning.',
  },
  {
    title: 'Weekly Review Guide',
    category: 'productivity',
    prompt: 'Guide me through a comprehensive weekly review. Prompt me to reflect on: top 3 accomplishments, tasks left incomplete and what blocked them, lessons learned (one win, one mistake), energy patterns (what energized vs drained me), and my top 3 priorities for next week with time blocks.',
  },
  {
    title: 'Task Prioritization',
    category: 'productivity',
    prompt: 'Help me prioritize these tasks using the Eisenhower Matrix. For each task, categorize it as urgent/important, important/not-urgent, urgent/not-important, or neither. Recommend time blocks for the important items, identify what should be delegated, what can be eliminated, and create a focused daily schedule.',
  },
  {
    title: 'SMART Goal Setter',
    category: 'productivity',
    prompt: 'Help me create SMART goals for [objective]. For each goal ensure it is: Specific (clear target), Measurable (quantifiable metric), Achievable (realistic stretch), Relevant (aligned with bigger picture), and Time-bound (deadline). Add weekly milestones, potential obstacles with contingency plans, and an accountability system.',
  },
  {
    title: 'Retrospective Facilitator',
    category: 'productivity',
    prompt: 'Facilitate a team retrospective for [project/sprint]. Walk through the Start-Stop-Continue framework: what should we start doing, what should we stop doing, and what should we continue doing. For each item identified, assign an owner and a specific action. End with the top 3 improvements to implement next sprint.',
  },
  // ── DATA & ANALYSIS (7) ──
  {
    title: 'Dataset Analysis',
    category: 'data',
    prompt: 'Analyze this dataset and provide: summary statistics for key variables, distribution patterns, notable trends over time, outliers or anomalies worth investigating, correlations between variables, and 3-5 actionable insights. Recommend the best chart types to visualize each finding.',
  },
  {
    title: 'KPI Dashboard Design',
    category: 'data',
    prompt: 'Design a KPI dashboard for [role/team]. Identify the 5-7 most critical metrics, specify the data source for each, recommend the ideal visualization type (gauge, line chart, bar chart, etc.), define alert thresholds (green/yellow/red), set refresh frequency, and describe the layout for a single-page view.',
  },
  {
    title: 'Survey Builder',
    category: 'data',
    prompt: 'Design a survey to measure [objective]. Create 12-15 questions mixing formats: multiple choice, Likert scale (1-5), ranking, and 1-2 open-ended questions. Ensure questions are unbiased and neutrally worded. Include skip logic rules, estimated completion time, and a pilot testing checklist.',
  },
  {
    title: 'Root Cause Analysis',
    category: 'data',
    prompt: 'Perform a root cause analysis for [problem]. Apply the 5 Whys technique starting from the symptom. Then use a fishbone (Ishikawa) diagram to categorize contributing factors into: people, process, technology, and environment. Rank causes by impact and recommend corrective actions with priority levels.',
  },
  {
    title: 'Report Template Builder',
    category: 'data',
    prompt: 'Create a [weekly/monthly/quarterly] report template for [team/stakeholder]. Include sections for: executive summary (3 bullet points), key metrics with trend indicators (up/down/flat), top achievements, active challenges and blockers, upcoming goals for next period, and resource or budget needs.',
  },
  {
    title: 'A/B Test Plan',
    category: 'data',
    prompt: 'Design an A/B test plan for [change/feature]. Define: the hypothesis (if we change X, then Y will improve by Z%), control and variant descriptions, primary and secondary success metrics, minimum sample size needed, test duration, statistical significance threshold (typically 95%), and a rollout plan based on results.',
  },
  {
    title: 'Trend Analysis',
    category: 'data',
    prompt: 'Analyze trends in [industry/market] over the past [timeframe]. Identify: 3 emerging patterns gaining momentum, 2 declining trends losing relevance, the primary market drivers, potential disruption risks from new technologies or competitors, and 3 opportunities to capitalize on. Support each finding with specific data points.',
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
          Copy
        </>
      )}
    </button>
  )
}

// ---------------------------------------------------------------------------
// PROMPT CARD
// ---------------------------------------------------------------------------
function PromptCard({ prompt: p }: { prompt: Prompt }) {
  const cat = categoryConfig[p.category]
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-5 pb-4 flex flex-col flex-1 gap-3">
        {/* Category badge */}
        <Badge variant="outline" className={`w-fit text-xs ${cat.bg}`}>
          {cat.label}
        </Badge>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight">{p.title}</h3>

        {/* Prompt text */}
        <div className="flex-1 rounded-lg bg-muted/50 border p-3">
          <p className="text-xs text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap">
            {p.prompt}
          </p>
        </div>

        {/* Copy button */}
        <div className="flex justify-end">
          <CopyBtn text={p.prompt} />
        </div>
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export function PromptLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const c of categoryOrder) {
      counts[c] = prompts.filter((p) => p.category === c).length
    }
    return counts
  }, [])

  // Filtered prompts
  const filtered = useMemo(() => {
    let result = prompts
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q)
      )
    }
    return result
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Prompt Library</h1>
            <p className="text-sm text-muted-foreground">
              {prompts.length} copy-ready prompt templates for coding, writing, business, and more
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search prompts..."
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
          All ({prompts.length})
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
        Showing {filtered.length} {filtered.length === 1 ? 'prompt' : 'prompts'}
        {selectedCategory !== 'all' && ` in ${categoryConfig[selectedCategory].label}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* Prompt grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PromptCard key={p.title} prompt={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No prompts match your search.</p>
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
        <h2 className="text-xl font-bold mb-2">Have a great prompt template?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          We are always adding new prompts. Send us your best ones and we will feature them here.
        </p>
        <a
          href="mailto:hello@vibingskull.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
        >
          Submit a Prompt
        </a>
      </div>
    </div>
  )
}
