import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  className?: string;
}

export function MetricCard({ label, value, change, className }: MetricCardProps) {
  const isPositive = change && change >= 0;
  
  return (
    <div className={cn("min-w-0 space-y-1", className)}>
      <p className="text-xs leading-snug text-muted-foreground sm:text-sm">{label}</p>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {value}
        </span>
        {change !== undefined && (
          <span className={cn(
            "flex items-center gap-0.5 text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {isPositive ? "+" : ""}{change}%
          </span>
        )}
      </div>
    </div>
  );
}
