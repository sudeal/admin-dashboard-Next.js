import type { DashboardStat } from "@/app/services/dashboard.service";

export default function StatCard({ item }: { item: DashboardStat }) {
  return (
    <div className="ds-stat">
      <div className="ds-stat__top">
        <div className="ds-stat__title">{item.title}</div>

        <div className={`ds-stat__iconbg ${item.iconBgClass}`}>
          <i className={`bi ${item.icon}`} />
        </div>
      </div>

      <div className="ds-stat__value">{item.value}</div>

      <div className={`ds-stat__delta ${item.deltaType === "down" ? "is-down" : "is-up"}`}>
        <i className={`bi ${item.deltaType === "down" ? "bi-arrow-down" : "bi-arrow-up"}`} />
        <span>{item.deltaText}</span>
      </div>
    </div>
  );
}
