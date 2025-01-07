export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          university: string | null
          company: string | null
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: string
          university?: string | null
          company?: string | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          university?: string | null
          company?: string | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chapters: {
        Row: {
          id: string
          name: string
          university: string
          location: string
          member_count: number
          lead_email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          university: string
          location: string
          member_count?: number
          lead_email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          university?: string
          location?: string
          member_count?: number
          lead_email?: string
          created_at?: string
          updated_at?: string
        }
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
  }
}