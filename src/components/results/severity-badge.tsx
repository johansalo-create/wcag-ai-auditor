import { Badge } from "@/components/ui/badge";
import type { Severity } from "@/types/wcag";

const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: {
    label: "Kritisk",
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800",
  },
  serious: {
    label: "Allvarlig",
    className: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-800",
  },
  moderate: {
    label: "Måttlig",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
  },
  minor: {
    label: "Mindre",
    className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
  },
};

interface SeverityBadgeProps {
  severity: Severity;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
