# Changelog

All notable changes to The Vibing Skull project.

---

## [1.4.0] - 2026-02-22

### Learn Page Redesign & Daily Digest

#### Added

- **Daily Digest API** (`/api/v1/digest`) — Auto-fetches RSS from Anthropic, OpenAI, and Google AI blogs
- **DailyDigest component** — Renders latest official blog posts with source badges and time-ago labels
- **Waterfall layout** — Progressive disclosure: simple hero → Big 3 → Prompting → Tips → What's New → Links
- **Who/What/When/How structure** for each AI (Claude, ChatGPT, Gemini)
- **Top 3 tools per AI** — 9 curated tools organized by which AI they complement
- **Expandable "How to Get Started"** sections with model info and tool links
- 8 actionable tips covering CLAUDE.md, AskUserQuestion, Plan Mode, config files, subagents

#### Changed

- Learn page completely rewritten from 28-card grid to focused 5-section waterfall
- Reduced from 822 lines to ~350 lines (simpler, cleaner)
- ISR caching (1 hour) for digest — zero database, zero cron needed

#### Removed

- Category filter system (replaced by waterfall sections)
- Search bar on Learn page (content is now scannable without search)
- Redundant guide cards (configuration, capabilities sections merged into Big 3)

---

## [1.3.0] - 2026-02-22

### UX Improvements & Model Updates

#### Added

- Updated all AI model information to Feb 2026 (Opus 4.6, GPT-5, Gemini 3)

#### Changed

- Auth callback redirects to `/dashboard` instead of `/tools` after login
- News feed defaults to "Recent" sort instead of "Relevance"
- Sort options reordered: Recent first, then Relevance, then Score

---

## [1.2.0] - 2026-02-08

### Project Tools Expansion

#### Added

- Copyable "Day Zero" Project Onboarding Prompt template
- Copyable Project Kickoff Master Prompt (13 deliverables)
- "The Ultimate Vibe Coding Guide" — 18 best practices for AI-assisted coding
- Essential Project Files section (CLAUDE.md, AGENTS.md, skills.md, CHANGELOG.md, FEATURES.md, PROJECT.md, README.md explained)
- CopyButton reusable client component (`src/components/ui/copy-button.tsx`)
- Expanded "Common Mistakes" section from 5 to 8 items

#### Changed

- Project Tools page fully rewritten with 6 major sections
- Updated project folder structure template to include all essential files
- Common mistakes now displayed in 2-column grid layout

---

## [1.1.0] - 2026-02-08

### Site Restructure & New Pages

#### Added

- **Cheat Sheets page** (`/cheatsheets`) — Prompting templates, AI tools quick reference, keyboard shortcuts, PTCF framework
- **Important Links page** (`/links`) — 40+ curated links: official docs, learning resources, AI communities, newsletters, GitHub repos, free tools
- **Project Tools page** (`/project-tools`) — 4 recommended tech stacks, project preparation best practices, common mistakes, folder structure template
- **Beginners Guide** (`/beginners`) — 13 expandable lessons for ages 8-17, bright gradient theme, PTCF cheatsheet, fun facts, challenges
- Beginners banner on homepage (right after hero section)
- Beginners banner on Learning page
- Grouped sidebar navigation with section headers (Dashboard, Learn, Build, Stay Updated)
- Mobile navigation mirroring sidebar structure
- Middleware redirect: logged-in users at `/` go to `/dashboard`
- Middleware protection: unauthenticated users at `/dashboard` go to `/login`
- New routes added to sitemap.ts (`/beginners`, `/learn`, `/cheatsheets`, `/project-tools`, `/links`)

#### Changed

- Sidebar rewritten from flat nav to grouped sections
- Marketing header updated with new nav links (Learning, A.I. Tools, News, Beginners)
- Footer restructured into Learn / Build / Account columns
- Marketing header Beginners link styled in purple

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
- Styling: Tailwind CSS 4 + shadcn/ui
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

*Last updated: February 2026*
