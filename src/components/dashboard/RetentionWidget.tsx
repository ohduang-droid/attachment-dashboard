import { MetricCard } from "./MetricCard";
import { Eye, FileText, RefreshCw, AlertTriangle } from "lucide-react";

export function RetentionWidget() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Retention & Usage</h3>
        <p className="text-sm text-muted-foreground">Paid member engagement</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <MetricCard 
            label="Touch Rate" 
            value="68%" 
            change={5.2}
          />
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <MetricCard 
            label="Full Issue Rate" 
            value="42%" 
            change={8.1}
          />
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 shrink-0">
            <RefreshCw className="h-5 w-5 text-success" />
          </div>
          <MetricCard 
            label="Repeat Use" 
            value="3.2x" 
            change={12}
          />
        </div>
      </div>

      <div className="rounded-lg bg-warning/5 border border-warning/20 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Preview-Only Risk</p>
            <p className="text-sm text-muted-foreground mt-1">
              38% of paid users only consume previews without opening full issues. 
              These users are <span className="text-warning font-medium">3.2x more likely</span> to churn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
