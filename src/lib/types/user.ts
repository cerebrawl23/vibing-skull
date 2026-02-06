import { Database } from './database'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type FavoriteTool = Database['public']['Tables']['favorite_tools']['Row']
export type UserNote = Database['public']['Tables']['user_notes']['Row']
export type ReadingHistoryItem = Database['public']['Tables']['reading_history']['Row']
