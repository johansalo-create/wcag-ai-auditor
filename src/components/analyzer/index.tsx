"use client";

import { useState } from "react";
import { Globe, Code, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlInput } from "./url-input";
import { CodeInput } from "./code-input";
import { ScreenshotInput } from "./screenshot-input";
import { ResultsView } from "../results/results-view";
import { LoadingSkeleton } from "../results/loading-skeleton";
import type { AnalysisResult } from "@/types/wcag";

export function Analyzer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Kunde inte analysera URL:en");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
      setIsLoading(false);
    }
  };

  const analyzeCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Kunde inte analysera koden");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
      setIsLoading(false);
    }
  };

  const analyzeImage = async (imageBase64: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Kunde inte analysera bilden");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
      setIsLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  if (isLoading && !result) {
    return <LoadingSkeleton />;
  }

  if (result) {
    return <ResultsView result={result} onBack={clearResult} />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analysera tillgänglighet</CardTitle>
        <CardDescription>
          Välj hur du vill analysera: ange en URL, klistra in kod eller ladda upp en skärmdump.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">URL</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Kod</span>
            </TabsTrigger>
            <TabsTrigger value="screenshot" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Bild</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url">
            <UrlInput onAnalyze={analyzeUrl} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="code">
            <CodeInput onAnalyze={analyzeCode} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="screenshot">
            <ScreenshotInput onAnalyze={analyzeImage} isLoading={isLoading} />
          </TabsContent>
        </Tabs>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm" role="alert">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
