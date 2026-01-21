import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";
import { WCAG_ANALYSIS_PROMPT } from "@/lib/wcag-prompt";
import type { AnalysisResult } from "@/types/wcag";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL krävs för analys" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY är inte konfigurerad" },
        { status: 500 }
      );
    }

    // Fetch HTML from URL
    let html: string;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "WCAG-AI-Auditor/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      html = await response.text();
    } catch (fetchError) {
      return NextResponse.json(
        { error: `Kunde inte hämta URL:en: ${fetchError instanceof Error ? fetchError.message : "Okänt fel"}` },
        { status: 400 }
      );
    }

    // Truncate HTML if too long (keep first 30k chars)
    const truncatedHtml = html.length > 30000 ? html.substring(0, 30000) + "\n<!-- ... truncated -->" : html;

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: WCAG_ANALYSIS_PROMPT,
        },
        {
          role: "user",
          content: `Analysera HTML från ${url} för WCAG 2.1 AA tillgänglighet:\n\n${truncatedHtml}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 4096,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    // Parse JSON from response
    let analysisData;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      analysisData = {
        score: 50,
        summary: "Kunde inte analysera sidan fullständigt.",
        issues: [],
      };
    }

    const result: AnalysisResult = {
      score: analysisData.score || 50,
      summary: analysisData.summary || "",
      issues: analysisData.issues || [],
      analyzedAt: new Date().toISOString(),
      inputType: "url",
      inputSource: url,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Ett fel uppstod vid analys" },
      { status: 500 }
    );
  }
}
