"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";

export default function PricingPage() {
  const { t } = useLanguage();
  const plans = [
    {
      name: t("basic"),
      price: "$14.99",
      features: [
        { text: t("freeSetup"), active: true },
        { text: t("bandwidthLimit"), active: true },
        { text: t("userConnection"), active: true },
        { text: t("analyticsReport"), active: false },
        { text: t("publicApiAccess"), active: false },
        { text: t("pluginsIntegration"), active: false },
        { text: t("customContentManagement"), active: false },
      ],
      ctaFilled: false,
    },
    {
      name: t("standard"),
      price: "$49.99",
      features: [
        { text: t("freeSetup"), active: true },
        { text: t("bandwidthLimit"), active: true },
        { text: t("userConnection"), active: true },
        { text: t("analyticsReport"), active: true },
        { text: t("publicApiAccess"), active: true },
        { text: t("pluginsIntegration"), active: false },
        { text: t("customContentManagement"), active: false },
      ],
      ctaFilled: false,
    },
    {
      name: t("premium"),
      price: "$89.99",
      features: [
        { text: t("freeSetup"), active: true },
        { text: t("bandwidthLimit"), active: true },
        { text: t("userConnection"), active: true },
        { text: t("analyticsReport"), active: true },
        { text: t("publicApiAccess"), active: true },
        { text: t("pluginsIntegration"), active: true },
        { text: t("customContentManagement"), active: true },
      ],
      ctaFilled: false,
    },
  ] as const;
  
    return (
      <div className="pr-page">
        <h1 className="pr-title">{t("pricing")}</h1>
  
        <div className="pr-grid">
          {plans.map((p) => (
            <div
              key={p.name}
              className="pr-card"
            >
              <div className="pr-bg" />
  
              <div className="pr-head">
                <div className="pr-name">{p.name}</div>
                <div className="pr-sub">{t("monthlyCharge")}</div>
                <div className="pr-price">{p.price}</div>
              </div>
  
              <div className="pr-divider" />
  
              <ul className="pr-features">
                {p.features.map((f) => (
                  <li
                    key={f.text}
                    className={`pr-feature ${f.active ? "is-on" : "is-off"}`}
                  >
                    {f.text}
                  </li>
                ))}
              </ul>
  
              <div className="pr-footer">
                <button
                  type="button"
                  className={`pr-btn ${p.ctaFilled ? "is-filled" : ""}`}
                >
                  {t("getStarted")}
                </button>

                <div className="pr-trial">{t("startFreeTrial")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  