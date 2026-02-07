'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Brain,
  MessageSquare,
  Shield,
  GraduationCap,
  Wrench,
  Palette,
  Zap,
  Code,
  Rocket,
  Search,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Lesson {
  id: number
  title: string
  subtitle: string
  icon: React.ElementType
  level: 'beginner' | 'intermediate'
  color: string
  gradient: string
  content: {
    intro: string
    keyPoints: string[]
    tips?: { bad?: string; good: string }[]
    tools?: { name: string; description: string; free: boolean }[]
    tryIt?: string
    funFact?: string
  }
}

/* ------------------------------------------------------------------ */
/*  Lesson data — sourced from Reddit, MIT, APA, DataCamp & others    */
/* ------------------------------------------------------------------ */

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'What is AI?',
    subtitle: 'The basics — explained like you\'re 10',
    icon: Brain,
    level: 'beginner',
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-indigo-500',
    content: {
      intro:
        'Artificial Intelligence (AI) is software that can learn from examples and make decisions — kind of like how you learn to recognise a dog after seeing lots of dogs. AI doesn\'t "think" the way you do; it spots patterns in huge amounts of data and uses those patterns to answer questions or create things.',
      keyPoints: [
        'AI learns from data — the more examples it sees, the better it gets.',
        'Large Language Models (LLMs) like ChatGPT and Claude are trained on billions of sentences so they can write, explain, and code.',
        'AI is a tool, not a person. It doesn\'t have feelings or opinions — it predicts what words come next.',
        'AI can be wrong! Always double-check important facts.',
      ],
      funFact:
        'ChatGPT reached 1 million users in just 5 days after launch — faster than Instagram, Netflix, or Spotify!',
      tryIt:
        'Open any AI chatbot and ask: "Explain gravity like I\'m 5 years old." See how it simplifies a complex topic!',
    },
  },
  {
    id: 2,
    title: 'Meet the Big 3',
    subtitle: 'ChatGPT, Claude & Gemini — what\'s the difference?',
    icon: MessageSquare,
    level: 'beginner',
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    content: {
      intro:
        'There\'s no single "best AI." Each major AI assistant has its own strengths. Think of them like different teachers — they all know a lot, but each explains things in their own way.',
      keyPoints: [
        'ChatGPT (by OpenAI) — Great all-rounder. Huge plugin ecosystem, image generation with DALL-E, and the most widely-used AI chatbot in the world.',
        'Claude (by Anthropic) — Excellent at long, detailed tasks. Best for coding, study guides, and structured content. Can read very long documents in one go.',
        'Gemini (by Google) — Massive context window (1 million+ tokens). Deep Google integration. Students with .edu emails may get free access to Gemini Pro.',
      ],
      tools: [
        { name: 'ChatGPT', description: 'Best all-rounder, image gen, plugins', free: true },
        { name: 'Claude', description: 'Best for coding & long documents', free: true },
        { name: 'Gemini', description: 'Best Google integration, huge memory', free: true },
      ],
      tryIt:
        'Ask the same question to all three and compare the answers. You\'ll quickly see each one\'s personality!',
    },
  },
  {
    id: 3,
    title: 'Prompting 101',
    subtitle: 'How to talk to AI so it actually helps',
    icon: MessageSquare,
    level: 'beginner',
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    content: {
      intro:
        'A "prompt" is just what you type into the AI. The better your prompt, the better the answer. You don\'t need fancy language — just be clear and specific about what you want.',
      keyPoints: [
        'Be specific — don\'t say "tell me about space", say "explain the 5 closest planets to Earth in 2 sentences each."',
        'Tell the AI what format you want — a list, a table, step-by-step, a story, etc.',
        'Give context — "I\'m a 7th grader studying for a science test" helps the AI pitch its answer at the right level.',
        'Iterate! If the first answer isn\'t perfect, ask the AI to change it. Say "make it simpler" or "add more detail."',
      ],
      tips: [
        {
          bad: 'Tell me about history.',
          good: 'Give me 5 key events in World War 2 in a numbered list with one sentence each.',
        },
        {
          bad: 'Help me with math.',
          good: 'Solve 3x + 7 = 22 step by step, explaining each step like I\'m in 6th grade.',
        },
        {
          bad: 'Write something about dogs.',
          good: 'Write a 100-word paragraph about why golden retrievers are great family pets. Use simple language.',
        },
      ],
      tryIt:
        'Take a bad prompt from above, paste it into an AI, then try the good version. See the difference!',
    },
  },
  {
    id: 4,
    title: 'Stay Safe with AI',
    subtitle: 'Protect yourself — the smart way',
    icon: Shield,
    level: 'beginner',
    color: 'text-red-500',
    gradient: 'from-red-500 to-orange-500',
    content: {
      intro:
        'AI chatbots are powerful tools, but they\'re not private journals. Everything you type could be stored and used to train future models. Being smart about safety is the #1 skill to learn before anything else.',
      keyPoints: [
        'NEVER share personal info — no full name, address, phone number, school name, or passwords.',
        'AI can be wrong. It\'s trained to sound confident, not to be correct. Always fact-check important info.',
        'If something feels off — like AI asking for personal details or generating uncomfortable content — close the chat and tell a trusted adult.',
        'Turn on multi-factor authentication (MFA) on your AI accounts for extra security.',
        'Don\'t treat AI like a best friend or therapist. It\'s a tool, not a person.',
      ],
      funFact:
        'According to the American Psychological Association, parents should have regular conversations with teens about AI use — just like they do about social media.',
      tryIt:
        'Check your AI accounts right now — is MFA turned on? If not, enable it today!',
    },
  },
  {
    id: 5,
    title: 'AI for Homework',
    subtitle: 'Use AI as a tutor, not a cheat code',
    icon: GraduationCap,
    level: 'beginner',
    color: 'text-amber-600',
    gradient: 'from-amber-500 to-yellow-500',
    content: {
      intro:
        'Over half of students now use AI for studying in some way. There\'s a big difference between copying an AI-written essay and using AI as a personal tutor. The secret? Use it to LEARN, not to skip learning.',
      keyPoints: [
        'Ask AI to explain concepts step-by-step — "Solve this and explain each step so I understand."',
        'After it solves a problem, ask for a similar practice problem. Solve it yourself, then have AI check your work.',
        'Use "Explain this at a 7th-grade level" to adjust difficulty. Then ask for more depth once you understand the basics.',
        'Create flashcards and practice quizzes — "Give me 10 multiple-choice questions about photosynthesis."',
        'Never copy-paste AI text as your own work. Teachers can detect it, and you won\'t actually learn.',
      ],
      tips: [
        {
          bad: 'Write my essay about the American Revolution.',
          good: 'I\'m writing an essay about the American Revolution. What are the 3 most important causes I should cover? Give me a brief outline.',
        },
        {
          bad: 'What\'s the answer to question 5?',
          good: 'I\'m stuck on this math problem: 2x² + 5x - 3 = 0. Walk me through how to solve it step by step.',
        },
      ],
      tryIt:
        'Pick a topic you\'re studying right now. Ask AI to quiz you with 5 questions, answer them yourself, then have AI grade your answers.',
    },
  },
  {
    id: 6,
    title: 'Free AI Tools',
    subtitle: '7 powerful tools that cost $0',
    icon: Wrench,
    level: 'beginner',
    color: 'text-teal-600',
    gradient: 'from-teal-500 to-cyan-500',
    content: {
      intro:
        'You don\'t need to spend money to use AI. Some of the most powerful tools available in 2026 are completely free — especially for students. Here\'s your starter toolkit.',
      keyPoints: [
        'ChatGPT Free — The classic. Great for questions, writing help, brainstorming, and general learning.',
        'Claude Free — Excellent for coding help and reading long documents. Very good at following detailed instructions.',
        'Google Gemini — Free tier with huge context window. Students with .edu email may get extra Pro features.',
        'Perplexity AI — Think of it as a research assistant that cites every source. Free Pro access for students for a full year.',
        'NotebookLM — Upload your own notes/PDFs and it creates a personal AI tutor. Up to 100 notebooks free.',
        'Microsoft Copilot — Free image generation with DALL-E, plus PowerPoint help.',
        'Gamma — AI presentation maker. Describe your topic and it generates slides automatically.',
      ],
      tools: [
        { name: 'ChatGPT', description: 'General Q&A, writing, brainstorming', free: true },
        { name: 'Claude', description: 'Coding, long docs, structured output', free: true },
        { name: 'Gemini', description: 'Research, Google integration', free: true },
        { name: 'Perplexity', description: 'Research with cited sources', free: true },
        { name: 'NotebookLM', description: 'Personal AI tutor from your notes', free: true },
        { name: 'Copilot', description: 'Image gen, Office integration', free: true },
        { name: 'Gamma', description: 'AI-generated presentations', free: true },
      ],
      tryIt:
        'Pick one tool you haven\'t tried yet and sign up today. Try asking it the same question you\'d normally Google.',
    },
  },
  {
    id: 7,
    title: 'AI Art & Images',
    subtitle: 'Turn your ideas into pictures',
    icon: Palette,
    level: 'beginner',
    color: 'text-pink-600',
    gradient: 'from-pink-500 to-rose-500',
    content: {
      intro:
        'AI can create images from text descriptions — just type what you want to see and the AI draws it. It\'s called "AI image generation" and it\'s one of the most fun ways to get started with AI.',
      keyPoints: [
        'DALL-E (inside ChatGPT) — Best for beginners. Understands natural language like talking to an art director. Free generations available via Microsoft Copilot.',
        'Midjourney — Produces stunning, photorealistic art. Used through Discord. Paid only ($10/month+).',
        'Be descriptive! Instead of "a cat", try "a fluffy orange cat sitting on a windowsill in golden afternoon sunlight, watercolor style."',
        'Specify a style: "digital art", "watercolor", "photo-realistic", "pixel art", "comic book style."',
        'Use aspect ratios: In Midjourney, add --ar 16:9 for wide images or --ar 9:16 for phone wallpapers.',
      ],
      tips: [
        {
          bad: 'Draw a dog.',
          good: 'A golden retriever puppy playing in autumn leaves, warm sunlight, studio ghibli anime style, soft colors.',
        },
        {
          bad: 'Make a cool background.',
          good: 'A neon-lit cyberpunk cityscape at night, rain reflections on the street, ultra-wide 21:9 aspect ratio, cinematic lighting.',
        },
      ],
      tryIt:
        'Open ChatGPT or Copilot and try generating an image. Start simple, then keep adding details to see how the image improves!',
    },
  },
  {
    id: 8,
    title: 'Level Up Your Prompts',
    subtitle: 'The PTCF framework pros use',
    icon: Zap,
    level: 'intermediate',
    color: 'text-violet-600',
    gradient: 'from-violet-500 to-purple-500',
    content: {
      intro:
        'Ready to go beyond basic prompts? The PTCF framework is used by professionals to get consistently great results. It stands for Persona, Task, Context, Format — and it works with every AI tool.',
      keyPoints: [
        'P — Persona: Tell the AI WHO to be. "You are an experienced biology teacher" or "Act as a patient math tutor."',
        'T — Task: Tell the AI WHAT to do. Be crystal clear. "Explain photosynthesis" is okay, "Explain the light-dependent reactions of photosynthesis" is better.',
        'C — Context: Give background info. "I\'m a 9th grader preparing for a test tomorrow" or "This is for a science fair poster."',
        'F — Format: Tell the AI HOW to deliver it. "As a numbered list", "In a table", "As a 2-paragraph summary", "As flashcards."',
        'Pro tip: Put your data FIRST and instructions LAST. This can improve response quality by up to 30%.',
      ],
      tips: [
        {
          bad: 'Help me study biology.',
          good: 'You are a patient biology tutor for 9th graders. I have a test tomorrow on cell division. Create 10 flashcard-style Q&A pairs covering mitosis and meiosis. Keep each answer under 2 sentences.',
        },
      ],
      tryIt:
        'Rewrite one of your recent AI prompts using the PTCF framework. Compare the results!',
    },
  },
  {
    id: 9,
    title: 'AI Coding Assistants',
    subtitle: 'Write code with an AI co-pilot',
    icon: Code,
    level: 'intermediate',
    color: 'text-sky-600',
    gradient: 'from-sky-500 to-blue-500',
    content: {
      intro:
        'AI coding assistants can help you write, debug, and understand code — even if you\'re just starting out. They\'re like having a programming tutor who never gets tired of your questions.',
      keyPoints: [
        'GitHub Copilot — Built into VS Code. Auto-completes code as you type. Free for students with a GitHub Education account.',
        'Claude Code — Runs in your terminal. Excellent at reading entire projects and making changes across multiple files.',
        'Cursor — A code editor with AI built in. Great for beginners who want AI help right where they write code.',
        'v0 by Vercel — Describe a UI component in plain English and it generates the React code. Great for learning web development.',
        'Don\'t just copy-paste code! Ask the AI to explain what each line does so you actually learn.',
      ],
      tools: [
        { name: 'GitHub Copilot', description: 'Auto-complete code in VS Code', free: true },
        { name: 'Claude Code', description: 'Terminal-based AI coding assistant', free: false },
        { name: 'Cursor', description: 'AI-powered code editor', free: true },
        { name: 'v0', description: 'Generate UI components from text', free: true },
      ],
      tips: [
        {
          bad: 'Write me a website.',
          good: 'I\'m learning HTML and CSS. Help me build a simple personal portfolio page with a header, an about section, and a list of my hobbies. Explain each HTML tag you use.',
        },
      ],
      tryIt:
        'Open any AI chatbot and ask it to write a simple HTML page that says "Hello World" with a colored background. Then ask it to explain every line.',
    },
  },
  {
    id: 10,
    title: 'Build Cool Projects',
    subtitle: 'Fun things you can make with AI today',
    icon: Rocket,
    level: 'intermediate',
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-500',
    content: {
      intro:
        'The best way to learn AI is by DOING. Here are real projects you can build right now — no experience required. Each one teaches you a different AI skill.',
      keyPoints: [
        'Personal Study Bot — Use NotebookLM to upload your class notes and create a custom AI tutor that only answers from YOUR material.',
        'AI Art Portfolio — Generate a series of images in a consistent style using DALL-E or Midjourney. Great for creative projects.',
        'Prompt Library — Start a document of your best prompts. Every time an AI gives you a great answer, save the prompt that got it.',
        'Website Builder — Use v0 or ChatGPT to build a simple personal website. Describe what you want in plain English.',
        'Research Assistant — Use Perplexity to research a topic, then NotebookLM to organize what you found into a study guide.',
        'Presentation Maker — Use Gamma to turn a topic into a full slide deck, then customize it with your own style.',
      ],
      tryIt:
        'Pick one project from this list and start it TODAY. Even spending 15 minutes on it will teach you more than reading about AI for hours.',
    },
  },
  {
    id: 11,
    title: 'Research Superpowers',
    subtitle: 'Find, organize & remember anything',
    icon: Search,
    level: 'intermediate',
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-green-500',
    content: {
      intro:
        'AI is changing how we research. Instead of scrolling through 50 Google results, you can get cited answers instantly and turn messy notes into organized knowledge. Here\'s how students are doing it in 2026.',
      keyPoints: [
        'Perplexity AI — Ask any question and get an answer with source links. Think "Google that actually answers your question." Free Pro access for students.',
        'NotebookLM — Upload PDFs, articles, or notes. AI creates summaries, tables, and even podcast-style audio from your sources. Free.',
        'The power combo: Use Perplexity to FIND sources, then NotebookLM to ANALYZE them. This is what top students do.',
        'Always check sources! Perplexity shows you where its info came from. Click the links to verify.',
        'Use AI to create structured study materials — tables comparing concepts, timelines of events, or cause-and-effect diagrams.',
      ],
      tips: [
        {
          bad: 'Tell me about climate change.',
          good: 'Using Perplexity: "What are the 3 most significant climate change developments in 2026? Include peer-reviewed sources."',
        },
      ],
      tryIt:
        'Search for something you\'re studying on Perplexity, then upload the sources into NotebookLM and ask it to create a study guide.',
    },
  },
  {
    id: 12,
    title: 'AI Workspaces & Projects',
    subtitle: 'Set up AI to remember your preferences',
    icon: Lightbulb,
    level: 'intermediate',
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-amber-500',
    content: {
      intro:
        'All major AI tools now have "Projects" or "Workspaces" — dedicated spaces where you set up instructions once and the AI remembers them forever. This is a game-changer for getting consistent, high-quality results.',
      keyPoints: [
        'ChatGPT, Claude, and Gemini all support Projects — dedicated workspaces with custom instructions.',
        'Set up a "Homework Helper" project with instructions like: "I\'m in 10th grade. Explain things clearly. Always show your work step by step."',
        'Upload files to your project — textbooks, notes, rubrics. The AI will reference them in every conversation.',
        'Custom instructions apply automatically to every new chat in that project. Set them up once, benefit forever.',
        'Create separate projects for different subjects: Math, Science, English, Creative Writing.',
      ],
      tryIt:
        'Create a project in ChatGPT or Claude for your hardest subject. Add custom instructions about your grade level and how you like things explained.',
    },
  },
  {
    id: 13,
    title: 'Staying Ahead',
    subtitle: 'The AI world moves fast — here\'s how to keep up',
    icon: TrendingUp,
    level: 'intermediate',
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-violet-500',
    content: {
      intro:
        'AI is evolving faster than any technology in history. New models, tools, and features launch every week. You don\'t need to know everything — just know where to look and what matters.',
      keyPoints: [
        'Follow r/ClaudeAI, r/ChatGPT, and r/vibecoding on Reddit — the community shares tips and discovers features before anyone else.',
        'AI models update frequently. In 2026: Gemini 3 leads user polls, GPT-5.2 dominates reasoning, Claude Opus 4.5 wins at coding.',
        'Practice daily! Even 5-10 minutes a day with AI sharpens your skills. Try different tools and compare results.',
        'Build a "prompt library" — save your best prompts in a document. Over time, this becomes your personal cheatsheet.',
        'Don\'t stress about keeping up with EVERYTHING. Pick 1-2 tools, get really good at them, then expand.',
        'Learning prompt literacy is one of the most valuable digital skills you can develop — it helps you think more clearly and solve problems faster.',
      ],
      tools: [
        { name: 'r/ClaudeAI', description: 'Claude tips & community', free: true },
        { name: 'r/ChatGPT', description: 'ChatGPT tips & tricks', free: true },
        { name: 'r/vibecoding', description: 'AI coding community', free: true },
        { name: 'The Vibing Skull', description: 'You\'re already here! Check the News page.', free: true },
      ],
      tryIt:
        'Subscribe to one AI subreddit today and spend 5 minutes scrolling. You\'ll pick up a new tip every time.',
    },
  },
]

