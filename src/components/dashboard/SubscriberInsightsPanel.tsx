import { useState } from "react";
import { Users } from "lucide-react";
import { TopPerformers, type SubscriberMode } from "@/components/dashboard/TopPerformers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SubscriberInsightsPanel() {
  const [subscriberMode, setSubscriberMode] = useState<SubscriberMode>("FreeSubscriber");

  return (
    <div className="rounded-[20px] border border-border/70 p-1">
      <div className="space-y-6 rounded-[16px] bg-background/40 p-3 sm:p-4">
        <div className="space-y-3">
          <Select value={subscriberMode} onValueChange={(v) => setSubscriberMode(v as SubscriberMode)}>
            <SelectTrigger
              className="h-9 w-full bg-secondary border-border text-sm sm:w-64 focus:ring-[#8D0204]/35 focus:border-[#8D0204]/50"
              aria-label="Select subscriber mode"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PaidSubscriber">Paid Subscriber</SelectItem>
              <SelectItem value="FreeSubscriber">Free Subscriber</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subscriberMode === "FreeSubscriber" && (
              <div className="rounded-xl border border-border bg-card p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <p className="text-sm text-muted-foreground mb-2">Free → Paid Conversion</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-foreground">4.2%</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>8,432 Active Free Users</span>
                </div>
              </div>
            )}

            {subscriberMode === "PaidSubscriber" && (
              <>
                <div className="rounded-xl border border-border bg-card p-5 animate-fade-in" style={{ animationDelay: "150ms" }}>
                  <p className="text-sm text-muted-foreground mb-2">Preview → Full Issue Open Conversion</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-foreground">31.6%</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>12,470 Preview Readers</span>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
                  <p className="text-sm text-muted-foreground mb-2">Active Paid People (APP)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-foreground">1,128</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Paid users active in last 30 days</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <TopPerformers mode={subscriberMode} />
      </div>
    </div>
  );
}


