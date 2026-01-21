"use client";

import { useEffect, useState } from "react";
import StatCardsRow from "@/app/components/dashboard/StatCardsRow";
import SalesDetails from "@/app/components/dashboard/SalesDetails";
import DealsDetails from "@/app/components/dashboard/DealsDetails";
import { getDashboardStats, type DashboardStat } from "@/app/services/dashboard.service";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  return (
    <div className="ds-dashboard">
      <h1 className="ds-page-title">{t("dashboard")}</h1>
      <StatCardsRow stats={stats} />
      <SalesDetails />
      <DealsDetails />
    </div>
  );
}
