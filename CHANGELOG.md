# Changelog

All notable changes to The Vibing Skull project.

---

## [1.0.0] - 2026-02-06

### Initial Release

#### Added

**Core Features**
- Tool directory with 30+ curated AI coding tools
- 4 tool categories: AI Code Assistants, AI Design/UI, Prompting & Context, Deployment & Backend
- Tool detail pages with descriptions, features, pros/cons
- Tool comparison feature (compare 2-4 tools side-by-side)
- Tool search with real-time filtering
- Tool ratings and reviews system

**News Aggregation**
- Automated news feed from Reddit, Hacker News, Dev.to
- Relevance scoring algorithm (keyword matching, engagement, recency)
- Source badges and filtering
- Daily cron job for news sync (8 AM UTC)
- Auto-cleanup of articles older than 30 days

**Workflow Templates**
- Step-by-step workflow guides
- Recommended tool stacks per workflow
- Difficulty levels and time estimates
- Workflow detail pages with steps

**User Features (Auth Required)**
- Google OAuth authentication
- GitHub OAuth authentication
- Favorite tools functionality
- Bookmark articles functionality
- Personal notes (create, edit, delete)
- Reading history tracking
- Personal dashboard with stats

**UI/UX**
- Dark mode first design
- Responsive layout (mobile-friendly)
- Global search (Cmd+K)
- Sidebar navigation
- Loading skeletons
- Empty states
- 404 error page with branding

**SEO & Performance**
- Dynamic sitemap.xml generation
- robots.txt configuration
- Meta tags and Open Graph
- Edge caching via Vercel CDN

**Infrastructure**
- Vercel deployment with serverless functions
- Supabase PostgreSQL database
- Row Level Security (RLS) policies
- Hostinger file storage integration
- Business email support (@vibingskull.com)
- Custom domain configuration

**API**
- RESTful API endpoints under `/api/v1/`
- CORS headers for cross-origin requests
- Protected routes with auth middleware
- Rate limiting via Vercel

#### Technical Details

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Database: PostgreSQL (Supabase)
- Styling: Tailwind CSS + shadcn/ui
- Validation: Zod schemas
- Icons: Lucide React

---

## [0.1.0] - 2026-02-05

### Project Setup

#### Added
- Initial Next.js project setup
- Supabase integration
- Basic authentication flow
- Project structure and routing

---

## Upcoming

### Planned Features
- [ ] Chrome extension for quick tool access
- [ ] VSCode extension integration
- [ ] Desktop app (Electron/Tauri)
- [ ] Tool submission by users
- [ ] Community voting on tools
- [ ] Newsletter integration
- [ ] AI-powered tool recommendations
- [ ] Workflow builder (custom workflows)
- [ ] Team/organization accounts
- [ ] API rate limiting dashboard

### Improvements
- [ ] Upgrade to Vercel Pro for more frequent cron jobs
- [ ] Add more news sources
- [ ] Implement full-text search
- [ ] Add tool changelogs/updates tracking
- [ ] Email notifications for bookmarked tool updates
