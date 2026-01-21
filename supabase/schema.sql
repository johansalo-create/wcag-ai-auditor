-- WCAG AI Auditor v2.0 Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. WCAG Criteria Reference Table
-- ============================================
CREATE TABLE IF NOT EXISTS wcag_criteria (
  id TEXT PRIMARY KEY,                    -- "1.1.1", "2.4.7", etc.
  principle INTEGER NOT NULL CHECK (principle BETWEEN 1 AND 4),
  guideline TEXT NOT NULL,                -- "1.1", "2.4", etc.
  level TEXT NOT NULL CHECK (level IN ('A', 'AA', 'AAA')),
  name_en TEXT NOT NULL,
  name_sv TEXT NOT NULL,
  description_en TEXT,
  description_sv TEXT,
  understanding_url TEXT,
  techniques_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Projects Table
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  website_scope TEXT NOT NULL,
  conformance_target TEXT DEFAULT 'AA' CHECK (conformance_target IN ('A', 'AA', 'AAA')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 3. Evaluations Table
-- ============================================
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for evaluations (via project ownership)
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage evaluations in own projects" ON evaluations
  FOR ALL USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

-- ============================================
-- 4. Evaluation Pages Table
-- ============================================
CREATE TABLE IF NOT EXISTS evaluation_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  page_type TEXT,                         -- "homepage", "form", "article", etc.
  html_snapshot TEXT,                     -- Cached HTML at evaluation time
  screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for evaluation_pages
ALTER TABLE evaluation_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage pages in own evaluations" ON evaluation_pages
  FOR ALL USING (
    evaluation_id IN (
      SELECT e.id FROM evaluations e
      JOIN projects p ON e.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

-- ============================================
-- 5. Evaluation Results Table
-- ============================================
CREATE TABLE IF NOT EXISTS evaluation_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE NOT NULL,
  page_id UUID REFERENCES evaluation_pages(id) ON DELETE CASCADE NOT NULL,
  criterion_id TEXT REFERENCES wcag_criteria(id) NOT NULL,
  status TEXT DEFAULT 'not_checked' CHECK (status IN ('passed', 'failed', 'not_applicable', 'not_checked')),
  severity TEXT CHECK (severity IS NULL OR severity IN ('critical', 'serious', 'moderate', 'minor')),
  observations TEXT,
  evidence JSONB,                         -- { screenshots: [], code_snippets: [] }
  ai_analysis JSONB,                      -- { summary: "", suggestions: [], confidence: 0.0-1.0 }
  manual_override BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(evaluation_id, page_id, criterion_id)
);

-- RLS for evaluation_results
ALTER TABLE evaluation_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage results in own evaluations" ON evaluation_results
  FOR ALL USING (
    evaluation_id IN (
      SELECT e.id FROM evaluations e
      JOIN projects p ON e.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

-- ============================================
-- 6. Reports Table
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('pdf', 'json', 'earl', 'html')),
  file_url TEXT,
  public_share_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can manage their own reports
CREATE POLICY "Users can manage own reports" ON reports
  FOR ALL USING (
    evaluation_id IN (
      SELECT e.id FROM evaluations e
      JOIN projects p ON e.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

-- Public access to shared reports
CREATE POLICY "Anyone can view shared reports" ON reports
  FOR SELECT USING (public_share_id IS NOT NULL);

-- ============================================
-- 7. Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_project ON evaluations(project_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_pages_evaluation ON evaluation_pages(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_results_evaluation ON evaluation_results(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_results_criterion ON evaluation_results(criterion_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_results_status ON evaluation_results(status);
CREATE INDEX IF NOT EXISTS idx_wcag_criteria_level ON wcag_criteria(level);
CREATE INDEX IF NOT EXISTS idx_wcag_criteria_principle ON wcag_criteria(principle);

-- ============================================
-- 8. Updated_at Trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER evaluation_results_updated_at
  BEFORE UPDATE ON evaluation_results
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
