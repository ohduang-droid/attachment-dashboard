import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getMagnetSeries, type MagnetId } from "@/mock/magnet-metrics";

interface MemberChartProps {
  type: "magnetPurchases" | "paidSubscribersFromFc" | "fullReadOpens" | "renewedSubscribers";
  magnetId: string;
}

const allowedMagnetIds = new Set<MagnetId>([
  "all",
  "coffee-with-lenny",
  "sip-with-lenny",
  "drink-with-lenny",
]);

function isMagnetId(value: string): value is MagnetId {
  return allowedMagnetIds.has(value as MagnetId);
}

export function MemberChart({ type, magnetId }: MemberChartProps) {
  const resolvedMagnetId: MagnetId = isMagnetId(magnetId) ? magnetId : "all";
  const data = getMagnetSeries(resolvedMagnetId);
  const dataKey = type;
  const seriesLabelMap: Record<MemberChartProps["type"], string> = {
    magnetPurchases: "Magnet Purchases",
    paidSubscribersFromFc: "Paid Subscribers",
    fullReadOpens: "Full Article Opens",
    renewedSubscribers: "Renewed Subscribers",
  };
  const seriesLabel = seriesLabelMap[type];
  
  return (
    <div className="space-y-4">
      <div className="h-56 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C32C0A" stopOpacity={0.28} />
                <stop offset="60%" stopColor="#C32C0A" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#C32C0A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C32C0A" />
                <stop offset="100%" stopColor="#C32C0A" />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(0, 0%, 55%)', fontSize: 12 }}
              interval="preserveStartEnd"
              minTickGap={18}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(0, 0%, 55%)', fontSize: 12 }}
              width={44}
              tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 11%)',
                border: '1px solid hsl(0, 0%, 18%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(0, 0%, 55%)', marginBottom: '4px' }}
              itemStyle={{ color: 'hsl(0, 0%, 100%)' }}
              formatter={(value: number) => [value.toLocaleString(), seriesLabel]}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="url(#lineGradient)"
              strokeWidth={2}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
