"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderItem, OrderStatus } from "@/app/services/order-list.service";
import { getOrderList } from "@/app/services/order-list.service";
import useTranslation from "@/app/hooks/useTranslation";

type FilterState = {
  date: string;
  type: string;
  status: string;
};

export default function OrderListTable() {
  const router = useRouter();
  const { t } = useTranslation();

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    date: t("tables.date"),
    type: t("tables.orderType"),
    status: t("tables.orderStatus"),
  });

  useEffect(() => {
    getOrderList().then(setOrders);
  }, []);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(orders.map((o) => o.type)));
  }, [orders]);

  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(orders.map((o) => o.status)));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const typeOk = filters.type === t("tables.orderType") || o.type === filters.type;
      const statusOk =
        filters.status === t("tables.orderStatus") || o.status === filters.status;
      return typeOk && statusOk;
    });
  }, [orders, filters, t]);

  const resetFilters = () => {
    setFilters({ date: t("tables.date"), type: t("tables.orderType"), status: t("tables.orderStatus") });
  };

  const statusClass = (s: OrderStatus) => {
    switch (s) {
      case "completed":
        return "ol-badge ol-badge--completed";
      case "processing":
        return "ol-badge ol-badge--processing";
      case "rejected":
        return "ol-badge ol-badge--rejected";
      case "onHold":
        return "ol-badge ol-badge--hold";
      case "inTransit":
        return "ol-badge ol-badge--transit";
      default:
        return "ol-badge";
    }
  };

  const goToOrderDetails = (id: string) => {
    const safeId = encodeURIComponent(String(id ?? "").trim());
    router.push(`/orders/${safeId}`);
  };
  

  return (
    <div className="ol-page">
      <h1 className="ol-title">{t("sidebar.orderLists")}</h1>

      <div className="ol-filters">
        <div className="ol-filters__left">
          <button className="ol-filter-icon" type="button" aria-label="Filter">
            <i className="bi bi-funnel" />
          </button>

          <div className="ol-filter-by">{t("filters.filterBy")}</div>

          <div className="ol-divider" />

          <select
            className="ol-select"
            value={filters.date}
            onChange={(e) => setFilters((p) => ({ ...p, date: e.target.value }))}
          >
            <option>{t("tables.date")}</option>
            <option>{t("filters.last30Days")}</option>
            <option>{t("filters.thisYear")}</option>
          </select>

          <div className="ol-divider" />

          <select
            className="ol-select"
            value={filters.type}
            onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
          >
            <option>{t("tables.orderType")}</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="ol-divider" />

          <select
            className="ol-select"
            value={filters.status}
            onChange={(e) =>
              setFilters((p) => ({ ...p, status: e.target.value }))
            }
          >
            <option>{t("tables.orderStatus")}</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {t(`statuses.${status}`)}
              </option>
            ))}
          </select>
        </div>

        <button className="ol-reset" type="button" onClick={resetFilters}>
          <i className="bi bi-arrow-counterclockwise" />
          <span>{t("filters.resetFilter")}</span>
        </button>
      </div>

      <div className="ol-card">
        <div className="ol-table-wrap">
          <table className="ol-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>ID</th>
                <th>{t("tables.customer")}</th>
                <th>{t("tables.address")}</th>
                <th style={{ width: 140 }}>{t("tables.date")}</th>
                <th style={{ width: 160 }}>{t("tables.type")}</th>
                <th style={{ width: 150 }}>{t("tables.status")}</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((o) => (
                <tr
                  key={o.id}
                  className="ol-row-clickable"
                  onClick={() => goToOrderDetails(o.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") goToOrderDetails(o.id);
                  }}
                >
                  <td className="ol-id">{o.id}</td>
                  <td className="ol-name">{o.name}</td>
                  <td className="ol-address">{o.address}</td>
                  <td className="ol-muted">{o.date}</td>
                  <td className="ol-muted">{t(`categories.${o.type}`) || o.type}</td>
                  <td>
                    <span className={statusClass(o.status)}>{t(`statuses.${o.status}`)}</span>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="ol-empty">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
