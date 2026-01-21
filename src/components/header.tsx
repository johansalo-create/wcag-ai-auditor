"use client";

import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-5xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">WCAG AI Auditor</h1>
            <p className="text-xs text-muted-foreground">Tillgänglighetsanalys på sekunder</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="https://www.w3.org/WAI/WCAG21/quickref/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            WCAG 2.1
          </a>
        </nav>
      </div>
    </header>
  );
}
