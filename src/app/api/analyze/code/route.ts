import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";
import { WCAG_ANALYSIS_PROMPT } from "@/lib/wcag-prompt";
import type { AnalysisResult } from "@/types/wcag";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Kod krävs för analys" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY är inte konfigurerad" },
        { status: 500 }
      );
    }

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
          content: `Analysera följande kod för WCAG 2.1 AA tillgänglighet:\n\n${code}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 4096,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    // Parse JSON from response
    let analysisData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      // Fallback if parsing fails
      analysisData = {
        score: 50,
        summary: "Kunde inte analysera koden fullständigt.",
        issues: [],
      };
    }

    const result: AnalysisResult = {
      score: analysisData.score || 50,
      summary: analysisData.summary || "",
      issues: analysisData.issues || [],
      analyzedAt: new Date().toISOString(),
      inputType: "code",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Analysfel: ${errorMessage}` },
      { status: 500 }
    );
  }
}
