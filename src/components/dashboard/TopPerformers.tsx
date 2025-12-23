import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ContentItem {
  title: string;
  previews: number;
  paidSubscriberConvRate: number; // free -> paid conversion rate, %
  fullReadOpenConvRate: number; // full read open conversion rate, %
  changePaid: number;
  changeFree: number;
}

const topContent: ContentItem[] = [
  {
    title: "E-book Preview: Complete Guide",
    previews: 2841,
    paidSubscriberConvRate: 4.8,
    fullReadOpenConvRate: 18.6,
    changePaid: 12,
    changeFree: 9,
  },
  {
    title: "Course Teaser: Module 1",
    previews: 2156,
    paidSubscriberConvRate: 3.9,
    fullReadOpenConvRate: 16.1,
    changePaid: 8,
    changeFree: 6,
  },
  {
    title: "Template Pack Overview",
    previews: 1893,
    paidSubscriberConvRate: 3.2,
    fullReadOpenConvRate: 14.8,
    changePaid: -3,
    changeFree: 2,
  },
  {
    title: "Weekly Newsletter Sample",
    previews: 1654,
    paidSubscriberConvRate: 2.8,
    fullReadOpenConvRate: 19.4,
    changePaid: 15,
    changeFree: 11,
  },
  {
    title: "Premium Toolkit Demo",
    previews: 1432,
    paidSubscriberConvRate: 2.5,
    fullReadOpenConvRate: 12.2,
    changePaid: 5,
    changeFree: -4,
  },
];

export type SubscriberMode = "PaidSubscriber" | "FreeSubscriber";

interface TopPerformersProps {
  mode: SubscriberMode;
}

export function TopPerformers({ mode }: TopPerformersProps) {
  const subtitle =
    mode === "FreeSubscriber"
      ? "By free→paid conversion rate"
      : "By Full issue open conversion rate";

  const rows = useMemo(() => {
    const getRate = (item: ContentItem) =>
      mode === "FreeSubscriber" ? item.paidSubscriberConvRate : item.fullReadOpenConvRate;
    const getChange = (item: ContentItem) =>
      mode === "FreeSubscriber" ? item.changePaid : item.changeFree;

    return [...topContent]
      .sort((a, b) => getRate(b) - getRate(a))
      .map((item) => ({
        ...item,
        convRate: getRate(item),
        change: getChange(item),
      }));
  }, [mode]);

  return (
    <div
      className="rounded-2xl border border-border bg-[#F7F7F4] p-6 text-foreground shadow-sm animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Episode</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-[1fr_110px_80px_110px] gap-6 px-2 pb-3 text-xs tracking-[0.2em] text-muted-foreground">
        <div>CONTENT</div>
        <div className="text-right">Previews</div>
        <div className="text-right">CONV %</div>
        <div className="text-right">CHANGE</div>
      </div>

      <div className="space-y-2">
        {rows.map((item, index) => {
          const isPositive = item.change >= 0;

          return (
            <button
              key={index}
              type="button"
              className="w-full rounded-xl px-2 py-3 text-left transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D0204]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F4]"
            >
              <div className="grid grid-cols-[1fr_110px_80px_110px] items-center gap-6">
                <div className="min-w-0 pr-2">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground tabular-nums">
                  {item.previews.toLocaleString()}
                </div>
                <div className="text-right text-sm font-medium text-foreground tabular-nums">
                  {item.convRate.toFixed(1)}%
                </div>
                <div
                  className={cn(
                    "flex items-center justify-end gap-1.5 text-sm font-medium tabular-nums",
                    isPositive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{isPositive ? "+" : ""}{item.change}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
