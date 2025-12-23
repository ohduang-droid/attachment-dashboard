// Using mockData; dev team will replace with real API hook useFetchMagnetMetrics()

export type MetricKey =
  | "magnetPurchases" // from API
  | "paidSubscribersFromFc" // from API
  | "fullReadOpens" // from API
  | "renewedSubscribers"; // from API

export interface MagnetMetricPoint {
  date: string; // from API
  magnetPurchases: number; // from API
  paidSubscribersFromFc: number; // from API
  fullReadOpens: number; // from API
  renewedSubscribers: number; // from API
}

export type MagnetId = "all" | "coffee-with-lenny" | "sip-with-lenny" | "drink-with-lenny";

const baseDates = ["Mar 1", "Mar 8", "Mar 15", "Mar 22", "Mar 29", "Apr 5", "Apr 12", "Apr 19", "Apr 26"];

function scaleSeries(multiplier: number): MagnetMetricPoint[] {
  return baseDates.map((date, i) => ({
    date,
    magnetPurchases: Math.round((1200 + i * 110) * multiplier),
    paidSubscribersFromFc: Math.round((3200 + i * 280) * multiplier),
    fullReadOpens: Math.round((22000 + i * 1600) * multiplier),
    renewedSubscribers: Math.round((900 + i * 70) * multiplier),
  }));
}

const magnetSeriesById: Record<Exclude<MagnetId, "all">, MagnetMetricPoint[]> = {
  "coffee-with-lenny": scaleSeries(1.0),
  "sip-with-lenny": scaleSeries(0.78),
  "drink-with-lenny": scaleSeries(1.18),
};

export function getMagnetSeries(magnetId: MagnetId): MagnetMetricPoint[] {
  if (magnetId !== "all") return magnetSeriesById[magnetId];

  // "All" = sum across magnets by date
  return baseDates.map((date, idx) => {
    const points = Object.values(magnetSeriesById).map((series) => series[idx]);
    return {
      date,
      magnetPurchases: points.reduce((acc, p) => acc + p.magnetPurchases, 0),
      paidSubscribersFromFc: points.reduce((acc, p) => acc + p.paidSubscribersFromFc, 0),
      fullReadOpens: points.reduce((acc, p) => acc + p.fullReadOpens, 0),
      renewedSubscribers: points.reduce((acc, p) => acc + p.renewedSubscribers, 0),
    };
  });
}


