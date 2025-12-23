import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MemberChart } from "@/components/dashboard/MemberChart";
import { SubscriberInsightsPanel } from "@/components/dashboard/SubscriberInsightsPanel";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockMagnets } from "@/mock/magnets";

const Index = () => {
  const [chartType, setChartType] = useState<
    "magnetPurchases" | "paidSubscribersFromFc" | "fullReadOpens" | "renewedSubscribers"
  >("magnetPurchases");
  const [selectedMagnetId, setSelectedMagnetId] = useState<string>(mockMagnets[0]?.id ?? "");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-60 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-8">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Select defaultValue="30d">
              <SelectTrigger className="w-32 h-8 bg-secondary border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Top Metrics - Ghost Style */}
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Select value={selectedMagnetId} onValueChange={setSelectedMagnetId}>
                <SelectTrigger className="h-9 w-64 bg-secondary border-border text-sm" aria-label="Select magnet">
                  <SelectValue placeholder="Select a magnet" />
                </SelectTrigger>
                <SelectContent>
                  {mockMagnets.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div
              role="tablist"
              aria-label="Metric chart tabs"
              className="grid grid-cols-4 gap-6 mb-6"
            >
              <button
                type="button"
                role="tab"
                aria-selected={chartType === "magnetPurchases"}
                onClick={() => setChartType("magnetPurchases")}
                className={cn(
                  "rounded-lg p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D0204]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  chartType === "magnetPurchases"
                    ? "bg-[#8D0204]/10 ring-1 ring-[#8D0204]/40"
                    : "hover:bg-secondary/40"
                )}
              >
                <MetricCard 
                  label="Magnet Purchases" 
                  value="1,720" 
                  change={6}
                />
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={chartType === "paidSubscribersFromFc"}
                onClick={() => setChartType("paidSubscribersFromFc")}
                className={cn(
                  "rounded-lg p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D0204]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  chartType === "paidSubscribersFromFc"
                    ? "bg-[#8D0204]/10 ring-1 ring-[#8D0204]/40"
                    : "hover:bg-secondary/40"
                )}
              >
                <MetricCard 
                  label="Paid Subscribers" 
                  value="849" 
                  change={4}
                />
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={chartType === "fullReadOpens"}
                onClick={() => setChartType("fullReadOpens")}
                className={cn(
                  "rounded-lg p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D0204]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  chartType === "fullReadOpens"
                    ? "bg-[#8D0204]/10 ring-1 ring-[#8D0204]/40"
                    : "hover:bg-secondary/40"
                )}
              >
                <MetricCard 
                  label="Full Issue Opens" 
                  value="9,246" 
                  change={9}
                />
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={chartType === "renewedSubscribers"}
                onClick={() => setChartType("renewedSubscribers")}
                className={cn(
                  "rounded-lg p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D0204]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  chartType === "renewedSubscribers"
                    ? "bg-[#8D0204]/10 ring-1 ring-[#8D0204]/40"
                    : "hover:bg-secondary/40"
                )}
              >
                <MetricCard 
                  label="Renewed Subscribers" 
                  value="287" 
                  change={5}
                />
              </button>
            </div>

            {/* Member Growth Chart */}
            <MemberChart type={chartType} magnetId={selectedMagnetId} />
          </div>

          <SubscriberInsightsPanel />
        </div>
      </main>
    </div>
  );
};

export default Index;
