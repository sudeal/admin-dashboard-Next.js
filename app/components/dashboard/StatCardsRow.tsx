import StatCard from "./StatCard";
import type { DashboardStat } from "@/app/services/dashboard.service";

export default function StatCardsRow({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="ds-stat-grid">
      {stats.map((item) => (
        <StatCard key={item.id} item={item} />
      ))}
    </div>
  );
}
