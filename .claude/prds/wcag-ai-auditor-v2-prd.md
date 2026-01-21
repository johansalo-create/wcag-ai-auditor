# PRD: WCAG AI Auditor v2.0 - Enterprise Edition

## Översikt

**Produkt:** WCAG AI Auditor v2.0
**Tagline:** Komplett AI-driven WCAG-evaluering med W3C-standard
**Datum:** 2026-01-21
**Författare:** Johan Salo / @product-manager
**Version:** 2.0.0

---

## Executive Summary

WCAG AI Auditor v2.0 bygger vidare på MVP:n och transformerar den till ett fullständigt evaluerings-verktyg som följer WCAG-EM (Website Accessibility Conformance Evaluation Methodology) från W3C. Med Supabase som backend får vi:

- **Komplett WCAG 2.2-databas** med alla 86 kriterier
- **Strukturerade utvärderingar** som kan sparas och jämföras
- **Länkning till W3C-resurser** (Understanding docs, Techniques)
- **Historik och trendanalys** över tid
- **Professionella rapporter** enligt WCAG-EM standard

---

## Problem med nuvarande MVP

| Gap | Beskrivning |
|-----|-------------|
| **Ofullständig täckning** | Endast AI-hittade issues, inte alla 86 kriterier |
| **Ingen persistence** | Resultat försvinner vid sidladdning |
| **Saknar WCAG-EM-struktur** | Följer inte W3C:s 5-stegs metodik |
| **Ingen historik** | Kan inte jämföra över tid |
| **Ej länkat till W3C** | Saknar Understanding docs & Techniques |
| **Ingen sample-logik** | Analyserar bara en sida i taget |
| **Enkel severity** | Saknar per-kriterium status (Pass/Fail/N/A/Untested) |

---

## Lösning: WCAG-EM Compliant Platform

### Core Concept

Kombinera:
1. **AI-driven automatisk analys** (snabbhet)
2. **WCAG-EM metodologi** (fullständighet)
3. **W3C-kunskapsbas** (auktoritet)
4. **Supabase databas** (persistence)

---

## WCAG 2.2 Komplett Struktur

### Principle 1: Perceivable (Uppfattbar)

#### Guideline 1.1: Text Alternatives
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 1.1.1 | A | Non-text Content |

#### Guideline 1.2: Time-based Media
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 1.2.1 | A | Audio-only and Video-only (Prerecorded) |
| 1.2.2 | A | Captions (Prerecorded) |
| 1.2.3 | A | Audio Description or Media Alternative |
| 1.2.4 | AA | Captions (Live) |
| 1.2.5 | AA | Audio Description (Prerecorded) |
| 1.2.6 | AAA | Sign Language (Prerecorded) |
| 1.2.7 | AAA | Extended Audio Description |
| 1.2.8 | AAA | Media Alternative (Prerecorded) |
| 1.2.9 | AAA | Audio-only (Live) |

#### Guideline 1.3: Adaptable
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 1.3.1 | A | Info and Relationships |
| 1.3.2 | A | Meaningful Sequence |
| 1.3.3 | A | Sensory Characteristics |
| 1.3.4 | AA | Orientation |
| 1.3.5 | AA | Identify Input Purpose |
| 1.3.6 | AAA | Identify Purpose |

#### Guideline 1.4: Distinguishable
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 1.4.1 | A | Use of Color |
| 1.4.2 | A | Audio Control |
| 1.4.3 | AA | Contrast (Minimum) |
| 1.4.4 | AA | Resize Text |
| 1.4.5 | AA | Images of Text |
| 1.4.6 | AAA | Contrast (Enhanced) |
| 1.4.7 | AAA | Low or No Background Audio |
| 1.4.8 | AAA | Visual Presentation |
| 1.4.9 | AAA | Images of Text (No Exception) |
| 1.4.10 | AA | Reflow |
| 1.4.11 | AA | Non-text Contrast |
| 1.4.12 | AA | Text Spacing |
| 1.4.13 | AA | Content on Hover or Focus |

### Principle 2: Operable (Hanterbar)

#### Guideline 2.1: Keyboard Accessible
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 2.1.1 | A | Keyboard |
| 2.1.2 | A | No Keyboard Trap |
| 2.1.3 | AAA | Keyboard (No Exception) |
| 2.1.4 | A | Character Key Shortcuts |

