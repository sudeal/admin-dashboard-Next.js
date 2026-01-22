"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { OrderDetails, OrderStatus } from "@/app/services/order-list.service";
import { getOrderDetailsById } from "@/app/services/order-list.service";
import useTranslation from "@/app/hooks/useTranslation";

export default function OrderDetailsPageView({ orderId }: { orderId: string }) {
  const { t } = useTranslation();
  const normalizedId = useMemo(() => {
    let t = String(orderId ?? "");
    try {
      t = decodeURIComponent(t);
    } catch {}
    t = t.trim();
    if (t.startsWith("#")) t = t.slice(1);
    if (t.includes("/")) t = t.split("/").filter(Boolean).pop() ?? t;
    if (/^\d+$/.test(t)) return t.padStart(5, "0");
    return t.trim();
  }, [orderId]);

  const [data, setData] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!normalizedId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getOrderDetailsById(normalizedId)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [normalizedId]);

  if (loading) {
    return (
      <div className="od2-page">
        <div className="od2-card">
          <div className="od2-loading">Loading order...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="od2-page">
        <div className="od2-card">
          <div className="od2-loading" style={{ color: "#ef4444" }}>
            {t("orders.orderNotFound")} (ID: {normalizedId})
          </div>
          <div style={{ marginTop: 12 }}>
            <Link className="od2-back" href="/orders">
              <i className="bi bi-arrow-left" /> {t("orders.backToOrders")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="od2-page">
      <div className="od2-card">
        <div className="od2-header">
          <h1 className="od2-title">Order Details</h1>

          <div className="od2-header-actions">
            <button className="od2-icon-btn" type="button" aria-label="Print">
              <i className="bi bi-printer" />
            </button>
            <Link className="od2-back" href="/orders">
              <i className="bi bi-arrow-left" />
              Back
            </Link>
          </div>
        </div>

        <div className="od2-meta">
          <div className="od2-meta-left">
            <div className="od2-meta-line">
              <span className="od2-meta-label">{t("orders.orderNo")}:</span>{" "}
              <span className="od2-meta-strong">#{data.orderNo}</span>
            </div>

            <div className="od2-meta-sub">
              <span className="od2-meta-label">{t("tables.date")}:</span>{" "}
              <span className="od2-meta-strong">{data.date}</span>
              <span className="od2-dot">•</span>
              <span className="od2-meta-label">{t("tables.type")}:</span>{" "}
              <span className="od2-meta-strong">{t(`categories.${data.type}`) || data.type}</span>
            </div>
          </div>

          <span className={statusClass(data.status)}>{t(`statuses.${data.status}`)}</span>
        </div>

        <div className="od2-divider" />

        <div className="od2-three">
          <div className="od2-block">
            <div className="od2-block-title">{t("tables.customer")}</div>
            <div className="od2-block-strong">{data.customerName}</div>
            <div className="od2-block-muted">{data.customerEmail}</div>
            <div className="od2-block-muted">{data.customerPhone}</div>
          </div>

          <div className="od2-block">
            <div className="od2-block-title">{t("orders.shippingAddress")}</div>
            <div className="od2-block-muted">{data.shippingAddressLine}</div>
            <div className="od2-block-muted">{data.shippingCountry}</div>
          </div>

          <div className="od2-block od2-block--right">
            <div className="od2-block-title">{t("orders.tracking")}</div>
            <div className="od2-block-muted">
              <span className="od2-meta-label">{t("orders.trackingNo")}</span> {data.trackingNo}
            </div>
            <div className="od2-block-muted">
              <span className="od2-meta-label">{t("orders.carrier")}</span> {data.carrier}
            </div>
          </div>
        </div>

        <div className="od2-items">
          <table className="od2-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>{t("productStock.image")}</th>
                <th>{t("sales.product")}</th>
                <th style={{ width: 170 }}>{t("productStock.category")}</th>
                <th style={{ width: 80, textAlign: "center" }}>{t("orders.quantity")}</th>
                <th style={{ width: 120, textAlign: "right" }}>{t("productStock.price")}</th>
                <th style={{ width: 120, textAlign: "right" }}>{t("sales.total")}</th>
              </tr>
            </thead>

            <tbody>
              {data.lines.map((l) => (
                <tr key={l.productId}>
                  <td>
                    <div className="od2-imgbox">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="od2-img" src={l.productImageUrl} alt={l.productName} />
                    </div>
                  </td>
                  <td className="od2-prod">{l.productName}</td>
                  <td className="od2-muted">{t(`categories.${l.category}`) || l.category}</td>
                  <td style={{ textAlign: "center" }}>{l.qty}</td>
                  <td style={{ textAlign: "right" }}>${l.unit.toFixed(0)}</td>
                  <td style={{ textAlign: "right" }}>${l.total.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="od2-totals">
            <div className="od2-totals-row">
              <span>{t("orders.subtotal")}</span>
              <span>${data.subtotal.toFixed(0)}</span>
            </div>
            <div className="od2-totals-row">
              <span>{t("orders.shipping")}</span>
              <span>${data.shipping.toFixed(0)}</span>
            </div>
            <div className="od2-totals-row">
              <span>{t("orders.tax")}</span>
              <span>${data.tax.toFixed(0)}</span>
            </div>

            <div className="od2-totals-divider" />

            <div className="od2-totals-row od2-totals-row--total">
              <span>{t("orders.grandTotal")}</span>
              <span>${data.grandTotal.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
