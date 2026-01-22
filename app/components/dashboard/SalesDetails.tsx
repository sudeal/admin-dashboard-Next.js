"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrderList, getOrderDetailsById, type OrderStatus } from "@/app/services/order-list.service";
import useTranslation from "@/app/hooks/useTranslation";

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
  const { t } = useTranslation();
  const [salesItems, setSalesItems] = useState<SalesItem[]>([]);

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
      case "completed":
        return "sd-badge sd-badge--completed";
      case "processing":
        return "sd-badge sd-badge--processing";
      case "rejected":
        return "sd-badge sd-badge--rejected";
      case "onHold":
        return "sd-badge sd-badge--hold";
      case "inTransit":
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
        <h2 className="sd-title">{t("sales.salesDetails")}</h2>
      </div>

      <div className="sd-table-wrap">
        <table className="sd-table">
          <thead>
            <tr>
              <th>{t("sales.orderId")}</th>
              <th>{t("tables.customer")}</th>
              <th>{t("sales.product")}</th>
              <th style={{ textAlign: "center" }}>{t("sales.qty")}</th>
              <th style={{ textAlign: "right" }}>{t("sales.unitPrice")}</th>
              <th style={{ textAlign: "right" }}>{t("sales.total")}</th>
              <th>{t("tables.date")}</th>
              <th>{t("tables.status")}</th>
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
                  <span className={statusClass(item.status)}>{t(`statuses.${item.status}`)}</span>
                </td>
              </tr>
            ))}

            {salesItems.length === 0 && (
              <tr>
                <td colSpan={8} className="sd-empty">
                  {t("sales.noSalesDataFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

