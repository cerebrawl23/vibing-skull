# The Vibing Skull - Project Documentation

**Your command center for vibe coding.**

A Next.js + Supabase web app that organizes the best AI/vibe coding tools, aggregates trending news, provides learning resources, project planning tools, and a personal dashboard.

---

## Infrastructure Overview

### Hosting and Deployment

| Service | Purpose | URL |
| ------- | ------- | --- |
| Vercel | Next.js hosting, serverless functions, CDN | https://vibing-skull.vercel.app |
| Supabase | PostgreSQL database, authentication, real-time | https://myzzoskzhtzrjsroemxz.supabase.co |
| Hostinger | File storage (100GB), business email | https://files.vibingskull.com |
| GitHub | Source code repository | https://github.com/cerebrawl23/vibing-skull |

### Domain Configuration

| Domain | Points To | Purpose |
| ------ | --------- | ------- |
| `vibingskull.com` | Vercel | Main application |
| `www.vibingskull.com` | Vercel | Main application (redirect) |
| `files.vibingskull.com` | Hostinger | Static file storage |
| `@vibingskull.com` | Hostinger | Business email |

### DNS Records (Managed by Vercel)

| Type | Name | Value |
| ---- | ---- | ----- |
| NS | @ | ns1.vercel-dns.com, ns2.vercel-dns.com |
| A | files | 89.116.192.102 |
| MX | @ | mx1.hostinger.com (priority 5) |
| MX | @ | mx2.hostinger.com (priority 10) |
| TXT | @ | v=spf1 include:_spf.hostinger.com ~all |

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth (Google + GitHub OAuth) |
| Styling | Tailwind CSS 4 + shadcn/ui (New York style) |
| Validation | Zod |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Project Structure

```text
src/
├── app/
│   ├── (marketing)/          # Public landing pages (top nav, no sidebar)
│   │   ├── page.tsx          # Homepage
│   │   └── beginners/        # Beginners Guide (ages 8-17)
│   ├── (app)/                # Main app pages (sidebar layout)
│   │   ├── dashboard/        # Personal dashboard
│   │   ├── learn/            # Learning hub
│   │   ├── cheatsheets/      # Cheat sheets collection
│   │   ├── tools/            # AI tool directory
│   │   ├── project-tools/    # Tech stacks, kickoff prompts, best practices
│   │   ├── news/             # News feed
│   │   ├── links/            # Curated important links
│   │   └── workflows/        # Workflow templates
│   ├── (auth)/               # Authentication pages
│   ├── api/
│   │   ├── cron/             # Scheduled jobs
│   │   └── v1/               # REST API endpoints
│   ├── sitemap.ts            # Dynamic sitemap
│   └── robots.ts             # Robots.txt
├── components/
│   ├── ui/                   # shadcn/ui components + custom (copy-button)
│   ├── layout/               # Header, sidebar, mobile-nav, footer, logo, theme-toggle
│   ├── tools/                # Tool cards, filters, ratings, comparison
│   ├── news/                 # News feed components
│   ├── workflows/            # Workflow components
│   ├── dashboard/            # Dashboard widgets
│   ├── auth/                 # OAuth buttons, user menu
│   └── shared/               # Empty state, loading, tracking
├── lib/
│   ├── supabase/             # Server/client/middleware database clients
│   ├── api/                  # News aggregation (Reddit, HN, Dev.to)
│   ├── hooks/                # React hooks
│   ├── types/                # TypeScript types
│   ├── validators/           # Zod schemas
│   └── utils.ts              # cn() helper
└── data/seed/                # Seed data for tools, categories
```

---

## Architecture Decisions

### Route Groups

The app uses Next.js route groups to separate concerns:

- **(marketing)** - Public landing pages. Uses `MarketingHeader` (top nav). No sidebar. Accessible to everyone.
- **(app)** - Main application pages. Uses `Sidebar` + `MobileNav` (left nav). Auth-aware but not all routes are protected.
- **(auth)** - Login, signup, signout pages.

### Navigation

- **Sidebar** (app pages): Grouped into sections — Dashboard, Learn (Learning, Cheat Sheets), Build (A.I. Tools, Project Tools), Stay Updated (News, Important Links)
- **Top Nav** (marketing pages): Learning, A.I. Tools, News, Beginners (purple highlight)
- **Footer**: Three columns — Learn, Build, Account

### Auth and Routing

- Middleware at `src/lib/supabase/middleware.ts` handles auth redirects
- Logged-in users hitting `/` are redirected to `/dashboard`
- Unauthenticated users hitting `/dashboard` are redirected to `/login`
- Supabase Auth with Google and GitHub OAuth providers

### Server vs Client Components

- Pages default to Server Components
- Interactive components (state, effects, events) use `'use client'`
- Supabase has separate clients: `server.ts` (Server Components) and `client.ts` (Client Components)

---

## Database Schema

### Core Tables

