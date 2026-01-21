"use client";

import { useState } from "react";
import { ArrowLeft, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreDisplay } from "./score-display";
import { IssueCard } from "./issue-card";
import type { AnalysisResult, Severity } from "@/types/wcag";

interface ResultsViewProps {
  result: AnalysisResult;
  onBack: () => void;
}

type FilterType = "all" | Severity;

export function ResultsView({ result, onBack }: ResultsViewProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredIssues =
    filter === "all"
      ? result.issues
      : result.issues.filter((issue) => issue.severity === filter);

  const severityCounts = {
    critical: result.issues.filter((i) => i.severity === "critical").length,
    serious: result.issues.filter((i) => i.severity === "serious").length,
    moderate: result.issues.filter((i) => i.severity === "moderate").length,
    minor: result.issues.filter((i) => i.severity === "minor").length,
  };

  const inputTypeLabels = {
    url: "URL-analys",
    code: "Kodanalys",
    image: "Bildanalys",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Ny analys
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportera PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Analysresultat</CardTitle>
              <CardDescription>
                {inputTypeLabels[result.inputType]}
                {result.inputSource && ` · ${result.inputSource}`}
                {" · "}
                {new Date(result.analyzedAt).toLocaleString("sv-SE")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScoreDisplay score={result.score} issueCount={result.issues.length} />

          {result.summary && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">{result.summary}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Hittade problem ({filteredIssues.length})
              </h3>
              <div className="flex gap-1 flex-wrap">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Alla ({result.issues.length})
                </Button>
                {severityCounts.critical > 0 && (
                  <Button
                    variant={filter === "critical" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("critical")}
                    className="text-red-600 dark:text-red-400"
                  >
                    Kritiska ({severityCounts.critical})
                  </Button>
                )}
                {severityCounts.serious > 0 && (
                  <Button
                    variant={filter === "serious" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("serious")}
                    className="text-orange-600 dark:text-orange-400"
                  >
                    Allvarliga ({severityCounts.serious})
                  </Button>
                )}
                {severityCounts.moderate > 0 && (
                  <Button
                    variant={filter === "moderate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("moderate")}
                    className="text-yellow-600 dark:text-yellow-400"
                  >
                    Måttliga ({severityCounts.moderate})
                  </Button>
                )}
                {severityCounts.minor > 0 && (
                  <Button
                    variant={filter === "minor" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("minor")}
                    className="text-green-600 dark:text-green-400"
                  >
                    Mindre ({severityCounts.minor})
                  </Button>
                )}
              </div>
            </div>

            {filteredIssues.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Inga problem hittades med detta filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
