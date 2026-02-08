'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  Code,
  FolderKanban,
  Newspaper,
  FileText,
  LinkIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { SidebarUser } from '@/components/auth/sidebar-user'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

interface NavSection {
  title?: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Learn',
    items: [
      { href: '/learn', label: 'Learning', icon: BookOpen },
      { href: '/cheatsheets', label: 'Prompt Library', icon: FileText },
    ],
  },
  {
    title: 'Build',
    items: [
      { href: '/tools', label: 'A.I. Tools', icon: Code },
      { href: '/project-tools', label: 'Project Tools', icon: FolderKanban },
    ],
  },
  {
    title: 'Stay Updated',
    items: [
      { href: '/news', label: 'News', icon: Newspaper },
      { href: '/links', label: 'Important Links', icon: LinkIcon },
    ],
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? 'mt-4' : ''}>
            {section.title && (
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
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
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-3 border-t border-border p-3">
        <SidebarUser />
        <ThemeToggle />
      </div>
    </div>
  )
}
