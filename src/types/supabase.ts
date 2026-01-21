export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      wcag_criteria: {
        Row: {
          id: string;
          principle: number;
          guideline: string;
          level: "A" | "AA" | "AAA";
          name_en: string;
          name_sv: string;
          description_en: string | null;
          description_sv: string | null;
          understanding_url: string | null;
          techniques_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          principle: number;
          guideline: string;
          level: "A" | "AA" | "AAA";
          name_en: string;
          name_sv: string;
          description_en?: string | null;
          description_sv?: string | null;
          understanding_url?: string | null;
          techniques_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          principle?: number;
          guideline?: string;
          level?: "A" | "AA" | "AAA";
          name_en?: string;
          name_sv?: string;
          description_en?: string | null;
          description_sv?: string | null;
          understanding_url?: string | null;
          techniques_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          website_scope: string;
          conformance_target: "A" | "AA" | "AAA";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          website_scope: string;
          conformance_target?: "A" | "AA" | "AAA";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          website_scope?: string;
          conformance_target?: "A" | "AA" | "AAA";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      evaluations: {
        Row: {
          id: string;
          project_id: string;
          name: string | null;
          status: "draft" | "in_progress" | "completed";
          started_at: string;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name?: string | null;
          status?: "draft" | "in_progress" | "completed";
          started_at?: string;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string | null;
          status?: "draft" | "in_progress" | "completed";
          started_at?: string;
          completed_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      evaluation_pages: {
        Row: {
          id: string;
          evaluation_id: string;
          url: string;
          title: string | null;
          page_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          evaluation_id: string;
          url: string;
          title?: string | null;
          page_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          evaluation_id?: string;
          url?: string;
          title?: string | null;
          page_type?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluation_pages_evaluation_id_fkey";
            columns: ["evaluation_id"];
            isOneToOne: false;
            referencedRelation: "evaluations";
            referencedColumns: ["id"];
          }
        ];
      };
      evaluation_results: {
        Row: {
          id: string;
          evaluation_id: string;
          page_id: string;
          criterion_id: string;
          status: "passed" | "failed" | "not_applicable" | "not_checked";
          severity: "critical" | "serious" | "moderate" | "minor" | null;
          observations: string | null;
          ai_analysis: Json | null;
          manual_override: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          evaluation_id: string;
          page_id: string;
          criterion_id: string;
          status?: "passed" | "failed" | "not_applicable" | "not_checked";
          severity?: "critical" | "serious" | "moderate" | "minor" | null;
          observations?: string | null;
          ai_analysis?: Json | null;
          manual_override?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          evaluation_id?: string;
          page_id?: string;
          criterion_id?: string;
          status?: "passed" | "failed" | "not_applicable" | "not_checked";
          severity?: "critical" | "serious" | "moderate" | "minor" | null;
          observations?: string | null;
          ai_analysis?: Json | null;
          manual_override?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluation_results_evaluation_id_fkey";
            columns: ["evaluation_id"];
            isOneToOne: false;
            referencedRelation: "evaluations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evaluation_results_page_id_fkey";
            columns: ["page_id"];
            isOneToOne: false;
            referencedRelation: "evaluation_pages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evaluation_results_criterion_id_fkey";
            columns: ["criterion_id"];
            isOneToOne: false;
            referencedRelation: "wcag_criteria";
            referencedColumns: ["id"];
          }
        ];
      };
      reports: {
        Row: {
          id: string;
          evaluation_id: string;
          format: "pdf" | "json" | "earl" | "html";
          file_url: string | null;
          public_share_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          evaluation_id: string;
          format: "pdf" | "json" | "earl" | "html";
          file_url?: string | null;
          public_share_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          evaluation_id?: string;
          format?: "pdf" | "json" | "earl" | "html";
          file_url?: string | null;
          public_share_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_evaluation_id_fkey";
            columns: ["evaluation_id"];
            isOneToOne: false;
            referencedRelation: "evaluations";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

// Helper types
export type WcagCriterion = Database["public"]["Tables"]["wcag_criteria"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Evaluation = Database["public"]["Tables"]["evaluations"]["Row"];
export type EvaluationPage = Database["public"]["Tables"]["evaluation_pages"]["Row"];
export type EvaluationResult = Database["public"]["Tables"]["evaluation_results"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];

// Insert types
export type WcagCriterionInsert = Database["public"]["Tables"]["wcag_criteria"]["Insert"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type EvaluationInsert = Database["public"]["Tables"]["evaluations"]["Insert"];
export type EvaluationPageInsert = Database["public"]["Tables"]["evaluation_pages"]["Insert"];
export type EvaluationResultInsert = Database["public"]["Tables"]["evaluation_results"]["Insert"];
