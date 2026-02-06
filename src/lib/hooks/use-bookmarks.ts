'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables } from '@/lib/types/database'

type NewsArticle = Tables<'news_articles'>

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchBookmarks = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setBookmarks([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('bookmarks')
      .select('article_id')
      .eq('user_id', user.id)

    setBookmarks(data?.map(b => b.article_id) ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchBookmarks()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchBookmarks()
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, fetchBookmarks])

  const toggleBookmark = async (articleId: string): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const isBookmarked = bookmarks.includes(articleId)

    if (isBookmarked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', articleId)

      if (!error) {
        setBookmarks(prev => prev.filter(id => id !== articleId))
        return true
      }
    } else {
      const { error } = await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, article_id: articleId })

      if (!error) {
        setBookmarks(prev => [...prev, articleId])
        return true
      }
    }

    return false
  }

  const isBookmarked = (articleId: string) => bookmarks.includes(articleId)

  return { bookmarks, loading, toggleBookmark, isBookmarked, refetch: fetchBookmarks }
}

export function useBookmarkedArticles() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setArticles([])
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('bookmarks')
        .select('article_id, news_articles(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const articleData = data?.map(b => b.news_articles).filter((a): a is NewsArticle => a !== null) ?? []
      setArticles(articleData)
      setLoading(false)
    }

    fetchBookmarkedArticles()
  }, [supabase])

  return { articles, loading }
}
