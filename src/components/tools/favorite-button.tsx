'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  toolId: string
  variant?: 'icon' | 'default'
  className?: string
}

export function FavoriteButton({ toolId, variant = 'icon', className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkFavorite = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('favorite_tools')
        .select('id')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .maybeSingle()

      setIsFavorite(!!data)
      setLoading(false)
    }

    checkFavorite()
  }, [supabase, toolId])

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

    if (isFavorite) {
      await supabase
        .from('favorite_tools')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
      setIsFavorite(false)
    } else {
      await supabase
        .from('favorite_tools')
        .insert({ user_id: user.id, tool_id: toolId })
      setIsFavorite(true)
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
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star
          className={cn(
            'h-4 w-4 transition-colors',
            isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
          )}
        />
      </Button>
    )
  }

  return (
    <Button
      variant={isFavorite ? 'default' : 'outline'}
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      <Star
        className={cn(
          'mr-2 h-4 w-4',
          isFavorite && 'fill-current'
        )}
      />
      {isFavorite ? 'Favorited' : 'Add to Favorites'}
    </Button>
  )
}
