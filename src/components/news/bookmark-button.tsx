'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bookmark } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BookmarkButtonProps {
  articleId: string
  variant?: 'icon' | 'default'
  className?: string
}

export function BookmarkButton({ articleId, variant = 'icon', className }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkBookmark = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('article_id', articleId)
        .maybeSingle()

      setIsBookmarked(!!data)
      setLoading(false)
    }

    checkBookmark()
  }, [supabase, articleId])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (isBookmarked) {
      await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', articleId)
      setIsBookmarked(false)
    } else {
      await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, article_id: articleId })
      setIsBookmarked(true)
    }

    setLoading(false)
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={handleClick}
        disabled={loading}
        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
      >
        <Bookmark
          className={cn(
            'h-4 w-4 transition-colors',
            isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'
          )}
        />
      </Button>
    )
  }

  return (
    <Button
      variant={isBookmarked ? 'default' : 'outline'}
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      <Bookmark
        className={cn(
          'mr-2 h-4 w-4',
          isBookmarked && 'fill-current'
        )}
      />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  )
}
