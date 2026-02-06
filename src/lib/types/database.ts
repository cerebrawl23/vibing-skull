export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'categories_pkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      tools: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          long_description: string | null
          url: string
          logo_url: string | null
          category_id: string
          pricing: 'free' | 'paid' | 'freemium' | 'open_source'
          pricing_details: string | null
          github_url: string | null
          docs_url: string | null
          is_featured: boolean
          is_published: boolean
          supports_vscode: boolean
          supports_jetbrains: boolean
          supports_neovim: boolean
          supports_web: boolean
          supports_cli: boolean
          has_free_tier: boolean
          ai_model: string | null
          avg_rating: number
          rating_count: number
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          long_description?: string | null
          url: string
          logo_url?: string | null
          category_id: string
          pricing?: 'free' | 'paid' | 'freemium' | 'open_source'
          pricing_details?: string | null
          github_url?: string | null
          docs_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          supports_vscode?: boolean
          supports_jetbrains?: boolean
          supports_neovim?: boolean
          supports_web?: boolean
          supports_cli?: boolean
          has_free_tier?: boolean
          ai_model?: string | null
          avg_rating?: number
          rating_count?: number
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          long_description?: string | null
          url?: string
          logo_url?: string | null
          category_id?: string
          pricing?: 'free' | 'paid' | 'freemium' | 'open_source'
          pricing_details?: string | null
          github_url?: string | null
          docs_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          supports_vscode?: boolean
          supports_jetbrains?: boolean
          supports_neovim?: boolean
          supports_web?: boolean
          supports_cli?: boolean
          has_free_tier?: boolean
          ai_model?: string | null
          avg_rating?: number
          rating_count?: number
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tools_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      tool_tags: {
        Row: {
          tool_id: string
          tag_id: string
        }
        Insert: {
          tool_id: string
          tag_id: string
        }
        Update: {
          tool_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tool_tags_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tool_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      tool_pros_cons: {
        Row: {
          id: string
          tool_id: string
          type: 'pro' | 'con'
          content: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          type: 'pro' | 'con'
          content: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          type?: 'pro' | 'con'
          content?: string
          display_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tool_pros_cons_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
        ]
      }
      tool_features: {
        Row: {
          id: string
          tool_id: string
          feature_name: string
          feature_value: string | null
          feature_group: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          feature_name: string
          feature_value?: string | null
          feature_group?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          feature_name?: string
          feature_value?: string | null
          feature_group?: string | null
          display_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tool_features_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
        ]
      }
      tool_ratings: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          rating: number
          review_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          rating: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          rating?: number
          review_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tool_ratings_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tool_ratings_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      news_articles: {
        Row: {
          id: string
          external_id: string
          source: 'reddit' | 'hackernews' | 'devto'
          title: string
          url: string
          author: string | null
          content_preview: string | null
          thumbnail_url: string | null
          source_url: string
          subreddit: string | null
          score: number
          comment_count: number
          relevance_score: number
          tags: string[]
          published_at: string
          fetched_at: string
          created_at: string
        }
        Insert: {
          id?: string
          external_id: string
          source: 'reddit' | 'hackernews' | 'devto'
          title: string
          url: string
          author?: string | null
          content_preview?: string | null
          thumbnail_url?: string | null
          source_url: string
          subreddit?: string | null
          score?: number
          comment_count?: number
          relevance_score?: number
          tags?: string[]
          published_at: string
          fetched_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          external_id?: string
          source?: 'reddit' | 'hackernews' | 'devto'
          title?: string
          url?: string
          author?: string | null
          content_preview?: string | null
          thumbnail_url?: string | null
          source_url?: string
          subreddit?: string | null
          score?: number
          comment_count?: number
          relevance_score?: number
          tags?: string[]
          published_at?: string
          fetched_at?: string
          created_at?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          estimated_time: string | null
          cover_image_url: string | null
          is_featured: boolean
          is_published: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          estimated_time?: string | null
          cover_image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          estimated_time?: string | null
          cover_image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_steps: {
        Row: {
          id: string
          workflow_id: string
          step_number: number
          title: string
          description: string
          estimated_time: string | null
          created_at: string
        }
        Insert: {
          id?: string
          workflow_id: string
          step_number: number
          title: string
          description: string
          estimated_time?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          workflow_id?: string
          step_number?: number
          title?: string
          description?: string
          estimated_time?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'workflow_steps_workflow_id_fkey'
            columns: ['workflow_id']
            isOneToOne: false
            referencedRelation: 'workflows'
            referencedColumns: ['id']
          },
        ]
      }
      workflow_tools: {
        Row: {
          workflow_id: string
          tool_id: string
          role_in_workflow: string | null
          is_required: boolean
          display_order: number
        }
        Insert: {
          workflow_id: string
          tool_id: string
          role_in_workflow?: string | null
          is_required?: boolean
          display_order?: number
        }
        Update: {
          workflow_id?: string
          tool_id?: string
          role_in_workflow?: string | null
          is_required?: boolean
          display_order?: number
        }
        Relationships: [
          {
            foreignKeyName: 'workflow_tools_workflow_id_fkey'
            columns: ['workflow_id']
            isOneToOne: false
            referencedRelation: 'workflows'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'workflow_tools_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          article_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookmarks_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookmarks_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'news_articles'
            referencedColumns: ['id']
          },
        ]
      }
      favorite_tools: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'favorite_tools_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'favorite_tools_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
        ]
      }
      user_notes: {
        Row: {
          id: string
          user_id: string
          tool_id: string | null
          title: string | null
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id?: string | null
          title?: string | null
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string | null
          title?: string | null
          content?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_notes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_notes_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
        ]
      }
      reading_history: {
        Row: {
          id: string
          user_id: string
          article_id: string | null
          tool_id: string | null
          workflow_id: string | null
          item_type: 'article' | 'tool' | 'workflow'
          visited_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id?: string | null
          tool_id?: string | null
          workflow_id?: string | null
          item_type: 'article' | 'tool' | 'workflow'
          visited_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string | null
          tool_id?: string | null
          workflow_id?: string | null
          item_type?: 'article' | 'tool' | 'workflow'
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reading_history_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reading_history_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'news_articles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reading_history_tool_id_fkey'
            columns: ['tool_id']
            isOneToOne: false
            referencedRelation: 'tools'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reading_history_workflow_id_fkey'
            columns: ['workflow_id']
            isOneToOne: false
            referencedRelation: 'workflows'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_type: 'free' | 'paid' | 'freemium' | 'open_source'
      pro_con_type: 'pro' | 'con'
      news_source: 'reddit' | 'hackernews' | 'devto'
      difficulty_level: 'beginner' | 'intermediate' | 'advanced'
      history_item_type: 'article' | 'tool' | 'workflow'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
