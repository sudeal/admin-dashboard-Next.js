"use client";

import { useEffect, useState } from "react";
import StatCardsRow from "@/app/components/dashboard/StatCardsRow";
import { getDashboardStats, type DashboardStat } from "@/app/services/dashboard.service";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  return (
    <div className="ds-dashboard">
      <h1 className="ds-page-title">Dashboard</h1>
      <StatCardsRow stats={stats} />
    </div>
  );
}
