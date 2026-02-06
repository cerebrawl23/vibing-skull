'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Newspaper, Workflow, LayoutDashboard, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { SidebarUser } from '@/components/auth/sidebar-user'

const navItems = [
  { href: '/tools', label: 'Tools', icon: Code },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/workflows', label: 'Workflows', icon: Workflow },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-3 border-t border-border p-3">
        <SidebarUser />
        <ThemeToggle />
      </div>
    </aside>
  )
}
