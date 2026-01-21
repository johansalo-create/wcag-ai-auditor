export type Severity = "critical" | "serious" | "moderate" | "minor";

export interface WcagIssue {
  id: string;
  criterion: string;
  title: string;
  severity: Severity;
  element: string;
  description: string;
  fix: string;
  wcagLink?: string;
}

export interface AnalysisResult {
  score: number;
  issues: WcagIssue[];
  summary: string;
  analyzedAt: string;
  inputType: "url" | "code" | "image";
  inputSource?: string;
}

export interface AnalysisRequest {
  type: "url" | "code" | "image";
  content: string;
  wcagLevel?: "A" | "AA" | "AAA";
}
