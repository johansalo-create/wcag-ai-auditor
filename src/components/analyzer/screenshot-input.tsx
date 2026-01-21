"use client";

import { useState, useCallback } from "react";
import { Image as ImageIcon, Loader2, ArrowRight, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScreenshotInputProps {
  onAnalyze: (imageBase64: string) => void;
  isLoading: boolean;
}

export function ScreenshotInput({ onAnalyze, isLoading }: ScreenshotInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback((file: File) => {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Endast bildfiler stöds (PNG, JPG, WEBP)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Bilden är för stor. Max 10 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preview) {
      onAnalyze(preview);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Skärmdump
        </label>

        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
              ${isLoading ? "opacity-50 pointer-events-none" : "cursor-pointer"}
            `}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={isLoading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Välj eller dra en bild"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Dra och släpp en skärmdump</p>
                <p className="text-sm text-muted-foreground">eller klicka för att välja fil</p>
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, WEBP upp till 10 MB</p>
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg border border-border overflow-hidden">
            <img
              src={preview}
              alt="Förhandsgranskning av uppladdad bild"
              className="w-full max-h-[300px] object-contain bg-muted/50"
            />
            <button
              type="button"
              onClick={clearPreview}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Ta bort bild"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        AI-vision analyserar layout, kontraster, textstorlek och visuella tillgänglighetsproblem.
      </p>

      <Button type="submit" disabled={isLoading || !preview} className="w-full sm:w-auto">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Analysera bild
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
