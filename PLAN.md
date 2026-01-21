# WCAG AI Auditor v2.0 - Implementation Plan

## Version History

| Version | Status | Datum |
|---------|--------|-------|
| v1.0 (MVP) | ✅ Klar | 2026-01-21 |
| v2.0 (Enterprise) | 🚧 Pågående | 2026-01-21 |

---

## V1.0 MVP (KLAR)

- ✅ Next.js 16 + Tailwind + shadcn/ui setup
- ✅ Header, Footer, 3-tabs input
- ✅ URL/Kod/Screenshot input
- ✅ Groq API integration
- ✅ Resultat-vy med severity badges
- ✅ Accessibility audit av verktyget

---

## V2.0 Enterprise - 10 Iterationer

### Mål

Transformera MVP till WCAG-EM-compliant plattform med:
- Supabase-databas med alla 86 WCAG 2.2-kriterier
- Projekt- och evalueringshantering
- Per-kriterium status tracking (Pass/Fail/N/A/Untested)
- W3C-resurslänkning (Understanding docs, Techniques)
- AI-assisterad analys med manuell override
- Professionella rapporter

---

## Iteration 1: Supabase Foundation

### Tasks
- [ ] Skapa Supabase-projekt på supabase.com
- [ ] Hämta credentials (URL, ANON_KEY, SERVICE_ROLE_KEY)
- [ ] Installera: `npm install @supabase/supabase-js @supabase/ssr`
- [ ] Skapa `src/lib/supabase/client.ts`
- [ ] Skapa `src/lib/supabase/server.ts`
- [ ] Lägg till miljövariabler i `.env.local` och Vercel
- [ ] Skapa SQL-schema för `wcag_criteria` tabell
- [ ] Skapa seed-data fil `src/data/wcag-criteria.json` (alla 86 kriterier)
- [ ] Kör seed i Supabase SQL Editor
- [ ] Verifiera med `supabase.from('wcag_criteria').select('*')`
- [ ] Generera TypeScript-typer

### Schema: wcag_criteria
```sql
CREATE TABLE wcag_criteria (
  id TEXT PRIMARY KEY,                    -- "1.1.1"
  principle INTEGER NOT NULL,             -- 1-4
  guideline TEXT NOT NULL,                -- "1.1"
  level TEXT NOT NULL,                    -- 'A', 'AA', 'AAA'
  name_en TEXT NOT NULL,
  name_sv TEXT NOT NULL,
  description_en TEXT,
  description_sv TEXT,
  understanding_url TEXT,
  techniques_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Deliverables
- Fungerande Supabase-anslutning
- 86 WCAG-kriterier i databasen
- TypeScript-typer genererade

---

## Iteration 2: Auth & User Management

### Tasks
- [ ] Konfigurera Supabase Auth (email/password)
- [ ] Skapa auth middleware `src/middleware.ts`
- [ ] Skapa `(auth)` route group
- [ ] `/login` page med formulär
- [ ] `/signup` page med formulär
- [ ] Auth context/provider
- [ ] Logout-funktion i header
- [ ] Protected routes för dashboard
- [ ] User avatar/dropdown i header

### Deliverables
- Inloggning/registrering fungerar
- Skyddade routes
- User session management

---

## Iteration 3: Projects CRUD

### Tasks
- [ ] Skapa `projects` tabell
- [ ] RLS policies (users see own projects)
- [ ] Skapa `(dashboard)` layout
- [ ] `/projects` - lista alla projekt
- [ ] `/projects/new` - skapa projekt
  - Namn, scope, conformance target (A/AA/AAA)
- [ ] `/projects/[id]` - projekt-detaljer
- [ ] Redigera/radera projekt
- [ ] Tom-state för inga projekt

### Schema: projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  website_scope TEXT NOT NULL,
  conformance_target TEXT DEFAULT 'AA',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);
```

### Deliverables
- Skapa och lista projekt
- Projekt-detaljsida

---

## Iteration 4: Evaluations & Pages

