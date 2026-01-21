"use client";

import { useState } from "react";
import { Globe, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (value: string): boolean => {
    try {
      const urlObj = new URL(value);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Ange en URL");
      return;
    }

    let fullUrl = url.trim();
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = `https://${fullUrl}`;
    }

    if (!validateUrl(fullUrl)) {
      setError("Ogiltig URL. Ange en giltig webbadress.");
      return;
    }

    onAnalyze(fullUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="url-input" className="text-sm font-medium flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Webbadress
        </label>
        <div className="flex gap-2">
          <Input
            id="url-input"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            disabled={isLoading}
            className="flex-1"
            aria-describedby={error ? "url-error" : undefined}
            aria-invalid={!!error}
          />
          <Button type="submit" disabled={isLoading || !url.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Analysera
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
        {error && (
          <p id="url-error" className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Vi hämtar sidans HTML och analyserar den för WCAG 2.1 AA-efterlevnad.
      </p>
    </form>
  );
}
