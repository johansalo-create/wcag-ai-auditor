# WCAG AI Auditor

AI-driven tillgänglighetsanalys för webbutvecklare.

## Quick Start

```bash
# Installera dependencies
npm install

# Skapa .env.local med din Groq API-nyckel
cp .env.local.example .env.local
# Redigera .env.local och lägg till din GROQ_API_KEY

# Starta dev-server
npm run dev
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **AI:** Groq SDK (llama-3.3-70b-versatile + llama-3.2-90b-vision)
- **Language:** TypeScript

## Projektstruktur

```
src/
├── app/
│   ├── api/analyze/
│   │   ├── url/route.ts    # URL-analys
│   │   ├── code/route.ts   # Kod-analys
│   │   └── image/route.ts  # Bild-analys (vision)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── analyzer/           # Input-komponenter
│   │   ├── index.tsx
│   │   ├── url-input.tsx
│   │   ├── code-input.tsx
│   │   └── screenshot-input.tsx
│   ├── results/            # Resultat-komponenter
│   │   ├── results-view.tsx
│   │   ├── issue-card.tsx
│   │   ├── score-display.tsx
│   │   ├── severity-badge.tsx
│   │   └── loading-skeleton.tsx
│   ├── ui/                 # shadcn/ui komponenter
│   ├── header.tsx
│   └── footer.tsx
├── lib/
│   ├── groq.ts             # Groq-klient
│   ├── wcag-prompt.ts      # WCAG-prompts
│   └── utils.ts
└── types/
    └── wcag.ts             # TypeScript-typer
```

## Miljövariabler

```env
GROQ_API_KEY=gsk_...  # Hämta från https://console.groq.com
```

## Features

- **URL-analys:** Ange en webbadress, vi hämtar HTML och analyserar
- **Kod-analys:** Klistra in HTML/CSS/JSX direkt
- **Skärmdump-analys:** Dra-och-släpp bild för visuell analys
- **WCAG 2.1 AA:** Fokus på de viktigaste kriterierna
- **Severity rating:** Critical/Serious/Moderate/Minor
- **Fix-förslag:** Konkreta kodförslag för varje issue

## Utveckling

```bash
npm run dev      # Starta dev-server
npm run build    # Bygg för produktion
npm run lint     # Kör linting
```

## Deployment

Projektet är redo för Vercel-deployment. Lägg till `GROQ_API_KEY` som miljövariabel i Vercel.

## PRD

Se fullständig PRD i `.claude/prds/wcag-ai-auditor-prd.md`
