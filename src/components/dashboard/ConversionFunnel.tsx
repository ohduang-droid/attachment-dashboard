import { ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FunnelStepData {
  label: string;
  count: number;
  rate?: number;
  isBottleneck?: boolean;
}

const funnelData: FunnelStepData[] = [
  { label: "Scan", count: 8432, rate: 72 },
  { label: "Consume", count: 6071, rate: 45, isBottleneck: true },
  { label: "Click CTA", count: 2732, rate: 13 },
  { label: "Purchase", count: 355 },
];

export function ConversionFunnel() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
        <p className="text-sm text-muted-foreground">Free → Paid journey (AFP denominator)</p>
      </div>

      <div className="flex items-center justify-between overflow-x-auto pb-2">
        {funnelData.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={cn(
              "relative flex flex-col items-center rounded-lg border px-6 py-4 min-w-[100px] transition-all",
              step.isBottleneck 
                ? "border-destructive/50 bg-destructive/5" 
                : "border-border bg-secondary/30 hover:bg-secondary/50"
            )}>
              {step.isBottleneck && (
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive">
                  <AlertCircle className="h-3 w-3 text-destructive-foreground" />
                </div>
              )}
              <span className="text-xs text-muted-foreground mb-1">{step.label}</span>
              <span className={cn(
                "text-xl font-semibold",
                step.isBottleneck ? "text-destructive" : "text-foreground"
              )}>
                {step.count.toLocaleString()}
              </span>
            </div>
            
            {step.rate !== undefined && (
              <div className="flex flex-col items-center mx-3">
                <span className={cn(
                  "text-xs font-medium mb-1",
                  step.isBottleneck ? "text-destructive" : "text-muted-foreground"
                )}>
                  {step.rate}%
                </span>
                <ChevronRight className={cn(
                  "h-4 w-4",
                  step.isBottleneck ? "text-destructive" : "text-muted-foreground"
                )} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Biggest drop: Consume → Click CTA (55% drop)</span>
        </div>
      </div>
    </div>
  );
}
