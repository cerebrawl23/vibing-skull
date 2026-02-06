import { z } from 'zod'

export const bookmarkSchema = z.object({
  article_id: z.uuid(),
})

export type BookmarkInput = z.infer<typeof bookmarkSchema>

export const favoriteSchema = z.object({
  tool_id: z.uuid(),
})

export type FavoriteInput = z.infer<typeof favoriteSchema>

export const noteCreateSchema = z.object({
  tool_id: z.uuid().optional(),
  title: z.string().max(200).optional(),
  content: z.string().min(1).max(5000),
})

export type NoteCreateInput = z.infer<typeof noteCreateSchema>

export const noteUpdateSchema = z.object({
  id: z.uuid(),
  title: z.string().max(200).optional(),
  content: z.string().min(1).max(5000).optional(),
})

export type NoteUpdateInput = z.infer<typeof noteUpdateSchema>

export const historySchema = z.object({
  item_type: z.enum(['article', 'tool', 'workflow']),
  article_id: z.uuid().optional(),
  tool_id: z.uuid().optional(),
  workflow_id: z.uuid().optional(),
})

export type HistoryInput = z.infer<typeof historySchema>
