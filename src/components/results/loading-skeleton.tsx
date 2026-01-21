import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Laddar analysresultat">
      <div className="sr-only" role="status" aria-live="polite">
        Analyserar tillgänglighet, vänligen vänta...
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score box */}
          <div className="rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-8 w-12 ml-auto" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Summary */}
          <Skeleton className="h-20 w-full rounded-lg" />

          {/* Filter buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>

          {/* Issue cards */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-5 w-48" />
                    </div>
                    <Skeleton className="h-5 w-5" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
