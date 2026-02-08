# Agent Behavior Rules - The Vibing Skull

## General Rules

- Always read `CLAUDE.md` first for project context
- Follow the existing coding conventions and patterns
- Use TypeScript strict mode — no `any` types unless absolutely necessary
- Never commit `.env`, `.env.local`, or files containing secrets
- Always use absolute imports with the `@/` alias

## Code Style

- Use shadcn/ui components from `@/components/ui/` — do not install alternative UI libraries
- Use Lucide React for all icons — do not use other icon libraries
- Use Tailwind CSS utility classes for styling — no inline styles, no CSS modules
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Prefer Server Components. Only add `'use client'` when the component needs interactivity (useState, useEffect, event handlers, browser APIs)
- Keep components under 200 lines. Split large components into smaller pieces.

## File Organization

- New pages go in `src/app/(app)/` for sidebar pages or `src/app/(marketing)/` for public pages
- New UI components go in `src/components/ui/`
- Feature components go in the appropriate `src/components/` subdirectory
- Shared utilities go in `src/lib/`
- Types go in `src/lib/types/`
- Zod schemas go in `src/lib/validators/`

## Database & API

- Use `createClient()` from `@/lib/supabase/server` in Server Components
- Use `createClient()` from `@/lib/supabase/client` in Client Components
- Always handle Supabase errors — check for `error` in the response
- API routes go in `src/app/api/v1/` and follow REST conventions
- Protected routes check for authenticated user via Supabase auth

## Git & Deployment

- Write clear, descriptive commit messages using conventional commits (feat:, fix:, docs:, etc.)
- Keep commits focused — one feature or fix per commit
- Push to `master` branch to trigger Vercel deployment
- Never force-push to `master`
- Never commit node_modules, .next, or build artifacts

## Testing & Quality

- Verify the build passes (`npm run build`) before pushing
- Test new pages/features in both light and dark mode
- Test responsive design at mobile (375px), tablet (768px), and desktop (1280px)
- Check for TypeScript errors before committing

## When Adding New Pages

1. Create the page component in the appropriate route group
2. Add navigation link to `src/components/layout/sidebar.tsx` and `mobile-nav.tsx`
3. Add to `src/app/sitemap.ts`
4. Add to `src/components/layout/footer.tsx` if appropriate
5. Update `marketing-header.tsx` if it's a public-facing page

## What NOT To Do

- Do not install new dependencies without clear justification
- Do not change the tech stack (Next.js, Supabase, Tailwind, shadcn/ui)
- Do not modify the auth flow without explicit instruction
- Do not delete or overwrite `.env.local`
- Do not expose Supabase service role key in client-side code
- Do not add console.log statements to production code
