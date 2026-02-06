# The Vibing Skull - Project Documentation

**Your command center for vibe coding.**

A Next.js + Supabase web app that organizes the best AI/vibe coding tools, aggregates trending news, provides workflow templates, and offers a personal dashboard.

---

## Infrastructure Overview

### Hosting & Deployment

| Service | Purpose | URL |
|---------|---------|-----|
| **Vercel** | Next.js hosting, serverless functions, CDN | https://vibing-skull.vercel.app |
| **Supabase** | PostgreSQL database, authentication, real-time | https://myzzoskzhtzrjsroemxz.supabase.co |
| **Hostinger** | File storage (100GB), business email | https://files.vibingskull.com |
| **GitHub** | Source code repository | https://github.com/cerebrawl23/vibing-skull |

### Domain Configuration

| Domain | Points To | Purpose |
|--------|-----------|---------|
| `vibingskull.com` | Vercel | Main application |
| `www.vibingskull.com` | Vercel | Main application (redirect) |
| `files.vibingskull.com` | Hostinger | Static file storage |
| `@vibingskull.com` | Hostinger | Business email |

### DNS Records (Managed by Vercel)

| Type | Name | Value |
|------|------|-------|
| NS | @ | ns1.vercel-dns.com, ns2.vercel-dns.com |
| A | files | 89.116.192.102 |
| MX | @ | mx1.hostinger.com (priority 5) |
| MX | @ | mx2.hostinger.com (priority 10) |
| TXT | @ | v=spf1 include:_spf.hostinger.com ~all |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | Supabase Auth (Google + GitHub OAuth) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Validation** | Zod |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Landing page
│   ├── (app)/                # Main app pages
│   │   ├── dashboard/        # Personal dashboard
│   │   ├── news/             # News feed
│   │   ├── tools/            # Tool directory
│   │   └── workflows/        # Workflow templates
│   ├── (auth)/               # Authentication pages
│   ├── api/
│   │   ├── cron/             # Scheduled jobs
│   │   └── v1/               # REST API endpoints
│   ├── sitemap.ts            # Dynamic sitemap
│   └── robots.ts             # Robots.txt
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Header, sidebar, footer
│   ├── tools/                # Tool cards, filters, ratings
│   ├── news/                 # News feed components
│   ├── workflows/            # Workflow components
│   ├── dashboard/            # Dashboard widgets
│   ├── auth/                 # OAuth buttons, user menu
│   └── shared/               # Empty state, loading, tracking
├── lib/
│   ├── supabase/             # Database clients
│   ├── api/                  # News aggregation (Reddit, HN, Dev.to)
│   ├── hooks/                # React hooks
│   ├── types/                # TypeScript types
│   ├── validators/           # Zod schemas
│   └── utils/                # Utility functions
└── data/seed/                # Seed data for tools, categories
```

---

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
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
|-------|---------|
| `profiles` | User profiles (auto-created on signup) |
| `bookmarks` | Saved news articles |
| `favorite_tools` | Favorited tools |
| `user_notes` | Personal notes |
| `reading_history` | Page visit tracking |

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tools` | List tools with filters |
| GET | `/api/v1/tools/[id]` | Single tool details |
| GET | `/api/v1/tools/compare` | Compare 2-4 tools |
| GET | `/api/v1/tools/categories` | List categories |
| GET | `/api/v1/news` | Paginated news feed |
| GET | `/api/v1/workflows` | List workflows |
| GET | `/api/v1/workflows/[id]` | Workflow details |

### Protected Endpoints (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST/DELETE | `/api/v1/user/bookmarks` | Manage bookmarks |
| GET/POST/DELETE | `/api/v1/user/favorites` | Manage favorites |
| GET/POST/PUT/DELETE | `/api/v1/user/notes` | Manage notes |
| GET/POST | `/api/v1/user/history` | Reading history |
| POST | `/api/v1/user/ratings` | Submit ratings |

### Cron Jobs

| Endpoint | Schedule | Description |
|----------|----------|-------------|
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

## Credentials & Access

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

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## File Storage (Hostinger)

Large files should be uploaded to Hostinger to save Supabase storage:

- **FTP Host:** 89.116.192.102
- **Username:** u608310832
- **Directory:** /domains/files.vibingskull.com/public_html/
- **Access URL:** https://files.vibingskull.com/yourfile.jpg

---

## Monitoring & Maintenance

- **Vercel Analytics:** Enabled in dashboard
- **Supabase Dashboard:** Monitor database usage
- **News Sync:** Runs daily at 8 AM UTC
- **Old News Cleanup:** Articles > 30 days auto-deleted

---

## Future Expansion

Designed for future extension to:
- Chrome Extension
- VSCode Extension
- Desktop App (Electron/Tauri)

CORS headers configured on `/api/v1/*` endpoints.
