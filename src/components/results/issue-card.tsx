"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Lightbulb, Code } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SeverityBadge } from "./severity-badge";
import type { WcagIssue } from "@/types/wcag";

interface IssueCardProps {
  issue: WcagIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const wcagUrl = `https://www.w3.org/WAI/WCAG21/quickref/#${issue.criterion.replace(/\./g, "")}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-start justify-between gap-4 w-full text-left"
          aria-expanded={isExpanded}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                {issue.criterion}
              </span>
              <SeverityBadge severity={issue.severity} />
            </div>
            <h3 className="font-semibold text-sm">{issue.title}</h3>
          </div>
          <div className="flex-shrink-0 text-muted-foreground">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-4 pt-3 space-y-4">
          <p className="text-sm text-muted-foreground">{issue.description}</p>

          {issue.element && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Code className="h-3 w-3" />
                Element
              </div>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto font-mono">
                {issue.element}
              </pre>
            </div>
          )}

          {issue.fix && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <Lightbulb className="h-3 w-3" />
                Föreslagen lösning
              </div>
              <div className="text-sm bg-primary/5 border border-primary/10 p-3 rounded-lg">
                {issue.fix}
              </div>
            </div>
          )}

          <a
            href={wcagUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Läs mer om WCAG {issue.criterion}
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardContent>
      )}
    </Card>
  );
}