#### Guideline 2.2: Enough Time
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 2.2.1 | A | Timing Adjustable |
| 2.2.2 | A | Pause, Stop, Hide |
| 2.2.3 | AAA | No Timing |
| 2.2.4 | AAA | Interruptions |
| 2.2.5 | AAA | Re-authenticating |
| 2.2.6 | AAA | Timeouts |

#### Guideline 2.3: Seizures and Physical Reactions
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 2.3.1 | A | Three Flashes or Below Threshold |
| 2.3.2 | AAA | Three Flashes |
| 2.3.3 | AAA | Animation from Interactions |

#### Guideline 2.4: Navigable
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 2.4.1 | A | Bypass Blocks |
| 2.4.2 | A | Page Titled |
| 2.4.3 | A | Focus Order |
| 2.4.4 | A | Link Purpose (In Context) |
| 2.4.5 | AA | Multiple Ways |
| 2.4.6 | AA | Headings and Labels |
| 2.4.7 | AA | Focus Visible |
| 2.4.8 | AAA | Location |
| 2.4.9 | AAA | Link Purpose (Link Only) |
| 2.4.10 | AAA | Section Headings |
| 2.4.11 | AA | Focus Not Obscured (Minimum) |
| 2.4.12 | AAA | Focus Not Obscured (Enhanced) |
| 2.4.13 | AAA | Focus Appearance |

#### Guideline 2.5: Input Modalities
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 2.5.1 | A | Pointer Gestures |
| 2.5.2 | A | Pointer Cancellation |
| 2.5.3 | A | Label in Name |
| 2.5.4 | A | Motion Actuation |
| 2.5.5 | AAA | Target Size (Enhanced) |
| 2.5.6 | A | Concurrent Input Mechanisms |
| 2.5.7 | AA | Dragging Movements |
| 2.5.8 | AA | Target Size (Minimum) |

### Principle 3: Understandable (Begriplig)

#### Guideline 3.1: Readable
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 3.1.1 | A | Language of Page |
| 3.1.2 | AA | Language of Parts |
| 3.1.3 | AAA | Unusual Words |
| 3.1.4 | AAA | Abbreviations |
| 3.1.5 | AAA | Reading Level |
| 3.1.6 | AAA | Pronunciation |

#### Guideline 3.2: Predictable
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 3.2.1 | A | On Focus |
| 3.2.2 | A | On Input |
| 3.2.3 | AA | Consistent Navigation |
| 3.2.4 | AA | Consistent Identification |
| 3.2.5 | AAA | Change on Request |
| 3.2.6 | A | Consistent Help |

#### Guideline 3.3: Input Assistance
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 3.3.1 | A | Error Identification |
| 3.3.2 | A | Labels or Instructions |
| 3.3.3 | AA | Error Suggestion |
| 3.3.4 | AA | Error Prevention (Legal, Financial, Data) |
| 3.3.5 | AAA | Help |
| 3.3.6 | AAA | Error Prevention (All) |
| 3.3.7 | A | Redundant Entry |
| 3.3.8 | AA | Accessible Authentication (Minimum) |
| 3.3.9 | AAA | Accessible Authentication (Enhanced) |

### Principle 4: Robust (Robust)

#### Guideline 4.1: Compatible
| Kriterium | Nivå | Beskrivning |
|-----------|------|-------------|
| 4.1.1 | A | Parsing (Obsolete in 2.2) |
| 4.1.2 | A | Name, Role, Value |
| 4.1.3 | AA | Status Messages |

---

## WCAG-EM 5-Stegs Metodologi

### Steg 1: Definiera Scope

**UI-sektion: "Projektinställningar"**

| Fält | Typ | Beskrivning |
|------|-----|-------------|
| `project_name` | text | Projektnamn |
| `website_scope` | text | Webbplatsens scope (URL-mönster, domäner) |
| `conformance_target` | enum | A, AA, eller AAA |
| `baseline_browsers` | json | Webbläsare/AT som ska stödjas |
| `additional_requirements` | text | Övriga krav från beställare |

### Steg 2: Utforska Webbplatsen

**UI-sektion: "Webbplatsöversikt"**

