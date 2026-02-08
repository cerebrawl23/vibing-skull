# Skills & Patterns - The Vibing Skull

Reusable patterns for common tasks in this project.

---

## Add a New App Page

```
1. Create src/app/(app)/pagename/page.tsx
2. Export metadata for SEO:
   export const metadata: Metadata = {
     title: 'Page Title - The Vibing Skull',
     description: 'Page description here.',
   }
3. Add nav item to sidebar.tsx navSections array
4. Add nav item to mobile-nav.tsx navSections array
5. Add route to sitemap.ts static routes
6. Add link to footer.tsx in the appropriate column
```

## Add a New Marketing Page

```
1. Create src/app/(marketing)/pagename/page.tsx
2. Create src/app/(marketing)/pagename/layout.tsx with metadata
3. Add link to marketing-header.tsx if it's a top-level page
4. Add route to sitemap.ts
5. Add link to footer.tsx
```

## Add a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```

Component is installed to `src/components/ui/`. Import with:
```tsx
import { ComponentName } from '@/components/ui/component-name'
```

## Create a Supabase Query (Server Component)

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('table_name')
    .select('*')
    .eq('column', 'value')

  if (error) {
    console.error('Error fetching data:', error)
    return <p>Error loading data.</p>
  }

  return <div>{/* render data */}</div>
}
```

## Create a Supabase Query (Client Component)

```tsx
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function MyComponent() {
  const [data, setData] = useState([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('table_name')
        .select('*')
      if (data) setData(data)
    }
    fetchData()
  }, [supabase])

  return <div>{/* render data */}</div>
}
```

## Add an API Route

```tsx
// src/app/api/v1/routename/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('table_name')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
```

## Add a Protected API Route

```tsx
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ... handle authenticated request
}
```

## Standard Card Layout Pattern

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

<Card>
  <CardHeader>
    <div className="flex items-center gap-2">
      <IconName className="h-5 w-5 text-primary" />
      <CardTitle>Title Here</CardTitle>
    </div>
    <CardDescription>Description here</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## Section Header Pattern

```tsx
<section className="mb-12">
  <div className="flex items-center gap-3 mb-6">
    <IconName className="h-6 w-6 text-primary" />
    <div>
      <h2 className="text-2xl font-bold">Section Title</h2>
      <p className="text-sm text-muted-foreground">Section description</p>
    </div>
  </div>
  {/* Section content */}
</section>
```

## Page Header Pattern

```tsx
<div className="mb-8">
  <div className="flex items-center gap-3 mb-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
      <IconName className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h1 className="text-3xl font-bold">Page Title</h1>
      <p className="text-muted-foreground">Page description</p>
    </div>
  </div>
</div>
```

## Conditional Dark Mode Styling

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'rounded-lg p-4',
  'bg-blue-500/10 text-blue-600',
  'dark:bg-blue-500/20 dark:text-blue-400'
)} />
```

## Responsive Grid Pattern

```tsx
{/* 1 col mobile, 2 col tablet, 3 col desktop */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>{/* ... */}</Card>
  ))}
</div>
```
