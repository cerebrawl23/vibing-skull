import type { Metadata } from 'next'
import { LayoutDashboard } from 'lucide-react'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { FavoriteToolsList } from '@/components/dashboard/favorite-tools-list'
import { BookmarkedArticlesList } from '@/components/dashboard/bookmarked-articles-list'
import { NotesSection } from '@/components/dashboard/notes-section'
import { RecentHistory } from '@/components/dashboard/recent-history'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal dashboard on The Vibing Skull.',
}

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Your personal vibe coding command center
          </p>
        </div>
      </div>

      <div className="mt-8">
        <DashboardStats />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FavoriteToolsList />
        <BookmarkedArticlesList />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NotesSection />
        <RecentHistory />
      </div>
    </div>
  )
}