### Tasks
- [ ] Skapa `evaluations` tabell
- [ ] Skapa `evaluation_pages` tabell
- [ ] `/projects/[id]/evaluations` - lista evalueringar
- [ ] `/projects/[id]/evaluations/new` - skapa evaluering
- [ ] `/evaluations/[id]` - huvudvy
- [ ] Lägg till sidor via URL-input
- [ ] Visa lista av sidor i evaluering
- [ ] Ta bort sida från evaluering

### Schema: evaluations + evaluation_pages
```sql
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT,
  status TEXT DEFAULT 'draft',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE evaluation_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  page_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Deliverables
- Skapa evalueringar inom projekt
- Lägga till/ta bort sidor

---

## Iteration 5: WCAG Criteria Grid

### Tasks
- [ ] Skapa `evaluation_results` tabell
- [ ] Hämta alla kriterier för vald conformance level
- [ ] Skapa `<EvaluationGrid />` komponent
- [ ] Grid: rader = kriterier, kolumner = sidor
- [ ] Status-ikoner (✓ ✗ — ?)
- [ ] Filtrera på level (A/AA/AAA)
- [ ] Filtrera på principle (1/2/3/4)
- [ ] Filtrera på status (passed/failed/na/untested)
- [ ] Progress-indikator (X/Y utvärderade)
- [ ] Klickbar cell för detaljer

### Schema: evaluation_results
```sql
CREATE TABLE evaluation_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  page_id UUID REFERENCES evaluation_pages(id) ON DELETE CASCADE,
  criterion_id TEXT REFERENCES wcag_criteria(id),
  status TEXT DEFAULT 'not_checked',
  severity TEXT,
  observations TEXT,
  ai_analysis JSON,
  manual_override BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(evaluation_id, page_id, criterion_id)
);
```

### Deliverables
- Interaktiv grid med alla kriterier
- Filtrering och progress

---

## Iteration 6: Criterion Detail Modal

### Tasks
- [ ] Skapa `<CriterionDetailModal />` komponent
- [ ] Status-selector (passed/failed/na/untested)
- [ ] Severity-selector (om failed)
- [ ] Observations textarea
- [ ] W3C-länkar:
  - Understanding doc (iframe eller extern)
  - Techniques lista
- [ ] Spara till `evaluation_results`
- [ ] "Spara & Nästa" navigation
- [ ] Keyboard navigation (Escape för stäng)

### Deliverables
- Fullständig kriterium-redigering
- W3C-resurslänkning

---

## Iteration 7: AI Integration v2

### Tasks
- [ ] Refaktorera AI-analys för nya modellen
- [ ] `/api/analyze/page/[pageId]` endpoint
- [ ] Mappa AI-resultat till specifika WCAG-kriterier
- [ ] Spara AI-analys i `evaluation_results.ai_analysis`
- [ ] Visa AI-rekommendation i CriterionDetailModal
- [ ] Confidence-score display (0-100%)
- [ ] "Använd AI-förslag" knapp
- [ ] Manual override flagga
- [ ] Batch-analys av alla sidor

### AI Response Format
```json
{
  "criteria_results": [
    {
      "criterion_id": "1.4.3",
      "status": "failed",
      "confidence": 0.94,
      "severity": "serious",
      "observations": "Grå text (#888) på vit bakgrund har kontrast 3.5:1",
      "suggestions": ["Ändra till #595959 för 4.5:1 kontrast"]
    }
  ]
}
```

### Deliverables
- AI-förslag integrerat i grid
- En-klicks accept/override

---

## Iteration 8: WCAG Reference Browser

### Tasks
- [ ] `/wcag` - WCAG-referenssida
- [ ] Lista alla 86 kriterier grupperade efter principle
- [ ] Sökfunktion (fritextsök)
- [ ] Filter på level
- [ ] `/wcag/[criterionId]` - kriterium-detaljsida:
  - Beskrivning (sv + en)
  - Understanding-länk (embedded?)
  - Relaterade tekniker
  - Vanliga fel (Common Failures)
- [ ] Länk från evaluation grid till referens

### Deliverables
- Inbyggd WCAG-kunskapsbas
- Sökbar referens

---

## Iteration 9: Reports & Sharing

### Tasks
- [ ] Skapa `reports` tabell
- [ ] Sammanfattnings-dashboard för evaluering:
  - Pass/fail per principle (pie chart)
  - Pass/fail per level (bar chart)
  - Totalt score (X%)
- [ ] PDF-export med `@react-pdf/renderer`:
  - Försättsblad med projekt-info
  - Sammanfattning
  - Detaljerad kriterie-lista
  - Fix-förslag
- [ ] Delbar publik länk (`/share/[shareId]`)
- [ ] Jämförelse mellan evalueringar (diff-vy)

### Schema: reports
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  format TEXT NOT NULL,
  file_url TEXT,
  public_share_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Deliverables
- Professionell PDF-rapport
- Delningsfunktion

---

## Iteration 10: Polish & Launch

### Tasks
- [ ] Uppdatera landing page med v2 features
- [ ] Onboarding-flow för nya användare
- [ ] Hjälptexter och tooltips
- [ ] Loading states och skeletons
- [ ] Error boundaries
- [ ] Prestanda-optimering (lazy loading, caching)
- [ ] Accessibility audit av nya komponenter
- [ ] Mobile responsiveness
- [ ] Final deploy till Vercel
- [ ] Uppdatera README och dokumentation

### Deliverables
- Production-ready v2.0
- Dokumentation

---

## Tech Stack

```
Frontend:     Next.js 16, React 19, TypeScript
Styling:      Tailwind CSS v4, shadcn/ui
State:        React Query (TanStack Query)
Database:     Supabase PostgreSQL
Auth:         Supabase Auth
Storage:      Supabase Storage
AI:           Groq (Llama 3.3 + 3.2 Vision)
PDF:          @react-pdf/renderer
Charts:       Recharts
Deploy:       Vercel
```

---

## Miljövariabler

```env
# Befintliga
GROQ_API_KEY=gsk_...

