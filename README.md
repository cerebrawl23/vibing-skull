# The Vibing Skull

**Your command center for vibe coding.** Discover, compare, and organize the best AI coding tools.

[vibingskull.com](https://vibingskull.com)

---

## What Is This?

The Vibing Skull is a web app for developers who build with AI. It combines:

- **AI Tool Directory** — 30+ curated tools with search, filtering, comparison, and ratings
- **Learning Hub** — Guides on prompting, AI models, coding assistants, and the Big 3 (Claude, ChatGPT, Gemini)
- **Beginners Guide** — 13 bite-sized lessons for ages 8-17
- **Project Tools** — Recommended stacks, copyable kickoff prompts, and 18 vibe coding best practices
- **Cheat Sheets** — Prompting templates, shortcuts, and quick references
- **News Feed** — Daily AI/tech news aggregated from Reddit, Hacker News, and Dev.to
- **Important Links** — Curated collection of docs, communities, newsletters, and repos
- **Personal Dashboard** — Favorites, bookmarks, notes, and reading history

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI | [React 19](https://react.dev) + [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Database | PostgreSQL via [Supabase](https://supabase.com) |
| Auth | Supabase Auth (Google + GitHub OAuth) |
| Deployment | [Vercel](https://vercel.com) |
| Icons | [Lucide React](https://lucide.dev) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- A Supabase project (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/cerebrawl23/vibing-skull.git
cd vibing-skull
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CRON_SECRET=any-secret-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Optional (for news aggregation):

```env
REDDIT_CLIENT_ID=your-reddit-app-id
REDDIT_CLIENT_SECRET=your-reddit-secret
REDDIT_USER_AGENT=TheVibingSkull/1.0
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Public pages (homepage, beginners)
│   ├── (app)/           # Main app pages (sidebar layout)
│   ├── (auth)/          # Login, signup, signout
│   └── api/             # REST API + cron jobs
├── components/
│   ├── ui/              # shadcn/ui + custom components
│   ├── layout/          # Header, sidebar, footer
│   └── ...              # Feature components
├── lib/
│   ├── supabase/        # Database clients
│   └── ...              # Hooks, types, validators, utils
└── data/seed/           # Seed data
```

## Deployment

Push to `master` to auto-deploy on Vercel:

```bash
git push origin master
```

Or deploy manually:

```bash
vercel --prod
```

## Documentation

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI context for Claude Code sessions |
| `AGENTS.md` | Agent behavior rules and guardrails |
| `skills.md` | Reusable prompt patterns and code templates |
| `FEATURES.md` | Feature roadmap and status tracker |
| `CHANGELOG.md` | Version history and release notes |
| `PROJECT.md` | Infrastructure, credentials, and architecture details |

## License

Private project. All rights reserved.

---

Built for vibe coders. [vibingskull.com](https://vibingskull.com)
