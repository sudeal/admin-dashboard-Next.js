"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderItem, OrderStatus } from "@/app/services/order-list.service";
import { getOrderList } from "@/app/services/order-list.service";

type FilterState = {
  date: string;
  type: string;
  status: string;
};

export default function OrderListTable() {
  const router = useRouter();

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    date: "Date",
    type: "Order Type",
    status: "Order Status",
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
      const typeOk = filters.type === "Order Type" || o.type === filters.type;
      const statusOk =
        filters.status === "Order Status" || o.status === filters.status;
      return typeOk && statusOk;
    });
  }, [orders, filters]);

  const resetFilters = () => {
    setFilters({ date: "Date", type: "Order Type", status: "Order Status" });
  };

  const statusClass = (s: OrderStatus) => {
    switch (s) {
      case "Completed":
        return "ol-badge ol-badge--completed";
      case "Processing":
        return "ol-badge ol-badge--processing";
      case "Rejected":
        return "ol-badge ol-badge--rejected";
      case "On Hold":
        return "ol-badge ol-badge--hold";
      case "In Transit":
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
      <h1 className="ol-title">Order Lists</h1>

      <div className="ol-filters">
        <div className="ol-filters__left">
          <button className="ol-filter-icon" type="button" aria-label="Filter">
            <i className="bi bi-funnel" />
          </button>

          <div className="ol-filter-by">Filter By</div>

          <div className="ol-divider" />

          <select
            className="ol-select"
            value={filters.date}
            onChange={(e) => setFilters((p) => ({ ...p, date: e.target.value }))}
          >
            <option>Date</option>
            <option>Last 30 days</option>
            <option>This year</option>
          </select>

          <div className="ol-divider" />

          <select
            className="ol-select"
            value={filters.type}
            onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
          >
            <option>Order Type</option>
            {uniqueTypes.map((t) => (
              <option key={t} value={t}>
                {t}
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
            <option>Order Status</option>
            {uniqueStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="ol-reset" type="button" onClick={resetFilters}>
          <i className="bi bi-arrow-counterclockwise" />
          <span>Reset Filter</span>
        </button>
      </div>

      <div className="ol-card">
        <div className="ol-table-wrap">
          <table className="ol-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>ID</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th style={{ width: 140 }}>DATE</th>
                <th style={{ width: 160 }}>TYPE</th>
                <th style={{ width: 150 }}>STATUS</th>
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
                  <td className="ol-muted">{o.type}</td>
                  <td>
                    <span className={statusClass(o.status)}>{o.status}</span>
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
