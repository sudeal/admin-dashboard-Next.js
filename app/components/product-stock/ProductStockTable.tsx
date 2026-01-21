"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductStockItem } from "@/app/services/product-stock.service";
import { getProductStock } from "@/app/services/product-stock.service";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function ProductStockTable() {
  const [items, setItems] = useState<ProductStockItem[]>([]);
  const [query, setQuery] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    getProductStock().then(setItems);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((x) => x.name.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className="ps-page">
      <div className="ps-topbar">
        <h1 className="ps-page-title">{t("productStock")}</h1>

        <div className="ps-search">
          <i className="bi bi-search ps-search__icon" />
          <input
            className="ps-search__input"
            placeholder={t("searchProductName")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="ps-card">
        <div className="ps-table-wrap">
          <table className="ps-table">
            <thead>
              <tr>
                <th style={{ width: 120 }}>{t("image")}</th>
                <th>{t("productName")}</th>
                <th style={{ width: 170 }}>{t("category")}</th>
                <th style={{ width: 140 }}>{t("price")}</th>
                <th style={{ width: 120 }}>{t("piece")}</th>
                <th style={{ width: 220 }}>{t("availableColor")}</th>
                <th style={{ width: 140, textAlign: "right" }}>{t("action")}</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="ps-imgbox">
                      
                      <img className="ps-img" src={p.imageUrl} alt={p.name} />
                    </div>
                  </td>

                  <td className="ps-name">{p.name}</td>
                  <td className="ps-muted">{p.category}</td>
                  <td className="ps-price">${p.price.toFixed(2)}</td>
                  <td>{p.piece}</td>

                  <td>
                    <div className="ps-colors">
                      {p.colors.map((c, idx) => (
                        <span
                          key={idx}
                          className="ps-color-dot"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </td>

                  <td>
                    <div className="ps-actions">
                      <button className="ps-action-btn" type="button" aria-label="Edit">
                        <i className="bi bi-pencil-square" />
                      </button>

                      <button
                        className="ps-action-btn ps-action-btn--danger"
                        type="button"
                        aria-label="Delete"
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="ps-empty">
                    No products found.
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
