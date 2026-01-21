# PRD: WCAG AI Auditor

## Översikt

**Produkt:** WCAG AI Auditor
**Tagline:** AI-driven tillgänglighetsanalys på sekunder
**Datum:** 2026-01-21
**Författare:** Johan Salo / @product-manager

## Problem

Nuvarande WCAG-EM Report Tool från W3C är:
- **Manuellt:** Kräver att användaren manuellt går igenom varje kriterie (78+ kriterier för AA)
- **Tidskrävande:** En fullständig audit tar dagar/veckor
- **Expertkrävande:** Förutsätter djup WCAG-kunskap
- **Ingen AI:** Ingen automatisk analys eller förslag

## Lösning

En AI-driven web-app som automatiskt analyserar tillgänglighet via:
1. **URL-input** → Crawla och analysera live-sidor
2. **Kod-paste** → Analysera HTML/CSS/JS direkt
3. **Skärmdump** → Visuell analys med multimodal AI

**AI-backend:** Groq (snabb, billig inference med Llama/Mixtral)

## Målgrupp

| Persona | Behov |
|---------|-------|
| **Utvecklare** | Snabb check innan deploy |
| **Designers** | Validera kontraster, hierarki |
| **Projektledare** | Översiktlig rapport för kund |
| **QA** | Del av testflöde |

## User Stories

### Epic 1: Input
- Som användare vill jag kunna **klistra in en URL** och få en automatisk analys
- Som användare vill jag kunna **dra-och-släppa en skärmdump** för visuell analys
- Som användare vill jag kunna **klistra in HTML/CSS-kod** för analys

### Epic 2: Analys
- Som användare vill jag se **vilka WCAG-kriterier som bryts**
- Som användare vill jag se **severity rating** (kritisk/allvarlig/mindre)
- Som användare vill jag se **var i koden problemet finns** (rad/element)
- Som användare vill jag få **konkreta fix-förslag** med kod-snippets

### Epic 3: Rapport
- Som användare vill jag kunna **exportera PDF-rapport**
- Som användare vill jag se **sammanfattning med score**
- Som användare vill jag kunna **dela rapport via länk**

## Funktioner (MVP)

### Must Have (P0)
- [x] URL-input med fetch av HTML
- [x] Kod-paste textarea
- [x] Skärmdump upload med vision AI
- [x] AI-analys via Groq API
- [x] Resultat-lista med WCAG-kriterier
- [x] Severity badges (Critical/Serious/Moderate/Minor)
- [x] Konkreta fix-förslag
- [x] Responsiv UI

### Should Have (P1)
- [ ] PDF-export
- [ ] WCAG 2.1 AA/AAA toggle
- [ ] Historik (localStorage)
- [ ] Delbar rapport-länk

### Nice to Have (P2)
- [ ] Chrome extension
- [ ] GitHub Action
- [ ] CI/CD integration
- [ ] Jämför före/efter

## Teknisk Arkitektur

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐                  │
│  │ URL Tab │  │Code Tab │  │ Screenshot  │                  │
│  └────┬────┘  └────┬────┘  └──────┬──────┘                  │
│       │            │              │                          │
│       └────────────┴──────────────┘                          │
│                    │                                         │
│              ┌─────▼─────┐                                   │
│              │  Analyzer  │                                   │
│              │  Service   │                                   │
│              └─────┬─────┘                                   │
└────────────────────┼────────────────────────────────────────┘
                     │
              ┌──────▼──────┐
              │   Groq API   │
              │  (Llama 3)   │
              └──────────────┘
```

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **AI:** Groq SDK (llama-3.3-70b-versatile + llama-3.2-90b-vision)
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

### API Routes
```
POST /api/analyze/url     → Fetch + analyze HTML
POST /api/analyze/code    → Analyze raw HTML/CSS
POST /api/analyze/image   → Vision AI analysis
GET  /api/report/:id      → Get saved report
```

## UI/UX Principer

1. **En-steg-input:** Ingen wizard, direkt resultat
2. **Progressiv disclosure:** Expandera för detaljer
3. **Actionable:** Varje issue har fix-förslag
4. **Tillgänglig själv:** Verktyget ska vara WCAG AAA

## Konkurrensfördel vs WCAG-EM Tool

| Feature | WCAG-EM Tool | WCAG AI Auditor |
|---------|--------------|-----------------|
| AI-analys | ❌ | ✅ |
| Automatisk crawl | ❌ | ✅ |
| Skärmdump-analys | ❌ | ✅ |
| Fix-förslag | ❌ | ✅ |
| Tid för audit | Dagar | Sekunder |
| Expertis krävs | Hög | Låg |

## Mätetal (KPIs)

- **Tid till första resultat:** < 10 sekunder
- **Accuracy:** > 85% vs manuell audit
- **NPS:** > 40
- **Weekly Active Users:** 1000+ (6 mån)

## Risker

| Risk | Mitigation |
|------|------------|
| AI-hallucinationer | Tydliga disclaimers, länka till WCAG-docs |
| CORS vid URL-fetch | Serverside proxy |
| Groq rate limits | Fallback till OpenAI |
| Bildanalys osäker | Kombinera med HTML-analys |

## Roadmap

### Fas 1: MVP (Vecka 1-2)
- Grundläggande UI
- URL/Kod/Screenshot input
- Groq-integration
- Resultat-lista

### Fas 2: Polish (Vecka 3-4)
- PDF-export
- Rapport-delning
- Förbättrad UX

### Fas 3: Growth (Månad 2+)
- Chrome extension
- GitHub integration
- Enterprise features

## Appendix

### WCAG 2.1 AA Kriterier (Viktigaste)
1. 1.1.1 Non-text Content (bilder, ikoner)
2. 1.4.3 Contrast Minimum (4.5:1)
3. 1.4.4 Resize Text (200%)
4. 2.1.1 Keyboard (allt via tangentbord)
5. 2.4.4 Link Purpose
6. 3.1.1 Language of Page
7. 4.1.2 Name, Role, Value (ARIA)

### Groq Modeller
- `llama-3.3-70b-versatile` - Textanalys
- `llama-3.2-90b-vision-preview` - Bildanalys (skärmdumpar)

### Referenser
- [WCAG-EM Report Tool](https://www.w3.org/WAI/eval/report-tool/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Groq API](https://console.groq.com/)
