"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  icon: string;
  href: string;
};

type SidebarProps = {
  isOpen?: boolean;
  isCollapsed?: boolean;
};

const topItems: NavItem[] = [
  { label: "Dashboard", icon: "bi-speedometer2", href: "/" },
  { label: "Products", icon: "bi-grid", href: "/products" },
  { label: "Favorites", icon: "bi-heart", href: "/favorites" },
  { label: "Inbox", icon: "bi-chat-left", href: "/inbox" },
  { label: "Order Lists", icon: "bi-card-checklist", href: "/orders" },
  { label: "Product Stock", icon: "bi-list-check", href: "/stock" },
];

const pageItems: NavItem[] = [
  { label: "To Do List", icon: "bi-check2-square", href: "/todo" },
  { label: "Contact", icon: "bi-people", href: "/contact" },
  { label: "Pricing", icon: "bi-gift", href: "/pricing" },
  { label: "Charts", icon: "bi-bar-chart", href: "/charts" },
  { label: "Calendar", icon: "bi-calendar4", href: "/calendar" },
];

export default function Sidebar({
  isOpen = false,
  isCollapsed = false,
}: SidebarProps) {
  const pathname = usePathname();

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
            <li key={item.label}>
              <Link
                href={item.href}
                className={`ds-nav__link ${isActive(item.href) ? "is-active" : ""}`}
              >
                <i className={`bi ${item.icon} ds-nav__icon`} />
                {!isCollapsed && (
                  <span className="ds-nav__text">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="ds-divider" />

        {!isCollapsed && <div className="ds-section-title">PAGES</div>}

        <ul className="ds-nav__list">
          {pageItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`ds-nav__link ${isActive(item.href) ? "is-active" : ""}`}
              >
                <i className={`bi ${item.icon} ds-nav__icon`} />
                {!isCollapsed && (
                  <span className="ds-nav__text">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
