# Implementationsplan: WCAG AI Auditor

## Iteration 1-2: Projektsetup & Grundstruktur
- [x] Skapa Next.js 14 projekt med App Router
- [x] Konfigurera Tailwind CSS + shadcn/ui
- [x] Sätt upp basic layout med header/footer
- [x] Skapa tab-navigation (URL / Kod / Skärmdump)

## Iteration 3-4: Input-komponenter
- [x] URL-input med validering
- [x] Kod-textarea med syntax highlighting (prism/shiki)
- [x] Drag-and-drop screenshot upload
- [x] Loading states & animations

## Iteration 5-6: AI Integration
- [x] Groq SDK setup
- [x] API route för text-analys (`/api/analyze/code`)
- [x] API route för URL-fetch + analys (`/api/analyze/url`)
- [x] API route för vision-analys (`/api/analyze/image`)
- [x] WCAG-specifik prompt engineering

## Iteration 7-8: Resultat-UI
- [x] IssueCard komponent med severity badges
- [x] Expanderbar detalj-vy per issue
- [x] Kod-snippets för fix-förslag
- [x] Sammanfattnings-score överst
- [x] Filter/sortering på severity

## Iteration 9-10: Polish & Export
- [x] LocalStorage för historik
- [x] Microinteractions & animationer
- [x] Loading skeleton
- [x] Accessibility audit av verktyget självt
- [ ] PDF-export (P1 feature)
- [ ] Deployment till Vercel (kräver GROQ_API_KEY)

---

## Tekniska Beslut

### Prompt Engineering för WCAG
```
Analysera följande HTML/CSS för WCAG 2.1 AA brott.
För varje issue, returnera JSON:
{
  "issues": [{
    "criterion": "1.4.3",
    "title": "Contrast Minimum",
    "severity": "serious",
    "element": "<button class='...'/>",
    "description": "Kontrast 2.8:1, krav 4.5:1",
    "fix": "Ändra bakgrund till #1a1a1a"
  }]
}
```

### Severity Levels
- **Critical:** Blockerar användning helt
- **Serious:** Allvarlig barriär
- **Moderate:** Påverkar upplevelsen
- **Minor:** Mindre problem

### Färgschema (tillgängligt)
- Primary: #2563eb (blue-600)
- Critical: #dc2626 (red-600)
- Serious: #ea580c (orange-600)
- Moderate: #ca8a04 (yellow-600)
- Minor: #16a34a (green-600)

---

## Status

**Iteration 1 klar** - Projektet bygger och alla features implementerade:

### Klar
- Next.js 16 + Tailwind + shadcn/ui setup
- Header med logo och navigation
- Footer med disclaimer
- 3-tabs input: URL, Kod, Skärmdump
- URL-validering och fetch
- Kod-textarea med exempelkod
- Drag-and-drop screenshot upload
- Groq API integration (llama-3.3-70b + vision)
- WCAG-fokuserade prompts
- Resultat-vy med score och filter
- IssueCard med expanderbar detalj-vy
- Severity badges med färgkodning
- Responsiv design
- WCAG AA-kompatibel UI

### Kvar för framtida iterationer
- PDF-export
- Historik i localStorage
- Dela-länk
