export const APP_NAME = 'The Vibing Skull'
export const APP_DESCRIPTION = 'Your command center for vibe coding'
export const APP_DOMAIN = 'vibingskull.com'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const CATEGORIES = {
  AI_CODE_ASSISTANTS: 'ai-code-assistants',
  AI_DESIGN_UI: 'ai-design-ui',
  PROMPTING_CONTEXT: 'prompting-context',
  DEPLOYMENT_BACKEND: 'deployment-backend',
} as const

export const CATEGORY_LABELS: Record<string, string> = {
  'ai-code-assistants': 'AI Code Assistants',
  'ai-design-ui': 'AI Design & UI',
  'prompting-context': 'Prompting & Context',
  'deployment-backend': 'Deployment & Backend',
}

export const CATEGORY_ICONS: Record<string, string> = {
  'ai-code-assistants': 'Code',
  'ai-design-ui': 'Palette',
  'prompting-context': 'MessageSquare',
  'deployment-backend': 'Rocket',
}

export const PRICING_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Paid',
  freemium: 'Freemium',
  open_source: 'Open Source',
}

export const NEWS_SOURCES = {
  reddit: { label: 'Reddit', color: 'bg-orange-500' },
  hackernews: { label: 'Hacker News', color: 'bg-orange-600' },
  devto: { label: 'Dev.to', color: 'bg-blue-500' },
} as const

export const ITEMS_PER_PAGE = 20
export const MAX_COMPARISON_TOOLS = 4
export const NEWS_SYNC_INTERVAL_MINUTES = 30
export const NEWS_RELEVANCE_THRESHOLD = 15
export const NEWS_MAX_AGE_DAYS = 30
