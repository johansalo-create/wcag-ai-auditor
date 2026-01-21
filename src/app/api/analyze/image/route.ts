import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";
import { WCAG_IMAGE_PROMPT } from "@/lib/wcag-prompt";
import type { AnalysisResult } from "@/types/wcag";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Bild krävs för analys" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY är inte konfigurerad" },
        { status: 500 }
      );
    }

    // Extract base64 data (remove data URL prefix if present)
    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.2-90b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: WCAG_IMAGE_PROMPT,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Data}`,
              },
            },
          ],
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
        summary: "Kunde inte analysera bilden fullständigt.",
        issues: [],
      };
    }

    const result: AnalysisResult = {
      score: analysisData.score || 50,
      summary: analysisData.summary || "",
      issues: analysisData.issues || [],
      analyzedAt: new Date().toISOString(),
      inputType: "image",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Image analysis error:", error);
    return NextResponse.json(
      { error: "Ett fel uppstod vid bildanalys" },
      { status: 500 }
    );
  }
}
