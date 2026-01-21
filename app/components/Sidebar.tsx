"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";

type NavItem = {
  labelKey: string;
  icon: string;
  href: string;
};

type SidebarProps = {
  isOpen?: boolean;
  isCollapsed?: boolean;
};

const topItems: NavItem[] = [
  { labelKey: "dashboard", icon: "bi-speedometer2", href: "/" },
  { labelKey: "products", icon: "bi-grid", href: "/products" },
  { labelKey: "favorites", icon: "bi-heart", href: "/favorites" },
  { labelKey: "inbox", icon: "bi-chat-left", href: "/inbox" },
  { labelKey: "orderLists", icon: "bi-card-checklist", href: "/orders" },
  { labelKey: "productStock", icon: "bi-list-check", href: "/stock" },
];

const pageItems: NavItem[] = [
  { labelKey: "toDoList", icon: "bi-check2-square", href: "/todo" },
  { labelKey: "contact", icon: "bi-people", href: "/contact" },
  { labelKey: "pricing", icon: "bi-gift", href: "/pricing" },
  { labelKey: "charts", icon: "bi-bar-chart", href: "/charts" },
  { labelKey: "calendar", icon: "bi-calendar4", href: "/calendar" },
];

export default function Sidebar({
  isOpen = false,
  isCollapsed = false,
}: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // "/orders" aktifken "/orders/00001" de aktif say
    return pathname === href || pathname.startsWith(`${href}/`) || pathname.startsWith(href);
  };

  return (
    <aside
      className={`ds-sidebar ${isOpen ? "is-open" : ""} ${
        isCollapsed ? "is-collapsed" : ""
      }`}
    >
      <div className="ds-brand">
        {!isCollapsed && (
          <>
            <span className="ds-brand__dash">Dash</span>
            <span className="ds-brand__stack">Stack</span>
          </>
        )}
      </div>

      <nav className="ds-nav">
        <ul className="ds-nav__list">
          {topItems.map((item) => (
            <li key={item.labelKey}>
              <Link
                href={item.href}
                className={`ds-nav__link ${isActive(item.href) ? "is-active" : ""}`}
              >
                <i className={`bi ${item.icon} ds-nav__icon`} />
                {!isCollapsed && (
                  <span className="ds-nav__text">{t(item.labelKey)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="ds-divider" />

        {!isCollapsed && <div className="ds-section-title">{t("pages")}</div>}

        <ul className="ds-nav__list">
          {pageItems.map((item) => (
            <li key={item.labelKey}>
              <Link
                href={item.href}
                className={`ds-nav__link ${isActive(item.href) ? "is-active" : ""}`}
              >
                <i className={`bi ${item.icon} ds-nav__icon`} />
                {!isCollapsed && (
                  <span className="ds-nav__text">{t(item.labelKey)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
