# The Vibing Skull - AI Context

## Project Overview

**The Vibing Skull** (vibingskull.com) is a vibe coding resource hub — a command center for discovering, comparing, and organizing the best AI coding tools. It serves as a learning platform, news aggregator, and project planning toolkit for developers who build with AI assistants.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | 5.x |
| UI Library | React | 19.2.3 |
| Styling | Tailwind CSS | 4.0 |
| Components | shadcn/ui (New York style) | latest |
| Database | PostgreSQL via Supabase | - |
| Auth | Supabase Auth (Google + GitHub OAuth) | - |
| Icons | Lucide React | 0.563.0 |
| Validation | Zod | 4.3.6 |
| Deployment | Vercel | - |
| Domain | vibingskull.com | - |

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Public landing pages (top nav, no sidebar)
│   │   ├── page.tsx          # Homepage with hero, tool cards, news, beginners banner
│   │   └── beginners/        # Beginners Guide (ages 8-17, colorful gradient theme)
│   ├── (app)/                # Main app pages (sidebar layout, auth-aware)
│   │   ├── dashboard/        # Personal dashboard (favorites, bookmarks, notes, history)
│   │   ├── learn/            # Learning hub (Big 3 waterfall: Who/What/When/How, tools, prompting, daily digest)
│   │   ├── cheatsheets/      # Cheat sheets (prompting templates, shortcuts, PTCF)
│   │   ├── tools/            # AI tool directory (30+ tools, search, filter, compare)
│   │   ├── project-tools/    # Tech stacks, kickoff prompts, vibe coding guide, project files
│   │   ├── news/             # News feed (Reddit, HN, Dev.to aggregation)
│   │   ├── links/            # Curated links (docs, communities, newsletters, repos)
│   │   └── workflows/        # Step-by-step workflow templates
│   ├── (auth)/               # Auth pages (login, signup, signout)
│   └── api/
│       ├── cron/             # Scheduled jobs (news-sync)
│       └── v1/               # REST API endpoints (tools, news, digest, user)
├── components/
│   ├── ui/                   # shadcn/ui components + custom (copy-button, etc.)
│   ├── layout/               # Header, sidebar, mobile-nav, footer, logo, theme-toggle
│   ├── tools/                # Tool cards, filters, ratings, comparison
│   ├── learn/                # Learn page (guide-library, daily-digest)
│   ├── news/                 # News feed components
│   ├── workflows/            # Workflow components
│   ├── dashboard/            # Dashboard widgets
│   ├── auth/                 # OAuth buttons, sidebar-user
│   └── shared/               # Empty state, loading, tracking
├── lib/
│   ├── supabase/             # Server/client/middleware Supabase clients
│   ├── api/                  # News aggregation (Reddit, HN, Dev.to)
│   ├── hooks/                # React hooks
│   ├── types/                # TypeScript types
│   ├── validators/           # Zod schemas
│   └── utils.ts              # cn() helper
└── data/seed/                # Seed data for tools, categories
```

## Architecture Patterns

### Route Groups
- `(marketing)` — Public pages with top navigation bar (MarketingHeader). No sidebar.
- `(app)` — Main app pages with left sidebar navigation. Auth-aware but not all protected.
- `(auth)` — Login/signup/signout pages.

### Navigation Structure
- **Sidebar** (app pages): Dashboard | Learn (Learning, Cheat Sheets) | Build (A.I. Tools, Project Tools) | Stay Updated (News, Important Links)
- **Top Nav** (marketing pages): Learning, A.I. Tools, News, Beginners (purple highlight)
- **Footer**: Learn / Build / Account columns

### Auth & Routing
- Middleware redirects logged-in users from `/` to `/dashboard`
- Middleware protects `/dashboard` routes — redirects unauthenticated users to `/login`
- Supabase Auth with Google + GitHub OAuth providers

### Server vs Client Components
- Pages are Server Components by default
- Interactive components use `'use client'` directive
- Supabase has separate `server.ts` and `client.ts` client creators

## Coding Conventions

- **Naming**: kebab-case for files, PascalCase for components, camelCase for functions/variables
- **Imports**: Absolute imports via `@/` alias (maps to `src/`)
- **Components**: shadcn/ui New York style, composed with Tailwind utility classes
- **Colors**: Use CSS variables in OKLch color space (defined in globals.css)
- **Icons**: Always use Lucide React icons
- **Styling**: Tailwind CSS 4.0 utility classes. Dark mode via `next-themes`. Use `cn()` for conditional classes.
- **State**: React hooks for local state. Supabase for server state. No Redux/Zustand.
- **Forms**: Controlled components with Zod validation
- **Error handling**: Try/catch with user-friendly error messages. Never expose internal errors.

## Database

PostgreSQL via Supabase with Row Level Security (RLS) enabled.

**Core tables**: categories, tools, tags, tool_tags, tool_features, tool_pros_cons, tool_ratings, news_articles, workflows, workflow_steps, workflow_tools

**User tables** (RLS protected): profiles, bookmarks, favorite_tools, user_notes, reading_history

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anonymous key (public)
SUPABASE_SERVICE_ROLE_KEY       # Supabase service role key (secret)
CRON_SECRET                     # Secret for cron job authentication
NEXT_PUBLIC_SITE_URL            # https://vibingskull.com
REDDIT_CLIENT_ID                # Optional: Reddit API
REDDIT_CLIENT_SECRET            # Optional: Reddit API
REDDIT_USER_AGENT               # Optional: Reddit API
```

## Common Tasks

- **Add a new page**: Create `src/app/(app)/pagename/page.tsx`, add to sidebar navSections in `sidebar.tsx` and `mobile-nav.tsx`, add to `sitemap.ts`, add to `footer.tsx`
- **Add a UI component**: Use `npx shadcn@latest add <component>`, imports from `@/components/ui/`
- **Add an API endpoint**: Create `src/app/api/v1/routename/route.ts`
- **Style something**: Use Tailwind utility classes. Reference `globals.css` for CSS variables.
- **Deploy**: Push to `master` branch → Vercel auto-deploys
