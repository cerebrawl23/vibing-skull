import { z } from 'zod'

export const toolFiltersSchema = z.object({
  category: z.string().optional(),
  pricing: z.enum(['free', 'paid', 'freemium', 'open_source']).optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type ToolFilters = z.infer<typeof toolFiltersSchema>

export const toolCompareSchema = z.object({
  ids: z
    .string()
    .transform((val) => val.split(',').map((id) => id.trim()))
    .refine((ids) => ids.length >= 2, {
      message: 'At least 2 tool IDs are required for comparison',
    })
    .refine((ids) => ids.length <= 4, {
      message: 'Maximum 4 tools can be compared at once',
    })
    .refine(
      (ids) =>
        ids.every((id) =>
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
        ),
      { message: 'All IDs must be valid UUIDs' }
    ),
})

export type ToolCompareInput = z.infer<typeof toolCompareSchema>

export const toolRatingSchema = z.object({
  tool_id: z.uuid(),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().max(1000).optional(),
})

export type ToolRatingInput = z.infer<typeof toolRatingSchema>
