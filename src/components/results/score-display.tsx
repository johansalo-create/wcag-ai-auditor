interface ScoreDisplayProps {
  score: number;
  issueCount: number;
}

export function ScoreDisplay({ score, issueCount }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 50) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Utmärkt";
    if (score >= 70) return "Bra";
    if (score >= 50) return "Behöver förbättras";
    return "Kritiskt";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800";
    if (score >= 70) return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800";
    if (score >= 50) return "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800";
    return "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
  };

  return (
    <div className={`rounded-xl border p-6 ${getScoreBg(score)}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Tillgänglighetspoäng
          </p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
          <p className={`text-sm font-medium mt-1 ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{issueCount}</p>
          <p className="text-sm text-muted-foreground">
            {issueCount === 1 ? "problem hittat" : "problem hittade"}
          </p>
        </div>
      </div>
    </div>
  );
}