# Nya för v2
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# App
NEXT_PUBLIC_APP_URL=https://wcag-ai-auditor.vercel.app
```

---

## Definition of Done (per iteration)

- [ ] Alla tasks implementerade
- [ ] TypeScript kompilerar utan fel
- [ ] Build passerar (`npm run build`)
- [ ] Grundläggande funktionalitet testad
- [ ] Deployd till Vercel
- [ ] Commit med beskrivande meddelande

---

## Status Tracking

| Iteration | Status | Datum |
|-----------|--------|-------|
| 1. Supabase Foundation | 🟡 Väntar på credentials | 2026-01-21 |
| 2. Auth & Users | ⬜ | - |
| 3. Projects CRUD | ⬜ | - |
| 4. Evaluations & Pages | ⬜ | - |
| 5. WCAG Criteria Grid | ⬜ | - |
| 6. Criterion Detail Modal | ⬜ | - |
| 7. AI Integration v2 | ⬜ | - |
| 8. WCAG Reference Browser | ⬜ | - |
| 9. Reports & Sharing | ⬜ | - |
| 10. Polish & Launch | ⬜ | - |

---

## Iteration 1 Progress

### Klart
- ✅ Installerat @supabase/supabase-js och @supabase/ssr
- ✅ Skapat lib/supabase/client.ts
- ✅ Skapat lib/supabase/server.ts
- ✅ Skapat lib/supabase/middleware.ts
- ✅ Skapat types/supabase.ts (alla tabeller)
- ✅ Skapat supabase/schema.sql (komplett schema med RLS)
- ✅ Skapat supabase/seed-wcag-criteria.sql (alla 86 kriterier)
- ✅ Skapat api/wcag/criteria/route.ts
- ✅ Uppdaterat .env.local.example

### Väntar på
- ⏳ Supabase-projekt credentials från användaren
- ⏳ Köra schema.sql i Supabase
- ⏳ Köra seed-wcag-criteria.sql