/* ------------------------------------------------------------------ */
/*  Lesson card component                                              */
/* ------------------------------------------------------------------ */

function LessonCard({ lesson }: { lesson: Lesson }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = lesson.icon

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl dark:bg-gray-900/80"
    >
      {/* Gradient accent bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${lesson.gradient}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${lesson.gradient} text-white shadow-md`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                    lesson.level === 'beginner'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                      : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                  }`}
                >
                  {lesson.level === 'beginner' ? '★' : '★★'} {lesson.level}
                </span>
                <span className="text-xs text-gray-400">Lesson {lesson.id}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h3>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {lesson.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
              expanded
                ? `bg-gradient-to-br ${lesson.gradient} text-white`
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
            aria-label={expanded ? 'Collapse lesson' : 'Expand lesson'}
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        {/* Preview text — always visible */}
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {lesson.content.intro}
        </p>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-6 space-y-5 border-t border-gray-100 pt-5 dark:border-gray-800">
            {/* Key Points */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                <Star className="h-4 w-4 text-amber-500" />
                Key Points
              </h4>
              <ul className="space-y-2">
                {lesson.content.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${lesson.gradient} text-xs font-bold text-white`}
                    >
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Good vs Bad prompts */}
            {lesson.content.tips && lesson.content.tips.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Good vs. Bad Prompts
                </h4>
                <div className="space-y-3">
                  {lesson.content.tips.map((tip, i) => (
                    <div key={i} className="space-y-2">
                      {tip.bad && (
                        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm dark:border-red-900/50 dark:bg-red-900/20">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          <div>
                            <span className="font-semibold text-red-600 dark:text-red-400">
                              Don&apos;t:{' '}
                            </span>
                            <span className="text-red-700 dark:text-red-300">
                              &quot;{tip.bad}&quot;
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm dark:border-green-900/50 dark:bg-green-900/20">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <div>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            Do:{' '}
                          </span>
                          <span className="text-green-700 dark:text-green-300">
                            &quot;{tip.good}&quot;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {lesson.content.tools && lesson.content.tools.length > 0 && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                  <Wrench className="h-4 w-4 text-blue-500" />
                  Tools Mentioned
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {lesson.content.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {tool.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tool.description}
                        </p>
                      </div>
                      {tool.free && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                          FREE
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun Fact */}
            {lesson.content.funFact && (
              <div className="rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 p-4 dark:from-amber-900/20 dark:to-yellow-900/20">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Fun Fact
                </p>
                <p className="mt-1 text-sm text-amber-600 dark:text-amber-300">
                  {lesson.content.funFact}
                </p>
              </div>
            )}

            {/* Try It */}
            {lesson.content.tryIt && (
              <div
                className={`rounded-xl bg-gradient-to-r ${lesson.gradient} p-4 text-white shadow-md`}
              >
                <p className="text-sm font-bold">Try It Yourself!</p>
                <p className="mt-1 text-sm opacity-90">{lesson.content.tryIt}</p>
              </div>
            )}
          </div>
        )}

        {/* Expand prompt */}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${lesson.color} transition-colors hover:opacity-80`}
          >
            Read lesson <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Quick Cheatsheet component                                         */
/* ------------------------------------------------------------------ */

function Cheatsheet() {
  return (
    <div className="rounded-2xl border-2 border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-900/80 sm:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Cheatsheet: Prompting Quick Reference
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            letter: 'P',
            word: 'Persona',
            desc: 'Who should the AI be?',
            example: '"You are a friendly science teacher..."',
            color: 'from-purple-500 to-indigo-500',
          },
          {
            letter: 'T',
            word: 'Task',
            desc: 'What should it do?',
            example: '"Explain photosynthesis..."',
            color: 'from-blue-500 to-cyan-500',
          },
          {
            letter: 'C',
            word: 'Context',
            desc: 'Background info',
            example: '"I\'m a 9th grader studying for a test..."',
            color: 'from-green-500 to-emerald-500',
          },
          {
            letter: 'F',
            word: 'Format',
            desc: 'How should it answer?',
            example: '"Give me a numbered list with..."',
            color: 'from-orange-500 to-amber-500',
          },
        ].map((item) => (
          <div
            key={item.letter}
            className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-lg font-black text-white`}
            >
              {item.letter}
            </div>
            <p className="font-bold text-gray-900 dark:text-white">{item.word}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            <p className="mt-2 text-xs italic text-gray-400 dark:text-gray-500">
              {item.example}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function BeginnersPage() {
  const beginnerLessons = lessons.filter((l) => l.level === 'beginner')
  const intermediateLessons = lessons.filter((l) => l.level === 'intermediate')

  return (
    <div className="relative min-h-screen">
      {/* Colorful animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-3xl" />
        <div className="absolute -left-20 top-2/3 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-3xl" />
        <div className="absolute -right-20 top-3/4 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-orange-400/20 to-amber-400/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-[350px] w-[350px] rounded-full bg-gradient-to-br from-violet-400/20 to-indigo-400/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            <Sparkles className="h-4 w-4" />
            Ages 8-17 &middot; Beginner to Intermediate
          </div>

          <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl">
            Learn AI
            <br />
            The Fun Way
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            Bite-sized lessons to help you master AI tools, write better prompts,
            and build cool things. No experience needed — start from zero and
            level up at your own pace.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
              <BookOpen className="h-4 w-4" /> 13 Lessons
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
              <Sparkles className="h-4 w-4" /> 100% Free
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 text-sm font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
              <Zap className="h-4 w-4" /> Updated for 2026
            </span>
          </div>

          {/* Quick-jump nav */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <a
              href="#beginner"
              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              ★ Beginner ({beginnerLessons.length})
            </a>
            <a
              href="#intermediate"
              className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 px-5 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              ★★ Intermediate ({intermediateLessons.length})
            </a>
            <a
              href="#cheatsheet"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              Cheatsheet
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Beginner Section */}
        <div id="beginner" className="mb-16 scroll-mt-24">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-lg font-black text-white shadow-md">
              ★
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Beginner
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start here — no experience needed
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {beginnerLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Cheatsheet */}
        <div id="cheatsheet" className="mb-16 scroll-mt-24">
          <Cheatsheet />
        </div>

        {/* Intermediate Section */}
        <div id="intermediate" className="mb-16 scroll-mt-24">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 text-lg font-black text-white shadow-md">
              ★★
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Intermediate
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ready to level up? Let&apos;s go deeper
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {intermediateLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Resources / Community */}
        <div className="rounded-2xl border-2 border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-900/80 sm:p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Keep Learning
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'r/ClaudeAI',
                desc: 'Claude tips, tricks & community discussion',
                href: 'https://reddit.com/r/ClaudeAI',
                color: 'from-orange-500 to-red-500',
              },
              {
                title: 'r/ChatGPT',
                desc: 'ChatGPT prompts, news & help',
                href: 'https://reddit.com/r/ChatGPT',
                color: 'from-green-500 to-teal-500',
              },
              {
                title: 'r/vibecoding',
                desc: 'AI-powered coding community',
                href: 'https://reddit.com/r/vibecoding',
                color: 'from-purple-500 to-indigo-500',
              },
              {
                title: 'MIT Prompt Guide',
                desc: 'Effective prompts for AI — MIT Sloan',
                href: 'https://mitsloanedtech.mit.edu/ai/basics/effective-prompts/',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Free Prompt Courses',
                desc: 'Best free prompt engineering courses',
                href: 'https://freeacademy.ai/blog/best-free-prompt-engineering-courses',
                color: 'from-amber-500 to-orange-500',
              },
              {
                title: 'AI Tools Directory',
                desc: 'Browse our full tools directory',
                href: '/tools',
                color: 'from-pink-500 to-rose-500',
              },
            ].map((link) => (
              <a
                key={link.title}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50 dark:hover:bg-gray-800"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${link.color} text-white shadow-sm`}
                >
                  <ExternalLink className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                    {link.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA to full Learn page */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-500 dark:text-gray-400">
            Want even more? Check out our full guides and tool comparisons.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            <BookOpen className="h-5 w-5" />
            Go to Learn Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Sources */}
        <div className="mt-16 rounded-xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Sources & Further Reading
          </h3>
          <ul className="space-y-1 text-xs text-gray-400 dark:text-gray-500">
            <li>
              <a href="https://mitsloanedtech.mit.edu/ai/basics/effective-prompts/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                MIT Sloan — Effective Prompts for AI
              </a>
            </li>
            <li>
              <a href="https://www.apa.org/topics/artificial-intelligence-machine-learning/tips-to-keep-teens-safe" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                APA — Tips to Keep Teens Safe with AI
              </a>
            </li>
            <li>
              <a href="https://felloai.com/best-ai-for-students-february-2026/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                Fello AI — Best AI for Students (Feb 2026)
              </a>
            </li>
            <li>
              <a href="https://blaze.today/blog/how-to-use-chatgpt-effectively/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                Blaze — How to Use ChatGPT Effectively in 2026
              </a>
            </li>
            <li>
              <a href="https://www.applerouth.com/blog/top-10-chatgpt-prompts-for-students" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                Applerouth — Top ChatGPT Prompts for Students
              </a>
            </li>
            <li>
              <a href="https://kripeshadwani.com/best-ai-tools-for-students/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                Best AI Tools for Students 2026
              </a>
            </li>
            <li>
              <a href="https://www.datacamp.com/blog/free-ai-tools" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                DataCamp — Best Free AI Tools 2026
              </a>
            </li>
            <li>
              <a href="https://reddit.com/r/ClaudeAI" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                Reddit — r/ClaudeAI community
              </a>
            </li>
            <li>
              <a href="https://reddit.com/r/ChatGPT" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 hover:underline">
                Reddit — r/ChatGPT community
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
