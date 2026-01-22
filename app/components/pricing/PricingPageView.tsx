"use client";

import useTranslation from "@/app/hooks/useTranslation";

export default function PricingPage() {
  const { t } = useTranslation();
  const plans = [
    {
      name: t("pricing.basic"),
      price: "$14.99",
      features: [
        { text: t("pricing.freeSetup"), active: true },
        { text: t("pricing.bandwidthLimit"), active: true },
        { text: t("pricing.userConnection"), active: true },
        { text: t("pricing.analyticsReport"), active: false },
        { text: t("pricing.publicApiAccess"), active: false },
        { text: t("pricing.pluginsIntegration"), active: false },
        { text: t("pricing.customContentManagement"), active: false },
      ],
      ctaFilled: false,
    },
    {
      name: t("pricing.standard"),
      price: "$49.99",
      features: [
        { text: t("pricing.freeSetup"), active: true },
        { text: t("pricing.bandwidthLimit"), active: true },
        { text: t("pricing.userConnection"), active: true },
        { text: t("pricing.analyticsReport"), active: true },
        { text: t("pricing.publicApiAccess"), active: true },
        { text: t("pricing.pluginsIntegration"), active: false },
        { text: t("pricing.customContentManagement"), active: false },
      ],
      ctaFilled: false,
    },
    {
      name: t("pricing.premium"),
      price: "$89.99",
      features: [
        { text: t("pricing.freeSetup"), active: true },
        { text: t("pricing.bandwidthLimit"), active: true },
        { text: t("pricing.userConnection"), active: true },
        { text: t("pricing.analyticsReport"), active: true },
        { text: t("pricing.publicApiAccess"), active: true },
        { text: t("pricing.pluginsIntegration"), active: true },
        { text: t("pricing.customContentManagement"), active: true },
      ],
      ctaFilled: false,
    },
  ] as const;
  
    return (
      <div className="pr-page">
        <h1 className="pr-title">{t("sidebar.pricing")}</h1>
  
        <div className="pr-grid">
          {plans.map((p) => (
            <div
              key={p.name}
              className="pr-card"
            >
              <div className="pr-bg" />
  
              <div className="pr-head">
                <div className="pr-name">{p.name}</div>
                <div className="pr-sub">{t("pricing.monthlyCharge")}</div>
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
                  {t("pricing.getStarted")}
                </button>

                <div className="pr-trial">{t("pricing.startFreeTrial")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  