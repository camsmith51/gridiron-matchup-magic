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
      sleeper_advanced_stats: {
        Row: {
          air_yards_share: number | null
          created_at: string | null
          id: string
          player_id: string | null
          red_zone_targets: number | null
          route_participation: number | null
          season: number
          snap_share: number | null
          target_share: number | null
        }
        Insert: {
          air_yards_share?: number | null
          created_at?: string | null
          id?: string
          player_id?: string | null
          red_zone_targets?: number | null
          route_participation?: number | null
          season: number
          snap_share?: number | null
          target_share?: number | null
        }
        Update: {
          air_yards_share?: number | null
          created_at?: string | null
          id?: string
          player_id?: string | null
          red_zone_targets?: number | null
          route_participation?: number | null
          season?: number
          snap_share?: number | null
          target_share?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sleeper_advanced_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "sleeper_players"
            referencedColumns: ["id"]
          },
        ]
      }
      sleeper_player_stats: {
        Row: {
          created_at: string | null
          fantasy_points: number | null
          id: string
          interceptions: number | null
          passing_tds: number | null
          passing_yards: number | null
          player_id: string | null
          receiving_tds: number | null
          receiving_yards: number | null
          receptions: number | null
          rushing_tds: number | null
          rushing_yards: number | null
          season: number
          targets: number | null
          week: number | null
        }
        Insert: {
          created_at?: string | null
          fantasy_points?: number | null
          id?: string
          interceptions?: number | null
          passing_tds?: number | null
          passing_yards?: number | null
          player_id?: string | null
          receiving_tds?: number | null
          receiving_yards?: number | null
          receptions?: number | null
          rushing_tds?: number | null
          rushing_yards?: number | null
          season: number
          targets?: number | null
          week?: number | null
        }
        Update: {
          created_at?: string | null
          fantasy_points?: number | null
          id?: string
          interceptions?: number | null
          passing_tds?: number | null
          passing_yards?: number | null
          player_id?: string | null
          receiving_tds?: number | null
          receiving_yards?: number | null
          receptions?: number | null
          rushing_tds?: number | null
          rushing_yards?: number | null
          season?: number
          targets?: number | null
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sleeper_player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "sleeper_players"
            referencedColumns: ["id"]
          },
        ]
      }
      sleeper_players: {
        Row: {
          age: number | null
          created_at: string | null
          height: string | null
          id: string
          name: string
          position: string | null
          sleeper_id: string
          team: string | null
          updated_at: string | null
          weight: number | null
          years_exp: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          height?: string | null
          id?: string
          name: string
          position?: string | null
          sleeper_id: string
          team?: string | null
          updated_at?: string | null
          weight?: number | null
          years_exp?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          height?: string | null
          id?: string
          name?: string
          position?: string | null
          sleeper_id?: string
          team?: string | null
          updated_at?: string | null
          weight?: number | null
          years_exp?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