| Fält | Typ | Beskrivning |
|------|-----|-------------|
| `common_pages` | json[] | Vanliga sidor (startsida, kontakt, etc.) |
| `essential_functionality` | json[] | Kritiska funktioner (köp, registrering) |
| `page_types` | json[] | Sidtyper (listning, artikel, formulär) |
| `technologies` | json[] | Teknologier (HTML, CSS, JS, ARIA, PDF) |

### Steg 3: Välj Representativt Urval

**UI-sektion: "Sidurval"**

| Fält | Typ | Beskrivning |
|------|-----|-------------|
| `structured_sample` | json[] | Strukturerat urval |
| `random_sample` | json[] | Slumpmässigt urval (10% av strukturerat) |
| `complete_processes` | json[] | Kompletta flöden (multi-step) |
| `selection_method` | text | Beskrivning av urvalsmetod |

### Steg 4: Granska Urvalet

**UI-sektion: "Evaluering"**

För varje sida × varje kriterium:

| Fält | Typ | Värden |
|------|-----|--------|
| `status` | enum | `passed`, `failed`, `not_applicable`, `not_checked` |
| `observations` | text | Observationer |
| `evidence` | json | Skärmdumpar, kodsnuttar |
| `ai_analysis` | json | AI-genererad analys |

### Steg 5: Rapportera Resultat

**UI-sektion: "Rapport"**

| Output | Format |
|--------|--------|
| PDF-rapport | WCAG-EM compliant |
| JSON-export | Maskinläsbar |
| EARL-format | W3C standard |
| Sammanfattning | Dashboard |

---

## Supabase Databasschema

### Tabeller

```sql
-- WCAG Criteria Reference (seed data)
CREATE TABLE wcag_criteria (
  id TEXT PRIMARY KEY,                    -- "1.1.1"
  principle INTEGER NOT NULL,             -- 1-4
  guideline TEXT NOT NULL,                -- "1.1"
  level TEXT NOT NULL CHECK (level IN ('A', 'AA', 'AAA')),
  name_en TEXT NOT NULL,
  name_sv TEXT NOT NULL,
  description_en TEXT,
  description_sv TEXT,
  understanding_url TEXT,                 -- W3C Understanding doc
  techniques_url TEXT,                    -- W3C Techniques
  test_rules JSON,                        -- Array of test rule URLs
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Techniques Reference (seed data)
CREATE TABLE wcag_techniques (
  id TEXT PRIMARY KEY,                    -- "H44", "ARIA1", "G1"
  category TEXT NOT NULL,                 -- "html", "aria", "css", etc.
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  criteria_ids TEXT[],                    -- Which criteria this helps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  website_scope TEXT NOT NULL,
  conformance_target TEXT DEFAULT 'AA',
  baseline_config JSON,
  additional_requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evaluations (en per utvärderingstillfälle)
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT,                              -- "Initial audit", "Post-fix review"
  status TEXT DEFAULT 'draft',            -- draft, in_progress, completed
  common_pages JSON,
  essential_functionality JSON,
  page_types JSON,
  technologies JSON,
  structured_sample JSON,
  random_sample JSON,
  complete_processes JSON,
  selection_method TEXT,
  evaluator_name TEXT,
  evaluator_org TEXT,
  commissioner_name TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages in evaluation
CREATE TABLE evaluation_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  page_type TEXT,                         -- "homepage", "article", "form", etc.
  sample_type TEXT,                       -- "structured", "random", "process"
  html_snapshot TEXT,                     -- Cached HTML at evaluation time
  screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Results per page per criterion
CREATE TABLE evaluation_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  page_id UUID REFERENCES evaluation_pages(id) ON DELETE CASCADE,
  criterion_id TEXT REFERENCES wcag_criteria(id),
  status TEXT NOT NULL DEFAULT 'not_checked',  -- passed, failed, not_applicable, not_checked
  severity TEXT,                          -- critical, serious, moderate, minor
  observations TEXT,
  evidence JSON,                          -- { screenshots: [], code_snippets: [] }
  ai_analysis JSON,                       -- { summary: "", suggestions: [], confidence: 0.0-1.0 }
  technique_ids TEXT[],                   -- Relevant techniques
  manual_override BOOLEAN DEFAULT FALSE,  -- If human overrode AI
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(evaluation_id, page_id, criterion_id)
);

-- Audit log for changes
CREATE TABLE evaluation_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,                   -- "created", "updated", "status_changed"
  entity_type TEXT,                       -- "result", "page", "evaluation"
  entity_id UUID,
  old_value JSON,
  new_value JSON,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  format TEXT NOT NULL,                   -- "pdf", "json", "earl", "html"
  file_url TEXT,
  public_share_id TEXT UNIQUE,            -- For shareable links
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_results_evaluation ON evaluation_results(evaluation_id);
CREATE INDEX idx_results_criterion ON evaluation_results(criterion_id);
CREATE INDEX idx_results_status ON evaluation_results(status);
CREATE INDEX idx_pages_evaluation ON evaluation_pages(evaluation_id);
CREATE INDEX idx_evaluations_project ON evaluations(project_id);
```

