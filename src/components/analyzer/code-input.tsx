"use client";

import { useState } from "react";
import { Code, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CodeInputProps {
  onAnalyze: (code: string) => void;
  isLoading: boolean;
}

export function CodeInput({ onAnalyze, isLoading }: CodeInputProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onAnalyze(code.trim());
    }
  };

  const exampleCode = `<!DOCTYPE html>
<html>
<head>
  <title>Min sida</title>
</head>
<body>
  <img src="bild.jpg">
  <button onclick="submit()">Klicka</button>
  <div style="color: #999; background: #fff;">
    Ljus text på ljus bakgrund
  </div>
</body>
</html>`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="code-input" className="text-sm font-medium flex items-center gap-2">
          <Code className="h-4 w-4" aria-hidden="true" />
          HTML/CSS-kod
        </label>
        <Textarea
          id="code-input"
          placeholder="Klistra in din HTML, CSS eller JSX-kod här..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
          className="min-h-[200px] font-mono text-sm"
          aria-describedby="code-help"
        />
        <div id="code-help" className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Stöder HTML, CSS, JSX och React-komponenter</span>
          <button
            type="button"
            onClick={() => setCode(exampleCode)}
            className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Ladda exempelkod
          </button>
        </div>
      </div>
      <Button type="submit" disabled={isLoading || !code.trim()} className="w-full sm:w-auto">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            Analysera kod
            <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
