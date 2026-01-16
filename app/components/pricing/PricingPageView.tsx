export default function PricingPage() {
    const plans = [
      {
        name: "Basic",
        price: "$14.99",
        features: [
          { text: "Free Setup", active: true },
          { text: "Bandwidth Limit 10 GB", active: true },
          { text: "20 User Connection", active: true },
          { text: "Analytics Report", active: false },
          { text: "Public API Access", active: false },
          { text: "Plugins Integration", active: false },
          { text: "Custom Content Management", active: false },
        ],
        ctaFilled: false,
      },
      {
        name: "Standard",
        price: "$49.99",
        features: [
          { text: "Free Setup", active: true },
          { text: "Bandwidth Limit 10 GB", active: true },
          { text: "20 User Connection", active: true },
          { text: "Analytics Report", active: true },
          { text: "Public API Access", active: true },
          { text: "Plugins Integration", active: false },
          { text: "Custom Content Management", active: false },
        ],
        ctaFilled: false,
      },
      {
        name: "Premium",
        price: "$89.99",
        features: [
          { text: "Free Setup", active: true },
          { text: "Bandwidth Limit 10 GB", active: true },
          { text: "20 User Connection", active: true },
          { text: "Analytics Report", active: true },
          { text: "Public API Access", active: true },
          { text: "Plugins Integration", active: true },
          { text: "Custom Content Management", active: true },
        ],
        ctaFilled: false,
      },
    ] as const;
  
    return (
      <div className="pr-page">
        <h1 className="pr-title">Pricing</h1>
  
        <div className="pr-grid">
          {plans.map((p) => (
            <div
              key={p.name}
              className="pr-card"
            >
              <div className="pr-bg" />
  
              <div className="pr-head">
                <div className="pr-name">{p.name}</div>
                <div className="pr-sub">Monthly Charge</div>
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
                  Get Started
                </button>
  
                <div className="pr-trial">Start Your 30 Day Free Trial</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  