### Row Level Security (RLS)

```sql
-- Users can only see their own projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- Cascade to evaluations
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own evaluations" ON evaluations
  FOR ALL USING (
    project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
  );

-- Public reports accessible via share_id
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reports viewable" ON reports
  FOR SELECT USING (public_share_id IS NOT NULL);
```

---

## API Struktur

### REST Endpoints

```
# Auth
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout

# Projects
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id

# Evaluations
GET    /api/projects/:projectId/evaluations
POST   /api/projects/:projectId/evaluations
GET    /api/evaluations/:id
PUT    /api/evaluations/:id
DELETE /api/evaluations/:id

# Pages
GET    /api/evaluations/:evalId/pages
POST   /api/evaluations/:evalId/pages
POST   /api/evaluations/:evalId/pages/bulk
DELETE /api/evaluations/:evalId/pages/:pageId

# Results
GET    /api/evaluations/:evalId/results
GET    /api/evaluations/:evalId/results/summary
PUT    /api/evaluations/:evalId/results/:resultId
POST   /api/evaluations/:evalId/results/bulk-update

# AI Analysis
POST   /api/analyze/url
POST   /api/analyze/code
POST   /api/analyze/image
POST   /api/analyze/page/:pageId    # Full page analysis

# WCAG Reference
GET    /api/wcag/criteria
GET    /api/wcag/criteria/:id
GET    /api/wcag/techniques
GET    /api/wcag/techniques/:id

# Reports
POST   /api/evaluations/:evalId/reports
GET    /api/reports/:shareId         # Public access
```

---

## UI/UX Design

### Information Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      WCAG AI Auditor                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Dashboard │  │ Projects │  │ WCAG Ref │  │ Settings │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PROJEKT-VY                                                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Steg 1      Steg 2      Steg 3      Steg 4      Steg 5 │ │
│  │  ○───────────○───────────●───────────○───────────○      │ │
│  │  Scope       Utforska    Urval       Granska     Rapport │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
│  AKTUELL SEKTION (Steg 3: Urval)                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  + Lägg till sidor                                       │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ □  https://example.com/             Homepage      │   │ │
│  │  │ □  https://example.com/about        Article       │   │ │
│  │  │ □  https://example.com/contact      Form          │   │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │                                                          │ │
│  │  [AI-generera urval]  [Manuellt urval]                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Evaluerings-Grid (Steg 4)

