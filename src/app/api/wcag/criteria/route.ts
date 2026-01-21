import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level"); // A, AA, AAA
  const principle = searchParams.get("principle"); // 1, 2, 3, 4

  try {
    const supabase = await createClient();

    let query = supabase
      .from("wcag_criteria")
      .select("*")
      .order("id", { ascending: true });

    // Filter by level if specified
    if (level) {
      if (level === "AA") {
        query = query.in("level", ["A", "AA"]);
      } else if (level === "AAA") {
        query = query.in("level", ["A", "AA", "AAA"]);
      } else {
        query = query.eq("level", level);
      }
    }

    // Filter by principle if specified
    if (principle) {
      query = query.eq("principle", parseInt(principle));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch WCAG criteria", details: error.message },
        { status: 500 }
      );
    }

    // Group by guideline for easier display
    const grouped = data?.reduce(
      (acc, criterion) => {
        const guideline = criterion.guideline;
        if (!acc[guideline]) {
          acc[guideline] = [];
        }
        acc[guideline].push(criterion);
        return acc;
      },
      {} as Record<string, typeof data>
    );

    return NextResponse.json({
      total: data?.length || 0,
      criteria: data,
      grouped,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