| Table | Purpose |
| ----- | ------- |
| `categories` | Tool categories (AI Assistants, Design, etc.) |
| `tools` | 30+ curated AI coding tools |
| `tags` / `tool_tags` | Tool tagging system |
| `tool_features` | Feature comparison data |
| `tool_pros_cons` | Pros and cons per tool |
| `tool_ratings` | User ratings and reviews |
| `news_articles` | Aggregated news from Reddit, HN, Dev.to |
| `workflows` | Step-by-step workflow templates |
| `workflow_steps` | Individual workflow steps |
| `workflow_tools` | Tools recommended per workflow |

### User Tables (RLS Protected)

| Table | Purpose |
| ----- | ------- |
| `profiles` | User profiles (auto-created on signup) |
| `bookmarks` | Saved news articles |
| `favorite_tools` | Favorited tools |
| `user_notes` | Personal notes |
| `reading_history` | Page visit tracking |

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/v1/tools` | List tools with filters |
| GET | `/api/v1/tools/[id]` | Single tool details |
| GET | `/api/v1/tools/compare` | Compare 2-4 tools |
| GET | `/api/v1/tools/categories` | List categories |
| GET | `/api/v1/news` | Paginated news feed |
| GET | `/api/v1/workflows` | List workflows |
| GET | `/api/v1/workflows/[id]` | Workflow details |

### Protected Endpoints (Auth Required)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET/POST/DELETE | `/api/v1/user/bookmarks` | Manage bookmarks |
| GET/POST/DELETE | `/api/v1/user/favorites` | Manage favorites |
| GET/POST/PUT/DELETE | `/api/v1/user/notes` | Manage notes |
| GET/POST | `/api/v1/user/history` | Reading history |
| POST | `/api/v1/user/ratings` | Submit ratings |

### Cron Jobs

| Endpoint | Schedule | Description |
| -------- | -------- | ----------- |
| `/api/cron/news-sync` | Daily 8 AM UTC | Aggregate news from sources |

---

## Environment Variables

### Required (Production)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
CRON_SECRET=your-cron-secret
NEXT_PUBLIC_SITE_URL=https://vibingskull.com
```

### Optional

```env
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
REDDIT_USER_AGENT=TheVibingSkull/1.0
```

---

## Credentials and Access

### Vercel

- Dashboard: https://vercel.com/skullz-projects/vibing-skull
- CLI: Authenticated via `vercel login`

### GitHub

- Repository: https://github.com/cerebrawl23/vibing-skull
- CLI: Authenticated via `gh auth login`

### Supabase

- Dashboard: https://supabase.com/dashboard/project/myzzoskzhtzrjsroemxz
- Database: PostgreSQL with RLS policies

### Hostinger

- hPanel: https://hpanel.hostinger.com
- FTP: `ftp://89.116.192.102` (user: u608310832)
- API Token: Stored in `.mcp.json`

---

## Features

### Tool Directory

- 30+ curated AI coding tools
- 4 categories: AI Assistants, Design/UI, Prompting, Deployment
- Search, filter by pricing, category tabs
- Tool comparison (2-4 tools side-by-side)
- User ratings and reviews

### News Feed

- Aggregated from Reddit, Hacker News, Dev.to
- Relevance scoring algorithm
- Source badges, infinite scroll
- Bookmark articles (auth required)

### Learning Hub

- Big 3 AI Assistants (Claude, ChatGPT, Gemini)
- Prompting fundamentals and PTCF framework
- AI models overview (latest Feb 2026 models)
- Hot Topics section
- Beginners Guide (13 lessons, ages 8-17)

### Cheat Sheets

- Prompting templates for coding, writing, research
- AI tools quick reference
- Keyboard shortcuts
- PTCF framework cheatsheet

### Project Tools

- 4 recommended tech stacks
- Copyable Day Zero and Kickoff Master prompts
- 18 vibe coding best practices
- 7 essential project files explained
- Common mistakes and folder structure template

### Important Links

- 40+ curated links across 6 categories
- Official docs, learning resources, communities, newsletters, repos, free tools

### Workflow Templates

- Step-by-step guides
- Recommended tool stacks
- Difficulty levels, time estimates

### Personal Dashboard

- Favorite tools
- Bookmarked articles
- Personal notes
- Reading history

---

## File Storage (Hostinger)

Large files should be uploaded to Hostinger to save Supabase storage:

- FTP Host: 89.116.192.102
- Username: u608310832
- Directory: /domains/files.vibingskull.com/public_html/
- Access URL: https://files.vibingskull.com/yourfile.jpg

---

## Monitoring and Maintenance

- Vercel Analytics: Enabled in dashboard
- Supabase Dashboard: Monitor database usage
- News Sync: Runs daily at 8 AM UTC
- Old News Cleanup: Articles older than 30 days auto-deleted

---

## Future Expansion

Designed for future extension to:

- Chrome Extension
- VSCode Extension
- Desktop App (Electron/Tauri)

CORS headers configured on `/api/v1/*` endpoints.