```
┌────────────────────────────────────────────────────────────────────┐
│  WCAG 2.2 AA Evaluering - Project X                                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Filter: [All] [Passed] [Failed] [N/A] [Untested]                  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Kriterium          │ Sida 1  │ Sida 2  │ Sida 3  │ Sammanf. │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ 1.1.1 Non-text     │   ✓     │   ✓     │   ✗     │  2/3     │  │
│  │ 1.3.1 Info & Rel.  │   ✓     │   ✓     │   ✓     │  3/3     │  │
│  │ 1.4.3 Contrast     │   ✗     │   ✓     │   ✗     │  1/3     │  │
│  │ 2.1.1 Keyboard     │   ✓     │   —     │   ✓     │  2/2     │  │
│  │ ...                                                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Klicka på cell för detaljer                                       │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

### Kriterium-Detaljvy

```
┌────────────────────────────────────────────────────────────────────┐
│  1.4.3 Contrast (Minimum) - Level AA                               │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STATUS: [❌ Failed] [✓ Passed] [— N/A] [? Untested]              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ AI-ANALYS                                              🤖   │   │
│  │                                                              │   │
│  │ Hittade 3 kontrast-problem:                                 │   │
│  │ • Grå text (#888) på vit bakgrund: 3.5:1 (kräver 4.5:1)    │   │
│  │ • Placeholder-text: 2.1:1                                   │   │
│  │ • Footer-länkar: 3.8:1                                      │   │
│  │                                                              │   │
│  │ Confidence: 94%                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ OBSERVATIONER                                                │   │
│  │ [Textarea för manuella anteckningar]                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ BEVIS                                                        │   │
│  │ 📷 [Ladda upp skärmdump]                                    │   │
│  │ 💻 [Lägg till kodsnutt]                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ W3C RESURSER                                          🔗    │   │
│  │                                                              │   │
│  │ • Understanding 1.4.3 (Contrast)                            │   │
│  │ • Technique G18: 4.5:1 contrast                             │   │
│  │ • Technique G145: 3:1 for large text                        │   │
│  │ • Failure F24: Background image without fallback            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [Spara]  [Spara & Nästa]  [Avbryt]                                │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## Teknisk Arkitektur

```
┌─────────────────────────────────────────────────────────────────────┐
│                            FRONTEND                                  │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Next.js 16 (App Router)                  │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │    │
│  │  │Dashboard │  │Evaluation│  │  WCAG    │  │  Report  │    │    │
│  │  │   Page   │  │  Wizard  │  │Reference │  │Generator │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │    │
│  │                                                              │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │              shadcn/ui + Tailwind CSS                 │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │     API Routes        │
                    │   (Next.js Edge)      │
                    └───────────┬───────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    Supabase     │   │    Groq API     │   │   W3C APIs      │
│  ┌───────────┐  │   │                 │   │  (Read-only)    │
│  │ PostgreSQL│  │   │ • llama-3.3    │   │                 │
│  │ Database  │  │   │ • llama-3.2    │   │ • WCAG specs   │
│  ├───────────┤  │   │   (vision)     │   │ • Understanding │
│  │   Auth    │  │   │                 │   │ • Techniques   │
│  ├───────────┤  │   └─────────────────┘   └─────────────────┘
│  │  Storage  │  │
│  │  (files)  │  │
│  └───────────┘  │
└─────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| State | Zustand / React Query |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| AI | Groq SDK (Llama 3.3 + 3.2 Vision) |
| PDF | @react-pdf/renderer |
| Charts | Recharts |
| Deployment | Vercel |

---

## User Stories (Epic Breakdown)

### Epic 1: Projekthantering

```
US-101: Som användare vill jag skapa ett nytt projekt med namn och scope
US-102: Som användare vill jag välja conformance target (A/AA/AAA)
US-103: Som användare vill jag definiera baseline-konfiguration
US-104: Som användare vill jag se alla mina projekt i en dashboard
US-105: Som användare vill jag arkivera gamla projekt
```

### Epic 2: WCAG-EM Steg 1-3 (Setup)

```
US-201: Som användare vill jag dokumentera webbplatsens scope
US-202: Som användare vill jag lista vanliga sidor och funktioner
US-203: Som användare vill jag lägga till sidor till mitt urval
US-204: Som användare vill jag använda AI för att generera urval
US-205: Som användare vill jag definiera multi-step flöden
```

### Epic 3: Evaluering (Steg 4)

```
US-301: Som användare vill jag se alla WCAG-kriterier i en grid
US-302: Som användare vill jag köra AI-analys på en sida
US-303: Som användare vill jag manuellt ange status per kriterium
US-304: Som användare vill jag lägga till observationer och bevis
US-305: Som användare vill jag se W3C-resurser för varje kriterium
US-306: Som användare vill jag filtrera på status/level/guideline
US-307: Som användare vill jag se progress (X/86 utvärderade)
```

### Epic 4: Rapportering (Steg 5)

```
US-401: Som användare vill jag generera PDF-rapport
US-402: Som användare vill jag exportera i EARL-format
US-403: Som användare vill jag dela rapport via publik länk
US-404: Som användare vill jag se sammanfattnings-dashboard
US-405: Som användare vill jag jämföra utvärderingar över tid
```

### Epic 5: WCAG Kunskapsbas

```
US-501: Som användare vill jag bläddra alla WCAG-kriterier
US-502: Som användare vill jag läsa Understanding-dokumentation
US-503: Som användare vill jag hitta relevanta tekniker
US-504: Som användare vill jag söka i WCAG-dokumentationen
```

### Epic 6: AI-Funktioner

```
US-601: Som användare vill jag få AI-förslag på status
US-602: Som användare vill jag se AI:s confidence-score
US-603: Som användare vill jag kunna överrida AI med manuellt val
US-604: Som användare vill jag få konkreta fix-förslag med kod
US-605: Som användare vill jag analysera skärmdumpar med vision AI
```

---

## Prioritering (MoSCoW)

### Must Have (P0) - v2.0

- [ ] Supabase-integration (auth, database)
- [ ] Projekt CRUD
- [ ] Evaluering med alla 86 kriterier
- [ ] Status per kriterium (Pass/Fail/N/A/Untested)
- [ ] AI-analys per sida
- [ ] WCAG-kriterielista med nivåer
- [ ] Enkel rapport-vy
- [ ] Spara/ladda utvärderingar

### Should Have (P1) - v2.1

- [ ] WCAG-EM 5-stegs wizard
- [ ] W3C Understanding-länkar
- [ ] W3C Techniques-länkar
- [ ] PDF-export
- [ ] Delbar rapport-länk
- [ ] Jämförelse mellan utvärderingar
- [ ] Dashboard med trender

### Could Have (P2) - v2.2

- [ ] EARL-export
- [ ] Multi-user samarbete
- [ ] Kommentarer på resultat
- [ ] Notifieringar vid ändringar
- [ ] Integrationer (Jira, GitHub)
- [ ] Chrome extension

### Won't Have (this version)

- CI/CD pipeline integration
- White-label/enterprise
- Custom WCAG-kriterier
- Automatisk crawling av hela sajter

---

## Implementation Plan

### Iteration 1-2: Supabase Setup

- Initiera Supabase-projekt
- Skapa databasschema
- Seed WCAG-kriterier (86 st)
- Seed Techniques (100+ st)
- Setup auth

### Iteration 3-4: Projekt & Evaluering CRUD

- Projekt-sidor (lista, skapa, redigera)
- Evaluering-modell
- Sidor-hantering
- Grundläggande resultat-vy

### Iteration 5-6: Evaluerings-Grid

- Grid-vy med alla kriterier
- Status-toggle per cell
- Filter och sökning
- Progress-indikator

### Iteration 7-8: AI Integration

- Koppla AI-analys till evaluering
- Visa AI-resultat per kriterium
- Override-funktion
- Confidence-visning

### Iteration 9-10: Rapport & Polish

- Rapport-generator
- PDF-export
- Delbar länk
- Dashboard
- UX-polish

---

## Risker & Mitigering

| Risk | Sannolikhet | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase-prestanda | Låg | Hög | Indexering, caching |
| AI-hallucinationer | Medium | Medium | Confidence-score, manuell override |
| WCAG-uppdateringar | Låg | Medium | Versionerad data, migration-plan |
| Komplexitet för användare | Medium | Hög | Quick-start mode, tutorials |
| Kostnad Groq | Medium | Låg | Rate limiting, caching |

---

## Success Metrics

| KPI | Mål (6 mån) |
|-----|-------------|
| Registrerade användare | 500+ |
| Genomförda utvärderingar | 2000+ |
| AI-accuracy vs manuell | >85% |
| Time-to-first-evaluation | <5 min |
| NPS | >50 |
| Returning users (weekly) | >40% |

---

## Appendix

### A. WCAG 2.2 Kriterium-statistik

- **Totalt:** 86 kriterier
- **Level A:** 30 kriterier
- **Level AA:** 24 kriterier (A+AA = 54)
- **Level AAA:** 32 kriterier

### B. W3C Resurslänkar

```
Understanding WCAG 2.2:
https://www.w3.org/WAI/WCAG22/Understanding/

Techniques:
https://www.w3.org/WAI/WCAG22/Techniques/

Quick Reference:
https://www.w3.org/WAI/WCAG22/quickref/

WCAG-EM:
https://www.w3.org/TR/WCAG-EM/
```

### C. Supabase Setup Commands

```bash
# Install Supabase CLI
npm install -g supabase

# Init project
supabase init

# Start local dev
supabase start

# Generate types
supabase gen types typescript --local > src/types/supabase.ts

# Push schema
supabase db push
```

---

## Nästa Steg

1. **Review PRD** med stakeholders
2. **Supabase-projekt** setup
3. **Ralph-loop 10 iterationer** för implementation
4. **User testing** efter iteration 5
5. **Soft launch** efter iteration 10
