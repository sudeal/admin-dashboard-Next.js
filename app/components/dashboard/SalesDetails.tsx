"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrderList, getOrderDetailsById, type OrderStatus } from "@/app/services/order-list.service";

type SalesItem = {
  orderId: string;
  customer: string;
  product: string;
  qty: number;
  unitPrice: number;
  total: number;
  date: string;
  status: OrderStatus;
};

export default function SalesDetails() {
  const router = useRouter();
  const [salesItems, setSalesItems] = useState<SalesItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("October");

  useEffect(() => {
    async function loadSalesData() {
      const orders = await getOrderList();
      const allItems: SalesItem[] = [];

     
      for (const order of orders.slice(0, 5)) {
        const details = await getOrderDetailsById(order.id);
        if (details) {
          details.lines.forEach((line) => {
            allItems.push({
              orderId: order.id,
              customer: order.name,
              product: line.productName,
              qty: line.qty,
              unitPrice: line.unit,
              total: line.total,
              date: order.date,
              status: order.status,
            });
          });
        }
      }

      setSalesItems(allItems);
    }

    loadSalesData();
  }, []);

  const statusClass = (s: OrderStatus) => {
    switch (s) {
      case "Completed":
        return "sd-badge sd-badge--completed";
      case "Processing":
        return "sd-badge sd-badge--processing";
      case "Rejected":
        return "sd-badge sd-badge--rejected";
      case "On Hold":
        return "sd-badge sd-badge--hold";
      case "In Transit":
        return "sd-badge sd-badge--transit";
      default:
        return "sd-badge";
    }
  };

  const goToOrderDetails = (id: string) => {
    const safeId = encodeURIComponent(String(id ?? "").trim());
    router.push(`/orders/${safeId}`);
  };

  return (
    <div className="sd-card">
      <div className="sd-header">
        <h2 className="sd-title">Sales Details</h2>
        <select
          className="sd-month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="sd-table-wrap">
        <table className="sd-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th style={{ textAlign: "center" }}>Qty</th>
              <th style={{ textAlign: "right" }}>Unit Price</th>
              <th style={{ textAlign: "right" }}>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {salesItems.map((item, index) => (
              <tr
                key={`${item.orderId}-${index}`}
                className="sd-row-clickable"
                onClick={() => goToOrderDetails(item.orderId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToOrderDetails(item.orderId);
                }}
              >
                <td className="sd-order-id">{item.orderId}</td>
                <td className="sd-customer">{item.customer}</td>
                <td className="sd-product">{item.product}</td>
                <td style={{ textAlign: "center" }}>{item.qty}</td>
                <td style={{ textAlign: "right" }}>${item.unitPrice.toFixed(0)}</td>
                <td style={{ textAlign: "right" }}>${item.total.toFixed(0)}</td>
                <td className="sd-date">{item.date}</td>
                <td>
                  <span className={statusClass(item.status)}>{item.status}</span>
                </td>
              </tr>
            ))}

            {salesItems.length === 0 && (
              <tr>
                <td colSpan={8} className="sd-empty">
                  No sales data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

