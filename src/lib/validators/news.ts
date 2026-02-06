import { z } from 'zod'

export const newsFiltersSchema = z.object({
  source: z.enum(['reddit', 'hackernews', 'devto']).optional(),
  sort: z.enum(['trending', 'recent', 'relevance']).default('trending'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type NewsFiltersInput = z.infer<typeof newsFiltersSchema>
