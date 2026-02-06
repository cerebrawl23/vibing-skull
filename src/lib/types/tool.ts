import { Database } from './database'

export type Tool = Database['public']['Tables']['tools']['Row']
export type ToolInsert = Database['public']['Tables']['tools']['Insert']
export type Category = Database['public']['Tables']['categories']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']
export type ToolFeature = Database['public']['Tables']['tool_features']['Row']
export type ToolProCon = Database['public']['Tables']['tool_pros_cons']['Row']
export type ToolRating = Database['public']['Tables']['tool_ratings']['Row']

export interface ToolWithRelations extends Tool {
  category: Category
  tags: Tag[]
  pros: ToolProCon[]
  cons: ToolProCon[]
  features: ToolFeature[]
}

export interface ToolCardData {
  id: string
  name: string
  slug: string
  description: string
  logo_url: string | null
  pricing: Tool['pricing']
  avg_rating: number
  rating_count: number
  category: { name: string; slug: string }
  tags: { name: string; slug: string }[]
}

export interface ToolComparisonData {
  tools: ToolWithRelations[]
  feature_groups: string[]
}
