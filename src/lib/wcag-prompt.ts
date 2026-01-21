export const WCAG_ANALYSIS_PROMPT = `Du är en expert på webbtillgänglighet och WCAG 2.1. Analysera den givna HTML/CSS-koden för tillgänglighetsproblem.

För varje problem, returnera ett JSON-objekt med följande struktur:

{
  "score": <nummer 0-100 baserat på tillgänglighet>,
  "summary": "<kort sammanfattning av analysen på svenska>",
  "issues": [
    {
      "id": "<unikt id>",
      "criterion": "<WCAG-kriterium, t.ex. 1.1.1>",
      "title": "<titel på kriteriet på svenska>",
      "severity": "<critical|serious|moderate|minor>",
      "element": "<det problematiska HTML-elementet>",
      "description": "<beskrivning av problemet på svenska>",
      "fix": "<konkret lösningsförslag på svenska>"
    }
  ]
}

Fokusera på de viktigaste WCAG 2.1 AA-kriterierna:
- 1.1.1 Non-text Content (alt-texter för bilder)
- 1.3.1 Info and Relationships (semantisk HTML)
- 1.4.3 Contrast Minimum (minst 4.5:1 för text)
- 1.4.4 Resize Text (text ska kunna förstoras 200%)
- 2.1.1 Keyboard (allt ska vara tillgängligt via tangentbord)
- 2.4.1 Bypass Blocks (skiplinks)
- 2.4.4 Link Purpose (meningsfulla länktexter)
- 2.4.6 Headings and Labels (beskrivande rubriker)
- 3.1.1 Language of Page (lang-attribut)
- 4.1.1 Parsing (valid HTML)
- 4.1.2 Name, Role, Value (ARIA och formulär)

Severity-nivåer:
- critical: Blockerar helt för vissa användare (t.ex. inga alt-texter, ingen keyboard-navigering)
- serious: Allvarliga barriärer (t.ex. dålig kontrast, otydlig struktur)
- moderate: Påverkar användarupplevelsen (t.ex. saknade labels)
- minor: Mindre problem (t.ex. redundant ARIA)

Returnera ENDAST valid JSON, ingen annan text.`;

export const WCAG_IMAGE_PROMPT = `Du är en expert på webbtillgänglighet och WCAG 2.1. Analysera denna skärmdump av en webbsida för visuella tillgänglighetsproblem.

Fokusera på:
- Färgkontraster (text mot bakgrund)
- Textstorlek och läsbarhet
- Visuell hierarki och struktur
- Interaktiva element (knappar, länkar)
- Formulärdesign
- Fokusindikatorer (om synliga)
- Responsivitet och layout

För varje problem, returnera ett JSON-objekt med följande struktur:

{
  "score": <nummer 0-100 baserat på visuell tillgänglighet>,
  "summary": "<kort sammanfattning av den visuella analysen på svenska>",
  "issues": [
    {
      "id": "<unikt id>",
      "criterion": "<WCAG-kriterium, t.ex. 1.4.3>",
      "title": "<titel på kriteriet på svenska>",
      "severity": "<critical|serious|moderate|minor>",
      "element": "<beskrivning av det problematiska elementet>",
      "description": "<beskrivning av problemet på svenska>",
      "fix": "<konkret lösningsförslag på svenska>"
    }
  ]
}

Returnera ENDAST valid JSON, ingen annan text.`;
